import { getCollection, getEntry } from 'astro:content'
import type { Resume } from '../schemas/resume'
import { validateContent } from './validate'
import { isPublished } from './posts'

// The résumé is loaded through the `resume` content collection, so schema
// validation happens at collection-load time. This adds the cross-content
// checks (post references, duplicate slugs, broken links).
export async function getResume(): Promise<Resume> {
  const entry = await getEntry('resume', 'resume')

  if (!entry) {
    throw new Error('content/resume.yaml is missing')
  }

  const posts = await getCollection('posts')

  await validateContent(entry.data, {
    published: posts.filter(isPublished).map((post) => post.id),
    drafts: posts.filter((post) => !isPublished(post)).map((post) => post.id),
  })

  return entry.data
}
