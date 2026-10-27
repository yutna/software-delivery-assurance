import { err, ok, type Result } from "../foundation/result.js";
import { satisfiesRange, type Version } from "./primitives.js";
import type {
  Applicability,
  CoreRequirement,
  LocalizedText,
  Module,
  ModuleRequirement,
  Overlay,
  OverlayRequirement,
  Profile,
  RegisterEntry,
  Standard,
  TranslationStatus,
  ValidatedStandard,
  ValidationIssue,
} from "./types.js";

type RequirementLike = CoreRequirement | ModuleRequirement | OverlayRequirement;

type Reviewable = {
  readonly id: string;
  readonly reviewStatus: "draft" | "unverified" | "reviewed";
  readonly reviewedBy: string | null;
  readonly reviewedAt: string | null;
  readonly reviewScope: string | null;
};

type Translatable = {
  readonly id: string;
  readonly translationStatus: TranslationStatus;
  readonly translationReviewedBy: string | null;
  readonly translationReviewedAt: string | null;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
};

const addUnique = <
  T extends { readonly id: string; readonly sourceFile: string },
>(
  map: Map<string, T>,
  value: T,
  issues: ValidationIssue[],
): void => {
  const existing = map.get(value.id);

  if (existing !== undefined) {
    issues.push({
      tag: "DuplicateId",
      id: value.id,
      files: [existing.sourceFile, value.sourceFile],
    });
    return;
  }

  map.set(value.id, value);
};

const requireReference = (
  from: string,
  to: string,
  relation: string,
  exists: boolean,
  issues: ValidationIssue[],
): void => {
  if (!exists) {
    issues.push({ tag: "MissingReference", from, to, relation });
  }
};

const checkReview = (value: Reviewable, issues: ValidationIssue[]): void => {
  if (value.reviewStatus !== "reviewed") return;

  if (value.reviewedBy === null) {
    issues.push({ tag: "Review", id: value.id, field: "reviewed_by" });
  }

  if (value.reviewedAt === null) {
    issues.push({ tag: "Review", id: value.id, field: "reviewed_at" });
  }

  if (value.reviewScope === null) {
    issues.push({ tag: "Review", id: value.id, field: "review_scope" });
  }
};

const checkTranslation = (
  value: Translatable,
  issues: ValidationIssue[],
): void => {
  if (value.translationStatus !== "complete") return;

  if (value.translationReviewedBy === null) {
    issues.push({
      tag: "Translation",
      id: value.id,
      field: "translation_reviewed_by",
    });
  }

  if (value.translationReviewedAt === null) {
    issues.push({
      tag: "Translation",
      id: value.id,
      field: "translation_reviewed_at",
    });
  }

  if (value.title.th.trim() === "") {
    issues.push({ tag: "Translation", id: value.id, field: "title.th" });
  }

  if (value.description.th.trim() === "") {
    issues.push({ tag: "Translation", id: value.id, field: "description.th" });
  }
};

const checkApplicability = (
  from: string,
  applicability: Applicability,
  moduleIds: ReadonlySet<string>,
  overlayIds: ReadonlySet<string>,
  requirementIds: ReadonlySet<string>,
  issues: ValidationIssue[],
): void => {
  for (const module of applicability.modules) {
    requireReference(
      from,
      module,
      "applicability.modules",
      moduleIds.has(module),
      issues,
    );
  }

  for (const overlay of applicability.overlays) {
    requireReference(
      from,
      overlay,
      "applicability.overlays",
      overlayIds.has(overlay),
      issues,
    );
  }

  for (const excluded of applicability.excludes) {
    requireReference(
      from,
      excluded,
      "applicability.excludes",
      requirementIds.has(excluded),
      issues,
    );
  }
};

const checkModule = (
  module: Module,
  moduleIds: ReadonlySet<string>,
  overlayIds: ReadonlySet<string>,
  requirementIds: ReadonlySet<string>,
  issues: ValidationIssue[],
): void => {
  for (const required of module.requires) {
    requireReference(
      module.id,
      required,
      "module.requires",
      moduleIds.has(required),
      issues,
    );
  }

  for (const requirement of module.requirements) {
    if (requirement.module !== module.id) {
      issues.push({
        tag: "Ownership",
        id: requirement.id,
        expected: module.id,
        actual: requirement.module,
      });
    }

    checkApplicability(
      requirement.id,
      requirement.applicability,
      moduleIds,
      overlayIds,
      requirementIds,
      issues,
    );
    checkReview(requirement, issues);
    checkTranslation(requirement, issues);
  }
};

const checkOverlay = (
  overlay: Overlay,
  moduleIds: ReadonlySet<string>,
  overlayIds: ReadonlySet<string>,
  requirementIds: ReadonlySet<string>,
  baseRequirements: ReadonlyMap<string, CoreRequirement | ModuleRequirement>,
  registerIds: ReadonlySet<string>,
  standardVersion: Version,
  issues: ValidationIssue[],
): void => {
  for (const required of overlay.requires) {
    requireReference(
      overlay.id,
      required,
      "overlay.requires",
      moduleIds.has(required),
      issues,
    );
  }

  for (const source of overlay.sources) {
    requireReference(
      overlay.id,
      source,
      "overlay.sources",
      registerIds.has(source),
      issues,
    );
  }

  for (const override of overlay.overrides) {
    requireReference(
      overlay.id,
      override.requirement,
      "overlay.overrides",
      baseRequirements.has(override.requirement),
      issues,
    );
  }

  for (const waiver of overlay.waives) {
    requireReference(
      overlay.id,
      waiver.requirement,
      "overlay.waives",
      baseRequirements.has(waiver.requirement),
      issues,
    );

    const target = baseRequirements.get(waiver.requirement);

    if (target?.criticality === "gate") {
      issues.push({
        tag: "GateWaiver",
        id: overlay.id,
        requirement: waiver.requirement,
      });
    }
  }

  for (const requirement of overlay.adds) {
    if (requirement.overlay !== overlay.id) {
      issues.push({
        tag: "Ownership",
        id: requirement.id,
        expected: overlay.id,
        actual: requirement.overlay,
      });
    }

    checkApplicability(
      requirement.id,
      requirement.applicability,
      moduleIds,
      overlayIds,
      requirementIds,
      issues,
    );
    checkReview(requirement, issues);
    checkTranslation(requirement, issues);
  }

  if (!satisfiesRange(standardVersion, overlay.extends)) {
    issues.push({
      tag: "OverlayRange",
      overlay: overlay.id,
      range: overlay.extends,
      standardVersion,
    });
  }

  checkReview(overlay, issues);
  checkTranslation(overlay, issues);
};

const checkRegister = (
  register: RegisterEntry,
  requirementIds: ReadonlySet<string>,
  issues: ValidationIssue[],
): void => {
  for (const mapped of register.mappedRequirements) {
    requireReference(
      register.id,
      mapped,
      "register.mapped_requirements",
      requirementIds.has(mapped),
      issues,
    );
  }

  checkReview(register, issues);
};

const checkProfile = (profile: Profile, issues: ValidationIssue[]): void => {
  checkReview(profile, issues);
  checkTranslation(profile, issues);
};

const checkManifest = (
  standard: Standard,
  profileIds: ReadonlySet<string>,
  issues: ValidationIssue[],
): void => {
  for (const profile of standard.manifest.profiles) {
    if (!profileIds.has(profile)) {
      issues.push({
        tag: "Manifest",
        field: "profiles",
        message: `profile ${profile} is listed but not defined`,
      });
    }
  }

  for (const requirement of standard.requirements) {
    if (!standard.manifest.domains.includes(requirement.domain)) {
      issues.push({
        tag: "Manifest",
        field: "domains",
        message: `domain ${requirement.domain} is not listed in the manifest`,
      });
    }
  }
};

const checkDuplicateStatements = (
  requirements: readonly RequirementLike[],
  issues: ValidationIssue[],
): void => {
  const seen = new Map<string, string>();

  for (const requirement of requirements) {
    const statement = `${requirement.title.en}\u0000${requirement.description.en}`;
    const existing = seen.get(statement);

    if (existing !== undefined) {
      issues.push({
        tag: "DuplicateStatement",
        id: requirement.id,
        statement: requirement.description.en,
      });
      continue;
    }

    seen.set(statement, requirement.id);
  }
};

export const validateStandard = (
  standard: Standard,
): Result<ValidatedStandard, readonly ValidationIssue[]> => {
  const issues: ValidationIssue[] = [];
  const baseRequirementById = new Map<
    string,
    CoreRequirement | ModuleRequirement
  >();
  const overlayRequirementById = new Map<string, OverlayRequirement>();
  const moduleById = new Map<string, Module>();
  const overlayById = new Map<string, Overlay>();
  const registerById = new Map<string, RegisterEntry>();
  const profileById = new Map<string, Profile>();

  for (const requirement of standard.requirements) {
    addUnique(baseRequirementById, requirement, issues);
  }

  for (const module of standard.modules) {
    addUnique(moduleById, module, issues);

    for (const requirement of module.requirements) {
      addUnique(baseRequirementById, requirement, issues);
    }
  }

  for (const overlay of standard.overlays) {
    addUnique(overlayById, overlay, issues);

    for (const requirement of overlay.adds) {
      addUnique(overlayRequirementById, requirement, issues);
    }
  }

  for (const register of standard.registers) {
    addUnique(registerById, register, issues);
  }

  for (const profile of standard.profiles) {
    addUnique(profileById, profile, issues);
  }

  const moduleIds = new Set(moduleById.keys());
  const overlayIds = new Set(overlayById.keys());
  const registerIds = new Set(registerById.keys());
  const baseRequirementIds = new Set(baseRequirementById.keys());
  const overlayRequirementIds = new Set(overlayRequirementById.keys());
  const allRequirementIds = new Set([
    ...baseRequirementIds,
    ...overlayRequirementIds,
  ]);

  for (const requirement of standard.requirements) {
    checkApplicability(
      requirement.id,
      requirement.applicability,
      moduleIds,
      overlayIds,
      allRequirementIds,
      issues,
    );
    checkReview(requirement, issues);
    checkTranslation(requirement, issues);
  }

  for (const module of standard.modules) {
    checkModule(module, moduleIds, overlayIds, allRequirementIds, issues);
  }

  for (const overlay of standard.overlays) {
    checkOverlay(
      overlay,
      moduleIds,
      overlayIds,
      allRequirementIds,
      baseRequirementById,
      registerIds,
      standard.manifest.standardVersion,
      issues,
    );
  }

  for (const register of standard.registers) {
    checkRegister(register, allRequirementIds, issues);
  }

  for (const profile of standard.profiles) {
    checkProfile(profile, issues);
  }

  checkManifest(standard, new Set(profileById.keys()), issues);

  checkDuplicateStatements(
    [
      ...standard.requirements,
      ...standard.modules.flatMap((module) => module.requirements),
      ...standard.overlays.flatMap((overlay) => overlay.adds),
    ],
    issues,
  );

  if (issues.length > 0) return err(issues);

  const validated = standard as ValidatedStandard; // fds-allow-as: checked brand cast
  return ok(validated);
};
