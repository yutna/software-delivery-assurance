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

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **test_result** (max 180 days): Authorization tests for role, tenant, and object boundaries
- **document** (max 365 days): Authorization model and tenant isolation design

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
