# E-commerce overlay review checklist

This checklist is for a subject-matter reviewer of `overlays/industries/ecommerce/overlay.yaml`. The overlay is a delta on SRAS Core and selected modules. It is not a full standard, not legal advice, and not a statement that a product is compliant.

## Scope and sources

- [ ] The overlay `id`, `type`, `jurisdiction`, and `industry` match the intended scope (`TH`, e-commerce).
- [ ] Every `sources` ID resolves to an entry in `registers/th/`.
- [ ] Every source URL opens and points to an official source.
- [ ] The instrument names and effective dates in the register match the official source.
- [ ] The source set covers every added requirement, or the requirement states why no register source applies.
- [ ] `not_covered` names the material areas the overlay does not address.

## Requirement quality

- [ ] Every added requirement has a unique `TH-ECM-NNN` ID.
- [ ] Every requirement is testable and has an explicit negative case.
- [ ] Every requirement has at least one evidence expectation with a freshness limit.
- [ ] Every requirement has lite and full assessment guidance.
- [ ] Criticality is justified; a `gate` marks a delivery blocker, not a preference.
- [ ] Applicability tiers, modules, and overlays are correct for an e-commerce product.
- [ ] No requirement duplicates a Core or module requirement without adding e-commerce-specific content.
- [ ] References are official or standards-body sources, not vendor marketing.

## Customer, payment, and claim boundary

- [ ] No legal conclusion, interpretation, or advice.
- [ ] No statement that a product, team, or supplier is compliant, certified, approved, or guaranteed.
- [ ] No vendor endorsement or named payment provider.
- [ ] No customer, project, or supplier name.
- [ ] No customer data, personal data, secret, private address, or internal hostname.
- [ ] No copied statute text beyond a short necessary quote.
- [ ] Card-data requirements describe scope reduction and do not assert card-brand certification.

## Gates, overrides, and waivers

- [ ] No gate requirement is waived.
- [ ] Every override has a rationale and a replacement that is at least as strict.
- [ ] Every waiver has a justification, risk owner, expiry date, and rationale.
- [ ] An expired waiver or override is removed or renewed before this checklist is signed.

## Bilingual and accessibility content

- [ ] Thai and English titles, descriptions, and rationales have the same meaning.
- [ ] Thai is natural enough for a Thai reviewer to assess without translating from English.
- [ ] The accessibility target is named with a version and applies to named critical journeys.
- [ ] `translation_status` is `partial` and `machine_translated` is `true` until a human translation review is recorded.
- [ ] `review_status` stays `draft` or `unverified` until a named reviewer, review date, and review scope are recorded.

## Review record

- [ ] Reviewer name:
- [ ] Review date:
- [ ] Review scope:
- [ ] Decision: keep as draft / promote to unverified / return for changes
- [ ] Open questions and follow-ups:
