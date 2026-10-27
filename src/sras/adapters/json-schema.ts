import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { err, ok, type Result } from "../foundation/result.js";

const require = createRequire(import.meta.url);

export type SchemaName =
  | "requirement"
  | "requirements-file"
  | "module"
  | "overlay"
  | "profile"
  | "standard"
  | "crosswalk"
  | "register-entry"
  | "assurance"
  | "assessment"
  | "evidence-index"
  | "claim"
  | "risk-register"
  | "project-lock";

export type SchemaIssue = {
  readonly path: string;
  readonly keyword: string;
  readonly message: string;
};

export type SchemaValidator = (
  name: SchemaName,
  value: unknown,
) => readonly SchemaIssue[] | null;

export type SchemaLoadError =
  | { readonly tag: "Read"; readonly file: string; readonly message: string }
  | { readonly tag: "Compile"; readonly message: string };

const SCHEMA_NAMES = [
  "requirement",
  "requirements-file",
  "module",
  "overlay",
  "profile",
  "standard",
  "crosswalk",
  "register-entry",
  "assurance",
  "assessment",
  "evidence-index",
  "claim",
  "risk-register",
  "project-lock",
] as const satisfies readonly SchemaName[];

const isAddFormats = (value: unknown): value is (ajv: Ajv2020) => Ajv2020 =>
  typeof value === "function";

export const createSchemaValidator = async (
  schemaDirectory: string,
): Promise<Result<SchemaValidator, SchemaLoadError>> => {
  const ajv = new Ajv2020({ strict: true, allErrors: true });
  const addFormatsModule: unknown = require("ajv-formats");

  if (!isAddFormats(addFormatsModule)) {
    return err({
      tag: "Compile",
      message: "ajv-formats does not export a callable function",
    });
  }

  addFormatsModule(ajv);

  const ids = new Map<SchemaName, string>();

  for (const name of SCHEMA_NAMES) {
    const file = join(schemaDirectory, `${name}.schema.json`);
    let text: string;

    try {
      text = await readFile(file, "utf8");
    } catch (error) {
      return err({
        tag: "Read",
        file,
        message: error instanceof Error ? error.message : String(error),
      });
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch (error) {
      return err({
        tag: "Compile",
        message: `${file}: ${error instanceof Error ? error.message : String(error)}`,
      });
    }

    if (typeof parsed !== "object" || parsed === null) {
      return err({
        tag: "Compile",
        message: `${file}: expected a JSON object`,
      });
    }

    ajv.addSchema(parsed);

    const id = "$id" in parsed ? parsed.$id : undefined;

    if (typeof id !== "string") {
      return err({ tag: "Compile", message: `${file}: missing $id` });
    }

    ids.set(name, id);
  }

  const validator: SchemaValidator = (name, value) => {
    const id = ids.get(name);

    if (id === undefined) {
      return [
        {
          path: "",
          keyword: "schema",
          message: `schema not registered: ${name}`,
        },
      ];
    }

    const validate = ajv.getSchema(id);

    if (validate === undefined) {
      return [
        {
          path: "",
          keyword: "schema",
          message: `schema not compiled: ${name}`,
        },
      ];
    }

    if (validate(value)) return null;

    return (validate.errors ?? []).map((error) => ({
      path: error.instancePath,
      keyword: error.keyword,
      message: error.message ?? "",
    }));
  };

  return ok(validator);
};
