import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import type { Output } from "../../src/sras/adapters/output.js";
import { run } from "../../src/sras/cli/run.js";
import { validFiles } from "../helpers/content.js";

const temporaryDirectories: string[] = [];

const makeIo = (): {
  readonly io: Output;
  readonly stdout: string[];
  readonly stderr: string[];
} => {
  const stdout: string[] = [];
  const stderr: string[] = [];

  return {
    io: {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    },
    stdout,
    stderr,
  };
};

const makeRoot = async (withContent: boolean): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), "sras-cli-"));
  temporaryDirectories.push(root);
  await cp(join(process.cwd(), "schemas"), join(root, "schemas"), {
    recursive: true,
  });

  if (withContent) {
    for (const file of validFiles) {
      const path = join(root, file.path);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, file.text, "utf8");
    }
  }

  return root;
};

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("sras validate --all", () => {
  test("validates a complete content set", async () => {
    const root = await makeRoot(true);
    const { io, stdout, stderr } = makeIo();

    expect(await run(["validate", "--all"], io, root)).toBe(0);
    expect(stdout.join("")).toContain("validated");
    expect(stderr).toEqual([]);
  });

  test("reports schema errors and exits 1", async () => {
    const root = await makeRoot(false);
    await mkdir(join(root, "core", "domains"), { recursive: true });
    await writeFile(
      join(root, "core", "domains", "security.yaml"),
      "- id: SRAS-SEC-1\n",
      "utf8",
    );
    const { io, stderr } = makeIo();

    expect(await run(["validate", "--all"], io, root)).toBe(1);
    expect(stderr.join("")).toContain("schema");
  });

  test("prints a notice and exits 0 when no content exists", async () => {
    const root = await makeRoot(false);
    const { io, stdout } = makeIo();

    expect(await run(["validate", "--all"], io, root)).toBe(0);
    expect(stdout.join("")).toContain("no standard content found");
  });

  test("reports missing schemas and exits 1", async () => {
    const root = await mkdtemp(join(tmpdir(), "sras-cli-no-schemas-"));
    temporaryDirectories.push(root);
    await mkdir(join(root, "core", "domains"), { recursive: true });
    await writeFile(
      join(root, "core", "domains", "security.yaml"),
      validFiles[1]?.text ?? "",
      "utf8",
    );
    const { io, stderr } = makeIo();

    expect(await run(["validate", "--all"], io, root)).toBe(1);
    expect(stderr.join("")).toContain("schema read error");
  });

  test("validate without --all is a usage error", async () => {
    const { io, stderr } = makeIo();

    expect(await run(["validate"], io, process.cwd())).toBe(2);
    expect(stderr.join("")).toContain("missing required flag");
  });

  test("validate with extra arguments is a usage error", async () => {
    const { io, stderr } = makeIo();

    expect(await run(["validate", "--all", "extra"], io, process.cwd())).toBe(
      2,
    );
    expect(stderr.join("")).toContain("too many arguments");
  });
});
