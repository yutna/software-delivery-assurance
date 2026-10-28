# SRAS-AI-011 — Third-party models and model licences are assessed

- Module: `SRAS-AI`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/ai/module.yaml`

## Description

A third-party model, API, or training dataset must have a recorded licence, permitted use, data-handling terms, change-notification terms, and an exit path. A dependency without licence clarity must not be released.

**Thai:** โมเดล API หรือชุดข้อมูลของบุคคลที่สามต้องมี licence การใช้ที่ได้รับอนุญาต ข้อกำหนดการจัดการข้อมูล ข้อกำหนดการแจ้งเปลี่ยนแปลง และเส้นทางออกที่บันทึกไว้ dependency ที่ licence ไม่ชัดเจนต้องไม่ถูก release

## Rationale

Licence limits and supplier changes affect the product directly.

**Thai:** ข้อจำกัดของ licence และการเปลี่ยนแปลงจากผู้ให้บริการส่งผลต่อผลิตภัณฑ์โดยตรง

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **contract** (max 365 days): Model or dataset licence and data-handling terms
- **document** (max 365 days): Supplier change-notification and exit plan

## Assessment

- Lite pass: The licence and permitted use are recorded for each dependency.
- Lite partial: A licence is recorded but data terms or exit path is missing.
- Full L2: Licence, data terms, change notice, and exit path are recorded.
- Full L3: Supplier changes are tracked and trigger a product review.

## References

- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`
- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.10 Third-party and customer relationships` (supports) — Third-party model and supplier relationships.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `GOVERN 5.1, MAP 4.1` (supports) — Third-party risk and supplier governance.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
