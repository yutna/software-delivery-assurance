# SRAS-ONP-001 — On-premises assets are inventoried with an owner

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

Every server, appliance, endpoint, and network device that supports the product must be recorded with its purpose, location, owner, operating system or firmware version, network zone, and support status. An asset that is absent from the inventory is not covered.

**Thai:** server appliance endpoint และอุปกรณ์เครือข่ายทุกชิ้นที่สนับสนุนผลิตภัณฑ์ต้องถูกบันทึกพร้อมวัตถุประสงค์ สถานที่ owner ระบบปฏิบัติการหรือ firmware version network zone และสถานะการสนับสนุน asset ที่ไม่อยู่ในทะเบียนไม่ถือว่าอยู่ในขอบเขต

## Rationale

An asset that is not inventoried is not patched, backed up, or decommissioned.

**Thai:** asset ที่ไม่อยู่ในทะเบียนจะไม่ถูกแพตช์ สำรองข้อมูล หรือปลดระวาง

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-ONP
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Asset inventory with owner, location, version, and network zone
- **report** (max 180 days): Inventory reconciliation with discovered assets

## Assessment

- Lite pass: Every on-premises asset is inventoried with an owner.
- Lite partial: An inventory exists but ownership or network zone is incomplete.
- Full L2: The inventory is current and reconciled with discovery.
- Full L3: Inventory changes are reviewed with change records.

## References

- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001) — `standard`
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) — `standard`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
