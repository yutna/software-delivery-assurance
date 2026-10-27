import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import type { Output } from "../../src/sras/adapters/output.js";
import { run } from "../../src/sras/cli/run.js";

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

const makeRoot = async (withDenylist: boolean): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), "sras-cli-guard-"));
  temporaryDirectories.push(root);
  await writeFile(join(root, "README.md"), "A clean public README.\n", "utf8");

  if (withDenylist) {
    await mkdir(join(root, "guard"), { recursive: true });
    await cp(
      join(process.cwd(), "guard", "denylist.yaml"),
      join(root, "guard", "denylist.yaml"),
    );
  }

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
  delete process.env["SRAS_DENYLIST_PATH"];
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("sras guard", () => {
  test("passes clean content", async () => {
    const root = await makeRoot(true);
    const { io, stdout, stderr } = makeIo();

    expect(await run(["guard"], io, root)).toBe(0);
    expect(stdout.join("")).toContain("guard passed");
    expect(stderr).toEqual([]);
  });

  test("fails on a forbidden term and redacts the preview", async () => {
    const root = await makeRoot(true);
    await write(root, "core/bad.yaml", "description: a hospital\n");
    const { io, stderr } = makeIo();

    expect(await run(["guard"], io, root)).toBe(1);
    expect(stderr.join("")).toContain("healthcare");
    expect(stderr.join("")).toContain("[redacted]");
    expect(stderr.join("")).not.toContain("hospital");
  });

  test("emits a stable JSON report", async () => {
    const root = await makeRoot(true);
    await write(root, "core/bad.yaml", "description: a hospital\n");
    const { io, stdout, stderr } = makeIo();

    expect(await run(["guard", "--format", "json"], io, root)).toBe(1);

    const parsed: unknown = JSON.parse(stdout.join(""));
    expect(parsed).toMatchObject({
      version: 1,
      tool: "sras-guard",
      ok: false,
      scanned: 2,
      excluded: 0,
    });
    expect(stdout.join("")).not.toContain("hospital");
    expect(stderr).toEqual([]);
  });

  test("a clean JSON scan exits 0", async () => {
    const root = await makeRoot(true);
    const { io, stdout } = makeIo();

    expect(await run(["guard", "--format=json"], io, root)).toBe(0);

    const parsed: unknown = JSON.parse(stdout.join(""));
    expect(parsed).toMatchObject({ version: 1, ok: true, findings: [] });
  });

  test("emits file and line annotations", async () => {
    const root = await makeRoot(true);
    await write(root, "core/bad.yaml", "description: a hospital\n");
    const { io, stdout } = makeIo();

    expect(await run(["guard", "--annotations"], io, root)).toBe(1);
    expect(stdout.join("")).toContain("::error file=core/bad.yaml,line=1");
    expect(stdout.join("")).not.toContain("hospital");
  });

  test("rejects conflicting output flags", async () => {
    const root = await makeRoot(true);
    const { io, stderr } = makeIo();

    expect(
      await run(["guard", "--format", "json", "--annotations"], io, root),
    ).toBe(2);
    expect(stderr.join("")).toContain("conflicting flags");
  });

  test("rejects an invalid format", async () => {
    const root = await makeRoot(true);
    const { io, stderr } = makeIo();

    expect(await run(["guard", "--format", "yaml"], io, root)).toBe(2);
    expect(stderr.join("")).toContain("invalid format");
  });

  test("rejects extra arguments", async () => {
    const root = await makeRoot(true);
    const { io, stderr } = makeIo();

    expect(await run(["guard", "extra"], io, root)).toBe(2);
    expect(stderr.join("")).toContain("too many arguments");
  });

  test("loads a private override from the environment", async () => {
    const root = await makeRoot(true);
    await write(root, "README.md", "The acme-corp platform is public.\n");
    await write(
      root,
      "override.yaml",
      "categories:\n  customer_data:\n    - acme-corp\n",
    );
    process.env["SRAS_DENYLIST_PATH"] = join(root, "override.yaml");
    const { io, stderr } = makeIo();

    expect(await run(["guard"], io, root)).toBe(1);
    expect(stderr.join("")).not.toContain("acme-corp");
  });

  test("reports a missing denylist", async () => {
    const root = await makeRoot(false);
    const { io, stderr } = makeIo();

    expect(await run(["guard"], io, root)).toBe(1);
    expect(stderr.join("")).toContain("guard read error");
  });
});
