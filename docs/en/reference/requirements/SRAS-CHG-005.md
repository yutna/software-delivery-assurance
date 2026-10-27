# SRAS-CHG-005 — Development, test, and production environments are separated

- Domain: `change-release`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/change-release.yaml`

## Description

Development, test, and production environments must be separated with distinct access and configuration controls, and production credentials must not be used in lower environments. A shared environment or shared production credential fails the requirement.

**Thai:** สภาพแวดล้อม development test และ production ต้องถูกแยกจากกันด้วยการควบคุมการเข้าถึงและ configuration ที่แตกต่างกัน และต้องไม่ใช้ production credentials ในสภาพแวดล้อมที่ต่ำกว่า สภาพแวดล้อมที่ใช้ร่วมกันหรือใช้ production credential ร่วมกันถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **diagram** (max 365 days): Environment and network separation diagram
- **configuration** (max 180 days): Environment-specific access and configuration controls

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
