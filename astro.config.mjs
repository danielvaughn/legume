import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import yaml from "@rollup/plugin-yaml";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: netlify(),
  security: {
    checkOrigin: true
  },
  vite: {
    plugins: [yaml()]
  },
  devToolbar: {
    enabled: false
  }
});