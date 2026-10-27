import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import {
  moduleId,
  overlayId,
  overlayRequirementId,
  requirementId,
  type ModuleId,
  type OverlayId,
  type RequirementId,
} from "../../src/sras/standard/ids.js";
import {
  isoDate,
  version,
  versionRange,
  type IsoDate,
  type Version,
} from "../../src/sras/standard/primitives.js";
import {
  resolveStandard,
  type ProjectRequirement,
  type ProjectWaiver,
  type Selection,
} from "../../src/sras/standard/resolve.js";
import { validateStandard } from "../../src/sras/standard/validate.js";
import type {
  CoreRequirement,
  Criticality,
  EvidenceExpectation,
  Industry,
  Module,
  ModuleRequirement,
  Overlay,
  OverlayRequirement,
  Override,
  Profile,
  Standard,
  StandardManifest,
  Tier,
  ValidatedStandard,
  Waiver,
} from "../../src/sras/standard/types.js";

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

type Metadata = {
  readonly sourceFile: string;
  readonly version: Version;
  readonly status: "active";
  readonly createdAt: IsoDate;
  readonly updatedAt: IsoDate;
  readonly reviewStatus: "unverified";
  readonly reviewedBy: null;
  readonly reviewedAt: null;
  readonly reviewScope: null;
  readonly translationStatus: "partial";
  readonly machineTranslated: true;
  readonly translationReviewedBy: null;
  readonly translationReviewedAt: null;
};

const meta = (sourceFile: string): Metadata => ({
  sourceFile,
  version: must(version("0.4.0")),
  status: "active",
  createdAt: must(isoDate("2026-10-27")),
  updatedAt: must(isoDate("2026-10-27")),
  reviewStatus: "unverified",
  reviewedBy: null,
  reviewedAt: null,
  reviewScope: null,
  translationStatus: "partial",
  machineTranslated: true,
  translationReviewedBy: null,
  translationReviewedAt: null,
});

const evidenceOf = (maxAgeDays: number): readonly [EvidenceExpectation] => [
  { type: "test_result", description: "Test evidence", maxAgeDays },
];

const coreRequirement = (
  id: string,
  criticality: Criticality,
  maxAgeDays: number,
  tiers: readonly Tier[] = [1, 2, 3],
): CoreRequirement => ({
  ...meta("core/domains/security.yaml"),
  tag: "CoreRequirement",
  id: must(requirementId(id)),
  domain: "security",
  criticality,
  applicability: { tiers, modules: [], overlays: [], excludes: [] },
  evidence: evidenceOf(maxAgeDays),
  title: { en: `Core ${id}`, th: `core ${id}` },
  description: { en: `Core description ${id}`, th: `คำอธิบาย core ${id}` },
  introducedIn: must(version("0.4.0")),
  deprecatedIn: null,
  replacedBy: null,
});

const moduleRequirement = (
  criticality: Criticality = "high",
  maxAgeDays = 365,
): ModuleRequirement => ({
  ...meta("modules/ai/module.yaml"),
  tag: "ModuleRequirement",
  id: must(requirementId("SRAS-AI-001")),
  module: must(moduleId("SRAS-AI")),
  criticality,
  applicability: {
    tiers: [1, 2, 3],
    modules: [must(moduleId("SRAS-AI"))],
    overlays: [],
    excludes: [],
  },
  evidence: evidenceOf(maxAgeDays),
  title: { en: "Module requirement", th: "ข้อกำหนดโมดูล" },
  description: { en: "Module description", th: "คำอธิบายโมดูล" },
  introducedIn: must(version("0.4.0")),
  deprecatedIn: null,
  replacedBy: null,
});

const moduleOf = (
  requirements: readonly [ModuleRequirement, ...ModuleRequirement[]] = [
    moduleRequirement(),
  ],
): Module => ({
  ...meta("modules/ai/module.yaml"),
  tag: "Module",
  id: must(moduleId("SRAS-AI")),
  title: { en: "AI module", th: "โมดูล AI" },
  description: { en: "AI module", th: "โมดูล AI" },
  appliesTo: ["AI systems"],
  requires: [],
  requirements,
  deprecatedIn: null,
  replacedBy: null,
});

const overlayRequirementOf = (
  id: string,
  overlay: string,
  criticality: Criticality = "high",
  maxAgeDays = 365,
): OverlayRequirement => ({
  ...meta(`overlays/industries/${overlay.toLowerCase()}/overlay.yaml`),
  tag: "OverlayRequirement",
  id: must(overlayRequirementId(id)),
  overlay: must(overlayId(overlay)),
  criticality,
  applicability: {
    tiers: [1, 2, 3],
    modules: [],
    overlays: [must(overlayId(overlay))],
    excludes: [],
  },
  evidence: evidenceOf(maxAgeDays),
  title: { en: `Overlay ${id}`, th: `overlay ${id}` },
  description: {
    en: `Overlay description ${id}`,
    th: `คำอธิบาย overlay ${id}`,
  },
  introducedIn: must(version("0.4.0")),
  deprecatedIn: null,
  replacedBy: null,
});

const overrideOf = (
  target: RequirementId,
  criticality: Criticality,
): Override => ({
  requirement: target,
  replacement: {
    title: { en: `Override ${target}`, th: `override ${target}` },
    description: {
      en: `Override description ${target}`,
      th: `คำอธิบาย override ${target}`,
    },
    criticality,
  },
  rationale: "Test override.",
});

const waiverOf = (target: RequirementId): Waiver => ({
  requirement: target,
  justification: "Test justification.",
  riskOwner: "Test risk owner",
  expiresAt: must(isoDate("2027-10-27")),
  rationale: "Test waiver rationale.",
});

type OverlayInput = {
  readonly id: string;
  readonly type: "jurisdiction" | "industry";
  readonly industry: Industry | null;
  readonly adds?: readonly OverlayRequirement[];
  readonly overrides?: readonly Override[];
  readonly waives?: readonly Waiver[];
};

const overlayOf = ({
  id,
  type,
  industry,
  adds = [],
  overrides = [],
  waives = [],
}: OverlayInput): Overlay => ({
  ...meta(`overlays/${type}/${id.toLowerCase()}/overlay.yaml`),
  tag: "Overlay",
  id: must(overlayId(id)),
  type,
  jurisdiction: "TH",
  industry,
  title: { en: `Overlay ${id}`, th: `overlay ${id}` },
  description: { en: `Overlay ${id}`, th: `overlay ${id}` },
  extends: must(versionRange(">=0.4.0 <1.0.0")),
  requires: [],
  adds,
  overrides,
  waives,
  sources: [],
  notCovered: { en: "Not covered", th: "ไม่ครอบคลุม" },
  reviewChecklist: "review-checklist.md",
  deprecatedIn: null,
  replacedBy: null,
});

const manifest: StandardManifest = {
  sourceFile: "core/sras.yaml",
  standard: "SRAS",
  standardVersion: must(version("0.4.0")),
  status: "draft",
  releasedAt: null,
  profiles: ["lite", "full"],
  domains: ["security"],
  license: "MIT",
};

const profileOf = (id: "lite" | "full"): Profile => ({
  ...meta(`core/profiles/${id}.yaml`),
  tag: "Profile",
  id,
  title: { en: id, th: id },
  description: { en: id, th: id },
  statuses: [
    "not_assessed",
    "gap",
    "partial",
    "implemented",
    "verified",
    "not_applicable",
  ],
  maturityLevels: ["L0", "L1", "L2", "L3", "L4"],
  weightedIndex: false,
  evidenceCoverage: false,
  gateReport: false,
  deprecatedIn: null,
});

const validated = (standard: Standard): ValidatedStandard => {
  const result = validateStandard(standard);

  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

type StandardInput = {
  readonly requirements?: readonly CoreRequirement[];
  readonly moduleRequirements?: readonly [
    ModuleRequirement,
    ...ModuleRequirement[],
  ];
  readonly overlays?: readonly Overlay[];
};

const standardOf = ({
  requirements = [coreRequirement("SRAS-SEC-001", "high", 365)],
  moduleRequirements = [moduleRequirement()],
  overlays = [],
}: StandardInput = {}): ValidatedStandard =>
  validated({
    manifest,
    requirements,
    modules: [moduleOf(moduleRequirements)],
    overlays,
    registers: [],
    crosswalks: [],
    profiles: [profileOf("lite"), profileOf("full")],
  });

type SelectionInput = {
  readonly tier?: Tier;
  readonly modules?: readonly ModuleId[];
  readonly overlays?: readonly OverlayId[];
  readonly adds?: readonly ProjectRequirement[];
  readonly waives?: readonly ProjectWaiver[];
};

const selectionOf = ({
  tier = 2,
  modules = [],
  overlays = [],
  adds = [],
  waives = [],
}: SelectionInput = {}): Selection => ({
  profile: "full",
  tier,
  modules,
  overlays,
  project: { adds, waives },
});

const projectAddition = ({
  id = "PRJ-001",
  replaces = null,
  criticality = "high",
  requiredMaturity = "L2",
  maxAgeDays = 365,
}: {
  readonly id?: string;
  readonly replaces?: RequirementId | null;
  readonly criticality?: Criticality;
  readonly requiredMaturity?: "L0" | "L1" | "L2" | "L3" | "L4";
  readonly maxAgeDays?: number;
} = {}): ProjectRequirement => ({
  id,
  replaces,
  criticality,
  requiredMaturity,
  evidence: evidenceOf(maxAgeDays),
  title: { en: `Project ${id}`, th: `โปรเจกต์ ${id}` },
  description: { en: `Project description ${id}`, th: `คำอธิบาย ${id}` },
});

const projectWaiver = (requirement: RequirementId): ProjectWaiver => ({
  requirement,
  justification: "Test justification.",
  riskOwner: "Test risk owner",
  expiresAt: must(isoDate("2027-10-27")),
  rationale: "Test waiver rationale.",
});

const coreId = must(requirementId("SRAS-SEC-001"));

describe("resolveStandard", () => {
  test("applies core, module, jurisdiction, industry, and project layers", () => {
    const standard = standardOf({
      overlays: [
        overlayOf({
          id: "TH-JUR",
          type: "jurisdiction",
          industry: null,
          adds: [overlayRequirementOf("TH-JUR-001", "TH-JUR")],
          overrides: [overrideOf(coreId, "high")],
        }),
        overlayOf({
          id: "TH-IND",
          type: "industry",
          industry: "finance",
          overrides: [overrideOf(coreId, "high")],
        }),
      ],
    });

    const result = resolveStandard(
      standard,
      selectionOf({
        modules: [must(moduleId("SRAS-AI"))],
        overlays: [must(overlayId("TH-JUR")), must(overlayId("TH-IND"))],
        adds: [projectAddition({ replaces: coreId })],
      }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const byId = new Map(
      result.value.requirements.map((requirement) => [
        requirement.id,
        requirement.layer,
      ]),
    );
    const sourceById = new Map(
      result.value.requirements.map((requirement) => [
        requirement.id,
        requirement.sourceId,
      ]),
    );

    expect(byId.get(coreId)).toBe("project");
    expect(sourceById.get(coreId)).toBe("PRJ-001");
    expect(byId.get("SRAS-AI-001")).toBe("module");
    expect(sourceById.get("SRAS-AI-001")).toBe("SRAS-AI-001");
    expect(byId.get("TH-JUR-001")).toBe("jurisdiction");
    expect(sourceById.get("TH-JUR-001")).toBe("TH-JUR-001");
  });

  test("an industry overlay wins over a jurisdiction overlay at equal strictness", () => {
    const standard = standardOf({
      overlays: [
        overlayOf({
          id: "TH-JUR",
          type: "jurisdiction",
          industry: null,
          overrides: [overrideOf(coreId, "high")],
        }),
        overlayOf({
          id: "TH-IND",
          type: "industry",
          industry: "finance",
          overrides: [overrideOf(coreId, "high")],
        }),
      ],
    });

    const result = resolveStandard(
      standard,
      selectionOf({
        overlays: [must(overlayId("TH-JUR")), must(overlayId("TH-IND"))],
      }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const resolved = result.value.requirements.find(
      (requirement) => requirement.id === coreId,
    );

    expect(resolved?.layer).toBe("industry");
    expect(resolved?.sourceId).toBe("TH-IND");
  });

  test("stricter criticality wins even from an earlier layer", () => {
    const standard = standardOf({
      overlays: [
        overlayOf({
          id: "TH-JUR",
          type: "jurisdiction",
          industry: null,
          overrides: [overrideOf(coreId, "high")],
        }),
        overlayOf({
          id: "TH-IND",
          type: "industry",
          industry: "finance",
          overrides: [overrideOf(coreId, "medium")],
        }),
      ],
    });

    const result = resolveStandard(
      standard,
      selectionOf({
        overlays: [must(overlayId("TH-JUR")), must(overlayId("TH-IND"))],
      }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(
      result.value.requirements.find((requirement) => requirement.id === coreId)
        ?.layer,
    ).toBe("jurisdiction");
  });

  test("fresher evidence wins at equal criticality", () => {
    const fresher = resolveStandard(
      standardOf(),
      selectionOf({
        adds: [projectAddition({ replaces: coreId, maxAgeDays: 90 })],
      }),
    );

    expect(fresher.ok).toBe(true);
    if (fresher.ok) {
      expect(
        fresher.value.requirements.find(
          (requirement) => requirement.id === coreId,
        )?.layer,
      ).toBe("project");
    }

    const staler = resolveStandard(
      standardOf(),
      selectionOf({
        adds: [projectAddition({ replaces: coreId, maxAgeDays: 400 })],
      }),
    );

    expect(staler.ok).toBe(true);
    if (staler.ok) {
      expect(
        staler.value.requirements.find(
          (requirement) => requirement.id === coreId,
        )?.layer,
      ).toBe("core");
    }
  });

  test("higher required maturity wins at equal criticality", () => {
    const stricterMaturity = resolveStandard(
      standardOf(),
      selectionOf({
        adds: [projectAddition({ replaces: coreId, requiredMaturity: "L3" })],
      }),
    );

    expect(stricterMaturity.ok).toBe(true);
    if (stricterMaturity.ok) {
      expect(
        stricterMaturity.value.requirements.find(
          (requirement) => requirement.id === coreId,
        )?.layer,
      ).toBe("project");
    }

    const weakerMaturity = resolveStandard(
      standardOf(),
      selectionOf({
        adds: [projectAddition({ replaces: coreId, requiredMaturity: "L1" })],
      }),
    );

    expect(weakerMaturity.ok).toBe(true);
    if (weakerMaturity.ok) {
      expect(
        weakerMaturity.value.requirements.find(
          (requirement) => requirement.id === coreId,
        )?.layer,
      ).toBe("core");
    }
  });

  test("incomparable conflicts are reported and the ID has no winner", () => {
    const standard = standardOf({
      requirements: [coreRequirement("SRAS-SEC-001", "gate", 365)],
    });

    const result = resolveStandard(
      standard,
      selectionOf({
        adds: [projectAddition({ replaces: coreId, maxAgeDays: 90 })],
      }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(
      result.value.requirements.some(
        (requirement) => requirement.id === coreId,
      ),
    ).toBe(false);
    expect(result.value.conflicts).toHaveLength(1);

    const conflict = result.value.conflicts[0];

    expect(conflict?.id).toBe(coreId);
    expect(conflict?.kind).toBe("incomparable");
    expect(conflict?.candidates).toHaveLength(2);
    expect(conflict?.candidates.map((candidate) => candidate.sourceId)).toEqual(
      ["SRAS-SEC-001", "PRJ-001"],
    );
    expect(conflict?.message).toContain("incomparable");
  });

  test("a gate waiver fails with an actionable issue", () => {
    const standard = standardOf({
      requirements: [coreRequirement("SRAS-SEC-001", "gate", 365)],
    });

    const result = resolveStandard(
      standard,
      selectionOf({ waives: [projectWaiver(coreId)] }),
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;

    expect(result.error.map((issue) => issue.tag)).toContain("GateWaiver");
    expect(
      result.error.some(
        (issue) => issue.tag === "GateWaiver" && issue.requirement === coreId,
      ),
    ).toBe(true);
  });

  test("a non-gate waiver removes the requirement and is recorded", () => {
    const secondId = must(requirementId("SRAS-SEC-002"));
    const standard = standardOf({
      requirements: [
        coreRequirement("SRAS-SEC-001", "high", 365),
        coreRequirement("SRAS-SEC-002", "high", 365),
      ],
    });

    const result = resolveStandard(
      standard,
      selectionOf({ waives: [projectWaiver(secondId)] }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(
      result.value.requirements.some(
        (requirement) => requirement.id === secondId,
      ),
    ).toBe(false);
    expect(result.value.waivers).toHaveLength(1);
    expect(result.value.waivers[0]?.requirement).toBe(secondId);
  });

  test("an overlay waiver applies only when the overlay is selected", () => {
    const secondId = must(requirementId("SRAS-SEC-002"));
    const standard = standardOf({
      requirements: [
        coreRequirement("SRAS-SEC-001", "high", 365),
        coreRequirement("SRAS-SEC-002", "high", 365),
      ],
      overlays: [
        overlayOf({
          id: "TH-IND",
          type: "industry",
          industry: "finance",
          waives: [waiverOf(secondId)],
        }),
      ],
    });

    const unselected = resolveStandard(standard, selectionOf());
    expect(unselected.ok).toBe(true);
    if (unselected.ok) {
      expect(
        unselected.value.requirements.some(
          (requirement) => requirement.id === secondId,
        ),
      ).toBe(true);
    }

    const selected = resolveStandard(
      standard,
      selectionOf({ overlays: [must(overlayId("TH-IND"))] }),
    );
    expect(selected.ok).toBe(true);
    if (selected.ok) {
      expect(
        selected.value.requirements.some(
          (requirement) => requirement.id === secondId,
        ),
      ).toBe(false);
      expect(selected.value.waivers[0]?.layer).toBe("industry");
    }
  });

  test("project additions with new IDs are included", () => {
    const result = resolveStandard(
      standardOf(),
      selectionOf({
        adds: [projectAddition({ id: "PRJ-001", requiredMaturity: "L3" })],
      }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const addition = result.value.requirements.find(
      (requirement) => requirement.id === "PRJ-001",
    );

    expect(addition?.layer).toBe("project");
    expect(addition?.requiredMaturity).toBe("L3");
  });

  test("invalid, duplicate, and colliding project IDs are rejected", () => {
    const invalid = resolveStandard(
      standardOf(),
      selectionOf({ adds: [projectAddition({ id: " " })] }),
    );

    expect(invalid.ok).toBe(false);
    if (!invalid.ok) {
      expect(invalid.error.map((issue) => issue.tag)).toContain(
        "InvalidProjectId",
      );
    }

    const duplicate = resolveStandard(
      standardOf(),
      selectionOf({
        adds: [
          projectAddition({ id: "PRJ-001" }),
          projectAddition({ id: "PRJ-001" }),
        ],
      }),
    );

    expect(duplicate.ok).toBe(false);
    if (!duplicate.ok) {
      expect(duplicate.error.map((issue) => issue.tag)).toContain(
        "DuplicateProjectId",
      );
    }

    const collision = resolveStandard(
      standardOf(),
      selectionOf({
        adds: [projectAddition({ id: "SRAS-SEC-001" })],
      }),
    );

    expect(collision.ok).toBe(false);
    if (!collision.ok) {
      expect(collision.error.map((issue) => issue.tag)).toContain(
        "ProjectIdCollision",
      );
    }
  });

  test("unknown modules and overlays are rejected before resolution", () => {
    const result = resolveStandard(
      standardOf(),
      selectionOf({
        modules: [must(moduleId("SRAS-INT"))],
        overlays: [must(overlayId("TH-ZZZ"))],
      }),
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;

    const tags = result.error.map((issue) => issue.tag);

    expect(tags).toContain("UnknownModule");
    expect(tags).toContain("UnknownOverlay");
  });

  test("applicability filters by tier, module, and overlay selection", () => {
    const standard = standardOf({
      requirements: [coreRequirement("SRAS-SEC-001", "high", 365, [3])],
      overlays: [
        overlayOf({
          id: "TH-IND",
          type: "industry",
          industry: "finance",
          adds: [overlayRequirementOf("TH-IND-001", "TH-IND")],
        }),
      ],
    });

    const excluded = resolveStandard(standard, selectionOf({ tier: 2 }));

    expect(excluded.ok).toBe(true);
    if (excluded.ok) expect(excluded.value.requirements).toHaveLength(0);

    const included = resolveStandard(
      standard,
      selectionOf({
        tier: 3,
        modules: [must(moduleId("SRAS-AI"))],
        overlays: [must(overlayId("TH-IND"))],
      }),
    );

    expect(included.ok).toBe(true);
    if (included.ok) {
      expect(included.value.requirements).toHaveLength(3);
    }
  });

  test("two same-layer candidates with equal strictness conflict", () => {
    const standard = standardOf({
      overlays: [
        overlayOf({
          id: "TH-INA",
          type: "industry",
          industry: "finance",
          overrides: [overrideOf(coreId, "high")],
        }),
        overlayOf({
          id: "TH-INB",
          type: "industry",
          industry: "ecommerce",
          overrides: [overrideOf(coreId, "high")],
        }),
      ],
    });

    const result = resolveStandard(
      standard,
      selectionOf({
        overlays: [must(overlayId("TH-INA")), must(overlayId("TH-INB"))],
      }),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.value.conflicts[0]?.kind).toBe("same-layer");
  });

  test("a project waiver of an overlay gate fails", () => {
    const standard = standardOf({
      overlays: [
        overlayOf({
          id: "TH-IND",
          type: "industry",
          industry: "finance",
          adds: [overlayRequirementOf("TH-IND-001", "TH-IND", "gate")],
        }),
      ],
    });

    const result = resolveStandard(
      standard,
      selectionOf({
        overlays: [must(overlayId("TH-IND"))],
        waives: [
          {
            ...projectWaiver(coreId),
            requirement: must(overlayRequirementId("TH-IND-001")),
          },
        ],
      }),
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;

    expect(result.error.map((issue) => issue.tag)).toContain("GateWaiver");
  });
});
