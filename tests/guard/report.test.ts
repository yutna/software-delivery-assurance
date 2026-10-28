import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import {
  renderGuardAnnotations,
  renderGuardJson,
  renderGuardSummary,
  toGuardReport,
} from "../../src/sras/guard/report.js";
import { scanContent } from "../../src/sras/guard/workflow.js";

const temporaryDirectories: string[] = [];

const makeRoot = async (): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), "sras-guard-report-"));
  temporaryDirectories.push(root);
  await mkdir(join(root, "guard"), { recursive: true });
  await cp(
    join(process.cwd(), "guard", "denylist.yaml"),
    join(root, "guard", "denylist.yaml"),
  );
  return root;
};

const write = async (
  root: string,
  path: string,
  text: string,
): Promise<void> => {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
};

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("guard reports", () => {
  test("a clean scan produces a stable passing JSON report", async () => {
    const root = await makeRoot();
    await write(root, "README.md", "A clean public README.\n");
    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const report = toGuardReport(result.value);
    const parsed: unknown = JSON.parse(renderGuardJson(report));

    expect(parsed).toEqual({
      version: 1,
      tool: "sras-guard",
      ok: true,
      scanned: 1,
      excluded: 0,
      findings: [],
    });
    expect(renderGuardSummary(report)).toContain("guard passed");
    expect(renderGuardAnnotations(report)).toContain("::notice");
  });

  test("a finding report redacts the raw match and points at the line", async () => {
    const root = await makeRoot();
    await write(root, "core/bad.yaml", "description: a hospital\n");
    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const report = toGuardReport(result.value);
    const json = renderGuardJson(report);
    const annotations = renderGuardAnnotations(report);

    expect(report.ok).toBe(false);
    expect(report.findings).toHaveLength(1);
    expect(report.findings[0]).toMatchObject({
      category: "healthcare",
      file: "core/bad.yaml",
      line: 1,
    });
    expect(json).not.toContain("hospital");
    expect(annotations).not.toContain("hospital");
    expect(annotations).toContain("::error file=core/bad.yaml,line=1");
    expect(renderGuardSummary(report)).toContain("guard failed: 1 findings");
  });

  test("a secret is never included in JSON or annotations", async () => {
    const root = await makeRoot();
    await write(
      root,
      "core/bad.yaml",
      "token: ghp_abcdefghijklmnopqrstuvwxyz0123456789\n",
    );
    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const report = toGuardReport(result.value);
    const json = renderGuardJson(report);
    const annotations = renderGuardAnnotations(report);

    expect(
      report.findings.some((finding) => finding.category === "secrets"),
    ).toBe(true);
    expect(json).not.toContain("ghp_");
    expect(annotations).not.toContain("ghp_");
  });

  test("a private override phrase is not exposed", async () => {
    const root = await makeRoot();
    await write(root, "README.md", "The acme-corp platform is public.\n");
    await write(
      root,
      "override.yaml",
      "categories:\n  customer_data:\n    - acme-corp\n",
    );
    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
      join(root, "override.yaml"),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const report = toGuardReport(result.value);
    const json = renderGuardJson(report);
    const annotations = renderGuardAnnotations(report);

    expect(report.findings).toHaveLength(1);
    expect(json).not.toContain("acme-corp");
    expect(annotations).not.toContain("acme-corp");
    expect(report.findings[0]?.rule_id).not.toContain("acme-corp");
  });

  test("skips the FDS pack and reports a denylisted term in content", async () => {
    const root = await makeRoot();
    await write(root, ".claude/skills/a.md", "hospital\n");
    await write(root, "core/a.yaml", "description: hospital\n");
    await write(root, "README.md", "clean\n");
    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const report = toGuardReport(result.value);
    const json = renderGuardJson(report);

    expect(report.scanned).toBe(2);
    expect(report.findings).toHaveLength(1);
    expect(report.findings[0]?.file).toBe("core/a.yaml");
    expect(json).not.toContain(".claude");
    expect(json).toContain("core/a.yaml");
    expect(json).not.toContain("hospital");
  });
});
