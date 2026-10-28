# SRAS-SCM-006 — End-of-life components are tracked and replaced on a plan

- Domain: `supply-chain`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

The product must track end-of-support dates for components and platforms, and must have a dated plan to replace or accept each end-of-life item. An end-of-life component in production without an approved plan fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องติดตามวันสิ้นสุดการสนับสนุนขององค์ประกอบและแพลตฟอร์ม และต้องมีแผนที่ระบุวันที่สำหรับการแทนที่หรือยอมรับแต่ละรายการที่หมดอายุ องค์ประกอบที่หมดอายุการสนับสนุนใน production โดยไม่มีแผนที่ได้รับอนุมัติถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

An unsupported component receives no security fixes and becomes a permanent exception.

**Thai:** องค์ประกอบที่ไม่ได้รับการสนับสนุนไม่ได้รับ security fixes และกลายเป็นข้อยกเว้นถาวร

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): End-of-life inventory with support dates and replacement plan
- **ticket** (max 180 days): Approval record for any accepted end-of-life risk

## Assessment

- Lite pass: End-of-life items have a dated replacement or acceptance decision.
- Lite partial: Some end-of-life items are unsupported without a plan.
- Full L2: Tracked and planned for all in-scope components.
- Full L3: Measured with end-of-life count and replacement lead time.

## References

- [ISO/IEC 27001:2022 5.9](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 GV.SC](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.22, A.8.8` (partial) — Supplier monitoring and vulnerability management support end-of-life tracking.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
