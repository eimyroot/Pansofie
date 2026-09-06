import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "pansofie-1.0:language";
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem(KEY) || "cs");

  useEffect(() => {
    localStorage.setItem(KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    isEnglish: locale === "en",
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
