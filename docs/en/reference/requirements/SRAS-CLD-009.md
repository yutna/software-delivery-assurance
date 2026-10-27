# SRAS-CLD-009 — Cloud identities and encryption keys are controlled

- Module: `SRAS-CLD`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

Privileged cloud identities must use strong authentication, least privilege, and a reviewed access list. Encryption keys must have a named custodian, a rotation rule, and a documented recovery and revocation path.

**Thai:** identity ของ cloud ที่มีสิทธิ์สูงต้องใช้การยืนยันตัวตนที่แข็งแรง หลักการสิทธิ์น้อยที่สุด และรายการสิทธิ์การเข้าถึงที่ทบทวนแล้ว encryption key ต้องมีผู้ดูแลที่ระบุชื่อ กฎการหมุน และเส้นทาง recovery และ revocation ที่จัดทำเอกสาร

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Privileged identity, key rotation, and revocation configuration
- **log** (max 90 days): Privileged access review and key rotation records

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
