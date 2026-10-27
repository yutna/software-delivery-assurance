import { existsSync, readFileSync } from "node:fs";

const RELEASE = /^\d+\.\d+\.\d+$/;
const VERSION_PATTERN = /(\d+\.\d+\.\d+)/;

type VersionCheck = {
  readonly file: string;
  readonly actual: string | undefined;
  readonly expected: string;
  readonly optional: boolean;
};

const normalizeVersion = (raw: string): string | undefined => {
  const value = raw.startsWith("v") ? raw.slice(1) : raw;
  return RELEASE.test(value) ? value : undefined;
};

const readText = (path: string): string => readFileSync(path, "utf8");

const readPackageVersion = (text: string): string | undefined => {
  const parsed: unknown = JSON.parse(text);

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return undefined;
  }

  const value = (parsed as Record<string, unknown>)["version"];
  return typeof value === "string" ? value : undefined;
};

const readVersionTs = (text: string): string | undefined =>
  /export const VERSION = "([^"]+)";/.exec(text)?.[1];

const readCffVersion = (text: string): string | undefined =>
  /^version:\s*["']?([^"'\s]+)["']?\s*$/m.exec(text)?.[1];

const readStandardVersion = (text: string): string | undefined =>
  /^standard_version:\s*["']?([^"'\s]+)["']?\s*$/m.exec(text)?.[1];

const readDocsVersion = (text: string): string | undefined => {
  const match = /^\s*version:\s*["']([^"']+)["']/m.exec(text);
  return match?.[1] ?? VERSION_PATTERN.exec(text)?.[1];
};

const collectChecks = (expected: string): readonly VersionCheck[] => {
  const checks: VersionCheck[] = [];

  const add = (
    file: string,
    read: (text: string) => string | undefined,
    optional = false,
  ): void => {
    if (optional && !existsSync(file)) return;

    let actual: string | undefined;
    try {
      actual = read(readText(file));
    } catch {
      actual = undefined;
    }

    checks.push({ file, actual, expected, optional });
  };

  add("package.json", readPackageVersion);
  add("src/sras/version.ts", readVersionTs);
  add("CITATION.cff", readCffVersion);
  add("core/sras.yaml", readStandardVersion, true);
  add("docs/.vitepress/config.ts", readDocsVersion, true);

  return checks;
};

const main = (): void => {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    process.stderr.write("usage: node tools/check-version.ts <version>\n");
    process.exitCode = 2;
    return;
  }

  const expected = normalizeVersion(args[0] ?? "");

  if (expected === undefined) {
    process.stderr.write(`invalid version: ${args[0] ?? ""}\n`);
    process.exitCode = 2;
    return;
  }

  const checks = collectChecks(expected);
  const failures = checks.filter((check) => check.actual !== check.expected);

  for (const check of checks) {
    const status = check.actual === check.expected ? "ok" : "FAIL";
    process.stdout.write(
      `${status} ${check.file}: expected ${check.expected}, found ${check.actual ?? "missing"}\n`,
    );
  }

  if (failures.length > 0) {
    process.stderr.write(
      `version check failed: ${String(failures.length)} mismatch(es)\n`,
    );
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`version check passed: ${expected}\n`);
};

main();
