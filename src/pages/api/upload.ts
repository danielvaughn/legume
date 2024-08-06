import path from 'node:path'
import type { APIRoute } from 'astro'
import { uploadFile } from '../../utils/storage'

export const POST: APIRoute = async ({ request }) => {
  const userId = 'danielvaughn'

  try {
    const formData = await request.formData()

    const filePaths: string[] = []
    const files: File[] = []

    for (const [key, data] of formData.entries()) {
      if (key === 'paths') {
        filePaths.push(data as 'string')
      }

      if (key === 'files') {
        files.push(data as File)
      }
    }

    filePaths.forEach(async (filePath, index) => {
      if (files[index]) {
        await uploadFile(path.join(userId, filePath), files[index])
      }
    })

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
