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

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Backup schedule, isolation, encryption, and retention
- **test_result** (max 180 days): Restore test with measured result

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
