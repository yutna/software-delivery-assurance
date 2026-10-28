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

## Rationale

Segmentation limits lateral movement after a compromise.

**Thai:** การแบ่งส่วนเครือข่ายจำกัดการเคลื่อนที่ในแนวนอนหลังการถูก compromise

## Applicability

- Tiers: 1, 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **diagram** (max 365 days): Network diagram showing segments, trust boundaries, and data flows
- **configuration** (max 180 days): Firewall, security-group, or network-policy rules for production
- **test_result** (max 180 days): Connectivity test proving denied paths and allowed paths

## Assessment

- Lite pass: Production is segmented and documented rules restrict inbound and outbound traffic.
- Lite partial: Segmentation exists but some paths are unrestricted or undocumented.
- Full L2: Implemented and tested for all production segments.
- Full L3: Reviewed after material change and measured with drift and exposed-service findings.

## References

- [NIST CSF 2.0 PR.IR](https://www.nist.gov/cyberframework) — `standard`
- [ISO/IEC 27001:2022 8.20, 8.21, and 8.22](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- [MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0](../crosswalks/MAP-ASVS.md): `v5.0.0-13.2` (partial) — Backend communication configuration is covered; network segmentation is an infrastructure control outside ASVS.
- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `A.8.20, A.8.22` (supports) — Network security and segregation.
- [MAP-PCIDSS — SRAS Core to PCI DSS 4.0.1](../crosswalks/MAP-PCIDSS.md): `1.2, 1.3` (supports) — Network security controls and segmentation.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
