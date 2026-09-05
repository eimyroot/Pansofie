import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Hammer, HeartHandshake, Leaf, Lightbulb, Recycle, Sparkles, TreePine } from "lucide-react";

const DISCOVERY = [
  { icon: Leaf, title: "Příroda", text: "Pozoruj, co roste, žije a mění se kolem tebe." },
  { icon: Lightbulb, title: "Nápady", text: "Ptej se, zkoušej a hledej vlastní cestu k řešení." },
  { icon: HeartHandshake, title: "Pomoc", text: "Objev, kde může malý čin skutečně někomu pomoci." },
  { icon: Hammer, title: "Tvoření", text: "Postav, oprav nebo vytvoř něco, co má opravdový smysl." },
  { icon: BookOpen, title: "Objevování", text: "Sbírej příběhy, zkušenosti a vědění lidí kolem sebe." },
  { icon: Recycle, title: "Koloběh", text: "Najdi nové využití pro věci a materiály, které už někdo nepotřebuje." },
];

export default function YoungHome() {
  return (
    <div className="young-world min-h-screen overflow-hidden">
      <header className="young-nav">
        <Link to="/young" className="young-brand" aria-label="Pansofie Young – domů">
          <span className="young-brand-mark" aria-hidden="true">🌱</span>
          <span><strong>Pansofie</strong><small>Young</small></span>
        </Link>
        <nav className="young-nav-links" aria-label="Pansofie Young">
          <a href="#objevuj">Objevuj</a>
          <a href="#mise">Moje mise</a>
          <Link to="/">Pansofie pro dospělé</Link>
        </nav>
      </header>

      <main>
        <section className="young-hero">
          <div className="young-sun" aria-hidden="true" />
          <div className="young-cloud young-cloud-a" aria-hidden="true">☁</div>
          <div className="young-cloud young-cloud-b" aria-hidden="true">☁</div>
          <div className="young-hero-copy">
            <span className="young-kicker"><Sparkles size={16} /> Pansofie Young</span>
            <h1>Co chceš dnes<br /><em>objevit?</em></h1>
            <p>Svět je plný otázek, lidí, přírody a věcí, které můžeme společně zlepšit. Vyber si cestu a začni malým skutečným krokem.</p>
            <a href="#objevuj" className="young-primary">Vybrat cestu <ArrowRight size={18} /></a>
          </div>

          <div className="young-landscape" aria-label="Kreslená krajina Pansofie">
            <div className="young-tree" aria-hidden="true">🌳</div>
            <div className="young-hill young-hill-back" />
            <div className="young-hill young-hill-front" />
            <div className="young-people" aria-hidden="true"><span>🧒</span><span>👧</span><span>🧑‍🦳</span></div>
            <div className="young-garden" aria-hidden="true">🌻 🌿 🥕</div>
          </div>
        </section>

        <section id="objevuj" className="young-section">
          <div className="young-section-heading">
            <span>Šest cest do světa</span>
            <h2>Vyber si, co tě právě zajímá.</h2>
            <p>Nemusíš sbírat body ani závodit s ostatními. Důležité je něco skutečně poznat, udělat a pochopit.</p>
          </div>
          <div className="young-grid">
            {DISCOVERY.map(({ icon: Icon, title, text }, index) => (
              <article className={`young-card young-card-${index + 1}`} key={title}>
                <span className="young-card-icon"><Icon size={28} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="mise" className="young-mission-wrap">
          <div className="young-mission">
            <div className="young-mission-art" aria-hidden="true"><TreePine size={64} /><span>🐞</span></div>
            <div>
              <span className="young-kicker">Dnešní inspirace</span>
              <h2>Najdi jedno místo, kterému můžeš pomoci.</h2>
              <p>Podívej se doma, ve škole nebo venku. Co by šlo opravit, uklidit, zasadit, zjistit nebo někomu vysvětlit? Začni jedním malým krokem.</p>
              <p className="young-note">Chceš si výsledek uchovat? Můžeš si poznamenat větu, příběh nebo obrázek. Není to soutěž.</p>
              <Link to="/jak-funguje" className="young-secondary">Jak funguje zkušenost v Pansofii <ArrowRight size={17} /></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="young-footer">
        <p><strong>Pansofie Young</strong> · stejná Pansofie, hravější cesta k objevování.</p>
        <Link to="/">Přejít na hlavní Pansofii →</Link>
      </footer>
    </div>
  );
}
