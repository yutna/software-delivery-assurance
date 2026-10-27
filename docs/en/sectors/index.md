---
translation_status: complete
machine_translated: false
---

# Sectors

Four Thailand sector overlays add requirements to the SRAS Core. Each overlay
is a delta: it does not repeat the Core, and it does not replace a register.

| Sector        | Overlay  | Requirements | Page                              |
| ------------- | -------- | -----------: | --------------------------------- |
| Finance       | `TH-FIN` |           10 | [Finance](finance.md)             |
| E-commerce    | `TH-ECM` |           12 | [E-commerce](e-commerce.md)       |
| Logistics     | `TH-LOG` |           11 | [Logistics](logistics.md)         |
| Public sector | `TH-PUB` |           12 | [Public sector](public-sector.md) |

## How to use an overlay

1. Select the overlay in `assurance.yaml` when the product operates in that
   sector in Thailand.
2. Resolve the overlay on top of the Core and the selected modules.
3. Assess every applicable requirement, including the overlay gates.
4. Record a `not_applicable` reason for an overlay requirement that does not
   apply; do not remove it.
5. Keep the factual legal references in the [registers](../registers/index.md),
   not in the overlay.

## What overlays do not do

- They do not state that a product is compliant with a law.
- They do not replace legal review.
- They do not cover a sector outside the supported four.
- They do not waive a gate.
- They do not endorse a vendor or a product.

The overlays are draft content. A named qualified reviewer has not signed them
off. Use them to structure an assessment, not as a legal conclusion.
