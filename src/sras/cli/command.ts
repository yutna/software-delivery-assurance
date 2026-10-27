import { join } from "node:path";
import {
  discoverContentFiles,
  readSourceFiles,
  type ReadError,
} from "../adapters/fs.js";
import {
  createSchemaValidator,
  type SchemaLoadError,
} from "../adapters/json-schema.js";
import type { Output } from "../adapters/output.js";
import { assertNever } from "../foundation/assert-never.js";
import type { ValidationIssue } from "../standard/types.js";
import { validateStandardFiles } from "../standard/workflow.js";
import { VERSION } from "../version.js";
import type { CliCommand } from "./args.js";

const HELP = [
  "sras - Software Delivery Assurance Library",
  "",
  "Usage:",
  "  sras --version",
  "  sras --help",
  "  sras validate --all",
  "",
].join("\n");

const location = (file: string, path: string): string =>
  path === "" ? file : `${file}:${path}`;

const renderReadError = (error: ReadError): string => {
  switch (error.tag) {
    case "Read":
      return `read error: ${error.file}: ${error.message}\n`;
    case "TooLarge":
      return `read error: ${error.file} is ${String(error.bytes)} bytes; limit is ${String(error.limit)}\n`;
    default:
      return assertNever(error);
  }
};

const renderSchemaLoadError = (error: SchemaLoadError): string => {
  switch (error.tag) {
    case "Read":
      return `schema read error: ${error.file}: ${error.message}\n`;
    case "Compile":
      return `schema compile error: ${error.message}\n`;
    default:
      return assertNever(error);
  }
};

const renderIssue = (issue: ValidationIssue): string => {
  switch (issue.tag) {
    case "Read":
      return `${issue.file}: read: ${issue.message}`;
    case "Yaml":
      return `${issue.file}: yaml: ${issue.message}`;
    case "Schema":
      return `${location(issue.file, issue.path)}: schema: ${issue.message}`;
    case "Parse":
      return `${location(issue.file, issue.path)}: parse: ${issue.message}`;
    case "DuplicateId":
      return `duplicate ID ${issue.id}: ${issue.files.join(", ")}`;
    case "MissingReference":
      return `${issue.from} -> ${issue.to}: missing ${issue.relation} reference`;
    case "Translation":
      return `${issue.id}: translation field ${issue.field}`;
    case "Review":
      return `${issue.id}: review field ${issue.field}`;
    case "OverlayRange":
      return `${issue.overlay}: range ${issue.range} does not include ${issue.standardVersion}`;
    case "GateWaiver":
      return `${issue.id}: gate requirement ${issue.requirement} cannot be waived`;
    case "Ownership":
      return `${issue.id}: expected ${issue.expected}, found ${issue.actual}`;
    case "DuplicateStatement":
      return `${issue.id}: duplicate statement: ${issue.statement}`;
    case "Manifest":
      return `manifest ${issue.field}: ${issue.message}`;
    case "NoContent":
      return issue.message;
    default:
      return assertNever(issue);
  }
};

const runValidate = async (root: string, io: Output): Promise<number> => {
  const discovered = await discoverContentFiles(root);

  if (!discovered.ok) {
    io.stderr(renderReadError(discovered.error));
    return 1;
  }

  if (discovered.value.length === 0) {
    io.stdout("no standard content found; nothing to validate\n");
    return 0;
  }

  const sources = await readSourceFiles(root, discovered.value);

  if (!sources.ok) {
    io.stderr(renderReadError(sources.error));
    return 1;
  }

  const schemas = await createSchemaValidator(join(root, "schemas"));

  if (!schemas.ok) {
    io.stderr(renderSchemaLoadError(schemas.error));
    return 1;
  }

  const result = validateStandardFiles(sources.value, schemas.value);

  if (!result.ok) {
    for (const issue of result.error) {
      io.stderr(`${renderIssue(issue)}\n`);
    }
    return 1;
  }

  io.stdout(`validated ${String(discovered.value.length)} files\n`);
  return 0;
};

export type CommandContext = {
  readonly io: Output;
  readonly root: string;
};

export const runCommand = async (
  command: CliCommand,
  context: CommandContext,
): Promise<number> => {
  switch (command.tag) {
    case "Version":
      context.io.stdout(`${VERSION}\n`);
      return 0;
    case "Help":
      context.io.stdout(HELP);
      return 0;
    case "Validate":
      return runValidate(context.root, context.io);
    default:
      return assertNever(command);
  }
};
