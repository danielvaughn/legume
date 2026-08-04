# Publisher content

This directory contains everything owned by the person publishing a Legumé
site. It is the content boundary between a publisher's identity and writing and
the reusable application code in `src/`.

The intended structure is:

```text
content/
├── site.yaml      # Site identity, URL, language, and metadata
├── resume.yaml    # Bio, skills, experience, education, and projects
├── posts/         # Long-form Markdown stories
└── images/        # Images referenced by the résumé or posts
```

Publishers should be able to replace or edit files in this directory without
changing components, routes, utilities, or build configuration. Update
`site.yaml` with the site's title, description, canonical URL, language,
author, and publisher slug. Legumé reads these files during development and
compiles them into the static `dist/` directory during a production build.

## Post frontmatter

A bare Markdown file is a valid post. All frontmatter fields are optional:

```yaml
---
title: Shown as the page title (falls back to the résumé entry that links here)
summary: A short description of the post
draft: true          # visible in development, excluded from production builds
date: 2024-05-01     # publication date
updated: 2024-06-01  # last-updated date
order: 1             # manual ordering for post listings
---
```

Posts support standard Markdown: headings (with generated anchor links),
lists, code blocks, links, and images. An emphasized line placed directly
after an image (`*like this*`) renders as its caption. Raw HTML in Markdown
is rendered as-is — the publisher owns this repository, so post content is
trusted by design. Published posts are also listed in an RSS feed at
`/rss.xml`.

A résumé entry may not reference a draft post: the production build fails
until the post is published or the reference is removed. Linking posts to
résumé entries is done from `resume.yaml` (the `post:` fields), not from
frontmatter, so the résumé stays the single source of truth.

Application source must not contain publisher-specific identity, contact
details, prose, or media.
