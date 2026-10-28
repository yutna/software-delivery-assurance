# SRAS-PRV-005 — Data collection is limited to fields with a documented need

- Domain: `privacy`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

Each personal data field must have a documented purpose and retention need, and fields without a current need must be removed or justified. A new field collected without review fails the requirement.

**Thai:** ฟิลด์ข้อมูลส่วนบุคคลแต่ละฟิลด์ต้องมีวัตถุประสงค์และความจำเป็นด้านการจัดเก็บที่จัดทำเอกสาร และฟิลด์ที่ไม่มีความจำเป็นในปัจจุบันต้องถูกลบหรือมีเหตุผลรองรับ การเพิ่มฟิลด์ใหม่โดยไม่มีการทบทวนถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Unnecessary fields increase breach impact and the cost of retention and deletion.

**Thai:** ฟิลด์ที่ไม่จำเป็นเพิ่มผลกระทบจากการรั่วไหลและต้นทุนของการจัดเก็บและการลบ

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Field-level data inventory with purpose and necessity decision
- **ticket** (max 365 days): Review record for new personal data fields

## Assessment

- Lite pass: Personal data fields have a documented need and no unreviewed fields are collected.
- Lite partial: Some fields lack a documented need or review.
- Full L2: Applied to all in-scope collection points.
- Full L3: Measured with field count, unused-field findings, and removal trends.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.34` (partial) — PII protection is required; field-level need is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
