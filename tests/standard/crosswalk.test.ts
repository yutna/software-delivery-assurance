import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import type {
  Crosswalk,
  CrosswalkMapping,
  CrosswalkRelationship,
} from "../../src/sras/standard/types.js";
import { parseCrosswalkFile } from "../../src/sras/standard/parse.js";
import { fixture } from "../helpers/content.js";

const root = process.cwd();

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const realCrosswalk = (): Crosswalk =>
  must(
    parseCrosswalkFile(
      parse(readFileSync(join(root, "mappings", "iso-27001.yaml"), "utf8")),
      "mappings/iso-27001.yaml",
    ),
  );

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

const coreRequirementIds = (): readonly string[] =>
  readdirSync(join(root, "core", "domains"))
    .filter((file) => file.endsWith(".yaml"))
    .flatMap((file) =>
      requirementIdsFrom(
        parse(readFileSync(join(root, "core", "domains", file), "utf8")),
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
  test("parses the ISO/IEC 27001 mapping into a readonly domain value", () => {
    const crosswalk = realCrosswalk();

    expect(crosswalk.tag).toBe("Crosswalk");
    expect(crosswalk.id).toBe("MAP-ISO27001");
    expect(crosswalk.sourceStandard).toBe("ISO/IEC 27001:2022");
    expect(crosswalk.sourceUrl).toBe("https://www.iso.org/standard/27001");
    expect(crosswalk.mappings).toHaveLength(70);
  });

  test("every Core requirement has one mapping", () => {
    const mapped = realCrosswalk().mappings.map(
      (mapping) => mapping.requirement,
    );
    const core = coreRequirementIds();

    expect(core).toHaveLength(70);
    expect(new Set(mapped).size).toBe(mapped.length);
    expect([...mapped].sort()).toEqual([...core].sort());
  });

  test("relationship values stay inside the domain", () => {
    const allowed: readonly CrosswalkRelationship[] = [
      "supports",
      "partial",
      "related",
    ];

    for (const mapping of realCrosswalk().mappings) {
      expect(allowed).toContain(mapping.relationship);
      expect(mapping.external.trim()).not.toBe("");
    }
  });

  test("the mapping is unverified", () => {
    expect(realCrosswalk().reviewStatus).toBe("unverified");
  });

  test("rejects a relationship outside the domain", () => {
    const result = parseCrosswalkFile(
      parse(
        readFileSync(
          join(
            root,
            "tests",
            "fixtures",
            "invalid",
            "crosswalk-bad-relationship.yaml",
          ),
          "utf8",
        ),
      ),
      "mappings/bad.yaml",
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.some((issue) => issue.tag === "Parse")).toBe(true);
    }
  });

  test("rejects an empty mapping list", () => {
    const result = parseCrosswalkFile(
      {
        ...parse(fixture("valid/crosswalk.yaml")),
        mappings: [],
      },
      "mappings/empty.yaml",
    );

    expect(result.ok).toBe(false);
  });
});
