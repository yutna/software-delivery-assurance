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

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Versioned prompt, model, and parameter manifest
- **document** (max 180 days): Release-to-version mapping for the current deployment

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
