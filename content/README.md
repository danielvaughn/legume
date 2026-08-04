# Publisher content

This directory contains everything owned by the person publishing a Legumé
site. It is the content boundary between a publisher's identity and writing
and the reusable application code in `src/`.

```text
content/
├── site.yaml      # Site identity, URL, language, and metadata
├── resume.yaml    # Bio, skills, experience, education, projects, achievements
├── posts/         # Long-form Markdown stories
└── images/        # Images referenced by posts
```

Publishers should be able to replace or edit files in this directory without
changing components, routes, utilities, or build configuration. Legumé reads
these files during development and compiles them into the static `dist/`
directory during a production build. Application source must not contain
publisher-specific identity, contact details, prose, or media.

Every file is validated against a schema during development and builds
(`src/schemas/`). Invalid content stops the build with an error naming the
file and field. The starter files in this directory exercise every supported
field and double as working examples.

## site.yaml

| Field           | Required | Purpose                                            |
| --------------- | -------- | -------------------------------------------------- |
| `title`         | yes      | Site title; prefixes every page title              |
| `description`   | yes      | Default meta description                           |
| `canonical_url` | yes      | Absolute base URL of the deployed site             |
| `language`      | yes      | `lang` attribute for every page (e.g. `en`)        |
| `author`        | yes      | Author meta tag                                    |
| `social_image`  | no       | Path in `public/` used for social sharing previews |

## resume.yaml

Top-level keys: `bio` (required), `jobs`, `education`, `projects`, and
`achievements` (all optional lists; empty sections are not rendered).

**bio** — `name`, `email`, `phone`, `linkedin`, and `github` are required and
render in the site header. `city`, `state`, `country`, and `website` are
optional. `post` optionally links the name to a long-form introduction.
`skills` is an optional map of group name → list of skills; groups render in
the Skills section under their map key.

**jobs[]** — `company_name`, `role`, `start_month`, and `start_year` are
required. `company_url` is optional (without it the company renders as plain
text). Leave `end_month`/`end_year` empty for a current role; they must be
provided together, and the end may not precede the start. `post` optionally
links the role to a story. `highlights` is an optional list of
`{ title, post?, skills? }` bullets.

**education[]** — `institution`, `degree`, and the same date rules as jobs.
`institution_url` and `major` are optional.

**projects[]** — `project_name` and `title` (a one-line description) are
required; `project_url` and `post` are optional.

**achievements[]** — `title` is required; `post` is optional.

Every `post:` value is a bare slug: the path of a file under `posts/`
without the `.md` extension (`posts/acme-summary.md` → `acme-summary`,
nested folders become `folder/slug`). The build fails if a referenced post
does not exist or is still a draft.

## Posts

A bare Markdown file is a valid post. All frontmatter fields are optional:

```yaml
---
title: Shown as the page title (falls back to the résumé entry that links here)
summary: A short description, used in listings, feeds, and page metadata
draft: true          # visible in development, excluded from production builds
date: 2024-05-01     # publication date
updated: 2024-06-01  # last-updated date
order: 1             # manual ordering for post listings
---
```

All published posts are listed at `/posts`. Posts given any descriptive
frontmatter (title, summary, date, or order) are treated as curated and the
top three also appear in the Writing section of the home page.

Posts support standard Markdown: headings (with generated anchor links),
lists, code blocks, links, and images. Reference images by relative path
(`../images/photo.png`); they are optimized automatically at build time, and
a missing image fails the build. An emphasized line placed directly after an
image (`*like this*`) renders as its caption. Raw HTML in Markdown is
rendered as-is — the publisher owns this repository, so post content is
trusted by design. Published posts are also listed in an RSS feed at
`/rss.xml`.

Linking posts to résumé entries is done from `resume.yaml` (the `post:`
fields), not from frontmatter, so the résumé stays the single source of
truth.
