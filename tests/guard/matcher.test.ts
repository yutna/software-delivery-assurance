import { describe, expect, test } from "vitest";
import {
  compileRules,
  findFindings,
  isExcluded,
  pathMatches,
} from "../../src/sras/guard/matcher.js";
import type { GuardRuleSet } from "../../src/sras/guard/types.js";

const rules: GuardRuleSet = {
  categories: [
    { category: "healthcare", phrase: "hospital", reason: "healthcare" },
    { category: "healthcare", phrase: "healthcare", reason: "healthcare" },
    { category: "secrets", phrase: "ghp_", reason: "secrets" },
    { category: "network", phrase: "localhost", reason: "network" },
  ],
  regexes: [
    {
      id: "private-ip",
      category: "network",
      pattern: "\\b10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b",
      flags: "",
      reason: "network",
    },
  ],
  exclude: [
    { path: "tests/**", reason: "fixtures" },
    { path: "seed/**", reason: "seed" },
  ],
  allow: [
    {
      path: "SCOPE.md",
      text: "Healthcare is out of scope",
      reason: "boundary",
    },
  ],
};

const compiled = compileRules(rules);

if (!compiled.ok) throw new Error("sample rules must compile");

describe("path matching", () => {
  test("matches exact paths, single stars, and double stars", () => {
    expect(pathMatches("SCOPE.md", "SCOPE.md")).toBe(true);
    expect(pathMatches("SCOPE.md", "README.md")).toBe(false);
    expect(pathMatches("seed/**", "seed/a.md")).toBe(true);
    expect(pathMatches("tests/**", "tests/guard/a.yaml")).toBe(true);
    expect(pathMatches("core/*.yaml", "core/sras.yaml")).toBe(true);
    expect(pathMatches("core/*.yaml", "core/domains/security.yaml")).toBe(
      false,
    );
  });

  test("filters excluded paths", () => {
    expect(isExcluded("tests/guard/a.yaml", rules)).toBe(true);
    expect(isExcluded("seed/a.md", rules)).toBe(true);
    expect(isExcluded("core/sras.yaml", rules)).toBe(false);
  });
});

describe("findFindings", () => {
  test("finds category terms, redacts the preview, and reports the line", () => {
    const findings = findFindings(
      "clean line\na hospital provides healthcare\n",
      "README.md",
      compiled.value,
      rules.allow,
    );

    expect(findings).toHaveLength(2);
    expect(findings[0]?.line).toBe(2);
    expect(findings[0]?.category).toBe("healthcare");
    expect(findings[0]?.preview).not.toContain("hospital");
    expect(findings[0]?.preview).not.toContain("healthcare");
    expect(findings[0]?.preview).toContain("[redacted]");
  });

  test("does not match a term inside a longer word", () => {
    const findings = findFindings(
      "hospitality is not a hospital\n",
      "README.md",
      compiled.value,
      rules.allow,
    );

    expect(findings).toHaveLength(1);
  });

  test("deduplicates repeated matches on the same line and rule", () => {
    const findings = findFindings(
      "hospital hospital hospital\n",
      "README.md",
      compiled.value,
      rules.allow,
    );

    expect(findings).toHaveLength(1);
  });

  test("allows the exact boundary phrase only in SCOPE.md", () => {
    expect(
      findFindings(
        "Healthcare is out of scope.\n",
        "SCOPE.md",
        compiled.value,
        rules.allow,
      ),
    ).toEqual([]);
    expect(
      findFindings(
        "Healthcare is out of scope.\n",
        "README.md",
        compiled.value,
        rules.allow,
      ),
    ).toHaveLength(1);
  });

  test("rejects an expanded boundary phrase", () => {
    expect(
      findFindings(
        "Healthcare is out of scope of this library.\n",
        "SCOPE.md",
        compiled.value,
        rules.allow,
      ),
    ).not.toEqual([]);
  });

  test("matches literal secret and network patterns without leaking them", () => {
    const findings = findFindings(
      "token ghp_abcdef and host localhost plus 10.0.0.1\n",
      "README.md",
      compiled.value,
      rules.allow,
    );

    expect(findings.map((finding) => finding.category).sort()).toEqual([
      "network",
      "network",
      "secrets",
    ]);
    for (const finding of findings) {
      expect(finding.preview).not.toContain("ghp_abcdef");
      expect(finding.preview).not.toContain("localhost");
      expect(finding.preview).not.toContain("10.0.0.1");
    }
  });
});

describe("compileRules", () => {
  test("reports an invalid regular expression", () => {
    const invalid: GuardRuleSet = {
      ...rules,
      regexes: [
        {
          id: "bad",
          category: "network",
          pattern: "(",
          flags: "",
          reason: "bad",
        },
      ],
    };
    const result = compileRules(invalid);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("Regex");
  });
});
