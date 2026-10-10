import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Compass, PlayCircle, Leaf, Sprout, MapPin } from "lucide-react";
import { DomainIconV2 } from "./DomainIconV2";
import { GoBridgeV2 } from "./GoBridgeV2";
import { ImpactDimensionsV2 } from "./ImpactDimensionsV2";
import { MethodSequenceV2 } from "./MethodSequenceV2";
import { PublicShellV2 } from "./PublicShellV2";
import { SectionHeadingV2 } from "./SectionHeadingV2";
import { SourceBackedRelationV2 } from "./SourceBackedRelationV2";
import { TruthBadgeV2 } from "./TruthBadgeV2";
import {
  GREEN_HOPE_SOURCE_RELATION_V2,
  PUBLIC_DOMAINS_V2,
  PUBLIC_PATHS_V2,
} from "../../domain/pansofie-public-v2";

const IMPACTS = Object.freeze([
  { id: "knowledge", label: "Poznání", body: "Co člověk nebo tým skutečně poznal." },
  { id: "skills", label: "Dovednosti", body: "Co dokáže použít nebo vytvořit v praxi." },
  { id: "well_being", label: "Well-being", body: "Samostatná dimenze, ne známka hodnoty člověka." },
  { id: "family", label: "Rodina", body: "Vztahy, spolupráce a společná zkušenost." },
  { id: "community", label: "Komunita", body: "Konkrétní přínos v bezpečném místním kontextu." },
  { id: "nature", label: "Příroda", body: "Příroda jako samostatná, zdrojově doložená dimenze." },
  { id: "entrepreneurship", label: "Podnikavost", body: "Tvorba hodnoty a praktická iniciativa." },
  { id: "intergenerational_connection", label: "Mezigenerační propojení", body: "Vzájemné učení napříč generacemi." },
]);

const PROGRAMS = Object.freeze([
  {
    title: "Green Hope",
    eyebrow: "Příroda a péče",
    text: "Pěstování, učení a péče o konkrétní místo. Modelový projekt je vždy viditelně označený.",
    href: "/green-hope",
    status: "MODEL",
    variant: "nature",
  },
  {
    title: "Urban Family Farm",
    eyebrow: "Praktický život",
    text: "Městské pěstování propojené s dovednostmi a praktickým učením.",
    href: "/urban-family-farm",
    variant: "farm",
  },
  {
    title: "Digitální kompost",
    eyebrow: "Materiály v oběhu",
    text: "Využitelné zbytkové materiály firem propojujeme s blízkými školami pro tvoření, opravy a praktickou výuku.",
    href: "/digitalni-kompost",
    status: "PROTOTYPE",
    variant: "circular",
  },
  {
    title: "Labs",
    eyebrow: "Pokus a tvorba",
    text: "Prostor pro bezpečné prototypování, zkoumání a společnou tvorbu.",
    href: "/labs",
    status: "CONCEPT",
    variant: "lab",
  },
  {
    title: "Family Team",
    eyebrow: "Rodina jako tým",
    text: "Společná zkušenost při zachování vlastní identity a odpovídajících oprávnění.",
    href: "/family-team",
    variant: "family",
  },
  {
    title: "Knowledge Exchange",
    eyebrow: "Mezigenerační učení",
    text: "Dovednost, zkušenost a příběh se mohou předávat oběma směry.",
    href: "/sit",
    variant: "knowledge",
  },
]);

const AUDIENCES = Object.freeze([
  {
    title: "Mladý člověk",
    text: "Pansofie Young pro přibližně 6/7–18 let používá vlastní jazyk a bezpečné kontexty.",
    href: "/young",
    action: "Pansofie Young",
  },
  {
    title: "Jednotlivec",
    text: "Objev témata, projekty a malé konkrétní kroky bez povinného veřejného skóre.",
    href: "/7-cest",
    action: "Najít svou cestu",
  },
  {
    title: "Rodina",
    text: "Sdílené mise a projekty bez sdílené identity a bez nátlaku.",
    href: "/family-team",
    action: "Pro rodiny",
  },
  {
    title: "Škola",
    text: "Učení zkušeností v bezpečném a spravovatelném školním kontextu.",
    href: "/pro-skoly",
    action: "Pro školy",
  },
  {
    title: "Organizace / město",
    text: "Konkrétní kapacita, projekt a místní spolupráce bez automatických ESG tvrzení.",
    href: "/pro-organizace",
    action: "Pro organizace",
  },
]);

function Pillars() {
  const pillars = [
    { title: "Pansofie", description: "Poznávat svět v souvislostech. Propojovat vědění, hodnoty, přírodu a společnost do smysluplného celku.", symbol: "tree" },
    { title: "Pampaedie", description: "Učit se celý život a jeden od druhého. Vzdělávání pro všechny generace, zkušenosti, praxi i spolupráci.", symbol: "book" },
    { title: "Panorthosie", description: "Proměňovat poznání v dobré změny. Poznání má smysl, když napravuje svět a skutečně mění život.", symbol: "compass" },
  ];
  return <section className="ps2-home-pillars ps2-home-pillars--mockup" id="filozofie" aria-label="Tři principy Pansofie">
    <div className="ps2-home-wrap">
      <div className="ps2-mockup-pillars">
        {pillars.map((pillar) => <article key={pillar.title}>
          <span className={"ps2-mockup-pillar-icon ps2-mockup-pillar-icon--" + pillar.symbol} aria-hidden="true">
            {pillar.symbol === "tree" ? <Image src="/assets/brand-v2/identity/pansofie-tree-approved.svg" alt="" width={68} height={68}/> : pillar.symbol === "book" ? <BookOpen size={48} strokeWidth={1.5}/> : <Compass size={48} strokeWidth={1.5}/>}
          </span>
          <div><h2>{pillar.title}</h2><p>{pillar.description}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}

const PATH_PHOTOS = Object.freeze({
  body: "path-body.webp", mind: "path-mind.webp", character: "path-character.webp",
  relationships: "path-relationships.webp", creativity: "path-creativity.webp",
  prosperity: "path-prosperity.webp", meaning: "path-meaning.webp",
});

function PathsSection() {
  return <section className="ps2-home-paths ps2-home-paths--mockup" id="cesty">
    <div className="ps2-home-wrap">
      <div className="ps2-mockup-section-header">
        <div><p className="ps2-eyebrow">01 / Sedm cest</p><h2>7 cest k naplněnému životu</h2></div>
        <Link href="/7-cest">Prozkoumat všechny cesty <ArrowRight size={17}/></Link>
      </div>
      <div className="ps2-mockup-path-grid">
        {PUBLIC_PATHS_V2.map((path) => <Link className="ps2-mockup-path" href={"/7-cest#" + path.id} key={path.id}>
          <span className="ps2-mockup-path__image"><Image src={"/assets/brand-v2/editorial/" + PATH_PHOTOS[path.id]} alt={"Ilustrační AI-vizuál cesty " + path.labelCs} fill sizes="(max-width: 600px) 120px, 180px"/></span>
          <strong>{path.labelCs}</strong>
          <span className="ps2-mockup-path__text">{path.facetCs || path.principleCs}</span>
        </Link>)}
      </div>
    </div>
  </section>;
}

function DomainsSection() {
  return <section className="ps2-home-domains ps2-home-domains--mockup" id="oblasti">
    <div className="ps2-home-wrap">
      <div className="ps2-mockup-section-header">
        <div><p className="ps2-eyebrow">02 / Oblasti života</p><h2>16 oblastí života a poznání</h2></div>
        <Link href="/16-oblasti">Prozkoumat všech 16 oblastí <ArrowRight size={17}/></Link>
      </div>
      <div className="ps2-mockup-domains">
        {PUBLIC_DOMAINS_V2.map((domain) => <Link className="ps2-mockup-domain" href={"/16-oblasti#" + domain.id} key={domain.id}>
          <DomainIconV2 domainId={domain.id} size={30}/>
          <span>{domain.labelCs}</span>
        </Link>)}
      </div>
    </div>
  </section>;
}

function MethodSection() {
  return <section className="ps2-home-method ps2-w27-method" id="metoda" aria-labelledby="ps2-w27-method-heading">
    <div className="ps2-home-wrap ps2-w27-method__layout">
      <div className="ps2-w27-method__intro">
        <p className="ps2-eyebrow">PANSOFIE METHOD</p>
        <h2 id="ps2-w27-method-heading">Učení, které vede k životu.</h2>
        <p>Jednoduchá a přirozená cesta od poznání k reálné zkušenosti a dobrým změnám.</p>
        <Link className="ps2-button ps2-button--inverse" href="/jak-to-funguje">Zjistit více o metodě <ArrowRight size={16}/></Link>
      </div>
      <div className="ps2-w27-method__steps"><MethodSequenceV2 compact icons/>
        <p>Příležitost, ne povinnost. Šest kroků jako možnost, nikoli povinné hodnocení.</p>
      </div>
    </div>
  </section>;
}

function GreenHopeStory() {
  const { mission, project, skill } = GREEN_HOPE_SOURCE_RELATION_V2;

  return <section className="ps2-home-story" id="green-hope">
    <div className="ps2-home-wrap ps2-home-story__grid">
      <div className="ps2-home-story__art ps2-home-story__art--mockup" aria-label="AI-generovaná ilustrační fotografie společného sázení stromů pro modelový projekt Green Hope.">
        <Image src="/assets/brand-v2/editorial/project-green-hope.webp" alt="Ilustrační scéna dobrovolníků sázejících stromky" fill sizes="(max-width: 900px) 100vw, 50vw"/>
        <div className="ps2-mockup-story__badge"><TruthBadgeV2 state="CONCEPT"/><span>Ilustrační AI-vizuál, nikoli fotodokumentace projektu</span></div>
      </div>

      <div className="ps2-home-story__copy">
        <p className="ps2-eyebrow">PŘÍKLAD Z PRAXE</p>
        <h2>Green Hope</h2>
        <p>V současném modelu propojuje pěstování, učení a péči o konkrétní místo. Konkrétní projekt zůstává viditelně označený jako modelový prototyp.</p>
        <SourceBackedRelationV2
          sourceId={mission.id}
          sourceType="KANONICKÁ MISE"
          title={mission.titleCs}
          description={project.summaryCs}
          items={[
            { label: "Oblast", value: "Příroda" },
            { label: "Cesta", value: "Smysl" },
            { label: "Dovednost", value: skill.titleCs },
            { label: "Dokumentace", value: "Volitelná" },
          ]}
        />
        <div className="ps2-home-story__actions">
          <Link className="ps2-button ps2-button--primary" href="/green-hope">Poznat Green Hope</Link>
          <Link className="ps2-home-text-link" href="/16-oblasti#nature">Oblast Příroda →</Link>
        </div>
      </div>
    </div>
  </section>;
}

const PROGRAM_SPOTLIGHTS = Object.freeze([
  { title: "PANSOFIE YOUNG", eyebrow: "Pro mladé", text: "Pro mladé, kteří chtějí poznávat, tvořit a měnit svět kolem sebe.", href: "/young", variant: "young", photo: "path-relationships.webp", action: "Objevit Young" },
  { title: "PANSOFIE GO", eyebrow: "Od poznání k činu", text: "Mise a projekty jako cesta k reálné zkušenosti. Aplikaci postupně připravujeme.", href: "/pansofie-go", variant: "go", photo: "path-character.webp", action: "Prohlédnout GO" }
]);
const PROGRAM_PHOTOS = Object.freeze({
  nature: "project-green-hope.webp", farm: "path-prosperity.webp",
  circular: "path-creativity.webp", lab: "path-mind.webp",
  family: "hero-main.webp", knowledge: "path-relationships.webp"
});
function ProgramsSection() {
  const all = [...PROGRAM_SPOTLIGHTS, ...PROGRAMS.filter((program) => !["family", "knowledge"].includes(program.variant))];
  return <section className="ps2-home-programs ps2-w27-programs" id="programy">
    <div className="ps2-home-wrap">
      <div className="ps2-w27-programs__head">
        <div>
          <p className="ps2-eyebrow">NAŠE PROJEKTY A PROGRAMY</p>
          <h2>Tři cesty, jeden ekosystém.</h2>
          <p>Propojujeme poznání, vzdělávání a komunitu. Každý program nabízí cestu k reálným zkušenostem a smysluplné spolupráci.</p>
        </div>
      </div>
      <div className="ps2-w27-programs__grid">
        {all.map((program) => <Link href={program.href} key={program.title} className={"ps2-w27-program ps2-w27-program--" + program.variant}>
          <div className="ps2-w27-program__photo">
            <Image src={"/assets/brand-v2/editorial/" + (program.photo || PROGRAM_PHOTOS[program.variant])}
              alt={"AI ilustrační fotografie k tématu " + program.title} fill sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"/>
          </div>
          <div className="ps2-w27-program__content">
            <p className="ps2-w27-program__eyebrow">{program.eyebrow}</p>
            <h3>{program.title}</h3>
            <p>{program.text}</p>
            <span>{program.action || "Prozkoumat"} <ArrowRight size={15}/></span>
          </div>
        </Link>)}
        <article className="ps2-w28-family" aria-labelledby="ps2-w28-family-heading">
          <span id="rodina" className="ps2-w27-anchor" />
          <span id="komunita" className="ps2-w27-anchor" />
          <Image src="/assets/brand-v2/editorial/hero-main.webp" alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 66vw"/>
          <div className="ps2-w28-family__content">
            <p className="ps2-w27-program__eyebrow">Rodina, generace a společné učení</p>
            <h3 id="ps2-w28-family-heading">Family Team <span>&amp;</span> Knowledge Exchange</h3>
            <p>Učíme se jeden od druhého. Rodina může tvořit společně a zkušenosti mohou přecházet mezi generacemi oběma směry.</p>
            <div className="ps2-w28-family__actions">
              <Link href="/family-team">Family Team <ArrowRight size={15}/></Link>
              <Link href="/sit">Knowledge Exchange <ArrowRight size={15}/></Link>
            </div>
          </div>
        </article>
      </div>
      <p className="ps2-w27-programs__note">Ilustrační AI fotografie nejsou dokumentací uskutečněných akcí. Green Hope je modelový projekt, Digitální kompost prototyp a Labs koncept.</p>
    </div>
  </section>;
}

function ImpactSection() {
  return <section className="ps2-home-impact" id="dopad">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="DOPAD"
        title="Dopad není jedno číslo."
        body="Smysluplný dopad má více rozměrů a musí mít oporu v důkazech. Pansofie nehodnotí člověka jedním veřejným skóre."
      />
      <ImpactDimensionsV2 dimensions={IMPACTS}/>
      <div className="ps2-home-inline-action"><Link href="/impact">Jak Pansofie pracuje s dopadem →</Link></div>
    </div>
  </section>;
}

function AudienceSection() {
  return <section className="ps2-home-audience" id="pro-koho">
    <div className="ps2-home-wrap">
      <SectionHeadingV2
        eyebrow="PRO KOHO"
        title="Každý vstupuje jinudy."
        body="Jedno produktové jádro, různé kontexty. Veřejná Pansofie vysvětluje souvislosti, Young přizpůsobuje zkušenost mladým a GO převádí poznání do konkrétní akce."
      />
      <div className="ps2-home-audience__grid">
        {AUDIENCES.map((audience, index) => <Link href={audience.href} key={audience.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{audience.title}</h3>
          <p>{audience.text}</p>
          <strong>{audience.action} →</strong>
        </Link>)}
      </div>
    </div>
  </section>;
}

function FinalSection() {
  return <section className="ps2-home-final ps2-w27-final" id="zapoj-se">
    <div className="ps2-home-wrap ps2-w27-final__layout">
      <div>
        <p className="ps2-eyebrow">SPOLEČNĚ PRO LEPŠÍ SVĚT</p>
        <h2>Staň se součástí Pansofie.</h2>
        <p>Poznávej, uč se, propojuj a pomáhej s námi tvořit svět, ve kterém má smysl žít.</p>
        <div className="ps2-home-final__actions">
          <Link className="ps2-button ps2-button--inverse" href="/kontakt">Připojit se <ArrowRight size={16}/></Link>
          <Link className="ps2-button ps2-button--secondary" href="/projekty">Prozkoumat projekty <ArrowRight size={16}/></Link>
        </div>
      </div>
      <blockquote>„Lepší svět nevznikne sám. Vznikne námi a tím, co společně děláme.“</blockquote>
    </div>
  </section>;
}

export function HomePageV2() {
  return <PublicShellV2 currentPath="/">
    <section className="ps2-home-hero ps2-home-hero--mockup" id="objevuj" aria-labelledby="pansofie-home-heading">
      <Image className="ps2-mockup-hero__photo" src="/assets/brand-v2/editorial/hero-main.webp" alt="Ilustrační AI-vizuál lidí různých generací na horské vyhlídce při západu slunce." fill priority sizes="(max-width: 1440px) 100vw, 1440px"/>
      <div className="ps2-mockup-hero__wash" aria-hidden="true"></div>
      <div className="ps2-mockup-hero__copy">
        <p className="ps2-mockup-hero__eyebrow">PANSOFIE · POZNÁNÍ V SOUVISLOSTECH</p>
        <h1 id="pansofie-home-heading">PANSOFIE</h1>
        <p className="ps2-mockup-hero__subtitle">Poznej sebe. Rozvíjej svět.</p>
        <p className="ps2-mockup-hero__lead">Rozumět světu. Žít v něm vědomě. Tvořit ho společně.</p>
        <div className="ps2-mockup-hero__actions">
          <Link className="ps2-button ps2-button--primary" href="/o-nas">Objev Pansofii <ArrowRight size={17}/></Link>
          <Link className="ps2-button ps2-button--secondary" href="/jak-to-funguje"><PlayCircle size={18}/> Jak to funguje</Link>
        </div>
      </div>
      <blockquote className="ps2-mockup-hero__quote"><p>„Všechno souvisí<br/>se vším.“</p><cite>J. A. KOMENSKÝ</cite></blockquote>
      <span className="ps2-mockup-hero__credit">AI-generovaná ilustrační fotografie</span>
    </section>

    <Pillars/>
    <PathsSection/>
    <DomainsSection/>
    <MethodSection/>
    <GreenHopeStory/>

    <section className="ps2-home-go ps2-w27-go">
      <div className="ps2-w27-go__layout">
        <div className="ps2-w27-go__copy">
          <GoBridgeV2 title="Od poznání k činu."
            text="Pansofie GO propojí mise, projekty a místa s reálnými aktivitami. Poloha se používá jen po tvé akci a poloha dítěte se veřejně nezobrazuje."
            href="/pansofie-go" label="Prohlédnout Pansofie GO"/>
          <p className="ps2-w27-go__notice"><Sprout size={17}/> Na aplikaci pracujeme. Toto je ukázka připravovaného prostředí.</p>
        </div>
        <div className="ps2-w27-go__phone" role="img" aria-label="Ilustrační náhled připravované mobilní aplikace Pansofie GO">
          <div className="ps2-w27-go__phone-top"><span>9:41</span><span>● ▰ ▰</span></div>
          <div className="ps2-w27-go__phone-brand"><Leaf size={18}/> PANSOFIE <strong>GO</strong></div>
          <div className="ps2-w27-go__map" aria-hidden="true">
            <span className="ps2-w27-go__pin ps2-w27-go__pin--one"><MapPin size={23}/></span>
            <span className="ps2-w27-go__pin ps2-w27-go__pin--two"><MapPin size={23}/></span>
            <span className="ps2-w27-go__pin ps2-w27-go__pin--three"><MapPin size={23}/></span>
          </div>
          <div className="ps2-w27-go__mission"><small>DOPORUČENÁ MISE</small>
            <strong>Objev přírodní poklad</strong>
            <p>Prozkoumej okolí a objev něco zajímavého.</p>
            <span>🌿 Příroda · cca 30 minut</span>
          </div>
          <div className="ps2-w27-go__nav"><span>⌂ Domů</span><span>⌖ Mapa</span><span>✦ Mise</span><span>♙ Profil</span></div>
        </div>
      </div>
    </section>

    <ProgramsSection/>
    <ImpactSection/>
    <AudienceSection/>
    <FinalSection/>
  </PublicShellV2>;
}
