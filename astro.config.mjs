import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  security: {
    checkOrigin: true,
  },
  vite: {
    plugins: [yaml()],
  },
  devToolbar: {
    enabled: false,
  },
});