# SRAS-INC-006 — Disaster recovery is planned, tested, and meets its objectives

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

The product must have a disaster recovery plan with recovery time and recovery point objectives, and the plan must be exercised at a defined cadence with results recorded. An untested DR plan or a missed objective fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องมีแผนกู้คืนจากภัยพิบัติพร้อม recovery time และ recovery point objectives และต้องมีการซ้อมแผนตามรอบที่กำหนดโดยบันทึกผลลัพธ์ แผน DR ที่ไม่เคยทดสอบหรือไม่เป็นไปตามเป้าหมายถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A DR plan that has never run is a hypothesis, not a capability.

**Thai:** แผน DR ที่ไม่เคยทำงานจริงเป็นเพียงสมมติฐาน ไม่ใช่ขีดความสามารถ

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Disaster recovery plan with RTO, RPO, and roles
- **report** (max 365 days): DR exercise result with duration and gaps

## Assessment

- Lite pass: The DR plan is documented, owned, and exercised.
- Lite partial: A plan exists but is untested or misses its objective.
- Full L2: Exercised at the defined cadence for critical services.
- Full L3: Measured with RTO/RPO attainment and gap closure.

## References

- [ISO 22301:2019](https://www.iso.org/standard/75106.html) — `standard`
- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.30, A.8.14` (supports) — ICT readiness and processing redundancy.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `RC.RP-01, RC.RP-02` (supports) — Recovery plan execution and restoration activities.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
