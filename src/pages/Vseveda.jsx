import React from "react";
import { ArrowRight, Brain, Compass, GitBranch, Leaf, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import "@/vision-r28.css";

const contextQuestions = [
  "Kdo informaci vytvořil?",
  "Jaký má zdroj a motiv?",
  "Jak zapadá do širšího historického a společenského rámce?",
  "Co nevidím a na co se musím ještě zeptat?",
];

const intersections = [
  ["Biologie", "Architektura"],
  ["Psychologie", "AI"],
  ["Ekologie", "Ekonomika"],
  ["Řemeslo", "Technologie"],
  ["Umění", "Věda"],
];

export default function Vseveda() {
  return (
    <main className="vision-page vision-detail-page">
      <section className="vision-detail-hero vision-shell">
        <Link className="vision-back" to="/vize">← Zpět na vizi</Link>
        <p className="vision-eyebrow">01 · VŠEVĚDA / PANSOFIA</p>
        <h1>Cesta z labyrintu roztříštěného světa <span>k celistvému lidství.</span></h1>
        <p className="vision-detail-kicker">Nechybějí nám informace. Chybějí nám souvislosti.</p>
        <p className="vision-lead">
          Máme přístup k více datům než kdykoli dříve, ale samotné množství informací ještě nevytváří porozumění.
          Vševěda pro Pansofii znamená učit se spojovat poznatky, zkušenost, přírodu, člověka, technologii a důsledky do srozumitelného celku.
        </p>
      </section>

      <section className="vision-section vision-shell">
        <div className="vision-section-head">
          <p className="vision-eyebrow">01 · DIAGNÓZA DNEŠNÍ DOBY</p>
          <h2>Život v úlomcích a informační obezita</h2>
        </div>
        <div className="vision-prose-grid">
          <div>
            <p>
              Problémem moderního člověka není nedostatek dat, ale nedostatek souvislostí. Specializace nám přinesla obrovský pokrok,
              zároveň ale snadno vytváří oddělené světy, které spolu přestávají mluvit. Detail může být dokonale osvětlený a celek přitom zůstat nejasný.
            </p>
            <blockquote>
              Problémem moderního člověka není nedostatek dat. Je jím nedostatek souvislostí.
            </blockquote>
          </div>
          <div className="vision-diagram-card" aria-label="Od izolovaných informací k souvislostem">
            <div className="fragment-grid">
              <span>VĚDA</span><span>PRÁCE</span><span>TECHNOLOGIE</span><span>PŘÍRODA</span><span>RODINA</span><span>SPOLEČNOST</span>
            </div>
            <div className="diagram-arrow">↓</div>
            <strong>SOUVISLOSTI · PŘÍČINY · DŮSLEDKY</strong>
          </div>
        </div>
      </section>

      <section className="vision-section vision-shell">
        <div className="vision-section-head">
          <p className="vision-eyebrow">02 · KOMENSKÉHO INSPIRACE</p>
          <h2>Ne vědět všechno. Pochopit, jak věci patří k sobě.</h2>
        </div>
        <p className="vision-section-intro">
          Pansofie se inspiruje Komenského snahou vidět poznání jako propojený celek. Historickou inspiraci ale oddělujeme od dnešního produktu:
          nepřipisujeme Komenskému moderní technologie ani současnou produktovou architekturu.
        </p>
        <div className="vision-three-books">
          <article>
            <Leaf size={30} strokeWidth={1.5} />
            <h3>Svět kolem nás</h3>
            <p>Příroda, materiální realita, technologie, systémy a vazby, které lze pozorovat a ověřovat.</p>
          </article>
          <article>
            <Brain size={30} strokeWidth={1.5} />
            <h3>Svět v nás</h3>
            <p>Rozum, emoce, tvořivost, zkušenost a sebepoznání jako podmínka odpovědného úsudku.</p>
          </article>
          <article>
            <Compass size={30} strokeWidth={1.5} />
            <h3>Svět hodnot a přesahu</h3>
            <p>Etika, odpovědnost, smysl a pokora před důsledky toho, co vytváříme a rozhodujeme.</p>
          </article>
        </div>
        <p className="vision-emphasis">
          Technologie bez etiky může ničit. Humanismus bez respektu k přírodě může selhávat. Poznání bez pochopení důsledků nestačí.
        </p>
      </section>

      <section className="vision-section vision-shell">
        <div className="vision-section-head">
          <p className="vision-eyebrow">03 · PROČ JI POTŘEBUJEME DNES</p>
          <h2>Vševěda jako praktická schopnost orientace</h2>
        </div>
        <div className="vision-use-cases">
          <article>
            <ShieldCheck size={28} strokeWidth={1.5} />
            <h3>Odolnost vůči manipulaci</h3>
            <p>Ne reagovat pouze na titulek, ale systematicky rozšířit kontext.</p>
            <ul>{contextQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <GitBranch size={28} strokeWidth={1.5} />
            <h3>Inovace na průsečících</h3>
            <p>Nové možnosti často vznikají tam, kde se potkají obory, které spolu běžně nemluví.</p>
            <div className="intersection-list">
              {intersections.map(([a, b]) => <span key={`${a}-${b}`}>{a} × {b}</span>)}
            </div>
          </article>
          <article>
            <UsersRound size={28} strokeWidth={1.5} />
            <h3>Smysl a orientace</h3>
            <p>
              Fragmentovaný život může přispívat k pocitu odcizení a ztrátě orientace. Vnímání širšího kontextu pomáhá vidět,
              kde naše práce a rozhodnutí vstupují do většího systému vztahů a důsledků.
            </p>
          </article>
        </div>
        <blockquote className="vision-wide-quote">
          Vševěda není schopnost mít odpověď na všechno. Je to schopnost vědět, na co dalšího se musím zeptat.
        </blockquote>
      </section>

      <section className="vision-section vision-shell">
        <div className="vision-section-head">
          <p className="vision-eyebrow">04 · PANSOFICKÉ BRÝLE</p>
          <h2>Jak Vševědu používat v běžném životě</h2>
        </div>
        <div className="vision-scenario-grid">
          <article className="vision-scenario">
            <p className="vision-card-index">SCÉNÁŘ A</p>
            <h3>Tričko není jen cena na cedulce</h3>
            <div className="vision-lens">
              <strong>TRIČKO</strong>
              <span>voda</span><span>materiál</span><span>práce</span><span>doprava</span><span>životnost</span><span>odpad</span>
            </div>
            <p>
              Pansofický pohled rozšiřuje rozhodnutí o otázky původu, zdrojů, lidské práce, logistiky, životnosti a následků. Cílem není vina,
              ale svobodnější a informovanější volba.
            </p>
          </article>
          <article className="vision-scenario">
            <p className="vision-card-index">SCÉNÁŘ B</p>
            <h3>Krize není vždy jeden viník</h3>
            <div className="vision-system-map">
              <span>role</span><span>komunikace</span><span>očekávání</span><strong>SITUACE</strong><span>prostředí</span><span>tlak</span><span>historie</span>
            </div>
            <p>
              Systémový pohled se neptá jen „kdo to pokazil?“, ale také jaké vztahy, role, očekávání a tlaky výsledek vytvořily. To otevírá prostor pro trvalejší řešení.
            </p>
          </article>
        </div>
      </section>

      <section className="vision-section vision-shell vision-wisdom">
        <div className="vision-section-head">
          <p className="vision-eyebrow">05 · OD INFORMACÍ K MOUDROSTI</p>
          <h2>Cílem není chodící encyklopedie</h2>
        </div>
        <div className="wisdom-ladder" aria-label="Od dat k moudrosti">
          <span><small>DATA</small> co existuje</span>
          <ArrowRight size={19} />
          <span><small>INFORMACE</small> co to znamená</span>
          <ArrowRight size={19} />
          <span><small>ZNALOST</small> jak to funguje</span>
          <ArrowRight size={19} />
          <span><small>POROZUMĚNÍ</small> jak to souvisí</span>
          <ArrowRight size={19} />
          <span><small>MOUDROST</small> co je odpovědné udělat</span>
        </div>
        <div className="vision-final-callout">
          <Sparkles size={28} strokeWidth={1.4} />
          <p>
            Pansofie chce pomáhat lidem vidět svět dostatečně celistvě, aby v něm dokázali jednat moudře. Poznání samo ale nestačí — musí se proměnit ve zkušenost.
          </p>
          <Link to="/vize/vsevychova">Pokračovat: Vševýchova <ArrowRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
