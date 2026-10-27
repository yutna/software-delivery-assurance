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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): CI pipeline definition and required-job configuration
- **test_result** (max 30 days): Most recent pipeline result for the current release
- **ticket** (max 90 days): Approved bypass exception, if any

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
