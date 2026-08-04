import { z } from 'astro/zod'

export const siteSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  canonical_url: z.url(),
  language: z.string().min(1),
  author: z.string().min(1),
  publisher_slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      'publisher_slug must contain only lowercase letters, numbers, and hyphens',
    ),
})

export type SiteConfig = z.infer<typeof siteSchema>
