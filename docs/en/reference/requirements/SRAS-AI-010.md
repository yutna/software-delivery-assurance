# SRAS-AI-010 — AI incidents are contained, investigated, and learned from

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

An AI incident, including harmful output, unsafe recommendation, prompt injection, data leakage, or model unavailability, must have a defined containment path, an owner, a severity rule, and a post-incident review.

**Thai:** เหตุการณ์ AI เช่น output ที่เป็นอันตราย คำแนะนำที่ไม่ปลอดภัย prompt injection ข้อมูลรั่วไหล หรือโมเดลใช้งานไม่ได้ ต้องมีเส้นทางควบคุม owner กฎระดับความรุนแรง และการทบทวนหลังเหตุการณ์

## Rationale

AI failures may not appear as conventional system errors.

**Thai:** ความล้มเหลวของ AI อาจไม่ปรากฏเป็น error ในระบบแบบเดิม

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): AI incident response procedure with severity rules
- **report** (max 365 days): Post-incident review with corrective actions

## Assessment

- Lite pass: AI incidents have a containment path, owner, and severity rule.
- Lite partial: A procedure exists but containment or ownership is unclear.
- Full L2: Incidents are contained and reviewed with corrective actions.
- Full L3: Corrective actions are tracked to closure and feed evaluation.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — `guidance`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.6 AI system life cycle, 10.1 Continual improvement` (supports) — Incident handling and improvement.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MANAGE 2.1, MANAGE 3.1` (supports) — Incident response and recovery.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
