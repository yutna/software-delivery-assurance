import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import {
  discoverContentFiles,
  readSourceFiles,
} from "../../src/sras/adapters/fs.js";
import { createSchemaValidator } from "../../src/sras/adapters/json-schema.js";
import type { Result } from "../../src/sras/foundation/result.js";
import { isoDate } from "../../src/sras/standard/primitives.js";
import type {
  CoreRequirement,
  ModuleRequirement,
  OverlayRequirement,
  ValidatedStandard,
} from "../../src/sras/standard/types.js";
import { validateStandardFiles } from "../../src/sras/standard/workflow.js";
import { VERSION } from "../../src/sras/version.js";

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const record = (
  value: unknown,
  label: string,
): Readonly<Record<string, unknown>> => {
  if (!isRecord(value)) throw new Error(`${label}: expected an object`);
  return value;
};

const array = (value: unknown, label: string): readonly unknown[] => {
  if (!Array.isArray(value)) throw new Error(`${label}: expected an array`);
  return value;
};

const string = (value: unknown, label: string): string => {
  if (typeof value !== "string") throw new Error(`${label}: expected a string`);
  return value;
};

const stringArray = (value: unknown, label: string): readonly string[] =>
  array(value, label).map((item, index) =>
    string(item, `${label}/${String(index)}`),
  );

const nullableString = (value: unknown, label: string): string | null => {
  if (value === null) return null;
  return string(value, label);
};

const readYaml = (path: string): unknown =>
  parse(readFileSync(join(process.cwd(), path), "utf8"));

let standardPromise: Promise<ValidatedStandard> | undefined;

const loadStandard = (): Promise<ValidatedStandard> => {
  standardPromise ??= (async () => {
    const root = process.cwd();
    const discovered = must(await discoverContentFiles(root));
    const sources = must(await readSourceFiles(root, discovered));
    const schemas = must(await createSchemaValidator(join(root, "schemas")));

    return must(validateStandardFiles(sources, schemas));
  })();

  return standardPromise;
};

type ExampleSpec = {
  readonly directory: string;
  readonly overlay: string;
  readonly modules: readonly string[];
};

const examples: readonly ExampleSpec[] = [
  {
    directory: "examples/finance-synthetic",
    overlay: "TH-FIN",
    modules: ["SRAS-AI", "SRAS-INT", "SRAS-RGD", "SRAS-CLD"],
  },
  {
    directory: "examples/ecommerce-synthetic",
    overlay: "TH-ECM",
    modules: ["SRAS-INT", "SRAS-RGD", "SRAS-CLD"],
  },
  {
    directory: "examples/logistics-synthetic",
    overlay: "TH-LOG",
    modules: ["SRAS-INT", "SRAS-RGD", "SRAS-CLD"],
  },
  {
    directory: "examples/public-sector-synthetic",
    overlay: "TH-PUB",
    modules: ["SRAS-INT", "SRAS-RGD", "SRAS-CLD"],
  },
];

const assessmentStatuses = new Set([
  "not_assessed",
  "gap",
  "partial",
  "implemented",
  "verified",
  "not_applicable",
]);

const maturityLevels = new Set(["L0", "L1", "L2", "L3", "L4"]);

const evidenceTypes = new Set([
  "document",
  "diagram",
  "configuration",
  "screenshot",
  "test_result",
  "metric",
  "ticket",
  "log",
  "contract",
  "attestation",
  "benchmark",
  "interview",
  "report",
]);

const freshnessStatuses = new Set(["current", "expired", "unknown"]);
const redactions = new Set(["none", "partial", "full"]);
const claimStatuses = new Set([
  "verified",
  "partial",
  "not_claimed",
  "prohibited",
]);

type ResolvableRequirement =
  CoreRequirement | ModuleRequirement | OverlayRequirement;

const requirementMap = (
  standard: ValidatedStandard,
): ReadonlyMap<string, ResolvableRequirement> => {
  const byId = new Map<string, ResolvableRequirement>();

  for (const requirement of standard.requirements) {
    byId.set(requirement.id, requirement);
  }

  for (const module of standard.modules) {
    for (const requirement of module.requirements) {
      byId.set(requirement.id, requirement);
    }
  }

  for (const overlay of standard.overlays) {
    for (const requirement of overlay.adds) {
      byId.set(requirement.id, requirement);
    }
  }

  return byId;
};

const expectIsoDate = (value: unknown, label: string): void => {
  expect(isoDate(string(value, label)).ok, label).toBe(true);
};

const exampleTest = (spec: ExampleSpec): void => {
  test(`${spec.directory} is a coherent synthetic example`, async () => {
    const standard = await loadStandard();
    const requirements = requirementMap(standard);
    const moduleIds = new Set<string>(
      standard.modules.map((module) => module.id),
    );
    const overlayIds = new Set<string>(
      standard.overlays.map((overlay) => overlay.id),
    );

    const assessment = record(
      readYaml(join(spec.directory, "assessment.yaml")),
      "assessment",
    );
    const project = record(assessment["project"], "assessment.project");

    expect(project["confidentiality"]).toBe("synthetic");
    expect(assessment["sras_version"]).toBe(VERSION);
    expect(assessment["profile"]).toBe("full");

    const selectedModules = [
      ...stringArray(assessment["modules"], "assessment.modules"),
    ].sort();
    const selectedOverlays = stringArray(
      assessment["overlays"],
      "assessment.overlays",
    );

    expect(selectedModules).toEqual([...spec.modules].sort());
    expect(selectedOverlays).toEqual([spec.overlay]);

    for (const module of selectedModules) {
      expect(moduleIds.has(module), module).toBe(true);
    }

    for (const overlay of selectedOverlays) {
      expect(overlayIds.has(overlay), overlay).toBe(true);
    }

    const assessed = array(
      assessment["requirements"],
      "assessment.requirements",
    ).map((item, index) => {
      const requirement = record(item, `requirements/${String(index)}`);
      const id = string(requirement["id"], `requirements/${String(index)}/id`);

      expect(
        assessmentStatuses.has(string(requirement["status"], `status/${id}`)),
      ).toBe(true);
      expect(
        maturityLevels.has(string(requirement["maturity"], `maturity/${id}`)),
      ).toBe(true);

      const evidenceRefs = stringArray(
        requirement["evidence_refs"],
        `evidence_refs/${id}`,
      );

      expect(evidenceRefs.length, id).toBeGreaterThan(0);
      nullableString(requirement["gap_owner"], `gap_owner/${id}`);
      if (requirement["due_date"] !== null) {
        expectIsoDate(requirement["due_date"], `due_date/${id}`);
      }

      return { id, evidenceRefs };
    });

    expect(assessed.length).toBeGreaterThanOrEqual(5);
    expect(assessed.length).toBeLessThanOrEqual(10);
    expect(new Set(assessed.map((item) => item.id)).size).toBe(assessed.length);

    for (const item of assessed) {
      const requirement = requirements.get(item.id);

      expect(requirement, item.id).toBeDefined();

      if (requirement === undefined) continue;

      for (const module of requirement.applicability.modules) {
        expect(selectedModules, `${item.id} module ${module}`).toContain(
          module,
        );
      }

      for (const overlay of requirement.applicability.overlays) {
        expect(selectedOverlays, `${item.id} overlay ${overlay}`).toContain(
          overlay,
        );
      }
    }

    const evidenceDocument = record(
      readYaml(join(spec.directory, "evidence-index.yaml")),
      "evidence-index",
    );
    const evidenceEntries = array(
      evidenceDocument["entries"],
      "evidence-index.entries",
    ).map((item, index) => {
      const entry = record(item, `evidence/${String(index)}`);
      const id = string(entry["id"], `evidence/${String(index)}/id`);
      const location = string(entry["location"], `evidence/${id}/location`);
      const requirementIds = stringArray(
        entry["requirement_ids"],
        `evidence/${id}/requirement_ids`,
      );

      expect(
        evidenceTypes.has(string(entry["type"], `evidence/${id}/type`)),
      ).toBe(true);
      expect(
        freshnessStatuses.has(
          string(entry["freshness_status"], `evidence/${id}/freshness`),
        ),
      ).toBe(true);
      expect(
        redactions.has(string(entry["redaction"], `evidence/${id}/redaction`)),
      ).toBe(true);
      expectIsoDate(entry["collected_at"], `evidence/${id}/collected_at`);
      expectIsoDate(entry["expires_at"], `evidence/${id}/expires_at`);
      expect(
        existsSync(join(process.cwd(), spec.directory, location)),
        `${id} location ${location}`,
      ).toBe(true);

      for (const requirementId of requirementIds) {
        expect(
          assessed.some((assessedItem) => assessedItem.id === requirementId),
          `${id} -> ${requirementId}`,
        ).toBe(true);
      }

      return { id };
    });

    expect(new Set(evidenceEntries.map((entry) => entry.id)).size).toBe(
      evidenceEntries.length,
    );

    const evidenceIds = new Set(evidenceEntries.map((entry) => entry.id));

    for (const item of assessed) {
      for (const ref of item.evidenceRefs) {
        expect(evidenceIds.has(ref), `${item.id} -> ${ref}`).toBe(true);
      }
    }

    const claimsDocument = record(
      readYaml(join(spec.directory, "claims.yaml")),
      "claims",
    );
    const claims = array(claimsDocument["claims"], "claims.claims").map(
      (item, index) => {
        const claim = record(item, `claims/${String(index)}`);
        const id = string(claim["id"], `claims/${String(index)}/id`);
        const evidenceRefs = stringArray(
          claim["evidence_ids"],
          `claims/${id}/evidence_ids`,
        );

        expect(
          claimStatuses.has(string(claim["status"], `claims/${id}/status`)),
        ).toBe(true);
        expectIsoDate(claim["approved_at"], `claims/${id}/approved_at`);
        expectIsoDate(claim["expires_at"], `claims/${id}/expires_at`);
        string(claim["owner"], `claims/${id}/owner`);
        string(claim["approved_by"], `claims/${id}/approved_by`);
        string(claim["allowed_wording"], `claims/${id}/allowed_wording`);
        string(claim["prohibited_wording"], `claims/${id}/prohibited_wording`);

        for (const ref of evidenceRefs) {
          expect(evidenceIds.has(ref), `${id} -> ${ref}`).toBe(true);
        }

        return { id };
      },
    );

    expect(new Set(claims.map((claim) => claim.id)).size).toBe(claims.length);

    const lockfile = record(
      readYaml(join(spec.directory, "assurance.lock.yaml")),
      "assurance.lock",
    );
    const sras = record(lockfile["sras"], "assurance.lock.sras");
    const lockModules = array(lockfile["modules"], "assurance.lock.modules");
    const lockOverlays = array(lockfile["overlays"], "assurance.lock.overlays");

    expect(sras["version"]).toBe(VERSION);
    const moduleVersions = new Map<string, string>();
    for (const module of standard.modules) {
      moduleVersions.set(module.id, module.version);
    }
    const overlayVersions = new Map<string, string>();
    for (const overlay of standard.overlays) {
      overlayVersions.set(overlay.id, overlay.version);
    }
    expect(
      lockModules
        .map((item, index) => {
          const entry = record(item, `lock.modules/${String(index)}`);
          const id = string(entry["id"], `lock.modules/${String(index)}/id`);
          expect(entry["version"], `lock module version ${id}`).toBe(
            moduleVersions.get(id),
          );
          return id;
        })
        .sort(),
    ).toEqual(selectedModules);
    expect(
      lockOverlays.map((item, index) => {
        const entry = record(item, `lock.overlays/${String(index)}`);
        const id = string(entry["id"], `lock.overlays/${String(index)}/id`);
        expect(entry["version"], `lock overlay version ${id}`).toBe(
          overlayVersions.get(id),
        );
        return id;
      }),
    ).toEqual(selectedOverlays);

    expect(existsSync(join(process.cwd(), spec.directory, "README.md"))).toBe(
      true,
    );
  });
};

describe("synthetic sector examples", () => {
  for (const spec of examples) exampleTest(spec);
});
