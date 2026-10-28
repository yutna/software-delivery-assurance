# SRAS-CHG-001 — All source and configuration changes are version controlled

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

Production source code, infrastructure definitions, and configuration must be stored in version control with attributable commits and protected main branches. A production change applied outside version control fails the requirement.

**Thai:** source code, นิยามโครงสร้างพื้นฐาน และ configuration ของ production ต้องถูกเก็บใน version control พร้อม commit ที่ระบุผู้ทำและ branch หลักที่ได้รับการป้องกัน การเปลี่ยนแปลง production ที่ทำนอก version control ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A change that is not in version control cannot be reviewed, reproduced, or rolled back.

**Thai:** การเปลี่ยนแปลงที่ไม่ได้อยู่ใน version control ไม่สามารถ review ทำซ้ำ หรือ rollback ได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Repository and branch protection configuration
- **log** (max 90 days): Commit history and change trace for the current release

## Assessment

- Lite pass: Production changes are traceable to reviewed commits on protected branches.
- Lite partial: Most changes are versioned but some production paths bypass control.
- Full L2: Enforced for all production source, infrastructure, and configuration.
- Full L3: Measured with bypass findings and traceability coverage.

## References

- [NIST SP 800-218 SSDF PS.1](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [ISO/IEC 27001:2022 8.32](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.32, A.8.4` (supports) — Change management and source code access.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `PR.PS-01` (supports) — Configuration management.
- [MAP-NISTSSDF — SRAS Core to NIST SP 800-218 (SSDF) 1.1](../crosswalks/MAP-NISTSSDF.md): `PS.1` (supports) — Version control protects source and configuration from unauthorized change.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `6.5.1` (supports) — Change control for secure systems and software.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
