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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Supply chain monitoring sources and response playbook
- **ticket** (max 90 days): Exposure assessment record for the latest critical advisory

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
