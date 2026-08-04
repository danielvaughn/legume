import { getEntry } from 'astro:content'
import type { SiteConfig } from '../schemas/site'

export async function getSiteConfig(): Promise<SiteConfig> {
  const entry = await getEntry('site', 'site')

  if (!entry) {
    throw new Error('content/site.yaml is missing')
  }

  return entry.data
}
