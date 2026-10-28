# MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022

- Version: `0.1.0`
- Source standard: ISO/IEC 27001:2022
- Source URL: [https://www.iso.org/standard/27001](https://www.iso.org/standard/27001)
- Status: `draft`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `mappings/iso-27001.yaml`

## Description

Informative crosswalk from SRAS Core requirements to ISO/IEC 27001:2022 clauses and Annex A controls. It is not an equivalence or certification claim.

**Thai:** crosswalk เชิงข้อมูลจากข้อกำหนด SRAS Core ไปยังข้อกำหนดและ Annex A controls ของ ISO/IEC 27001:2022 ไม่ใช่การอ้างความเท่าเทียมหรือการรับรอง

This crosswalk is informative. It is not an equivalence, a certification, or a compliance claim.

## Mappings

- `SRAS-CHG-001` — `A.8.32, A.8.4` (supports) — Change management and source code access.
- `SRAS-CHG-002` — `A.8.32` (partial) — Change management is required; peer review is an SRAS addition.
- `SRAS-CHG-003` — `A.8.25, A.8.29` (partial) — Secure development and testing are covered; CI gating is an SRAS addition.
- `SRAS-CHG-004` — `A.8.29` (partial) — Security testing is required; journey coverage is an SRAS addition.
- `SRAS-CHG-005` — `A.8.31` (supports) — Separation of development, test, and production.
- `SRAS-CHG-006` — `A.8.32` (supports) — Change management.
- `SRAS-CHG-007` — `A.8.32` (partial) — Change management is required; tested rollback is an SRAS addition.
- `SRAS-CHG-008` — `7.5, A.8.32` (partial) — Documented information and change records support release evidence.
- `SRAS-CHG-009` — `A.8.9` (supports) — Configuration management.
- `SRAS-CHG-010` — `A.8.32, A.8.13` (partial) — Change and backup controls support recovery; database reversibility is an SRAS addition.
- `SRAS-GOV-001` — `4.3, 5.3` (supports) — Scope of the management system and assigned roles.
- `SRAS-GOV-002` — `6.1.2, 6.1.3` (supports) — Risk assessment and risk treatment process.
- `SRAS-GOV-003` — `9.1, 9.3` (supports) — Performance evaluation and management review.
- `SRAS-GOV-004` — `5.2` (supports) — Information security policy.
- `SRAS-GOV-005` — `5.3, A.5.2` (supports) — Roles, responsibilities, and segregation of duties.
- `SRAS-GOV-006` — `6.1.1, 6.1.2` (partial) — Risk criteria are required; appetite and tolerance are SRAS additions.
- `SRAS-GOV-007` — `6.1.3, 6.1.2` (partial) — Treatment plans are required; expiry and acceptance ownership are SRAS additions.
- `SRAS-GOV-008` — `9.2, A.5.35` (partial) — Independent review supports evidence; claim approval is an SRAS addition.
- `SRAS-GOV-009` — `9.3` (supports) — Management review.
- `SRAS-GOV-010` — `10.1, A.5.36` (partial) — Corrective action and compliance review support exceptions; time bounds are SRAS additions.
- `SRAS-INC-001` — `A.5.24, A.5.26` (supports) — Incident planning and response.
- `SRAS-INC-002` — `A.5.24, A.5.25` (partial) — Incident preparation and assessment are covered; severity taxonomy is an SRAS addition.
- `SRAS-INC-003` — `7.4, A.5.24` (partial) — Communication and incident planning support external messaging.
- `SRAS-INC-004` — `A.5.27, 10.1` (supports) — Incident learning and improvement.
- `SRAS-INC-005` — `A.5.29, A.5.30` (supports) — Continuity during disruption and ICT readiness.
- `SRAS-INC-006` — `A.5.30, A.8.14` (supports) — ICT readiness and processing redundancy.
- `SRAS-INC-007` — `A.5.24, A.5.29` (partial) — Incident and continuity controls support crisis response; command structure is an SRAS addition.
- `SRAS-INC-008` — `A.5.5, A.5.31` (partial) — Authority contact and legal requirements are covered; notification readiness is an SRAS addition.
- `SRAS-OPS-001` — `A.8.15, A.8.16` (supports) — Logging and monitoring.
- `SRAS-OPS-002` — `A.8.16, A.5.37` (partial) — Monitoring and procedures are covered; alert ownership is an SRAS addition.
- `SRAS-OPS-003` — `9.1, A.8.6` (partial) — Monitoring and capacity are covered; service objectives are an SRAS addition.
- `SRAS-OPS-004` — `A.8.6` (supports) — Capacity management.
- `SRAS-OPS-005` — `A.8.13` (supports) — Information backup.
- `SRAS-OPS-006` — `A.8.13` (partial) — Backup is required; restore testing and objectives are SRAS additions.
- `SRAS-OPS-007` — `A.5.37` (partial) — Operating procedures are required; exercising them is an SRAS addition.
- `SRAS-OPS-008` — `A.5.24, A.5.29` (partial) — Incident and continuity controls support escalation; on-call rosters are SRAS additions.
- `SRAS-OPS-009` — `A.5.27, 10.1` (supports) — Learning from incidents and improvement.
- `SRAS-OPS-010` — `7.4, A.5.37` (partial) — Communication and procedures support status updates; user-facing status is an SRAS addition.
- `SRAS-PRV-001` — `A.5.9, A.5.12, A.5.34` (supports) — Asset inventory, classification, and PII protection.
- `SRAS-PRV-002` — `A.5.33, A.8.10` (supports) — Records protection and information deletion.
- `SRAS-PRV-003` — `A.5.34` (partial) — PII protection is required; request timelines are an SRAS addition.
- `SRAS-PRV-004` — `A.5.34, A.5.31` (partial) — PII and legal requirements are covered; lawful basis recording is an SRAS addition.
- `SRAS-PRV-005` — `A.5.34` (partial) — PII protection is required; field-level need is an SRAS addition.
- `SRAS-PRV-006` — `A.5.34` (partial) — PII protection is required; notice and consent matching are SRAS additions.
- `SRAS-PRV-007` — `A.5.14, A.5.34` (partial) — Transfer and PII controls are covered; transfer mechanisms are jurisdiction-specific.
- `SRAS-PRV-008` — `A.5.24, A.5.25, A.5.26` (supports) — Incident preparation, assessment, and response.
- `SRAS-PRV-009` — `A.5.19, A.5.20, A.5.22` (supports) — Supplier relationships, agreements, and monitoring.
- `SRAS-PRV-010` — `A.5.34, A.8.25` (partial) — Privacy and secure development are covered; a separate assessment is an SRAS addition.
- `SRAS-SCM-001` — `A.5.9, A.8.1` (supports) — Asset inventory and endpoint devices.
- `SRAS-SCM-002` — `A.5.21, A.8.19` (partial) — Supply chain and software installation controls support component visibility; SBOM is an SRAS addition.
- `SRAS-SCM-003` — `A.5.21, A.8.19, A.8.7` (supports) — Supply chain, software installation, and malware protection.
- `SRAS-SCM-004` — `A.5.19, A.5.22` (supports) — Supplier relationships and monitoring.
- `SRAS-SCM-005` — `A.5.32` (supports) — Intellectual property rights.
- `SRAS-SCM-006` — `A.5.22, A.8.8` (partial) — Supplier monitoring and vulnerability management support end-of-life tracking.
- `SRAS-SCM-007` — `A.5.21, A.5.22` (supports) — ICT supply chain and supplier monitoring.
- `SRAS-SCM-008` — `A.5.22, A.5.30` (partial) — Supplier monitoring and continuity support exit planning; concentration risk is an SRAS addition.
- `SRAS-SCM-009` — `A.5.20, A.5.31` (supports) — Supplier agreements and legal requirements.
- `SRAS-SCM-010` — `A.5.7, A.5.22, A.5.24` (supports) — Threat intelligence, supplier monitoring, and incident planning.
- `SRAS-SEC-001` — `A.5.15, A.8.5` (supports) — Access control and secure authentication.
- `SRAS-SEC-002` — `A.5.18, A.8.2, A.8.3` (supports) — Access rights, privileged access, and access restriction.
- `SRAS-SEC-003` — `A.5.17` (supports) — Authentication information.
- `SRAS-SEC-004` — `A.8.24` (supports) — Use of cryptography.
- `SRAS-SEC-005` — `A.8.5, A.8.2` (partial) — Secure authentication is required; MFA specificity is an SRAS addition.
- `SRAS-SEC-006` — `A.5.18, A.8.2` (supports) — Access provisioning, review, and privileged access.
- `SRAS-SEC-007` — `A.8.25, A.8.26, A.8.27` (supports) — Secure development, application requirements, and architecture.
- `SRAS-SEC-008` — `A.8.28, A.8.29` (partial) — Secure coding and testing are required; change gating is an SRAS addition.
- `SRAS-SEC-009` — `A.8.8` (supports) — Technical vulnerability management.
- `SRAS-SEC-010` — `A.8.15, A.8.16` (supports) — Logging and monitoring.
- `SRAS-SEC-011` — `A.8.20, A.8.22` (supports) — Network security and segregation.
- `SRAS-SEC-012` — `A.8.29, A.8.34` (partial) — Security testing and audit protection are covered; independence is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
