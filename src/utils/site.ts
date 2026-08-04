import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

export interface SiteConfig {
  title: string
  description: string
  canonical_url: string
  language: string
  author: string
  publisher_slug: string
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const file = await readFile(
    path.join(process.cwd(), 'content/site.yaml'),
    'utf-8',
  )

  return parse(file) as SiteConfig
}
