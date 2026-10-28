# SRAS-AI-001 — AI systems are inventoried with an accountable owner

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

Every AI or generative AI capability in scope must be recorded in an inventory with its purpose, model or service, data sources, accountable owner, lifecycle stage, and affected users. An AI capability that is absent from the inventory is not covered by the assessment.

**Thai:** ความสามารถ AI หรือ generative AI ทุกอย่างที่อยู่ในขอบเขตต้องถูกบันทึกในทะเบียนพร้อมวัตถุประสงค์ โมเดลหรือบริการ แหล่งข้อมูล owner ที่รับผิดชอบ ขั้นตอน lifecycle และผู้ใช้ที่ได้รับผลกระทบ ความสามารถ AI ที่ไม่อยู่ในทะเบียนไม่ถือว่าอยู่ในขอบเขตการประเมิน

## Rationale

An unknown AI capability cannot be governed, evaluated, or retired.

**Thai:** ความสามารถ AI ที่ไม่รู้จักไม่สามารถถูกกำกับ ประเมิน หรือยกเลิกได้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): AI system inventory with owners and lifecycle stage
- **ticket** (max 180 days): Inventory review record for the current period

## Assessment

- Lite pass: Every AI capability in scope is inventoried with a named owner.
- Lite partial: Some AI capabilities are missing an owner or a lifecycle stage.
- Full L2: Inventoried and reviewed for the current release.
- Full L3: Reviewed on a defined cadence and reconciled with production usage.

## References

- [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) — `standard`
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.3 Internal organization, A.6 AI system life cycle` (supports) — Organizational roles and AI system life cycle records.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `GOVERN 1.1, GOVERN 2.1` (supports) — Governance processes and accountability for AI risk.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
