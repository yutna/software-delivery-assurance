# Logistics overlay review checklist

This checklist is for a subject-matter reviewer of `overlays/industries/logistics/overlay.yaml`. The overlay is a delta on SRAS Core and selected modules. It is not a full standard, not legal advice, and makes no conformity claim.

## Scope and sources

- [ ] The overlay `id`, `type`, `jurisdiction`, and `industry` match the intended scope (`TH`, logistics).
- [ ] Every `sources` ID resolves to an entry in `registers/th/`.
- [ ] Every source URL opens and points to an official source.
- [ ] The instrument names and effective dates in the register match the official source.
- [ ] The source set covers every added requirement, or the requirement states why no register source applies.
- [ ] `not_covered` names the material areas the overlay does not address, including customs-specific rules.

## Requirement quality

- [ ] Every added requirement has a unique `TH-LOG-NNN` ID.
- [ ] Every requirement is testable and has an explicit negative case.
- [ ] Every requirement has at least one evidence expectation with a freshness limit.
- [ ] Every requirement has lite and full assessment guidance.
- [ ] Criticality is justified; a `gate` marks a delivery blocker, not a preference.
- [ ] Applicability tiers, modules, and overlays are correct for a logistics product.
- [ ] No requirement duplicates a Core or module requirement without adding logistics-specific content.
- [ ] References are official or standards-body sources, not vendor marketing.

## Shipment, partner, and data boundary

- [ ] No legal conclusion, interpretation, or advice.
- [ ] No claim that a product, team, or carrier meets a legal requirement.
- [ ] No carrier, vendor, customer, or consignee name.
- [ ] No shipment data, address, personal data, secret, private address, or internal hostname.
- [ ] No copied statute text beyond a short necessary quote.
- [ ] Customs and trade requirements describe data quality and traceability, not customs advice.

## Gates, overrides, and waivers

- [ ] No gate requirement is waived.
- [ ] Every override has a rationale and a replacement that is at least as strict.
- [ ] Every waiver has a justification, risk owner, expiry date, and rationale.
- [ ] An expired waiver or override is removed or renewed before this checklist is signed.

## Bilingual content

- [ ] Thai and English titles, descriptions, and rationales have the same meaning.
- [ ] Thai is natural enough for a Thai reviewer to assess without translating from English.
- [ ] `translation_status` is `partial` and `machine_translated` is `true` until a human translation review is recorded.
- [ ] `review_status` stays `draft` or `unverified` until a named reviewer, review date, and review scope are recorded.

## Review record

- [ ] Reviewer name:
- [ ] Review date:
- [ ] Review scope:
- [ ] Decision: keep as draft / promote to unverified / return for changes
- [ ] Open questions and follow-ups:
