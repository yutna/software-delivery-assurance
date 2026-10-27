# 06 — Regulated and High-Risk Data Extension

**Parent:** `README.md`  
**Version:** v0.1.0  
**Applies to:** products that process personal, sensitive, financial, health, children’s, biometric, location, or otherwise regulated data, or that support high-impact decisions

---

## 1. Scope and legal note

This module adds requirements for products where data sensitivity, regulatory exposure, or impact on people is high.

It is **not legal advice**. Applicable obligations depend on the jurisdiction, sector, data type, user population, and contract. Legal and privacy counsel must confirm the obligations for each market and use case.

Examples of regulated or high-risk contexts include:

- health and social care;
- financial services and payments;
- education and children’s data;
- employment and HR decisions;
- identity, biometrics, and access control;
- safety-critical operations;
- public-sector services;
- large-scale monitoring or profiling.

---

## 2. Checklist

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **REG-01** | The product’s regulatory classification and applicable obligations are identified, documented, and reviewed. | H; G for T3 | Obligations register; legal opinion; applicability matrix |
| **REG-02** | A data protection or high-risk impact assessment is completed before processing and updated when the processing changes. | G for T3 | DPIA or equivalent; risk assessment; approval record |
| **REG-03** | Processing is auditable and traceable: who did what, when, with which data, and under which authority. | G | Audit-log design; sample event; retention and access control |
| **REG-04** | Where decisions affect people, human oversight, explanation, and appeal or correction routes are defined. | G if consequential | Workflow design; reviewer role; appeal procedure; sample record |
| **REG-05** | Retention, legal hold, and deletion requirements are implemented and evidenced. | G | Retention schedule; hold procedure; deletion report |
| **REG-06** | Cross-border transfers and data-residency requirements have documented safeguards. | G if cross-border | Transfer register; contractual clauses; location evidence |
| **REG-07** | Independent audit, certification, or specialist review is obtained where required by law, contract, or risk tier. | H; G if mandated | Audit report; certification; remediation tracker |
| **REG-08** | Breach detection, notification, and regulatory reporting timelines are defined and tested. | G | Incident plan; notification template; tabletop record; timeline |

---

## 3. Minimum expectations for T3 products

A T3 product should also have:

- a named data protection owner and a named security owner;
- a data inventory that covers every regulated data category;
- a documented lawful basis for each processing purpose;
- a record of processing activities;
- a processor and subprocessor register;
- a transfer impact assessment where applicable;
- access reviews for privileged and sensitive-data roles;
- retention and deletion automation with exception reporting;
- an incident-response exercise that includes regulatory notification;
- an independent assessment before first production use and after material change.

---

## 4. High-impact decision safeguards

When a product informs or makes a decision about a person, document:

1. **Decision scope** — what is decided, for whom, and with what consequence.
2. **Human role** — who reviews, approves, overrides, or appeals.
3. **Explanation** — what the person is told about the decision and the basis for it.
4. **Data used** — which data is relevant, and which data is prohibited.
5. **Error handling** — how incorrect data or incorrect decisions are corrected.
6. **Monitoring** — how outcomes are monitored for disparate impact or systematic error.
7. **Audit** — how the decision and the human action are recorded.
8. **Redress** — how a person can challenge or appeal.

If the product cannot provide these safeguards, it should not make or materially influence the decision without formal risk acceptance.

---

## 5. Evidence expectations

For regulated data, evidence must be stronger than a policy statement. Expect:

- signed approvals and legal reviews;
- data-flow and data-location diagrams;
- access-review records;
- DPIA and risk-assessment records;
- audit-log samples with retention configuration;
- deletion and retention reports;
- transfer safeguards;
- incident exercises and notification timelines;
- independent audit or certification reports where required.

Evidence must be current. A DPIA completed before a major change does not cover the changed processing without review.

---

## 6. What not to claim

Do not claim:

- “compliant” with a law or regulation without a formal legal/compliance opinion;
- “certified” without a valid certificate from the recognized body;
- “anonymized” unless the anonymization has been assessed against the applicable standard;
- “secure” as a substitute for specific controls and evidence;
- “GDPR-compliant”, “HIPAA-compliant”, “PDPA-compliant”, or similar labels unless the applicable assessment has actually been completed.

Use precise language:

> “The product is designed to support the customer’s obligations under [applicable law]. A jurisdiction-specific compliance review is required before production use.”
