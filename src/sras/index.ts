export { assertNever } from "./foundation/assert-never.js";
export type { Brand } from "./foundation/brand.js";
export { bind, err, map, mapError, ok } from "./foundation/result.js";
export type { Result } from "./foundation/result.js";
export { validateStandard } from "./standard/validate.js";
export { validateStandardFiles } from "./standard/workflow.js";
export type {
  Standard,
  ValidatedStandard,
  ValidationIssue,
} from "./standard/types.js";
export { VERSION } from "./version.js";
