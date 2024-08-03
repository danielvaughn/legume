
interface Bio {
  name: string
  email: string
  phone: string
  city: string
  state: string
  country: string
  linkedin: string
  github: string
  website: string
  post: string | null
  skills: {
    [key:string]: string[]
  } | null
}

interface Project {
  project_name: string
  project_url: string
  title: string
  post: string | null
}

interface Education {
  institution: string
  institution_url: string
  degree: string
  major: string
  start_month: number
  start_year: number
  end_month: number | null
  end_year: number | null
}

interface Highlight {
  title: string
  post: string | null
  skills: string[]
}

interface Job {
  company_name: string
  company_url: string
  role: string
  start_month: number
  start_year: number
  end_month: number | null
  end_year: number | null
  post: string | null
  highlights: Highlight[]
}

interface Resume {
  bio: Bio
  jobs: Job[]
  education: Education[]
  projects: Project[]
}

declare module "*.yaml" {
  const resume: Resume;
  export default resume;
}