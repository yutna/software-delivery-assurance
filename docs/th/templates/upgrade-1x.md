---
translation_status: partial
machine_translated: true
---

# อัปเกรดอินสแตนซ์โปรเจกต์ 1.x

ขั้นตอนนี้ใช้กับการอัปเกรด minor ภายใน 1.x โดยยกตัวอย่าง 1.0.0 → 1.1.0
อ่าน release notes และ announcement ก่อนแก้อินสแตนซ์

## ก่อนเริ่ม

- `project validate` ผ่านโดยไม่มีข้อผิดพลาดบนอินสแตนซ์ปัจจุบัน
- commit หรือ backup directory ของอินสแตนซ์ รวม `assurance.lock.yaml`
- เปิด release notes ของ version เป้าหมายไว้อีกหน้าต่าง
- เตรียม library checkout ที่ tag เป้าหมายและ build ด้วย
  `npm ci && npm run build` ให้เรียบร้อย

## ขั้นตอน

1. **อ่าน release notes** ตรวจหัวข้อ breaking change และ migration minor
   release อาจเพิ่มคำสั่ง การตรวจ หรือเนื้อหาหน้า โดยไม่เปลี่ยน requirement ID
   หรือ schema shape อย่าดูแค่เลข version แล้วสรุปเอง

2. **อัปเดต version ทั้งสองไฟล์** ตั้ง `sras_version` ใน `assurance.yaml` และ
   `assessment.yaml` เป็น version เป้าหมาย เช่น `1.1.0` manifest กับ assessment
   ต้องตรงกัน ไม่อย่างนั้น validation จะ fail

3. **Refresh lockfile** รันจาก library checkout

   ```bash
   npm run sras -- project refresh ~/private-project
   ```

   ผลลัพธ์ที่คาดหวัง

   ```text
   refreshed /Users/you/private-project/assurance.lock.yaml; 11 resolved standard inputs; sha256:...
   ```

4. **Validate อินสแตนซ์**

   ```bash
   npm run sras -- project validate ~/private-project
   ```

   ผลลัพธ์ที่คาดหวัง

   ```text
   project valid: /Users/you/private-project; 11 resolved standard inputs; lockfile current
   ```

   จำนวน input ขึ้นกับ selection คำเตือนว่า sign-off ยังเป็น `Not signed`
   ไม่ทำให้ validation fail แต่คนยังต้องลงนามใน assessment

5. **ตรวจ coverage**

   ```bash
   npm run sras -- project resolve ~/private-project
   ```

   หัวของผลลัพธ์ที่คาดหวัง

   ```text
   resolved: 90 requirements (38 gates)
   coverage: 9 assessed, 81 not assessed (81 missing records), 0 not applicable
   ```

   ตัวเลขขึ้นกับ selection ส่วน exit 0 หมายถึงทุก gate ถูกประเมินแล้ว
   และ exit 1 จะแสดง gate ที่ยังไม่ได้ประเมิน

6. **บันทึกการเปลี่ยนแปลง** เพิ่มการอัปเกรดใน private change record และบันทึก
   requirement, evidence expectation หรือ check ใหม่ใน risk register ใน 1.1.0
   ไม่มี requirement ID, schema หรือ gate change

7. **Commit อินสแตนซ์** commit `assurance.yaml`, `assessment.yaml` และ
   `assurance.lock.yaml` ที่สร้างใหม่พร้อมกัน เพื่อให้ผู้อ่านคนถัดไป reproduce
   ผลได้

## สิ่งที่เปลี่ยนใน 1.1.0

- หน้า requirement ที่สร้างแสดง rationale, แนวทางการประเมิน, references และ
  crosswalk links
- มี crosswalk ไปยัง NIST SP 800-218 (SSDF)
- อินสแตนซ์ใหม่เขียน `Not signed` ใน sign-off และ `project validate` เตือน
  จนกว่าคนจะลงนาม อินสแตนซ์เดิมที่ลงนามแล้วไม่ได้รับผลกระทบ
- `check-version` ตรวจทั้งสอง field ของ version ใน `package-lock.json`
- ไม่มี requirement ID, schema shape หรือ gate เปลี่ยน

## เมื่อขั้นตอนใดล้มเหลว

- `assurance.lock.yaml: sras/version: expected ...` — lockfile กับ manifest
  ไม่ตรงกัน แก้ version ทั้งสอง field แล้วรัน `project refresh` อีกครั้ง
- `project validation error: ... sras_version` — `assurance.yaml` กับ
  `assessment.yaml` ไม่ตรงกัน ตั้งทั้งสองไฟล์เป็น version เดียวกัน
- `lockfile` หรือ `checksum` mismatch — selection หรือ library เปลี่ยน ให้
  refresh lockfile ห้ามแก้ checksum ด้วยมือ
- มี gate ใหม่ที่ยังไม่ได้ประเมิน — รัน `project resolve` ประเมิน gate แล้ว
  อัปเดตสรุป assessment

## ย้อนกลับ

กลับ library checkout ไปที่ tag ก่อนหน้า คืนไฟล์อินสแตนซ์และ lockfile ที่
commit ไว้ แล้วรัน `project validate` อีกครั้ง ห้ามใช้ lockfile ของ 1.0.0 กับ
library 1.1.0 แล้วเรียกว่าปัจจุบัน

## หน้าที่เกี่ยวข้อง

- [ตรวจสอบอินสแตนซ์โปรเจกต์ส่วนตัวใน CI](ci-validation.md)
- [คู่มือ template โปรเจกต์](project.md)
- [ตัวอย่าง end-to-end](e2e-walkthrough.md)
- [Release notes v1.0.0](../releases/v1.0.0.md)
