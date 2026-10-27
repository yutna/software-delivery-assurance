# 03 — Core Checklist

**Parent:** `README.md`  
**Version:** v0.1.0  
**Applies to:** every software product, regardless of industry or deployment model

---

## How to use this checklist

1. Include every Core item in the assessment unless it is genuinely not applicable.
2. Score each item from **L0 to L4** using the definitions in `02-maturity-and-scoring.md`.
3. Attach at least one current evidence item to every score of **L2 or above**.
4. Mark `N/A` only with a written rationale and approval.
5. Check Gate items first. Any applicable Gate below L2 blocks client-ready status.
6. Do not delete items. Add a local addendum if a customer or regulator requires more.

**Criticality legend**

- **G — Gate:** mandatory for production/client-ready software.
- **H — High:** required for sensitive data, external users, material business impact, or scale.
- **M — Medium:** expected good practice; may be phased with an approved plan.
- **L — Low:** maturity/differentiator.

**Minimum expectation for client-ready status**

- G and H items: at least **L2**.
- M items: at least **L1**.
- L items: optional, but useful for differentiation.
- All Gate items: evidence reviewed by the assessor.

---

## A. Product and Scope (PS)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **PS-01** | The product purpose, target users, desired outcomes, and out-of-scope boundaries are documented and approved. | H | Product brief; scope statement; approval record; roadmap |
| **PS-02** | Critical user journeys and their acceptance criteria are documented and traceable to tests or UAT. | H | Journey map; acceptance criteria; UAT plan; traceability matrix |
| **PS-03** | Supported platforms, browsers, devices, integrations, and versions are defined, together with lifecycle and end-of-support expectations. | M | Support matrix; browser/device policy; EOL policy |
| **PS-04** | A product owner is named, and success metrics are defined and reviewed. | H | RACI; KPI definitions; dashboard; review minutes |

---

## B. Architecture and Design (ARCH)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **ARCH-01** | A current architecture diagram shows components, data stores, external dependencies, trust boundaries, and data flows. | G | Versioned diagram; review date; architecture decision log |
| **ARCH-02** | Key architectural decisions and trade-offs are recorded as decision records. | H | ADR index; decision records with rationale and date |
| **ARCH-03** | System boundaries, interfaces, ownership, and dependencies are documented. | H | Interface catalogue; dependency map; ownership RACI |
| **ARCH-04** | Development, test/staging, and production environments are separated and have defined configuration controls. | G | Environment inventory; network diagram; configuration baseline |
| **ARCH-05** | A technology and version inventory is maintained, including end-of-life and upgrade risk. | H | Inventory; EOL tracking; upgrade plan |
| **ARCH-06** | Single points of failure for critical journeys are identified and either mitigated or formally accepted. | H | SPOF analysis; mitigation design; risk acceptance |

---

## C. Data Governance and Privacy (DATA)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **DATA-01** | A data inventory identifies data types, sources, owners, storage locations, and classification. | G | Data inventory; classification scheme; data owner list |
| **DATA-02** | A data flow map covers collection, processing, storage, sharing, export, retention, and deletion. | G | Data flow diagram; lineage record; third-party data map |
| **DATA-03** | Lawful basis, notice, and consent are defined where personal data is processed. | H; G if personal data | Privacy notice; consent records; legal review; records of processing |
| **DATA-04** | Data minimization and purpose limitation are applied to fields, retention, and access. | H | Data field review; DPIA; access matrix |
| **DATA-05** | Retention and deletion policies are implemented and evidenced, not only documented. | G | Retention schedule; deletion job logs; exception report |
| **DATA-06** | A process exists to handle data-subject requests such as access, correction, deletion, and portability. | H | Procedure; request log; response SLA; sample response |
| **DATA-07** | Cross-border transfer and data-residency requirements are identified and controlled. | H | Data location register; transfer safeguards; contractual clauses |
| **DATA-08** | Data processing agreements and a subprocessor list are maintained where required. | H | Signed DPA; subprocessor register; review date |
| **DATA-09** | Test and non-production environments use synthetic, anonymized, or approved data; production data is not copied without controls. | G | Test data policy; synthetic data evidence; environment access controls |
| **DATA-10** | Data quality and validation controls exist for data used in critical decisions or reporting. | H | Validation rules; quality metrics; exception handling; reconciliation |

---

## D. Security (SEC)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **SEC-01** | Authentication is enforced for every non-public interface, including APIs and administrative functions. | G | IAM configuration; authentication tests; endpoint inventory |
| **SEC-02** | Authorization follows least privilege and is enforced consistently, with documented roles and permissions. | G | Role matrix; policy configuration; access review |
| **SEC-03** | Privileged and administrative access requires strong authentication, including MFA where supported. | G | MFA configuration; privileged account list; exception approval |
| **SEC-04** | Secrets are stored in an approved secret store; secrets are not present in source code, images, logs, or tickets. | G | Secret-store configuration; secret-scan results; rotation record |
| **SEC-05** | Data is encrypted in transit and at rest using approved algorithms and key management. | G | TLS configuration; encryption-at-rest evidence; key management record |
| **SEC-06** | Networks are segmented, and inbound/outbound traffic is restricted by documented firewall or security-group rules. | G | Network diagram; firewall rules (redacted); egress inventory |
| **SEC-07** | A secure development lifecycle is applied: threat modelling, code review, SAST, dependency scanning, and secret scanning. | H | Threat model; review records; scan reports; remediation tickets |
| **SEC-08** | Vulnerabilities are tracked, prioritized, and remediated within defined service-level targets. | G | Vulnerability register; severity policy; remediation evidence |
| **SEC-09** | Security-relevant events are logged, monitored, and alerted with a named owner. | G | Log configuration; alert rules; sample alert; on-call owner |
| **SEC-10** | An incident-response and breach-notification process exists and has been exercised. | G | IR plan; contact tree; tabletop or exercise record |
| **SEC-11** | Independent penetration testing or vulnerability assessment is performed at an appropriate cadence, with remediation tracked. | H | Test report; scope; remediation tracker; retest |
| **SEC-12** | Software supply-chain risk is managed through dependency provenance, SBOM, and integrity controls where appropriate. | H | SBOM; signed artefacts; dependency policy; provenance record |

---

## E. Reliability and Continuity (REL)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **REL-01** | Service-level objectives, indicators, and error budgets are defined for critical journeys. | H | SLO document; dashboard; review record |
| **REL-02** | Critical components have redundancy or failover appropriate to the required availability. | H | Architecture; failover design; failover test result |
| **REL-03** | The product degrades gracefully and has defined fallback behaviour when dependencies fail. | H | Design document; failure test; user-facing fallback evidence |
| **REL-04** | Timeouts, retries, idempotency, and circuit-breaker behaviour are defined and tested. | H | Configuration; test cases; incident review |
| **REL-05** | Backups are configured, encrypted, monitored, and restore-tested. | G | Backup policy; restore test record; monitoring evidence |
| **REL-06** | A disaster-recovery plan defines RTO and RPO and has been exercised. | G | DR plan; exercise report; RTO/RPO validation |
| **REL-07** | Capacity and load testing cover critical journeys and expected peak conditions. | H | Load-test report; capacity model; peak forecast |

---

## F. Performance and Scalability (PERF)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **PERF-01** | Performance requirements and baseline expectations are defined for critical journeys. | H | Non-functional requirements; baseline report; acceptance thresholds |
| **PERF-02** | Load and stress testing have been performed against representative conditions. | H | Test plan; results; bottleneck analysis |
| **PERF-03** | Production latency, throughput, error rate, and saturation are monitored. | H | Dashboards; metric definitions; alert thresholds |
| **PERF-04** | Scaling limits, headroom, and a scaling plan are documented. | M | Capacity plan; limit analysis; cost/scale trade-off |

---

## G. Observability and Operations (OPS)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **OPS-01** | Logs, metrics, and traces are collected with correlation identifiers and appropriate retention. | G | Logging configuration; trace example; retention policy |
| **OPS-02** | Dashboards exist for critical journeys and key dependencies. | H | Dashboard links; review cadence |
| **OPS-03** | Alerts are actionable, have an owner, and link to a runbook. | G | Alert rules; runbook; ownership record; test alert |
| **OPS-04** | On-call and escalation arrangements are defined and current. | H | On-call schedule; escalation matrix; contact tree |
| **OPS-05** | Maintenance windows, status communication, and customer notification are planned. | H | Maintenance policy; status-page process; communication templates |
| **OPS-06** | Sensitive actions are recorded in an audit log with sufficient context. | G | Audit-log configuration; sample event; access control |
| **OPS-07** | Runbooks exist for common failures and have been reviewed or exercised. | H | Runbook index; exercise record; last review date |

---

## H. Release and Change Management (CHG)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **CHG-01** | A CI/CD pipeline builds, tests, and deploys with appropriate automation and approvals. | H | Pipeline configuration; test results; deployment log |
| **CHG-02** | Configuration and environment settings are managed, versioned, and separated by environment. | G | Config inventory; environment baseline; change record |
| **CHG-03** | Releases are versioned and accompanied by release notes and known limitations. | H | Release notes; version tags; changelog |
| **CHG-04** | A rollback or roll-forward plan exists and has been tested for critical changes. | G | Rollback procedure; test record; decision criteria |
| **CHG-05** | Changes are assessed for risk and approved by the appropriate owner. | H | Change ticket; risk assessment; approval record |
| **CHG-06** | Database migrations are reversible or have a tested recovery plan. | G if database-backed | Migration policy; dry run; rollback test |
| **CHG-07** | Feature flags or kill switches exist for risky features, with post-release verification. | H | Flag inventory; kill-switch test; verification checklist |

---

## I. Quality and Testing (QA)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **QA-01** | A test strategy covers unit, integration, end-to-end, performance, security, and accessibility testing as relevant. | H | Test strategy; test pyramid; tooling inventory |
| **QA-02** | Critical user journeys have automated or repeatable regression coverage. | G | Coverage report; regression suite; test results |
| **QA-03** | Test data is managed safely and does not expose production personal data. | G | Test data policy; synthetic data; access controls |
| **QA-04** | User acceptance testing or equivalent customer validation is completed before release. | H | UAT plan; sign-off; defect log |
| **QA-05** | Defect severity, release exit criteria, and waiver rules are defined and applied. | H | Defect policy; release checklist; waiver approval |
| **QA-06** | Security testing is integrated into the delivery lifecycle. | H | SAST/DAST results; pen-test report; remediation |
| **QA-07** | Accessibility and localization testing are performed where required by users, markets, or contracts. | M; G if contractually required | WCAG checklist; assistive-technology test; localization review |

---

## J. Documentation and Handover (DOC)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **DOC-01** | A README or quick-start guide allows a new team member to understand, run, and test the product. | H | README; setup test; onboarding feedback |
| **DOC-02** | Architecture, API, data, and integration documentation are current. | H | Documentation index; last-reviewed date; API spec |
| **DOC-03** | Administrator and end-user guides exist for the supported workflows. | H | Guides; screenshots; training material |
| **DOC-04** | Operational runbooks and playbooks are available for support and incidents. | H | Runbook index; review record |
| **DOC-05** | A security and assurance overview can be shared with customers under appropriate confidentiality. | H | Security whitepaper; architecture summary; data-flow summary |
| **DOC-06** | A handover and training package exists for support, operations, or customer teams. | H | Handover checklist; training record; acceptance sign-off |

---

## K. Support and Commercial (SUP)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **SUP-01** | The support model, channels, hours, and responsibilities are defined. | H | Support plan; contact channels; service hours |
| **SUP-02** | Service-level agreements and escalation paths are documented and measurable. | H | SLA; escalation matrix; reporting sample |
| **SUP-03** | Incident communication and customer notification processes are defined. | H | Communication plan; templates; roles |
| **SUP-04** | Licence terms, privacy policy, and acceptable-use terms are available where the product is customer-facing. | G if customer-facing | Published terms; privacy notice; legal review |
| **SUP-05** | Data processing, security, and confidentiality addenda are available where required. | H | DPA template; security addendum; signed sample |
| **SUP-06** | An exit, transition, or data-export plan exists for customers. | M | Exit plan; export format; transition checklist |

---

## L. Compliance, Ethics, and Cost (COMP/COST)

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **COMP-01** | Applicable legal, regulatory, contractual, and sector obligations are identified and assessed. | H | Obligations register; legal review; applicability matrix |
| **COMP-02** | Compliance evidence and records are retained and can be produced on request. | H | Evidence index; audit records; retention schedule |
| **COMP-03** | Accessibility, language, and localization commitments are defined for the target market. | M | Accessibility policy; localization plan; test results |
| **COMP-04** | Third-party and vendor risk is assessed, owned, and reviewed. | H | Vendor inventory; risk assessment; review date |
| **COMP-05** | An AI ethics and usage policy exists when AI/ML is used. | H if AI | Policy; review board; use-case register |
| **COST-01** | Unit economics and cost drivers are understood and visible. | M | Cost model; dashboard; assumptions |
| **COST-02** | Budgets, thresholds, and cost alerts are defined. | M | Budget record; alert configuration |
| **COST-03** | Capacity and cost are reviewed against actual usage. | M | Review record; trend report |
| **COST-04** | Vendor lock-in, exit costs, and portability are assessed. | M | Exit assessment; dependency analysis |

---

## Core completion rule

A product is **Core-complete** when:

- every applicable Core item is assessed;
- all applicable Gate items are at **L2 or above** with reviewed evidence;
- all applicable H items are at **L2 or above**, or have an approved remediation plan;
- M items are at **L1 or above**, or have an approved plan;
- N/A items have a rationale and approval;
- the evidence index is complete for all claimed items.

Core-complete does not automatically mean client-ready. The Readiness Index, evidence coverage, optional modules, and risk status must also meet the thresholds in `02-maturity-and-scoring.md`.
