import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import axe from "axe-core";
import { JSDOM, VirtualConsole } from "jsdom";

const DIST = "docs/.vitepress/dist";

/**
 * WCAG 2.2 Level AA conformance includes every Level A and AA success
 * criterion from WCAG 2.0, 2.1, and 2.2. These axe tags select the rules that
 * map to those criteria; best-practice rules are deliberately excluded from
 * the gate and reported only through the incomplete list.
 */
const WCAG_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
] as const;

type PageWindow = Window & {
  readonly axe: typeof axe;
  readonly eval: (code: string) => unknown;
};

const failures: string[] = [];
const incompleteByRule = new Map<string, number>();
const virtualConsole = new VirtualConsole();

const listHtml = (directory: string): readonly string[] => {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listHtml(path));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(path);
    }
  }

  return files.sort();
};

const checkPage = async (path: string): Promise<void> => {
  const dom = new JSDOM(readFileSync(path, "utf8"), {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole,
  });
  const window = dom.window as unknown as PageWindow;
  window.eval(axe.source);

  const results = await window.axe.run(window.document, {
    runOnly: { type: "tag", values: [...WCAG_TAGS] },
    resultTypes: ["violations", "incomplete"],
  });

  const page = relative(process.cwd(), path);

  for (const violation of results.violations) {
    for (const node of violation.nodes) {
      failures.push(
        `${page}: ${violation.id} (${violation.impact ?? "unknown"}) ${node.target.join(" ")} — ${violation.help}`,
      );
    }
  }

  for (const incomplete of results.incomplete) {
    incompleteByRule.set(
      incomplete.id,
      (incompleteByRule.get(incomplete.id) ?? 0) + incomplete.nodes.length,
    );
  }

  dom.window.close();
};

if (!existsSync(DIST)) {
  process.stderr.write(
    `${DIST} is missing; run "npm run docs:build" before "npm run check:a11y"\n`,
  );
  process.exitCode = 1;
} else {
  const pages = listHtml(DIST);

  if (pages.length === 0) {
    process.stderr.write(
      `no HTML pages found in ${DIST}; run "npm run docs:build"\n`,
    );
    process.exitCode = 1;
  } else {
    for (const page of pages) {
      await checkPage(page);
    }

    for (const failure of failures) {
      process.stderr.write(`FAIL ${failure}\n`);
    }

    const notEvaluated = [...incompleteByRule.keys()].sort();
    const summary = `${String(pages.length)} pages, ${String(failures.length)} violation(s), rule(s) not evaluated: ${notEvaluated.length === 0 ? "none" : notEvaluated.join(", ")}`;

    if (failures.length > 0) {
      process.stderr.write(`a11y check failed: ${summary}\n`);
      process.exitCode = 1;
    } else {
      process.stdout.write(`a11y check passed: ${summary}\n`);
    }
  }
}
