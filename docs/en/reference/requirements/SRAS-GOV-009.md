# SRAS-GOV-009 — Management reviews assurance results, risks, and open decisions

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

Top management must review assurance results, material risks, open exceptions, and claim status at a defined cadence, and must record decisions with owners and due dates. A review without recorded decisions or follow-up is not effective.

**Thai:** ผู้บริหารระดับสูงต้องทบทวนผล assurance ความเสี่ยงที่มีนัยสำคัญ ข้อยกเว้นที่ค้างอยู่ และสถานะ claim ตามรอบที่กำหนด และต้องบันทึกการตัดสินใจพร้อม owner และกำหนดส่งมอบ การทบทวนที่ไม่มีบันทึกการตัดสินใจหรือการติดตามผลไม่ถือว่ามีประสิทธิผล

## Rationale

Assurance findings only change outcomes when management decides and follows up.

**Thai:** ผลการประเมิน assurance จะเปลี่ยนผลลัพธ์ได้ก็ต่อเมื่อผู้บริหารตัดสินใจและติดตามผล

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Management review minutes with attendees, inputs, decisions, owners, and due dates
- **ticket** (max 180 days): Action tracker showing closure or escalation

## Assessment

- Lite pass: The latest review is recorded with decisions and assigned actions.
- Lite partial: A review occurred but decisions or actions are missing.
- Full L2: Held on the defined cadence with required inputs and outputs.
- Full L3: Actions tracked to closure and effectiveness reviewed with trend evidence.

## References

- [ISO/IEC 27001:2022 9.3](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 GV.OV](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `9.3` (supports) — Management review.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
