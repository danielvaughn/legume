// Content types are inferred from the Zod schemas in src/schemas/resume.ts,
// which is the single source of truth for required and optional fields.
// `Highlight` is deliberately absent here: the DOM lib already declares a
// global `Highlight` (CSS Custom Highlight API), so consumers import it
// from the schema module directly.
type Bio = import('./schemas/resume').Bio
type Job = import('./schemas/resume').Job
type Education = import('./schemas/resume').Education
type Project = import('./schemas/resume').Project
type Achievement = import('./schemas/resume').Achievement
type Resume = import('./schemas/resume').Resume
