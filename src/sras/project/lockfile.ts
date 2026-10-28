import { createHash } from "node:crypto";
import { stringify } from "yaml";
import { err, ok, type Result } from "../foundation/result.js";
import type { SourceFile } from "../standard/dto.js";
import type { Version } from "../standard/primitives.js";
import { checksum, relativePath, sha256Hex, type Checksum } from "./ids.js";
import type {
  LockedModule,
  LockedOverlay,
  LockfileInput,
  ProjectIssue,
  ProjectLock,
} from "./types.js";

/**
 * The lockfile checksum is SHA-256 over the UTF-8 bytes of a canonical JSON
 * array of `{ path, sha256 }` entries.
 *
 * Rules:
 * - one entry per resolved standard input file;
 * - entries sorted by path using deterministic code-unit order;
 * - keys emitted in fixed order (`path`, then `sha256`);
 * - no whitespace, no timestamp, no generator, no environment data.
 *
 * The same inputs therefore produce the same checksum on every machine and at
 * every time. The per-file digests are SHA-256 over the UTF-8 file bytes.
 */
const canonicalInputJson = (inputs: readonly LockfileInput[]): string =>
  `[${inputs
    .map(
      (input) =>
        `{"path":${JSON.stringify(input.path)},"sha256":${JSON.stringify(input.sha256)}}`,
    )
    .join(",")}]`;

const byPath = (
  left: { readonly path: string },
  right: { readonly path: string },
): number => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0);

const digestText = (
  text: string,
): Result<LockfileInput["sha256"], ProjectIssue> => {
  const digest = createHash("sha256").update(text, "utf8").digest("hex");
  const parsed = sha256Hex(digest);

  if (!parsed.ok) {
    return err({
      tag: "Lockfile",
      file: "<sha256>",
      message: "internal sha256 digest is not 64 lowercase hex characters",
    });
  }

  return ok(parsed.value);
};

export const lockInputs = (
  inputs: readonly SourceFile[],
): Result<readonly LockfileInput[], readonly ProjectIssue[]> => {
  const issues: ProjectIssue[] = [];
  const locked: LockfileInput[] = [];

  for (const input of inputs) {
    const path = relativePath(input.path);

    if (!path.ok) {
      issues.push({
        tag: "Lockfile",
        file: input.path,
        message: "resolved input path must be a safe relative path",
      });
      continue;
    }

    const digest = digestText(input.text);

    if (!digest.ok) {
      issues.push(digest.error);
      continue;
    }

    locked.push({ path: path.value, sha256: digest.value });
  }

  if (issues.length > 0) return err(issues);

  return ok([...locked].sort(byPath));
};

export const computeChecksum = (inputs: readonly LockfileInput[]): Checksum => {
  const canonical = canonicalInputJson([...inputs].sort(byPath));
  const digest = createHash("sha256").update(canonical, "utf8").digest("hex");
  const parsed = sha256Hex(digest);

  if (!parsed.ok) {
    throw new Error(
      "internal sha256 digest is not 64 lowercase hex characters",
    );
  }

  const parsedChecksum = checksum(`sha256:${parsed.value}`);

  if (!parsedChecksum.ok) {
    throw new Error("internal checksum is not a sha256 digest");
  }

  return parsedChecksum.value;
};

export type CreateProjectLockInput = {
  readonly sourceFile: string;
  readonly srasVersion: Version;
  readonly modules: readonly LockedModule[];
  readonly overlays: readonly LockedOverlay[];
  readonly inputs: readonly SourceFile[];
};

const lockDocument = (
  lock: ProjectLock,
): Readonly<Record<string, unknown>> => ({
  lockfile_version: 1,
  sras: {
    version: lock.sras.version,
    checksum: lock.sras.checksum,
  },
  modules: lock.modules.map((module) => ({
    id: module.id,
    version: module.version,
  })),
  overlays: lock.overlays.map((overlay) => ({
    id: overlay.id,
    version: overlay.version,
  })),
  inputs: lock.inputs.map((input) => ({
    path: input.path,
    sha256: input.sha256,
  })),
});

/**
 * Serialises a lock in the canonical field order used by every project
 * instance. The output is deterministic: `lineWidth: 0` leaves the YAML
 * emitter's line wrapping out of the result.
 */
export const renderProjectLock = (lock: ProjectLock): string =>
  stringify(lockDocument(lock), { lineWidth: 0 });

export const createProjectLock = (
  input: CreateProjectLockInput,
): Result<ProjectLock, readonly ProjectIssue[]> => {
  const lockedInputs = lockInputs(input.inputs);

  if (!lockedInputs.ok) return err(lockedInputs.error);

  return ok({
    tag: "ProjectLock",
    sourceFile: input.sourceFile,
    lockfileVersion: 1,
    sras: {
      version: input.srasVersion,
      checksum: computeChecksum(lockedInputs.value),
    },
    modules: input.modules,
    overlays: input.overlays,
    inputs: lockedInputs.value,
  });
};

export const verifyProjectLock = (
  lock: ProjectLock,
  inputs: readonly SourceFile[],
): Result<void, readonly ProjectIssue[]> => {
  const expected = lockInputs(inputs);

  if (!expected.ok) return err(expected.error);

  const issues: ProjectIssue[] = [];
  const expectedByPath = new Map(
    expected.value.map((input) => [input.path, input.sha256]),
  );
  const actualByPath = new Map(
    lock.inputs.map((input) => [input.path, input.sha256]),
  );

  for (const [path, hash] of expectedByPath) {
    const actual = actualByPath.get(path);

    if (actual === undefined) {
      issues.push({
        tag: "Mismatch",
        file: "assurance.lock.yaml",
        field: `inputs/${path}`,
        expected: hash,
        actual: "missing",
      });
      continue;
    }

    if (actual !== hash) {
      issues.push({
        tag: "Mismatch",
        file: "assurance.lock.yaml",
        field: `inputs/${path}`,
        expected: hash,
        actual,
      });
    }
  }

  for (const path of actualByPath.keys()) {
    if (!expectedByPath.has(path)) {
      issues.push({
        tag: "Mismatch",
        file: "assurance.lock.yaml",
        field: `inputs/${path}`,
        expected: "present in the resolved inputs",
        actual: "locked but not provided",
      });
    }
  }

  const checksumValue = computeChecksum(expected.value);

  if (checksumValue !== lock.sras.checksum) {
    issues.push({
      tag: "ChecksumMismatch",
      file: "assurance.lock.yaml",
      expected: lock.sras.checksum,
      actual: checksumValue,
    });
  }

  return issues.length === 0 ? ok(undefined) : err(issues);
};
