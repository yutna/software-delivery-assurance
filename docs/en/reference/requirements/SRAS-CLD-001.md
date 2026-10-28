# SRAS-CLD-001 — The shared responsibility model is documented and assigned

- Module: `SRAS-CLD`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

For every cloud or SaaS service in use, the provider and the product must have a documented division of responsibility for identity, configuration, data, encryption, logging, patching, and incident response. A control without an assigned owner is not covered.

**Thai:** สำหรับ cloud หรือ SaaS ทุกบริการที่ใช้งาน ผู้ให้บริการและผลิตภัณฑ์ต้องมีเอกสารแบ่งความรับผิดชอบด้าน identity configuration ข้อมูล การเข้ารหัส logging การแพตช์ และการตอบสนองเหตุการณ์ ควบคุมที่ไม่มีการมอบหมาย owner ไม่ถือว่าอยู่ในขอบเขต

## Rationale

A control that both sides assume the other owns is owned by neither.

**Thai:** ควบคุมที่ทั้งสองฝ่ายคิดว่าอีกฝ่ายรับผิดชอบจะไม่มีใครรับผิดชอบจริง

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Shared responsibility matrix with named owners
- **contract** (max 365 days): Provider terms covering security and incident duties

## Assessment

- Lite pass: Responsibilities are documented and assigned for every service.
- Lite partial: A matrix exists but some controls have no owner.
- Full L2: The matrix is current and matches the deployed services.
- Full L3: Responsibilities are reviewed when services or terms change.

## References

- [ISO/IEC 27017:2015](https://www.iso.org/standard/43757.html) — `standard`
- [NIST SP 800-144](https://csrc.nist.gov/pubs/sp/800/144/final) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
