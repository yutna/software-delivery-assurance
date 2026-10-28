import { cp, mkdtemp, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import type { Output } from "../../src/sras/adapters/output.js";
import { run } from "../../src/sras/cli/run.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

const makeIo = (): {
  readonly io: Output;
  readonly stdout: string[];
  readonly stderr: string[];
} => {
  const stdout: string[] = [];
  const stderr: string[] = [];

  return {
    io: {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    },
    stdout,
    stderr,
  };
};

const copyExample = async (example = "e2e-project"): Promise<string> => {
  const directory = await mkdtemp(join(tmpdir(), "sras-cli-project-"));
  temporaryDirectories.push(directory);
  const target = join(directory, "project");

  await cp(join(process.cwd(), "examples", example), target, {
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

describe("sras project", () => {
  test("validates a valid instance", async () => {
    const target = await copyExample();
    const { io, stdout, stderr } = makeIo();

    expect(await run(["project", "validate", target], io, process.cwd())).toBe(
      0,
    );
    expect(stdout.join("")).toContain("project valid");
    expect(stdout.join("")).toContain("11 resolved standard inputs");
    expect(stderr).toEqual([]);
  });

  test("reports a stale lock and exits with code 1", async () => {
    const target = await copyExample();

    await addIntegrationModule(target);

    const { io, stderr } = makeIo();

    expect(await run(["project", "validate", target], io, process.cwd())).toBe(
      1,
    );
    expect(stderr.join("")).toContain("assurance.lock.yaml: modules");
  });

  test("refreshes a stale lock and makes the instance valid", async () => {
    const target = await copyExample();

    await addIntegrationModule(target);

    const refresh = makeIo();

    expect(
      await run(["project", "refresh", target], refresh.io, process.cwd()),
    ).toBe(0);
    expect(refresh.stdout.join("")).toContain("refreshed");
    expect(refresh.stdout.join("")).toContain("12 resolved standard inputs");

    const validate = makeIo();

    expect(
      await run(["project", "validate", target], validate.io, process.cwd()),
    ).toBe(0);
  });

  test("reports a missing file with its path", async () => {
    const target = await copyExample();

    await unlink(join(target, "claims.yaml"));

    const { io, stderr } = makeIo();

    expect(await run(["project", "validate", target], io, process.cwd())).toBe(
      1,
    );
    expect(stderr.join("")).toContain("project read error: claims.yaml");
  });

  test("reports a missing contracting authority for TH-PUB-001", async () => {
    const target = await copyExample("public-sector-synthetic");
    const path = join(target, "assessment.yaml");
    const text = await readFile(path, "utf8");

    await writeFile(
      path,
      text.replace(
        "  public_sector:\n    contracting_authority: Synthetic public authority\n    contract_reference: SYNTH-CONTRACT-001",
        "  public_sector: null",
      ),
      "utf8",
    );

    const { io, stderr } = makeIo();

    expect(await run(["project", "validate", target], io, process.cwd())).toBe(
      1,
    );
    expect(stderr.join("")).toContain("scope/public_sector");
    expect(stderr.join("")).toContain("TH-PUB-001");
  });

  test("resolves the selection and reports unassessed gates", async () => {
    const target = await copyExample();
    const { io, stdout, stderr } = makeIo();

    expect(await run(["project", "resolve", target], io, process.cwd())).toBe(
      1,
    );

    const text = stdout.join("");
    expect(text).toContain("resolved: 90 requirements (38 gates)");
    expect(text).toContain("coverage: 9 assessed, 81 not assessed");
    expect(text).toContain("unassessed gates (32):");
    expect(text).toContain("SRAS-CHG-001");
    expect(stderr).toEqual([]);
  });

  test("missing arguments are usage errors", async () => {
    const missingAction = makeIo();

    expect(await run(["project"], missingAction.io, process.cwd())).toBe(2);
    expect(missingAction.stderr.join("")).toContain(
      "missing required argument: validate|refresh|resolve",
    );

    const missingDirectory = makeIo();

    expect(
      await run(["project", "validate"], missingDirectory.io, process.cwd()),
    ).toBe(2);
    expect(missingDirectory.stderr.join("")).toContain(
      "missing required argument: <dir>",
    );
  });

  test("an unknown action is a usage error", async () => {
    const { io, stderr } = makeIo();

    expect(
      await run(["project", "check", "example-project"], io, process.cwd()),
    ).toBe(2);
    expect(stderr.join("")).toContain(
      "invalid project action: check; expected validate, refresh, or resolve",
    );
  });
});
