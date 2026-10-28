import { stringify } from "yaml";
import { err, ok, type Result } from "../foundation/result.js";
import type { SourceFile } from "../standard/dto.js";
import type { IsoDate, Version } from "../standard/primitives.js";
import type { ProfileId } from "../standard/types.js";
import { createProjectLock } from "./lockfile.js";
import type { ProjectIssue, ProjectLock } from "./types.js";

export const TEMPLATE_FILES = [
  "assurance.yaml",
  "assessment.yaml",
  "evidence-index.yaml",
  "claims.yaml",
  "risk-register.yaml",
  "assurance.lock.yaml",
] as const;

export type PlannedFile = {
  readonly path: string;
  readonly text: string;
};

export type InitPlan = {
  readonly files: readonly PlannedFile[];
  readonly lock: ProjectLock;
  readonly nextSteps: readonly string[];
};

export type InitIssue =
  | { readonly tag: "InvalidProjectName"; readonly value: string }
  | { readonly tag: "MissingTemplateFile"; readonly path: string }
  | { readonly tag: "UnexpectedTemplateFile"; readonly path: string }
  | {
      readonly tag: "TemplateMarker";
      readonly file: string;
      readonly marker: string;
    }
  | { readonly tag: "Lockfile"; readonly issues: readonly ProjectIssue[] };

export type InitPlanInput = {
  readonly projectName: string;
  readonly profile: ProfileId;
  readonly date: IsoDate;
  readonly srasVersion: Version;
  readonly templateFiles: readonly SourceFile[];
  readonly standardInputs: readonly SourceFile[];
};

const PROJECT_NAME = /^[\p{L}\p{N}][\p{L}\p{N} ._-]{0,119}$/u;
const TEMPLATE_MARKER = /__[A-Z][A-Z0-9_]*__/;

const NEXT_STEPS = [
  "Edit assurance.yaml and assessment.yaml to set the project scope, assessor, and sign-off.",
  "Select the modules and overlays that match the product. This version does not refresh an existing lockfile; create a new instance when the selection or the SRAS version changes.",
  "Assess the resolved requirements and record evidence in the private evidence store.",
  "Run npm run sras -- validate --all, render --check, and guard from the library repository.",
] as const;

const replaceAll = (text: string, from: string, to: string): string =>
  text.split(from).join(to);

const projectNameError = (name: string): string | null => {
  if (name.trim() !== name) return "must not have leading or trailing spaces";
  if (!PROJECT_NAME.test(name)) {
    return "must start with a letter or digit and contain only letters, digits, spaces, dots, hyphens, and underscores";
  }
  return null;
};

const lockDocument = (
  lock: ProjectLock,
): Readonly<Record<string, unknown>> => ({
  lockfile_version: 1,
  sras: {
    version: lock.sras.version,
    checksum: lock.sras.checksum,
  },
  modules: lock.modules.map((module) => ({
    id: module.id,
    version: module.version,
  })),
  overlays: lock.overlays.map((overlay) => ({
    id: overlay.id,
    version: overlay.version,
  })),
  inputs: lock.inputs.map((input) => ({
    path: input.path,
    sha256: input.sha256,
  })),
});

const templateText = (
  file: SourceFile,
  input: InitPlanInput,
  description: string,
): string => {
  const replacements = [
    ["__PROJECT_NAME__", input.projectName],
    ["__PROJECT_DESCRIPTION__", description],
    ["__PROJECT_OWNER__", "Project owner"],
    ["__ASSESSOR__", "Project team"],
    ["__SIGNOFF_NAME__", "Project owner"],
    ["__SIGNOFF_ROLE__", "Project owner"],
    ["0.0.0", input.srasVersion],
    ["1970-01-01", input.date],
    ["profile: full", `profile: ${input.profile}`],
    [
      "Template placeholder; replace with the project's limitations.",
      "Initial assessment; no requirements have been assessed yet.",
    ],
  ] as const;

  let text = file.text;

  for (const [from, to] of replacements) {
    text = replaceAll(text, from, to);
  }

  if (input.profile === "lite") {
    text = replaceAll(text, "index: 0.0", "index: null");
  }

  return text;
};

const markerIssues = (file: PlannedFile, issues: InitIssue[]): void => {
  const marker = TEMPLATE_MARKER.exec(file.text)?.[0];

  if (marker !== undefined) {
    issues.push({ tag: "TemplateMarker", file: file.path, marker });
    return;
  }

  for (const sentinel of ["1970-01-01", "0.0.0"]) {
    if (file.text.includes(sentinel)) {
      issues.push({ tag: "TemplateMarker", file: file.path, marker: sentinel });
      return;
    }
  }
};

export const planProjectInit = (
  input: InitPlanInput,
): Result<InitPlan, readonly InitIssue[]> => {
  const issues: InitIssue[] = [];
  const nameError = projectNameError(input.projectName);

  if (nameError !== null) {
    issues.push({ tag: "InvalidProjectName", value: input.projectName });
  }

  const templateByPath = new Map(
    input.templateFiles.map((file) => [file.path, file]),
  );

  for (const path of TEMPLATE_FILES) {
    if (!templateByPath.has(path)) {
      issues.push({ tag: "MissingTemplateFile", path });
    }
  }

  for (const file of input.templateFiles) {
    if (!TEMPLATE_FILES.some((required) => required === file.path)) {
      issues.push({ tag: "UnexpectedTemplateFile", path: file.path });
    }
  }

  if (issues.length > 0) return err(issues);

  const description = `SRAS project instance for ${input.projectName}.`;

  const lock = createProjectLock({
    sourceFile: "assurance.lock.yaml",
    srasVersion: input.srasVersion,
    modules: [],
    overlays: [],
    inputs: input.standardInputs,
  });

  if (!lock.ok) {
    return err([{ tag: "Lockfile", issues: lock.error }]);
  }

  const textFiles: PlannedFile[] = [];

  for (const path of TEMPLATE_FILES) {
    const file = templateByPath.get(path);

    if (file === undefined) {
      issues.push({ tag: "MissingTemplateFile", path });
      continue;
    }

    textFiles.push({
      path,
      text:
        path === "assurance.lock.yaml"
          ? stringify(lockDocument(lock.value), { lineWidth: 0 })
          : templateText(file, input, description),
    });
  }

  const files: PlannedFile[] = [...textFiles];

  for (const file of files) {
    markerIssues(file, issues);
  }

  if (issues.length > 0) return err(issues);

  return ok({ files, lock: lock.value, nextSteps: NEXT_STEPS });
};
