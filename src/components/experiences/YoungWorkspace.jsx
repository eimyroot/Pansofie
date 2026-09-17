"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CHECKPOINTS, DOMAINS, KNOWLEDGE_EXCHANGE, LEARNING_METHOD, MISSIONS, PATHS, PROJECTS } from "../../domain/pansofie-content";

const NAV = ["Domů", "Mise", "Mapa", "Projekty", "Komunita", "Učení", "Můj rozvoj", "Mentor", "Profil", "Nastavení"];
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
      <Image src={teen ? "/assets/brand/young/photos/creative-studio-16x9.webp" : "/assets/brand/young/photos/explorers-nature-16x9.webp"} alt="Pansofie Young svět objevování" width={720} height={520} priority />
      <i aria-hidden="true">✦</i><i aria-hidden="true">♡</i><i aria-hidden="true">♔</i>
    </header>

    <nav className="young-app-tabs" aria-label="Pansofie Young aplikace">
      {NAV.map((item) => <button key={item} className={active === item ? "is-active" : ""} onClick={() => setActive(item)}>{item}</button>)}
    </nav>

    <div className="young-device-frame">
      <div className="young-device-status"><span>0:31</span><span>PANSOFIE YOUNG</span><span>● ● ●</span></div>

    {active === "Domů" && <main className="young-app-grid">
      <section className="young-phone-card young-daily">
        <p>Denní mise</p><h2>{mission.title}</h2><span>+{mission.xp} XP</span>
        <Image src={mission.image} alt="" width={540} height={320} />
        <button onClick={() => setActive("Mise")}>Začít</button>
      </section>
      <section className="young-phone-card"><p>Pokračuj, kde jsi skončila</p><h2>Malá dobrodružství každý den</h2><div className="young-progress"><span /></div></section>
      <section className="young-phone-card"><p>Doporučeno pro tebe</p><h2>Jak funguje les?</h2><Image src="/assets/brand/young/photos/explorers-nature-16x9.webp" alt="" width={500} height={300}/><button onClick={() => setActive("Učení")}>Otevřít učení</button></section>
    </main>}

    {active === "Mise" && <main className="young-stack">{recommended.map((item) => <article className="young-row-card" key={item.id}><Image src={item.image} alt="" width={160} height={110}/><div><span>{item.done ? "Aktivní" : "Nová"} · +{item.xp} XP</span><h2>{item.title}</h2><p>{item.detail}</p></div><button>{item.done ? "✓" : "+"}</button></article>)}</main>}

    {active === "Mapa" && <main className="young-map-view"><div className="young-map-canvas" role="img" aria-label="Bezpečná mapa komunitních projektů">{CHECKPOINTS.map((item, index) => <button key={item[0]} style={{ left: `${14 + (index % 3) * 34}%`, top: `${22 + Math.floor(index / 3) * 48}%` }} aria-label={item[0]}>●</button>)}</div>{CHECKPOINTS.map(([title, place, type]) => <article className="young-phone-card" key={title}><p>{type}</p><h2>{title}</h2><span>{place} · orientační lokalita</span></article>)}</main>}

    {active === "Projekty" && <main className="young-stack">{PROJECTS.map((project) => <article className="young-project-card" key={project.title}><Image src={project.image} alt="" width={640} height={360}/><div><span>{project.tag} · {project.status}</span><h2>{project.title}</h2><p>{project.description}</p></div></article>)}</main>}

    {active === "Komunita" && <main className="young-stack"><section className="young-phone-card"><p>Lidé · týmy · příběhy</p><h2>Najdi parťáky ve svém okolí</h2><button>Prozkoumat komunitu</button></section>{FRIENDS.map((name, index) => <article className="young-friend" key={name}><span>{name[0]}</span><div><h2>{name}</h2><p>{["Miluje přírodu", "Fotí a cestuje", "Programuje pro dobro", "Zve na workshop", "Tvoří mapy"][index]}</p></div><button aria-label={`Pozvat ${name}`}>+</button></article>)}</main>}

    {active === "Učení" && <main className="young-learning"><section className="young-method"><p>Jak se učíme</p><div>{LEARNING_METHOD.map((step, index) => <span key={step}><b>{index + 1}</b>{step}</span>)}</div></section><section className="young-topic-grid">{DOMAINS.map((domain, index) => <button key={domain}><span>{["🪞","🏃","🧠","💛","🤝","🏠","🌍","🌱","⚙","💰","🛠","🎨","🎭","⚖","🏛","🧭"][index]}</span>{domain}</button>)}</section></main>}

    {active === "Můj rozvoj" && <main className="young-growth"><section className="young-phone-card young-profile-top"><Image src="/assets/brand/young/photos/community-cutout.png" alt="" width={420} height={420}/><h2>Káťa · Explorer</h2><p>Level 5 · 850 / 1 000 XP</p><div className="young-progress"><span /></div><small>XP je herní postup. Není to hodnota člověka ani reputační skóre.</small></section><section className="young-paths">{PATHS.map(([title, text, icon]) => <article key={title}><span>{icon}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</section></main>}

    {active === "Mentor" && <main className="young-stack"><section className="young-phone-card mentor"><Image src="/assets/brand/young/photos/creative-studio-16x9.webp" alt="" width={500} height={320}/><p>AI / lidský průvodce</p><h2>Ahoj! S čím dnes chceš pomoct?</h2><span>{KNOWLEDGE_EXCHANGE}</span>{["Chci se něco naučit", "Potřebuju radu", "Mám nápad na projekt", "Chci si předat dovednost"].map((item) => <button key={item}>{item}</button>)}<small>Mentor doporučuje další krok, ale nenahrazuje rodiče, pedagoga ani odbornou pomoc.</small></section></main>}

    {active === "Profil" && <main className="young-growth"><section className="young-phone-card young-profile-top"><Image src="/assets/brand/young/photos/community-cutout.png" alt="" width={420} height={420}/><h2>Káťa</h2><p>Můj příběh, odznaky a bezpečné portfolio.</p></section><section className="young-stats"><strong>5</strong><strong>28</strong><strong>120</strong><span>projektů</span><span>odznaků</span><span>hodin</span></section></main>}

    {active === "Nastavení" && <main className="young-stack"><section className="young-phone-card"><p>Bezpečí a přizpůsobení</p><h2>Nastavení</h2>{["Můj účet", "Soukromí a bezpečí", "Rodičovský režim", "Upozornění", "Jazyk", "Připojené účty"].map((item) => <button key={item}>{item}</button>)}</section><section className="young-phone-card"><h2>Rodičovský režim</h2><label><input type="checkbox" checked={parentMode} onChange={(event) => setParentMode(event.target.checked)} /> Aktivovat bezpečný přehled</label><p>{parentMode ? "Rodič vidí doporučení, souhlasy a bezpečnostní limity." : "Young zůstává chráněný: bez přesné polohy, bez cizích kontaktů, se souhlasy."}</p></section></main>}
    </div>

    <nav className="young-bottom-dock" aria-label="Rychlá navigace Young">
      {["Domů", "Mise", "Mapa", "Projekty", "Profil"].map((item) => <button key={item} className={active === item ? "is-active" : ""} onClick={() => setActive(item)}>{item}</button>)}
    </nav>
  </div>;
}
