import avatarImage from "@/assets/avatar.webp";
import { motion, useReducedMotion } from "motion/react";
import { AUTHOR, SOCIALS } from "../config";

export default function BusinessCard() {
  const shouldReduceMotion = useReducedMotion();
  const initialOpacity = shouldReduceMotion ? 1 : 0;
  const initialX = shouldReduceMotion ? 0 : 10;

  return (
    <motion.div
      initial={{ opacity: initialOpacity, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      className="p-8 bg-dracula-dark/20 text-pretty flex flex-col sm:flex-row gap-12 items-center w-full md:w-auto rounded-md"
    >
      <motion.img
        src={avatarImage.src}
        alt="avatar"
        className="w-80 h-48 shadow-transparent"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
      <div className="flex flex-col gap-4 text-center sm:text-left">
        <h2 className="font-bold text-3xl text-dracula-green">{AUTHOR.name}</h2>
        <p className="text-pretty">{AUTHOR.bio}</p>
        <p className="flex gap-4 justify-center sm:justify-start">
          {SOCIALS.map((social) => (
            <a
              className="text-dracula-cyan hover:text-dracula-purple transition
                                underline underline-offset-4"
              href={social.href}
              title={social.linkTitle}
              key={social.name}
            >
              {social.name}
            </a>
          ))}
        </p>
      </div>
    </motion.div>
  );
}
