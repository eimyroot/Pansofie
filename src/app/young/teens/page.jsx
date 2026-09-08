import Link from "next/link";

const topics = [
  ["/assets/r8/vision-youth-r8.png", "TECHNOLOGIE", "AI a technologie", "Příležitosti, rizika a jak je využít smysluplně."],
  ["/art/pansofie-v1/action-help.webp", "LIDÉ", "Identita a vztahy", "Kdo jsem, kam patřím a jak budovat zdravé vztahy."],
  ["/assets/r8/vision-school-r8.png", "SPOLEČNOST", "Společnost a svět", "Co se děje kolem nás a jak to spolu souvisí."],
  ["/assets/adult-hero-rooftop.png", "SEBEROZVOJ", "Smysl a budoucnost", "Kam směřujeme a jaký svět chceme tvořit."],
];

const articles = [
  ["/assets/r8/vision-youth-r8.png", ["TECHNOLOGIE", "VZDĚLÁVÁNÍ"], "Jak AI mění způsob, jak se učíme", "Nové možnosti, nové výzvy. Co to znamená pro naši generaci?"],
  ["/art/pansofie-v1/action-explore.webp", ["PSYCHOLOGIE", "DIGITÁLNÍ SVĚT"], "Proč jsme pořád online a stejně osamělí?", "Sociální sítě nás spojují – a přesto se mnozí cítíme víc sami než kdy dřív."],
  ["/assets/r8/vision-school-r8.png", ["VZDĚLÁVÁNÍ", "SPOLEČNOST"], "Má ještě škola připravit na budoucnost?", "Co by se mělo změnit a co se můžeme naučit i mimo školní lavice."],
];

const actions = [
  ["🎮", "Kvíz", "Otestuj své znalosti a objev nové souvislosti.", "teens-action--mint"],
  ["💬", "Debata týdne", "Zapoj se do diskuze. Co si o tom myslíš?", "teens-action--blue"],
  ["▶", "Mini série", "Krátká videa, velké myšlenky. Vysvětlujeme svět jednoduše.", "teens-action--yellow"],
  ["🚀", "Zkus projekt", "Máš nápad? Pojď ho zrealizovat s ostatními.", "teens-action--pink"],
];

const benefits = [
  ["👥", "Komunita, která dává smysl"],
  ["💡", "Nové pohledy a inspirace"],
  ["🚀", "Tvoje nápady mají cenu"],
  ["♥", "Lepší svět je možný"],
];

export default function Page() {
  return (
    <div className="teens-page">
      <section className="teens-hero">
        <div className="teens-hero-copy">
          <p className="teens-eyebrow">VÍCE NEŽ ODPOVĚDI. SOUVISLOSTI.</p>
          <h1>Chápej svět<br/>ve <span>větších</span><br/>souvislostech.</h1>
          <p className="teens-lead">Pro všechny mladé od 14 do 20 let, kteří se ptají, chtějí rozumět, hledají svůj názor a chtějí měnit svět kolem sebe.</p>
          <div className="teens-hero-actions"><Link className="teens-btn teens-btn--solid" href="#temata">Objevuj obsah <span>→</span></Link><Link className="teens-btn teens-btn--outline" href="#komunita">Přidej se k nám</Link></div>
          <div className="teens-benefits">{benefits.map(([icon,label]) => <div key={label}><strong>{icon}</strong><span>{label}</span></div>)}</div>
        </div>
        <div className="teens-hero-art">
          <img src="/assets/adult-hero-rooftop.png" alt="Komunita Pansofie při společné debatě"/>
          <span className="teens-scribble teens-scribble--ai">AI</span>
          <span className="teens-scribble teens-scribble--future">BUDOUCNOST</span>
          <span className="teens-scribble teens-scribble--meaning">SMYSL</span>
          <span className="teens-scribble teens-scribble--climate">KLIMA</span>
          <span className="teens-question">CO SI O TOM<br/>MYSLÍŠ?</span>
        </div>
      </section>

      <section id="temata" className="teens-section">
        <header className="teens-section-head"><div><p className="teens-eyebrow">VELKÉ OTÁZKY SKUTEČNÉHO ŽIVOTA</p><h2>Co tu řešíme?</h2></div><Link href="/young" className="teens-more">Všechna témata <span>→</span></Link></header>
        <div className="teens-topic-grid">
          {topics.map(([image,tag,title,text]) => <article className="teens-topic-card" key={title}><div className="teens-topic-media"><img src={image} alt=""/><span>{tag}</span></div><div><h3>{title}</h3><p>{text}</p><Link href="/young" aria-label={`Otevřít ${title}`}>→</Link></div></article>)}
        </div>
      </section>

      <section id="clanky" className="teens-section teens-section--articles">
        <header className="teens-section-head"><div><p className="teens-eyebrow">AKTUÁLNĚ</p><h2>Co právě letí?</h2></div><Link href="/young" className="teens-more">Všechny články <span>→</span></Link></header>
        <div className="teens-article-grid">
          {articles.map(([image,tags,title,text]) => <article className="teens-article-card" key={title}><div className="teens-article-media"><img src={image} alt=""/><div>{tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="teens-article-copy"><h3>{title}</h3><p>{text}</p><Link href="/young" aria-label={`Číst ${title}`}>→</Link></div></article>)}
        </div>
      </section>

      <section id="projekty" className="teens-section teens-section--join">
        <header className="teens-section-head teens-section-head--compact"><div><p className="teens-eyebrow">VÍC NEŽ JEN ČTENÍ – TVŮJ PROSTOR K AKCI</p><h2>Zapoj se!</h2></div></header>
        <div className="teens-action-grid">{actions.map(([icon,title,text,tone]) => <article className={`teens-action-card ${tone}`} key={title}><strong>{icon}</strong><div><h3>{title}</h3><p>{text}</p></div><Link href="/young" aria-label={`Otevřít ${title}`}>→</Link></article>)}</div>
      </section>

      <section id="komunita" className="teens-community">
        <div className="teens-community-image"><img src="/art/pansofie-v1/action-help.webp" alt="Mladí lidé tvoří komunitu Pansofie"/></div>
        <div className="teens-community-copy"><p className="teens-eyebrow">LEPŠÍ SVĚT ZAČÍNÁ U NÁS</p><h2>Přidej se do komunity<br/>Young Pansofie.</h2><p>Diskutuj, sdílej nápady, tvoř projekty a potkej lidi, kteří chtějí věci nejen sledovat.</p><Link className="teens-btn teens-btn--lime" href="/young">Přidej se <span>→</span></Link></div>
        <div className="teens-community-values"><span>👥 Noví přátelé</span><span>💡 Inspirace</span><span>◎ Skutečné projekty</span><span>🌿 Větší souvislosti</span></div>
      </section>
    </div>
  );
}
