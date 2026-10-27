import type { Brand } from "../foundation/brand.js";
import { err, ok, type Result } from "../foundation/result.js";

export type Version = Brand<string, "Version">;
export type IsoDate = Brand<string, "IsoDate">;
export type VersionRange = Brand<string, "VersionRange">;

export type PrimitiveError =
  | { readonly tag: "InvalidVersion"; readonly value: string }
  | { readonly tag: "InvalidDate"; readonly value: string }
  | { readonly tag: "InvalidVersionRange"; readonly value: string };

const VERSION = /^\d+\.\d+\.\d+$/;
const RANGE =
  /^(?:(?:>=|<=|>|<|=)?\d+\.\d+\.\d+)(?: (?:>=|<=|>|<|=)?\d+\.\d+\.\d+)*$/;

export const version = (value: string): Result<Version, PrimitiveError> => {
  if (!VERSION.test(value)) return err({ tag: "InvalidVersion", value });
  const branded = value as Version; // fds-allow-as: checked brand cast
  return ok(branded);
};

export const isoDate = (value: string): Result<IsoDate, PrimitiveError> => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (match === null) return err({ tag: "InvalidDate", value });

  const year = Number(match[1] ?? "0");
  const month = Number(match[2] ?? "0");
  const day = Number(match[3] ?? "0");
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return err({ tag: "InvalidDate", value });
  }

  const branded = value as IsoDate; // fds-allow-as: checked brand cast
  return ok(branded);
};

export const versionRange = (
  value: string,
): Result<VersionRange, PrimitiveError> => {
  if (!RANGE.test(value)) return err({ tag: "InvalidVersionRange", value });
  const branded = value as VersionRange; // fds-allow-as: checked brand cast
  return ok(branded);
};

const parts = (value: string): readonly [number, number, number] => {
  const [major = "0", minor = "0", patch = "0"] = value.split(".");
  return [Number(major), Number(minor), Number(patch)];
};

export const compareVersions = (left: Version, right: Version): number => {
  const [leftMajor, leftMinor, leftPatch] = parts(left);
  const [rightMajor, rightMinor, rightPatch] = parts(right);

  return (
    leftMajor - rightMajor || leftMinor - rightMinor || leftPatch - rightPatch
  );
};

export const satisfiesRange = (
  candidate: Version,
  range: VersionRange,
): boolean => {
  for (const constraint of range.split(" ")) {
    const match = /^(>=|<=|>|<|=)?(\d+\.\d+\.\d+)$/.exec(constraint);

    if (match === null) return false;

    const operator = match[1] ?? "=";
    const target = version(match[2] ?? "");

    if (!target.ok) return false;

    const comparison = compareVersions(candidate, target.value);
    const satisfied =
      (operator === ">=" && comparison >= 0) ||
      (operator === ">" && comparison > 0) ||
      (operator === "<=" && comparison <= 0) ||
      (operator === "<" && comparison < 0) ||
      (operator === "=" && comparison === 0);

    if (!satisfied) return false;
  }

  return true;
};
