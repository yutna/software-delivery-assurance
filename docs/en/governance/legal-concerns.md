---
translation_status: complete
machine_translated: false
---

# Legal and regulatory concerns

**Desk research:** 2026-10-28. **Prepared by:** the AI execution agent.
**Status:** not legal advice, not reviewed by a qualified Thai lawyer, and not
a determination that any source applies to your project.

The starter kit is a concern template. It collects the questions, the official
sources, and the points a project team must decide. It does not certify,
approve, or answer a legal question for a project. The project team decides
what applies to its scope, records the decision, and obtains qualified advice
when the risk or the law requires it.

The related issues are closed as "research note published". That closure is not
a legal sign-off and does not mean a source applies to your project.

## How to use this page

1. Find the concern that affects your project.
2. Read the source note and open the official source.
3. Record your own decision in the private project instance. Use the decision
   record template below.
4. If the project is regulated, public-facing, procurement-bound, or handles
   personal or sensitive data, obtain advice from a qualified Thai lawyer or
   the relevant regulator.
5. Do not copy a note into a public claim as if it were a legal opinion. The
   library does not know your project, your contracts, or your agency practice.

## Concerns

| Concern                            | Requirement  | Issue                                                                   |
| ---------------------------------- | ------------ | ----------------------------------------------------------------------- |
| Cloud and outsourcing approval     | `TH-FIN-003` | [#128](https://github.com/yutna/software-delivery-assurance/issues/128) |
| Transaction-record retention       | `TH-FIN-004` | [#129](https://github.com/yutna/software-delivery-assurance/issues/129) |
| Open-data licence terms            | `TH-PUB-005` | [#130](https://github.com/yutna/software-delivery-assurance/issues/130) |
| WCAG version and conformance level | `TH-PUB-003` | [#131](https://github.com/yutna/software-delivery-assurance/issues/131) |

## 1. Cloud and outsourcing approval (`TH-FIN-003`)

**Question.** For a material cloud or outsourcing arrangement, do the published
Bank of Thailand rules require prior notification or approval, and what facts
change the answer?

**What the sources say.**

- The Bank of Thailand notification **สกช. 5/2566** on IT risk management
  (16 October 2023, published 30 October 2023) requires commercial banks to
  notify the Bank of Thailand at least 15 days before a significant IT use or
  change, including a third-party service, connection, or access. Specialized
  financial institutions, finance companies, and credit foncier companies must
  seek prior approval for the same kind of significant change. The notification
  does not use the word "cloud" in that clause, but a cloud adoption can be a
  significant IT change.
  [BOT notice](https://www.bot.or.th/content/dam/bot/fipcs/documents/FOG/2566/ThaiPDF/25660202.pdf),
  [Royal Gazette](https://ratchakitcha.soc.go.th/documents/10342.pdf).
- The older Bank of Thailand notification **FPG. 19/2559** on IT outsourcing
  (28 December 2016) describes a 30-day notification or approval model for
  critical IT outsourcing and cloud arrangements. It distinguishes private
  cloud, public cloud, group and non-group providers, and critical and other IT
  outsourcing.
  [Unofficial English translation](https://www.bot.or.th/content/dam/bot/fipcs/documents/FPG/2560/EngPDF/25600035.pdf).
- The two sources use different structures and dates. This desk review does not
  determine which one currently applies to a specific institution, or how they
  interact after later amendments.

**What remains uncertain.**

- Whether the arrangement is a "significant IT use or change" for the
  institution.
- Whether the institution is a commercial bank, a specialized financial
  institution, a finance company, or another type.
- Whether the cloud model is private, public, or hybrid, and whether the
  provider is in the same group.
- The current effect of the older outsourcing notification after the 2023 IT
  risk notification.

**Questions for your adviser.**

- Which notification and clause apply to this institution and this arrangement?
- Is the arrangement a notification, an approval, or neither?
- What is the threshold, and how is it documented?
- How many days before go-live must the filing be made?
- What supporting risk assessment and board approval are required?

**Project decision record.** Record the institution type, cloud model,
criticality, filing route, date, and the advice received in the private
instance.

## 2. Transaction-record retention (`TH-FIN-004`)

**Question.** Which Thai instruments set minimum retention periods for
transaction records, what periods do they state, and does the answer differ by
service type?

**What the sources say.**

- The **Anti-Money Laundering Act B.E. 2542 (1999)**, section 22, requires a
  financial institution to retain customer identification records for five
  years from account closure or the end of the relationship, and transaction
  records and records of facts under section 21 for five years from the
  transaction or record date. Section 22/1 requires customer due diligence
  records to be kept for ten years.
  [Official Act](https://sed.amlo.go.th/uploads/tiny/Law%20and%20regulaiton/Act/AMLA%20Act.pdf).
- The Anti-Money Laundering Office publishes guidance that repeats the five-year
  and ten-year periods for reporting entities.
  [AMLO guidance](https://sed.amlo.go.th/content/detail/113).
- The Securities and Exchange Commission requires digital asset business
  operators to retain records for at least five years, with the first two years
  readily accessible for inspection. The same five-year minimum appears in SEC
  record-keeping material for securities business records.
  [SEC announcement](https://www.sec.or.th/EN/Pages/News_Detail.aspx?SECID=10957),
  [SEC notification](https://publish.sec.or.th/nrs/10275s.pdf).

**What remains uncertain.**

- Whether the service is a reporting entity under the Anti-Money Laundering
  Act, a securities business, a digital asset business, an insurer, or another
  regulated activity.
- Whether a sector-specific rule requires a longer period than the five-year
  minimum.
- When the retention clock starts for each record type.
- Whether accounting, tax, or other record-keeping rules add a separate
  requirement.

**Questions for your adviser.**

- Which instrument applies to this service and this record type?
- What is the minimum period, and when does it start?
- Is the record a transaction record, a customer identification record, or a
  due diligence record?
- Does a sector rule require a longer period or a specific access format?
- Where and how must the record be retained?

**Project decision record.** Record the service type, record type, instrument,
period, start date, storage location, and the advice received.

## 3. Open-data licence terms (`TH-PUB-005`)

**Question.** Which licence terms does the applicable Thai guidance accept for
open government data, and is a specific licence list published by an official
source?

**What the sources say.**

- The **DGA Open Government License** version 1.0 (10 June 2021) governs data
  published on the data.go.th platform. It grants a non-exclusive, free licence
  to use, copy, publish, distribute, and process the data, subject to lawful
  use and attribution to the source. It excludes prohibited data, official
  symbols, military insignia, and third-party intellectual property that DGA
  cannot license.
  [DGA Open Government License](https://data.go.th/en/pages/dga-open-government-license).
- The DGA open-data metadata guidance defines licence categories **G0–G5**:
  Open Data Common, Creative Commons Attribution, Attribution-NonCommercial,
  Attribution-ShareAlike, Attribution-NonCommercial-ShareAlike,
  Attribution-NoDerivs, Attribution-NonCommercial-NoDerivs, and other licences.
  The choice depends on the data classification, whether commercial use is
  allowed, whether derivatives are allowed, and whether attribution is required.
  [DGA licence guidance](https://gdhelppage.gdcatalog.go.th/p00_03_new7.html).
- The DGA Open Government Data Guideline version 2.0 (มรด. 8:2567) describes
  the metadata and publication standard for government datasets.
  [DGA standard](https://standard.dga.or.th/standard/).

**What remains uncertain.**

- Which licence the dataset owner has chosen, and whether the metadata records
  it accurately.
- Whether the dataset contains personal data, third-party intellectual
  property, or another prohibited element.
- Whether the project needs commercial use, derivatives, or redistribution,
  and whether the chosen licence permits that use.
- Whether a procurement contract or agency policy adds a licence condition.

**Questions for your adviser.**

- Is the dataset public data that can be released under an open licence?
- Which G0–G5 category matches the intended reuse?
- Does the licence permit the project's intended commercial or derivative use?
- What attribution text is required?
- Does the dataset contain third-party rights or personal data?

**Project decision record.** Record the dataset, classification, chosen
licence, attribution, permitted uses, source, and the advice received.

## 4. WCAG version and conformance level (`TH-PUB-003`)

**Question.** Which WCAG versions and conformance levels do the relevant Thai
government standards and guidance describe for public-facing services, and does
the answer differ by agency type?

**What the sources say.**

- The DGA **Government Website Standard version 3.0** (มสพร 11-2566) references
  WCAG. The published guideline discusses WCAG 2.1 and 2.2 and states that the
  requirements for government agencies do not specify one standard; it
  recommends WCAG 2.1 Level AA as the level that covers most cases.
  [DGA guideline](https://standard.dga.or.th/wp-content/uploads/2023/07/Final_PRD_0.1_DGA-6-4-256X_Gov.-Website-1.pdf).
- A DGA guidance article states that government agencies should aim for Level
  AA at minimum.
  [DGA article](https://standard.dga.or.th/article/5837/).
- The Thai Web Content Accessibility Guidelines **TWCAG 2025** are based on
  WCAG 2.2; TWCAG 2022 is based on WCAG 2.1. W3C publishes WCAG 2.2 as the
  current recommendation.
  [TWCAG 2025](https://www.dct.or.th/upload/downloads/1747741860AccessibilityGuideline2025V.3.1Final.pdf),
  [WCAG 2.2](https://www.w3.org/TR/WCAG22/),
  [Thai WCAG 2.2 translation](https://www.nectec.or.th/standard/WCAG/REC-WCAG22-20231005-TH/).

**What remains uncertain.**

- This desk review did not identify a single instrument in the sources reviewed
  that sets one binding version and level for every Thai public service.
- An agency policy, procurement contract, or regulator may require a specific
  version or level.
- The answer may differ for central agencies, local government, state
  enterprises, and services delivered by vendors.
- A project may choose a higher level than the guidance recommends, but it
  should record why.

**Questions for your adviser.**

- Does the agency have a policy, standard, or procurement clause that names a
  WCAG version and level?
- Which service journeys are in scope?
- Is Level AA sufficient, or does the service require AAA for some content?
- Which version will the contract and acceptance test use?
- Who records the agreed target and the test evidence?

**Project decision record.** Record the service scope, chosen WCAG version,
conformance level, basis, test method, owner, and review date.

## Project decision record template

Copy this block into the private project instance. Do not put real legal advice,
customer data, or confidential material in the public repository.

```text
Concern:
Project and scope:
Why this concern applies (or why not):
Source reviewed (title, issuer, date, URL):
Decision:
Advice obtained (name, role, organisation, date):
Residual risk and owner:
Review due:
```

## When to escalate

Obtain qualified advice before relying on a desk note when the project:

- is a financial institution, securities business, insurer, payment provider,
  or other regulated entity;
- needs a Bank of Thailand notification or approval;
- is a public-sector procurement or a public-facing service;
- handles personal, sensitive, financial, or cross-border data;
- will make a public compliance, accessibility, or open-data claim;
- has a contract, board approval, or regulator filing that depends on the
  answer.

## What this page is not

- Not legal advice.
- Not a legal opinion or a determination of applicability.
- Not a certification, approval, or compliance statement.
- Not a substitute for the official source, the project's contract, or the
  advice of a qualified Thai lawyer or regulator.

## Related pages

- [Template readiness](template-readiness.md)
- [Owner map](../templates/owner-map.md)
- [Registers](../registers/index.md)
- [Finance sector](../sectors/finance.md)
- [Public sector](../sectors/public-sector.md)
- [Pilot summary](../pilots/summary.md)
- [Confidence labels](confidence-labels.md)
