import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "../../src/sras/project/parse.js";
import { resolveProject } from "../../src/sras/project/resolution.js";
import type {
  AssessedRequirement,
  ProjectInstance,
} from "../../src/sras/project/types.js";
import {
  overlayRequirementId,
  requirementId,
} from "../../src/sras/standard/ids.js";
import type { ValidatedStandard } from "../../src/sras/standard/types.js";
import { loadStandardFromRoot } from "../../src/sras/standard/workflow.js";

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

const loadStandard = async (): Promise<ValidatedStandard> =>
  must(await loadStandardFromRoot(process.cwd())).standard;

const withRequirement = (
  instance: ProjectInstance,
  requirement: AssessedRequirement,
): ProjectInstance => ({
  ...instance,
  assessment: {
    ...instance.assessment,
    requirements: [...instance.assessment.requirements, requirement],
  },
});

const assessedId = (value: string): AssessedRequirement["id"] => {
  const overlay = overlayRequirementId(value);
  if (overlay.ok) return overlay.value;

  const core = requirementId(value);
  if (core.ok) return core.value;

  throw new Error(`unknown requirement ID: ${value}`);
};

describe("resolveProject", () => {
  test("resolves the selection in layer order and reports coverage", async () => {
    const resolution = must(
      resolveProject(loadInstance(), await loadStandard()),
    );

    expect(resolution.profile).toBe("full");
    expect(resolution.tier).toBe(2);
    expect(resolution.modules).toEqual(["SRAS-AI"]);
    expect(resolution.overlays).toEqual(["TH-FIN"]);
    expect(resolution.requirements[0]?.layer).toBe("core");
    expect(resolution.requirements.at(-1)?.layer).toBe("industry");
    expect(resolution.coverage.resolved).toBe(90);
    expect(resolution.coverage.gates).toBe(38);
    expect(resolution.coverage.assessed).toBe(9);
    expect(resolution.coverage.notAssessed).toBe(81);
    expect(resolution.coverage.missingRecords).toBe(81);
    expect(resolution.coverage.unassessedGates).toHaveLength(32);
  });

  test("lists a missing gate without an assessment record", async () => {
    const resolution = must(
      resolveProject(loadInstance(), await loadStandard()),
    );
    const gate = resolution.coverage.unassessedGates[0];

    expect(gate).toBeDefined();
    expect(gate?.status).toBe("missing");
  });

  test("does not treat a gate as unassessed when it is not applicable", async () => {
    const instance = loadInstance();
    const resolution = must(resolveProject(instance, await loadStandard()));
    const gate = resolution.coverage.unassessedGates[0];

    if (gate === undefined) throw new Error("fixture has no unassessed gate");

    const next = must(
      resolveProject(
        withRequirement(instance, {
          id: assessedId(gate.id),
          status: "not_applicable",
          maturity: "L0",
          evidenceRefs: [],
          notes: "Not applicable to the synthetic scope.",
          gapOwner: null,
          dueDate: null,
        }),
        await loadStandard(),
      ),
    );

    expect(next.coverage.notApplicable).toBe(1);
    expect(
      next.coverage.unassessedGates.some(
        (candidate) => candidate.id === gate.id,
      ),
    ).toBe(false);
  });

  test("lists a gate recorded as not assessed", async () => {
    const instance = loadInstance();
    const resolution = must(resolveProject(instance, await loadStandard()));
    const gate = resolution.coverage.unassessedGates[0];

    if (gate === undefined) throw new Error("fixture has no unassessed gate");

    const next = must(
      resolveProject(
        withRequirement(instance, {
          id: assessedId(gate.id),
          status: "not_assessed",
          maturity: "L0",
          evidenceRefs: [],
          notes: "Not assessed yet.",
          gapOwner: null,
          dueDate: null,
        }),
        await loadStandard(),
      ),
    );

    expect(
      next.coverage.unassessedGates.some(
        (candidate) =>
          candidate.id === gate.id && candidate.status === "not_assessed",
      ),
    ).toBe(true);
  });
});
