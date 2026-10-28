import { cp, mkdtemp, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import type { ProjectIssue } from "../../src/sras/project/types.js";
import {
  refreshProjectLock,
  validateProjectDirectory,
  type ProjectDirectoryError,
} from "../../src/sras/project/workflow.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const copyExample = async (): Promise<string> => {
  const directory = await mkdtemp(join(tmpdir(), "sras-project-command-"));
  temporaryDirectories.push(directory);
  const target = join(directory, "project");

  await cp(join(process.cwd(), "examples", "e2e-project"), target, {
    recursive: true,
  });

  return target;
};

const addIntegrationModule = async (target: string): Promise<void> => {
  for (const file of ["assurance.yaml", "assessment.yaml"]) {
    const path = join(target, file);
    const text = await readFile(path, "utf8");
    await writeFile(
      path,
      text.replace("modules: [SRAS-AI]", "modules: [SRAS-AI, SRAS-INT]"),
      "utf8",
    );
  }
};

const issuesOf = (
  result: Result<unknown, ProjectDirectoryError>,
): readonly ProjectIssue[] => {
  if (result.ok) return [];

  if (result.error.tag === "Issues" || result.error.tag === "Lockfile") {
    return result.error.issues;
  }

  return [];
};

describe("validateProjectDirectory", () => {
  test("accepts a valid example instance", async () => {
    const target = await copyExample();
    const result = await validateProjectDirectory({
      root: process.cwd(),
      target,
    });

    expect(result.ok).toBe(true);
    expect(must(result).inputCount).toBe(11);
  });

  test("rejects a stale lock after the selection changes", async () => {
    const target = await copyExample();

    await addIntegrationModule(target);

    const result = await validateProjectDirectory({
      root: process.cwd(),
      target,
    });

    expect(result.ok).toBe(false);
    expect(
      issuesOf(result).some(
        (issue) =>
          issue.tag === "Mismatch" &&
          issue.file === "assurance.lock.yaml" &&
          issue.field === "modules",
      ),
    ).toBe(true);
  });

  test("rejects a lock whose checksum no longer matches the inputs", async () => {
    const target = await copyExample();
    const path = join(target, "assurance.lock.yaml");
    const text = await readFile(path, "utf8");

    await writeFile(
      path,
      text.replace(
        /checksum: sha256:[a-f0-9]+/u,
        `checksum: sha256:${"0".repeat(64)}`,
      ),
      "utf8",
    );

    const result = await validateProjectDirectory({
      root: process.cwd(),
      target,
    });

    expect(result.ok).toBe(false);
    expect(
      issuesOf(result).some((issue) => issue.tag === "ChecksumMismatch"),
    ).toBe(true);
  });

  test("reports a missing project file with its path", async () => {
    const target = await copyExample();

    await unlink(join(target, "claims.yaml"));

    const result = await validateProjectDirectory({
      root: process.cwd(),
      target,
    });

    expect(result.ok).toBe(false);

    if (result.ok || result.error.tag !== "Read") return;

    expect(result.error.file).toBe("claims.yaml");
    expect(result.error.message).toContain("ENOENT");
  });

  test("rejects a missing target directory", async () => {
    const result = await validateProjectDirectory({
      root: process.cwd(),
      target: join(tmpdir(), "sras-does-not-exist"),
    });

    expect(result.ok).toBe(false);

    if (result.ok) return;

    expect(result.error.tag).toBe("InvalidTarget");
  });

  test("rejects an empty, NUL, or traversing target", async () => {
    for (const target of ["", "bad\0path", "../escaped"]) {
      const result = await validateProjectDirectory({
        root: process.cwd(),
        target,
      });

      expect(result.ok).toBe(false);
    }
  });

  test("rejects a file as the target", async () => {
    const directory = await mkdtemp(join(tmpdir(), "sras-project-file-"));
    temporaryDirectories.push(directory);
    const target = join(directory, "file.txt");

    await writeFile(target, "not a project\n", "utf8");

    const result = await validateProjectDirectory({
      root: process.cwd(),
      target,
    });

    expect(result.ok).toBe(false);

    if (result.ok) return;

    expect(result.error).toEqual({
      tag: "InvalidTarget",
      target,
      message: "target exists and is not a directory",
    });
  });

  test("reports a root with no standard content", async () => {
    const root = await mkdtemp(join(tmpdir(), "sras-empty-root-"));
    temporaryDirectories.push(root);
    await cp(join(process.cwd(), "schemas"), join(root, "schemas"), {
      recursive: true,
    });
    const target = await copyExample();

    const result = await validateProjectDirectory({ root, target });

    expect(result.ok).toBe(false);

    if (result.ok) return;

    expect(result.error.tag).toBe("StandardMissing");
  });
});

describe("refreshProjectLock", () => {
  test("recomputes a stale lock and leaves the instance valid", async () => {
    const target = await copyExample();

    await addIntegrationModule(target);

    const refreshed = await refreshProjectLock({
      root: process.cwd(),
      target,
    });

    expect(refreshed.ok).toBe(true);
    expect(must(refreshed).inputCount).toBe(12);
    expect(must(refreshed).checksum).toMatch(/^sha256:[a-f0-9]{64}$/u);

    const validated = await validateProjectDirectory({
      root: process.cwd(),
      target,
    });

    expect(validated.ok).toBe(true);

    const lock = await readFile(join(target, "assurance.lock.yaml"), "utf8");

    expect(lock).toContain("id: SRAS-INT");
    expect(lock).toContain("modules/integration/module.yaml");
  });

  test("reports an overlay the standard does not define", async () => {
    const target = await copyExample();

    for (const file of ["assurance.yaml", "assessment.yaml"]) {
      const path = join(target, file);
      const text = await readFile(path, "utf8");
      await writeFile(
        path,
        text.replace("overlays: [TH-FIN]", "overlays: [TH-XXX]"),
        "utf8",
      );
    }

    const result = await refreshProjectLock({
      root: process.cwd(),
      target,
    });

    expect(result.ok).toBe(false);
    expect(
      issuesOf(result).some(
        (issue) =>
          issue.tag === "UnknownSelection" &&
          issue.kind === "overlay" &&
          issue.id === "TH-XXX",
      ),
    ).toBe(true);
  });

  test("does not write a lock when another project rule still fails", async () => {
    const target = await copyExample();
    const assessmentPath = join(target, "assessment.yaml");
    const before = await readFile(join(target, "assurance.lock.yaml"), "utf8");
    const assessment = await readFile(assessmentPath, "utf8");

    await writeFile(
      assessmentPath,
      assessment.replace("owner: Example team", "owner: Another team"),
      "utf8",
    );

    const result = await refreshProjectLock({
      root: process.cwd(),
      target,
    });

    expect(result.ok).toBe(false);
    expect(await readFile(join(target, "assurance.lock.yaml"), "utf8")).toBe(
      before,
    );
  });
});
