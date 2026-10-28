# SRAS-CHG-003 — A continuous integration pipeline builds, tests, and scans every change

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

Every change must run through an automated pipeline that builds the artifact, runs the test suite, and performs security and dependency scans, and a failing required job must block merge. A pipeline that can be bypassed without an approved exception fails the requirement.

**Thai:** ทุกการเปลี่ยนแปลงต้องผ่าน pipeline อัตโนมัติที่ build artifact รันชุดทดสอบ และสแกนความปลอดภัยและ dependency โดย job ที่กำหนดซึ่งล้มเหลวต้องบล็อกการ merge pipeline ที่สามารถข้ามได้โดยไม่มีข้อยกเว้นที่ได้รับอนุมัติถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

A repeatable pipeline finds failures before release, not after deployment.

**Thai:** pipeline ที่ทำซ้ำได้พบความล้มเหลวก่อนการปล่อย ไม่ใช่หลังการ deploy

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): CI pipeline definition and required-job configuration
- **test_result** (max 30 days): Most recent pipeline result for the current release
- **ticket** (max 90 days): Approved bypass exception, if any

## Assessment

- Lite pass: Required pipeline jobs run on every change and failures block merge.
- Lite partial: The pipeline exists but some required jobs or blocking rules are missing.
- Full L2: Enforced for all production changes in the current release.
- Full L3: Measured with pipeline duration, failure rate, and bypass trends.

## References

- [NIST SP 800-218 SSDF PS.2 and PW.8](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [NIST CSF 2.0 PR.PS](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.25, A.8.29` (partial) — Secure development and testing are covered; CI gating is an SRAS addition.
- [MAP-NISTSSDF — SRAS Core to NIST SP 800-218 (SSDF) 1.1](../crosswalks/MAP-NISTSSDF.md): `PS.2, PW.8, PO.3` (partial) — CI builds, tests, and scans with a supporting toolchain; artifact integrity verification and toolchain hardening remain environment-specific.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
