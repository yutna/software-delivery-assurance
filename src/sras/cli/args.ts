import { err, ok, type Result } from "../foundation/result.js";

export type CliCommand = { readonly tag: "Version" } | { readonly tag: "Help" };

export type ArgsError =
  | { readonly tag: "UnknownArgument"; readonly value: string }
  | { readonly tag: "TooManyArguments"; readonly values: readonly string[] };

export const parseArgs = (
  argv: readonly string[],
): Result<CliCommand, ArgsError> => {
  const [first, ...rest] = argv;

  if (first === undefined) return ok({ tag: "Help" });
  if (rest.length > 0) return err({ tag: "TooManyArguments", values: argv });
  if (first === "--version" || first === "-v") return ok({ tag: "Version" });
  if (first === "--help" || first === "-h") return ok({ tag: "Help" });

  return err({ tag: "UnknownArgument", value: first });
};
