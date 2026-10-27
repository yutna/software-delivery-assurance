---
translation_status: partial
machine_translated: true
---

# Project template

`templates/project/` เป็นจุดเริ่มต้นที่คัดลอกได้สำหรับ SRAS project instance แบบส่วนตัว คำสั่ง `npm run sras -- init <dir> --profile lite|full` จะคัดลอก template แทน placeholder ใช้ profile ที่เลือก คำนวณ lockfile ตรวจสอบผลลัพธ์ และเขียนไฟล์

template เป็น synthetic ไม่มีชื่อลูกค้า evidence จริง production identifier หรือ secret

## ไฟล์

- `assurance.yaml` — ข้อมูลโปรเจกต์และ profile, tier, modules, overlays ที่เลือก
- `assessment.yaml` — การประเมิน ณ เวลาหนึ่งของ requirement ที่เลือก
- `evidence-index.yaml` — ดัชนี evidence ที่เก็บไว้นอก project instance
- `claims.yaml` — ถ้อยคำที่อนุญาตและห้ามใช้สำหรับ claim ของโปรเจกต์
- `risk-register.yaml` — gap และความเสี่ยงพร้อม owner, due date และการเปิดเผยต่อลูกค้า
- `assurance.lock.yaml` — pin standard input และ checksum เพื่อ reproducibility

## Placeholder

`init` แทนค่าเหล่านี้ template ยังคง schema-valid เพื่อให้ตรวจสอบได้ก่อนคัดลอก

- `__PROJECT_NAME__` — ชื่อ directory ของ target
- `__PROJECT_DESCRIPTION__` — คำอธิบายที่สร้างขึ้น
- `__PROJECT_OWNER__` — `Project owner`
- `__ASSESSOR__` — `Project team`
- `__SIGNOFF_NAME__` — `Project owner`
- `__SIGNOFF_ROLE__` — `Project owner`
- `0.0.0` — SRAS version ปัจจุบัน
- `1970-01-01` — วันที่ปัจจุบัน
- `full` — profile ที่เลือก
- `2` — Tier 2
- `modules: []` — ไม่เลือก module
- `overlays: []` — ไม่เลือก overlay
- `sha256:000...` — checksum ที่คำนวณจาก input
- ค่า SHA-256 ศูนย์ — SHA-256 ของไฟล์ input ที่ resolve แล้ว

`README.md` ที่สร้างขึ้นมาจาก renderer ไม่ได้คัดลอกจาก template

## `assurance.yaml`

project manifest เก็บข้อมูลโปรเจกต์และ SRAS selection

```yaml
project:
  name: Example project
  description: SRAS project instance for Example project.
  owner: Project owner
  confidentiality: internal
sras_version: 0.7.0
profile: lite
tier: 2
modules: []
overlays: []
created_at: "2026-10-27"
updated_at: "2026-10-27"
```

`confidentiality` เป็น `public`, `internal`, `confidential`, `restricted` หรือ `synthetic` ใช้ `synthetic` เฉพาะตัวอย่างสาธารณะ

## `assessment.yaml`

assessment record ซ้ำข้อมูลโปรเจกต์และ selection แล้วเพิ่ม scope, assessor, requirement ที่ประเมิน, gate summary, readiness summary และ sign-off

```yaml
scope:
  systems: [example-service]
  data: [synthetic-records]
  users: [example-team]
  jurisdictions: [TH]
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

สถานะคือ `not_assessed`, `gap`, `partial`, `implemented`, `verified` และ `not_applicable` จำนวนใน counts ต้องตรงกับรายการ requirement

`full` ต้องมี `maturity` ทุก requirement และ `summary.index` เป็นตัวเลข
`lite` ต้องมี `maturity: null` และ `summary.index: null`

## `evidence-index.yaml`

evidence เก็บใน private store ดัชนีบันทึกเฉพาะ reference, owner, วันที่, freshness, redaction และ checksum ที่ไม่บังคับ

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

`location` ต้องเป็น private reference ห้ามเป็น public URL
`hash` เป็น `null` หรือ digest `sha256:`

## `claims.yaml`

claim ที่ไม่มี evidence ที่ยัง current คือ `not_claimed` ไม่ใช่ “น่าจะจริง”
claim ที่มี evidence บางส่วนเป็น `partial` และต้องระบุข้อจำกัด

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

claim ที่เป็น `verified` หรือ `partial` ต้องมี evidence ID อย่างน้อยหนึ่งรายการ มีผู้อนุมัติ วันอนุมัติ และวันหมดอายุ และ evidence ต้องยัง current

## `risk-register.yaml`

gap หรือความเสี่ยงต้องมี owner, severity, remediation, due date และการตัดสินใจเรื่องการเปิดเผยต่อลูกค้าอย่างชัดเจน

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

risk ที่เป็น `accepted` ต้องมี `acceptance_id`

## `assurance.lock.yaml`

lockfile pin standard input ที่ resolve แล้วและ checksum ห้ามแก้ด้วยมือ ให้สร้าง instance ใหม่หรือ refresh จาก standard input ที่เลือก

```yaml
lockfile_version: 1
sras:
  version: 0.7.0
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

checksum คือ SHA-256 ของ canonical JSON array ของ `{ path, sha256 }` เรียงตาม path รูปแบบ canonical ไม่มี whitespace ไม่มี timestamp ไม่มี generator และไม่มีข้อมูล environment input เดียวกันให้ checksum เดียวกันทุกเครื่อง

## กฎความปลอดภัย

- เก็บ evidence จริงและ customer data ไว้นอก repository นี้
- ห้ามใส่ชื่อลูกค้าจริง production hostname private address หรือ secret ใน project instance สาธารณะ
- ทำเครื่องหมายตัวอย่างสาธารณะด้วย `confidentiality: synthetic`
- ห้าม waive gate requirement และ overlay ไม่สามารถ waive gate ได้
- ห้ามกล่าวอ้าง certification, approval หรือ compliance โดยไม่มี evidence ที่ระบุชื่อและผู้ตรวจที่มีคุณสมบัติ

## เนื้อหาที่เกี่ยวข้อง

- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
- [Reference index](../../en/reference/index.md)
- `SCOPE.md`, `GOVERNANCE.md` และ `CONTRIBUTING.md` ใน repository root
