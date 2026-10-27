import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { basename, join, relative, sep } from "node:path";
import * as ts from "typescript";

const SOURCE = "https://github.com/yutna/functional-design-skills";
const COMMIT = "4d3875c";
const VERSION = "3.3.0";
const SKILL_COUNT = 43;
const ROOT = process.cwd();
const INSTALLED = join(ROOT, ".claude", "skills");
const VENDOR = join(ROOT, "vendor", "functional-design-skills");
const SKIP_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  ".claude",
  "vendor",
  "internal",
  "dist",
  "coverage",
]);

type FileEntry = {
  readonly path: string;
  readonly bytes: Buffer;
};

type JsonObject = Record<string, unknown>;

type SkillMetadata = {
  readonly name: string;
  readonly pack: string;
  readonly version: string;
};

const errors: string[] = [];

const check = (condition: boolean, message: string): void => {
  if (!condition) errors.push(message);
};

const readText = async (path: string): Promise<string> =>
  readFile(path, "utf8");

const readJsonObject = async (path: string): Promise<JsonObject> => {
  const parsed: unknown = JSON.parse(await readText(path));

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${path}: expected a JSON object`);
  }

  return parsed as JsonObject;
};

const getObject = (object: JsonObject, key: string): JsonObject | undefined => {
  const value = object[key];

  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as JsonObject)
    : undefined;
};

const getString = (object: JsonObject, key: string): string | undefined => {
  const value = object[key];

  return typeof value === "string" ? value : undefined;
};

const listFiles = async (
  directory: string,
  baseDirectory = directory,
  skipDirectories: ReadonlySet<string> = new Set(),
): Promise<readonly FileEntry[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: FileEntry[] = [];

  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (entry.isDirectory() && skipDirectories.has(entry.name)) continue;

    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(
        ...(await listFiles(fullPath, baseDirectory, skipDirectories)),
      );
      continue;
    }

    if (entry.isFile()) {
      files.push({
        path: relative(baseDirectory, fullPath).split(sep).join("/"),
        bytes: await readFile(fullPath),
      });
    }
  }

  return files.sort((left, right) => left.path.localeCompare(right.path));
};

const treeHash = (files: readonly FileEntry[]): string => {
  const hash = createHash("sha256");

  for (const file of files) {
    hash.update(file.path);
    hash.update("\0");
    hash.update(file.bytes);
    hash.update("\0");
  }

  return hash.digest("hex");
};

const readSkillMetadata = async (
  skillDirectory: string,
): Promise<SkillMetadata | undefined> => {
  const text = await readText(join(skillDirectory, "SKILL.md"));
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const block = frontmatter?.[1];

  if (block === undefined) return undefined;

  const name = /^name:\s*(.+)$/m.exec(block)?.[1]?.trim();
  const pack = /^\s*pack:\s*(.+)$/m.exec(block)?.[1]?.trim();
  const version = /^\s*version:\s*(.+)$/m.exec(block)?.[1]?.trim();

  if (name === undefined || pack === undefined || version === undefined) {
    return undefined;
  }

  return { name, pack, version };
};

const checkSkills = async (): Promise<{
  readonly skills: readonly string[];
  readonly hash: string;
}> => {
  let skillNames: readonly string[] = [];
  let hash = "";

  try {
    const entries = await readdir(INSTALLED, { withFileTypes: true });
    skillNames = entries
      .filter(
        (entry) => entry.isDirectory() && entry.name.startsWith("functional-"),
      )
      .map((entry) => entry.name)
      .sort();

    check(
      skillNames.length === SKILL_COUNT,
      `skills: expected ${String(SKILL_COUNT)}, found ${String(skillNames.length)}`,
    );

    for (const skillName of skillNames) {
      const metadata = await readSkillMetadata(join(INSTALLED, skillName));
      check(metadata !== undefined, `skills/${skillName}: missing frontmatter`);
      check(
        metadata?.name === skillName,
        `skills/${skillName}: name must equal the directory name`,
      );
      check(
        metadata?.pack === "functional-design-skills",
        `skills/${skillName}: metadata.pack is not functional-design-skills`,
      );
      check(
        metadata?.version === VERSION,
        `skills/${skillName}: metadata.version is not ${VERSION}`,
      );
    }

    hash = treeHash(await listFiles(INSTALLED));
  } catch (error) {
    errors.push(
      `skills: cannot read ${INSTALLED}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  return { skills: skillNames, hash };
};

const checkLock = async (hash: string): Promise<void> => {
  const lock = await readJsonObject(join(VENDOR, "fds-lock.json"));

  check(getString(lock, "source") === SOURCE, "lock: source mismatch");
  check(getString(lock, "commit") === COMMIT, "lock: commit mismatch");
  check(getString(lock, "version") === VERSION, "lock: version mismatch");
  check(lock["skillCount"] === SKILL_COUNT, "lock: skillCount mismatch");
  check(getString(lock, "algorithm") === "sha256", "lock: algorithm mismatch");
  check(
    getString(lock, "treeHash") === hash,
    "lock: treeHash does not match the installed skills",
  );
};

const checkMetadataFiles = async (): Promise<void> => {
  const license = await readText(join(VENDOR, "LICENSE"));
  check(license.includes("MIT License"), "vendor: LICENSE is not MIT");
  check(
    license.includes("Yutthana Siphuengchai"),
    "vendor: LICENSE is missing the upstream copyright",
  );

  const upstream = await readText(join(VENDOR, "UPSTREAM.md"));
  check(upstream.includes(COMMIT), "UPSTREAM.md: missing pinned commit");
  check(upstream.includes(VERSION), "UPSTREAM.md: missing pack version");

  const notices = await readText("THIRD_PARTY_NOTICES.md");
  check(
    notices.includes("functional-design-skills"),
    "THIRD_PARTY_NOTICES.md: missing FDS name",
  );
  check(notices.includes(COMMIT), "THIRD_PARTY_NOTICES.md: missing commit");
  check(notices.includes("MIT"), "THIRD_PARTY_NOTICES.md: missing MIT");

  const claude = await readText("CLAUDE.md");
  check(
    claude.includes("<!-- FDS-DESIGN-RULES:START -->") &&
      claude.includes("<!-- FDS-DESIGN-RULES:END -->"),
    "CLAUDE.md: missing FDS design-rules markers",
  );
  check(
    claude.includes("functional-typescript"),
    "CLAUDE.md: does not name functional-typescript",
  );

  const agents = await readText("AGENTS.md");
  check(agents.includes("CLAUDE.md"), "AGENTS.md: does not point to CLAUDE.md");

  const gitattributes = await readText(".gitattributes");
  check(
    gitattributes.includes(".claude/skills/** -text"),
    ".gitattributes: missing the vendored skills -text rule",
  );
  check(
    gitattributes.includes("vendor/functional-design-skills/** -text"),
    ".gitattributes: missing the vendor -text rule",
  );
};

const checkSettings = async (): Promise<void> => {
  const settings = await readJsonObject(".claude/settings.json");
  check(
    settings["skillListingBudgetFraction"] === 0.02,
    "settings: skillListingBudgetFraction is not 0.02",
  );

  const overrides = getObject(settings, "skillOverrides");
  const expected = [
    "functional-elixir",
    "functional-elixir-phoenix",
    "functional-javascript",
    "functional-typescript-effect",
    "functional-typescript-react",
    "functional-typescript-react-nextjs",
    "functional-typescript-ts-pattern",
    "functional-typescript-xstate",
  ];

  for (const name of expected) {
    check(
      overrides?.[name] === "name-only",
      `settings: ${name} is not name-only`,
    );
  }
};

const checkTsconfig = async (): Promise<void> => {
  const config = await readJsonObject("tsconfig.json");
  const options = getObject(config, "compilerOptions");

  check(options !== undefined, "tsconfig: missing compilerOptions");

  const expected: readonly (readonly [string, unknown])[] = [
    ["strict", true],
    ["noUncheckedIndexedAccess", true],
    ["exactOptionalPropertyTypes", true],
    ["noImplicitOverride", true],
    ["noFallthroughCasesInSwitch", true],
    ["erasableSyntaxOnly", true],
    ["noEmit", true],
    ["verbatimModuleSyntax", true],
    ["isolatedModules", true],
    ["moduleDetection", "force"],
    ["forceConsistentCasingInFileNames", true],
    ["noImplicitReturns", true],
    ["noUnusedLocals", true],
    ["noUnusedParameters", true],
    ["allowUnreachableCode", false],
    ["allowUnusedLabels", false],
    ["noPropertyAccessFromIndexSignature", true],
    ["module", "NodeNext"],
    ["moduleResolution", "NodeNext"],
    ["target", "ES2024"],
  ];

  for (const [key, value] of expected) {
    check(
      options?.[key] === value,
      `tsconfig: ${key} must be ${JSON.stringify(value)}`,
    );
  }
};

const checkSource = async (): Promise<void> => {
  const srcFiles = await listFiles(join(ROOT, "src"));
  const tsFiles = srcFiles.filter((file) => file.path.endsWith(".ts"));

  check(tsFiles.length > 0, "src: no TypeScript files found");

  for (const file of tsFiles) {
    const text = file.bytes.toString("utf8");

    check(
      !/@ts-ignore|@ts-expect-error/.test(text),
      `src/${file.path}: forbidden TypeScript suppression`,
    );

    const source = ts.createSourceFile(
      file.path,
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const lines = text.split(/\r?\n/);

    const visit = (node: ts.Node): void => {
      const location = source.getLineAndCharacterOfPosition(
        node.getStart(source),
      );
      const line = location.line + 1;

      if (node.kind === ts.SyntaxKind.AnyKeyword) {
        errors.push(`src/${file.path}:${String(line)}: forbidden any`);
      }

      if (ts.isNonNullExpression(node)) {
        errors.push(
          `src/${file.path}:${String(line)}: forbidden non-null assertion`,
        );
      }

      if (ts.isEnumDeclaration(node)) {
        errors.push(`src/${file.path}:${String(line)}: forbidden enum`);
      }

      if (ts.isInterfaceDeclaration(node)) {
        errors.push(`src/${file.path}:${String(line)}: forbidden interface`);
      }

      if (ts.isAsExpression(node)) {
        const typeText = node.type.getText(source);
        const marker = lines
          .slice(Math.max(0, location.line - 1), location.line + 1)
          .join("\n");

        if (typeText !== "const" && !marker.includes("fds-allow-as:")) {
          errors.push(
            `src/${file.path}:${String(line)}: unmarked type assertion; use as const or a checked brand cast marker`,
          );
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(source);
  }

  const pureFiles = tsFiles.filter(
    (file) =>
      file.path !== "cli.ts" &&
      !file.path.startsWith("cli/") &&
      !file.path.startsWith("adapters/") &&
      !file.path.endsWith("workflow.ts"),
  );
  const forbidden = [
    [
      /from\s+["']node:(fs|child_process|http|net|https)["']/,
      "node I/O import",
    ],
    [/\bprocess\.env\b/, "process.env"],
    [/\bDate\.now\b/, "Date.now"],
    [/\bMath\.random\b/, "Math.random"],
    [/\bfetch\s*\(/, "fetch"],
  ] as const;

  for (const file of pureFiles) {
    const text = file.bytes.toString("utf8");

    for (const [pattern, reason] of forbidden) {
      check(
        !pattern.test(text),
        `src/${file.path}: pure module contains ${reason}`,
      );
    }
  }
};

const checkConfigFiles = async (): Promise<void> => {
  const requiredFiles = [
    "package.json",
    "tsconfig.json",
    "tsconfig.build.json",
    "eslint.config.mjs",
    "vitest.config.ts",
    ".prettierignore",
    ".markdownlint-cli2.jsonc",
    ".lychee.toml",
    ".github/workflows/ci.yml",
  ];

  for (const file of requiredFiles) {
    try {
      await readText(file);
    } catch {
      errors.push(`missing required file: ${file}`);
    }
  }

  const pkg = await readJsonObject("package.json");
  check(pkg["type"] === "module", "package.json: type must be module");

  const scripts = getObject(pkg, "scripts");
  const requiredScripts = [
    "build",
    "typecheck",
    "lint",
    "lint:md",
    "format",
    "format:check",
    "test",
    "sras",
    "check:fds",
    "sync:fds",
  ];

  for (const script of requiredScripts) {
    check(
      typeof scripts?.[script] === "string",
      `package.json: missing script ${script}`,
    );
  }

  const ci = await readText(".github/workflows/ci.yml");
  check(ci.includes("fds-check:"), "ci.yml: missing fds-check job");

  const ciOk = ci.indexOf("ci-ok:");
  const ciOkBlock = ciOk >= 0 ? ci.slice(ciOk, ci.indexOf("steps:", ciOk)) : "";

  check(
    ciOkBlock.includes("fds-check"),
    "ci.yml: ci-ok does not need fds-check",
  );
};

const checkNoPython = async (): Promise<void> => {
  const files = await listFiles(ROOT, ROOT, SKIP_DIRECTORIES);
  const forbiddenNames = new Set([
    "pyproject.toml",
    "mkdocs.yml",
    "setup.py",
    "setup.cfg",
    "Pipfile",
    "poetry.lock",
  ]);

  for (const file of files) {
    const name = basename(file.path);
    const isRequirements = /^requirements.*\.txt$/.test(name);

    check(
      !forbiddenNames.has(name) && !isRequirements && !name.endsWith(".py"),
      `python tooling is forbidden: ${file.path}`,
    );
  }
};

const checkNoChangelog = async (): Promise<void> => {
  const files = await listFiles(ROOT, ROOT, SKIP_DIRECTORIES);

  for (const file of files) {
    check(
      basename(file.path) !== "CHANGELOG.md",
      `CHANGELOG.md is forbidden: ${file.path}`,
    );
  }
};

const main = async (): Promise<void> => {
  const { skills, hash } = await checkSkills();

  await checkLock(hash);
  await checkMetadataFiles();
  await checkSettings();
  await checkTsconfig();
  await checkSource();
  await checkConfigFiles();
  await checkNoPython();
  await checkNoChangelog();

  if (errors.length > 0) {
    process.stderr.write(
      `FDS check failed (${String(errors.length)}):\n${errors
        .map((error) => `- ${error}`)
        .join("\n")}\n`,
    );
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    `FDS check passed: ${String(skills.length)} skills, pack ${VERSION}, commit ${COMMIT}, tree ${hash}\n`,
  );
};

await main();
