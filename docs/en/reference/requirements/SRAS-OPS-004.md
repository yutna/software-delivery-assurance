# SRAS-OPS-004 — Capacity and load limits are planned and tested

- Domain: `operations`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

Critical journeys must have a capacity model, expected peak load, and a load test or equivalent evidence showing headroom. A production system with unknown limits or no peak test fails the requirement.

**Thai:** critical journeys ต้องมี capacity model โหลดสูงสุดที่คาดไว้ และการทดสอบโหลดหรือหลักฐานเทียบเท่าที่แสดง headroom ระบบ production ที่ไม่ทราบขีดจำกัดหรือไม่มีการทดสอบโหลดสูงสุดถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Capacity model with expected peak and scaling limits
- **test_result** (max 180 days): Load test or capacity exercise result

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
