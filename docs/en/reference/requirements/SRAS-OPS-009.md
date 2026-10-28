# SRAS-OPS-009 — Recurring incidents are investigated through problem management

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

Recurring or high-impact incidents must be recorded as problems with root-cause analysis, corrective actions, owners, and due dates, and the actions must be tracked to closure. A repeat incident with no problem record fails the requirement.

**Thai:** เหตุการณ์ที่เกิดซ้ำหรือมีผลกระทบสูงต้องถูกบันทึกเป็นปัญหา พร้อมการวิเคราะห์สาเหตุราก corrective actions owner และกำหนดส่งมอบ และต้องติดตามการดำเนินการจนปิด เหตุการณ์ที่เกิดซ้ำโดยไม่มีบันทึกปัญหาถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Fixing the symptom without the cause makes the incident likely to return.

**Thai:** การแก้ไขอาการโดยไม่แก้สาเหตุทำให้เหตุการณ์มีแนวโน้มกลับมาเกิดซ้ำ

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Problem register with root cause, corrective actions, owners, and due dates
- **ticket** (max 180 days): Closure or effectiveness review for corrective actions

## Assessment

- Lite pass: Recurring incidents have problem records and tracked actions.
- Lite partial: Some recurring incidents have no root cause or open actions are untracked.
- Full L2: Applied to recurring and high-impact incidents.
- Full L3: Measured with repeat-incident rate and corrective-action effectiveness.

## References

- [ISO/IEC 20000-1:2018](https://www.iso.org/standard/70636.html) — `standard`
- [NIST CSF 2.0 PR.IR](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.27, 10.1` (supports) — Learning from incidents and improvement.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
