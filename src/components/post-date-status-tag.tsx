import { getColor } from "@/utils/date";
import { type Lang, useTranslations } from "@/utils/i18n";

export default function PostDateStatusTag({ lang, diffInDays }: { lang: Lang; diffInDays: number }) {
  const t = useTranslations(lang);
  const color = getColor(diffInDays);

  if (color === "orange") return null;
  // `text-dracula-green` and `text-dracula-red` must be in the form of literals,
  // otherwise the associated classes will not be packaged
  return (
    <code className="inline-block bg-dracula-dark/30 px-2 py-1">
      {color === "green" ? (
        <span className="text-dracula-green">{t("post.newlyUpdatedMsg")}</span>
      ) : color === "red" ? (
        <span className="text-dracula-red">{t("post.oldPostWarningMsg")}</span>
      ) : undefined}
    </code>
  );
}
