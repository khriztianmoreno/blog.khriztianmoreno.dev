import { defineCollection } from "astro:content";
import { PostFrontmatterSchema } from "@/schemas/post";

const postsCollection = defineCollection({
  type: "content",
  schema: PostFrontmatterSchema,
});

const infoCollection = defineCollection({
  type: "content",
});

export const collections = {
  posts: postsCollection,
  info: infoCollection,
};
