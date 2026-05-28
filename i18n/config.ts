export const locales = ["th", "lo", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

export const localeNames: Record<Locale, string> = {
  th: "ไทย",
  lo: "ລາວ",
  en: "EN",
};

export const localeLongNames: Record<Locale, string> = {
  th: "ภาษาไทย",
  lo: "ພາສາລາວ",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  th: "🇹🇭",
  lo: "🇱🇦",
  en: "🇬🇧",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
