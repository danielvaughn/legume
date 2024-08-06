import { Storage, TransferManager } from '@google-cloud/storage'

const storage = new Storage()

export async function createBucket(bucketName: string) {
  await storage.createBucket(bucketName)
}

export async function getFileContents(file: string): Promise<string> {
  console.log(`getting files from ${import.meta.env._CONTENT_BUCKET} GCS bucket`)
  const remoteFile = await storage.bucket(import.meta.env._CONTENT_BUCKET).file(file).download()
  return remoteFile.toString()
}

export async function uploadFile(filePath: string, file: File) {
  const bucket = storage.bucket(import.meta.env._CONTENT_BUCKET)

  const blob = bucket.file(filePath)
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
