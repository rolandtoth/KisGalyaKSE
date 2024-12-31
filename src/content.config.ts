import {defineCollection, z} from 'astro:content';

import {glob} from 'astro/loaders';

const events = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/data/events"}),
  schema: z.object({
    type: z.enum(['uveghuta-kupa']),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    year: z.number(),
    pubDate: z.date(),
  }),
});

export const collections = {events};
