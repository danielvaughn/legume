import { defineConfig } from 'astro/config';
import yaml from "@rollup/plugin-yaml";

// Tailwind runs as a PostCSS plugin (postcss.config.mjs); Astro picks the
// config up automatically, so no integration is needed.
// https://astro.build/config
export default defineConfig({
  output: "static",
  vite: {
    plugins: [yaml()]
  },
  devToolbar: {
    enabled: false
  }
});
