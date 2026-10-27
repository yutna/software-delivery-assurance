---
translation_status: partial
machine_translated: true
---

# Project instance

project instance คือฝั่งส่วนตัวของการประเมิน ประกอบด้วย scope ที่เลือก
assessment, evidence index, claims และ risk register อยู่ใน repository ส่วนตัว
หรือแยกต่างหาก ไม่เคยอยู่ในคลังสาธารณะนี้

## สิ่งที่ `init` สร้าง

```bash
npm run sras -- init ~/sras-demo --profile lite
```

`init`

- ปฏิเสธ directory ที่มีอยู่และไม่ว่าง
- ปฏิเสธ path ที่มี `..`
- คัดลอก `templates/project/`
- แทน placeholder
- ใช้ profile ที่เลือก
- คำนวณ lockfile
- ตรวจสอบไฟล์ที่วางแผนไว้ก่อนเขียน
- ไม่เรียก network

ใช้ `--profile full` เมื่อต้องการ maturity L0–L4, น้ำหนักตาม criticality,
readiness index และ evidence coverage

## ไฟล์

- `README.md` — readme ของโปรเจกต์ที่ generate
- `assurance.yaml` — ข้อมูลโปรเจกต์ profile, tier, modules, overlays
- `assessment.yaml` — scope, assessor, ข้อกำหนดที่ประเมิน, gate, sign-off
- `evidence-index.yaml` — ดัชนีหลักฐานที่เก็บนอก instance
- `claims.yaml` — ถ้อยคำสาธารณะที่อนุญาตและห้ามใช้
- `risk-register.yaml` — ช่องว่างและความเสี่ยงพร้อม owner, due date และการ
  เปิดเผย
- `assurance.lock.yaml` — มาตรฐาน module overlay checksum และ generator ที่ pin

คู่มือรายละเอียดไฟล์อยู่ใน [คู่มือ template โปรเจกต์](../templates/project.md)

## Identity และ confidentiality

`assurance.yaml` บันทึกชื่อโปรเจกต์ คำอธิบาย owner และระดับ confidentiality
template ใช้ `internal` ตัวอย่าง synthetic ใช้ `synthetic`

ชื่อโปรเจกต์เป็นป้ายภายใน ไม่ใส่ชื่อลูกค้า ชื่อระบบจริง hostname หรือ
production identifier อื่นใน repository สาธารณะ

## Scope

assessment บันทึก systems, data, users และ jurisdictions ที่อยู่ในขอบเขต
scope เป็นสิ่งแรกที่ผู้ประเมินอ่าน การประเมินที่ไม่มี scope ที่อนุมัติแล้วไม่ถือ
ว่าถูกต้อง

การเปลี่ยน scope ถูกบันทึกเป็นการเปลี่ยนแปลง ไม่ใช่แก้ไขเงียบ ๆ การเปลี่ยน
scope ที่มีนัยสำคัญกระตุ้นให้ทบทวนข้อกำหนดที่ได้รับผลกระทบใหม่

## Evidence

evidence index ชี้ไปยังหลักฐานที่เก็บนอก instance location เป็น reference
ส่วนตัว เช่น `evidence/synthetic-policy.md` ไม่ใช่ public URL แต่ละรายการบันทึก
requirement, ประเภทหลักฐาน, คำอธิบาย, owner, วันที่เก็บ, วันหมดอายุ, freshness
และ redaction

repository สาธารณะมีเฉพาะหลักฐาน synthetic

## Claims

`claims.yaml` บันทึกถ้อยคำสาธารณะที่โปรเจกต์ใช้ได้และใช้ไม่ได้ claim เชื่อมกับ
หลักฐานและมี owner, การอนุมัติ และวันหมดอายุ claim ที่ไม่มีหลักฐานปัจจุบันคือ
`not_claimed` claim ที่กล่าวเกินหลักฐานคือ `prohibited`

## Risk register

`risk-register.yaml` บันทึกช่องว่างและความเสี่ยงพร้อม severity, likelihood,
impact, remediation, owner, due date, status, acceptance ID และการตัดสินใจ
เปิดเผยต่อลูกค้า ความเสี่ยงที่ accepted ต้องมี acceptance ID ความเสี่ยงที่ปิดแล้ว
ยังเก็บประวัติ

## Lockfile

`assurance.lock.yaml` ทำให้การประเมินทำซ้ำได้ pin version และ checksum ของ
SRAS, module และ overlay ที่เลือก, generator และเวลาที่สร้าง ให้ refresh เมื่อ
มาตรฐานหรือการเลือกเปลี่ยน

## สิ่งที่ต้องเป็นส่วนตัว

อยู่เฉพาะใน project instance ส่วนตัว

- scope และ assessment ที่กรอกแล้ว
- ข้อกำหนดของลูกค้า
- หลักฐานและ evidence index
- claims และการอนุมัติ
- สัญญาและความเห็นทางกฎหมาย
- การยอมรับความเสี่ยงและ sign-off

repository สาธารณะเก็บ SRAS Core และ modules, overlays และ registers,
templates และ schemas, ตัวอย่าง synthetic และ crosswalks

## หน้าที่เกี่ยวข้อง

- [Profile และ maturity](profiles.md)
- [Claim และ evidence](claims-and-evidence.md)
- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
