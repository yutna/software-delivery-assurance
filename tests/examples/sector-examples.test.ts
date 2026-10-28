import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { describe, expect, test } from "vitest";
import { readSourceFiles } from "../../src/sras/adapters/fs.js";
import type { Result } from "../../src/sras/foundation/result.js";
import { verifyProjectLock } from "../../src/sras/project/lockfile.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "../../src/sras/project/parse.js";
import { validateProject } from "../../src/sras/project/validate.js";
import { resolveStandard } from "../../src/sras/standard/resolve.js";
import { loadStandardFromRoot } from "../../src/sras/standard/workflow.js";
import { VERSION } from "../../src/sras/version.js";

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const directories = [
  "examples/e2e-project",
  "examples/finance-synthetic",
  "examples/ecommerce-synthetic",
  "examples/logistics-synthetic",
  "examples/public-sector-synthetic",
] as const;

const coverageDirectories = [
  "examples/finance-synthetic",
  "examples/ecommerce-synthetic",
  "examples/logistics-synthetic",
  "examples/public-sector-synthetic",
] as const;

const corePaths = [
  "core/sras.yaml",
  "core/profiles/full.yaml",
  "core/domains/change-release.yaml",
  "core/domains/governance.yaml",
  "core/domains/incident-continuity.yaml",
  "core/domains/operations.yaml",
  "core/domains/privacy.yaml",
  "core/domains/security.yaml",
  "core/domains/supply-chain.yaml",
] as const;

const moduleFiles: Readonly<Record<string, string>> = {
  "SRAS-AI": "modules/ai/module.yaml",
  "SRAS-CLD": "modules/cloud-saas/module.yaml",
  "SRAS-INT": "modules/integration/module.yaml",
  "SRAS-ONP": "modules/on-prem/module.yaml",
  "SRAS-RGD": "modules/regulated-data/module.yaml",
};

const overlayFiles: Readonly<Record<string, string>> = {
  "TH-FIN": "overlays/industries/finance/overlay.yaml",
  "TH-ECM": "overlays/industries/ecommerce/overlay.yaml",
  "TH-LOG": "overlays/industries/logistics/overlay.yaml",
  "TH-PUB": "overlays/industries/public-sector/overlay.yaml",
};

const fileFor = (
  mapping: Readonly<Record<string, string>>,
  id: string,
): string => {
  const path = mapping[id];
  if (path === undefined) throw new Error(`no input file mapped for ${id}`);
  return path;
};

const readYaml = (directory: string, file: string): unknown =>
  parse(readFileSync(join(process.cwd(), directory, file), "utf8"));

describe("sector examples", () => {
  for (const directory of directories) {
    test(`${directory} is a valid project instance`, async () => {
      const instance = {
        manifest: must(
          parseProjectManifestFile(
            readYaml(directory, "assurance.yaml"),
            "assurance.yaml",
          ),
        ),
        assessment: must(
          parseAssessmentFile(
            readYaml(directory, "assessment.yaml"),
            "assessment.yaml",
          ),
        ),
        evidence: must(
          parseEvidenceIndexFile(
            readYaml(directory, "evidence-index.yaml"),
            "evidence-index.yaml",
          ),
        ),
        claims: must(
          parseClaimRegisterFile(
            readYaml(directory, "claims.yaml"),
            "claims.yaml",
          ),
        ),
        risks: must(
          parseRiskRegisterFile(
            readYaml(directory, "risk-register.yaml"),
            "risk-register.yaml",
          ),
        ),
        lock: must(
          parseProjectLockFile(
            readYaml(directory, "assurance.lock.yaml"),
            "assurance.lock.yaml",
          ),
        ),
      };

      expect(validateProject(instance).ok).toBe(true);
      expect(instance.manifest.srasVersion).toBe(VERSION);

      const expectedPaths = [
        ...corePaths,
        ...instance.manifest.modules.map((id) => fileFor(moduleFiles, id)),
        ...instance.manifest.overlays.map((id) => fileFor(overlayFiles, id)),
      ].sort();

      expect(instance.lock.inputs.map((input) => input.path)).toEqual(
        expectedPaths,
      );

      const sources = must(await readSourceFiles(process.cwd(), expectedPaths));

      expect(verifyProjectLock(instance.lock, sources).ok).toBe(true);
    });
  }

  for (const directory of coverageDirectories) {
    test(`${directory} README states the resolved coverage`, async () => {
      const loaded = must(await loadStandardFromRoot(process.cwd()));
      const assessment = must(
        parseAssessmentFile(
          readYaml(directory, "assessment.yaml"),
          "assessment.yaml",
        ),
      );
      const resolved = must(
        resolveStandard(loaded.standard, {
          profile: assessment.profile,
          tier: assessment.tier,
          modules: assessment.modules,
          overlays: assessment.overlays,
          project: { adds: [], waives: [] },
        }),
      );
      const gates = resolved.requirements.filter(
        (requirement) => requirement.criticality === "gate",
      );
      const assessed = new Set<string>(
        assessment.requirements.map((requirement) => requirement.id),
      );
      const assessedGates = gates.filter((gate) => assessed.has(gate.id));
      const unassessed = gates.length - assessedGates.length;
      const readme = readFileSync(
        join(process.cwd(), directory, "README.md"),
        "utf8",
      );

      expect(readme).toContain(
        `resolves to ${String(resolved.requirements.length)} requirements at tier 2`,
      );
      expect(readme).toContain(`including ${String(gates.length)} gates`);
      expect(readme).toContain(
        `so ${String(unassessed)} gates are not assessed`,
      );
    });
  }
});
