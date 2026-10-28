# SRAS-RGD-006 — Cross-border transfers have a documented mechanism

- Module: `SRAS-RGD`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/regulated-data/module.yaml`

## Description

A transfer of regulated data across a border must record the destination, the transfer mechanism, the safeguards applied, and the owner. A transfer without a documented mechanism must not be enabled.

**Thai:** การโอนข้อมูลที่มีข้อกำหนดกำกับข้ามพรมแดนต้องบันทึกปลายทาง กลไกการโอน มาตรการป้องกันที่ใช้ และ owner ต้องไม่เปิดใช้การโอนที่ไม่มีกลไกบันทึกไว้

## Rationale

A transfer that is not recorded cannot be assessed when the destination or the law changes.

**Thai:** การโอนที่ไม่ถูกบันทึกไม่สามารถประเมินได้เมื่อปลายทางหรือกฎหมายเปลี่ยน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Transfer register with destination, mechanism, and safeguards

## Assessment

- Lite pass: Every transfer is recorded with a mechanism and owner.
- Lite partial: Transfers are known but the mechanism or safeguards are incomplete.
- Full L2: Transfers are recorded and reviewed for the release.
- Full L3: Changes in destination or mechanism trigger a recorded review.

## References

- [ISO/IEC 27701:2019](https://www.iso.org/standard/71670.html) — `standard`
- [OECD Privacy Guidelines](https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0188) — `guidance`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
