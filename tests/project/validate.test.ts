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
import { validateProject } from "../../src/sras/project/validate.js";
import { isoDate } from "../../src/sras/standard/primitives.js";

const directory = join(process.cwd(), "examples", "e2e-project");

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const readYaml = (file: string): unknown =>
  parse(readFileSync(join(directory, file), "utf8"));

const loadInstance = (evidence: unknown): ProjectInstance => ({
  manifest: must(
    parseProjectManifestFile(readYaml("assurance.yaml"), "assurance.yaml"),
  ),
  assessment: must(
    parseAssessmentFile(readYaml("assessment.yaml"), "assessment.yaml"),
  ),
  evidence: must(parseEvidenceIndexFile(evidence, "evidence-index.yaml")),
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

describe("validateProject freshness", () => {
  test("accepts an instance whose evidence is current on the assessment date", () => {
    const instance = loadInstance(readYaml("evidence-index.yaml"));

    expect(validateProject(instance).ok).toBe(true);
  });

  test("rejects evidence declared current after its expiry date", () => {
    const instance = loadInstance(readYaml("evidence-index.yaml"));
    const first = instance.evidence.entries[0];

    if (first === undefined) throw new Error("fixture has no evidence entry");

    const mutated: EvidenceEntry = {
      ...first,
      collectedAt: must(isoDate("2019-01-01")),
      expiresAt: must(isoDate("2020-01-01")),
      freshness: "current",
    };
    const result = validateProject({
      ...instance,
      evidence: {
        ...instance.evidence,
        entries: [mutated, ...instance.evidence.entries.slice(1)],
      },
    });

    expect(result.ok).toBe(false);

    if (result.ok) return;

    expect(
      result.error.some(
        (issue) =>
          issue.tag === "Mismatch" &&
          issue.file === "evidence-index.yaml" &&
          issue.field === `entries/${first.id}/freshness_status`,
      ),
    ).toBe(true);
  });
});
