import { err, ok, type Result } from "../foundation/result.js";
import type {
  GuardAllow,
  GuardError,
  GuardFinding,
  GuardRuleSet,
} from "./types.js";

export type CompiledRule = {
  readonly id: string;
  readonly category: string;
  readonly regex: RegExp;
  readonly reason: string;
};

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const pathMatches = (pattern: string, path: string): boolean => {
  let expression = "^";

  for (let index = 0; index < pattern.length; index += 1) {
    const character = pattern.charAt(index);

    if (character === "*" && pattern.charAt(index + 1) === "*") {
      expression += ".*";
      index += 1;
      continue;
    }

    if (character === "*") {
      expression += "[^/]*";
      continue;
    }

    if (character === "?") {
      expression += ".";
      continue;
    }

    expression += escapeRegExp(character);
  }

  return new RegExp(`${expression}$`).test(path);
};

export const compileRules = (
  rules: GuardRuleSet,
): Result<readonly CompiledRule[], GuardError> => {
  const compiled: CompiledRule[] = [];

  for (const [index, rule] of rules.categories.entries()) {
    const escaped = escapeRegExp(rule.phrase);
    const wordBoundary =
      rule.category !== "secrets" && rule.category !== "network";
    const flags = rule.category === "secrets" ? "g" : "gi";

    try {
      compiled.push({
        id: `category:${rule.category}:${String(index)}`,
        category: rule.category,
        regex: new RegExp(wordBoundary ? `\\b${escaped}\\b` : escaped, flags),
        reason: rule.reason,
      });
    } catch (error) {
      return err({
        tag: "Regex",
        id: `category:${rule.category}:${String(index)}`,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  for (const rule of rules.regexes) {
    const flags = rule.flags.includes("g") ? rule.flags : `${rule.flags}g`;

    try {
      compiled.push({
        id: rule.id,
        category: rule.category,
        regex: new RegExp(rule.pattern, flags),
        reason: rule.reason,
      });
    } catch (error) {
      return err({
        tag: "Regex",
        id: rule.id,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return ok(compiled);
};

const applyAllowlist = (
  text: string,
  file: string,
  allow: readonly GuardAllow[],
): string => {
  let result = text;

  for (const rule of allow) {
    if (!pathMatches(rule.path, file)) continue;

    const pattern = new RegExp(
      `(?<![\\p{L}\\p{N}])${escapeRegExp(rule.text)}(?=[\\s.,;:!?)]*(?:\\r?\\n|$))`,
      "gu",
    );
    result = result.replace(pattern, (match) => " ".repeat(match.length));
  }

  return result;
};

export const isExcluded = (file: string, rules: GuardRuleSet): boolean =>
  rules.exclude.some((rule) => pathMatches(rule.path, file));

export const findFindings = (
  text: string,
  file: string,
  rules: readonly CompiledRule[],
  allow: readonly GuardAllow[],
): readonly GuardFinding[] => {
  const sanitized = applyAllowlist(text, file, allow);
  const lines = text.split(/\r?\n/);
  const findings: GuardFinding[] = [];
  const seen = new Set<string>();

  const redact = (line: string): string => {
    let result = line;

    for (const rule of rules) {
      result = result.replace(rule.regex, "[redacted]");
    }

    return result.slice(0, 200);
  };

  for (const rule of rules) {
    for (const match of sanitized.matchAll(rule.regex)) {
      const index = match.index;
      const line = sanitized.slice(0, index).split(/\r?\n/).length;
      const key = `${file}:${String(line)}:${rule.id}`;

      if (seen.has(key)) continue;

      seen.add(key);
      findings.push({
        tag: "Finding",
        category: rule.category,
        ruleId: rule.id,
        file,
        line,
        preview: redact(lines[line - 1] ?? ""),
        reason: rule.reason,
      });
    }
  }

  return findings.sort(
    (left, right) =>
      left.file.localeCompare(right.file) ||
      left.line - right.line ||
      left.ruleId.localeCompare(right.ruleId),
  );
};
