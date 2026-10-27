import type { Brand } from "../foundation/brand.js";
import { err, ok, type Result } from "../foundation/result.js";

export type ClaimId = Brand<string, "ClaimId">;
export type EvidenceId = Brand<string, "EvidenceId">;
export type RiskId = Brand<string, "RiskId">;
export type RiskAcceptanceId = Brand<string, "RiskAcceptanceId">;
export type Sha256Hex = Brand<string, "Sha256Hex">;
export type Checksum = Brand<string, "Checksum">;
export type RelativePath = Brand<string, "RelativePath">;

export type ProjectIdFamily =
  | "ClaimId"
  | "EvidenceId"
  | "RiskId"
  | "RiskAcceptanceId"
  | "Sha256Hex"
  | "Checksum"
  | "RelativePath";

export type ProjectIdError = {
  readonly tag: "InvalidProjectId";
  readonly family: ProjectIdFamily;
  readonly value: string;
};

const CLAIM = /^CLM(?:-[A-Z0-9]+)+-\d{3}$/;
const EVIDENCE = /^EV(?:-[A-Z0-9]+)+-\d{3}$/;
const RISK = /^RSK(?:-[A-Z0-9]+)+-\d{3}$/;
const ACCEPTANCE = /^ACC(?:-[A-Z0-9]+)+-\d{3}$/;
const SHA256 = /^[a-f0-9]{64}$/;
const CHECKSUM = /^sha256:[a-f0-9]{64}$/;

const parseBrand = <B extends string>(
  value: string,
  pattern: RegExp,
  family: ProjectIdFamily,
): Result<Brand<string, B>, ProjectIdError> => {
  if (!pattern.test(value))
    return err({ tag: "InvalidProjectId", family, value });
  const branded = value as Brand<string, B>; // fds-allow-as: checked brand cast
  return ok(branded);
};

export const claimId = (value: string): Result<ClaimId, ProjectIdError> =>
  parseBrand(value, CLAIM, "ClaimId");

export const evidenceId = (value: string): Result<EvidenceId, ProjectIdError> =>
  parseBrand(value, EVIDENCE, "EvidenceId");

export const riskId = (value: string): Result<RiskId, ProjectIdError> =>
  parseBrand(value, RISK, "RiskId");

export const riskAcceptanceId = (
  value: string,
): Result<RiskAcceptanceId, ProjectIdError> =>
  parseBrand(value, ACCEPTANCE, "RiskAcceptanceId");

export const sha256Hex = (value: string): Result<Sha256Hex, ProjectIdError> =>
  parseBrand(value, SHA256, "Sha256Hex");

export const checksum = (value: string): Result<Checksum, ProjectIdError> =>
  parseBrand(value, CHECKSUM, "Checksum");

export const relativePath = (
  value: string,
): Result<RelativePath, ProjectIdError> => {
  const segments = value.split("/");
  const invalid =
    value === "" ||
    value.startsWith("/") ||
    value.includes("\\") ||
    value.includes("\0") ||
    segments.some(
      (segment) => segment === "" || segment === "." || segment === "..",
    );

  if (invalid) {
    return err({ tag: "InvalidProjectId", family: "RelativePath", value });
  }

  const branded = value as RelativePath; // fds-allow-as: checked brand cast
  return ok(branded);
};
