# SRAS-ONP-009 — Remote and privileged access is controlled and logged

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

Remote administrative access to on-premises assets must require strong authentication, be limited to named individuals, be logged, and be reviewed on a defined cadence. Shared administrative accounts must not be used.

**Thai:** การเข้าถึงเพื่อดูแลระบบจากระยะไกลไปยัง asset ใน on-premises ต้องใช้การยืนยันตัวตนที่แข็งแรง จำกัดเฉพาะบุคคลที่ระบุชื่อ บันทึก และทบทวนตามรอบที่กำหนด ต้องไม่ใช้บัญชีผู้ดูแลระบบที่ใช้ร่วมกัน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Remote access, authentication, and session logging configuration
- **log** (max 90 days): Privileged session records and access review

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
