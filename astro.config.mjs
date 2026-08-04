import { defineConfig } from 'astro/config';

// Tailwind runs as a PostCSS plugin (postcss.config.mjs); Astro picks the
// config up automatically, so no integration is needed.
// https://astro.build/config
export default defineConfig({
  output: "static",
  devToolbar: {
    enabled: false
  }
});
