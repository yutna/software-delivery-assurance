# SRAS-GOV-002 — A risk register records owners, ratings, and review dates

- Domain: `governance`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `draft`
- Translation status: `partial`
- Source: `core/domains/governance.yaml`

## Description

A risk register must record each material risk with an owner, likelihood, impact, treatment, and review date. A risk without an owner or review date is not accepted as managed.

**Thai:** risk register ต้องบันทึกความเสี่ยงที่มีนัยสำคัญแต่ละรายการพร้อม owner likelihood impact treatment และวันทบทวน ความเสี่ยงที่ไม่มี owner หรือวันทบทวนไม่ถือว่าถูกจัดการ

## Rationale

An unowned risk has no one to accept, treat, or review it.

**Thai:** ความเสี่ยงที่ไม่มี owner ไม่มีผู้รับผิดชอบในการยอมรับ จัดการ หรือทบทวน

## Applicability

- Tiers: 2, 3
- Modules: none
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 180 days): Current risk register with owners, ratings, treatment, and review dates
- **ticket** (max 180 days): Risk review record for the current period

## Assessment

- Lite pass: Material risks have owners, ratings, and review dates.
- Lite partial: Some material risks are missing owners or review dates.
- Full L2: Maintained and reviewed for the current release.
- Full L3: Reviewed on a defined cadence with trend and treatment evidence.

## References

- [ISO 31000:2018](https://www.iso.org/standard/65694.html) — `standard`
- [NIST CSF 2.0 GV.RM](https://www.nist.gov/cyberframework) — `standard`

## Crosswalks

- [MAP-ISO27001 — SRAS Core to ISO/IEC 27001:2022](../crosswalks/MAP-ISO27001.md): `6.1.2, 6.1.3` (supports) — Risk assessment and risk treatment process.
- [MAP-NISTCSF — SRAS Core to NIST CSF 2.0](../crosswalks/MAP-NISTCSF.md): `GV.RM-01, GV.RM-02` (partial) — Risk management objectives and risk appetite support the register; owner and review dates are SRAS additions.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
