import { expect, test } from "vitest";
import { assertNever } from "../../src/sras/foundation/assert-never.js";

test("assertNever throws for an impossible value", () => {
  expect(() => assertNever("impossible" as never)).toThrow("unhandled case: ");
});
