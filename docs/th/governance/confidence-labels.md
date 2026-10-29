---
translation_status: partial
machine_translated: true
---

<!-- markdownlint-disable MD060: Prettier wraps Thai tables by code point; MD060 expects display width. -->

# Confidence labels

**สถานะ:** ข้อตกลงสำหรับเอกสารเท่านั้น เริ่มใช้พร้อมการปรับตำแหน่ง template
ใน v0.10.0 และใช้ต่อใน template release 1.2.0 **ไม่ใช่ฟิลด์ใน schema ไม่ใช่การรับรอง และไม่ใช่สถานะการทบทวน**

ป้าย confidence มีไว้ให้ผู้อ่านแยกสี่อย่าง: ผลที่คำสั่งหรือ test ทำซ้ำได้
ข้อความที่ดึงมาจาก repository การตัดสินชั่วคราว และแผนที่ยังไม่ลงมือทำ
ใช้กับข้อความในเอกสารเท่านั้น ไม่แตะ YAML contract, `review_status`,
`translation_status` หรือ object ที่มีโครงสร้าง

> หน้านี้เป็นฉบับภาษาไทยที่แปลโดยเครื่องและปรับถ้อยคำ ยังไม่ผ่านการตรวจทาน
> โดยมนุษย์ จึงยังคง `translation_status: partial` และ `machine_translated: true`

## ป้ายกำกับ

| ป้าย          | ความหมาย                                                               | ใช้กับ                                                     | ห้ามใช้กับ                                              |
| ------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| `checked`     | คำสั่ง test หรือการตรวจที่ทำซ้ำได้ให้ผลตามที่ระบุ ณ commit ที่ระบุ     | จำนวน ผล validation ผล build ผล link check                 | ความหมายทางกฎหมาย compliance การอนุมัติภายนอก ผลในอนาคต |
| `documented`  | ข้อความมาจากเนื้อหา repository และตรวจดูได้ แต่ยังไม่ผ่านการทดสอบอิสระ | คำอธิบายไฟล์ schema คำสั่ง และพฤติกรรมที่จัดทำเอกสารไว้    | ข้ออ้างที่ต้องใช้ test หรือแหล่งภายนอก                  |
| `provisional` | การตัดสินฉบับร่างที่อาจเปลี่ยนหลังใช้งานจริงหรือหลังการทบทวน           | ความเหมาะสมกับโปรเจกต์ คำแนะนำช่วงเริ่มใช้ คำถามที่ยังเปิด | ข้อเท็จจริงที่คำสั่งพิสูจน์ได้                          |
| `planned`     | งานที่อยู่ใน roadmap หรือ issue แต่ยังไม่ทำ                            | milestone หน้าในอนาคต การเปลี่ยน schema ในอนาคต            | สิ่งที่ผู้อ่านใช้ได้วันนี้                              |

ถ้าประโยคไม่มีป้าย อ่านเป็น `documented`

## วิธีติดป้าย

ใส่ป้ายต่อท้ายข้อความ หรือเพิ่มคอลัมน์ `Confidence` ในตาราง

```text
Standard content validates: 54 files (`checked`, 2026-10-28).
The template is suitable for a Thai public-sector pilot (`provisional`).
The v1.2.0 template release includes the owner map (`checked`).
```

ให้ขอบเขตแคบ "54 ไฟล์ผ่าน validation" เป็น `checked` แต่ "มาตรฐานถูกต้อง" ไม่ใช่
"หน้านี้อธิบาย template" เป็น `documented` แต่ "template ได้รับการรับรอง" ห้ามใช้

## กฎ

- `checked` ต้องมีคำสั่ง test หรือการตรวจที่ทำซ้ำได้ พร้อมวันที่หรือ commit
  ถ้าทำซ้ำไม่ได้ ให้ใช้ `documented`
- `checked` ไม่ได้หมายถึงผ่านการทบทวนภายนอก ถูกต้องทางกฎหมาย หรือเหมาะกับ
  การตัดสินใจ แต่หมายถึงการตรวจที่ระบุผ่านในขอบเขตที่บันทึก
- `provisional` เหมาะกับคำแนะนำการนำไปใช้ที่ยังไม่มีโปรเจกต์จริงทดสอบ
- `planned` ไม่ใช่คำมั่นสัญญาว่าจะส่งมอบ รายการ roadmap เปลี่ยนได้
- ห้ามใช้ confidence label แทน `review_status` หรือ `translation_status`
  หน้าหนึ่งอาจเป็น `translation_status: partial` แต่มีข้อความ `checked` เกี่ยวกับ
  คำสั่งได้
- ห้ามเพิ่มฟิลด์ confidence ใน YAML, JSON Schema หรือ project template ในรอบนี้
  การเปลี่ยน schema ต้องมี issue และ design note แยก
- ห้ามใช้ `checked` กับความหมายทางกฎหมายหรือสถานะปัจจุบันของแหล่งภายนอก
  ทะเบียนยังเป็น `unverified` จนกว่าผู้ตรวจทานที่มีคุณสมบัติจะลงนาม
- ห้ามใช้ป้ายเพื่อสื่อการรับรอง accreditation audit attestation หรือการอนุมัติ
  จากหน่วยงานกำกับดูแล

## ตัวอย่าง

| ข้อความ                                                   | ป้าย          | เหตุผล                                          |
| --------------------------------------------------------- | ------------- | ----------------------------------------------- |
| `sras validate --all` ผ่าน 54 ไฟล์ ณ commit ที่บันทึก     | `checked`     | คำสั่งให้ผล และขอบเขตคือ 54 ไฟล์                |
| ข้อกำหนด active 167 ข้อเป็น `translation_status: partial` | `checked`     | ตรวจ inventory และฟิลด์ YAML แล้วนับได้         |
| ทะเบียนเป็น `review_status: unverified`                   | `checked`     | ฟิลด์สถานะเป็น machine-readable และตรวจได้      |
| kit เหมาะกับการนำร่องภาครัฐไทยครั้งแรก                    | `provisional` | ยังไม่มีโปรเจกต์จริงในหลักฐานของ repository นี้ |
| v1.2.0 มี owner map และ confidence labels                 | `checked`     | release มีทั้งสองอย่างและตรวจไฟล์ได้            |
| overlay ภาครัฐครอบคลุมคำแนะนำกฎหมายจัดซื้อจัดจ้าง         | ไม่อนุญาต     | ไม่ครอบคลุมคำแนะนำทางกฎหมาย ข้อความนี้เป็นเท็จ  |

## ความสัมพันธ์กับ AI audit

confidence label ช่วยรักษาความซื่อตรงของข้อความใน template repository นี้ไม่ได้
ใช้ formal review หรือ sign-off โปรเจกต์ที่นำไปใช้อาจเพิ่มการทบทวนของตนเอง
แต่การทบทวนนั้นไม่เปลี่ยน confidence label ให้เป็นการรับรอง

[ความพร้อมของ template](template-readiness.md) ใช้ป้ายทั้งสี่
[บันทึก AI audit](v1-audit.md) เป็นบันทึกการตรวจ ไม่ใช่ confidence label

## ขอบเขตของข้อตกลงนี้

ข้อตกลงนี้เป็นเอกสารเท่านั้น ไม่เพิ่ม TypeScript type, schema property, CLI flag
หรือ test การเปลี่ยน schema ในอนาคตต้องมี issue, design note และ migration note
แยก จนถึงตอนนั้น ห้ามเพิ่มคีย์ `confidence` ในไฟล์ YAML ใด ๆ

## หน้าที่เกี่ยวข้อง

- [ความพร้อมของ template](template-readiness.md)
- [Owner map](../templates/owner-map.md)
- [Governance policy](https://github.com/yutna/software-delivery-assurance/blob/main/GOVERNANCE.md)
- [Scope](https://github.com/yutna/software-delivery-assurance/blob/main/SCOPE.md)
