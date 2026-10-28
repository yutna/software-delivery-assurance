<!-- FDS-DESIGN-RULES:START -->
## Design rules

This codebase follows functional design. The `functional-design` skill
is the index; the rest of the pack carries one rule each.

- This project's own conventions win. The pack decides what they leave
  open, and a pack red flag is a place to look, not a finding.
- Before designing a new module, workflow, endpoint, or bounded
  context, read `functional-design` and follow its design loop.
- For anything smaller, use its calibration table to decide how much
  design the task warrants. For one function in a module that already
  exists, that is an honest signature and a precise name, nothing more.
- Before finishing a change that added or reshaped a type, a signature,
  or a module boundary, run the checklist in
  `functional-reviewing-functional-design`.
- Use `functional-typescript` for concrete syntax.
<!-- FDS-DESIGN-RULES:END -->

## Project rules

- The product is SRAS; FDS is the design method for the TypeScript tools.
- TypeScript 5.9 on Node.js 24 LTS, ESM, npm. No Python tooling.
- Expected failures return `Result`; see `src/sras/foundation/result.ts`.
- `src/sras/standard/`, `project/`, `guard/`, `render/`, and `foundation/`
  are pure unless the file is named `workflow.ts`.
- Every new or reshaped module, workflow, type, signature, or boundary needs
  the design note from the execution plan.
- The FDS pack is pinned. Do not edit `.claude/skills/` by hand.
- Brand parsers mark their checked cast with
  `// fds-allow-as: checked brand cast`; `npm run check:fds` rejects any
  other `as` in `src/`.
- `internal/` is temporary bootstrap material, excluded from the guard and
  docs, and deleted in the final v1.0.0 issue.
- Thai prose under `docs/th/` is written and reviewed with the `kien-thai`
  skill plus the `sras-thai` project overlay. Use `kode-thai` for the audit
  loop. Keep `translation_status: partial` and `machine_translated: true`;
  never claim a human review.
