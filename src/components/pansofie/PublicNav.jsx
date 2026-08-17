import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const links = [
  ["/pilot", "Pilot školy"],
  ["/jak-funguje", "Jak to funguje"],
  ["/#sedm-cest", "7 cest"],
  ["/#programy", "Programy"],
  ["/#labs", "Projekty & Labs"],
  ["/login?returnTo=%2Fsit", "Komunita"],
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container-px max-w-7xl mx-auto h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg">
          <span className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={18} /></span>
          Pansofie
        </Link>

        <nav className="hidden xl:flex items-center gap-5 text-sm text-muted-foreground">
          {links.map(([to, label]) => <a key={label} href={to} className="hover:text-foreground transition-colors">{label}</a>)}
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <Link to="/login" className="px-4 py-2.5 text-sm font-medium">Přihlásit</Link>
          <Link to="/pilot" className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Školní pilot</Link>
        </div>

        <button className="xl:hidden h-10 w-10 rounded-xl border border-border flex items-center justify-center" onClick={() => setOpen((value) => !value)} aria-label="Menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border/60 bg-background px-5 py-4 flex flex-col gap-2">
          {links.map(([to, label]) => <a key={label} href={to} className="py-2 text-sm" onClick={() => setOpen(false)}>{label}</a>)}
          <Link to="/login" className="py-2 text-sm">Přihlásit</Link>
          <Link to="/pilot" className="mt-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold text-center" onClick={() => setOpen(false)}>Školní pilot</Link>
        </div>
      )}
    </header>
  );
}
