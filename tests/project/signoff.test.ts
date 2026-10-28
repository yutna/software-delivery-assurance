import { readFileSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import { afterEach, describe, expect, test } from "vitest";
import type { Output } from "../../src/sras/adapters/output.js";
import { run } from "../../src/sras/cli/run.js";
import type { Result } from "../../src/sras/foundation/result.js";
import { readSourceFiles } from "../../src/sras/adapters/fs.js";
import {
  planProjectInit,
  TEMPLATE_FILES,
} from "../../src/sras/project/init.js";
import {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "../../src/sras/project/parse.js";
import type { ProjectInstance } from "../../src/sras/project/types.js";
import { projectWarnings } from "../../src/sras/project/validate.js";
import { readStandardInputs } from "../../src/sras/project/workflow.js";
import { isoDate, version } from "../../src/sras/standard/primitives.js";
import { VERSION } from "../../src/sras/version.js";

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
  const directory = await mkdtemp(join(tmpdir(), "sras-signoff-"));
  temporaryDirectories.push(directory);
  return directory;
};

const fixtureText = (file: string): string =>
  readFileSync(
    join(process.cwd(), "tests", "fixtures", "project", "valid", file),
    "utf8",
  );

const fixture = (file: string): unknown => parseYaml(fixtureText(file));

const signedInstance = (): ProjectInstance => ({
  manifest: must(
    parseProjectManifestFile(
      fixture("project-manifest.yaml"),
      "assurance.yaml",
    ),
  ),
  assessment: must(
    parseAssessmentFile(fixture("assessment.yaml"), "assessment.yaml"),
  ),
  evidence: must(
    parseEvidenceIndexFile(
      fixture("evidence-index.yaml"),
      "evidence-index.yaml",
    ),
  ),
  claims: must(parseClaimRegisterFile(fixture("claims.yaml"), "claims.yaml")),
  risks: must(
    parseRiskRegisterFile(fixture("risk-register.yaml"), "risk-register.yaml"),
  ),
  lock: must(
    parseProjectLockFile(fixture("project-lock.yaml"), "assurance.lock.yaml"),
  ),
});

const withSignoff = (
  instance: ProjectInstance,
  name: string,
  role: string,
): ProjectInstance => ({
  ...instance,
  assessment: {
    ...instance.assessment,
    signoff: { ...instance.assessment.signoff, name, role },
  },
});

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

describe("init sign-off placeholder", () => {
  test("a fresh plan writes the explicit sentinel and the creation date", async () => {
    const templates = must(
      await readSourceFiles(join(process.cwd(), "templates", "project"), [
        ...TEMPLATE_FILES,
      ]),
    );
    const standardInputs = must(
      await readStandardInputs(process.cwd(), "lite"),
    );
    const plan = must(
      planProjectInit({
        projectName: "Example project",
        profile: "lite",
        date: must(isoDate("2026-10-28")),
        srasVersion: must(version(VERSION)),
        templateFiles: templates,
        standardInputs,
      }),
    );
    const assessment = plan.files.find(
      (file) => file.path === "assessment.yaml",
    );

    expect(assessment).toBeDefined();
    expect(assessment?.text).toContain("name: Not signed");
    expect(assessment?.text).toContain("role: Not signed");
    expect(assessment?.text).toContain('date: "2026-10-28"');
    expect(assessment?.text).not.toContain("1970-01-01");
  });
});

describe("projectWarnings", () => {
  test("a signed instance has no warnings", () => {
    expect(projectWarnings(signedInstance())).toEqual([]);
  });

  test("a fresh sentinel instance reports both sign-off fields", () => {
    const warnings = projectWarnings(
      withSignoff(signedInstance(), "Not signed", "Not signed"),
    );

    expect(warnings).toEqual([
      {
        tag: "UnsignedSignoff",
        file: "assessment.yaml",
        fields: ["signoff.name", "signoff.role"],
      },
    ]);
  });

  test("a stale sentinel on one field is still reported", () => {
    const warnings = projectWarnings(
      withSignoff(signedInstance(), "Not signed", "Example reviewer"),
    );

    expect(warnings).toEqual([
      {
        tag: "UnsignedSignoff",
        file: "assessment.yaml",
        fields: ["signoff.name"],
      },
    ]);
  });
});

describe("sras project validate sign-off warning", () => {
  test("warns without failing a fresh draft and clears after a sign-off", async () => {
    const temp = await makeTemp();
    const target = join(temp, "draft-project");

    expect(
      await run(
        ["init", target, "--profile", "lite"],
        makeIo().io,
        process.cwd(),
      ),
    ).toBe(0);

    const draft = makeIo();

    expect(
      await run(["project", "validate", target], draft.io, process.cwd()),
    ).toBe(0);
    expect(draft.stdout.join("")).toContain("project valid");
    expect(draft.stderr.join("")).toContain(
      "warning: assessment.yaml: sign-off is unsigned",
    );
    expect(draft.stderr.join("")).toContain("signoff.name and signoff.role");

    const path = join(target, "assessment.yaml");
    const text = await readFile(path, "utf8");

    await writeFile(
      path,
      text
        .replace("name: Not signed", "name: Example reviewer")
        .replace("role: Not signed", "role: Example reviewer"),
      "utf8",
    );

    const signed = makeIo();

    expect(
      await run(["project", "validate", target], signed.io, process.cwd()),
    ).toBe(0);
    expect(signed.stdout.join("")).toContain("project valid");
    expect(signed.stderr).toEqual([]);
  });
});
