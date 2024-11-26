import { type Lang, useTranslations } from "@/utils/i18n";

export default function LicenseTag({ lang, license, link }: { lang: Lang; license: string; link: string }) {
  const t = useTranslations(lang);
  return (
    <a href={link} target="_blank" rel="noreferrer nofollow">
      <code className="inline-block bg-dracula-dark/30 px-2 py-1 hover:bg-dracula-dark transition">
        <span className="text-dracula-cyan">{t("post.license")}</span> <span>{license}</span>
      </code>
    </a>
  );
}
