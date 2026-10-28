# SRAS-INC-003 — Incident communication is planned for internal and external audiences

- Domain: `incident-continuity`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/incident-continuity.yaml`

## Description

The product must define who communicates incident status to internal teams, customers, and regulators, with approved templates, cadence, and authority. An incident communication sent without an owner or approval path fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องกำหนดผู้สื่อสารสถานะเหตุการณ์แก่ทีมภายใน ลูกค้า และหน่วยงานกำกับดูแล พร้อมแม่แบบ จังหวะเวลา และอำนาจอนุมัติที่ได้รับอนุมัติ การสื่อสารเหตุการณ์ที่ส่งโดยไม่มี owner หรือเส้นทางอนุมัติถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Conflicting or premature communication creates more harm than the outage itself.

**Thai:** การสื่อสารที่ขัดแย้งหรือเร็วเกินไปสร้างความเสียหายมากกว่า outage เอง

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Incident communication plan with audiences, templates, cadence, and approvers
- **report** (max 180 days): Communication record from the latest exercise or incident

## Assessment

- Lite pass: Communication roles, templates, and approval paths are defined and current.
- Lite partial: A plan exists but audiences, templates, or approvals are incomplete.
- Full L2: Applied to the current release and exercised.
- Full L3: Measured with notice time, message accuracy, and stakeholder feedback.

## References

- [NIST CSF 2.0 RS.CO](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 5.26](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `7.4, A.5.24` (partial) — Communication and incident planning support external messaging.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `1.1.1 Non-text Content` (related) — Incident communication should provide text alternatives for non-text content.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
