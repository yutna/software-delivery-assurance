# SRAS-SEC-001 — Authentication is required for every human and machine access path

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

Every user, service, and administrative access path to production systems must require authentication. Shared accounts are prohibited for administrative access.

**Thai:** ผู้ใช้ บริการ และช่องทางผู้ดูแลทุกรายการที่เข้าถึงระบบ production ต้องมี authentication และห้ามใช้บัญชีร่วมสำหรับผู้ดูแล

## Rationale

Unauthenticated access cannot be attributed, revoked, or audited.

**Thai:** การเข้าถึงที่ไม่มีการยืนยันตัวตนไม่สามารถระบุตัวตน เพิกถอน หรือตรวจสอบย้อนหลังได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Identity provider or access policy configuration
- **test_result** (max 90 days): Access-control test for user, service, and admin paths

## Assessment

- Lite pass: All production access paths require authentication.
- Lite partial: Some paths require authentication, and the gaps are documented.
- Full L2: Documented and implemented for all in-scope paths.
- Full L3: Measured with access-review metrics.

## References

- [NIST CSF 2.0 PR.AA](https://www.nist.gov/cyberframework) — `standard`
- [OWASP ASVS V2 Authentication](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-6.3` (supports) — General authentication security.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.15, A.8.5` (supports) — Access control and secure authentication.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.AA-01, PR.AA-03` (supports) — Identity management, authentication, and access control.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `8.3` (supports) — Strong authentication for users and administrators.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
