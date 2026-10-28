import type {
  EvidenceType,
  AssessmentStatus,
  MaturityLevel,
  ProfileId,
  Tier,
} from "../standard/types.js";
import type {
  ModuleId,
  OverlayId,
  OverlayRequirementId,
  RequirementId,
} from "../standard/ids.js";
import type { IsoDate, Version } from "../standard/primitives.js";
import type {
  ClaimId,
  Checksum,
  EvidenceId,
  RelativePath,
  RiskAcceptanceId,
  RiskId,
  Sha256Hex,
} from "./ids.js";

export type ProjectConfidentiality =
  "public" | "internal" | "confidential" | "restricted" | "synthetic";

export type ProjectIdentity = {
  readonly name: string;
  readonly description: string;
  readonly owner: string;
  readonly confidentiality: ProjectConfidentiality;
};

export type ProjectManifest = {
  readonly sourceFile: string;
  readonly tag: "ProjectManifest";
  readonly project: ProjectIdentity;
  readonly srasVersion: Version;
  readonly profile: ProfileId;
  readonly tier: Tier;
  readonly modules: readonly ModuleId[];
  readonly overlays: readonly OverlayId[];
  readonly createdAt: IsoDate;
  readonly updatedAt: IsoDate;
};

export type ProjectScope = {
  readonly systems: readonly string[];
  readonly data: readonly string[];
  readonly users: readonly string[];
  readonly jurisdictions: readonly string[];
};

export type AssessmentRequirementRef = RequirementId | OverlayRequirementId;

export type AssessedRequirement = {
  readonly id: AssessmentRequirementRef;
  readonly status: AssessmentStatus;
  readonly maturity: MaturityLevel | null;
  readonly evidenceRefs: readonly EvidenceId[];
  readonly notes: string;
  readonly gapOwner: string | null;
  readonly dueDate: IsoDate | null;
};

export type GateSummary = {
  readonly pass: number;
  readonly fail: number;
};

export type AssessmentCounts = {
  readonly verified: number;
  readonly implemented: number;
  readonly partial: number;
  readonly gap: number;
  readonly notAssessed: number;
  readonly notApplicable: number;
};

export type AssessmentSummary = {
  readonly counts: AssessmentCounts;
  readonly index: number | null;
};

export type Signoff = {
  readonly name: string;
  readonly role: string;
  readonly date: IsoDate;
};

export type Assessment = {
  readonly sourceFile: string;
  readonly tag: "Assessment";
  readonly project: ProjectIdentity;
  readonly srasVersion: Version;
  readonly profile: ProfileId;
  readonly tier: Tier;
  readonly scope: ProjectScope;
  readonly modules: readonly ModuleId[];
  readonly overlays: readonly OverlayId[];
  readonly assessedAt: IsoDate;
  readonly assessor: string;
  readonly requirements: readonly AssessedRequirement[];
  readonly gates: GateSummary;
  readonly summary: AssessmentSummary;
  readonly signoff: Signoff;
  readonly limitations: readonly string[];
};

export type EvidenceFreshness = "current" | "expired" | "unknown";
export type EvidenceRedaction = "none" | "partial" | "full";

export type EvidenceEntry = {
  readonly id: EvidenceId;
  readonly requirementIds: readonly AssessmentRequirementRef[];
  readonly type: EvidenceType;
  readonly description: string;
  readonly location: string;
  readonly owner: string;
  readonly collectedAt: IsoDate;
  readonly expiresAt: IsoDate;
  readonly freshness: EvidenceFreshness;
  readonly redaction: EvidenceRedaction;
  readonly hash: Checksum | null;
  readonly access: string;
  readonly notes: string;
};

export type EvidenceIndex = {
  readonly sourceFile: string;
  readonly tag: "EvidenceIndex";
  readonly entries: readonly EvidenceEntry[];
};

export type ClaimStatus = "verified" | "partial" | "not_claimed" | "prohibited";

export type Claim = {
  readonly id: ClaimId;
  readonly claim: string;
  readonly evidenceIds: readonly EvidenceId[];
  readonly status: ClaimStatus;
  readonly allowedWording: string;
  readonly prohibitedWording: string;
  readonly owner: string;
  readonly approvedBy: string | null;
  readonly approvedAt: IsoDate | null;
  readonly expiresAt: IsoDate | null;
  readonly notes: string;
};

export type ClaimRegister = {
  readonly sourceFile: string;
  readonly tag: "ClaimRegister";
  readonly claims: readonly Claim[];
};

export type RiskSeverity = "critical" | "high" | "medium" | "low";
export type RiskLevel = "low" | "medium" | "high";
export type RiskStatus = "open" | "in_progress" | "closed" | "accepted";
export type CustomerDisclosure = "yes" | "no" | "conditional";

export type Risk = {
  readonly id: RiskId;
  readonly requirementIds: readonly AssessmentRequirementRef[];
  readonly description: string;
  readonly severity: RiskSeverity;
  readonly likelihood: RiskLevel;
  readonly impact: RiskLevel;
  readonly remediation: string;
  readonly owner: string;
  readonly dueDate: IsoDate | null;
  readonly status: RiskStatus;
  readonly acceptanceId: RiskAcceptanceId | null;
  readonly customerDisclosure: CustomerDisclosure;
  readonly notes: string;
};

export type RiskRegister = {
  readonly sourceFile: string;
  readonly tag: "RiskRegister";
  readonly risks: readonly Risk[];
};

export type LockfileInput = {
  readonly path: RelativePath;
  readonly sha256: Sha256Hex;
};

export type LockedModule = {
  readonly id: ModuleId;
  readonly version: Version;
};

export type LockedOverlay = {
  readonly id: OverlayId;
  readonly version: Version;
};

export type ProjectLock = {
  readonly sourceFile: string;
  readonly tag: "ProjectLock";
  readonly lockfileVersion: 1;
  readonly sras: {
    readonly version: Version;
    readonly checksum: Checksum;
  };
  readonly modules: readonly LockedModule[];
  readonly overlays: readonly LockedOverlay[];
  readonly inputs: readonly LockfileInput[];
};

export type ProjectInstance = {
  readonly manifest: ProjectManifest;
  readonly assessment: Assessment;
  readonly evidence: EvidenceIndex;
  readonly claims: ClaimRegister;
  readonly risks: RiskRegister;
  readonly lock: ProjectLock;
};

declare const validatedProjectBrand: unique symbol;

export type ValidatedProject = ProjectInstance & {
  readonly [validatedProjectBrand]: "ValidatedProject";
};

export type ProjectIssue =
  | {
      readonly tag: "Parse";
      readonly file: string;
      readonly path: string;
      readonly message: string;
    }
  | {
      readonly tag: "DuplicateId";
      readonly file: string;
      readonly family: string;
      readonly id: string;
    }
  | {
      readonly tag: "MissingReference";
      readonly file: string;
      readonly from: string;
      readonly to: string;
      readonly relation: string;
    }
  | {
      readonly tag: "CountMismatch";
      readonly file: string;
      readonly status: string;
      readonly declared: number;
      readonly actual: number;
    }
  | {
      readonly tag: "Mismatch";
      readonly file: string;
      readonly field: string;
      readonly expected: string;
      readonly actual: string;
    }
  | {
      readonly tag: "ChecksumMismatch";
      readonly file: string;
      readonly expected: string;
      readonly actual: string;
    }
  | {
      readonly tag: "Lockfile";
      readonly file: string;
      readonly message: string;
    }
  | {
      readonly tag: "UnknownSelection";
      readonly file: string;
      readonly kind: "profile" | "module" | "overlay";
      readonly id: string;
    };
