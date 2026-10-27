import { describe, expect, test } from "vitest";
import {
  bind,
  err,
  map,
  mapError,
  ok,
  type Result,
} from "../../src/sras/foundation/result.js";

describe("Result", () => {
  test("ok and err carry their values", () => {
    expect(ok(3)).toEqual({ ok: true, value: 3 });
    expect(err("bad")).toEqual({ ok: false, error: "bad" });
  });

  test("map transforms an ok value and leaves an err untouched", () => {
    expect(map(ok(2), (value) => value * 3)).toEqual({ ok: true, value: 6 });
    expect(map(err("bad"), (value: number) => value * 3)).toEqual({
      ok: false,
      error: "bad",
    });
  });

  test("map does not run the transform for an err", () => {
    let called = false;
    map(err("bad"), (value: number) => {
      called = true;
      return value;
    });
    expect(called).toBe(false);
  });

  test("mapError transforms an error and leaves an ok value untouched", () => {
    expect(mapError(err("bad"), (error) => error.length)).toEqual({
      ok: false,
      error: 3,
    });
    expect(mapError(ok(4), (error: string) => error.length)).toEqual({
      ok: true,
      value: 4,
    });
  });

  test("bind chains an ok value and short-circuits an err", () => {
    const chained = bind(ok(2), (value) => ok(value + 1));
    expect(chained).toEqual({ ok: true, value: 3 });

    let called = false;
    const skipped = bind(err("bad"), (value: number) => {
      called = true;
      return ok(value + 1);
    });
    expect(skipped).toEqual({ ok: false, error: "bad" });
    expect(called).toBe(false);
  });

  test("bind widens the error union honestly", () => {
    const start: Result<number, { readonly tag: "Start" }> = err({
      tag: "Start",
    });
    const result: Result<
      string,
      { readonly tag: "Start" } | { readonly tag: "Next" }
    > = bind(start, () => err({ tag: "Next" }));

    expect(result.ok).toBe(false);
  });
});
