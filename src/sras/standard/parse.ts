import { err, ok, type Result } from "../foundation/result.js";
import type { DtoObject } from "./dto.js";
import {
  crosswalkId,
  moduleId,
  overlayId,
  overlayRequirementId,
  registerEntryId,
  requirementId,
  type CrosswalkId,
  type ModuleId,
  type OverlayId,
  type OverlayRequirementId,
  type RegisterEntryId,
  type RequirementId,
} from "./ids.js";
import {
  isoDate,
  revision,
  version,
  versionRange,
  type IsoDate,
  type Revision,
  type Version,
  type VersionRange,
} from "./primitives.js";
import type {
  Applicability,
  AssessmentStatus,
  ContentStatus,
  CoreDomain,
  CoreRequirement,
  Criticality,
  Crosswalk,
  CrosswalkMapping,
  CrosswalkRelationship,
  EvidenceExpectation,
  EvidenceType,
  Industry,
  LocalizedText,
  MaturityLevel,
  Module,
  ModuleRequirement,
  NonEmpty,
  Overlay,
  OverlayRequirement,
  Override,
  Profile,
  ProfileId,
  RegisterAppliesTo,
  RegisterEntry,
  RegisterInstrumentType,
  RegisterObligation,
  RegisterStatus,
  ReviewMetadata,
  ReviewStatus,
  StandardManifest,
  StandardMetadata,
  Tier,
  TranslationMetadata,
  TranslationStatus,
  ValidationIssue,
  Waiver,
} from "./types.js";

const CORE_DOMAINS = [
  "governance",
  "security",
  "privacy",
  "change-release",
  "operations",
  "incident-continuity",
  "supply-chain",
] as const satisfies readonly CoreDomain[];

const CRITICALITIES = [
  "gate",
  "high",
  "medium",
  "low",
] as const satisfies readonly Criticality[];

const CONTENT_STATUSES = [
  "draft",
  "active",
  "deprecated",
] as const satisfies readonly ContentStatus[];

const REVIEW_STATUSES = [
  "draft",
  "unverified",
  "reviewed",
] as const satisfies readonly ReviewStatus[];

const TRANSLATION_STATUSES = [
  "complete",
  "partial",
  "missing",
] as const satisfies readonly TranslationStatus[];

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

const PROFILE_IDS = ["lite", "full"] as const satisfies readonly ProfileId[];

const INDUSTRIES = [
  "finance",
  "ecommerce",
  "logistics",
  "public-sector",
] as const satisfies readonly Industry[];

const REGISTER_STATUSES = [
  "in_force",
  "amended",
  "repealed",
  "draft",
  "unknown",
] as const satisfies readonly RegisterStatus[];

const REGISTER_INSTRUMENT_TYPES = [
  "law",
  "regulation",
  "standard",
  "guidance",
  "framework",
] as const satisfies readonly RegisterInstrumentType[];

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

const CROSSWALK_RELATIONSHIPS = [
  "supports",
  "partial",
  "related",
] as const satisfies readonly CrosswalkRelationship[];

type Issues = ValidationIssue[];

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

const readBoolean = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): boolean | undefined => {
  const value = object[key];

  if (typeof value !== "boolean") {
    push(issues, file, `${path}/${key}`, "expected a boolean");
    return undefined;
  }

  return value;
};

const readBooleanOr = (
  object: DtoObject,
  key: string,
  fallback: boolean,
  file: string,
  path: string,
  issues: Issues,
): boolean | undefined => {
  if (!(key in object)) return fallback;
  return readBoolean(object, key, file, path, issues);
};

const readOptionalString = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): string | null | undefined => {
  if (!(key in object) || object[key] === null) return null;

  return readString(object, key, file, path, issues);
};

const readEnum = <T extends string>(
  object: DtoObject,
  key: string,
  allowed: readonly T[],
  file: string,
  path: string,
  issues: Issues,
): T | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const match = allowed.find((item) => item === value);

  if (match === undefined) {
    push(
      issues,
      file,
      `${path}/${key}`,
      `expected one of ${allowed.join(", ")}`,
    );
    return undefined;
  }

  return match;
};

const readOptionalEnum = <T extends string>(
  object: DtoObject,
  key: string,
  allowed: readonly T[],
  file: string,
  path: string,
  issues: Issues,
): T | null | undefined => {
  if (!(key in object) || object[key] === null) return null;

  return readEnum(object, key, allowed, file, path, issues);
};

const readArray = <T>(
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
  parseItem: (value: unknown, itemPath: string) => T | undefined,
): readonly T[] | undefined => {
  const value = object[key];

  if (!Array.isArray(value)) {
    push(issues, file, `${path}/${key}`, "expected an array");
    return undefined;
  }

  const items: T[] = [];

  for (const [index, item] of value.entries()) {
    const parsed = parseItem(item, `${path}/${key}/${String(index)}`);

    if (parsed === undefined) return undefined;

    items.push(parsed);
  }

  return items;
};

const readVersionValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Version | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected a version string");
    return undefined;
  }

  const parsed = version(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid version: ${value}`);
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
): Version | undefined =>
  readVersionValue(object[key], file, `${path}/${key}`, issues);

const readVersionRange = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): VersionRange | undefined => {
  const value = readString(object, key, file, path, issues);

  if (value === undefined) return undefined;

  const parsed = versionRange(value);

  if (!parsed.ok) {
    push(issues, file, `${path}/${key}`, `invalid version range: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readRevisionValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Revision | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected a revision string");
    return undefined;
  }

  const parsed = revision(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid revision: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readDateValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): IsoDate | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected an ISO date string");
    return undefined;
  }

  const parsed = isoDate(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid date: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readDate = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): IsoDate | undefined =>
  readDateValue(object[key], file, `${path}/${key}`, issues);

const readOptionalDate = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): IsoDate | null | undefined => {
  if (!(key in object) || object[key] === null) return null;

  return readDate(object, key, file, path, issues);
};

const readRequirementIdValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): RequirementId | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected a requirement ID");
    return undefined;
  }

  const parsed = requirementId(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid requirement ID: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readModuleIdValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): ModuleId | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected a module ID");
    return undefined;
  }

  const parsed = moduleId(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid module ID: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readOverlayIdValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): OverlayId | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected an overlay ID");
    return undefined;
  }

  const parsed = overlayId(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid overlay ID: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readOverlayRequirementIdValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): OverlayRequirementId | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected an overlay requirement ID");
    return undefined;
  }

  const parsed = overlayRequirementId(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid overlay requirement ID: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readRegisterEntryIdValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): RegisterEntryId | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected a register entry ID");
    return undefined;
  }

  const parsed = registerEntryId(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid register entry ID: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readCrosswalkIdValue = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): CrosswalkId | undefined => {
  if (typeof value !== "string") {
    push(issues, file, path, "expected a crosswalk ID");
    return undefined;
  }

  const parsed = crosswalkId(value);

  if (!parsed.ok) {
    push(issues, file, path, `invalid crosswalk ID: ${value}`);
    return undefined;
  }

  return parsed.value;
};

const readStringArray = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): readonly string[] | undefined => {
  const value = object[key];

  if (!Array.isArray(value)) {
    push(issues, file, `${path}/${key}`, "expected an array");
    return undefined;
  }

  const items: string[] = [];

  for (const [index, item] of value.entries()) {
    if (typeof item !== "string") {
      push(
        issues,
        file,
        `${path}/${key}/${String(index)}`,
        "expected a string",
      );
      return undefined;
    }

    items.push(item);
  }

  return items;
};

const readNumber = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): number | undefined => {
  const value = object[key];

  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    push(issues, file, `${path}/${key}`, "expected a positive integer");
    return undefined;
  }

  return value;
};

const parseEvidenceItem = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): EvidenceExpectation | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const type = readEnum(object, "type", EVIDENCE_TYPES, file, path, issues);
  const description = readString(object, "description", file, path, issues);
  const maxAgeDays = readNumber(object, "max_age_days", file, path, issues);

  if (
    type === undefined ||
    description === undefined ||
    maxAgeDays === undefined
  ) {
    return undefined;
  }

  return { type, description, maxAgeDays };
};

const parseEvidence = (
  object: DtoObject,
  file: string,
  path: string,
  issues: Issues,
): NonEmpty<EvidenceExpectation> | undefined => {
  const evidence = readArray(
    object,
    "evidence",
    file,
    path,
    issues,
    (item, itemPath) => parseEvidenceItem(item, file, itemPath, issues),
  );

  if (evidence === undefined) return undefined;

  const [first, ...rest] = evidence;

  if (first === undefined) {
    push(
      issues,
      file,
      `${path}/evidence`,
      "expected at least one evidence item",
    );
    return undefined;
  }

  return [first, ...rest];
};

const readLocalized = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): LocalizedText | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const en = readString(object, "en", file, path, issues);
  const th = readString(object, "th", file, path, issues);

  if (en === undefined || th === undefined) return undefined;

  return { en, th };
};

const readTier = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Tier | undefined => {
  if (value === 1 || value === 2 || value === 3) return value;

  push(issues, file, path, "expected tier 1, 2, or 3");
  return undefined;
};

const readApplicability = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Applicability | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const tiers = readArray(
    object,
    "tiers",
    file,
    path,
    issues,
    (item, itemPath) => readTier(item, file, itemPath, issues),
  );
  const modules = readArray(
    object,
    "modules",
    file,
    path,
    issues,
    (item, itemPath) => readModuleIdValue(item, file, itemPath, issues),
  );
  const overlays = readArray(
    object,
    "overlays",
    file,
    path,
    issues,
    (item, itemPath) => readOverlayIdValue(item, file, itemPath, issues),
  );
  const excludes = readArray(
    object,
    "excludes",
    file,
    path,
    issues,
    (item, itemPath) => readRequirementIdValue(item, file, itemPath, issues),
  );

  if (
    tiers === undefined ||
    modules === undefined ||
    overlays === undefined ||
    excludes === undefined
  ) {
    return undefined;
  }

  return { tiers, modules, overlays, excludes };
};

const readGovernanceMetadata = (
  object: DtoObject,
  file: string,
  path: string,
  issues: Issues,
): (ReviewMetadata & TranslationMetadata) | undefined => {
  const reviewStatus = readEnum(
    object,
    "review_status",
    REVIEW_STATUSES,
    file,
    path,
    issues,
  );
  const translationStatus = readEnum(
    object,
    "translation_status",
    TRANSLATION_STATUSES,
    file,
    path,
    issues,
  );
  const reviewedBy = readOptionalString(
    object,
    "reviewed_by",
    file,
    path,
    issues,
  );
  const reviewedAt = readOptionalDate(
    object,
    "reviewed_at",
    file,
    path,
    issues,
  );
  const reviewScope = readOptionalString(
    object,
    "review_scope",
    file,
    path,
    issues,
  );
  const machineTranslated = readBooleanOr(
    object,
    "machine_translated",
    false,
    file,
    path,
    issues,
  );
  const translationReviewedBy = readOptionalString(
    object,
    "translation_reviewed_by",
    file,
    path,
    issues,
  );
  const translationReviewedAt = readOptionalDate(
    object,
    "translation_reviewed_at",
    file,
    path,
    issues,
  );

  if (
    reviewStatus === undefined ||
    translationStatus === undefined ||
    reviewedBy === undefined ||
    reviewedAt === undefined ||
    reviewScope === undefined ||
    machineTranslated === undefined ||
    translationReviewedBy === undefined ||
    translationReviewedAt === undefined
  ) {
    return undefined;
  }

  return {
    reviewStatus,
    reviewedBy,
    reviewedAt,
    reviewScope,
    translationStatus,
    machineTranslated,
    translationReviewedBy,
    translationReviewedAt,
  };
};

const readMetadata = (
  object: DtoObject,
  file: string,
  path: string,
  issues: Issues,
): StandardMetadata | undefined => {
  const versionValue = readVersion(object, "version", file, path, issues);
  const status = readEnum(
    object,
    "status",
    CONTENT_STATUSES,
    file,
    path,
    issues,
  );
  const createdAt = readDate(object, "created_at", file, path, issues);
  const updatedAt = readDate(object, "updated_at", file, path, issues);
  const governance = readGovernanceMetadata(object, file, path, issues);

  if (
    versionValue === undefined ||
    status === undefined ||
    createdAt === undefined ||
    updatedAt === undefined ||
    governance === undefined
  ) {
    return undefined;
  }

  return {
    sourceFile: file,
    version: versionValue,
    status,
    createdAt,
    updatedAt,
    ...governance,
  };
};

const readDeprecatedIn = (
  object: DtoObject,
  file: string,
  path: string,
  issues: Issues,
): Version | null | undefined => {
  const value = object["deprecated_in"];

  if (value === undefined || value === null) return null;

  return readVersionValue(value, file, `${path}/deprecated_in`, issues);
};

const readOptionalRequirementId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): RequirementId | null | undefined => {
  if (!(key in object) || object[key] === null) return null;

  return readRequirementIdValue(object[key], file, `${path}/${key}`, issues);
};

const readOptionalOverlayId = (
  object: DtoObject,
  key: string,
  file: string,
  path: string,
  issues: Issues,
): OverlayId | null | undefined => {
  if (!(key in object) || object[key] === null) return null;

  return readOverlayIdValue(object[key], file, `${path}/${key}`, issues);
};

const parseCoreRequirement = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): CoreRequirement | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const metadata = readMetadata(object, file, path, issues);
  const id = readRequirementIdValue(object["id"], file, `${path}/id`, issues);
  const domain = readEnum(object, "domain", CORE_DOMAINS, file, path, issues);
  const criticality = readEnum(
    object,
    "criticality",
    CRITICALITIES,
    file,
    path,
    issues,
  );
  const applicability = readApplicability(
    object["applicability"],
    file,
    `${path}/applicability`,
    issues,
  );
  const evidence = parseEvidence(object, file, path, issues);
  const title = readLocalized(object["title"], file, `${path}/title`, issues);
  const description = readLocalized(
    object["description"],
    file,
    `${path}/description`,
    issues,
  );
  const introducedIn = readVersion(object, "introduced_in", file, path, issues);
  const deprecatedIn = readDeprecatedIn(object, file, path, issues);
  const replacedBy = readOptionalRequirementId(
    object,
    "replaced_by",
    file,
    path,
    issues,
  );

  if (
    metadata === undefined ||
    id === undefined ||
    domain === undefined ||
    criticality === undefined ||
    applicability === undefined ||
    evidence === undefined ||
    title === undefined ||
    description === undefined ||
    introducedIn === undefined ||
    deprecatedIn === undefined ||
    replacedBy === undefined
  ) {
    return undefined;
  }

  return {
    tag: "CoreRequirement",
    ...metadata,
    id,
    domain,
    criticality,
    applicability,
    evidence,
    title,
    description,
    introducedIn,
    deprecatedIn,
    replacedBy,
  };
};

const parseModuleRequirement = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): ModuleRequirement | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const metadata = readMetadata(object, file, path, issues);
  const id = readRequirementIdValue(object["id"], file, `${path}/id`, issues);
  const module = readModuleIdValue(
    object["module"],
    file,
    `${path}/module`,
    issues,
  );
  const criticality = readEnum(
    object,
    "criticality",
    CRITICALITIES,
    file,
    path,
    issues,
  );
  const applicability = readApplicability(
    object["applicability"],
    file,
    `${path}/applicability`,
    issues,
  );
  const evidence = parseEvidence(object, file, path, issues);
  const title = readLocalized(object["title"], file, `${path}/title`, issues);
  const description = readLocalized(
    object["description"],
    file,
    `${path}/description`,
    issues,
  );
  const introducedIn = readVersion(object, "introduced_in", file, path, issues);
  const deprecatedIn = readDeprecatedIn(object, file, path, issues);
  const replacedBy = readOptionalRequirementId(
    object,
    "replaced_by",
    file,
    path,
    issues,
  );

  if (
    metadata === undefined ||
    id === undefined ||
    module === undefined ||
    criticality === undefined ||
    applicability === undefined ||
    evidence === undefined ||
    title === undefined ||
    description === undefined ||
    introducedIn === undefined ||
    deprecatedIn === undefined ||
    replacedBy === undefined
  ) {
    return undefined;
  }

  return {
    tag: "ModuleRequirement",
    ...metadata,
    id,
    module,
    criticality,
    applicability,
    evidence,
    title,
    description,
    introducedIn,
    deprecatedIn,
    replacedBy,
  };
};

const parseOverlayRequirement = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): OverlayRequirement | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const metadata = readMetadata(object, file, path, issues);
  const id = readOverlayRequirementIdValue(
    object["id"],
    file,
    `${path}/id`,
    issues,
  );
  const overlay = readOverlayIdValue(
    object["overlay"],
    file,
    `${path}/overlay`,
    issues,
  );
  const criticality = readEnum(
    object,
    "criticality",
    CRITICALITIES,
    file,
    path,
    issues,
  );
  const applicability = readApplicability(
    object["applicability"],
    file,
    `${path}/applicability`,
    issues,
  );
  const evidence = parseEvidence(object, file, path, issues);
  const title = readLocalized(object["title"], file, `${path}/title`, issues);
  const description = readLocalized(
    object["description"],
    file,
    `${path}/description`,
    issues,
  );
  const introducedIn = readVersion(object, "introduced_in", file, path, issues);
  const deprecatedIn = readDeprecatedIn(object, file, path, issues);
  const replacedBy =
    "replaced_by" in object && object["replaced_by"] !== null
      ? readOverlayRequirementIdValue(
          object["replaced_by"],
          file,
          `${path}/replaced_by`,
          issues,
        )
      : null;

  if (
    metadata === undefined ||
    id === undefined ||
    overlay === undefined ||
    criticality === undefined ||
    applicability === undefined ||
    evidence === undefined ||
    title === undefined ||
    description === undefined ||
    introducedIn === undefined ||
    deprecatedIn === undefined ||
    replacedBy === undefined
  ) {
    return undefined;
  }

  return {
    tag: "OverlayRequirement",
    ...metadata,
    id,
    overlay,
    criticality,
    applicability,
    evidence,
    title,
    description,
    introducedIn,
    deprecatedIn,
    replacedBy,
  };
};

const parseOverride = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Override | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const requirement = readRequirementIdValue(
    object["requirement"],
    file,
    `${path}/requirement`,
    issues,
  );
  const replacementObject = readObject(
    object["replacement"],
    file,
    `${path}/replacement`,
    issues,
  );
  const rationale = readString(object, "rationale", file, path, issues);

  if (
    requirement === undefined ||
    replacementObject === undefined ||
    rationale === undefined
  ) {
    return undefined;
  }

  const title = readLocalized(
    replacementObject["title"],
    file,
    `${path}/replacement/title`,
    issues,
  );
  const description = readLocalized(
    replacementObject["description"],
    file,
    `${path}/replacement/description`,
    issues,
  );
  const criticality = readEnum(
    replacementObject,
    "criticality",
    CRITICALITIES,
    file,
    `${path}/replacement`,
    issues,
  );

  if (
    title === undefined ||
    description === undefined ||
    criticality === undefined
  ) {
    return undefined;
  }

  return {
    requirement,
    replacement: { title, description, criticality },
    rationale,
  };
};

const parseWaiver = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Waiver | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const requirement = readRequirementIdValue(
    object["requirement"],
    file,
    `${path}/requirement`,
    issues,
  );
  const justification = readString(object, "justification", file, path, issues);
  const riskOwner = readString(object, "risk_owner", file, path, issues);
  const expiresAt = readDate(object, "expires_at", file, path, issues);
  const rationale = readString(object, "rationale", file, path, issues);

  if (
    requirement === undefined ||
    justification === undefined ||
    riskOwner === undefined ||
    expiresAt === undefined ||
    rationale === undefined
  ) {
    return undefined;
  }

  return { requirement, justification, riskOwner, expiresAt, rationale };
};

const parseModule = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Module | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const metadata = readMetadata(object, file, path, issues);
  const id = readModuleIdValue(object["id"], file, `${path}/id`, issues);
  const title = readLocalized(object["title"], file, `${path}/title`, issues);
  const description = readLocalized(
    object["description"],
    file,
    `${path}/description`,
    issues,
  );
  const appliesTo = readStringArray(object, "applies_to", file, path, issues);
  const requires = readArray(
    object,
    "requires",
    file,
    path,
    issues,
    (item, itemPath) => readModuleIdValue(item, file, itemPath, issues),
  );
  const requirements = readArray(
    object,
    "requirements",
    file,
    path,
    issues,
    (item, itemPath) => parseModuleRequirement(item, file, itemPath, issues),
  );
  const deprecatedIn = readDeprecatedIn(object, file, path, issues);
  const replacedBy =
    "replaced_by" in object && object["replaced_by"] !== null
      ? readModuleIdValue(
          object["replaced_by"],
          file,
          `${path}/replaced_by`,
          issues,
        )
      : null;

  if (
    metadata === undefined ||
    id === undefined ||
    title === undefined ||
    description === undefined ||
    appliesTo === undefined ||
    requires === undefined ||
    requirements === undefined ||
    deprecatedIn === undefined ||
    replacedBy === undefined
  ) {
    return undefined;
  }

  const [firstRequirement, ...restRequirements] = requirements;

  if (firstRequirement === undefined) {
    push(
      issues,
      file,
      `${path}/requirements`,
      "expected at least one requirement",
    );
    return undefined;
  }

  return {
    tag: "Module",
    ...metadata,
    id,
    title,
    description,
    appliesTo,
    requires,
    requirements: [firstRequirement, ...restRequirements],
    deprecatedIn,
    replacedBy,
  };
};

const parseCrosswalkMapping = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): CrosswalkMapping | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const requirement = readRequirementIdValue(
    object["requirement"],
    file,
    `${path}/requirement`,
    issues,
  );
  const external = readString(object, "external", file, path, issues);
  const relationship = readEnum(
    object,
    "relationship",
    CROSSWALK_RELATIONSHIPS,
    file,
    path,
    issues,
  );
  const notes = readOptionalString(object, "notes", file, path, issues);

  if (
    requirement === undefined ||
    external === undefined ||
    relationship === undefined ||
    notes === undefined
  ) {
    return undefined;
  }

  return { requirement, external, relationship, notes };
};

const parseCrosswalk = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Crosswalk | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const metadata = readMetadata(object, file, path, issues);
  const id = readCrosswalkIdValue(object["id"], file, `${path}/id`, issues);
  const title = readLocalized(object["title"], file, `${path}/title`, issues);
  const description = readLocalized(
    object["description"],
    file,
    `${path}/description`,
    issues,
  );
  const sourceStandard = readString(
    object,
    "source_standard",
    file,
    path,
    issues,
  );
  const sourceUrl = readString(object, "source_url", file, path, issues);
  const mappings = readArray(
    object,
    "mappings",
    file,
    path,
    issues,
    (item, itemPath) => parseCrosswalkMapping(item, file, itemPath, issues),
  );
  const deprecatedIn = readDeprecatedIn(object, file, path, issues);
  const replacedBy =
    "replaced_by" in object && object["replaced_by"] !== null
      ? readCrosswalkIdValue(
          object["replaced_by"],
          file,
          `${path}/replaced_by`,
          issues,
        )
      : null;

  if (
    metadata === undefined ||
    id === undefined ||
    title === undefined ||
    description === undefined ||
    sourceStandard === undefined ||
    sourceUrl === undefined ||
    mappings === undefined ||
    deprecatedIn === undefined ||
    replacedBy === undefined
  ) {
    return undefined;
  }

  const [firstMapping, ...restMappings] = mappings;

  if (firstMapping === undefined) {
    push(issues, file, `${path}/mappings`, "expected at least one mapping");
    return undefined;
  }

  return {
    tag: "Crosswalk",
    ...metadata,
    id,
    title,
    description,
    sourceStandard,
    sourceUrl,
    mappings: [firstMapping, ...restMappings],
    deprecatedIn,
    replacedBy,
  };
};

const parseOverlay = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Overlay | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const metadata = readMetadata(object, file, path, issues);
  const id = readOverlayIdValue(object["id"], file, `${path}/id`, issues);
  const type = readEnum(
    object,
    "type",
    ["jurisdiction", "industry"] as const,
    file,
    path,
    issues,
  );
  const jurisdiction = readString(object, "jurisdiction", file, path, issues);
  const industry = readOptionalEnum(
    object,
    "industry",
    INDUSTRIES,
    file,
    path,
    issues,
  );
  const title = readLocalized(object["title"], file, `${path}/title`, issues);
  const description = readLocalized(
    object["description"],
    file,
    `${path}/description`,
    issues,
  );
  const range = readVersionRange(object, "extends", file, path, issues);
  const requires = readArray(
    object,
    "requires",
    file,
    path,
    issues,
    (item, itemPath) => readModuleIdValue(item, file, itemPath, issues),
  );
  const adds = readArray(object, "adds", file, path, issues, (item, itemPath) =>
    parseOverlayRequirement(item, file, itemPath, issues),
  );
  const overrides = readArray(
    object,
    "overrides",
    file,
    path,
    issues,
    (item, itemPath) => parseOverride(item, file, itemPath, issues),
  );
  const waives = readArray(
    object,
    "waives",
    file,
    path,
    issues,
    (item, itemPath) => parseWaiver(item, file, itemPath, issues),
  );
  const sources = readArray(
    object,
    "sources",
    file,
    path,
    issues,
    (item, itemPath) => readRegisterEntryIdValue(item, file, itemPath, issues),
  );
  const notCovered = readLocalized(
    object["not_covered"],
    file,
    `${path}/not_covered`,
    issues,
  );
  const reviewChecklist = readString(
    object,
    "review_checklist",
    file,
    path,
    issues,
  );
  const deprecatedIn = readDeprecatedIn(object, file, path, issues);
  const replacedBy = readOptionalOverlayId(
    object,
    "replaced_by",
    file,
    path,
    issues,
  );

  if (
    metadata === undefined ||
    id === undefined ||
    type === undefined ||
    jurisdiction === undefined ||
    industry === undefined ||
    title === undefined ||
    description === undefined ||
    range === undefined ||
    requires === undefined ||
    adds === undefined ||
    overrides === undefined ||
    waives === undefined ||
    sources === undefined ||
    notCovered === undefined ||
    reviewChecklist === undefined ||
    deprecatedIn === undefined ||
    replacedBy === undefined
  ) {
    return undefined;
  }

  return {
    tag: "Overlay",
    ...metadata,
    id,
    type,
    jurisdiction,
    industry: industry ?? null,
    title,
    description,
    extends: range,
    requires,
    adds,
    overrides,
    waives,
    sources,
    notCovered,
    reviewChecklist,
    deprecatedIn,
    replacedBy,
  };
};

const parseProfile = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): Profile | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const metadata = readMetadata(object, file, path, issues);
  const id = readEnum(object, "id", PROFILE_IDS, file, path, issues);
  const title = readLocalized(object["title"], file, `${path}/title`, issues);
  const description = readLocalized(
    object["description"],
    file,
    `${path}/description`,
    issues,
  );
  const statuses = readArray(
    object,
    "statuses",
    file,
    path,
    issues,
    (item, itemPath) =>
      readEnum(
        { value: item },
        "value",
        ASSESSMENT_STATUSES,
        file,
        itemPath,
        issues,
      ),
  );
  const maturityLevels = readArray(
    object,
    "maturity_levels",
    file,
    path,
    issues,
    (item, itemPath) =>
      readEnum(
        { value: item },
        "value",
        MATURITY_LEVELS,
        file,
        itemPath,
        issues,
      ),
  );
  const weightedIndex = readBoolean(
    object,
    "weighted_index",
    file,
    path,
    issues,
  );
  const evidenceCoverage = readBoolean(
    object,
    "evidence_coverage",
    file,
    path,
    issues,
  );
  const gateReport = readBoolean(object, "gate_report", file, path, issues);
  const deprecatedIn = readDeprecatedIn(object, file, path, issues);

  if (
    metadata === undefined ||
    id === undefined ||
    title === undefined ||
    description === undefined ||
    statuses === undefined ||
    maturityLevels === undefined ||
    weightedIndex === undefined ||
    evidenceCoverage === undefined ||
    gateReport === undefined ||
    deprecatedIn === undefined
  ) {
    return undefined;
  }

  return {
    tag: "Profile",
    ...metadata,
    id,
    title,
    description,
    statuses,
    maturityLevels,
    weightedIndex,
    evidenceCoverage,
    gateReport,
    deprecatedIn,
  };
};

const parseRegisterObligation = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): RegisterObligation | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const en = readString(object, "en", file, path, issues);
  const th = readString(object, "th", file, path, issues);

  if (en === undefined || th === undefined) return undefined;

  return { en, th };
};

const parseRegisterAppliesTo = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): RegisterAppliesTo | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const sectors = readArray(
    object,
    "sectors",
    file,
    path,
    issues,
    (item, itemPath) =>
      readEnum({ value: item }, "value", INDUSTRIES, file, itemPath, issues),
  );
  const roles = readStringArray(object, "roles", file, path, issues);
  const dataTypes = readStringArray(object, "data_types", file, path, issues);

  if (sectors === undefined || roles === undefined || dataTypes === undefined) {
    return undefined;
  }

  const [firstSector, ...restSectors] = sectors;
  const [firstRole, ...restRoles] = roles;
  const [firstDataType, ...restDataTypes] = dataTypes;

  if (
    firstSector === undefined ||
    firstRole === undefined ||
    firstDataType === undefined
  ) {
    push(
      issues,
      file,
      path,
      "expected at least one sector, role, and data type",
    );
    return undefined;
  }

  return {
    sectors: [firstSector, ...restSectors],
    roles: [firstRole, ...restRoles],
    dataTypes: [firstDataType, ...restDataTypes],
  };
};

const parseRegisterEntry = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): RegisterEntry | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const governance = readGovernanceMetadata(object, file, path, issues);
  const id = readRegisterEntryIdValue(object["id"], file, `${path}/id`, issues);
  const jurisdiction = readString(object, "jurisdiction", file, path, issues);
  const instrument = readString(object, "instrument", file, path, issues);
  const instrumentType = readEnum(
    object,
    "instrument_type",
    REGISTER_INSTRUMENT_TYPES,
    file,
    path,
    issues,
  );
  const regulator = readString(object, "regulator", file, path, issues);
  const sourceUrl = readString(object, "source_url", file, path, issues);
  const effectiveDate = readOptionalDate(
    object,
    "effective_date",
    file,
    path,
    issues,
  );
  const revisionValue = readRevisionValue(
    object["revision"],
    file,
    `${path}/revision`,
    issues,
  );
  const lastVerified = readDate(object, "last_verified", file, path, issues);
  const reviewDue = readDate(object, "review_due", file, path, issues);
  const registerStatus = readEnum(
    object,
    "status",
    REGISTER_STATUSES,
    file,
    path,
    issues,
  );
  const summary = readLocalized(
    object["summary"],
    file,
    `${path}/summary`,
    issues,
  );
  const obligations = readArray(
    object,
    "obligations",
    file,
    path,
    issues,
    (item, itemPath) => parseRegisterObligation(item, file, itemPath, issues),
  );
  const mappedRequirements = readArray(
    object,
    "mapped_requirements",
    file,
    path,
    issues,
    (item, itemPath) => readRequirementIdValue(item, file, itemPath, issues),
  );
  const appliesTo = parseRegisterAppliesTo(
    object["applies_to"],
    file,
    `${path}/applies_to`,
    issues,
  );
  const notes = readLocalized(object["notes"], file, `${path}/notes`, issues);
  const sourceLanguage = readString(
    object,
    "source_language",
    file,
    path,
    issues,
  );

  if (
    governance === undefined ||
    id === undefined ||
    jurisdiction === undefined ||
    instrument === undefined ||
    instrumentType === undefined ||
    regulator === undefined ||
    sourceUrl === undefined ||
    effectiveDate === undefined ||
    revisionValue === undefined ||
    lastVerified === undefined ||
    reviewDue === undefined ||
    registerStatus === undefined ||
    summary === undefined ||
    obligations === undefined ||
    mappedRequirements === undefined ||
    appliesTo === undefined ||
    notes === undefined ||
    sourceLanguage === undefined
  ) {
    return undefined;
  }

  const [firstObligation, ...restObligations] = obligations;

  if (firstObligation === undefined) {
    push(
      issues,
      file,
      `${path}/obligations`,
      "expected at least one obligation",
    );
    return undefined;
  }

  const [firstRequirement, ...restRequirements] = mappedRequirements;

  if (firstRequirement === undefined) {
    push(
      issues,
      file,
      `${path}/mapped_requirements`,
      "expected at least one mapped requirement",
    );
    return undefined;
  }

  return {
    tag: "RegisterEntry",
    sourceFile: file,
    ...governance,
    id,
    jurisdiction,
    instrument,
    instrumentType,
    regulator,
    sourceUrl,
    effectiveDate,
    revision: revisionValue,
    lastVerified,
    reviewDue,
    registerStatus,
    summary,
    obligations: [firstObligation, ...restObligations],
    mappedRequirements: [firstRequirement, ...restRequirements],
    appliesTo,
    notes,
    sourceLanguage,
  };
};

const parseManifest = (
  value: unknown,
  file: string,
  path: string,
  issues: Issues,
): StandardManifest | undefined => {
  const object = readObject(value, file, path, issues);

  if (object === undefined) return undefined;

  const standard = readString(object, "standard", file, path, issues);
  const standardVersion = readVersion(
    object,
    "standard_version",
    file,
    path,
    issues,
  );
  const status = readEnum(
    object,
    "status",
    ["draft", "stable", "deprecated"] as const,
    file,
    path,
    issues,
  );
  const releasedAt =
    "released_at" in object && object["released_at"] !== null
      ? readDate(object, "released_at", file, path, issues)
      : null;
  const profiles = readArray(
    object,
    "profiles",
    file,
    path,
    issues,
    (item, itemPath) =>
      readEnum({ value: item }, "value", PROFILE_IDS, file, itemPath, issues),
  );
  const domains = readArray(
    object,
    "domains",
    file,
    path,
    issues,
    (item, itemPath) =>
      readEnum({ value: item }, "value", CORE_DOMAINS, file, itemPath, issues),
  );
  const license = readString(object, "license", file, path, issues);

  if (
    standard !== "SRAS" ||
    standardVersion === undefined ||
    status === undefined ||
    releasedAt === undefined ||
    profiles === undefined ||
    domains === undefined ||
    license !== "MIT"
  ) {
    if (standard !== "SRAS") {
      push(issues, file, `${path}/standard`, "expected SRAS");
    }
    if (license !== "MIT") {
      push(issues, file, `${path}/license`, "expected MIT");
    }
    return undefined;
  }

  return {
    sourceFile: file,
    standard,
    standardVersion,
    status,
    releasedAt,
    profiles,
    domains,
    license,
  };
};

const result = <T>(
  value: T | undefined,
  issues: Issues,
): Result<T, readonly ValidationIssue[]> =>
  value === undefined || issues.length > 0 ? err(issues) : ok(value);

export const parseRequirementsFile = (
  value: unknown,
  file: string,
): Result<readonly CoreRequirement[], readonly ValidationIssue[]> => {
  const issues: Issues = [];

  if (!Array.isArray(value)) {
    push(issues, file, "", "expected an array of requirements");
    return err(issues);
  }

  const requirements: CoreRequirement[] = [];

  for (const [index, item] of value.entries()) {
    const parsed = parseCoreRequirement(
      item,
      file,
      `/${String(index)}`,
      issues,
    );

    if (parsed !== undefined) requirements.push(parsed);
  }

  return result(requirements, issues);
};

export const parseModuleFile = (
  value: unknown,
  file: string,
): Result<Module, readonly ValidationIssue[]> => {
  const issues: Issues = [];
  const module = parseModule(value, file, "", issues);

  return result(module, issues);
};

export const parseCrosswalkFile = (
  value: unknown,
  file: string,
): Result<Crosswalk, readonly ValidationIssue[]> => {
  const issues: Issues = [];
  const crosswalk = parseCrosswalk(value, file, "", issues);

  return result(crosswalk, issues);
};

export const parseOverlayFile = (
  value: unknown,
  file: string,
): Result<Overlay, readonly ValidationIssue[]> => {
  const issues: Issues = [];
  const overlay = parseOverlay(value, file, "", issues);

  return result(overlay, issues);
};

export const parseProfileFile = (
  value: unknown,
  file: string,
): Result<Profile, readonly ValidationIssue[]> => {
  const issues: Issues = [];
  const profile = parseProfile(value, file, "", issues);

  return result(profile, issues);
};

export const parseRegisterFile = (
  value: unknown,
  file: string,
): Result<RegisterEntry, readonly ValidationIssue[]> => {
  const issues: Issues = [];
  const register = parseRegisterEntry(value, file, "", issues);

  return result(register, issues);
};

export const parseManifestFile = (
  value: unknown,
  file: string,
): Result<StandardManifest, readonly ValidationIssue[]> => {
  const issues: Issues = [];
  const manifest = parseManifest(value, file, "", issues);

  return result(manifest, issues);
};
