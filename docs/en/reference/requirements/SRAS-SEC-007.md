# SRAS-SEC-007 — Security requirements and threat models are defined before build

- Domain: `security`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Each material change must have documented security requirements and a threat model that covers assets, trust boundaries, threats, and mitigations before implementation. A high-risk change without a threat model fails the requirement.

**Thai:** การเปลี่ยนแปลงที่มีนัยสำคัญแต่ละครั้งต้องมีข้อกำหนดด้านความปลอดภัยและ threat model ที่ครอบคลุมสินทรัพย์ ขอบเขตความเชื่อถือ ภัยคุกคาม และมาตรการบรรเทาก่อนเริ่มพัฒนา การเปลี่ยนแปลงที่มีความเสี่ยงสูงโดยไม่มี threat model ถือว่าไม่ผ่านข้อกำหนดนี้

## Rationale

Security decisions are cheapest and most effective before the design is fixed.

**Thai:** การตัดสินใจด้านความปลอดภัยมีต้นทุนต่ำและได้ผลที่สุดก่อนที่การออกแบบจะถูกตรึง

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Security requirements and threat model for the current release
- **ticket** (max 365 days): Design review record with security sign-off

## Assessment

- Lite pass: Security requirements and a threat model exist for high-risk changes.
- Lite partial: Some high-risk changes have no threat model or security sign-off.
- Full L2: Applied to all high-risk changes in the current release.
- Full L3: Threat models updated after material change and tracked to mitigation closure.

## References

- [NIST SP 800-218 SSDF PW.1](https://csrc.nist.gov/pubs/sp/800/218/final) — `standard`
- [ISO/IEC 27001:2022 8.25 and 8.26](https://www.iso.org/standard/27001) — `standard`
- [OWASP ASVS V1 Architecture](https://owasp.org/www-project-application-security-verification-standard/) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-15.1, v5.0.0-15.2` (supports) — Secure coding documentation, architecture, and dependencies.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.25, A.8.26, A.8.27` (supports) — Secure development, application requirements, and architecture.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
