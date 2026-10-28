import { join } from "node:path";
import type { ReadError } from "../adapters/fs.js";
import type { SchemaLoadError } from "../adapters/json-schema.js";
import type { Output } from "../adapters/output.js";
import { assertNever } from "../foundation/assert-never.js";
import {
  renderGuardAnnotations,
  renderGuardJson,
  renderGuardSummary,
  toGuardReport,
} from "../guard/report.js";
import type { GuardError, GuardFinding } from "../guard/types.js";
import { scanContent } from "../guard/workflow.js";
import type { InitIssue } from "../project/init.js";
import type { ProjectIssue } from "../project/types.js";
import {
  initProject,
  refreshProjectLock,
  validateProjectDirectory,
  type InitShellError,
  type ProjectDirectoryError,
} from "../project/workflow.js";
import { renderCheckFromRoot, renderToRoot } from "../render/workflow.js";
import type { RenderDriftIssue, RenderError } from "../render/types.js";
import type { ValidationIssue } from "../standard/types.js";
import { loadStandardFromRoot } from "../standard/workflow.js";
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
  "  sras project validate <dir>",
  "  sras project refresh <dir>",
  "  sras render [--check]",
  "  sras guard [--format text|json] [--annotations]",
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

const renderRenderError = (error: RenderError): string => {
  switch (error.tag) {
    case "NoContent":
      return "no standard content found; nothing to render\n";
    case "Read":
      return `render read error: ${error.file}: ${error.message}\n`;
    case "Schema":
      return `render schema error: ${error.message}\n`;
    case "Validation":
      return `${error.issues.map(renderIssue).join("\n")}\n`;
    case "Write":
      return `render write error: ${error.file}: ${error.message}\n`;
    default:
      return assertNever(error);
  }
};

const renderDriftIssue = (issue: RenderDriftIssue): string => {
  switch (issue.tag) {
    case "Missing":
      return `missing: ${issue.path}`;
    case "Changed":
      return `changed: ${issue.path}:${String(issue.line)}: expected ${JSON.stringify(issue.expected)}, found ${JSON.stringify(issue.actual)}`;
    case "Extra":
      return `extra: ${issue.path}`;
    default:
      return assertNever(issue);
  }
};

const runRender = async (
  root: string,
  check: boolean,
  io: Output,
): Promise<number> => {
  if (!check) {
    const result = await renderToRoot(root);

    if (!result.ok) {
      io.stderr(renderRenderError(result.error));
      return 1;
    }

    io.stdout(`rendered ${String(result.value.pages)} pages\n`);
    return 0;
  }

  const result = await renderCheckFromRoot(root);

  if (!result.ok) {
    if (result.error.tag === "Drift") {
      for (const issue of result.error.issues) {
        io.stderr(`${renderDriftIssue(issue)}\n`);
      }
      return 1;
    }

    io.stderr(renderRenderError(result.error));
    return 1;
  }

  io.stdout(
    `render check passed: ${String(result.value.pages)} pages; ${String(result.value.checked)} files\n`,
  );
  return 0;
};

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
    case "UnknownSelection":
      return `${issue.file}: ${issue.kind}: unknown selection: ${issue.id}`;
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

const renderProjectDirectoryError = (error: ProjectDirectoryError): string => {
  switch (error.tag) {
    case "InvalidTarget":
      return `invalid project directory ${error.target}: ${error.message}`;
    case "PathTraversal":
      return `invalid project directory ${error.target}: path traversal is not allowed`;
    case "Read":
      return `project read error: ${error.file}: ${error.message}`;
    case "Schema":
      return `project schema error: ${error.message}`;
    case "StandardMissing":
      return "no standard content found; nothing to validate";
    case "StandardInvalid":
      return `standard validation error:\n${error.issues.map(renderIssue).join("\n")}`;
    case "Issues":
      return `project validation error:\n${error.issues.map(renderProjectIssue).join("\n")}`;
    case "Lockfile":
      return `project lockfile error:\n${error.issues.map(renderProjectIssue).join("\n")}`;
    case "Write":
      return `project write error: ${error.file}: ${error.message}`;
    default:
      return assertNever(error);
  }
};

const runProject = async (
  root: string,
  command: Extract<CliCommand, { readonly tag: "Project" }>,
  io: Output,
): Promise<number> => {
  if (command.action === "validate") {
    const result = await validateProjectDirectory({
      root,
      target: command.directory,
    });

    if (!result.ok) {
      io.stderr(`${renderProjectDirectoryError(result.error)}\n`);
      return 1;
    }

    io.stdout(
      `project valid: ${result.value.target}; ${String(result.value.inputCount)} resolved standard inputs; lockfile current\n`,
    );
    return 0;
  }

  const result = await refreshProjectLock({
    root,
    target: command.directory,
  });

  if (!result.ok) {
    io.stderr(`${renderProjectDirectoryError(result.error)}\n`);
    return 1;
  }

  io.stdout(
    `refreshed ${result.value.target}/assurance.lock.yaml; ${String(result.value.inputCount)} resolved standard inputs; ${result.value.checksum}\n`,
  );
  return 0;
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

const runGuard = async (
  root: string,
  command: Extract<CliCommand, { readonly tag: "Guard" }>,
  io: Output,
): Promise<number> => {
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

  const report = toGuardReport(result.value);

  if (command.format === "json") {
    io.stdout(renderGuardJson(report));
    return report.ok ? 0 : 1;
  }

  if (command.annotations) {
    io.stdout(renderGuardAnnotations(report));
    return report.ok ? 0 : 1;
  }

  if (report.ok) {
    io.stdout(renderGuardSummary(report));
    return 0;
  }

  for (const finding of result.value.findings) {
    io.stderr(`${renderGuardFinding(finding)}\n`);
  }

  io.stderr(renderGuardSummary(report));
  return 1;
};

const runValidate = async (root: string, io: Output): Promise<number> => {
  const loaded = await loadStandardFromRoot(root);

  if (!loaded.ok) {
    switch (loaded.error.tag) {
      case "Read":
        io.stderr(renderReadError(loaded.error.error));
        return 1;
      case "Schema":
        io.stderr(renderSchemaLoadError(loaded.error.error));
        return 1;
      case "Invalid":
        for (const issue of loaded.error.issues) {
          io.stderr(`${renderIssue(issue)}\n`);
        }
        return 1;
      case "NoContent":
        io.stdout("no standard content found; nothing to validate\n");
        return 0;
      default:
        return assertNever(loaded.error);
    }
  }

  io.stdout(`validated ${String(loaded.value.fileCount)} files\n`);
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
    case "Project":
      return runProject(context.root, command, context.io);
    case "Render":
      return runRender(context.root, command.check, context.io);
    case "Guard":
      return runGuard(context.root, command, context.io);
    default:
      return assertNever(command);
  }
};
