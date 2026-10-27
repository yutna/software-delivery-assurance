---
translation_status: partial
machine_translated: true
---

# ภาพรวม

Software Delivery Assurance Library เป็นคลังอ้างอิงแบบเปิดที่อิงหลักฐานสำหรับ
การรับประกันการส่งมอบซอฟต์แวร์ คลังนี้ประกอบด้วย SRAS Core, โมดูลทางเทคนิคที่
เลือกได้, overlay ภาคธุรกิจของประเทศไทย, ทะเบียนกฎระเบียบ, template สำหรับ
project instance และเครื่องมือ TypeScript ที่ตรวจสอบ render และ guard เนื้อหา

ไซต์นี้อธิบาย SRAS v0.6.0

## สี่คำถาม

ทุกส่วนของคลังมีอยู่เพื่อตอบคำถามหนึ่งในสี่ข้อนี้

1. **อะไรต้องเป็นจริงก่อนส่งมอบซอฟต์แวร์?**
   SRAS Core, module และ overlay ระบุข้อกำหนดที่ทดสอบได้
2. **หลักฐานใดพิสูจน์ได้?**
   แต่ละข้อกำหนดระบุประเภทหลักฐานและอายุสูงสุด
3. **อะไรคือสิ่งที่ควรหรือไม่ควรกล่าวอ้าง?**
   claim ผูกกับหลักฐาน พร้อมถ้อยคำที่อนุญาตและห้ามใช้
4. **ช่องว่างคืออะไรและแผนแก้ไขเป็นอย่างไร?**
   assessment และ risk register บันทึกช่องว่าง owner และกำหนดเวลา

## ชั้นของเนื้อหา

คลังนี้มีหลายชั้น แต่ละชั้นเพิ่มความเฉพาะเจาะจง ไม่มีชั้นใดแทนที่ชั้นล่าง

```text
ทะเบียนกฎระเบียบ     ข้อเท็จจริงและแหล่งอ้างอิงทางการ
        |
overlay ภาคธุรกิจ     ส่วนเพิ่มตามเขตอำนาจและอุตสาหกรรม
        |
โมดูลทางเทคนิค        ลักษณะผลิตภัณฑ์ เช่น AI หรือ cloud
        |
SRAS Core            baseline ที่ทุกผลิตภัณฑ์ถูกประเมิน
        |
project instance     scope, assessment, evidence, claims, risk
```

repository สาธารณะเป็นเจ้าของฝั่งซ้ายของโมเดล project instance ส่วนตัวเป็นเจ้าของ
ฝั่งขวา ได้แก่ scope, assessment ที่กรอกแล้ว, evidence index, claims, risk
register และ sign-off หลักฐานจริงและข้อมูลลูกค้าไม่เคยอยู่ใน repository นี้

## สิ่งที่มีในรุ่นนี้

- โดเมน Core 7 โดเมน ใน `core/domains/`
- ข้อกำหนด Core 70 ข้อ ใน `core/domains/`
- โมดูลทางเทคนิค 5 โมดูล ใน `modules/`
- ข้อกำหนดในโมดูล 52 ข้อ ใน `modules/`
- overlay ภาคธุรกิจ 4 ชุด ใน `overlays/industries/`
- ข้อกำหนดใน overlay 45 ข้อ ใน `overlays/industries/`
- ทะเบียนประเทศไทย 12 รายการ ใน `registers/th/`
- crosswalk 7 ชุด ใน `mappings/`
- profile 2 แบบ ใน `core/profiles/`
- template โปรเจกต์ 1 ชุด ใน `templates/project/`
- ตัวอย่าง synthetic 5 ชุด ใน `examples/`

สัญญาแบบ machine-readable อยู่ใน `schemas/` เป็น JSON Schema 2020-12
เครื่องมือ TypeScript อยู่ใน `src/sras/` และเปิดใช้ CLI ชื่อ `sras`

## สิ่งที่คลังนี้ไม่ใช่

- ไม่ใช่การรับรอง (certification) การให้ accreditation หรือ audit attestation
- ไม่ใช่คำแนะนำทางกฎหมายหรือข้อสรุปว่าผลิตภัณฑ์ปฏิบัติตามกฎหมาย
- ไม่ใช่การประเมินเฉพาะลูกค้า ชุดหลักฐาน สัญญา หรือความเห็นทางกฎหมาย
- ไม่ใช่ผลิตภัณฑ์แบบ hosted, dashboard หรือแพลตฟอร์ม multi-tenant
- ไม่ใช่สิ่งทดแทนโปรแกรม security, privacy หรือ quality ขององค์กรเอง

ขอบเขตที่มีผลผูกพันคือ
[SCOPE.md](https://github.com/yutna/software-delivery-assurance/blob/main/SCOPE.md)
repository ยังเผยแพร่
[DISCLAIMER.md](https://github.com/yutna/software-delivery-assurance/blob/main/DISCLAIMER.md)

## ภาคธุรกิจและตลาดที่รองรับ

ภาคธุรกิจที่รองรับคือ การเงิน อีคอมเมิร์ซ โลจิสติกส์ และภาครัฐ

ประเทศไทยมี overlay ภาคธุรกิจครบและมีทะเบียนกฎระเบียบที่ดูแลต่อเนื่อง
ทะเบียนสำหรับ ASEAN และ EU มีแผนใน milestone v0.x ถัดไป และจะเป็นเพียง
รายการอ้างอิง ไม่ใช่ overlay สำหรับการปฏิบัติตามกฎหมาย

## สถานะการตรวจทานและการแปล

เนื้อหาถูกทำเครื่องหมายเป็น `draft`, `unverified` หรือ `reviewed` การเป็น
`reviewed` ต้องมีชื่อผู้ตรวจทาน วันที่ตรวจ และขอบเขต เนื้อหาทางกฎหมายยังคง
`unverified` จนกว่าผู้ตรวจทานทางกฎหมายที่มีคุณสมบัติจะลงนาม เนื้อหามาตรฐาน
ใน v0.6.0 เป็น draft หรือ unverified ยังไม่มีผู้ตรวจทานภายนอกลงนาม

ภาษาอังกฤษเป็นฉบับหลักสำหรับ identifier, schema key และชื่อไฟล์ ภาษาไทยเป็น
ภาษาของเนื้อหาที่มีสถานะเท่าเทียมกัน หน้าที่แปลด้วยเครื่องจะถูกทำเครื่องหมาย
`translation_status: partial` และ `machine_translated: true` จนกว่าผู้ตรวจทาน
ที่เป็นมนุษย์จะยืนยัน

## กลุ่มผู้อ่าน

product owner, engineering lead, ทีม security และ privacy, ทีม operations,
ผู้ประเมิน และทีม bid ที่ต้องการวิธีอ้างอิงหลักฐานที่ใช้ซ้ำได้ เพื่อพูดคุยเรื่อง
ความพร้อมของซอฟต์แวร์โดยไม่ต้องสร้าง checklist ใหม่สำหรับลูกค้าแต่ละราย

## ขั้นตอนถัดไป

- เริ่มที่ [เริ่มต้นอย่างรวดเร็ว](quick-start.md)
- อ่าน [แนวคิด](concepts/index.md) ก่อนทำการประเมินจริง
- เลือก [module และ overlay](concepts/modules-and-overlays.md) ที่ตรงกับ
  ผลิตภัณฑ์
- ดู [reference](reference/index.md) ที่ generate ไว้
