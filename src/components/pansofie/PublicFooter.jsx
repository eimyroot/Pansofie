import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const GROUPS = [
  {
    title: "Pansofie",
    links: [
      ["/jak-funguje", "Jak to funguje"],
      ["/pilot", "Pilot školy"],
      ["/partneri", "Pro partnery"],
      ["/zapojit-se", "Zapojit se"],
    ],
  },
  {
    title: "Důvěra",
    links: [
      ["/bezpecnost", "Bezpečnost dětí"],
      ["/soukromi", "Soukromí"],
      ["/podminky", "Podmínky"],
    ],
  },
  {
    title: "O projektu",
    links: [
      ["/o-projektu", "O Pansofii"],
      ["/kontakt", "Kontakt"],
      ["/login", "Přihlášení"],
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/35">
      <div className="container-px max-w-7xl mx-auto py-12 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr_1fr] gap-9 lg:gap-12">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2 font-heading font-bold text-lg">
              <span className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={18} /></span>
              Pansofie
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Poznej sebe. Tvoř s druhými. Zlepšuj svět.</p>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">Pansofie je ve fázi přípravy prvního reálného školního pilotu. Veřejně oddělujeme to, co je už technicky ověřené, od toho, co musí teprve potvrdit field pilot.</p>
          </div>

          {GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.title}</p>
              <div className="mt-4 flex flex-col gap-2.5">
                {group.links.map(([to, label]) => <Link key={to} to={to} className="text-sm hover:text-primary transition-colors">{label}</Link>)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground">
          <p>Současná veřejná verze je pre-field-pilot. Nejde o tvrzení prokázaného pedagogického nebo dlouhodobého dopadu.</p>
          <p>© 2026 Pansofie</p>
        </div>
      </div>
    </footer>
  );
}
