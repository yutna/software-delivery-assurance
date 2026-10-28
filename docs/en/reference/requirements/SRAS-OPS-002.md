# SRAS-OPS-002 — Actionable alerts have an owner and a linked runbook

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

Alerts for critical journeys must be actionable, routed to a named owner, linked to a runbook, and tested to show detection and notification. An alert with no owner or no test record fails the requirement.

**Thai:** การแจ้งเตือนสำหรับ critical journeys ต้องนำไปปฏิบัติได้ ส่งถึง owner ที่ระบุชื่อ เชื่อมโยงกับ runbook และผ่านการทดสอบเพื่อแสดงการตรวจจับและการแจ้ง การแจ้งเตือนที่ไม่มี owner หรือไม่มีบันทึกการทดสอบถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

An alert that nobody owns or acts on is noise, not detection.

**Thai:** การแจ้งเตือนที่ไม่มีใครรับผิดชอบหรือลงมือทำเป็นเพียงเสียงรบกวน ไม่ใช่การตรวจจับ

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Alert rules and routing configuration
- **test_result** (max 90 days): Alert test showing detection, routing, and acknowledgement

## Assessment

- Lite pass: Critical alerts are owned, runbook-linked, and tested.
- Lite partial: Alerts exist but some lack an owner, runbook, or test.
- Full L2: Covered for all critical journeys.
- Full L3: Measured with alert precision, time-to-acknowledge, and false-positive trends.

## References

- [NIST CSF 2.0 DE.CM](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.16](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.16, A.5.37` (partial) — Monitoring and procedures are covered; alert ownership is an SRAS addition.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `DE.AE-02, DE.AE-06` (supports) — Adverse event analysis and alerting.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
