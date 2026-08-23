import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";
import ParticipationCTA from "@/components/pansofie/ParticipationCTA";

const GROUPS = [
  {
    title: "Pansofie",
    links: [
      ["/jak-funguje", "Jak to funguje"],
      ["/pro-koho", "Pro koho"],
      ["/pilot", "Pro školy"],
      ["/partneri", "Pro partnery"],
      ["/materialovy-most", "Materiálový most"],
      ["/zapojit-se", "Jak se zapojit"],
      ["/zapojit-se?mode=simulator", "Vyzkoušet PANSOFIEDIT"],
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
      ["/o-projektu", "O Pansofii a kde jsme dnes"],
      ["/login", "Přihlášení"],
    ],
  },
];

const FOOTER_NETWORK = ["Zkušenost", "Důkaz", "Ověření", "Důvěra", "Další krok"];

export default function PublicFooter() {
  const location = useLocation();
  const showParticipationGateway = location.pathname === "/pro-koho";

  return (
    <>
      {showParticipationGateway && <ParticipationCTA />}
      <footer className="border-t border-border/60 bg-card/35">
        <div className="container-px max-w-7xl mx-auto py-12 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr_1fr] gap-9 lg:gap-12">
            <div className="max-w-sm">
              <Link to="/" className="inline-flex items-center gap-2 font-heading font-bold text-lg">
                <span className="network-brand-node h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={18} /></span>
                Pansofie
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Poznej sebe. Tvoř s druhými. Zlepšuj svět.</p>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">Digitální část Pansofie je technicky připravená. Teprve pilot v reálné škole ukáže, jak je užitečná pro žáky a učitele a jaké výsledky přináší v běžném provozu.</p>
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

          <div className="footer-network-thread" aria-label="Logika Pansofie od zkušenosti k dalšímu kroku">
            {FOOTER_NETWORK.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && <span className="footer-network-edge" aria-hidden="true"><i /></span>}
                <span className="footer-network-node">{item}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground">
            <p>To, že něco technicky funguje, ještě neznamená, že to má prokázaný dopad. Proto oddělujeme vývoj produktu, ověření ve škole, skutečné výsledky a dlouhodobý přínos.</p>
            <p>© 2026 Pansofie</p>
          </div>
        </div>
      </footer>
    </>
  );
}
