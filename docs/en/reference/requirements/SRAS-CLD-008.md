# SRAS-CLD-008 — Cloud audit logs are complete, protected, and retained

- Module: `SRAS-CLD`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

Administrative, authentication, and data-access events must be logged with actor, time, source, and target, protected from modification by the logged account, and retained for the defined period. A log that can be edited by the actor it records is not trustworthy.

**Thai:** เหตุการณ์ด้าน administration authentication และการเข้าถึงข้อมูลต้องถูกบันทึกพร้อม actor เวลา แหล่งที่มา และเป้าหมาย ป้องกันการแก้ไขโดยบัญชีที่ถูกบันทึก และเก็บรักษาตามระยะเวลาที่กำหนด log ที่ผู้ถูกบันทึกสามารถแก้ไขได้ไม่น่าเชื่อถือ

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Audit log destination, immutability, and retention configuration
- **log** (max 90 days): Sample audit events with actor, time, source, and target

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
