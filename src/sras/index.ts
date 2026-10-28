export { assertNever } from "./foundation/assert-never.js";
export type { Brand } from "./foundation/brand.js";
export { bind, err, map, mapError, ok } from "./foundation/result.js";
export type { Result } from "./foundation/result.js";
export { validateStandard } from "./standard/validate.js";
export { resolveStandard } from "./standard/resolve.js";
export type {
  AppliedWaiver,
  ProjectRequirement,
  ProjectWaiver,
  ResolutionCandidateSummary,
  ResolutionConflict,
  ResolutionIssue,
  ResolutionLayer,
  ResolvedRequirement,
  ResolvedStandard,
  Selection,
} from "./standard/resolve.js";
export { validateStandardFiles } from "./standard/workflow.js";
export type {
  EvidenceExpectation,
  EvidenceType,
  Standard,
  ValidatedStandard,
  ValidationIssue,
} from "./standard/types.js";
export {
  parseAssessmentFile,
  parseClaimRegisterFile,
  parseEvidenceIndexFile,
  parseProjectLockFile,
  parseProjectManifestFile,
  parseRiskRegisterFile,
} from "./project/parse.js";
export {
  computeChecksum,
  createProjectLock,
  lockInputs,
  renderProjectLock,
  verifyProjectLock,
} from "./project/lockfile.js";
export {
  planProjectInit,
  TEMPLATE_FILES,
  type InitIssue,
  type InitPlan,
  type PlannedFile,
} from "./project/init.js";
export {
  initProject,
  readStandardInputs,
  refreshProjectLock,
  resolveProjectDirectory,
  validateProjectDirectory,
  type InitProjectInput,
  type InitResult,
  type InitShellError,
  type ProjectDirectoryError,
  type ProjectDirectoryInput,
  type ProjectDirectoryResult,
  type ProjectRefreshResult,
  type ProjectValidationResult,
} from "./project/workflow.js";
export {
  resolveProject,
  type ProjectCoverage,
  type ProjectResolution,
  type ProjectResolutionError,
  type UnassessedGate,
  type UnassessedGateStatus,
} from "./project/resolution.js";
export {
  projectWarnings,
  SIGNOFF_PLACEHOLDER,
  validateEvidenceTypeCoverage,
  validateProject,
} from "./project/validate.js";
export {
  renderGuardAnnotations,
  renderGuardJson,
  renderGuardSummary,
  toGuardReport,
  type GuardReport,
  type GuardReportFinding,
} from "./guard/report.js";
export type {
  Assessment,
  Claim,
  ClaimRegister,
  EvidenceEntry,
  EvidenceIndex,
  ProjectInstance,
  ProjectIssue,
  ProjectLock,
  ProjectManifest,
  ProjectWarning,
  Risk,
  RiskRegister,
  SignoffField,
  ValidatedProject,
} from "./project/types.js";
export {
  renderCrosswalkPage,
  renderIndexPage,
  renderOverlayPage,
  renderProjectReadme,
  renderRegisterPage,
  renderRequirementPage,
  renderStandard,
} from "./render/markdown.js";
export {
  checkRendered,
  REFERENCE_DIRECTORY,
  renderCheckFromRoot,
  renderToRoot,
  type RenderCheckResult,
} from "./render/workflow.js";
export type {
  RenderCheckError,
  RenderDriftIssue,
  RenderError,
  RenderPage,
  RenderSummary,
} from "./render/types.js";
export { VERSION } from "./version.js";
