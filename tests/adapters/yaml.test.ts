import { describe, expect, test } from "vitest";
import { parseYaml } from "../../src/sras/adapters/yaml.js";

describe("parseYaml", () => {
  test("parses a safe YAML document", () => {
    const result = parseYaml({ path: "x.yaml", text: "a: 1\nb: [2, 3]\n" });

    expect(result).toEqual({ ok: true, value: { a: 1, b: [2, 3] } });
  });

  test("rejects malformed YAML", () => {
    const result = parseYaml({ path: "x.yaml", text: "a: [\n" });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("Parse");
  });

  test("rejects a file over the size limit", () => {
    const result = parseYaml({
      path: "large.yaml",
      text: "a".repeat(1024 * 1024 + 1),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("TooLarge");
  });
});
