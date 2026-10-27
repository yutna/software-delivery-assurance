---
translation_status: complete
machine_translated: false
---

# E-commerce

The `TH-ECM` overlay adds 12 assurance requirements for online marketplaces,
direct-to-consumer platforms, checkout and payment flows, and order fulfilment
software operating in Thailand.

## What it covers

- Payment card scope and tokenisation.
- Planned checkout degradation and communication.
- Duplicate-charge prevention under retry.
- Auditable and reversible order, price, and promotion changes.
- Refund and cancellation state agreement across systems.
- Consumer disclosures and consent before purchase.
- Customer account takeover protection.
- Marketing consent records and withdrawal.
- Partner API authentication, limits, and revocation.
- Accessibility of customer-facing flows.
- Order and dispute record retention.
- Account takeover and payment fraud response.

## Requirements

| ID           | Requirement                                                      |
| ------------ | ---------------------------------------------------------------- |
| `TH-ECM-001` | Card data stays within the defined payment card scope            |
| `TH-ECM-002` | Checkout degradation is planned and communicated                 |
| `TH-ECM-003` | Checkout failures do not create duplicate charges                |
| `TH-ECM-004` | Order, price, and promotion changes are auditable and reversible |
| `TH-ECM-005` | Refund and cancellation states agree across systems              |
| `TH-ECM-006` | Consumer disclosures and consent are shown before purchase       |
| `TH-ECM-007` | Customer accounts are protected against takeover                 |
| `TH-ECM-008` | Marketing consent is recorded and can be withdrawn               |
| `TH-ECM-009` | Partner API access is authenticated, limited, and revocable      |
| `TH-ECM-010` | Customer-facing flows meet the agreed accessibility target       |
| `TH-ECM-011` | Order and dispute records are retained and retrievable           |
| `TH-ECM-012` | Account takeover and payment fraud have a tested response        |

The full statements, evidence expectations, and assessment guidance are in the
generated [e-commerce reference](../reference/overlays/TH-ECM.md).

## What it does not cover

- A legality opinion on consumer terms or advertising.
- A full payment card certification programme.
- Marketplace seller due diligence outside the partner API requirement.
- Tax, customs, or cross-border trade rules for goods.
- A guarantee that a checkout flow is accessible; the overlay sets an agreed
  target and evidence expectation.

## Related register entries

The e-commerce overlay references `TH-ETA-001`, `TH-DPS-001`, `TH-CPA-001`,
`TH-PDPA-001`, `TH-PAY-001`, and `TH-BOT-002`. Read the
[register index](../registers/index.md) for the official sources and the review
limitation.

## Related pages

- [Modules and overlays](../concepts/modules-and-overlays.md)
- [Resolution](../concepts/resolution.md)
- [Sector index](index.md)
