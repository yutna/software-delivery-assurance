# 10 — Assessment Process

**Parent:** `README.md`  
**Version:** v0.1.0

---

## 1. Purpose

This document defines how to run an SRAS assessment consistently: who does what, in what order, and what must be produced.

The process is designed to be lightweight enough for a product team and rigorous enough for a customer or bid review.

---

## 2. Assessment workflow

### Step 0 — Initiate

Record:

- product name and version;
- assessment scope and boundaries;
- proposed tier (T1/T2/T3);
- selected optional modules;
- product owner and assessment sponsor;
- assessor and approver;
- target date and reason for assessment (release, bid, customer request, incident, annual review).

**Output:** assessment charter or one-page scope note.

### Step 1 — Prepare

- Gather existing documentation, diagrams, test reports, and operational records.
- Create the assessment sheet from `12-templates.md`.
- Create the evidence index.
- Assign evidence owners for each domain.
- Confirm the confidentiality rules for evidence.

**Output:** draft assessment sheet and evidence index.

### Step 2 — Self-assess

The product team scores each applicable item from L0 to L4 and attaches evidence.

Rules:

- Do not score L2 or above without evidence.
- Mark N/A only with a rationale.
- Record gaps honestly; a gap is not a failure of the assessment.
- Do not inflate scores to hit a target.

**Output:** self-assessment with evidence links and initial gaps.

### Step 3 — Review evidence

The assessor:

- reviews all Gate evidence;
- samples High, Medium, and Low evidence;
- checks freshness, relevance, and confidentiality;
- challenges unsupported claims;
- records rejected or missing evidence;
- may request a demonstration or walkthrough.

**Output:** evidence review notes and revised scores.

### Step 4 — Gate review

Hold a Gate review before calculating the final index.

For every Gate item:

- confirm applicability;
- confirm L2 or above;
- confirm evidence is current and accepted;
- record any N/A approval;
- record any risk acceptance.

If any Gate fails, the product is **not client-ready**. The team may proceed with a remediation plan, but it cannot claim readiness.

**Output:** Gate report with pass/fail and evidence references.

### Step 5 — Score and analyse

- Calculate the Readiness Index.
- Calculate Evidence Coverage.
- Summarize results by domain.
- Identify concentration of risk.
- Identify quick wins and structural gaps.
- Compare with the previous assessment, if any.

**Output:** scorecard and gap analysis.

### Step 6 — Build the gap and risk register

For each gap:

- severity (critical, high, medium, low);
- affected items and domains;
- root cause;
- remediation action;
- owner;
- due date;
- dependency or decision needed;
- residual risk if not fixed;
- acceptance route.

**Output:** gap/risk register.

### Step 7 — Remediate or accept risk

The team either:

- fixes the gap and provides evidence, or
- requests formal risk acceptance.

Risk acceptance must record:

- the risk and affected items;
- why it cannot be fixed now;
- compensating controls;
- residual risk;
- approver;
- expiry/review date;
- customer communication, if any.

Risk acceptance is not a substitute for a Gate. A Gate can be accepted only through the formal exception process and must be disclosed appropriately.

**Output:** updated evidence, or signed risk acceptance.

### Step 8 — Sign off

Sign-off confirms that:

- the assessment scope and tier are correct;
- Gate status is accurate;
- evidence is sufficient for the claimed levels;
- gaps and risks are recorded;
- claims are consistent with evidence;
- the assessment version is recorded.

Sign-off roles:

| Role | Sign-off responsibility |
|---|---|
| Product owner | Scope, customer commitments, claim approval |
| Engineering lead | Technical accuracy and remediation plan |
| Security lead | Security and incident evidence |
| Privacy/legal | Data, privacy, and regulatory evidence |
| Operations/SRE | Monitoring, backup, DR, support readiness |
| Assessor | Process integrity and evidence review |
| Approver | Residual risk and final readiness decision |

**Output:** signed assessment record.

### Step 9 — Publish and communicate

Produce:

- internal scorecard;
- customer assurance summary;
- claim register;
- evidence pack (approved items only);
- gap/roadmap summary.

Communication rules are in `11-claim-and-sales-guide.md`.

### Step 10 — Reassess

Schedule reassessment:

- quarterly for active products;
- before each major release;
- after a material incident;
- after a significant architecture, data, vendor, or model change;
- when evidence expires.

---

## 3. Suggested timeline

| Phase | Typical duration | Notes |
|---|---:|---|
| Initiate and prepare | 1–3 days | Scope, tier, evidence owners |
| Self-assessment | 3–10 days | Depends on product size and existing evidence |
| Evidence review | 2–5 days | Gate evidence may take longer |
| Gate review | 1 day | Stop if a Gate fails |
| Scoring and gap analysis | 1–2 days | Can be automated with a spreadsheet |
| Remediation | Days to months | Depends on gaps |
| Sign-off | 1 day | Schedule all approvers |
| Customer pack | 1–3 days | Legal/security review may add time |

A bid deadline is not a reason to skip evidence review. If time is short, reduce scope explicitly and state what was not assessed.

---

## 4. Roles and independence

- **T1:** self-assessment plus peer review is acceptable.
- **T2:** an independent reviewer from another team is recommended.
- **T3:** an independent assessor is required; specialist security/privacy review is expected.
- **Conflict of interest:** the person who built the feature should not be the sole approver of its Gate evidence.
- **Continuity:** keep assessment records so a new assessor can understand prior decisions.

---

## 5. Risk acceptance

Risk acceptance is a controlled decision, not a verbal agreement.

Minimum fields:

| Field | Description |
|---|---|
| Risk ID | Stable identifier |
| Related items | Checklist IDs affected |
| Description | What could happen and why |
| Likelihood | Qualitative or quantitative |
| Impact | Qualitative or quantitative |
| Compensating controls | What reduces the risk now |
| Residual risk | What remains after controls |
| Approver | Named role/person |
| Date | Decision date |
| Expiry | When the acceptance must be reviewed |
| Customer disclosure | What will be communicated |

Risk acceptance should be time-bound. “Accepted forever” is not a control.

---

## 6. Common failure modes

| Failure | Prevention |
|---|---|
| Scoring without evidence | Require an evidence ID for every L2+ score |
| Gate failure hidden by a high average | Report Gate status separately |
| Policy treated as implementation | Require an operating record or configuration |
| Stale evidence | Apply freshness rules and revalidate after change |
| N/A used to avoid work | Require rationale and approver |
| Assessor too close to the team | Independent assessor for T3 |
| Last-minute evidence scramble | Collect evidence during normal delivery |
| Claims outrunning evidence | Claim register and legal/security review |
| Assessment not repeated | Schedule reassessment triggers |
| Too many items at once | Tier and module scoping; phase remediation |

---

## 7. Assessment record

Keep at least:

- assessment charter/scope;
- tier and module selection;
- assessment sheet;
- evidence index;
- Gate report;
- scorecard;
- gap/risk register;
- risk acceptances;
- sign-off record;
- customer assurance summary and claim register versions.

The record should be versioned and retained according to the organisation’s audit and contract requirements.
