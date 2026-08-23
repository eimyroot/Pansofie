import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Compass,
  ExternalLink,
  FileCheck2,
  Globe2,
  HeartHandshake,
  History,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useLanguage } from "@/lib/LanguageContext";

const SOURCE_URLS = {
  constitution: "https://github.com/nulleimy/PANSOFIE/blob/main/docs/canonical/PANSOFIE_PRODUCT_CONSTITUTION_V1.0.md",
  pansophiaEdition: "https://www.cupress.cuni.cz/ink2_ext/index.jsp?id=550709&include=podrobnosti",
  humanizationStudy: "https://pages.pedf.cuni.cz/pedagogika/?p=10929",
  historySystemStudy: "https://ojs.cuni.cz/dejinyteoriekritika/article/view/4575",
};

const COPY = {
  cs: {
    heroEyebrow: "O Pansofii",
    heroTitle: "Učení má větší smysl, když se propojí se skutečným životem.",
    heroLead: "Pansofie vzniká kolem jednoduché otázky: co když po učení nezůstane jen známka nebo splněný úkol, ale zkušenost, konkrétní výsledek, důkaz, vlastní reflexe a smysluplný další krok?",
    heroNote: "Digitální část už funguje a prošla technickými kontrolami. Skutečnou hodnotu ale musí potvrdit reálné používání ve škole, rodině a komunitě.",
    join: "Jak se můžu zapojit",
    how: "Jak Pansofie funguje",

    whyEyebrow: "Proč Pansofie vzniká",
    whyTitle: "Učení získává jinou hodnotu ve chvíli, kdy člověk něco skutečně udělá, doloží a pochopí.",
    whyLead: "Nechceme nahradit školu platformou. Stavíme bezpečnou vrstvu, která propojuje skutečnou práci, lidi kolem ní, důkaz, reflexi a další krok.",
    why: [
      ["Zkušenost před simulací", "Digitální nástroje mají vést zpět k reálnému jednání, tvorbě nebo zlepšení něčeho skutečného.", Compass],
      ["Důkaz před dojmem", "Oddělujeme aktivitu, konkrétní výstup, použití výsledku, reflexi a případný dopad.", FileCheck2],
      ["Souvislosti před izolací", "Škola, rodina, mentor, partner i komunita mohou přinášet jinou část reality a nemusí přitom vidět stejné informace.", Network],
      ["Důvěra před růstem", "Soukromí, ochrana dětí a lidská odpovědnost mají přednost před škálováním a efektními funkcemi.", ShieldCheck],
    ],

    historyEyebrow: "Historie, ze které vycházíme",
    historyTitle: "Název Pansofie není dekorace. Odkazuje na dlouhou snahu vidět poznání jako propojený celek.",
    historyBridgeTitle: "Nestačí znát jednotlivé věci. Potřebujeme vidět, jak spolu souvisejí.",
    historyLead: "Pansofie se inspiruje pansofickou snahou Jana Amose Komenského spojovat poznání do souvislostí, vztahovat je k celku lidského života a hledat cestu od poznání k odpovědnému jednání. Historickou inspiraci bereme vážně, ale nepoužíváme ji jako marketingovou legendu: oddělujeme původní pansofický projekt, jeho dnešní odborný výklad a náš současný produktový návrh.",
    timeline: [
      ["17. století", "Komenského pansofický projekt", "Jan Amos Komenský rozvíjel pansofii jako pokus uspořádat poznání v souvislostech a vztahovat je k celku lidského života. Nešlo jen o soubor izolovaných faktů, ale o hledání řádu, vztahů a širšího smyslu poznání."],
      ["Pracovní princip", "OMNES · OMNIA · OMNINO", "V našem canonical rámci překládáme tento pansofický motiv pracovně jako dostupnost napříč rolemi a etapami života, hledání vztahů a celku místo izolovaných faktů a používání více vhodných cest učení a zkušenosti."],
      ["Dnes", "Současná Pansofie", "Dnešní Pansofie je ale náš současný produkt, ne digitální rekonstrukce Komenského díla. Je to vlastní moderní systém rozvoje člověka prostřednictvím skutečných zkušeností. AI, digitální portfolio, sedm cest rozvoje, bezpečnostní architektura ani současný produktový loop nejsou Komenského návrhy — jsou naše současné konstrukce."],
    ],

    sourcesEyebrow: "O jaké zdroje se opíráme",
    sourcesTitle: "Historickou inspiraci opíráme o primární dílo, kritické edice a odborný výklad — ne o volné internetové citáty.",
    sourcesLead: "Historické a odborné zdroje nám pomáhají chápat pansofii v dobovém kontextu. Nejsou důkazem účinnosti dnešního produktu; současná Pansofie se řídí vlastní canonical konstitucí a její přínos musí ověřit realita.",
    sources: [
      ["Primární historický základ / kritická edice", "J. A. Komenský — Pansophia v Obecné poradě o nápravě věcí lidských", "Kritická edice Opera omnia 19/II zachycuje Pansophii jako ústřední a nejrozsáhlejší část Komenského Obecné porady. Je to hlavní historický zdroj pro samotný pojem pansofie.", SOURCE_URLS.pansophiaEdition, "Kritická edice / Karolinum"],
      ["Odborný komeniologický výklad", "Dagmar Čapková — Škola a utváření lidství v pojetí J. A. Komenského", "Studie pracuje s pansofickým vzděláváním, pojetím celku a celostnosti, humanitas a rámcem omnes omnia omnino. Pomáhá držet historický význam dál od zjednodušených sloganů.", SOURCE_URLS.humanizationStudy, "Pedagogika / UK"],
      ["Současný odborný výzkum", "Lenka Řezníková — Between History and System. Historical Knowledge in Comenius’ Pansophy", "Studie zkoumá vztah mezi systematickým uspořádáním poznání a historickým myšlením v Komenského Pansophii. Je užitečná pro rozlišení mezi historickým projektem a dnešní interpretací.", SOURCE_URLS.historySystemStudy, "Dějiny – teorie – kritika / UK"],
      ["Současný zdroj pravdy Pansofie", "PANSOFIE Product Constitution V1.0", "Canonical dokument určuje, co si z pansofické inspirace bereme dnes — a zároveň výslovně zakazuje připisovat Komenskému moderní AI, digitální portfolio, gamifikaci nebo sedm cest rozvoje.", SOURCE_URLS.constitution, "Canonical dokument / GitHub"],
    ],

    boundaryEyebrow: "Historie ≠ dnešní produkt",
    boundaryTitle: "Inspiraci nepřevádíme mechanicky. Překládáme ji do současných pravidel a současně držíme hranici.",
    boundaryBody: "Komenskému nepřipisujeme dnešní software, umělou inteligenci, herní mechaniky, skóre ani současnou architekturu Pansofie. Nepřebíráme teologii 17. století jako produktový požadavek, netvrdíme, že Pansofie dokončuje Komenského projekt, a nepoužíváme jeho jméno k ospravedlnění funkcí, které historicky neexistovaly.",
    inheritedTitle: "Co si bereme",
    inherited: ["poznání v souvislostech", "vztah učení k celku života", "dostupnost rozvoje napříč rolemi a etapami života", "směřování od poznání k odpovědnému jednání"],
    notInheritedTitle: "Co mu nepřipisujeme",
    notInherited: ["AI a automatizované rozhodování", "digitální portfolio a současnou datovou architekturu", "skóre člověka, osobnosti nebo osudu", "současné produktové, herní a obchodní mechanismy"],

    maturityEyebrow: "Kdo jsme a kde jsme",
    maturityTitle: "Jsme ve fázi, kdy se produkt musí potkat s realitou.",
    maturityBody: "Pansofie je vznikající produkt a pilotní iniciativa. Digitální vrstva může být technicky připravená, ale teprve skutečné používání ukáže, jestli je srozumitelná, bezpečná, únosná pro pedagogy a opravdu užitečná pro mladé lidi.",
    publicIdentity: "Jména lidí za projektem, právního provozovatele a veřejný kontaktní kanál doplníme před veřejným náborem do reálného pilotu. Dokud tyto údaje nejsou připravené k ověření, nechceme vytvářet falešný dojem hotové instituce.",
    status: [
      ["UŽ FUNGUJE", "Veřejný web, PANSOFIEDIT, digitální postup školní zkušenosti a bezpečně oddělená spolupráce s partnerem jsou implementované a technicky otestované."],
      ["POTŘEBUJEME OVĚŘIT", "Srozumitelnost pro žáky, učitele a rodiny, reálnou zátěž pedagogů, kvalitu partnerství a to, zda zkušenost vede k užitečnému dalšímu kroku."],
      ["ZATÍM NEMÁME DŮKAZ", "Nemáme za sebou vyhodnocený pilot v reálné škole, prokázaný dlouhodobý pedagogický dopad ani dlouhodobé výsledky napříč více školami."],
      ["DALŠÍ KROK", "Řízený školní pilot s jasnými cíli, ochranou dětí, pravidly soukromí a předem definovaným způsobem vyhodnocení."],
    ],

    whoEyebrow: "Koho potřebujeme",
    whoTitle: "Ne publikum. Lidi, kteří nám pomohou zjistit, co je opravdu užitečné.",
    who: [
      ["Škola a pedagogové", "První reálné ověření použitelnosti v běžné výuce a pedagogické zátěže.", Building2, "/zapojit-se?role=school"],
      ["Mladí lidé a rodiny", "Zpětná vazba k významu zkušeností a k tomu, zda hranice soukromí fungují i mimo diagram.", HeartHandshake, "/zapojit-se?role=family"],
      ["Mentoři a odborníci", "Praktický pohled z oboru, kvalitní otázky a zpětná vazba bez přebírání role učitele.", UsersRound, "/zapojit-se?role=mentor"],
      ["Firmy, organizace a obce", "Skutečné výzvy, kontext a možnost bezpečně použít nebo rozvíjet kvalitní výstup.", Target, "/zapojit-se?role=partner"],
    ],
    finalTitle: "Poznej sebe. Tvoř s druhými. Zlepšuj svět.",
    finalBody: "Pansofie má smysl jen tehdy, pokud se historická inspirace, současná technologie a reálná zkušenost potkají v něčem, co je pro člověka skutečně užitečné.",
    finalCta: "Zapojit se do ověřování",
  },
  en: {
    heroEyebrow: "About Pansofie",
    heroTitle: "Learning matters more when it connects to real life.",
    heroLead: "Pansofie starts with a simple question: what if learning left behind more than a grade or a completed task — a real experience, a concrete result, evidence, personal reflection and a meaningful next step?",
    heroNote: "The digital layer works and has passed technical checks. Its real value still has to be demonstrated through use in schools, families and communities.",
    join: "How can I take part?",
    how: "How Pansofie works",

    whyEyebrow: "Why Pansofie exists",
    whyTitle: "Learning changes value when a person actually does something, evidences it and understands it.",
    whyLead: "We are not replacing school with a platform. We are building a safe layer connecting real work, the people around it, evidence, reflection and a next step.",
    why: [
      ["Experience before simulation", "Digital tools should lead back to real action, creation or improvement of something that exists outside the screen.", Compass],
      ["Evidence before impression", "We distinguish activity, a concrete output, use of the result, reflection and any later effect.", FileCheck2],
      ["Connections before isolation", "School, family, mentors, partners and communities can contribute different parts of reality without seeing the same private information.", Network],
      ["Trust before growth", "Privacy, child protection and human accountability come before scale and impressive features.", ShieldCheck],
    ],

    historyEyebrow: "The history we build from",
    historyTitle: "The name Pansofie is not decoration. It points to a long effort to understand knowledge as a connected whole.",
    historyBridgeTitle: "Knowing separate things is not enough. We need to see how they relate.",
    historyLead: "Pansofie is inspired by Jan Amos Comenius’ pansophic effort to connect knowledge, relate it to the whole of human life and move from knowledge toward responsible action. We separate the historical pansophic project, modern scholarship about it and our contemporary product design.",
    timeline: [
      ["17th century", "Comenius’ pansophic project", "Jan Amos Comenius developed pansophy as an attempt to organize knowledge through relationships and connect it with the whole of human life. It was not merely a collection of isolated facts, but a search for order, relationships and a wider meaning of knowledge."],
      ["Working principle", "OMNES · OMNIA · OMNINO", "In our canonical framework we use this pansophic motif as a working translation: accessibility across roles and life stages, relationships and the larger whole rather than isolated facts, and multiple appropriate ways of learning and experience."],
      ["Today", "Contemporary Pansofie", "Today’s Pansofie is our contemporary product, not a digital reconstruction of Comenius’ work. AI, digital portfolios, seven development paths, the safety architecture and the current product loop are contemporary constructions, not designs by Comenius."],
    ],

    sourcesEyebrow: "What sources we rely on",
    sourcesTitle: "We ground the historical inspiration in primary work, critical editions and scholarship — not in loose internet quotations.",
    sourcesLead: "Historical and scholarly sources help us understand pansophy in context. They are not evidence that today’s product works; contemporary Pansofie is governed by its own canonical constitution and must be validated in reality.",
    sources: [
      ["Primary historical basis / critical edition", "J. A. Comenius — Pansophia within the General Consultation on the Reform of Human Affairs", "The Opera omnia 19/II critical edition presents Pansophia as a central and extensive part of Comenius’ General Consultation and provides the primary historical basis for the pansophy concept.", SOURCE_URLS.pansophiaEdition, "Critical edition / Karolinum"],
      ["Comenius scholarship", "Dagmar Čapková — School and humanization of education in the concept of Comenius", "The study discusses pansophic education, wholeness, humanitas and the omnes omnia omnino frame. It helps keep historical meaning separate from simplified slogans.", SOURCE_URLS.humanizationStudy, "Pedagogika / Charles University"],
      ["Contemporary scholarship", "Lenka Řezníková — Between History and System. Historical Knowledge in Comenius’ Pansophy", "The study examines the relationship between systematic knowledge organization and historical thinking in Comenius’ Pansophy, helping distinguish the historical project from present-day interpretation.", SOURCE_URLS.historySystemStudy, "History – Theory – Criticism / CU"],
      ["Present-day Pansofie source of truth", "PANSOFIE Product Constitution V1.0", "The canonical document defines what we carry forward from pansophic inspiration while explicitly forbidding claims that Comenius designed modern AI, digital portfolios, gamification or the seven development paths.", SOURCE_URLS.constitution, "Canonical document / GitHub"],
    ],

    boundaryEyebrow: "History ≠ today’s product",
    boundaryTitle: "We do not translate inspiration mechanically. We turn it into present-day rules while keeping a clear boundary.",
    boundaryBody: "We do not attribute today’s software, artificial intelligence, game mechanics, scores or current Pansofie architecture to Comenius. We do not claim that Pansofie completes his project or use his name to justify features that did not historically exist.",
    inheritedTitle: "What we carry forward",
    inherited: ["knowledge in relationships", "learning connected to the whole of life", "development accessible across roles and life stages", "movement from knowledge toward responsible action"],
    notInheritedTitle: "What we do not attribute to him",
    notInherited: ["AI and automated decision-making", "digital portfolios and current data architecture", "scores of human worth, personality or destiny", "modern product, game and business mechanisms"],

    maturityEyebrow: "Who we are and where we are",
    maturityTitle: "We are at the stage where the product has to meet reality.",
    maturityBody: "Pansofie is an emerging product and pilot initiative. A digital layer can be technically ready, but only real use will show whether it is understandable, safe, manageable for educators and genuinely useful to young people.",
    publicIdentity: "Names of the people behind the project, the legal operator and a public contact channel will be published before recruitment into a real public pilot. Until those details are ready for verification, we do not want to create the impression of a finished institution.",
    status: [
      ["WORKS TODAY", "The public site, PANSOFIEDIT, the digital school-experience flow and safely separated partner collaboration are implemented and technically tested."],
      ["WE NEED TO VERIFY", "Clarity for learners, teachers and families, real teacher workload, the quality of partner collaboration and whether experiences lead to a useful next step."],
      ["WE DO NOT YET HAVE EVIDENCE", "We do not yet have an evaluated pilot in a real school, proven long-term educational effect or long-term results across multiple schools."],
      ["NEXT STEP", "A governed school pilot with explicit goals, child protection, privacy rules and a pre-defined evaluation method."],
    ],

    whoEyebrow: "Who we need",
    whoTitle: "Not an audience. People who can help us discover what is genuinely useful.",
    who: [
      ["Schools and educators", "The first real-world verification of classroom usability and teacher workload.", Building2, "/zapojit-se?role=school"],
      ["Young people and families", "Feedback on whether experiences make sense and whether privacy boundaries work outside a diagram.", HeartHandshake, "/zapojit-se?role=family"],
      ["Mentors and experts", "Practical domain perspective, strong questions and feedback without taking over the teacher’s role.", UsersRound, "/zapojit-se?role=mentor"],
      ["Companies, organizations and municipalities", "Real challenges, context and a safe path to use or develop strong outputs further.", Target, "/zapojit-se?role=partner"],
    ],
    finalTitle: "Know yourself. Create with others. Improve the world.",
    finalBody: "Pansofie only matters if historical inspiration, contemporary technology and real experience meet in something genuinely useful to people.",
    finalCta: "Take part in the validation",
  },
};

function SourceCard({ source }) {
  const [type, title, note, url, cta] = source;
  return (
    <article className="r12-source-card" data-i18n-ignore="true">
      <div className="r12-source-card__topline" aria-hidden="true" />
      <p className="r12-source-card__type">{type}</p>
      <h3>{title}</h3>
      <p className="r12-source-card__note">{note}</p>
      <a href={url} target="_blank" rel="noreferrer" className="r12-source-card__link">
        <span>{cta}</span><ExternalLink size={15} />
      </a>
    </article>
  );
}

function BoundaryList({ title, items, kind }) {
  return (
    <article className={`r12-boundary-card r12-boundary-card--${kind}`}>
      <p className="r12-boundary-card__title">{title}</p>
      {items.map((item) => (
        <p key={item}><ShieldCheck size={16} /><span>{item}</span></p>
      ))}
    </article>
  );
}

export default function AboutR12() {
  const { locale } = useLanguage();
  const t = COPY[locale] || COPY.cs;

  return (
    <div className="min-h-screen bg-background r12-about-page">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r12-about-hero">
          <div className="container-px max-w-7xl mx-auto py-14 sm:py-24">
            <div className="max-w-5xl">
              <span className="r12-kicker"><Sparkles size={14} /> {t.heroEyebrow}</span>
              <h1>{t.heroTitle}</h1>
              <p className="r12-hero-lead">{t.heroLead}</p>
              <p className="r12-hero-note">{t.heroNote}</p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link to="/zapojit-se" className="action-primary w-full sm:w-auto px-7 py-3.5">{t.join} <ArrowRight size={18} /></Link>
                <Link to="/jak-funguje" className="action-secondary w-full sm:w-auto px-7 py-3.5">{t.how}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="r12-section r12-section--paper">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-24">
            <div className="max-w-4xl">
              <p className="r12-section-kicker">{t.whyEyebrow}</p>
              <h2>{t.whyTitle}</h2>
              <p className="r12-section-lead">{t.whyLead}</p>
            </div>
            <div className="r12-principle-grid">
              {t.why.map(([title, text, Icon], index) => (
                <article key={title} className="r12-principle-card" data-r12-index={index + 1}>
                  <span className="r12-principle-card__icon"><Icon size={21} /></span>
                  <p className="r12-principle-card__number">0{index + 1}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="r12-section r12-history-section">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-[0.84fr_1.16fr] gap-10 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-36">
                <p className="r12-section-kicker"><History size={15} /> {t.historyEyebrow}</p>
                <h2>{t.historyTitle}</h2>
                <h3 className="mt-6 text-xl sm:text-2xl font-bold">{t.historyBridgeTitle}</h3>
                <p className="r12-section-lead">{t.historyLead}</p>
              </div>
              <div className="r12-history-stack">
                {t.timeline.map(([label, title, body], index) => (
                  <article className="r12-history-card" key={title}>
                    <div className="r12-history-card__index">{String(index + 1).padStart(2, "0")}</div>
                    <div>
                      <p className="r12-history-card__label">{label}</p>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="r12-section r12-sources-section" id="zdroje">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
            <div className="max-w-4xl">
              <p className="r12-section-kicker"><BookOpen size={15} /> {t.sourcesEyebrow}</p>
              <h2>{t.sourcesTitle}</h2>
              <p className="r12-section-lead">{t.sourcesLead}</p>
            </div>
            <div className="r12-source-grid">
              {t.sources.map((source) => <SourceCard key={source[1]} source={source} />)}
            </div>
          </div>
        </section>

        <section className="r12-section r12-boundary-section">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
            <div className="r12-boundary-shell">
              <div>
                <p className="r12-section-kicker"><Layers3 size={15} /> {t.boundaryEyebrow}</p>
                <h2>{t.boundaryTitle}</h2>
                <p className="r12-section-lead">{t.boundaryBody}</p>
              </div>
              <div className="r12-boundary-grid">
                <BoundaryList title={t.inheritedTitle} items={t.inherited} kind="yes" />
                <BoundaryList title={t.notInheritedTitle} items={t.notInherited} kind="no" />
              </div>
            </div>
          </div>
        </section>

        <section className="r12-section r12-section--paper" id="stav">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
            <div className="max-w-4xl">
              <p className="r12-section-kicker"><Globe2 size={15} /> {t.maturityEyebrow}</p>
              <h2>{t.maturityTitle}</h2>
              <p className="r12-section-lead">{t.maturityBody}</p>
              <p className="r12-section-lead">{t.publicIdentity}</p>
            </div>
            <div className="r12-status-grid">
              {t.status.map(([title, text], index) => (
                <article className="r12-status-card" key={title}>
                  <p className="r12-status-card__number">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="r12-section r12-who-section">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-28">
            <div className="max-w-4xl">
              <p className="r12-section-kicker">{t.whoEyebrow}</p>
              <h2>{t.whoTitle}</h2>
            </div>
            <div className="r12-who-grid">
              {t.who.map(([title, text, Icon, href]) => (
                <Link key={title} to={href} className="r12-who-card">
                  <span><Icon size={21} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <b><ArrowRight size={16} /></b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="r12-final-section">
          <div className="container-px max-w-7xl mx-auto py-20 sm:py-24">
            <div className="max-w-4xl">
              <p className="r12-final-mark">PANSOFIE</p>
              <h2>{t.finalTitle}</h2>
              <p>{t.finalBody}</p>
              <Link to="/zapojit-se" className="action-primary mt-8 inline-flex px-7 py-3.5">{t.finalCta} <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
