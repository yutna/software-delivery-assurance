import { expect, expectTypeOf, test } from "vitest";
import type { Brand } from "../../src/sras/foundation/brand.js";

type UserId = Brand<string, "UserId">;

test("a brand does not accept a raw string", () => {
  // @ts-expect-error a raw string is not a UserId
  const invalid: UserId = "user-1";

  expect(invalid).toBe("user-1");
  expectTypeOf<UserId>().not.toEqualTypeOf<string>();
});
