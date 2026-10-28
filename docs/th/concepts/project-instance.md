---
translation_status: partial
machine_translated: true
---

<!-- markdownlint-disable MD060: Prettier wraps Thai tables by code point; MD060 expects display width. -->

# Project instance

project instance คือฝั่งส่วนตัวของการประเมิน ประกอบด้วย scope ที่เลือก
assessment, evidence index, claims และ risk register เก็บไว้ใน repository
ส่วนตัวหรือแยกต่างหาก และไม่เคยอยู่ในคลังสาธารณะนี้

ถ้าเปรียบเทียบให้เห็นภาพ repository นี้เป็นแม่แบบและคู่มือ
ส่วน project instance คือแฟ้มงานจริงของทีม ซึ่งมีข้อมูลที่ละเอียดอ่อนและต้องจำกัด
การเข้าถึง

> หน้านี้เป็นฉบับภาษาไทยที่แปลโดยเครื่องและปรับถ้อยคำ ยังไม่ผ่านการตรวจทาน
> โดยมนุษย์ จึงยังคง `translation_status: partial` และ `machine_translated: true`

## สิ่งที่ `init` สร้าง

```bash
npm run sras -- init ~/sras-demo --profile lite
```

`init` จะ:

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

## ไฟล์และเจ้าของ

| ไฟล์                  | เนื้อหา                                                 | เจ้าของหลัก                |
| --------------------- | ------------------------------------------------------- | -------------------------- |
| `README.md`           | readme ของโปรเจกต์ที่ generate                          | assurance lead             |
| `assurance.yaml`      | ข้อมูลโปรเจกต์ profile, tier, modules, overlays         | sponsor และ assurance lead |
| `assessment.yaml`     | scope, assessor, requirement ที่ประเมิน, gate, sign-off | assurance lead             |
| `evidence-index.yaml` | ดัชนีหลักฐานที่เก็บนอก instance                         | evidence custodian         |
| `claims.yaml`         | ถ้อยคำสาธารณะที่อนุญาตและห้ามใช้                        | sponsor                    |
| `risk-register.yaml`  | ช่องว่างและความเสี่ยงพร้อม owner และ due date           | assurance lead             |
| `assurance.lock.yaml` | standard input และ checksum ที่ pin                     | assurance lead             |

คู่มือรายละเอียดไฟล์อยู่ใน [คู่มือ template โปรเจกต์](../templates/project.md)
และบทบาทอยู่ใน [owner map](../templates/owner-map.md)

## Identity และ confidentiality

`assurance.yaml` บันทึกชื่อโปรเจกต์ คำอธิบาย owner และระดับ confidentiality
template ใช้ `internal` ตัวอย่าง synthetic ใช้ `synthetic`

ชื่อโปรเจกต์เป็นป้ายภายใน ไม่ใส่ชื่อลูกค้า ชื่อระบบจริง hostname หรือ
production identifier อื่นใน repository สาธารณะ

## Scope

assessment บันทึก systems, data, users และ jurisdictions ที่อยู่ในขอบเขต
scope เป็นสิ่งแรกที่ผู้ประเมินอ่าน การประเมินที่ไม่มี scope ที่อนุมัติแล้ว
ไม่ถือว่าถูกต้อง

public sector instance บันทึก `scope.public_sector` เพิ่มเติม พร้อมหน่วยงาน
ผู้ว่าจ้างและ reference ของสัญญา ฟิลด์นี้เป็น `null` สำหรับ instance อื่น
จำเป็นเมื่อ instance เลือก `TH-PUB` และประเมิน `TH-PUB-001` เพื่อให้เชื่อมชุด
หลักฐานกับหน่วยงานที่ว่าจ้างได้ ตัวอย่างสาธารณะต้องใช้หน่วยงาน synthetic

การเปลี่ยน scope ถูกบันทึกเป็นการเปลี่ยนแปลง ไม่ใช่แก้ไขเงียบ ๆ การเปลี่ยน
scope ที่มีนัยสำคัญกระตุ้นให้ทบทวนข้อกำหนดที่ได้รับผลกระทบใหม่

## Evidence

evidence index ชี้ไปยังหลักฐานที่เก็บนอก instance location เป็น reference
ส่วนตัว เช่น `evidence/synthetic-policy.md` ไม่ใช่ public URL แต่ละรายการบันทึก
requirement, ประเภทหลักฐาน, คำอธิบาย, owner, วันที่เก็บ, วันหมดอายุ, freshness
และ redaction

repository สาธารณะมีเฉพาะหลักฐาน synthetic หลักฐานจริงให้เก็บในระบบที่ควบคุม
การเข้าถึงและมี retention ตามนโยบายขององค์กร

## Claims

`claims.yaml` บันทึกถ้อยคำสาธารณะที่โปรเจกต์ใช้ได้และใช้ไม่ได้ claim เชื่อมกับ
หลักฐานและมี owner, การอนุมัติ และวันหมดอายุ claim ที่ไม่มีหลักฐานปัจจุบันคือ
`not_claimed` claim ที่กล่าวเกินหลักฐานคือ `prohibited`

หลักง่าย ๆ: เขียนได้เท่าที่หลักฐานยังใช้ได้ และให้คนอื่นที่ไม่ใช่คนเขียนเป็น
ผู้อนุมัติ

## Risk register

`risk-register.yaml` บันทึกช่องว่างและความเสี่ยงพร้อม severity, likelihood,
impact, remediation, owner, due date, status, acceptance ID และการตัดสินใจ
เปิดเผยต่อลูกค้า ความเสี่ยงที่ accepted ต้องมี acceptance ID ความเสี่ยงที่ปิดแล้ว
ยังเก็บประวัติ

## Lockfile

`assurance.lock.yaml` ทำให้การประเมินทำซ้ำได้ pin version และ checksum ของ
SRAS, version ของ module และ overlay ที่เลือก และ SHA-256 ของ standard input
ทุกไฟล์ที่ resolve แล้ว ไม่บันทึก timestamp, generator หรือข้อมูลสภาพแวดล้อม
ไฟล์จึงเหมือนเดิมทุกครั้งที่ input เหมือนกัน

ตรวจ instance หลังแก้ไข และ refresh lockfile เมื่อเปลี่ยน selection หรือ
มาตรฐาน:

```bash
npm run sras -- project validate ~/sras-demo
npm run sras -- project refresh ~/sras-demo
```

`project validate` เป็นคำสั่งอ่านอย่างเดียว parse ไฟล์โปรเจกต์ทุกไฟล์ ใช้กฎ
ของโปรเจกต์ resolve selection ปัจจุบัน และล้มเหลวเมื่อ lockfile ล้า
`project refresh` คำนวณ `assurance.lock.yaml` ใหม่จาก selection ปัจจุบัน
เขียนเฉพาะไฟล์นั้น และปฏิเสธการเขียนเมื่อกฎโปรเจกต์ข้ออื่นยังล้มเหลว
ทั้งสองคำสั่งไม่เรียก network

## สิ่งที่ต้องเป็นส่วนตัว

อยู่เฉพาะใน project instance ส่วนตัว:

- scope และ assessment ที่กรอกแล้ว
- ข้อกำหนดของลูกค้า
- หลักฐานและ evidence index
- claims และการอนุมัติ
- สัญญาและความเห็นทางกฎหมาย
- การยอมรับความเสี่ยงและ sign-off

repository สาธารณะเก็บ SRAS Core และ modules, overlays และ registers,
templates และ schemas, ตัวอย่าง synthetic และ crosswalks

## เช็กลิสต์ก่อนส่งงาน

- [ ] sponsor อนุมัติ scope และ selection
- [ ] owner map มีชื่อจริงของทุกบทบาท
- [ ] assessment ตรงกับ assurance.yaml
- [ ] หลักฐานทุกชิ้นมี owner, วันหมดอายุ และ freshness ที่ถูกต้อง
- [ ] claims ทุกข้อมีหลักฐานที่ยังใช้ได้และผู้อนุมัติ
- [ ] ความเสี่ยงที่ accepted มี acceptance ID
- [ ] lockfile เป็นปัจจุบัน
- [ ] ไม่มีข้อมูลลูกค้าหรือ secret ใน repository สาธารณะ

## หน้าที่เกี่ยวข้อง

- [Owner map](../templates/owner-map.md)
- [Template โปรเจกต์](../templates/project.md)
- [Profile และ maturity](profiles.md)
- [Claim และ evidence](claims-and-evidence.md)
- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
