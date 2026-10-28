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

## Rationale

A forgotten asset keeps its credentials and its data.

**Thai:** asset ที่ถูกลืมยังคงมีข้อมูลรับรองและข้อมูลของตน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 365 days): Decommissioning record with data erasure and access revocation
- **attestation** (max 365 days): Destruction or secure erasure attestation

## Assessment

- Lite pass: Decommissioned assets have data erased and access revoked.
- Lite partial: The record exists but erasure or revocation is unverified.
- Full L2: Erasure, revocation, and inventory closure are evidenced.
- Full L3: Decommissioning is sampled and reconciled with the inventory.

## References

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
