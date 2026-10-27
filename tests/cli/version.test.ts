import { describe, expect, test } from "vitest";
import { run } from "../../src/sras/cli/run.js";
import { VERSION } from "../../src/sras/version.js";

const makeIo = (): {
  readonly io: {
    readonly stdout: (text: string) => void;
    readonly stderr: (text: string) => void;
  };
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

describe("sras CLI", () => {
  test("--version prints the version and exits 0", () => {
    const { io, stdout, stderr } = makeIo();

    expect(run(["--version"], io)).toBe(0);
    expect(stdout.join("")).toBe(`${VERSION}\n`);
    expect(stderr).toEqual([]);
  });

  test("--help prints usage and exits 0", () => {
    const { io, stdout } = makeIo();

    expect(run(["--help"], io)).toBe(0);
    expect(stdout.join("")).toContain("Usage:");
  });

  test("no arguments prints help", () => {
    const { io, stdout } = makeIo();

    expect(run([], io)).toBe(0);
    expect(stdout.join("")).toContain("Usage:");
  });

  test("an unknown argument exits 2 and writes to stderr", () => {
    const { io, stdout, stderr } = makeIo();

    expect(run(["--nope"], io)).toBe(2);
    expect(stdout).toEqual([]);
    expect(stderr.join("")).toContain("unknown argument: --nope");
  });

  test("too many arguments exits 2", () => {
    const { io, stderr } = makeIo();

    expect(run(["--version", "--help"], io)).toBe(2);
    expect(stderr.join("")).toContain("too many arguments");
  });
});
