# SRAS-ONP-007 — Disaster recovery is planned and exercised

- Module: `SRAS-ONP`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/on-prem/module.yaml`

## Description

The product must define recovery objectives for on-premises failure scenarios, a recovery procedure, and a test cadence. A disaster recovery plan that has not been exercised within its stated cadence is not current.

**Thai:** ผลิตภัณฑ์ต้องกำหนด recovery objective สำหรับสถานการณ์ล้มเหลวของ on-premises ขั้นตอนการกู้คืน และรอบการทดสอบ แผน disaster recovery ที่ไม่ได้ซ้อมภายในรอบที่กำหนดไม่ถือว่าเป็นปัจจุบัน

## Rationale

A recovery procedure that only exists on paper fails when the facility does.

**Thai:** ขั้นตอนกู้คืนที่มีเพียงบนกระดาษจะล้มเหลวเมื่อสถานที่ใช้งานไม่ได้

## Applicability

- Tiers: 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Recovery objectives and procedure per failure scenario
- **report** (max 365 days): Disaster recovery exercise result

## Assessment

- Lite pass: Objectives, procedure, and a test cadence are defined.
- Lite partial: A plan exists but it has not been exercised.
- Full L2: The plan is exercised and results are recorded.
- Full L3: Gaps are tracked to closure and objectives are met.

## References

- [ISO 22301:2019](https://www.iso.org/standard/75106.html) — `standard`
- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
