"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dictionary } from "./dictionaries";
import type { Locale } from "./locale";

type I18nValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "badretd-language";

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState(initialLocale);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.cookie = `${STORAGE_KEY}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  }

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const detected: Locale = saved === "ru" || saved === "en"
      ? saved
      : window.navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
    const task = window.setTimeout(() => setLocaleState(detected), 0);
    return () => window.clearTimeout(task);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, dictionary: dictionaries[locale], setLocale }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within I18nProvider");
  return value;
}
