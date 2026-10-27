import { describe, expect, test } from "vitest";
import {
  crosswalkId,
  moduleId,
  overlayId,
  overlayRequirementId,
  registerEntryId,
  requirementId,
  type ModuleId,
} from "../../src/sras/standard/ids.js";

describe("IDs", () => {
  test("accepts each valid ID family", () => {
    expect(requirementId("SRAS-SEC-001")).toEqual({
      ok: true,
      value: "SRAS-SEC-001",
    });
    expect(moduleId("SRAS-AI")).toEqual({ ok: true, value: "SRAS-AI" });
    expect(overlayId("TH-FIN")).toEqual({ ok: true, value: "TH-FIN" });
    expect(overlayRequirementId("TH-FIN-001")).toEqual({
      ok: true,
      value: "TH-FIN-001",
    });
    expect(registerEntryId("TH-PDPA-001")).toEqual({
      ok: true,
      value: "TH-PDPA-001",
    });
    expect(crosswalkId("MAP-ISO27001")).toEqual({
      ok: true,
      value: "MAP-ISO27001",
    });
  });

  test("rejects malformed IDs", () => {
    expect(requirementId("SRAS-SEC-1")).toEqual({
      ok: false,
      error: {
        tag: "InvalidId",
        family: "RequirementId",
        value: "SRAS-SEC-1",
      },
    });
    expect(moduleId("SRAS-XXX")).toEqual({
      ok: false,
      error: { tag: "InvalidId", family: "ModuleId", value: "SRAS-XXX" },
    });
    expect(overlayId("TH-FINANCE")).toEqual({
      ok: false,
      error: { tag: "InvalidId", family: "OverlayId", value: "TH-FINANCE" },
    });
    expect(overlayRequirementId("TH-FIN-1")).toEqual({
      ok: false,
      error: {
        tag: "InvalidId",
        family: "OverlayRequirementId",
        value: "TH-FIN-1",
      },
    });
    expect(registerEntryId("TH-PDPA")).toEqual({
      ok: false,
      error: {
        tag: "InvalidId",
        family: "RegisterEntryId",
        value: "TH-PDPA",
      },
    });
    expect(crosswalkId("ISO27001")).toEqual({
      ok: false,
      error: {
        tag: "InvalidId",
        family: "CrosswalkId",
        value: "ISO27001",
      },
    });
  });

  test("ID families are not interchangeable", () => {
    const parsed = requirementId("SRAS-SEC-001");
    if (!parsed.ok) throw new Error("fixture ID must be valid");

    // @ts-expect-error a RequirementId is not a ModuleId
    const wrong: ModuleId = parsed.value;
    expect(wrong).toBe("SRAS-SEC-001");
  });
});
