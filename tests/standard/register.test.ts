import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import { requirementId } from "../../src/sras/standard/ids.js";
import {
  parseManifestFile,
  parseProfileFile,
  parseRegisterFile,
  parseRequirementsFile,
} from "../../src/sras/standard/parse.js";
import { isoDate, revision } from "../../src/sras/standard/primitives.js";
import { validateStandard } from "../../src/sras/standard/validate.js";
import type {
  CoreRequirement,
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

const isObject = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asObject = (value: unknown): Readonly<Record<string, unknown>> => {
  if (!isObject(value)) {
    throw new Error("fixture must be an object");
  }

  return value;
};

const dto = asObject(fixture("valid/register-entry.yaml"));
const register = must(parseRegisterFile(dto, "registers/th/th-test-001.yaml"));

const without = (
  object: Readonly<Record<string, unknown>>,
  key: string,
): Readonly<Record<string, unknown>> =>
  Object.fromEntries(Object.entries(object).filter(([name]) => name !== key));

const firstCore: CoreRequirement | undefined = must(
  parseRequirementsFile(
    fixture("valid/requirements-file.yaml"),
    "core/domains/security.yaml",
  ),
)[0];

if (firstCore === undefined) {
  throw new Error("core fixture must have one requirement");
}

const manifest = must(
  parseManifestFile(fixture("valid/standard.yaml"), "core/sras.yaml"),
);
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

const entry: RegisterEntry = {
  ...register,
  mappedRequirements: [firstCore.id],
};

const base: Standard = {
  manifest,
  requirements: [firstCore],
  modules: [],
  overlays: [],
  registers: [entry],
  crosswalks: [],
  profiles: [profileLite, profileFull],
};

const issuesOf = (standard: Standard): readonly ValidationIssue[] => {
  const result = validateStandard(standard);

  if (result.ok) throw new Error("expected validation issues");
  return result.error;
};

const tags = (issues: readonly ValidationIssue[]): readonly string[] =>
  issues.map((issue) => issue.tag);

describe("parseRegisterFile", () => {
  test("parses a register entry into readonly domain fields", () => {
    expect(register.tag).toBe("RegisterEntry");
    expect(register.id).toBe("TH-TEST-001");
    expect(register.jurisdiction).toBe("TH");
    expect(register.instrumentType).toBe("law");
    expect(register.sourceUrl).toBe("https://example.com/test-instrument");
    expect(register.effectiveDate).toBe("2019-05-28");
    expect(register.revision).toBe("2026-10-27.r1");
    expect(register.lastVerified).toBe("2026-10-27");
    expect(register.reviewDue).toBe("2027-04-27");
    expect(register.registerStatus).toBe("in_force");
    expect(register.obligations).toHaveLength(2);
    expect(register.mappedRequirements).toEqual([
      "SRAS-SEC-001",
      "SRAS-PRV-001",
    ]);
    expect(register.appliesTo.sectors).toHaveLength(4);
    expect(register.appliesTo.roles).toEqual([
      "data-controller",
      "data-processor",
    ]);
    expect(register.sourceLanguage).toBe("th");
    expect(register.reviewStatus).toBe("unverified");
    expect(register.reviewedBy).toBeNull();
    expect(register.translationStatus).toBe("partial");
    expect(register.machineTranslated).toBe(true);
  });

  test("accepts an explicitly unknown effective date", () => {
    const result = parseRegisterFile(
      { ...dto, effective_date: null },
      "registers/th/th-test-001.yaml",
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.effectiveDate).toBeNull();
  });

  test("rejects an unknown instrument type", () => {
    const result = parseRegisterFile(
      { ...dto, instrument_type: "decree" },
      "registers/th/th-test-001.yaml",
    );

    expect(result.ok).toBe(false);
  });

  test("rejects a missing revision", () => {
    const result = parseRegisterFile(
      without(dto, "revision"),
      "registers/th/th-test-001.yaml",
    );

    expect(result.ok).toBe(false);
  });

  test("rejects a revision that is not a dated revision", () => {
    const result = parseRegisterFile(
      { ...dto, revision: "2026-10-27" },
      "registers/th/th-test-001.yaml",
    );

    expect(result.ok).toBe(false);
  });

  test("rejects an entry without obligations", () => {
    const result = parseRegisterFile(
      { ...dto, obligations: [] },
      "registers/th/th-test-001.yaml",
    );

    expect(result.ok).toBe(false);
  });

  test("rejects an entry without mapped requirements", () => {
    const result = parseRegisterFile(
      { ...dto, mapped_requirements: [] },
      "registers/th/th-test-001.yaml",
    );

    expect(result.ok).toBe(false);
  });

  test("rejects applies_to without a role", () => {
    const result = parseRegisterFile(
      {
        ...dto,
        applies_to: {
          sectors: ["finance"],
          roles: [],
          data_types: ["personal-data"],
        },
      },
      "registers/th/th-test-001.yaml",
    );

    expect(result.ok).toBe(false);
  });
});

describe("register validation", () => {
  test("accepts a coherent register entry", () => {
    expect(validateStandard(base).ok).toBe(true);
  });

  test("rejects a register mapping to a missing requirement", () => {
    const issues = issuesOf({
      ...base,
      registers: [
        {
          ...entry,
          mappedRequirements: [must(requirementId("SRAS-SEC-999"))],
        },
      ],
    });

    expect(tags(issues)).toContain("MissingReference");
  });

  test("rejects a reviewed register without reviewer fields", () => {
    const issues = issuesOf({
      ...base,
      registers: [{ ...entry, reviewStatus: "reviewed" }],
    });

    expect(tags(issues)).toContain("Review");
  });

  test("rejects a complete translation without a reviewer", () => {
    const issues = issuesOf({
      ...base,
      registers: [{ ...entry, translationStatus: "complete" }],
    });

    expect(tags(issues)).toContain("Translation");
  });

  test("rejects a complete translation with an empty Thai summary", () => {
    const issues = issuesOf({
      ...base,
      registers: [
        {
          ...entry,
          translationStatus: "complete",
          translationReviewedBy: "Test reviewer",
          translationReviewedAt: must(isoDate("2026-10-27")),
          summary: { ...entry.summary, th: "" },
        },
      ],
    });

    expect(tags(issues)).toContain("Translation");
  });

  test("rejects duplicate register IDs", () => {
    const issues = issuesOf({
      ...base,
      registers: [entry, { ...entry }],
    });

    expect(tags(issues)).toContain("DuplicateId");
  });

  test("keeps the revision brand distinct from a date", () => {
    expect(revision("2026-10-27.r1").ok).toBe(true);
    expect(revision("2026-10-27").ok).toBe(false);
    expect(isoDate("2026-10-27").ok).toBe(true);
  });
});
