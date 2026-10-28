# SRAS-OPS-007 — Runbooks exist for common failures and are exercised

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

Common failure modes for critical journeys must have current runbooks with detection, decision criteria, steps, and escalation, and the runbooks must be exercised or reviewed. A critical failure mode with no runbook fails the requirement.

**Thai:** รูปแบบความล้มเหลวที่พบบ่อยของ critical journeys ต้องมี runbook ที่เป็นปัจจุบันพร้อมการตรวจจับ เกณฑ์การตัดสินใจ ขั้นตอน และการส่งต่อ และ runbook ต้องผ่านการซ้อมหรือทบทวน รูปแบบความล้มเหลวที่สำคัญซึ่งไม่มี runbook ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A runbook turns a rare, high-pressure failure into a practiced response.

**Thai:** runbook เปลี่ยนความล้มเหลวที่พบได้ยากและมีแรงกดดันสูงให้เป็นการตอบสนองที่ฝึกฝนแล้ว

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Runbook index mapped to failure modes
- **ticket** (max 180 days): Exercise or review record for runbooks in the current period

## Assessment

- Lite pass: Common failure modes have current, exercised runbooks.
- Lite partial: Some runbooks exist but coverage or exercise is incomplete.
- Full L2: Covered for critical journeys and reviewed for the current release.
- Full L3: Measured with runbook coverage, exercise completion, and time-to-recover.

## References

- [ISO/IEC 20000-1:2018](https://www.iso.org/standard/70636.html) — `standard`
- [NIST CSF 2.0 PR.IR](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.37` (partial) — Operating procedures are required; exercising them is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
