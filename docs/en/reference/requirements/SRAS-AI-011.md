# SRAS-AI-011 — Third-party models and model licences are assessed

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

A third-party model, API, or training dataset must have a recorded licence, permitted use, data-handling terms, change-notification terms, and an exit path. A dependency without licence clarity must not be released.

**Thai:** โมเดล API หรือชุดข้อมูลของบุคคลที่สามต้องมี licence การใช้ที่ได้รับอนุญาต ข้อกำหนดการจัดการข้อมูล ข้อกำหนดการแจ้งเปลี่ยนแปลง และเส้นทางออกที่บันทึกไว้ dependency ที่ licence ไม่ชัดเจนต้องไม่ถูก release

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **contract** (max 365 days): Model or dataset licence and data-handling terms
- **document** (max 365 days): Supplier change-notification and exit plan

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
