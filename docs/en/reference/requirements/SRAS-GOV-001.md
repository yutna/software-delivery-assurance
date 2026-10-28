# SRAS-GOV-001 — A named product owner and an approved assurance scope exist

- Domain: `governance`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/governance.yaml`

## Description

Every product must have a named product owner and an approved assurance scope that states the systems, users, data, tier, modules, and overlays in scope. An assessment without an approved scope is not valid.

**Thai:** ผลิตภัณฑ์ทุกตัวต้องมี product owner ที่ระบุชื่อและ assurance scope ที่ได้รับอนุมัติ ซึ่งระบุระบบ ผู้ใช้ ข้อมูล tier modules และ overlays ที่อยู่ในขอบเขต การประเมินที่ไม่มี scope ที่อนุมัติแล้วไม่ถือว่าถูกต้อง

## Rationale

Accountability and scope cannot be reconstructed after an assessment starts.

**Thai:** ไม่สามารถสร้าง accountability และ scope ย้อนหลังได้เมื่อการประเมินเริ่มแล้ว

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Approved product charter and assurance scope
- **ticket** (max 365 days): Scope approval record with owner and date

## Assessment

- Lite pass: The owner and approved scope are recorded for the current assessment.
- Lite partial: The owner is named but the scope is incomplete or unapproved.
- Full L2: Documented and approved before the assessment starts.
- Full L3: Reviewed at each assessment cycle and after material change.

## References

- [NIST CSF 2.0 GV.RR](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 5.3](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `4.3, 5.3` (supports) — Scope of the management system and assigned roles.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.OC-01, GV.RR-01` (supports) — Organizational context and leadership accountability.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `5.2 Conformance Requirements` (partial) — Scope approval should name the accessibility target; the accessibility requirements themselves belong to overlays.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
