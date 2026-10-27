import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { err, ok, type Result } from "../foundation/result.js";
import type { SourceFile } from "../standard/dto.js";

const MAX_BYTES = 1024 * 1024;
const CONTENT_DIRECTORIES = [
  "core",
  "modules",
  "overlays",
  "registers",
  "mappings",
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
  "docs",
]);

export type ReadError =
  | { readonly tag: "Read"; readonly file: string; readonly message: string }
  | {
      readonly tag: "TooLarge";
      readonly file: string;
      readonly bytes: number;
      readonly limit: number;
    };

const isNotFound = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "ENOENT";

const walk = async (
  root: string,
  directory: string,
): Promise<readonly string[]> => {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }

  const files: string[] = [];

  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (entry.isDirectory() && SKIP_DIRECTORIES.has(entry.name)) continue;

    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(root, fullPath)));
      continue;
    }

    if (
      entry.isFile() &&
      (entry.name.endsWith(".yaml") || entry.name.endsWith(".yml"))
    ) {
      files.push(relative(root, fullPath).split(sep).join("/"));
    }
  }

  return files;
};

export const discoverContentFiles = async (
  root: string,
): Promise<Result<readonly string[], ReadError>> => {
  try {
    const files: string[] = [];

    for (const directory of CONTENT_DIRECTORIES) {
      files.push(...(await walk(root, join(root, directory))));
    }

    return ok(files.sort((left, right) => left.localeCompare(right)));
  } catch (error) {
    return err({
      tag: "Read",
      file: root,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const readSourceFiles = async (
  root: string,
  paths: readonly string[],
): Promise<Result<readonly SourceFile[], ReadError>> => {
  const files: SourceFile[] = [];

  for (const path of paths) {
    try {
      const text = await readFile(join(root, path), "utf8");
      const bytes = Buffer.byteLength(text, "utf8");

      if (bytes > MAX_BYTES) {
        return err({ tag: "TooLarge", file: path, bytes, limit: MAX_BYTES });
      }

      files.push({ path, text });
    } catch (error) {
      return err({
        tag: "Read",
        file: path,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return ok(files);
};
