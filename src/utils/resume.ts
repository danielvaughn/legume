import { parse } from 'yaml'
import { getFileContents } from './content'
import { resumeSchema, type Resume } from '../schemas/resume'
import { validateContent } from './validate'

export async function getResume(filePath: string): Promise<Resume> {
  const file = await getFileContents(filePath)
  const data = parse(file)

  const result = resumeSchema.safeParse(data)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n')

    throw new Error(`Invalid résumé in content/resume.yaml:\n${issues}`)
  }

  await validateContent(result.data)

  return result.data
}
