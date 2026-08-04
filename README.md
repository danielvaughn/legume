# Legumé

A file-based publishing template for a résumé and the stories behind it,
built with [Astro](https://astro.build). Each installation represents one
publisher. Structured data, Markdown, and images are compiled into a portable
static website that can be hosted anywhere.

The repository is the CMS. There is no database, no authentication, no
publishing API, and no server runtime — `npm run build` produces a
self-contained `dist/` directory you can serve from any static host.

## Getting started

```
git clone git@github.com:danielvaughn/legume.git
cd ./legume
npm install
npm run dev
```

## Making it your own

Everything a publisher owns lives in the `content/` directory — you should
never need to edit `src/` to customize your site. See
[`content/README.md`](content/README.md) for the full description of the
content boundary.

To replace the example content with your own:

1. **`content/site.yaml`** — set your site's title, description, canonical
   URL, language, and author name. The résumé is the home page; posts live
   at `/posts/<slug>`.
2. **`content/resume.yaml`** — replace the example résumé with your bio,
   contact details, skills, jobs, and education. A job or highlight can link
   to a long-form story by setting its `post:` field to a post's slug.
3. **`content/posts/`** — delete the example Markdown posts and add your own.
   A post's slug is its file path relative to `posts/`, without the `.md`
   extension (`posts/my-story.md` → slug `my-story`).
4. **`content/images/`** — replace the example images with any referenced by
   your posts. Reference them by relative path (e.g. `../images/photo.jpg`)
   and they are optimized automatically at build time.

Preview with `npm run dev`, then run `npm run build` and deploy the `dist/`
directory to the static host of your choice.
