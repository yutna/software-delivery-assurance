---
translation_status: complete
machine_translated: false
---

# Accessibility statement for this documentation site

**Prepared:** 2026-10-29. **Prepared by:** the AI execution agent.
**Status:** target stated, not assessed, no conformance claim.

This statement covers the documentation site at
<https://yutna.github.io/software-delivery-assurance/>. It does not cover the
SRAS requirements, the project template, the generated CLI output, the external
sites this documentation links to, or any product built from the template.

## Target

WCAG 2.2 Level AA is the design target for this site. A target is not a result:
the site has not been assessed against WCAG 2.2, and this page does not claim
conformance at any level.

## What is checked automatically

`npm run check:a11y` builds the site and runs axe-core over every page in
`docs/.vitepress/dist`, limited to the rules that map to WCAG 2.0, 2.1, and 2.2
Level A and AA success criteria. The check runs in CI on every pull request, and
a violation fails the build.

The rules that run cover page language, text alternatives, form labels,
accessible names for buttons and links, ARIA attribute validity, list and table
structure, frame titles, and the viewport meta tag. Best-practice rules that do
not map to a success criterion are outside the gate.

## What is not checked

The check runs in a document object model without a layout engine or assistive
technology. It does not evaluate:

- colour contrast;
- whether a visible label is contained in the accessible name;
- keyboard operation and focus order;
- keyboard traps;
- zoom, reflow, and text spacing;
- screen-reader output in NVDA, JAWS, VoiceOver, TalkBack, or any other
  assistive technology;
- motion, timing, and animation;
- the readability of the Thai translation.

The check reports the rules it cannot evaluate in its output, so a passing run
does not mean every rule was applied. No manual keyboard test, screen-reader
test, or third-party audit has been performed. Accessibility defects can exist
on any page.

## Known limitations

- Thai pages are machine translated and have not been reviewed by a human. A
  screen reader pronounces that text as Thai, and the translation may contain
  errors that change the meaning.
- Long tables and code blocks are reproduced as written. They can be verbose or
  hard to follow with a screen reader, and they do not have a plain-language
  alternative.
- External sources are outside this site's control. Several linked sources are
  PDF files in Thai or English, and their own accessibility is not assessed
  here.
- The site is built with the VitePress default theme. Theme behaviour can change
  on an upgrade, and this statement is reviewed at each release rather than
  after every dependency update.

## Feedback

Open an issue at
<https://github.com/yutna/software-delivery-assurance/issues/new> with
`accessibility` in the title. Describe the page, what happened, and the browser
or assistive technology you used, if that is relevant. Do not include personal
data, customer data, or confidential material in a public issue.

This is a solo-maintained project; responses are best-effort and no response
time is promised.

## How this statement is maintained

The statement was prepared by an AI execution agent. It has not been reviewed by
a human, and it is not an audit. It is reviewed when the site, the check, or the
theme changes, and at each release. The check and this page are expected to
change together: a change that narrows the check must update this page.

## Related pages

- [Template readiness](template-readiness.md)
- [Legal and regulatory concerns](legal-concerns.md)
- [Review policy](review-policy.md)
- [Confidence labels](confidence-labels.md)
- [WCAG 2.2 crosswalk](../reference/crosswalks/MAP-WCAG22.md)
