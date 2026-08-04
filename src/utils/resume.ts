import { getEntry } from 'astro:content'
import type { Resume } from '../schemas/resume'
import { validateContent } from './validate'

// The résumé is loaded through the `resume` content collection, so schema
// validation happens at collection-load time. This adds the cross-content
// checks (post references, duplicate slugs, broken links).
export async function getResume(): Promise<Resume> {
  const entry = await getEntry('resume', 'resume')

  if (!entry) {
    throw new Error('content/resume.yaml is missing')
  }

  await validateContent(entry.data)

  return entry.data
}
