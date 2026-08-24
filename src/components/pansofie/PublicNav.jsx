import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Leaf, Menu, X } from "lucide-react";
import LanguageToggle from "@/components/pansofie/LanguageToggle";
import { useLanguage } from "@/lib/LanguageContext";
import "@/header-manifest-r17.css";

const LINKS = {
  cs: [
    ["/jak-funguje", "Jak to funguje"],
    ["/pansofiego", "PansofieGO"],
    ["/pro-koho", "Pro koho"],
    ["/knihovna", "Knihovna"],
    ["/pilot", "Pro školy"],
    ["/partneri", "Pro partnery"],
    ["/o-projektu", "O Pansofii"],
    ["/zapojit-se", "Přidejte se"],
  ],
  en: [
    ["/jak-funguje", "How it works"],
    ["/pansofiego", "PansofieGO"],
    ["/pro-koho", "For whom"],
    ["/knihovna", "Library"],
    ["/pilot", "For schools"],
    ["/partneri", "For partners"],
    ["/o-projektu", "About Pansofie"],
    ["/zapojit-se", "Join us"],
  ],
};

const MANIFEST = {
  cs: [
    {
      key: "omnes",
      label: "Všem",
      text: "Internet a vzdělání musí být zdarma, bez bariér a dostupné i v nejchudších koutech světa.",
    },
    {
      key: "omnia",
      label: "Všemu",
      text: "Technologie nesmí sloužit jen byznysu, ale musí pomáhat léčit nemoci, chránit přírodu a rozvíjet kulturu.",
    },
    {
      key: "omnino",
      label: "Všestranně",
      text: "Digitální gramotnost bez morální gramotnosti je nebezpečná zbraň. Učit se musíme rozumu, jazyku i srdci zároveň.",
    },
  ],
  en: [
    {
      key: "omnes",
      label: "For all",
      text: "The internet and education must be free, barrier-free and accessible even in the poorest corners of the world.",
    },
    {
      key: "omnia",
      label: "For the whole",
      text: "Technology must not serve business alone; it must help heal disease, protect nature and develop culture.",
    },
    {
      key: "omnino",
      label: "In every way",
      text: "Digital literacy without moral literacy is a dangerous weapon. We must learn with reason, language and heart together.",
    },
  ],
};

function matchesPath(pathname, to) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function PublicNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { locale } = useLanguage();
  const en = locale === "en";
  const links = LINKS[en ? "en" : "cs"];
  const manifest = MANIFEST[en ? "en" : "cs"];

  return (
    <header className="pansofie-public-header fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="pansofie-header-manifest" role="region" aria-label={en ? "Pansofie principles: for all, for the whole, in every way" : "Principy Pansofie: všem, všemu, všestranně"}>
        <div className="pansofie-header-manifest__rail">
          {manifest.map((item) => (
            <p key={item.key} className="pansofie-header-manifest__item" data-principle={item.key} title={`${item.label}: ${item.text}`}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="pansofie-public-nav-row container-px max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={en ? "Pansofie — home" : "Pansofie — domů"}>
          <span className="network-brand-node h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"><Leaf size={18} /></span>
          <span>
            <span className="block font-heading font-bold text-[17px] leading-none">Pansofie</span>
            <span className="hidden md:block mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{en ? "Real experiences. Verified development." : "Skutečné zkušenosti. Ověřený rozvoj."}</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 text-sm" aria-label={en ? "Public navigation" : "Veřejná navigace"}>
          {links.map(([to, label]) => {
            const active = matchesPath(pathname, to);
            return (
              <Link
                key={to}
                to={to}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className="public-nav-link rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <LanguageToggle compact />
          <Link to="/login" className="action-quiet px-2.5">{en ? "Sign in" : "Přihlásit"}</Link>
          <Link to="/pro-koho#ochutnejte" className="action-primary min-h-10 rounded-xl px-4 py-2">
            {en ? "Try 60 sec" : "Vyzkoušet 60 s"} <ArrowRight size={15} />
          </Link>
        </div>

        <button className="xl:hidden h-10 w-10 rounded-xl border border-border bg-card flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={() => setOpen((value) => !value)} aria-label={open ? (en ? "Close menu" : "Zavřít menu") : (en ? "Open menu" : "Otevřít menu")} aria-expanded={open} aria-controls="public-mobile-menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div id="public-mobile-menu" className="xl:hidden border-t border-border/60 bg-background px-5 py-4 flex flex-col gap-1 shadow-lg">
          <div className="px-3 pb-3"><LanguageToggle /></div>
          {links.map(([to, label]) => {
            const active = matchesPath(pathname, to);
            return (
              <Link
                key={to}
                to={to}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className="public-nav-link rounded-xl px-3 py-2.5 text-sm hover:bg-card"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <Link to="/login" className="rounded-xl px-3 py-2.5 text-sm" onClick={() => setOpen(false)}>{en ? "Sign in" : "Přihlásit"}</Link>
          <Link to="/pro-koho#ochutnejte" className="action-primary mt-2 w-full" onClick={() => setOpen(false)}>{en ? "Try Pansofie in 60 seconds" : "Vyzkoušet Pansofii za 60 sekund"} <ArrowRight size={16} /></Link>
        </div>
      )}
    </header>
  );
}
