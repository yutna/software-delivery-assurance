import { lstat, mkdir, readdir, writeFile } from "node:fs/promises";
import { basename, isAbsolute, join, resolve } from "node:path";
import {
  createSchemaValidator,
  type SchemaIssue,
  type SchemaLoadError,
  type SchemaName,
  type SchemaValidator,
} from "../adapters/json-schema.js";
import { readSourceFiles, type ReadError } from "../adapters/fs.js";
import { parseYaml } from "../adapters/yaml.js";
import { assertNever } from "../foundation/assert-never.js";
import { err, ok, type Result } from "../foundation/result.js";
import type { SourceFile } from "../standard/dto.js";
import { isoDate, version, type IsoDate } from "../standard/primitives.js";
import type {
  ProfileId,
  ValidatedStandard,
  ValidationIssue,
} from "../standard/types.js";
import { loadStandardFromRoot } from "../standard/workflow.js";
import { renderProjectReadme } from "../render/markdown.js";
import { VERSION } from "../version.js";
import {
  planProjectInit,
  TEMPLATE_FILES,
  type InitIssue,
  type PlannedFile,
} from "./init.js";
import {
  createProjectLock,
  renderProjectLock,
  verifyProjectLock,
} from "./lockfile.js";
import type { Checksum } from "./ids.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "./parse.js";
import type {
  LockedModule,
  LockedOverlay,
  ProjectInstance,
  ProjectIssue,
  ProjectLock,
} from "./types.js";
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

export type ProjectDirectoryInput = {
  readonly root: string;
  readonly target: string;
};

export type ProjectDirectoryResult = {
  readonly target: string;
  readonly inputCount: number;
};

export type ProjectRefreshResult = ProjectDirectoryResult & {
  readonly checksum: Checksum;
};

type TargetError =
  | {
      readonly tag: "InvalidTarget";
      readonly target: string;
      readonly message: string;
    }
  | { readonly tag: "PathTraversal"; readonly target: string };

export type ProjectDirectoryError =
  | TargetError
  | { readonly tag: "Read"; readonly file: string; readonly message: string }
  | { readonly tag: "Schema"; readonly message: string }
  | { readonly tag: "StandardMissing" }
  | {
      readonly tag: "StandardInvalid";
      readonly issues: readonly ValidationIssue[];
    }
  | { readonly tag: "Issues"; readonly issues: readonly ProjectIssue[] }
  | {
      readonly tag: "Lockfile";
      readonly issues: readonly ProjectIssue[];
    }
  | { readonly tag: "Write"; readonly file: string; readonly message: string };

const isNotFound = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "ENOENT";

type ReadFailure = {
  readonly file: string;
  readonly message: string;
};

const readFailure = (error: ReadError): ReadFailure => {
  switch (error.tag) {
    case "Read":
      return { file: error.file, message: error.message };
    case "TooLarge":
      return {
        file: error.file,
        message: `file is ${String(error.bytes)} bytes; limit is ${String(error.limit)}`,
      };
    default:
      return assertNever(error);
  }
};

const readError = (error: ReadError): InitShellError => ({
  tag: "Read",
  ...readFailure(error),
});

const projectReadError = (error: ReadError): ProjectDirectoryError => ({
  tag: "Read",
  ...readFailure(error),
});

const schemaLoadMessage = (error: SchemaLoadError): string =>
  error.tag === "Read" ? `${error.file}: ${error.message}` : error.message;

const projectSchemaError = (error: SchemaLoadError): ProjectDirectoryError => ({
  tag: "Schema",
  message: schemaLoadMessage(error),
});

const hasTraversal = (target: string): boolean =>
  target.split(/[\\/]+/).some((segment) => segment === "..");

const targetPath = (root: string, target: string): string =>
  isAbsolute(target) ? resolve(target) : resolve(root, target);

const projectTarget = (
  root: string,
  target: string,
): Result<string, TargetError> => {
  if (target.trim() === "") {
    return err({
      tag: "InvalidTarget",
      target,
      message: "target directory is required",
    });
  }

  if (target.includes("\0")) {
    return err({
      tag: "InvalidTarget",
      target,
      message: "target directory contains a NUL byte",
    });
  }

  if (hasTraversal(target)) {
    return err({ tag: "PathTraversal", target });
  }

  return ok(targetPath(root, target));
};

const initTargetError = (error: TargetError): InitShellError => {
  switch (error.tag) {
    case "InvalidTarget":
      return {
        tag: "InvalidTarget",
        target: error.target,
        message: error.message,
      };
    case "PathTraversal":
      return { tag: "PathTraversal", target: error.target };
    default:
      return assertNever(error);
  }
};

const ensureProjectDirectory = async (
  target: string,
): Promise<Result<void, ProjectDirectoryError>> => {
  try {
    const stats = await lstat(target);

    if (!stats.isDirectory()) {
      return err({
        tag: "InvalidTarget",
        target,
        message: "target exists and is not a directory",
      });
    }

    return ok(undefined);
  } catch (error) {
    if (isNotFound(error)) {
      return err({
        tag: "InvalidTarget",
        target,
        message: "target directory does not exist",
      });
    }

    return err({
      tag: "InvalidTarget",
      target,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

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

const parseProjectInstance = (
  schemas: SchemaValidator,
  source: (path: string) => SourceFile | undefined,
  missingLabel: string,
): Result<ProjectInstance, readonly ProjectIssue[]> => {
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
        file: "<project>",
        path: "",
        message: `${missingLabel} is missing a required file`,
      },
    ]);
  }

  const manifest = parseProjectFile(
    schemas,
    manifestSource,
    "assurance",
    parseProjectManifestFile,
  );
  const assessment = parseProjectFile(
    schemas,
    assessmentSource,
    "assessment",
    parseAssessmentFile,
  );
  const evidence = parseProjectFile(
    schemas,
    evidenceSource,
    "evidence-index",
    parseEvidenceIndexFile,
  );
  const claims = parseProjectFile(
    schemas,
    claimSource,
    "claim",
    parseClaimRegisterFile,
  );
  const risks = parseProjectFile(
    schemas,
    riskSource,
    "risk-register",
    parseRiskRegisterFile,
  );
  const lock = parseProjectFile(
    schemas,
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

  return ok({
    manifest: manifest.value,
    assessment: assessment.value,
    evidence: evidence.value,
    claims: claims.value,
    risks: risks.value,
    lock: lock.value,
  });
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
        message: schemaLoadMessage(schemas.error),
      },
    ]);
  }

  const byPath = new Map(files.map((file) => [file.path, file.text]));
  const parsed = parseProjectInstance(
    schemas.value,
    (path) => {
      const text = byPath.get(path);
      return text === undefined ? undefined : { path, text };
    },
    "planned project",
  );

  if (!parsed.ok) return parsed;

  const validated = validateProject(parsed.value);

  return validated.ok ? ok(validated.value) : err(validated.error);
};

const readProjectInstance = async (
  root: string,
  target: string,
): Promise<Result<ProjectInstance, ProjectDirectoryError>> => {
  const sources = await readSourceFiles(target, [...TEMPLATE_FILES]);

  if (!sources.ok) return err(projectReadError(sources.error));

  const schemas = await createSchemaValidator(join(root, "schemas"));

  if (!schemas.ok) return err(projectSchemaError(schemas.error));

  const byPath = new Map(
    sources.value.map((source) => [source.path, source.text]),
  );
  const parsed = parseProjectInstance(
    schemas.value,
    (path) => {
      const text = byPath.get(path);
      return text === undefined ? undefined : { path, text };
    },
    "project instance",
  );

  return parsed.ok ? parsed : err({ tag: "Issues", issues: parsed.error });
};

const readStandard = async (
  root: string,
): Promise<Result<ValidatedStandard, ProjectDirectoryError>> => {
  const loaded = await loadStandardFromRoot(root);

  if (loaded.ok) return ok(loaded.value.standard);

  switch (loaded.error.tag) {
    case "Read":
      return err(projectReadError(loaded.error.error));
    case "Schema":
      return err(projectSchemaError(loaded.error.error));
    case "Invalid":
      return err({ tag: "StandardInvalid", issues: loaded.error.issues });
    case "NoContent":
      return err({ tag: "StandardMissing" });
    default:
      return assertNever(loaded.error);
  }
};

type ResolvedProjectInputs = {
  readonly inputs: readonly SourceFile[];
  readonly modules: readonly LockedModule[];
  readonly overlays: readonly LockedOverlay[];
};

const resolveProjectInputs = async (
  root: string,
  standard: ValidatedStandard,
  instance: ProjectInstance,
): Promise<Result<ResolvedProjectInputs, ProjectDirectoryError>> => {
  const manifest = instance.manifest;
  const profile = standard.profiles.find(
    (candidate) => candidate.id === manifest.profile,
  );

  if (profile === undefined) {
    return err({
      tag: "Issues",
      issues: [
        {
          tag: "UnknownSelection",
          file: manifest.sourceFile,
          kind: "profile",
          id: manifest.profile,
        },
      ],
    });
  }

  const issues: ProjectIssue[] = [];
  const modules: LockedModule[] = [];
  const overlays: LockedOverlay[] = [];
  const moduleFiles: string[] = [];
  const overlayFiles: string[] = [];

  for (const id of manifest.modules) {
    const module = standard.modules.find((candidate) => candidate.id === id);

    if (module === undefined) {
      issues.push({
        tag: "UnknownSelection",
        file: manifest.sourceFile,
        kind: "module",
        id,
      });
      continue;
    }

    modules.push({ id: module.id, version: module.version });
    moduleFiles.push(module.sourceFile);
  }

  for (const id of manifest.overlays) {
    const overlay = standard.overlays.find((candidate) => candidate.id === id);

    if (overlay === undefined) {
      issues.push({
        tag: "UnknownSelection",
        file: manifest.sourceFile,
        kind: "overlay",
        id,
      });
      continue;
    }

    overlays.push({ id: overlay.id, version: overlay.version });
    overlayFiles.push(overlay.sourceFile);
  }

  if (issues.length > 0) return err({ tag: "Issues", issues });

  const paths = [
    ...new Set([
      standard.manifest.sourceFile,
      profile.sourceFile,
      ...standard.requirements.map((requirement) => requirement.sourceFile),
      ...moduleFiles,
      ...overlayFiles,
    ]),
  ].sort();

  const inputs = await readSourceFiles(root, paths);

  if (!inputs.ok) return err(projectReadError(inputs.error));

  return ok({ inputs: inputs.value, modules, overlays });
};

const buildProjectLock = (
  instance: ProjectInstance,
  resolved: ResolvedProjectInputs,
): Result<ProjectLock, ProjectDirectoryError> => {
  const lock = createProjectLock({
    sourceFile: "assurance.lock.yaml",
    srasVersion: instance.manifest.srasVersion,
    modules: resolved.modules,
    overlays: resolved.overlays,
    inputs: resolved.inputs,
  });

  return lock.ok
    ? ok(lock.value)
    : err({ tag: "Lockfile", issues: lock.error });
};

export const validateProjectDirectory = async (
  input: ProjectDirectoryInput,
): Promise<Result<ProjectDirectoryResult, ProjectDirectoryError>> => {
  const target = projectTarget(input.root, input.target);

  if (!target.ok) return target;

  const directory = await ensureProjectDirectory(target.value);

  if (!directory.ok) return directory;

  const instance = await readProjectInstance(input.root, target.value);

  if (!instance.ok) return instance;

  const validated = validateProject(instance.value);

  if (!validated.ok) return err({ tag: "Issues", issues: validated.error });

  const standard = await readStandard(input.root);

  if (!standard.ok) return standard;

  const resolved = await resolveProjectInputs(
    input.root,
    standard.value,
    instance.value,
  );

  if (!resolved.ok) return resolved;

  const verified = verifyProjectLock(
    instance.value.lock,
    resolved.value.inputs,
  );

  if (!verified.ok) return err({ tag: "Issues", issues: verified.error });

  return ok({
    target: target.value,
    inputCount: resolved.value.inputs.length,
  });
};

export const refreshProjectLock = async (
  input: ProjectDirectoryInput,
): Promise<Result<ProjectRefreshResult, ProjectDirectoryError>> => {
  const target = projectTarget(input.root, input.target);

  if (!target.ok) return target;

  const directory = await ensureProjectDirectory(target.value);

  if (!directory.ok) return directory;

  const instance = await readProjectInstance(input.root, target.value);

  if (!instance.ok) return instance;

  const standard = await readStandard(input.root);

  if (!standard.ok) return standard;

  const resolved = await resolveProjectInputs(
    input.root,
    standard.value,
    instance.value,
  );

  if (!resolved.ok) return resolved;

  const lock = buildProjectLock(instance.value, resolved.value);

  if (!lock.ok) return lock;

  const candidate: ProjectInstance = { ...instance.value, lock: lock.value };
  const validated = validateProject(candidate);

  if (!validated.ok) return err({ tag: "Issues", issues: validated.error });

  const path = join(target.value, "assurance.lock.yaml");

  try {
    await writeFile(path, renderProjectLock(lock.value), "utf8");
  } catch (error) {
    return err({
      tag: "Write",
      file: path,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  return ok({
    target: target.value,
    inputCount: resolved.value.inputs.length,
    checksum: lock.value.sras.checksum,
  });
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
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const parsed = isoDate(`${String(now.getFullYear())}-${month}-${day}`);

  return parsed.ok
    ? ok(parsed.value)
    : err({ tag: "Clock", message: "could not determine the current date" });
};

export const initProject = async (
  input: InitProjectInput,
): Promise<Result<InitResult, InitShellError>> => {
  const resolved = projectTarget(input.root, input.target);

  if (!resolved.ok) return err(initTargetError(resolved.error));

  const target = resolved.value;
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
