export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: unknown): value is Locale {
  return value === "ru" || value === "en";
}

export function resolveLocale(saved: unknown, acceptedLanguage?: string | null): Locale {
  if (isLocale(saved)) return saved;
  return acceptedLanguage?.trim().toLowerCase().startsWith("ru") ? "ru" : "en";
}
