import { assertNever } from "../foundation/assert-never.js";
import { err, ok, type Result } from "../foundation/result.js";
import {
  resolveStandard,
  type ResolutionConflict,
  type ResolutionIssue,
  type ResolvedRequirement,
  type Selection,
} from "../standard/resolve.js";
import type { ModuleId, OverlayId } from "../standard/ids.js";
import type {
  AssessmentStatus,
  ProfileId,
  Tier,
  ValidatedStandard,
} from "../standard/types.js";
import type { ProjectInstance, AssessedRequirement } from "./types.js";

export type UnassessedGateStatus = "missing" | "not_assessed";

export type UnassessedGate = {
  readonly id: string;
  readonly layer: ResolvedRequirement["layer"];
  readonly status: UnassessedGateStatus;
};

export type ProjectCoverage = {
  readonly resolved: number;
  readonly gates: number;
  readonly assessed: number;
  readonly notAssessed: number;
  readonly notApplicable: number;
  readonly missingRecords: number;
  readonly unassessedGates: readonly UnassessedGate[];
};

export type ProjectResolution = {
  readonly project: string;
  readonly profile: ProfileId;
  readonly tier: Tier;
  readonly modules: readonly ModuleId[];
  readonly overlays: readonly OverlayId[];
  readonly requirements: readonly ResolvedRequirement[];
  readonly coverage: ProjectCoverage;
};

export type ProjectResolutionError =
  | { readonly tag: "Resolution"; readonly issues: readonly ResolutionIssue[] }
  | {
      readonly tag: "Conflicts";
      readonly conflicts: readonly ResolutionConflict[];
    };

const isAssessed = (
  status: AssessmentStatus,
): status is "verified" | "implemented" | "partial" | "gap" =>
  status === "verified" ||
  status === "implemented" ||
  status === "partial" ||
  status === "gap";

const LAYER_RANK: Record<ResolvedRequirement["layer"], number> = {
  core: 0,
  module: 1,
  jurisdiction: 2,
  industry: 3,
  project: 4,
};

const byLayerThenId = (
  left: ResolvedRequirement,
  right: ResolvedRequirement,
): number =>
  LAYER_RANK[left.layer] - LAYER_RANK[right.layer] ||
  left.id.localeCompare(right.id);

/**
 * Resolve a project selection and compare the resolved set with the
 * assessment. The function is pure: the caller supplies the parsed instance
 * and validated standard.
 */
export const resolveProject = (
  instance: ProjectInstance,
  standard: ValidatedStandard,
): Result<ProjectResolution, ProjectResolutionError> => {
  const selection: Selection = {
    profile: instance.manifest.profile,
    tier: instance.manifest.tier,
    modules: instance.manifest.modules,
    overlays: instance.manifest.overlays,
    project: { adds: [], waives: [] },
  };
  const resolved = resolveStandard(standard, selection);

  if (!resolved.ok) return err({ tag: "Resolution", issues: resolved.error });
  if (resolved.value.conflicts.length > 0) {
    return err({ tag: "Conflicts", conflicts: resolved.value.conflicts });
  }

  const assessmentById = new Map<string, AssessedRequirement>(
    instance.assessment.requirements.map((requirement) => [
      requirement.id,
      requirement,
    ]),
  );
  const unassessedGates: UnassessedGate[] = [];
  const requirements = [...resolved.value.requirements].sort(byLayerThenId);
  let assessed = 0;
  let notAssessed = 0;
  let notApplicable = 0;
  let missingRecords = 0;

  for (const requirement of requirements) {
    const recorded = assessmentById.get(requirement.id);

    if (recorded === undefined) {
      missingRecords += 1;
      notAssessed += 1;

      if (requirement.criticality === "gate") {
        unassessedGates.push({
          id: requirement.id,
          layer: requirement.layer,
          status: "missing",
        });
      }

      continue;
    }

    if (recorded.status === "not_applicable") {
      notApplicable += 1;
      continue;
    }

    if (recorded.status === "not_assessed") {
      notAssessed += 1;

      if (requirement.criticality === "gate") {
        unassessedGates.push({
          id: requirement.id,
          layer: requirement.layer,
          status: "not_assessed",
        });
      }

      continue;
    }

    if (isAssessed(recorded.status)) {
      assessed += 1;
      continue;
    }

    return assertNever(recorded.status);
  }

  return ok({
    project: instance.manifest.project.name,
    profile: instance.manifest.profile,
    tier: instance.manifest.tier,
    modules: instance.manifest.modules,
    overlays: instance.manifest.overlays,
    requirements,
    coverage: {
      resolved: requirements.length,
      gates: requirements.filter(
        (requirement) => requirement.criticality === "gate",
      ).length,
      assessed,
      notAssessed,
      notApplicable,
      missingRecords,
      unassessedGates,
    },
  });
};
