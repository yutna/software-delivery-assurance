# SRAS-OPS-005 — Backups are configured, encrypted, and monitored

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

In-scope data and configuration must have scheduled backups with defined frequency, retention, encryption, and monitoring, and backup failures must alert an owner. A data store without a current successful backup fails the requirement.

**Thai:** ข้อมูลและ configuration ที่อยู่ในขอบเขตต้องมี backup ตามกำหนดการพร้อมความถี่ ระยะเวลาจัดเก็บ การเข้ารหัส และการเฝ้าระวังที่กำหนด และความล้มเหลวของ backup ต้องแจ้ง owner data store ที่ไม่มี backup ที่สำเร็จล่าสุดถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A backup that silently fails is worse than no backup because it creates false confidence.

**Thai:** backup ที่ล้มเหลวอย่างเงียบ ๆ แย่กว่าไม่มี backup เพราะสร้างความเชื่อมั่นที่ผิด

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Backup schedule, retention, encryption, and monitoring configuration
- **report** (max 30 days): Latest backup success and coverage report

## Assessment

- Lite pass: In-scope data has monitored, encrypted backups within retention.
- Lite partial: Backups exist but coverage, encryption, or monitoring is incomplete.
- Full L2: Covered for all in-scope data and configuration.
- Full L3: Measured with success rate, coverage, and restore readiness.

## References

- [ISO/IEC 27001:2022 8.13](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.13` (supports) — Information backup.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.DS-11` (supports) — Data backups.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `9.5.1` (partial) — Backup media protection is covered; backup encryption and monitoring are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
