---
translation_status: complete
machine_translated: false
---

# Pilots

The pilots test the library the way a new user would: create a project
instance, select Core, modules, and an overlay, assess the resolved
requirements, and run the checks. They use synthetic projects only.

| Pilot | Sector  | Report                      |
| ----- | ------- | --------------------------- |
| A     | Finance | [Finance pilot](finance.md) |

Pilot reports are internal engineering evidence. They are not customer
assessments, audit attestations, or legal advice, and they do not state that a
product meets a legal requirement.

## Method

Each pilot follows the same steps:

1. Create a project instance with `sras init` and the `full` profile.
2. Select the Core, the sector modules, and the sector overlay.
3. Resolve the applicable requirements and compare them with the synthetic
   example.
4. Run `validate --all`, `render --check`, and `guard` from the library
   repository.
5. Record findings, limitations, and open questions.

Findings are summarized, not copied from a project. No customer name, real
evidence, or confidential record enters this repository.
