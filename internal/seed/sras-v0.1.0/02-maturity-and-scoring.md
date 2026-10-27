# 02 — Maturity and Scoring

**Parent:** `README.md`  
**Version:** v0.1.0

---

## 1. Maturity levels

Every applicable item is scored from **L0 to L4**. The level must be supported by evidence. A document alone proves documentation, not implementation.

| Level | Name | General definition | Minimum evidence expectation |
|---|---|---|---|
| **L0** | Absent | No practice, no artefact, or no awareness of the requirement. | None, or a documented gap. |
| **L1** | Documented | A policy, design, procedure, or plan exists, but implementation is incomplete, inconsistent, or unverified. | Approved document with owner and date. |
| **L2** | Implemented | The practice is in place in the current release or operating environment and can be demonstrated. | Configuration, screenshot, test result, ticket, or operating record. |
| **L3** | Measured | The practice is monitored or measured, reviewed regularly, and shown to work against defined criteria. | Metric, dashboard, audit result, trend, or review record. |
| **L4** | Optimized / independently validated | The practice is automated, continuously improved, benchmarked, or independently validated. | Automation evidence, benchmark, external audit, or independent assessment. |

### Important distinctions

- **L1 is not “done”.** It means the intent exists.
- **L2 is the minimum for a Gate item.**
- **L3 requires measurement**, not just a dashboard that nobody reviews.
- **L4 is not required for client-ready status.** It is a differentiator.
- A higher level does not excuse a lower-level failure elsewhere.

---

## 2. Criticality

| Criticality | Weight | Meaning | Typical examples |
|---|---:|---|---|
| **G — Gate** | 5 | Mandatory for a production or client-facing product. Failure blocks client-ready status. | Authentication, secrets, encryption, data inventory, backup/restore, incident response, rollback, monitoring |
| **H — High** | 3 | Required for products with sensitive data, external users, material business impact, or significant scale. | Threat modelling, DR testing, load testing, audit logs, support SLA |
| **M — Medium** | 2 | Expected good practice; may be phased with an approved plan. | Accessibility testing, cost reviews, platform support matrix |
| **L — Low** | 1 | Differentiator or maturity improvement. | Advanced automation, optimization, optional certifications |

Criticality is assigned in the checklist. It may be raised by a customer, regulator, or risk assessment. It may be lowered only with documented approval and a compensating control.

Some checklist items show a **conditional criticality**, for example “H; G if personal data”. The assessor must resolve it to one value before scoring. If the condition applies, the higher criticality is used.

---

## 3. The Gate rule

> **Any applicable Gate item below L2 means the product is not client-ready.**

This rule is intentionally absolute. A failed Gate cannot be averaged away.

Examples of Gate failures:

- authentication is not enforced on an internal API;
- secrets are stored in a repository;
- backup exists but restore has never been tested;
- an alert exists but has no owner or runbook;
- a rollback plan has never been exercised;
- production data is used in a test environment without controls;
- a critical data flow has no owner or classification.

Gate items marked `N/A` require explicit approval from security and operations. The rationale must be recorded.

---

## 4. Applicability and N/A

### Applicable

An item is applicable if the product has the relevant characteristic. For example:

- `CHG-06` database migration safety applies to products with a database.
- `04-ai-extension` applies to products with AI/ML features.
- `08-on-prem-extension` applies to customer-hosted or on-premises deployments.

### N/A

An item may be marked `N/A` only when:

1. the product clearly does not have the relevant characteristic;
2. the rationale is written down;
3. the assessor reviews it;
4. the approver signs it off.

N/A items are excluded from the score denominator. They are **not** treated as passed, and they cannot be used as positive claims.

### Conditional applicability

Some items are conditional. The checklist uses notes such as:

- “G if personal data is processed”
- “G if the product makes or informs a consequential decision”
- “H for T1, G for T2/T3”

The assessor records the condition and the resulting criticality.

---

## 5. Readiness Index

### Formula

For all applicable items:

```text
Readiness Index =
  Σ (criticality weight × maturity level)
  ─────────────────────────────────────────── × 100
  Σ (criticality weight × 4)
```

Weights:

```text
G = 5
H = 3
M = 2
L = 1
```

The index is a **0–100** number. It measures maturity across applicable items. It does not override Gates.

### Worked example

| Item | Criticality | Weight | Level | Weighted score |
|---|---|---:|---:|---:|
| G-01 | G | 5 | 2 | 10 |
| G-02 | G | 5 | 3 | 15 |
| H-01 | H | 3 | 2 | 6 |
| M-01 | M | 2 | 1 | 2 |
| **Total** | | **15** | | **33** |

Maximum possible = `15 × 4 = 60`  
Readiness Index = `33 ÷ 60 × 100 = 55`

Even though one Gate is at L3, another Gate is only at L2 and the index is below the client-ready threshold. The product is **not client-ready**.

### Gate-first example

| Item | Criticality | Level | Result |
|---|---|---:|---|
| G-01 | G | 2 | Pass |
| G-02 | G | 1 | **Fail** |
| H-01 | H | 3 | Pass |
| M-01 | M | 3 | Pass |
| Index | | | 72 |

Result: **Not client-ready**, because `G-02` is below L2. The index is irrelevant until the Gate is fixed.

---

## 6. Evidence Coverage

```text
Evidence Coverage =
  Number of claimed items with current, accepted evidence
  ────────────────────────────────────────────────────── × 100
  Number of claimed items
```

Rules:

- A claimed item is any item scored **L2 or above**.
- Evidence must meet the quality and freshness rules in `09-evidence-standard.md`.
- Expired evidence does not count.
- “We have a policy” may be evidence for L1, but not for L2 implementation.
- Evidence Coverage is reported separately from the Readiness Index.

---

## 7. Readiness status

| Status | Criteria | What it means |
|---|---|---|
| **Not assessed** | No completed assessment | Cannot be claimed or compared |
| **Not ready** | Any applicable Gate below L2, or index below 50, or an open critical risk | Do not release to customers; do not claim readiness |
| **Conditional** | All Gates at L2+, but index 50–69, or evidence coverage 60–79, or medium gaps with an approved plan | May proceed only with documented conditions, owner, and due date |
| **Client-ready** | All Gates at L2+, index ≥ 70, evidence coverage ≥ 80, no unaccepted critical/high risk | Eligible for customer delivery and verified claims |
| **Differentiator** | Client-ready plus index ≥ 85, evidence coverage ≥ 90, at least five High items at L3+, and independent review where required | Eligible for differentiated positioning and advanced claims |

### Internal release rule (T1)

A T1 internal product may be released internally when:

- all applicable Gate items are at L2 or above;
- index ≥ 60;
- evidence coverage ≥ 70;
- no unaccepted critical risk.

It must not be described as **client-ready** or used as a customer-facing proof point until it meets the full client-ready thresholds.

---

## 8. Claim status

Every customer-facing statement derived from SRAS must have a claim status.

| Status | Meaning | Allowed use |
|---|---|---|
| **Verified** | L2+ with current, accepted evidence; claim approved | May be used in proposals, sales, and assurance packs |
| **Partial** | Some evidence exists but does not support the full claim | May be used only with an explicit roadmap, owner, and date; never as “done” |
| **Not claimed** | No verified evidence, or the claim is intentionally withheld | Do not use |
| **N/A** | Requirement does not apply | Do not use as a positive claim |
| **Expired** | Evidence is past its freshness date or the product changed materially | Do not use until revalidated |

Claim rules are detailed in `11-claim-and-sales-guide.md`.

---

## 9. Thresholds summary

| Threshold | Client-ready | Differentiator |
|---|---:|---:|
| All applicable Gates | ≥ L2 | ≥ L2 |
| Readiness Index | ≥ 70 | ≥ 85 |
| Evidence Coverage | ≥ 80% | ≥ 90% |
| Open critical/high risks | None unaccepted | None unaccepted |
| High items at L3+ | Not required | At least 5 in customer-relevant domains |
| Independent review | Recommended for T2; required for T3 | Required where applicable |

Thresholds are defaults. A customer, regulator, or executive risk owner may require stricter thresholds. They may not require weaker ones without formal risk acceptance.

---

## 10. Anti-gaming rules

The assessment is only useful if it is honest.

1. **No score without evidence.** A self-declared score is not evidence.
2. **Gate items are sampled at 100%.** The assessor reviews evidence for every Gate.
3. **Non-Gate items are sampled.** At least 20–30% or one item per domain, whichever is greater.
4. **No self-attested L3.** L3 requires a metric, audit, or review record.
5. **A policy is not implementation.** Use it for L1, not L2.
6. **No averaging away a Gate failure.** Gate status is reported separately.
7. **No N/A without approval.** An N/A is not a pass.
8. **No stale evidence.** Revalidate after a material change.
9. **No borrowing evidence from another product.** Shared controls may be referenced only if the assessor confirms they apply.
10. **No “certified” or “compliant” language** unless a recognized third party has issued the certification or opinion.

---

## 11. Reassessment triggers

Reassess the relevant items when:

- a major release changes architecture, data flow, authentication, or dependencies;
- a new customer segment or jurisdiction is targeted;
- a new deployment model is introduced;
- a material incident or near miss occurs;
- a new AI model, prompt, or data source is introduced;
- a critical vendor or subprocessor changes;
- a Gate item’s evidence expires;
- at least quarterly for active products.

The assessment record must show the version, date, assessor, and scope.

---

## 12. Assessment sheet fields

At minimum, the working assessment sheet should include:

| Field | Purpose |
|---|---|
| `ID` | Stable checklist ID |
| `Requirement` | Short requirement statement |
| `Criticality` | G / H / M / L |
| `Tier applicability` | T1 / T2 / T3 or condition |
| `Applicable?` | Yes / No / N/A |
| `Level` | 0–4 |
| `Evidence IDs` | Links to the evidence index |
| `Evidence status` | Current / Expired / Missing |
| `Owner` | Accountable person |
| `Gap / action` | What is missing |
| `Due date` | Remediation date |
| `Reviewer` | Assessor or peer reviewer |
| `Notes` | Deviations, risk acceptance, conditions |

Use the template in `12-templates.md`.

---

## 13. Reporting

At the end of an assessment, produce:

1. **Scorecard** — index, Gate status, evidence coverage, by domain.
2. **Gate report** — every Gate item and its evidence.
3. **Gap/risk register** — owner, action, due date, severity.
4. **Claim register** — what can be said, with evidence IDs.
5. **Customer assurance summary** — a short external-facing summary.
6. **Sign-off record** — assessor, approver, date, scope, version.

A score without a Gate report and an evidence index is not a completed assessment.
