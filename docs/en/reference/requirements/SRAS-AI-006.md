# SRAS-AI-006 — Prompts, models, and configuration are versioned

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

Prompts, system instructions, model identifiers, parameters, retrieval indexes, and safety filters must be versioned and linked to the release that used them. A production change without a recorded version cannot be reproduced or rolled back.

**Thai:** Prompt system instruction ตัวระบุโมเดล พารามิเตอร์ retrieval index และ safety filter ต้องถูก version และเชื่อมโยงกับ release ที่ใช้งาน การเปลี่ยนแปลงใน production ที่ไม่มี version บันทึกไว้ไม่สามารถทำซ้ำหรือ rollback ได้

## Rationale

An AI behaviour that cannot be reproduced cannot be investigated or rolled back.

**Thai:** พฤติกรรม AI ที่ทำซ้ำไม่ได้จะตรวจสอบและย้อนกลับไม่ได้เมื่อเกิดปัญหา

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Versioned prompt, model, and parameter manifest
- **document** (max 180 days): Release-to-version mapping for the current deployment

## Assessment

- Lite pass: Prompts and model settings are versioned and linked to the release.
- Lite partial: Some settings are versioned but the release mapping is incomplete.
- Full L2: Every change is versioned and traceable to a release.
- Full L3: Versions are reproducible from recorded artefacts and reviewed.

## References

- [NIST SP 800-218A](https://csrc.nist.gov/pubs/sp/800/218/a/final) — `standard`
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.6 AI system life cycle` (supports) — Life cycle records and version control.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MEASURE 1.1, MANAGE 1.1` (partial) — Measurement and response are covered; prompt and model versioning is an SRAS addition.
- [MAP-NISTSSDF — SRAS Core to NIST SP 800-218 (SSDF) 1.1](../crosswalks/MAP-NISTSSDF.md): `PS.3` (partial) — Prompts, models, and configuration are versioned; SP 800-218A adds model provenance and data lineage expectations.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
