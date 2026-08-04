
import { getCollection, type CollectionEntry } from 'astro:content'
import type { Highlight } from '../schemas/resume'

// Draft posts are visible during development but excluded from production
// builds.
export function isPublished(post: CollectionEntry<'posts'>): boolean {
  return import.meta.env.DEV || !post.data.draft
}

export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts')
  return posts.filter(isPublished)
}

interface BioData {
  type: 'bio'
  data: Bio
}

interface JobData {
  type: 'job'
  data: Job
}

interface HighlightData {
  type: 'highlight'
  data: {
    job: Job
    highlight: Highlight
  }
}

interface ProjectData {
  type: 'project'
  data: Project
}

type ResumePartial = BioData | JobData | HighlightData | ProjectData

export function getResumePartialByPost(resume: Resume, post: string): ResumePartial {
  let result: ResumePartial | null = null;

  for (const job of resume.jobs) {
    if (job.post === post) {
      result = {
        type: 'job',
        data: job,
      };
    }

    for (const highlight of job.highlights) {
      if (highlight.post === post) {
        result = {
          type: 'highlight',
          data: {
            job,
            highlight,
          },
        };
      }
    }
  }

  for (const project of resume.projects) {
    if (project.post === post) {
      result = {
        type: 'project',
        data: project,
      };
    }
  }

  if (!result) {
    result = {
      type: 'bio',
      data: resume.bio,
    };
  }

  return result;
}

// The title shown for a post: frontmatter wins, otherwise derive one from
// the résumé entry that references the post.
export function getPostTitle(
  resume: Resume,
  post: CollectionEntry<'posts'>,
): string {
  if (post.data.title) return post.data.title

  const partial = getResumePartialByPost(resume, post.id)

  switch (partial.type) {
    case 'job':
      return `${partial.data.role} at ${partial.data.company_name}`
    case 'highlight':
      return partial.data.highlight.title
    case 'project':
      return partial.data.title
    case 'bio':
      return resume.bio.name
  }
}
