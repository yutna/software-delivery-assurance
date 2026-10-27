import { assertNever } from "../foundation/assert-never.js";
import { VERSION } from "../version.js";
import type { CliCommand } from "./args.js";

export type CliIo = {
  readonly stdout: (text: string) => void;
  readonly stderr: (text: string) => void;
};

const HELP = [
  "sras - Software Delivery Assurance Library",
  "",
  "Usage:",
  "  sras --version",
  "  sras --help",
  "",
  "Commands will be added in later milestones.",
  "",
].join("\n");

export const runCommand = (command: CliCommand, io: CliIo): number => {
  switch (command.tag) {
    case "Version":
      io.stdout(`${VERSION}\n`);
      return 0;
    case "Help":
      io.stdout(HELP);
      return 0;
    default:
      return assertNever(command);
  }
};
