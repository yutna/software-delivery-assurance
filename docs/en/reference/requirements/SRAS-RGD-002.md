# SRAS-RGD-002 — Each processing purpose has a documented lawful basis

- Module: `SRAS-RGD`
- Criticality: `gate`
- Status: `active`
- Introduced in: `0.1.0`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `modules/regulated-data/module.yaml`

## Description

Each processing purpose for regulated data must record the lawful basis relied on, the categories of data subjects and data, and the accountable owner. A purpose without a recorded basis must not be processed. The applicable basis is determined by the responsible privacy function, not by this library.

**Thai:** วัตถุประสงค์การประมวลผลข้อมูลที่มีข้อกำหนดกำกับแต่ละรายการต้องบันทึกฐานทางกฎหมายที่ใช้อ้างอิง ประเภทของเจ้าของข้อมูลและข้อมูล และ owner ที่รับผิดชอบ วัตถุประสงค์ที่ไม่มีฐานที่บันทึกไว้ต้องไม่ถูกประมวลผล การเลือกฐานที่ใช้เป็นหน้าที่ของหน่วยงานด้าน privacy ที่รับผิดชอบ ไม่ใช่ของไลบรารีนี้

## Rationale

Processing without a recorded basis cannot be explained, reviewed, or defended.

**Thai:** การประมวลผลที่ไม่มีฐานบันทึกไว้ไม่สามารถอธิบาย ทบทวน หรือปกป้องได้

## Applicability

- Tiers: 1, 2, 3
- Modules: SRAS-RGD
- Overlays: none
- Excludes: none

## Evidence

- **document** (max 365 days): Processing register with purpose, basis, and owner

## Assessment

- Lite pass: Every purpose records a basis and an owner.
- Lite partial: Some purposes are recorded but the basis or owner is missing.
- Full L2: Purposes and bases are recorded and reviewed for the release.
- Full L3: Changes in purpose trigger a recorded basis review.

## References

- [ISO/IEC 29100:2011](https://www.iso.org/standard/45123.html) — `standard`
- [OECD Privacy Guidelines](https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0188) — `guidance`

## Crosswalks

- none

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
