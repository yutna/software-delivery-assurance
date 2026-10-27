# 07 — Cloud and SaaS Extension

**Parent:** `README.md`  
**Version:** v0.1.0  
**Applies to:** multi-tenant SaaS, cloud-hosted products, managed services, and products operated by the vendor on behalf of customers

---

## 1. Scope

This module covers the additional risks of operating software as a service:

- multiple customers sharing infrastructure or application layers;
- tenant-specific configuration and data;
- vendor-managed upgrades and regional hosting;
- shared responsibility between the provider and the customer;
- subscription, metering, and exit.

It is cloud-provider neutral. A private cloud, public cloud, or managed data centre can use the same requirements.

---

## 2. Checklist

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **SAAS-01** | Tenant isolation is enforced at the application, data, and infrastructure layers appropriate to the risk. | G | Isolation design; access tests; cross-tenant test results; data-store rules |
| **SAAS-02** | Tenant provisioning and deprovisioning are controlled, auditable, and include data export and deletion. | G | Provisioning runbook; audit log; deletion evidence |
| **SAAS-03** | Tenant-specific configuration, limits, and customizations are managed without compromising other tenants. | H | Configuration model; limit tests; change controls |
| **SAAS-04** | The shared-responsibility model is documented for customers, including what the provider and customer each secure and operate. | H | Shared-responsibility matrix; customer documentation |
| **SAAS-05** | Hosting regions, data residency, and replication are documented and match customer commitments. | G if residency is promised | Region map; data-location register; replication configuration |
| **SAAS-06** | Service status, uptime reporting, and maintenance communication are available to customers. | H | Status page; SLA report; maintenance notice |
| **SAAS-07** | Usage metering, cost allocation, and tenant-level cost visibility are defined where applicable. | M | Metering design; cost dashboard; invoice reconciliation |
| **SAAS-08** | Customers have an exit path: data export, format documentation, transition support, and deletion confirmation. | H | Export test; format specification; exit runbook |

---

## 3. Tenant isolation evidence

Isolation claims require more than an architecture diagram. Depending on the model, evidence may include:

- separate databases, schemas, or row-level security policies;
- tenant identifiers enforced at every data-access layer;
- authorization tests that attempt cross-tenant access;
- object-storage prefix or bucket isolation;
- cache and queue key isolation;
- background-job and search-index isolation;
- logging that prevents cross-tenant data exposure;
- backup and restore isolation;
- deletion that covers all copies and derived data.

A cross-tenant access test should be repeated after material changes to authorization or data access.

---

## 4. Shared responsibility

Document, for each layer:

| Layer | Provider responsibility | Customer responsibility |
|---|---|---|
| Identity | Platform identity, federation support | User lifecycle, role assignment |
| Application | Product security, updates, availability | Configuration, acceptable use |
| Data | Encryption, backup, isolation | Data classification, content, retention decisions |
| Infrastructure | Hosting, network, physical security | Connectivity, on-premises components |
| Support | Incident response, status communication | Contact details, escalation participation |

The matrix must match the contract. Sales claims must not contradict it.

---

## 5. Multi-tenant change safety

Changes that affect shared components require extra care:

- authorization and tenant-resolution logic;
- shared caches, queues, and search indexes;
- database migrations;
- rate limits and quotas;
- feature flags that could expose features to the wrong tenant;
- background jobs that process multiple tenants;
- analytics and reporting that aggregate tenant data.

Use staged rollout, tenant canaries where feasible, and rollback plans. Test with at least two tenants, including one with restrictive permissions.

---

## 6. Exit and portability

A customer exit plan should cover:

- what data is exported;
- format and schema;
- how long export is available;
- how deletion is verified;
- what happens to backups and derived data;
- transition assistance;
- final billing and access removal.

An exit plan that exists only in a contract but has never been tested is not strong evidence. Test an export at least once before claiming exit readiness.
