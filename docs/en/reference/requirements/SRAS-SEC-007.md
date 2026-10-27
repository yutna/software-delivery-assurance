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

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Security requirements and threat model for the current release
- **ticket** (max 365 days): Design review record with security sign-off

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
