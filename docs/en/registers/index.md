---
translation_status: complete
machine_translated: false
---

# Registers

A register is a factual index of a law, regulation, standard, or guidance. It
records an official source, a verification date, a review due date, and a
review status. It is not an overlay, not legal advice, and not a statement that
a product complies with the instrument.

## Thailand registers

| ID             | Instrument                                                                                        | Type       | Review status |
| -------------- | ------------------------------------------------------------------------------------------------- | ---------- | ------------- |
| `TH-BOT-001`   | Bank of Thailand Notification No. สกช. 5/2566 on IT Risk Management (2023)                        | Regulation | `unverified`  |
| `TH-BOT-002`   | Bank of Thailand Notification No. สนช. 1/2564 on IT Risk Management under the Payment Systems Act | Regulation | `unverified`  |
| `TH-CCA-001`   | Computer Crime Act B.E. 2550 (2007)                                                               | Law        | `unverified`  |
| `TH-CPA-001`   | Consumer Protection Act B.E. 2522 (1979)                                                          | Law        | `unverified`  |
| `TH-CYBER-001` | Cybersecurity Act B.E. 2562 (2019)                                                                | Law        | `unverified`  |
| `TH-DGA-001`   | Digital Government Administration and Services Act B.E. 2562 (2019)                               | Law        | `unverified`  |
| `TH-DPS-001`   | Royal Decree on Digital Platform Service Businesses B.E. 2565 (2022)                              | Regulation | `unverified`  |
| `TH-ETA-001`   | Electronic Transactions Act B.E. 2544 (2001)                                                      | Law        | `unverified`  |
| `TH-PAY-001`   | Payment Systems Act B.E. 2560 (2017)                                                              | Law        | `unverified`  |
| `TH-PDPA-001`  | Personal Data Protection Act B.E. 2562 (2019)                                                     | Law        | `unverified`  |
| `TH-PROC-001`  | Public Procurement Act B.E. 2560 (2017)                                                           | Law        | `unverified`  |
| `TH-TECH-001`  | Emergency Decree on Measures to Prevent and Suppress Technology Crimes B.E. 2566 (2023)           | Regulation | `unverified`  |

Each generated reference page carries the official source, the
`last_verified` date, the review due date, and the scope the entry covers:

- [TH-BOT-001](../reference/registers/TH-BOT-001.md)
- [TH-BOT-002](../reference/registers/TH-BOT-002.md)
- [TH-CCA-001](../reference/registers/TH-CCA-001.md)
- [TH-CPA-001](../reference/registers/TH-CPA-001.md)
- [TH-CYBER-001](../reference/registers/TH-CYBER-001.md)
- [TH-DGA-001](../reference/registers/TH-DGA-001.md)
- [TH-DPS-001](../reference/registers/TH-DPS-001.md)
- [TH-ETA-001](../reference/registers/TH-ETA-001.md)
- [TH-PAY-001](../reference/registers/TH-PAY-001.md)
- [TH-PDPA-001](../reference/registers/TH-PDPA-001.md)
- [TH-PROC-001](../reference/registers/TH-PROC-001.md)
- [TH-TECH-001](../reference/registers/TH-TECH-001.md)

## ASEAN registers

| ID              | Instrument                                                         | Jurisdiction | Type       | Review status |
| --------------- | ------------------------------------------------------------------ | ------------ | ---------- | ------------- |
| `ASEAN-MCC-001` | ASEAN Model Contractual Clauses for Cross Border Data Flows (2021) | ASEAN        | Framework  | `unverified`  |
| `ID-PDP-001`    | Law No. 27 of 2022 on Personal Data Protection                     | Indonesia    | Law        | `unverified`  |
| `MY-PDPA-001`   | Personal Data Protection Act 2010 (Act 709)                        | Malaysia     | Law        | `unverified`  |
| `PH-DPA-001`    | Republic Act No. 10173 (Data Privacy Act of 2012)                  | Philippines  | Law        | `unverified`  |
| `SG-PDPA-001`   | Personal Data Protection Act 2012                                  | Singapore    | Law        | `unverified`  |
| `VN-PDPD-001`   | Decree No. 13/2023/ND-CP on Personal Data Protection               | Viet Nam     | Regulation | `unverified`  |

Each ASEAN entry links to its official source and its generated reference page:

- [ASEAN-MCC-001](../reference/registers/ASEAN-MCC-001.md)
- [ID-PDP-001](../reference/registers/ID-PDP-001.md)
- [MY-PDPA-001](../reference/registers/MY-PDPA-001.md)
- [PH-DPA-001](../reference/registers/PH-DPA-001.md)
- [SG-PDPA-001](../reference/registers/SG-PDPA-001.md)
- [VN-PDPD-001](../reference/registers/VN-PDPD-001.md)

`VN-PDPD-001` is recorded as `repealed`: the decree ceased to have effect on
1 January 2026 and was replaced by the Law on Personal Data Protection No.
91/2025/QH15 and Decree No. 356/2025/ND-CP. The entry stays for reference and
is not presented as current law.

ASEAN entries are register-only. They are not an ASEAN overlay, and they do not
create region-level requirements. The [ASEAN comparison and cross-border
page](asean-comparison.md) summarises the six entries without ranking them.

## EU registers

| ID            | Instrument                                                    | Type       | Review status |
| ------------- | ------------------------------------------------------------- | ---------- | ------------- |
| `EU-GDPR-001` | Regulation (EU) 2016/679 (General Data Protection Regulation) | Regulation | `unverified`  |

Each EU entry links to its official source and its generated reference page:

- [EU-GDPR-001](../reference/registers/EU-GDPR-001.md)

EU entries are register-only. They are not an EU overlay, and they do not create
region-level requirements.

## Review limitation

Every register entry in this release is `unverified`. A named qualified
reviewer has not signed off. The entries are useful for finding the official
source and structuring an assessment; they are not a legal conclusion.

`review_status: reviewed` requires a named reviewer, a review date, and a
scope. Legal content stays unverified until a qualified legal reviewer signs
off. If a reviewer is not available, the limitation stays visible and the entry
is not used as the basis of a public claim.

## Registers and overlays

A register records facts. An overlay adds requirements. The two are separate:

- A register entry does not add a requirement by itself.
- An overlay does not restate a law; it references the register entry.
- A product is not assessed as compliant with a law because a register entry
  exists.

## Other jurisdictions

Thailand and ASEAN have maintained registers in v0.7.0. EU register entries
are planned for v0.8.0. Every non-Thai entry remains register-only until a
qualified reviewer is named and the review is recorded.

## Related pages

- [Sectors](../sectors/index.md)
- [Modules and overlays](../concepts/modules-and-overlays.md)
- [Reference](../reference/index.md)
