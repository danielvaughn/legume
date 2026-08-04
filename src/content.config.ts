import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { resumeSchema } from './schemas/resume'
import { siteSchema } from './schemas/site'
import { postFrontmatterSchema } from './schemas/post'

// All publisher-owned content lives in content/ (see content/README.md).
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: postFrontmatterSchema,
})

const resume = defineCollection({
  loader: glob({ pattern: 'resume.yaml', base: './content' }),
  schema: resumeSchema,
})

const site = defineCollection({
  loader: glob({ pattern: 'site.yaml', base: './content' }),
  schema: siteSchema,
})

export const collections = { posts, resume, site }
