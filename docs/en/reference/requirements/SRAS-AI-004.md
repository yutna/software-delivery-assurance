# SRAS-AI-004 — Consequential AI decisions have human oversight and override

- Module: `SRAS-AI`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/ai/module.yaml`

## Description

Where an AI capability affects a person's access, eligibility, safety, or legal position, a competent human must be able to review, override, and escalate the decision. The oversight role, response time, and override record must be defined and available.

**Thai:** เมื่อความสามารถ AI มีผลต่อการเข้าถึง คุณสมบัติ ความปลอดภัย หรือสถานะทางกฎหมายของบุคคล มนุษย์ที่มีความสามารถต้องสามารถตรวจทาน override และ escalate การตัดสินใจได้ ต้องกำหนดบทบาทผู้กำกับ เวลาตอบสนอง และบันทึกการ override ไว้

## Rationale

Automation without a correction path turns an error into damage that cannot be stopped.

**Thai:** ระบบอัตโนมัติที่ไม่มีทางแก้ไขจะทำให้ข้อผิดพลาดกลายเป็นความเสียหายที่ไม่สามารถหยุดได้

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Human oversight, override, and escalation procedure
- **log** (max 180 days): Override and escalation records for the review period

## Assessment

- Lite pass: A named human role can review, override, and escalate decisions.
- Lite partial: Oversight exists but the override record or response time is undefined.
- Full L2: Oversight, override, and escalation are defined and operating.
- Full L3: Override outcomes are reviewed and fed back into evaluation.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [OECD AI Principles](https://oecd.ai/en/ai-principles) — `guidance`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.5 Assessing impacts of AI systems, A.9 Use of AI systems` (supports) — Impact assessment and responsible use.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `GOVERN 3.1, MANAGE 2.1` (supports) — Human oversight and risk treatment.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
