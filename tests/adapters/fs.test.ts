import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import {
  discoverContentFiles,
  readSourceFiles,
} from "../../src/sras/adapters/fs.js";

const temporaryDirectories: string[] = [];

const makeTemporaryDirectory = async (): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), "sras-fs-"));
  temporaryDirectories.push(root);
  return root;
};

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("content discovery and reading", () => {
  test("discovers YAML content and skips non-content directories", async () => {
    const root = await makeTemporaryDirectory();
    const files = [
      "core/sras.yaml",
      "core/domains/security.yaml",
      "modules/ai/module.yaml",
      "overlays/industries/finance/overlay.yaml",
      "registers/th/pdpa.yaml",
      "mappings/iso-27001.yaml",
      "core/domains/readme.txt",
      "internal/secret.yaml",
      "docs/page.yaml",
      "tests/fixture.yaml",
    ];

    for (const file of files) {
      const path = join(root, file);
      await mkdir(join(path, ".."), { recursive: true });
      await writeFile(path, "ok: true\n", "utf8");
    }

    const discovered = await discoverContentFiles(root);

    expect(discovered).toEqual({
      ok: true,
      value: [
        "core/domains/security.yaml",
        "core/sras.yaml",
        "mappings/iso-27001.yaml",
        "modules/ai/module.yaml",
        "overlays/industries/finance/overlay.yaml",
        "registers/th/pdpa.yaml",
      ],
    });
  });

  test("returns an empty list when no content directory exists", async () => {
    const root = await makeTemporaryDirectory();

    expect(await discoverContentFiles(root)).toEqual({ ok: true, value: [] });
  });

  test("reads source files and reports missing or oversized files", async () => {
    const root = await makeTemporaryDirectory();
    await mkdir(join(root, "core"), { recursive: true });
    await writeFile(join(root, "core", "a.yaml"), "a: 1\n", "utf8");
    await writeFile(
      join(root, "core", "large.yaml"),
      "a".repeat(1024 * 1024 + 1),
      "utf8",
    );

    expect(await readSourceFiles(root, ["core/a.yaml", "core/a.yaml"])).toEqual(
      {
        ok: true,
        value: [
          { path: "core/a.yaml", text: "a: 1\n" },
          { path: "core/a.yaml", text: "a: 1\n" },
        ],
      },
    );

    const missing = await readSourceFiles(root, ["core/missing.yaml"]);
    expect(missing.ok).toBe(false);
    if (!missing.ok) expect(missing.error.tag).toBe("Read");

    const large = await readSourceFiles(root, ["core/large.yaml"]);
    expect(large.ok).toBe(false);
    if (!large.ok) expect(large.error.tag).toBe("TooLarge");

    expect(await readSourceFiles(root, [])).toEqual({ ok: true, value: [] });
  });
});
