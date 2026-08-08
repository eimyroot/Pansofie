import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Compass, Leaf } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import SectionHeading from "@/components/pansofie/SectionHeading";
import RoleEntry from "@/components/pansofie/RoleEntry";
import PansofieIdea from "@/components/pansofie/PansofieIdea";
import PathPillar from "@/components/pansofie/PathPillar";
import { PATHS, LABS, PROGRAMS } from "@/lib/pansofieData";

export default function Home() {
  return (
    <div>
      <PublicNav />
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_60%)]" />
          {PATHS.map((p, i) => <div key={p.id} className="absolute h-3 w-3 rounded-full blur-[2px] opacity-70 animate-pulse" style={{ backgroundColor: p.color, top: `${15 + (i % 4) * 18}%`, left: `${10 + (i * 13) % 80}%`, animationDelay: `${i * 0.4}s` }} />)}
        </div>
        <div className="container-px max-w-7xl mx-auto text-center">
          <span className="chip bg-primary/10 text-primary mb-6"><Sparkles size={14} /> Systém celoživotního rozvoje</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Poznej sebe.<br />Tvoř s druhými. <span className="text-primary">Zlepšuj svět.</span></h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">Pansofie propojuje poznání, skutečné zkušenosti, lidi a projekty do jedné celoživotní cesty rozvoje.</p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"><Link to="/dashboard" className="w-full sm:w-auto px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">Začít svou cestu <ArrowRight size={18} /></Link><Link to="/jak-funguje" className="w-full sm:w-auto px-6 py-3.5 bg-card border border-border rounded-2xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-muted/60 transition-colors"><Compass size={18} /> Jak Pansofie funguje</Link></div>
        </div>
      </section>
      <PansofieIdea />
      <section id="sedm-cest" className="py-20 sm:py-28 border-t border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto"><SectionHeading eyebrow="7 pilířů rozvoje" title="Sedm pilířů, kterými se rozvíjíš" subtitle="Konzistentní rámec napříč celou platformou. Každý pilíř má oblasti, mise, zkušenosti, projekty a výsledky v portfoliu." center /><div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{PATHS.map((path) => <PathPillar key={path.id} path={path} />)}</div></div></section>
      <section id="jak-funguje" className="py-16 sm:py-20 border-t border-border/60"><div className="container-px max-w-4xl mx-auto"><div className="card-soft p-8 sm:p-10 bg-primary/[0.03] border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"><div><h2 className="text-2xl font-semibold font-display tracking-tight">Jak Pansofie funguje?</h2><p className="text-muted-foreground mt-2">Není to obsah ke čtení. Je to systém zkušeností — od mise k doloženému rozvoji.</p></div><Link to="/jak-funguje" className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity">Otevřít stránku <ArrowRight size={18} /></Link></div></div></section>
      <section id="labs" className="py-20 sm:py-28 border-t border-border/60 bg-card/40"><div className="container-px max-w-7xl mx-auto"><SectionHeading eyebrow="Projects & Labs" title="Labs — prostředí, kde se Pansofie odehrává" subtitle="Lab není rozvojová schopnost. Je to oblast aktivity, kde tvoříš reálné výsledky." center /><div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{LABS.map((lab) => { const Icon = lab.icon; return <div key={lab.id} className="card-soft p-6 group transition-all duration-300 hover:-translate-y-1"><div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${lab.color}18`, color: lab.color }}><Icon size={24} strokeWidth={2} /></div><h3 className="text-lg font-semibold font-heading">{lab.name}</h3><p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{lab.desc}</p></div>; })}</div></div></section>
      <section id="programy" className="py-20 sm:py-28 border-t border-border/60"><div className="container-px max-w-7xl mx-auto"><SectionHeading eyebrow="Programy" title="Kde a s kým Pansofii zažíváte" subtitle="Programy nejsou téma ani Lab. Jsou kontext, ve kterém prožíváte mise a projekty." center /><div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{PROGRAMS.map((program) => { const Icon = program.icon; return <Link key={program.id} to={`/program/${program.id}`} className="card-soft p-6 transition-all duration-300 hover:-translate-y-1 block"><div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4"><Icon size={22} strokeWidth={2} /></div><h3 className="text-lg font-semibold font-heading">{program.name}</h3><p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{program.desc}</p></Link>; })}</div></div></section>
      <RoleEntry />
      <section className="py-20 sm:py-28 border-t border-border/60 bg-card/40"><div className="container-px max-w-4xl mx-auto text-center"><span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Leaf size={26} strokeWidth={2.4} /></span><h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Jeden soudržný produkt pro celoživotní rozvoj</h2><p className="mt-5 text-lg text-muted-foreground leading-relaxed text-balance">Pansofie není sbírka modulů. Je to systém, který propojuje profil, lidi, mise, týmy, Labs a komunitu — tak, aby složitost řešil systém, ne člověk.</p><Link to="/dashboard" className="mt-9 inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity">Začít svou cestu <ArrowRight size={18} /></Link></div></section>
      <footer className="py-12 border-t border-border/60"><div className="container-px max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"><div className="flex items-center gap-2 font-heading font-bold"><span className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={15} strokeWidth={2.4} /></span>Pansofie</div><p className="text-sm text-muted-foreground">Poznej sebe. Tvoř s druhými. Zlepšuj svět.</p></div></footer>
    </div>
  );
}
