import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import { loadStandardFromRoot } from "../../src/sras/standard/workflow.js";

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const PRACTICE = /^(PO|PS|PW|RV)\.\d+$/;

describe("NIST SSDF crosswalk", () => {
  test("names real SSDF practice identifiers and explains every partial mapping", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const crosswalk = loaded.standard.crosswalks.find(
      (candidate) => candidate.id === "MAP-NISTSSDF",
    );

    expect(crosswalk).toBeDefined();
    if (crosswalk === undefined) return;

    for (const mapping of crosswalk.mappings) {
      for (const practice of mapping.external.split(",")) {
        expect(PRACTICE.test(practice.trim())).toBe(true);
      }

      if (mapping.relationship === "partial") {
        expect(mapping.notes).not.toBeNull();
        expect(mapping.notes?.length ?? 0).toBeGreaterThan(0);
      }
    }

    expect(crosswalk.description.en).toContain("Not covered by this crosswalk");
    expect(crosswalk.description.en).toContain("not an equivalence");
  });
});
