# SRAS-INT-007 — API errors are safe, stable, and actionable

- Module: `SRAS-INT`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

An API error must return a stable code, a safe message, and a correlation identifier, and must not expose stack traces, internal hostnames, credentials, or another consumer's data. Documented error codes must match the published contract.

**Thai:** Error ของ API ต้องคืน code ที่คงที่ ข้อความที่ปลอดภัย และ correlation identifier และต้องไม่เปิดเผย stack trace hostname ภายใน ข้อมูลรับรอง หรือข้อมูลของผู้ใช้บริการรายอื่น code ของ error ที่จัดทำเอกสารต้องตรงกับ contract ที่เผยแพร่

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Error code catalogue and safe error format
- **test_result** (max 180 days): Negative tests for error content and correlation identifiers

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
