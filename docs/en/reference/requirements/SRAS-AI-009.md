# SRAS-AI-009 — Drift is detected and triggers review

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

The product must monitor input, output, and performance drift and define the conditions that trigger re-evaluation, retraining, or withdrawal. Drift without a response owner is not managed.

**Thai:** ผลิตภัณฑ์ต้อง monitor drift ของ input output และประสิทธิภาพ และกำหนดเงื่อนไขที่กระตุ้นการประเมินซ้ำ การ train ใหม่ หรือการถอนออก Drift ที่ไม่มี owner รับผิดชอบไม่ถือว่าถูกจัดการ

## Rationale

Models and data change over time, so a prior evaluation goes stale.

**Thai:** โมเดลและข้อมูลเปลี่ยนแปลงตลอดเวลา ทำให้ผลประเมินเดิมล้าสมัย

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **metric** (max 30 days): Drift indicators for input, output, and performance
- **report** (max 90 days): Drift review and action record

## Assessment

- Lite pass: Drift is monitored and a trigger for review is defined.
- Lite partial: Drift is measured but no trigger or owner is defined.
- Full L2: Drift triggers a defined review with an accountable owner.
- Full L3: Drift actions are measured against later evaluation results.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `9.1 Monitoring, measurement, analysis and evaluation` (supports) — Monitoring supports drift detection and review.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MEASURE 2.1, MANAGE 3.1` (supports) — Monitoring supports drift detection and response.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
