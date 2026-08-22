import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { PROGRAMS } from "@/lib/pansofieData";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const META = {
  school: {
    status: "Připraveno pro první pilot",
    note: "Digitální postup pro školu je otestovaný. Dalším krokem je ověřit ho v běžném provozu skutečné školy.",
    receives: ["3 pilotní zkušenosti", "jasný postup pro učitele", "soukromý Experience Passport", "podklady pro vyhodnocení pilotu"],
    contributes: ["bezpečné prostředí", "pedagogické vedení", "reálné školní potřeby", "zpětnou vazbu o použitelnosti a zátěži"],
    cta: ["/zapojit-se?role=school", "Chci zapojit školu"],
  },
  family: {
    status: "Zapojení v prvním pilotu",
    note: "Rodina se zatím zapojuje kolem konkrétní zkušenosti. Její role je dobrovolná, praktická a má jasné hranice soukromí.",
    receives: ["srozumitelný kontext", "bezpečný přehled", "možnost dobrovolně pomoci", "jasné hranice soukromí"],
    contributes: ["podnět z reálného života", "zkušenost nebo kontakt", "zpětnou vazbu", "propojení mezi školou a domovem"],
    cta: ["/zapojit-se?role=family", "Zajímá mě role rodiny"],
  },
  community: {
    status: "Zapojení podle konkrétní zkušenosti",
    note: "Obec nebo komunita může už dnes přinést místní potřebu, kontext a možnost vyzkoušet dobrý výsledek v reálném prostředí. Samostatná komunitní část produktu se teprve připravuje.",
    receives: ["pozornost k místní potřebě", "týmové výstupy", "možnost posoudit další krok", "srozumitelný a transparentní postup"],
    contributes: ["lokální problém", "prostředí a kontext", "odbornou nebo místní znalost", "zpětnou vazbu nebo možnost výsledek vyzkoušet"],
    cta: ["/zapojit-se?role=community", "Přinést lokální potřebu"],
  },
  youth: {
    status: "Připravujeme",
    note: "Pansofie Youth je připravovaná větev pro mladé 15+. Má navázat na stejný princip skutečné zkušenosti, ale samostatná část produktu zatím není spuštěná.",
    receives: ["návaznost na předchozí zkušenosti", "větší samostatnost", "projekty a mentoring", "možnost přenést zkušenost do další situace"],
    contributes: ["iniciativu", "vlastní projekty", "spolupráci s vrstevníky", "reálné výstupy"],
    cta: ["/zapojit-se?role=general", "Chci sledovat další vývoj"],
  },
};

export default function ProgramDetail() {
  const { id } = useParams();
  const program = PROGRAMS.find((item) => item.id === id) || PROGRAMS[0];
  const meta = META[program.id] || META.school;
  const Icon = program.icon;
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32 container-px max-w-6xl mx-auto py-12 sm:py-20">
        <section className="rounded-[2rem] border border-primary/20 bg-primary/[0.035] p-7 sm:p-10">
          <span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5"><Icon size={24} /></span>
          <span className="inline-flex rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-muted-foreground mb-3">{meta.status}</span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight">{program.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl leading-relaxed">{meta.note}</p>
        </section>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[["CO ZÍSKÁVÁ", meta.receives], ["CO PŘINÁŠÍ", meta.contributes]].map(([title, items]) => (
            <section key={title} className="rounded-3xl border border-border bg-card/40 p-6 sm:p-7">
              <p className="text-xs font-semibold tracking-wide text-primary">{title}</p>
              <div className="mt-5 space-y-3">{items.map((item) => <div key={item} className="flex items-start gap-3 text-sm"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div>
            </section>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-primary/20 bg-primary/[0.025] p-6 sm:p-7 flex items-start gap-3"><ShieldCheck size={21} className="text-primary shrink-0 mt-0.5" /><div><h2 className="font-semibold">Vzájemná hodnota a bezpečné hranice</h2><p className="mt-2 text-sm text-muted-foreground">Každá role má přinášet něco konkrétního a zároveň získávat smysluplnou hodnotu. Žádná role ale automaticky nezískává přístup k soukromým údajům a žádný přínos se nepřevádí na hodnocení lidské hodnoty.</p></div></div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3"><Link to={meta.cta[0]} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold">{meta.cta[1]} <ArrowRight size={17} /></Link><Link to="/#ekosystem" className="inline-flex items-center justify-center px-6 py-3.5 bg-card border border-border rounded-2xl font-semibold">Zobrazit všechny role</Link></div>
      </main>
      <PublicFooter />
    </div>
  );
}
