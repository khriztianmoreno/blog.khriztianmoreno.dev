import type { PostSnapshot } from "@/schemas/post";
import type { Lang } from "@/utils/i18n";
import { motion, useReducedMotion } from "motion/react";
import DateTag from "./date-tag";
import LabelTag from "./label-tag";

export default function PostCard({
  lang,
  snapshot,
  animate = false,
}: {
  lang: Lang;
  snapshot: PostSnapshot;
  animate?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const initialOpacity = shouldReduceMotion ? 1 : 0;
  const initialX = shouldReduceMotion ? 0 : 10;

  const component = (
    <a
      href={snapshot.href}
      className="p-8 bg-dracula-dark/20 hover:bg-dracula-dark transition cursor-pointer text-pretty flex flex-col gap-4"
    >
      <h2 className="font-bold text-3xl text-dracula-green">
        {snapshot.title}
      </h2>
      <div className="flex flex-wrap gap-2">
        <DateTag lang={lang} date={snapshot.date} />
        {snapshot.tags.map((tag) => (
          <LabelTag lang={lang} label={tag} key={tag} />
        ))}
      </div>
      <p className="overflow-ellipsis break-all line-clamp-3">
        {snapshot.description}
      </p>
    </a>
  );
  return animate ? (
    <motion.div
      initial={{ opacity: initialOpacity, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      {component}
    </motion.div>
  ) : (
    component
  );
}
