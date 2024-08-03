import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import yaml from "@rollup/plugin-yaml";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
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