# SRAS-SCM-003 — Dependencies come from trusted sources and are integrity verified

- Domain: `supply-chain`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/supply-chain.yaml`

## Description

Dependencies and build artifacts must be obtained from approved sources and verified with signatures or cryptographic digests before use. An unverified dependency or an artifact from an unapproved source fails the requirement.

**Thai:** dependency และ build artifact ต้องได้มาจากแหล่งที่ได้รับอนุมัติและตรวจสอบด้วยลายเซ็นหรือ cryptographic digest ก่อนใช้งาน dependency ที่ไม่ได้ตรวจสอบหรือ artifact จากแหล่งที่ไม่อนุมัติถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

An unverified dependency can introduce code that nobody reviewed.

**Thai:** dependency ที่ไม่ได้ตรวจสอบสามารถนำ code ที่ไม่มีใคร review เข้ามาได้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **configuration** (max 180 days): Approved source and dependency verification configuration
- **report** (max 90 days): Signature or digest verification result for the current release

## Assessment

- Lite pass: Dependencies and artifacts are sourced from approved locations and verified.
- Lite partial: Verification exists but some dependencies or artifacts bypass it.
- Full L2: Enforced for all production dependencies and artifacts.
- Full L3: Measured with verification coverage and exception trends.

## References

- [NIST SP 800-218 SSDF PS.2](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [NIST CSF 2.0 GV.SC](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.21, A.8.19, A.8.7` (supports) — Supply chain, software installation, and malware protection.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.SC-04, PR.PS-06` (partial) — Supplier requirements and secure development support trusted sources; integrity verification is an SRAS addition.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `6.3.2` (partial) — Secure software development is covered; trusted sources and integrity verification are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
