import "server-only";
import type { Locale } from "./config";

import th from "./dictionaries/th.json";
import lo from "./dictionaries/lo.json";
import en from "./dictionaries/en.json";

export type Dictionary = typeof th;

const dictionaries: Record<Locale, Dictionary> = {
  th: th as Dictionary,
  lo: lo as Dictionary,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.th;
}
