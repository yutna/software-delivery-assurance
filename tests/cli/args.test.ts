import { describe, expect, test } from "vitest";
import { parseArgs } from "../../src/sras/cli/args.js";

describe("parseArgs", () => {
  test("no arguments is help", () => {
    expect(parseArgs([])).toEqual({ ok: true, value: { tag: "Help" } });
  });

  test("version aliases", () => {
    expect(parseArgs(["--version"])).toEqual({
      ok: true,
      value: { tag: "Version" },
    });
    expect(parseArgs(["-v"])).toEqual({
      ok: true,
      value: { tag: "Version" },
    });
  });

  test("help aliases", () => {
    expect(parseArgs(["--help"])).toEqual({
      ok: true,
      value: { tag: "Help" },
    });
    expect(parseArgs(["-h"])).toEqual({
      ok: true,
      value: { tag: "Help" },
    });
  });

  test("extra arguments after a flag are rejected", () => {
    expect(parseArgs(["--version", "--help"])).toEqual({
      ok: false,
      error: { tag: "TooManyArguments", values: ["--version", "--help"] },
    });
  });

  test("validate requires --all", () => {
    expect(parseArgs(["validate"])).toEqual({
      ok: false,
      error: { tag: "MissingFlag", value: "--all" },
    });
    expect(parseArgs(["validate", "--all"])).toEqual({
      ok: true,
      value: { tag: "Validate", all: true },
    });
  });

  test("validate rejects extra or unknown arguments", () => {
    expect(parseArgs(["validate", "--all", "extra"])).toEqual({
      ok: false,
      error: {
        tag: "TooManyArguments",
        values: ["validate", "--all", "extra"],
      },
    });
    expect(parseArgs(["validate", "--nope"])).toEqual({
      ok: false,
      error: { tag: "UnknownArgument", value: "--nope" },
    });
  });

  test("init requires a directory and a profile", () => {
    expect(parseArgs(["init"])).toEqual({
      ok: false,
      error: { tag: "MissingArgument", value: "<dir>" },
    });
    expect(parseArgs(["init", "example-project"])).toEqual({
      ok: false,
      error: { tag: "MissingFlag", value: "--profile" },
    });
  });

  test("init accepts both profile spellings", () => {
    expect(parseArgs(["init", "example-project", "--profile", "lite"])).toEqual(
      {
        ok: true,
        value: { tag: "Init", directory: "example-project", profile: "lite" },
      },
    );
    expect(parseArgs(["init", "example-project", "--profile=full"])).toEqual({
      ok: true,
      value: { tag: "Init", directory: "example-project", profile: "full" },
    });
  });

  test("init rejects an invalid profile", () => {
    expect(parseArgs(["init", "example-project", "--profile", "fast"])).toEqual(
      {
        ok: false,
        error: { tag: "InvalidProfile", value: "fast" },
      },
    );
  });

  test("init rejects unknown or repeated arguments", () => {
    expect(parseArgs(["init", "example-project", "--nope"])).toEqual({
      ok: false,
      error: { tag: "UnknownArgument", value: "--nope" },
    });
    expect(
      parseArgs([
        "init",
        "example-project",
        "--profile",
        "lite",
        "--profile",
        "full",
      ]),
    ).toEqual({
      ok: false,
      error: {
        tag: "TooManyArguments",
        values: [
          "init",
          "example-project",
          "--profile",
          "lite",
          "--profile",
          "full",
        ],
      },
    });
  });

  test("an unknown command is rejected", () => {
    expect(parseArgs(["nope"])).toEqual({
      ok: false,
      error: { tag: "UnknownArgument", value: "nope" },
    });
  });
});
