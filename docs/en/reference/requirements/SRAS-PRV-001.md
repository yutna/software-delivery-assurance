# SRAS-PRV-001 — A data inventory records types, owners, locations, and classification

- Domain: `privacy`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/privacy.yaml`

## Description

A data inventory must identify each data type, its source, owner, storage location, classification, and permitted use. A system with production personal data outside the inventory fails this requirement.

**Thai:** data inventory ต้องระบุประเภทข้อมูล แหล่งที่มา owner สถานที่จัดเก็บ การจำแนกชั้นข้อมูล และการใช้ที่ได้รับอนุญาต ระบบที่มีข้อมูลส่วนบุคคลใน production นอก inventory ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Data that is not inventoried cannot be protected, retained, or deleted correctly.

**Thai:** ข้อมูลที่ไม่ได้อยู่ใน inventory ไม่สามารถถูกปกป้อง เก็บรักษา หรือลบได้อย่างถูกต้อง

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Current data inventory with classification and owners
- **ticket** (max 180 days): Data inventory review record with owner and date

## Assessment

- Lite pass: All in-scope data types are inventoried and classified.
- Lite partial: The inventory exists but some systems or fields are missing.
- Full L2: Maintained and reviewed for the current release.
- Full L3: Measured with inventory coverage and stale-entry metrics.

## References

- [NIST CSF 2.0 PR.DS](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27701:2019 7.2.8](https://www.iso.org/standard/71670.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.9, A.5.12, A.5.34` (supports) — Asset inventory, classification, and PII protection.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `ID.AM-05, PR.DS-01` (supports) — Data inventory and data-at-rest protection.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `3.2` (supports) — Storage of account data is kept to a minimum and inventoried.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
