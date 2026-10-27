import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import {
  parseCrosswalkFile,
  parseManifestFile,
  parseModuleFile,
  parseOverlayFile,
  parseProfileFile,
  parseRequirementsFile,
} from "../../src/sras/standard/parse.js";
import type { ValidationIssue } from "../../src/sras/standard/types.js";

const expectError = (
  result: Result<unknown, readonly ValidationIssue[]>,
): void => {
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.error.length).toBeGreaterThan(0);
};

const invalidCore = {
  id: "SRAS-SEC-1",
  version: "bad",
  title: { en: 1, th: 2 },
  description: [],
  rationale: null,
  domain: "nope",
  criticality: "nope",
  applicability: {
    tiers: ["1"],
    modules: [1],
    overlays: [1],
    excludes: [1],
  },
  evidence: [],
  assessment: {},
  references: [],
  tags: [],
  status: "nope",
  introduced_in: "bad",
  deprecated_in: "bad",
  replaced_by: 1,
  translation_status: "nope",
  review_status: "nope",
  machine_translated: "yes",
  created_at: "bad",
  updated_at: "bad",
};

const invalidModuleRequirement = {
  id: "SRAS-AI-1",
  version: "bad",
  module: "SRAS-XXX",
  title: { en: 1, th: 2 },
  description: [],
  rationale: null,
  criticality: "nope",
  applicability: {
    tiers: ["1"],
    modules: [1],
    overlays: [1],
    excludes: [1],
  },
  evidence: [],
  assessment: {},
  references: [],
  tags: [],
  status: "nope",
  introduced_in: "bad",
  deprecated_in: "bad",
  replaced_by: 1,
  translation_status: "nope",
  review_status: "nope",
  created_at: "bad",
  updated_at: "bad",
};

const invalidModule = {
  id: "SRAS-XXX",
  title: { en: 1, th: 2 },
  description: [],
  version: "bad",
  applies_to: [1],
  requires: [1],
  requirements: [invalidModuleRequirement],
  status: "nope",
  deprecated_in: "bad",
  replaced_by: 1,
  translation_status: "nope",
  review_status: "nope",
  created_at: "bad",
  updated_at: "bad",
};

const invalidOverlayRequirement = {
  id: "TH-FIN-1",
  version: "bad",
  overlay: "TH-FINANCE",
  title: { en: 1, th: 2 },
  description: [],
  rationale: null,
  criticality: "nope",
  applicability: {
    tiers: ["1"],
    modules: [1],
    overlays: [1],
    excludes: [1],
  },
  evidence: [],
  assessment: {},
  references: [],
  tags: [],
  status: "nope",
  introduced_in: "bad",
  deprecated_in: "bad",
  replaced_by: 1,
  translation_status: "nope",
  review_status: "nope",
  created_at: "bad",
  updated_at: "bad",
};

const invalidOverlay = {
  id: "TH-FINANCE",
  type: "nope",
  jurisdiction: 1,
  industry: "nope",
  title: { en: 1, th: 2 },
  description: [],
  version: "bad",
  extends: "bad",
  requires: [1],
  adds: [invalidOverlayRequirement],
  overrides: [1],
  waives: [1],
  sources: [1],
  not_covered: 1,
  review_checklist: 1,
  status: "nope",
  deprecated_in: "bad",
  replaced_by: 1,
  translation_status: "nope",
  review_status: "nope",
  created_at: "bad",
  updated_at: "bad",
};

const invalidProfile = {
  id: "nope",
  title: { en: 1, th: 2 },
  description: [],
  version: "bad",
  statuses: [1],
  maturity_levels: [1],
  weighted_index: "yes",
  evidence_coverage: 1,
  gate_report: "no",
  status: "nope",
  deprecated_in: "bad",
  translation_status: "nope",
  review_status: "nope",
  created_at: "bad",
  updated_at: "bad",
};

const invalidManifest = {
  standard: "NOT-SRAS",
  standard_version: "bad",
  status: "nope",
  released_at: 1,
  profiles: [1],
  domains: [1],
  license: "NOT-MIT",
};

const invalidCrosswalk = {
  id: "ISO27001",
  title: { en: 1, th: 2 },
  description: [],
  version: "bad",
  source_standard: 1,
  source_url: 1,
  mappings: [
    {
      requirement: 1,
      external: 1,
      relationship: "equivalent",
      notes: 1,
    },
  ],
  status: "nope",
  deprecated_in: "bad",
  replaced_by: 1,
  translation_status: "nope",
  review_status: "nope",
  created_at: "bad",
  updated_at: "bad",
};

describe("parse error paths", () => {
  test("requirements files", () => {
    expectError(parseRequirementsFile(null, "core/domains/x.yaml"));
    expectError(parseRequirementsFile([null], "core/domains/x.yaml"));
    expectError(parseRequirementsFile([{}], "core/domains/x.yaml"));
    expectError(parseRequirementsFile([invalidCore], "core/domains/x.yaml"));
  });

  test("module files", () => {
    expectError(parseModuleFile(null, "modules/ai/module.yaml"));
    expectError(parseModuleFile({}, "modules/ai/module.yaml"));
    expectError(parseModuleFile(invalidModule, "modules/ai/module.yaml"));
    expectError(
      parseModuleFile(
        {
          ...invalidModule,
          requirements: [],
        },
        "modules/ai/module.yaml",
      ),
    );
  });

  test("overlay files", () => {
    expectError(
      parseOverlayFile(null, "overlays/industries/finance/overlay.yaml"),
    );
    expectError(
      parseOverlayFile({}, "overlays/industries/finance/overlay.yaml"),
    );
    expectError(
      parseOverlayFile(
        invalidOverlay,
        "overlays/industries/finance/overlay.yaml",
      ),
    );
    expectError(
      parseOverlayFile(
        {
          ...invalidOverlay,
          overrides: [{ requirement: 1, replacement: null, rationale: 1 }],
          waives: [
            {
              requirement: 1,
              justification: 1,
              risk_owner: 1,
              expires_at: 1,
              rationale: 1,
            },
          ],
        },
        "overlays/industries/finance/overlay.yaml",
      ),
    );
  });

  test("profile files", () => {
    expectError(parseProfileFile(null, "core/profiles/lite.yaml"));
    expectError(parseProfileFile({}, "core/profiles/lite.yaml"));
    expectError(parseProfileFile(invalidProfile, "core/profiles/lite.yaml"));
  });

  test("manifest files", () => {
    expectError(parseManifestFile(null, "core/sras.yaml"));
    expectError(parseManifestFile({}, "core/sras.yaml"));
    expectError(parseManifestFile(invalidManifest, "core/sras.yaml"));
  });

  test("crosswalk files", () => {
    expectError(parseCrosswalkFile(null, "mappings/iso-27001.yaml"));
    expectError(parseCrosswalkFile({}, "mappings/iso-27001.yaml"));
    expectError(
      parseCrosswalkFile(invalidCrosswalk, "mappings/iso-27001.yaml"),
    );
    expectError(
      parseCrosswalkFile(
        {
          ...invalidCrosswalk,
          mappings: [],
        },
        "mappings/iso-27001.yaml",
      ),
    );
  });
});
