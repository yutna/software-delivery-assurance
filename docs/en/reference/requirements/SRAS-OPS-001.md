# SRAS-OPS-001 — Production telemetry covers logs, metrics, and traces

- Domain: `operations`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

Production systems must emit logs, metrics, and traces with correlation identifiers, defined retention, and coverage of critical journeys and dependencies. A critical component with no telemetry fails the requirement.

**Thai:** ระบบ production ต้องส่ง logs metrics และ traces พร้อม correlation identifier ระยะเวลาจัดเก็บที่กำหนด และครอบคลุม critical journeys และ dependencies องค์ประกอบสำคัญที่ไม่มี telemetry ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Without telemetry, operators cannot see failure or reconstruct what happened.

**Thai:** หากไม่มี telemetry ผู้ปฏิบัติงานไม่สามารถมองเห็นความล้มเหลวหรือสร้างลำดับเหตุการณ์ย้อนหลังได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Telemetry collection and retention configuration
- **report** (max 90 days): Coverage report for critical journeys and dependencies

## Assessment

- Lite pass: Critical components emit correlated logs, metrics, and traces with retention.
- Lite partial: Telemetry exists but some critical components or retention gaps remain.
- Full L2: Covered for all critical journeys and dependencies.
- Full L3: Measured with coverage, retention compliance, and query readiness.

## References

- [NIST CSF 2.0 DE.CM](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.16](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.15, A.8.16` (supports) — Logging and monitoring.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `DE.CM-01, DE.CM-03` (supports) — Network and computing resource monitoring.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `10.2` (supports) — Audit logs capture access and activity.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
