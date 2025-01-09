import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const INTERNAL_LINK_REGEX = new RegExp(/^\/(?!\/)[^?\n]+(.)*$/);
const EventCategory = z.enum(["uveghuta-kupa"]);
const EventMetaKey = z.enum(["Limitált indulási létszám", "Versenykiírás"]);
const EventRelatedPostType = z.enum(["elevation-map", "competition-announcement", "results", "photos"]);

const news = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.date(),
    featuredImage: z.string().optional(),
    draft: z.boolean().optional(),
    includeInNews: z.boolean().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/data/rendezvenyek" }),
  schema: z.object({
    type: EventCategory,
    title: z.string(),
    featuredImage: z.string().optional(),
    excerpt: z.string(),
    year: z.number(),
    pubDate: z.date(),
    draft: z.boolean().optional(),
    includeInNews: z.boolean().optional(),
    eventMeta: z.object({ key: EventMetaKey, value: z.string().or(z.number()) }).array().optional(),
    links: z.object({ name: z.string(), url: z.string().url().or(z.string().regex(INTERNAL_LINK_REGEX)) }).array().optional(),
    relatedPosts: z.array(reference('relatedPosts')).default([]),
  }),
});

const relatedPosts = defineCollection({
  loader: glob({ pattern: "**/+(!(index)).md", base: "./src/data/rendezvenyek" }),
  schema: z.object({
    type: EventRelatedPostType,
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.date(),
    content: z.object({
      url: z.string().url().optional(),
      embedUrl: z.string().url().optional(),
      downloadUrl: z.string().url().optional(),
      image: z.string().optional(),
      photos: z.array(z.object({
        title: z.string(),
        url: z.string().url(),
      })).optional(),
    }),
    // parent: reference('events'),
    featuredImage: z.string().optional(),
    draft: z.boolean().optional(),
    includeInNews: z.boolean().optional(),
  }),
});

const biketrips = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/kerekparturak-a-bukkben" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.date(),
    featuredImage: z.string().optional(),
    tags: z.string().array(),
    sortOrder: z.number(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { biketrips, events, news, relatedPosts };
