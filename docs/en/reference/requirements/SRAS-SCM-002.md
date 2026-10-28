# SRAS-SCM-002 — A software bill of materials is produced for every release

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

Each release must include a machine-readable SBOM that lists components, versions, relationships, and licenses, and the SBOM must match the deployed artifact. A release without an SBOM or with an SBOM that differs from the artifact fails the requirement.

**Thai:** การปล่อยแต่ละครั้งต้องมี SBOM ที่เครื่องอ่านได้ ซึ่งระบุองค์ประกอบ เวอร์ชัน ความสัมพันธ์ และ license และ SBOM ต้องตรงกับ artifact ที่ deploy การปล่อยที่ไม่มี SBOM หรือมี SBOM ที่แตกต่างจาก artifact ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Without an SBOM, component risk cannot be found or answered quickly.

**Thai:** หากไม่มี SBOM ความเสี่ยงขององค์ประกอบไม่สามารถถูกค้นหาหรือตอบได้อย่างรวดเร็ว

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 90 days): SBOM for the current release in a standard format
- **test_result** (max 90 days): Verification that the SBOM matches the deployed artifact

## Assessment

- Lite pass: Each release has an SBOM that matches the deployed artifact.
- Lite partial: An SBOM exists but is incomplete or not verified against the artifact.
- Full L2: Produced for every release and retained.
- Full L3: Measured with SBOM completeness and match rates.

## References

- [NIST SP 800-218 SSDF PS.3](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [ISO/IEC 5962:2021 SPDX](https://www.iso.org/standard/81870.html) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.5.21, A.8.19` (partial) — Supply chain and software installation controls support component visibility; SBOM is an SRAS addition.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `ID.AM-02, GV.SC-04` (partial) — Software inventory and supplier requirements support component visibility; an SBOM is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
