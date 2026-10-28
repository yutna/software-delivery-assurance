# SRAS-AI-003 — Release is gated by evaluation against approved thresholds

- Module: `SRAS-AI`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/ai/module.yaml`

## Description

An AI capability must pass a documented evaluation suite with defined metrics, acceptance thresholds, and negative cases before release. A release with no recorded evaluation result, or with results below the approved threshold, is not accepted.

**Thai:** ความสามารถ AI ต้องผ่านชุด evaluation ที่จัดทำเอกสารไว้ โดยมี metric เกณฑ์ผ่าน และ negative case ที่กำหนด ก่อน release การ release ที่ไม่มีผล evaluation หรือมีผลต่ำกว่าเกณฑ์ที่อนุมัติไม่ถือว่ายอมรับได้

## Rationale

AI quality cannot be confirmed from a demonstration or an opinion.

**Thai:** คุณภาพของ AI ไม่สามารถยืนยันได้จาก demo หรือความคิดเห็น

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **test_result** (max 180 days): Evaluation run against approved metrics and thresholds
- **report** (max 180 days): Evaluation summary with approval for the current release

## Assessment

- Lite pass: The evaluation suite and the result are recorded and pass.
- Lite partial: An evaluation exists but thresholds or negative cases are incomplete.
- Full L2: Evaluated against approved thresholds before the current release.
- Full L3: Evaluation covers production-like data and regression against prior releases.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.6 AI system life cycle` (supports) — Verification and validation across the AI system life cycle.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MEASURE 1.1, MEASURE 2.1` (supports) — Measurement and evaluation of AI risk.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
