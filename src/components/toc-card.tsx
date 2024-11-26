import { MISC } from "@/config";
import { type Lang, useTranslations } from "@/utils/i18n";
import type { MarkdownHeading } from "astro";
import { useEffect, useState } from "react";

export default function TocCard({
  headings,
  lang,
}: {
  headings: MarkdownHeading[];
  lang: Lang;
}) {
  const t = useTranslations(lang);
  const filtered = headings.filter((heading) => heading.depth > 1 && heading.depth < 4);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -35% 0px",
    });

    for (const heading of filtered) {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [filtered]);

  if (filtered.length <= MISC.toc.minHeadings) return null;

  return (
    <div className="flex p-8 bg-dracula-dark/20 flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("toc")}</h2>
      <ul className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.map((heading) => (
          <li key={heading.slug} style={{ marginLeft: `${heading.depth - 2}rem` }}>
            <a
              href={`#${heading.slug}`}
              className={`
                                underline underline-offset-4 
                                hover:text-dracula-pink transition
                                ${activeId === heading.slug ? "text-dracula-pink" : ""}
                            `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
