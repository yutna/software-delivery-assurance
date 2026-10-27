import { err, ok, type Result } from "../foundation/result.js";

export type CliCommand =
  | { readonly tag: "Version" }
  | { readonly tag: "Help" }
  | { readonly tag: "Validate"; readonly all: true };

export type ArgsError =
  | { readonly tag: "UnknownArgument"; readonly value: string }
  | { readonly tag: "TooManyArguments"; readonly values: readonly string[] }
  | { readonly tag: "MissingFlag"; readonly value: string };

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

  if (first === "validate") {
    if (rest.length > 1) return err({ tag: "TooManyArguments", values: argv });

    const flag = rest[0];

    if (flag === undefined) return err({ tag: "MissingFlag", value: "--all" });
    if (flag === "--all") return ok({ tag: "Validate", all: true });

    return err({ tag: "UnknownArgument", value: flag });
  }

  return err({ tag: "UnknownArgument", value: first });
};
