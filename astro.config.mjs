import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "static",
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
