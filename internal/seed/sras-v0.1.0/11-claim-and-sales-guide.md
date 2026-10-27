# 11 — Claim and Sales Guide

**Parent:** `README.md`  
**Version:** v0.1.0

---

## 1. Purpose

The assessment produces evidence. This guide controls how that evidence becomes a customer-facing statement.

The goal is not to make the product sound better than it is. The goal is to make **credible claims** that survive technical, legal, and customer scrutiny.

> **If it is not in the Claim Register as Verified, it is not used in a proposal or sales conversation as a completed capability.**

---

## 2. Claim statuses

| Status | Definition | Allowed use |
|---|---|---|
| **Verified** | The item is at L2 or above, evidence is current and accepted, and the claim has been approved. | Proposals, sales decks, assurance packs, customer Q&A |
| **Partial** | Some evidence exists, but it does not support the full claim. A roadmap, owner, and date are documented. | Only with explicit “in progress” language and date |
| **Not claimed** | No verified evidence, or the organisation chooses not to claim it. | Do not use as a capability claim |
| **N/A** | The requirement does not apply to the product. | Do not use as a positive claim |
| **Expired** | Evidence is stale or the product changed materially. | Do not use until revalidated |

---

## 3. Claim rules

1. **Verified claims only.** A claim must be traceable to one or more evidence IDs.
2. **No certification language without a certificate.** Do not say “certified”, “accredited”, or “audited” unless a recognized third party has issued the relevant document.
3. **No compliance guarantee without legal review.** “Compliant with [law]” requires a formal assessment and approval.
4. **No absolute language.** Avoid “100%”, “never”, “guaranteed”, “fully secure”, “zero risk”.
5. **State the conditions.** A performance or accuracy claim must include environment, dataset, version, and date.
6. **Partial is not done.** If something is Partial, say “in progress”, give the roadmap date, and do not present it as available.
7. **Customer requirements override.** If a customer asks for something stricter than SRAS, the customer requirement governs.
8. **Refresh claims.** Revalidate claims after each major release and when evidence expires.
9. **Legal and security review.** Claims about security, privacy, compliance, AI accuracy, or availability require the appropriate reviewer.
10. **Keep the register.** A claim without a register entry is an uncontrolled claim.

---

## 4. Claim Register

Minimum fields:

| Field | Description |
|---|---|
| `Claim ID` | Stable identifier, for example `CLM-SEC-001` |
| `Claim` | Exact customer-facing statement |
| `Checklist IDs` | SRAS items supporting the claim |
| `Evidence IDs` | Evidence supporting the claim |
| `Status` | Verified / Partial / Not claimed / N/A / Expired |
| `Scope` | Product, version, environment, customer segment |
| `Conditions` | Prerequisites or limitations |
| `Approved by` | Product, security, legal, or executive approver |
| `Approval date` | Date approved |
| `Expiry / review date` | When the claim must be revalidated |
| `Audience` | Public / customer / bid / internal |

Use the template in `12-templates.md`.

---

## 5. Customer Assurance Summary

The Customer Assurance Summary is a short, external-facing document generated from verified items. It should be 1–2 pages and avoid raw technical detail.

Recommended structure:

1. **Product and scope** — what the product does, who it is for, version assessed.
2. **Assessment basis** — SRAS version, tier, date, assessor, scope.
3. **Readiness result** — Gate status, Readiness Index, evidence coverage.
4. **Security and privacy** — key controls, data handling, access, encryption, incident response.
5. **Reliability and operations** — SLO, backup, DR, monitoring, support.
6. **Performance and capacity** — measured baseline, limits, conditions.
7. **AI governance** — model card summary, evaluation, human oversight, guardrails, monitoring (if applicable).
8. **Integration and deployment** — API, cloud/on-prem, shared responsibility (if applicable).
9. **Verified claims** — a short list with evidence references.
10. **Open gaps and roadmap** — honest summary of what is not yet complete.
11. **Evidence available on request** — categories and confidentiality terms.
12. **Contact and validity** — owner, date, expiry, review cycle.

Do not include unverified claims, raw configurations, customer data, or secrets.

---

## 6. Trust and Readiness Pack

A complete pack for a customer or bid can include:

- Customer Assurance Summary;
- architecture overview;
- data-flow and data-handling summary;
- security controls summary;
- privacy and retention summary;
- reliability, backup, and DR summary;
- performance and capacity summary;
- AI model card and evaluation summary, if applicable;
- integration and deployment summary;
- support and SLA summary;
- evidence index with confidentiality markings;
- claim register extract;
- gap and roadmap summary;
- contact and escalation path.

The pack should be assembled per customer and per version. Do not reuse an old pack without revalidation.

---

## 7. Sales playbook

### Discovery questions

Use these to map customer concerns to SRAS domains:

- What data will the product process, and how sensitive is it?
- Who are the users, and what happens if the product is unavailable?
- What integrations and availability commitments are expected?
- What security, privacy, and regulatory reviews will the customer perform?
- What evidence will the customer require: architecture, test reports, certifications, audits?
- What does “ready” mean for this customer, and who signs off?
- What will the customer not accept, and what is non-negotiable?

### Mapping concerns to proof

| Customer concern | SRAS proof |
|---|---|
| “How do we know it is secure?” | SEC domain, Gate report, pen-test summary, security whitepaper |
| “Where does our data go?” | DATA domain, data-flow diagram, residency evidence, DPA |
| “Can it handle our volume?” | PERF domain, load-test report, capacity model |
| “What happens if it fails?” | REL domain, backup/restore test, DR exercise, incident plan |
| “How is AI controlled?” | AI extension, model card, evaluation, human oversight, kill switch |
| “Can you integrate with our systems?” | INT extension, API contract, contract tests, sandbox |
| “Are you compliant?” | COMP/REG domains, legal review, certificates if any, precise statements |
| “What is not ready?” | Gap register and roadmap — honest, dated, owned |

### Handling gaps

Do not hide gaps. Say:

> “This item is currently at L1. We have a remediation plan owned by [role], due [date]. It is not part of the current verified claim.”

That is more credible than an unsupported “yes”.

---

## 8. Good and bad claim examples

### Good

> “The product enforces role-based access control on all non-public APIs. Evidence: IAM role matrix and access tests dated 2026-10-01. Assessed at L2.”

> “On the evaluation set dated 2026-10-01, the model achieved 82% top-1 accuracy for the tested category set. Performance outside that set is not yet measured.”

> “Backup restore was tested on 2026-09-15; the restore completed in 42 minutes against an RTO of 2 hours.”

### Bad

> “The system is fully secure.”

> “The AI is 99% accurate.”

> “We are GDPR/HIPAA/PDPA compliant.” *(unless formally assessed and approved)*

> “We have monitoring.” *(without owner, alert, or review evidence)*

> “Zero downtime.”

> “The system is certified.” *(without a certificate)*

---

## 9. Badge and label usage

If the organisation uses labels such as “SRAS Verified” or “SRAS Assessed”, define:

- who approves the label;
- which tier and version it applies to;
- the assessment date and expiry;
- the exact wording;
- the evidence behind it;
- the conditions and limitations.

Recommended wording:

> “Assessed against SRAS v0.1.0 at Tier 2. Gate status: passed. Readiness Index: 78. Evidence coverage: 85%. Assessment date: 2026-10-22. Valid until: 2027-01-22.”

Avoid:

> “SRAS Certified” or “Fully compliant” unless a separate certification exists.

---

## 10. Review and expiry

- Review the Claim Register before every bid and every major release.
- Expire claims when the product, model, data, vendor, or environment changes materially.
- Keep the previous version for audit traceability.
- If a claim is withdrawn, remove it from current sales material and notify the relevant teams.
- Legal and security should review high-risk claims at least annually.
