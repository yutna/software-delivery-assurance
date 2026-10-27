import { afterEach, describe, expect, test, vi } from "vitest";
import { processOutput } from "../../src/sras/adapters/output.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("processOutput", () => {
  test("writes to stdout and stderr", () => {
    const stdout = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
    const stderr = vi
      .spyOn(process.stderr, "write")
      .mockImplementation(() => true);

    processOutput.stdout("hello");
    processOutput.stderr("bad");

    expect(stdout).toHaveBeenCalledWith("hello");
    expect(stderr).toHaveBeenCalledWith("bad");
  });
});
