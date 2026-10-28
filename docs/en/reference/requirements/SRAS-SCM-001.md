# SRAS-SCM-001 — An asset inventory covers software, services, and infrastructure

- Domain: `supply-chain`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

The product must maintain an inventory of software components, services, infrastructure, and data stores with owner, version, location, and criticality. A production asset that is missing from the inventory fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องมี inventory ขององค์ประกอบซอฟต์แวร์ บริการ โครงสร้างพื้นฐาน และ data store พร้อม owner เวอร์ชัน ตำแหน่งที่ตั้ง และระดับความสำคัญ asset ใน production ที่ไม่อยู่ใน inventory ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

An asset that is not known cannot be patched, reviewed, or retired.

**Thai:** asset ที่ไม่รู้จักไม่สามารถถูก patch ทบทวน หรือปลดระวางได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 90 days): Asset inventory with owner, version, location, and criticality
- **report** (max 90 days): Reconciliation of production assets against the inventory

## Assessment

- Lite pass: Every production asset is inventoried with an owner and criticality.
- Lite partial: The inventory exists but some assets or owners are missing.
- Full L2: Maintained and reconciled for the current release.
- Full L3: Measured with coverage, stale entries, and unknown-asset findings.

## References

- [NIST CSF 2.0 GV.SC](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 5.9](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.9, A.8.1` (supports) — Asset inventory and endpoint devices.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `ID.AM-01, ID.AM-02` (supports) — Hardware and software asset inventories.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
