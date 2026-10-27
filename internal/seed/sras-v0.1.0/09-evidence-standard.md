# 09 — Evidence Standard

**Parent:** `README.md`  
**Version:** v0.1.0

---

## 1. Purpose

An assessment is only as credible as its evidence. This document defines what counts as evidence, how it is stored, how it is reviewed, and when it expires.

The core rule:

> **If it is claimed, it must be evidenced. If it is not evidenced, it is not claimed.**

---

## 2. Evidence principles

1. **Relevant** — the evidence directly supports the requirement, not a nearby activity.
2. **Current** — the evidence reflects the current product, release, or operating model.
3. **Verifiable** — a reviewer can inspect the source, not just a summary.
4. **Attributable** — the evidence has an owner, date, and source.
5. **Reproducible** — test and measurement evidence includes enough method to repeat it.
6. **Redacted** — no secrets, credentials, or unnecessary personal data.
7. **Versioned** — evidence is linked to the product or standard version it supports.
8. **Accessible** — authorized reviewers can find it through the evidence index.

---

## 3. Evidence types

| Type | Examples | Good for |
|---|---|---|
| **Document** | Policy, procedure, plan, runbook, model card, DPIA | L1 and supporting context |
| **Diagram** | Architecture, data flow, network, trust boundary | Architecture, data, security |
| **Configuration** | IAM policy, TLS settings, alert rule, backup schedule, retention rule | Implementation evidence |
| **Screenshot** | Dashboard, UI state, configuration page, audit log | Demonstration with date and context |
| **Test report** | Unit, integration, load, security, accessibility, DR, restore | Verification and measurement |
| **Metric / dashboard** | SLO dashboard, error budget, latency, drift, cost | L3 measurement |
| **Ticket / record** | Change approval, incident, access review, risk acceptance | Operational evidence |
| **Log sample** | Audit event, authentication event, alert trigger | Auditability and monitoring |
| **Contract** | DPA, SLA, security addendum, subprocessor terms | Commercial and privacy |
| **Certificate / attestation** | Independent audit, certification, penetration test | L4 or formal assurance |
| **Benchmark** | Evaluation dataset, method, results, error analysis | AI and performance claims |

A document is usually evidence for **L1**, not L2. To reach L2, show implementation. To reach L3, show measurement and review.

---

## 4. Evidence quality criteria

An evidence item is accepted only if:

- it is linked to a specific checklist ID;
- it has a unique evidence ID;
- it has an owner and date;
- it is current under the freshness rules;
- it is specific to the product and environment;
- it has been reviewed by the assessor or a delegate;
- it does not expose secrets or unnecessary personal data;
- the confidentiality classification is recorded.

### Examples of weak evidence

- “Security policy v1” with no approval or implementation evidence.
- A dashboard screenshot with no date, no metric definition, and no owner.
- A generic vendor brochure.
- A test report for a different product or environment.
- A screenshot showing only a login page when the claim is about authorization.
- A verbal statement in a meeting with no record.

### Examples of strong evidence

- A dated architecture diagram reviewed by engineering and security.
- An IAM policy plus a test showing access is denied without the required role.
- A restore test record with the backup date, restore target, duration, and verifier.
- A load-test report with scenario, dataset, environment, results, and bottleneck analysis.
- An audit-log sample showing who, what, when, and outcome, with retention configuration.
- A model evaluation report with dataset card, sample size, metrics, error analysis, and model version.

---

## 5. Freshness

Evidence must be recent enough to represent the current state.

| Evidence category | Default freshness | Revalidate earlier if |
|---|---:|---|
| Architecture and data-flow diagrams | 3 months or each major release | Architecture, data flow, or dependency changes |
| Security configuration and access reviews | 6 months | New environment, new role, or incident |
| Vulnerability and penetration-test reports | 6 months or per policy | Critical vulnerability or major change |
| Performance and load-test results | 6 months or each major release | Traffic, data volume, or infrastructure changes |
| Backup and restore tests | 6 months | Storage, database, or recovery process changes |
| Disaster-recovery exercises | 12 months | Major infrastructure change or incident |
| Privacy notices, DPIAs, DPAs | 12 months or upon change | New data, purpose, vendor, or jurisdiction |
| Policies and procedures | 12 months | Regulatory or organisational change |
| Incident-response exercises | 12 months | Major incident or team change |
| AI evaluation reports | Per model or prompt change; at least 6 months | Model, data, prompt, or use-case change |
| Certifications and independent audits | Per certificate cycle | Expiry or scope change |

If the product has changed materially since the evidence was created, the evidence is **expired** even if it is within the time window.

---

## 6. Redaction and confidentiality

Before evidence is added to an assessment or shared with a customer:

- remove passwords, API keys, tokens, private keys, and connection strings;
- remove or mask personal data that is not necessary;
- mask internal IP addresses, hostnames, and account IDs where disclosure creates risk;
- remove customer names and contract terms unless approved;
- crop screenshots to the relevant area;
- check metadata in documents and images;
- use synthetic data for demonstrations;
- record the confidentiality classification.

### Confidentiality classes

| Class | Meaning | Sharing |
|---|---|---|
| **Public** | Safe for public release | May be shared freely |
| **Customer** | Intended for a specific customer under NDA | Share only with that customer |
| **Internal** | Internal use only | Share with assessors and approved staff |
| **Restricted** | Sensitive security or commercial detail | Named individuals only |

When in doubt, classify higher and ask the owner.

---

## 7. Evidence index

Every assessment must maintain an evidence index. Minimum fields:

| Field | Description |
|---|---|
| `Evidence ID` | Stable ID, for example `EV-SEC-001` |
| `Checklist ID` | The requirement(s) supported |
| `Type` | Document, diagram, test, metric, ticket, etc. |
| `Description` | What the evidence shows |
| `Location` | Link or repository path |
| `Owner` | Person accountable for the evidence |
| `Date` | Date created or last validated |
| `Freshness` | Current / expiring / expired |
| `Confidentiality` | Public / customer / internal / restricted |
| `Review status` | Pending / accepted / rejected |
| `Reviewer` | Assessor or delegate |
| `Notes` | Limitations, redactions, or dependencies |

Use the template in `12-templates.md`.

---

## 8. Storage and access

- Store evidence in a controlled repository with access logging.
- Use folders or tags by assessment, domain, and confidentiality.
- Do not store evidence only in email or chat.
- Link to the source of truth rather than duplicating it where possible.
- Keep a snapshot for historical assessments when the source may change.
- Remove or archive expired evidence.
- Ensure backups of the evidence repository.
- Restrict restricted evidence to named individuals.

---

## 9. Review and sampling

| Evidence type | Review requirement |
|---|---|
| Gate items | 100% reviewed by the assessor |
| High items | At least 50% sampled, or all if the domain is high-risk |
| Medium and Low items | At least 20–30% sampled or one per domain |
| AI evaluation | Reviewed by someone independent of the model build where feasible |
| Security tests | Reviewed by security or an independent tester |
| Customer-facing claims | Reviewed against the claim register |

The assessor should record what was sampled and why. Sampling is not a substitute for evidence; it is a check on quality.

---

## 10. Unacceptable evidence

The following are not acceptable on their own:

- verbal assurance or meeting notes without artifacts;
- a policy that has not been approved or implemented;
- a generic template with no product-specific content;
- a screenshot without date, context, or owner;
- a test result for a different environment or version;
- a vendor marketing page;
- an expired certificate or report;
- an unredacted document containing secrets or personal data;
- an assertion that “the team always does this”;
- a dashboard that nobody reviews.

---

## 11. Evidence lifecycle

1. **Create** — produce the evidence as part of normal work.
2. **Classify** — assign confidentiality and retention.
3. **Index** — link to checklist IDs and owner.
4. **Review** — assessor validates relevance and quality.
5. **Use** — cite in the assessment and claim register.
6. **Expire** — mark stale when the product or time window changes.
7. **Replace** — create new evidence and retire the old version.
8. **Archive** — keep historical evidence for audit traceability.

---

## 12. Evidence pack for customers

A customer-facing evidence pack should contain only what is approved for sharing. A typical pack includes:

- architecture overview;
- data-flow overview;
- security controls summary;
- privacy and data-handling summary;
- reliability and backup summary;
- performance and capacity summary;
- AI governance summary, if applicable;
- support and SLA summary;
- evidence index with confidentiality markings;
- claim register;
- open gaps and roadmap.

The pack should not contain raw internal configurations, secrets, customer data, or unapproved claims.
