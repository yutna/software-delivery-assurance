import { assertNever } from "../foundation/assert-never.js";
import { parseArgs, type ArgsError } from "./args.js";
import { runCommand, type CliIo } from "./command.js";

export const defaultIo: CliIo = {
  stdout: (text) => process.stdout.write(text),
  stderr: (text) => process.stderr.write(text),
};

const renderArgsError = (error: ArgsError): string => {
  switch (error.tag) {
    case "UnknownArgument":
      return `unknown argument: ${error.value}\n`;
    case "TooManyArguments":
      return `too many arguments: ${error.values.join(" ")}\n`;
    default:
      return assertNever(error);
  }
};

export const run = (argv: readonly string[], io: CliIo = defaultIo): number => {
  const parsed = parseArgs(argv);

  if (!parsed.ok) {
    io.stderr(renderArgsError(parsed.error));
    return 2;
  }

  return runCommand(parsed.value, io);
};
