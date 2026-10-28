---
translation_status: partial
machine_translated: true
---

# Thai review kit

**สถานะ: เป็น kit เท่านั้น ยังไม่มีการตรวจภาษาไทย ไม่มี requirement ใดถูกทำ
เครื่องหมาย complete และไม่มีค่า `machine_translated` ใดถูกเปลี่ยน**

**เครื่องมือทางเลือกสำหรับ formal-standard track** kit นี้เป็นของ
formal-standard track ซึ่งเป็นทางเลือก template / starter-kit track ไม่จำเป็น
ต้องมีการตรวจภาษาไทยโดยมนุษย์ครบทั้งหมด และใช้ได้โดยมีข้อจำกัดตาม
[ความพร้อมของ template](template-readiness.md) ใช้ kit นี้เมื่อองค์กรต้องการ
อ้างอิงมาตรฐานที่ผ่านการทบทวน เผยแพร่เนื้อหาภาษาไทยทางการ หรือเตรียม candidate
ของ v1.0.0

**จัดทำ:** 2026-10-28 **ขอบเขต:** requirement ที่ active ทั้ง 167 ข้อ — Core 70,
module 52 และ overlay 45 ทุกข้อยังเป็น `translation_status: partial` และ
`machine_translated: true`

kit นี้ทำให้การตรวจภาษาไทยโดยมนุษย์ทำได้จริง แต่ไม่ใช่สิ่งทดแทนผู้ตรวจ
ผู้ตรวจที่เป็นมนุษย์และระบุชื่อต้องอ่านภาษาอังกฤษและภาษาไทย ตัดสินแต่ละ
requirement และบันทึกผล AI execution agent ต้องไม่ทำเครื่องหมาย complete หรือ
ตั้ง `machine_translated: false` แทนผู้ตรวจ

การใช้ template track ไม่จำเป็นต้องใช้ kit นี้ kit นี้มีไว้สำหรับ
formal-standard track ซึ่งเนื้อหาภาษาไทยที่ครบถ้วนเป็นส่วนหนึ่งของข้ออ้าง
template track เก็บทุกหน้าเป็น `partial` และบอกข้อจำกัดนั้นให้ผู้อ่านทราบ

## ผู้ที่ตรวจได้

ผู้ตรวจต้อง

- เป็นมนุษย์ที่ระบุชื่อ อ่านภาษาไทยและอังกฤษได้
- เข้าใจคำศัพท์ด้านการส่งมอบ ความเสี่ยง และกฎหมายของ requirement หรือทำงาน
  ร่วมกับผู้ตรวจภาษาไทยที่ระบุชื่อซึ่งเข้าใจ
- ไม่มีผลประโยชน์ทับซ้อนที่ยังไม่เปิดเผย
- บันทึกชื่อ วันที่ commit ขอบเขต และผลตัดสินของทุก ID ที่อนุมัติ

machine translation, AI agent หรือ "ผู้ตรวจ" ที่ไม่ระบุชื่อไม่สามารถทำขั้นนี้
ให้สำเร็จได้ ถ้าแบ่งตรวจ ผู้ตรวจแต่ละคนต้องบันทึกชื่อ ขอบเขต และ ID ของตนเอง

## วิธีใช้ kit นี้

1. บันทึกชื่อผู้ตรวจ วันที่ commit และขอบเขตใน template ด้านล่าง
2. เลือก layer และ reference page หนึ่งหน้า เปิด source YAML ของหน้านั้นด้วย
3. อ่านฟิลด์อังกฤษและไทยเทียบกัน: `title`, `description`, `rationale`,
   `assessment` และ `references` ถ้ามี
4. ใช้ checklist ต่อหน้า บันทึกผลตัดสินของทุก ID ในหน้านั้น
5. ถ้าหน้าต้องแก้ บันทึก finding และข้อความไทยที่เสนอ ห้ามเปลี่ยนสถานะก่อน
6. หลังแก้ข้อความ ให้อ่านหน้าเดิมอีกครั้งและบันทึก `approved`
7. เมื่อทุก ID ในขอบเขตที่ตกลงเป็น `approved` แล้ว จึงแก้ฟิลด์ YAML ตามวิธี
   ด้านล่าง
8. รัน `npm run sras -- validate --all`, `npm run sras -- render --check` และ
   `npm test` บันทึกผลใน review log

## อภิธานศัพท์

อภิธานศัพท์ฉบับเต็มอยู่ที่ [อภิธานศัพท์ภาษาไทย](../glossary.md) คำเหล่านี้มัก
คลาดเคลื่อนในการแปล:

- **assurance** — การรับประกัน
- **assessment** — การประเมิน
- **evidence** — หลักฐาน
- **gate** — เกต
- **module** — โมดูล
- **overlay** — ส่วนเพิ่ม
- **register** — ทะเบียน
- **claim** — ข้อกล่าวอ้าง
- **project instance** — อินสแตนซ์โปรเจกต์
- **profile** — โปรไฟล์
- **maturity** — ระดับ maturity
- **criticality** — ระดับความสำคัญ
- **finding** — ข้อค้นพบ
- **remediation** — การแก้ไข
- **risk acceptance** — การยอมรับความเสี่ยง

identifier, schema key, ชื่อไฟล์ ชื่อคำสั่ง และชื่อผลิตภัณฑ์คงเป็นภาษาอังกฤษ
ห้ามแปล ID หรือ key

## Inventory

ตารางด้านล่างเป็น requirement ที่ active ทั้งหมด พร้อม source YAML, reference
page และคอลัมน์ผลตัดสินที่เว้นว่างไว้ reference page คือหน้าภาษาอังกฤษที่ render
requirement ส่วนข้อความไทยอยู่ใน source YAML requirement ของ overlay ใช้หน้า
overlay ร่วมกัน

จำนวน: Core 70 + module 52 + overlay 45 = 167

### core (70)

| ID           | Source file                             | Reference page                                   | Decision |
| ------------ | --------------------------------------- | ------------------------------------------------ | -------- |
| SRAS-CHG-001 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-001.md` |          |
| SRAS-CHG-002 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-002.md` |          |
| SRAS-CHG-003 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-003.md` |          |
| SRAS-CHG-004 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-004.md` |          |
| SRAS-CHG-005 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-005.md` |          |
| SRAS-CHG-006 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-006.md` |          |
| SRAS-CHG-007 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-007.md` |          |
| SRAS-CHG-008 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-008.md` |          |
| SRAS-CHG-009 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-009.md` |          |
| SRAS-CHG-010 | `core/domains/change-release.yaml`      | `docs/en/reference/requirements/SRAS-CHG-010.md` |          |
| SRAS-GOV-001 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-001.md` |          |
| SRAS-GOV-002 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-002.md` |          |
| SRAS-GOV-003 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-003.md` |          |
| SRAS-GOV-004 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-004.md` |          |
| SRAS-GOV-005 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-005.md` |          |
| SRAS-GOV-006 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-006.md` |          |
| SRAS-GOV-007 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-007.md` |          |
| SRAS-GOV-008 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-008.md` |          |
| SRAS-GOV-009 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-009.md` |          |
| SRAS-GOV-010 | `core/domains/governance.yaml`          | `docs/en/reference/requirements/SRAS-GOV-010.md` |          |
| SRAS-INC-001 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-001.md` |          |
| SRAS-INC-002 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-002.md` |          |
| SRAS-INC-003 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-003.md` |          |
| SRAS-INC-004 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-004.md` |          |
| SRAS-INC-005 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-005.md` |          |
| SRAS-INC-006 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-006.md` |          |
| SRAS-INC-007 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-007.md` |          |
| SRAS-INC-008 | `core/domains/incident-continuity.yaml` | `docs/en/reference/requirements/SRAS-INC-008.md` |          |
| SRAS-OPS-001 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-001.md` |          |
| SRAS-OPS-002 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-002.md` |          |
| SRAS-OPS-003 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-003.md` |          |
| SRAS-OPS-004 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-004.md` |          |
| SRAS-OPS-005 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-005.md` |          |
| SRAS-OPS-006 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-006.md` |          |
| SRAS-OPS-007 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-007.md` |          |
| SRAS-OPS-008 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-008.md` |          |
| SRAS-OPS-009 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-009.md` |          |
| SRAS-OPS-010 | `core/domains/operations.yaml`          | `docs/en/reference/requirements/SRAS-OPS-010.md` |          |
| SRAS-PRV-001 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-001.md` |          |
| SRAS-PRV-002 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-002.md` |          |
| SRAS-PRV-003 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-003.md` |          |
| SRAS-PRV-004 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-004.md` |          |
| SRAS-PRV-005 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-005.md` |          |
| SRAS-PRV-006 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-006.md` |          |
| SRAS-PRV-007 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-007.md` |          |
| SRAS-PRV-008 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-008.md` |          |
| SRAS-PRV-009 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-009.md` |          |
| SRAS-PRV-010 | `core/domains/privacy.yaml`             | `docs/en/reference/requirements/SRAS-PRV-010.md` |          |
| SRAS-SEC-001 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-001.md` |          |
| SRAS-SEC-002 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-002.md` |          |
| SRAS-SEC-003 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-003.md` |          |
| SRAS-SEC-004 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-004.md` |          |
| SRAS-SEC-005 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-005.md` |          |
| SRAS-SEC-006 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-006.md` |          |
| SRAS-SEC-007 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-007.md` |          |
| SRAS-SEC-008 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-008.md` |          |
| SRAS-SEC-009 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-009.md` |          |
| SRAS-SEC-010 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-010.md` |          |
| SRAS-SEC-011 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-011.md` |          |
| SRAS-SEC-012 | `core/domains/security.yaml`            | `docs/en/reference/requirements/SRAS-SEC-012.md` |          |
| SRAS-SCM-001 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-001.md` |          |
| SRAS-SCM-002 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-002.md` |          |
| SRAS-SCM-003 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-003.md` |          |
| SRAS-SCM-004 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-004.md` |          |
| SRAS-SCM-005 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-005.md` |          |
| SRAS-SCM-006 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-006.md` |          |
| SRAS-SCM-007 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-007.md` |          |
| SRAS-SCM-008 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-008.md` |          |
| SRAS-SCM-009 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-009.md` |          |
| SRAS-SCM-010 | `core/domains/supply-chain.yaml`        | `docs/en/reference/requirements/SRAS-SCM-010.md` |          |

### module (52)

| ID           | Source file                          | Reference page                                   | Decision |
| ------------ | ------------------------------------ | ------------------------------------------------ | -------- |
| SRAS-AI-001  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-001.md`  |          |
| SRAS-AI-002  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-002.md`  |          |
| SRAS-AI-003  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-003.md`  |          |
| SRAS-AI-004  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-004.md`  |          |
| SRAS-AI-005  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-005.md`  |          |
| SRAS-AI-006  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-006.md`  |          |
| SRAS-AI-007  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-007.md`  |          |
| SRAS-AI-008  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-008.md`  |          |
| SRAS-AI-009  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-009.md`  |          |
| SRAS-AI-010  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-010.md`  |          |
| SRAS-AI-011  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-011.md`  |          |
| SRAS-AI-012  | `modules/ai/module.yaml`             | `docs/en/reference/requirements/SRAS-AI-012.md`  |          |
| SRAS-CLD-001 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-001.md` |          |
| SRAS-CLD-002 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-002.md` |          |
| SRAS-CLD-003 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-003.md` |          |
| SRAS-CLD-004 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-004.md` |          |
| SRAS-CLD-005 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-005.md` |          |
| SRAS-CLD-006 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-006.md` |          |
| SRAS-CLD-007 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-007.md` |          |
| SRAS-CLD-008 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-008.md` |          |
| SRAS-CLD-009 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-009.md` |          |
| SRAS-CLD-010 | `modules/cloud-saas/module.yaml`     | `docs/en/reference/requirements/SRAS-CLD-010.md` |          |
| SRAS-INT-001 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-001.md` |          |
| SRAS-INT-002 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-002.md` |          |
| SRAS-INT-003 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-003.md` |          |
| SRAS-INT-004 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-004.md` |          |
| SRAS-INT-005 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-005.md` |          |
| SRAS-INT-006 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-006.md` |          |
| SRAS-INT-007 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-007.md` |          |
| SRAS-INT-008 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-008.md` |          |
| SRAS-INT-009 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-009.md` |          |
| SRAS-INT-010 | `modules/integration/module.yaml`    | `docs/en/reference/requirements/SRAS-INT-010.md` |          |
| SRAS-ONP-001 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-001.md` |          |
| SRAS-ONP-002 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-002.md` |          |
| SRAS-ONP-003 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-003.md` |          |
| SRAS-ONP-004 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-004.md` |          |
| SRAS-ONP-005 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-005.md` |          |
| SRAS-ONP-006 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-006.md` |          |
| SRAS-ONP-007 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-007.md` |          |
| SRAS-ONP-008 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-008.md` |          |
| SRAS-ONP-009 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-009.md` |          |
| SRAS-ONP-010 | `modules/on-prem/module.yaml`        | `docs/en/reference/requirements/SRAS-ONP-010.md` |          |
| SRAS-RGD-001 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-001.md` |          |
| SRAS-RGD-002 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-002.md` |          |
| SRAS-RGD-003 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-003.md` |          |
| SRAS-RGD-004 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-004.md` |          |
| SRAS-RGD-005 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-005.md` |          |
| SRAS-RGD-006 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-006.md` |          |
| SRAS-RGD-007 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-007.md` |          |
| SRAS-RGD-008 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-008.md` |          |
| SRAS-RGD-009 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-009.md` |          |
| SRAS-RGD-010 | `modules/regulated-data/module.yaml` | `docs/en/reference/requirements/SRAS-RGD-010.md` |          |

### overlay (45)

| ID         | Source file                                      | Reference page                         | Decision |
| ---------- | ------------------------------------------------ | -------------------------------------- | -------- |
| TH-ECM-001 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-002 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-003 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-004 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-005 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-006 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-007 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-008 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-009 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-010 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-011 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-ECM-012 | `overlays/industries/ecommerce/overlay.yaml`     | `docs/en/reference/overlays/TH-ECM.md` |          |
| TH-FIN-001 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-002 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-003 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-004 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-005 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-006 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-007 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-008 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-009 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-FIN-010 | `overlays/industries/finance/overlay.yaml`       | `docs/en/reference/overlays/TH-FIN.md` |          |
| TH-LOG-001 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-002 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-003 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-004 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-005 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-006 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-007 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-008 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-009 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-010 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-LOG-011 | `overlays/industries/logistics/overlay.yaml`     | `docs/en/reference/overlays/TH-LOG.md` |          |
| TH-PUB-001 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-002 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-003 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-004 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-005 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-006 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-007 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-008 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-009 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-010 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-011 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |
| TH-PUB-012 | `overlays/industries/public-sector/overlay.yaml` | `docs/en/reference/overlays/TH-PUB.md` |          |

## Checklist ต่อหน้า

ใช้ checklist นี้หนึ่งครั้งต่อ reference page หน้า core หรือ module มีหนึ่ง ID
ส่วนหน้า overlay มีหลาย ID จึงต้องบันทึกแต่ละ ID แยกกัน

- [ ] หน้าถูก generate จาก source YAML ใน inventory ไม่ได้แก้ด้วยมือ
- [ ] `title`, `description` และ `rationale` ภาษาอังกฤษตรงกับภาษาไทยทั้ง
      ความหมาย ขอบเขต และน้ำหนัก
- [ ] ข้อความไทยอ่านเป็นธรรมชาติ ไม่มีร่องรอย machine translation คำซ้ำ หรือ
      ภาษาอังกฤษที่ไม่ได้อธิบาย
- [ ] คำเทคนิคตรงกับอภิธานศัพท์ ID, key, คำสั่ง และชื่อผลิตภัณฑ์คงเป็นภาษาอังกฤษ
- [ ] ตัวเลข วันที่ เกณฑ์ ประเภทหลักฐาน freshness และการอ้างอิงไม่เปลี่ยน
- [ ] ไม่มีการเพิ่มข้อสรุปทางกฎหมาย การกล่าวอ้าง compliance ชื่อหน่วยงานจริง
      vendor endorsement หรือหลักฐานจริง
- [ ] ถ้อยคำของ gate และ criticality หนักแน่นเท่าภาษาอังกฤษ ไม่ลด gate ให้เป็น
      เพียงข้อเสนอแนะ
- [ ] `translation_status` ยังเป็น `partial` และ `machine_translated` ยังเป็น
      `true` จนผู้ตรวจบันทึกการอนุมัติ
- [ ] ทุก ID ในหน้า overlay มีผลตัดสินของตนเอง

หน้าจะเป็น `approved` ได้เมื่อทุก ID ในหน้าได้รับการอนุมัติ ผล `revise` หรือ
`reject` ทำให้ทั้งหน้าไม่ถือว่าเสร็จ

## วิธีทำเครื่องหมาย requirement เป็น complete

เมื่อผู้ตรวจมนุษย์ที่ระบุชื่ออนุมัติ ID แล้วเท่านั้น จึงแก้ entry ใน source YAML
schema บังคับสองฟิลด์เมื่อ `translation_status: complete`:

```yaml
translation_status: complete
machine_translated: false
translation_reviewed_by: Reviewer Name or @handle
translation_reviewed_at: "YYYY-MM-DD"
```

กฎ:

- `translation_reviewed_by` คือมนุษย์ที่ระบุชื่อ ไม่ใช่ AI agent เครื่องมือ หรือ
  ชื่อทีม
- `translation_reviewed_at` คือวันที่มนุษย์ตรวจเสร็จ
- ห้ามตั้ง `translation_status: complete` ขณะที่ฟิลด์ไทยใดในหน้านั้นยังแก้อยู่
  schema และ `validate --all` จะปฏิเสธฟิลด์ตรวจที่หาย แต่ตัดสินคุณภาพการแปล
  ไม่ได้
- ห้ามเปลี่ยน `review_status`, `reviewed_by`, `reviewed_at` หรือ `review_scope`
  เว้นแต่มีการตรวจเนื้อหาแยกต่างหาก การตรวจการแปลไม่ใช่การตรวจเนื้อหา
- ห้ามเปลี่ยนต้นฉบับอังกฤษ ID version หรือเกณฑ์ในการเปลี่ยนที่เกี่ยวกับการแปล
- ถ้าผู้ตรวจอนุมัติ ID ไม่ได้ ให้คงเป็น `partial` และบันทึก finding ใน review log

## Template การติดตาม

คัดลอก block นี้ไปยัง review log เพิ่มหนึ่งแถวต่อหนึ่ง ID จาก inventory

```text
Reviewer name:
Reviewer role and affiliation:
Independence statement:
Review date:
Commit reviewed:
Scope (all / Core / modules / overlays / page list):
Decision key: approved / revise / reject

ID | Source file | Decision | Note or proposed Thai wording
... | ... | ... | ...

Validation run:
- npm run sras -- validate --all:
- npm run sras -- render --check:
- npm test:
```

## นิยามความเสร็จของการตรวจภาษาไทย

- ทุก ID ในขอบเขตที่ตกลงมีผลตัดสินจากผู้ตรวจที่ระบุชื่อ
- ทุก ID ที่อนุมัติมี `translation_status: complete`,
  `machine_translated: false`, `translation_reviewed_by` และ
  `translation_reviewed_at`
- ทุก ID ที่ `revise` หรือ `reject` ยังเป็น `partial` พร้อม finding และ owner
- review log ถูก commit หรือมีลิงก์จาก repository
- `validate --all`, `render --check` และ tests ผ่าน
- หน้า readiness ถูกอัปเดตโดยเจ้าของ ไม่ใช่ผู้ตรวจหรือ AI agent และมีลิงก์
  review log

kit นี้ไม่ปิด milestone ไม่ตัด release และไม่กล่าวอ้างว่าการตรวจเสร็จแล้ว

## หน้าที่เกี่ยวข้อง

- [ความพร้อมของ template](template-readiness.md)
- [External review packet](external-review-packet.md)
- [v1.0.0 readiness review](v1-readiness.md)
- [อภิธานศัพท์ภาษาไทย](../glossary.md)
- [สถานะการดำเนินงาน](https://github.com/yutna/software-delivery-assurance/issues/67)
