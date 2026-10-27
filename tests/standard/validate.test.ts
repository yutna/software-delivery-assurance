import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import {
  crosswalkId,
  moduleId,
  overlayId,
  registerEntryId,
  requirementId,
} from "../../src/sras/standard/ids.js";
import {
  parseManifestFile,
  parseModuleFile,
  parseOverlayFile,
  parseProfileFile,
  parseRequirementsFile,
} from "../../src/sras/standard/parse.js";
import {
  isoDate,
  revision,
  version,
  versionRange,
} from "../../src/sras/standard/primitives.js";
import { validateStandard } from "../../src/sras/standard/validate.js";
import type {
  CoreRequirement,
  Crosswalk,
  Overlay,
  Profile,
  RegisterEntry,
  Standard,
  ValidationIssue,
} from "../../src/sras/standard/types.js";

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const fixture = (path: string): unknown =>
  parse(readFileSync(join(process.cwd(), "tests", "fixtures", path), "utf8"));

const core = must(
  parseRequirementsFile(
    fixture("valid/requirements-file.yaml"),
    "core/domains/security.yaml",
  ),
)[0];

if (core === undefined)
  throw new Error("core fixture must have one requirement");

const module = must(
  parseModuleFile(fixture("valid/module-ai.yaml"), "modules/ai/module.yaml"),
);
const firstModuleRequirement = module.requirements[0];

const parsedOverlay = must(
  parseOverlayFile(
    fixture("valid/overlay-finance.yaml"),
    "overlays/industries/finance/overlay.yaml",
  ),
);
const firstAdd = parsedOverlay.adds[0];

if (firstAdd === undefined)
  throw new Error("overlay fixture must have one add");

const overlay: Overlay = {
  ...parsedOverlay,
  requires: [],
  sources: [],
  adds: [
    {
      ...firstAdd,
      applicability: {
        ...firstAdd.applicability,
        modules: [],
        overlays: [parsedOverlay.id],
      },
    },
  ],
};

const profileLite = must(
  parseProfileFile(
    fixture("valid/profile-lite.yaml"),
    "core/profiles/lite.yaml",
  ),
);
const profileFull: Profile = {
  ...profileLite,
  id: "full",
  title: { en: "Full assessment", th: "การประเมินแบบ Full" },
};
const manifest = must(
  parseManifestFile(fixture("valid/standard.yaml"), "core/sras.yaml"),
);

const base: Standard = {
  manifest,
  requirements: [core],
  modules: [module],
  overlays: [overlay],
  registers: [],
  crosswalks: [],
  profiles: [profileLite, profileFull],
};

const tags = (issues: readonly ValidationIssue[]): readonly string[] =>
  issues.map((issue) => issue.tag);

const run = (standard: Standard): readonly ValidationIssue[] => {
  const result = validateStandard(standard);
  expect(result.ok).toBe(false);
  return result.ok ? [] : result.error;
};

const makeRegister = (
  mapped: readonly CoreRequirement["id"][],
): RegisterEntry => {
  const [firstRequirement, ...restRequirements] = mapped;

  return {
    tag: "RegisterEntry",
    sourceFile: "registers/th/pdpa.yaml",
    id: must(registerEntryId("TH-PDPA-001")),
    jurisdiction: "TH",
    instrument: "Test instrument",
    instrumentType: "law",
    regulator: "Test regulator",
    sourceUrl: "https://example.com",
    effectiveDate: must(isoDate("2019-05-28")),
    revision: must(revision("2026-10-27.r1")),
    lastVerified: must(isoDate("2026-10-27")),
    reviewDue: must(isoDate("2027-04-27")),
    registerStatus: "in_force",
    summary: { en: "Test summary.", th: "สรุปสำหรับทดสอบ" },
    obligations: [{ en: "Test obligation.", th: "ข้อกำหนดสำหรับทดสอบ" }],
    mappedRequirements: [firstRequirement ?? core.id, ...restRequirements],
    appliesTo: {
      sectors: ["finance"],
      roles: ["test-role"],
      dataTypes: ["test-data"],
    },
    notes: { en: "Test note.", th: "หมายเหตุสำหรับทดสอบ" },
    sourceLanguage: "th",
    reviewStatus: "unverified",
    reviewedBy: null,
    reviewedAt: null,
    reviewScope: null,
    translationStatus: "partial",
    machineTranslated: true,
    translationReviewedBy: null,
    translationReviewedAt: null,
  };
};

const makeCrosswalk = (mapped: CoreRequirement["id"]): Crosswalk => ({
  tag: "Crosswalk",
  sourceFile: "mappings/test.yaml",
  version: must(version("0.1.0")),
  status: "draft",
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
  id: must(crosswalkId("MAP-TEST")),
  title: { en: "Test crosswalk", th: "crosswalk สำหรับทดสอบ" },
  description: { en: "Test mapping.", th: "การจับคู่สำหรับทดสอบ" },
  sourceStandard: "ISO/IEC 27001:2022",
  sourceUrl: "https://www.iso.org/standard/27001",
  mappings: [
    {
      requirement: mapped,
      external: "A.8.5",
      relationship: "supports",
      notes: null,
    },
  ],
  deprecatedIn: null,
  replacedBy: null,
});

describe("validateStandard", () => {
  test("parses evidence expectations from requirement YAML", () => {
    expect(core.evidence.length).toBeGreaterThan(0);
    expect(core.evidence[0]?.maxAgeDays).toBeGreaterThan(0);
  });

  test("accepts a coherent standard", () => {
    expect(validateStandard(base).ok).toBe(true);
  });

  test("rejects a duplicate core requirement ID", () => {
    const issues = run({
      ...base,
      requirements: [core, { ...core }],
    });

    expect(tags(issues)).toContain("DuplicateId");
  });

  test("rejects a missing applicability module reference", () => {
    const issues = run({
      ...base,
      requirements: [
        {
          ...core,
          applicability: {
            ...core.applicability,
            modules: [must(moduleId("SRAS-INT"))],
          },
        },
      ],
    });

    expect(tags(issues)).toContain("MissingReference");
  });

  test("rejects a missing module dependency", () => {
    const issues = run({
      ...base,
      modules: [
        {
          ...module,
          requires: [must(moduleId("SRAS-INT"))],
        },
      ],
    });

    expect(tags(issues)).toContain("MissingReference");
  });

  test("rejects a missing overlay source", () => {
    const issues = run({
      ...base,
      overlays: [
        {
          ...overlay,
          sources: [must(registerEntryId("TH-PDPA-001"))],
        },
      ],
    });

    expect(tags(issues)).toContain("MissingReference");
  });

  test("rejects a gate waiver", () => {
    const issues = run({
      ...base,
      overlays: [
        {
          ...overlay,
          waives: [
            {
              requirement: core.id,
              justification: "Shared identity provider",
              riskOwner: "Security lead",
              expiresAt: must(isoDate("2027-10-27")),
              rationale: "A gate cannot be waived.",
            },
          ],
        },
      ],
    });

    expect(tags(issues)).toContain("GateWaiver");
  });

  test("rejects an overlay range that excludes the standard version", () => {
    const issues = run({
      ...base,
      overlays: [
        {
          ...overlay,
          extends: must(versionRange(">=2.0.0")),
        },
      ],
    });

    expect(tags(issues)).toContain("OverlayRange");
  });

  test("rejects an incomplete translation marked complete", () => {
    const issues = run({
      ...base,
      requirements: [
        {
          ...core,
          translationStatus: "complete",
          translationReviewedBy: null,
          translationReviewedAt: null,
          title: { ...core.title, th: "" },
          description: { ...core.description, th: "" },
        },
      ],
    });

    expect(tags(issues)).toContain("Translation");
  });

  test("rejects a reviewed object without reviewer fields", () => {
    const issues = run({
      ...base,
      requirements: [
        {
          ...core,
          reviewStatus: "reviewed",
          reviewedBy: null,
          reviewedAt: null,
          reviewScope: null,
        },
      ],
    });

    expect(tags(issues)).toContain("Review");
  });

  test("rejects a module requirement owned by another module", () => {
    const issues = run({
      ...base,
      modules: [
        {
          ...module,
          requirements: [
            {
              ...firstModuleRequirement,
              module: must(moduleId("SRAS-INT")),
            },
          ],
        },
      ],
    });

    expect(tags(issues)).toContain("Ownership");
  });

  test("rejects an overlay requirement owned by another overlay", () => {
    const issues = run({
      ...base,
      overlays: [
        {
          ...overlay,
          adds: [
            {
              ...firstAdd,
              overlay: must(overlayId("TH-ECM")),
              applicability: {
                ...firstAdd.applicability,
                modules: [],
                overlays: [overlay.id],
              },
            },
          ],
        },
      ],
    });

    expect(tags(issues)).toContain("Ownership");
  });

  test("rejects a duplicate requirement statement", () => {
    const issues = run({
      ...base,
      requirements: [
        core,
        {
          ...core,
          id: must(requirementId("SRAS-SEC-002")),
        },
      ],
    });

    expect(tags(issues)).toContain("DuplicateStatement");
  });

  test("rejects a manifest profile without a profile file", () => {
    const issues = run({
      ...base,
      profiles: [profileLite],
    });

    expect(tags(issues)).toContain("Manifest");
  });

  test("rejects a core domain missing from the manifest", () => {
    const issues = run({
      ...base,
      manifest: {
        ...manifest,
        domains: manifest.domains.filter((domain) => domain !== "security"),
      },
    });

    expect(tags(issues)).toContain("Manifest");
  });

  test("rejects a register mapping to a missing requirement", () => {
    const issues = run({
      ...base,
      registers: [makeRegister([must(requirementId("SRAS-SEC-999"))])],
    });

    expect(tags(issues)).toContain("MissingReference");
  });

  test("rejects a reviewed register without reviewer fields", () => {
    const issues = run({
      ...base,
      registers: [
        {
          ...makeRegister([]),
          reviewStatus: "reviewed",
        },
      ],
    });

    expect(tags(issues)).toContain("Review");
  });

  test("accepts a crosswalk that maps an existing requirement", () => {
    const result = validateStandard({
      ...base,
      crosswalks: [makeCrosswalk(core.id)],
    });

    expect(result.ok).toBe(true);
  });

  test("rejects a crosswalk mapping to a missing requirement", () => {
    const issues = run({
      ...base,
      crosswalks: [makeCrosswalk(must(requirementId("SRAS-SEC-999")))],
    });

    expect(tags(issues)).toContain("MissingReference");
  });

  test("rejects a reviewed crosswalk without reviewer fields", () => {
    const issues = run({
      ...base,
      crosswalks: [
        {
          ...makeCrosswalk(core.id),
          reviewStatus: "reviewed",
        },
      ],
    });

    expect(tags(issues)).toContain("Review");
  });

  test("rejects a complete crosswalk translation without a reviewer", () => {
    const issues = run({
      ...base,
      crosswalks: [
        {
          ...makeCrosswalk(core.id),
          translationStatus: "complete",
        },
      ],
    });

    expect(tags(issues)).toContain("Translation");
  });

  test("rejects duplicate crosswalk IDs", () => {
    const issues = run({
      ...base,
      crosswalks: [makeCrosswalk(core.id), makeCrosswalk(core.id)],
    });

    expect(tags(issues)).toContain("DuplicateId");
  });

  test("rejects duplicate overlay requirement IDs", () => {
    const duplicateAdd = {
      ...firstAdd,
      applicability: {
        ...firstAdd.applicability,
        modules: [],
        overlays: [overlay.id],
      },
    };
    const issues = run({
      ...base,
      overlays: [
        {
          ...overlay,
          adds: [duplicateAdd, duplicateAdd],
        },
      ],
    });

    expect(tags(issues)).toContain("DuplicateId");
  });
});
