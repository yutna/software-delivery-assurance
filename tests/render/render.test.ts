import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import type { Output } from "../../src/sras/adapters/output.js";
import { run } from "../../src/sras/cli/run.js";
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
import {
  renderCrosswalkPage,
  renderOverlayPage,
  renderProjectReadme,
  renderRegisterPage,
  renderRequirementPage,
  renderStandard,
} from "../../src/sras/render/markdown.js";
import {
  checkRendered,
  REFERENCE_DIRECTORY,
  renderToRoot,
} from "../../src/sras/render/workflow.js";
import {
  loadStandardFromRoot,
  type StandardLoadError,
} from "../../src/sras/standard/workflow.js";
import type {
  NonEmpty,
  RequirementReference,
} from "../../src/sras/standard/types.js";
import { parse } from "yaml";
import { readFileSync } from "node:fs";
import { isoDate } from "../../src/sras/standard/primitives.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const makeTemp = async (): Promise<string> => {
  const directory = await mkdtemp(join(tmpdir(), "sras-render-"));
  temporaryDirectories.push(directory);
  return directory;
};

const makeRoot = async (): Promise<string> => {
  const root = await makeTemp();

  for (const directory of [
    "core",
    "modules",
    "overlays",
    "registers",
    "mappings",
    "schemas",
  ]) {
    await cp(join(process.cwd(), directory), join(root, directory), {
      recursive: true,
    });
  }

  return root;
};

const makeIo = (): {
  readonly io: Output;
  readonly stdout: string[];
  readonly stderr: string[];
} => {
  const stdout: string[] = [];
  const stderr: string[] = [];

  return {
    io: {
      stdout: (text) => stdout.push(text),
      stderr: (text) => stderr.push(text),
    },
    stdout,
    stderr,
  };
};

const fixture = (path: string): string =>
  readFileSync(
    join(process.cwd(), "tests", "fixtures", "render", "expected", path),
    "utf8",
  );

const readProjectFixture = (file: string): unknown =>
  parse(
    readFileSync(
      join(process.cwd(), "tests", "fixtures", "project", "valid", file),
      "utf8",
    ),
  );

const loadProjectInstance = (): ProjectInstance => ({
  manifest: must(
    parseProjectManifestFile(
      readProjectFixture("project-manifest.yaml"),
      "assurance.yaml",
    ),
  ),
  assessment: must(
    parseAssessmentFile(
      readProjectFixture("assessment.yaml"),
      "assessment.yaml",
    ),
  ),
  evidence: must(
    parseEvidenceIndexFile(
      readProjectFixture("evidence-index.yaml"),
      "evidence-index.yaml",
    ),
  ),
  claims: must(
    parseClaimRegisterFile(readProjectFixture("claims.yaml"), "claims.yaml"),
  ),
  risks: must(
    parseRiskRegisterFile(
      readProjectFixture("risk-register.yaml"),
      "risk-register.yaml",
    ),
  ),
  lock: must(
    parseProjectLockFile(
      readProjectFixture("project-lock.yaml"),
      "assurance.lock.yaml",
    ),
  ),
});

describe("render golden pages", () => {
  test("a requirement page matches the golden output", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const requirement = loaded.standard.requirements.find(
      (candidate) => candidate.id === "SRAS-GOV-001",
    );

    expect(requirement).toBeDefined();
    if (requirement === undefined) return;

    const page = renderRequirementPage(requirement, loaded.standard.crosswalks);

    expect(page.path).toBe("requirements/SRAS-GOV-001.md");
    expect(page.text).toBe(fixture("requirement-SRAS-GOV-001.md"));
  });

  test("an overlay page matches the golden output", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const overlay = loaded.standard.overlays.find(
      (candidate) => candidate.id === "TH-FIN",
    );

    expect(overlay).toBeDefined();
    if (overlay === undefined) return;

    const page = renderOverlayPage(overlay, loaded.standard.crosswalks);

    expect(page.path).toBe("overlays/TH-FIN.md");
    expect(page.text).toBe(fixture("overlay-TH-FIN.md"));
  });

  test("a crosswalk page matches the golden output", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const crosswalk = loaded.standard.crosswalks.find(
      (candidate) => candidate.id === "MAP-NISTCSF",
    );

    expect(crosswalk).toBeDefined();
    if (crosswalk === undefined) return;

    const page = renderCrosswalkPage(crosswalk);

    expect(page.path).toBe("crosswalks/MAP-NISTCSF.md");
    expect(page.text).toBe(fixture("crosswalk-MAP-NISTCSF.md"));
  });

  test("a register page matches the golden output", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const entry = loaded.standard.registers.find(
      (candidate) => candidate.id === "TH-PDPA-001",
    );

    expect(entry).toBeDefined();
    if (entry === undefined) return;

    const page = renderRegisterPage(entry);

    expect(page.path).toBe("registers/TH-PDPA-001.md");
    expect(page.text).toBe(fixture("register-TH-PDPA-001.md"));
  });

  test("a project README matches the golden output", () => {
    expect(renderProjectReadme(loadProjectInstance())).toBe(
      fixture("project-README.md"),
    );
  });
});

describe("render bundle", () => {
  test("renders 161 unique pages in deterministic path order", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const pages = renderStandard(loaded.standard);
    const paths = pages.map((page) => page.path);

    expect(pages).toHaveLength(161);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual([...paths].sort());
    expect(paths).toContain("index.md");
    expect(paths).toContain("requirements/SRAS-GOV-001.md");
    expect(paths).toContain("overlays/TH-FIN.md");
    expect(paths).toContain("registers/TH-PDPA-001.md");
    expect(paths).toContain("crosswalks/MAP-NISTCSF.md");
    expect(renderStandard(loaded.standard)).toEqual(pages);
  });
});

describe("render check", () => {
  test("reports missing, changed, and extra pages without writing", async () => {
    const root = await makeTemp();
    const page = { path: "index.md", text: "# Index\n" };
    const missing = await checkRendered(root, [page]);

    expect(missing.ok).toBe(false);

    if (!missing.ok && missing.error.tag === "Drift") {
      expect(missing.error.issues).toContainEqual({
        tag: "Missing",
        path: "index.md",
      });
    }

    const reference = join(root, REFERENCE_DIRECTORY);

    await mkdir(reference, { recursive: true });
    await writeFile(join(reference, "index.md"), "# Index\n", "utf8");

    expect((await checkRendered(root, [page])).ok).toBe(true);

    await writeFile(join(reference, "index.md"), "# Changed\n", "utf8");
    const changed = await checkRendered(root, [page]);

    expect(changed.ok).toBe(false);

    if (!changed.ok && changed.error.tag === "Drift") {
      expect(changed.error.issues).toContainEqual({
        tag: "Changed",
        path: "index.md",
        line: 1,
        expected: "# Index",
        actual: "# Changed",
      });
    }

    expect(await readFile(join(reference, "index.md"), "utf8")).toBe(
      "# Changed\n",
    );

    await writeFile(join(reference, "extra.md"), "# Extra\n", "utf8");

    const extra = await checkRendered(root, [page]);

    expect(extra.ok).toBe(false);

    if (!extra.ok && extra.error.tag === "Drift") {
      expect(extra.error.issues).toContainEqual({
        tag: "Extra",
        path: "extra.md",
      });
    }
  });
});

describe("sras render", () => {
  test("renders, passes check, reports drift, and restores", async () => {
    const root = await makeRoot();
    const first = makeIo();

    expect(await run(["render"], first.io, root)).toBe(0);
    expect(first.stdout.join("")).toContain("rendered 161 pages");

    const check = makeIo();

    expect(await run(["render", "--check"], check.io, root)).toBe(0);
    expect(check.stdout.join("")).toContain("render check passed");

    const page = join(
      root,
      REFERENCE_DIRECTORY,
      "requirements",
      "SRAS-GOV-001.md",
    );
    const original = await readFile(page, "utf8");

    await writeFile(page, `${original}drift\n`, "utf8");

    const drift = makeIo();

    expect(await run(["render", "--check"], drift.io, root)).toBe(1);
    expect(drift.stderr.join("")).toContain("changed:");
    expect(await readFile(page, "utf8")).toContain("drift");

    const restore = makeIo();

    expect(await run(["render"], restore.io, root)).toBe(0);

    const final = makeIo();

    expect(await run(["render", "--check"], final.io, root)).toBe(0);
  });
});

describe("render edge branches", () => {
  test("a requirement with no crosswalk or references shows none", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const requirement = loaded.standard.modules
      .flatMap((module) => module.requirements)
      .find((candidate) => candidate.id === "SRAS-CLD-001");

    expect(requirement).toBeDefined();
    if (requirement === undefined) return;

    const page = renderRequirementPage(
      {
        ...requirement,
        references: [] as unknown as NonEmpty<RequirementReference>,
      },
      loaded.standard.crosswalks,
    );

    expect(page.text).toContain("## References\n\n- none");
    expect(page.text).toContain("## Crosswalks\n\n- none");
  });

  test("a module requirement page includes review and translation details", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const module = loaded.standard.modules[0];

    expect(module).toBeDefined();
    if (module === undefined) return;

    const requirement = module.requirements[0];

    const date = must(isoDate("2026-10-27"));
    const synthetic = {
      ...requirement,
      reviewedBy: "Example reviewer",
      reviewedAt: date,
      reviewScope: "Synthetic scope",
      translationReviewedBy: "Example translator",
      translationReviewedAt: date,
      deprecatedIn: requirement.introducedIn,
      replacedBy: requirement.id,
    };
    const page = renderRequirementPage(synthetic);

    expect(page.text).toContain(`- Module: \`${module.id}\``);
    expect(page.text).toContain("- Reviewed by: Example reviewer");
    expect(page.text).toContain("- Reviewed at: 2026-10-27");
    expect(page.text).toContain("- Review scope: Synthetic scope");
    expect(page.text).toContain(
      "- Translation reviewed by: Example translator",
    );
    expect(page.text).toContain("- Translation reviewed at: 2026-10-27");
    expect(page.text).toContain(`- Replaced by: \`${requirement.id}\``);
  });

  test("an overlay page renders overrides and waivers", async () => {
    const loaded = must(await loadStandardFromRoot(process.cwd()));
    const overlay = loaded.standard.overlays.find(
      (candidate) => candidate.id === "TH-FIN",
    );
    const core = loaded.standard.requirements[0];
    const date = must(isoDate("2027-10-27"));

    expect(overlay).toBeDefined();
    expect(core).toBeDefined();
    if (overlay === undefined || core === undefined) return;

    const synthetic = {
      ...overlay,
      overrides: [
        {
          requirement: core.id,
          replacement: {
            title: { en: "Replacement", th: "" },
            description: { en: "Replacement description", th: "" },
            criticality: "high" as const,
          },
          rationale: "Synthetic override",
        },
      ],
      waives: [
        {
          requirement: core.id,
          justification: "Synthetic waiver",
          riskOwner: "Example owner",
          expiresAt: date,
          rationale: "Synthetic rationale",
        },
      ],
    };
    const page = renderOverlayPage(synthetic);

    expect(page.text).toContain("Synthetic override");
    expect(page.text).toContain("Synthetic waiver");
    expect(page.text).toContain("expires: 2027-10-27");
  });

  test("a lite project README reports a null index and no limitations", () => {
    const instance = loadProjectInstance();
    const lite = {
      ...instance,
      manifest: { ...instance.manifest, profile: "lite" as const },
      assessment: {
        ...instance.assessment,
        profile: "lite" as const,
        summary: { ...instance.assessment.summary, index: null },
        limitations: [],
      },
    };
    const text = renderProjectReadme(lite);

    expect(text).toContain("- Summary index: not used");
    expect(text).toContain("## Limitations\n\n- none");
  });
});

describe("render load errors", () => {
  test("an empty root reports no content", async () => {
    const root = await makeTemp();
    const result = await renderToRoot(root);

    expect(result.ok).toBe(false);

    if (!result.ok) expect(result.error.tag).toBe("NoContent");
  });

  test("a root without schemas reports a schema error", async () => {
    const root = await makeTemp();
    await cp(join(process.cwd(), "core"), join(root, "core"), {
      recursive: true,
    });
    const result = await renderToRoot(root);

    expect(result.ok).toBe(false);

    if (!result.ok) expect(result.error.tag).toBe("Schema");
  });

  test("a standard without a manifest reports a validation error", async () => {
    const root = await makeRoot();
    await rm(join(root, "core", "sras.yaml"));
    const result = await renderToRoot(root);

    expect(result.ok).toBe(false);

    if (!result.ok) expect(result.error.tag).toBe("Validation");
  });

  test("a non-directory root reports a read error", async () => {
    const root = await makeTemp();
    const file = join(root, "not-a-directory");
    await writeFile(file, "not a directory\n", "utf8");

    const loaded = await loadStandardFromRoot(file);

    expect(loaded.ok).toBe(false);

    if (!loaded.ok) {
      const error: StandardLoadError = loaded.error;
      expect(error.tag).toBe("Read");
    }
  });

  test("a file where the reference directory should be reports a write error", async () => {
    const root = await makeRoot();
    const docs = join(root, "docs", "en");
    await mkdir(docs, { recursive: true });
    await writeFile(join(docs, "reference"), "not a directory\n", "utf8");
    const result = await renderToRoot(root);

    expect(result.ok).toBe(false);

    if (!result.ok) expect(result.error.tag).toBe("Write");
  });
});

describe("sras render errors", () => {
  test("an empty root exits 1 with a no-content message", async () => {
    const root = await makeTemp();
    const { io, stderr } = makeIo();

    expect(await run(["render"], io, root)).toBe(1);
    expect(stderr.join("")).toContain("no standard content found");
  });

  test("a root without schemas exits 1 with a schema message", async () => {
    const root = await makeTemp();
    await cp(join(process.cwd(), "core"), join(root, "core"), {
      recursive: true,
    });
    const { io, stderr } = makeIo();

    expect(await run(["render"], io, root)).toBe(1);
    expect(stderr.join("")).toContain("render schema error");
  });

  test("an invalid standard exits 1 with validation messages", async () => {
    const root = await makeRoot();
    await rm(join(root, "core", "sras.yaml"));
    const { io, stderr } = makeIo();

    expect(await run(["render"], io, root)).toBe(1);
    expect(stderr.join("")).toContain("manifest");
  });
});
