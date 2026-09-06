import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Search } from "lucide-react";
import ExperienceStory from "@/components/pansofie/ExperienceStory";
import RoleEntry from "@/components/pansofie/RoleEntry";
import PublicMaturity from "@/components/pansofie/PublicMaturity";
import LanguageToggle from "@/components/pansofie/LanguageToggle";

const ACTIONS = [
  ["Můžu někomu pomoct", "Najdu příležitosti, kde mohu být užitečný.", "/zapojit-se?intent=help", "/pansofie-modern/06_community_collaboration_change.png"],
  ["Můžu něco změnit", "Zapojím se do konkrétních řešení.", "/zapojit-se?intent=change", "/pansofie-modern/07_people_create_change.png"],
  ["Mám přebytek", "Dám věcem druhý život a propojím se s lidmi.", "/materialovy-most", "/pansofie-modern/08_idea_plan_action_impact.png"],
  ["Mám nápad", "Proměním myšlenku ve skutečný projekt.", "/zapojit-se?intent=idea", "/pansofie-modern/01_better_world_together.png"],
  ["Můžu prozkoumat", "Objevím nová místa, komunity a inspiraci.", "/knihovna", "/pansofie-modern/12_explore.png"],
];

const PILLARS = [
  ["TŘI PILÍŘE", "Pansofie", "Vidět celek. Propojovat.", "/pansofie-modern/07_sustainable_city.png"],
  ["CELEK, VZDĚLÁNÍ, NÁPRAVA", "Pampaedia", "Učit se celý život.", "/pansofie-modern/09_learning.png"],
  ["MOUDRÁ ZMĚNA", "Panorthosia", "Jednat moudře.", "/pansofie-modern/15_sustainable_living.png"],
];

const GROWTH = ["Já & zdraví", "Poznání & myšlení", "Vztahy & spolupráce", "Tvorba & řešení problémů", "Samostatnost & podnikavost", "Občanství & přínos", "Příroda & udržitelnost"];

function ModernHeader() {
  return (
    <header className="modern-header">
      <Link to="/" className="modern-brand" aria-label="Pansofie – domů">
        <strong>PANSOFIE</strong>
        <small>LIDÉ · VĚDĚNÍ · KONTEXT · ZMĚNA</small>
      </Link>
      <nav className="modern-nav" aria-label="Hlavní navigace">
        <Link to="/">Domů</Link><Link to="/o-projektu">O Pansofii</Link><Link to="/zapojit-se">Akce</Link><Link to="/pro-koho">Komunita</Link><Link to="/knihovna">Zdroje</Link><Link to="/materialovy-most">Kompost</Link><Link to="/kontakt">Kontakt</Link>
      </nav>
      <div className="modern-header-actions">
        <LanguageToggle compact />
        <Search size={20} aria-hidden="true" />
        <Link className="modern-login" to="/login">Přihlásit se</Link>
        <Link className="modern-join" to="/zapojit-se">Připojit se</Link>
      </div>
    </header>
  );
}

function ModernFooter() {
  return (
    <footer className="modern-footer">
      <div className="modern-principles">
        <div><strong>VŠEM</strong><span>Poznání a příležitosti mají být srozumitelné a dostupné bez zbytečných bariér.</span></div>
        <div><strong>VŠEMU</strong><span>Technologie a vědění mají sloužit lidem, přírodě, kultuře i běžnému životu — ne jen byznysu.</span></div>
        <div><strong>VŠESTRANNĚ</strong><span>Rozum, vztahy, praktická dovednost a odpovědnost patří k sobě.</span></div>
      </div>
      <div className="modern-footer-main">
        <div className="modern-footer-brand"><h3>◯ Pansofie</h3><p>Poznávat v souvislostech. Růst celý život. Zlepšovat svět kolem sebe.</p><Link to="/zapojit-se">Najít svůj vstup →</Link></div>
        <div><h4>Objevovat</h4><Link to="/jak-funguje">Jak to funguje</Link><Link to="/pro-koho">Pro koho</Link><Link to="/knihovna">Knihovna</Link><Link to="/o-projektu">Vize</Link></div>
        <div><h4>Koloběh</h4><Link to="/materialovy-most">Digitální kompost</Link><Link to="/materialovy-most">Mapa koloběhu</Link><Link to="/pro-koho/skoly">Školy & organizace</Link><Link to="/partneri">Lidé & mentoring</Link></div>
        <div><h4>Pansofie dnes</h4><Link to="/pro-koho/pansofia">Pansofia · Vševěda</Link><Link to="/pro-koho/pampaedia">Pampaedia · Vševýchova</Link><Link to="/pro-koho/panorthosia">Panorthosia · Všenáprava</Link><a href="#rozvoj">Co se může rozvíjet</a><Link to="/young">Pansofie Young</Link></div>
      </div>
      <div className="modern-footer-thread"><span>Rozhlédnout se</span><i/><span>Propojit se</span><i/><span>Udělat malý krok</span><i/><span>Poslat hodnotu dál</span><i/><span>Další možnost</span></div>
      <div className="modern-footer-bottom"><span>Prototyp překládající Pansofii, Pampaedii a Panorthosii do jednoduché současné komunitní zkušenosti.</span><span>© 2026 Pansofie · Příležitost, ne povinnost.</span></div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="modern-home">
      <ModernHeader />
      <main>
        <section className="modern-hero" aria-labelledby="modern-hero-title">
          <div className="modern-copy">
            <span className="modern-eyebrow">LEPŠÍ SOUVISLOSTI<br/>PRO REÁLNÝ SVĚT</span>
            <h1 id="modern-hero-title">Lepší svět<br/>začíná tady.<br/>Společně.</h1>
            <p>Propojujeme lidi, znalosti a konkrétní činy pro živoucí, moudrou a udržitelnou budoucnost. Pansofie propojuje učení se skutečnou zkušeností.</p>
            <div className="modern-cta-row">
              <Link to="/zapojit-se" className="modern-primary">Připojit se <ArrowRight size={17}/></Link>
              <Link to="/o-projektu" className="modern-secondary">Objevit Pansofii <ArrowRight size={17}/></Link>
            </div>
            <div className="modern-simulator-entry">
              <Link to="/zapojit-se?mode=simulator">Vyzkoušet Pansofii za 60 sekund</Link>
              <small>Interaktivní ukázka nic neodesílá ani neukládá na server.</small>
            </div>
            <div className="modern-impact"><Leaf size={27}/><span>MALÉ KROKY<br/>VELKÝ DOPAD</span></div>
          </div>

          <div className="modern-photo">
            <img src="/pansofie-modern/hero-city-nature-people.png" alt="Lidé, příroda a město propojené v moderní Pansofii." />
          </div>

          <aside className="modern-rail" aria-label="Život v souvislostech">
            <div><h2>ŽIVOT<br/>V SOUVISLOSTECH</h2><div className="modern-rule"/><p>Pansofie je otevřená platforma pro všechny, kdo chtějí rozumět světu a aktivně ho zlepšovat.</p></div>
            <div className="modern-venn" aria-hidden="true"><span className="modern-circle a"/><span className="modern-circle b"/><span className="modern-circle c"/><span className="modern-venn-leaf">◒</span></div>
            <div className="modern-rail-list"><span>LIDÉ</span><span>PŘÍRODA</span><span>MĚSTA</span><span>VĚDĚNÍ</span><span>MOŽNOSTI</span></div>
          </aside>
        </section>

        <section className="modern-sections">
          <h2 className="modern-section-title">Co byste dnes chtěli dát do pohybu?</h2>
          <p className="modern-section-lead">Vyberte si směr, který vás dnes volá. Bez závazků. Podle vás.</p>
          <div className="modern-actions">{ACTIONS.map(([title,text,to,image],i)=><Link className="modern-action-card" to={to} key={title}><img src={image} alt="" loading="lazy" /><span className="modern-card-icon">{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div><b>→</b></Link>)}</div>

          <div className="modern-pillar-header"><span>TŘI PILÍŘE</span><p>CELEK, VZDĚLÁNÍ, NÁPRAVA</p></div>
          <div className="modern-pillars">{PILLARS.map(([kicker,title,text,image])=><article className="modern-pillar" key={title}><img src={image} alt="" loading="lazy" /><span className="modern-card-icon">{title === "Pansofie" ? "♧" : title === "Pampaedia" ? "□" : "◒"}</span><strong>{kicker}</strong><h3>{title}</h3><p>{text}</p><b>→</b></article>)}</div>
          <blockquote className="modern-quote">„Moudřejší společnost nevzniká náhodou.<br/>Vzniká lidmi, kteří se spojí.“<span>PANSOFIE</span></blockquote>

          <div id="rozvoj" className="modern-growth"><h3>Co se může cestou rozvíjet</h3><p>Nejsou to body, známky ani žebříček člověka. Jsou to oblasti, kterých se dobrovolná zkušenost může přirozeně dotknout.</p><div className="modern-chips">{GROWTH.map(x=><span className="modern-chip" key={x}>{x}</span>)}</div></div>
          <div className="modern-notice"><strong>Pansofie nic nepřikazuje.</strong><br/><span style={{fontFamily:"Source Sans 3, sans-serif",fontSize:14}}>Ukazuje možnosti. Můžete se jen rozhlédnout, nechat se inspirovat — a zapojit se teprve ve chvíli, kdy sami budete chtít.</span></div>
          <div className="modern-notice" aria-label="Důvěra a dopad"><strong>Dokončená aktivita ještě není důkaz skutečného dopadu.</strong><br/><span style={{fontFamily:"Source Sans 3, sans-serif",fontSize:14}}>Pansofie nehodnotí hodnotu člověka. Rozlišuje mezi tím, co člověk udělal, co vzniklo a co se skutečně změnilo.</span></div>
        </section>

        <div className="modern-safety-sections">
          <ExperienceStory />
          <RoleEntry />
          <PublicMaturity />
        </div>
      </main>
      <ModernFooter />
    </div>
  );
}
