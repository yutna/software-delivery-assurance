---
translation_status: complete
machine_translated: false
---

# Resolution

Resolution is how a project instance turns a scope into the set of
requirements that apply. The order is fixed so two assessors with the same
inputs reach the same set.

## Resolution order

```text
SRAS Core
  -> selected modules
  -> jurisdiction overlay
  -> industry overlay
  -> project additions
```

Rules:

- Every applicable layer applies. The layers are not mutually exclusive.
- When two layers conflict, the stricter requirement wins.
- A project addition can add a requirement or make an existing one stricter. It
  never weakens the public standard.
- Project additions stay in the private project instance; they do not flow back
  into the public repository.

## Stricter wins

A conflict is not resolved by document order or by the last file read. Compare
the requirements and keep the stricter outcome. If the comparison is not
obvious, record the decision in the assessment notes and in the risk register.

Typical conflicts:

- Core says an annual review; an overlay says twice a year. Twice a year wins.
- A module asks for a test result within 180 days; an overlay asks for 365. The
  180-day requirement wins.
- An overlay waives a non-gate requirement that a module also states. The
  waiver applies only if it is written, approved, time-bound, and owned.

## Gates and not-applicable

A gate cannot be waived. The only route is `not_applicable` with a documented
scope reason and owner approval. The approval is part of the assessment, not a
private message.

A non-gate requirement can be waived only with:

- a written justification,
- a named risk owner,
- an expiry date,
- an approval record.

## Profiles change depth, not the set

Both profiles resolve the same requirement set. The profile decides how the
assessment records it:

- `lite` records status and gates.
- `full` adds maturity, criticality weights, the readiness index, and evidence
  coverage.

Switching profile does not add or remove requirements.

## Reproducibility

`assurance.lock.yaml` pins:

- the SRAS version and the standard checksum,
- selected module IDs and versions,
- selected overlay IDs and versions,
- the SHA-256 of every resolved standard input.

A project assessment must be reproducible from the lockfile even after the
library changes. Review the resolved requirements before assessing again, then
refresh the lockfile:

```bash
npm run sras -- project refresh ~/sras-demo
```

`project validate ~/sras-demo` is the read-only check. It reports a stale
lockfile and exits non-zero when the checked-in lock no longer matches the
resolved inputs.

## Worked example

`examples/e2e-project/` is a synthetic full-profile project with the AI module
and the Thailand finance overlay. Its lockfile pins the current SRAS version,
`SRAS-AI`, and `TH-FIN`. It exercises Core, module, and overlay requirements
without any real customer data.

## Related pages

- [Modules and overlays](modules-and-overlays.md)
- [Project instances](project-instance.md)
- [Claims and evidence](claims-and-evidence.md)
