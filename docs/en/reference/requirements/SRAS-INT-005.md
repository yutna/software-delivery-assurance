# SRAS-INT-005 — State-changing operations are idempotent under retry

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

A state-changing API operation that a consumer may retry must accept an idempotency key or an equivalent deduplication mechanism and return the original result for a repeated request. A retry must not create a duplicate transaction, message, or record.

**Thai:** การดำเนินการผ่าน API ที่เปลี่ยนสถานะและผู้ใช้บริการอาจ retry ต้องรองรับ idempotency key หรือกลไกป้องกันข้อมูลซ้ำที่เทียบเท่า และคืนผลลัพธ์เดิมสำหรับ request ที่ซ้ำ การ retry ต้องไม่สร้าง transaction message หรือ record ซ้ำ

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **test_result** (max 180 days): Duplicate-request and retry tests for state-changing operations
- **document** (max 365 days): Idempotency and deduplication design for each operation

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
