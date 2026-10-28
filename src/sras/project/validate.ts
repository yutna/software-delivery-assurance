import { err, ok, type Result } from "../foundation/result.js";
import type { Requirement } from "../standard/types.js";
import type {
  EvidenceEntry,
  ProjectInstance,
  ProjectIssue,
  ProjectWarning,
  SignoffField,
  ValidatedProject,
} from "./types.js";

const sameSet = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length && left.every((value) => right.includes(value));

const missingReference = (
  issues: ProjectIssue[],
  file: string,
  from: string,
  to: string,
  relation: string,
): void => {
  issues.push({ tag: "MissingReference", file, from, to, relation });
};

const mismatch = (
  issues: ProjectIssue[],
  file: string,
  field: string,
  expected: string,
  actual: string,
): void => {
  issues.push({ tag: "Mismatch", file, field, expected, actual });
};

const compareIdentity = (
  issues: ProjectIssue[],
  file: string,
  expected: ProjectInstance["manifest"]["project"],
  actual: ProjectInstance["assessment"]["project"],
): void => {
  if (expected.name !== actual.name) {
    mismatch(issues, file, "project/name", expected.name, actual.name);
  }

  if (expected.description !== actual.description) {
    mismatch(
      issues,
      file,
      "project/description",
      expected.description,
      actual.description,
    );
  }

  if (expected.owner !== actual.owner) {
    mismatch(issues, file, "project/owner", expected.owner, actual.owner);
  }

  if (expected.confidentiality !== actual.confidentiality) {
    mismatch(
      issues,
      file,
      "project/confidentiality",
      expected.confidentiality,
      actual.confidentiality,
    );
  }
};

const compareSelection = (
  issues: ProjectIssue[],
  instance: ProjectInstance,
): void => {
  const { manifest, assessment, lock } = instance;
  const file = assessment.sourceFile;

  if (manifest.srasVersion !== assessment.srasVersion) {
    mismatch(
      issues,
      file,
      "sras_version",
      manifest.srasVersion,
      assessment.srasVersion,
    );
  }

  if (lock.sras.version !== manifest.srasVersion) {
    mismatch(
      issues,
      lock.sourceFile,
      "sras/version",
      manifest.srasVersion,
      lock.sras.version,
    );
  }

  if (manifest.profile !== assessment.profile) {
    mismatch(issues, file, "profile", manifest.profile, assessment.profile);
  }

  if (manifest.tier !== assessment.tier) {
    mismatch(
      issues,
      file,
      "tier",
      String(manifest.tier),
      String(assessment.tier),
    );
  }

  if (!sameSet(manifest.modules, assessment.modules)) {
    mismatch(
      issues,
      file,
      "modules",
      manifest.modules.join(", "),
      assessment.modules.join(", "),
    );
  }

  if (!sameSet(manifest.overlays, assessment.overlays)) {
    mismatch(
      issues,
      file,
      "overlays",
      manifest.overlays.join(", "),
      assessment.overlays.join(", "),
    );
  }

  if (
    !sameSet(
      manifest.modules,
      lock.modules.map((module) => module.id),
    )
  ) {
    mismatch(
      issues,
      lock.sourceFile,
      "modules",
      manifest.modules.join(", "),
      lock.modules.map((module) => module.id).join(", "),
    );
  }

  if (
    !sameSet(
      manifest.overlays,
      lock.overlays.map((overlay) => overlay.id),
    )
  ) {
    mismatch(
      issues,
      lock.sourceFile,
      "overlays",
      manifest.overlays.join(", "),
      lock.overlays.map((overlay) => overlay.id).join(", "),
    );
  }
};

const compareFreshness = (
  issues: ProjectIssue[],
  instance: ProjectInstance,
): void => {
  const { assessment, evidence } = instance;

  for (const entry of evidence.entries) {
    if (entry.freshness !== "current") continue;
    if (entry.expiresAt >= assessment.assessedAt) continue;

    mismatch(
      issues,
      evidence.sourceFile,
      `entries/${entry.id}/freshness_status`,
      `current evidence on ${assessment.assessedAt}`,
      `expires_at ${entry.expiresAt}`,
    );
  }
};

const compareEvidence = (
  issues: ProjectIssue[],
  instance: ProjectInstance,
): void => {
  const assessed = new Set<string>(
    instance.assessment.requirements.map((requirement) => requirement.id),
  );
  const evidence = new Set<string>(
    instance.evidence.entries.map((entry) => entry.id),
  );

  for (const requirement of instance.assessment.requirements) {
    for (const reference of requirement.evidenceRefs) {
      if (!evidence.has(reference)) {
        missingReference(
          issues,
          instance.assessment.sourceFile,
          requirement.id,
          reference,
          "evidence",
        );
      }
    }
  }

  for (const entry of instance.evidence.entries) {
    for (const reference of entry.requirementIds) {
      if (!assessed.has(reference)) {
        missingReference(
          issues,
          instance.evidence.sourceFile,
          entry.id,
          reference,
          "assessed requirement",
        );
      }
    }
  }
};

/**
 * A `verified` requirement claims that its evidence set is complete. This
 * rule compares the evidence types the requirement expects with the types
 * linked from the assessment. It does not judge evidence quality or freshness;
 * freshness is a separate rule.
 */
export const validateEvidenceTypeCoverage = (
  instance: ProjectInstance,
  requirements: readonly Requirement[],
): readonly ProjectIssue[] => {
  const issues: ProjectIssue[] = [];
  const evidenceById = new Map(
    instance.evidence.entries.map((entry) => [entry.id, entry]),
  );
  const requirementById = new Map(
    requirements.map((requirement) => [requirement.id, requirement]),
  );

  for (const assessed of instance.assessment.requirements) {
    if (assessed.status !== "verified") continue;

    const requirement = requirementById.get(assessed.id);
    if (requirement === undefined) continue;

    const found = [
      ...new Set(
        assessed.evidenceRefs
          .map((reference) => evidenceById.get(reference))
          .filter((entry): entry is EvidenceEntry => entry !== undefined)
          .map((entry) => entry.type),
      ),
    ];

    for (const expectation of requirement.evidence) {
      if (found.includes(expectation.type)) continue;

      issues.push({
        tag: "MissingEvidenceType",
        file: instance.assessment.sourceFile,
        requirement: assessed.id,
        expected: expectation.type,
        found,
      });
    }
  }

  return issues;
};

const compareClaims = (
  issues: ProjectIssue[],
  instance: ProjectInstance,
): void => {
  const evidenceById = new Map(
    instance.evidence.entries.map((entry) => [entry.id, entry]),
  );

  for (const claim of instance.claims.claims) {
    for (const reference of claim.evidenceIds) {
      const entry = evidenceById.get(reference);

      if (entry === undefined) {
        missingReference(
          issues,
          instance.claims.sourceFile,
          claim.id,
          reference,
          "evidence",
        );
        continue;
      }

      if (
        (claim.status === "verified" || claim.status === "partial") &&
        entry.freshness !== "current"
      ) {
        mismatch(
          issues,
          instance.claims.sourceFile,
          `claims/${claim.id}/evidence_ids/${reference}`,
          "current evidence",
          entry.freshness,
        );
      }
    }
  }
};

const PUBLIC_SECTOR_OVERLAY = "TH-PUB";
const CONTRACTING_AUTHORITY_REQUIREMENT = "TH-PUB-001";

const comparePublicSectorScope = (
  issues: ProjectIssue[],
  instance: ProjectInstance,
): void => {
  const { assessment } = instance;

  if (!assessment.overlays.some((id) => id === PUBLIC_SECTOR_OVERLAY)) return;

  const requirement = assessment.requirements.find(
    (candidate) => candidate.id === CONTRACTING_AUTHORITY_REQUIREMENT,
  );

  if (requirement === undefined) return;
  if (
    requirement.status === "not_assessed" ||
    requirement.status === "not_applicable"
  ) {
    return;
  }

  if (assessment.scope.publicSector !== null) return;

  issues.push({
    tag: "MissingField",
    file: assessment.sourceFile,
    field: "scope/public_sector",
    message: `an assessed ${CONTRACTING_AUTHORITY_REQUIREMENT} requires scope.public_sector with contracting_authority and contract_reference`,
  });
};

const compareRisks = (
  issues: ProjectIssue[],
  instance: ProjectInstance,
): void => {
  const assessed = new Set<string>(
    instance.assessment.requirements.map((requirement) => requirement.id),
  );

  for (const risk of instance.risks.risks) {
    for (const reference of risk.requirementIds) {
      if (!assessed.has(reference)) {
        missingReference(
          issues,
          instance.risks.sourceFile,
          risk.id,
          reference,
          "assessed requirement",
        );
      }
    }
  }
};

export const SIGNOFF_PLACEHOLDER = "Not signed";

const isUnsigned = (value: string): boolean =>
  value.trim().toLowerCase() === SIGNOFF_PLACEHOLDER.toLowerCase();

export const projectWarnings = (
  instance: ProjectInstance,
): readonly ProjectWarning[] => {
  const { signoff, sourceFile } = instance.assessment;
  const fields: SignoffField[] = [];

  if (isUnsigned(signoff.name)) fields.push("signoff.name");
  if (isUnsigned(signoff.role)) fields.push("signoff.role");

  return fields.length === 0
    ? []
    : [{ tag: "UnsignedSignoff", file: sourceFile, fields }];
};

export const validateProject = (
  instance: ProjectInstance,
): Result<ValidatedProject, readonly ProjectIssue[]> => {
  const issues: ProjectIssue[] = [];

  compareIdentity(
    issues,
    instance.assessment.sourceFile,
    instance.manifest.project,
    instance.assessment.project,
  );
  compareSelection(issues, instance);
  compareFreshness(issues, instance);
  compareEvidence(issues, instance);
  compareClaims(issues, instance);
  comparePublicSectorScope(issues, instance);
  compareRisks(issues, instance);

  if (issues.length > 0) return err(issues);

  const validated = instance as ValidatedProject; // fds-allow-as: checked brand cast
  return ok(validated);
};
