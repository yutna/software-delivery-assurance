# SRAS-CLD-002 — Tenant isolation is enforced and tested

- Module: `SRAS-CLD`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

A multi-tenant service must isolate tenant data and configuration at the application, storage, and network layers, and must test that a tenant cannot read or change another tenant's data or metadata. Isolation must not depend on a single check.

**Thai:** บริการ multi-tenant ต้องแยกข้อมูลและ configuration ของ tenant ที่ชั้น application storage และ network และต้องทดสอบว่า tenant หนึ่งไม่สามารถอ่านหรือแก้ไขข้อมูลหรือ metadata ของ tenant อื่นได้ การแยกต้องไม่พึ่งพาการตรวจสอบเพียงจุดเดียว

## Rationale

A single missing filter exposes every tenant to every other tenant.

**Thai:** การขาด filter เพียงจุดเดียวทำให้ tenant ทุกรายเข้าถึงข้อมูลของกันและกันได้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **test_result** (max 180 days): Cross-tenant access tests for data and metadata
- **configuration** (max 180 days): Tenant isolation controls at application and storage layers

## Assessment

- Lite pass: Tenant isolation is enforced and tested with negative cases.
- Lite partial: Isolation is designed but tests or storage controls are incomplete.
- Full L2: Isolation is tested across application, storage, and network paths.
- Full L3: Isolation tests run on every release and after schema change.

## References

- [ISO/IEC 27017:2015](https://www.iso.org/standard/43757.html) — `standard`
- [CSA Cloud Controls Matrix](https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4) — `guidance`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
