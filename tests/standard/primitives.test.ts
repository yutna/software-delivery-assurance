import { describe, expect, test } from "vitest";
import {
  compareVersions,
  isoDate,
  satisfiesRange,
  version,
  versionRange,
  type Version,
  type VersionRange,
} from "../../src/sras/standard/primitives.js";

const mustVersion = (value: string): Version => {
  const parsed = version(value);
  if (!parsed.ok) throw new Error(value);
  return parsed.value;
};

const mustRange = (value: string): VersionRange => {
  const parsed = versionRange(value);
  if (!parsed.ok) throw new Error(value);
  return parsed.value;
};

describe("version", () => {
  test("accepts semantic versions", () => {
    expect(version("0.1.0")).toEqual({ ok: true, value: "0.1.0" });
    expect(version("12.34.56")).toEqual({ ok: true, value: "12.34.56" });
  });

  test("rejects non-semantic versions", () => {
    expect(version("v0.1.0")).toEqual({
      ok: false,
      error: { tag: "InvalidVersion", value: "v0.1.0" },
    });
    expect(version("1.2")).toEqual({
      ok: false,
      error: { tag: "InvalidVersion", value: "1.2" },
    });
  });
});

describe("isoDate", () => {
  test("accepts real calendar dates", () => {
    expect(isoDate("2026-10-27")).toEqual({ ok: true, value: "2026-10-27" });
    expect(isoDate("2024-02-29")).toEqual({ ok: true, value: "2024-02-29" });
  });

  test("rejects impossible and malformed dates", () => {
    expect(isoDate("2026-02-29")).toEqual({
      ok: false,
      error: { tag: "InvalidDate", value: "2026-02-29" },
    });
    expect(isoDate("2026-02-30")).toEqual({
      ok: false,
      error: { tag: "InvalidDate", value: "2026-02-30" },
    });
    expect(isoDate("2026-13-01")).toEqual({
      ok: false,
      error: { tag: "InvalidDate", value: "2026-13-01" },
    });
    expect(isoDate("27-10-2026")).toEqual({
      ok: false,
      error: { tag: "InvalidDate", value: "27-10-2026" },
    });
  });
});

describe("versionRange", () => {
  test("accepts the supported range syntax", () => {
    expect(versionRange(">=0.1.0 <1.0.0")).toEqual({
      ok: true,
      value: ">=0.1.0 <1.0.0",
    });
    expect(versionRange("0.1.0")).toEqual({ ok: true, value: "0.1.0" });
  });

  test("rejects unsupported range syntax", () => {
    expect(versionRange(">=0.1")).toEqual({
      ok: false,
      error: { tag: "InvalidVersionRange", value: ">=0.1" },
    });
    expect(versionRange("not-a-range")).toEqual({
      ok: false,
      error: { tag: "InvalidVersionRange", value: "not-a-range" },
    });
  });
});

describe("version comparison and range satisfaction", () => {
  test("compares versions by major, minor, and patch", () => {
    expect(compareVersions(mustVersion("1.0.0"), mustVersion("1.0.0"))).toBe(0);
    expect(compareVersions(mustVersion("1.0.0"), mustVersion("0.9.9"))).toBe(1);
    expect(compareVersions(mustVersion("1.0.0"), mustVersion("1.1.0"))).toBe(
      -1,
    );
    expect(compareVersions(mustVersion("1.2.3"), mustVersion("1.2.4"))).toBe(
      -1,
    );
  });

  test("satisfies every supported operator", () => {
    const candidates = mustVersion("1.2.3");

    expect(satisfiesRange(candidates, mustRange(">=1.2.3 <2.0.0"))).toBe(true);
    expect(satisfiesRange(candidates, mustRange(">1.2.2"))).toBe(true);
    expect(satisfiesRange(candidates, mustRange("<=1.2.3"))).toBe(true);
    expect(satisfiesRange(candidates, mustRange("<1.2.3"))).toBe(false);
    expect(satisfiesRange(candidates, mustRange("=1.2.3"))).toBe(true);
    expect(satisfiesRange(candidates, mustRange("=1.2.4"))).toBe(false);
  });

  test("rejects a candidate outside an AND range", () => {
    const range = mustRange(">=0.1.0 <1.0.0");

    expect(satisfiesRange(mustVersion("0.1.0"), range)).toBe(true);
    expect(satisfiesRange(mustVersion("0.9.9"), range)).toBe(true);
    expect(satisfiesRange(mustVersion("1.0.0"), range)).toBe(false);
    expect(satisfiesRange(mustVersion("0.0.9"), range)).toBe(false);
  });
});
