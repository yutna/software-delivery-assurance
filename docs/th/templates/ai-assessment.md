---
translation_status: partial
machine_translated: true
---

# การประเมินด้วย AI

`templates/ai-assessment/prompt.md` เป็น prompt ที่คัดลอกได้สำหรับร่างการประเมิน
SRAS หนึ่งข้อกำหนด ไม่ใช่ผู้ตรวจสอบ (auditor): เครื่องมืออ่านโค้ดและเอกสาร เสนอ
สถานะ และอ้างอิงสิ่งที่อ่าน มนุษย์ตรวจผลและบันทึกใน `assessment.yaml`

prompt นี้เป็น template ไม่ใช่ prompt ต่อข้อกำหนด เพราะใส่ assessment guidance
ของข้อกำหนดนั้น scope ของโปรเจกต์ และรายการไฟล์เข้าไปในตัว จึงใช้ prompt เดียวได้
กับทุกข้อกำหนด โดยไม่ต้องเขียนคำสั่งเดิมซ้ำสำหรับแต่ละข้อ

> หน้านี้เป็นฉบับภาษาไทยที่แปลโดยเครื่องและปรับถ้อยคำ ยังไม่ผ่านการตรวจทาน
> โดยมนุษย์ จึงยังคง `translation_status: partial` และ `machine_translated: true`

## วิธีใช้

1. สร้าง private instance ด้วย `npm run sras -- init <dir> --profile lite|full`
   แล้วรัน `npm run sras -- project refresh <dir>` เพื่อ resolve ข้อกำหนดที่เลือก
2. เลือกข้อกำหนดหนึ่งข้อจาก `assessment.yaml` แล้วเปิดรายการใน YAML ของ library
   (`core/`, `modules/` หรือ `overlays/`)
3. คัดลอก prompt จาก `templates/ai-assessment/prompt.md` แล้วแทน `{placeholder}`
   ทุกตัวด้วยค่าของข้อกำหนดและโปรเจกต์
4. ระบุโค้ดและเอกสารที่เครื่องมือต้องอ่าน เลือกชุดที่แคบที่สุดที่พิสูจน์หรือ
   หักล้างข้อกำหนดได้
5. รัน prompt เครื่องมือจะคืน YAML หนึ่งรายการ
6. ตรวจ path ที่อ้าง สถานะ และ `evidence_refs` ทุกตัวก่อนวางรายการลง
   `assessment.yaml`
7. รัน `npm run sras -- project validate <dir>` และ
   `npm run sras -- project resolve <dir>`

## สิ่งที่ prompt บังคับ

- อ่านโค้ดและเอกสารก่อนตอบ ห้ามตอบจากข้อความข้อกำหนดอย่างเดียว
- อ้าง evidence ID ที่มีอยู่แล้วใน `evidence-index.yaml` ห้ามสร้าง ID ขึ้นมา
- คืน `gap` เมื่อไม่มีหลักฐานปัจจุบันรองรับข้อกำหนด
- รายงานความขัดแย้งระหว่างโค้ดกับเอกสาร แทนที่จะเลือกฝ่ายใดฝ่ายหนึ่ง
- ห้ามสร้าง path วันที่ ticket ID ชื่อผู้ตรวจ หรือตัวเลขขึ้นมาเอง
- คืนเฉพาะ YAML และไม่แก้ไฟล์ใด ๆ

## สิ่งที่มนุษย์ยังต้องรับผิดชอบ

- ข้อกำหนดนี้ใช้กับโปรเจกต์หรือไม่
- หลักฐานที่อ้างเป็นของจริง เป็นปัจจุบัน และเพียงพอหรือไม่
- gap owner และ due date ใน `risk-register.yaml`
- sign-off: `assessment.yaml` มาพร้อม `Not signed` และมนุษย์ที่มีชื่อจะแทนที่
  หลังตรวจการประเมินแล้วเท่านั้น

## ข้อจำกัด

- เครื่องมือตรวจพฤติกรรม runtime, การตั้งค่า infrastructure, สัญญา หรือแนวปฏิบัติ
  ขององค์กรไม่ได้ ถ้าเอกสารเหล่านั้นไม่อยู่ใน input
- เครื่องมืออ่านโค้ดผิดได้ ผล `verified` เป็นข้อเสนอ ไม่ใช่ข้อค้นพบ
- prompt ไม่สร้างหลักฐาน ถ้าหลักฐานไม่มี ผลลัพธ์ที่ถูกต้องมีเพียง `gap`
- ผลลัพธ์ไม่มีข้อกล่าวอ้างเรื่อง conformance การรับรอง หรือการตรวจสอบ

## หน้าที่เกี่ยวข้อง

- [Template โปรเจกต์](project.md)
- [ตรวจสอบ private project instance ใน CI](ci-validation.md)
- [Owner map](owner-map.md)
- [ความพร้อมของ template](../governance/template-readiness.md)
