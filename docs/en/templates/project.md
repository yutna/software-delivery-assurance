---
translation_status: complete
machine_translated: false
---

# Project template

`templates/project/` is the copyable starting point for a private SRAS project
instance. `npm run sras -- init <dir> --profile lite|full` copies it, replaces
the placeholders, applies the selected profile, computes the lockfile, validates
the result, and writes the files.

The template is synthetic. It contains no customer name, real evidence,
production identifier, or secret.

## Files

| File                  | Purpose                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `assurance.yaml`      | Project identity and the selected profile, tier, modules, overlays |
| `assessment.yaml`     | Point-in-time assessment of the selected requirements              |
| `evidence-index.yaml` | Index of evidence held outside the project instance                |
| `claims.yaml`         | Approved wording and prohibited wording for project claims         |
| `risk-register.yaml`  | Gaps and risks with owners, due dates, and disclosure decisions    |
| `assurance.lock.yaml` | Pinned standard inputs and checksum for reproducibility            |

## Placeholders

`init` replaces these values. The template itself stays schema-valid so it can
be reviewed before it is copied.

| Placeholder               | Replaced with                       |
| ------------------------- | ----------------------------------- |
| `__PROJECT_NAME__`        | Directory name of the target        |
| `__PROJECT_DESCRIPTION__` | A generated description             |
| `__PROJECT_OWNER__`       | `Project owner`                     |
| `__ASSESSOR__`            | `Project team`                      |
| `__SIGNOFF_NAME__`        | `Project owner`                     |
| `__SIGNOFF_ROLE__`        | `Project owner`                     |
| `0.0.0`                   | Current SRAS version                |
| `1970-01-01`              | Current date                        |
| `full`                    | Selected profile                    |
| `2`                       | Tier 2                              |
| `modules: []`             | Empty selection                     |
| `overlays: []`            | Empty selection                     |
| `sha256:000...`           | Computed input checksum             |
| zero SHA-256 input values | SHA-256 of each resolved input file |

The generated `README.md` is produced by the renderer, not copied from the
template.

## `assurance.yaml`

The project manifest. It records the project identity and the SRAS selection.

```yaml
project:
  name: Example project
  description: SRAS project instance for Example project.
  owner: Project owner
  confidentiality: internal
sras_version: 0.9.0
profile: lite
tier: 2
modules: []
overlays: []
created_at: "2026-10-27"
updated_at: "2026-10-27"
```

`confidentiality` is `public`, `internal`, `confidential`, `restricted`, or
`synthetic`. Use `synthetic` only for a public example.

## `assessment.yaml`

The assessment record. It repeats the project identity and selection, adds the
scope, assessor, assessed requirements, gate summary, readiness summary, and
sign-off.

```yaml
scope:
  systems: [example-service]
  data: [synthetic-records]
  users: [example-team]
  jurisdictions: [TH]
  public_sector: null
requirements:
  - id: SRAS-GOV-001
    status: implemented
    maturity: null
    evidence_refs: [EV-DEMO-001]
    notes: Scope and ownership record approved.
    gap_owner: null
    due_date: null
gates:
  pass: 1
  fail: 0
summary:
  counts:
    verified: 0
    implemented: 1
    partial: 0
    gap: 0
    not_assessed: 0
    not_applicable: 0
  index: null
```

Statuses are `not_assessed`, `gap`, `partial`, `implemented`, `verified`, and
`not_applicable`. The counts must match the requirement list.

`scope.public_sector` is optional and is either `null` or an object with both
`contracting_authority` and `contract_reference`. Set it when the instance
selects `TH-PUB` and assesses `TH-PUB-001`; validation reports a missing value
in that case. Use a synthetic authority in a public example, never a real
agency name.

```yaml
scope:
  public_sector:
    contracting_authority: Synthetic public authority
    contract_reference: SYNTH-CONTRACT-001
```

## Migration note: `scope.public_sector`

The field is additive and optional. Existing instances remain valid: an absent
`public_sector` is read as `null`. No lockfile change is needed because the
assessment is not a lock input.

To migrate a public sector instance:

1. Add `scope.public_sector` with both fields to `assessment.yaml`.
2. Use the authority that awarded the contract and the internal contract
   reference; do not put a real agency name in the public repository.
3. Run `npm run sras -- project validate <dir>`.

An instance that selects `TH-PUB`, assesses `TH-PUB-001`, and leaves the field
`null` now fails validation with a `scope/public_sector` issue.

`full` requires `maturity` on every requirement and a numeric `summary.index`.
`lite` requires `maturity: null` and `summary.index: null`.

## `evidence-index.yaml`

Evidence stays in a private store. The index records only the reference,
owner, dates, freshness, redaction, and an optional checksum.

```yaml
entries:
  - id: EV-DEMO-001
    requirement_ids: [SRAS-GOV-001]
    type: document
    description: Approved scope and ownership record.
    location: evidence/scope-record.md
    owner: Project owner
    collected_at: "2026-10-27"
    expires_at: "2027-10-27"
    freshness_status: current
    redaction: full
    hash: null
    access: restricted
    notes: The record is held in the private evidence store.
```

`location` must be a private reference, never a public URL. `hash` is either
`null` or a `sha256:` digest.

## `claims.yaml`

A claim without current evidence is `not_claimed`, not “probably true”. A claim
with partial evidence is `partial` and must state the limitation.

```yaml
claims:
  - id: CLM-DEMO-001
    claim: The project records an approved scope and ownership document.
    evidence_ids: [EV-DEMO-001]
    status: verified
    allowed_wording: The project has a current scope and ownership record.
    prohibited_wording: Any statement that a real product is certified or compliant.
    owner: Project owner
    approved_by: Project reviewer
    approved_at: "2026-10-27"
    expires_at: "2027-10-27"
    notes: The claim is limited to the recorded evidence.
```

A `verified` or `partial` claim needs at least one evidence ID, an approver, an
approval date, and an expiry date. The evidence must be current.

## `risk-register.yaml`

A gap or risk has an owner, a severity, a remediation, a due date, and an
explicit customer-disclosure decision.

```yaml
risks:
  - id: RSK-DEMO-001
    requirement_ids: [SRAS-GOV-001]
    description: The ownership record needs a scheduled review.
    severity: medium
    likelihood: low
    impact: medium
    remediation: Schedule the review and record the outcome.
    owner: Project owner
    due_date: "2027-04-27"
    status: open
    acceptance_id: null
    customer_disclosure: yes
    notes: The review is part of the annual assurance cycle.
```

An `accepted` risk requires an `acceptance_id`.

## `assurance.lock.yaml`

The lockfile pins the resolved standard inputs and their checksums. Do not edit
it by hand. After changing the selection or updating the library, refresh it
from the project directory:

```bash
npm run sras -- project refresh ~/sras-demo
```

`project validate ~/sras-demo` checks the instance without writing. It reports a
stale lockfile, a missing project file, a selection that the standard does not
define, and any other project rule that fails.

```yaml
lockfile_version: 1
sras:
  version: 0.9.0
  checksum: sha256:...
modules: []
overlays: []
inputs:
  - path: core/domains/governance.yaml
    sha256: ...
  - path: core/profiles/lite.yaml
    sha256: ...
  - path: core/sras.yaml
    sha256: ...
```

The checksum is SHA-256 over the canonical JSON array of `{ path, sha256 }`
entries, sorted by path. The canonical form has no whitespace, no timestamp, no
generator, and no environment data. The same inputs produce the same checksum on
every machine.

## Safety rules

- Keep real evidence and customer data outside this repository.
- Do not add a real customer name, production hostname, private address, or
  secret to a public project instance.
- Mark public examples as `confidentiality: synthetic`.
- Do not waive a gate requirement. An overlay cannot waive a gate.
- Do not claim certification, approval, or compliance without named evidence
  and a qualified reviewer.

## Related

- [Quick start](../quick-start.md)
- [Reference index](../reference/index.md)
- `SCOPE.md`, `GOVERNANCE.md`, and `CONTRIBUTING.md` in the repository root
