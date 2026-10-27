# 01 — Principles and Scope

**Parent:** `README.md`  
**Version:** v0.1.0

---

## 1. Purpose

This document defines the scope, principles, tiers, definitions, and tailoring rules for the Software Readiness & Assurance Standard (SRAS).

SRAS exists to answer four questions consistently:

1. **Is the product ready** for the intended use, customers, and operating environment?
2. **What evidence** supports that claim?
3. **What gaps remain**, who owns them, and when will they be closed?
4. **What can we honestly say** to a customer, auditor, or bid committee?

---

## 2. Scope

SRAS applies to any software product, including:

- web applications, mobile applications, and desktop applications;
- APIs, integration services, and middleware;
- data platforms, reporting, and automation;
- AI/ML-enabled features and products;
- cloud/SaaS, on-premises, and hybrid deployments;
- internal tools and customer-facing systems.

The **Core Checklist** applies to every product. Optional modules apply when the product has the relevant characteristics.

SRAS covers the product and the operating model around it: architecture, data, security, reliability, performance, operations, release, quality, documentation, support, compliance, cost, and — where relevant — AI, integrations, regulated data, cloud/SaaS, and on-premises deployment.

SRAS does **not** replace:

- customer-specific requirements,
- legal or regulatory advice,
- a formal certification or accreditation,
- a security penetration test,
- a contractual warranty or service-level agreement,
- a country-specific compliance audit.

---

## 3. Applicability and tiers

Not every product needs the same depth. The tier determines the minimum assessment scope and the level of independence required.

| Tier | Typical characteristics | Minimum assessment | Review expectation |
|---|---|---|---|
| **T1 — Internal / low-risk** | Internal users; limited blast radius; no sensitive data beyond basic account data; no external customer dependency; reversible failure | Core Checklist; applicable Gate items; optional modules only if used | Self-assessment plus peer review |
| **T2 — Business / customer-facing** | External users or business-critical operations; personal data; revenue or service impact; integrations; production support commitments | Core Checklist plus relevant modules; all Gate items | Independent reviewer recommended; security and operations sign-off |
| **T3 — High-risk / regulated / multi-tenant** | Sensitive or regulated data; safety, financial, legal, or rights impact; public-facing at scale; many tenants; consequential AI; significant availability commitments | Core Checklist plus all relevant modules; all Gate items; formal risk acceptance | Independent assessor required; specialist security/privacy review; external audit where required |

**Rule:** If the tier is unclear, choose the higher tier. It is easier to reduce assessment depth with a written rationale than to explain an incident that was never assessed.

**Tier is not a marketing label.** It is an internal scoping decision that must be recorded with the assessment.

---

## 4. Definitions

| Term | Definition |
|---|---|
| **Product** | The software, configuration, data, integrations, and operating model delivered to users. |
| **Release** | A versioned deployment or change that is made available to users. |
| **Assessment** | A documented evaluation of applicable SRAS items against evidence. |
| **Evidence** | A verifiable artefact that demonstrates the requirement is implemented, measured, or reviewed. |
| **Gate** | A mandatory requirement that must reach at least L2 before the product can be considered client-ready. |
| **Criticality** | The importance of an item: Gate, High, Medium, or Low. |
| **Maturity level** | The degree to which an item is absent, documented, implemented, measured, or optimized. |
| **Claim** | A statement made to a customer, prospect, auditor, or the public about the product’s readiness, security, privacy, performance, or compliance. |
| **N/A** | A documented determination that an item does not apply, with rationale and approval. |
| **Deviation** | A documented, approved departure from a requirement or threshold. |
| **Risk acceptance** | A formal decision to tolerate a known risk for a defined period, with an owner and review date. |
| **Assessor** | The person who facilitates scoring, reviews evidence, and challenges unsupported claims. |
| **Approver** | The person authorized to accept residual risk and sign off the assessment. |

**“Where applicable”** means the requirement must be assessed, and either implemented or marked N/A with a written rationale. It does not mean “ignore if inconvenient”.

---

## 5. Principles

### 5.1 Evidence over assertion

A statement such as “we have monitoring” is not evidence. A dashboard with a named owner, an alert rule, a runbook, and a test alert is evidence.

### 5.2 Risk-based depth

Assessment depth follows risk: data sensitivity, user impact, blast radius, reversibility, regulatory exposure, and dependency on the product.

### 5.3 Core plus extensions

The Core is deliberately broad and industry-neutral. Extensions add requirements for specific characteristics without contaminating the Core with one customer’s context.

### 5.4 Gate before score

Averages hide failures. Gate items are pass/fail prerequisites. A product with one Gate at L1 is not client-ready even if its overall score is high.

### 5.5 Claim only what is verified

Sales, proposals, and customer conversations must use the Claim Register. A claim is either verified, partial with an honest roadmap, or not made.

### 5.6 Neutral by default

The Core does not assume healthcare, finance, government, retail, cloud, on-premises, AI, a particular vendor, or a particular jurisdiction.

### 5.7 Security and privacy by design

Security, privacy, and data protection are design inputs, not release-time checks.

### 5.8 Operability is part of the product

If it cannot be monitored, supported, recovered, upgraded, and explained, it is not ready for production.

### 5.9 Transparency

Gaps are documented, not hidden. A credible roadmap is better than an unsupported claim.

### 5.10 Continuous improvement

The standard and the product are reassessed after major changes, incidents, and customer feedback.

---

## 6. Neutrality rules

To keep SRAS reusable across industries and customers:

1. **No industry-specific requirements in the Core.** Domain-specific needs belong in an optional module or a local addendum.
2. **No vendor names as requirements.** Products and services may be examples, but the requirement must be technology-neutral.
3. **No jurisdiction-specific law in the Core.** Use “applicable law and regulation” and obtain legal review for the relevant market.
4. **No assumption of deployment model.** Cloud, SaaS, on-premises, and hybrid are separate modules.
5. **No assumption of AI.** AI/ML is an optional extension.
6. **No assumption of scale.** Tiering and thresholds handle scale and criticality.
7. **Examples are illustrative.** An example in this standard is not a mandatory product choice.
8. **Customer-specific requirements are addenda.** They do not rewrite the Core for everyone else.

---

## 7. Roles and accountability

| Role | Primary accountability |
|---|---|
| **Product owner** | Scope, tier, customer commitments, claim approval, business risk |
| **Engineering lead** | Architecture, implementation, release quality, technical evidence |
| **Security lead** | Threat model, access control, vulnerability management, incident readiness |
| **Privacy/legal** | Data classification, notices, contracts, regulatory obligations |
| **Operations/SRE** | Monitoring, alerting, backup, disaster recovery, on-call, runbooks |
| **AI/ML owner** | Model card, evaluation, guardrails, drift monitoring, AI incident response |
| **Data owner** | Data quality, lineage, retention, access, and permitted use |
| **Assessor** | Process integrity, evidence sampling, scoring, challenge of claims |
| **Approver** | Risk acceptance and final sign-off |

One person may hold more than one role in a small team, but the **assessor should not be the only person accountable for the product** in a T3 assessment.

---

## 8. Tailoring and deviations

### Allowed tailoring

- Select the product tier.
- Select optional modules.
- Mark items `N/A` with rationale and approval.
- Add a local addendum for customer, sector, or jurisdiction requirements.
- Define stricter thresholds for high-risk products.

### Not allowed

- Deleting Core or Gate items to improve the score.
- Lowering a Gate below L2 without formal risk acceptance.
- Claiming a level without evidence.
- Using an average score to hide a failed Gate.
- Treating a policy document as proof of implementation.

### Deviation record

Every deviation must record:

- the item ID,
- the reason,
- the compensating control,
- the residual risk,
- the approver,
- the expiry/review date.

---

## 9. Relationship to external standards

SRAS is designed to be compatible with, not a replacement for, recognized standards and frameworks. It can be used alongside:

- **ISO/IEC 25010** — software product quality model;
- **ISO/IEC 27001 and 27002** — information security management;
- **OWASP ASVS** — application security verification;
- **NIST SSDF** — secure software development framework;
- **WCAG 2.2** — web accessibility;
- **OpenAPI Specification** — API contracts;
- **SLSA** — software supply chain integrity;
- applicable privacy and data protection laws.

These references are optional alignment points. **SRAS does not certify compliance with any of them.** A customer or auditor may require a separate certification, attestation, or legal opinion.

---

## 10. Review and maintenance

- The standard is reviewed at least **quarterly**.
- A review is also triggered by a major release, a material incident, a new customer segment, a new deployment model, or a significant regulatory change.
- Changes are recorded in `CHANGELOG.md`.
- Gate changes and scoring-threshold changes require a major version.
- Feedback from assessments should improve the standard, not be used to weaken it silently.

---

## 11. Out of scope

The following are outside the SRAS Core unless a customer or regulator requires them:

- country-specific certification schemes;
- sector-specific licensing;
- contractual indemnities and insurance;
- financial audits;
- employment or labor compliance;
- physical security of customer sites;
- product pricing and commercial negotiation.

These may be added as a local addendum or handled by the appropriate specialist function.
