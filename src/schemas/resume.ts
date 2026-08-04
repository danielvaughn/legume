import { z } from 'astro/zod'

// The résumé schema is the source of truth for what publisher content must
// look like. Required fields are those the templates render unconditionally;
// everything else is explicitly optional or nullable.

const postRef = z.string().min(1)

const month = z.number().int().min(1).max(12)
const year = z.number().int().min(1900).max(2100)

const dateRange = {
  start_month: month,
  start_year: year,
  end_month: month.nullish().default(null),
  end_year: year.nullish().default(null),
}

export const bioSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  linkedin: z.string().url(),
  github: z.string().url(),
  website: z.string().url().optional(),
  post: postRef.nullish().default(null),
  skills: z.record(z.string(), z.array(z.string())).nullish().default(null),
})

export const highlightSchema = z.object({
  title: z.string().min(1),
  post: postRef.nullish().default(null),
  skills: z.array(z.string()).default([]),
})

export const jobSchema = z.object({
  company_name: z.string().min(1),
  company_url: z.string().url().nullish().default(null),
  role: z.string().min(1),
  ...dateRange,
  post: postRef.nullish().default(null),
  highlights: z.array(highlightSchema).default([]),
})

export const educationSchema = z.object({
  institution: z.string().min(1),
  institution_url: z.string().url().nullish().default(null),
  degree: z.string().min(1),
  major: z.string().optional(),
  ...dateRange,
})

export const projectSchema = z.object({
  project_name: z.string().min(1),
  project_url: z.string().url().nullish().default(null),
  title: z.string().min(1),
  post: postRef.nullish().default(null),
})

export const achievementSchema = z.object({
  title: z.string().min(1),
  post: postRef.nullish().default(null),
})

export const resumeSchema = z.object({
  bio: bioSchema,
  jobs: z.array(jobSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  achievements: z.array(achievementSchema).default([]),
})

export type Bio = z.infer<typeof bioSchema>
export type Highlight = z.infer<typeof highlightSchema>
export type Job = z.infer<typeof jobSchema>
export type Education = z.infer<typeof educationSchema>
export type Project = z.infer<typeof projectSchema>
export type Achievement = z.infer<typeof achievementSchema>
export type Resume = z.infer<typeof resumeSchema>
