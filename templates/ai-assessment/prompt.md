# SRAS AI assessment prompt

Copy the block below into an AI tool, replace every `{placeholder}`, and give
the tool read access to the code and documents in **Code and documents to
read**. The tool returns one YAML entry; a human reviews it before it is written
to `assessment.yaml`.

Do not paste secrets, customer data, personal data, or production identifiers
into a hosted AI tool. Use a local model, or redact the input, when the project
is confidential.

---

You are assessing one SRAS requirement for a private project instance. You are
not certifying the project, and you are not writing an audit report.

## Rules

1. Read the code and documents listed below before you answer. Do not answer
   from the requirement text alone.
2. Every `evidence_refs` entry must be an ID that already exists in the
   project's `evidence-index.yaml`. Do not create or guess IDs.
3. If no current evidence supports the requirement, return `status: gap` and
   state what must be collected.
4. Do not invent file paths, dates, ticket IDs, reviewer names, or metrics.
5. If the code and the documentation disagree, report the disagreement in
   `notes` and do not return `verified`.
6. Do not edit any file. Return the YAML block only.

## Requirement

- ID: `{requirement_id}`
- Title: `{title}`
- Criticality: `{criticality}`
- Description: `{description}`
- Rationale: `{rationale}`

## Assessment guidance

- Profile: `{profile}`
- Guidance: `{assessment_guidance}`
- Required evidence:
  `{evidence_types_and_descriptions}`
- Maximum evidence age: `{max_age_days}` days
- References: `{references}`

## Project context

- Project: `{project_name}`
- Tier: `{tier}`
- Scope: systems `{systems}`; data `{data}`; users `{users}`; jurisdictions
  `{jurisdictions}`; public sector `{public_sector}`
- Modules: `{modules}`
- Overlays: `{overlays}`
- Existing evidence IDs: `{evidence_ids}`

## Code and documents to read

`{paths}`

## Output

Return exactly one YAML list entry and nothing else:

```yaml
- id: { requirement_id }
  status: verified | implemented | partial | gap | not_assessed | not_applicable
  maturity: L2 | L3 | L4 | null
  evidence_refs: [EV-...]
  notes: "at most three sentences; cite the files you read"
  gap_owner: "role or team, or null"
  due_date: "YYYY-MM-DD or null"
```

Status meanings:

- `verified` — the practice is in place and current evidence covers every
  required evidence type.
- `implemented` — the practice is in place, but at least one required evidence
  type is missing or stale.
- `partial` — the practice covers some in-scope paths, and the gaps are known.
- `gap` — the practice is absent, or no verifiable evidence exists.
- `not_applicable` — the requirement does not apply to this project, and the
  reason is in `notes`.
- `not_assessed` — use this only when the input is insufficient to decide; say
  what is missing in `notes`.

Use `maturity` only for the `full` profile; use `null` for `lite`. Use
`gap_owner` and `due_date` only when the status is `gap` or `partial`.
