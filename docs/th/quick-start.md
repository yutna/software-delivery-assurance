---
translation_status: partial
machine_translated: true
---

<!-- markdownlint-disable MD060: Prettier wraps Thai tables by code point; MD060 expects display width. -->

# เริ่มต้นอย่างรวดเร็ว

คู่มือนี้พาจาก checkout ที่สะอาดไปจนถึง project instance ที่สร้างแล้วและผ่านการ
ตรวจ library ใช้เวลาประมาณ 15 นาที ให้รันทุกคำสั่งจาก repository root

> หน้านี้เป็นฉบับภาษาไทยที่แปลโดยเครื่องและปรับถ้อยคำเพื่อให้อ่านง่ายขึ้น
> ยังไม่ผ่านการตรวจทานโดยมนุษย์ จึงยังคง `translation_status: partial` และ
> `machine_translated: true` ก่อนใช้ตัดสินใจจริง อ่าน
> [ความพร้อมของ template](governance/template-readiness.md) และยอมรับข้อจำกัด

## ก่อนเริ่ม

- Node.js 24 LTS และ npm 11
- clone ของ `yutna/software-delivery-assurance`
- ไม่มี customer data, secret หรือหลักฐานจริงใน repository นี้
- CLI `sras` ไม่ได้เผยแพร่บน npm จึงต้องรันจาก clone นี้ เวลาใช้ประเมินจริงให้ pin
  release tag หรือ commit เพื่อให้ library ใน lockfile ตรงกับเครื่องมือที่สร้างไฟล์นั้น
- เข้าใจว่ากำลังใช้ template track ซึ่งเป็นเส้นทางหลัก ไม่ใช่การรับรอง

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

ผลลัพธ์ที่คาดหวังมีลักษณะดังนี้:

```text
created project instance at /Users/you/sras-demo
files: README.md, assurance.yaml, assessment.yaml, evidence-index.yaml, claims.yaml, risk-register.yaml, assurance.lock.yaml
next steps:
1. Edit assurance.yaml and assessment.yaml to set the project scope, assessor, and sign-off.
2. Select the modules and overlays that match the product, then run npm run sras -- project refresh <dir> from the library repository.
3. Assess the resolved requirements and record evidence in the private evidence store.
4. Run npm run sras -- project validate <dir>, validate --all, render --check, and guard from the library repository.
```

`init` จะปฏิเสธ directory ที่ไม่ว่างและ path ที่มี `..` ไม่เขียนทับไฟล์เดิม
และไม่เรียก network

เลือก `--profile full` เมื่อต้องใช้ maturity L0–L4, readiness index และ
evidence coverage ทั้งสอง profile ใช้ requirement ID ชุดเดียวกัน

## ขั้นที่ 2 — กรอกข้อมูลโปรเจกต์

แก้ไฟล์เหล่านี้ใน instance ที่สร้างใหม่:

| ไฟล์                  | สิ่งที่ต้องแก้                                                     |
| --------------------- | ------------------------------------------------------------------ |
| `assurance.yaml`      | ชื่อโปรเจกต์ คำอธิบาย owner confidentiality และ selection          |
| `assessment.yaml`     | scope, assessor, requirement ที่ประเมิน, gate summary และ sign-off |
| `evidence-index.yaml` | รายการหลักฐานส่วนตัวและ freshness                                  |
| `claims.yaml`         | ถ้อยคำที่อนุญาตและห้ามใช้                                          |
| `risk-register.yaml`  | ช่องว่างและความเสี่ยงพร้อม owner และ due date                      |

`init` เติม `signoff` ด้วย `Project owner` บทบาท `Project owner` และวันที่สร้าง
เพื่อให้ไฟล์ที่สร้างยัง valid ตาม schema แต่ไม่ใช่การอนุมัติ ให้เปลี่ยนชื่อ บทบาท
และวันที่เป็นการตัดสินใจของมนุษย์ที่ระบุชื่อได้ก่อนใช้อินสแตนซ์เพื่อการตัดสินใจ
ส่งมอบใด ๆ `project validate` ตรวจโครงสร้าง ไม่ได้ตรวจว่าใครลงนาม

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

กฎที่ parser บังคับ:

- `full` ต้องมี maturity ทุก requirement และ `summary.index` อยู่ระหว่าง 0 ถึง 1
- `lite` ต้องมี `maturity: null` ทุก requirement และ `summary.index: null`
- `summary.counts` ต้องตรงกับสถานะของ requirement
- `assurance.yaml` และ `assessment.yaml` ต้องตรงกันในเรื่อง project identity,
  SRAS version, profile, tier, modules และ overlays
- claim ที่เป็น `verified` หรือ `partial` ต้องมีหลักฐานที่ยังใช้ได้ มีผู้อนุมัติ
  และมีวันหมดอายุ
- requirement ที่เป็น `verified` ต้องมีหลักฐานอย่างน้อยหนึ่งรายการของทุกประเภท
  ที่ข้อกำหนดคาดหวัง ประเภทอื่นใช้แทนประเภทที่ขาดไม่ได้
- risk ที่เป็น `accepted` ต้องมี acceptance ID
- public sector instance ที่ประเมิน `TH-PUB-001` ต้องมี `scope.public_sector`
  พร้อม `contracting_authority` และ `contract_reference`
- location ของหลักฐานต้องเป็น private reference เช่น
  `evidence/synthetic-policy.md` ห้ามเป็น public URL

คู่มือไฟล์ทั้งหมดอยู่ที่ [คู่มือ template โปรเจกต์](templates/project.md)

## ขั้นที่ 3 — ตรวจ instance และ refresh lockfile

```bash
npm run sras -- project validate ~/sras-demo
```

ผลลัพธ์ที่คาดหวังมีลักษณะดังนี้:

```text
project valid: /Users/you/sras-demo; 9 resolved standard inputs; lockfile current
```

`project validate` parse ไฟล์โปรเจกต์ทุกไฟล์ ใช้กฎเดียวกับ `init` resolve
selection ปัจจุบัน และล้มเหลวพร้อมรายการปัญหาที่อ่านได้เมื่อ lockfile ล้า
คำสั่งนี้อ่านอย่างเดียว ไม่เขียนไฟล์

หลังเปลี่ยน module หรือ overlay ที่เลือก ให้ refresh lockfile:

```bash
npm run sras -- project refresh ~/sras-demo
```

`project refresh` คำนวณ `assurance.lock.yaml` ใหม่จาก selection ปัจจุบันและ
standard input เขียนเฉพาะไฟล์นั้น และปฏิเสธการเขียนเมื่อกฎโปรเจกต์ข้ออื่น
ล้มเหลว

ดูชุด requirement ที่ resolve ได้และ gate ที่ยังไม่ถูกประเมิน:

```bash
npm run sras -- project resolve ~/sras-demo
```

คำสั่งนี้แสดง requirement ที่ resolve ทั้งหมดพร้อม layer และ criticality
จากนั้นสรุป coverage และออกด้วย exit code 1 ตราบใดที่ gate ยังไม่มีบันทึก
การประเมินหรือเป็น `not_assessed` ส่วน gate ที่บันทึกเป็น `not_applicable`
จะไม่ถูกนับว่ายังไม่ถูกประเมิน

## ขั้นที่ 4 — ตรวจเนื้อหามาตรฐานใน library

```bash
npm run sras -- validate --all
```

ผลลัพธ์ที่คาดหวังมีลักษณะดังนี้:

```text
validated 53 files
```

คำสั่งนี้ตรวจ requirement, module, overlay, register และ crosswalk ใน library
ด้วย JSON Schema 2020-12 ใต้ `schemas/` และ domain rule ใน `src/sras/standard/`

`validate --all` ตรวจ library ไม่ใช่ project instance ใช้
`project validate <dir>` สำหรับ instance และ `project refresh <dir>` เพื่อ
อัปเดต lockfile

## ขั้นที่ 5 — Render และตรวจหน้า reference

```bash
npm run sras -- render
npm run sras -- render --check
```

`render` เขียนหน้า reference ภาษาอังกฤษใต้ `docs/en/reference/`
`render --check` คำนวณใหม่และรายงานหน้าที่หายไป เปลี่ยน หรือเกิน โดยไม่เขียนไฟล์
ผลลัพธ์ที่คาดหวังมีลักษณะดังนี้:

```text
render check passed: 154 pages; 154 files
```

คำสั่งนี้ deterministic: ลำดับหน้า ลำดับรายการ และเนื้อหาไม่มี timestamp หรือ
ข้อมูล environment

## ขั้นที่ 6 — Guard เนื้อหาสาธารณะ

```bash
npm run sras -- guard
```

ผลลัพธ์ที่คาดหวังมีลักษณะดังนี้:

```text
guard passed: scanned 365 files; excluded 0
```

จำนวนไฟล์อาจเปลี่ยนเมื่อเพิ่มหรือลบไฟล์ สิ่งสำคัญคือผลผ่านหรือไม่ผ่าน

guard สแกนเนื้อหาสาธารณะเพื่อหาคำศัพท์นอกขอบเขต, secret, private network
identifier, personal data, ชื่อลูกค้าจาก private override และ unsafe claim
ส่วน FDS pack, `vendor/` และ `tests/` ถูกยกเว้น

รูปแบบ machine-readable และ CI annotation:

```bash
npm run sras -- guard --format json
npm run sras -- guard --annotations
```

`--format json` เขียน report version 1 ที่มีโครงสร้างคงที่ไปที่ stdout
`--annotations` เขียน GitHub Actions annotation พร้อมไฟล์และบรรทัด
ใช้สอง flag นี้ร่วมกันไม่ได้

## Exit code

| Code | ความหมาย                                                                 |
| ---- | ------------------------------------------------------------------------ |
| `0`  | คำสั่งเสร็จและการตรวจผ่าน                                                |
| `1`  | พบ finding, validation ล้มเหลว, render drift หรือ `init` ปฏิเสธตามที่คาด |
| `2`  | usage error: command/flag ไม่รู้จัก, argument หาย หรือค่าไม่ถูกต้อง      |

ตัวอย่างที่คืน `1`:

- `guard` พบคำต้องห้ามหรือ unsafe claim
- `render --check` พบหน้าที่หายไป เปลี่ยน หรือเกิน
- `validate --all` พบปัญหา schema หรือ domain
- `project validate` พบ lockfile ที่ล้า ไฟล์หาย หรือกฎโปรเจกต์ที่ล้มเหลว
- `init` ไปที่ directory ที่ไม่ว่างหรือ path ที่มี `..`

## Command reference

| คำสั่ง                                      | ใช้ทำอะไร                         |
| ------------------------------------------- | --------------------------------- |
| `npm run sras -- --version`                 | แสดง SRAS version                 |
| `npm run sras -- --help`                    | แสดงรายการคำสั่ง                  |
| `npm run sras -- validate --all`            | ตรวจเนื้อหามาตรฐานใน library      |
| `npm run sras -- init <dir> --profile lite` | สร้าง project instance แบบ lite   |
| `npm run sras -- init <dir> --profile full` | สร้าง project instance แบบ full   |
| `npm run sras -- project validate <dir>`    | ตรวจ project instance ที่มีอยู่   |
| `npm run sras -- project refresh <dir>`     | คำนวณ lockfile ของโปรเจกต์ใหม่    |
| `npm run sras -- project resolve <dir>`     | แสดง resolution และ gate coverage |
| `npm run sras -- render`                    | เขียนหน้า reference               |
| `npm run sras -- render --check`            | ตรวจหน้า reference โดยไม่เขียน    |
| `npm run sras -- guard`                     | สแกนเนื้อหาสาธารณะ                |
| `npm run sras -- guard --format json`       | แสดง guard report version 1       |
| `npm run sras -- guard --annotations`       | แสดง GitHub Actions annotation    |

## แก้ปัญหา

- **`init` บอกว่า target ไม่ว่าง** เลือก directory ใหม่หรือย้ายไฟล์ที่ไม่ต้องใช้
  ออก `init` ไม่เขียนทับ
- **`init` ปฏิเสธชื่อโปรเจกต์** ใช้ชื่อ directory ที่ขึ้นต้นด้วยตัวอักษรหรือ
  ตัวเลข และมีเฉพาะตัวอักษร ตัวเลข ช่องว่าง จุด hyphen และ underscore
- **`render --check` รายงาน drift** รัน `npm run sras -- render` ตรวจหน้าที่
  เปลี่ยน แล้ว commit ทั้ง source และ output
- **`guard` พบชื่อส่วนตัว** ใส่ชื่อใน private override แล้วชี้
  `SRAS_DENYLIST_PATH` ไปที่ไฟล์นั้น ห้าม commit override
- **`project validate` บอก lockfile stale** ตรวจว่า selection เปลี่ยนหรือไม่
  แล้วรัน `project refresh <dir>` อย่าแก้ lockfile ด้วยมือ

## ขั้นต่อไป

- อ่าน [ความพร้อมของ template](governance/template-readiness.md)
- มอบหมายบทบาทตาม [owner map](templates/owner-map.md)
- อ่าน [คู่มือ template โปรเจกต์](templates/project.md)
- ดู [reference index](reference/index.md)
- สำหรับงานภาครัฐ อ่าน [overlay ภาครัฐ](sectors/public-sector.md)
- อ่าน `SCOPE.md`, `GOVERNANCE.md` และ `CONTRIBUTING.md` ก่อนประเมินจริง
