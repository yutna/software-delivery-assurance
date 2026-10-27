# SRAS-CLD-006 — Data portability uses a documented and usable format

- Module: `SRAS-CLD`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

Exported customer data must use a documented format with a published schema, must preserve the agreed scope and relationships, and must be usable without the exporting service. A proprietary format with no published schema does not meet the requirement.

**Thai:** ข้อมูลลูกค้าที่ส่งออกต้องใช้รูปแบบที่จัดทำเอกสารพร้อม schema ที่เผยแพร่ ต้องรักษาขอบเขตและความสัมพันธ์ตามที่ตกลง และต้องใช้งานได้โดยไม่ต้องพึ่งบริการที่ส่งออก รูปแบบเฉพาะของผลิตภัณฑ์ที่ไม่มี schema เผยแพร่ไม่เป็นไปตามข้อกำหนด

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Export format specification and schema
- **test_result** (max 365 days): Import of an export into a separate environment

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
