# SRAS-INC-001 — An incident response plan covers roles, phases, and evidence

- Domain: `incident-continuity`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/incident-continuity.yaml`

## Description

The product must have an approved incident response plan that defines roles, severity, detection, containment, eradication, recovery, and evidence handling. A plan without an owner or evidence-handling step fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องมีแผนตอบสนองเหตุการณ์ที่ได้รับอนุมัติ ซึ่งกำหนดบทบาท severity การตรวจจับ การจำกัดวง การกำจัดต้นเหตุ การกู้คืน และการจัดการหลักฐาน แผนที่ไม่มี owner หรือไม่มีขั้นตอนจัดการหลักฐานถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A response improvised during an incident loses time and evidence.

**Thai:** การตอบสนองที่คิดขึ้นในระหว่างเหตุการณ์ทำให้สูญเสียเวลาและหลักฐาน

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Approved incident response plan with roles and phases
- **ticket** (max 365 days): Plan review or exercise record

## Assessment

- Lite pass: The plan is approved, owned, and covers response phases and evidence.
- Lite partial: A plan exists but roles, phases, or evidence handling are incomplete.
- Full L2: Approved and exercised for the current release.
- Full L3: Reviewed after incidents and measured with response-time trends.

## References

- [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) — `standard`
- [ISO/IEC 27001:2022 5.24 and 5.26](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.24, A.5.26` (supports) — Incident planning and response.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `RS.MA-01, RS.MA-02` (supports) — Incident response plan and incident triage.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
