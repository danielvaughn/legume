# Résumé schema fixtures

Representative content for the schema in `src/schemas/resume.ts`.

- `valid/minimal.yaml` — only the required fields; everything else defaults.
- `valid/complete.yaml` — every supported field, required and optional.
- `invalid/*.yaml` — each file violates the schema in the way its leading
  comment describes, and must be rejected.

These fixtures cover schema shape only. Post and image existence checks
(`src/utils/validate.ts`) depend on the `content/` directory and are exercised
against real content during builds. Unit tests consuming these fixtures arrive
with the testing work in `todo.md` section 7.
