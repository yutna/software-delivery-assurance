# MAP-NISTCSF — SRAS Core to NIST CSF 2.0

- Version: `0.1.0`
- Source standard: NIST Cybersecurity Framework 2.0
- Source URL: [https://www.nist.gov/cyberframework](https://www.nist.gov/cyberframework)
- Status: `draft`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `mappings/nist-csf.yaml`

## Description

Informative crosswalk from SRAS Core requirements to NIST Cybersecurity Framework 2.0 functions and categories. It is not an equivalence or certification claim.

**Thai:** crosswalk เชิงข้อมูลจากข้อกำหนด SRAS Core ไปยังฟังก์ชันและหมวดของ NIST Cybersecurity Framework 2.0 ไม่ใช่การอ้างความเท่าเทียมหรือการรับรอง

This crosswalk is informative. It is not an equivalence, a certification, or a compliance claim.

## Mappings

- `SRAS-CHG-001` — `PR.PS-01` (supports) — Configuration management.
- `SRAS-CHG-002` — `PR.PS-06` (partial) — Secure software development practices support review; peer review is an SRAS addition.
- `SRAS-CHG-005` — `PR.PS-06` (partial) — Secure development practices support environment separation; the separation control is an SRAS addition.
- `SRAS-CHG-007` — `PR.PS-01` (partial) — Configuration management supports rollback; a tested rollback plan is an SRAS addition.
- `SRAS-GOV-001` — `GV.OC-01, GV.RR-01` (supports) — Organizational context and leadership accountability.
- `SRAS-GOV-002` — `GV.RM-01, GV.RM-02` (partial) — Risk management objectives and risk appetite support the register; owner and review dates are SRAS additions.
- `SRAS-GOV-003` — `GV.OV-01, GV.OV-02` (supports) — Risk management strategy outcomes and performance measurement.
- `SRAS-GOV-004` — `GV.PO-01` (supports) — Policy for managing cybersecurity risks.
- `SRAS-GOV-005` — `GV.RR-02` (supports) — Roles and responsibilities for cybersecurity risk management.
- `SRAS-GOV-008` — `GV.OV-03` (related) — Oversight supports evidence review; claim approval is an SRAS addition.
- `SRAS-INC-001` — `RS.MA-01, RS.MA-02` (supports) — Incident response plan and incident triage.
- `SRAS-INC-002` — `RS.MA-02, RS.MA-03` (supports) — Incident triage and categorization.
- `SRAS-INC-005` — `RC.RP-01` (supports) — Recovery plan execution.
- `SRAS-INC-006` — `RC.RP-01, RC.RP-02` (supports) — Recovery plan execution and restoration activities.
- `SRAS-OPS-001` — `DE.CM-01, DE.CM-03` (supports) — Network and computing resource monitoring.
- `SRAS-OPS-002` — `DE.AE-02, DE.AE-06` (supports) — Adverse event analysis and alerting.
- `SRAS-OPS-005` — `PR.DS-11` (supports) — Data backups.
- `SRAS-OPS-006` — `PR.DS-11` (partial) — Backups are covered; restore testing and recovery objectives are SRAS additions.
- `SRAS-PRV-001` — `ID.AM-05, PR.DS-01` (supports) — Data inventory and data-at-rest protection.
- `SRAS-PRV-004` — `GV.OC-03` (partial) — Legal and regulatory requirements are covered; lawful-basis recording is an SRAS addition.
- `SRAS-PRV-007` — `PR.DS-03, GV.OC-03` (partial) — Data transfer protection and legal requirements are covered; transfer mechanisms are jurisdiction-specific.
- `SRAS-PRV-009` — `GV.SC-05, GV.SC-07` (supports) — Supplier requirements and supplier risk monitoring.
- `SRAS-SCM-001` — `ID.AM-01, ID.AM-02` (supports) — Hardware and software asset inventories.
- `SRAS-SCM-002` — `ID.AM-02, GV.SC-04` (partial) — Software inventory and supplier requirements support component visibility; an SBOM is an SRAS addition.
- `SRAS-SCM-003` — `GV.SC-04, PR.PS-06` (partial) — Supplier requirements and secure development support trusted sources; integrity verification is an SRAS addition.
- `SRAS-SCM-004` — `GV.SC-01, GV.SC-02` (supports) — Supply chain risk management program and requirements.
- `SRAS-SCM-007` — `GV.SC-06` (supports) — Supplier and subprocessor chain visibility.
- `SRAS-SEC-001` — `PR.AA-01, PR.AA-03` (supports) — Identity management, authentication, and access control.
- `SRAS-SEC-002` — `PR.AA-05` (supports) — Least privilege and access permissions.
- `SRAS-SEC-003` — `PR.AA-05, PR.PS-01` (partial) — Access permissions and configuration management support secret handling; a dedicated secret store is an SRAS addition.
- `SRAS-SEC-004` — `PR.DS-01, PR.DS-02` (supports) — Data-at-rest and data-in-transit protection.
- `SRAS-SEC-006` — `PR.AA-04` (supports) — Access permissions are managed, reviewed, and revoked.
- `SRAS-SEC-009` — `ID.RA-01, PR.PS-02` (supports) — Vulnerability identification and remediation.
- `SRAS-SEC-010` — `DE.CM-01, DE.AE-02` (supports) — Continuous monitoring and adverse event analysis.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
