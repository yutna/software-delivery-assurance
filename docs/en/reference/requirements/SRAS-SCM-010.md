# SRAS-SCM-010 — Supply chain incidents are monitored and handled

- Domain: `supply-chain`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

The product must monitor advisories for critical components and suppliers, and must have a playbook to assess exposure, contain impact, and notify affected parties when a dependency is compromised. A compromised dependency with no exposure assessment fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องเฝ้าระวังประกาศเตือนสำหรับองค์ประกอบและผู้ให้บริการที่สำคัญ และต้องมี playbook สำหรับประเมินการได้รับผลกระทบ จำกัดผลกระทบ และแจ้งผู้ที่เกี่ยวข้องเมื่อ dependency ถูก compromise dependency ที่ถูก compromise โดยไม่มีการประเมินการได้รับผลกระทบถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A supplier compromise becomes the product's incident within hours.

**Thai:** การถูก compromise ของผู้ให้บริการกลายเป็นเหตุการณ์ของผลิตภัณฑ์ภายในไม่กี่ชั่วโมง

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Supply chain monitoring sources and response playbook
- **ticket** (max 90 days): Exposure assessment record for the latest critical advisory

## Assessment

- Lite pass: Critical advisories are monitored and exposure is assessed.
- Lite partial: Monitoring exists but some critical advisories or assessments are missing.
- Full L2: Applied to all critical components and suppliers.
- Full L3: Measured with advisory-to-assessment time and affected-release coverage.

## References

- [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/final) — `standard`
- [NIST SP 800-218 SSDF RV.1](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.7, A.5.22, A.5.24` (supports) — Threat intelligence, supplier monitoring, and incident planning.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
