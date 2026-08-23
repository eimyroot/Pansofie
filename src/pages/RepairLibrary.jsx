import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, Boxes, BriefcaseBusiness, Clock3, Leaf, MapPin, Search, Share2, ShieldCheck } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useLanguage } from "@/lib/LanguageContext";
import { CZECH_REGIONS } from "@/lib/pansofieParticipationFlow";
import { listPublicAvailableMaterials } from "@/lib/pansofieLibraryFlow";

const STATIC_ITEMS = {
  cs: [
    {
      id: "labyrint-algoritmu",
      pillar: "know_self",
      type: "classroom",
      title: "Labyrint algoritmů: Jak fungují sociální sítě?",
      summary: "Otevřený 45minutový scénář, ve kterém si žáci na papíře nasimulují jednoduchý doporučovací algoritmus a rozliší model, důkaz a nejistotu.",
      impact: "Kritické myšlení · digitální hygiena · práce s nejistotou",
      meta: "Věk 12–15 let · 45 min",
      href: "/materials/pansofie-labyrint-algoritmu.md",
      action: "Prohlédnout celý scénář",
      source: "Pansofie · pracovní scénář",
    },
    {
      id: "stavitele-mostu",
      pillar: "create_together",
      type: "classroom",
      title: "Stavitelé mostů: Jak popsat i názor, se kterým nesouhlasím?",
      summary: "Krátké dialogové cvičení pro bezpečné třídní téma. Úkolem není vyhrát spor, ale férově reprodukovat argument druhé strany a hledat společný bod.",
      impact: "Dialog · naslouchání · spolupráce",
      meta: "Třída / skupina · 20–35 min",
      href: "/materials/pansofie-stavitele-mostu-dialog.md",
      action: "Otevřít cvičení",
      source: "Pansofie · pracovní scénář",
    },
    {
      id: "porada-bez-ega",
      pillar: "create_together",
      type: "company",
      title: "Porada bez ega: konstruktivní oponování",
      summary: "Týdenní týmový experiment s rolí konstruktivního oponenta. Kritika míří na předpoklady, chybějící důkaz a dopad rozhodnutí — ne na osobnost autora.",
      impact: "Rozhodování · psychologické bezpečí · kvalita argumentů",
      meta: "Týmová výzva · 1 týden",
      href: "/materials/pansofie-porada-bez-ega.md",
      action: "Otevřít průvodce",
      source: "Pansofie · pracovní výzva",
    },
    {
      id: "restart-pozornosti",
      pillar: "know_self",
      type: "company",
      title: "Restart pozornosti: tiché dopoledne jako experiment",
      summary: "Ohraničený pokus s blokem hluboké práce bez interních meetingů a notifikací. Tým po něm hodnotí přerušení, kvalitu práce a vlastní zkušenost.",
      impact: "Pozornost · digitální rovnováha · evidence před dojmem",
      meta: "Týmový experiment · 1 týden",
      href: "/materials/pansofie-restart-pozornosti-team-guide.md",
      action: "Otevřít experiment",
      source: "Pansofie · pracovní výzva",
    },
    {
      id: "eticky-kompas-ai",
      pillar: "improve_world",
      type: "company",
      title: "Etický kompas AI: co ověřit před nasazením technologie",
      summary: "Pracovní checklist dopadu, dat, lidské kontroly a nejistoty. Výsledkem není certifikát, ale seznam rizik, důkazů a dalších kroků.",
      impact: "Etika technologií · odpovědnost · lidská kontrola",
      meta: "Tým / vedení · 30–60 min",
      href: "/materials/pansofie-eticky-kompas-ai-checklist.md",
      action: "Otevřít checklist",
      source: "Pansofie · pracovní nástroj",
    },
  ],
  en: [
    {
      id: "labyrint-algoritmu",
      pillar: "know_self",
      type: "classroom",
      title: "Algorithm Labyrinth: How do social feeds work?",
      summary: "An open 45-minute scenario in which learners simulate a simple recommendation algorithm on paper and separate model, evidence and uncertainty.",
      impact: "Critical thinking · digital hygiene · uncertainty",
      meta: "Age 12–15 · 45 min",
      href: "/materials/pansofie-labyrint-algoritmu.md",
      action: "Open the full scenario",
      source: "Pansofie · working scenario",
    },
    {
      id: "stavitele-mostu",
      pillar: "create_together",
      type: "classroom",
      title: "Bridge Builders: Can I describe a view I disagree with?",
      summary: "A bounded dialogue exercise on a safe classroom topic. The goal is not to win but to represent the other side fairly and identify shared ground.",
      impact: "Dialogue · listening · cooperation",
      meta: "Class / group · 20–35 min",
      href: "/materials/pansofie-stavitele-mostu-dialog.md",
      action: "Open the exercise",
      source: "Pansofie · working scenario",
    },
    {
      id: "porada-bez-ega",
      pillar: "create_together",
      type: "company",
      title: "Meeting Without Ego: constructive opposition",
      summary: "A one-week team experiment with a constructive opponent. Critique targets assumptions, missing evidence and decision impact — not the author's personality.",
      impact: "Decision quality · psychological safety · argument quality",
      meta: "Team challenge · 1 week",
      href: "/materials/pansofie-porada-bez-ega.md",
      action: "Open the guide",
      source: "Pansofie · working challenge",
    },
    {
      id: "restart-pozornosti",
      pillar: "know_self",
      type: "company",
      title: "Attention Reset: a quiet-morning experiment",
      summary: "A bounded deep-work block without internal meetings and notifications. Afterwards the team compares interruptions, work quality and lived experience.",
      impact: "Attention · digital balance · evidence before assumption",
      meta: "Team experiment · 1 week",
      href: "/materials/pansofie-restart-pozornosti-team-guide.md",
      action: "Open the experiment",
      source: "Pansofie · working challenge",
    },
    {
      id: "eticky-kompas-ai",
      pillar: "improve_world",
      type: "company",
      title: "AI Ethical Compass: what to check before deployment",
      summary: "A working checklist for impact, data, human oversight and uncertainty. The output is not a certificate but a list of risks, evidence and next steps.",
      impact: "Technology ethics · responsibility · human oversight",
      meta: "Team / leadership · 30–60 min",
      href: "/materials/pansofie-eticky-kompas-ai-checklist.md",
      action: "Open the checklist",
      source: "Pansofie · working tool",
    },
  ],
};

const PILLARS = {
  cs: [["all", "Všechny pilíře"], ["know_self", "Poznej sebe"], ["create_together", "Tvoř s druhými"], ["improve_world", "Zlepšuj svět"]],
  en: [["all", "All pillars"], ["know_self", "Know yourself"], ["create_together", "Create with others"], ["improve_world", "Improve the world"]],
};

const TYPES = {
  cs: [["all", "Vše"], ["classroom", "Scénáře do výuky"], ["company", "Firemní výzvy"], ["material", "Cirkulární most"]],
  en: [["all", "All"], ["classroom", "Classroom scenarios"], ["company", "Organization challenges"], ["material", "Circular bridge"]],
};

const PILLAR_LABEL = {
  cs: { know_self: "Poznej sebe", create_together: "Tvoř s druhými", improve_world: "Zlepšuj svět" },
  en: { know_self: "Know yourself", create_together: "Create with others", improve_world: "Improve the world" },
};

function typeLabel(type, lang) {
  const map = lang === "en"
    ? { classroom: "Classroom scenario", company: "Team challenge", material: "Material Bridge" }
    : { classroom: "Scénář do výuky", company: "Týmová výzva", material: "Materiálový most" };
  return map[type] || type;
}

function MaterialCardData(row, lang) {
  const en = lang === "en";
  return {
    id: `material-${row.listing_id}`,
    pillar: "improve_world",
    type: "material",
    title: row.title,
    summary: row.description || (en ? "A real AVAILABLE item from the Material Bridge." : "Skutečná položka ve stavu AVAILABLE z Materiálového mostu."),
    impact: row.listing_type === "request" ? (en ? "Real material request" : "Skutečná materiálová poptávka") : (en ? "Second life for useful material" : "Druhý život užitečného materiálu"),
    meta: [row.region, row.locality, row.quantity].filter(Boolean).join(" · "),
    href: "/login?returnTo=/materialovy-most/workspace",
    action: row.listing_type === "request" ? (en ? "I may be able to help" : "Možná mohu pomoci") : (en ? "I am interested" : "Mám zájem"),
    source: en ? "Live network · AVAILABLE" : "Živá síť · AVAILABLE",
    region: row.region,
  };
}

export default function RepairLibrary() {
  const { locale } = useLanguage();
  const lang = locale === "en" ? "en" : "cs";
  const en = lang === "en";
  const [pillar, setPillar] = useState("all");
  const [type, setType] = useState("all");
  const [region, setRegion] = useState("");
  const [materials, setMaterials] = useState([]);
  const [backendUnavailable, setBackendUnavailable] = useState(false);
  const [visible, setVisible] = useState(9);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    let active = true;
    setBackendUnavailable(false);
    listPublicAvailableMaterials(region || null)
      .then((rows) => { if (active) setMaterials(rows); })
      .catch(() => { if (active) { setMaterials([]); setBackendUnavailable(true); } });
    return () => { active = false; };
  }, [region]);

  const items = useMemo(() => {
    const materialItems = materials.map((row) => MaterialCardData(row, lang));
    return [...STATIC_ITEMS[lang], ...materialItems]
      .filter((item) => pillar === "all" || item.pillar === pillar)
      .filter((item) => type === "all" || item.type === type)
      .filter((item) => !region || item.type !== "material" || item.region === region);
  }, [lang, materials, pillar, type, region]);

  useEffect(() => { setVisible(9); }, [pillar, type, region]);

  const share = async (item) => {
    const url = `${window.location.origin}/knihovna#${item.id}`;
    try {
      if (navigator.share) await navigator.share({ title: item.title, text: item.summary, url });
      else await navigator.clipboard.writeText(url);
      setShareStatus(en ? "Link ready to share." : "Odkaz je připravený ke sdílení.");
    } catch (err) {
      if (err?.name !== "AbortError") setShareStatus(en ? "Sharing is not available in this browser." : "Sdílení v tomto prohlížeči není dostupné.");
    }
  };

  return (
    <div className="min-h-screen r14-library-page">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r14-library-hero">
          <div className="container-px max-w-7xl mx-auto py-14 sm:py-20">
            <span className="r14-library-kicker"><BookOpenCheck size={18} /> {en ? "REPAIR LIBRARY" : "KNIHOVNA NÁPRAVY"}</span>
            <h1>{en ? "Do not hide the method. Put it where people can try it." : "Neschovávejme metodu. Ukažme ji tam, kde si ji lidé mohou osahat."}</h1>
            <p>{en ? "Open classroom scenarios, team experiments and real circular-network listings in one searchable board. Pansofie working content is labelled as such; live material cards come only from real AVAILABLE records." : "Otevřené scénáře do výuky, týmové experimenty a skutečné nabídky cirkulární sítě na jedné prohledávatelné nástěnce. Pracovní obsah Pansofie je tak označený; živé materiálové karty vznikají jen z reálných záznamů AVAILABLE."}</p>
          </div>
        </section>

        <section className="r14-library-body">
          <div className="container-px max-w-7xl mx-auto py-10 sm:py-14">
            <div className="r14-library-filters" aria-label={en ? "Library filters" : "Filtry knihovny"}>
              <div><span>{en ? "Pillar" : "Pilíř"}</span><div className="r14-filter-pills">{PILLARS[lang].map(([value, label]) => <button key={value} type="button" className={pillar === value ? "is-active" : ""} onClick={() => setPillar(value)}>{label}</button>)}</div></div>
              <div><span>{en ? "Activity type" : "Typ aktivity"}</span><div className="r14-filter-pills">{TYPES[lang].map(([value, label]) => <button key={value} type="button" className={type === value ? "is-active" : ""} onClick={() => setType(value)}>{label}</button>)}</div></div>
              <label><span><MapPin size={14} /> {en ? "Location for material help" : "Lokalita pro materiálovou pomoc"}</span><select value={region} onChange={(e) => setRegion(e.target.value)}><option value="">{en ? "Whole Czech Republic" : "Celá ČR"}</option>{CZECH_REGIONS.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            </div>

            {backendUnavailable && (
              <div className="r14-library-boundary"><ShieldCheck size={18} /><span>{en ? "The live Material Bridge reader is not enabled in this environment. The library therefore shows no synthetic material offers." : "Živý čtecí výřez Materiálového mostu není v tomto prostředí aktivní. Knihovna proto nezobrazuje žádné smyšlené materiálové nabídky."}</span></div>
            )}
            {shareStatus && <div className="r14-library-share-status" role="status">{shareStatus}</div>}

            <div className="r14-library-count"><Search size={16} /><strong>{items.length}</strong><span>{en ? "matching items" : "odpovídajících položek"}</span></div>

            <div className="r14-library-grid">
              {items.slice(0, visible).map((item) => {
                const Icon = item.type === "classroom" ? BookOpenCheck : item.type === "company" ? BriefcaseBusiness : Boxes;
                return (
                  <article id={item.id} key={item.id} className={`r14-library-card r14-library-card--${item.pillar}`}>
                    <div className="r14-library-card-top"><span className="r14-library-icon"><Icon size={21} /></span><button type="button" onClick={() => share(item)} aria-label={en ? `Share ${item.title}` : `Sdílet ${item.title}`}><Share2 size={16} /></button></div>
                    <div className="r14-library-tags"><span>{PILLAR_LABEL[lang][item.pillar]}</span><span>{typeLabel(item.type, lang)}</span>{item.region && <span>{item.region}</span>}</div>
                    <p className="r14-library-source">{item.source}</p>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                    <div className="r14-library-impact"><Leaf size={15} /><span>{item.impact}</span></div>
                    <div className="r14-library-meta"><Clock3 size={14} /><span>{item.meta || (en ? "Details in the item" : "Detaily v položce")}</span></div>
                    {item.href.startsWith("/materials/") ? <a href={item.href} className="r14-library-action">{item.action} <ArrowRight size={15} /></a> : <Link to={item.href} className="r14-library-action">{item.action} <ArrowRight size={15} /></Link>}
                  </article>
                );
              })}
            </div>

            {items.length === 0 && <div className="r14-library-empty"><Search size={24} /><h2>{en ? "Nothing matches this combination yet." : "Této kombinaci zatím nic neodpovídá."}</h2><p>{en ? "Change a filter. Empty means empty — the catalogue does not invent filler cards." : "Změňte filtr. Prázdný výsledek znamená prázdný výsledek — katalog nevymýšlí výplňové karty."}</p></div>}

            {visible < items.length && <div className="r14-library-more"><button type="button" className="action-secondary" onClick={() => setVisible((n) => n + 9)}>{en ? "Load more" : "Načíst další"}</button></div>}

            <div className="r14-library-network-entry">
              <div><span>{en ? "CIRCULAR NETWORK" : "CIRKULÁRNÍ SÍŤ"}</span><h2>{en ? "Have something useful, or need something for a real project?" : "Máte něco užitečného, nebo něco potřebujete pro skutečný projekt?"}</h2><p>{en ? "The Material Bridge is open to individuals, families, schools, companies, non-profits, municipalities and communities." : "Materiálový most je otevřený jednotlivcům, rodinám, školám, firmám, spolkům, obcím i komunitám."}</p></div>
              <Link to="/materialovy-most/zapojit-se" className="action-primary">{en ? "Offer or request" : "Nabídnout nebo poptat"} <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
