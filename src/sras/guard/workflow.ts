import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { parseYaml } from "../adapters/yaml.js";
import { err, ok, type Result } from "../foundation/result.js";
import { compileRules, findFindings, isExcluded } from "./matcher.js";
import type {
  GuardAllow,
  GuardError,
  GuardExclude,
  GuardFinding,
  GuardPhraseRule,
  GuardRegexRule,
  GuardResult,
  GuardRuleSet,
} from "./types.js";

const MAX_BYTES = 1024 * 1024;
const CONTENT_DIRECTORIES = [
  "core",
  "modules",
  "overlays",
  "registers",
  "mappings",
  "templates",
  "examples",
  "docs",
] as const;
const SKIP_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  "dist",
  "coverage",
  ".claude",
  "vendor",
  "internal",
  "tests",
  "guard",
  "schemas",
  "src",
  "tools",
]);
const CONTENT_EXTENSIONS = [".md", ".yaml", ".yml", ".json", ".cff"] as const;

type ObjectValue = Readonly<Record<string, unknown>>;

const isObject = (value: unknown): value is ObjectValue =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (
  object: ObjectValue,
  key: string,
  file: string,
): Result<string, GuardError> => {
  const value = object[key];

  return typeof value === "string"
    ? ok(value)
    : err({
        tag: "Denylist",
        file,
        message: `${key} must be a string`,
      });
};

const readStringArray = (
  value: unknown,
  file: string,
  label: string,
): Result<readonly string[], GuardError> => {
  if (!Array.isArray(value)) {
    return err({
      tag: "Denylist",
      file,
      message: `${label} must be an array of strings`,
    });
  }

  const strings: string[] = [];

  for (const item of value) {
    if (typeof item !== "string") {
      return err({
        tag: "Denylist",
        file,
        message: `${label} must be an array of strings`,
      });
    }

    strings.push(item);
  }

  return ok(strings);
};

const toRuleSet = (
  value: unknown,
  file: string,
): Result<GuardRuleSet, GuardError> => {
  if (!isObject(value)) {
    return err({ tag: "Denylist", file, message: "expected an object" });
  }

  const categories: GuardPhraseRule[] = [];
  const categoryValue = value["categories"];

  if (categoryValue !== undefined) {
    if (!isObject(categoryValue)) {
      return err({
        tag: "Denylist",
        file,
        message: "categories must be an object",
      });
    }

    for (const [category, phrases] of Object.entries(categoryValue)) {
      const strings = readStringArray(phrases, file, `categories.${category}`);

      if (!strings.ok) return strings;

      for (const phrase of strings.value) {
        categories.push({ category, phrase, reason: category });
      }
    }
  }

  const regexes: GuardRegexRule[] = [];
  const regexValue = value["regexes"];

  if (regexValue !== undefined) {
    if (!Array.isArray(regexValue)) {
      return err({
        tag: "Denylist",
        file,
        message: "regexes must be an array",
      });
    }

    for (const [index, regex] of regexValue.entries()) {
      if (!isObject(regex)) {
        return err({
          tag: "Denylist",
          file,
          message: `regexes[${String(index)}] must be an object`,
        });
      }

      const id = readString(regex, "id", file);
      const category = readString(regex, "category", file);
      const pattern = readString(regex, "pattern", file);
      const reason = readString(regex, "reason", file);
      const flagsValue = regex["flags"];

      if (!id.ok) return id;
      if (!category.ok) return category;
      if (!pattern.ok) return pattern;
      if (!reason.ok) return reason;
      if (flagsValue !== undefined && typeof flagsValue !== "string") {
        return err({
          tag: "Denylist",
          file,
          message: `regexes[${String(index)}].flags must be a string`,
        });
      }

      regexes.push({
        id: id.value,
        category: category.value,
        pattern: pattern.value,
        flags: typeof flagsValue === "string" ? flagsValue : "",
        reason: reason.value,
      });
    }
  }

  const exclude: GuardExclude[] = [];
  const excludeValue = value["exclude"];

  if (excludeValue !== undefined) {
    if (!Array.isArray(excludeValue)) {
      return err({
        tag: "Denylist",
        file,
        message: "exclude must be an array",
      });
    }

    for (const [index, item] of excludeValue.entries()) {
      if (!isObject(item)) {
        return err({
          tag: "Denylist",
          file,
          message: `exclude[${String(index)}] must be an object`,
        });
      }

      const path = readString(item, "path", file);
      const reason = readString(item, "reason", file);

      if (!path.ok) return path;
      if (!reason.ok) return reason;

      exclude.push({ path: path.value, reason: reason.value });
    }
  }

  const allow: GuardAllow[] = [];
  const allowValue = value["allow"];

  if (allowValue !== undefined) {
    if (!Array.isArray(allowValue)) {
      return err({
        tag: "Denylist",
        file,
        message: "allow must be an array",
      });
    }

    for (const [index, item] of allowValue.entries()) {
      if (!isObject(item)) {
        return err({
          tag: "Denylist",
          file,
          message: `allow[${String(index)}] must be an object`,
        });
      }

      const path = readString(item, "path", file);
      const text = readString(item, "text", file);
      const reason = readString(item, "reason", file);

      if (!path.ok) return path;
      if (!text.ok) return text;
      if (!reason.ok) return reason;

      allow.push({ path: path.value, text: text.value, reason: reason.value });
    }
  }

  return ok({ categories, regexes, exclude, allow });
};

const loadRuleSet = async (
  path: string,
): Promise<Result<GuardRuleSet, GuardError>> => {
  let text: string;

  try {
    text = await readFile(path, "utf8");
  } catch (error) {
    return err({
      tag: "Read",
      file: path,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  const parsed = parseYaml({ path, text });

  if (!parsed.ok) {
    return err({
      tag: "Denylist",
      file: path,
      message:
        parsed.error.tag === "TooLarge"
          ? "denylist file is too large"
          : parsed.error.message,
    });
  }

  return toRuleSet(parsed.value, path);
};

const mergeRuleSets = (
  base: GuardRuleSet,
  override: GuardRuleSet,
): GuardRuleSet => ({
  categories: [...base.categories, ...override.categories],
  regexes: [...base.regexes, ...override.regexes],
  exclude: base.exclude,
  allow: base.allow,
});

const walk = async (
  root: string,
  directory: string,
): Promise<Result<readonly string[], GuardError>> => {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return ok([]);
    }

    return err({
      tag: "Read",
      file: directory,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  const files: string[] = [];

  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (entry.isDirectory() && SKIP_DIRECTORIES.has(entry.name)) continue;

    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      const nested = await walk(root, fullPath);
      if (!nested.ok) return nested;
      files.push(...nested.value);
      continue;
    }

    if (
      entry.isFile() &&
      CONTENT_EXTENSIONS.some((extension) => entry.name.endsWith(extension))
    ) {
      files.push(relative(root, fullPath).split(sep).join("/"));
    }
  }

  return ok(files);
};

export const discoverGuardFiles = async (
  root: string,
): Promise<Result<readonly string[], GuardError>> => {
  const files = new Set<string>();

  try {
    const rootEntries = await readdir(root, { withFileTypes: true });

    for (const entry of rootEntries) {
      if (
        entry.isFile() &&
        (entry.name.endsWith(".md") || entry.name.endsWith(".cff"))
      ) {
        files.add(entry.name);
      }
    }
  } catch (error) {
    return err({
      tag: "Read",
      file: root,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  for (const directory of CONTENT_DIRECTORIES) {
    const result = await walk(root, join(root, directory));
    if (!result.ok) return result;
    for (const file of result.value) files.add(file);
  }

  return ok([...files].sort((left, right) => left.localeCompare(right)));
};

export const scanContent = async (
  root: string,
  denylistPath: string,
  overridePath?: string,
): Promise<Result<GuardResult, GuardError>> => {
  const base = await loadRuleSet(denylistPath);

  if (!base.ok) return base;

  let rules = base.value;

  if (overridePath !== undefined) {
    const override = await loadRuleSet(overridePath);

    if (!override.ok) return override;

    rules = mergeRuleSets(rules, override.value);
  }

  const compiled = compileRules(rules);

  if (!compiled.ok) return compiled;

  const discovered = await discoverGuardFiles(root);

  if (!discovered.ok) return discovered;

  const findings: GuardFinding[] = [];
  const skipped: string[] = [];
  let scanned = 0;

  for (const file of discovered.value) {
    if (isExcluded(file, rules)) {
      skipped.push(file);
      continue;
    }

    let text: string;

    try {
      text = await readFile(join(root, file), "utf8");
    } catch (error) {
      return err({
        tag: "Read",
        file,
        message: error instanceof Error ? error.message : String(error),
      });
    }

    if (Buffer.byteLength(text, "utf8") > MAX_BYTES) {
      return err({
        tag: "Read",
        file,
        message: "file exceeds the guard size limit",
      });
    }

    scanned += 1;
    findings.push(...findFindings(text, file, compiled.value, rules.allow));
  }

  return ok({ findings, scanned, skipped });
};
