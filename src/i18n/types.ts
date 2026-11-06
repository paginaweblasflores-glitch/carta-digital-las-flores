import type { NoteKey, SectionKey, VariantKey } from "@/data/menu";

export const LANGS = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

export interface Dict {
  ui: {
    tagline: string;
    heroTitle: string;
    heroText: string;
    chooseLanguage: string;
    viewMenu: string;
    sectionsNav: string;
    orderHint: string;
    pricesNote: string;
    translationNote: string;
    close: string;
    viewPhoto: string;
    kidsNote: string;
    thanks: string;
    backToTop: string;
  };
  sections: Record<SectionKey, string>;
  notes: Record<NoteKey, string>;
  variants: Record<VariantKey, string>;
  breakfast: {
    title: string;
    hours: string;
    rule: string;
    hot: string;
    hotItems: string;
    cold: string;
    coldItems: string;
    sandwiches: string;
    sides: string;
    sideItems: string;
  };
  /** id -> [nombre traducido, descripción traducida] */
  items: Record<string, [string, string?]>;
}
