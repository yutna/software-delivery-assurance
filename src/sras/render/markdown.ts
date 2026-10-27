import type { ProjectInstance } from "../project/types.js";
import type {
  CoreRequirement,
  EvidenceExpectation,
  LocalizedText,
  ModuleRequirement,
  Overlay,
  RegisterEntry,
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
): string => {
  const lines = [
    `### ${requirement.id} — ${clean(requirement.title.en)}`,
    "",
    localized(requirement.description),
    "",
    `- Criticality: ${code(requirement.criticality)}`,
    `- Status: ${code(requirement.status)}`,
    "",
    "Evidence:",
    "",
    requirement.evidence.map(evidenceLine).join("\n"),
  ];

  return lines.join("\n");
};

export const renderOverlayPage = (overlay: Overlay): RenderPage => {
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
      : overlay.adds.map(overlayRequirementSection).join("\n\n"),
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

  return [
    renderIndexPage(standard),
    ...requirements.map(renderRequirementPage),
    ...overlays.map(renderOverlayPage),
    ...registers.map(renderRegisterPage),
  ].sort((left, right) =>
    left.path < right.path ? -1 : left.path > right.path ? 1 : 0,
  );
};
