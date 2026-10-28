# SRAS-GOV-007 — Risk treatment and acceptance decisions have an owner and expiry

- Domain: `governance`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/governance.yaml`

## Description

Each material risk must have a recorded treatment or acceptance decision with an owner, rationale, residual rating, and expiry date. An open risk without a decision or expiry is treated as unmanaged.

**Thai:** ความเสี่ยงที่มีนัยสำคัญแต่ละรายการต้องมีบันทึกการตัดสินใจจัดการหรือยอมรับ พร้อม owner เหตุผล ระดับความเสี่ยงคงเหลือ และวันหมดอายุ ความเสี่ยงที่เปิดอยู่โดยไม่มีการตัดสินใจหรือวันหมดอายุถือว่ายังไม่ได้รับการจัดการ

## Rationale

Acceptance without an expiry becomes permanent by accident.

**Thai:** การยอมรับความเสี่ยงที่ไม่มีวันหมดอายุจะกลายเป็นถาวรโดยไม่ตั้งใจ

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Risk treatment plan and acceptance register with owners and expiry dates
- **ticket** (max 180 days): Treatment or acceptance approval record

## Assessment

- Lite pass: Every material risk has a treatment or time-bound acceptance decision.
- Lite partial: Some risks are open without a decision, owner, or expiry.
- Full L2: Decisions recorded and linked to the current register.
- Full L3: Tracked to closure, residual risk re-rated, and expiries reviewed before they lapse.

## References

- [ISO/IEC 27001:2022 6.1.3](https://www.iso.org/standard/27001) — `standard`
- [ISO 31000:2018](https://www.iso.org/standard/65694.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `6.1.3, 6.1.2` (partial) — Treatment plans are required; expiry and acceptance ownership are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
