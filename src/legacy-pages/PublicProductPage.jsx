import React from "react";
import Image from "next/image";
import { ArrowRight, Check, Globe2, MapPin, Play, ShieldCheck, Sprout, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CHECKPOINTS, DOMAIN_DETAILS, IMPACT_DIMENSIONS, PATHS, PROJECTS } from "../domain/pansofie-content";
import { domainIcon, pathIcon } from "../domain/asset-system";

const pathIds = ["knowledge", "health", "character", "relationships", "creativity", "collaboration", "meaning"];
const domainIds = ["self", "body", "mind", "emotions", "relationships", "family", "society", "nature", "technology", "finance", "work", "creation", "culture", "ethics", "citizenship", "meaning"];

const PROJECT_MEDIA = {
  "Green Hope": "/assets/brand/pansofie/illustrations/green-hope.webp",
  "Urban Family Farm": "/assets/brand/young/illustrations/urban-garden.png",
  "Family Team": "/assets/brand/pansofie/illustrations/family-team.webp",
  "Komunitní zahrada": "/assets/brand/pansofie/photos/growing-together-16x9.webp",
  "Mikrogreens farma": "/assets/brand/go/mission-covers/grow-16x9.webp",
  "Kompostovací centrum": "/assets/brand/go/mission-covers/create-16x9.webp",
  "Knowledge Exchange": "/assets/brand/pansofie/photos/community-city-16x9.webp",
  "Makerspace Pansofie": "/assets/brand/young/photos/creative-studio-16x9.webp",
};

const SPECS = {
  about: { eyebrow: "O NÁS", title: "Člověk, příroda a společnost v harmonii.", lead: "Pansofie propojuje vědění s každodenním životem. Neučíme izolované odpovědi, ale vztahy mezi tím, co člověk poznává, dělá a sdílí s ostatními.", image: "/assets/brand/pansofie/illustrations/ecosystem-tree.webp", cta: ["Náš přístup", "/jak-to-funguje"] },
  go: { eyebrow: "PANSOFIE GO", title: "Malé mise. Velké změny.", lead: "Akční vrstva Pansofie pro mise, checkpointy, týmy, portfolio a reflexi. XP ukazuje herní postup, ne hodnotu člověka.", image: "/assets/brand/young/photos/creative-studio-16x9.webp", cta: ["Otevřít Pansofie GO", "/go"] },
  green: { eyebrow: "GREEN HOPE", title: "Zelenější planeta začíná u nás.", lead: "Praktické mise kolem půdy, vody, biodiverzity, pěstování a péče o konkrétní místo. Méně deklarací, více skutečné zkušenosti.", image: "/assets/brand/pansofie/illustrations/green-hope.webp", cta: ["Objevit projekty", "/projekty"] },
  farm: { eyebrow: "URBAN FAMILY FARM", title: "Město může být živé a jedlé.", lead: "Praktická laboratoř života propojující pěstování, matematiku, ekonomiku, tvorbu produktu a spolupráci mezi generacemi.", image: "/assets/brand/young/illustrations/urban-garden.png", cta: ["Zapojit se", "/projekty"] },
  family: { eyebrow: "FAMILY TEAM", title: "Silnější rodiny tvoří silnější svět.", lead: "Společné rodinné mise a projekty dávají každému roli, bezpečný prostor a důvod něco vytvořit společně.", image: "/assets/brand/pansofie/illustrations/family-team.webp", cta: ["Poznat Family Team", "/jak-to-funguje"] },
  schools: { eyebrow: "PRO ŠKOLY", title: "Škola, která připravuje na život.", lead: "Programy, metodiky a praktické projekty, které propojují výuku s reálným světem, komunitou a mezioborovým učením.", image: "/assets/brand/pansofie/illustrations/school-learning.webp", cta: ["Pro školy", "/kontakt"] },
  orgs: { eyebrow: "PRO ORGANIZACE", title: "Spolu tvoříme udržitelnou budoucnost.", lead: "Partnerství pro konkrétní projekty, místní spolupráci, know-how a měřitelný projektový dopad bez marketingových zkratek.", image: "/assets/brand/pansofie/photos/community-city-16x9.webp", cta: ["Stát se partnerem", "/kontakt"] },
};

function Hero({ spec }) {
  return <section className="p2-detail-hero"><div className="p2-detail-copy"><p className="p2-kicker">{spec.eyebrow}</p><h1>{spec.title}</h1><p>{spec.lead}</p><Link className="p2-button" to={spec.cta[1]}>{spec.cta[0]} <ArrowRight size={16}/></Link></div><figure><Image src={spec.image} alt="" width={760} height={520} sizes="(max-width: 900px) 100vw, 45vw" priority/></figure></section>;
}

function PathsPage() {
  return <div className="p2-page"><header className="p2-page-head"><p className="p2-kicker">7 CEST</p><h1>Sedm cest k naplněnému životu</h1><p>Rozvojová mapa, která drží pohromadě poznání, zdraví, charakter, vztahy, tvořivost, spolupráci a smysl.</p></header><section className="p2-path-grid">{PATHS.map(([title,text],i)=><article key={title}><span><Image src={pathIcon(pathIds[i])} alt="" width={64} height={64} sizes="64px"/></span><small>0{i+1}</small><h2>{title}</h2><p>{text}</p></article>)}</section><Link className="p2-inline-cta" to="/16-oblasti">Pokračovat do 16 oblastí <ArrowRight size={16}/></Link></div>;
}

function DomainsPage() {
  return <div className="p2-page"><header className="p2-page-head"><p className="p2-kicker">16 OBLASTÍ</p><h1>Šestnáct oblastí poznání</h1><p>Obsahový svět Pansofie od Já a Těla po Technologie, Etiku, Občanství a Smysl života.</p></header><section className="p2-domain-grid">{DOMAIN_DETAILS.map(([title,desc,skill],i)=><article key={title}><Image src={domainIcon(domainIds[i])} alt="" width={56} height={56} sizes="56px"/><div><h2>{title}</h2><p>{desc}</p><small>{skill}</small></div></article>)}</section></div>;
}

function ProjectsPage() {
  return <div className="p2-page"><header className="p2-page-head p2-page-head--row"><div><p className="p2-kicker">PROJEKTY</p><h1>Projekty, které mají smysl</h1><p>Tvoř, zapojuj se a měň svět malými konkrétními činy.</p></div><div className="p2-filter-pills"><span>Vše</span><span>Příroda</span><span>Vzdělávání</span><span>Komunita</span></div></header><section className="p2-project-grid">{PROJECTS.map(project=><article key={project.title}><Image src={PROJECT_MEDIA[project.title] || project.image} alt="" width={540} height={320} sizes="(max-width: 900px) 100vw, 33vw"/><div><small>{project.tag}</small><h2>{project.title}</h2><p>{project.description}</p><b>{project.status}</b></div></article>)}</section></div>;
}

function MapPage({ network=false }) {
  return <div className="p2-page p2-map-page"><header className="p2-page-head"><p className="p2-kicker">{network ? "MEZINÁRODNÍ SÍŤ" : "MAPA"}</p><h1>{network ? "Spojujeme lidi napříč hranicemi." : "Lidé, projekty, příležitosti"}</h1><p>{network ? "Lokální skupiny, školy a projekty tvoří síť spolupráce. DEMO body nejsou vydávány za existující partnerství." : "Orientační checkpointy bez přesných domácích adres dětí."}</p></header><section className={`p2-map ${network?"p2-map--world":""}`} role="img" aria-label={network?"Orientační síť spolupráce":"Orientační mapa checkpointů"}>{CHECKPOINTS.map((item,i)=><button key={item[0]} style={{left:`${14+(i%3)*34}%`,top:`${20+Math.floor(i/3)*50}%`}} aria-label={item[0]}><MapPin size={24}/></button>)}</section><div className="p2-checkpoints">{CHECKPOINTS.map(([title,place,type,status])=><article key={title}><span>{type}</span><h2>{title}</h2><p>{place}</p><small>{status}</small></article>)}</div></div>;
}

function ImpactPage() {
  return <div className="p2-page"><header className="p2-page-head"><p className="p2-kicker">IMPACT INDEX</p><h1>Změnu můžeš vidět.</h1><p>Projektový dopad sledujeme odděleně od hodnocení člověka. Ukázková data níže demonstrují rozhraní, ne skutečné výsledky programu.</p></header><section className="p2-impact-metrics"><article><strong>284</strong><span>DEMO projektů</span></article><article><strong>12 450</strong><span>DEMO hodin spolupráce</span></article><article><strong>8</strong><span>dimenzí dopadu</span></article></section><section className="p2-impact-chart"><div><p>Pozitivní dopad v čase · DEMO</p><svg viewBox="0 0 800 230" aria-label="Ukázkový trend dopadu"><path d="M20 190 C120 180 160 150 230 158 S360 95 450 115 590 72 780 38" fill="none" stroke="currentColor" strokeWidth="8"/><path d="M20 205H780" stroke="currentColor" opacity=".18"/></svg></div><div className="p2-impact-dims">{IMPACT_DIMENSIONS.map(([title,text])=><article key={title}><Check size={15}/><div><b>{title}</b><p>{text}</p></div></article>)}</div></section></div>;
}

function BlogPage() {
  const cards=[
    ["Jak vychovat odpovědné děti", "Rodina · vzdělávání", "/assets/brand/pansofie/photos/curiosity-nature-16x9.webp"],
    ["Regenerativní města", "Město · příroda", "/assets/brand/pansofie/photos/prague-nature-16x9.webp"],
    ["Síla komunity v době změn", "Komunita · spolupráce", "/assets/brand/pansofie/photos/community-city-16x9.webp"],
  ];
  return <div className="p2-page"><header className="p2-page-head"><p className="p2-kicker">BLOG / ZDROJE</p><h1>Články, rozhovory a nástroje</h1><p>Obsah pro lidi, kteří chtějí chápat souvislosti a převádět je do života.</p></header><div className="p2-filter-pills"><span>Články</span><span>Rozhovory</span><span>Nástroje</span><span>Videa</span></div><section className="p2-blog-grid">{cards.map(([title,tag,image])=><article key={title}><Image src={image} alt="" width={540} height={304} sizes="(max-width: 900px) 100vw, 33vw"/><small>{tag}</small><h2>{title}</h2><p>Praktický pohled, souvislosti a konkrétní další krok.</p><ArrowRight size={20}/></article>)}</section></div>;
}

export default function PublicProductPage({ type }) {
  if (type === "paths") return <PathsPage/>;
  if (type === "domains") return <DomainsPage/>;
  if (type === "projects") return <ProjectsPage/>;
  if (type === "map") return <MapPage/>;
  if (type === "network") return <MapPage network/>;
  if (type === "impact") return <ImpactPage/>;
  if (type === "blog") return <BlogPage/>;
  const spec=SPECS[type] || SPECS.about;
  return <div className="p2-page p2-page--detail"><Hero spec={spec}/><section className="p2-detail-points"><article><Sprout/><h2>Učení v reálném světě</h2><p>Zkušenost, praxe a reflexe místo izolovaných pouček.</p></article><article><Users/><h2>Společně</h2><p>Rodiny, školy, komunity a organizace jako jeden propojený ekosystém.</p></article><article><Globe2/><h2>V souvislostech</h2><p>Člověk, příroda, společnost, technologie a smysl nejsou oddělené světy.</p></article><article><ShieldCheck/><h2>Bezpečně</h2><p>Soukromí, role a bezpečnost mladých jsou součástí návrhu, ne dodatek.</p></article></section></div>;
}
