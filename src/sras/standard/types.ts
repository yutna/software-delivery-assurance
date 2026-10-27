import type {
  ModuleId,
  OverlayId,
  OverlayRequirementId,
  RegisterEntryId,
  RequirementId,
} from "./ids.js";
import type { IsoDate, Version, VersionRange } from "./primitives.js";

export type NonEmpty<T> = readonly [T, ...T[]];

export type CoreDomain =
  | "governance"
  | "security"
  | "privacy"
  | "change-release"
  | "operations"
  | "incident-continuity"
  | "supply-chain";

export type Criticality = "gate" | "high" | "medium" | "low";
export type ContentStatus = "draft" | "active" | "deprecated";
export type ReviewStatus = "draft" | "unverified" | "reviewed";
export type TranslationStatus = "complete" | "partial" | "missing";
export type AssessmentStatus =
  | "not_assessed"
  | "gap"
  | "partial"
  | "implemented"
  | "verified"
  | "not_applicable";
export type MaturityLevel = "L0" | "L1" | "L2" | "L3" | "L4";
export type ProfileId = "lite" | "full";
export type Industry = "finance" | "ecommerce" | "logistics" | "public-sector";
export type Tier = 1 | 2 | 3;
export type RegisterStatus =
  "in_force" | "amended" | "repealed" | "draft" | "unknown";

export type LocalizedText = {
  readonly en: string;
  readonly th: string;
};

export type Applicability = {
  readonly tiers: readonly Tier[];
  readonly modules: readonly ModuleId[];
  readonly overlays: readonly OverlayId[];
  readonly excludes: readonly RequirementId[];
};

export type ReviewMetadata = {
  readonly reviewStatus: ReviewStatus;
  readonly reviewedBy: string | null;
  readonly reviewedAt: IsoDate | null;
  readonly reviewScope: string | null;
};

export type TranslationMetadata = {
  readonly translationStatus: TranslationStatus;
  readonly machineTranslated: boolean;
  readonly translationReviewedBy: string | null;
  readonly translationReviewedAt: IsoDate | null;
};

export type StandardMetadata = {
  readonly sourceFile: string;
  readonly version: Version;
  readonly status: ContentStatus;
  readonly createdAt: IsoDate;
  readonly updatedAt: IsoDate;
} & ReviewMetadata &
  TranslationMetadata;

export type CoreRequirement = StandardMetadata & {
  readonly tag: "CoreRequirement";
  readonly id: RequirementId;
  readonly domain: CoreDomain;
  readonly criticality: Criticality;
  readonly applicability: Applicability;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly introducedIn: Version;
  readonly deprecatedIn: Version | null;
  readonly replacedBy: RequirementId | null;
};

export type ModuleRequirement = StandardMetadata & {
  readonly tag: "ModuleRequirement";
  readonly id: RequirementId;
  readonly module: ModuleId;
  readonly criticality: Criticality;
  readonly applicability: Applicability;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly introducedIn: Version;
  readonly deprecatedIn: Version | null;
  readonly replacedBy: RequirementId | null;
};

export type OverlayRequirement = StandardMetadata & {
  readonly tag: "OverlayRequirement";
  readonly id: OverlayRequirementId;
  readonly overlay: OverlayId;
  readonly criticality: Criticality;
  readonly applicability: Applicability;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly introducedIn: Version;
  readonly deprecatedIn: Version | null;
  readonly replacedBy: OverlayRequirementId | null;
};

export type Requirement =
  CoreRequirement | ModuleRequirement | OverlayRequirement;

export type Module = StandardMetadata & {
  readonly tag: "Module";
  readonly id: ModuleId;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly appliesTo: readonly string[];
  readonly requires: readonly ModuleId[];
  readonly requirements: NonEmpty<ModuleRequirement>;
  readonly deprecatedIn: Version | null;
  readonly replacedBy: ModuleId | null;
};

export type RequirementReplacement = {
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly criticality: Criticality;
};

export type Override = {
  readonly requirement: RequirementId;
  readonly replacement: RequirementReplacement;
  readonly rationale: string;
};

export type Waiver = {
  readonly requirement: RequirementId;
  readonly justification: string;
  readonly riskOwner: string;
  readonly expiresAt: IsoDate;
  readonly rationale: string;
};

export type Overlay = StandardMetadata & {
  readonly tag: "Overlay";
  readonly id: OverlayId;
  readonly type: "jurisdiction" | "industry";
  readonly jurisdiction: string;
  readonly industry: Industry | null;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly extends: VersionRange;
  readonly requires: readonly ModuleId[];
  readonly adds: readonly OverlayRequirement[];
  readonly overrides: readonly Override[];
  readonly waives: readonly Waiver[];
  readonly sources: readonly RegisterEntryId[];
  readonly notCovered: LocalizedText;
  readonly reviewChecklist: string;
  readonly deprecatedIn: Version | null;
  readonly replacedBy: OverlayId | null;
};

export type RegisterEntry = StandardMetadata & {
  readonly tag: "RegisterEntry";
  readonly id: RegisterEntryId;
  readonly jurisdiction: string;
  readonly mappedRequirements: readonly RequirementId[];
  readonly sourceUrl: string;
  readonly lastVerified: IsoDate;
  readonly reviewDue: IsoDate;
  readonly registerStatus: RegisterStatus;
};

export type Profile = StandardMetadata & {
  readonly tag: "Profile";
  readonly id: ProfileId;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly statuses: readonly AssessmentStatus[];
  readonly maturityLevels: readonly MaturityLevel[];
  readonly weightedIndex: boolean;
  readonly evidenceCoverage: boolean;
  readonly gateReport: boolean;
  readonly deprecatedIn: Version | null;
};

export type StandardManifest = {
  readonly sourceFile: string;
  readonly standard: "SRAS";
  readonly standardVersion: Version;
  readonly status: "draft" | "stable" | "deprecated";
  readonly releasedAt: IsoDate | null;
  readonly profiles: readonly ProfileId[];
  readonly domains: readonly CoreDomain[];
  readonly license: "MIT";
};

export type Standard = {
  readonly manifest: StandardManifest;
  readonly requirements: readonly CoreRequirement[];
  readonly modules: readonly Module[];
  readonly overlays: readonly Overlay[];
  readonly registers: readonly RegisterEntry[];
  readonly profiles: readonly Profile[];
};

declare const validatedBrand: unique symbol;

export type ValidatedStandard = Standard & {
  readonly [validatedBrand]: "ValidatedStandard";
};

export type ValidationIssue =
  | { readonly tag: "Read"; readonly file: string; readonly message: string }
  | { readonly tag: "Yaml"; readonly file: string; readonly message: string }
  | {
      readonly tag: "Schema";
      readonly file: string;
      readonly path: string;
      readonly message: string;
    }
  | {
      readonly tag: "Parse";
      readonly file: string;
      readonly path: string;
      readonly message: string;
    }
  | {
      readonly tag: "DuplicateId";
      readonly id: string;
      readonly files: readonly string[];
    }
  | {
      readonly tag: "MissingReference";
      readonly from: string;
      readonly to: string;
      readonly relation: string;
    }
  | { readonly tag: "Translation"; readonly id: string; readonly field: string }
  | { readonly tag: "Review"; readonly id: string; readonly field: string }
  | {
      readonly tag: "OverlayRange";
      readonly overlay: string;
      readonly range: string;
      readonly standardVersion: string;
    }
  | {
      readonly tag: "GateWaiver";
      readonly id: string;
      readonly requirement: string;
    }
  | {
      readonly tag: "Ownership";
      readonly id: string;
      readonly expected: string;
      readonly actual: string;
    }
  | {
      readonly tag: "DuplicateStatement";
      readonly id: string;
      readonly statement: string;
    }
  | {
      readonly tag: "Manifest";
      readonly field: string;
      readonly message: string;
    }
  | { readonly tag: "NoContent"; readonly message: string };
