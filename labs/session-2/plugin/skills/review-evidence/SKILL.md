---
name: review-evidence
description: Review a bounded code diff and produce a report backed by test evidence. Use for explicit code review requests, not unrelated writing or implementation tasks.
---
Read the task contract and the diff before forming a finding.
1. Identify changed behavior and the acceptance criterion.
2. Inspect relevant tests; run only authorized checks in the project.
3. Return JSON with non-empty strings: summary, tests, risks.
4. In tests, name the actual command and result. If not run, say not run and why.
5. Do not publish, merge, expand permissions or read credentials.
6. Distinguish a confirmed failure from an untested hypothesis.
Validate the report using the repository's labs/session-2/validate.mjs script.
