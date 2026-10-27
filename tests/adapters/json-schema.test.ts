import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { afterEach, describe, expect, test } from "vitest";
import { createSchemaValidator } from "../../src/sras/adapters/json-schema.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

const fixture = (path: string): unknown =>
  parse(readFileSync(join(process.cwd(), "tests", "fixtures", path), "utf8"));

describe("createSchemaValidator", () => {
  test("validates a core requirement and a requirements file", async () => {
    const validator = await createSchemaValidator(
      join(process.cwd(), "schemas"),
    );
    expect(validator.ok).toBe(true);
    if (!validator.ok) return;

    expect(
      validator.value("standard", fixture("valid/standard.yaml")),
    ).toBeNull();
    expect(
      validator.value(
        "requirements-file",
        fixture("valid/requirements-file.yaml"),
      ),
    ).toBeNull();
    expect(
      validator.value("profile", fixture("valid/profile-lite.yaml")),
    ).toBeNull();
    expect(
      validator.value("module", fixture("valid/module-ai.yaml")),
    ).toBeNull();
    expect(
      validator.value("overlay", fixture("valid/overlay-finance.yaml")),
    ).toBeNull();

    const invalid = validator.value(
      "requirement",
      fixture("invalid/requirement-bad-id.yaml"),
    );
    expect(invalid).not.toBeNull();
    expect(invalid?.some((issue) => issue.path === "/id")).toBe(true);
  });

  test("reports a missing schema directory", async () => {
    const result = await createSchemaValidator(
      join(tmpdir(), "sras-schemas-that-do-not-exist"),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("Read");
  });

  test("reports malformed schema JSON", async () => {
    const directory = await mkdtemp(join(tmpdir(), "sras-schemas-"));
    temporaryDirectories.push(directory);
    await writeFile(
      join(directory, "requirement.schema.json"),
      "not json",
      "utf8",
    );

    const result = await createSchemaValidator(directory);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("Compile");
  });
});
