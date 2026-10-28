---
translation_status: complete
machine_translated: false
---

# Finance

The `TH-FIN` overlay adds 10 assurance requirements for banks, insurers,
payment providers, fintech, and financial software vendors operating in
Thailand. It is a delta on the Core, selected with the modules the product
uses.

## What it covers

- Availability and recovery objectives for critical financial services.
- Board ownership and annual review of IT risk.
- Exit planning for critical outsourcing.
- Integrity and retention of transaction records.
- Fraud escalation and customer communication.
- Separate approval for high-privilege access to payment and ledger systems.
- Classification, minimisation, and access control for customer financial
  data.
- Rollback and independent review for core financial system changes.
- Tested regulatory notification readiness.
- Validation and monitoring of models used in credit, fraud, or pricing.

## Requirements

| ID           | Requirement                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `TH-FIN-001` | Critical financial services have a documented maximum tolerable downtime        |
| `TH-FIN-002` | IT risk is owned by the board and reviewed at least annually                    |
| `TH-FIN-003` | Critical outsourcing arrangements have an exit plan and tested transition       |
| `TH-FIN-004` | Transaction records are integrity-protected and retained for the defined period |
| `TH-FIN-005` | Fraud incidents have an escalation path and a customer communication plan       |
| `TH-FIN-006` | High-privilege access to payment and ledger systems is separately approved      |
| `TH-FIN-007` | Customer financial data is classified, minimised, and access-controlled         |
| `TH-FIN-008` | Core financial system changes have a tested rollback and independent review     |
| `TH-FIN-009` | Regulatory notification readiness is tested for financial incidents             |
| `TH-FIN-010` | Models used in credit, fraud, or pricing are validated and monitored            |

The full statements, evidence expectations, and assessment guidance are in the
generated [finance reference](../reference/overlays/TH-FIN.md).

## What it does not cover

- A statement that a product meets a Bank of Thailand requirement.
- Legal advice on financial services licensing.
- A full mapping of every Bank of Thailand notification.
- Payment card scope, which is in the e-commerce overlay and the payment
  standards crosswalk.
- Vendor selection or product endorsement.

## Related register entries

The finance overlay references `TH-BOT-001`, `TH-BOT-002`, `TH-PAY-001`,
`TH-TECH-001`, `TH-PDPA-001`, and `TH-CYBER-001`, plus the NIST AI Risk
Management Framework 1.0. Read the [register index](../registers/index.md) for
the official sources and the review limitation.

## Related pages

- [Modules and overlays](../concepts/modules-and-overlays.md)
- [Resolution](../concepts/resolution.md)
- [Sector index](index.md)
