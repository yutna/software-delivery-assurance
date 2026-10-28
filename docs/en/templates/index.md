---
translation_status: complete
machine_translated: false
---

# Templates

The repository provides a copyable project template and synthetic examples.
Neither contains customer data, real evidence, or production identifiers.

## Project template

`templates/project/` is the starting point for a private project instance.
`npm run sras -- init <dir> --profile lite|full` copies it, replaces the
placeholders, applies the profile, computes the lockfile, validates the result,
and writes the files.

Read the [project template guide](project.md) for the file-by-file reference,
the placeholders, and the validation rules. After editing an instance, run
`npm run sras -- project validate <dir>`; after changing the selection, run
`npm run sras -- project refresh <dir>`.

Before copying, assign the roles in the [owner map](owner-map.md). Read
[template readiness](../governance/template-readiness.md) for what the kit can
and cannot support today.

## Synthetic examples

| Example                             | Scope                                       |
| ----------------------------------- | ------------------------------------------- |
| `examples/e2e-project/`             | Core + AI module + Thailand finance overlay |
| `examples/finance-synthetic/`       | Finance overlay                             |
| `examples/ecommerce-synthetic/`     | E-commerce overlay                          |
| `examples/logistics-synthetic/`     | Logistics overlay                           |
| `examples/public-sector-synthetic/` | Public sector overlay                       |

Each example has an assessment, a lockfile, a claims file, a risk register, an
evidence index, and synthetic evidence under `evidence/`. The evidence files
are placeholders that show the expected shape; they are not real assurance
records.

## What to copy and what to replace

- Copy the structure, not the content.
- Replace every `Example` and `Synthetic` value with the project's own.
- Keep evidence in the private store; the index only points to it.
- Keep the lockfile with the assessment so the result is reproducible.
- Do not add a customer name, real hostname, or real evidence to this public
  repository.

## Related pages

- [Project instances](../concepts/project-instance.md)
- [Quick start](../quick-start.md)
- [Claims and evidence](../concepts/claims-and-evidence.md)
