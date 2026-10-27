---
translation_status: complete
machine_translated: false
---

# Overview

The Software Delivery Assurance Library is an open, evidence-based reference
for software delivery assurance. It provides the SRAS Core, optional technical
modules, Thailand sector overlays, regulatory registers, project-instance
templates, and TypeScript tools that validate, render, and guard the content.

This site documents SRAS v0.8.0.

## The four questions

Every part of the library exists to answer one of four questions:

1. **What must be true before software is delivered?**
   The SRAS Core, modules, and overlays state testable requirements.
2. **What evidence proves it?**
   Each requirement names evidence types and a maximum age.
3. **What may we claim, and what may we not claim?**
   Claims are tied to evidence, with allowed and prohibited wording.
4. **What is the gap and the remediation plan?**
   The assessment and risk register record gaps, owners, and due dates.

## Layers

The library is layered. Each layer adds specificity; none replaces the layer
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

The public repository owns the left side of the model. A private project
instance owns the right side: its scope, filled assessment, evidence index,
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

- Not a certification, accreditation, audit attestation, or regulatory
  approval.
- Not legal advice or a definitive statement of legal compliance.
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

Thailand has full sector overlays and a maintained regulatory register. ASEAN
has six [register-only entries](registers/index.md) and a
[comparison page](registers/asean-comparison.md); the EU has nine register-only
entries and its own [comparison page](registers/eu-comparison.md). They are
register-only references, not compliance overlays.

## Review and translation status

Content is marked `draft`, `unverified`, or `reviewed`. `reviewed` requires a
named reviewer, a review date, and a scope. Legal content stays `unverified`
until a qualified legal reviewer signs off. The v0.8.0 standard content is
draft or unverified; no external reviewer has signed it off.

English is canonical for identifiers, schema keys, and file names. Thai is a
first-class content language. Machine-assisted Thai pages are marked
`translation_status: partial` and `machine_translated: true` until a human
reviewer confirms them.

## Who it is for

Product owners, engineering leads, security and privacy teams, operations
teams, assessors, and bid teams that need a reusable, evidence-based way to
discuss software readiness without inventing a new checklist for every
customer.

## Next steps

- Start with the [quick start](quick-start.md).
- Read the [concepts](concepts/index.md) before running a real assessment.
- Pick the [modules and overlays](concepts/modules-and-overlays.md) that match
  the product.
- Browse the generated [reference](reference/index.md).
