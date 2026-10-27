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

## Applicability

- Tiers: 2, 3
- Modules: SRAS-INT
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Published API contract with version and compatibility policy
- **ticket** (max 180 days): Compatibility review for the current release

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
