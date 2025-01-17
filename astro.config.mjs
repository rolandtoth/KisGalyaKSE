// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { targetBlank } from './src/plugins/targetBlank';

// https://astro.build/config
export default defineConfig({
  // prefetch: {
  //   prefetchAll: false,
  //   defaultStrategy: 'hover',
  // },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [[targetBlank, { domain: 'kisgalya.hu' }]],
  },
});
