import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const INTERNAL_LINK_REGEX = new RegExp(/^\/(?!\/)[^?\n]+(.)*$/);
const EventCategory = z.enum(["uveghuta-kupa"]);
const EventMetaKey = z.enum(["Limitált indulási létszám", "Versenykiírás"]);

const events = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/data/events"}),
  schema: z.object({
    type: EventCategory,
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    year: z.number(),
    pubDate: z.date(),
    eventMeta: z.object({key: EventMetaKey, value: z.string().or(z.number())}).array().optional(),
    links: z.object({name: z.string(), url: z.string().url().or(z.string().regex(INTERNAL_LINK_REGEX))}).array().optional(),
  }),
});

export const collections = {events};
