import { getDiffInDays } from "@/utils/date";
import { type Lang, useTranslations } from "@/utils/i18n";
import DateTag from "./date-tag";
import PostDateStatusTag from "./post-date-status-tag";

export default function DateRelatedTags({
  lang,
  publishedAt,
  updatedAt,
}: {
  lang: Lang;
  publishedAt: string;
  updatedAt?: string;
}) {
  const t = useTranslations(lang);
  const latestDate = updatedAt || publishedAt;
  const diffInDays = getDiffInDays(new Date(), latestDate);

  return (
    <>
      <DateTag lang={lang} date={publishedAt} type="published" />
      {updatedAt && <DateTag lang={lang} date={updatedAt} type="updated" />}
      <PostDateStatusTag lang={lang} diffInDays={diffInDays} />
    </>
  );
}
