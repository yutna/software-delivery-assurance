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

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **metric** (max 30 days): Production quality, safety, latency, and cost monitoring
- **ticket** (max 90 days): Threshold breach response record

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
