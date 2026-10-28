# SRAS-GOV-008 — External assurance and compliance claims are approved and evidence-backed

- Domain: `governance`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/governance.yaml`

## Description

Every external claim about assurance, compliance, certification, or control effectiveness must be listed in a claim register with approved wording, scope, evidence, owner, and expiry. A claim that is unapproved, out of scope, or unsupported by current evidence must not be published.

**Thai:** claim ภายนอกทั้งหมดเกี่ยวกับ assurance compliance การรับรอง หรือประสิทธิผลของการควบคุม ต้องอยู่ใน claim register พร้อมถ้อยคำที่อนุมัติ ขอบเขต หลักฐาน owner และวันหมดอายุ ห้ามเผยแพร่ claim ที่ยังไม่อนุมัติ อยู่นอกขอบเขต หรือไม่มีหลักฐานปัจจุบันรองรับ

## Rationale

An unsupported claim creates legal, commercial, and reputational exposure that evidence cannot repair after publication.

**Thai:** claim ที่ไม่มีหลักฐานรองรับก่อให้เกิดความเสี่ยงทางกฎหมาย เชิงพาณิชย์ และชื่อเสียง ซึ่งหลักฐานไม่สามารถแก้ไขได้หลังการเผยแพร่

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 90 days): Claim register with approved wording, scope, evidence links, owners, and expiry dates
- **ticket** (max 90 days): Claim approval record for current external material
- **report** (max 180 days): Evidence referenced by each active claim

## Assessment

- Lite pass: Every active external claim is approved and linked to current evidence.
- Lite partial: Some claims lack approval, scope, or current evidence.
- Full L2: Register maintained and reconciled with current sales and assurance material.
- Full L3: Reviewed before each external publication and when evidence expires; withdrawn claims are removed.

## References

- [ISO/IEC 27001:2022 7.4](https://www.iso.org/standard/27001) — `standard`
- [NIST CSF 2.0 GV.OC](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `9.2, A.5.35` (partial) — Independent review supports evidence; claim approval is an SRAS addition.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.OV-03` (related) — Oversight supports evidence review; claim approval is an SRAS addition.
- [MAP-WCAG22 — SRAS Core to WCAG 2.2 Level AA](../crosswalks/MAP-WCAG22.md): `5.3 Conformance Claims` (related) — A conformance claim is a published claim and needs evidence; SRAS claim control is broader.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
