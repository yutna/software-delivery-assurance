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

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **metric** (max 30 days): Drift indicators for input, output, and performance
- **report** (max 90 days): Drift review and action record

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
