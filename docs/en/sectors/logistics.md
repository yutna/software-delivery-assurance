---
translation_status: complete
machine_translated: false
---

# Logistics

The `TH-LOG` overlay adds 11 assurance requirements for transport management,
warehouse management, tracking, customs integration, and delivery platforms
operating in Thailand.

## What it covers

- Ordered, timestamped, reconciled shipment status events.
- Chain-of-custody handoffs with actor, location, and time.
- EDI and API failure detection and reconciliation.
- Scoped and monitored warehouse and depot access.
- Scoped and revocable carrier and subcontractor access.
- Peak-season capacity tested against an agreed forecast.
- Routing and delivery continuity.
- Minimised partner data sharing under agreement.
- Accurate and traceable customs and trade data.
- Response to lost, delayed, or misrouted shipments.
- Tamper-evident proof-of-delivery records.

## Requirements

| ID           | Requirement                                                        |
| ------------ | ------------------------------------------------------------------ |
| `TH-LOG-001` | Shipment status events are timestamped, ordered, and reconciled    |
| `TH-LOG-002` | Chain-of-custody handoffs record actor, location, and time         |
| `TH-LOG-003` | EDI and API failures are detected and reconciled within the window |
| `TH-LOG-004` | Warehouse and depot access is scoped and monitored                 |
| `TH-LOG-005` | Carrier and subcontractor access is scoped and revocable           |
| `TH-LOG-006` | Peak-season capacity is tested against the agreed forecast         |
| `TH-LOG-007` | Routing and delivery continuity is planned and exercised           |
| `TH-LOG-008` | Partner data sharing is minimised and governed by agreement        |
| `TH-LOG-009` | Customs and trade data is accurate and traceable                   |
| `TH-LOG-010` | Lost, delayed, or misrouted shipments have a tested response       |
| `TH-LOG-011` | Proof-of-delivery records are tamper-evident and retained          |

The full statements, evidence expectations, and assessment guidance are in the
generated [logistics reference](../reference/overlays/TH-LOG.md).

## What it does not cover

- Customs classification or duty advice.
- A legal opinion on carrier liability.
- A full customs or trade compliance programme.
- Warehouse physical security beyond the access and evidence requirements.
- A guarantee that a carrier will meet a delivery time.

## Related register entries

The logistics overlay references `TH-BOT-001`, `TH-CPA-001`, `TH-CYBER-001`,
`TH-ETA-001`, and `TH-PDPA-001`. Read the
[register index](../registers/index.md) for the official sources and the review
limitation.

## Related pages

- [Modules and overlays](../concepts/modules-and-overlays.md)
- [Resolution](../concepts/resolution.md)
- [Sector index](index.md)
