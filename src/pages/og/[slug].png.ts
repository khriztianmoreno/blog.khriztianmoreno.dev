import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage, formatDateForOg } from "@/utils/og-image.tsx";
import { getPureSlugFromSlug, getLangFromSlug } from "@/utils/post";
import { defaultLang } from "@/utils/i18n";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts");

  // Filter to get unique slugs - prefer default language version
  const seenSlugs = new Set<string>();
  const uniquePosts = posts.filter((post) => {
    const pureSlug = getPureSlugFromSlug(post.slug);
    const lang = getLangFromSlug(post.slug);

    if (seenSlugs.has(pureSlug)) {
      return false;
    }

    // Prefer the default language version
    if (lang === defaultLang) {
      seenSlugs.add(pureSlug);
      return true;
    }

    // Check if there's a default language version
    const hasDefaultLang = posts.some(
      (p) => getPureSlugFromSlug(p.slug) === pureSlug && getLangFromSlug(p.slug) === defaultLang
    );

    if (!hasDefaultLang) {
      seenSlugs.add(pureSlug);
      return true;
    }

    return false;
  });

  return uniquePosts.map((post) => {
    const pureSlug = getPureSlugFromSlug(post.slug);
    return {
      params: { slug: pureSlug },
      props: {
        title: post.data.title,
        date: formatDateForOg(post.data.date),
        tags: post.data.tags,
      },
    };
  });
};

export const GET: APIRoute = async ({ props }) => {
  const { title, date, tags } = props as {
    title: string;
    date: string;
    tags: string[];
  };

  const png = await generateOgImage({
    title,
    date,
    tags,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

