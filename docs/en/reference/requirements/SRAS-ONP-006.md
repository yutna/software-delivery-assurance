# SRAS-ONP-006 — Backup is complete, isolated, and restore-tested

- Module: `SRAS-ONP`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/on-prem/module.yaml`

## Description

Product data and configuration must be backed up on a defined schedule, protected from deletion by the primary environment, encrypted, and restore-tested. A backup that has never been restored is not a verified backup.

**Thai:** ข้อมูลและ configuration ของผลิตภัณฑ์ต้องถูกสำรองตามกำหนด ป้องกันการลบจากสภาพแวดล้อมหลัก เข้ารหัส และทดสอบการกู้คืน backup ที่ไม่เคยถูกกู้คืนไม่ใช่ backup ที่ตรวจสอบแล้ว

## Rationale

An untested backup is a hope, not a recovery capability.

**Thai:** backup ที่ไม่เคยทดสอบเป็นเพียงความหวัง ไม่ใช่ความสามารถในการกู้คืน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Backup schedule, isolation, encryption, and retention
- **test_result** (max 180 days): Restore test with measured result

## Assessment

- Lite pass: Backups run, are isolated, and a restore has been tested.
- Lite partial: Backups run but isolation or restore evidence is incomplete.
- Full L2: Backups are isolated, encrypted, and restore-tested on cadence.
- Full L3: Restore results are reviewed against recovery objectives.

## References

- [ISO 22301:2019](https://www.iso.org/standard/75106.html) — `standard`
- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
