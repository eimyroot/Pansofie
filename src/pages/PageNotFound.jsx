import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home, SearchX } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname || "/";

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-5xl mx-auto py-16 sm:py-24">
          <div className="surface-raised overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="bg-foreground text-background p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[300px]">
                <SearchX size={34} className="text-background/70" aria-hidden="true" />
                <div className="mt-12">
                  <p className="text-xs uppercase tracking-[0.18em] text-background/50">Stránka nenalezena</p>
                  <p className="mt-2 text-7xl sm:text-8xl font-display font-semibold">404</p>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <h1 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight">Tahle cesta v Pansofii neexistuje.</h1>
                <p className="mt-4 text-muted-foreground leading-relaxed">Adresa <span className="font-medium text-foreground break-all">{pageName}</span> nevede na platnou stránku. Můžete se vrátit k hlavnímu příběhu produktu nebo pokračovat rovnou podle své potřeby.</p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link to="/" className="action-primary w-full"><Home size={16} /> Domů</Link>
                  <Link to="/jak-funguje" className="action-secondary w-full">Jak to funguje <ArrowRight size={15} /></Link>
                  <Link to="/pro-koho" className="action-secondary w-full">Pro koho <ArrowRight size={15} /></Link>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">Chcete si Pansofii rovnou projít?</p>
                  <Link to="/zapojit-se?mode=simulator" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">Vyzkoušet PANSOFIEDIT za 60 sekund <ArrowRight size={15} /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
