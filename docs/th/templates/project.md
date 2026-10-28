---
translation_status: partial
machine_translated: true
---

<!-- markdownlint-disable MD060: Prettier wraps Thai tables by code point; MD060 expects display width. -->

# Template โปรเจกต์

`templates/project/` เป็นจุดเริ่มต้นที่คัดลอกได้สำหรับ SRAS project instance
แบบส่วนตัว คำสั่ง `npm run sras -- init <dir> --profile lite|full` จะคัดลอก
template แทน placeholder ใช้ profile ที่เลือก คำนวณ lockfile ตรวจสอบผลลัพธ์
และเขียนไฟล์ให้

template เป็นข้อมูล synthetic ไม่มีชื่อลูกค้า หลักฐานจริง production
identifier หรือ secret

> หน้านี้เป็นฉบับภาษาไทยที่แปลโดยเครื่องและปรับถ้อยคำ ยังไม่ผ่านการตรวจทาน
> โดยมนุษย์ จึงยังคง `translation_status: partial` และ `machine_translated: true`

## ไฟล์ใน template

| ไฟล์                  | หน้าที่                                                     |
| --------------------- | ----------------------------------------------------------- |
| `assurance.yaml`      | ข้อมูลโปรเจกต์และ profile, tier, modules, overlays ที่เลือก |
| `assessment.yaml`     | การประเมิน ณ เวลาหนึ่งของ requirement ที่เลือก              |
| `evidence-index.yaml` | ดัชนีหลักฐานที่เก็บไว้นอก project instance                  |
| `claims.yaml`         | ถ้อยคำที่อนุญาตและห้ามใช้สำหรับ claim ของโปรเจกต์           |
| `risk-register.yaml`  | ช่องว่างและความเสี่ยงพร้อม owner, due date และการเปิดเผย    |
| `assurance.lock.yaml` | standard input และ checksum ที่ pin เพื่อ reproducibility   |

`README.md` ของ instance ถูกสร้างโดย renderer ไม่ได้คัดลอกจาก template

## Placeholder

`init` แทนค่าเหล่านี้ template ยังคง schema-valid เพื่อให้ตรวจสอบได้ก่อนคัดลอก

| Placeholder               | แทนด้วย                                |
| ------------------------- | -------------------------------------- |
| `__PROJECT_NAME__`        | ชื่อ directory ของ target              |
| `__PROJECT_DESCRIPTION__` | คำอธิบายที่สร้างขึ้น                   |
| `__PROJECT_OWNER__`       | `Project owner`                        |
| `__ASSESSOR__`            | `Project team`                         |
| `__SIGNOFF_NAME__`        | `Not signed`                           |
| `__SIGNOFF_ROLE__`        | `Not signed`                           |
| `0.0.0`                   | SRAS version ปัจจุบัน                  |
| `1970-01-01`              | วันที่ปัจจุบัน                         |
| `full`                    | profile ที่เลือก                       |
| `2`                       | Tier 2                                 |
| `modules: []`             | ไม่เลือก module                        |
| `overlays: []`            | ไม่เลือก overlay                       |
| `sha256:000...`           | checksum ที่คำนวณจาก input             |
| ค่า SHA-256 ศูนย์         | SHA-256 ของไฟล์ input ที่ resolve แล้ว |

## `assurance.yaml`

project manifest เก็บข้อมูลโปรเจกต์และ SRAS selection

```yaml
project:
  name: Example project
  description: SRAS project instance for Example project.
  owner: Project owner
  confidentiality: internal
sras_version: 1.0.0
profile: lite
tier: 2
modules: []
overlays: []
created_at: "2026-10-27"
updated_at: "2026-10-27"
```

`confidentiality` เป็น `public`, `internal`, `confidential`, `restricted` หรือ
`synthetic` ใช้ `synthetic` เฉพาะตัวอย่างสาธารณะ

ชื่อโปรเจกต์เป็นป้ายภายใน ห้ามใส่ชื่อลูกค้า ชื่อระบบจริง hostname หรือ
production identifier ใน repository สาธารณะ

## `assessment.yaml`

assessment record ซ้ำข้อมูลโปรเจกต์และ selection แล้วเพิ่ม scope, assessor,
requirement ที่ประเมิน, gate summary, readiness summary และ sign-off

```yaml
scope:
  systems: [example-service]
  data: [synthetic-records]
  users: [example-team]
  jurisdictions: [TH]
  public_sector: null
requirements:
  - id: SRAS-GOV-001
    status: implemented
    maturity: null
    evidence_refs: [EV-DEMO-001]
    notes: Scope and ownership record approved.
    gap_owner: null
    due_date: null
gates:
  pass: 1
  fail: 0
summary:
  counts:
    verified: 0
    implemented: 1
    partial: 0
    gap: 0
    not_assessed: 0
    not_applicable: 0
  index: null
```

สถานะคือ `not_assessed`, `gap`, `partial`, `implemented`, `verified` และ
`not_applicable` จำนวนใน counts ต้องตรงกับรายการ requirement

| สถานะ            | ความหมายใน template นี้                                            |
| ---------------- | ------------------------------------------------------------------ |
| `not_assessed`   | ยังไม่มีการบันทึกการตัดสินใจ ข้อกำหนดยังเปิดอยู่                   |
| `not_applicable` | ข้อกำหนดไม่ใช้กับ scope ที่บันทึกไว้ ให้บันทึกเหตุผลใน `notes`     |
| `gap`            | ข้อกำหนดใช้และยังไม่ผ่าน ให้บันทึก remediation, owner และ due date |
| `partial`        | ผ่านบางส่วน ให้บันทึกส่วนที่ยังไม่ผ่าน                             |
| `implemented`    | นำมาตรการไปใช้แล้ว แต่ยังไม่ได้ตรวจหลักฐานปัจจุบันครบทุกประเภท     |
| `verified`       | หลักฐานปัจจุบันครบทุกประเภทที่คาดหวังและสนับสนุนข้อกำหนดนี้        |

เฉพาะ `verified` เท่านั้นที่มีกฎบังคับเรื่องประเภทหลักฐาน สถานะอื่นเป็นแนวปฏิบัติใน
การประเมิน ให้บันทึกเหตุผลใน `notes` เพื่อให้ผู้อ่านคนถัดไปเห็น

`init` เขียน `signoff.name` และ `signoff.role` เป็น `Not signed` พร้อมวันที่สร้าง
เพราะ schema กำหนดให้ต้องมีออบเจกต์ sign-off ไฟล์ที่สร้างจึงยัง valid แต่ sentinel นี้
ไม่ใช่การอนุมัติ `project validate` จะเตือนแบบไม่ทำให้ validation fail ตราบใดที่ฟิลด์
ใดฟิลด์หนึ่งยังเป็น `Not signed` และยัง exit 0 เพื่อให้ draft ยังใช้งานได้ ให้เปลี่ยน
ทั้งสองฟิลด์และวันที่ (เมื่อวันอนุมัติจริงต่างจากวันที่สร้าง) เป็นการตัดสินใจของมนุษย์
ที่ระบุชื่อได้ก่อนใช้อินสแตนซ์เพื่อการตัดสินใจส่งมอบใด ๆ `project validate` ยังตรวจ
โครงสร้าง ไม่ได้ตรวจว่าใครลงนาม

- `full` ต้องมี `maturity` ทุก requirement และ `summary.index` เป็นตัวเลข
- `lite` ต้องมี `maturity: null` และ `summary.index: null`

### `scope.public_sector`

ฟิลด์นี้เป็นฟิลด์เสริม ค่าเป็น `null` หรือ object ที่มีทั้ง
`contracting_authority` และ `contract_reference` ต้องตั้งค่าเมื่อ instance
เลือก `TH-PUB` และประเมิน `TH-PUB-001`; validation จะรายงานค่าที่หายในกรณีนั้น
ตัวอย่างสาธารณะต้องใช้หน่วยงาน synthetic เท่านั้น ห้ามใส่ชื่อหน่วยงานจริง

```yaml
scope:
  public_sector:
    contracting_authority: Synthetic public authority
    contract_reference: SYNTH-CONTRACT-001
```

### Migration note: `scope.public_sector`

ฟิลด์นี้เพิ่มแบบเสริมและไม่บังคับ instance เดิมยังใช้ได้: ถ้าไม่มี
`public_sector` จะอ่านเป็น `null` ไม่ต้องเปลี่ยน lockfile เพราะ assessment
ไม่ใช่ lock input

การย้าย public sector instance:

1. เพิ่ม `scope.public_sector` พร้อมทั้งสองฟิลด์ใน `assessment.yaml`
2. ใช้หน่วยงานที่ว่าจ้างและ reference ของสัญญาภายใน ห้ามใส่ชื่อหน่วยงานจริงใน
   repository สาธารณะ
3. รัน `npm run sras -- project validate <dir>`

instance ที่เลือก `TH-PUB` ประเมิน `TH-PUB-001` และปล่อยฟิลด์เป็น `null` จะทำให้
validation ไม่ผ่านพร้อม issue `scope/public_sector`

## `evidence-index.yaml`

หลักฐานเก็บใน private store ดัชนีบันทึกเฉพาะ reference, owner, วันที่,
freshness, redaction และ checksum ที่ไม่บังคับ

```yaml
entries:
  - id: EV-DEMO-001
    requirement_ids: [SRAS-GOV-001]
    type: document
    description: Approved scope and ownership record.
    location: evidence/scope-record.md
    owner: Project owner
    collected_at: "2026-10-27"
    expires_at: "2027-10-27"
    freshness_status: current
    redaction: full
    hash: null
    access: restricted
    notes: The record is held in the private evidence store.
```

- `location` ต้องเป็น private reference ห้ามเป็น public URL
- `hash` เป็น `null` หรือ digest ที่ขึ้นต้นด้วย `sha256:`
- `freshness_status: current` ต้องไม่ขัดกับ `expires_at`
- requirement ที่เป็น `verified` ต้องมีหลักฐานครบทุกประเภทที่ข้อกำหนดคาดหวัง
  `project validate` จะรายงานประเภทที่ขาดและประเภทที่พบ ประเภทอื่นใช้แทนกัน
  ไม่ได้ การตรวจนี้ดูประเภท ไม่ได้ดูคุณภาพของหลักฐาน และ freshness เป็นกฎแยก
- หลักฐานจริงและ customer data อยู่นอก repository นี้เสมอ

## `claims.yaml`

claim ที่ไม่มีหลักฐานที่ยังใช้ได้คือ `not_claimed` ไม่ใช่ "น่าจะจริง"
claim ที่มีหลักฐานบางส่วนเป็น `partial` และต้องระบุข้อจำกัด

```yaml
claims:
  - id: CLM-DEMO-001
    claim: The project records an approved scope and ownership document.
    evidence_ids: [EV-DEMO-001]
    status: verified
    allowed_wording: The project has a current scope and ownership record.
    prohibited_wording: Any statement that a real product is certified or compliant.
    owner: Project owner
    approved_by: Project reviewer
    approved_at: "2026-10-27"
    expires_at: "2027-10-27"
    notes: The claim is limited to the recorded evidence.
```

claim ที่เป็น `verified` หรือ `partial` ต้องมี evidence ID อย่างน้อยหนึ่งรายการ
มีผู้อนุมัติ วันอนุมัติ และวันหมดอายุ และหลักฐานต้องยังใช้ได้

## `risk-register.yaml`

ช่องว่างหรือความเสี่ยงต้องมี owner, severity, remediation, due date และการ
ตัดสินใจเรื่องการเปิดเผยต่อลูกค้าอย่างชัดเจน

```yaml
risks:
  - id: RSK-DEMO-001
    requirement_ids: [SRAS-GOV-001]
    description: The ownership record needs a scheduled review.
    severity: medium
    likelihood: low
    impact: medium
    remediation: Schedule the review and record the outcome.
    owner: Project owner
    due_date: "2027-04-27"
    status: open
    acceptance_id: null
    customer_disclosure: yes
    notes: The review is part of the annual assurance cycle.
```

risk ที่เป็น `accepted` ต้องมี `acceptance_id` ส่วนความเสี่ยงที่ปิดแล้วยังเก็บ
ประวัติ

## `assurance.lock.yaml`

lockfile pin standard input ที่ resolve แล้วและ checksum ไว้ ห้ามแก้ด้วยมือ
เมื่อเปลี่ยน selection หรืออัปเดตคลัง ให้ refresh จาก directory ของโปรเจกต์

```bash
npm run sras -- project refresh ~/sras-demo
```

`project validate ~/sras-demo` ตรวจ instance โดยไม่เขียน รายงาน lockfile ที่ล้า
ไฟล์โปรเจกต์ที่หาย selection ที่มาตรฐานไม่รู้จัก และกฎโปรเจกต์ข้ออื่นที่ล้มเหลว

`project resolve ~/sras-demo` แสดงชุด requirement ที่ resolve ได้และทุก gate
ที่ยังไม่ถูกประเมิน เป็นคำสั่งอ่านอย่างเดียว และออกด้วย exit code 1 ตราบใดที่
gate ยังต้องประเมินหรือต้องตัดสิน `not_applicable` อย่างเป็นลายลักษณ์อักษร

```yaml
lockfile_version: 1
sras:
  version: 1.0.0
  checksum: sha256:...
modules: []
overlays: []
inputs:
  - path: core/domains/governance.yaml
    sha256: ...
  - path: core/profiles/lite.yaml
    sha256: ...
  - path: core/sras.yaml
    sha256: ...
```

checksum คือ SHA-256 ของ canonical JSON array ของ `{ path, sha256 }` เรียงตาม
path รูปแบบ canonical ไม่มี whitespace ไม่มี timestamp ไม่มี generator และไม่มี
ข้อมูล environment input เดียวกันให้ checksum เดียวกันทุกเครื่อง

## กฎความปลอดภัย

- เก็บหลักฐานจริงและ customer data ไว้นอก repository นี้
- ห้ามใส่ชื่อลูกค้าจริง production hostname private address หรือ secret ใน
  project instance สาธารณะ
- ทำเครื่องหมายตัวอย่างสาธารณะด้วย `confidentiality: synthetic`
- ห้าม waive gate requirement และ overlay ไม่สามารถ waive gate ได้
- ห้ามกล่าวอ้าง certification, approval หรือ compliance โดยไม่มีหลักฐานที่ระบุ
  ชื่อและผู้ตรวจที่มีคุณสมบัติ
- AI agent เตรียมไฟล์และรันการตรวจได้ แต่ลงนาม ยอมรับความเสี่ยง หรืออนุมัติ
  การแปลแทนมนุษย์ไม่ได้

## หน้าที่เกี่ยวข้อง

- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
- [Owner map](owner-map.md)
- [ความพร้อมของ template](../governance/template-readiness.md)
- [Reference index](../reference/index.md)
- `SCOPE.md`, `GOVERNANCE.md` และ `CONTRIBUTING.md` ใน repository root
