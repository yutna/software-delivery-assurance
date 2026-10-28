# SRAS-OPS-010 — Maintenance and service status are communicated to users

- Domain: `operations`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/operations.yaml`

## Description

Planned maintenance, degraded service, and customer-impacting outages must have an approved communication path, status channel, and owner, with messages issued within a defined target. An unannounced maintenance window or silent outage fails the requirement.

**Thai:** การบำรุงรักษาตามแผน บริการที่เสื่อมคุณภาพ และ outage ที่กระทบลูกค้า ต้องมีช่องทางสื่อสารที่ได้รับอนุมัติ ช่องทางสถานะ และ owner โดยส่งข้อความภายในเป้าหมายที่กำหนด การบำรุงรักษาที่ไม่ประกาศหรือ outage ที่เงียบถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Users plan around known maintenance and trust a status channel that is used.

**Thai:** ผู้ใช้สามารถวางแผนได้เมื่อทราบการบำรุงรักษาและไว้วางใจช่องทางสถานะที่มีการใช้งานจริง

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Maintenance and status communication procedure with templates and owner
- **report** (max 180 days): Status communications issued for the current period

## Assessment

- Lite pass: Maintenance and outages have an owned communication path and current examples.
- Lite partial: A procedure exists but some maintenance or outages are not communicated.
- Full L2: Applied to all planned maintenance and customer-impacting outages.
- Full L3: Measured with notice time, status accuracy, and user-report trends.

## References

- [ISO/IEC 20000-1:2018](https://www.iso.org/standard/70636.html) — `standard`
- [NIST CSF 2.0 PR.IR](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `7.4, A.5.37` (partial) — Communication and procedures support status updates; user-facing status is an SRAS addition.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `4.1.3 Status Messages` (partial) — Service status updates should be exposed as accessible status messages.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
