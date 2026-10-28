# SRAS-OPS-006 — Restores are tested and meet the recovery objective

- Domain: `operations`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

Backups must be restored in a test at a defined cadence, and the restore must meet the documented recovery time and recovery point objectives. A backup that has never been restored or misses its objective fails the requirement.

**Thai:** backup ต้องถูกกู้คืนในการทดสอบตามรอบที่กำหนด และการกู้คืนต้องเป็นไปตาม recovery time และ recovery point objectives ที่จัดทำเอกสาร backup ที่ไม่เคยถูกกู้คืนหรือไม่เป็นไปตามเป้าหมายถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Only a successful restore proves that a backup is usable.

**Thai:** การกู้คืนที่สำเร็จเท่านั้นที่พิสูจน์ว่า backup ใช้งานได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 180 days): Restore test record with scope, date, duration, and data point
- **document** (max 365 days): Documented recovery time and recovery point objectives

## Assessment

- Lite pass: A restore test was completed within the cadence and met the objective.
- Lite partial: A restore was tested but missed the objective or covers only part of the scope.
- Full L2: Tested at the defined cadence for all in-scope data.
- Full L3: Measured with restore success, duration, and gap findings.

## References

- [ISO/IEC 27001:2022 8.13](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.13` (partial) — Backup is required; restore testing and objectives are SRAS additions.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.DS-11` (partial) — Backups are covered; restore testing and recovery objectives are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
