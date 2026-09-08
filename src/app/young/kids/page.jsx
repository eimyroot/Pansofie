import Link from "next/link";

const topics = [
  ["/art/pansofie-v1/pillar-panorthosia.webp", "Příroda", "Zvířata, planeta, klima, lesy a všechno živé.", "kids-topic--green"],
  ["/art/pansofie-v1/hero-tree.webp", "Vesmír", "Hvězdy, planety, vesmírné záhady a velké otázky.", "kids-topic--blue"],
  ["/art/pansofie-v1/action-help.webp", "Lidé a svět", "Historie, společnost, různé kultury, vztahy a co nás spojuje.", "kids-topic--yellow"],
  ["/art/pansofie-v1/action-idea.webp", "Nápady a tvoření", "Pokusy, kreslení, projekty a tvoje vlastní nápady.", "kids-topic--pink"],
];

const activities = [
  ["🧩", "Kvíz týdne", "Otestuj své znalosti a dozvíš se něco nového!", "Spustit kvíz", "kids-play--mint"],
  ["🎮", "Mini hra", "Hraj, objevuj a uč se hrou.", "Hrát hru", "kids-play--blue"],
  ["🔬", "Pokus doma", "Jednoduché pokusy, které zvládneš i doma.", "Zkus to", "kids-play--yellow"],
  ["❓", "Otázka dne", "Zajímavá otázka, na kterou hledáme odpovědi společně.", "Podívat se", "kids-play--pink"],
];

const articles = [
  ["/art/pansofie-v1/compost.webp", "PŘÍRODA KOLEM NÁS", "Proč prší?", "Objev, jak funguje koloběh vody a proč je déšť důležitý."],
  ["/art/pansofie-v1/action-explore.webp", "TECHNOLOGIE V NAŠEM ŽIVOTĚ", "Jak funguje internet?", "Od zprávy k druhému konci světa – jednoduché vysvětlení."],
  ["/art/pansofie-v1/pillar-pansofia.webp", "LIDÉ A SPOLEČNOST", "Proč lidé potřebují pravidla?", "Od rodiny až po státy – zjisti, proč jsou pravidla důležitá."],
];

const benefits = [
  ["🌿", "Větší souvislosti"],
  ["❤", "Lepší budoucnost"],
  ["💡", "Zvídavé mysli"],
  ["👥", "Skvělá komunita"],
];

export default function Page() {
  return (
    <div className="kids-page">
      <section className="kids-hero">
        <div className="kids-hero-copy">
          <p className="kids-eyebrow">PANSOFIE YOUNG · 6–13</p>
          <h1>Objevuj svět<br/>v souvislostech.</h1>
          <p className="kids-lead">Vše kolem nás souvisí – příroda, lidé, nápady i tvůj každodenní život. Pojď to objevovat spolu s námi!</p>
          <div className="kids-hero-actions">
            <Link href="#objevuj" className="kids-btn kids-btn--green">⌕&nbsp; Prozkoumat <span>→</span></Link>
            <Link href="#vyzkousej" className="kids-btn kids-btn--light">🎮&nbsp; Zkus kvíz</Link>
          </div>
          <div className="kids-benefits">
            {benefits.map(([icon,label]) => <div key={label}><strong>{icon}</strong><span>{label}</span></div>)}
          </div>
        </div>
        <div className="kids-hero-art">
          <img src="/art/pansofie-v1/hero-tree.webp" alt="Ilustrovaný svět Pansofie Young plný objevování" />
          <span className="kids-doodle kids-doodle--one">ZVĚDAVOST<br/>MĚNÍ SVĚT ♡</span>
          <span className="kids-doodle kids-doodle--two">STEJNĚ RŮZNÍ.<br/>STEJNĚ ZVĚDAVÍ.</span>
        </div>
      </section>

      <section id="objevuj" className="kids-section">
        <header className="kids-section-head">
          <div><p className="kids-eyebrow">OBJEVUJ</p><h2>Co tu najdeš?</h2></div>
          <Link href="/young" className="kids-more">Objevuj všechna témata <span>→</span></Link>
        </header>
        <div className="kids-topic-grid">
          {topics.map(([image,title,text,tone]) => (
            <article className={`kids-topic-card ${tone}`} key={title}>
              <img src={image} alt="" />
              <div><h3>{title}</h3><p>{text}</p><Link href="/young" aria-label={`Otevřít téma ${title}`}>→</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section id="vyzkousej" className="kids-section kids-section--play">
        <header className="kids-section-head">
          <div><p className="kids-eyebrow">HRAJ SI A ZKOUŠEJ</p><h2>Vyzkoušej si!</h2></div>
          <p className="kids-side-note">Zábava, která tě něco naučí ☺</p>
        </header>
        <div className="kids-play-grid">
          {activities.map(([icon,title,text,cta,tone]) => (
            <article className={`kids-play-card ${tone}`} key={title}>
              <span className="kids-play-icon">{icon}</span><h3>{title}</h3><p>{text}</p><Link href="/young">{cta} <span>→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section id="tvor" className="kids-section">
        <header className="kids-section-head">
          <div><p className="kids-eyebrow">ČTI · PTEJ SE · TVOŘ</p><h2>Téma týdne</h2></div>
          <Link href="/young" className="kids-more">Prozkoumej další články <span>→</span></Link>
        </header>
        <div className="kids-article-grid">
          {articles.map(([image,tag,title,text]) => (
            <article className="kids-article-card" key={title}>
              <div className="kids-article-media"><img src={image} alt=""/><span>{tag}</span></div>
              <div className="kids-article-copy"><h3>{title}</h3><p>{text}</p><Link href="/young" aria-label={`Číst ${title}`}>→</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section id="komunita" className="kids-community">
        <div className="kids-community-image"><img src="/art/pansofie-v1/action-help.webp" alt="Mladí lidé spolupracují a objevují"/></div>
        <div className="kids-community-copy"><p className="kids-eyebrow">LEPŠÍ SVĚT TVOŘÍME SPOLU</p><h2>Ptej se. Objevuj. Tvoř.</h2><p>Přidej se ke komunitě zvídavých dětí a sdílej své nápady, otázky a bezpečné projekty.</p><Link className="kids-btn kids-btn--green" href="/young">Přidej se do klubu <span>→</span></Link></div>
        <div className="kids-community-notes"><span>🌐 Noví přátelé</span><span>♡ Zajímavé diskuze</span><span>✦ Tvoje nápady mají cenu</span></div>
      </section>
    </div>
  );
}
