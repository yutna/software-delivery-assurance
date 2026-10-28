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

## Rationale

Capacity failures appear at the worst time and are expensive to fix under pressure.

**Thai:** ความล้มเหลวด้าน capacity เกิดขึ้นในเวลาที่แย่ที่สุดและมีค่าใช้จ่ายสูงในการแก้ไขภายใต้แรงกดดัน

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Capacity model with expected peak and scaling limits
- **test_result** (max 180 days): Load test or capacity exercise result

## Assessment

- Lite pass: Critical journeys have a capacity model and peak-load evidence.
- Lite partial: A model exists but peak load or headroom is untested.
- Full L2: Reviewed for the current release and expected peak.
- Full L3: Measured with saturation, headroom, and cost trends.

## References

- [ISO/IEC 27001:2022 8.6](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 PR.IR](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.6` (supports) — Capacity management.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
