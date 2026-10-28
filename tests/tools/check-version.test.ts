import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

type VersionTree = {
  readonly packageVersion: string;
  readonly lockRootVersion: string;
  readonly lockPackageVersion: string;
  readonly versionTs: string;
  readonly citation: string;
  readonly standard: string;
  readonly docs: string;
};

const writeFile = (root: string, path: string, text: string): void => {
  const file = join(root, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text, "utf8");
};

const makeTree = (versions: Partial<VersionTree>): string => {
  const root = mkdtempSync(join(tmpdir(), "sras-check-version-"));
  temporaryDirectories.push(root);

  const tree: VersionTree = {
    packageVersion: "1.2.3",
    lockRootVersion: "1.2.3",
    lockPackageVersion: "1.2.3",
    versionTs: "1.2.3",
    citation: "1.2.3",
    standard: "1.2.3",
    docs: "1.2.3",
    ...versions,
  };

  writeFile(
    root,
    "package.json",
    `${JSON.stringify({ name: "example", version: tree.packageVersion }, null, 2)}\n`,
  );
  writeFile(
    root,
    "package-lock.json",
    `${JSON.stringify(
      {
        name: "example",
        version: tree.lockRootVersion,
        lockfileVersion: 3,
        packages: { "": { name: "example", version: tree.lockPackageVersion } },
      },
      null,
      2,
    )}\n`,
  );
  writeFile(
    root,
    "src/sras/version.ts",
    `export const VERSION = "${tree.versionTs}";\n`,
  );
  writeFile(
    root,
    "CITATION.cff",
    `cff-version: 1.2.0\nversion: ${tree.citation}\n`,
  );
  writeFile(root, "core/sras.yaml", `standard_version: ${tree.standard}\n`);
  writeFile(
    root,
    "docs/.vitepress/config.ts",
    `const config = {\n  version: "${tree.docs}",\n};\n`,
  );

  return root;
};

type Run = {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
};

const runCheck = (root: string, version = "1.2.3"): Run => {
  const result = spawnSync(
    process.execPath,
    [join(process.cwd(), "tools", "check-version.ts"), version],
    { cwd: root, encoding: "utf8" },
  );

  return {
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
  };
};

describe("check-version", () => {
  test("passes when every version file agrees", () => {
    const result = runCheck(makeTree({}));

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("ok package.json");
    expect(result.stdout).toContain("ok package-lock.json [version]");
    expect(result.stdout).toContain(
      'ok package-lock.json [packages[""].version]',
    );
    expect(result.stdout).toContain("version check passed: 1.2.3");
    expect(result.stderr).toBe("");
  });

  test("fails when the lockfile root version disagrees", () => {
    const result = runCheck(makeTree({ lockRootVersion: "1.2.2" }));

    expect(result.status).toBe(1);
    expect(result.stdout).toContain("FAIL package-lock.json [version]");
    expect(result.stderr).toContain("version check failed: 1 mismatch(es)");
    expect(result.stderr).toContain(
      "package-lock.json [version]: expected 1.2.3, found 1.2.2",
    );
  });

  test('fails when packages[""].version disagrees', () => {
    const result = runCheck(makeTree({ lockPackageVersion: "1.2.1" }));

    expect(result.status).toBe(1);
    expect(result.stdout).toContain(
      'FAIL package-lock.json [packages[""].version]',
    );
    expect(result.stderr).toContain(
      'package-lock.json [packages[""].version]: expected 1.2.3, found 1.2.1',
    );
  });

  test("fails when the lockfile is missing", () => {
    const root = makeTree({});
    rmSync(join(root, "package-lock.json"));
    const result = runCheck(root);

    expect(result.status).toBe(1);
    expect(result.stdout).toContain(
      'FAIL package-lock.json [packages[""].version]: expected 1.2.3, found missing',
    );
  });
});
