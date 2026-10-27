import { lstat, mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, isAbsolute, join, resolve } from "node:path";
import {
  createSchemaValidator,
  type SchemaIssue,
  type SchemaName,
  type SchemaValidator,
} from "../adapters/json-schema.js";
import { readSourceFiles, type ReadError } from "../adapters/fs.js";
import { parseYaml } from "../adapters/yaml.js";
import { assertNever } from "../foundation/assert-never.js";
import { err, ok, type Result } from "../foundation/result.js";
import type { SourceFile } from "../standard/dto.js";
import { isoDate, version, type IsoDate } from "../standard/primitives.js";
import type { ProfileId } from "../standard/types.js";
import { renderProjectReadme } from "../render/markdown.js";
import { VERSION } from "../version.js";
import {
  planProjectInit,
  TEMPLATE_FILES,
  type InitIssue,
  type PlannedFile,
} from "./init.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "./parse.js";
import type { ProjectInstance, ProjectIssue } from "./types.js";
import { validateProject } from "./validate.js";

export type InitProjectInput = {
  readonly root: string;
  readonly target: string;
  readonly profile: ProfileId;
  readonly date?: IsoDate;
};

export type InitResult = {
  readonly target: string;
  readonly files: readonly string[];
  readonly nextSteps: readonly string[];
};

export type InitShellError =
  | {
      readonly tag: "InvalidTarget";
      readonly target: string;
      readonly message: string;
    }
  | { readonly tag: "PathTraversal"; readonly target: string }
  | { readonly tag: "TargetNotEmpty"; readonly target: string }
  | { readonly tag: "Read"; readonly file: string; readonly message: string }
  | { readonly tag: "Write"; readonly file: string; readonly message: string }
  | { readonly tag: "Clock"; readonly message: string }
  | { readonly tag: "Version"; readonly value: string }
  | { readonly tag: "Plan"; readonly issues: readonly InitIssue[] }
  | { readonly tag: "Validation"; readonly issues: readonly ProjectIssue[] };

const isNotFound = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "ENOENT";

const readError = (error: ReadError): InitShellError => {
  switch (error.tag) {
    case "Read":
      return { tag: "Read", file: error.file, message: error.message };
    case "TooLarge":
      return {
        tag: "Read",
        file: error.file,
        message: `file is ${String(error.bytes)} bytes; limit is ${String(error.limit)}`,
      };
    default:
      return assertNever(error);
  }
};

const hasTraversal = (target: string): boolean =>
  target.split(/[\\/]+/).some((segment) => segment === "..");

const targetPath = (root: string, target: string): string =>
  isAbsolute(target) ? resolve(target) : resolve(root, target);

const ensureTargetAvailable = async (
  target: string,
): Promise<Result<void, InitShellError>> => {
  try {
    const stats = await lstat(target);

    if (!stats.isDirectory()) {
      return err({
        tag: "InvalidTarget",
        target,
        message: "target exists and is not a directory",
      });
    }

    const entries = await readdir(target);

    if (entries.length > 0) {
      return err({ tag: "TargetNotEmpty", target });
    }

    return ok(undefined);
  } catch (error) {
    if (isNotFound(error)) return ok(undefined);

    return err({
      tag: "InvalidTarget",
      target,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const readTemplateFiles = async (
  root: string,
): Promise<Result<readonly SourceFile[], InitShellError>> => {
  const result = await readSourceFiles(join(root, "templates", "project"), [
    ...TEMPLATE_FILES,
  ]);

  return result.ok ? ok(result.value) : err(readError(result.error));
};

export const readStandardInputs = async (
  root: string,
  profile: ProfileId,
): Promise<Result<readonly SourceFile[], InitShellError>> => {
  let entries;

  try {
    entries = await readdir(join(root, "core", "domains"), {
      withFileTypes: true,
    });
  } catch (error) {
    return err({
      tag: "Read",
      file: join(root, "core", "domains"),
      message: error instanceof Error ? error.message : String(error),
    });
  }

  const domains = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".yaml"))
    .map((entry) => `core/domains/${entry.name}`)
    .sort();

  const result = await readSourceFiles(root, [
    "core/sras.yaml",
    `core/profiles/${profile}.yaml`,
    ...domains,
  ]);

  return result.ok ? ok(result.value) : err(readError(result.error));
};

const schemaIssues = (
  file: string,
  issues: readonly SchemaIssue[],
): readonly ProjectIssue[] =>
  issues.map((issue) => ({
    tag: "Parse",
    file,
    path: issue.path,
    message: `${issue.keyword}: ${issue.message}`,
  }));

const parseProjectFile = <T>(
  schemas: SchemaValidator,
  source: SourceFile,
  schema: SchemaName,
  parser: (value: unknown, file: string) => Result<T, readonly ProjectIssue[]>,
): Result<T, readonly ProjectIssue[]> => {
  const parsed = parseYaml(source);

  if (!parsed.ok) {
    return err([
      {
        tag: "Parse",
        file: source.path,
        path: "",
        message:
          parsed.error.tag === "Parse"
            ? parsed.error.message
            : `file is ${String(parsed.error.bytes)} bytes; limit is ${String(parsed.error.limit)}`,
      },
    ]);
  }

  const issues = schemas(schema, parsed.value);

  if (issues !== null) return err(schemaIssues(source.path, issues));

  return parser(parsed.value, source.path);
};

const validatePlannedProject = async (
  root: string,
  files: readonly PlannedFile[],
): Promise<Result<ProjectInstance, readonly ProjectIssue[]>> => {
  const schemas = await createSchemaValidator(join(root, "schemas"));

  if (!schemas.ok) {
    return err([
      {
        tag: "Parse",
        file: "schemas",
        path: "",
        message:
          schemas.error.tag === "Read"
            ? `${schemas.error.file}: ${schemas.error.message}`
            : schemas.error.message,
      },
    ]);
  }

  const byPath = new Map(files.map((file) => [file.path, file.text]));
  const source = (path: string): SourceFile | undefined => {
    const text = byPath.get(path);
    return text === undefined ? undefined : { path, text };
  };

  const manifestSource = source("assurance.yaml");
  const assessmentSource = source("assessment.yaml");
  const evidenceSource = source("evidence-index.yaml");
  const claimSource = source("claims.yaml");
  const riskSource = source("risk-register.yaml");
  const lockSource = source("assurance.lock.yaml");

  if (
    manifestSource === undefined ||
    assessmentSource === undefined ||
    evidenceSource === undefined ||
    claimSource === undefined ||
    riskSource === undefined ||
    lockSource === undefined
  ) {
    return err([
      {
        tag: "Parse",
        file: "<plan>",
        path: "",
        message: "planned project is missing a required file",
      },
    ]);
  }

  const manifest = parseProjectFile(
    schemas.value,
    manifestSource,
    "assurance",
    parseProjectManifestFile,
  );
  const assessment = parseProjectFile(
    schemas.value,
    assessmentSource,
    "assessment",
    parseAssessmentFile,
  );
  const evidence = parseProjectFile(
    schemas.value,
    evidenceSource,
    "evidence-index",
    parseEvidenceIndexFile,
  );
  const claims = parseProjectFile(
    schemas.value,
    claimSource,
    "claim",
    parseClaimRegisterFile,
  );
  const risks = parseProjectFile(
    schemas.value,
    riskSource,
    "risk-register",
    parseRiskRegisterFile,
  );
  const lock = parseProjectFile(
    schemas.value,
    lockSource,
    "project-lock",
    parseProjectLockFile,
  );

  const issues: ProjectIssue[] = [];

  if (!manifest.ok) issues.push(...manifest.error);
  if (!assessment.ok) issues.push(...assessment.error);
  if (!evidence.ok) issues.push(...evidence.error);
  if (!claims.ok) issues.push(...claims.error);
  if (!risks.ok) issues.push(...risks.error);
  if (!lock.ok) issues.push(...lock.error);

  if (issues.length > 0) return err(issues);

  if (
    !manifest.ok ||
    !assessment.ok ||
    !evidence.ok ||
    !claims.ok ||
    !risks.ok ||
    !lock.ok
  ) {
    return err(issues);
  }

  const instance: ProjectInstance = {
    manifest: manifest.value,
    assessment: assessment.value,
    evidence: evidence.value,
    claims: claims.value,
    risks: risks.value,
    lock: lock.value,
  };
  const validated = validateProject(instance);

  return validated.ok ? ok(validated.value) : err(validated.error);
};

const writeProjectFiles = async (
  target: string,
  files: readonly PlannedFile[],
): Promise<Result<void, InitShellError>> => {
  try {
    await mkdir(target, { recursive: true });
  } catch (error) {
    return err({
      tag: "Write",
      file: target,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  for (const file of files) {
    const path = join(target, file.path);

    try {
      await writeFile(path, file.text, { encoding: "utf8", flag: "wx" });
    } catch (error) {
      return err({
        tag: "Write",
        file: path,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return ok(undefined);
};

const currentDate = (): Result<IsoDate, InitShellError> => {
  const parsed = isoDate(new Date().toISOString().slice(0, 10));

  return parsed.ok
    ? ok(parsed.value)
    : err({ tag: "Clock", message: "could not determine the current date" });
};

export const initProject = async (
  input: InitProjectInput,
): Promise<Result<InitResult, InitShellError>> => {
  if (input.target.trim() === "") {
    return err({
      tag: "InvalidTarget",
      target: input.target,
      message: "target directory is required",
    });
  }

  if (input.target.includes("\0")) {
    return err({
      tag: "InvalidTarget",
      target: input.target,
      message: "target directory contains a NUL byte",
    });
  }

  if (hasTraversal(input.target)) {
    return err({ tag: "PathTraversal", target: input.target });
  }

  const target = targetPath(input.root, input.target);
  const name = basename(target);

  if (name === "" || name === "." || name === "/") {
    return err({
      tag: "InvalidTarget",
      target,
      message: "target directory has no project name",
    });
  }

  const available = await ensureTargetAvailable(target);

  if (!available.ok) return available;

  const templates = await readTemplateFiles(input.root);

  if (!templates.ok) return templates;

  const standardInputs = await readStandardInputs(input.root, input.profile);

  if (!standardInputs.ok) return standardInputs;

  const date: Result<IsoDate, InitShellError> =
    input.date === undefined ? currentDate() : ok(input.date);

  if (!date.ok) return date;

  const srasVersion = version(VERSION);

  if (!srasVersion.ok) return err({ tag: "Version", value: VERSION });

  const plan = planProjectInit({
    projectName: name,
    profile: input.profile,
    date: date.value,
    srasVersion: srasVersion.value,
    templateFiles: templates.value,
    standardInputs: standardInputs.value,
  });

  if (!plan.ok) return err({ tag: "Plan", issues: plan.error });

  const validated = await validatePlannedProject(input.root, plan.value.files);

  if (!validated.ok) return err({ tag: "Validation", issues: validated.error });

  const nextSteps = plan.value.nextSteps
    .map((step, index) => `${String(index + 1)}. ${step}`)
    .join("\n");
  const files: readonly PlannedFile[] = [
    {
      path: "README.md",
      text: `${renderProjectReadme(validated.value)}\n## Next steps\n\n${nextSteps}\n`,
    },
    ...plan.value.files,
  ];
  const written = await writeProjectFiles(target, files);

  if (!written.ok) return written;

  return ok({
    target,
    files: files.map((file) => file.path),
    nextSteps: plan.value.nextSteps,
  });
};
