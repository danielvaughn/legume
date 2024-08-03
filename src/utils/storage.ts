import { Storage } from '@google-cloud/storage'

const storage = new Storage()

export async function createBucket(bucketName: string) {
  await storage.createBucket(bucketName)
}

export async function getFileContents(file: string) {
  const [contents] = await storage.bucket('nonprod-markdown').file(file).download();
  return contents;
}
