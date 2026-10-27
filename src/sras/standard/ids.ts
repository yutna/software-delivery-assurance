import type { Brand } from "../foundation/brand.js";
import { err, ok, type Result } from "../foundation/result.js";

export type RequirementId = Brand<string, "RequirementId">;
export type ModuleId = Brand<string, "ModuleId">;
export type OverlayId = Brand<string, "OverlayId">;
export type OverlayRequirementId = Brand<string, "OverlayRequirementId">;
export type RegisterEntryId = Brand<string, "RegisterEntryId">;
export type CrosswalkId = Brand<string, "CrosswalkId">;

export type IdFamily =
  | "RequirementId"
  | "ModuleId"
  | "OverlayId"
  | "OverlayRequirementId"
  | "RegisterEntryId"
  | "CrosswalkId";

export type IdError = {
  readonly tag: "InvalidId";
  readonly family: IdFamily;
  readonly value: string;
};

const REQUIREMENT = /^SRAS-[A-Z]+-\d{3}$/;
const MODULE = /^SRAS-(AI|INT|RGD|CLD|ONP)$/;
const OVERLAY = /^[A-Z]{2,5}-[A-Z]{3}$/;
const OVERLAY_REQUIREMENT = /^[A-Z]{2,5}-[A-Z]{3}-\d{3}$/;
const REGISTER_ENTRY = /^[A-Z]{2,5}-[A-Z]+-\d{3}$/;
const CROSSWALK = /^MAP-[A-Z0-9]+(?:-[A-Z0-9]+)*$/;

const parseId = <B extends string>(
  value: string,
  pattern: RegExp,
  family: IdFamily,
): Result<Brand<string, B>, IdError> => {
  if (!pattern.test(value)) return err({ tag: "InvalidId", family, value });
  const branded = value as Brand<string, B>; // fds-allow-as: checked brand cast
  return ok(branded);
};

export const requirementId = (value: string): Result<RequirementId, IdError> =>
  parseId(value, REQUIREMENT, "RequirementId");

export const moduleId = (value: string): Result<ModuleId, IdError> =>
  parseId(value, MODULE, "ModuleId");

export const overlayId = (value: string): Result<OverlayId, IdError> =>
  parseId(value, OVERLAY, "OverlayId");

export const overlayRequirementId = (
  value: string,
): Result<OverlayRequirementId, IdError> =>
  parseId(value, OVERLAY_REQUIREMENT, "OverlayRequirementId");

export const registerEntryId = (
  value: string,
): Result<RegisterEntryId, IdError> =>
  parseId(value, REGISTER_ENTRY, "RegisterEntryId");

export const crosswalkId = (value: string): Result<CrosswalkId, IdError> =>
  parseId(value, CROSSWALK, "CrosswalkId");
