# Scope

## What this library is

An open, evidence-based reference library for software delivery assurance. It
provides the SRAS Core, optional technical modules, sector overlays, regulatory
registers, project-instance templates, and TypeScript tools that validate,
render, and guard the content.

The library answers four questions:

1. What must be true before software is delivered?
2. What evidence proves it?
3. What may we claim, and what may we not claim?
4. What is the gap and the remediation plan?

## What it is not

- Not a certification, accreditation, audit attestation, or regulatory approval.
- Not legal advice or a definitive statement of legal compliance.
- Not a customer-specific assessment, evidence pack, contract, or legal opinion.
- Not a hosted SaaS product, dashboard, or multi-tenant platform.
- Not a replacement for a customer's own security, privacy, or quality programme.

## Supported sectors

- Finance
- E-commerce
- Logistics
- Public sector

## Supported markets

- Thailand: full sector overlays and a maintained regulatory register.
- ASEAN: register-only references in v0.x.
- EU: register-only references in v0.x.

ASEAN and EU content does not become a compliance overlay until a qualified
reviewer is named and the review is recorded.

## Modules

Technical modules are selected when the product has the relevant
characteristic:

- AI/GenAI
- Integration and API
- Regulated data
- Cloud/SaaS
- On-premises

## Overlays

Overlays add, override, or waive requirements for a jurisdiction or industry.
They are deltas, not full copies of the Core. A gate requirement cannot be
waived by an overlay.

## Registers

A register is a factual index of a law, regulation, standard, or guidance. It
has an official source, a verification date, a review due date, and an
`unverified` review status until a named qualified reviewer signs off. A
register entry is not legal advice and not an overlay.

## Project instances

A project instance is a private or separate repository containing the selected
scope, profile, assessment, evidence index, claims, and risk register. The
public repository provides templates and synthetic examples only. Real
evidence and customer data stay outside this repository.

## Out of scope

- Healthcare is out of scope.
- Customer-specific assessments, evidence, contracts, legal opinions, and pricing.
- Certification, accreditation, audit attestation, or regulatory approval.
- Legal advice or definitive statements of legal compliance.
- A hosted SaaS product, dashboard, or multi-tenant platform.
- Real customer data, production credentials, internal hostnames, or IP addresses.
- Languages other than Thai and English.
- Full ASEAN or EU legal mapping without qualified review.
- Vendor scorecards or product endorsements.

## Review status and limitations

Content is `draft`, `unverified`, or `reviewed`. `reviewed` requires a named
reviewer, a review date, and a scope. Legal content stays `unverified` until a
qualified legal reviewer signs off. If a reviewer is not available, the
limitation is visible and the content is not used for a compliance claim.

Thai and English are both first-class content languages. English is canonical
for identifiers, schema keys, and file names. Machine translation is marked
with `machine_translated: true` and `translation_status: partial` until a human
reviewer confirms it.
