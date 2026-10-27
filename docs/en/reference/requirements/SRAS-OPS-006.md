# SRAS-OPS-006 — Restores are tested and meet the recovery objective

- Domain: `operations`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

Backups must be restored in a test at a defined cadence, and the restore must meet the documented recovery time and recovery point objectives. A backup that has never been restored or misses its objective fails the requirement.

**Thai:** backup ต้องถูกกู้คืนในการทดสอบตามรอบที่กำหนด และการกู้คืนต้องเป็นไปตาม recovery time และ recovery point objectives ที่จัดทำเอกสาร backup ที่ไม่เคยถูกกู้คืนหรือไม่เป็นไปตามเป้าหมายถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 180 days): Restore test record with scope, date, duration, and data point
- **document** (max 365 days): Documented recovery time and recovery point objectives

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
