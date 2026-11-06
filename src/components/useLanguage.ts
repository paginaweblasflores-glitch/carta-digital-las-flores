"use client";

import { useCallback, useEffect, useState } from "react";
import es from "@/i18n/es";
import { LANGS, type Dict, type Lang } from "@/i18n/types";

const loaders: Record<Exclude<Lang, "es">, () => Promise<{ default: Dict }>> = {
  en: () => import("@/i18n/en"),
  de: () => import("@/i18n/de"),
  fr: () => import("@/i18n/fr"),
  it: () => import("@/i18n/it"),
  pt: () => import("@/i18n/pt"),
  zh: () => import("@/i18n/zh"),
  ja: () => import("@/i18n/ja"),
  ko: () => import("@/i18n/ko"),
};

const CJK_FONTS: Partial<Record<Lang, string>> = {
  zh: "Noto+Serif+SC:wght@400;600",
  ja: "Noto+Serif+JP:wght@400;600",
  ko: "Noto+Serif+KR:wght@400;600",
};

const STORAGE_KEY = "lasflores.lang";
const isLang = (v: string | null | undefined): v is Lang => !!v && LANGS.some((l) => l.code === v);

function detect(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (isLang(q)) return q;
  } catch {}
  try {
    const s = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(s)) return s;
  } catch {}
  for (const n of navigator.languages ?? [navigator.language]) {
    const base = n?.slice(0, 2).toLowerCase();
    if (isLang(base)) return base;
  }
  return "es";
}

function ensureCjkFont(lang: Lang) {
  const family = CJK_FONTS[lang];
  if (!family) return;
  const id = `font-${lang}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
  document.head.appendChild(link);
}

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>("es");
  const [dict, setDict] = useState<Dict>(es);
  const [switching, setSwitching] = useState(false);

  const apply = useCallback(async (next: Lang, persist: boolean) => {
    setSwitching(true);
    ensureCjkFont(next);
    const d = next === "es" ? es : (await loaders[next]()).default;
    setDict(d);
    setLangState(next);
    document.documentElement.lang = next;
    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      try {
        const url = new URL(window.location.href);
        if (next === "es") url.searchParams.delete("lang");
        else url.searchParams.set("lang", next);
        window.history.replaceState(null, "", url);
      } catch {}
    }
    window.setTimeout(() => setSwitching(false), 60);
  }, []);

  useEffect(() => {
    const initial = detect();
    if (initial !== "es") void apply(initial, false);
  }, [apply]);

  const setLang = useCallback((next: Lang) => void apply(next, true), [apply]);

  return { lang, dict, setLang, switching };
}
