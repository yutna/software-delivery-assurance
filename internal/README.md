# Temporary internal bootstrap seed

> **This directory is public because the repository is public.**
> Do not add secrets, customer data, confidential information, or production
> identifiers here. Everything in this directory is scheduled for deletion in
> the final `v1.0.0` cleanup issue.

This directory preserves the two private source documents used to start the
repository so any machine can continue the work without access to the original
gists:

- `plan/PLAN-software-delivery-assurance.md` — the execution plan and runbook.
- `seed/sras-v0.1.0/` — the old SRAS v0.1.0 draft used as a content seed.

Secret gist URLs and IDs are redacted from these copies. These files are not SRAS content and are not part of the published library.
They are excluded from the content guard, Prettier, markdownlint, the link
checker, ESLint, and the public docs build. They must never be copied into
`core/`, `modules/`, `overlays/`, `registers/`, `mappings/`, `templates/`,
`examples/`, `docs/`, or the README.

The final `v1.0.0` issue deletes this directory and the two source gists after
every other milestone is complete.
