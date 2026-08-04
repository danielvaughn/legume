import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Content is checked into the repository and read at build time. Logical paths
// retain the existing `${user}/resume.yaml` and `${user}/posts/${slug}.md`
// shape until the content directory and routes are redesigned.
export async function getFileContents(file: string): Promise<string> {
  const [, ...rest] = file.split('/')
  const relative = rest.join('/')

  if (relative === 'resume.yaml') {
    return readFile(path.join(process.cwd(), 'content/resume.yaml'), 'utf-8')
  }

  return readFile(path.join(process.cwd(), 'content', relative), 'utf-8')
}
