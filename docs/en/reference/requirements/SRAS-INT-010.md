# SRAS-INT-010 — API versions are deprecated with notice and a migration path

- Module: `SRAS-INT`
- Criticality: `medium`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/integration/module.yaml`

## Description

A deprecated API version must have a published sunset date, a notice period defined in the contract, a documented migration path, and usage monitoring. A version must not be withdrawn while an active consumer has no reviewed migration plan.

**Thai:** API version ที่ถูก deprecate ต้องมีวัน sunset ที่เผยแพร่ ระยะเวลาแจ้งล่วงหน้าที่กำหนดใน contract เส้นทาง migration ที่จัดทำเอกสาร และการ monitor การใช้งาน ต้องไม่ถอน version ขณะที่ผู้ใช้บริการที่ยังใช้งานอยู่ไม่มีแผน migration ที่ทบทวนแล้ว

## Rationale

An unannounced removal breaks consumers and turns a planned change into an incident.

**Thai:** การถอนโดยไม่แจ้งทำให้ผู้ใช้บริการเสียหายและเปลี่ยนการเปลี่ยนแปลงที่วางแผนไว้เป็นเหตุการณ์ผิดปกติ

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Deprecation policy, sunset date, and migration path
- **metric** (max 30 days): Active usage of the deprecated version

## Assessment

- Lite pass: The sunset date and notice period are published.
- Lite partial: A deprecation exists but notice or migration evidence is incomplete.
- Full L2: Notice, migration, and usage monitoring are in place.
- Full L3: Withdrawal is blocked until every active consumer has a reviewed plan.

## References

- [IETF RFC 8594 Sunset HTTP Header](https://www.rfc-editor.org/rfc/rfc8594.html) — `standard`
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-4.2` (related) — HTTP message structure validation is related; deprecation practice is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
