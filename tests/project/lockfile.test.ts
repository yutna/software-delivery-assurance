import { describe, expect, test } from "vitest";
import type { Result } from "../../src/sras/foundation/result.js";
import { moduleId, overlayId } from "../../src/sras/standard/ids.js";
import { version } from "../../src/sras/standard/primitives.js";
import {
  computeChecksum,
  createProjectLock,
  lockInputs,
  verifyProjectLock,
} from "../../src/sras/project/lockfile.js";

const must = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) throw new Error(JSON.stringify(result.error));
  return result.value;
};

const srasVersion = must(version("0.4.0"));
const aiModule = must(moduleId("SRAS-AI"));
const financeOverlay = must(overlayId("TH-FIN"));

const inputs = [
  { path: "modules/ai/module.yaml", text: "module\n" },
  { path: "core/sras.yaml", text: "sras\n" },
] as const;

describe("project lockfile", () => {
  test("inputs are sorted by path and hashed with SHA-256", () => {
    const locked = must(lockInputs(inputs));

    expect(locked.map((input) => input.path)).toEqual([
      "core/sras.yaml",
      "modules/ai/module.yaml",
    ]);
    expect(locked[0]?.sha256).toMatch(/^[a-f0-9]{64}$/);
  });

  test("the same inputs produce the same checksum regardless of input order", () => {
    const lock = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion,
        modules: [{ id: aiModule, version: srasVersion }],
        overlays: [{ id: financeOverlay, version: srasVersion }],
        inputs,
      }),
    );
    const reversed = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion,
        modules: [{ id: aiModule, version: srasVersion }],
        overlays: [{ id: financeOverlay, version: srasVersion }],
        inputs: [...inputs].reverse(),
      }),
    );

    expect(lock.sras.checksum).toBe(reversed.sras.checksum);
    expect(lock.inputs).toEqual(reversed.inputs);
  });

  test("changed input content changes the checksum", () => {
    const original = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion,
        modules: [],
        overlays: [],
        inputs,
      }),
    );
    const changed = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion,
        modules: [],
        overlays: [],
        inputs: [{ path: "core/sras.yaml", text: "changed\n" }],
      }),
    );

    expect(original.sras.checksum).not.toBe(changed.sras.checksum);
  });

  test("the checksum has no timestamp, generator, or environment data", () => {
    const lock = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion,
        modules: [],
        overlays: [],
        inputs,
      }),
    );
    const serialized = JSON.stringify(lock);

    expect(serialized).not.toContain("timestamp");
    expect(serialized).not.toContain("generated_at");
    expect(serialized).not.toContain("generator");
  });

  test("computeChecksum accepts any entry order", () => {
    const locked = must(lockInputs(inputs));
    const reversed = [...locked].reverse();

    expect(computeChecksum(locked)).toBe(computeChecksum(reversed));
    expect(computeChecksum(locked)).toMatch(/^sha256:[a-f0-9]{64}$/);
  });

  test("verifyProjectLock accepts the matching inputs and rejects a changed file", () => {
    const lock = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion,
        modules: [],
        overlays: [],
        inputs,
      }),
    );

    expect(verifyProjectLock(lock, inputs).ok).toBe(true);

    const changed = verifyProjectLock(lock, [
      { path: "core/sras.yaml", text: "changed\n" },
      { path: "modules/ai/module.yaml", text: "module\n" },
    ]);

    expect(changed.ok).toBe(false);

    if (!changed.ok) {
      expect(changed.error.some((issue) => issue.tag === "Mismatch")).toBe(
        true,
      );
      expect(
        changed.error.some((issue) => issue.tag === "ChecksumMismatch"),
      ).toBe(true);
    }
  });

  test("verifyProjectLock reports a locked input that was not provided", () => {
    const lock = must(
      createProjectLock({
        sourceFile: "assurance.lock.yaml",
        srasVersion,
        modules: [],
        overlays: [],
        inputs,
      }),
    );
    const result = verifyProjectLock(lock, [inputs[0]]);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(
        result.error.some(
          (issue) =>
            issue.tag === "Mismatch" && issue.field.includes("core/sras.yaml"),
        ),
      ).toBe(true);
    }
  });
});
