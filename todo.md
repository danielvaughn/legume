# Legumé Roadmap

Legumé is a file-based publishing template for a résumé and the stories
behind it. Each installation represents one publisher. Structured data,
Markdown, and images are compiled into a portable static website that can be
hosted anywhere.

The repository is the CMS. Legumé does not require a database, authentication,
a publishing API, a CLI, or a server runtime.

## 1. Establish the static architecture

- [ ] Change Astro from server output to static output.
- [ ] Remove the Node server adapter and unused hosting adapters.
- [ ] Remove the registration and upload API routes.
- [ ] Remove API-key authentication.
- [ ] Remove Google Cloud Storage and all remote-content code.
- [ ] Remove server-only dependencies.
- [ ] Remove the Cloud Run build and deployment configuration.
- [ ] Confirm `npm run build` produces a self-contained `dist/` directory.
- [ ] Confirm the built site works when served by a basic static file server.

### Complete when

The site builds without credentials or network access and `dist/` contains
everything required to view it.

## 2. Define the content boundary

- [ ] Create one clearly documented directory for publisher-owned content.
- [ ] Move the résumé data, Markdown posts, and images into that directory.
- [ ] Add site-level configuration for title, description, canonical URL,
      language, and other metadata.
- [ ] Remove hardcoded references to `danielvaughn` and personal contact data
      from components and routes.
- [ ] Decide which example content ships with the template.
- [ ] Document how someone replaces the example content with their own.

### Complete when

A new publisher can customize the site by editing content and configuration
without modifying application code.

## 3. Model and validate the résumé

- [ ] Define a schema for bio, contact details, skills, experience, education,
      projects, achievements, and post references.
- [ ] Make optional and required fields explicit.
- [ ] Validate the résumé during development and builds.
- [ ] Report useful errors with the source file and invalid field.
- [ ] Validate dates and render all date ranges from content data.
- [ ] Validate that every referenced post and image exists.
- [ ] Detect duplicate post slugs and broken internal links.
- [ ] Add representative valid and invalid schema fixtures.

### Complete when

Invalid content stops the build with an actionable error, and templates do not
silently assume missing or hardcoded values.

## 4. Build the publishing model

- [ ] Adopt Astro content collections for build-time content loading.
- [ ] Define Markdown frontmatter for title, summary, publication status,
      ordering, dates, and related résumé entries.
- [ ] Generate every post route at build time.
- [ ] Support draft posts in development while excluding them from production.
- [ ] Support local images and optimized image output.
- [ ] Support safe Markdown rendering, including headings, lists, code, links,
      and captions.
- [ ] Generate stable heading anchors and sensible page metadata.
- [ ] Add an RSS or Atom feed for published writing.

### Complete when

Adding a valid Markdown file and referencing it from the résumé is enough to
publish a linked story in the next build.

## 5. Design the single-publisher site

- [ ] Replace `/resume/:user` with routes appropriate to one publisher per
      build.
- [ ] Decide whether the résumé is the home page or lives at `/resume`.
- [ ] Create a useful home page that explains the publisher and surfaces recent
      or featured writing.
- [ ] Render all supported résumé sections, including projects.
- [ ] Add post index, post detail, not-found, and error states.
- [ ] Add consistent navigation between the home page, résumé, and posts.
- [ ] Make external links, contact links, and downloadable resources derive
      from publisher content.
- [ ] Verify responsive, dark-mode, keyboard, and screen-reader behavior.
- [ ] Add print styles for a clean paper résumé.

### Complete when

The generated site feels complete as both a professional résumé and a small
career-focused publication on mobile, desktop, screen, and paper.

## 6. Make the template reusable

- [ ] Separate publisher content from template source in the repository layout.
- [ ] Provide minimal starter content that demonstrates every supported field.
- [ ] Add documented theme tokens for color, typography, spacing, and identity.
- [ ] Provide favicon, social-card, and metadata customization.
- [ ] Document local development, content authoring, validation, building, and
      static deployment.
- [ ] Document the content schema with complete examples.
- [ ] Add a clean-start checklist for new publishers.
- [ ] Ensure the template name and example identity do not leak into generated
      sites unless configured.

### Complete when

Someone unfamiliar with the codebase can clone the repository, replace the
example content, preview it locally, and produce their own static site using the
README alone.

## 7. Add confidence and deployment examples

- [ ] Add unit tests for schema validation, date formatting, and content
      reference resolution.
- [ ] Add build tests for representative publisher fixtures.
- [ ] Add checks for broken links and missing assets in `dist/`.
- [ ] Add formatting, type-checking, testing, and static-build checks to CI.
- [ ] Document deployment of `dist/` to at least one static host.
- [ ] Keep hosting-specific configuration optional and outside the core build.
- [ ] Verify the site works beneath a configurable base path.

### Complete when

Every change is automatically checked against a valid static build, and the
output can be deployed without a Node process or provider-specific backend.

## Later, only after the template is solid

- [ ] Generate a downloadable PDF as an additional build artifact.
- [ ] Generate social preview images for posts.
- [ ] Support multiple visual themes.
- [ ] Support importing common résumé formats if there is demonstrated demand.
- [ ] Package the template for one-command project scaffolding if manual cloning
      becomes a recurring problem.

These are enhancements, not requirements for the initial static-template
release.
