# SRAS-SCM-008 — Concentration risk and supplier exit are assessed

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

The product must identify critical suppliers where failure or exit would disrupt delivery, and must record a mitigation or exit plan for each. A single-supplier dependency with no exit plan fails the requirement.

**Thai:** ผลิตภัณฑ์ต้องระบุผู้ให้บริการที่สำคัญซึ่งความล้มเหลวหรือการออกจากผู้ให้บริการจะกระทบการส่งมอบ และต้องบันทึกมาตรการบรรเทาหรือแผนออกสำหรับแต่ละราย การพึ่งพาผู้ให้บริการรายเดียวโดยไม่มีแผนออกถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A supplier that cannot be replaced quickly controls the product's continuity.

**Thai:** ผู้ให้บริการที่ไม่สามารถแทนที่ได้อย่างรวดเร็วควบคุมความต่อเนื่องของผลิตภัณฑ์

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Concentration-risk assessment with mitigation and exit plans
- **ticket** (max 365 days): Review record for critical supplier dependencies

## Assessment

- Lite pass: Critical dependencies have a mitigation or exit plan.
- Lite partial: Some critical dependencies are identified but not planned.
- Full L2: Assessed for all critical suppliers.
- Full L3: Measured with dependency count, portability, and exit-test evidence.

## References

- [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/final) — `standard`
- [NIST CSF 2.0 GV.SC](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.22, A.5.30` (partial) — Supplier monitoring and continuity support exit planning; concentration risk is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
