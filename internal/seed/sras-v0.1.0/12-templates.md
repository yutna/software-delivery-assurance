# 12 — Templates

**Parent:** `README.md`  
**Version:** v0.1.0

Copy these templates into the assessment workspace and adapt the headings. Do not remove the mandatory fields without recording why.

---

## 1. Assessment sheet

| Field | Value |
|---|---|
| Product | |
| Version / release | |
| Assessment date | |
| Tier | T1 / T2 / T3 |
| Modules | Core / AI / Integration / Regulated / Cloud-SaaS / On-Prem |
| Assessor | |
| Approver | |
| Scope notes | |

### Item-level assessment

| ID | Requirement | Criticality | Applicable | Level (0–4) | Evidence IDs | Evidence status | Owner | Gap / action | Due date | Reviewer | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | Yes / No / N/A | | | Current / Expired / Missing | | | | | |

### Scorecard summary

| Domain | Items | Applicable | Gate pass | Weighted score | Evidence coverage | Open critical/high gaps | Status |
|---|---:|---:|---|---:|---:|---:|---|
| Product and Scope | | | | | | | |
| Architecture | | | | | | | |
| Data | | | | | | | |
| Security | | | | | | | |
| Reliability | | | | | | | |
| Performance | | | | | | | |
| Operations | | | | | | | |
| Release and Change | | | | | | | |
| Quality | | | | | | | |
| Documentation | | | | | | | |
| Support and Commercial | | | | | | | |
| Compliance and Cost | | | | | | | |
| Optional modules | | | | | | | |
| **Total** | | | | | | | |

### Final result

| Metric | Value |
|---|---|
| Readiness Index | |
| Evidence Coverage | |
| Gate status | Pass / Fail |
| Readiness status | Not assessed / Not ready / Conditional / Client-ready / Differentiator |
| Open critical/high risks | |
| Claim register version | |
| Sign-off date | |

---

## 2. Evidence index

| Evidence ID | Checklist ID(s) | Type | Description | Location | Owner | Date | Freshness | Confidentiality | Review status | Reviewer | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-001 | | Document / Diagram / Test / Metric / Ticket / Contract / Benchmark | | | | | Current / Expiring / Expired | Public / Customer / Internal / Restricted | Pending / Accepted / Rejected | | |

---

## 3. Gap and risk register

| Risk ID | Related item(s) | Description | Severity | Likelihood | Impact | Remediation / compensating control | Owner | Due date | Status | Risk acceptance ID | Customer disclosure |
|---|---|---|---|---|---|---|---|---|---|---|---|
| RISK-001 | | | Critical / High / Medium / Low | | | | | | Open / In progress / Closed / Accepted | | Yes / No / Conditional |

---

## 4. Architecture one-pager

Use this as a review artefact and as input to the customer assurance pack.

```text
Product / version:
Purpose:
Users and critical journeys:
Deployment model: cloud / SaaS / on-prem / hybrid
Regions / data residency:
Components:
  - Frontend:
  - API / services:
  - Data stores:
  - Background jobs:
  - Integrations:
  - AI/ML components (if any):
Trust boundaries:
External dependencies and owners:
Authentication and authorization:
Data flows:
  - Collection:
  - Processing:
  - Storage:
  - Sharing:
  - Retention / deletion:
Availability and recovery:
  - SLO:
  - Backup:
  - RTO / RPO:
Monitoring and alerting:
Key architectural decisions:
Known limitations:
Diagram location:
Owner and review date:
```

---

## 5. AI model card

```text
Model name / version:
Model type:
Provider or internal owner:
Intended use:
Out-of-scope use:
Affected users / decisions:
Automation level: assistive / consequential / autonomous
Training and fine-tuning data:
  - Sources:
  - Provenance:
  - Licence / permission:
  - Personal or sensitive data:
Evaluation:
  - Dataset and size:
  - Metrics:
  - Results:
  - Baseline:
  - Error analysis:
  - Bias / fairness testing:
  - Language / domain coverage:
  - Date and evaluator:
Human oversight:
  - Reviewer role:
  - Override and escalation:
Confidence and limitations:
Guardrails and fallback:
Security controls:
  - Prompt injection:
  - Data exfiltration:
  - Tool permissions:
  - Supply chain:
Privacy:
  - Data sent to the model:
  - Retention:
  - Region:
  - Training on customer data: yes / no / with agreement
Monitoring:
  - Quality:
  - Drift:
  - Abuse:
  - Latency and cost:
Incident response:
Kill switch:
Known limitations:
Approval and review date:
```

---

## 6. Customer assurance summary

```text
[Product name] — SRAS Customer Assurance Summary

1. Product and scope
2. Assessment basis
   - SRAS version:
   - Tier:
   - Assessment date:
   - Assessor:
   - Scope and exclusions:
3. Readiness result
   - Gate status:
   - Readiness Index:
   - Evidence coverage:
   - Readiness status:
4. Security and privacy
5. Reliability and operations
6. Performance and capacity
7. AI governance (if applicable)
8. Integration and deployment
9. Verified claims
10. Open gaps and roadmap
11. Evidence available on request
12. Contact, validity, and review date
```

Keep it to 1–2 pages. Use only Verified claims. Attach the evidence index separately under the appropriate confidentiality terms.

---

## 7. Claim register

| Claim ID | Claim | Checklist IDs | Evidence IDs | Status | Scope | Conditions | Approved by | Approval date | Expiry / review date | Audience |
|---|---|---|---|---|---|---|---|---|---|---|
| CLM-001 | | | | Verified / Partial / Not claimed / N/A / Expired | Product / version / environment | | | | | Public / Customer / Bid / Internal |

### Claim approval checklist

- [ ] The underlying item is at L2 or above.
- [ ] Evidence is current and accepted.
- [ ] The claim wording matches the evidence.
- [ ] Conditions and limitations are stated.
- [ ] Legal/security review completed where required.
- [ ] Expiry date is set.
- [ ] The claim is removed from current material if it expires or is withdrawn.

---

## 8. Release readiness checklist

Use before a production or customer release.

- [ ] Scope and version are recorded.
- [ ] All applicable Gate items are at L2+ with evidence.
- [ ] No unaccepted critical/high risk.
- [ ] Rollback or roll-forward plan is tested.
- [ ] Database migrations are tested and reversible or recoverable.
- [ ] Monitoring and alerts cover the release.
- [ ] Runbooks are updated.
- [ ] Backup is current; restore path is known.
- [ ] Security review is complete for changed surfaces.
- [ ] Privacy review is complete for changed data flows.
- [ ] AI evaluation is current for changed models or prompts.
- [ ] Release notes and known limitations are published.
- [ ] Support and incident contacts are current.
- [ ] Post-release verification plan is defined.
- [ ] Claim register is updated.

---

## 9. Risk acceptance record

| Field | Value |
|---|---|
| Risk acceptance ID | |
| Related items | |
| Risk description | |
| Likelihood | |
| Impact | |
| Compensating controls | |
| Residual risk | |
| Reason for acceptance | |
| Approver | |
| Date | |
| Expiry / review date | |
| Customer disclosure | |
| Conditions | |

A risk acceptance is not valid without a named approver and an expiry date.

---

## 10. Assessment sign-off

| Role | Name | Decision | Date | Signature / record |
|---|---|---|---|---|
| Product owner | | Approved / Conditional / Rejected | | |
| Engineering lead | | Approved / Conditional / Rejected | | |
| Security lead | | Approved / Conditional / Rejected | | |
| Privacy/legal | | Approved / Conditional / Rejected | | |
| Operations/SRE | | Approved / Conditional / Rejected | | |
| Assessor | | Assessment complete | | |
| Approver | | Final readiness decision | | |

### Sign-off statement

> I confirm that this assessment was conducted within the stated scope, that the evidence reviewed supports the recorded levels, that Gate failures and gaps are disclosed, and that customer-facing claims will be limited to the approved Claim Register.

---

## 11. Reassessment schedule

| Trigger | Frequency | Owner | Last completed | Next due |
|---|---|---|---|---|
| Quarterly review | Every 3 months | | | |
| Major release | Per release | | | |
| Material incident | Within 30 days | | | |
| Architecture/data/model change | Before release | | | |
| Evidence expiry | Per freshness rule | | | |
| Customer/regulatory request | As required | | | |
