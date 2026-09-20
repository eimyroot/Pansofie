"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DOMAIN_DETAILS, LEARNING_METHOD, PATHS } from "../../domain/pansofie-content";
import { missionLearningSteps, getGrowMissionPresentation } from "../../domain/mission-presentation";
import { MISSION_GROW_001 } from "../../domain/learning-core";
import { PROJECT_GREEN_HOPE_GROW_001 } from "../../domain/project-core";

const TAB_SETS = Object.freeze({
  explore: Object.freeze([
    ["Domů", "Domů"], ["Mise", "Výpravy"], ["Projekty", "Tvořím"], ["Moje cesta", "Moje cesta"], ["Bezpečí", "Bezpečí"],
  ]),
  quest: Object.freeze([
    ["Domů", "Domů"], ["Mise", "Mise"], ["Projekty", "Projekty"], ["Moje cesta", "Moje cesta"], ["Komunita", "Můj tým"], ["Bezpečí", "Bezpečí"],
  ]),
  impact: Object.freeze([
    ["Domů", "Domů"], ["Mise", "Mise"], ["Projekty", "Projekty"], ["Moje cesta", "Moje cesta"], ["Komunita", "Komunita"], ["Mentor", "Mentor"], ["Bezpečí", "Bezpečí"],
  ]),
});
const MISSION_STATUS = Object.freeze({
  not_started: "Ještě nezačato",
  assigned: "Připraveno",
  in_progress: "Rozpracováno",
  submitted: "Odevzdáno",
  completed: "Dokončeno",
  cancelled: "Ukončeno",
});

function guardianCopy(state) {
  if (state === "verified") return "Ověřený rodinný průvodce je propojený s účtem.";
  if (state === "pending") return "Rodinné propojení čeká na ověření.";
  return "Ověřené rodinné propojení zatím není nastavené.";
}
function ContextCard({ account }) {
  return (
    <article className="young-product-card young-product-context">
      <span className="young-product-kicker">MŮJ BEZPEČNÝ KONTEXT</span>
      <h3>{account.organization?.name || "Můj osobní Young prostor"}</h3>
      <p>{account.organization
        ? `Jsi tu přes ověřený kontext. Role: ${account.organization.role || "člen"}.`
        : "Nemusíš být veřejně dohledatelný, abys mohl plnit mise a tvořit portfolio."}</p>
      <small>{guardianCopy(account.guardianState)}</small>
    </article>
  );
}

export default function YoungWorkspace({ variant = "kids", presentation, displayName, account }) {
  const [active, setActive] = useState("Domů");
  const mode = presentation?.id || (variant === "teens" ? "impact" : "quest");
  const copy = presentation || { label: "Young", ageLabel: "", eyebrow: "PANSOFIE YOUNG", title: "Můj Young prostor", lead: "Uč se zkušeností." };
  const tabs = TAB_SETS[mode] || TAB_SETS.quest;
  const dockTabs = tabs.filter(([id]) => ["Domů", "Mise", "Projekty", "Moje cesta", "Bezpečí"].includes(id));
  const missionPresentation = getGrowMissionPresentation(variant === "teens" ? "teens" : "kids");
  const steps = missionLearningSteps();
  const missionStatus = MISSION_STATUS[account.missionStatus] || MISSION_STATUS.not_started;
  const heroImage = mode === "explore"
    ? "/assets/brand/young/photos/explorers-nature-16x9.webp"
    : mode === "quest"
      ? "/assets/brand/young/photos/hero-rooftop-left-safe-16x9.webp"
      : "/assets/brand/young/photos/creative-studio-16x9.webp";
  const heroThread = mode === "explore"
    ? "OTÁZKA → POKUS → OBJEV"
    : mode === "quest"
      ? "MISE → POKUS → TVORBA"
      : "NÁPAD → PROJEKT → ZKUŠENOST";

  return (
    <div className={`young-product young-product--${mode}`} data-young-mode={mode}>
      <header className="young-product-hero">
        <div className="young-product-hero-copy">
          <p className="young-product-kicker">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="young-product-lead">{copy.lead}</p>
          <div className="young-product-personal">
            <strong>{displayName || "Můj svět"}</strong>
            <span>{copy.label} · {copy.ageLabel}</span>
          </div>
        </div>
        <div className="young-product-hero-media">
          <Image src={heroImage} alt="Mladí lidé při objevování, tvoření a spolupráci" width={880} height={620} priority />
          <span>{heroThread}</span>
        </div>
      </header>

      <nav className="young-product-tabs" aria-label="Můj Pansofie Young prostor">
        {tabs.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={active === id} className={active === id ? "is-active" : ""} onClick={() => setActive(id)}>
            {label}
          </button>
        ))}
      </nav>

      {active === "Domů" && (
        <main className="young-product-main" id="young-main">
          <section className="young-product-feature">
            <div>
              <span className="young-product-kicker">{missionPresentation.eyebrow}</span>
              <h2>{missionPresentation.title}</h2>
              <p>{missionPresentation.summary}</p>
              <div className="young-product-status-row">
                <span>Stav v účtu: <strong>{missionStatus}</strong></span>
                <span>Dokumentace: <strong>dobrovolná</strong></span>
              </div>
              <Link className="young-product-primary" href="/go/mise-grow">{missionPresentation.actionLabel}</Link>
            </div>
            <Image src="/assets/brand/go/mission-covers/grow-16x9.webp" alt="Rostlina jako první praktická Green Hope mise" width={720} height={480} />
          </section>

          <section className="young-product-grid young-product-grid--three" aria-label="Přehled účtu">
            <article className="young-product-card">
              <span className="young-product-kicker">PROJEKT</span>
              <h3>{PROJECT_GREEN_HOPE_GROW_001.titleCs}</h3>
              <p>{account.project.joined ? "Jsi součástí modelového Green Hope projektu." : "Projekt si můžeš nejdřív prohlédnout. Přidání není povinné."}</p>
              <strong>{account.project.completed}/{account.project.total || 1} propojených misí</strong>
            </article>
            <article className="young-product-card">
              <span className="young-product-kicker">MOJE CESTA</span>
              <h3>{account.portfolioCount} položek v portfoliu</h3>
              <p>Portfolio je důkaz zkušeností, ne žebříček. U Young zůstává soukromí výchozí volbou.</p>
            </article>
            <ContextCard account={account} />
          </section>
        </main>
      )}
      {active === "Mise" && (
        <main className="young-product-main">
          <section className="young-product-section-head">
            <div><span className="young-product-kicker">JEDNA MISE · JEDEN SKUTEČNÝ KROK</span><h2>{MISSION_GROW_001.titleCs}</h2></div>
            <p>Můžeš ji jen zkusit. Záznam, fotografie nebo reflexe nejsou povinnou vstupenkou k účasti.</p>
          </section>
          <ol className="young-product-steps">
            {steps.map((step) => <li key={step.id}><span>{step.labelCs}</span><p>{step.textCs}</p></li>)}
          </ol>
          <div className="young-product-actions">
            <Link className="young-product-primary" href="/go/mise-grow">Provést misi</Link>
            <Link className="young-product-secondary" href="/mise/rostlina">Nejdřív si ji prohlédnout</Link>
          </div>
        </main>
      )}

      {active === "Projekty" && (
        <main className="young-product-main">
          <section className="young-product-feature young-product-feature--project">
            <div>
              <span className="young-product-kicker">GREEN HOPE · MODELOVÝ PROJEKT</span>
              <h2>{PROJECT_GREEN_HOPE_GROW_001.titleCs}</h2>
              <p>{PROJECT_GREEN_HOPE_GROW_001.summaryCs}</p>
              <p className="young-product-truth">Projekt je označený jako modelový. Nejde o tvrzení o existující lokalitě ani naměřeném dopadu.</p>
              <Link className="young-product-primary" href="/go/projekt-green-grow">Otevřít projekt</Link>
            </div>
            <div className="young-product-project-progress" aria-label={`Postup projektu ${account.project.completed} z ${account.project.total || 1}`}>
              <strong>{account.project.completed}</strong><span>z</span><strong>{account.project.total || 1}</strong>
              <small>{account.project.joined ? "uloženo v účtu" : "zatím bez účasti"}</small>
            </div>
          </section>
        </main>
      )}

      {active === "Moje cesta" && (
        <main className="young-product-main">
          <section className="young-product-section-head">
            <div><span className="young-product-kicker">MOJE CESTA</span><h2>Zkušenosti místo skóre člověka.</h2></div>
            <p>Mise, projekty a portfolio ukazují, co jsi opravdu zkusil nebo vytvořil. Nehodnotí tvoji cenu ani osobnost.</p>
          </section>
          <div className="young-product-grid young-product-grid--three">
            <article className="young-product-card"><span className="young-product-kicker">MISE</span><h3>{missionStatus}</h3><p>{MISSION_GROW_001.titleCs}</p></article>
            <article className="young-product-card"><span className="young-product-kicker">PROJEKT</span><h3>{account.project.completed}/{account.project.total || 1}</h3><p>{PROJECT_GREEN_HOPE_GROW_001.titleCs}</p></article>
            <article className="young-product-card"><span className="young-product-kicker">PORTFOLIO</span><h3>{account.portfolioCount}</h3><p>Soukromé položky v účtu.</p></article>
          </div>
          <section className="young-product-paths" aria-label="Sedm cest Pansofie">
            {PATHS.map(([title, text, icon]) => <article key={title}><span aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </section>
        </main>
      )}
      {active === "Komunita" && (
        <main className="young-product-main">
          <section className="young-product-section-head">
            <div><span className="young-product-kicker">BEZPEČNÉ KRUHY</span><h2>Spolupracuj tam, kde je jasný kontext.</h2></div>
            <p>Young nehledá lidi v okolí a nenabízí přímé zprávy neznámým dospělým. Spolupráce patří do rodiny, školy, týmu nebo schváleného projektu.</p>
          </section>
          <div className="young-product-grid young-product-grid--three">
            <ContextCard account={account} />
            <article className="young-product-card">
              <span className="young-product-kicker">RODINA / PRŮVODCE</span>
              <h3>{account.guardianState === "verified" ? "Ověřené propojení" : account.guardianState === "pending" ? "Čeká na ověření" : "Bez propojení"}</h3>
              <p>{guardianCopy(account.guardianState)}</p>
            </article>
            <article className="young-product-card">
              <span className="young-product-kicker">PROJEKTOVÝ KRUH</span>
              <h3>{PROJECT_GREEN_HOPE_GROW_001.titleCs}</h3>
              <p>{account.project.joined ? "Projekt je součástí tvého účtu." : "Do projektu se můžeš přidat přes jeho bezpečný kontext."}</p>
            </article>
          </div>
        </main>
      )}

      {active === "Mentor" && (
        <main className="young-product-main">
          <section className="young-product-section-head">
            <div><span className="young-product-kicker">PRŮVODCE</span><h2>Další krok, ne automatická autorita.</h2></div>
            <p>Mentor může pomoct otázkou, vysvětlením nebo plánem. Nenahrazuje rodiče, pedagoga ani odbornou pomoc.</p>
          </section>
          <div className="young-product-grid young-product-grid--two">
            {["Chci pochopit, jak něco funguje", "Potřebuju rozdělit nápad na malé kroky", "Chci si připravit bezpečný projekt", "Chci si zapsat, co jsem se naučil"].map((item) => (
              <article className="young-product-card" key={item}><h3>{item}</h3><p>Průvodce zatím nabízí bezpečný směr. Tato obrazovka nepředstírá živý chat ani lidskou odpověď.</p></article>
            ))}
          </div>
        </main>
      )}

      {active === "Bezpečí" && (
        <main className="young-product-main">
          <section className="young-product-section-head">
            <div><span className="young-product-kicker">SOUKROMÍ A BEZPEČÍ</span><h2>Co Young záměrně nedělá.</h2></div>
            <p>Bezpečí není rodičovský přepínač ve frontendu. Přístup k datům řídí účet, ověřené vztahy, členství a databázová pravidla.</p>
          </section>
          <div className="young-product-safety">
            <article><strong>01</strong><h3>Bez přesné veřejné polohy</h3><p>Young nezobrazuje přesnou polohu dítěte ani hledání lidí „poblíž“.</p></article>
            <article><strong>02</strong><h3>Bez otevřených kontaktů</h3><p>Neznámí dospělí nemají dostat přímou cestu k dítěti přes community discovery.</p></article>
            <article><strong>03</strong><h3>Portfolio soukromě</h3><p>Zkušenosti a důkazy nejsou veřejné jen proto, že existují.</p></article>
            <article><strong>04</strong><h3>Evidence je volitelná</h3><p>Běžná účast nevyžaduje fotografii, reflexi ani veřejné dokazování.</p></article>
          </div>
          <ContextCard account={account} />
        </main>
      )}
      {active === "Domů" && (
        <section className="young-product-discovery" aria-labelledby="young-discovery-title">
          <div className="young-product-section-head">
            <div><span className="young-product-kicker">JAK SE UČÍME</span><h2 id="young-discovery-title">Od otázky ke zkušenosti.</h2></div>
            <p>Šest kroků je nabídka cesty, ne povinná kontrolní listina.</p>
          </div>
          <div className="young-product-method">
            {LEARNING_METHOD.map((step, index) => <span key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</span>)}
          </div>
          <div className="young-product-domain-strip" aria-label="16 oblastí Pansofie">
            {DOMAIN_DETAILS.map(([title, description]) => <article key={title}><strong>{title}</strong><span>{description}</span></article>)}
          </div>
        </section>
      )}

      <nav className="young-product-dock" aria-label="Rychlá navigace Young">
        {dockTabs.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={active === id} className={active === id ? "is-active" : ""} onClick={() => setActive(id)}>
            {id === "Moje cesta" ? "Cesta" : label}
          </button>
        ))}
      </nav>
    </div>
  );
}
