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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Current data inventory with classification and owners
- **ticket** (max 180 days): Data inventory review record with owner and date

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
