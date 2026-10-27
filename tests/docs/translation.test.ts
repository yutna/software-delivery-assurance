import { describe, expect, test } from "vitest";
import {
  counterpartPath,
  readMachineTranslated,
  readTranslationStatus,
} from "../../docs/.vitepress/theme/translation.js";

describe("readTranslationStatus", () => {
  test("defaults to complete when the field is absent", () => {
    expect(readTranslationStatus({})).toBe("complete");
    expect(readTranslationStatus(undefined)).toBe("complete");
    expect(readTranslationStatus(null)).toBe("complete");
    expect(readTranslationStatus("partial")).toBe("complete");
  });

  test("reads each valid status", () => {
    expect(readTranslationStatus({ translation_status: "complete" })).toBe(
      "complete",
    );
    expect(readTranslationStatus({ translation_status: "partial" })).toBe(
      "partial",
    );
    expect(readTranslationStatus({ translation_status: "missing" })).toBe(
      "missing",
    );
  });

  test("treats an unknown value as complete rather than guessing", () => {
    expect(readTranslationStatus({ translation_status: "draft" })).toBe(
      "complete",
    );
    expect(readTranslationStatus({ translation_status: 1 })).toBe("complete");
  });
});

describe("readMachineTranslated", () => {
  test("only an explicit true counts", () => {
    expect(readMachineTranslated({ machine_translated: true })).toBe(true);
    expect(readMachineTranslated({ machine_translated: false })).toBe(false);
    expect(readMachineTranslated({ machine_translated: "true" })).toBe(false);
    expect(readMachineTranslated({})).toBe(false);
    expect(readMachineTranslated(undefined)).toBe(false);
  });
});

describe("counterpartPath", () => {
  test("maps a locale index to the other locale root", () => {
    expect(counterpartPath("en/index.md")).toBe("/th/");
    expect(counterpartPath("th/index.md")).toBe("/en/");
  });

  test("maps a nested index to a trailing slash", () => {
    expect(counterpartPath("en/concepts/index.md")).toBe("/th/concepts/");
    expect(counterpartPath("th/concepts/index.md")).toBe("/en/concepts/");
  });

  test("maps a leaf page without an extension", () => {
    expect(counterpartPath("en/quick-start.md")).toBe("/th/quick-start");
    expect(counterpartPath("th/registers/index.md")).toBe("/en/registers/");
    expect(counterpartPath("th/reference/index.md")).toBe("/en/reference/");
  });

  test("returns undefined outside the two locale trees", () => {
    expect(counterpartPath("index.md")).toBeUndefined();
    expect(counterpartPath("en")).toBeUndefined();
    expect(counterpartPath("fr/index.md")).toBeUndefined();
  });
});
