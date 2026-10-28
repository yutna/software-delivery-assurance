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

## Rationale

Shared environments let test activity damage production and leak production data.

**Thai:** สภาพแวดล้อมที่ใช้ร่วมกันทำให้กิจกรรมทดสอบสร้างความเสียหายต่อ production และทำให้ข้อมูล production รั่วไหล

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **diagram** (max 365 days): Environment and network separation diagram
- **configuration** (max 180 days): Environment-specific access and configuration controls

## Assessment

- Lite pass: Environments are separated and production credentials stay in production.
- Lite partial: Separation exists but some access or configuration is shared.
- Full L2: Implemented for all in-scope environments.
- Full L3: Reviewed after material change and measured with drift findings.

## References

- [ISO/IEC 27001:2022 8.31](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 PR.PS](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.31` (supports) — Separation of development, test, and production.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.PS-06` (partial) — Secure development practices support environment separation; the separation control is an SRAS addition.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `6.5.3` (supports) — Separation of pre-production and production environments.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
