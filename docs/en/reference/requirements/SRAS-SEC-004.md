# SRAS-SEC-004 — Sensitive data is encrypted in transit and at rest

- Domain: `security`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Sensitive data must be encrypted in transit and at rest using approved algorithms, and keys must have an owner and a rotation procedure. A production data store with unencrypted sensitive data fails this requirement.

**Thai:** ข้อมูลที่ละเอียดอ่อนต้องถูกเข้ารหัสระหว่างส่งและขณะจัดเก็บด้วยอัลกอริทึมที่ได้รับอนุมัติ และ key ต้องมี owner และขั้นตอนการ rotate data store ใน production ที่มีข้อมูลละเอียดอ่อนไม่เข้ารหัสถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): TLS and encryption-at-rest configuration
- **document** (max 365 days): Key ownership and rotation procedure
- **test_result** (max 180 days): Encryption verification for production data stores

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
