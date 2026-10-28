---
translation_status: partial
machine_translated: true
---

# ข้อกำหนดและ criticality

ข้อกำหนด (requirement) คือถ้อยแถลงที่ทดสอบได้ว่าอะไรต้องเป็นจริงก่อนส่งมอบ
ซอฟต์แวร์ ไม่ใช่คำแนะนำ ไม่ใช่ตราความสมบูรณ์ และไม่ใช่ claim

## องค์ประกอบของข้อกำหนด

ทุกข้อกำหนดใน `core/` และ `modules/` มีฟิลด์เดียวกัน

- `id` — identifier ที่คงที่ เช่น `SRAS-GOV-001` ID ไม่เปลี่ยนและไม่ถูกนำ
  กลับมาใช้ใหม่
- `title.en` / `title.th` — ถ้อยแถลงสั้นของข้อกำหนด
- `description.en` / `.th` — สิ่งที่ต้องเป็นจริง เขียนให้ผู้ประเมินทดสอบได้
- `rationale.en` / `.th` — เหตุผลที่ข้อกำหนดนี้มีอยู่
- `criticality` — `gate`, `high`, `medium` หรือ `low`
- `applicability` — tier, module, overlay และข้อยกเว้นที่กำหนดว่าข้อกำหนด
  นี้ใช้หรือไม่
- `evidence` — ประเภทหลักฐานและอายุสูงสุดที่ยอมรับ
- `assessment.lite` — pass และ partial มีหน้าตาอย่างไรสำหรับ lite
- `assessment.full` — L2 และ L3 มีหน้าตาอย่างไรสำหรับ full
- `references` — แหล่งอ้างอิงทางการและแหล่งข้อมูลเพิ่มเติม
- `status` — `active`, `draft` หรือ `deprecated`
- `translation_status` — `complete`, `partial` หรือ `missing`

รายการทั้งหมดอยู่ใน [reference](../reference/index.md) ที่ generate ไว้

## Criticality

- `gate` — ต้องถึงระดับขั้นต่ำก่อนส่งมอบ และยกเว้นไม่ได้
- `high` — สำคัญต่อการตัดสินใจส่งมอบ และคาดว่าจะมีก่อน release ส่วนใหญ่
- `medium` — สำคัญต่อการประเมินที่สมบูรณ์ แต่ไม่ใช่ตัวบล็อกการส่งมอบ
- `low` — หลักฐานของแนวปฏิบัติที่ดี อาจเลื่อนได้โดยบันทึกเป็นช่องว่าง

ข้อกำหนดแบบ gate เป็น `not_applicable` ได้เฉพาะเมื่อมีเหตุผลด้าน scope ที่
บันทึกไว้และการอนุมัติจาก owner เท่านั้น overlay, module หรือ project addition
ยกเว้น gate ไม่ได้ กฎนี้เหมือนกันทุก profile

## Applicability

`applicability` จำกัดขอบเขตของข้อกำหนดโดยไม่เปลี่ยน ID

- `tiers` — tier ของผลิตภัณฑ์ที่ข้อกำหนดนี้ใช้
- `modules` — module ทางเทคนิคที่ทำให้ข้อกำหนดนี้เกี่ยวข้อง
- `overlays` — overlay ภาคธุรกิจหรือเขตอำนาจที่ทำให้เกี่ยวข้อง
- `excludes` — เงื่อนไขที่นำข้อกำหนดนี้ออกจากขอบเขต

assessment บันทึกสถานะสำหรับทุกข้อกำหนดที่ใช้ ข้อกำหนดที่ไม่ใช้จะไม่ถูกทิ้ง
เงียบ ๆ แต่บันทึกเป็น `not_applicable` พร้อมเหตุผล

## Evidence

แต่ละข้อกำหนดระบุประเภทหลักฐานหนึ่งรายการขึ้นไปและอายุสูงสุด ประเภทที่ยอมรับ
คือ `document`, `diagram`, `configuration`, `screenshot`, `test_result`,
`metric`, `ticket`, `log`, `contract`, `attestation`, `benchmark`, `interview`
และ `report`

กฎของหลักฐาน

- หลักฐานอยู่ในที่เก็บส่วนตัวนอก repository นี้
- repository สาธารณะมีเฉพาะตัวอย่าง synthetic
- evidence index บันทึก location, owner, วันที่เก็บ, วันหมดอายุ และสถานะ
  freshness
- หลักฐานที่เก่ากว่าอายุสูงสุดถือว่าหมดอายุ แม้จะถูกต้องตอนเก็บ
- claim ที่ไม่มีหลักฐานปัจจุบันไม่ใช่ claim ที่ verified

## แนวทางการประเมิน

`assessment.lite` อธิบาย pass และ partial สำหรับการตรวจรอบแรก
`assessment.full` อธิบาย L2 และ L3 สำหรับการตรวจเชิงลึก แนวทางเหล่านี้ไม่ใช่
ข้อกำหนดที่สอง แต่ช่วยให้ผู้ประเมินเห็นถ้อยแถลงเดียวกันในระดับที่ต่างกัน

## ID และความคงที่

ข้อกำหนด Core และ module ใช้ `SRAS-<DOMAIN>-<NNN>` ข้อกำหนด overlay ใช้
`<CC>-<INDUSTRY>-<NNN>` เช่น `TH-FIN-001` ทะเบียนใช้
`<CC>-<INSTRUMENT>-<NNN>`

กฎ

- ID ไม่ถูกนำกลับมาใช้ใหม่
- ข้อกำหนดที่ deprecated เก็บ ID เดิมและระบุข้อกำหนดที่แทน
- ไม่ใส่เลข version ใน ID
- ไม่ใส่ชื่อลูกค้าหรือโปรเจกต์ใน ID

## การแปล

ภาษาอังกฤษเป็นฉบับหลักสำหรับ identifier และ schema key ข้อกำหนดภาษาไทยต้อง
เป็นการแปลข้อความอังกฤษ ไม่ใช่การสรุป ข้อความไทยที่แปลด้วยเครื่องจะถูกทำ
เครื่องหมาย `machine_translated: true` และคง `translation_status: partial`
จนกว่าผู้ตรวจทานที่เป็นมนุษย์จะยืนยัน

## หน้าที่เกี่ยวข้อง

- [Profile และ maturity](profiles.md)
- [Claim และ evidence](claims-and-evidence.md)
- [Reference](../reference/index.md)
