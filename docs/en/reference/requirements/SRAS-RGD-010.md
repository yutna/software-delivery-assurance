# SRAS-RGD-010 — Records of processing are current and reviewable

- Module: `SRAS-RGD`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/regulated-data/module.yaml`

## Description

A record of processing activities must describe each purpose, data category, data subject category, recipient, transfer, retention rule, and security measure, and must be reviewed when the processing changes.

**Thai:** บันทึกกิจกรรมการประมวลผลต้องอธิบายวัตถุประสงค์ ประเภทข้อมูล ประเภทเจ้าของข้อมูล ผู้รับข้อมูล การโอน กฎการเก็บรักษา และมาตรการความปลอดภัยของแต่ละรายการ และต้องถูกทบทวนเมื่อการประมวลผลเปลี่ยน

## Rationale

A record assembled only for an audit is usually incomplete.

**Thai:** บันทึกที่รวบรวมเฉพาะเมื่อมีการตรวจสอบมักไม่ครบถ้วน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Record of processing activities with owners
- **ticket** (max 180 days): Review record after a processing change

## Assessment

- Lite pass: The record covers every processing purpose and is current.
- Lite partial: A record exists but recipients or transfers are incomplete.
- Full L2: The record is current and reviewed after material change.
- Full L3: The record is reconciled with the data inventory and contracts.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [NIST Privacy Framework 1.0](https://www.nist.gov/privacy-framework) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
