# Publisher content

This directory contains everything owned by the person publishing a Legumé
site. It is the content boundary between a publisher's identity and writing and
the reusable application code in `src/`.

The intended structure is:

```text
content/
├── resume.yaml    # Bio, skills, experience, education, and projects
├── posts/         # Long-form Markdown stories
└── images/        # Images referenced by the résumé or posts
```

Publishers should be able to replace or edit files in this directory without
changing components, routes, utilities, or build configuration. Legumé reads
these files during development and compiles them into the static `dist/`
directory during a production build.

Application source must not contain publisher-specific identity, contact
details, prose, or media. Site-wide configuration will be added separately from
the résumé content once its schema is defined.
