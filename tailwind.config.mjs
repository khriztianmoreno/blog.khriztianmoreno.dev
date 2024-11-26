import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        code: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
      typography: ({ theme }) => ({
        dracula: {
          css: {
            "--tw-prose-body": theme("colors.dracula-light.DEFAULT"),
            "--tw-prose-headings": theme("colors.dracula-pink.DEFAULT"),
            "--tw-prose-lead": theme("colors.dracula-pink.DEFAULT"),
            "--tw-prose-links": theme("colors.dracula-cyan.DEFAULT"),
            "--tw-prose-bold": theme("colors.dracula-purple.DEFAULT"),
            "--tw-prose-counters": theme("colors.dracula-pink.DEFAULT"),
            "--tw-prose-bullets": theme("colors.dracula-pink.DEFAULT"),
            "--tw-prose-hr": theme("colors.dracula-pink.DEFAULT"),
            "--tw-prose-quotes": theme("colors.dracula-light.DEFAULT"),
            "--tw-prose-quote-borders": theme("colors.dracula-green.DEFAULT"),
            "--tw-prose-captions": theme("colors.dracula-pink.DEFAULT"),
            "--tw-prose-code": theme("colors.dracula-purple.DEFAULT"),
            // '--tw-prose-pre-code': theme(''),
            // '--tw-prose-pre-bg': theme(''),
            "--tw-prose-th-borders": theme("colors.dracula-dark.DEFAULT"),
            "--tw-prose-td-borders": theme("colors.dracula-dark.DEFAULT"),
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwind-dracula")("dracula"),
    require("@tailwindcss/typography"),
  ],
};
