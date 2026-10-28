# Scope

## Positioning

This repository is a starter kit for software delivery assurance, with a
reference standard bundled inside it. It is positioned for future projects,
especially Thai public-sector delivery.

There are two tracks:

- **Template / starter-kit track (default).** A team copies the project
  template into a private repository, selects a profile and overlays, and
  records its own scope, assessment, evidence, claims, and risks. The track is
  usable now with the limitations in `docs/en/governance/template-readiness.md`.
  It does not require an external reviewer and does not produce a certification.
- **Formal-standard track (optional).** An organisation that needs a reviewed
  SRAS standard, external review, or a v1.0.0 stability claim follows the
  formal-standard track. That track is not ready and remains governed by the
  v1.0.0 milestone and readiness review.

The repository is not a published standard with external sign-off. The SRAS
content is a reference that the template uses. A project instance is always the
authoritative record for a real delivery.

## What this repository provides

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
- Not a published standard with external sign-off.
- Not a customer-specific assessment, evidence pack, contract, or legal opinion.
- Not a hosted SaaS product, dashboard, or multi-tenant platform.
- Not a replacement for a customer's own security, privacy, or quality programme.

## What the template track can do today

The template track is usable with limitations. A team can:

- create a private project instance with `sras init`;
- select the `lite` or `full` profile, technical modules, and Thailand sector
  overlays;
- record scope, assessed requirements, gates, evidence references, claims, and
  risks;
- validate the instance and refresh its lockfile with `project validate` and
  `project refresh`;
- use the content guard and deterministic render checks to keep public content
  honest.

It cannot provide a certification, legal conclusion, external validation, fully
reviewed Thai translation, or verified register status. Those belong to the
optional formal-standard track and are not claimed.

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

## Track boundaries

- Template-track work may fix templates, docs, examples, and tooling. It still
  goes through an issue, a pull request, CI, and a squash merge.
- Template-track content may be described as "usable with limitations". It may
  not be described as stable, certified, externally reviewed, or legally
  reviewed.
- Formal-standard work includes freezing SRAS 1.0, human Thai review, external
  review, and the final audit. It follows the v1.0.0 milestone and governance.
- Moving a template-track artifact into a formal-standard claim requires the
  formal-standard evidence. A template that works is not a reviewed standard.

## Review status and limitations

Content is `draft`, `unverified`, or `reviewed`. `reviewed` requires a named
reviewer, a review date, and a scope. Legal content stays `unverified` until a
qualified legal reviewer signs off. If a reviewer is not available, the
limitation is visible and the content is not used for a compliance claim.

Legal and regulatory concerns may carry a desk research note with official
sources and open questions. That note is not a legal opinion and does not
determine whether a source applies to a project.

Thai and English are both first-class content languages. English is canonical
for identifiers, schema keys, and file names. Machine translation is marked
with `machine_translated: true` and `translation_status: partial` until a human
reviewer confirms it.
