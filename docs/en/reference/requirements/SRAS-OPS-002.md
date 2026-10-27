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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Alert rules and routing configuration
- **test_result** (max 90 days): Alert test showing detection, routing, and acknowledgement

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
