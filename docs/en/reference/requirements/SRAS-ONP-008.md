# SRAS-ONP-008 — Deployment artefacts are verified before installation

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

Every deployment artefact must be traceable to a reviewed source, integrity-checked before installation, and installed from a controlled repository. An artefact with no verified provenance must not be deployed.

**Thai:** deployment artefact ทุกชิ้นต้องตรวจสอบย้อนกลับไปยัง source ที่ทบทวนแล้ว ตรวจสอบความสมบูรณ์ก่อนติดตั้ง และติดตั้งจาก repository ที่ควบคุมไว้ artefact ที่ไม่มี provenance ที่ตรวจสอบได้ต้องไม่ถูกติดตั้ง

## Rationale

An unsigned or untraceable artefact can carry code that no review ever saw.

**Thai:** artefact ที่ไม่มีการลงนามหรือตรวจสอบย้อนกลับไม่ได้อาจมีโค้ดที่ไม่เคยผ่านการทบทวน

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Artefact provenance and build source record
- **test_result** (max 180 days): Signature or checksum verification at installation

## Assessment

- Lite pass: Artefacts are traceable and verified before installation.
- Lite partial: Provenance exists but verification is manual or incomplete.
- Full L2: Verification is enforced and failures block installation.
- Full L3: Provenance is checked against the build system of record.

## References

- [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final) — `standard`
- [SLSA specification](https://slsa.dev/spec/v1.0/) — `guidance`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
