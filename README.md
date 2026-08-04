# Legumé

A file-based publishing template for a résumé and the stories behind it,
built with [Astro](https://astro.build). Each installation represents one
publisher. Structured data, Markdown, and images are compiled into a portable
static website that can be hosted anywhere.

The repository is the CMS. There is no database, no authentication, no
publishing API, and no server runtime — `npm run build` produces a
self-contained `dist/` directory you can serve from any static host.

## Getting started

Requires Node 22.12 or newer.

```sh
git clone git@github.com:danielvaughn/legume.git my-site
cd my-site
npm install
npm run dev
```

The dev server renders the starter publisher, Avery Example. Everything you
see comes from the `content/` directory.

## Making it your own

All publisher-owned content lives in `content/` — you never need to edit
`src/` to customize your site. [`content/README.md`](content/README.md) is
the full schema reference; the starter files demonstrate every supported
field.

1. **`content/site.yaml`** — your site's title, description, canonical URL,
   language, and author. The résumé is the home page; posts live at
   `/posts/<slug>`.
2. **`content/resume.yaml`** — your bio, contact details, skills, jobs,
   education, projects, and achievements. Any entry can link to a long-form
   story by setting its `post:` field to a post's slug.
3. **`content/posts/`** — your Markdown stories. Use `draft: true`
   frontmatter to keep a post out of production while you write it.
4. **`content/images/`** — images referenced by your posts, by relative path
   (`../images/photo.png`). They are optimized automatically at build time.
5. **`public/favicon.svg`** — replace with your own favicon. Optionally add
   a social-card image to `public/` and point `social_image` in `site.yaml`
   at it.

### Validation

Content is validated on every dev-server start and build. A missing required
field, an invalid date range, a reference to a nonexistent or draft post, or
a broken image path stops the build with an error naming the file and field
— a valid build means every link and reference on the site resolves.

### Clean-start checklist

- [ ] Replace `content/site.yaml` with your identity
- [ ] Replace `content/resume.yaml` with your résumé
- [ ] Delete the starter posts in `content/posts/` and write your own
- [ ] Delete `content/images/workbench.png`; add your own images
- [ ] Replace `public/favicon.svg`
- [ ] Optional: add a social-card image and set `social_image`
- [ ] Optional: adjust the theme tokens (below)
- [ ] `npm run build` — if it passes, nothing of the starter identity
      remains in your pages

## Theming

The visual identity is controlled by design tokens in
[`tailwind.config.mjs`](tailwind.config.mjs):

- **`colors.accent`** — link and interaction color (`DEFAULT` for light
  backgrounds, `bright` for dark mode).
- **`fontFamily.body`** — the typeface for the whole site. To change it,
  install a [Fontsource](https://fontsource.org) package, update the import
  at the top of `src/layouts/Layout.astro`, and set the token to match.
- **`maxWidth.content`** — the width of the readable column on every page.

Spacing uses Tailwind's default scale. Dark mode follows the visitor's OS
preference; print styles produce a clean paper résumé (try print preview on
the home page).

## Building and deploying

```sh
npm run build    # type-checks, validates content, writes dist/
npm run preview  # serve dist/ locally
```

Deploy `dist/` to any static host — Netlify, Cloudflare Pages, GitHub Pages,
or an S3 bucket behind a CDN all work. Point the host at:

- **Build command:** `npm run build`
- **Output directory:** `dist`

The generated `404.html` is picked up automatically by most static hosts.
Set `canonical_url` in `site.yaml` to the site's final URL so canonical
links, the RSS feed, and social cards resolve correctly.
