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

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **test_result** (max 180 days): Evaluation run against approved metrics and thresholds
- **report** (max 180 days): Evaluation summary with approval for the current release

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
