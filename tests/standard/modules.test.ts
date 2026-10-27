import { join } from "node:path";
import { describe, expect, test } from "vitest";
import {
  discoverContentFiles,
  readSourceFiles,
} from "../../src/sras/adapters/fs.js";
import { createSchemaValidator } from "../../src/sras/adapters/json-schema.js";
import type { Result } from "../../src/sras/foundation/result.js";
import type {
  Module,
  ValidatedStandard,
} from "../../src/sras/standard/types.js";
import { validateStandardFiles } from "../../src/sras/standard/workflow.js";

const root = process.cwd();

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const loadStandard = async (): Promise<ValidatedStandard> => {
  const discovered = must(await discoverContentFiles(root));
  const sources = must(await readSourceFiles(root, discovered));
  const schemas = must(await createSchemaValidator(join(root, "schemas")));

  return must(validateStandardFiles(sources, schemas));
};

type ModuleExpectation = {
  readonly path: string;
  readonly requirements: number;
};

const expectedModules = new Map<string, ModuleExpectation>([
  ["SRAS-AI", { path: "modules/ai/module.yaml", requirements: 12 }],
  ["SRAS-INT", { path: "modules/integration/module.yaml", requirements: 10 }],
  [
    "SRAS-RGD",
    { path: "modules/regulated-data/module.yaml", requirements: 10 },
  ],
  ["SRAS-CLD", { path: "modules/cloud-saas/module.yaml", requirements: 10 }],
  ["SRAS-ONP", { path: "modules/on-prem/module.yaml", requirements: 10 }],
]);

const moduleById = (standard: ValidatedStandard, id: string): Module => {
  const found = standard.modules.find((module) => module.id === id);

  if (found === undefined) throw new Error(`module not found: ${id}`);

  return found;
};

describe("technical modules", () => {
  test("the real content set validates through the schema and domain pipeline", async () => {
    const standard = await loadStandard();

    expect(standard.modules.length).toBeGreaterThan(0);
  });

  for (const [id, expectation] of expectedModules) {
    test(`${id} has the expected shape and references`, async () => {
      const standard = await loadStandard();
      const module = moduleById(standard, id);
      const ids = module.requirements.map((requirement) => requirement.id);
      const prefix = `${module.id}-`;

      expect(module.sourceFile).toBe(expectation.path);
      expect(module.requirements).toHaveLength(expectation.requirements);
      expect(new Set(ids).size).toBe(ids.length);
      expect(
        ids.every((requirementId) => requirementId.startsWith(prefix)),
      ).toBe(true);
      expect(module.appliesTo.length).toBeGreaterThan(0);

      for (const requirement of module.requirements) {
        expect(requirement.module).toBe(module.id);
        expect(requirement.applicability.modules).toContain(module.id);
        expect(requirement.title.en.trim()).not.toBe("");
        expect(requirement.title.th.trim()).not.toBe("");
        expect(requirement.description.th.trim()).not.toBe("");
      }
    });
  }

  test("module requirements do not duplicate Core statements", async () => {
    const standard = await loadStandard();
    const coreStatements = new Set(
      standard.requirements.map(
        (requirement) =>
          `${requirement.title.en}\u0000${requirement.description.en}`,
      ),
    );

    for (const module of standard.modules) {
      for (const requirement of module.requirements) {
        const statement = `${requirement.title.en}\u0000${requirement.description.en}`;

        expect(coreStatements.has(statement)).toBe(false);
      }
    }
  });
});
