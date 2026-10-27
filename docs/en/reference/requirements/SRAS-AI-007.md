# SRAS-AI-007 — Model and prompt changes follow controlled release and rollback

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

A change to a model, prompt, retrieval source, or safety configuration must pass the evaluation gate, have a rollback path, and record the approver. An emergency change must be reviewed within a defined period.

**Thai:** การเปลี่ยนแปลงโมเดล prompt แหล่ง retrieval หรือ safety configuration ต้องผ่าน evaluation gate มีเส้นทาง rollback และบันทึกผู้อนุมัติ การเปลี่ยนแปลงฉุกเฉินต้องถูกทบทวนภายในระยะเวลาที่กำหนด

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 180 days): Change approval with evaluation result and rollback plan
- **document** (max 365 days): Rollback procedure and last rollback test

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
