# SRAS-INT-003 — Authorization is enforced on every request and object

- Module: `SRAS-INT`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

Each API request must be authorized against the caller's role, tenant, and target object, not only its route. Object-level access must be checked so that a caller cannot read or change another tenant's or another user's data.

**Thai:** API request ทุกครั้งต้องถูกตรวจสอบสิทธิ์ตาม role tenant และ object ปลายทาง ไม่ใช่เพียง route ต้องตรวจสอบสิทธิ์ระดับ object เพื่อไม่ให้ผู้เรียกอ่านหรือแก้ไขข้อมูลของ tenant หรือผู้ใช้อื่นได้

## Rationale

Route-level checks leave direct object access as the easiest path to another party's data.

**Thai:** การตรวจสอบระดับ route ทำให้การเข้าถึง object โดยตรงเป็นช่องทางที่ง่ายที่สุดในการเข้าถึงข้อมูลของผู้อื่น

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **test_result** (max 180 days): Authorization tests for role, tenant, and object boundaries
- **document** (max 365 days): Authorization model and tenant isolation design

## Assessment

- Lite pass: Role and object-level authorization is enforced and tested.
- Lite partial: Route-level checks exist but object-level checks are incomplete.
- Full L2: Role, tenant, and object checks are tested for every sensitive route.
- Full L3: Authorization tests run on every release and cover negative cases.

## References

- [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x00-header/) — `guidance`
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-8.3` (supports) — Operation-level authorization.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
