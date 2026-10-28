import { existsSync, readFileSync } from "node:fs";

const RELEASE = /^\d+\.\d+\.\d+$/;
const VERSION_PATTERN = /(\d+\.\d+\.\d+)/;

type VersionCheck = {
  readonly file: string;
  readonly field: string | undefined;
  readonly actual: string | undefined;
  readonly expected: string;
};

const normalizeVersion = (raw: string): string | undefined => {
  const value = raw.startsWith("v") ? raw.slice(1) : raw;
  return RELEASE.test(value) ? value : undefined;
};

const readText = (path: string): string => readFileSync(path, "utf8");

const readJsonPath = (
  text: string,
  path: readonly string[],
): string | undefined => {
  let current: unknown;

  try {
    current = JSON.parse(text);
  } catch {
    return undefined;
  }

  for (const key of path) {
    if (
      typeof current !== "object" ||
      current === null ||
      Array.isArray(current)
    ) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === "string" ? current : undefined;
};

const readPackageVersion = (text: string): string | undefined =>
  readJsonPath(text, ["version"]);

const readLockfileRootVersion = (text: string): string | undefined =>
  readJsonPath(text, ["version"]);

const readLockfilePackageVersion = (text: string): string | undefined =>
  readJsonPath(text, ["packages", "", "version"]);

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
    options?: { readonly field?: string; readonly optional?: boolean },
  ): void => {
    if (options?.optional === true && !existsSync(file)) return;

    let actual: string | undefined;
    try {
      actual = read(readText(file));
    } catch {
      actual = undefined;
    }

    checks.push({ file, field: options?.field, actual, expected });
  };

  add("package.json", readPackageVersion);
  add("package-lock.json", readLockfileRootVersion, { field: "version" });
  add("package-lock.json", readLockfilePackageVersion, {
    field: 'packages[""].version',
  });
  add("src/sras/version.ts", readVersionTs);
  add("CITATION.cff", readCffVersion);
  add("core/sras.yaml", readStandardVersion, { optional: true });
  add("docs/.vitepress/config.ts", readDocsVersion, { optional: true });

  return checks;
};

const label = (check: VersionCheck): string =>
  check.field === undefined ? check.file : `${check.file} [${check.field}]`;

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
      `${status} ${label(check)}: expected ${check.expected}, found ${check.actual ?? "missing"}\n`,
    );
  }

  if (failures.length > 0) {
    const details = failures
      .map(
        (check) =>
          `  ${label(check)}: expected ${check.expected}, found ${check.actual ?? "missing"}`,
      )
      .join("\n");
    process.stderr.write(
      `version check failed: ${String(failures.length)} mismatch(es)\n${details}\n`,
    );
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`version check passed: ${expected}\n`);
};

main();
