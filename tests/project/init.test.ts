import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { readSourceFiles } from "../../src/sras/adapters/fs.js";
import { parseYaml } from "../../src/sras/adapters/yaml.js";
import type { Result } from "../../src/sras/foundation/result.js";
import {
  planProjectInit,
  TEMPLATE_FILES,
  type InitIssue,
  type InitPlan,
} from "../../src/sras/project/init.js";
import {
  parseProjectLockFile,
  parseProjectManifestFile,
} from "../../src/sras/project/parse.js";
import { verifyProjectLock } from "../../src/sras/project/lockfile.js";
import {
  initProject,
  readStandardInputs,
} from "../../src/sras/project/workflow.js";
import type { ProjectLock } from "../../src/sras/project/types.js";
import type { SourceFile } from "../../src/sras/standard/dto.js";
import { isoDate, version } from "../../src/sras/standard/primitives.js";
import type { ProfileId } from "../../src/sras/standard/types.js";
import { VERSION } from "../../src/sras/version.js";

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

const makeTemp = async (): Promise<string> => {
  const directory = await mkdtemp(join(tmpdir(), "sras-init-"));
  temporaryDirectories.push(directory);
  return directory;
};

const date = must(isoDate("2026-10-27"));
const srasVersion = must(version(VERSION));

const loadTemplates = async (): Promise<readonly SourceFile[]> =>
  must(
    await readSourceFiles(join(process.cwd(), "templates", "project"), [
      ...TEMPLATE_FILES,
    ]),
  );

const loadStandard = async (
  profile: ProfileId,
): Promise<readonly SourceFile[]> =>
  must(await readStandardInputs(process.cwd(), profile));

const plan = async (
  projectName: string,
  profile: ProfileId,
  templates?: readonly SourceFile[],
): Promise<Result<InitPlan, readonly InitIssue[]>> =>
  planProjectInit({
    projectName,
    profile,
    date,
    srasVersion,
    templateFiles: templates ?? (await loadTemplates()),
    standardInputs: await loadStandard(profile),
  });

const generatedText = (
  files: readonly { readonly path: string; readonly text: string }[],
  path: string,
): string => {
  const file = files.find((candidate) => candidate.path === path);

  if (file === undefined) throw new Error(`missing planned file ${path}`);
  return file.text;
};

const readProjectLock = async (target: string): Promise<ProjectLock> => {
  const text = await readFile(join(target, "assurance.lock.yaml"), "utf8");
  const parsed = must(parseYaml({ path: "assurance.lock.yaml", text }));

  return must(parseProjectLockFile(parsed, "assurance.lock.yaml"));
};

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

describe("planProjectInit", () => {
  test("full profile produces a coherent plan and lockfile", async () => {
    const result = await plan("Example Project", "full");

    expect(result.ok).toBe(true);

    if (!result.ok) return;

    const assurance = generatedText(result.value.files, "assurance.yaml");
    const assessment = generatedText(result.value.files, "assessment.yaml");

    expect(assurance).toContain("name: Example Project");
    expect(assurance).toContain("profile: full");
    expect(assurance).toContain(`sras_version: ${VERSION}`);
    expect(assessment).toContain("profile: full");
    expect(assessment).toContain("index: 0.0");
    expect(assessment).not.toContain("__PROJECT_NAME__");
    expect(assessment).not.toContain("1970-01-01");
    expect(result.value.files.map((file) => file.path)).not.toContain(
      "README.md",
    );
    expect(
      verifyProjectLock(result.value.lock, await loadStandard("full")).ok,
    ).toBe(true);
  });

  test("lite profile nulls the index and pins the lite profile file", async () => {
    const result = await plan("Example Project", "lite");

    expect(result.ok).toBe(true);

    if (!result.ok) return;

    const assessment = generatedText(result.value.files, "assessment.yaml");

    expect(assessment).toContain("profile: lite");
    expect(assessment).toContain("index: null");
    expect(
      result.value.lock.inputs.some(
        (input) => input.path === "core/profiles/lite.yaml",
      ),
    ).toBe(true);
  });

  test("an unsafe project name is rejected", async () => {
    const result = await plan("Bad: Name", "full");

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "InvalidProjectName",
        value: "Bad: Name",
      });
    }
  });

  test("a missing template file is rejected", async () => {
    const templates = (await loadTemplates()).filter(
      (file) => file.path !== "assessment.yaml",
    );
    const result = await plan("Example Project", "full", templates);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "MissingTemplateFile",
        path: "assessment.yaml",
      });
    }
  });

  test("an unexpected template file is rejected", async () => {
    const templates = [
      ...(await loadTemplates()),
      { path: "extra.yaml", text: "extra: true\n" },
    ];
    const result = await plan("Example Project", "full", templates);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "UnexpectedTemplateFile",
        path: "extra.yaml",
      });
    }
  });

  test("an unreplaced template marker is rejected", async () => {
    const templates = (await loadTemplates()).map((file) =>
      file.path === "assurance.yaml"
        ? { ...file, text: `${file.text}marker: __UNKNOWN__\n` }
        : file,
    );
    const result = await plan("Example Project", "full", templates);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "TemplateMarker",
        file: "assurance.yaml",
        marker: "__UNKNOWN__",
      });
    }
  });
});

describe("initProject", () => {
  test("creates a full-profile instance with a valid lockfile", async () => {
    const temp = await makeTemp();
    const target = join(temp, "full-project");
    const result = await initProject({
      root: process.cwd(),
      target,
      profile: "full",
      date,
    });

    expect(result.ok).toBe(true);

    if (!result.ok) return;

    const manifestText = await readFile(join(target, "assurance.yaml"), "utf8");
    const manifest = must(
      parseProjectManifestFile(
        must(parseYaml({ path: "assurance.yaml", text: manifestText })),
        "assurance.yaml",
      ),
    );

    expect(manifest.profile).toBe("full");
    expect(manifest.project.name).toBe("full-project");
    expect(manifest.srasVersion).toBe(VERSION);

    const lock = await readProjectLock(target);

    expect(verifyProjectLock(lock, await loadStandard("full")).ok).toBe(true);
    expect((await readdir(target)).sort()).toEqual([
      "README.md",
      "assessment.yaml",
      "assurance.lock.yaml",
      "assurance.yaml",
      "claims.yaml",
      "evidence-index.yaml",
      "risk-register.yaml",
    ]);
  });

  test("creates a lite-profile instance", async () => {
    const temp = await makeTemp();
    const target = join(temp, "lite-project");
    const result = await initProject({
      root: process.cwd(),
      target,
      profile: "lite",
      date,
    });

    expect(result.ok).toBe(true);

    const assessment = await readFile(join(target, "assessment.yaml"), "utf8");

    expect(assessment).toContain("profile: lite");
    expect(assessment).toContain("index: null");
  });

  test("refuses a non-empty directory without changing it", async () => {
    const temp = await makeTemp();
    const target = join(temp, "non-empty");
    await mkdir(target);
    await writeFile(join(target, "keep.txt"), "keep\n", "utf8");
    const result = await initProject({
      root: process.cwd(),
      target,
      profile: "full",
      date,
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error.tag).toBe("TargetNotEmpty");
    }

    expect(await readdir(target)).toEqual(["keep.txt"]);
    expect(await readFile(join(target, "keep.txt"), "utf8")).toBe("keep\n");
  });

  test("rejects a traversal target and writes nothing outside it", async () => {
    const temp = await makeTemp();
    const escaped = `${temp}/nested/../escaped`;
    const result = await initProject({
      root: process.cwd(),
      target: escaped,
      profile: "full",
      date,
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error.tag).toBe("PathTraversal");
    }

    expect(await exists(join(temp, "escaped"))).toBe(false);
  });

  test("accepts an existing empty directory", async () => {
    const temp = await makeTemp();
    const target = join(temp, "empty");
    await mkdir(target);
    const result = await initProject({
      root: process.cwd(),
      target,
      profile: "full",
      date,
    });

    expect(result.ok).toBe(true);
  });

  test("the lockfile is reproducible across target directories", async () => {
    const temp = await makeTemp();
    const first = join(temp, "first-project");
    const second = join(temp, "second-project");
    const firstResult = await initProject({
      root: process.cwd(),
      target: first,
      profile: "full",
      date,
    });
    const secondResult = await initProject({
      root: process.cwd(),
      target: second,
      profile: "full",
      date,
    });

    expect(firstResult.ok).toBe(true);
    expect(secondResult.ok).toBe(true);

    const firstLock = await readFile(
      join(first, "assurance.lock.yaml"),
      "utf8",
    );
    const secondLock = await readFile(
      join(second, "assurance.lock.yaml"),
      "utf8",
    );

    expect(firstLock).toBe(secondLock);
  });
});
