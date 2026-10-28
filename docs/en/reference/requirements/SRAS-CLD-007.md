# SRAS-CLD-007 — A secure configuration baseline is defined and monitored

- Module: `SRAS-CLD`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/cloud-saas/module.yaml`

## Description

The cloud or SaaS configuration must be defined as a versioned baseline covering network exposure, identity, encryption, logging, backup, and public access. Drift from the baseline must be detected and corrected within a defined period.

**Thai:** configuration ของ cloud หรือ SaaS ต้องถูกกำหนดเป็น baseline ที่มี version ครอบคลุม network exposure identity การเข้ารหัส logging backup และการเข้าถึงจากสาธารณะ ต้องตรวจจับการเบี่ยงเบนจาก baseline และแก้ไขภายในระยะเวลาที่กำหนด

## Rationale

A secure default degrades silently when drift is not detected.

**Thai:** ค่าเริ่มต้นที่ปลอดภัยจะเสื่อมลงอย่างเงียบ ๆ หากไม่ตรวจจับการเบี่ยงเบน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-CLD
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Versioned secure baseline and drift detection rules
- **ticket** (max 90 days): Drift finding and correction record

## Assessment

- Lite pass: A baseline exists and drift is detected.
- Lite partial: A baseline exists but detection or correction is manual.
- Full L2: Drift is detected and corrected within the defined period.
- Full L3: Baseline changes are reviewed and applied through change control.

## References

- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks) — `guidance`
- [ISO/IEC 27017:2015](https://www.iso.org/standard/43757.html) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
