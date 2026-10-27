import { join } from "node:path";
import { describe, expect, test } from "vitest";
import type { SchemaValidator } from "../../src/sras/adapters/json-schema.js";
import { createSchemaValidator } from "../../src/sras/adapters/json-schema.js";
import { validateStandardFiles } from "../../src/sras/standard/workflow.js";
import type { Result } from "../../src/sras/foundation/result.js";
import { fixture, validFiles } from "../helpers/content.js";

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

describe("validateStandardFiles", () => {
  test("validates a complete standard content set", async () => {
    const schemas = must(
      await createSchemaValidator(join(process.cwd(), "schemas")),
    );

    expect(validateStandardFiles(validFiles, schemas).ok).toBe(true);
  });

  test("reports a YAML parse error", async () => {
    const schemas = must(
      await createSchemaValidator(join(process.cwd(), "schemas")),
    );
    const result = validateStandardFiles(
      [{ path: "core/sras.yaml", text: "a: [\n" }],
      schemas,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error[0]?.tag).toBe("Yaml");
  });

  test("reports a file over the size limit", async () => {
    const schemas = must(
      await createSchemaValidator(join(process.cwd(), "schemas")),
    );
    const result = validateStandardFiles(
      [{ path: "core/sras.yaml", text: "a".repeat(1024 * 1024 + 1) }],
      schemas,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error[0]?.tag).toBe("Yaml");
  });

  test("reports a schema error", async () => {
    const schemas = must(
      await createSchemaValidator(join(process.cwd(), "schemas")),
    );
    const result = validateStandardFiles(
      [{ path: "core/domains/security.yaml", text: "- id: SRAS-SEC-1\n" }],
      schemas,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error[0]?.tag).toBe("Schema");
  });

  test("requires the manifest", async () => {
    const schemas = must(
      await createSchemaValidator(join(process.cwd(), "schemas")),
    );
    const result = validateStandardFiles(
      [
        {
          path: "core/domains/security.yaml",
          text: fixture("valid/requirements-file.yaml"),
        },
      ],
      schemas,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error[0]?.tag).toBe("Manifest");
  });

  test("reports an unsupported register and an unknown path", async () => {
    const schemas = must(
      await createSchemaValidator(join(process.cwd(), "schemas")),
    );
    const result = validateStandardFiles(
      [
        { path: "registers/th/pdpa.yaml", text: "{}" },
        { path: "misc/foo.yaml", text: "{}" },
      ],
      schemas,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.every((issue) => issue.tag === "Schema")).toBe(true);
    }
  });

  test("reports parse errors when the schema layer is bypassed", () => {
    const permissive: SchemaValidator = () => null;
    const result = validateStandardFiles(
      [{ path: "core/sras.yaml", text: "{}" }],
      permissive,
    );

    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(result.error.some((issue) => issue.tag === "Parse")).toBe(true);
  });
});
