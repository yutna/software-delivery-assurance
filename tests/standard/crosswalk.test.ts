import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import { parseCrosswalkFile } from "../../src/sras/standard/parse.js";
import type {
  Crosswalk,
  CrosswalkMapping,
  CrosswalkRelationship,
} from "../../src/sras/standard/types.js";
import { fixture } from "../helpers/content.js";

const root = process.cwd();

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

type MappingExpectation = {
  readonly file: string;
  readonly id: string;
  readonly mappings: number;
};

const mappingFiles: readonly MappingExpectation[] = [
  { file: "iso-27001.yaml", id: "MAP-ISO27001", mappings: 70 },
  { file: "nist-csf.yaml", id: "MAP-NISTCSF", mappings: 34 },
  { file: "owasp-asvs.yaml", id: "MAP-ASVS", mappings: 22 },
  { file: "pci-dss.yaml", id: "MAP-PCIDSS", mappings: 20 },
  { file: "wcag.yaml", id: "MAP-WCAG22", mappings: 8 },
  { file: "iso-42001.yaml", id: "MAP-ISO42001", mappings: 12 },
  { file: "nist-ai-rmf.yaml", id: "MAP-NISTAIRMF", mappings: 12 },
];

const loadCrosswalk = (file: string): Crosswalk => {
  const raw: unknown = parse(
    readFileSync(join(root, "mappings", file), "utf8"),
  );

  return must(parseCrosswalkFile(raw, `mappings/${file}`));
};

const requirementIdsFrom = (value: unknown): readonly string[] => {
  if (!Array.isArray(value)) {
    throw new Error("core domain file must contain an array");
  }

  const items: readonly unknown[] = value;

  return items.map((item) => {
    if (typeof item !== "object" || item === null || !("id" in item)) {
      throw new Error("core requirement must have an id");
    }

    const id = item.id;

    if (typeof id !== "string")
      throw new Error("core requirement id must be a string");

    return id;
  });
};

const moduleRequirementIdsFrom = (value: unknown): readonly string[] => {
  if (
    typeof value !== "object" ||
    value === null ||
    !("requirements" in value)
  ) {
    throw new Error("module file must contain requirements");
  }

  return requirementIdsFrom(value.requirements);
};

const coreRequirementIds = (): readonly string[] =>
  readdirSync(join(root, "core", "domains"))
    .filter((file) => file.endsWith(".yaml"))
    .flatMap((file) =>
      requirementIdsFrom(
        parse(readFileSync(join(root, "core", "domains", file), "utf8")),
      ),
    );

const moduleRequirementIds = (): readonly string[] =>
  readdirSync(join(root, "modules"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) =>
      moduleRequirementIdsFrom(
        parse(
          readFileSync(
            join(root, "modules", entry.name, "module.yaml"),
            "utf8",
          ),
        ),
      ),
    );

// The type-level check that the parser's domain value is readonly.
export const crosswalkDomainValueIsReadonly = (crosswalk: Crosswalk): void => {
  // @ts-expect-error crosswalk mappings are readonly
  crosswalk.mappings = [];

  const first: CrosswalkMapping = crosswalk.mappings[0];

  // @ts-expect-error mapping fields are readonly
  first.external = "A.0.0";
};

describe("crosswalk parser", () => {
  for (const expectation of mappingFiles) {
    test(`${expectation.file} parses as ${expectation.id}`, () => {
      const crosswalk = loadCrosswalk(expectation.file);

      expect(crosswalk.tag).toBe("Crosswalk");
      expect(crosswalk.id).toBe(expectation.id);
      expect(crosswalk.mappings).toHaveLength(expectation.mappings);
      expect(crosswalk.sourceStandard.trim()).not.toBe("");
      expect(crosswalk.sourceUrl.startsWith("https://")).toBe(true);
    });
  }

  test("every mapping is unverified and uses a relationship in the domain", () => {
    const allowed: readonly CrosswalkRelationship[] = [
      "supports",
      "partial",
      "related",
    ];
    const crosswalks = mappingFiles.map((expectation) =>
      loadCrosswalk(expectation.file),
    );

    for (const crosswalk of crosswalks) {
      expect(crosswalk.reviewStatus).toBe("unverified");

      for (const mapping of crosswalk.mappings) {
        expect(allowed).toContain(mapping.relationship);
        expect(mapping.external.trim()).not.toBe("");
      }
    }
  });

  test("the ISO mapping covers every Core requirement once", () => {
    const mapped = loadCrosswalk("iso-27001.yaml").mappings.map(
      (mapping) => mapping.requirement,
    );
    const core = coreRequirementIds();

    expect(core).toHaveLength(70);
    expect(new Set(mapped).size).toBe(mapped.length);
    expect([...mapped].sort()).toEqual([...core].sort());
  });

  test("every mapping target exists in Core or a module", () => {
    const known = new Set([...coreRequirementIds(), ...moduleRequirementIds()]);

    for (const expectation of mappingFiles) {
      for (const mapping of loadCrosswalk(expectation.file).mappings) {
        expect(known.has(mapping.requirement)).toBe(true);
      }
    }
  });

  test("rejects a relationship outside the domain", () => {
    const raw: unknown = parse(
      fixture("invalid/crosswalk-bad-relationship.yaml"),
    );
    const result = parseCrosswalkFile(raw, "mappings/bad.yaml");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.some((issue) => issue.tag === "Parse")).toBe(true);
    }
  });

  test("rejects an empty mapping list", () => {
    const valid: unknown = parse(fixture("valid/crosswalk.yaml"));

    if (typeof valid !== "object" || valid === null) {
      throw new Error("crosswalk fixture must be an object");
    }

    const result = parseCrosswalkFile(
      { ...valid, mappings: [] },
      "mappings/empty.yaml",
    );

    expect(result.ok).toBe(false);
  });
});
