---
translation_status: complete
machine_translated: false
---

# Overview

The Software Delivery Assurance Starter Kit is an open, evidence-based way to
set up assurance for a software project. It is built for future projects,
especially Thai public-sector delivery, and it includes the SRAS reference
requirements, Thailand sector overlays, regulatory registers, project templates,
and TypeScript tools that validate, render, and guard the content.

This site documents SRAS 1.0.0. The v1.0.0 template release positions the
repository as a concern template. It does not claim a standard status,
certification, or external review.

## How it is used

| Part                | What it does                                                                                                                                         | What it does not do                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **This repository** | Collects concerns, questions, evidence expectations, and synthetic examples for a project team to consider.                                          | It does not decide that a concern applies, prescribe an implementation, or produce a formal assurance record. |
| **Your project**    | Selects the concerns that fit its context, decides how to implement them, writes its own evidence and formal documents, and obtains its own reviews. | It does not inherit a certification, a standard status, or an approval from this repository.                  |

The library is a concern template. A project that needs a formal review, a human
Thai review, a legal opinion, or a certification runs that work in its own
context and keeps the record there. Read
[template readiness](governance/template-readiness.md) before relying on the kit
for a real delivery decision.

## The four questions

Every part of the kit exists to answer one of four questions:

1. **What must be true before software is delivered?**
   The SRAS Core, modules, and overlays state testable requirements.
2. **What evidence proves it?**
   Each requirement names evidence types and a maximum age.
3. **What may we claim, and what may we not claim?**
   Claims are tied to evidence, with allowed and prohibited wording.
4. **What is the gap and the remediation plan?**
   The assessment and risk register record gaps, owners, and due dates.

## Layers

The content is layered. Each layer adds specificity; none replaces the layer
below it.

```text
Regulatory registers   facts and official sources
        |
Sector overlays        jurisdiction and industry deltas
        |
Technical modules      product characteristics such as AI or cloud
        |
SRAS Core              the baseline every product is assessed against
        |
Project instance       scope, assessment, evidence, claims, risk
```

The public repository owns the reference side of the model. A private project
instance owns the assessment: its scope, filled assessment, evidence index,
claims, risk register, and sign-off. Real evidence and customer data never
belong in this repository.

## What is in this release

| Content              | Count | Location               |
| -------------------- | ----: | ---------------------- |
| Core domains         |     7 | `core/domains/`        |
| Core requirements    |    70 | `core/domains/`        |
| Technical modules    |     5 | `modules/`             |
| Module requirements  |    52 | `modules/`             |
| Sector overlays      |     4 | `overlays/industries/` |
| Overlay requirements |    45 | `overlays/industries/` |
| Thailand registers   |    12 | `registers/th/`        |
| Crosswalks           |     7 | `mappings/`            |
| Profiles             |     2 | `core/profiles/`       |
| Project template     |     1 | `templates/project/`   |
| Synthetic examples   |     5 | `examples/`            |

The machine-readable contracts live in `schemas/` as JSON Schema 2020-12. The
TypeScript tools live in `src/sras/` and expose the `sras` CLI.

## What the library is not

- Not a certification, accreditation, audit attestation, or regulatory approval.
- Not legal advice or a definitive statement of legal compliance.
- Not a published standard with external sign-off.
- Not a customer-specific assessment, evidence pack, contract, or legal
  opinion.
- Not a hosted product, dashboard, or multi-tenant platform.
- Not a replacement for an organisation's own security, privacy, or quality
  programme.

The binding boundary is [SCOPE.md](https://github.com/yutna/software-delivery-assurance/blob/main/SCOPE.md).
The repository also publishes
[DISCLAIMER.md](https://github.com/yutna/software-delivery-assurance/blob/main/DISCLAIMER.md).

## Supported sectors and markets

The supported sectors are finance, e-commerce, logistics, and public sector.
Public sector is the primary adoption path for Thai government teams and their
vendors.

Thailand has full sector overlays and a maintained regulatory register. ASEAN
has six [register-only entries](registers/index.md) and a
[comparison page](registers/asean-comparison.md); the EU has nine register-only
entries and its own [comparison page](registers/eu-comparison.md). They are
register-only references, not compliance overlays.

## Review and translation status

Content is marked `draft`, `unverified`, or `reviewed`. `reviewed` requires a
named reviewer, a review date, and a scope. Legal content stays `unverified`
until a qualified legal reviewer signs off. The SRAS content is
draft or unverified; no external reviewer has signed it off.

English is canonical for identifiers, schema keys, and file names. Thai is a
first-class content language. Machine-assisted Thai pages are marked
`translation_status: partial` and `machine_translated: true` until a human
reviewer confirms them.

The docs-only [confidence labels](governance/confidence-labels.md) explain how
to read a claim such as "checked", "documented", "provisional", or "planned".
They are not a certification and not a schema field.

Legal and regulatory concerns are collected in
[legal concerns](governance/legal-concerns.md). That page is desk research with
official sources, not a legal opinion for any project.

## Who it is for

Thai government digital teams, state enterprises, vendors delivering public
services, product owners, engineering leads, security and privacy teams,
operations teams, assessors, and bid teams that need a reusable, evidence-based
way to discuss software readiness without inventing a new checklist for every
customer.

## Next steps

- Start with [template readiness](governance/template-readiness.md).
- Follow the [quick start](quick-start.md).
- Assign the roles in the [owner map](templates/owner-map.md).
- Read the [concepts](concepts/index.md) before running a real assessment.
- Pick the [modules and overlays](concepts/modules-and-overlays.md) that match
  the product.
- For public-sector work, read the [public sector overlay](sectors/public-sector.md).
- Browse the generated [reference](reference/index.md).
