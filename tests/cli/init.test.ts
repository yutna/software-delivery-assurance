import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import type { Output } from "../../src/sras/adapters/output.js";
import { run } from "../../src/sras/cli/run.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

const makeTemp = async (): Promise<string> => {
  const directory = await mkdtemp(join(tmpdir(), "sras-cli-init-"));
  temporaryDirectories.push(directory);
  return directory;
};

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

describe("sras init", () => {
  test("creates a project instance and prints next steps", async () => {
    const temp = await makeTemp();
    const target = join(temp, "cli-project");
    const { io, stdout, stderr } = makeIo();

    expect(
      await run(["init", target, "--profile", "lite"], io, process.cwd()),
    ).toBe(0);
    expect(stdout.join("")).toContain("created project instance");
    expect(stdout.join("")).toContain("next steps");
    expect(stderr).toEqual([]);
    expect(await readFile(join(target, "assurance.yaml"), "utf8")).toContain(
      "profile: lite",
    );
  });

  test("supports --profile=full", async () => {
    const temp = await makeTemp();
    const target = join(temp, "cli-full");
    const { io } = makeIo();

    expect(
      await run(["init", target, "--profile=full"], io, process.cwd()),
    ).toBe(0);
    expect(await readFile(join(target, "assessment.yaml"), "utf8")).toContain(
      "index: 0.0",
    );
  });

  test("refuses a non-empty directory with exit code 1", async () => {
    const temp = await makeTemp();
    const target = join(temp, "non-empty");
    await mkdir(target);
    await writeFile(join(target, "keep.txt"), "keep\n", "utf8");
    const { io, stderr } = makeIo();

    expect(
      await run(["init", target, "--profile", "lite"], io, process.cwd()),
    ).toBe(1);
    expect(stderr.join("")).toContain("not empty");
  });

  test("rejects path traversal with exit code 1", async () => {
    const temp = await makeTemp();
    const target = `${temp}/nested/../escaped`;
    const { io, stderr } = makeIo();

    expect(
      await run(["init", target, "--profile", "lite"], io, process.cwd()),
    ).toBe(1);
    expect(stderr.join("")).toContain("path traversal");
  });

  test("usage errors exit with code 2", async () => {
    const { io, stderr } = makeIo();

    expect(await run(["init", "example-project"], io, process.cwd())).toBe(2);
    expect(stderr.join("")).toContain("missing required flag: --profile");

    const invalid = makeIo();

    expect(
      await run(
        ["init", "example-project", "--profile", "fast"],
        invalid.io,
        process.cwd(),
      ),
    ).toBe(2);
    expect(invalid.stderr.join("")).toContain("invalid profile: fast");
  });

  test("a missing directory is a usage error", async () => {
    const { io, stderr } = makeIo();

    expect(await run(["init"], io, process.cwd())).toBe(2);
    expect(stderr.join("")).toContain("missing required argument: <dir>");
  });
});
