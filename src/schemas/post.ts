import { z } from "astro:content";

export type PureSlug = string;

export const PostFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()),
  categories: z.array(z.string()).optional(),
  abbrlink: z.string().optional(),
  date: z.date(),
  updated: z.date().optional(),
  license: z.string().optional(),
  licenseLink: z.string().optional(),
});

export const PostSchema = z.object({
  data: PostFrontmatterSchema,
  slug: z.string(),
  body: z.string(),
});

export const PostSnapshotSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  pureSlug: z.string(),
  href: z.string(),
  date: z.string(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
export type Post = z.infer<typeof PostSchema>;
export type PostSnapshot = z.infer<typeof PostSnapshotSchema>;
