# SRAS-PRV-002 — Retention and deletion rules are implemented and evidenced

- Domain: `privacy`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

Personal data must have a defined retention period and an implemented deletion or anonymization process; deletion must be evidenced. A retention schedule without execution evidence is not sufficient.

**Thai:** ข้อมูลส่วนบุคคลต้องมีระยะเวลาจัดเก็บที่กำหนดและกระบวนการลบหรือทำให้ไม่สามารถระบุตัวตนได้ที่นำไปใช้จริง โดยต้องมีหลักฐานการลบ ตารางการจัดเก็บที่ไม่มีการดำเนินการไม่ถือว่าเพียงพอ

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Approved retention schedule mapped to data types
- **log** (max 180 days): Deletion or anonymization job evidence for the current period
- **report** (max 180 days): Exception report for data past its retention period

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
