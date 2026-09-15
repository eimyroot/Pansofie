"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CHECKPOINTS, DOMAINS, MISSIONS, PATHS, PROJECTS, ROLE_COPY } from "../../domain/pansofie-content";

const NAV = ["Přehled", "Cesty", "Mise", "Projekty", "Labs", "Síť", "Portfolio"];

function EmptyState() {
  return <div className="workspace-empty"><span>＋</span><h3>Je tu místo pro první krok.</h3><p>Uložte si misi nebo projekt a objeví se v osobním plánu.</p></div>;
}

export default function CoreWorkspace({ role = "owner" }) {
  const [active, setActive] = useState("Přehled");
  const [saved, setSaved] = useState(["strom"]);
  const [query, setQuery] = useState("");
  const copy = ROLE_COPY[role] || ROLE_COPY.owner;
  const isFamily = role.includes("rodiny");
  const isPartner = role.includes("školy") || role.includes("firmy");
  const filteredProjects = useMemo(() => PROJECTS.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())), [query]);
  const toggleMission = (id) => setSaved((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return <div className="core-workspace">
    <aside className="workspace-rail" aria-label="Hlavní navigace">
      <div className="workspace-user"><span>AN</span><div><strong>Anna Nováková</strong><small>{copy.label}</small></div></div>
      <nav>{NAV.map((item) => <button key={item} className={active === item ? "is-active" : ""} onClick={() => setActive(item)}>{item}</button>)}</nav>
      <div className="workspace-rail-foot"><button onClick={() => setActive("Nastavení")}>Nastavení</button>{isPartner && <button onClick={() => setActive("Správa")}>Administrace</button>}<a href="/soukromi">Soukromí a bezpečí</a></div>
    </aside>

    <div className="workspace-body">
      <header className="workspace-topbar"><div><p className="eyebrow">{copy.label}</p><h1>{active === "Přehled" ? copy.title : active}</h1></div><div className="workspace-actions"><label><span className="sr-only">Hledat projekty</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Hledat v Pansofii" /></label><button aria-label="Upozornění">◌</button></div></header>

      {active === "Přehled" && <>
        <section className="workspace-hero">
          <div><p className="eyebrow">{copy.focus}</p><h2>Učíme se životem.<br/>Společně tvoříme lepší svět.</h2><p>Vaše cesta propojuje poznání, konkrétní činy, reflexi a lidi, kteří mohou pomoci.</p><div className="workspace-hero-actions"><button onClick={() => setActive("Cesty")}>Pokračovat v cestě</button><button className="secondary" onClick={() => setActive("Mise")}>Najít misi</button></div></div>
          <Image src={isFamily ? "/art/pansofie-v1/action-help.webp" : "/assets/adult-hero-rooftop.png"} alt="Pansofie propojuje učení s reálným světem" width={760} height={560} priority />
        </section>
        <section className="workspace-metrics" aria-label="Souhrn aktivity">{copy.metric.map((value, index) => <div key={value}><strong>{value}</strong><span>{["oblastí", "cest", "odznaků", "v projektech"][index]}</span></div>)}</section>
        <section className="workspace-two"><div><div className="section-heading"><div><p className="eyebrow">Doporučeno pro vás</p><h2>Další smysluplný krok</h2></div><button onClick={() => setActive("Mise")}>Všechny mise →</button></div><div className="mission-list">{MISSIONS.slice(0,2).map((mission) => <article key={mission.id}><Image src={mission.image} alt="" width={216} height={176}/><div><span>{mission.area} · +{mission.xp} XP</span><h3>{mission.title}</h3><p>{mission.detail}</p></div><button aria-label={`Uložit misi ${mission.title}`} onClick={() => toggleMission(mission.id)}>{saved.includes(mission.id) ? "✓" : "+"}</button></article>)}</div></div><ImpactCard /></section>
      </>}

      {active === "Cesty" && <section><div className="section-heading"><div><p className="eyebrow">Sedm cest k naplněnému životu</p><h2>Vyberte si směr</h2></div></div><div className="path-grid">{PATHS.map(([title,text,icon], index) => <article key={title}><span>{icon}</span><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p><button onClick={() => setActive("Mise")}>Otevřít cestu →</button></article>)}</div><div className="domain-panel"><div><p className="eyebrow">Celý svět v souvislostech</p><h2>16 oblastí poznání</h2></div><div>{DOMAINS.map((domain, index) => <button key={domain}><span>{["♙","♧","⌁","♡"][index % 4]}</span>{domain}</button>)}</div></div></section>}

      {active === "Mise" && <section><div className="section-heading"><div><p className="eyebrow">Uč se · zkoušej · tvoř · reflektuj</p><h2>Mise a checkpointy</h2></div><span>{saved.length} v mém plánu</span></div><div className="mission-board">{MISSIONS.map((mission) => <article key={mission.id}><Image src={mission.image} alt="" width={520} height={320}/><div className="mission-progress"><span style={{width: `${(mission.progress + 1) * 25}%`}} /></div><p>{mission.area} · +{mission.xp} XP</p><h3>{mission.title}</h3><p>{mission.detail}</p><ol><li>Objev</li><li>Udělej</li><li>Zaznamenej</li><li>Reflektuj</li></ol><button onClick={() => toggleMission(mission.id)}>{saved.includes(mission.id) ? "Odebrat z plánu" : "Přidat do plánu"}</button></article>)}</div></section>}

      {(active === "Projekty" || active === "Labs") && <section><div className="section-heading"><div><p className="eyebrow">{active === "Labs" ? "Bezpečný prostor pro pokusy" : "Tvoř · zapojuj se · měň svět"}</p><h2>{active === "Labs" ? "Pansofie Labs" : "Projekty, které mají smysl"}</h2></div></div>{filteredProjects.length ? <div className="project-grid">{filteredProjects.map((project) => <article key={project.title}><Image src={project.image} alt="" width={540} height={320}/><div><span>{project.tag}</span><h3>{project.title}</h3><p>{project.description}</p><button>Prozkoumat projekt →</button></div></article>)}</div> : <EmptyState />}</section>}

      {active === "Síť" && <section><div className="section-heading"><div><p className="eyebrow">Lidé · projekty · příležitosti</p><h2>Mapa spolupráce</h2></div><span>Bez přesných adres dětí</span></div><div className="network-layout"><div className="network-map" role="img" aria-label="Orientační mapa projektů bez přesných domácích adres">{CHECKPOINTS.map((item,index) => <button key={item[0]} style={{left:`${18 + index * 19}%`,top:`${24 + (index % 2) * 36}%`}} aria-label={item[0]}>●</button>)}</div><div className="checkpoint-list">{CHECKPOINTS.map(([title,place,type,status]) => <article key={title}><span>{type}</span><h3>{title}</h3><p>{place} · {status}</p><button>Zobrazit checkpoint</button></article>)}</div></div></section>}

      {active === "Portfolio" && <section><div className="section-heading"><div><p className="eyebrow">Evidence · reflexe · růst</p><h2>Moje cesta v čase</h2></div></div><div className="portfolio-layout"><div className="growth-tree"><Image src="/art/pansofie-v1/hero-tree.webp" alt="Vizuální strom osobního rozvoje" width={620} height={620}/><strong>Level 5</strong><span>850 / 1 000 XP</span></div><div className="reflection"><h3>Co se mi povedlo?</h3><p>Reflexe je soukromá, dokud se ji sami nerozhodnete sdílet.</p><textarea aria-label="Soukromá reflexe" placeholder="Zapište si, co jste objevili…"/><button>Uložit soukromě</button></div><ImpactCard /></div></section>}

      {active === "Nastavení" && <section className="settings-panel"><p className="eyebrow">Bezpečí a přizpůsobení</p><h2>Nastavení</h2>{["Můj účet", "Soukromí a oprávnění", isFamily ? "Rodičovský režim" : "Notifikace", "Přístupnost", "Jazyk", "Propojené účty"].map((item) => <button key={item}>{item}<span>→</span></button>)}<div className="safety-note"><strong>Bezpečí je součást produktu.</strong><p>Young nikdy nezobrazuje přesnou polohu dítěte ani neotevírá přímý kontakt s neznámým dospělým. Oprávnění řídí ověřené vztahy a členství.</p></div></section>}

      {active === "Správa" && <section><p className="eyebrow">Partner · správce</p><h2>Správa prostoru</h2><div className="admin-grid">{["Členové a role", "Týmy a matching", "Projekty a moderace", "Oprávnění", "Souhlasy a soukromí", "Impact report"].map((item, index) => <article key={item}><small>0{index + 1}</small><h3>{item}</h3><p>Spravujte pouze data a lidi, ke kterým máte aktivní oprávnění.</p><button>Otevřít →</button></article>)}</div></section>}
    </div>
  </div>;
}

function ImpactCard() {
  return <aside className="impact-card"><p className="eyebrow">Projektový Impact</p><h2>Změnu můžete vidět.</h2><div><strong>7</strong><span>dokončených kroků</span></div><div><strong>28</strong><span>hodin spolupráce</span></div><svg viewBox="0 0 240 70" aria-label="Trend dopadu"><path d="M4 60 C35 54 41 32 70 39 S112 18 142 27 183 9 236 7" fill="none" stroke="currentColor" strokeWidth="4"/></svg><small>Bez automatických ESG nebo CO₂ tvrzení.</small></aside>;
}
