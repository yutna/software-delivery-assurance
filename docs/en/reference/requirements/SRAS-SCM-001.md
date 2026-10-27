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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 90 days): Asset inventory with owner, version, location, and criticality
- **report** (max 90 days): Reconciliation of production assets against the inventory

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
