import { err, ok, type Result } from "../foundation/result.js";
import type { DtoObject } from "../standard/dto.js";
import {
  moduleId,
  overlayId,
  overlayRequirementId,
  requirementId,
  type ModuleId,
  type OverlayId,
} from "../standard/ids.js";
import {
  isoDate,
  version,
  type IsoDate,
  type Version,
} from "../standard/primitives.js";
import type {
  AssessmentStatus,
  EvidenceType,
  MaturityLevel,
  ProfileId,
  Tier,
} from "../standard/types.js";
import {
  checksum,
  claimId,
  evidenceId,
  relativePath,
  riskAcceptanceId,
  riskId,
  sha256Hex,
  type ClaimId,
  type Checksum,
  type EvidenceId,
  type RelativePath,
  type RiskAcceptanceId,
  type RiskId,
  type Sha256Hex,
} from "./ids.js";
import type {
  Assessment,
  AssessmentCounts,
  AssessmentRequirementRef,
  AssessedRequirement,
  Claim,
  ClaimRegister,
  ClaimStatus,
  CustomerDisclosure,
  EvidenceEntry,
  EvidenceFreshness,
  EvidenceIndex,
  EvidenceRedaction,
  GateSummary,
  LockedModule,
  LockedOverlay,
  LockfileInput,
  ProjectConfidentiality,
  ProjectIdentity,
  ProjectIssue,
  ProjectLock,
  ProjectManifest,
  ProjectScope,
  PublicSectorScope,
  Risk,
  RiskLevel,
  RiskRegister,
  RiskSeverity,
  RiskStatus,
  Signoff,
} from "./types.js";

type Issues = ProjectIssue[];

const CONFIDENTIALITIES = [
  "public",
  "internal",
  "confidential",
  "restricted",
  "synthetic",
] as const satisfies readonly ProjectConfidentiality[];

const PROFILE_IDS = ["lite", "full"] as const satisfies readonly ProfileId[];

const TIERS = [1, 2, 3] as const satisfies readonly Tier[];

const ASSESSMENT_STATUSES = [
  "not_assessed",
  "gap",
  "partial",
  "implemented",
  "verified",
  "not_applicable",
] as const satisfies readonly AssessmentStatus[];

const MATURITY_LEVELS = [
  "L0",
  "L1",
  "L2",
  "L3",
  "L4",
] as const satisfies readonly MaturityLevel[];

const EVIDENCE_TYPES = [
  "document",
  "diagram",
  "configuration",
  "screenshot",
  "test_result",
  "metric",
  "ticket",
  "log",
  "contract",
  "attestation",
  "benchmark",
  "interview",
  "report",
] as const satisfies readonly EvidenceType[];

const FRESHNESS_STATUSES = [
  "current",
  "expired",
  "unknown",
] as const satisfies readonly EvidenceFreshness[];

const REDACTIONS = [
  "none",
  "partial",
  "full",
] as const satisfies readonly EvidenceRedaction[];

const CLAIM_STATUSES = [
  "verified",
  "partial",
  "not_claimed",
  "prohibited",
] as const satisfies readonly ClaimStatus[];

const RISK_SEVERITIES = [
  "critical",
  "high",
  "medium",
  "low",
] as const satisfies readonly RiskSeverity[];

const RISK_LEVELS = [
  "low",
  "medium",
  "high",
] as const satisfies readonly RiskLevel[];

const RISK_STATUSES = [
  "open",
  "in_progress",
  "closed",
  "accepted",
] as const satisfies readonly RiskStatus[];

const CUSTOMER_DISCLOSURES = [
  "yes",
  "no",
  "conditional",
] as const satisfies readonly CustomerDisclosure[];

const URL = /^[A-Za-z][A-Za-z0-9+.-]*:\/\//;

const isObject = (value: unknown): value is DtoObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const push = (
  issues: Issues,
  file: string,
  path: string,
  message: string,
): void => {
  issues.push({ tag: "Parse", file, path, message });
};

const readObject = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): DtoObject | undefined => {
  if (!isObject(value)) {
    push(issues, file, path, "expected an object");
    return undefined;
  }

  return value;
};

const readString = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): string | undefined => {
  const value = object[key];

  if (typeof value !== "string") {
    push(issues, file, `${path}/${key}`, "expected a string");
    return undefined;
  }

  return value;
};

const readNonEmptyString = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): string | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value?.length === 0) {
    push(issues, file, `${path}/${key}`, "expected a non-empty string");
    return undefined;
  }

  return value;
};

const readNullableString = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): string | null | undefined => {
  const value = object[key];

  if (value === null) return null;
  if (typeof value === "string") return value;

  push(issues, file, `${path}/${key}`, "expected a string or null");
  return undefined;
};

const readArray = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): readonly unknown[] | undefined => {
  const value = object[key];

  if (!Array.isArray(value)) {
    push(issues, file, `${path}/${key}`, "expected an array");
    return undefined;
  }

  const values: readonly unknown[] = value;
  return values;
};

const readStringArray = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): readonly string[] | undefined => {
  const values = readArray(object, key, file, path, issues);

  if (values === undefined) return undefined;

  const strings: string[] = [];

  for (const [index, value] of values.entries()) {
    if (typeof value !== "string") {
      push(
        issues,
        file,
        `${path}/${key}/${String(index)}`,
        "expected a string",
      );
      continue;
    }

    strings.push(value);
  }

  return strings;
};

const readNonNegativeInteger = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): number | undefined => {
  const value = object[key];

  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    push(issues, file, `${path}/${key}`, "expected a non-negative integer");
    return undefined;
  }

  return value;
};

const readEnum = <T extends string>(
  object: DtoObject,
  key: string,
  values: readonly T[],
  file: string,
  path: string,
  issues: Issues,
): T | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const found = values.find((candidate) => candidate === value);

  if (found === undefined) {
    push(
      issues,
      file,
      `${path}/${key}`,
      `expected one of: ${values.join(", ")}`,
    );
    return undefined;
  }

  return found;
};

const readTier = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): Tier | undefined => {
  const value = object[key];
  const found = TIERS.find((tier) => tier === value);

  if (found === undefined) {
    push(issues, file, `${path}/${key}`, "expected 1, 2, or 3");
    return undefined;
  }

  return found;
};

const readDate = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): IsoDate | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = isoDate(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid date: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readNullableDate = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): IsoDate | null | undefined => {
  const value = object[key];

  if (value === null) return null;
  if (typeof value !== "string") {
    push(issues, file, `${path}/${key}`, "expected a date or null");
    return undefined;
  }

  const parsed = isoDate(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid date: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readVersion = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): Version | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = version(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid version: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readModuleId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): ModuleId | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = moduleId(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid module id: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readOverlayId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): OverlayId | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = overlayId(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid overlay id: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readRequirementRef = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): AssessmentRequirementRef | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const requirement = requirementId(value);

  if (requirement.ok) return requirement.value;

  const overlay = overlayRequirementId(value);

  if (overlay.ok) return overlay.value;

  push(
    issues,
    file,
    `${path}/${key}`,
    `invalid requirement or overlay requirement id: ${value}`,
  );
  return undefined;
};

const readEvidenceId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): EvidenceId | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = evidenceId(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid evidence id: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readClaimId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): ClaimId | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = claimId(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid claim id: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readRiskId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): RiskId | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = riskId(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid risk id: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readAcceptanceId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): RiskAcceptanceId | null | undefined => {
  const value = object[key];

  if (value === null) return null;
  if (typeof value !== "string") {
    push(issues, file, `${path}/${key}`, "expected an acceptance id or null");
    return undefined;
  }

  const parsed = riskAcceptanceId(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid acceptance id: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readChecksum = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): Checksum | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = checksum(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid checksum: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readSha256 = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): Sha256Hex | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = sha256Hex(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid sha256: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readRelativePath = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): RelativePath | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = relativePath(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `unsafe relative path: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const duplicateIssue = (
  issues: Issues,
  file: string,
  family: string,
  id: string,
): void => {
  issues.push({ tag: "DuplicateId", file, family, id });
};

const parseProjectIdentity = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): ProjectIdentity | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const name = readNonEmptyString(object, "name", file, path, issues);
  const description = readNonEmptyString(
    object,
    "description",
    file,
    path,
    issues,
  );
  const owner = readNonEmptyString(object, "owner", file, path, issues);
  const confidentiality = readEnum(
    object,
    "confidentiality",
    CONFIDENTIALITIES,
    file,
    path,
    issues,
  );

  if (
    name === undefined ||
    description === undefined ||
    owner === undefined ||
    confidentiality === undefined
  ) {
    return undefined;
  }

  return { name, description, owner, confidentiality };
};

const parseModuleList = (
  object: DtoObject,
  file: string,
  path: string,
  issues: Issues,
): readonly ModuleId[] | undefined => {
  const values = readStringArray(object, "modules", file, path, issues);

  if (values === undefined) return undefined;

  const modules: ModuleId[] = [];
  const seen = new Set<string>();

  for (const [index, value] of values.entries()) {
    const parsed = moduleId(value);

    if (!parsed.ok) {
      push(
        issues,
        file,
        `${path}/modules/${String(index)}`,
        `invalid module id: ${value}`,
      );
      continue;
    }

    if (seen.has(value)) {
      duplicateIssue(issues, file, "ModuleId", value);
      continue;
    }

    seen.add(value);
    modules.push(parsed.value);
  }

  return modules;
};

const parseOverlayList = (
  object: DtoObject,
  file: string,
  path: string,
  issues: Issues,
): readonly OverlayId[] | undefined => {
  const values = readStringArray(object, "overlays", file, path, issues);

  if (values === undefined) return undefined;

  const overlays: OverlayId[] = [];
  const seen = new Set<string>();

  for (const [index, value] of values.entries()) {
    const parsed = overlayId(value);

    if (!parsed.ok) {
      push(
        issues,
        file,
        `${path}/overlays/${String(index)}`,
        `invalid overlay id: ${value}`,
      );
      continue;
    }

    if (seen.has(value)) {
      duplicateIssue(issues, file, "OverlayId", value);
      continue;
    }

    seen.add(value);
    overlays.push(parsed.value);
  }

  return overlays;
};

export const parseProjectManifestFile = (
  value: unknown,
  file: string,
): Result<ProjectManifest, readonly ProjectIssue[]> => {
  const issues: Issues = [];
  const object = readObject(value, file, "", issues);

  if (object === undefined) return err(issues);

  const project = parseProjectIdentity(
    object["project"],
    file,
    "/project",
    issues,
  );
  const srasVersion = readVersion(object, "sras_version", file, "", issues);
  const profile = readEnum(object, "profile", PROFILE_IDS, file, "", issues);
  const tier = readTier(object, "tier", file, "", issues);
  const modules = parseModuleList(object, file, "", issues);
  const overlays = parseOverlayList(object, file, "", issues);
  const createdAt = readDate(object, "created_at", file, "", issues);
  const updatedAt = readDate(object, "updated_at", file, "", issues);

  if (
    createdAt !== undefined &&
    updatedAt !== undefined &&
    updatedAt < createdAt
  ) {
    push(issues, file, "/updated_at", "updated_at must not precede created_at");
  }

  if (issues.length > 0) return err(issues);

  if (
    project === undefined ||
    srasVersion === undefined ||
    profile === undefined ||
    tier === undefined ||
    modules === undefined ||
    overlays === undefined ||
    createdAt === undefined ||
    updatedAt === undefined
  ) {
    return err(issues);
  }

  return ok({
    tag: "ProjectManifest",
    sourceFile: file,
    project,
    srasVersion,
    profile,
    tier,
    modules,
    overlays,
    createdAt,
    updatedAt,
  });
};

const parsePublicSectorScope = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): PublicSectorScope | null | undefined => {
  if (value === undefined || value === null) return null;

  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const contractingAuthority = readNonEmptyString(
    object,
    "contracting_authority",
    file,
    path,
    issues,
  );
  const contractReference = readNonEmptyString(
    object,
    "contract_reference",
    file,
    path,
    issues,
  );

  if (contractingAuthority === undefined || contractReference === undefined) {
    return undefined;
  }

  return { contractingAuthority, contractReference };
};

const parseScope = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): ProjectScope | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const systems = readStringArray(object, "systems", file, path, issues);
  const data = readStringArray(object, "data", file, path, issues);
  const users = readStringArray(object, "users", file, path, issues);
  const jurisdictions = readStringArray(
    object,
    "jurisdictions",
    file,
    path,
    issues,
  );
  const publicSector = parsePublicSectorScope(
    object["public_sector"],
    file,
    `${path}/public_sector`,
    issues,
  );

  if (
    systems === undefined ||
    data === undefined ||
    users === undefined ||
    jurisdictions === undefined ||
    publicSector === undefined
  ) {
    return undefined;
  }

  return { systems, data, users, jurisdictions, publicSector };
};

const parseAssessedRequirement = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): AssessedRequirement | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const id = readRequirementRef(object, "id", file, path, issues);
  const status = readEnum(
    object,
    "status",
    ASSESSMENT_STATUSES,
    file,
    path,
    issues,
  );
  const maturityValue = object["maturity"];
  let maturity: MaturityLevel | null | undefined;

  if (maturityValue === null) {
    maturity = null;
  } else if (typeof maturityValue === "string") {
    maturity = MATURITY_LEVELS.find((level) => level === maturityValue);

    if (maturity === undefined) {
      push(
        issues,
        file,
        `${path}/maturity`,
        `expected one of: ${MATURITY_LEVELS.join(", ")}`,
      );
    }
  } else {
    push(issues, file, `${path}/maturity`, "expected a maturity level or null");
  }

  const evidenceValues = readArray(object, "evidence_refs", file, path, issues);
  const evidenceRefs: EvidenceId[] = [];

  if (evidenceValues !== undefined) {
    for (const [index, evidenceValue] of evidenceValues.entries()) {
      if (typeof evidenceValue !== "string") {
        push(
          issues,
          file,
          `${path}/evidence_refs/${String(index)}`,
          "expected a string",
        );
        continue;
      }

      const parsed = evidenceId(evidenceValue);

      if (!parsed.ok) {
        push(
          issues,
          file,
          `${path}/evidence_refs/${String(index)}`,
          `invalid evidence id: ${evidenceValue}`,
        );
        continue;
      }

      evidenceRefs.push(parsed.value);
    }
  }

  const notes = readString(object, "notes", file, path, issues);
  const gapOwner = readNullableString(object, "gap_owner", file, path, issues);
  const dueDate = readNullableDate(object, "due_date", file, path, issues);

  if (
    id === undefined ||
    status === undefined ||
    maturity === undefined ||
    evidenceValues === undefined ||
    notes === undefined ||
    gapOwner === undefined ||
    dueDate === undefined
  ) {
    return undefined;
  }

  return {
    id,
    status,
    maturity,
    evidenceRefs,
    notes,
    gapOwner,
    dueDate,
  };
};

const countStatus = (
  requirements: readonly AssessedRequirement[],
  status: AssessmentStatus,
): number =>
  requirements.filter((requirement) => requirement.status === status).length;

const countsMatch = (
  declared: AssessmentCounts,
  actual: AssessmentCounts,
): readonly (readonly [keyof AssessmentCounts, number, number])[] =>
  (
    [
      ["verified", declared.verified, actual.verified],
      ["implemented", declared.implemented, actual.implemented],
      ["partial", declared.partial, actual.partial],
      ["gap", declared.gap, actual.gap],
      ["notAssessed", declared.notAssessed, actual.notAssessed],
      ["notApplicable", declared.notApplicable, actual.notApplicable],
    ] as const
  ).filter(([, declaredValue, actualValue]) => declaredValue !== actualValue);

const parseCounts = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): AssessmentCounts | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const verified = readNonNegativeInteger(
    object,
    "verified",
    file,
    path,
    issues,
  );
  const implemented = readNonNegativeInteger(
    object,
    "implemented",
    file,
    path,
    issues,
  );
  const partial = readNonNegativeInteger(object, "partial", file, path, issues);
  const gap = readNonNegativeInteger(object, "gap", file, path, issues);
  const notAssessed = readNonNegativeInteger(
    object,
    "not_assessed",
    file,
    path,
    issues,
  );
  const notApplicable = readNonNegativeInteger(
    object,
    "not_applicable",
    file,
    path,
    issues,
  );

  if (
    verified === undefined ||
    implemented === undefined ||
    partial === undefined ||
    gap === undefined ||
    notAssessed === undefined ||
    notApplicable === undefined
  ) {
    return undefined;
  }

  return { verified, implemented, partial, gap, notAssessed, notApplicable };
};

const parseGateSummary = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): GateSummary | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const pass = readNonNegativeInteger(object, "pass", file, path, issues);
  const fail = readNonNegativeInteger(object, "fail", file, path, issues);

  if (pass === undefined || fail === undefined) return undefined;

  return { pass, fail };
};

const parseSignoff = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Signoff | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const name = readNonEmptyString(object, "name", file, path, issues);
  const role = readNonEmptyString(object, "role", file, path, issues);
  const date = readDate(object, "date", file, path, issues);

  if (name === undefined || role === undefined || date === undefined) {
    return undefined;
  }

  return { name, role, date };
};

export const parseAssessmentFile = (
  value: unknown,
  file: string,
): Result<Assessment, readonly ProjectIssue[]> => {
  const issues: Issues = [];
  const object = readObject(value, file, "", issues);

  if (object === undefined) return err(issues);

  const project = parseProjectIdentity(
    object["project"],
    file,
    "/project",
    issues,
  );
  const srasVersion = readVersion(object, "sras_version", file, "", issues);
  const profile = readEnum(object, "profile", PROFILE_IDS, file, "", issues);
  const tier = readTier(object, "tier", file, "", issues);
  const scope = parseScope(object["scope"], file, "/scope", issues);
  const modules = parseModuleList(object, file, "", issues);
  const overlays = parseOverlayList(object, file, "", issues);
  const assessedAt = readDate(object, "assessed_at", file, "", issues);
  const assessor = readNonEmptyString(object, "assessor", file, "", issues);

  const requirementValues = readArray(object, "requirements", file, "", issues);
  const requirements: AssessedRequirement[] = [];
  const seenRequirements = new Set<string>();

  if (requirementValues !== undefined) {
    for (const [index, requirementValue] of requirementValues.entries()) {
      const requirement = parseAssessedRequirement(
        requirementValue,
        file,
        `/requirements/${String(index)}`,
        issues,
      );

      if (requirement === undefined) continue;

      if (seenRequirements.has(requirement.id)) {
        duplicateIssue(issues, file, "RequirementId", requirement.id);
        continue;
      }

      seenRequirements.add(requirement.id);
      requirements.push(requirement);
    }
  }

  const gates = parseGateSummary(object["gates"], file, "/gates", issues);
  const summaryObject = readObject(object["summary"], file, "/summary", issues);
  const counts =
    summaryObject === undefined
      ? undefined
      : parseCounts(summaryObject["counts"], file, "/summary/counts", issues);
  const indexValue = summaryObject?.["index"];
  let summaryIndex: number | null | undefined;

  if (indexValue === null) {
    summaryIndex = null;
  } else if (
    typeof indexValue === "number" &&
    Number.isFinite(indexValue) &&
    indexValue >= 0 &&
    indexValue <= 1
  ) {
    summaryIndex = indexValue;
  } else {
    push(
      issues,
      file,
      "/summary/index",
      "expected a number between 0 and 1 or null",
    );
  }

  const signoff = parseSignoff(object["signoff"], file, "/signoff", issues);
  const limitations = readStringArray(object, "limitations", file, "", issues);

  if (profile !== undefined) {
    for (const requirement of requirements) {
      if (profile === "full" && requirement.maturity === null) {
        push(
          issues,
          file,
          `/requirements/${requirement.id}/maturity`,
          "full profile requires a maturity level",
        );
      }

      if (profile === "lite" && requirement.maturity !== null) {
        push(
          issues,
          file,
          `/requirements/${requirement.id}/maturity`,
          "lite profile does not use maturity levels",
        );
      }
    }

    if (profile === "full" && summaryIndex === null) {
      push(issues, file, "/summary/index", "full profile requires an index");
    }

    if (
      profile === "lite" &&
      summaryIndex !== null &&
      summaryIndex !== undefined
    ) {
      push(
        issues,
        file,
        "/summary/index",
        "lite profile does not use an index",
      );
    }
  }

  if (counts !== undefined) {
    const actual: AssessmentCounts = {
      verified: countStatus(requirements, "verified"),
      implemented: countStatus(requirements, "implemented"),
      partial: countStatus(requirements, "partial"),
      gap: countStatus(requirements, "gap"),
      notAssessed: countStatus(requirements, "not_assessed"),
      notApplicable: countStatus(requirements, "not_applicable"),
    };

    for (const [status, declaredValue, actualValue] of countsMatch(
      counts,
      actual,
    )) {
      issues.push({
        tag: "CountMismatch",
        file,
        status,
        declared: declaredValue,
        actual: actualValue,
      });
    }
  }

  if (issues.length > 0) return err(issues);

  if (
    project === undefined ||
    srasVersion === undefined ||
    profile === undefined ||
    tier === undefined ||
    scope === undefined ||
    modules === undefined ||
    overlays === undefined ||
    assessedAt === undefined ||
    assessor === undefined ||
    requirementValues === undefined ||
    gates === undefined ||
    counts === undefined ||
    summaryIndex === undefined ||
    signoff === undefined ||
    limitations === undefined
  ) {
    return err(issues);
  }

  return ok({
    tag: "Assessment",
    sourceFile: file,
    project,
    srasVersion,
    profile,
    tier,
    scope,
    modules,
    overlays,
    assessedAt,
    assessor,
    requirements,
    gates,
    summary: { counts, index: summaryIndex },
    signoff,
    limitations,
  });
};

const parseEvidenceEntry = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): EvidenceEntry | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const id = readEvidenceId(object, "id", file, path, issues);
  const requirementValues = readArray(
    object,
    "requirement_ids",
    file,
    path,
    issues,
  );
  const requirementIds: AssessmentRequirementRef[] = [];

  if (requirementValues !== undefined) {
    if (requirementValues.length === 0) {
      push(
        issues,
        file,
        `${path}/requirement_ids`,
        "expected at least one requirement id",
      );
    }

    for (const [index, requirementValue] of requirementValues.entries()) {
      if (typeof requirementValue !== "string") {
        push(
          issues,
          file,
          `${path}/requirement_ids/${String(index)}`,
          "expected a string",
        );
        continue;
      }

      const parsed = requirementId(requirementValue);

      if (parsed.ok) {
        requirementIds.push(parsed.value);
        continue;
      }

      const overlay = overlayRequirementId(requirementValue);

      if (overlay.ok) {
        requirementIds.push(overlay.value);
        continue;
      }

      push(
        issues,
        file,
        `${path}/requirement_ids/${String(index)}`,
        `invalid requirement or overlay requirement id: ${requirementValue}`,
      );
    }
  }

  const type = readEnum(object, "type", EVIDENCE_TYPES, file, path, issues);
  const description = readNonEmptyString(
    object,
    "description",
    file,
    path,
    issues,
  );
  const location = readNonEmptyString(object, "location", file, path, issues);
  const owner = readNonEmptyString(object, "owner", file, path, issues);
  const collectedAt = readDate(object, "collected_at", file, path, issues);
  const expiresAt = readDate(object, "expires_at", file, path, issues);
  const freshness = readEnum(
    object,
    "freshness_status",
    FRESHNESS_STATUSES,
    file,
    path,
    issues,
  );
  const redaction = readEnum(
    object,
    "redaction",
    REDACTIONS,
    file,
    path,
    issues,
  );
  const hashValue = object["hash"];
  let hash: Checksum | null | undefined;

  if (hashValue === null) {
    hash = null;
  } else if (typeof hashValue === "string") {
    const parsed = checksum(hashValue);

    if (!parsed.ok) {
      push(issues, file, `${path}/hash`, `invalid checksum: ${hashValue}`);
    } else {
      hash = parsed.value;
    }
  } else {
    push(issues, file, `${path}/hash`, "expected a checksum or null");
  }

  const access = readNonEmptyString(object, "access", file, path, issues);
  const notes = readString(object, "notes", file, path, issues);

  if (location !== undefined && URL.test(location)) {
    push(
      issues,
      file,
      `${path}/location`,
      "evidence location must be a private reference, not a URL",
    );
  }

  if (
    collectedAt !== undefined &&
    expiresAt !== undefined &&
    expiresAt < collectedAt
  ) {
    push(
      issues,
      file,
      `${path}/expires_at`,
      "expires_at must not precede collected_at",
    );
  }

  if (
    id === undefined ||
    requirementValues === undefined ||
    type === undefined ||
    description === undefined ||
    location === undefined ||
    owner === undefined ||
    collectedAt === undefined ||
    expiresAt === undefined ||
    freshness === undefined ||
    redaction === undefined ||
    hash === undefined ||
    access === undefined ||
    notes === undefined
  ) {
    return undefined;
  }

  return {
    id,
    requirementIds,
    type,
    description,
    location,
    owner,
    collectedAt,
    expiresAt,
    freshness,
    redaction,
    hash,
    access,
    notes,
  };
};

export const parseEvidenceIndexFile = (
  value: unknown,
  file: string,
): Result<EvidenceIndex, readonly ProjectIssue[]> => {
  const issues: Issues = [];
  const object = readObject(value, file, "", issues);

  if (object === undefined) return err(issues);

  const entryValues = readArray(object, "entries", file, "", issues);
  const entries: EvidenceEntry[] = [];
  const seen = new Set<string>();

  if (entryValues !== undefined) {
    for (const [index, entryValue] of entryValues.entries()) {
      const entry = parseEvidenceEntry(
        entryValue,
        file,
        `/entries/${String(index)}`,
        issues,
      );

      if (entry === undefined) continue;

      if (seen.has(entry.id)) {
        duplicateIssue(issues, file, "EvidenceId", entry.id);
        continue;
      }

      seen.add(entry.id);
      entries.push(entry);
    }
  }

  if (issues.length > 0) return err(issues);
  if (entryValues === undefined) return err(issues);

  return ok({ tag: "EvidenceIndex", sourceFile: file, entries });
};

const parseClaim = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Claim | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const id = readClaimId(object, "id", file, path, issues);
  const claim = readString(object, "claim", file, path, issues);
  const evidenceValues = readArray(object, "evidence_ids", file, path, issues);
  const evidenceIds: EvidenceId[] = [];

  if (evidenceValues !== undefined) {
    for (const [index, evidenceValue] of evidenceValues.entries()) {
      if (typeof evidenceValue !== "string") {
        push(
          issues,
          file,
          `${path}/evidence_ids/${String(index)}`,
          "expected a string",
        );
        continue;
      }

      const parsed = evidenceId(evidenceValue);

      if (!parsed.ok) {
        push(
          issues,
          file,
          `${path}/evidence_ids/${String(index)}`,
          `invalid evidence id: ${evidenceValue}`,
        );
        continue;
      }

      evidenceIds.push(parsed.value);
    }
  }

  const status = readEnum(object, "status", CLAIM_STATUSES, file, path, issues);
  const allowedWording = readNonEmptyString(
    object,
    "allowed_wording",
    file,
    path,
    issues,
  );
  const prohibitedWording = readNonEmptyString(
    object,
    "prohibited_wording",
    file,
    path,
    issues,
  );
  const owner = readNonEmptyString(object, "owner", file, path, issues);
  const approvedBy = readNullableString(
    object,
    "approved_by",
    file,
    path,
    issues,
  );
  const approvedAt = readNullableDate(
    object,
    "approved_at",
    file,
    path,
    issues,
  );
  const expiresAt = readNullableDate(object, "expires_at", file, path, issues);
  const notes = readString(object, "notes", file, path, issues);

  if (status === "verified" || status === "partial") {
    if (evidenceIds.length === 0) {
      push(
        issues,
        file,
        `${path}/evidence_ids`,
        `${status} claim requires at least one evidence id`,
      );
    }

    if (approvedBy === null || approvedBy === undefined) {
      push(
        issues,
        file,
        `${path}/approved_by`,
        `${status} claim requires an approver`,
      );
    }

    if (approvedAt === null || approvedAt === undefined) {
      push(
        issues,
        file,
        `${path}/approved_at`,
        `${status} claim requires an approval date`,
      );
    }

    if (expiresAt === null || expiresAt === undefined) {
      push(
        issues,
        file,
        `${path}/expires_at`,
        `${status} claim requires an expiry date`,
      );
    }
  }

  if (
    approvedAt !== undefined &&
    approvedAt !== null &&
    expiresAt !== undefined &&
    expiresAt !== null &&
    expiresAt < approvedAt
  ) {
    push(
      issues,
      file,
      `${path}/expires_at`,
      "expires_at must not precede approved_at",
    );
  }

  if (
    id === undefined ||
    claim === undefined ||
    evidenceValues === undefined ||
    status === undefined ||
    allowedWording === undefined ||
    prohibitedWording === undefined ||
    owner === undefined ||
    approvedBy === undefined ||
    approvedAt === undefined ||
    expiresAt === undefined ||
    notes === undefined
  ) {
    return undefined;
  }

  return {
    id,
    claim,
    evidenceIds,
    status,
    allowedWording,
    prohibitedWording,
    owner,
    approvedBy,
    approvedAt,
    expiresAt,
    notes,
  };
};

export const parseClaimRegisterFile = (
  value: unknown,
  file: string,
): Result<ClaimRegister, readonly ProjectIssue[]> => {
  const issues: Issues = [];
  const object = readObject(value, file, "", issues);

  if (object === undefined) return err(issues);

  const claimValues = readArray(object, "claims", file, "", issues);
  const claims: Claim[] = [];
  const seen = new Set<string>();

  if (claimValues !== undefined) {
    for (const [index, claimValue] of claimValues.entries()) {
      const claim = parseClaim(
        claimValue,
        file,
        `/claims/${String(index)}`,
        issues,
      );

      if (claim === undefined) continue;

      if (seen.has(claim.id)) {
        duplicateIssue(issues, file, "ClaimId", claim.id);
        continue;
      }

      seen.add(claim.id);
      claims.push(claim);
    }
  }

  if (issues.length > 0) return err(issues);
  if (claimValues === undefined) return err(issues);

  return ok({ tag: "ClaimRegister", sourceFile: file, claims });
};

const parseRisk = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Risk | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const id = readRiskId(object, "id", file, path, issues);
  const requirementValues = readArray(
    object,
    "requirement_ids",
    file,
    path,
    issues,
  );
  const requirementIds: AssessmentRequirementRef[] = [];

  if (requirementValues !== undefined) {
    for (const [index, requirementValue] of requirementValues.entries()) {
      if (typeof requirementValue !== "string") {
        push(
          issues,
          file,
          `${path}/requirement_ids/${String(index)}`,
          "expected a string",
        );
        continue;
      }

      const parsed = requirementId(requirementValue);

      if (parsed.ok) {
        requirementIds.push(parsed.value);
        continue;
      }

      const overlay = overlayRequirementId(requirementValue);

      if (overlay.ok) {
        requirementIds.push(overlay.value);
        continue;
      }

      push(
        issues,
        file,
        `${path}/requirement_ids/${String(index)}`,
        `invalid requirement or overlay requirement id: ${requirementValue}`,
      );
    }
  }

  const description = readNonEmptyString(
    object,
    "description",
    file,
    path,
    issues,
  );
  const severity = readEnum(
    object,
    "severity",
    RISK_SEVERITIES,
    file,
    path,
    issues,
  );
  const likelihood = readEnum(
    object,
    "likelihood",
    RISK_LEVELS,
    file,
    path,
    issues,
  );
  const impact = readEnum(object, "impact", RISK_LEVELS, file, path, issues);
  const remediation = readNonEmptyString(
    object,
    "remediation",
    file,
    path,
    issues,
  );
  const owner = readNonEmptyString(object, "owner", file, path, issues);
  const dueDate = readNullableDate(object, "due_date", file, path, issues);
  const status = readEnum(object, "status", RISK_STATUSES, file, path, issues);
  const acceptanceId = readAcceptanceId(
    object,
    "acceptance_id",
    file,
    path,
    issues,
  );
  const customerDisclosure = readEnum(
    object,
    "customer_disclosure",
    CUSTOMER_DISCLOSURES,
    file,
    path,
    issues,
  );
  const notes = readString(object, "notes", file, path, issues);

  if (status === "accepted" && acceptanceId === null) {
    push(
      issues,
      file,
      `${path}/acceptance_id`,
      "accepted risk requires an acceptance id",
    );
  }

  if (
    id === undefined ||
    requirementValues === undefined ||
    description === undefined ||
    severity === undefined ||
    likelihood === undefined ||
    impact === undefined ||
    remediation === undefined ||
    owner === undefined ||
    dueDate === undefined ||
    status === undefined ||
    acceptanceId === undefined ||
    customerDisclosure === undefined ||
    notes === undefined
  ) {
    return undefined;
  }

  return {
    id,
    requirementIds,
    description,
    severity,
    likelihood,
    impact,
    remediation,
    owner,
    dueDate,
    status,
    acceptanceId,
    customerDisclosure,
    notes,
  };
};

export const parseRiskRegisterFile = (
  value: unknown,
  file: string,
): Result<RiskRegister, readonly ProjectIssue[]> => {
  const issues: Issues = [];
  const object = readObject(value, file, "", issues);

  if (object === undefined) return err(issues);

  const riskValues = readArray(object, "risks", file, "", issues);
  const risks: Risk[] = [];
  const seen = new Set<string>();

  if (riskValues !== undefined) {
    for (const [index, riskValue] of riskValues.entries()) {
      const risk = parseRisk(
        riskValue,
        file,
        `/risks/${String(index)}`,
        issues,
      );

      if (risk === undefined) continue;

      if (seen.has(risk.id)) {
        duplicateIssue(issues, file, "RiskId", risk.id);
        continue;
      }

      seen.add(risk.id);
      risks.push(risk);
    }
  }

  if (issues.length > 0) return err(issues);
  if (riskValues === undefined) return err(issues);

  return ok({ tag: "RiskRegister", sourceFile: file, risks });
};

const parseLockedModule = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): LockedModule | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const id = readModuleId(object, "id", file, path, issues);
  const lockedVersion = readVersion(object, "version", file, path, issues);

  if (id === undefined || lockedVersion === undefined) return undefined;

  return { id, version: lockedVersion };
};

const parseLockedOverlay = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): LockedOverlay | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const id = readOverlayId(object, "id", file, path, issues);
  const lockedVersion = readVersion(object, "version", file, path, issues);

  if (id === undefined || lockedVersion === undefined) return undefined;

  return { id, version: lockedVersion };
};

const parseLockfileInput = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): LockfileInput | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const inputPath = readRelativePath(object, "path", file, path, issues);
  const hash = readSha256(object, "sha256", file, path, issues);

  if (inputPath === undefined || hash === undefined) return undefined;

  return { path: inputPath, sha256: hash };
};

const sortedByPath = <T extends { readonly path: string }>(
  values: readonly T[],
): readonly T[] =>
  [...values].sort((left, right) =>
    left.path < right.path ? -1 : left.path > right.path ? 1 : 0,
  );

export const parseProjectLockFile = (
  value: unknown,
  file: string,
): Result<ProjectLock, readonly ProjectIssue[]> => {
  const issues: Issues = [];
  const object = readObject(value, file, "", issues);

  if (object === undefined) return err(issues);

  const lockfileVersion = object["lockfile_version"];

  if (lockfileVersion !== 1) {
    push(issues, file, "/lockfile_version", "expected lockfile_version 1");
  }

  const srasObject = readObject(object["sras"], file, "/sras", issues);
  const srasVersion =
    srasObject === undefined
      ? undefined
      : readVersion(srasObject, "version", file, "/sras", issues);
  const srasChecksum =
    srasObject === undefined
      ? undefined
      : readChecksum(srasObject, "checksum", file, "/sras", issues);

  const moduleValues = readArray(object, "modules", file, "", issues);
  const modules: LockedModule[] = [];
  const seenModules = new Set<string>();

  if (moduleValues !== undefined) {
    for (const [index, moduleValue] of moduleValues.entries()) {
      const locked = parseLockedModule(
        moduleValue,
        file,
        `/modules/${String(index)}`,
        issues,
      );

      if (locked === undefined) continue;

      if (seenModules.has(locked.id)) {
        duplicateIssue(issues, file, "ModuleId", locked.id);
        continue;
      }

      seenModules.add(locked.id);
      modules.push(locked);
    }
  }

  const overlayValues = readArray(object, "overlays", file, "", issues);
  const overlays: LockedOverlay[] = [];
  const seenOverlays = new Set<string>();

  if (overlayValues !== undefined) {
    for (const [index, overlayValue] of overlayValues.entries()) {
      const locked = parseLockedOverlay(
        overlayValue,
        file,
        `/overlays/${String(index)}`,
        issues,
      );

      if (locked === undefined) continue;

      if (seenOverlays.has(locked.id)) {
        duplicateIssue(issues, file, "OverlayId", locked.id);
        continue;
      }

      seenOverlays.add(locked.id);
      overlays.push(locked);
    }
  }

  const inputValues = readArray(object, "inputs", file, "", issues);
  const inputs: LockfileInput[] = [];
  const seenInputs = new Set<string>();

  if (inputValues !== undefined) {
    if (inputValues.length === 0) {
      push(issues, file, "/inputs", "expected at least one input");
    }

    for (const [index, inputValue] of inputValues.entries()) {
      const input = parseLockfileInput(
        inputValue,
        file,
        `/inputs/${String(index)}`,
        issues,
      );

      if (input === undefined) continue;

      if (seenInputs.has(input.path)) {
        duplicateIssue(issues, file, "RelativePath", input.path);
        continue;
      }

      seenInputs.add(input.path);
      inputs.push(input);
    }

    const sorted = sortedByPath(inputs);

    if (inputs.some((input, index) => input.path !== sorted[index]?.path)) {
      issues.push({
        tag: "Lockfile",
        file,
        message: "inputs must be sorted by path",
      });
    }
  }

  if (issues.length > 0) return err(issues);

  if (
    srasVersion === undefined ||
    srasChecksum === undefined ||
    moduleValues === undefined ||
    overlayValues === undefined ||
    inputValues === undefined
  ) {
    return err(issues);
  }

  return ok({
    tag: "ProjectLock",
    sourceFile: file,
    lockfileVersion: 1,
    sras: { version: srasVersion, checksum: srasChecksum },
    modules,
    overlays,
    inputs,
  });
};
