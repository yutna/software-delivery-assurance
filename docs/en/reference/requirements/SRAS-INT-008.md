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

## Rationale

Without a shared identifier, a failing integration cannot be attributed to a hop or a consumer.

**Thai:** หากไม่มี identifier ที่ใช้ร่วมกัน integration ที่ล้มเหลวไม่สามารถระบุจุดที่ผิดหรือผู้ใช้บริการได้

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **metric** (max 30 days): Integration latency, error, and saturation metrics
- **configuration** (max 180 days): Logging, tracing, and alerting configuration

## Assessment

- Lite pass: Requests carry a correlation identifier and errors are alerted.
- Lite partial: Metrics exist but tracing or alerting is incomplete.
- Full L2: Tracing, metrics, logs, and alerts cover the integration path.
- Full L3: Alerts are tuned and reviewed against real incidents.

## References

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — `standard`
- [NIST CSF 2.0](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-16.2` (supports) — General logging.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
