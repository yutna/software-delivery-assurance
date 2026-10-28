---
translation_status: partial
machine_translated: true
---

# ตรวจสอบอินสแตนซ์โปรเจกต์ส่วนตัวใน CI

อินสแตนซ์โปรเจกต์อยู่ใน repository ส่วนตัวแยกจาก library CLI ของ SRAS อยู่กับ
repository นี้ (`package.json` ตั้ง `"private": true`) งาน CI จึง checkout
library ที่ tag หรือ commit ที่ปักไว้ build แล้วรันการตรวจกับอินสแตนซ์
ห้าม checkout `main` สำหรับการประเมินจริง

## ก่อนเริ่ม

- Node.js 24 LTS และ npm 11 บน runner Ubuntu
- tag หรือ commit ของ library ที่ตรงกับ `sras_version` ใน `assurance.yaml`
- อินสแตนซ์โปรเจกต์อยู่ใน repository พร้อม lockfile ที่ commit ไว้
- ไม่มี secret หรือหลักฐานจริงในไฟล์ assessment หลักฐานอยู่ใน private store

## ตัวอย่าง GitHub Actions

เพิ่ม workflow นี้ใน repository ส่วนตัวของโปรเจกต์

```yaml
name: sras
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  validate:
    runs-on: ubuntu-latest
    env:
      SRAS_REF: v1.0.0
    steps:
      - name: Check out the project instance
        uses: actions/checkout@v7
        with:
          path: project
          persist-credentials: false
      - name: Check out the SRAS library at a pinned ref
        uses: actions/checkout@v7
        with:
          repository: yutna/software-delivery-assurance
          ref: ${{ env.SRAS_REF }}
          path: .sras
          persist-credentials: false
      - uses: actions/setup-node@v7
        with:
          node-version: 24.x
          cache: npm
          cache-dependency-path: .sras/package-lock.json
      - name: Build the library
        working-directory: .sras
        run: |
          npm ci
          npm run build
      - name: Validate the instance
        run: |
          mkdir -p sras-output
          node .sras/dist/cli.js project validate project | tee sras-output/validate.txt
      - name: Resolve coverage
        run: node .sras/dist/cli.js project resolve project | tee sras-output/resolve.txt
      - name: Upload the output
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: sras-output
          path: sras-output
          if-no-files-found: ignore
```

`project validate` exit 0 สำหรับ draft ที่โครงสร้างถูกต้อง และเตือนทาง stderr
ตราบใดที่ sign-off ยังเป็น `Not signed` ส่วน `project resolve` exit 1 เมื่อ gate
ที่ต้องประเมินยังขาด จึงใช้เป็น coverage gate ของ release ระหว่าง drafting
ถ้าความล้มเหลวของ coverage ไปบล็อกงานอื่น ให้รันเฉพาะ `project validate`
แต่อย่าปิด `project resolve` ใน release branch

## ปักหมุดเวอร์ชันของ library

`SRAS_REF` ต้องเป็น tag ของ release หรือ commit SHA เต็ม อ่าน version ของ
อินสแตนซ์แล้วใช้ tag ที่ตรงกัน

```bash
rg '^sras_version:' assurance.yaml
```

ณ วันที่เขียน `v1.0.0` เป็น tag ที่เผยแพร่แล้ว ให้เปลี่ยนเป็น release ที่ตรงกับ
อินสแตนซ์ `project refresh` เขียน version เดียวกันลงใน `assurance.lock.yaml`
lockfile จึงระบุ input ที่สร้างผลลัพธ์นั้น

## สิ่งที่ job นี้พิสูจน์

- อินสแตนซ์ parse ได้และตรงกับ lockfile
- requirement ที่เลือกทุกตัวรู้จักใน library version นี้
- ประเภทหลักฐานตรงกับสิ่งที่ requirement คาดหวัง
- claim และ risk อ้างถึง requirement ที่ประเมินแล้ว

job นี้ไม่ได้พิสูจน์ว่าหลักฐานเป็นจริง เป็นปัจจุบัน หรือเพียงพอ และไม่ได้ทบทวน
assessment แทนคุณ สิ่งเหล่านี้ยังเป็นการตัดสินใจของผู้ประเมิน

## แพลตฟอร์มที่รองรับ

- ทดสอบบน macOS ใน environment ของ maintainer และบน Ubuntu ใน GitHub Actions CI
- toolchain ที่รองรับคือ Node.js 24 LTS และ npm 11
- ยังไม่ได้ทดสอบ Windows ให้ใช้ WSL2 กับ environment Ubuntu เพราะคำสั่งและ
  ตัวอย่างที่ใช้ `~` อ้างถึง POSIX shell
- CLI อ่านและเขียน YAML แบบ UTF-8 ไม่ได้อ้างว่ารองรับ path แบบ Windows โดยตรง

## หน้าที่เกี่ยวข้อง

- [คู่มือ template โปรเจกต์](project.md)
- [อัปเกรดอินสแตนซ์ 1.x](upgrade-1x.md)
- [ตัวอย่าง end-to-end](e2e-walkthrough.md)
- [เริ่มต้นอย่างรวดเร็ว](../quick-start.md)
