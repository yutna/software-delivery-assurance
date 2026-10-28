---
translation_status: partial
machine_translated: true
---

# อ่านตัวอย่าง end-to-end ทีละไฟล์

`examples/e2e-project/` เป็นอินสแตนซ์ synthetic ของ Core + AI module + overlay
ภาคการเงินไทย ใช้เป็นตัวอย่างโครงสร้าง ไม่ใช่การประเมินผลิตภัณฑ์จริง
ชื่อ ไฟล์หลักฐาน และผลลัพธ์ทุกอย่างเป็นข้อมูลสมมติ

## อ่านไฟล์ตามลำดับนี้

### `assurance.yaml`

manifest เลือก `profile: full`, `tier: 2`, module `SRAS-AI` และ overlay `TH-FIN`
ระบุ owner ตัวอย่างและ `sras_version: 1.1.0` selection ตรงนี้ต้องตรงกับ
`assessment.yaml`

### `assessment.yaml`

assessment บันทึก 10 requirement แยกเป็น `verified` 2, `implemented` 4,
`partial` 3 และ `gap` 1 ส่วน gate ผ่าน 5, fail 1 และ readiness index คือ `0.75`
แต่ละรายการระบุหลักฐานและ notes record ที่ partial หรือ gap มี `gap_owner`
และ `due_date` เพื่อให้การทบทวนรอบถัดไปตามต่อได้

sign-off ระบุ **synthetic reviewer** ซึ่งเป็นตัวอย่างที่กรอกครบ ไม่ใช่การอนุมัติจริง
อินสแตนซ์ใหม่จาก `init` จะเขียน `Not signed` และ `project validate` จะเตือนแทน

### `evidence-index.yaml`

มี 7 รายการ `EV-E2E-001` ถึง `EV-E2E-007` ชี้ไปยังไฟล์ใต้
`examples/e2e-project/evidence/` แต่ละรายการระบุ requirement ที่รองรับ
ประเภท owner วันที่เก็บ วันหมดอายุ freshness และ redaction ประเภทหลักฐานตรงกับ
สิ่งที่ requirement คาดหวัง ตัวอย่างเช่น `SRAS-SEC-001` คาดหวัง configuration
และ test result และ index มีให้ทั้งสองแบบ

ไฟล์เหล่านี้เป็น placeholder ที่แสดงตำแหน่งที่โปรเจกต์ส่วนตัวจะชี้ไป
ไม่ใช่เนื้อหาของหลักฐานจริง

### `claims.yaml`

มีสอง claim แสดงถ้อยคำที่อนุญาตและห้ามใช้ `CLM-E2E-001` เป็น `verified`
ตามหลักฐานของมัน `CLM-E2E-002` เป็น `partial` และถ้อยคำที่ห้ามใช้ระบุข้อจำกัดไว้
คือ continuity มีเอกสารแล้วแต่การฝึกซ้อมยังเปิดอยู่ claim ที่ไม่มีหลักฐานปัจจุบัน
จะไม่ถือว่า verified

### `risk-register.yaml`

มีความเสี่ยงสองรายการจัดการช่องว่างที่เปิดอยู่ `RSK-E2E-001` ระดับ high และเปิดอยู่
มี owner และ due date `RSK-E2E-002` ถูกยอมรับแล้ว และ acceptance ID
`ACC-E2E-001` เชื่อมไปยังการตัดสินใจที่บันทึกไว้ ความเสี่ยงที่ไม่มี owner หรือ
วันทบทวนจะไม่ถือว่าถูกจัดการ

### `assurance.lock.yaml`

lockfile ปัก version ของ library, module และ overlay ที่เลือก กับไฟล์ standard
input พร้อม checksum ตัว lockfile คือสิ่งที่ทำให้ผลลัพธ์ reproduce ได้

## รันการตรวจ

```bash
npm run sras -- project validate examples/e2e-project
npm run sras -- project resolve examples/e2e-project
```

`project validate` ยืนยันว่าไฟล์ parse ได้ manifest กับ assessment ตรงกัน
lockfile เป็นปัจจุบัน ประเภทหลักฐานตรง และ claim กับ risk ชี้ไปยัง requirement
ที่ประเมินแล้ว ผลลัพธ์คือ

```text
project valid: .../examples/e2e-project; 11 resolved standard inputs; lockfile current
```

`project resolve` แสดงตัวหารที่อยู่เบื้องหลัง assessment

```text
project: End-to-end synthetic project
selection: profile=full tier=2 modules=SRAS-AI overlays=TH-FIN
resolved: 90 requirements (38 gates)
coverage: 9 assessed, 81 not assessed (81 missing records), 0 not applicable
```

ตัวอย่างประเมิน 9 จาก requirement ที่ resolve ได้ และปล่อย 81 ไว้ไม่ประเมิน
ตั้งใจให้เป็นแบบนั้น อินสแตนซ์ที่สมบูรณ์ยังมี coverage ที่เปิดอยู่ได้
ขอเพียงทุก gate ถูกประเมิน `project resolve` ที่นี่ exit 0 เพราะ gate ครบ

## ทำไมตัวอย่างนี้จึง valid

- manifest และ assessment อธิบายโปรเจกต์ version tier module และ overlay
  ชุดเดียวกัน
- lockfile ตรงกับ standard input ที่เลือก
- evidence reference ทุกตัวมีอยู่ และประเภทตรงกับ requirement
- claim และ risk ทุกตัวชี้ไปยัง requirement ที่ประเมินแล้ว
- ไม่ได้ตั้ง `scope.public_sector` เพราะไม่ได้เลือก overlay ภาครัฐ
- sign-off ระบุชื่อผู้ทบทวนที่เป็นคน จึงไม่เข้าเงื่อนไขคำเตือน unsigned
  แต่ผู้ทบทวนเป็นชื่อ synthetic

## สิ่งที่ตัวอย่างไม่ได้แสดง

- หลักฐานจริง ข้อมูลลูกค้า หรือชื่อผลิตภัณฑ์จริง
- การทบทวนทางกฎหมาย ภายนอก หรือโดยมนุษย์
- การรับรองหรือผล compliance
- การประเมิน requirement ที่ resolve ได้ครบทุกตัว

ลอกโครงสร้างและวินัยไปใช้ ไม่ใช่ลอกเนื้อหา

## หน้าที่เกี่ยวข้อง

- [ตรวจสอบอินสแตนซ์โปรเจกต์ส่วนตัวใน CI](ci-validation.md)
- [อัปเกรดอินสแตนซ์ 1.x](upgrade-1x.md)
- [คู่มือ template โปรเจกต์](project.md)
- [Claim และ evidence](../concepts/claims-and-evidence.md)
