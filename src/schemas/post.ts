import { z } from 'astro/zod'

// Frontmatter for Markdown posts. Every field is optional so a bare Markdown
// file is a valid post: the title falls back to the résumé entry that
// references the post, and linkage to résumé entries lives in resume.yaml
// (the `post:` fields), not here, so there is one source of truth.
export const postFrontmatterSchema = z.object({
  title: z.string().min(1).optional(),
  summary: z.string().min(1).optional(),
  draft: z.boolean().default(false),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  order: z.number().int().optional(),
})

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>
