# SRAS-CHG-010 — Database changes are reversible or have a tested recovery plan

- Domain: `change-release`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/change-release.yaml`

## Description

Schema and data migrations must be reviewed, tested against representative data, and have a reversible step or a tested recovery plan before production deployment. A migration without a tested recovery path fails the requirement.

**Thai:** การเปลี่ยนแปลง schema และข้อมูลต้องได้รับการ review ทดสอบกับข้อมูลตัวแทน และมีขั้นตอนย้อนกลับหรือแผนกู้คืนที่ผ่านการทดสอบก่อน deploy สู่ production การ migration ที่ไม่มีแนวทางกู้คืนที่ทดสอบแล้วถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A failed migration can corrupt data in ways that application rollback cannot fix.

**Thai:** migration ที่ล้มเหลวสามารถทำให้ข้อมูลเสียหายในลักษณะที่การ rollback application แก้ไขไม่ได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Migration plan with reversibility or recovery steps
- **test_result** (max 180 days): Dry-run or recovery test result against representative data

## Assessment

- Lite pass: Migrations have a tested recovery path before production deployment.
- Lite partial: Some migrations are reversible but recovery is untested or undocumented.
- Full L2: Applied to all production migrations.
- Full L3: Measured with migration failure and recovery-time trends.

## References

- [ISO/IEC 27001:2022 8.32](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-128](https://csrc.nist.gov/pubs/sp/800/128/final) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.32, A.8.13` (partial) — Change and backup controls support recovery; database reversibility is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
