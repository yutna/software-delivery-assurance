import { err, ok, type Result } from "../foundation/result.js";
import type { ProfileId } from "../standard/types.js";

export type CliCommand =
  | { readonly tag: "Version" }
  | { readonly tag: "Help" }
  | { readonly tag: "Validate"; readonly all: true }
  | {
      readonly tag: "Init";
      readonly directory: string;
      readonly profile: ProfileId;
    }
  | { readonly tag: "Guard" };

export type ArgsError =
  | { readonly tag: "UnknownArgument"; readonly value: string }
  | { readonly tag: "TooManyArguments"; readonly values: readonly string[] }
  | { readonly tag: "MissingFlag"; readonly value: string }
  | { readonly tag: "MissingArgument"; readonly value: string }
  | { readonly tag: "InvalidProfile"; readonly value: string };

const PROFILES = ["lite", "full"] as const satisfies readonly ProfileId[];

const parseProfile = (value: string): Result<ProfileId, ArgsError> => {
  const profile = PROFILES.find((candidate) => candidate === value);

  return profile === undefined
    ? err({ tag: "InvalidProfile", value })
    : ok(profile);
};

const parseInit = (
  values: readonly string[],
  argv: readonly string[],
): Result<CliCommand, ArgsError> => {
  const [directory, ...rest] = values;

  if (directory === undefined || directory.startsWith("--")) {
    return err({ tag: "MissingArgument", value: "<dir>" });
  }

  let profile: ProfileId | undefined;
  let index = 0;

  while (index < rest.length) {
    const value = rest[index];

    if (value === "--profile") {
      const next = rest[index + 1];

      if (next === undefined) {
        return err({ tag: "MissingFlag", value: "--profile" });
      }

      if (profile !== undefined) {
        return err({ tag: "TooManyArguments", values: argv });
      }

      const parsed = parseProfile(next);

      if (!parsed.ok) return err(parsed.error);

      profile = parsed.value;
      index += 2;
      continue;
    }

    if (value?.startsWith("--profile=") === true) {
      if (profile !== undefined) {
        return err({ tag: "TooManyArguments", values: argv });
      }

      const parsed = parseProfile(value.slice("--profile=".length));

      if (!parsed.ok) return err(parsed.error);

      profile = parsed.value;
      index += 1;
      continue;
    }

    return err({ tag: "UnknownArgument", value: value ?? "" });
  }

  if (profile === undefined) {
    return err({ tag: "MissingFlag", value: "--profile" });
  }

  return ok({ tag: "Init", directory, profile });
};

export const parseArgs = (
  argv: readonly string[],
): Result<CliCommand, ArgsError> => {
  const [first, ...rest] = argv;

  if (first === undefined) return ok({ tag: "Help" });

  if (
    first === "--version" ||
    first === "-v" ||
    first === "--help" ||
    first === "-h"
  ) {
    if (rest.length > 0) return err({ tag: "TooManyArguments", values: argv });

    return ok(
      first === "--version" || first === "-v"
        ? { tag: "Version" }
        : { tag: "Help" },
    );
  }

  if (first === "guard") {
    if (rest.length > 0) return err({ tag: "TooManyArguments", values: argv });
    return ok({ tag: "Guard" });
  }

  if (first === "init") {
    return parseInit(rest, argv);
  }

  if (first === "validate") {
    if (rest.length > 1) return err({ tag: "TooManyArguments", values: argv });

    const flag = rest[0];

    if (flag === undefined) return err({ tag: "MissingFlag", value: "--all" });
    if (flag === "--all") return ok({ tag: "Validate", all: true });

    return err({ tag: "UnknownArgument", value: flag });
  }

  return err({ tag: "UnknownArgument", value: first });
};
