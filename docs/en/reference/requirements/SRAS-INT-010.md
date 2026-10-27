# SRAS-INT-010 — API versions are deprecated with notice and a migration path

- Module: `SRAS-INT`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

A deprecated API version must have a published sunset date, a notice period defined in the contract, a documented migration path, and usage monitoring. A version must not be withdrawn while an active consumer has no reviewed migration plan.

**Thai:** API version ที่ถูก deprecate ต้องมีวัน sunset ที่เผยแพร่ ระยะเวลาแจ้งล่วงหน้าที่กำหนดใน contract เส้นทาง migration ที่จัดทำเอกสาร และการ monitor การใช้งาน ต้องไม่ถอน version ขณะที่ผู้ใช้บริการที่ยังใช้งานอยู่ไม่มีแผน migration ที่ทบทวนแล้ว

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Deprecation policy, sunset date, and migration path
- **metric** (max 30 days): Active usage of the deprecated version

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
