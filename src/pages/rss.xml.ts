import rss from '@astrojs/rss'
import { getPostTitle, getPublishedPosts } from '../utils/posts'
import { getResume } from '../utils/resume'
import { getSiteConfig } from '../utils/site'

export async function GET() {
  const site = await getSiteConfig()
  const resume = await getResume()
  const posts = await getPublishedPosts()

  // Newest dated posts first; undated posts keep their collection order at
  // the end.
  const sorted = [...posts].sort((a, b) => {
    const aTime = a.data.date?.getTime()
    const bTime = b.data.date?.getTime()

    if (aTime === undefined && bTime === undefined) return 0
    if (aTime === undefined) return 1
    if (bTime === undefined) return -1
    return bTime - aTime
  })

  return rss({
    title: site.title,
    description: site.description,
    site: site.canonical_url,
    items: sorted.map((post) => ({
      title: getPostTitle(resume, post),
      link: `/resume/${site.publisher_slug}/post/${post.id}/`,
      pubDate: post.data.date,
      description: post.data.summary,
    })),
  })
}
