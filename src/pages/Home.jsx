import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Search } from "lucide-react";
import ExperienceStory from "@/components/pansofie/ExperienceStory";
import RoleEntry from "@/components/pansofie/RoleEntry";
import PublicMaturity from "@/components/pansofie/PublicMaturity";
import LanguageToggle from "@/components/pansofie/LanguageToggle";
import "@/pansofie-modern.css";

const ACTIONS = [
  ["Můžu někomu pomoct", "Najdu příležitosti, kde mohu být užitečný.", "/zapojit-se?intent=help"],
  ["Chci něco změnit", "Objevím nápady a projekty, které dávají smysl.", "/zapojit-se?intent=change"],
  ["Mám něco navíc", "Sdílím věci a materiál, které mohou ještě posloužit.", "/materialovy-most"],
  ["Mám nápad", "Přidám myšlenku nebo projekt, který může inspirovat ostatní.", "/zapojit-se?intent=idea"],
  ["Jen se chci rozhlédnout", "Prozkoumám, co se děje kolem mě. Bez závazku.", "/knihovna"],
];

const PILLARS = [
  ["01 · PANSOFIA", "Vševěda", "Pansofia", "Rozumět sobě, lidem a světu kolem nás. Objevovat, rozumět souvislostem a propojovat."],
  ["02 · PAMPAEDIA", "Vševýchova", "Pampaedia", "Růst celý život — a jeden od druhého. Sdílet znalosti, rozvíjet se a učit se navzájem."],
  ["03 · PANORTHOSIA", "Všenáprava", "Panorthosia", "Když něco může být lepší, můžeme s tím něco udělat. Pomáhat, tvořit změnu a pečovat o svět."],
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
            <img src="https://images.unsplash.com/photo-1779805329201-70a9132ba96e?auto=format&fit=crop&fm=jpg&q=82&w=2400" alt="Lidé odpočívají a setkávají se v zeleném městském prostoru se siluetou města v pozadí." />
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
          <div className="modern-actions">{ACTIONS.map(([title,text,to],i)=><Link className="modern-action-card" to={to} key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p><b>→</b></Link>)}</div>

          <h2 className="modern-section-title" style={{marginTop:72}}>Tři pilíře Pansofie</h2>
          <p className="modern-section-lead">Komenského myšlenky přeložené do dnešního života.</p>
          <div className="modern-pillars">{PILLARS.map(([n,title,latin,text])=><article className="modern-pillar" key={title}><strong>{n}</strong><h3>{title}</h3><em>{latin}</em><p>{text}</p></article>)}</div>

          <div id="rozvoj" className="modern-growth"><h3>Co se může cestou rozvíjet</h3><p>Nejsou to body, známky ani žebříček člověka. Jsou to oblasti, kterých se dobrovolná zkušenost může přirozeně dotknout.</p><div className="modern-chips">{GROWTH.map(x=><span className="modern-chip" key={x}>{x}</span>)}</div></div>
          <div className="modern-notice"><strong>Pansofie nic nepřikazuje.</strong><br/><span style={{fontFamily:"Source Sans 3, sans-serif",fontSize:14}}>Ukazuje možnosti. Můžete se jen rozhlédnout, nechat se inspirovat — a zapojit se teprve ve chvíli, kdy sami budete chtít.</span></div>
          <div className="modern-notice" aria-label="Důvěra a dopad"><strong>Dokončená aktivita ještě není důkaz skutečného dopadu.</strong><br/><span style={{fontFamily:"Source Sans 3, sans-serif",fontSize:14}}>Pansofie nehodnotí hodnotu člověka. Rozlišuje mezi tím, co člověk udělal, co vzniklo a co se skutečně změnilo.</span></div>
        </section>

        <ExperienceStory />
        <RoleEntry />
        <PublicMaturity />
      </main>
      <ModernFooter />
    </div>
  );
}
