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

  test("an unknown command is rejected", () => {
    expect(parseArgs(["nope"])).toEqual({
      ok: false,
      error: { tag: "UnknownArgument", value: "nope" },
    });
  });
});
