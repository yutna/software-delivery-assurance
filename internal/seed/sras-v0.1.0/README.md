# Software Readiness & Assurance Standard (SRAS)

**Version:** v0.1.0  
**Status:** Draft for internal adoption  
**Last updated:** 2026-10-22  
**Owner:** Engineering / Architecture / Security / Operations  

> มาตรฐานกลางสำหรับวัดความพร้อมของซอฟต์แวร์ — เชิงหลักฐาน ไม่ผูกกับอุตสาหกรรม สถาบัน หรือผู้ขายรายใดรายหนึ่ง

---

## Why this exists

Most software readiness conversations rely on verbal assurance: “มีแล้ว”, “ทำได้”, “ปลอดภัย”, “รองรับได้”. That is not enough when a customer, auditor, or bid committee asks for proof.

SRAS replaces opinion with a repeatable assessment:

- **testable requirements** instead of open-ended questions,
- **maturity levels** instead of a simple checklist,
- **evidence** instead of assertion,
- **gates** instead of an average score that hides critical gaps,
- **claim rules** instead of uncontrolled marketing statements.

It is designed to be reused for every product we build, not just one project or one customer.

---

## What this standard is

- A reusable **readiness and assurance checklist** for software products.
- A way to measure **core engineering, security, privacy, reliability, operations, and commercial readiness**.
- A **gap and roadmap tool** before a bid, client submission, or production release.
- A **claim-control system**: it defines what can be said to a customer and what cannot.
- A **common language** for product, engineering, security, operations, and sales.

## What this standard is not

- It is **not a certification**. “Assessed against SRAS” does not mean certified, accredited, or audited by a third party.
- It is **not legal advice**. Applicable laws and regulations must be reviewed by qualified legal/privacy counsel.
- It is **not a substitute for customer requirements**. If a customer or regulator requires more, the stricter requirement applies.
- It is **not a vendor scorecard**. It assesses the product and the operating model, not brand reputation.
- It is **not a one-time audit**. It must be repeated when the product, data, scale, or threat landscape changes.

---

## Design principles

1. **Evidence over assertion** — a requirement is not “done” until there is current, verifiable evidence.
2. **Risk-tiered** — a low-risk internal tool should not carry the same assessment depth as a regulated, multi-tenant, public-facing system.
3. **Core plus extensions** — every product uses the Core Checklist; AI, integration, regulated data, cloud/SaaS, and on-prem are optional modules.
4. **Gate before score** — a high average score cannot compensate for a failed Gate item.
5. **Claim only what is verified** — sales and proposals may use only claims that are supported by current evidence.
6. **Neutral by default** — no industry, institution, vendor, cloud provider, or jurisdiction is assumed in the Core.
7. **Continuous improvement** — the standard and the product are reassessed after major changes and incidents.

---

## Quick start

1. **Classify the product tier** — T1, T2, or T3. If unsure, choose the higher tier.
2. **Select optional modules** — AI/ML, Integration/API, Regulated Data, Cloud/SaaS, On-Prem.
3. **Create the assessment sheet** — use the template in `12-templates.md`.
4. **Score every applicable item from L0 to L4** — attach evidence to each score.
5. **Check Gates first** — any Gate item below L2 means the product is not client-ready.
6. **Calculate the Readiness Index and Evidence Coverage** — see `02-maturity-and-scoring.md`.
7. **Create a gap/risk register** — owner, action, due date, and risk acceptance if needed.
8. **Produce the Customer Assurance Summary and Claim Register** — see `11-claim-and-sales-guide.md`.
9. **Review, sign off, and schedule reassessment.**

---

## Assessment at a glance

| Concept | Meaning |
|---|---|
| **L0–L4** | Absent → Documented → Implemented → Measured → Optimized/independently validated |
| **G / H / M / L** | Gate / High / Medium / Low criticality |
| **Gate rule** | Any Gate item below L2 = not client-ready |
| **Readiness Index** | Weighted average of applicable items, normalized to 100 |
| **Evidence Coverage** | Percentage of claimed items with current evidence |
| **Claim status** | Verified / Partial / Not claimed / Not applicable |
| **Client-ready** | All Gates pass, index ≥ 70, evidence coverage ≥ 80%, no unaccepted critical/high risk |
| **Differentiator** | Higher thresholds plus evidence of measured or optimized performance in customer-relevant areas |

Full definitions and thresholds are in `02-maturity-and-scoring.md`.

---

## Repository map

| File | Purpose |
|---|---|
| `README.md` | Overview, quick start, and index |
| `01-principles-and-scope.md` | Scope, tiers, definitions, roles, and neutrality rules |
| `02-maturity-and-scoring.md` | Maturity levels, criticality, gates, scoring, and claim status |
| `03-core-checklist.md` | Core requirements for every software product |
| `04-ai-extension.md` | AI/ML-specific requirements and benchmark safety |
| `05-integration-extension.md` | API, integration, and partner requirements |
| `06-regulated-data-extension.md` | High-risk and regulated-data requirements |
| `07-cloud-saas-extension.md` | Multi-tenant, cloud, and SaaS requirements |
| `08-on-prem-extension.md` | On-premises and customer-hosted requirements |
| `09-evidence-standard.md` | Evidence types, quality, freshness, redaction, and index |
| `10-assessment-process.md` | End-to-end assessment and sign-off process |
| `11-claim-and-sales-guide.md` | Claim rules, customer assurance pack, and sales usage |
| `12-templates.md` | Assessment, evidence, risk, model card, and summary templates |
| `CHANGELOG.md` | Version history and planned changes |

---

## Roles

| Role | Responsibility |
|---|---|
| **Product owner** | Scope, tier, customer commitments, claim approval |
| **Engineering lead** | Architecture, code, release, technical evidence |
| **Security lead** | Threat model, access, vulnerability, incident readiness |
| **Privacy/legal** | Data classification, notices, contracts, regulatory obligations |
| **Operations/SRE** | Monitoring, backup, DR, on-call, runbooks |
| **AI/ML owner** | Model card, evaluation, guardrails, drift, AI incident response |
| **Assessor** | Facilitates scoring, samples evidence, challenges unsupported claims |
| **Approver** | Accepts residual risk and signs off the assessment |

For T3 products, the assessor should be independent of the delivery team.

---

## How to adapt without weakening the standard

- Do **not** delete Core items. Mark them `N/A` with a written rationale and approver.
- A Gate item marked `N/A` requires explicit approval from security and operations.
- Do **not** lower a Gate score to make an average look better.
- Add customer-specific, regulatory, or domain-specific requirements as a **local addendum**.
- If a customer requirement is stricter than SRAS, the customer requirement wins.
- Record every deviation in the assessment sheet and changelog.

---

## Versioning and review

- Versions use semantic versioning: `MAJOR.MINOR.PATCH`.
- Review the standard at least **quarterly**, after every **major release**, and after any **material incident**.
- A change to a Gate item or scoring threshold is a **MAJOR** change.
- A new optional module or item is a **MINOR** change.
- Wording clarifications and typo fixes are **PATCH** changes.

---

## Language note

This edition is Thai-first with English IDs and technical terms. The IDs are stable so the standard can be referenced across teams, tools, and languages. An English edition can be produced without changing the IDs.

---

## Feedback

Use the changelog to record:

- new requirements,
- removed or merged requirements,
- changes to criticality or thresholds,
- lessons learned from assessments and incidents,
- customer questions that exposed a gap.

The goal is not to create a perfect document. The goal is to make readiness **visible, measurable, and honest**.
