# SRAS-INT-008 — Integration traffic is observable end to end

- Module: `SRAS-INT`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

Requests must be traceable across the integration path with a correlation identifier, latency and error metrics, and logs that exclude secrets and sensitive payloads. A defined alert must fire when error or latency thresholds are breached.

**Thai:** request ต้องถูกติดตามได้ตลอดเส้นทาง integration ด้วย correlation identifier metric ของ latency และ error และ log ที่ไม่รวม secret หรือ payload ที่ละเอียดอ่อน ต้องมี alert ที่กำหนดไว้เมื่อ error หรือ latency เกินเกณฑ์

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **metric** (max 30 days): Integration latency, error, and saturation metrics
- **configuration** (max 180 days): Logging, tracing, and alerting configuration

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
