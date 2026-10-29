---
translation_status: complete
machine_translated: false
---

# AI-assisted assessment

`templates/ai-assessment/prompt.md` is a copyable prompt for drafting one SRAS
requirement assessment. It is not an auditor: the tool reads code and documents,
proposes a status, and cites what it read. A human reviews the result and records
it in `assessment.yaml`.

The prompt is a template, not a per-requirement prompt. It injects the
requirement's own assessment guidance, the project scope, and the file list, so
one prompt covers every requirement without repeating the same instructions for
each one.

## How to use it

1. Create the private instance with
   `npm run sras -- init <dir> --profile lite|full`, then resolve the selected
   requirements with `npm run sras -- project refresh <dir>`.
2. Pick one requirement from `assessment.yaml` and open its entry in the
   library YAML (`core/`, `modules/`, or `overlays/`).
3. Copy the prompt from `templates/ai-assessment/prompt.md` and replace every
   `{placeholder}` with the requirement and project values.
4. List the code and documents the tool must read. Prefer the narrowest set that
   can prove or disprove the requirement.
5. Run the prompt. The tool returns one YAML entry.
6. Check the cited paths, the status, and every `evidence_refs` ID before you
   paste the entry into `assessment.yaml`.
7. Run `npm run sras -- project validate <dir>` and
   `npm run sras -- project resolve <dir>`.

## What the prompt enforces

- Read the code and documents before answering; do not answer from the
  requirement text alone.
- Cite an evidence ID that already exists in `evidence-index.yaml`; never invent
  an ID.
- Return `gap` when no current evidence supports the requirement.
- Report a conflict between code and documentation instead of choosing one.
- Do not invent paths, dates, ticket IDs, reviewer names, or metrics.
- Return the YAML entry only, and edit no file.

## What the human still owns

- Whether the requirement applies to the project at all.
- Whether the cited evidence is real, current, and sufficient.
- The gap owner and the due date in `risk-register.yaml`.
- The sign-off. `assessment.yaml` ships with `Not signed`, and a named human
  replaces it only after reviewing the assessment.

## Limits

- The tool cannot verify runtime behaviour, infrastructure configuration,
  contracts, or organisational practice unless those documents are in the input.
- The tool can misread code. A `verified` result is a proposal, not a finding.
- The prompt does not create evidence. If the evidence does not exist, the only
  correct result is `gap`.
- The result carries no conformance, certification, or audit claim.

## Related pages

- [Project template](project.md)
- [Validate a private project instance in CI](ci-validation.md)
- [Owner map](owner-map.md)
- [Template readiness](../governance/template-readiness.md)
