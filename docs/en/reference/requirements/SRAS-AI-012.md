# SRAS-AI-012 — AI claims are limited to evaluated evidence

- Module: `SRAS-AI`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/ai/module.yaml`

## Description

A public or customer-facing claim about AI accuracy, safety, fairness, or compliance must be traceable to a current evaluation result and must state the known limitations. A claim that exceeds the recorded evidence must not be published. Users must be told when they interact with an AI capability or when a decision is materially AI-assisted.

**Thai:** คำกล่าวอ้างต่อสาธารณะหรือต่อลูกค้าเกี่ยวกับความแม่นยำ ความปลอดภัย ความเป็นธรรม หรือ compliance ของ AI ต้องอ้างอิงผล evaluation ที่เป็นปัจจุบัน และต้องระบุข้อจำกัดที่ทราบ คำกล่าวอ้างที่เกินกว่าหลักฐานที่บันทึกไว้ต้องไม่ถูกเผยแพร่ ผู้ใช้ต้องได้รับแจ้งเมื่อมีปฏิสัมพันธ์กับ AI หรือเมื่อการตัดสินใจได้รับความช่วยเหลือจาก AI อย่างมีนัยสำคัญ

## Rationale

A claim beyond the evidence creates expectations the product cannot prove.

**Thai:** คำกล่าวอ้างที่เกินหลักฐานสร้างความคาดหวังที่ผลิตภัณฑ์พิสูจน์ไม่ได้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Claim register linked to current evaluation evidence
- **report** (max 180 days): Current evaluation report supporting published claims

## Assessment

- Lite pass: Every AI claim is traceable to current evidence and stated limits.
- Lite partial: Claims are recorded but evidence or limitations are incomplete.
- Full L2: Claims, evidence, and limitations are reviewed for the release.
- Full L3: Published claims are rechecked when evaluation or drift changes.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.8 Information for interested parties` (supports) — Transparency and information provision.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `GOVERN 4.1, MANAGE 3.1` (partial) — Transparency and communication are covered; claim control is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
