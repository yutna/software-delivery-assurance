---
translation_status: partial
machine_translated: true
---

# Claim และ evidence

claim คือถ้อยแถลงสาธารณะเกี่ยวกับการรับประกันของผลิตภัณฑ์ claim จะดีได้เพียง
เท่าหลักฐานที่รองรับ คลังนี้แยกสองสิ่งนี้ออกจากกัน เพื่อให้ประโยคทางการขาย
ไม่วิ่งนำหน้าการประเมิน

## สถานะของ claim

- `verified` — หลักฐานปัจจุบันรองรับถ้อยคำ มีผู้อนุมัติและวันหมดอายุ
- `partial` — หลักฐานบางส่วนรองรับถ้อยคำที่แคบกว่า และระบุข้อจำกัดไว้
- `not_claimed` — โปรเจกต์ไม่กล่าวอ้างสิ่งนี้
- `prohibited` — ถ้อยคำกล่าวเกินหลักฐานและห้ามใช้

claim แบบ `verified` หรือ `partial` ต้องมีหลักฐานปัจจุบัน ผู้อนุมัติ และวัน
หมดอายุ claim ที่ไม่มีหลักฐานคือ `not_claimed`

## ถ้อยคำที่อนุญาตและห้ามใช้

`claims.yaml` บันทึกทั้งสองด้าน

```yaml
claims:
  - id: CLM-DEMO-001
    requirement_ids: [SRAS-SEC-001]
    status: verified
    allowed_wording: Synthetic access control is implemented and tested.
    prohibited_wording: The product meets every access rule without exception.
    owner: Example team
    approved_by: Example approver
    approved_at: "2026-10-27"
    expires_at: "2027-10-27"
```

ทีมขาย ทีม proposal และทีม bid ใช้เฉพาะ `allowed_wording`
`prohibited_wording` บันทึกประโยคที่ห้ามใช้ แม้ผลการประเมินจะแข็งแรง

## ประเภทหลักฐาน

evidence index ยอมรับ `document`, `diagram`, `configuration`, `screenshot`,
`test_result`, `metric`, `ticket`, `log`, `contract`, `attestation`,
`benchmark`, `interview` และ `report`

แต่ละข้อกำหนดระบุประเภทที่ยอมรับและอายุสูงสุด หลักฐานที่เก่ากว่าอายุสูงสุด
ถือว่าหมดอายุ

## กฎของ evidence index

- location เป็น reference ส่วนตัว ไม่ใช่ public URL
- ทุกรายการระบุข้อกำหนดที่รองรับ
- ทุกรายการมี owner, วันที่เก็บ และวันหมดอายุ
- freshness เป็น `current`, `expired` หรือ `unknown`
- redaction เป็น `none`, `partial` หรือ `full`
- hash เมื่อมี ต้องเป็นค่า SHA-256

## สิ่งที่ห้ามกล่าวอ้าง

- การรับรอง (certification) การให้ accreditation หรือ audit attestation
- ข้อสรุปว่าปฏิบัติตามกฎหมายอย่างสมบูรณ์
- การปฏิบัติตามกฎหมายเพราะมีรายการในทะเบียน
- การรับรองผู้ขาย
- ผลลัพธ์ที่หลักฐานไม่รองรับ
- claim ที่หมดอายุแล้ว

content guard ปฏิเสธถ้อยคำที่อันตรายที่สุดในเนื้อหาสาธารณะ และ template
เชื่อม claim กับหลักฐาน แต่ไม่ได้แทนที่การตรวจทาน

## Claim ใน repository สาธารณะ

repository นี้เก็บ templates และตัวอย่าง synthetic ไม่เก็บ claim ของลูกค้า
claim จริงอยู่ใน project instance ส่วนตัวพร้อมการอนุมัติและวันหมดอายุ

## หน้าที่เกี่ยวข้อง

- [Project instance](project-instance.md)
- [ข้อกำหนดและ criticality](requirements.md)
- [เครื่องมือและการตรวจสอบ](tools.md)
