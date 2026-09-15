"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CHECKPOINTS, DOMAINS, MISSIONS, PROJECTS } from "../../domain/pansofie-content";

const NAV = ["Domů", "Mise", "Mapa", "Projekty", "Komunita", "Učení", "Můj rozvoj", "Mentor", "Profil", "Nastavení"];
const TONES = ["Příroda", "Lidé", "Technologie", "Kreativita", "Sport", "Společnost"];
const FRIENDS = ["Klára", "Tomáš", "Ema", "Adam", "Sofie"];

export default function YoungWorkspace({ variant = "kids" }) {
  const [active, setActive] = useState("Domů");
  const [parentMode, setParentMode] = useState(false);
  const teen = variant === "teens";
  const mission = MISSIONS[0];
  const recommended = useMemo(() => MISSIONS.map((item) => ({ ...item, done: item.progress > 0 })), []);

  return <div className={`young-app ${teen ? "young-app--teens" : "young-app--kids"}`}>
    <header className="young-app-hero">
      <div><p>PANSOFIE YOUNG</p><h1>{teen ? "Tvoje nápady mají cenu." : "Ahoj, Káťo! Svět tě potřebuje."}</h1><span>{teen ? "14-20 let · tvoř, spolupracuj, měň svět" : "6-13 let · objevuj, zkoušej, tvoř"}</span></div>
      <Image src={teen ? "/assets/adult-hero-rooftop.png" : "/art/pansofie-v1/hero-tree.webp"} alt="Pansofie Young svět objevování" width={720} height={520} priority />
    </header>

    <nav className="young-app-tabs" aria-label="Pansofie Young aplikace">
      {NAV.map((item) => <button key={item} className={active === item ? "is-active" : ""} onClick={() => setActive(item)}>{item}</button>)}
    </nav>

    {active === "Domů" && <main className="young-app-grid">
      <section className="young-phone-card young-daily">
        <p>Denní mise</p><h2>{mission.title}</h2><span>+{mission.xp} XP</span>
        <Image src={mission.image} alt="" width={540} height={320} />
        <button onClick={() => setActive("Mise")}>Začít</button>
      </section>
      <section className="young-phone-card"><p>Pokračuj, kde jsi skončila</p><h2>Malá dobrodružství každý den</h2><div className="young-progress"><span /></div></section>
      <section className="young-phone-card"><p>Doporučeno pro tebe</p><h2>Jak funguje les?</h2><Image src="/art/pansofie-v1/pillar-panorthosia.webp" alt="" width={500} height={300}/><button onClick={() => setActive("Učení")}>Otevřít učení</button></section>
    </main>}

    {active === "Mise" && <main className="young-stack">{recommended.map((item) => <article className="young-row-card" key={item.id}><Image src={item.image} alt="" width={160} height={110}/><div><span>{item.done ? "Aktivní" : "Nová"} · +{item.xp} XP</span><h2>{item.title}</h2><p>{item.detail}</p></div><button>{item.done ? "✓" : "+"}</button></article>)}</main>}

    {active === "Mapa" && <main className="young-map-view"><div className="young-map-canvas" role="img" aria-label="Bezpečná mapa komunitních projektů">{CHECKPOINTS.map((item, index) => <button key={item[0]} style={{ left: `${16 + index * 20}%`, top: `${24 + (index % 2) * 34}%` }} aria-label={item[0]}>●</button>)}</div>{CHECKPOINTS.map(([title, place, type]) => <article className="young-phone-card" key={title}><p>{type}</p><h2>{title}</h2><span>{place} · orientační lokalita</span></article>)}</main>}

    {active === "Projekty" && <main className="young-stack">{PROJECTS.map((project) => <article className="young-project-card" key={project.title}><Image src={project.image} alt="" width={640} height={360}/><div><span>{project.tag}</span><h2>{project.title}</h2><p>{project.description}</p></div></article>)}</main>}

    {active === "Komunita" && <main className="young-stack"><section className="young-phone-card"><p>Lidé · týmy · příběhy</p><h2>Najdi parťáky ve svém okolí</h2><button>Prozkoumat komunitu</button></section>{FRIENDS.map((name, index) => <article className="young-friend" key={name}><span>{name[0]}</span><div><h2>{name}</h2><p>{["Miluje přírodu", "Fotí a cestuje", "Programuje pro dobro", "Zve na workshop", "Tvoří mapy"][index]}</p></div><button aria-label={`Pozvat ${name}`}>+</button></article>)}</main>}

    {active === "Učení" && <main className="young-topic-grid">{DOMAINS.slice(0, 8).map((domain, index) => <button key={domain}><span>{["🌱","👥","🧠","⚙","🎨","🏃","🌍","💬"][index]}</span>{domain}</button>)}</main>}

    {active === "Můj rozvoj" && <main className="young-growth"><section className="young-phone-card young-profile-top"><Image src="/art/pansofie-v1/action-help.webp" alt="" width={420} height={420}/><h2>Káťa · Explorer</h2><p>Level 5 · 850 / 1 000 XP</p><div className="young-progress"><span /></div></section><section className="young-badges">{["Příroda", "Pomoc", "Učení", "Tým", "Kreativita", "Výzvy"].map((item) => <span key={item}>{item}</span>)}</section></main>}

    {active === "Mentor" && <main className="young-stack"><section className="young-phone-card mentor"><Image src="/art/pansofie-v1/action-explore.webp" alt="" width={500} height={320}/><h2>Ahoj! S čím dnes chceš pomoct?</h2>{["Chci se něco naučit", "Potřebuju radu", "Mám nápad na projekt", "Chci si povídat"].map((item) => <button key={item}>{item}</button>)}</section></main>}

    {active === "Profil" && <main className="young-growth"><section className="young-phone-card young-profile-top"><Image src="/art/pansofie-v1/action-help.webp" alt="" width={420} height={420}/><h2>Káťa</h2><p>Můj příběh, odznaky a bezpečné portfolio.</p></section><section className="young-stats"><strong>5</strong><strong>28</strong><strong>120</strong><span>projektů</span><span>odznaků</span><span>hodin</span></section></main>}

    {active === "Nastavení" && <main className="young-stack"><section className="young-phone-card"><p>Bezpečí a přizpůsobení</p><h2>Nastavení</h2>{["Můj účet", "Soukromí a bezpečí", "Rodičovský režim", "Upozornění", "Jazyk", "Připojené účty"].map((item) => <button key={item}>{item}</button>)}</section><section className="young-phone-card"><h2>Rodičovský režim</h2><label><input type="checkbox" checked={parentMode} onChange={(event) => setParentMode(event.target.checked)} /> Aktivovat bezpečný přehled</label><p>{parentMode ? "Rodič vidí doporučení, souhlasy a bezpečnostní limity." : "Young zůstává chráněný: bez přesné polohy, bez cizích kontaktů, se souhlasy."}</p></section></main>}
  </div>;
}
