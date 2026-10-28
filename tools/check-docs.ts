import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DOCS = "docs";
const REFERENCE = "reference";

const failures: string[] = [];

const fail = (message: string): void => {
  failures.push(message);
};

const read = (path: string): string => readFileSync(path, "utf8");

const listMarkdown = (directory: string): readonly string[] => {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMarkdown(path));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path);
    }
  }

  return files.sort();
};

const frontmatterOf = (text: string): Readonly<Record<string, string>> => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/u.exec(text);
  const fields: Record<string, string> = {};

  if (match === null) return fields;

  for (const line of (match[1] ?? "").split(/\r?\n/u)) {
    const field = /^([a-z_]+):\s*(.+)$/u.exec(line);
    if (field === null) continue;

    const key = field[1];
    const value = field[2];
    if (key !== undefined && value !== undefined) {
      fields[key] = value.trim();
    }
  }

  return fields;
};

const requireField = (
  path: string,
  fields: Readonly<Record<string, string>>,
  key: string,
  value: string,
): void => {
  if (fields[key] !== value) {
    fail(
      `${path}: expected ${key}: ${value}, found ${fields[key] ?? "missing"}`,
    );
  }
};

const resolveDocLink = (link: string): boolean => {
  const withoutHash = link.split("#")[0] ?? "";
  const target = withoutHash.replace(/^\//u, "").replace(/\/$/u, "");

  if (target === "") return existsSync(join(DOCS, "index.md"));

  const base = join(DOCS, target);
  return existsSync(`${base}.md`) || existsSync(join(base, "index.md"));
};

const isReference = (path: string): boolean =>
  path === REFERENCE || path.startsWith(`${REFERENCE}${sep}`);

const requiredFiles = [
  "docs/.vitepress/config.ts",
  "docs/.vitepress/theme/index.ts",
  "docs/.vitepress/theme/Layout.vue",
  "docs/.vitepress/theme/TranslationBanner.vue",
  "docs/.vitepress/theme/LanguageLinks.vue",
  "docs/public/robots.txt",
  "docs/index.md",
  "docs/en/index.md",
  "docs/en/overview.md",
  "docs/en/quick-start.md",
  "docs/en/glossary.md",
  "docs/en/reference/index.md",
  "docs/th/index.md",
  "docs/th/overview.md",
  "docs/th/quick-start.md",
  "docs/th/glossary.md",
  "docs/th/reference/index.md",
] as const;

for (const path of requiredFiles) {
  if (!existsSync(path)) fail(`missing required docs file: ${path}`);
}

const config = existsSync("docs/.vitepress/config.ts")
  ? read("docs/.vitepress/config.ts")
  : "";
const theme = existsSync("docs/.vitepress/theme/index.ts")
  ? read("docs/.vitepress/theme/index.ts")
  : "";
const layout = existsSync("docs/.vitepress/theme/Layout.vue")
  ? read("docs/.vitepress/theme/Layout.vue")
  : "";

const robotsPath = "docs/public/robots.txt";
if (existsSync(robotsPath)) {
  const robots = read(robotsPath);
  if (
    !/^User-agent:\s*\*/mu.test(robots) ||
    !/^Disallow:\s*\/$/mu.test(robots)
  ) {
    fail(`${robotsPath}: must disallow every crawler`);
  }
}

for (const name of ["robots", "googlebot", "bingbot"]) {
  const content = new RegExp(
    `name:\\s*"${name}",\\s*content:\\s*"([^"]+)"`,
    "u",
  ).exec(config)?.[1];
  if (content?.includes("noindex") !== true) {
    fail(`docs/.vitepress/config.ts: missing noindex ${name} metadata`);
  }
}

for (const locale of ["en", "th"]) {
  if (!new RegExp(`^\\s+${locale}: \\{`, "mu").test(config)) {
    fail(`docs/.vitepress/config.ts: missing locale entry "${locale}"`);
  }
}

for (const label of ["English", "ไทย"]) {
  if (!config.includes(`label: "${label}"`)) {
    fail(`docs/.vitepress/config.ts: missing locale label "${label}"`);
  }
}

if (!config.includes("i18nRouting: false")) {
  fail("docs/.vitepress/config.ts: expected i18nRouting: false");
}

if (!theme.includes('import Layout from "./Layout.vue"')) {
  fail("docs/.vitepress/theme/index.ts: theme does not mount Layout.vue");
}

if (!layout.includes("TranslationBanner")) {
  fail("docs/.vitepress/theme/Layout.vue: missing TranslationBanner");
}

if (!layout.includes("LanguageLinks")) {
  fail("docs/.vitepress/theme/Layout.vue: missing LanguageLinks");
}

const navLinks = [...config.matchAll(/link:\s*"(\/[^"]+)"/gu)]
  .map((match) => match[1])
  .filter((link): link is string => link !== undefined);

if (navLinks.length === 0)
  fail("docs/.vitepress/config.ts: no nav links found");

for (const link of navLinks) {
  if (!resolveDocLink(link)) {
    fail(`docs/.vitepress/config.ts: nav link does not resolve: ${link}`);
  }
}

const packageVersion = /"version":\s*"([^"]+)"/u.exec(
  read("package.json"),
)?.[1];
const docsVersion = /^\s*version:\s*"([^"]+)"/mu.exec(config)?.[1];

if (packageVersion === undefined) {
  fail("package.json: version is missing");
} else if (docsVersion !== packageVersion) {
  fail(
    `docs/.vitepress/config.ts: version ${docsVersion ?? "missing"} does not match package.json ${packageVersion}`,
  );
}

const enRoot = join(DOCS, "en");
const thRoot = join(DOCS, "th");
const enPages = listMarkdown(enRoot).map((path) => relative(enRoot, path));
const thPages = listMarkdown(thRoot).map((path) => relative(thRoot, path));

for (const page of enPages) {
  if (isReference(page)) continue;
  if (!existsSync(join(thRoot, page))) {
    fail(`missing Thai counterpart for docs/en/${page}`);
  }
}

for (const page of thPages) {
  if (isReference(page)) continue;
  if (!existsSync(join(enRoot, page))) {
    fail(`missing English counterpart for docs/th/${page}`);
  }
}

if (!existsSync(join(thRoot, "reference", "index.md"))) {
  fail("missing docs/th/reference/index.md");
}

for (const path of listMarkdown(thRoot)) {
  const fields = frontmatterOf(read(path));
  requireField(path, fields, "translation_status", "partial");
  requireField(path, fields, "machine_translated", "true");
}

for (const path of listMarkdown(enRoot)) {
  const relativePath = relative(enRoot, path);
  if (isReference(relativePath)) continue;

  const fields = frontmatterOf(read(path));
  requireField(path, fields, "translation_status", "complete");
  requireField(path, fields, "machine_translated", "false");
}

const terms = [
  "assurance",
  "assessment",
  "evidence",
  "gate",
  "module",
  "overlay",
  "register",
  "claim",
  "project instance",
  "profile",
  "maturity",
  "criticality",
  "finding",
  "remediation",
  "risk acceptance",
] as const;

for (const path of ["docs/en/glossary.md", "docs/th/glossary.md"]) {
  const text = read(path).toLowerCase();
  for (const term of terms) {
    if (!text.includes(term)) fail(`${path}: glossary is missing "${term}"`);
  }
}

for (const path of ["docs/en/quick-start.md", "docs/th/quick-start.md"]) {
  const text = read(path);
  for (const command of ["npm ci", "npm run sras -- init"]) {
    if (!text.includes(command))
      fail(`${path}: quick start is missing "${command}"`);
  }
}

const generatedIndex = read("docs/en/reference/index.md");
if (!generatedIndex.includes("Do not edit by hand")) {
  fail("docs/en/reference/index.md: missing generated-file notice");
}

if (failures.length > 0) {
  for (const failure of failures) {
    process.stderr.write(`FAIL ${failure}\n`);
  }
  process.stderr.write(
    `docs check failed: ${String(failures.length)} issue(s)\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `docs check passed: ${String(enPages.length)} English pages, ${String(thPages.length)} Thai pages, ${String(navLinks.length)} nav links, ${String(terms.length)} glossary terms\n`,
  );
}
