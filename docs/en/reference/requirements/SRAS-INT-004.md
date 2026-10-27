# SRAS-INT-004 — Rate limits and abuse controls protect shared capacity

- Module: `SRAS-INT`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

Public and partner APIs must enforce documented rate limits, burst controls, and payload limits, and return a clear retry signal when a limit is exceeded. Repeated authentication failures and enumeration attempts must be throttled and recorded.

**Thai:** API สำหรับสาธารณะและ partner ต้องบังคับใช้ rate limit การควบคุม burst และขีดจำกัดขนาด payload ตามเอกสาร และส่งสัญญาณให้ลองใหม่ที่ชัดเจนเมื่อเกินขีดจำกัด การยืนยันตัวตนที่ล้มเหลวซ้ำและการพยายาม enumerate ต้องถูกจำกัดความเร็วและบันทึกไว้

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Rate limit, burst, and payload limit configuration
- **metric** (max 30 days): Throttling and rejection metrics for the review period

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
