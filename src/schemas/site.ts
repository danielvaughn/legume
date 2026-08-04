import { z } from 'astro/zod'

export const siteSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  canonical_url: z.url(),
  language: z.string().min(1),
  author: z.string().min(1),
  // Optional path (relative to the site root, e.g. /social-card.png) to an
  // image used for social sharing previews. Put the file in public/.
  social_image: z.string().optional(),
})

export type SiteConfig = z.infer<typeof siteSchema>
