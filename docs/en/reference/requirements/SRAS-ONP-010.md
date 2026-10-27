# SRAS-ONP-010 — Decommissioning removes data and access

- Module: `SRAS-ONP`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/on-prem/module.yaml`

## Description

An asset removed from service must have its data securely erased or destroyed, its credentials and network access revoked, and its inventory record closed with evidence. An asset that is powered off but still credentialed is not decommissioned.

**Thai:** asset ที่ถูกถอดออกจากบริการต้องมีข้อมูลถูกลบอย่างปลอดภัยหรือทำลาย ข้อมูลรับรองและสิทธิ์การเข้าถึงเครือข่ายถูกเพิกถอน และบันทึกในทะเบียนถูกปิดพร้อมหลักฐาน asset ที่ปิดเครื่องแต่ยังมีข้อมูลรับรองไม่ถือว่าปลดระวางแล้ว

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 365 days): Decommissioning record with data erasure and access revocation
- **attestation** (max 365 days): Destruction or secure erasure attestation

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
