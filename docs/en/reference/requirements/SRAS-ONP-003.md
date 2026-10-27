# SRAS-ONP-003 — Vulnerabilities and patches are remediated within a defined timeframe

- Module: `SRAS-ONP`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/on-prem/module.yaml`

## Description

The product must maintain a vulnerability and patch process with severity-based remediation timeframes, an owner, and an exception path. A critical vulnerability without a recorded decision is not managed.

**Thai:** ผลิตภัณฑ์ต้องมีกระบวนการจัดการช่องโหว่และการแพตช์พร้อมระยะเวลาแก้ไขตามความรุนแรง owner และเส้นทางยกเว้น ช่องโหว่ระดับวิกฤตที่ไม่มีบันทึกการตัดสินใจไม่ถือว่าถูกจัดการ

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 90 days): Vulnerability scan results with severity and remediation status
- **ticket** (max 365 days): Patch exception or risk acceptance record

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
