import rss from '@astrojs/rss'
import { getPostTitle, getPublishedPosts, sortPosts } from '../utils/posts'
import { getResume } from '../utils/resume'
import { getSiteConfig } from '../utils/site'

export async function GET() {
  const site = await getSiteConfig()
  const resume = await getResume()
  const sorted = sortPosts(await getPublishedPosts())

  return rss({
    title: site.title,
    description: site.description,
    site: site.canonical_url,
    items: sorted.map((post) => ({
      title: getPostTitle(resume, post),
      link: `/posts/${post.id}/`,
      pubDate: post.data.date,
      description: post.data.summary,
    })),
  })
}
