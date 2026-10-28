# SRAS-INC-007 — Crisis management has a command structure and decision log

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

A crisis that exceeds normal incident handling must activate a predefined command structure with named roles, decision authority, and a decision log. A crisis response with no commander or no decision record fails the requirement.

**Thai:** วิกฤตที่เกินกว่าการจัดการเหตุการณ์ปกติต้องเปิดใช้โครงสร้างการบัญชาการที่กำหนดไว้ล่วงหน้าพร้อมบทบาทที่ระบุชื่อ อำนาจตัดสินใจ และบันทึกการตัดสินใจ การตอบสนองวิกฤตที่ไม่มีผู้บัญชาการหรือไม่มีบันทึกการตัดสินใจถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Crisis decisions made without clear authority and records cannot be coordinated or reviewed.

**Thai:** การตัดสินใจในวิกฤตที่ไม่มีอำนาจชัดเจนและไม่มีบันทึกไม่สามารถประสานงานหรือทบทวนได้

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Crisis management plan with command roles and decision authority
- **report** (max 365 days): Crisis exercise record with decision log

## Assessment

- Lite pass: A crisis plan and decision log are defined and exercised.
- Lite partial: A plan exists but roles, authority, or the decision log are incomplete.
- Full L2: Exercised for the current scope.
- Full L3: Measured with activation time and decision-cycle performance.

## References

- [ISO 22301:2019](https://www.iso.org/standard/75106.html) — `standard`
- [NIST CSF 2.0 RS.CO](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.24, A.5.29` (partial) — Incident and continuity controls support crisis response; command structure is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
