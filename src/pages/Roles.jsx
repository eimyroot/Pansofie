import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, UsersRound } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import RoleEntry from "@/components/pansofie/RoleEntry";

export default function Roles() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto pt-12 sm:pt-20 pb-4 sm:pb-8">
          <div className="max-w-4xl">
            <span className="chip bg-primary/10 text-primary mb-5"><UsersRound size={14} /> Pro koho je Pansofie</span>
            <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Jedna Experience propojí více lidí. <span className="text-primary">Nikdo ale nepotřebuje vidět všechno.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Vyberte roli a podívejte se, co v Pansofii skutečně dělá, co získává, co přináší, co smí vidět a kde končí její přístup.</p>
          </div>
        </section>

        <RoleEntry />

        <section className="border-t border-border/60 bg-card/35">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-24 text-center">
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Nejrychlejší způsob, jak Pansofii pochopit, je projít ji z vlastní role.</h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">PANSOFIEDIT během 60–90 sekund složí ukázkovou Experience podle toho, kdo jste, co chcete změnit a co do ní můžete přinést.</p>
            <Link to="/zapojit-se?mode=simulator" className="action-primary mt-8 inline-flex px-7 py-3.5">Vyzkoušet z vlastní role <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
