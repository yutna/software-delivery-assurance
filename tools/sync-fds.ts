import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative, sep } from "node:path";

const SOURCE = "https://github.com/yutna/functional-design-skills";
const COMMIT = "4d3875c";
const FULL_COMMIT = "4d3875c0b81872711693bd845ac00427f73d453c";
const VERSION = "3.3.0";
const SKILL_COUNT = 43;
const ROOT = process.cwd();
const INSTALLED = join(ROOT, ".claude", "skills");
const VENDOR = join(ROOT, "vendor", "functional-design-skills");

type FileEntry = {
  readonly path: string;
  readonly bytes: Buffer;
};

const runGit = (args: readonly string[], cwd: string): string =>
  execFileSync("git", args, { cwd, encoding: "utf8" }).trim();

const listFiles = async (
  directory: string,
  baseDirectory = directory,
): Promise<readonly FileEntry[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: FileEntry[] = [];

  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath, baseDirectory)));
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

const main = async (): Promise<void> => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "sras-fds-"));

  try {
    const upstream = join(temporaryDirectory, "upstream");

    runGit(
      ["clone", "--quiet", "--no-checkout", SOURCE, upstream],
      temporaryDirectory,
    );
    runGit(["fetch", "--quiet", "origin", FULL_COMMIT], upstream);
    runGit(["checkout", "--quiet", FULL_COMMIT], upstream);

    const installedCommit = runGit(["rev-parse", "HEAD"], upstream);
    if (installedCommit !== FULL_COMMIT) {
      throw new Error(`expected commit ${FULL_COMMIT}, got ${installedCommit}`);
    }

    const skillsSource = join(upstream, "plugin", "skills");
    const skillNames = (await readdir(skillsSource, { withFileTypes: true }))
      .filter(
        (entry) => entry.isDirectory() && entry.name.startsWith("functional-"),
      )
      .map((entry) => entry.name)
      .sort();

    if (skillNames.length !== SKILL_COUNT) {
      throw new Error(
        `expected ${String(SKILL_COUNT)} skills, found ${String(skillNames.length)}`,
      );
    }

    await rm(INSTALLED, { recursive: true, force: true });
    await mkdir(INSTALLED, { recursive: true });
    await mkdir(VENDOR, { recursive: true });

    for (const skillName of skillNames) {
      await cp(join(skillsSource, skillName), join(INSTALLED, skillName), {
        recursive: true,
      });
    }

    await cp(join(upstream, "LICENSE"), join(VENDOR, "LICENSE"));

    const files = await listFiles(INSTALLED);
    const hash = treeHash(files);
    const lock = {
      source: SOURCE,
      commit: COMMIT,
      version: VERSION,
      skillCount: skillNames.length,
      algorithm: "sha256",
      treeHash: hash,
    };

    await writeFile(
      join(VENDOR, "fds-lock.json"),
      `${JSON.stringify(lock, null, 2)}\n`,
      "utf8",
    );

    process.stdout.write(
      `synced ${String(skillNames.length)} FDS skills at ${COMMIT} (${VERSION}); tree ${hash}\n`,
    );
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
};

await main();
