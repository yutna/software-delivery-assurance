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
import type {
  Assessment,
  AssessedRequirement,
  ProjectInstance,
} from "../../src/sras/project/types.js";
import { validateProject } from "../../src/sras/project/validate.js";

const directory = join(process.cwd(), "examples", "public-sector-synthetic");

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const readYaml = (file: string): unknown =>
  parse(readFileSync(join(directory, file), "utf8"));

const loadAssessment = (): Assessment =>
  must(parseAssessmentFile(readYaml("assessment.yaml"), "assessment.yaml"));

const loadInstance = (assessment: Assessment): ProjectInstance => ({
  manifest: must(
    parseProjectManifestFile(readYaml("assurance.yaml"), "assurance.yaml"),
  ),
  assessment,
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

const withRequirementStatus = (
  assessment: Assessment,
  status: AssessedRequirement["status"],
): Assessment => ({
  ...assessment,
  requirements: assessment.requirements.map((requirement) =>
    requirement.id === "TH-PUB-001" ? { ...requirement, status } : requirement,
  ),
});

describe("public sector scope", () => {
  test("the public sector example records a synthetic contracting authority", () => {
    const assessment = loadAssessment();

    expect(assessment.scope.publicSector).toEqual({
      contractingAuthority: "Synthetic public authority",
      contractReference: "SYNTH-CONTRACT-001",
    });
    expect(validateProject(loadInstance(assessment)).ok).toBe(true);
  });

  test("an assessed TH-PUB-001 without a contracting authority is reported", () => {
    const assessment = loadAssessment();
    const withoutScope: Assessment = {
      ...assessment,
      scope: { ...assessment.scope, publicSector: null },
    };
    const result = validateProject(loadInstance(withoutScope));

    expect(result.ok).toBe(false);

    if (result.ok) return;

    expect(result.error).toContainEqual({
      tag: "MissingField",
      file: "assessment.yaml",
      field: "scope/public_sector",
      message:
        "an assessed TH-PUB-001 requires scope.public_sector with contracting_authority and contract_reference",
    });
  });

  test("a not_applicable TH-PUB-001 does not require the field", () => {
    const assessment = loadAssessment();
    const withoutScope: Assessment = {
      ...withRequirementStatus(assessment, "not_applicable"),
      scope: { ...assessment.scope, publicSector: null },
    };

    expect(validateProject(loadInstance(withoutScope)).ok).toBe(true);
  });
});
