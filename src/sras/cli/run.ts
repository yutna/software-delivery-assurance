import { processOutput, type Output } from "../adapters/output.js";
import { assertNever } from "../foundation/assert-never.js";
import { parseArgs, type ArgsError } from "./args.js";
import { runCommand } from "./command.js";

const renderArgsError = (error: ArgsError): string => {
  switch (error.tag) {
    case "UnknownArgument":
      return `unknown argument: ${error.value}\n`;
    case "TooManyArguments":
      return `too many arguments: ${error.values.join(" ")}\n`;
    case "MissingFlag":
      return `missing required flag: ${error.value}\n`;
    case "MissingArgument":
      return `missing required argument: ${error.value}\n`;
    case "InvalidProfile":
      return `invalid profile: ${error.value}; expected lite or full\n`;
    default:
      return assertNever(error);
  }
};

export const run = async (
  argv: readonly string[],
  io: Output = processOutput,
  root: string = process.cwd(),
): Promise<number> => {
  const parsed = parseArgs(argv);

  if (!parsed.ok) {
    io.stderr(renderArgsError(parsed.error));
    return 2;
  }

  return runCommand(parsed.value, { io, root });
};
