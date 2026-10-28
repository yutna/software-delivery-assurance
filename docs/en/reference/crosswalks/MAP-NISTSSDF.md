# MAP-NISTSSDF — SRAS Core to NIST SP 800-218 (SSDF) 1.1

- Version: `0.1.0`
- Source standard: NIST SP 800-218 (SSDF) 1.1
- Source URL: [https://csrc.nist.gov/pubs/sp/800/218/final](https://csrc.nist.gov/pubs/sp/800/218/final)
- Status: `draft`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `mappings/nist-ssdf.yaml`

## Description

Targeted informative crosswalk from SRAS requirements to the secure software development practices in NIST SP 800-218 (SSDF) 1.1. It covers the requirements that cite SSDF practices directly and the closely related governance, change, and vulnerability requirements. It is not an equivalence, a certification, or a compliance claim. Not covered by this crosswalk: PO.4 security-check criteria, PW.2 design review, PW.3 secure reuse criteria, PW.5 secure coding standards, PW.6 build configuration hardening, PW.9 default secure configuration, and RV.3 root-cause analysis.

**Thai:** crosswalk เชิงข้อมูลแบบเจาะจงจาก requirement ของ SRAS ไปยังแนวปฏิบัติ secure software development ใน NIST SP 800-218 (SSDF) 1.1 ครอบคลุม requirement ที่อ้างแนวปฏิบัติ SSDF โดยตรง และ requirement ด้าน governance, change และ vulnerability ที่เกี่ยวข้องอย่างใกล้ชิด ไม่ใช่การอ้างความเท่าเทียม การรับรอง หรือการอ้าง compliance สิ่งที่ยังไม่ครอบคลุมใน crosswalk นี้ คือ PO.4 เกณฑ์การตรวจ security, PW.2 การทบทวน design, PW.3 เกณฑ์การใช้ซอฟต์แวร์ซ้ำ, PW.5 มาตรฐาน secure coding, PW.6 การตั้งค่า build ให้ปลอดภัย, PW.9 default secure configuration และ RV.3 root-cause analysis

This crosswalk is informative. It is not an equivalence, a certification, or a compliance claim.

## Mappings

- `SRAS-AI-006` — `PS.3` (partial) — Prompts, models, and configuration are versioned; SP 800-218A adds model provenance and data lineage expectations.
- `SRAS-AI-007` — `PW.7, PW.8` (partial) — Controlled AI release and rollback cover review and testing; AI-specific evaluation is an SP 800-218A addition.
- `SRAS-CHG-001` — `PS.1` (supports) — Version control protects source and configuration from unauthorized change.
- `SRAS-CHG-002` — `PW.7` (supports) — Peer review is the SSDF code-review practice applied to every change.
- `SRAS-CHG-003` — `PS.2, PW.8, PO.3` (partial) — CI builds, tests, and scans with a supporting toolchain; artifact integrity verification and toolchain hardening remain environment-specific.
- `SRAS-CHG-004` — `PW.8` (supports) — Automated tests execute the product to confirm the expected behavior.
- `SRAS-CHG-005` — `PO.5` (supports) — Separate development, test, and production environments implement the SSDF environment practice.
- `SRAS-CHG-008` — `PS.3` (partial) — Versioned release evidence and limitations support archiving; archive integrity and retention are not specified.
- `SRAS-CHG-009` — `PW.6` (partial) — Versioned and reviewed configuration covers build inputs; compiler and build hardening are not specified.
- `SRAS-GOV-005` — `PO.2` (supports) — Assurance roles and decision rights cover the SSDF roles and responsibilities practice.
- `SRAS-SCM-002` — `PS.3` (supports) — An SBOM records release components for archiving and traceability.
- `SRAS-SCM-003` — `PS.2` (supports) — Trusted sources and integrity verification implement release integrity.
- `SRAS-SCM-005` — `PW.4` (partial) — Third-party components are tracked for license obligations; the secure acquisition review that PW.4 also expects is an SRAS addition to this requirement.
- `SRAS-SCM-010` — `RV.1` (partial) — Supplier incident monitoring covers the supply chain; SSDF RV.1 focuses on vulnerabilities in the organization's own products.
- `SRAS-SEC-007` — `PO.1` (supports) — Security requirements and threat models define the security expectations before build.
- `SRAS-SEC-007` — `PW.1` (supports) — Threat modeling is the SSDF risk-based security requirements practice.
- `SRAS-SEC-008` — `PW.7, PW.8` (supports) — Code review and automated security scans implement the review and test practices for every change.
- `SRAS-SEC-009` — `RV.1` (supports) — Vulnerability identification and remediation cover the SSDF vulnerability response practice.
- `SRAS-SEC-009` — `RV.2` (partial) — Prioritization and remediation targets cover assessment and treatment; root-cause analysis is RV.3 and is not covered.
- `SRAS-SEC-012` — `RV.2` (related) — Independent testing informs vulnerability assessment; the remediation targets themselves are specified by SRAS-SEC-009.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
