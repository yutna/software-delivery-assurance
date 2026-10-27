---
translation_status: partial
machine_translated: true
---

# เริ่มต้นอย่างรวดเร็ว

คู่มือนี้พาผู้ใช้ใหม่จาก checkout ที่สะอาดไปจนถึง project instance ที่สร้างแล้วและ library gate ที่ผ่านภายในเวลาประมาณ 15 นาที ให้รันทุกคำสั่งจาก repository root

## ก่อนเริ่ม

- Node.js 24 LTS และ npm 11
- clone ของ `yutna/software-delivery-assurance`
- ต้องไม่มี customer data, secret หรือ evidence จริงใน repository นี้

```bash
git clone https://github.com/yutna/software-delivery-assurance.git
cd software-delivery-assurance
npm ci
npm run typecheck
```

คำสั่ง `npm run sras -- ...` จะ build `dist/` ก่อนรัน

## ขั้นที่ 1 — สร้าง project instance

```bash
npm run sras -- init ~/sras-demo --profile lite
```

ผลลัพธ์ที่คาดหวัง:

```text
created project instance at /Users/you/sras-demo
files: README.md, assurance.yaml, assessment.yaml, evidence-index.yaml, claims.yaml, risk-register.yaml, assurance.lock.yaml
next steps:
1. Edit assurance.yaml and assessment.yaml to set the project scope, assessor, and sign-off.
2. Select the modules and overlays that match the product, then refresh the lockfile.
3. Assess the resolved requirements and record evidence in the private evidence store.
4. Run npm run sras -- validate --all, render --check, and guard from the library repository.
```

`init` จะปฏิเสธ directory ที่มีไฟล์อยู่แล้วและ path ที่มี `..` และจะไม่เรียก network

ใช้ `--profile full` เมื่อต้องใช้ maturity L0–L4, readiness index และ evidence coverage ทั้งสอง profile ใช้ requirement ID ชุดเดียวกัน

## ขั้นที่ 2 — ประเมินโปรเจกต์

แก้ไฟล์เหล่านี้ใน project instance ใหม่:

- `assurance.yaml` — ชื่อโปรเจกต์ คำอธิบาย owner confidentiality และ selection
- `assessment.yaml` — scope assessor requirement ที่ประเมิน gate summary และ sign-off
- `evidence-index.yaml` — evidence ส่วนตัวและ freshness
- `claims.yaml` — ถ้อยคำที่อนุญาตและห้ามใช้
- `risk-register.yaml` — gap และความเสี่ยงพร้อม owner และ due date

requirement ที่ประเมินแล้วมีรูปแบบดังนี้:

```yaml
requirements:
  - id: SRAS-GOV-001
    status: implemented
    maturity: L3
    evidence_refs: [EV-DEMO-001]
    notes: Scope and ownership record approved.
    gap_owner: null
    due_date: null
```

กฎที่ project parser บังคับ:

- `full` ต้องมี maturity ทุก requirement และ `summary.index` อยู่ระหว่าง 0 ถึง 1
- `lite` ต้องมี `maturity: null` ทุก requirement และ `summary.index: null`
- `summary.counts` ต้องตรงกับสถานะของ requirement
- `assurance.yaml` และ `assessment.yaml` ต้องตรงกันในเรื่อง project identity, SRAS version, profile, tier, modules และ overlays
- claim ที่เป็น `verified` หรือ `partial` ต้องมี evidence ที่ยัง current มีผู้อนุมัติ และมีวันหมดอายุ
- risk ที่เป็น `accepted` ต้องมี acceptance ID
- location ของ evidence ต้องเป็น private reference เช่น `evidence/synthetic-policy.md` ห้ามเป็น public URL

คู่มือไฟล์ทั้งหมดอยู่ที่ [templates/project.md](templates/project.md)

## ขั้นที่ 3 — ตรวจสอบ library

```bash
npm run sras -- validate --all
```

ผลลัพธ์ที่คาดหวัง:

```text
validated 38 files
```

คำสั่งนี้ตรวจเนื้อหา SRAS standard ใน library ซึ่งประกอบด้วย requirement, module, overlay, register และ crosswalk โดยใช้ JSON Schema 2020-12 ใต้ `schemas/` และ domain rule ใน `src/sras/standard/`

> **การตรวจ project instance:** v0.6.0 ตรวจ project instance ตอนที่ `init` สร้างมันขึ้นมา ไฟล์ที่วางแผนไว้จะถูกตรวจด้วย schema และ project parser เดียวกันก่อนเขียนลง disk ยังไม่มีคำสั่งตรวจ project instance แยกใน v0.6.0

## ขั้นที่ 4 — Render และตรวจหน้า reference

```bash
npm run sras -- render
npm run sras -- render --check
```

`render` เขียนหน้า reference ภาษาอังกฤษใต้ `docs/en/reference/`
`render --check` คำนวณใหม่และรายงานหน้าที่หายไป เปลี่ยน หรือเกิน โดยไม่เขียนไฟล์ ผลลัพธ์ที่คาดหวัง:

```text
render check passed: 139 pages; 139 files
```

คำสั่งนี้ deterministic: ลำดับหน้า ลำดับรายการ และเนื้อหาไม่มี timestamp หรือข้อมูล environment

## ขั้นที่ 5 — Guard เนื้อหาสาธารณะ

```bash
npm run sras -- guard
```

ผลลัพธ์ที่คาดหวัง:

```text
guard passed: scanned 292 files; excluded 0
```

guard สแกน path เนื้อหาสาธารณะเพื่อหา คำที่อยู่นอกขอบเขตด้านสุขภาพและ sector, secret, private network identifier, personal data, ชื่อลูกค้าจาก private override และ unsafe claim ส่วน FDS pack, `vendor/`, `tests/` และ seed ชั่วคราว `internal/` ถูกยกเว้น

รูปแบบ machine-readable และ CI annotation:

```bash
npm run sras -- guard --format json
npm run sras -- guard --annotations
```

`--format json` เขียน report version 1 ที่มีโครงสร้างคงที่ไปที่ stdout
`--annotations` เขียน GitHub Actions annotation พร้อมไฟล์และบรรทัด
ใช้สอง flag นี้ร่วมกันไม่ได้

## Exit code

- `0` — คำสั่งเสร็จและ check ผ่าน
- `1` — พบ finding, validation ล้มเหลว, render drift หรือ `init` ปฏิเสธตามที่คาด
- `2` — usage error: command/flag ไม่รู้จัก, argument หาย, ค่าไม่ถูกต้อง

ตัวอย่างที่คืน `1`:

- `guard` พบคำต้องห้ามหรือ unsafe claim
- `render --check` พบหน้าที่หายไป เปลี่ยน หรือเกิน
- `validate --all` พบปัญหา schema หรือ domain
- `init` ไปที่ directory ที่ไม่ว่างหรือ path ที่มี `..`

## Command reference

- `npm run sras -- --version` — แสดง SRAS version
- `npm run sras -- --help` — แสดงรายการคำสั่ง
- `npm run sras -- validate --all` — ตรวจเนื้อหา standard ใน library
- `npm run sras -- init <dir> --profile lite` — สร้าง project instance แบบ lite
- `npm run sras -- init <dir> --profile full` — สร้าง project instance แบบ full
- `npm run sras -- render` — เขียนหน้า reference
- `npm run sras -- render --check` — ตรวจหน้า reference โดยไม่เขียน
- `npm run sras -- guard` — สแกนเนื้อหาสาธารณะ
- `npm run sras -- guard --format json` — แสดง guard report version 1
- `npm run sras -- guard --annotations` — แสดง GitHub Actions annotation

## แก้ปัญหา

- **`init` บอกว่า target ไม่ว่าง** เลือก directory ใหม่หรือย้ายไฟล์ที่ไม่ต้องใช้ออก `init` ไม่เขียนทับ
- **`init` ปฏิเสธชื่อโปรเจกต์** ใช้ชื่อ directory ที่ขึ้นต้นด้วยตัวอักษรหรือตัวเลข และมีเฉพาะตัวอักษร ตัวเลข ช่องว่าง จุด hyphen และ underscore
- **`render --check` รายงาน drift** รัน `npm run sras -- render` ตรวจหน้าที่เปลี่ยน แล้ว commit ทั้ง source และ output
- **`guard` พบชื่อส่วนตัว** ใส่ชื่อใน private override แล้วชี้ `SRAS_DENYLIST_PATH` ไปที่ไฟล์นั้น ห้าม commit override

## ขั้นต่อไป

- อ่าน [คู่มือ project template](templates/project.md)
- ดู [reference index](../en/reference/index.md)
- อ่าน `SCOPE.md`, `GOVERNANCE.md` และ `CONTRIBUTING.md` ก่อนประเมินจริง
