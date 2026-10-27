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
import type { GuardError, GuardFinding } from "../guard/types.js";
import { scanContent } from "../guard/workflow.js";
import type { InitIssue } from "../project/init.js";
import type { ProjectIssue } from "../project/types.js";
import { initProject, type InitShellError } from "../project/workflow.js";
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
  "  sras init <dir> --profile lite|full",
  "  sras guard",
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

const renderGuardError = (error: GuardError): string => {
  switch (error.tag) {
    case "Read":
      return `guard read error: ${error.file}: ${error.message}\n`;
    case "Denylist":
      return `guard denylist error: ${error.file}: ${error.message}\n`;
    case "Regex":
      return `guard regex error: ${error.id}: ${error.message}\n`;
    default:
      return assertNever(error);
  }
};

const renderGuardFinding = (finding: GuardFinding): string =>
  `${finding.file}:${String(finding.line)} [${finding.category}/${finding.ruleId}] ${finding.preview} — ${finding.reason}`;

const renderProjectIssue = (issue: ProjectIssue): string => {
  switch (issue.tag) {
    case "Parse":
      return `${location(issue.file, issue.path)}: parse: ${issue.message}`;
    case "DuplicateId":
      return `${issue.file}: duplicate ${issue.family} ${issue.id}`;
    case "MissingReference":
      return `${issue.file}: ${issue.from} -> ${issue.to}: missing ${issue.relation} reference`;
    case "CountMismatch":
      return `${issue.file}: ${issue.status}: declared ${String(issue.declared)}, actual ${String(issue.actual)}`;
    case "Mismatch":
      return `${issue.file}: ${issue.field}: expected ${issue.expected}, found ${issue.actual}`;
    case "ChecksumMismatch":
      return `${issue.file}: checksum: expected ${issue.expected}, found ${issue.actual}`;
    case "Lockfile":
      return `${issue.file}: lockfile: ${issue.message}`;
    default:
      return assertNever(issue);
  }
};

const renderInitIssue = (issue: InitIssue): string => {
  switch (issue.tag) {
    case "InvalidProjectName":
      return `invalid project name: ${issue.value}`;
    case "MissingTemplateFile":
      return `missing template file: ${issue.path}`;
    case "UnexpectedTemplateFile":
      return `unexpected template file: ${issue.path}`;
    case "TemplateMarker":
      return `template marker was not replaced: ${issue.file}: ${issue.marker}`;
    case "Lockfile":
      return issue.issues.map(renderProjectIssue).join("\n");
    default:
      return assertNever(issue);
  }
};

const renderInitShellError = (error: InitShellError): string => {
  switch (error.tag) {
    case "InvalidTarget":
      return `invalid target ${error.target}: ${error.message}`;
    case "PathTraversal":
      return `invalid target ${error.target}: path traversal is not allowed`;
    case "TargetNotEmpty":
      return `init refused: target directory is not empty: ${error.target}`;
    case "Read":
      return `init read error: ${error.file}: ${error.message}`;
    case "Write":
      return `init write error: ${error.file}: ${error.message}`;
    case "Clock":
      return `init clock error: ${error.message}`;
    case "Version":
      return `init version error: ${error.value}`;
    case "Plan":
      return `init plan error:\n${error.issues.map(renderInitIssue).join("\n")}`;
    case "Validation":
      return `init validation error:\n${error.issues.map(renderProjectIssue).join("\n")}`;
    default:
      return assertNever(error);
  }
};

const runInit = async (
  root: string,
  command: Extract<CliCommand, { readonly tag: "Init" }>,
  io: Output,
): Promise<number> => {
  const result = await initProject({
    root,
    target: command.directory,
    profile: command.profile,
  });

  if (!result.ok) {
    io.stderr(`${renderInitShellError(result.error)}\n`);
    return 1;
  }

  io.stdout(`created project instance at ${result.value.target}\n`);
  io.stdout(`files: ${result.value.files.join(", ")}\n`);
  io.stdout("next steps:\n");

  for (const [index, step] of result.value.nextSteps.entries()) {
    io.stdout(`${String(index + 1)}. ${step}\n`);
  }

  return 0;
};

const runGuard = async (root: string, io: Output): Promise<number> => {
  const override = process.env["SRAS_DENYLIST_PATH"];
  const result = await scanContent(
    root,
    join(root, "guard", "denylist.yaml"),
    override === undefined || override === "" ? undefined : override,
  );

  if (!result.ok) {
    io.stderr(renderGuardError(result.error));
    return 1;
  }

  if (result.value.findings.length === 0) {
    io.stdout(
      `guard passed: scanned ${String(result.value.scanned)} files; excluded ${String(result.value.skipped.length)}\n`,
    );
    return 0;
  }

  for (const finding of result.value.findings) {
    io.stderr(`${renderGuardFinding(finding)}\n`);
  }

  return 1;
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
    case "Init":
      return runInit(context.root, command, context.io);
    case "Guard":
      return runGuard(context.root, context.io);
    default:
      return assertNever(command);
  }
};
