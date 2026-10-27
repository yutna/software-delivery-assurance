import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Output } from "../../src/sras/adapters/output.js";
import { run } from "../../src/sras/cli/run.js";
import type { Result } from "../../src/sras/foundation/result.js";
import {
  createProjectLock,
  verifyProjectLock,
} from "../../src/sras/project/lockfile.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "../../src/sras/project/parse.js";
import type { ProjectInstance } from "../../src/sras/project/types.js";
import { validateProject } from "../../src/sras/project/validate.js";
import { renderProjectReadme } from "../../src/sras/render/markdown.js";
import { loadStandardFromRoot } from "../../src/sras/standard/workflow.js";
import type { SourceFile } from "../../src/sras/standard/dto.js";
import { VERSION } from "../../src/sras/version.js";

const directory = join(process.cwd(), "examples", "e2e-project");

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const readYaml = (file: string): unknown =>
  parse(readFileSync(join(directory, file), "utf8"));

const loadInstance = (): ProjectInstance => ({
  manifest: must(
    parseProjectManifestFile(readYaml("assurance.yaml"), "assurance.yaml"),
  ),
  assessment: must(
    parseAssessmentFile(readYaml("assessment.yaml"), "assessment.yaml"),
  ),
  evidence: must(
    parseEvidenceIndexFile(
      readYaml("evidence-index.yaml"),
      "evidence-index.yaml",
    ),
  ),
  claims: must(parseClaimRegisterFile(readYaml("claims.yaml"), "claims.yaml")),
  risks: must(
    parseRiskRegisterFile(readYaml("risk-register.yaml"), "risk-register.yaml"),
  ),
  lock: must(
    parseProjectLockFile(
      readYaml("assurance.lock.yaml"),
      "assurance.lock.yaml",
    ),
  ),
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

const selectedInputs = (instance: ProjectInstance): readonly SourceFile[] =>
  instance.lock.inputs.map((input) => ({
    path: input.path,
    text: readFileSync(join(process.cwd(), input.path), "utf8"),
  }));

describe("e2e project fixture", () => {
  test("is a coherent Core plus AI plus finance project", async () => {
    const standard = must(await loadStandardFromRoot(process.cwd()));
    const instance = loadInstance();
    const validated = validateProject(instance);

    expect(validated.ok).toBe(true);
    expect(instance.manifest.srasVersion).toBe(VERSION);
    expect(instance.manifest.profile).toBe("full");
    expect(instance.manifest.modules).toEqual(["SRAS-AI"]);
    expect(instance.manifest.overlays).toEqual(["TH-FIN"]);
    expect(instance.assessment.requirements).toHaveLength(10);

    const known = new Set<string>();

    for (const requirement of standard.standard.requirements) {
      known.add(requirement.id);
    }

    for (const module of standard.standard.modules) {
      for (const requirement of module.requirements) known.add(requirement.id);
    }

    for (const overlay of standard.standard.overlays) {
      for (const requirement of overlay.adds) known.add(requirement.id);
    }

    for (const requirement of instance.assessment.requirements) {
      expect(known.has(requirement.id), requirement.id).toBe(true);
    }

    for (const entry of instance.evidence.entries) {
      expect(
        existsSync(join(directory, entry.location)),
        `${entry.id}: ${entry.location}`,
      ).toBe(true);
    }
  });

  test("the lockfile is reproducible and pins the resolved inputs", () => {
    const instance = loadInstance();
    const inputs = selectedInputs(instance);

    expect(instance.lock.inputs).toHaveLength(11);
    expect(instance.lock.inputs.map((input) => input.path)).toEqual(
      [...instance.lock.inputs.map((input) => input.path)].sort(),
    );

    const verified = verifyProjectLock(instance.lock, inputs);

    expect(verified.ok).toBe(true);

    const recreated = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion: instance.lock.sras.version,
        modules: instance.lock.modules,
        overlays: instance.lock.overlays,
        inputs,
      }),
    );

    expect(recreated.sras.checksum).toBe(instance.lock.sras.checksum);
    expect(recreated.inputs).toEqual(instance.lock.inputs);
  });

  test("the project README matches the renderer output", () => {
    const instance = loadInstance();
    const readme = readFileSync(join(directory, "README.md"), "utf8");

    expect(renderProjectReadme(instance)).toBe(readme);
  });

  test("validate --all, render --check, and guard pass", async () => {
    const validate = makeIo();
    const render = makeIo();
    const guard = makeIo();

    expect(await run(["validate", "--all"], validate.io, process.cwd())).toBe(
      0,
    );
    expect(validate.stdout.join("")).toContain("validated");
    expect(await run(["render", "--check"], render.io, process.cwd())).toBe(0);
    expect(render.stdout.join("")).toContain("render check passed");
    expect(await run(["guard"], guard.io, process.cwd())).toBe(0);
    expect(guard.stdout.join("")).toContain("guard passed");
  });
});
