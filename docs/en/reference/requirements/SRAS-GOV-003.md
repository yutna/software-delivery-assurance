# SRAS-GOV-003 — Assurance is reviewed on a cadence and after material change

- Domain: `governance`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/governance.yaml`

## Description

The product must define an assurance review cadence and trigger a review after a material architecture, data, vendor, or model change. A review with no owner or date is not complete.

**Thai:** ผลิตภัณฑ์ต้องกำหนดรอบการทบทวน assurance และต้องทบทวนเมื่อเกิดการเปลี่ยนแปลงที่มีนัยสำคัญด้านสถาปัตยกรรม ข้อมูล ผู้ขาย หรือโมเดล การทบทวนที่ไม่มี owner หรือวันที่ไม่ถือว่าเสร็จสมบูรณ์

## Rationale

A one-time assessment goes stale when the product or its dependencies change.

**Thai:** การประเมินครั้งเดียวจะล้าสมัยเมื่อผลิตภัณฑ์หรือ dependency เปลี่ยน

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Documented assurance cadence and material-change triggers
- **ticket** (max 365 days): Most recent assurance review record with owner and date

## Assessment

- Lite pass: The cadence and the latest review are recorded.
- Lite partial: A cadence is documented but the latest review is missing.
- Full L2: Documented and followed for the current release.
- Full L3: Measured with review completion and stale-assessment metrics.

## References

- [ISO/IEC 27001:2022 9.3](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 GV.OC](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `9.1, 9.3` (supports) — Performance evaluation and management review.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.OV-01, GV.OV-02` (supports) — Risk management strategy outcomes and performance measurement.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
