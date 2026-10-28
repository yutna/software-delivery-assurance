# SRAS-INC-005 — A business continuity plan covers critical products and dependencies

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

The product must have an approved business continuity plan that identifies critical functions, dependencies, recovery priorities, and alternate arrangements. A plan that omits a critical dependency or has no owner fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องมีแผนความต่อเนื่องทางธุรกิจที่ได้รับอนุมัติ ซึ่งระบุฟังก์ชันที่สำคัญ dependencies ลำดับความสำคัญในการกู้คืน และแนวทางสำรอง แผนที่ละเว้น dependency ที่สำคัญหรือไม่มี owner ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Continuity depends on the weakest dependency, not the strongest system.

**Thai:** ความต่อเนื่องขึ้นอยู่กับ dependency ที่อ่อนแอที่สุด ไม่ใช่ระบบที่แข็งแรงที่สุด

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Approved business continuity plan with critical functions and dependencies
- **ticket** (max 365 days): Plan review or exercise record

## Assessment

- Lite pass: The plan is approved, owned, and covers critical dependencies.
- Lite partial: A plan exists but dependencies, priorities, or ownership are incomplete.
- Full L2: Approved and exercised for the current scope.
- Full L3: Reviewed after material change and measured with recovery capability.

## References

- [ISO 22301:2019](https://www.iso.org/standard/75106.html) — `standard`
- [ISO/IEC 27001:2022 5.29 and 5.30](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.29, A.5.30` (supports) — Continuity during disruption and ICT readiness.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `RC.RP-01` (supports) — Recovery plan execution.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
