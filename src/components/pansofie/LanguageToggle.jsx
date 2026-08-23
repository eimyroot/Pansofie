import React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageToggle({ compact = false, className = "" }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-sm ${className}`}
      role="group"
      aria-label={locale === "cs" ? "Jazyk webu" : "Website language"}
      data-i18n-ignore="true"
    >
      {!compact && <Languages size={15} className="ml-1 text-muted-foreground" aria-hidden="true" />}
      {[
        ["cs", "CZ"],
        ["en", "EN"],
      ].map(([value, label]) => {
        const active = locale === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            aria-pressed={active}
            className={`min-h-8 min-w-9 rounded-lg px-2 text-xs font-bold tracking-wide transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
