# SRAS-CLD-003 — Data residency commitments are met and evidenced

- Module: `SRAS-CLD`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

Where a residency commitment is made, the product must record the permitted locations for storage, processing, backup, and support access, and must evidence that production data stays within them. A location that is not recorded is not covered by the commitment.

**Thai:** เมื่อมีข้อผูกพันด้านสถานที่เก็บข้อมูล ผลิตภัณฑ์ต้องบันทึกสถานที่ที่อนุญาตสำหรับการจัดเก็บ การประมวลผล การสำรองข้อมูล และการเข้าถึงเพื่อสนับสนุน และต้องมีหลักฐานว่าข้อมูล production อยู่ในสถานที่เหล่านั้น สถานที่ที่ไม่ได้บันทึกไว้ไม่อยู่ในข้อผูกพัน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Residency commitment with permitted locations and scope
- **configuration** (max 180 days): Region, backup, and support access configuration

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
