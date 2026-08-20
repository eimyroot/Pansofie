import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const PATHS = [
  {
    id: "school",
    title: "Škola",
    kicker: "Ověřte Pansofii v realitě",
    icon: Building2,
    brings: ["jednu kohortu nebo třídu", "pedagogické vedení", "skutečnou školní potřebu", "zpětnou vazbu k použitelnosti a zátěži"],
    helps: "Pomůžete zjistit, zda Experience funguje v běžném školním provozu — ne jen v produktu.",
    to: "/zapojit-se?role=school",
    cta: "Projít cestu školy",
  },
  {
    id: "teacher",
    title: "Učitel / pedagog",
    kicker: "Přineste realitu výuky",
    icon: GraduationCap,
    brings: ["praktickou zkušenost z výuky", "review skutečné práce", "pohled na učitelskou zátěž", "návrhy, co zjednodušit nebo zastavit"],
    helps: "Pomůžete oddělit hezký koncept od workflow, který je skutečně použitelný pro učitele.",
    to: "/zapojit-se?role=school",
    cta: "Projít pedagogickou cestu",
  },
  {
    id: "learner",
    title: "Mladý člověk",
    kicker: "Přineste vlastní problém nebo nápad",
    icon: Compass,
    brings: ["vlastní skutečnou činnost", "důkaz toho, co vzniklo", "vlastní reflexi", "pohled na to, co dává smysl a co ne"],
    helps: "Pomůžete držet Pansofii u skutečné zkušenosti člověka místo u abstraktního systému.",
    to: "/zapojit-se?role=learner",
    cta: "Projít vlastní Experience",
  },
  {
    id: "family",
    title: "Rodina",
    kicker: "Přidejte životní kontext",
    icon: HeartHandshake,
    brings: ["pozorování z běžného života", "kontakt nebo lokální zdroj", "dobrovolnou zpětnou vazbu", "kontext mezi školou a domovem"],
    helps: "Pomůžete ověřit, že rodina může být užitečná bez přebírání práce dítěte a bez narušení soukromí.",
    to: "/zapojit-se?role=family",
    cta: "Projít rodinnou cestu",
  },
  {
    id: "mentor",
    title: "Mentor / odborník",
    kicker: "Sdílejte know-how, ne hotové řešení",
    icon: UsersRound,
    brings: ["ohraničený čas", "odborné otázky a kontext", "feedback k práci", "ukázku skutečné pracovní praxe"],
    helps: "Pomůžete mladým lidem potkat skutečný obor bezpečně a s jasnou rolí dospělého.",
    to: "/zapojit-se?role=mentor",
    cta: "Projít cestu mentora",
  },
  {
    id: "partner",
    title: "Firma / organizace",
    kicker: "Přineste Challenge, expertizu nebo zdroj",
    icon: BriefcaseBusiness,
    brings: ["reálný problém a kontext", "čas odborníka nebo know-how", "data, materiál, techniku či prostor v bezpečném rozsahu", "možnost dobrý výstup dál pilotovat"],
    helps: "Pomůžete propojit vzdělávání s realitou bez kupování pozitivního výsledku nebo přístupu k dítěti.",
    to: "/zapojit-se?role=partner",
    cta: "Navrhnout partnerství",
  },
  {
    id: "community",
    title: "Obec / komunita",
    kicker: "Přineste místní potřebu",
    icon: Landmark,
    brings: ["lokální problém", "veřejný nebo komunitní kontext", "místní znalost a kontakty", "možnost výsledek vyzkoušet v reálném prostředí"],
    helps: "Pomůžete, aby Experience nebyla školní simulace, ale práce zasazená do místa, kde může mít skutečný další krok.",
    to: "/zapojit-se?role=community",
    cta: "Projít komunitní cestu",
  },
  {
    id: "supporter",
    title: "Podporovatel / propojovatel",
    kicker: "Otevřete dveře, které sami nemůžeme otevřít",
    icon: Network,
    brings: ["propojení na školu, učitele, odborníka nebo partnera", "prostor, techniku nebo materiální podporu", "pomoc s komunikací a šířením", "financování konkrétního bezpečně vymezeného pilotu"],
    helps: "Pomůžete vytvořit podmínky, aby se první reálné ověření vůbec mohlo stát — i když nejste přímým účastníkem Experience.",
    to: "/o-projektu#stav",
    cta: "Podívat se, co právě ověřujeme",
  },
];

const RECIPROCITY = [
  ["Znalost", "Mentor nebo odborník předá kontext a otázky, které mladý člověk v učebnici nepotká."],
  ["Problém", "Škola, firma nebo obec přinese skutečnou potřebu, na které má smysl pracovat."],
  ["Prostor a zdroje", "Někdo otevře dílnu, laboratoř, komunitní místo, poskytne materiál nebo bezpečně vymezená data."],
  ["Ověření", "Učitel, partner nebo komunita pomůže rozlišit hotový výstup od toho, co se opravdu použilo a změnilo."],
];

export default function JoinNetwork() {
  return (
    <>
      <section className="container-px max-w-7xl mx-auto pt-10 sm:pt-16 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <span className="chip bg-primary/10 text-primary mb-5"><Network size={14} /> Přidejte se k síti Pansofie</span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.04]">Pansofie potřebuje lidi, kteří <span className="text-primary">přinesou realitu.</span></h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">Nemusíte mít školu ani firmu. Můžete přinést problém, zkušenost, čas, kontakt, prostor, techniku, expertizu, možnost něco vyzkoušet nebo pomoc s prvním pilotem.</p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">Nejde o dobrovolnictví bez hranic. Každé zapojení má mít jasný účel, vzájemnou hodnotu a bezpečný rozsah kolem konkrétní Experience.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#moznosti-pomoci" className="action-primary w-full sm:w-auto px-7 py-3.5">Najít způsob, jak pomoct <ArrowRight size={18} /></a>
              <Link to="/zapojit-se?mode=simulator" className="action-secondary w-full sm:w-auto px-7 py-3.5">Vyzkoušet PANSOFIEDIT <Sparkles size={16} /></Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-primary/20 bg-primary/[0.035] p-7 sm:p-9">
            <div className="flex items-center gap-3 text-primary"><Sparkles size={21} /><p className="text-sm font-semibold uppercase tracking-wide">Co teď opravdu potřebujeme</p></div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-semibold font-display tracking-tight">První síť lidí, která Pansofii prověří místo toho, aby jí jen fandila.</h2>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p className="flex gap-3"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /> školu a pedagogy pro první reálné ověření,</p>
              <p className="flex gap-3"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /> odborníky a partnery s reálnými problémy,</p>
              <p className="flex gap-3"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /> rodiny a komunity, které dají zpětnou vazbu k hranicím,</p>
              <p className="flex gap-3"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /> lidi, kteří otevřou dveře, prostor, zdroj nebo další kontakt.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/35">
        <div className="container-px max-w-7xl mx-auto py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Pomoc proudí sítí</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Pomoc Pansofii má zároveň vytvářet hodnotu pro ostatní.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">Nechceme model, ve kterém projekt jen sbírá podporu. Smyslem je, aby každý vstup mohl vytvořit konkrétní Experience, znalost, příležitost, místní zlepšení nebo ověřitelný další krok.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {RECIPROCITY.map(([title, text], index) => (
              <article key={title} className="rounded-3xl border border-border bg-background p-6">
                <span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-semibold font-heading">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="moznosti-pomoci" className="container-px max-w-7xl mx-auto py-20 sm:py-28 scroll-mt-28">
        <div className="max-w-4xl">
          <p className="eyebrow">Kde můžete vstoupit do sítě</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Osm různých způsobů pomoci. Žádný z nich není jen logo vedle projektu.</h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">Vyberte nejbližší roli. U každé je jasně napsané, co můžete přinést a co tím pomáháte ověřit.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PATHS.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} data-help-path={item.id} className="rounded-[2rem] border border-border bg-card/40 p-6 sm:p-8 flex flex-col">
                <div className="flex items-start gap-4">
                  <span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon size={22} /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.kicker}</p>
                    <h3 className="mt-1 text-2xl font-semibold font-display">{item.title}</h3>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Můžete přinést</p>
                  <div className="mt-3 space-y-2.5">
                    {item.brings.map((point) => <p key={point} className="flex gap-2.5 text-sm leading-relaxed"><CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /><span>{point}</span></p>)}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/[0.035] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Tím pomůžete</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.helps}</p>
                </div>

                <Link to={item.to} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary self-start">{item.cta} <ArrowRight size={15} /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border/60 bg-foreground text-background">
        <div className="container-px max-w-6xl mx-auto py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-start">
          <div>
            <div className="flex items-center gap-3"><ShieldCheck size={22} /><p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">Transparentní hranice</p></div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold font-display tracking-tight">Nechceme předstírat, že už máme hotový nábor nebo kontaktní centrum.</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-background/75 leading-relaxed">
            <p>Veřejný web zatím nesbírá kontaktní údaje a nemá schválený veřejný e-mail nebo booking endpoint. Tato stránka proto poctivě mapuje možnosti zapojení, ale nesimuluje odeslaný zájem.</p>
            <p>Jakmile bude faktický veřejný kontaktní kanál schválený, přidáme ho sem jako přímý další krok. Do té doby můžete projít svoji roli, připravit si konkrétní přínos a pochopit, co Pansofie právě potřebuje ověřit.</p>
          </div>
        </div>
      </section>

      <section className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center">
        <span className="inline-flex h-14 w-14 rounded-2xl bg-primary text-primary-foreground items-center justify-center mb-6"><Network size={25} /></span>
        <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">Nejdůležitější není přidat se k platformě. Je přidat něco skutečného do jedné Experience.</h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">Začněte rolí, potřebou a tím, co opravdu můžete přinést. PANSOFIEDIT vám z toho složí konkrétní ukázkovou cestu.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/zapojit-se?mode=simulator" className="action-primary w-full sm:w-auto px-7 py-3.5">Vyzkoušet z vlastní role <ArrowRight size={18} /></Link>
          <Link to="/o-projektu" className="action-secondary w-full sm:w-auto px-7 py-3.5">Proč Pansofie vzniká</Link>
        </div>
      </section>
    </>
  );
}
