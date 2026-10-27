import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import { createSchemaValidator } from "../../src/sras/adapters/json-schema.js";
import type { Result } from "../../src/sras/foundation/result.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "../../src/sras/project/parse.js";
import type { ProjectInstance } from "../../src/sras/project/types.js";
import { validateProject } from "../../src/sras/project/validate.js";

const templateDirectory = join(process.cwd(), "templates", "project");

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const readYaml = (file: string): unknown =>
  parse(readFileSync(join(templateDirectory, file), "utf8"));

const files = [
  "README.md",
  "assurance.yaml",
  "assessment.yaml",
  "evidence-index.yaml",
  "claims.yaml",
  "risk-register.yaml",
  "assurance.lock.yaml",
] as const;

const schemaFiles = [
  ["assurance", "assurance.yaml"],
  ["assessment", "assessment.yaml"],
  ["evidence-index", "evidence-index.yaml"],
  ["claim", "claims.yaml"],
  ["risk-register", "risk-register.yaml"],
  ["project-lock", "assurance.lock.yaml"],
] as const;

const loadTemplate = (): ProjectInstance => ({
  manifest: must(
    parseProjectManifestFile(readYaml("assurance.yaml"), "assurance.yaml"),
  ),
  assessment: must(
    parseAssessmentFile(readYaml("assessment.yaml"), "assessment.yaml"),
  ),
  evidence: must(
    parseEvidenceIndexFile(
      readYaml("evidence-index.yaml"),
      "evidence-index.yaml",
    ),
  ),
  claims: must(parseClaimRegisterFile(readYaml("claims.yaml"), "claims.yaml")),
  risks: must(
    parseRiskRegisterFile(readYaml("risk-register.yaml"), "risk-register.yaml"),
  ),
  lock: must(
    parseProjectLockFile(
      readYaml("assurance.lock.yaml"),
      "assurance.lock.yaml",
    ),
  ),
});

describe("project instance template", () => {
  test("contains exactly the documented files", () => {
    expect(readdirSync(templateDirectory).sort()).toEqual([...files].sort());
    expect(
      readFileSync(join(templateDirectory, "README.md"), "utf8"),
    ).toContain("Project instance template");
  });

  test("every structured file is schema-valid", async () => {
    const validator = await createSchemaValidator(
      join(process.cwd(), "schemas"),
    );

    expect(validator.ok).toBe(true);

    if (!validator.ok) throw new Error(JSON.stringify(validator.error));

    for (const [schema, file] of schemaFiles) {
      const issues = validator.value(schema, readYaml(file));

      expect(issues, `${schema} <- ${file}`).toBeNull();
    }
  });

  test("the template parses into a coherent project instance", () => {
    const instance = loadTemplate();
    const validated = validateProject(instance);

    expect(validated.ok).toBe(true);
  });

  test("the template documents every placeholder", () => {
    const readme = readFileSync(join(templateDirectory, "README.md"), "utf8");

    for (const placeholder of [
      "__PROJECT_NAME__",
      "__PROJECT_DESCRIPTION__",
      "__PROJECT_OWNER__",
      "__ASSESSOR__",
      "__SIGNOFF_NAME__",
      "__SIGNOFF_ROLE__",
      "1970-01-01",
      "0.0.0",
      "sha256:000",
    ]) {
      expect(readme, placeholder).toContain(placeholder);
    }
  });

  test("the template contains no URL, email address, or private address", () => {
    for (const file of schemaFiles.map(([, name]) => name)) {
      const text = readFileSync(join(templateDirectory, file), "utf8");

      expect(text, file).not.toMatch(/https?:\/\//);
      expect(text, file).not.toMatch(
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      );
      expect(text, file).not.toMatch(
        /\b(?:10|192\.168|172\.(?:1[6-9]|2\d|3[01]))\./,
      );
    }
  });

  test("the template lockfile is sorted and uses placeholder digests", () => {
    const instance = loadTemplate();
    const paths = instance.lock.inputs.map((input) => input.path);

    expect(paths).toEqual([...paths].sort());
    expect(instance.lock.sras.checksum).toMatch(/^sha256:0{64}$/);
    expect(
      instance.lock.inputs.every((input) => /^0{64}$/.test(input.sha256)),
    ).toBe(true);
  });

  test("the template uses the full-profile rules", () => {
    const instance = loadTemplate();

    expect(instance.manifest.profile).toBe("full");
    expect(instance.assessment.profile).toBe("full");
    expect(instance.assessment.requirements).toEqual([]);
    expect(instance.assessment.summary.index).toBe(0);
    expect(instance.manifest.modules).toEqual([]);
    expect(instance.manifest.overlays).toEqual([]);
  });
});
