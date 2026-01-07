import { defineMiddleware, sequence } from "astro:middleware";
import { defaultLang } from "@/utils/i18n";

export const userMiddleware = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname;
  const response = await next();
  if (
    path.startsWith("/en") ||
    path.startsWith("/es") ||
    path.startsWith("/posts") ||
    path.startsWith("/og") ||
    path.startsWith("/rss.xml") ||
    path.startsWith("/robots.txt")
  ) {
    return response;
  }
  return ctx.rewrite(`/${defaultLang}${path}`);
});

export const onRequest = sequence(userMiddleware);
