import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Compass,
  Eye,
  PenLine,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Wrench,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import ExperienceFan from "@/components/pansofie/ExperienceFan";
import { useLanguage } from "@/lib/LanguageContext";

const COPY = {
  cs: {
    kicker: "Jak Pansofie funguje",
    titleA: "Od skutečného činu k",
    titleB: "ověřené zkušenosti.",
    lead: "Pansofie není postavená na suché teorii, bodech ani nekonečném feedu. Je to ekosystém, ve kterém člověk něco skutečně udělá, doloží výsledek, zastaví se k reflexi a nechá svou práci ověřit.",
    support: "Cílem není hodnotit člověka. Cílem je vytvořit důvěryhodnou mapu toho, co opravdu zkusil, vytvořil, použil a jaký dopad se podařilo doložit.",
    try: "Vyzkoušet celý cyklus",
    roles: "Podívat se podle role",
    cycleEyebrow: "01 · PĚT KROKŮ PANSOFICKÉHO CYKLU",
    cycleTitle: "Méně slibů. Více skutečné práce, důkazů a pochopení.",
    cycleIntro: "Jedna Experience vzniká postupně. Každý krok má jiný účel a žádný z nich sám o sobě není skóre člověka.",
    steps: [
      {
        title: "Skutečná mise",
        subtitle: "Inspirace k akci",
        body: "Vše začíná konkrétní výzvou. Mise mohou reagovat na digitální manipulaci, vztahy, spolupráci, techniku, cirkularitu nebo lokální potřebu. Nezkoušíme definice — hledáme něco, co stojí za to opravdu udělat.",
      },
      {
        title: "Akce a výstup",
        subtitle: "Práce v realitě",
        body: "Člověk pracuje ve svém přirozeném prostředí — doma, ve třídě, v týmu, organizaci nebo venku. Výstup musí být konkrétní: rozhodnutí, opravená věc, analýza, společný návrh, služba nebo jiný ověřitelný výsledek.",
      },
      {
        title: "Doložení důkazu",
        subtitle: "Fakta místo slibů",
        body: "K výsledku se připojí přiměřený důkaz: fotografie, dokument, odkaz, měření, záznam procesu nebo jiná ověřitelná stopa. Bez doloženého výsledku se aktivita nemůže stát ověřenou Experience.",
      },
      {
        title: "Osobní reflexe",
        subtitle: "Pochopení vlastní zkušenosti",
        body: "Člověk vlastními slovy pojmenuje, co se stalo, co fungovalo, co ne, co se naučil a kde by zkušenost použil znovu. Reflexe není test správné odpovědi ani prostor pro automatické hodnocení osobnosti.",
      },
      {
        title: "Lidské ověření",
        subtitle: "Oddělená kontrola",
        body: "Oprávněný člověk podle typu Experience zkontroluje doloženou práci. Ve školním toku je to učitel nebo koordinátor; u vybraných toků může být zapojen další oprávněný svědek. Ověřuje se konkrétní zkušenost, nikdy hodnota člověka.",
      },
    ],
    fanEyebrow: "02 · VÝSLEDEK",
    fanTitle: "Vějíř zkušeností",
    fanQuote: "Mapa toho, co jste skutečně zkusili, vytvořili a doložili.",
    fanBody: "Šestiosý Vějíř neříká, na kolik procent jste chytří, morální nebo lepší než ostatní. Ukazuje hloubku ověřené evidence v šesti oblastech. Hodnota 0–5 není známka člověka; je to popis toho, jak hluboko je konkrétní zkušenost doložená.",
    fanDemo: "Ukázková vizualizace — nejde o skutečný profil ani osobní data.",
    depthTitle: "Co znamená hloubka 0–5",
    depths: [
      ["0", "Zatím žádná ověřená evidence"],
      ["1", "První doložená zkušenost"],
      ["2", "Opakovaná zkušenost"],
      ["3", "Zkušenost v různých kontextech"],
      ["4", "Doložené použití výsledku v praxi"],
      ["5", "Doložený následný dopad"],
    ],
    pillars: [
      ["Poznej sebe", "Digitální pozornost · Kritický rozum", "🟣"],
      ["Tvoř s druhými", "Respektující dialog · Spolupráce", "🟡"],
      ["Zlepšuj svět", "Cirkulární jednání · Lokální dopad", "🟢"],
    ],
    rolesEyebrow: "03 · KDO DĚLÁ CO",
    rolesTitle: "Každý má jasnou roli. Nikdo nepotřebuje vidět všechno.",
    rolesIntro: "Pansofie odděluje práci, podporu, ověření a soukromí. Role dostává jen takový přístup, který potřebuje pro konkrétní krok.",
    handoffs: [
      ["Mladý člověk", "pracuje → dokládá → reflektuje", "Vlastní svou reflexi a vlastní cestu zkušeností."],
      ["Učitel / škola", "vytváří rámec → vede → ověřuje", "Ověřuje doloženou práci, ne lidskou hodnotu."],
      ["Rodina / mentor", "přidává kontext → podporuje", "Pomáhá jen v rozsahu, který má pro konkrétní zkušenost smysl."],
      ["Partner / komunita", "přináší potřebu → reaguje na výstup", "Vidí jen informace určené ke spolupráci, ne soukromý Passport."],
    ],
    trustEyebrow: "04 · DŮVĚRA OD ZAČÁTKU",
    trustTitle: "Bezpečí stojí na jasných hranicích, ne na slibech.",
    trust: [
      "Žádné hodnocení lidské hodnoty, osobnosti ani předurčení kariéry.",
      "Žádný veřejný dětský profil ani otevřená sociální síť dětí.",
      "Soukromá reflexe není automaticky dostupná rodiči, mentorovi ani partnerovi.",
      "Dokončená aktivita, použití výsledku a následný dopad jsou tři různé věci a systém je nezaměňuje.",
      "AI může pomáhat s otázkami a strukturou, ale důležitá rozhodnutí a ověření zůstávají na lidech.",
    ],
    ctaTitle: "Chcete si celý princip osahat na vlastní oči?",
    ctaBody: "Ve veřejném demu projdete mini-situací, zvolíte postup, uvidíte modelový důkaz, napíšete lokální reflexi a zobrazíte si náhled Vějíře. Nic z toho se v demu nevydává za skutečně ověřenou Experience.",
    ctaTry: "Vyzkoušet Ochutnejte Pansofii",
    ctaJoin: "Požádat o zapojení",
    ctaNote: "Veřejná samoobslužná registrace není otevřená. Pilotní účty se aktivují řízeně.",
  },
  en: {
    kicker: "How Pansofie works",
    titleA: "From a real action to a",
    titleB: "verified experience.",
    lead: "Pansofie is not built around dry theory, points or an endless feed. It is an ecosystem where a person actually does something, documents the result, reflects on it and has the work reviewed.",
    support: "The goal is not to score a person. The goal is to build a trustworthy map of what they actually tried, created, used and what follow-up impact could be documented.",
    try: "Try the full cycle",
    roles: "Explore by role",
    cycleEyebrow: "01 · FIVE STEPS OF THE PANSOFIE CYCLE",
    cycleTitle: "Fewer promises. More real work, evidence and understanding.",
    cycleIntro: "One Experience emerges step by step. Each step has a different purpose and none of them is a score of the person.",
    steps: [
      { title: "A real mission", subtitle: "A reason to act", body: "Everything begins with a concrete challenge. Missions can address digital manipulation, relationships, cooperation, technology, circularity or a local need. We do not test definitions — we look for something worth actually doing." },
      { title: "Action and outcome", subtitle: "Work in the real world", body: "A person works in their natural environment — at home, in class, in a team, an organization or outdoors. The outcome must be concrete: a decision, repaired object, analysis, shared proposal, service or another verifiable result." },
      { title: "Documented evidence", subtitle: "Facts instead of promises", body: "An appropriate proof is attached to the outcome: a photo, document, link, measurement, process record or another verifiable trace. Without a documented outcome, an activity cannot become a verified Experience." },
      { title: "Personal reflection", subtitle: "Understanding your own experience", body: "The person describes in their own words what happened, what worked, what did not, what they learned and where they could apply it again. Reflection is not a test of the right answer or a place for automated personality scoring." },
      { title: "Human verification", subtitle: "Independent review", body: "An authorized person reviews the documented work according to the Experience type. In the school flow this is a teacher or coordinator; selected flows may involve another authorized witness. The concrete Experience is reviewed, never the value of the person." },
    ],
    fanEyebrow: "02 · THE RESULT",
    fanTitle: "Experience Fan",
    fanQuote: "A map of what you have actually tried, created and documented.",
    fanBody: "The six-axis Fan does not say how many percent smart, moral or better than others you are. It shows the depth of verified evidence across six areas. A value from 0–5 is not a grade for a person; it describes how deeply a concrete Experience is documented.",
    fanDemo: "Illustrative visualization — this is not a real profile or personal data.",
    depthTitle: "What evidence depth 0–5 means",
    depths: [["0", "No verified evidence yet"], ["1", "First documented Experience"], ["2", "Repeated Experience"], ["3", "Experience across contexts"], ["4", "Documented use of the outcome"], ["5", "Documented follow-up impact"]],
    pillars: [["Know yourself", "Digital attention · Critical reason", "🟣"], ["Create with others", "Respectful dialogue · Cooperation", "🟡"], ["Improve the world", "Circular action · Local impact", "🟢"]],
    rolesEyebrow: "03 · WHO DOES WHAT",
    rolesTitle: "Everyone has a clear role. Nobody needs to see everything.",
    rolesIntro: "Pansofie separates work, support, verification and privacy. Each role only gets the access needed for a concrete step.",
    handoffs: [["Young person", "works → documents → reflects", "Owns their reflection and their path of Experiences."], ["Teacher / school", "creates the frame → guides → verifies", "Verifies documented work, not human worth."], ["Family / mentor", "adds context → supports", "Helps only to the extent relevant to the specific Experience."], ["Partner / community", "brings a need → responds to an outcome", "Sees only information intended for collaboration, not a private Passport."]],
    trustEyebrow: "04 · TRUST FROM THE START",
    trustTitle: "Safety rests on clear boundaries, not promises.",
    trust: ["No scoring of human worth, personality or predetermined career fit.", "No public child profile or open social network for children.", "Private reflection is not automatically available to a parent, mentor or partner.", "A completed activity, use of its outcome and follow-up impact are different things and the system does not conflate them.", "AI may help with questions and structure, but important decisions and verification remain human."],
    ctaTitle: "Want to experience the whole principle yourself?",
    ctaBody: "In the public demo you go through a mini-situation, choose an approach, see model evidence, write a local reflection and preview the Experience Fan. Nothing in the demo is presented as a genuinely verified Experience.",
    ctaTry: "Try Taste Pansofie",
    ctaJoin: "Request to join",
    ctaNote: "Public self-service registration is not open. Pilot accounts are activated in a governed way.",
  },
};

const STEP_ICONS = [Target, Wrench, Camera, PenLine, Eye];

const DEMO_FAN_ROWS = [
  { axis_code: "digital_attention", pillar_code: "know_self", depth: 1, experience_count: 1, evidence_count: 1, context_count: 1, latest_title: "Ukázková práce s digitální pozorností" },
  { axis_code: "critical_reason", pillar_code: "know_self", depth: 2, experience_count: 2, evidence_count: 2, context_count: 1, latest_title: "Ověření původu a kontextu informace" },
  { axis_code: "respectful_dialogue", pillar_code: "create_with_others", depth: 1, experience_count: 1, evidence_count: 1, context_count: 1, latest_title: "Reflexe společného dialogu" },
  { axis_code: "cooperation", pillar_code: "create_with_others", depth: 0, experience_count: 0, evidence_count: 0, context_count: 0, latest_title: null },
  { axis_code: "circular_action", pillar_code: "improve_world", depth: 1, experience_count: 1, evidence_count: 1, context_count: 1, latest_title: "Druhý život funkční věci" },
  { axis_code: "local_impact", pillar_code: "improve_world", depth: 0, experience_count: 0, evidence_count: 0, context_count: 0, latest_title: null },
];

export default function JakFunguje() {
  const { locale: rawLocale } = useLanguage();
  const locale = rawLocale === "en" ? "en" : "cs";
  const t = COPY[locale];

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute -top-40 left-[8%] h-[520px] w-[620px] rounded-full bg-violet-500/[0.07] blur-3xl" />
            <div className="absolute top-20 right-[3%] h-[440px] w-[520px] rounded-full bg-emerald-500/[0.06] blur-3xl" />
          </div>
          <div className="container-px max-w-7xl mx-auto py-14 sm:py-24">
            <div className="max-w-5xl">
              <span className="chip bg-primary/10 text-primary mb-6"><Compass size={14} /> {t.kicker}</span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold font-display tracking-tight text-balance leading-[1.03]">
                {t.titleA} <span className="text-primary">{t.titleB}</span>
              </h1>
              <p className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">{t.lead}</p>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">{t.support}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/pro-koho#ochutnejte" className="action-primary w-full sm:w-auto px-6 py-3.5">{t.try} <ArrowRight size={18} /></Link>
                <Link to="/pro-koho" className="action-secondary w-full sm:w-auto px-6 py-3.5">{t.roles} <UsersRound size={16} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-4xl">
              <p className="eyebrow">{t.cycleEyebrow}</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">{t.cycleTitle}</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-3xl">{t.cycleIntro}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-x-8">
              {t.steps.map((step, index) => {
                const Icon = STEP_ICONS[index];
                return (
                  <React.Fragment key={step.title}>
                    <div className="hidden xl:flex flex-col items-center">
                      <span className="h-12 w-12 rounded-2xl bg-primary/10 text-primary border border-primary/15 flex items-center justify-center"><Icon size={20} /></span>
                      {index < t.steps.length - 1 && <span className="w-px flex-1 min-h-10 bg-primary/20" />}
                    </div>
                    <article className="relative mb-5 rounded-3xl border border-border bg-background/80 p-5 sm:p-7 shadow-sm">
                      <div className="flex items-start gap-4">
                        <span className="xl:hidden h-11 w-11 shrink-0 rounded-2xl bg-primary/10 text-primary border border-primary/15 flex items-center justify-center"><Icon size={19} /></span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{String(index + 1).padStart(2, "0")} · {step.subtitle}</p>
                          <h3 className="mt-2 text-xl sm:text-2xl font-semibold font-heading">{step.title}</h3>
                          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-4xl">{step.body}</p>
                        </div>
                      </div>
                    </article>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container-px max-w-7xl mx-auto py-16 sm:py-24">
          <div className="grid grid-cols-1 xl:grid-cols-[0.78fr_1.22fr] gap-10 xl:gap-14 items-start">
            <div className="xl:sticky xl:top-36">
              <p className="eyebrow">{t.fanEyebrow}</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">{t.fanTitle}</h2>
              <p className="mt-4 text-lg font-medium text-foreground">“{t.fanQuote}”</p>
              <p className="mt-5 text-muted-foreground leading-relaxed">{t.fanBody}</p>

              <div className="mt-7 grid gap-3">
                {t.pillars.map(([title, axes, dot]) => (
                  <div key={title} className="rounded-2xl border border-border bg-card/45 p-4">
                    <p className="font-semibold">{dot} {title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{axes}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.depthTitle}</p>
                <div className="mt-3 divide-y divide-border border-y border-border">
                  {t.depths.map(([level, description]) => (
                    <div key={level} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3 text-sm">
                      <span className="font-mono font-semibold text-primary">{level}</span>
                      <span className="text-muted-foreground">{description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.055] px-4 py-3 text-xs text-muted-foreground flex items-start gap-2">
                <Sparkles size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <span>{t.fanDemo}</span>
              </div>
              <ExperienceFan rows={DEMO_FAN_ROWS} locale={locale} />
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <div className="max-w-4xl">
              <p className="eyebrow">{t.rolesEyebrow}</p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight text-balance">{t.rolesTitle}</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{t.rolesIntro}</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {t.handoffs.map(([title, flow, boundary]) => (
                <article key={title} className="surface-raised p-5 sm:p-6">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm font-semibold text-primary leading-relaxed">{flow}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{boundary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container-px max-w-6xl mx-auto py-16 sm:py-24">
          <div className="rounded-[2rem] bg-foreground text-background p-8 sm:p-12 lg:p-14 shadow-[0_30px_80px_-48px_rgba(23,32,28,0.9)]">
            <div className="flex items-start gap-4">
              <ShieldCheck size={25} className="shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">{t.trustEyebrow}</p>
                <h2 className="mt-3 text-3xl sm:text-5xl font-semibold font-display tracking-tight">{t.trustTitle}</h2>
                <div className="mt-8 space-y-4">
                  {t.trust.map((item) => (
                    <div key={item} className="flex gap-3 text-sm sm:text-base text-background/75">
                      <CheckCircle2 size={17} className="shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/bezpecnost" className="inline-flex items-center gap-2 font-semibold text-sm">{locale === "en" ? "Child safety" : "Bezpečnost dětí"} <ArrowRight size={16} /></Link>
                  <Link to="/soukromi" className="inline-flex items-center gap-2 font-semibold text-sm text-background/75">{locale === "en" ? "Privacy" : "Soukromí"} <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/40">
          <div className="container-px max-w-5xl mx-auto py-20 sm:py-28 text-center">
            <Sparkles className="mx-auto text-primary" size={28} />
            <h2 className="mt-5 text-3xl sm:text-5xl font-semibold font-display tracking-tight">{t.ctaTitle}</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">{t.ctaBody}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/pro-koho#ochutnejte" className="action-primary w-full sm:w-auto px-7 py-3.5">{t.ctaTry} <ArrowRight size={18} /></Link>
              <Link to="/zapojit-se" className="action-secondary w-full sm:w-auto px-7 py-3.5">{t.ctaJoin} <ArrowRight size={16} /></Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t.ctaNote}</p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
