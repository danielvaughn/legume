import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { Storage, TransferManager } from '@google-cloud/storage'

const storage = new Storage()

export async function createBucket(bucketName: string) {
  await storage.createBucket(bucketName)
}

// Local development doesn't have GCS credentials, so read the sample content
// that's checked into the repo instead of the bucket. Bucket keys look like
// `${user}/resume.yaml` or `${user}/posts/${slug}.md`.
async function getLocalFileContents(file: string): Promise<string> {
  const [user, ...rest] = file.split('/')
  const relative = rest.join('/')

  if (relative === 'resume.yaml') {
    return readFile(path.join(process.cwd(), 'src/data', `${user}.yaml`), 'utf-8')
  }

  // posts/<slug>.md -> src/content/posts/<slug>.md
  return readFile(path.join(process.cwd(), 'src/content', relative), 'utf-8')
}

export async function getFileContents(file: string): Promise<string> {
  if (import.meta.env.DEV) {
    return getLocalFileContents(file)
  }

  const bucket = import.meta.env.PROD ? 'legume-prod' : 'legume-nonprod'

  const remoteFile = await storage.bucket(bucket).file(file).download()
  return remoteFile.toString()
}

export async function uploadFile(filePath: string, file: File) {
  let bucket: string | null = null

  if (import.meta.env.PROD) {
    bucket = 'legume-prod'
  } else {
    bucket = 'legume-nonprod'
  }

  const blob = await storage.bucket(bucket).file(filePath)
  const blobStream = blob.createWriteStream()
  const fileBuffer = await file.arrayBuffer()

  return new Promise<Response>((resolve, reject) => {
    blobStream.on('error', (err: Error) => {
      console.error(err)
      reject(new Response(JSON.stringify({ error: 'Upload failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }))
    })

    blobStream.on('finish', () => {
      resolve(new Response(JSON.stringify({ message: 'Upload successful' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }))
    })

    blobStream.end(Buffer.from(fileBuffer))
  })
}

// Not used but want to keep around in case I figure out how to do this with File objects
export async function transferFiles(bucketName: string, filePaths: string[]) {
  const transferManager = new TransferManager(storage.bucket(bucketName))

  try {
    await transferManager.uploadManyFiles(filePaths)

    for (const filePath of filePaths) {
      console.log(`${filePath} uploaded to ${bucketName}.`)
    }
  } catch (error) {
    console.error(error)
  }
}
