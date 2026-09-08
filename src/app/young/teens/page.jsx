import Link from "next/link";

const topics = [
  ["🤖", "AI a technologie", "Příležitosti, rizika a jak technologie používat smysluplně."],
  ["❤️", "Identita a vztahy", "Kdo jsem, kam patřím a jak budovat zdravé vztahy."],
  ["🌍", "Společnost a svět", "Co se děje kolem nás a jak spolu jednotlivé věci souvisí."],
  ["🚀", "Smysl a budoucnost", "Kam směřujeme a jaký svět chceme pomáhat tvořit."],
];

const articles = [
  ["🤖", ["Technologie", "Vzdělávání"], "Jak AI mění způsob, jak se učíme", "Nové možnosti, nové výzvy. Co to znamená pro naši generaci?"],
  ["📱", ["Psychologie", "Digitální svět"], "Proč jsme pořád online a stejně osamělí?", "Sociální sítě nás spojují — a přesto se mnozí cítíme víc sami než dřív."],
  ["🏫", ["Společnost", "Vzdělávání"], "Má ještě škola připravit na budoucnost?", "Co by se mělo změnit a co se můžeme učit i mimo školní lavice."],
];

const join = [
  ["🧩", "Kvíz", "Otestuj své znalosti a objev nové souvislosti."],
  ["💬", "Debata týdne", "Zapoj se do diskuze a zkus formulovat vlastní názor."],
  ["🎬", "Mini série", "Krátký formát, který rozbalí velké myšlenky bez zbytečné omáčky."],
  ["🚀", "Zkus projekt", "Máš nápad? Rozlož ho na konkrétní kroky a zkus ho s ostatními."],
];

export default function Page() {
  return (
    <div className="young-experience young-teens-home">
      <section className="young-xp-hero young-xp-hero--teens">
        <div>
          <span className="young-xp-kicker">PANSOFIE YOUNG · 14–20</span>
          <h2>Chápej svět ve větších souvislostech.</h2>
          <p>Pro mladé, kteří se ptají, chtějí rozumět, hledají vlastní názor a chtějí měnit věci kolem sebe.</p>
          <ul className="young-xp-benefits">
            <li>Komunita, která dává smysl</li>
            <li>Nové pohledy a inspirace</li>
            <li>Tvoje nápady mají cenu</li>
            <li>Lepší svět je možný</li>
          </ul>
          <div className="young-xp-actions">
            <Link className="young-xp-btn young-xp-btn--primary" href="#temata">Prozkoumat témata</Link>
            <Link className="young-xp-btn young-xp-btn--ghost" href="#zapoj-se">Zapojit se</Link>
          </div>
        </div>
        <div className="young-xp-visual young-xp-visual--teens" aria-label="Ilustrační prostor pro Young 14 až 20">🧠<strong>PŘEMÝŠLEJ</strong><span>14–20</span></div>
      </section>

      <section id="temata" className="young-xp-section">
        <div className="young-xp-section-head"><span className="young-xp-kicker">CO TU ŘEŠÍME?</span><h2>Velké otázky skutečného života.</h2><p>Ne hotové odpovědi. Kontext, argumenty a prostor vytvořit si vlastní názor.</p></div>
        <div className="young-xp-grid young-xp-grid--4">
          {topics.map(([icon, title, text]) => <article className="young-xp-card young-xp-card--dark" key={title}><span className="young-xp-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="young-xp-section young-xp-section--surface">
        <div className="young-xp-section-head young-xp-section-head--row"><div><span className="young-xp-kicker">CO PRÁVĚ LETÍ?</span><h2>Články a témata k debatě.</h2></div><Link className="young-xp-text-link" href="/young">Veřejná Young stránka →</Link></div>
        <div className="young-xp-grid young-xp-grid--3">
          {articles.map(([icon, tags, title, text]) => <article className="young-xp-article young-xp-article--teens" key={title}><div className="young-xp-article-image">{icon}</div><div><div className="young-xp-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section id="zapoj-se" className="young-xp-section">
        <div className="young-xp-section-head"><span className="young-xp-kicker">ZAPOJ SE</span><h2>Více než jen čtení.</h2><p>Vyber si formát, ve kterém chceš přemýšlet, diskutovat nebo něco skutečně zkusit.</p></div>
        <div className="young-xp-grid young-xp-grid--4">
          {join.map(([icon, title, text]) => <article className="young-xp-card young-xp-card--dark" key={title}><span className="young-xp-icon">{icon}</span><h3>{title}</h3><p>{text}</p><Link className="young-xp-text-link" href="/young">Otevřít →</Link></article>)}
        </div>
      </section>

      <section className="young-xp-banner young-xp-banner--teens"><span>🧠</span><div><h2>Stále se ptát. Víc chápat.</h2><p>Zvídavé myšlení pro smysluplnější svět — bez tlaku na jedinou správnou odpověď.</p></div><Link className="young-xp-btn young-xp-btn--primary" href="/young">Pansofie Young</Link></section>
    </div>
  );
}
