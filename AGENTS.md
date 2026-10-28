# Agent instructions

Read `CLAUDE.md` first. Its FDS design rules are binding for this repository.

Before designing a new module, workflow, type, signature, or boundary, load
`functional-design` and follow its design loop. Use `functional-typescript`
for concrete syntax. Before marking a PR ready, run the checklist in
`functional-reviewing-functional-design`.

Do not duplicate the design rules here; `CLAUDE.md` is the canonical copy.

## Thai content

Thai prose lives in `docs/th/**`. Before writing, rewriting, reviewing, or
auditing Thai content, load the `kien-thai` skill and the project overlay
`sras-thai`; use the `kode-thai` audit loop for a deep pass. Keep every Thai
page at `translation_status: partial` and `machine_translated: true`; an AI
agent is not a human reviewer. Do not translate identifiers, schema keys, file
names, commands, or requirement IDs. Use `docs/th/glossary.md` for terminology.
