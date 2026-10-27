import { basename, join } from "node:path";
import {
  discoverContentFiles,
  readSourceFiles,
  type ReadError,
} from "../adapters/fs.js";
import {
  createSchemaValidator,
  type SchemaIssue,
  type SchemaLoadError,
  type SchemaName,
  type SchemaValidator,
} from "../adapters/json-schema.js";
import { parseYaml, type YamlError } from "../adapters/yaml.js";
import { assertNever } from "../foundation/assert-never.js";
import { err, ok, type Result } from "../foundation/result.js";
import type { SourceFile } from "./dto.js";
import {
  parseCrosswalkFile,
  parseManifestFile,
  parseModuleFile,
  parseOverlayFile,
  parseProfileFile,
  parseRegisterFile,
  parseRequirementsFile,
} from "./parse.js";
import { validateStandard } from "./validate.js";
import type {
  CoreRequirement,
  Crosswalk,
  Module,
  Overlay,
  Profile,
  RegisterEntry,
  Standard,
  StandardManifest,
  ValidatedStandard,
  ValidationIssue,
} from "./types.js";

type FileKind =
  | "manifest"
  | "requirements"
  | "module"
  | "overlay"
  | "profile"
  | "register"
  | "mapping"
  | "unknown";

const classify = (path: string): FileKind => {
  if (path === "core/sras.yaml") return "manifest";
  if (path.startsWith("core/domains/") && path.endsWith(".yaml")) {
    return "requirements";
  }
  if (path.startsWith("core/profiles/") && path.endsWith(".yaml")) {
    return "profile";
  }
  if (path.startsWith("modules/") && basename(path) === "module.yaml") {
    return "module";
  }
  if (
    path.startsWith("overlays/industries/") &&
    basename(path) === "overlay.yaml"
  ) {
    return "overlay";
  }
  if (path.startsWith("registers/") && path.endsWith(".yaml")) {
    return "register";
  }
  if (path.startsWith("mappings/")) return "mapping";
  return "unknown";
};

const yamlIssue = (error: YamlError): ValidationIssue => {
  switch (error.tag) {
    case "TooLarge":
      return {
        tag: "Yaml",
        file: error.file,
        message: `file is ${String(error.bytes)} bytes; limit is ${String(error.limit)}`,
      };
    case "Parse":
      return { tag: "Yaml", file: error.file, message: error.message };
    default:
      return assertNever(error);
  }
};

const pushSchemaIssues = (
  issues: ValidationIssue[],
  file: string,
  schemaIssues: readonly SchemaIssue[],
): void => {
  for (const issue of schemaIssues) {
    issues.push({
      tag: "Schema",
      file,
      path: issue.path,
      message: `${issue.keyword}: ${issue.message}`,
    });
  }
};

const schemaNameFor = (kind: FileKind): SchemaName | undefined => {
  switch (kind) {
    case "manifest":
      return "standard";
    case "requirements":
      return "requirements-file";
    case "module":
      return "module";
    case "overlay":
      return "overlay";
    case "profile":
      return "profile";
    case "mapping":
      return "crosswalk";
    case "register":
      return "register-entry";
    case "unknown":
      return undefined;
    default:
      return assertNever(kind);
  }
};

export const validateStandardFiles = (
  files: readonly SourceFile[],
  schemas: SchemaValidator,
): Result<ValidatedStandard, readonly ValidationIssue[]> => {
  const issues: ValidationIssue[] = [];
  const requirements: CoreRequirement[] = [];
  const modules: Module[] = [];
  const overlays: Overlay[] = [];
  const registers: RegisterEntry[] = [];
  const crosswalks: Crosswalk[] = [];
  const profiles: Profile[] = [];
  let manifest: StandardManifest | undefined;

  for (const file of files) {
    const parsed = parseYaml(file);

    if (!parsed.ok) {
      issues.push(yamlIssue(parsed.error));
      continue;
    }

    const kind = classify(file.path);
    const schemaName = schemaNameFor(kind);

    if (schemaName === undefined) {
      issues.push({
        tag: "Schema",
        file: file.path,
        path: "",
        message: "unsupported content path",
      });
      continue;
    }

    const schemaIssues = schemas(schemaName, parsed.value);

    if (schemaIssues !== null) {
      pushSchemaIssues(issues, file.path, schemaIssues);
      continue;
    }

    switch (kind) {
      case "manifest": {
        const result = parseManifestFile(parsed.value, file.path);
        if (!result.ok) {
          issues.push(...result.error);
        } else {
          manifest = result.value;
        }
        break;
      }
      case "requirements": {
        const result = parseRequirementsFile(parsed.value, file.path);
        if (!result.ok) {
          issues.push(...result.error);
        } else {
          requirements.push(...result.value);
        }
        break;
      }
      case "module": {
        const result = parseModuleFile(parsed.value, file.path);
        if (!result.ok) {
          issues.push(...result.error);
        } else {
          modules.push(result.value);
        }
        break;
      }
      case "overlay": {
        const result = parseOverlayFile(parsed.value, file.path);
        if (!result.ok) {
          issues.push(...result.error);
        } else {
          overlays.push(result.value);
        }
        break;
      }
      case "profile": {
        const result = parseProfileFile(parsed.value, file.path);
        if (!result.ok) {
          issues.push(...result.error);
        } else {
          profiles.push(result.value);
        }
        break;
      }
      case "mapping": {
        const result = parseCrosswalkFile(parsed.value, file.path);
        if (!result.ok) {
          issues.push(...result.error);
        } else {
          crosswalks.push(result.value);
        }
        break;
      }
      case "register": {
        const result = parseRegisterFile(parsed.value, file.path);
        if (!result.ok) {
          issues.push(...result.error);
        } else {
          registers.push(result.value);
        }
        break;
      }
      case "unknown":
        break;
      default:
        return assertNever(kind);
    }
  }

  if (issues.length > 0) return err(issues);

  if (manifest === undefined) {
    return err([
      {
        tag: "Manifest",
        field: "manifest",
        message: "core/sras.yaml is required",
      },
    ]);
  }

  const standard: Standard = {
    manifest,
    requirements,
    modules,
    overlays,
    registers,
    crosswalks,
    profiles,
  };

  return validateStandard(standard);
};

export type StandardLoadError =
  | { readonly tag: "Read"; readonly error: ReadError }
  | { readonly tag: "Schema"; readonly error: SchemaLoadError }
  | { readonly tag: "Invalid"; readonly issues: readonly ValidationIssue[] }
  | { readonly tag: "NoContent" };

export type LoadedStandard = {
  readonly standard: ValidatedStandard;
  readonly fileCount: number;
};

export const loadStandardFromRoot = async (
  root: string,
): Promise<Result<LoadedStandard, StandardLoadError>> => {
  const discovered = await discoverContentFiles(root);

  if (!discovered.ok) return err({ tag: "Read", error: discovered.error });
  if (discovered.value.length === 0) return err({ tag: "NoContent" });

  const sources = await readSourceFiles(root, discovered.value);

  if (!sources.ok) return err({ tag: "Read", error: sources.error });

  const schemas = await createSchemaValidator(join(root, "schemas"));

  if (!schemas.ok) return err({ tag: "Schema", error: schemas.error });

  const validated = validateStandardFiles(sources.value, schemas.value);

  if (!validated.ok) return err({ tag: "Invalid", issues: validated.error });

  return ok({ standard: validated.value, fileCount: discovered.value.length });
};
