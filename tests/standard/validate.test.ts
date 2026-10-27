import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import {
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
  version,
  versionRange,
} from "../../src/sras/standard/primitives.js";
import { validateStandard } from "../../src/sras/standard/validate.js";
import type {
  CoreRequirement,
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
): RegisterEntry => ({
  tag: "RegisterEntry",
  sourceFile: "registers/th/pdpa.yaml",
  version: must(version("0.1.0")),
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
  id: must(registerEntryId("TH-PDPA-001")),
  jurisdiction: "TH",
  mappedRequirements: mapped,
  sourceUrl: "https://example.com",
  lastVerified: must(isoDate("2026-10-27")),
  reviewDue: must(isoDate("2027-04-27")),
  registerStatus: "in_force",
});

describe("validateStandard", () => {
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
