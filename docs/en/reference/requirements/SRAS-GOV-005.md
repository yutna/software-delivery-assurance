# SRAS-GOV-005 — Assurance roles and decision rights are assigned to named people

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

The product must name the people accountable for scope, risk, evidence, assessment, and claim approval, and must define their decision rights and escalation path. A role that is unnamed or has no decision authority is not assigned.

**Thai:** ผลิตภัณฑ์ต้องระบุชื่อผู้รับผิดชอบด้าน scope ความเสี่ยง หลักฐาน การประเมิน และการอนุมัติ claim พร้อมกำหนดสิทธิในการตัดสินใจและเส้นทางการส่งต่อปัญหา บทบาทที่ไม่มีชื่อผู้รับผิดชอบหรือไม่มีอำนาจตัดสินใจถือว่ายังไม่ได้รับมอบหมาย

## Rationale

Unassigned decision rights create gaps between finding a problem and acting on it.

**Thai:** สิทธิในการตัดสินใจที่ยังไม่ถูกมอบหมายทำให้เกิดช่องว่างระหว่างการพบปัญหากับการลงมือแก้ไข

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Role assignment or RACI covering assurance roles and decision rights
- **attestation** (max 365 days): Owner acknowledgement of assigned responsibilities

## Assessment

- Lite pass: Every assurance role has a named owner and a documented escalation path.
- Lite partial: Some roles are unnamed or have no decision authority.
- Full L2: Documented, acknowledged, and current for the assessment scope.
- Full L3: Reviewed each cycle and after organisational change, with deputies named.

## References

- [ISO/IEC 27001:2022 5.3](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 GV.RR](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `5.3, A.5.2` (supports) — Roles, responsibilities, and segregation of duties.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.RR-02` (supports) — Roles and responsibilities for cybersecurity risk management.
- [MAP-NISTSSDF — SRAS Core to NIST SP 800-218 (SSDF) 1.1](../crosswalks/MAP-NISTSSDF.md): `PO.2` (supports) — Assurance roles and decision rights cover the SSDF roles and responsibilities practice.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
