import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { scanContent } from "../../src/sras/guard/workflow.js";

const temporaryDirectories: string[] = [];

const makeRoot = async (): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), "sras-guard-"));
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

describe("scanContent", () => {
  test("passes clean content and the exact boundary phrase", async () => {
    const root = await makeRoot();
    await write(root, "README.md", "A clean public README.\n");
    await write(root, "SCOPE.md", "- Healthcare is out of scope.\n");
    await write(root, "core/requirements.yaml", "id: clean\n");

    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.findings).toEqual([]);
      expect(result.value.scanned).toBe(3);
    }
  });

  test("finds a forbidden term in public content", async () => {
    const root = await makeRoot();
    await write(root, "core/bad.yaml", "description: a hospital\n");

    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.findings).toHaveLength(1);
      expect(result.value.findings[0]?.category).toBe("healthcare");
      expect(result.value.findings[0]?.preview).not.toContain("hospital");
    }
  });

  test("rejects an expanded boundary phrase", async () => {
    const root = await makeRoot();
    await write(
      root,
      "SCOPE.md",
      "- Healthcare is out of scope of this library.\n",
    );

    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.findings.length).toBeGreaterThan(0);
  });

  test("finds secrets without leaking the secret", async () => {
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
    if (result.ok) {
      expect(result.value.findings[0]?.category).toBe("secrets");
      expect(result.value.findings[0]?.preview).not.toContain("ghp_");
    }
  });

  test("finds an out-of-scope sector term", async () => {
    const root = await makeRoot();
    await write(
      root,
      "core/bad.yaml",
      "description: a pharmaceutical service\n",
    );

    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.findings[0]?.category).toBe("out_of_scope_sector");
    }
  });

  test("finds an unsafe claim", async () => {
    const root = await makeRoot();
    await write(
      root,
      "core/bad.yaml",
      "claim: the product is fully compliant\n",
    );

    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.findings[0]?.category).toBe("unsafe_claims");
    }
  });

  test("skips the FDS pack, vendor, and tests, and reports a denylisted term in content", async () => {
    const root = await makeRoot();
    await write(root, ".claude/skills/a.md", "hospital\n");
    await write(root, "vendor/a.md", "hospital\n");
    await write(root, "tests/a.md", "hospital\n");
    await write(root, "core/a.yaml", "description: hospital\n");
    await write(root, "README.md", "clean\n");

    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.scanned).toBe(2);
      expect(result.value.findings).toHaveLength(1);
      expect(result.value.findings[0]?.file).toBe("core/a.yaml");
      expect(result.value.findings[0]?.category).toBe("healthcare");
    }
  });

  test("adds private override categories without leaking the phrase", async () => {
    const root = await makeRoot();
    await write(root, "README.md", "The acme-corp platform is public.\n");
    await write(
      root,
      "override.yaml",
      "categories:\n  customer_data:\n    - acme-corp\n",
    );

    const without = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );
    expect(without.ok).toBe(true);
    if (without.ok) expect(without.value.findings).toEqual([]);

    const withOverride = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
      join(root, "override.yaml"),
    );
    expect(withOverride.ok).toBe(true);
    if (withOverride.ok) {
      expect(withOverride.value.findings).toHaveLength(1);
      const finding = withOverride.value.findings[0];
      expect(finding?.preview).not.toContain("acme-corp");
      expect(finding?.ruleId).not.toContain("acme-corp");
    }
  });

  test("reports a missing denylist", async () => {
    const root = await makeRoot();
    const result = await scanContent(root, join(root, "guard", "missing.yaml"));

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("Read");
  });

  test("reports an invalid denylist", async () => {
    const root = await makeRoot();
    await write(root, "guard/denylist.yaml", "categories: nope\n");
    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("Denylist");
  });

  test("reports an oversized public file", async () => {
    const root = await makeRoot();
    await write(root, "README.md", "a".repeat(1024 * 1024 + 1));
    const result = await scanContent(
      root,
      join(root, "guard", "denylist.yaml"),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("Read");
  });
});
