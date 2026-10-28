# SRAS-ONP-005 — Network segmentation limits lateral movement

- Module: `SRAS-ONP`
- Criticality: `high`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/on-prem/module.yaml`

## Description

The on-premises network must define zones for management, application, data, and external access, with documented rules between them. A flat network or an undocumented rule set does not meet the requirement.

**Thai:** เครือข่าย on-premises ต้องกำหนด zone สำหรับ management application data และ external access พร้อมกฎที่จัดทำเอกสารระหว่างกัน เครือข่ายแบนหรือชุดกฎที่ไม่มีเอกสารไม่เป็นไปตามข้อกำหนด

## Rationale

Without segmentation, one compromised host reaches every other host.

**Thai:** หากไม่มีการแบ่งส่วน host ที่ถูกยึดหนึ่งเครื่องจะเข้าถึง host อื่นทุกเครื่องได้

## Applicability

- Tiers: 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **diagram** (max 365 days): Network zone diagram with allowed flows
- **configuration** (max 180 days): Firewall and routing rules between zones
- **test_result** (max 180 days): Segmentation test for a denied flow

## Assessment

- Lite pass: Zones and rules are documented and a denied flow is tested.
- Lite partial: Zones exist but rules or tests are incomplete.
- Full L2: Segmentation is enforced and tested for sensitive zones.
- Full L3: Rule changes are reviewed and tested after change.

## References

- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) — `standard`
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
