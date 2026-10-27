import type { GuardFinding, GuardResult } from "./types.js";

export type GuardReportFinding = {
  readonly category: string;
  readonly rule_id: string;
  readonly file: string;
  readonly line: number;
  readonly reason: string;
  readonly preview: string;
};

export type GuardReport = {
  readonly version: 1;
  readonly tool: "sras-guard";
  readonly ok: boolean;
  readonly scanned: number;
  readonly excluded: number;
  readonly findings: readonly GuardReportFinding[];
};

const toReportFinding = (finding: GuardFinding): GuardReportFinding => ({
  category: finding.category,
  rule_id: finding.ruleId,
  file: finding.file,
  line: finding.line,
  reason: finding.reason,
  preview: finding.preview,
});

export const toGuardReport = (result: GuardResult): GuardReport => {
  const findings = [...result.findings]
    .sort(
      (left, right) =>
        left.file.localeCompare(right.file) ||
        left.line - right.line ||
        left.ruleId.localeCompare(right.ruleId),
    )
    .map(toReportFinding);

  return {
    version: 1,
    tool: "sras-guard",
    ok: findings.length === 0,
    scanned: result.scanned,
    excluded: result.skipped.length,
    findings,
  };
};

export const renderGuardJson = (report: GuardReport): string =>
  `${JSON.stringify(report, null, 2)}\n`;

export const renderGuardSummary = (report: GuardReport): string =>
  report.ok
    ? `guard passed: scanned ${String(report.scanned)} files; excluded ${String(report.excluded)}\n`
    : `guard failed: ${String(report.findings.length)} findings; scanned ${String(report.scanned)} files; excluded ${String(report.excluded)}\n`;

const escapeProperty = (value: string): string =>
  value
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .replace(/:/g, "%3A")
    .replace(/,/g, "%2C");

const escapeData = (value: string): string =>
  value.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");

export const renderGuardAnnotations = (report: GuardReport): string => {
  if (report.ok)
    return `::notice title=SRAS guard::${escapeData(renderGuardSummary(report).trim())}\n`;

  return `${report.findings
    .map((finding) => {
      const title = escapeProperty(`SRAS guard: ${finding.category}`);
      const message = escapeData(`${finding.reason} (${finding.rule_id})`);

      return `::error file=${escapeProperty(finding.file)},line=${String(finding.line)},title=${title}::${message}`;
    })
    .join("\n")}\n`;
};
