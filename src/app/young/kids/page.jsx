import Link from "next/link";

const pillars = [
  ["🔗", "Větší souvislosti", "Všechno má svůj důvod a souvisí s něčím dalším."],
  ["🌟", "Lepší budoucnost", "Společně tvoříme svět, ve kterém chceme žít."],
  ["🧠", "Zvídavé mysli", "Ptát se, hledat odpovědi a nikdy nepřestat objevovat."],
  ["🤝", "Skvělá komunita", "Společně se učíme a podporujeme se navzájem."],
];

const topics = [
  ["🌿", "Příroda", "Zvířata, planeta, klima, lesy a všechno živé."],
  ["🌌", "Vesmír", "Hvězdy, planety, vesmírné záhady a velké otázky."],
  ["🌍", "Lidé a svět", "Historie, společnost, kultury, vztahy a to, co nás spojuje."],
  ["🎨", "Nápady a tvoření", "Pokusy, kreslení, projekty a tvoje vlastní nápady."],
];

const activities = [
  ["🧩", "Kvíz týdne", "Otestuj své znalosti a objev něco nového.", "Spustit kvíz"],
  ["🎮", "Mini hra", "Hraj, objevuj a uč se hrou.", "Hrát hru"],
  ["🔬", "Pokus doma", "Jednoduché pokusy, které zvládneš s dospělým i doma.", "Zkusit pokus"],
  ["❓", "Otázka dne", "Jedna zajímavá otázka, nad kterou můžeme přemýšlet spolu.", "Podívat se"],
];

const articles = [
  ["🌧️", "Proč prší?", "Objev, jak funguje koloběh vody a proč je déšť důležitý."],
  ["🌐", "Jak funguje internet?", "Od zprávy k druhému konci světa — jednoduché vysvětlení."],
  ["⚖️", "Proč lidé potřebují pravidla?", "Od rodiny až po státy — zjisti, k čemu pravidla slouží."],
];

export default function Page() {
  return (
    <div className="young-experience young-kids-home">
      <section className="young-xp-hero">
        <div>
          <span className="young-xp-kicker">PANSOFIE YOUNG · 6–13</span>
          <h2>Objevuj svět v souvislostech.</h2>
          <p>Vše kolem nás souvisí — příroda, lidé, nápady i tvůj každodenní život. Pojď zkoumat, tvořit a ptát se bezpečným tempem.</p>
          <div className="young-xp-actions">
            <Link className="young-xp-btn young-xp-btn--primary" href="#objevuj">Prozkoumat</Link>
            <Link className="young-xp-btn young-xp-btn--secondary" href="#vyzkousej">Zkus kvíz</Link>
          </div>
        </div>
        <div className="young-xp-visual" aria-label="Ilustrační prostor pro Young 6 až 13">🌍<strong>OBJEVUJ</strong><span>6–13</span></div>
      </section>

      <section className="young-xp-grid young-xp-grid--4" aria-label="Co je na Young důležité">
        {pillars.map(([icon, title, text]) => <article className="young-xp-card young-xp-card--soft" key={title}><span className="young-xp-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}
      </section>

      <section id="objevuj" className="young-xp-section">
        <div className="young-xp-section-head"><span className="young-xp-kicker">CO TU NAJDEŠ?</span><h2>Vyber si, co tě dnes zajímá.</h2><p>Začni tam, kde máš chuť. Nemusíš postupovat podle pořadí.</p></div>
        <div className="young-xp-grid young-xp-grid--4">
          {topics.map(([icon, title, text]) => <article className="young-xp-card" key={title}><span className="young-xp-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section id="vyzkousej" className="young-xp-section young-xp-section--surface">
        <div className="young-xp-section-head"><span className="young-xp-kicker">VYZKOUŠEJ SI</span><h2>Zábava, která tě něco naučí.</h2><p>Kvízy, hry, pokusy a otázky. Bez známek a bez závodu.</p></div>
        <div className="young-xp-grid young-xp-grid--4">
          {activities.map(([icon, title, text, cta]) => <article className="young-xp-card" key={title}><span className="young-xp-icon">{icon}</span><h3>{title}</h3><p>{text}</p><Link className="young-xp-text-link" href="/young">{cta} →</Link></article>)}
        </div>
      </section>

      <section className="young-xp-section">
        <div className="young-xp-section-head"><span className="young-xp-kicker">DALŠÍ OBJEVY</span><h2>Čti jen tolik, kolik tě baví.</h2></div>
        <div className="young-xp-grid young-xp-grid--3">
          {articles.map(([icon, title, text]) => <article className="young-xp-article" key={title}><div className="young-xp-article-image">{icon}</div><div><h3>{title}</h3><p>{text}</p><Link className="young-xp-text-link" href="/young">Číst dál →</Link></div></article>)}
        </div>
      </section>

      <section className="young-xp-banner"><span>🌍</span><div><h2>Lepší svět tvoříme spolu.</h2><p>Sdílej nápady, otázky a bezpečné projekty s lidmi, kterým důvěřuješ.</p></div><Link className="young-xp-btn young-xp-btn--primary" href="/young">Prozkoumat Young</Link></section>
    </div>
  );
}
