import { MISC } from "@/config";

export const languages = {
  en: "EN",
  es: "ES",
};

export const defaultLang: Lang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.tags": "Tags",
    "nav.about": "About",
    "search.placeholder.firstPart": "Search in ",
    "search.placeholder.secondPart.post": " posts...",
    "search.placeholder.secondPart.tag": " tags...",
    "search.noResults": "No results found",
    postsWithTag: "Posts with tag",
    toc: "Table of Content",
    pageNotFound: "PAGE NOT FOUND",
    goBackHome: "Go Back Home",
    publishedAt: "Published at",
    updatedAt: "Updated at",
    "post.newlyUpdatedMsg": `Updated in ${MISC.dateTag.daysToBeGreen} days`,
    "post.oldPostWarningMsg": `Last update over ${MISC.dateTag.daysToBeRed} days ago`,
    "post.license": "Licensed under",
  },
  es: {
    "nav.home": "Inicio",
    "nav.tags": "Etiquetas",
    "nav.about": "Acerca",
    "search.placeholder.firstPart": "Buscar en ",
    "search.placeholder.secondPart.post": " posts...",
    "search.placeholder.secondPart.tag": " etiquetas...",
    "search.noResults": "No se encontraron resultados",
    postsWithTag: "Posts with tag",
    toc: "Tabla de contenido",
    pageNotFound: "PAGE NOT FOUND",
    goBackHome: "Go Back Home",
    publishedAt: "Publicado en",
    updatedAt: "Actualizado en",
    "post.newlyUpdatedMsg": `Actualizado en ${MISC.dateTag.daysToBeGreen} días`,
    "post.oldPostWarningMsg": `Última actualización hace más de ${MISC.dateTag.daysToBeRed} días`,
    "post.license": "Con licencia bajo",
  },
} as const;

export type Lang = keyof typeof ui;

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return `/${l}${path}`;
  };
}

export function getLangFromUrl(url: string) {
  const [, lang, ...rest] = url.split("/");
  const urlWithoutLang = rest.join("/");
  if (lang in ui) return [lang as keyof typeof ui, urlWithoutLang];
  return [defaultLang as keyof typeof ui, urlWithoutLang];
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof lang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
