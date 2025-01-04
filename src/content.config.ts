import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const INTERNAL_LINK_REGEX = new RegExp(/^\/(?!\/)[^?\n]+(.)*$/);
const EventCategory = z.enum(["uveghuta-kupa"]);
const EventMetaKey = z.enum(["Limitált indulási létszám", "Versenykiírás"]);

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.date(),
    draft: z.boolean().optional(),
    includeInNews: z.boolean().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/rendezvenyek" }),
  schema: z.object({
    type: EventCategory,
    title: z.string(),
    featuredImage: z.string(),
    excerpt: z.string(),
    year: z.number(),
    pubDate: z.date(),
    draft: z.boolean().optional(),
    includeInNews: z.boolean().optional(),
    eventMeta: z.object({ key: EventMetaKey, value: z.string().or(z.number()) }).array().optional(),
    links: z.object({ name: z.string(), url: z.string().url().or(z.string().regex(INTERNAL_LINK_REGEX)) }).array().optional(),
  }),
});

const biketrips = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/kerekparturak" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    tags: z.string().array(),
    pubDate: z.date(),
    sortOrder: z.number(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { biketrips, events, news };
