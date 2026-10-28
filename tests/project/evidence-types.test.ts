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
  EvidenceEntry,
  ProjectInstance,
} from "../../src/sras/project/types.js";
import { validateEvidenceTypeCoverage } from "../../src/sras/project/validate.js";
import type { Requirement } from "../../src/sras/standard/types.js";
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

const loadRequirements = async (): Promise<readonly Requirement[]> => {
  const loaded = must(await loadStandardFromRoot(process.cwd()));

  return [
    ...loaded.standard.requirements,
    ...loaded.standard.modules.flatMap((module) => module.requirements),
    ...loaded.standard.overlays.flatMap((overlay) => overlay.adds),
  ];
};

const withEvidenceType = (
  instance: ProjectInstance,
  evidenceId: string,
  type: EvidenceEntry["type"],
): ProjectInstance => ({
  ...instance,
  evidence: {
    ...instance.evidence,
    entries: instance.evidence.entries.map((entry) =>
      entry.id === evidenceId ? { ...entry, type } : entry,
    ),
  },
});

describe("validateEvidenceTypeCoverage", () => {
  test("accepts a verified requirement whose evidence covers every expected type", async () => {
    const instance = loadInstance();
    const requirements = await loadRequirements();

    expect(validateEvidenceTypeCoverage(instance, requirements)).toEqual([]);
  });

  test("reports a missing expected type for a verified requirement", async () => {
    const instance = withEvidenceType(loadInstance(), "EV-E2E-003", "report");
    const requirements = await loadRequirements();

    const issues = validateEvidenceTypeCoverage(instance, requirements);

    expect(issues).toEqual([
      {
        tag: "MissingEvidenceType",
        file: "assessment.yaml",
        requirement: "SRAS-SEC-001",
        expected: "test_result",
        found: ["configuration", "report"],
      },
    ]);
  });

  test("does not treat a different type as a substitute", async () => {
    const instance = withEvidenceType(loadInstance(), "EV-E2E-002", "report");
    const requirements = await loadRequirements();

    const issues = validateEvidenceTypeCoverage(instance, requirements);

    expect(
      issues.some(
        (issue) =>
          issue.tag === "MissingEvidenceType" &&
          issue.requirement === "SRAS-SEC-001" &&
          issue.expected === "configuration",
      ),
    ).toBe(true);
  });

  test("does not require complete types for a partial requirement", async () => {
    const instance = loadInstance();
    const requirements = await loadRequirements();
    const partial: ProjectInstance = {
      ...instance,
      assessment: {
        ...instance.assessment,
        requirements: instance.assessment.requirements.map((requirement) =>
          requirement.id === "SRAS-SEC-001"
            ? { ...requirement, status: "partial" }
            : requirement,
        ),
      },
    };

    expect(validateEvidenceTypeCoverage(partial, requirements)).toEqual([]);
  });
});
