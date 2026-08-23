import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pansofie.locale";
const SUPPORTED = new Set(["cs", "en"]);

const LanguageContext = createContext(null);

function initialLocale() {
  if (typeof window === "undefined") return "cs";

  const queryLocale = new URLSearchParams(window.location.search).get("lang");
  if (SUPPORTED.has(queryLocale)) return queryLocale;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED.has(stored)) return stored;

  // Czech stays the canonical first-load language. English is explicit and then persists.
  return "cs";
}

function persistLocale(locale) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;

  const url = new URL(window.location.href);
  if (locale === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale);

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    isEnglish: locale === "en",
    setLocale: (next) => {
      if (SUPPORTED.has(next)) setLocaleState(next);
    },
    toggleLocale: () => setLocaleState((current) => (current === "cs" ? "en" : "cs")),
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
