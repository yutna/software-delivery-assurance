# SRAS-SEC-002 — Authorization enforces least privilege for every role

- Domain: `security`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Every role must have documented permissions limited to its duties, and access must be denied by default. A role with unused administrative permissions fails this requirement.

**Thai:** ทุก role ต้องมีสิทธิ์ที่จัดทำเอกสารและจำกัดตามหน้าที่ และต้องปฏิเสธการเข้าถึงโดยค่าเริ่มต้น role ที่มีสิทธิ์ผู้ดูแลเกินความจำเป็นถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Excessive permissions widen the impact of a compromised account.

**Thai:** สิทธิ์ที่เกินความจำเป็นขยายผลกระทบเมื่อบัญชีถูก compromise

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Role and permission matrix mapped to duties
- **configuration** (max 180 days): Authorization policy configuration
- **ticket** (max 180 days): Access review record with approver and date

## Assessment

- Lite pass: Roles and permissions are documented and least privilege is applied.
- Lite partial: Roles are documented but some permissions are excessive.
- Full L2: Implemented and reviewed for the current release.
- Full L3: Measured with access-review findings and remediation trends.

## References

- [NIST CSF 2.0 PR.AA](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.2 and 8.3](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-8.3` (supports) — Operation-level authorization.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.18, A.8.2, A.8.3` (supports) — Access rights, privileged access, and access restriction.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.AA-05` (supports) — Least privilege and access permissions.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `7.2, 7.3` (supports) — Access restriction by business need-to-know.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
