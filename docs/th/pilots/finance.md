---
translation_status: partial
machine_translated: true
---

# การนำร่อง A — การเงิน (synthetic)

**สถานะ:** การนำร่องภายใน เสร็จเมื่อ 2026-10-28
**ไลบรารี:** SRAS 0.8.0 ที่ commit `2264312`
**ภาคธุรกิจ:** การเงิน, overlay `TH-FIN`
**ข้อมูล:** synthetic เท่านั้น ไม่มีชื่อลูกค้า หลักฐานจริง หรือรายละเอียดจากระบบจริง

## วัตถุประสงค์

ทดสอบว่าทีมการเงินนำไลบรารีไปใช้ได้โดยไม่ต้องมีคนช่วยหรือไม่: สร้าง project
instance เลือก Core พร้อม module และ overlay ของภาคการเงิน หาข้อกำหนดที่เกี่ยวข้อง
ประเมิน และรัน checks การนำร่องยังเปรียบเทียบผลกับ `examples/finance-synthetic/`

## ขอบเขต

- SRAS Core, profile `full`, tier 2
- Modules `SRAS-AI`, `SRAS-INT`, `SRAS-RGD`, `SRAS-CLD`
- Overlay `TH-FIN`
- instance ใหม่ที่สร้างด้วย `sras init` และตัวอย่าง synthetic ด้านการเงิน

นอกขอบเขต: หลักฐานจริง ผลิตภัณฑ์จริง การทบทวนทางกฎหมาย ผู้ตรวจทานภายนอก และ
การทดสอบการใช้งานกับผู้ประเมินมากกว่าหนึ่งคน

## วิธีการ

การนำร่องรันบน clone ใหม่ด้วย Node.js 24.22.1 และ npm 11.12.1

1. สร้าง instance แบบ full profile

   ```text
   $ node dist/cli.js init <workdir>/finance-demo --profile full
   created project instance at <workdir>/finance-demo
   files: README.md, assurance.yaml, assessment.yaml, evidence-index.yaml, claims.yaml, risk-register.yaml, assurance.lock.yaml
   ```

2. ตั้ง selection เป็น module ทั้งสี่และ `TH-FIN` ใน `assurance.yaml` และ
   `assessment.yaml`
3. พยายาม validate instance ที่แก้ไขแล้ว
4. พยายาม refresh lockfile
5. คำนวณชุดข้อกำหนดที่ resolve ได้จากแหล่ง YAML และเปรียบเทียบกับชุดที่ประเมินใน
   ตัวอย่าง
6. รัน checks ของไลบรารี

ชุดที่ resolve ได้คำนวณด้วยกฎที่ไลบรารีจัดทำเอกสารไว้: tier applicability, module
ที่เลือก และ overlay ที่เลือก การนำร่องไม่ได้ใช้สคริปต์ส่วนตัวใน repository
ตัวเลขด้านล่างมาจาก YAML ที่เผยแพร่

## ผลลัพธ์

### สิ่งที่ทำงานได้

- `init` ปฏิเสธ target ที่ไม่ว่างและ path ที่มี `..` โดย exit code 1 ทั้งสองกรณี
- lockfile ที่สร้างขึ้น pin เวอร์ชัน SRAS และ SHA-256 ของ standard input ทุกไฟล์
- `validate --all` ผ่านด้วย `validated 53 files`
- `render --check` ผ่านด้วย `render check passed: 154 pages; 154 files`
- `guard` ผ่านด้วย `guard scanned 326 files; excluded 0`
- ข้อกำหนด `TH-FIN` ทุกรายการอ้างอิงแหล่งทางการและเชื่อมกับทะเบียน ยกเว้นกรอบ
  ความเสี่ยง AI ภายนอก
- ตัวอย่างไม่มีข้อมูลลูกค้า หลักฐานจริง หรือตัวระบุจากระบบจริง

### Findings

- **PF-01 — High.** ตัวอย่างด้านการเงินไม่ใช่ project instance ที่ถูกต้อง: ไม่มี `assurance.yaml` และ `risk-register.yaml` และ lockfile ใช้รูปแบบเก่าที่ parser ของ project-lock ปฏิเสธ. Disposition: แก้ใน #59
- **PF-02 — High.** ไม่มีคำสั่ง validate instance ที่แก้ไขแล้วหรือ refresh lockfile แม้ `init` และเอกสารจะบอกให้ทำทั้งสองอย่าง. Disposition: เลื่อนไป #127
- **PF-03 — Medium.** ไม่มี CLI สำหรับ requirement resolution ผู้ใช้ต้องอ่าน YAML เองเพื่อรู้ว่าอะไรใช้บังคับ. Disposition: เลื่อนไป #126
- **PF-04 — High.** ตัวอย่างรายงานว่าประเมิน 8 ข้อกำหนดและ 6 gates โดยไม่มีตัวหาร แต่ selection ที่ประกาศ resolve ได้ 122 ข้อกำหนดและ 46 gates จึงมี 40 gates ที่ยังไม่ถูกประเมินและไม่มีอะไรรายงาน. Disposition: แก้ใน #59
- **PF-05 — Medium.** freshness ของ evidence เป็นการประกาศเอง รายการยังเป็น `current` ได้หลังวันหมดอายุ และ claim เป็น `verified` บนรายการนั้นได้. Disposition: แก้ใน #59
- **PF-06 — Medium.** หน้า concept สองหน้าระบุว่า lockfile pin generator และ generation time แต่ schema ไม่ได้เก็บทั้งสอง และ template guide ระบุถูกแล้ว. Disposition: แก้ใน #59
- **PF-07 — Low.** ตัวอย่างในหน้า resolution ระบุว่า lockfile ของ end-to-end pin SRAS 0.5.0 แต่จริง ๆ pin 0.8.0. Disposition: แก้ใน #59
- **PF-08 — Low.** `init` บันทึกวันที่เป็น UTC ผู้ใช้ในกรุงเทพฯ ก่อน 07:00 น. จะได้วันก่อนหน้าในสี่ฟิลด์. Disposition: แก้ใน #59
- **PF-09 — Low.** หน้ากาศการเงินระบุว่า overlay อ้างอิงทะเบียนสองรายการ แต่จริง ๆ อ้างอิงหกรายการและกรอบภายนอกอีกหนึ่ง. Disposition: แก้ใน #59
- **PF-10 — Medium.** `TH-FIN-004` กำหนดให้มีระยะเวลาเก็บรักษาแต่ไม่ได้ระบุระยะเวลา. Disposition: คำถามกฎหมาย #129
- **PF-11 — Medium.** overlay ไม่ได้ระบุว่าการใช้ cloud แบบ material ต้องได้รับอนุมัติล่วงหน้าจากธนาคารแห่งประเทศไทยหรือไม่. Disposition: คำถามกฎหมาย #128

## รายละเอียดของ findings ระดับ high

### PF-01 — ตัวอย่างไม่ใช่ instance ที่ถูกต้อง

ไดเรกทอรีตัวอย่างมี `assessment.yaml`, `evidence-index.yaml`, `claims.yaml`,
`assurance.lock.yaml` และ `evidence/` แต่ไม่มี `assurance.yaml` หรือ
`risk-register.yaml` ซึ่ง template และ parser ของโปรเจกต์กำหนดไว้ lockfile ยังไม่
ตรงกับ schema ปัจจุบัน:

```text
$ parse finance-synthetic/assurance.lock.yaml
/lockfile_version: expected lockfile_version 1
/sras/checksum: expected a string
/inputs: expected an array
```

test ของตัวอย่างไม่เคย parse ไฟล์นี้เป็น project lock ดังนั้น CI จึงไม่จับ
ทีมที่คัดลอกตัวอย่างจึงเริ่มจากชุดไฟล์ที่ไลบรารีเองจะไม่ยอมรับจาก `init`

### PF-02 — ไม่มี validation หรือ lock refresh หลัง `init`

หลังเปลี่ยน selection `validate --all` ยังผ่าน:

```text
$ node dist/cli.js validate --all
validated 53 files
```

lockfile ยังระบุ `modules: []` และ `overlays: []` จึงไม่ตรงกับ `assurance.yaml`
อีกต่อไป `validate --all` ตรวจเนื้อหาของไลบรารี ไม่ได้ตรวจไดเรกทอรีโปรเจกต์ และ
ไม่มีคำสั่งอื่น:

```text
$ node dist/cli.js validate <workdir>/finance-demo
unknown argument: <workdir>/finance-demo
```

output ของ `init` และหน้าเอกสารสามหน้าบอกให้ผู้ใช้ refresh lockfile แต่ไม่มี
คำสั่งใดทำสิ่งนั้นใน 0.8.0 quick start ระบุว่ายังไม่มี standalone project
validator ใน 0.8.0 แต่หน้าอื่นไม่ได้ระบุข้อจำกัดนี้

### PF-04 — slice ที่ประเมินไม่ได้ระบุตัวหาร

สำหรับ selection ที่ประกาศใน tier 2 ไลบรารี resolve ได้ 122 ข้อกำหนด เป็น gate
46 ข้อ ตัวอย่างประเมิน 8 ข้อกำหนด เป็น gate 6 ข้อ และครอบ 4 จาก 10 ข้อกำหนด
`TH-FIN` README ระบุว่า "8 assessed requirements, including 6 gates" และไม่ได้
บอกว่ามีกี่ gate ที่ใช้บังคับ

ตัวอย่างตั้งใจให้เป็น slice และ test จำกัดไว้ที่ 5–10 ข้อกำหนด ปัญหาคือผู้อ่านไม่
เห็นตัวหาร จึงอาจตีความ gate summary ที่ผ่าน 5 และไม่ผ่าน 1 ว่าเป็นสถานะ gate ของ
ทั้ง selection มี gate 40 ข้อที่ยังไม่ถูกประเมินและตัวอย่างไม่ได้ระบุ

## ข้อจำกัด

- ผู้ประเมินหนึ่งคน โปรเจกต์ synthetic หนึ่งโปรเจกต์ ไลบรารีหนึ่งเวอร์ชัน
- การนำร่องไม่ได้ใช้หลักฐานจริงหรือผลิตภัณฑ์จริง จึงไม่บอกอะไรเกี่ยวกับภาระงาน
  ประเมินบนระบบจริง
- ไม่ได้ทดสอบ lite profile, module อื่น หรือ overlay อื่น
- ไม่มีผู้ตรวจทานภายนอกหรือผู้ตรวจทานกฎหมายที่มีคุณสมบัติเข้าร่วม
- จำนวนที่ resolve ได้ขึ้นกับ tier และ selection; selection อื่นให้ตัวหารอื่น

## คำถามที่ยังเปิดอยู่

คำถามเหล่านี้เป็นคำถามทางกฎหมาย repository บันทึกไว้และไม่ตอบเอง

- กฎหมายใดกำหนดระยะเวลาเก็บรักษาบันทึกธุรกรรมสำหรับ `TH-FIN-004` ดู #129
- การใช้ cloud หรือ outsourcing แบบ material ต้องแจ้งหรือขออนุมัติล่วงหน้าจาก
  ธนาคารแห่งประเทศไทยหรือไม่ ดู #128

## Follow-ups

- Findings ที่แก้แล้ว: #59
- Findings ที่เลื่อน: #126 (resolution และ coverage ใน CLI) และ #127 (validate และ
  refresh project instance)
- คำถามกฎหมายที่เปิดอยู่: #128 และ #129

## หน้าที่เกี่ยวข้อง

- [ภาพรวมการนำร่อง](index.md)
- [ภาคการเงิน](../sectors/finance.md)
- [คู่มือ project template](../templates/project.md)
