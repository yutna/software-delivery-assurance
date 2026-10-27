# SRAS-RGD-009 — Sensitive data is minimised and access-controlled

- Module: `SRAS-RGD`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/regulated-data/module.yaml`

## Description

Sensitive data must be collected only when necessary, masked or tokenised where the purpose allows, encrypted at rest and in transit, and restricted to named roles with recorded access. Access must be reviewed on a defined cadence.

**Thai:** ข้อมูลอ่อนไหวต้องถูกเก็บเมื่อจำเป็นเท่านั้น ปกปิดหรือแทนที่ด้วย token เมื่อวัตถุประสงค์อนุญาต เข้ารหัสทั้งขณะจัดเก็บและระหว่างส่ง และจำกัดให้เฉพาะ role ที่ระบุพร้อมบันทึกการเข้าถึง ต้องทบทวนสิทธิการเข้าถึงตามรอบที่กำหนด

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Encryption, masking, and role-based access configuration
- **log** (max 90 days): Sensitive data access records and review

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
