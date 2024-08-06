import { parse } from 'yaml'
import { getFileContents } from './storage'

export async function getResume(filePath: string): Promise<Resume> {
  try {
    const file = await getFileContents(filePath)
    const data = parse(file)

    return data

  } catch (error) {
    console.error(error)
    throw error
  }
}
