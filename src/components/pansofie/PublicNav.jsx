import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Menu, X } from "lucide-react";

const links = [
  ["/jak-funguje", "Jak to funguje"],
  ["/pilot", "Pro školy"],
  ["/partneri", "Pro partnery"],
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="container-px max-w-7xl mx-auto h-[74px] flex items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Pansofie — domů">
          <span className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"><Leaf size={18} /></span>
          <span>
            <span className="block font-heading font-bold text-[17px] leading-none">Pansofie</span>
            <span className="hidden md:block mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Skutečné zkušenosti. Ověřený rozvoj.</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 text-sm" aria-label="Veřejná navigace">
          {links.map(([to, label]) => (
            <Link key={label} to={to} className="rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-1">
          <Link to="/login" className="action-quiet px-2.5">Přihlásit</Link>
          <Link to="/zapojit-se" className="action-quiet px-2.5">Zapojit se</Link>
          <Link to="/zapojit-se?mode=simulator" className="action-primary min-h-10 rounded-xl px-4 py-2">
            Vyzkoušet 60 s <ArrowRight size={15} />
          </Link>
        </div>

        <button className="xl:hidden h-10 w-10 rounded-xl border border-border bg-card flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={() => setOpen((value) => !value)} aria-label={open ? "Zavřít menu" : "Otevřít menu"} aria-expanded={open} aria-controls="public-mobile-menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div id="public-mobile-menu" className="xl:hidden border-t border-border/60 bg-background px-5 py-4 flex flex-col gap-1 shadow-lg">
          {links.map(([to, label]) => <Link key={label} to={to} className="rounded-xl px-3 py-2.5 text-sm hover:bg-card" onClick={() => setOpen(false)}>{label}</Link>)}
          <Link to="/login" className="rounded-xl px-3 py-2.5 text-sm" onClick={() => setOpen(false)}>Přihlásit</Link>
          <Link to="/zapojit-se" className="rounded-xl px-3 py-2.5 text-sm" onClick={() => setOpen(false)}>Zapojit se</Link>
          <Link to="/zapojit-se?mode=simulator" className="action-primary mt-2 w-full" onClick={() => setOpen(false)}>Vyzkoušet Pansofii za 60 sekund <ArrowRight size={16} /></Link>
        </div>
      )}
    </header>
  );
}
