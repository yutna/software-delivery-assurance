import type { ProjectInstance } from "../project/types.js";
import type {
  AssessmentGuidance,
  CoreRequirement,
  Crosswalk,
  CrosswalkMapping,
  EvidenceExpectation,
  LocalizedText,
  ModuleRequirement,
  Overlay,
  RegisterEntry,
  RequirementReference,
  ValidatedStandard,
} from "../standard/types.js";
import type { RenderPage } from "./types.js";

const NONE = "none";

const clean = (value: string): string => value.replace(/[ \t]+/g, " ").trim();

const code = (value: string): string => `\`${value}\``;

const joinValues = (values: readonly string[]): string =>
  values.length === 0 ? NONE : values.join(", ");

const bullets = (values: readonly string[]): string =>
  values.length === 0
    ? `- ${NONE}`
    : values.map((value) => `- ${value}`).join("\n");

const localized = (text: LocalizedText): string => {
  const en = clean(text.en);
  const th = clean(text.th);
  return th === "" ? en : `${en}\n\n**Thai:** ${th}`;
};

const requirementTitle = (
  requirement: CoreRequirement | ModuleRequirement,
): string => `# ${requirement.id} — ${clean(requirement.title.en)}`;

const evidenceLine = (evidence: EvidenceExpectation): string =>
  `- **${evidence.type}** (max ${String(evidence.maxAgeDays)} days): ${evidence.description}`;

const assessmentLines = (assessment: AssessmentGuidance): string =>
  [
    `- Lite pass: ${clean(assessment.lite.pass)}`,
    `- Lite partial: ${clean(assessment.lite.partial)}`,
    `- Full L2: ${clean(assessment.full.l2)}`,
    `- Full L3: ${clean(assessment.full.l3)}`,
  ].join("\n");

const referenceLine = (reference: RequirementReference): string =>
  `- [${reference.title}](${reference.url}) — ${code(reference.type)}`;

const referenceLines = (references: readonly RequirementReference[]): string =>
  references.length === 0
    ? `- ${NONE}`
    : references.map(referenceLine).join("\n");

const crosswalkLines = (
  requirementId: string,
  crosswalks: readonly Crosswalk[],
): string => {
  const lines: string[] = [];

  for (const crosswalk of [...crosswalks].sort(byId)) {
    for (const mapping of crosswalk.mappings) {
      if (mapping.requirement !== requirementId) continue;

      const notes = mapping.notes === null ? "" : ` — ${clean(mapping.notes)}`;
      lines.push(
        `- [${crosswalk.id} — ${clean(crosswalk.title.en)}](../crosswalks/${crosswalk.id}.md): ${code(mapping.external)} (${mapping.relationship})${notes}`,
      );
    }
  }

  return lines.length === 0 ? `- ${NONE}` : lines.join("\n");
};

const reviewLines = (
  reviewedBy: string | null,
  reviewedAt: string | null,
  reviewScope: string | null,
): string => {
  const lines = [`- Reviewed by: ${reviewedBy ?? "not recorded"}`];

  if (reviewedAt !== null) lines.push(`- Reviewed at: ${reviewedAt}`);
  if (reviewScope !== null) lines.push(`- Review scope: ${reviewScope}`);

  return lines.join("\n");
};

const translationLines = (
  machineTranslated: boolean,
  reviewedBy: string | null,
  reviewedAt: string | null,
): string => {
  const lines = [`- Machine translated: ${machineTranslated ? "yes" : "no"}`];

  if (reviewedBy !== null)
    lines.push(`- Translation reviewed by: ${reviewedBy}`);
  if (reviewedAt !== null)
    lines.push(`- Translation reviewed at: ${reviewedAt}`);

  return lines.join("\n");
};

export const renderRequirementPage = (
  requirement: CoreRequirement | ModuleRequirement,
  crosswalks: readonly Crosswalk[] = [],
): RenderPage => {
  const lines: string[] = [requirementTitle(requirement), ""];

  if (requirement.tag === "CoreRequirement") {
    lines.push(`- Domain: ${code(requirement.domain)}`);
  } else {
    lines.push(`- Module: ${code(requirement.module)}`);
  }

  lines.push(
    `- Criticality: ${code(requirement.criticality)}`,
    `- Status: ${code(requirement.status)}`,
    `- Introduced in: ${code(requirement.introducedIn)}`,
    `- Deprecated in: ${requirement.deprecatedIn === null ? "not deprecated" : code(requirement.deprecatedIn)}`,
    `- Replaced by: ${requirement.replacedBy === null ? NONE : code(requirement.replacedBy)}`,
    `- Review status: ${code(requirement.reviewStatus)}`,
    `- Translation status: ${code(requirement.translationStatus)}`,
    `- Source: ${code(requirement.sourceFile)}`,
    "",
    "## Description",
    "",
    localized(requirement.description),
    "",
    "## Rationale",
    "",
    localized(requirement.rationale),
    "",
    "## Applicability",
    "",
    `- Tiers: ${joinValues(requirement.applicability.tiers.map(String))}`,
    `- Modules: ${joinValues(requirement.applicability.modules)}`,
    `- Overlays: ${joinValues(requirement.applicability.overlays)}`,
    `- Excludes: ${joinValues(requirement.applicability.excludes)}`,
    "",
    "## Evidence",
    "",
    requirement.evidence.map(evidenceLine).join("\n"),
    "",
    "## Assessment",
    "",
    assessmentLines(requirement.assessment),
    "",
    "## References",
    "",
    referenceLines(requirement.references),
    "",
    "## Crosswalks",
    "",
    crosswalkLines(requirement.id, crosswalks),
    "",
    "## Review",
    "",
    reviewLines(
      requirement.reviewedBy,
      requirement.reviewedAt,
      requirement.reviewScope,
    ),
    "",
    "## Translation",
    "",
    translationLines(
      requirement.machineTranslated,
      requirement.translationReviewedBy,
      requirement.translationReviewedAt,
    ),
    "",
  );

  return {
    path: `requirements/${requirement.id}.md`,
    text: lines.join("\n"),
  };
};

const overlayRequirementSection = (
  requirement: Overlay["adds"][number],
  crosswalks: readonly Crosswalk[],
): string => {
  const lines = [
    `### ${requirement.id} — ${clean(requirement.title.en)}`,
    "",
    localized(requirement.description),
    "",
    "Rationale:",
    "",
    localized(requirement.rationale),
    "",
    `- Criticality: ${code(requirement.criticality)}`,
    `- Status: ${code(requirement.status)}`,
    "",
    "Assessment:",
    "",
    assessmentLines(requirement.assessment),
    "",
    "Evidence:",
    "",
    requirement.evidence.map(evidenceLine).join("\n"),
    "",
    "References:",
    "",
    referenceLines(requirement.references),
    "",
    "Crosswalks:",
    "",
    crosswalkLines(requirement.id, crosswalks),
  ];

  return lines.join("\n");
};

export const renderOverlayPage = (
  overlay: Overlay,
  crosswalks: readonly Crosswalk[] = [],
): RenderPage => {
  const lines: string[] = [
    `# ${overlay.id} — ${clean(overlay.title.en)}`,
    "",
    `- Type: ${code(overlay.type)}`,
    `- Jurisdiction: ${code(overlay.jurisdiction)}`,
    `- Industry: ${overlay.industry === null ? NONE : code(overlay.industry)}`,
    `- Version: ${code(overlay.version)}`,
    `- Extends: ${code(overlay.extends)}`,
    `- Requires: ${joinValues(overlay.requires)}`,
    `- Review status: ${code(overlay.reviewStatus)}`,
    `- Translation status: ${code(overlay.translationStatus)}`,
    `- Source: ${code(overlay.sourceFile)}`,
    "",
    "## Description",
    "",
    localized(overlay.description),
    "",
    "## Adds",
    "",
    overlay.adds.length === 0
      ? NONE
      : overlay.adds
          .map((requirement) =>
            overlayRequirementSection(requirement, crosswalks),
          )
          .join("\n\n"),
    "",
    "## Overrides",
    "",
    bullets(
      overlay.overrides.map(
        (override) =>
          `${code(override.requirement)}: ${override.replacement.title.en} — ${override.rationale}`,
      ),
    ),
    "",
    "## Waivers",
    "",
    bullets(
      overlay.waives.map(
        (waiver) =>
          `${code(waiver.requirement)}: ${waiver.justification} (owner: ${waiver.riskOwner}, expires: ${waiver.expiresAt})`,
      ),
    ),
    "",
    "## Sources",
    "",
    bullets(overlay.sources.map(code)),
    "",
    "## Not covered",
    "",
    localized(overlay.notCovered),
    "",
    "## Review checklist",
    "",
    overlay.reviewChecklist,
    "",
    "## Review",
    "",
    reviewLines(overlay.reviewedBy, overlay.reviewedAt, overlay.reviewScope),
    "",
    "## Translation",
    "",
    translationLines(
      overlay.machineTranslated,
      overlay.translationReviewedBy,
      overlay.translationReviewedAt,
    ),
    "",
  ];

  return {
    path: `overlays/${overlay.id}.md`,
    text: lines.join("\n"),
  };
};

const crosswalkMappingLine = (mapping: CrosswalkMapping): string => {
  const notes = mapping.notes === null ? "" : ` — ${clean(mapping.notes)}`;

  return `- ${code(mapping.requirement)} — ${code(mapping.external)} (${mapping.relationship})${notes}`;
};

const byCrosswalkMapping = (
  left: CrosswalkMapping,
  right: CrosswalkMapping,
): number => {
  if (left.requirement !== right.requirement) {
    return left.requirement < right.requirement ? -1 : 1;
  }

  return left.external < right.external
    ? -1
    : left.external > right.external
      ? 1
      : 0;
};

export const renderCrosswalkPage = (crosswalk: Crosswalk): RenderPage => {
  const mappings = [...crosswalk.mappings].sort(byCrosswalkMapping);
  const lines: string[] = [
    `# ${crosswalk.id} — ${clean(crosswalk.title.en)}`,
    "",
    `- Version: ${code(crosswalk.version)}`,
    `- Source standard: ${crosswalk.sourceStandard}`,
    `- Source URL: [${crosswalk.sourceUrl}](${crosswalk.sourceUrl})`,
    `- Status: ${code(crosswalk.status)}`,
    `- Deprecated in: ${crosswalk.deprecatedIn === null ? "not deprecated" : code(crosswalk.deprecatedIn)}`,
    `- Replaced by: ${crosswalk.replacedBy === null ? NONE : code(crosswalk.replacedBy)}`,
    `- Review status: ${code(crosswalk.reviewStatus)}`,
    `- Translation status: ${code(crosswalk.translationStatus)}`,
    `- Source: ${code(crosswalk.sourceFile)}`,
    "",
    "## Description",
    "",
    localized(crosswalk.description),
    "",
    "This crosswalk is informative. It is not an equivalence, a certification, or a compliance claim.",
    "",
    "## Mappings",
    "",
    mappings.map(crosswalkMappingLine).join("\n"),
    "",
    "## Review",
    "",
    reviewLines(
      crosswalk.reviewedBy,
      crosswalk.reviewedAt,
      crosswalk.reviewScope,
    ),
    "",
    "## Translation",
    "",
    translationLines(
      crosswalk.machineTranslated,
      crosswalk.translationReviewedBy,
      crosswalk.translationReviewedAt,
    ),
    "",
  ];

  return {
    path: `crosswalks/${crosswalk.id}.md`,
    text: lines.join("\n"),
  };
};

export const renderRegisterPage = (entry: RegisterEntry): RenderPage => {
  const lines: string[] = [
    `# ${entry.id} — ${clean(entry.instrument)}`,
    "",
    `- Jurisdiction: ${code(entry.jurisdiction)}`,
    `- Instrument type: ${code(entry.instrumentType)}`,
    `- Regulator: ${entry.regulator}`,
    `- Status: ${code(entry.registerStatus)}`,
    `- Effective date: ${entry.effectiveDate ?? "not recorded"}`,
    `- Revision: ${code(entry.revision)}`,
    `- Last verified: ${entry.lastVerified}`,
    `- Review due: ${entry.reviewDue}`,
    `- Review status: ${code(entry.reviewStatus)}`,
    `- Translation status: ${code(entry.translationStatus)}`,
    `- Source: [${entry.sourceUrl}](${entry.sourceUrl})`,
    "",
    "## Summary",
    "",
    localized(entry.summary),
    "",
    "## Obligations",
    "",
    entry.obligations
      .map(
        (obligation, index) =>
          `${String(index + 1)}. ${clean(obligation.en)}\n\n   **Thai:** ${clean(obligation.th)}`,
      )
      .join("\n\n"),
    "",
    "## Mapped requirements",
    "",
    bullets(entry.mappedRequirements.map(code)),
    "",
    "## Applies to",
    "",
    `- Sectors: ${joinValues(entry.appliesTo.sectors)}`,
    `- Roles: ${joinValues(entry.appliesTo.roles)}`,
    `- Data types: ${joinValues(entry.appliesTo.dataTypes)}`,
    "",
    "## Notes",
    "",
    localized(entry.notes),
    "",
    "## Review",
    "",
    reviewLines(entry.reviewedBy, entry.reviewedAt, entry.reviewScope),
    "",
    "## Translation",
    "",
    translationLines(
      entry.machineTranslated,
      entry.translationReviewedBy,
      entry.translationReviewedAt,
    ),
    "",
  ];

  return {
    path: `registers/${entry.id}.md`,
    text: lines.join("\n"),
  };
};

const byId = (
  left: { readonly id: string },
  right: { readonly id: string },
): number => (left.id < right.id ? -1 : left.id > right.id ? 1 : 0);

export const renderIndexPage = (standard: ValidatedStandard): RenderPage => {
  const requirements = [
    ...standard.requirements,
    ...standard.modules.flatMap((module) => module.requirements),
  ].sort(byId);
  const overlays = [...standard.overlays].sort(byId);
  const registers = [...standard.registers].sort(byId);
  const crosswalks = [...standard.crosswalks].sort(byId);

  const lines: string[] = [
    "# SRAS reference",
    "",
    "Reference pages generated from the SRAS standard. Do not edit by hand;",
    "run `npm run sras -- render`.",
    "",
    "## Requirements",
    "",
    ...requirements.map(
      (requirement) =>
        `- [${requirement.id} — ${clean(requirement.title.en)}](requirements/${requirement.id}.md)`,
    ),
    "",
    "## Overlays",
    "",
    ...overlays.map(
      (overlay) =>
        `- [${overlay.id} — ${clean(overlay.title.en)}](overlays/${overlay.id}.md)`,
    ),
    "",
    "## Registers",
    "",
    ...registers.map(
      (entry) =>
        `- [${entry.id} — ${clean(entry.instrument)}](registers/${entry.id}.md)`,
    ),
    "",
    "## Crosswalks",
    "",
    ...(crosswalks.length === 0
      ? [`- ${NONE}`]
      : crosswalks.map(
          (crosswalk) =>
            `- [${crosswalk.id} — ${clean(crosswalk.title.en)}](crosswalks/${crosswalk.id}.md)`,
        )),
    "",
  ];

  return { path: "index.md", text: lines.join("\n") };
};

export const renderProjectReadme = (instance: ProjectInstance): string => {
  const { manifest, assessment, lock } = instance;
  const index =
    assessment.summary.index === null
      ? "not used"
      : String(assessment.summary.index);

  return [
    `# ${manifest.project.name}`,
    "",
    clean(manifest.project.description),
    "",
    `- Owner: ${manifest.project.owner}`,
    `- Confidentiality: ${code(manifest.project.confidentiality)}`,
    `- SRAS version: ${code(manifest.srasVersion)}`,
    `- Profile: ${code(manifest.profile)}`,
    `- Tier: ${String(manifest.tier)}`,
    `- Modules: ${joinValues(manifest.modules)}`,
    `- Overlays: ${joinValues(manifest.overlays)}`,
    `- Assessed at: ${assessment.assessedAt}`,
    `- Assessor: ${assessment.assessor}`,
    "",
    "## Assessment",
    "",
    `- Requirements assessed: ${String(assessment.requirements.length)}`,
    `- Gates: ${String(assessment.gates.pass)} passed, ${String(assessment.gates.fail)} failed`,
    `- Summary index: ${index}`,
    "",
    "## Lockfile",
    "",
    `- Checksum: ${code(lock.sras.checksum)}`,
    `- Inputs: ${String(lock.inputs.length)}`,
    "",
    "## Files",
    "",
    "- `assurance.yaml` — project identity and selection",
    "- `assessment.yaml` — assessment of the selected requirements",
    "- `evidence-index.yaml` — private evidence index",
    "- `claims.yaml` — allowed and prohibited claim wording",
    "- `risk-register.yaml` — gaps and risks with owners and due dates",
    "- `assurance.lock.yaml` — pinned standard inputs and checksum",
    "",
    "## Limitations",
    "",
    bullets(assessment.limitations),
    "",
  ].join("\n");
};

export const renderStandard = (
  standard: ValidatedStandard,
): readonly RenderPage[] => {
  const requirements = [
    ...standard.requirements,
    ...standard.modules.flatMap((module) => module.requirements),
  ].sort(byId);
  const overlays = [...standard.overlays].sort(byId);
  const registers = [...standard.registers].sort(byId);
  const crosswalks = [...standard.crosswalks].sort(byId);

  return [
    renderIndexPage(standard),
    ...requirements.map((requirement) =>
      renderRequirementPage(requirement, crosswalks),
    ),
    ...overlays.map((overlay) => renderOverlayPage(overlay, crosswalks)),
    ...crosswalks.map(renderCrosswalkPage),
    ...registers.map(renderRegisterPage),
  ].sort((left, right) =>
    left.path < right.path ? -1 : left.path > right.path ? 1 : 0,
  );
};
