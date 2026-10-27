import { err, ok, type Result } from "../foundation/result.js";
import type {
  ModuleId,
  OverlayId,
  OverlayRequirementId,
  RequirementId,
} from "./ids.js";
import type { IsoDate } from "./primitives.js";
import type {
  Applicability,
  CoreRequirement,
  Criticality,
  EvidenceExpectation,
  LocalizedText,
  MaturityLevel,
  ModuleRequirement,
  NonEmpty,
  Overlay,
  OverlayRequirement,
  ProfileId,
  Tier,
  ValidatedStandard,
} from "./types.js";

export type ResolutionLayer =
  "core" | "module" | "jurisdiction" | "industry" | "project";

export type RequirementRef = RequirementId | OverlayRequirementId;

export type ProjectRequirement = {
  readonly id: string;
  readonly replaces: RequirementRef | null;
  readonly criticality: Criticality;
  readonly requiredMaturity: MaturityLevel;
  readonly evidence: NonEmpty<EvidenceExpectation>;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
};

export type ProjectWaiver = {
  readonly requirement: RequirementRef;
  readonly justification: string;
  readonly riskOwner: string;
  readonly expiresAt: IsoDate;
  readonly rationale: string;
};

export type Selection = {
  readonly profile: ProfileId;
  readonly tier: Tier;
  readonly modules: readonly ModuleId[];
  readonly overlays: readonly OverlayId[];
  readonly project: {
    readonly adds: readonly ProjectRequirement[];
    readonly waives: readonly ProjectWaiver[];
  };
};

export type ResolvedRequirement = {
  readonly id: string;
  readonly sourceId: string;
  readonly layer: ResolutionLayer;
  readonly criticality: Criticality;
  readonly requiredMaturity: MaturityLevel;
  readonly evidenceMaxAgeDays: number;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
};

export type ResolutionCandidateSummary = {
  readonly sourceId: string;
  readonly layer: ResolutionLayer;
  readonly criticality: Criticality;
  readonly requiredMaturity: MaturityLevel;
  readonly evidenceMaxAgeDays: number;
};

export type ResolutionConflict = {
  readonly id: string;
  readonly kind: "incomparable" | "same-layer";
  readonly candidates: NonEmpty<ResolutionCandidateSummary>;
  readonly message: string;
};

export type AppliedWaiver = {
  readonly requirement: RequirementRef;
  readonly layer: ResolutionLayer;
  readonly justification: string;
  readonly riskOwner: string;
  readonly expiresAt: IsoDate;
};

export type ResolvedStandard = {
  readonly profile: ProfileId;
  readonly tier: Tier;
  readonly modules: readonly ModuleId[];
  readonly overlays: readonly OverlayId[];
  readonly requirements: readonly ResolvedRequirement[];
  readonly conflicts: readonly ResolutionConflict[];
  readonly waivers: readonly AppliedWaiver[];
};

export type ResolutionIssue =
  | { readonly tag: "UnknownModule"; readonly module: string }
  | { readonly tag: "UnknownOverlay"; readonly overlay: string }
  | {
      readonly tag: "GateWaiver";
      readonly requirement: string;
      readonly layer: ResolutionLayer;
    }
  | { readonly tag: "InvalidProjectId"; readonly id: string }
  | { readonly tag: "DuplicateProjectId"; readonly id: string }
  | { readonly tag: "ProjectIdCollision"; readonly id: string }
  | { readonly tag: "UnresolvedWaiver"; readonly requirement: string };

type Candidate = {
  readonly id: string;
  readonly sourceId: string;
  readonly layer: ResolutionLayer;
  readonly order: number;
  readonly criticality: Criticality;
  readonly requiredMaturity: MaturityLevel;
  readonly evidenceMaxAgeDays: number;
  readonly explicit: boolean;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
};

type Strictness = {
  readonly criticality: number;
  readonly maturity: number;
  readonly freshness: number;
};

const LAYER_ORDER: Readonly<Record<ResolutionLayer, number>> = {
  core: 0,
  module: 1,
  jurisdiction: 2,
  industry: 3,
  project: 4,
};

const CRITICALITY_RANK: Readonly<Record<Criticality, number>> = {
  gate: 3,
  high: 2,
  medium: 1,
  low: 0,
};

const MATURITY_RANK: Readonly<Record<MaturityLevel, number>> = {
  L0: 0,
  L1: 1,
  L2: 2,
  L3: 3,
  L4: 4,
};

const BASE_REQUIRED_MATURITY: MaturityLevel = "L2";

const STRICTNESS_AXES: readonly (keyof Strictness)[] = [
  "criticality",
  "maturity",
  "freshness",
];

const maxAgeDays = (evidence: NonEmpty<EvidenceExpectation>): number =>
  Math.min(...evidence.map((item) => item.maxAgeDays));

const layerForOverlay = (overlay: Overlay): ResolutionLayer =>
  overlay.type === "jurisdiction" ? "jurisdiction" : "industry";

const appliesTo = (
  applicability: Applicability,
  tier: Tier,
  selectedModules: ReadonlySet<string>,
  selectedOverlays: ReadonlySet<string>,
): boolean =>
  applicability.tiers.includes(tier) &&
  (applicability.modules.length === 0 ||
    applicability.modules.some((module) => selectedModules.has(module))) &&
  (applicability.overlays.length === 0 ||
    applicability.overlays.some((overlay) => selectedOverlays.has(overlay)));

const candidateFrom = (
  requirement: CoreRequirement | ModuleRequirement | OverlayRequirement,
  layer: ResolutionLayer,
): Candidate => ({
  id: requirement.id,
  sourceId: requirement.id,
  layer,
  order: LAYER_ORDER[layer],
  criticality: requirement.criticality,
  requiredMaturity: BASE_REQUIRED_MATURITY,
  evidenceMaxAgeDays: maxAgeDays(requirement.evidence),
  explicit: false,
  title: requirement.title,
  description: requirement.description,
});

const strictnessOf = (candidate: Candidate): Strictness => ({
  criticality: CRITICALITY_RANK[candidate.criticality],
  maturity: MATURITY_RANK[candidate.requiredMaturity],
  freshness: -candidate.evidenceMaxAgeDays,
});

const dominates = (left: Candidate, right: Candidate): boolean => {
  const leftStrictness = strictnessOf(left);
  const rightStrictness = strictnessOf(right);
  let stricter = false;

  for (const axis of STRICTNESS_AXES) {
    if (leftStrictness[axis] < rightStrictness[axis]) return false;
    if (leftStrictness[axis] > rightStrictness[axis]) stricter = true;
  }

  if (stricter) return true;

  return left.explicit && !right.explicit;
};

const equalStrictness = (left: Candidate, right: Candidate): boolean => {
  const leftStrictness = strictnessOf(left);
  const rightStrictness = strictnessOf(right);

  return (
    left.explicit === right.explicit &&
    STRICTNESS_AXES.every(
      (axis) => leftStrictness[axis] === rightStrictness[axis],
    )
  );
};

const describeCandidate = (candidate: Candidate): string =>
  `${candidate.layer}(${candidate.sourceId}: ${candidate.criticality}/${candidate.requiredMaturity}/${String(candidate.evidenceMaxAgeDays)}d${candidate.explicit ? ", explicit" : ""})`;

const summarize = (candidate: Candidate): ResolutionCandidateSummary => ({
  sourceId: candidate.sourceId,
  layer: candidate.layer,
  criticality: candidate.criticality,
  requiredMaturity: candidate.requiredMaturity,
  evidenceMaxAgeDays: candidate.evidenceMaxAgeDays,
});

const conflictFor = (
  id: string,
  kind: "incomparable" | "same-layer",
  candidates: NonEmpty<Candidate>,
): ResolutionConflict => {
  const [first, ...rest] = candidates;

  const message =
    kind === "incomparable"
      ? `${id}: candidates are incomparable: ${candidates.map(describeCandidate).join(" vs ")}. Raise criticality, required maturity, or evidence freshness on one candidate, or make the intended replacement explicit.`
      : `${id}: two ${first.layer} candidates have equal strictness: ${candidates.map(describeCandidate).join(" vs ")}. Keep one candidate or make the replacement explicit.`;

  return {
    id,
    kind,
    candidates: [summarize(first), ...rest.map(summarize)],
    message,
  };
};

type GroupOutcome =
  | { readonly tag: "Resolved"; readonly candidate: Candidate }
  | { readonly tag: "Conflict"; readonly conflict: ResolutionConflict };

const nonEmpty = <T>(items: readonly T[]): NonEmpty<T> | undefined => {
  const [first, ...rest] = items;

  return first === undefined ? undefined : [first, ...rest];
};

const resolveGroup = (id: string, group: NonEmpty<Candidate>): GroupOutcome => {
  const [first, ...rest] = group;
  const candidates: NonEmpty<Candidate> = [first, ...rest];
  const undominated = candidates.filter(
    (candidate) =>
      !candidates.some(
        (other) => other !== candidate && dominates(other, candidate),
      ),
  );

  const [onlyUndominated] = undominated;

  if (undominated.length === 1 && onlyUndominated !== undefined) {
    return { tag: "Resolved", candidate: onlyUndominated };
  }

  const undominatedGroup = nonEmpty(undominated) ?? candidates;

  const allEqual = undominatedGroup.every((candidate, index) =>
    undominatedGroup
      .slice(index + 1)
      .every((other) => equalStrictness(candidate, other)),
  );

  if (!allEqual) {
    return {
      tag: "Conflict",
      conflict: conflictFor(id, "incomparable", candidates),
    };
  }

  const highestOrder = Math.max(
    ...undominatedGroup.map((candidate) => candidate.order),
  );
  const latest = undominatedGroup.filter(
    (candidate) => candidate.order === highestOrder,
  );
  const [onlyLatest] = latest;

  if (latest.length === 1 && onlyLatest !== undefined) {
    return { tag: "Resolved", candidate: onlyLatest };
  }

  const latestGroup = nonEmpty(latest) ?? candidates;

  return {
    tag: "Conflict",
    conflict: conflictFor(id, "same-layer", latestGroup),
  };
};

const groupById = (
  candidates: readonly Candidate[],
): ReadonlyMap<string, NonEmpty<Candidate>> => {
  const groups = new Map<string, Candidate[]>();

  for (const candidate of candidates) {
    const group = groups.get(candidate.id);

    if (group === undefined) {
      groups.set(candidate.id, [candidate]);
    } else {
      group.push(candidate);
    }
  }

  const result = new Map<string, NonEmpty<Candidate>>();

  for (const [id, items] of groups) {
    const group = nonEmpty(items);

    if (group !== undefined) result.set(id, group);
  }

  return result;
};

const uniqueModules = (
  standard: ValidatedStandard,
  selection: Selection,
  issues: ResolutionIssue[],
): readonly ModuleId[] => {
  const known = new Set(standard.modules.map((module) => module.id));
  const selected = new Set<ModuleId>();

  for (const module of selection.modules) {
    if (!known.has(module)) {
      issues.push({ tag: "UnknownModule", module });
      continue;
    }

    selected.add(module);
  }

  return [...selected].sort();
};

const uniqueOverlays = (
  standard: ValidatedStandard,
  selection: Selection,
  issues: ResolutionIssue[],
): readonly Overlay[] => {
  const known = new Map(
    standard.overlays.map((overlay) => [overlay.id, overlay]),
  );
  const selected = new Map<OverlayId, Overlay>();

  for (const overlayId of selection.overlays) {
    const overlay = known.get(overlayId);

    if (overlay === undefined) {
      issues.push({ tag: "UnknownOverlay", overlay: overlayId });
      continue;
    }

    selected.set(overlayId, overlay);
  }

  return [...selected.values()].sort((left, right) =>
    left.id.localeCompare(right.id),
  );
};

const checkProjectIds = (
  standard: ValidatedStandard,
  selection: Selection,
  issues: ResolutionIssue[],
): void => {
  const publicIds = new Set<string>();
  const projectIds = new Set<string>();

  for (const requirement of standard.requirements) {
    publicIds.add(requirement.id);
  }

  for (const module of standard.modules) {
    for (const requirement of module.requirements) {
      publicIds.add(requirement.id);
    }
  }

  for (const overlay of standard.overlays) {
    for (const requirement of overlay.adds) {
      publicIds.add(requirement.id);
    }
  }

  for (const addition of selection.project.adds) {
    if (addition.id.trim() === "") {
      issues.push({ tag: "InvalidProjectId", id: addition.id });
      continue;
    }

    if (publicIds.has(addition.id)) {
      issues.push({ tag: "ProjectIdCollision", id: addition.id });
      continue;
    }

    if (projectIds.has(addition.id)) {
      issues.push({ tag: "DuplicateProjectId", id: addition.id });
      continue;
    }

    projectIds.add(addition.id);
  }
};

const baseRequirementById = (
  standard: ValidatedStandard,
): ReadonlyMap<string, CoreRequirement | ModuleRequirement> => {
  const byId = new Map<string, CoreRequirement | ModuleRequirement>();

  for (const requirement of standard.requirements) {
    byId.set(requirement.id, requirement);
  }

  for (const module of standard.modules) {
    for (const requirement of module.requirements) {
      byId.set(requirement.id, requirement);
    }
  }

  return byId;
};

export const resolveStandard = (
  standard: ValidatedStandard,
  selection: Selection,
): Result<ResolvedStandard, readonly ResolutionIssue[]> => {
  const issues: ResolutionIssue[] = [];
  const modules = uniqueModules(standard, selection, issues);
  const overlays = uniqueOverlays(standard, selection, issues);

  checkProjectIds(standard, selection, issues);

  if (issues.length > 0) return err(issues);

  const moduleById = new Map(
    standard.modules.map((module) => [module.id, module]),
  );
  const baseById = baseRequirementById(standard);
  const overlayRequirementById = new Map<string, OverlayRequirement>();

  for (const overlay of standard.overlays) {
    for (const requirement of overlay.adds) {
      overlayRequirementById.set(requirement.id, requirement);
    }
  }

  const selectedModules = new Set<string>(modules);
  const selectedOverlays = new Set<string>(
    overlays.map((overlay) => overlay.id),
  );
  const candidates: Candidate[] = [];

  const addApplicable = (
    requirement: CoreRequirement | ModuleRequirement | OverlayRequirement,
    layer: ResolutionLayer,
  ): void => {
    if (
      !appliesTo(
        requirement.applicability,
        selection.tier,
        selectedModules,
        selectedOverlays,
      )
    ) {
      return;
    }

    candidates.push(candidateFrom(requirement, layer));
  };

  for (const requirement of standard.requirements) {
    addApplicable(requirement, "core");
  }

  for (const moduleId of modules) {
    const module = moduleById.get(moduleId);

    if (module === undefined) continue;

    for (const requirement of module.requirements) {
      addApplicable(requirement, "module");
    }
  }

  const addOverlay = (overlay: Overlay): void => {
    const layer = layerForOverlay(overlay);

    for (const requirement of overlay.adds) {
      addApplicable(requirement, layer);
    }

    for (const override of overlay.overrides) {
      const base = baseById.get(override.requirement);

      if (base === undefined) continue;

      candidates.push({
        id: override.requirement,
        sourceId: overlay.id,
        layer,
        order: LAYER_ORDER[layer],
        criticality: override.replacement.criticality,
        requiredMaturity: BASE_REQUIRED_MATURITY,
        evidenceMaxAgeDays: maxAgeDays(base.evidence),
        explicit: true,
        title: override.replacement.title,
        description: override.replacement.description,
      });
    }
  };

  for (const overlay of overlays) {
    if (overlay.type === "jurisdiction") addOverlay(overlay);
  }

  for (const overlay of overlays) {
    if (overlay.type === "industry") addOverlay(overlay);
  }

  for (const addition of selection.project.adds) {
    candidates.push({
      id: addition.replaces ?? addition.id,
      sourceId: addition.id,
      layer: "project",
      order: LAYER_ORDER.project,
      criticality: addition.criticality,
      requiredMaturity: addition.requiredMaturity,
      evidenceMaxAgeDays: maxAgeDays(addition.evidence),
      explicit: true,
      title: addition.title,
      description: addition.description,
    });
  }

  const appliedWaivers: AppliedWaiver[] = [];
  const waived = new Set<string>();

  const applyWaiver = (
    requirement: string,
    layer: ResolutionLayer,
    waiver: {
      readonly justification: string;
      readonly riskOwner: string;
      readonly expiresAt: IsoDate;
    },
  ): void => {
    const target =
      baseById.get(requirement) ?? overlayRequirementById.get(requirement);

    if (target === undefined) {
      issues.push({ tag: "UnresolvedWaiver", requirement });
      return;
    }

    if (target.criticality === "gate") {
      issues.push({ tag: "GateWaiver", requirement, layer });
      return;
    }

    waived.add(requirement);
    appliedWaivers.push({
      requirement: target.id,
      layer,
      justification: waiver.justification,
      riskOwner: waiver.riskOwner,
      expiresAt: waiver.expiresAt,
    });
  };

  for (const overlay of overlays) {
    for (const waiver of overlay.waives) {
      applyWaiver(waiver.requirement, layerForOverlay(overlay), waiver);
    }
  }

  for (const waiver of selection.project.waives) {
    applyWaiver(waiver.requirement, "project", waiver);
  }

  if (issues.length > 0) return err(issues);

  const resolved: ResolvedRequirement[] = [];
  const conflicts: ResolutionConflict[] = [];

  for (const [id, group] of groupById(candidates)) {
    if (waived.has(id)) continue;

    const outcome = resolveGroup(id, group);

    if (outcome.tag === "Conflict") {
      conflicts.push(outcome.conflict);
      continue;
    }

    resolved.push({
      id: outcome.candidate.id,
      sourceId: outcome.candidate.sourceId,
      layer: outcome.candidate.layer,
      criticality: outcome.candidate.criticality,
      requiredMaturity: outcome.candidate.requiredMaturity,
      evidenceMaxAgeDays: outcome.candidate.evidenceMaxAgeDays,
      title: outcome.candidate.title,
      description: outcome.candidate.description,
    });
  }

  return ok({
    profile: selection.profile,
    tier: selection.tier,
    modules,
    overlays: overlays.map((overlay) => overlay.id),
    requirements: resolved.sort((left, right) =>
      left.id.localeCompare(right.id),
    ),
    conflicts: conflicts.sort((left, right) => left.id.localeCompare(right.id)),
    waivers: appliedWaivers.sort((left, right) =>
      left.requirement.localeCompare(right.requirement),
    ),
  });
};
