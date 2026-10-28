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

## Rationale

An export that only the original service can read is not portability.

**Thai:** การส่งออกที่อ่านได้เฉพาะบริการเดิมไม่ใช่การพกพาข้อมูล

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Export format specification and schema
- **test_result** (max 365 days): Import of an export into a separate environment

## Assessment

- Lite pass: The export format and schema are documented and usable.
- Lite partial: An export exists but the schema or completeness is unverified.
- Full L2: The export is tested outside the exporting service.
- Full L3: The export covers relationships and is versioned.

## References

- [ISO/IEC 27018:2019](https://www.iso.org/standard/76559.html) — `standard`
- [CSA Cloud Controls Matrix](https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4) — `guidance`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
