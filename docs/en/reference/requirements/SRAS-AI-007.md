# SRAS-AI-007 — Model and prompt changes follow controlled release and rollback

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

A change to a model, prompt, retrieval source, or safety configuration must pass the evaluation gate, have a rollback path, and record the approver. An emergency change must be reviewed within a defined period.

**Thai:** การเปลี่ยนแปลงโมเดล prompt แหล่ง retrieval หรือ safety configuration ต้องผ่าน evaluation gate มีเส้นทาง rollback และบันทึกผู้อนุมัติ การเปลี่ยนแปลงฉุกเฉินต้องถูกทบทวนภายในระยะเวลาที่กำหนด

## Rationale

Models and prompts change behaviour without a code change.

**Thai:** โมเดลและ prompt เปลี่ยนพฤติกรรมได้โดยไม่ต้องแก้โค้ด

## Applicability

- Tiers: 2, 3
- Modules: SRAS-AI
- Overlays: none
- Excludes: none

## Evidence

- **ticket** (max 180 days): Change approval with evaluation result and rollback plan
- **document** (max 365 days): Rollback procedure and last rollback test

## Assessment

- Lite pass: Changes are approved, evaluated, and reversible.
- Lite partial: Approval exists but rollback or evaluation evidence is incomplete.
- Full L2: Every production change follows the controlled release path.
- Full L3: Emergency changes are reviewed and rollback is tested.

## References

- [NIST SP 800-218A](https://csrc.nist.gov/pubs/sp/800/218/a/final) — `standard`
- [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) — `standard`

## Crosswalks

- [MAP-ISO42001 — SRAS AI to ISO/IEC 42001:2023](../crosswalks/MAP-ISO42001.md): `A.6 AI system life cycle` (supports) — Deployment, operation, and change control.
- [MAP-NISTAIRMF — SRAS AI to NIST AI RMF 1.0](../crosswalks/MAP-NISTAIRMF.md): `MANAGE 1.1, MANAGE 2.1` (supports) — Risk response and change control.
- [MAP-NISTSSDF — SRAS Core to NIST SP 800-218 (SSDF) 1.1](../crosswalks/MAP-NISTSSDF.md): `PW.7, PW.8` (partial) — Controlled AI release and rollback cover review and testing; AI-specific evaluation is an SP 800-218A addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
