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

## Rationale

An event that is not collected or reviewed cannot be detected or investigated.

**Thai:** เหตุการณ์ที่ไม่ถูกเก็บหรือทบทวนไม่สามารถตรวจจับหรือสืบสวนได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Log collection, retention, and alert rule configuration
- **test_result** (max 90 days): Alert test showing detection and notification
- **document** (max 365 days): Logging and monitoring ownership and retention policy

## Assessment

- Lite pass: Security events are logged with retention and alerts reach a named owner.
- Lite partial: Logging exists but retention, alerting, or ownership is incomplete.
- Full L2: Covered for all production systems and critical events.
- Full L3: Measured with detection coverage, alert quality, and time-to-acknowledge.

## References

- [NIST CSF 2.0 DE.CM](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.15 and 8.16](https://www.iso.org/standard/27001) — `standard`
- [OWASP ASVS V7 Logging](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-16.2, v5.0.0-16.3` (supports) — General logging and security events.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.15, A.8.16` (supports) — Logging and monitoring.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `DE.CM-01, DE.AE-02` (supports) — Continuous monitoring and adverse event analysis.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `10.2, 10.4` (supports) — Audit logging and review.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
