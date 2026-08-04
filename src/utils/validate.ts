import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Resume } from '../schemas/resume'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const POSTS_DIR = path.join(CONTENT_DIR, 'posts')

interface PostRef {
  source: string
  slug: string
}

function collectPostRefs(resume: Resume): PostRef[] {
  const refs: PostRef[] = []

  if (resume.bio.post) {
    refs.push({ source: 'bio.post', slug: resume.bio.post })
  }

  resume.jobs.forEach((job, i) => {
    if (job.post) {
      refs.push({ source: `jobs[${i}].post`, slug: job.post })
    }

    job.highlights.forEach((highlight, j) => {
      if (highlight.post) {
        refs.push({
          source: `jobs[${i}].highlights[${j}].post`,
          slug: highlight.post,
        })
      }
    })
  })

  resume.projects.forEach((project, i) => {
    if (project.post) {
      refs.push({ source: `projects[${i}].post`, slug: project.post })
    }
  })

  resume.achievements.forEach((achievement, i) => {
    if (achievement.post) {
      refs.push({ source: `achievements[${i}].post`, slug: achievement.post })
    }
  })

  return refs
}

async function getPostSlugs(): Promise<string[]> {
  const entries = await readdir(POSTS_DIR, { recursive: true })

  return entries
    .filter((entry) => entry.endsWith('.md'))
    .map((entry) => entry.replace(/\.md$/, '').split(path.sep).join('/'))
}

// Matches markdown links and images: ![alt](target) and [text](target).
const MARKDOWN_LINK = /!?\[[^\]]*\]\(([^)\s]+)(?:\s[^)]*)?\)/g

function isExternal(target: string): boolean {
  return /^([a-z][a-z0-9+.-]*:|#)/i.test(target)
}

async function checkPostFiles(slugs: string[], problems: string[]) {
  for (const slug of slugs) {
    const postFile = path.join(POSTS_DIR, `${slug}.md`)
    const markdown = await readFile(postFile, 'utf-8')

    for (const match of markdown.matchAll(MARKDOWN_LINK)) {
      const target = match[1]

      if (isExternal(target) || target.startsWith('/')) continue

      const resolved = path.resolve(path.dirname(postFile), target)

      try {
        await access(resolved)
      } catch {
        problems.push(
          `posts/${slug}.md: broken relative link "${target}" (resolves to ${path.relative(CONTENT_DIR, resolved)})`,
        )
      }
    }
  }
}

export async function validateContent(resume: Resume): Promise<void> {
  const problems: string[] = []
  const slugs = await getPostSlugs()
  const slugSet = new Set(slugs)

  // Duplicate slugs. Slugs are file paths so exact duplicates cannot occur,
  // but case-insensitive collisions break deploys to case-insensitive hosts.
  const seen = new Map<string, string>()
  for (const slug of slugs) {
    const key = slug.toLowerCase()
    const existing = seen.get(key)

    if (existing) {
      problems.push(`duplicate post slug: "${existing}" and "${slug}"`)
    } else {
      seen.set(key, slug)
    }
  }

  for (const ref of collectPostRefs(resume)) {
    if (!slugSet.has(ref.slug)) {
      problems.push(
        `resume.yaml: ${ref.source} references missing post "${ref.slug}"`,
      )
    }
  }

  await checkPostFiles(slugs, problems)

  if (problems.length > 0) {
    throw new Error(
      `Invalid content references:\n${problems.map((p) => `  ${p}`).join('\n')}`,
    )
  }
}
