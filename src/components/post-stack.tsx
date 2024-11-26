import Fuse from "fuse.js";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import type { PostSnapshot } from "@/schemas/post";
import { type Lang, useTranslations } from "@/utils/i18n";
import PostCard from "./post-card";

const fuseOptions = {
  keys: ["slug", "title", "description", "tags"],
};

export default function PostStack({
  lang,
  snapshots,
}: {
  lang: Lang;
  snapshots: PostSnapshot[];
}) {
  const t = useTranslations(lang);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const numberOfPosts = snapshots.length;

  let results: PostSnapshot[] = [];
  if (debouncedQuery === "") {
    results = snapshots;
  } else {
    const fuse = new Fuse(snapshots, fuseOptions);
    results = fuse
      .search(debouncedQuery)
      .map((result) => result.item)
      .slice(0, 5);
  }

  function handleOnSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder={t("search.placeholder.firstPart") + numberOfPosts + t("search.placeholder.secondPart.post")}
          className="bg-dracula-dark/20 placeholder-dracula-blue 
                    text-dracula-light focus:outline-none focus:bg-dracula-dark 
                    hover:bg-dracula-dark px-8 py-4 transition"
          value={query}
          onChange={handleOnSearch}
        />
      </div>
      {results.length > 0 ? (
        results.map((snapshot) => <PostCard lang={lang} snapshot={snapshot} animate={true} key={snapshot.pureSlug} />)
      ) : (
        <p>{t("search.noResults")}</p>
      )}
    </div>
  );
}
