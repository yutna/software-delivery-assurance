import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

describe("public denylist", () => {
  test("does not exclude the former bootstrap path", async () => {
    const text = await readFile(
      join(process.cwd(), "guard", "denylist.yaml"),
      "utf8",
    );

    expect(text).not.toContain("internal/**");
  });
});
