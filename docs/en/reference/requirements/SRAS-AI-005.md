# SRAS-AI-005 — Training and retrieval data have documented provenance and permitted use

- Module: `SRAS-AI`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/ai/module.yaml`

## Description

Data used for training, fine-tuning, retrieval, or evaluation must have a recorded source, permitted use, quality assessment, and retention rule. Data with unknown provenance or without a permitted use must not be used.

**Thai:** ข้อมูลที่ใช้สำหรับ training fine-tuning retrieval หรือ evaluation ต้องมีแหล่งที่มา การใช้ที่ได้รับอนุญาต ผลประเมินคุณภาพ และกฎการเก็บรักษาที่บันทึกไว้ ข้อมูลที่ไม่ทราบแหล่งที่มาหรือไม่มีการใช้ที่ได้รับอนุญาตต้องไม่ถูกนำมาใช้

## Rationale

Data without a permitted use creates product and customer risk that no model quality can offset.

**Thai:** ข้อมูลที่ไม่มีสิทธิ์ใช้งานสร้างความเสี่ยงต่อผลิตภัณฑ์และลูกค้าที่คุณภาพโมเดลชดเชยไม่ได้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Data provenance and permitted-use register
- **contract** (max 365 days): Data use terms for external or licensed sources

## Assessment

- Lite pass: Every data source has a recorded origin and permitted use.
- Lite partial: Some sources are recorded but quality or retention is missing.
- Full L2: Provenance, permitted use, quality, and retention are recorded.
- Full L3: Data lineage is traceable to the model and evaluation version.

## References

- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`
- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.7 Data for AI systems` (supports) — Data quality, provenance, and preparation.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MAP 2.1, GOVERN 6.1` (partial) — Data mapping and third-party data governance are covered; permitted-use records are an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
