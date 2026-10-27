import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { assertNever } from "../foundation/assert-never.js";
import type { ReadError } from "../adapters/fs.js";
import { err, ok, type Result } from "../foundation/result.js";
import { loadStandardFromRoot } from "../standard/workflow.js";
import { renderStandard } from "./markdown.js";
import type {
  RenderCheckError,
  RenderDriftIssue,
  RenderError,
  RenderPage,
  RenderSummary,
} from "./types.js";

export const REFERENCE_DIRECTORY = "docs/en/reference";

export type RenderCheckResult = RenderSummary & {
  readonly checked: number;
};

const readMessage = (error: ReadError): string =>
  error.tag === "Read"
    ? error.message
    : `file is ${String(error.bytes)} bytes; limit is ${String(error.limit)}`;

const isNotFound = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "ENOENT";

const loadPages = async (
  root: string,
): Promise<Result<readonly RenderPage[], RenderError>> => {
  const loaded = await loadStandardFromRoot(root);

  if (!loaded.ok) {
    switch (loaded.error.tag) {
      case "NoContent":
        return err({ tag: "NoContent" });
      case "Read":
        return err({
          tag: "Read",
          file: loaded.error.error.file,
          message: readMessage(loaded.error.error),
        });
      case "Schema":
        return err({
          tag: "Schema",
          message:
            loaded.error.error.tag === "Read"
              ? `${loaded.error.error.file}: ${loaded.error.error.message}`
              : loaded.error.error.message,
        });
      case "Invalid":
        return err({ tag: "Validation", issues: loaded.error.issues });
      default:
        return assertNever(loaded.error);
    }
  }

  return ok(renderStandard(loaded.value.standard));
};

const outputRoot = (root: string): string => join(root, REFERENCE_DIRECTORY);

const safeTarget = (
  root: string,
  path: string,
): Result<string, RenderError> => {
  const base = resolve(outputRoot(root));
  const target = resolve(base, path);

  if (target !== base && !target.startsWith(`${base}${sep}`)) {
    return err({
      tag: "Write",
      file: path,
      message: "render path escapes the reference directory",
    });
  }

  return ok(target);
};

const writePages = async (
  root: string,
  pages: readonly RenderPage[],
): Promise<Result<RenderSummary, RenderError>> => {
  const base = outputRoot(root);

  try {
    await mkdir(base, { recursive: true });
  } catch (error) {
    return err({
      tag: "Write",
      file: base,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  for (const page of pages) {
    const target = safeTarget(root, page.path);

    if (!target.ok) return err(target.error);

    try {
      await mkdir(dirname(target.value), { recursive: true });
      await writeFile(target.value, page.text, { encoding: "utf8" });
    } catch (error) {
      return err({
        tag: "Write",
        file: target.value,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return ok({ pages: pages.length });
};

const walk = async (
  root: string,
  directory: string,
): Promise<readonly string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries.sort((left, right) =>
    left.name < right.name ? -1 : left.name > right.name ? 1 : 0,
  )) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(root, path)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(relative(root, path).split(sep).join("/"));
    }
  }

  return files;
};

const listPages = async (
  root: string,
): Promise<Result<readonly string[], RenderError>> => {
  const directory = outputRoot(root);

  try {
    return ok(await walk(directory, directory));
  } catch (error) {
    if (isNotFound(error)) return ok([]);

    return err({
      tag: "Read",
      file: directory,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const firstDifference = (
  expected: string,
  actual: string,
):
  | {
      readonly line: number;
      readonly expected: string;
      readonly actual: string;
    }
  | undefined => {
  const expectedLines = expected.split("\n");
  const actualLines = actual.split("\n");
  const length = Math.max(expectedLines.length, actualLines.length);

  for (let index = 0; index < length; index += 1) {
    const expectedLine = expectedLines[index] ?? "";
    const actualLine = actualLines[index] ?? "";

    if (expectedLine !== actualLine) {
      return { line: index + 1, expected: expectedLine, actual: actualLine };
    }
  }

  return undefined;
};

export const checkRendered = async (
  root: string,
  pages: readonly RenderPage[],
): Promise<Result<RenderCheckResult, RenderCheckError>> => {
  const existing = await listPages(root);

  if (!existing.ok) return err(existing.error);

  const actualPaths = new Set(existing.value);
  const expectedPaths = new Set(pages.map((page) => page.path));
  const issues: RenderDriftIssue[] = [];

  for (const page of pages) {
    if (!actualPaths.has(page.path)) {
      issues.push({ tag: "Missing", path: page.path });
      continue;
    }

    let actual: string;

    try {
      actual = await readFile(join(outputRoot(root), page.path), "utf8");
    } catch (error) {
      return err({
        tag: "Read",
        file: join(outputRoot(root), page.path),
        message: error instanceof Error ? error.message : String(error),
      });
    }

    if (actual === page.text) continue;

    const difference = firstDifference(page.text, actual);
    issues.push({
      tag: "Changed",
      path: page.path,
      line: difference?.line ?? 1,
      expected: difference?.expected ?? "",
      actual: difference?.actual ?? "",
    });
  }

  for (const path of actualPaths) {
    if (!expectedPaths.has(path)) issues.push({ tag: "Extra", path });
  }

  if (issues.length > 0) return err({ tag: "Drift", issues });

  return ok({ pages: pages.length, checked: existing.value.length });
};

export const renderToRoot = async (
  root: string,
): Promise<Result<RenderSummary, RenderError>> => {
  const pages = await loadPages(root);

  if (!pages.ok) return pages;

  return writePages(root, pages.value);
};

export const renderCheckFromRoot = async (
  root: string,
): Promise<Result<RenderCheckResult, RenderCheckError>> => {
  const pages = await loadPages(root);

  if (!pages.ok) return pages;

  return checkRendered(root, pages.value);
};
