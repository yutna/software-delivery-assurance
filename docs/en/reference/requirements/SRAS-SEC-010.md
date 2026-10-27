# SRAS-SEC-010 — Security events are logged, monitored, and alerted with an owner

- Domain: `security`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Security-relevant events must be collected in a protected log with sufficient context and retention, monitored for defined conditions, and routed to a named owner with an actionable alert. An unmonitored production system fails the requirement.

**Thai:** เหตุการณ์ที่เกี่ยวข้องกับความปลอดภัยต้องถูกรวบรวมใน log ที่ได้รับการป้องกันพร้อมบริบทและระยะเวลาจัดเก็บที่เพียงพอ ถูกเฝ้าระวังตามเงื่อนไขที่กำหนด และส่งต่อไปยัง owner ที่ระบุชื่อพร้อมการแจ้งเตือนที่นำไปปฏิบัติได้ ระบบ production ที่ไม่มีการเฝ้าระวังถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Log collection, retention, and alert rule configuration
- **test_result** (max 90 days): Alert test showing detection and notification
- **document** (max 365 days): Logging and monitoring ownership and retention policy

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
