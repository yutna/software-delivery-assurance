# SRAS-ONP-002 — A hardening baseline is defined and verified

- Module: `SRAS-ONP`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/on-prem/module.yaml`

## Description

Each on-premises asset type must have a versioned hardening baseline covering services, accounts, protocols, permissions, and logging. The deployed configuration must be verified against the baseline, and a deviation must be approved and recorded.

**Thai:** asset แต่ละประเภทใน on-premises ต้องมี hardening baseline ที่มี version ครอบคลุม services accounts protocols permissions และ logging ต้องตรวจสอบ configuration ที่ติดตั้งเทียบกับ baseline และการเบี่ยงเบนต้องได้รับอนุมัติและบันทึกไว้

## Rationale

A default installation exposes services that nobody intended to run.

**Thai:** การติดตั้งตามค่าเริ่มต้นเปิดบริการที่ไม่มีใครตั้งใจให้ทำงาน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Versioned hardening baseline per asset type
- **test_result** (max 180 days): Configuration verification against the baseline

## Assessment

- Lite pass: A baseline exists and deployed assets are verified against it.
- Lite partial: A baseline exists but verification or deviation records are incomplete.
- Full L2: Verification covers every asset type and deviations are approved.
- Full L3: Baseline changes are reviewed and applied through change control.

## References

- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks) — `guidance`
- [NIST SP 800-128](https://csrc.nist.gov/pubs/sp/800/128/final) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
