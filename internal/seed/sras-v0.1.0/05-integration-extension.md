# 05 — Integration and API Extension

**Parent:** `README.md`  
**Version:** v0.1.0  
**Applies to:** products that expose APIs, consume external APIs, exchange events, or integrate with customer or partner systems

---

## 1. Scope

This module covers the design, security, reliability, and lifecycle of integrations, including:

- REST, GraphQL, gRPC, and event-driven interfaces;
- partner and customer integrations;
- webhooks and callbacks;
- file-based and batch interfaces;
- third-party SaaS dependencies;
- internal service-to-service contracts.

Integration risk increases when the interface is public, carries sensitive data, triggers business actions, or is depended on by another organisation.

### Integration risk levels

| Level | Characteristics | Minimum expectation |
|---|---|---|
| **I1 — Internal** | Internal services, low-impact data, reversible actions | Contract, authentication, observability |
| **I2 — Partner / customer** | External organisation, business data, coordinated change | I1 plus versioning, rate limits, support, contract testing |
| **I3 — Public / high-impact** | Public API, sensitive data, financial or safety action, many consumers | I2 plus independent security review, abuse controls, formal deprecation policy |

---

## 2. Checklist

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **INT-01** | An API or integration contract is documented, versioned, and treated as a product interface. | H | OpenAPI or equivalent spec; versioning policy; contract repository |
| **INT-02** | Authentication and authorization are enforced, with scoped permissions and no shared credentials. | G | Auth configuration; scope matrix; token lifecycle evidence |
| **INT-03** | Rate limits, quotas, and abuse controls protect the service and its consumers. | H | Rate-limit configuration; quota policy; load test |
| **INT-04** | Timeouts, retries, idempotency, and backoff are defined and tested. | H | Configuration; test cases; incident review |
| **INT-05** | A consistent error model exposes safe, actionable errors without leaking sensitive information. | H | Error catalogue; sample responses; security review |
| **INT-06** | Webhooks and event callbacks are authenticated, replay-protected, and monitored. | G if webhooks | Signature verification; replay protection; delivery log |
| **INT-07** | Contract tests and a sandbox or test environment exist for integrators. | H | Contract-test suite; sandbox credentials; test report |
| **INT-08** | Data mapping and validation are defined, including schema changes and malformed input handling. | H | Mapping specification; validation rules; negative tests |
| **INT-09** | Integration health, latency, error rate, and delivery failures are observable. | H | Dashboard; alert rules; trace example |
| **INT-10** | Onboarding, support, and deprecation processes are documented for integrators. | H | Integration guide; support path; deprecation policy |
| **INT-11** | An integration SLA or support expectation is defined and measurable where the integration is business-critical. | H | SLA; reporting sample; escalation path |

---

## 3. Contract quality

A good integration contract answers:

- What is the purpose and scope?
- Who are the consumers and owners?
- What are the endpoints, events, or files?
- What authentication and authorization are required?
- What are the request and response schemas?
- What are the limits, timeouts, and retry expectations?
- What errors can occur, and what should the consumer do?
- How are breaking changes introduced?
- How long is the previous version supported?
- Who supports the integration, and how are incidents escalated?

The contract must be versioned. A breaking change requires a new major version and a migration path.

---

## 4. Security expectations

- Every non-public interface requires authentication.
- Authorization is scoped to the minimum data and actions required.
- Secrets are issued per consumer and can be rotated or revoked.
- Sensitive data is encrypted in transit.
- Error responses do not reveal internal paths, stack traces, secrets, or personal data.
- Webhooks are signed, timestamped, and protected against replay.
- Inbound payloads are validated against a schema and size limit.
- Outbound calls use an allow-list where feasible.
- Logs redact tokens, credentials, and sensitive payloads.
- Abuse controls include rate limits, quotas, and anomaly alerts.

---

## 5. Versioning and deprecation

| Change type | Version impact | Requirement |
|---|---|---|
| Additive, backward-compatible field | Minor | Document and announce |
| Behaviour change that consumers may notice | Major or explicit approval | Migration plan and notice |
| Removal of a field, endpoint, or event | Major | Deprecation period, migration support |
| Security fix | Patch or emergency | Notify affected consumers promptly |

A deprecation notice should include:

- what is changing;
- why;
- affected consumers;
- migration steps;
- support period;
- final shutdown date;
- contact and escalation path.

---

## 6. Evidence expectations

For each integration, be able to produce:

- contract and version history;
- authentication and authorization configuration;
- rate-limit and timeout configuration;
- contract-test results;
- sandbox or test evidence;
- monitoring dashboard and alert rules;
- incident and support records;
- deprecation notices and consumer acknowledgement.

For I3 integrations, add independent security review and abuse-test results.
