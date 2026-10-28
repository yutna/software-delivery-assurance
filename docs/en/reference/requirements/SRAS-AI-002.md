# SRAS-AI-002 — AI risk and impact are classified before release

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

Each inventoried AI capability must have a documented risk and impact classification covering affected people, decision consequence, level of autonomy, data sensitivity, and reversibility. A high-impact capability requires a named risk owner and an approved treatment plan.

**Thai:** ความสามารถ AI แต่ละรายการต้องมีเอกสารจำแนกความเสี่ยงและผลกระทบ ครอบคลุมบุคคลที่ได้รับผลกระทบ ผลของการตัดสินใจ ระดับความเป็นอิสระ ความอ่อนไหวของข้อมูล และความสามารถในการย้อนกลับ ความสามารถที่มีผลกระทบสูงต้องมี risk owner ที่ระบุชื่อและแผนจัดการที่อนุมัติแล้ว

## Rationale

Treating every AI capability the same under-governs the ones with the highest impact.

**Thai:** การกำกับ AI ทุกระบบด้วยวิธีเดียวกันทำให้ระบบที่มีผลกระทบสูงถูกกำกับน้อยเกินไป

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): AI risk and impact classification with treatment plan
- **ticket** (max 365 days): Risk acceptance or treatment approval

## Assessment

- Lite pass: Each AI capability has a classification and an owner.
- Lite partial: A classification exists but the treatment or owner is incomplete.
- Full L2: Classified and approved before the current release.
- Full L3: Revisited after material change and reviewed with evidence.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.5 Assessing impacts of AI systems, 6.1 Actions to address risks and opportunities` (supports) — Impact assessment and risk treatment.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MAP 1.1, MAP 2.1` (supports) — Context mapping and impact assessment.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
