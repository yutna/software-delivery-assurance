import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import { evidenceId } from "../../src/sras/project/ids.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "../../src/sras/project/parse.js";
import type {
  ProjectInstance,
  ProjectIssue,
} from "../../src/sras/project/types.js";
import { validateProject } from "../../src/sras/project/validate.js";

const fixtures = join(process.cwd(), "tests", "fixtures", "project");

const readFixture = (path: string): unknown =>
  parse(readFileSync(join(fixtures, path), "utf8"));

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const tags = (issues: readonly ProjectIssue[]): readonly string[] =>
  issues.map((issue) => issue.tag);

const loadInstance = (): ProjectInstance => ({
  manifest: must(
    parseProjectManifestFile(
      readFixture("valid/project-manifest.yaml"),
      "assurance.yaml",
    ),
  ),
  assessment: must(
    parseAssessmentFile(
      readFixture("valid/assessment.yaml"),
      "assessment.yaml",
    ),
  ),
  evidence: must(
    parseEvidenceIndexFile(
      readFixture("valid/evidence-index.yaml"),
      "evidence-index.yaml",
    ),
  ),
  claims: must(
    parseClaimRegisterFile(readFixture("valid/claims.yaml"), "claims.yaml"),
  ),
  risks: must(
    parseRiskRegisterFile(
      readFixture("valid/risk-register.yaml"),
      "risk-register.yaml",
    ),
  ),
  lock: must(
    parseProjectLockFile(
      readFixture("valid/project-lock.yaml"),
      "assurance.lock.yaml",
    ),
  ),
});

describe("project parsers", () => {
  test("the valid project manifest parses", () => {
    const manifest = must(
      parseProjectManifestFile(
        readFixture("valid/project-manifest.yaml"),
        "assurance.yaml",
      ),
    );

    expect(manifest.tag).toBe("ProjectManifest");
    expect(manifest.project.confidentiality).toBe("synthetic");
    expect(manifest.modules).toEqual(["SRAS-AI"]);
    expect(manifest.overlays).toEqual(["TH-FIN"]);
  });

  test("the valid assessment parses and keeps profile rules", () => {
    const assessment = must(
      parseAssessmentFile(
        readFixture("valid/assessment.yaml"),
        "assessment.yaml",
      ),
    );

    expect(assessment.profile).toBe("full");
    expect(assessment.requirements).toHaveLength(1);
    expect(assessment.requirements[0]?.maturity).toBe("L3");
    expect(assessment.summary.counts.verified).toBe(1);
    expect(assessment.summary.index).toBe(0.9);
  });

  test("the valid evidence, claims, risks, and lockfile parse", () => {
    const evidence = must(
      parseEvidenceIndexFile(
        readFixture("valid/evidence-index.yaml"),
        "evidence-index.yaml",
      ),
    );
    const claims = must(
      parseClaimRegisterFile(readFixture("valid/claims.yaml"), "claims.yaml"),
    );
    const risks = must(
      parseRiskRegisterFile(
        readFixture("valid/risk-register.yaml"),
        "risk-register.yaml",
      ),
    );
    const lock = must(
      parseProjectLockFile(
        readFixture("valid/project-lock.yaml"),
        "assurance.lock.yaml",
      ),
    );

    expect(evidence.entries[0]?.id).toBe("EV-SYN-001");
    expect(claims.claims[0]?.status).toBe("verified");
    expect(risks.risks[0]?.acceptanceId).toBe("ACC-SYN-001");
    expect(lock.inputs.map((input) => input.path)).toEqual([
      "core/sras.yaml",
      "modules/ai/module.yaml",
    ]);
  });

  test("a full-profile requirement without maturity is rejected", () => {
    const result = parseAssessmentFile(
      readFixture("invalid/assessment-maturity-null-full.yaml"),
      "assessment.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(tags(result.error)).toContain("Parse");
      expect(
        result.error.some(
          (issue) =>
            issue.tag === "Parse" && issue.message.includes("maturity"),
        ),
      ).toBe(true);
    }
  });

  test("declared counts must match the assessed requirements", () => {
    const result = parseAssessmentFile(
      readFixture("invalid/assessment-count-mismatch.yaml"),
      "assessment.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "CountMismatch",
        file: "assessment.yaml",
        status: "verified",
        declared: 2,
        actual: 1,
      });
    }
  });

  test("duplicate assessed requirement IDs are rejected", () => {
    const result = parseAssessmentFile(
      readFixture("invalid/assessment-duplicate-requirement.yaml"),
      "assessment.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "DuplicateId",
        file: "assessment.yaml",
        family: "RequirementId",
        id: "SRAS-GOV-001",
      });
    }
  });

  test("an evidence URL is not a private reference", () => {
    const result = parseEvidenceIndexFile(
      readFixture("invalid/evidence-url-location.yaml"),
      "evidence-index.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(
        result.error.some(
          (issue) =>
            issue.tag === "Parse" &&
            issue.path.endsWith("/location") &&
            issue.message.includes("not a URL"),
        ),
      ).toBe(true);
    }
  });

  test("a verified claim without approval is rejected", () => {
    const result = parseClaimRegisterFile(
      readFixture("invalid/claim-approved-missing.yaml"),
      "claims.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(
        result.error.some(
          (issue) =>
            issue.tag === "Parse" &&
            issue.path.endsWith("/approved_by") &&
            issue.message.includes("requires an approver"),
        ),
      ).toBe(true);
    }
  });

  test("an accepted risk without an acceptance ID is rejected", () => {
    const result = parseRiskRegisterFile(
      readFixture("invalid/risk-accepted-no-acceptance.yaml"),
      "risk-register.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(
        result.error.some(
          (issue) =>
            issue.tag === "Parse" &&
            issue.path.endsWith("/acceptance_id") &&
            issue.message.includes("requires an acceptance id"),
        ),
      ).toBe(true);
    }
  });

  test("unsorted lockfile inputs are rejected", () => {
    const result = parseProjectLockFile(
      readFixture("invalid/project-lock-unsorted-inputs.yaml"),
      "assurance.lock.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "Lockfile",
        file: "assurance.lock.yaml",
        message: "inputs must be sorted by path",
      });
    }
  });

  test("a malformed lockfile checksum is rejected", () => {
    const result = parseProjectLockFile(
      readFixture("invalid/project-lock-bad-checksum.yaml"),
      "assurance.lock.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(
        result.error.some(
          (issue) =>
            issue.tag === "Parse" &&
            issue.path.endsWith("/checksum") &&
            issue.message.includes("invalid checksum"),
        ),
      ).toBe(true);
    }
  });

  test("an invalid tier is rejected", () => {
    const result = parseProjectManifestFile(
      readFixture("invalid/project-manifest-bad-tier.yaml"),
      "assurance.yaml",
    );

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(
        result.error.some(
          (issue) => issue.tag === "Parse" && issue.path.endsWith("/tier"),
        ),
      ).toBe(true);
    }
  });
});

describe("project cross-document validation", () => {
  test("the valid instance passes", () => {
    const validated = must(validateProject(loadInstance()));

    expect(validated.manifest.tag).toBe("ProjectManifest");
  });

  test("a selection mismatch is reported", () => {
    const instance = loadInstance();
    const broken: ProjectInstance = {
      ...instance,
      assessment: { ...instance.assessment, modules: [] },
    };
    const result = validateProject(broken);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "Mismatch",
        file: "assessment.yaml",
        field: "modules",
        expected: "SRAS-AI",
        actual: "",
      });
    }
  });

  test("an evidence reference outside the index is reported", () => {
    const instance = loadInstance();
    const missing = must(evidenceId("EV-SYN-999"));
    const first = instance.assessment.requirements[0];
    const broken: ProjectInstance = {
      ...instance,
      assessment: {
        ...instance.assessment,
        requirements:
          first === undefined ? [] : [{ ...first, evidenceRefs: [missing] }],
      },
    };
    const result = validateProject(broken);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toContainEqual({
        tag: "MissingReference",
        file: "assessment.yaml",
        from: "SRAS-GOV-001",
        to: "EV-SYN-999",
        relation: "evidence",
      });
    }
  });

  test("a verified claim backed by expired evidence is reported", () => {
    const instance = loadInstance();
    const broken: ProjectInstance = {
      ...instance,
      evidence: {
        ...instance.evidence,
        entries: instance.evidence.entries.map((entry) => ({
          ...entry,
          freshness: "expired" as const,
        })),
      },
    };
    const result = validateProject(broken);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(
        result.error.some(
          (issue) =>
            issue.tag === "Mismatch" &&
            issue.field.includes("CLM-SYN-001") &&
            issue.actual === "expired",
        ),
      ).toBe(true);
    }
  });
});
