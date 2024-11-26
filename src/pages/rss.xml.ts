import { getCollection } from "astro:content";
import { SITE } from "@/config.ts";
import { AUTHOR } from "@/config.ts";
import type { Post } from "@/schemas/post";
import { getDescFromMdString } from "@/utils/markdown";
import { getLangFromSlug, getPureSlugFromSlug } from "@/utils/post";
import rss from "@astrojs/rss";

export async function GET(context: any) {
  const posts = await getCollection("posts");
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post: Post) => {
      const lang = getLangFromSlug(post.slug);
      const pureSlug = getPureSlugFromSlug(post.slug);
      return {
        title: post.data.title,
        description: getDescFromMdString(post.body),
        author: AUTHOR.name,
        pubDate: post.data.date,
        link: `${lang}/posts/${pureSlug}`,
      };
    }),
    stylesheet: "/rss.xsl",
  });
}
