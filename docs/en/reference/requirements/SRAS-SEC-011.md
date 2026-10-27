# SRAS-SEC-011 — Production networks are segmented and traffic is restricted by policy

- Domain: `security`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.2.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/security.yaml`

## Description

Production environments must be segmented from development and administrative networks, with inbound and outbound traffic restricted by documented rules. A flat network or an unrestricted administrative path fails the requirement.

**Thai:** สภาพแวดล้อม production ต้องถูกแบ่งส่วนจากเครือข่าย development และเครือข่ายผู้ดูแล โดยจำกัดการรับส่งข้อมูลขาเข้าและขาออกด้วยกฎที่จัดทำเอกสาร เครือข่ายแบบ flat หรือช่องทางผู้ดูแลที่ไม่ถูกจำกัดถือว่าไม่ผ่านข้อกำหนดนี้

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **diagram** (max 365 days): Network diagram showing segments, trust boundaries, and data flows
- **configuration** (max 180 days): Firewall, security-group, or network-policy rules for production
- **test_result** (max 180 days): Connectivity test proving denied paths and allowed paths

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
