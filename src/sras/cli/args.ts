import { err, ok, type Result } from "../foundation/result.js";
import type { ProfileId } from "../standard/types.js";

export type CliCommand =
  | { readonly tag: "Version" }
  | { readonly tag: "Help" }
  | { readonly tag: "Validate"; readonly all: true }
  | { readonly tag: "Render"; readonly check: boolean }
  | {
      readonly tag: "Init";
      readonly directory: string;
      readonly profile: ProfileId;
    }
  | {
      readonly tag: "Project";
      readonly action: ProjectAction;
      readonly directory: string;
    }
  | {
      readonly tag: "Guard";
      readonly format: GuardFormat;
      readonly annotations: boolean;
    };

export type GuardFormat = "text" | "json";

export type ProjectAction = "validate" | "refresh" | "resolve";

export type ArgsError =
  | { readonly tag: "UnknownArgument"; readonly value: string }
  | { readonly tag: "TooManyArguments"; readonly values: readonly string[] }
  | { readonly tag: "MissingFlag"; readonly value: string }
  | { readonly tag: "MissingArgument"; readonly value: string }
  | { readonly tag: "InvalidProfile"; readonly value: string }
  | { readonly tag: "InvalidFormat"; readonly value: string }
  | { readonly tag: "InvalidProjectAction"; readonly value: string }
  | { readonly tag: "ConflictingFlags"; readonly values: readonly string[] };

const PROFILES = ["lite", "full"] as const satisfies readonly ProfileId[];

const FORMATS = ["text", "json"] as const satisfies readonly GuardFormat[];

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

const PROJECT_ACTIONS = [
  "validate",
  "refresh",
  "resolve",
] as const satisfies readonly ProjectAction[];

const parseProject = (
  values: readonly string[],
  argv: readonly string[],
): Result<CliCommand, ArgsError> => {
  const [action, directory, ...rest] = values;

  if (action === undefined) {
    return err({ tag: "MissingArgument", value: "validate|refresh|resolve" });
  }

  const parsed = PROJECT_ACTIONS.find((candidate) => candidate === action);

  if (parsed === undefined) {
    return err({ tag: "InvalidProjectAction", value: action });
  }

  if (directory === undefined) {
    return err({ tag: "MissingArgument", value: "<dir>" });
  }

  if (rest.length > 0) {
    return err({ tag: "TooManyArguments", values: argv });
  }

  return ok({ tag: "Project", action: parsed, directory });
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
    let format: GuardFormat = "text";
    let formatSet = false;
    let annotations = false;
    let index = 0;

    while (index < rest.length) {
      const value = rest[index];

      if (value === "--format") {
        const next = rest[index + 1];

        if (next === undefined) {
          return err({ tag: "MissingFlag", value: "--format" });
        }

        if (formatSet) return err({ tag: "TooManyArguments", values: argv });

        const parsed = FORMATS.find((candidate) => candidate === next);

        if (parsed === undefined) {
          return err({ tag: "InvalidFormat", value: next });
        }

        format = parsed;
        formatSet = true;
        index += 2;
        continue;
      }

      if (value?.startsWith("--format=") === true) {
        if (formatSet) return err({ tag: "TooManyArguments", values: argv });

        const parsed = FORMATS.find(
          (candidate) => candidate === value.slice("--format=".length),
        );

        if (parsed === undefined) {
          return err({
            tag: "InvalidFormat",
            value: value.slice("--format=".length),
          });
        }

        format = parsed;
        formatSet = true;
        index += 1;
        continue;
      }

      if (value === "--annotations") {
        if (annotations) {
          return err({ tag: "TooManyArguments", values: argv });
        }

        annotations = true;
        index += 1;
        continue;
      }

      if (value?.startsWith("--") === false) {
        return err({ tag: "TooManyArguments", values: argv });
      }

      return err({ tag: "UnknownArgument", value: value ?? "" });
    }

    if (annotations && format === "json") {
      return err({
        tag: "ConflictingFlags",
        values: ["--format json", "--annotations"],
      });
    }

    return ok({ tag: "Guard", format, annotations });
  }

  if (first === "init") {
    return parseInit(rest, argv);
  }

  if (first === "project") {
    return parseProject(rest, argv);
  }

  if (first === "render") {
    if (rest.length === 0) return ok({ tag: "Render", check: false });
    if (rest.length === 1 && rest[0] === "--check") {
      return ok({ tag: "Render", check: true });
    }
    if (rest.length > 1) {
      return err({ tag: "TooManyArguments", values: argv });
    }
    return err({ tag: "UnknownArgument", value: rest[0] ?? "" });
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
