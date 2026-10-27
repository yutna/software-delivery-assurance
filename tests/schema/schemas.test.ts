import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import type { ErrorObject } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";

const require = createRequire(import.meta.url);
const addFormats = require("ajv-formats") as (ajv: Ajv2020) => Ajv2020;

const schemaDirectory = join(process.cwd(), "schemas");
const fixtureDirectory = join(process.cwd(), "tests", "fixtures");
const schemaNames = [
  "requirement",
  "requirements-file",
  "module",
  "overlay",
  "profile",
  "standard",
  "crosswalk",
  "register-entry",
  "assurance",
  "assessment",
  "evidence-index",
  "claim",
  "risk-register",
  "project-lock",
] as const;

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

const schemaIds = new Map<string, string>();

for (const name of schemaNames) {
  const parsed: unknown = JSON.parse(
    readFileSync(join(schemaDirectory, `${name}.schema.json`), "utf8"),
  );

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error(`${name}.schema.json is not an object`);
  }

  ajv.addSchema(parsed);

  const id = "$id" in parsed ? parsed.$id : undefined;

  if (typeof id !== "string") {
    throw new Error(`${name}.schema.json has no $id`);
  }

  schemaIds.set(name, id);
}

type FixtureResult = {
  readonly ok: boolean;
  readonly errors: readonly ErrorObject[];
};

const validateFixture = (
  schemaName: string,
  fixturePath: string,
): FixtureResult => {
  const data: unknown = parse(
    readFileSync(join(fixtureDirectory, fixturePath), "utf8"),
  );
  const schemaId = schemaIds.get(schemaName);
  const validate = schemaId === undefined ? undefined : ajv.getSchema(schemaId);

  if (validate === undefined) {
    throw new Error(`schema not registered: ${schemaName}`);
  }

  const ok = validate(data);

  return { ok, errors: validate.errors ?? [] };
};

const validFixtures = [
  ["requirement", "valid/requirement-gate.yaml"],
  ["requirements-file", "valid/requirements-file.yaml"],
  ["module", "valid/module-ai.yaml"],
  ["overlay", "valid/overlay-finance.yaml"],
  ["profile", "valid/profile-lite.yaml"],
  ["standard", "valid/standard.yaml"],
  ["crosswalk", "valid/crosswalk.yaml"],
  ["register-entry", "valid/register-entry.yaml"],
  ["assurance", "project/valid/project-manifest.yaml"],
  ["assessment", "project/valid/assessment.yaml"],
  ["evidence-index", "project/valid/evidence-index.yaml"],
  ["claim", "project/valid/claims.yaml"],
  ["risk-register", "project/valid/risk-register.yaml"],
  ["project-lock", "project/valid/project-lock.yaml"],
] as const;

const invalidFixtures = [
  ["requirement", "invalid/requirement-bad-id.yaml", "/id"],
  ["requirement", "invalid/requirement-missing-thai.yaml", "/title"],
  ["requirement", "invalid/requirement-reviewed-no-reviewer.yaml", ""],
  ["module", "invalid/module-bad-id.yaml", "/requirements/0/id"],
  ["overlay", "invalid/overlay-bad-extends.yaml", "/extends"],
  ["standard", "invalid/standard-bad-domain.yaml", "/domains"],
  [
    "crosswalk",
    "invalid/crosswalk-bad-relationship.yaml",
    "/mappings/0/relationship",
  ],
  ["register-entry", "invalid/register-entry-bad-status.yaml", "/status"],
  ["assurance", "project/invalid/project-manifest-bad-tier.yaml", "/tier"],
  [
    "assessment",
    "project/invalid/assessment-maturity-null-full.yaml",
    "/requirements/0/maturity",
  ],
  [
    "evidence-index",
    "project/invalid/evidence-url-location.yaml",
    "/entries/0/location",
  ],
  [
    "claim",
    "project/invalid/claim-approved-missing.yaml",
    "/claims/0/approved_by",
  ],
  [
    "risk-register",
    "project/invalid/risk-accepted-no-acceptance.yaml",
    "/risks/0/acceptance_id",
  ],
  [
    "project-lock",
    "project/invalid/project-lock-bad-checksum.yaml",
    "/sras/checksum",
  ],
] as const;

describe("JSON Schema 2020-12 contracts", () => {
  for (const [schemaName, fixturePath] of validFixtures) {
    test(`${schemaName} accepts ${fixturePath}`, () => {
      const result = validateFixture(schemaName, fixturePath);

      expect(result.ok).toBe(true);
      expect(result.errors).toEqual([]);
    });
  }

  for (const [schemaName, fixturePath, expectedPath] of invalidFixtures) {
    test(`${schemaName} rejects ${fixturePath}`, () => {
      const result = validateFixture(schemaName, fixturePath);

      expect(result.ok).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);

      for (const error of result.errors) {
        expect(typeof error.instancePath).toBe("string");
        expect(typeof error.keyword).toBe("string");
        expect(typeof error.message).toBe("string");
      }

      if (expectedPath !== "") {
        expect(
          result.errors.some((error) =>
            error.instancePath.includes(expectedPath),
          ),
        ).toBe(true);
      }
    });
  }

  test("a reviewed requirement without a reviewer is rejected", () => {
    const result = validateFixture(
      "requirement",
      "invalid/requirement-reviewed-no-reviewer.yaml",
    );

    expect(
      result.errors.some(
        (error) =>
          error.keyword === "required" &&
          error.params["missingProperty"] === "reviewed_by",
      ),
    ).toBe(true);
  });
});

type RequirementLike = {
  readonly id: string;
  readonly criticality: string;
};

type OverlayLike = {
  readonly waives?: readonly {
    readonly requirement: string;
  }[];
};

const assertNoGateWaivers = (
  overlay: OverlayLike,
  requirements: readonly RequirementLike[],
): void => {
  const gateIds = new Set(
    requirements
      .filter((requirement) => requirement.criticality === "gate")
      .map((requirement) => requirement.id),
  );
  const violations = (overlay.waives ?? []).filter((waiver) =>
    gateIds.has(waiver.requirement),
  );

  if (violations.length > 0) {
    throw new Error(
      `gate requirement cannot be waived: ${violations
        .map((violation) => violation.requirement)
        .join(", ")}`,
    );
  }
};

describe("gate waiver policy", () => {
  test("a waiver that targets a gate requirement is rejected", () => {
    const requirement = parse(
      readFileSync(
        join(fixtureDirectory, "valid", "requirement-gate.yaml"),
        "utf8",
      ),
    ) as RequirementLike;
    const overlay = parse(
      readFileSync(
        join(fixtureDirectory, "invalid", "overlay-gate-waive.yaml"),
        "utf8",
      ),
    ) as OverlayLike;

    expect(() => {
      assertNoGateWaivers(overlay, [requirement]);
    }).toThrow("gate requirement cannot be waived");
  });

  test("a waiver that targets a non-gate requirement is allowed", () => {
    const requirement: RequirementLike = {
      id: "SRAS-GOV-001",
      criticality: "high",
    };
    const overlay: OverlayLike = {
      waives: [{ requirement: "SRAS-GOV-001" }],
    };

    expect(() => {
      assertNoGateWaivers(overlay, [requirement]);
    }).not.toThrow();
  });
});

type IdLike = {
  readonly id: string;
};

const assertUniqueIds = (items: readonly IdLike[]): void => {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`duplicate requirement id: ${item.id}`);
    }

    seen.add(item.id);
  }
};

describe("ID policy", () => {
  test("duplicate requirement IDs are rejected", () => {
    const items = parse(
      readFileSync(
        join(
          fixtureDirectory,
          "invalid",
          "requirements-file-duplicate-id.yaml",
        ),
        "utf8",
      ),
    ) as readonly IdLike[];

    expect(() => {
      assertUniqueIds(items);
    }).toThrow("duplicate requirement id");
  });

  test("the valid requirements file has unique IDs", () => {
    const items = parse(
      readFileSync(
        join(fixtureDirectory, "valid", "requirements-file.yaml"),
        "utf8",
      ),
    ) as readonly IdLike[];

    expect(() => {
      assertUniqueIds(items);
    }).not.toThrow();
  });
});
