# SRAS-AI-008 — Production AI behaviour is monitored against thresholds

- Module: `SRAS-AI`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/ai/module.yaml`

## Description

An AI capability in production must be monitored for quality, safety signals, refusal and failure rates, latency, and cost against defined thresholds. A threshold breach must trigger a recorded response.

**Thai:** ความสามารถ AI ใน production ต้องถูก monitor ด้านคุณภาพ สัญญาณความปลอดภัย อัตราการปฏิเสธและความล้มเหลว latency และต้นทุน เทียบกับเกณฑ์ที่กำหนด การละเมิดเกณฑ์ต้องกระตุ้นการตอบสนองที่บันทึกไว้

## Rationale

A pre-release evaluation does not confirm behaviour under real data.

**Thai:** ผล evaluation ก่อน release ไม่ได้ยืนยันพฤติกรรมภายใต้ข้อมูลจริง

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **metric** (max 30 days): Production quality, safety, latency, and cost monitoring
- **ticket** (max 90 days): Threshold breach response record

## Assessment

- Lite pass: Key quality and safety signals are monitored with thresholds.
- Lite partial: Monitoring exists but thresholds or responses are undefined.
- Full L2: Monitored with defined thresholds and a response owner.
- Full L3: Trends are reviewed and thresholds are recalibrated with evidence.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `9.1 Monitoring, measurement, analysis and evaluation` (supports) — Performance monitoring and evaluation.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MEASURE 2.1, MANAGE 3.1` (supports) — Monitoring and risk response.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
