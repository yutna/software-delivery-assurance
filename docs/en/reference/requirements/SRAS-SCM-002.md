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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **report** (max 90 days): SBOM for the current release in a standard format
- **test_result** (max 90 days): Verification that the SBOM matches the deployed artifact

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
