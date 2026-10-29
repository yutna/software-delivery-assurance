---
translation_status: complete
machine_translated: false
---

# Walk through the end-to-end example

`examples/e2e-project/` is a synthetic Core + AI module + Thailand finance
overlay instance. It is a shape reference, not an assessment of a real product.
Every name, evidence file, and result is invented.

## Read the files in this order

### `assurance.yaml`

The manifest selects `profile: full`, `tier: 2`, the `SRAS-AI` module, and the
`TH-FIN` overlay. It names an example owner and records `sras_version: 1.2.0`.
The selection here must match `assessment.yaml`.

### `assessment.yaml`

The assessment records 10 requirements: 2 `verified`, 4 `implemented`, 3
`partial`, and 1 `gap`. Five gates pass and one fails; the readiness index is
`0.75`. Each record names evidence and notes. A partial or gap record carries a
`gap_owner` and a `due_date`, so the next review can follow it up.

The sign-off is a **synthetic reviewer**. It is a filled example, not a real
approval. A fresh instance from `init` instead says `Not signed` and
`project validate` warns.

### `evidence-index.yaml`

Seven entries, `EV-E2E-001` to `EV-E2E-007`, point to files under
`examples/e2e-project/evidence/`. Each entry names the requirements it
supports, its type, owner, collection date, expiry date, freshness, and
redaction. The types match the requirement expectations: for example,
`SRAS-SEC-001` expects a configuration and a test result, and the index supplies
both.

The files are placeholders. They show where a private project would point, not
what a real record contains.

### `claims.yaml`

Two claims show the allowed and prohibited wording. `CLM-E2E-001` is `verified`
against its evidence. `CLM-E2E-002` is `partial` and its prohibited wording
names the limit: continuity is documented, but the exercise is open. A claim
without current evidence would not be verified.

### `risk-register.yaml`

Two risks cover the open gaps. `RSK-E2E-001` is high and open, with an owner
and a due date. `RSK-E2E-002` is accepted, and the acceptance ID
`ACC-E2E-001` links it to the recorded decision. A risk without an owner or a
review date is not accepted as managed.

### `assurance.lock.yaml`

The lockfile pins the library version, the selected module and overlay, and the
standard input files with a checksum. It is what makes the result reproducible.

## Run the checks

```bash
npm run sras -- project validate examples/e2e-project
npm run sras -- project resolve examples/e2e-project
```

`project validate` confirms that the files parse, the manifest and assessment
agree, the lockfile is current, evidence types match, and claims and risks point
at assessed requirements. The cross-check output is:

```text
project valid: .../examples/e2e-project; 11 resolved standard inputs; lockfile current
```

`project resolve` shows the denominator behind the assessment:

```text
project: End-to-end synthetic project
selection: profile=full tier=2 modules=SRAS-AI overlays=TH-FIN
resolved: 90 requirements (38 gates)
coverage: 9 assessed, 81 not assessed (81 missing records), 0 not applicable
```

The example assesses 9 of the resolved requirements and leaves 81 unassessed.
That is deliberate: a complete instance can still have open coverage, provided
every gate is assessed. `project resolve` exits 0 here because the gates are
covered.

## Why the example is valid

- The manifest and the assessment describe the same project, version, tier,
  modules, and overlays.
- The lockfile matches the selected standard inputs.
- Every evidence reference exists, and the types match the requirement.
- Every claim and risk points at an assessed requirement.
- `scope.public_sector` is not set because the public sector overlay is not
  selected.
- The sign-off names a person-shaped reviewer, so the unsigned warning does not
  apply. The reviewer is synthetic.

## What it does not show

- Real evidence, customer data, or a real product name.
- A legal, external, or human review.
- A certification or a compliance result.
- A complete assessment of every resolved requirement.

Copy the structure and the discipline, not the content.

## Related pages

- [Validate a private project instance in CI](ci-validation.md)
- [Upgrade a 1.x instance](upgrade-1x.md)
- [Project template guide](project.md)
- [Claims and evidence](../concepts/claims-and-evidence.md)
