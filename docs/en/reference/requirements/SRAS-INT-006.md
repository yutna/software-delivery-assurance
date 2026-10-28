# SRAS-INT-006 — API contracts are versioned and compatibility is stated

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

Every partner-facing API must have a published machine-readable contract and an explicit version. A breaking change requires a new version and a migration path; an additive change must be reviewed against the compatibility policy.

**Thai:** API สำหรับ partner ทุกรายการต้องมี contract ที่อ่านได้ด้วยเครื่องและเผยแพร่แล้ว พร้อม version ที่ชัดเจน การเปลี่ยนแปลงที่ทำลายความเข้ากันได้ต้องมี version ใหม่และเส้นทาง migration ส่วนการเปลี่ยนแปลงแบบเพิ่มเติมต้องถูกทบทวนเทียบกับนโยบายความเข้ากันได้

## Rationale

A contract that changes silently breaks consumers without warning.

**Thai:** contract ที่เปลี่ยนโดยไม่แจ้งทำให้ผู้ใช้บริการเสียหายโดยไม่มีการเตือน

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Published API contract with version and compatibility policy
- **ticket** (max 180 days): Compatibility review for the current release

## Assessment

- Lite pass: A versioned contract is published and matches production.
- Lite partial: A contract exists but versioning or compatibility policy is incomplete.
- Full L2: Contract, version, and compatibility review are current.
- Full L3: Contract differences are checked automatically before release.

## References

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — `standard`
- [IETF RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-4.2` (partial) — HTTP message structure validation is covered; contract versioning is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
