
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
