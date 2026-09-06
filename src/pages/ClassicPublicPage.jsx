import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HeartHandshake, Leaf, Lightbulb, Recycle, Search, Sprout, Users } from "lucide-react";

const ACTIONS = [
  { icon: HeartHandshake, title: "Můžu někomu pomoct", text: "Najdu příležitosti, kde mohu být užitečný.", to: "/zapojit-se?intent=help", tone: "help" },
  { icon: Sprout, title: "Chci něco změnit", text: "Objevím nápady a projekty, které dávají smysl.", to: "/zapojit-se?intent=change", tone: "change" },
  { icon: Recycle, title: "Mám něco navíc", text: "Sdílím věci a materiál, které mohou ještě někomu posloužit.", to: "/materialovy-most", tone: "surplus" },
  { icon: Lightbulb, title: "Mám nápad", text: "Přidám myšlenku nebo projekt, který může inspirovat ostatní.", to: "/zapojit-se?intent=idea", tone: "idea" },
  { icon: Search, title: "Jen se chci rozhlédnout", text: "Prozkoumám, co se děje kolem mě. Bez závazku.", to: "/knihovna", tone: "explore" },
];

const PILLARS = [
  { no: "1.", title: "Vševěda", latin: "Pansofia", icon: Leaf, text: "Rozumět sobě, lidem a světu kolem nás.", points: ["Objevovat", "Rozumět souvislostem", "Propojovat"] },
  { no: "2.", title: "Vševýchova", latin: "Pampaedia", icon: BookOpen, text: "Růst celý život — a jeden od druhého.", points: ["Sdílet znalosti", "Rozvíjet se", "Učit se navzájem"] },
  { no: "3.", title: "Všenáprava", latin: "Panorthosia", icon: Sprout, text: "Když něco může být lepší, můžeme s tím něco udělat.", points: ["Pomáhat", "Tvořit změnu", "Pečovat o svět"] },
];

const GROWTH = ["Já & zdraví", "Poznání & myšlení", "Vztahy & spolupráce", "Tvorba & řešení problémů", "Samostatnost & podnikavost", "Občanství & přínos", "Příroda & udržitelnost"];

const LIBRARY = [
  ["PODNĚT", "Jak oživit prázdný kout v sousedství?", "Jednoduché otázky, které pomohou z nápadu udělat první malý krok."],
  ["NÁVOD", "Jak předat věc dál bez zbytečného odpadu", "Krátký průvodce: popis, lokalita, domluva a jednoduché předání."],
  ["INSPIRACE", "Mezigenerační hodina dovedností", "Nápad na setkání, kde každý přinese jednu dovednost, kterou umí předat."],
  ["CIRKULARITA", "Materiál jako začátek projektu", "Jak se z přebytku firmy může stát materiál pro školu, dílnu nebo komunitu."],
  ["PODNĚT", "Co může změnit deset minut času?", "Malé formy pomoci, které nemusí začínat velkým závazkem."],
  ["NÁVOD", "Jak pozvat další lidi k nápadu", "Mluvte o možnosti, ne o povinnosti. Ukažte, co je potřeba a co může vzniknout."],
];

function ClassicTree() {
  return (
    <svg className="young-illustrated-tree" viewBox="0 0 520 500" role="img" aria-label="Kreslený strom Pansofie s lidmi, knihami a přírodou">
      <defs>
        <radialGradient id="classicLeafA" cx="40%" cy="35%"><stop offset="0" stopColor="#dfe9a7"/><stop offset="1" stopColor="#78934f"/></radialGradient>
        <radialGradient id="classicLeafB" cx="40%" cy="35%"><stop offset="0" stopColor="#f1e7a1"/><stop offset="1" stopColor="#93a65e"/></radialGradient>
        <linearGradient id="classicTrunk" x1="0" x2="1"><stop stopColor="#9b6e3d"/><stop offset=".5" stopColor="#c08a4c"/><stop offset="1" stopColor="#7a512f"/></linearGradient>
      </defs>
      <ellipse cx="260" cy="455" rx="205" ry="24" fill="#dfe5c9" opacity=".75"/>
      <path d="M248 448c4-75 3-140-12-201-8-34-5-69 12-98 8 20 17 42 18 64 12-34 32-64 58-88-14 37-24 75-22 111 29-24 60-39 98-48-35 23-67 50-90 84-11 16-18 35-17 56 2 41 8 80 13 120z" fill="url(#classicTrunk)"/>
      <path d="M258 324c-42-41-78-72-126-95M286 300c39-46 78-77 129-98M267 248c-20-45-37-75-69-105M288 256c11-48 30-85 68-120" fill="none" stroke="#8b6036" strokeWidth="17" strokeLinecap="round"/>
      {[[130,190,70,"A"],[205,130,85,"B"],[302,123,92,"A"],[390,180,78,"B"],[92,260,60,"B"],[176,242,72,"A"],[352,250,75,"A"],[430,263,57,"B"],[250,78,66,"A"]].map(([x,y,r,t],i)=><circle key={i} cx={x} cy={y} r={r} fill={`url(#classicLeaf${t})`} opacity=".96"/>)}
      {[...Array(34)].map((_,i)=>{const a=i*2.399; const rr=65+(i%6)*25; const x=260+Math.cos(a)*rr; const y=190+Math.sin(a)*rr*.62; return <circle key={i} cx={x} cy={y} r={5+(i%3)} fill={i%4===0?"#e8b86b":"#f7f1ca"} opacity=".9"/>})}
      <g transform="translate(128 330)"><circle cx="25" cy="16" r="14" fill="#d3a073"/><path d="M13 35q15-14 31 0l8 55H5z" fill="#617957"/><path d="M0 92h58" stroke="#6a4d35" strokeWidth="7" strokeLinecap="round"/><rect x="12" y="54" width="33" height="24" rx="4" fill="#efe3b4" stroke="#9a7043"/></g>
      <g transform="translate(345 324)"><circle cx="25" cy="16" r="14" fill="#bf825d"/><path d="M9 36q16-13 32 0l10 54H3z" fill="#d39056"/><circle cx="53" cy="75" r="17" fill="#c6d79c"/><path d="M53 75l14-18" stroke="#4f733e" strokeWidth="3"/></g>
      <g transform="translate(215 390)"><circle cx="18" cy="13" r="11" fill="#d4a27a"/><path d="M7 29q12-10 25 0l7 38H2z" fill="#8a6b52"/><circle cx="69" cy="13" r="11" fill="#b97e5e"/><path d="M57 29q12-10 25 0l7 38H52z" fill="#6f8358"/></g>
      <g fill="none" stroke="#456a3f" strokeWidth="3" strokeLinecap="round"><path d="M80 412q-12-27 8-43M438 418q15-30-5-51M105 426q2-26 23-39"/></g>
      <g fill="#86a65c"><ellipse cx="86" cy="379" rx="9" ry="17" transform="rotate(-35 86 379)"/><ellipse cx="432" cy="373" rx="10" ry="18" transform="rotate(32 432 373)"/><ellipse cx="121" cy="392" rx="10" ry="18" transform="rotate(34 121 392)"/></g>
      <g transform="translate(190 170) rotate(-8)"><rect width="43" height="31" rx="3" fill="#f4e7bd" stroke="#8a6543"/><path d="M21 3v25" stroke="#b59467" strokeWidth="2"/></g>
      <g transform="translate(330 176) rotate(9)"><circle cx="20" cy="20" r="19" fill="#d8e1bd" stroke="#647b4e"/><path d="M8 22q12-20 25-5M12 27q11-12 22-6" fill="none" stroke="#527044" strokeWidth="2"/></g>
    </svg>
  );
}

function Header() {
  return <header className="young-classic-header"><Link to="/" className="young-classic-brand"><span className="young-mark"><Leaf size={18}/></span><span><strong>Pansofie</strong><small>Živý prostor, kde se hodnota vrací do oběhu.</small></span></Link><nav><Link to="/jak-funguje">Jak to funguje</Link><Link to="/pro-koho">Pro koho</Link><Link to="/materialovy-most">Koloběh</Link><Link to="/knihovna">Knihovna</Link><Link to="/o-projektu">Vize</Link></nav><div className="young-classic-actions"><Link to="/young">Pansofie Young</Link><Link className="young-join" to="/zapojit-se">Přidejte se</Link></div></header>;
}

function Footer(){return <footer className="young-classic-footer"><div className="young-footer-principles"><p><b>VŠEM</b><span>Poznání a příležitosti mají být srozumitelné a dostupné bez zbytečných bariér.</span></p><p><b>VŠEMU</b><span>Technologie a vědění mají sloužit lidem, přírodě, kultuře i běžnému životu — ne jen byznysu.</span></p><p><b>VŠESTRANNĚ</b><span>Rozum, vztahy, praktická dovednost a odpovědnost patří k sobě.</span></p></div><div className="young-footer-grid"><div><h3>Pansofie</h3><p>Poznávat v souvislostech. Růst celý život. Zlepšovat svět kolem sebe.</p><Link to="/zapojit-se">Najít svůj vstup →</Link></div><div><b>OBJEVOVAT</b><Link to="/jak-funguje">Jak to funguje</Link><Link to="/pro-koho">Pro koho</Link><Link to="/knihovna">Knihovna</Link><Link to="/o-projektu">Vize</Link></div><div><b>KOLOBĚH</b><Link to="/materialovy-most">Digitální kompost</Link><Link to="/materialovy-most">Mapa koloběhu</Link><Link to="/pro-koho/skoly">Školy & organizace</Link><Link to="/partneri">Lidé & mentoring</Link></div><div><b>PANSOFIE DNES</b><span>Pansofia · Vševěda</span><span>Pampaedia · Vševýchova</span><span>Panorthosia · Všenáprava</span><a href="#rozvoj">Co se může rozvíjet</a></div></div><div className="young-footer-thread"><span>ROZHLÉDNOUT SE</span><i/><span>PŘIPOJIT SE</span><i/><span>UDĚLAT MALÝ KROK</span><i/><span>POSLAT HODNOTU DÁL</span><i/><span>DALŠÍ MOŽNOST</span></div><div className="young-footer-bottom"><span>Prototyp překládající Pansofii, Pampaedii a Panorthosii do jednoduché současné komunitní zkušenosti.</span><span>© 2026 Pansofie · Příležitost, ne povinnost.</span></div></footer>}

function Shell({ children }) {
  return <div className="young-classic"><Header/><main>{children}</main><Footer/></div>;
}

export function ClassicHome({ eyebrow = "PANSOFIE PRO DNEŠNÍ DOBU", lead = "Propojujeme lidi, znalosti a zdroje, aby se dobro, vědění i materiály mohly šířit, růst a znovu přinášet užitek. Pansofie propojuje učení se skutečnou zkušeností.", primaryClassName = "young-main-cta", simulatorSlot, safetyTitle = "Dokončená aktivita ještě není důkaz skutečného dopadu.", safetyBody = "Pansofie nehodnotí hodnotu člověka. Rozlišuje mezi tím, co člověk udělal, co vzniklo a co se skutečně změnilo.", safetySections }) {
  return <Shell><section className="young-classic-hero"><div className="young-hero-copy"><span>{eyebrow}</span><h1>Pansofie.<br/><em>Místo, kde se<br/>hodnota vrací<br/>zpět.</em></h1><p>{lead}</p><div><Link className={primaryClassName} to="/zapojit-se">Přidejte se k nám <Leaf size={16}/></Link><Link className="young-outline-cta" to="/jak-funguje">Podívejte se, jak to funguje <ArrowRight size={16}/></Link></div>{simulatorSlot}</div><div className="young-tree-stage"><ClassicTree/><span className="young-tree-badge b1">Vševěda<small>Pozorujeme svět v souvislostech.</small></span><span className="young-tree-badge b2">Vševýchova<small>Růst a učit se po celý život.</small></span><span className="young-tree-badge b3">Všenáprava<small>Zlepšovat svět kolem sebe.</small></span></div></section><Actions/><Pillars/><Growth/><section className="young-gentle-note" aria-label="Důvěra a dopad"><ShieldText title={safetyTitle} body={safetyBody} /> </section>{safetySections}</Shell>;
}

export function ClassicHow() {
  return <Shell><SubHero eyebrow="JAK PANSOFIE FUNGUJE" title={<>Pansofie má člověka<br/>dostat k možnosti<br/>něco udělat — <em>ne ho<br/>zaměstnat systémem.</em></>} body="Pansofie nic nepřikazuje. Žádné povinné body, žádné nucené důkazy, žádný rozvojový plán. Vytváří prostředí, kde se člověk může rozhlédnout a sám si říct: „Tady bych mohl přispět.“" tree/><section className="young-panel"><div className="young-three-pillars">{["Rozhlédněte se","Nechte se oslovit","Propojte se","Pošlete hodnotu dál"].map((title,index)=><article key={title}><div><strong>{String(index+1).padStart(2,"0")}</strong><h3>{title}</h3><p>{["Podívejte se, co se děje kolem vás — lidé, nápady, materiály, znalosti a malé místní příležitosti.","Nic nemusíte plnit. Vyberte si jen to, co vám v danou chvíli dává smysl.","Můžete nabídnout pomoc, něco sdílet, přidat se k nápadu nebo si naopak o něco říct.","Když něco proběhne, stačí jednoduché potvrzení. Příběh, fotka nebo poznámka jsou dobrovolné."][index]}</p></div></article>)}</div></section><section className="young-gentle-note"><Sprout size={24}/><p><strong>Reciprocita není dluh.</strong><span>Nemusíte vrátit hodnotu tomu samému člověku ani hned. Smyslem je, aby pomoc, znalosti a zdroje mohly v komunitě dál obíhat.</span></p></section></Shell>;
}

export function ClassicLibrary() {
  return <Shell><SubHero eyebrow="KNIHOVNA PANSOFIE" title={<>Místo, kde se dobré<br/>nápady <em>neztrácejí.</em></>} body="Návody, podněty, příklady a zkušenosti, které mohou někomu dalšímu otevřít cestu. Ne povinné úkoly — věci, které si můžete vzít, upravit nebo jen přečíst." explore/><section className="young-panel"><div className="young-growth-chips" style={{marginBottom:22}}><b>Vše</b><b>Nápady</b><b>Návody</b><b>Komunita</b><b>Koloběh</b></div><div className="young-five-actions" style={{gridTemplateColumns:"repeat(3,1fr)"}}>{LIBRARY.map(([kind,title,text],index)=><Link key={title} to="/knihovna" className="young-action explore"><span className="young-action-art">{index % 2 ? <BookOpen size={42}/> : <Lightbulb size={42}/>}</span><small>{kind}</small><h3>{title}</h3><p>{text}</p><b><ArrowRight size={17}/></b></Link>)}</div></section><section className="young-gentle-note"><Users size={24}/><p><strong>Máte něco, co by mohlo pomoct ostatním?</strong><span>Knihovna má časem růst z toho, co lidé sami chtějí poslat dál — nápady, postupy, zkušenosti i malé projekty.</span></p><Link className="young-main-cta" to="/zapojit-se">Jak se zapojit <ArrowRight size={16}/></Link></section></Shell>;
}

export function ClassicVision() {
  return <Shell><SubHero eyebrow="VIZE PANSOFIE" title={<>Staré pilíře. <em>Současný<br/>život.</em></>} body="Pansofie nechce Komenského myšlenky vystavit jako historii. Chce je znovu překládat do situací, které lidé opravdu žijí dnes." tree/><section className="young-panel young-pillars-panel"><div className="young-three-pillars" style={{gridTemplateColumns:"1fr"}}>{PILLARS.map(({no,title,latin,icon:Icon,text},index)=><article key={title}><div className="young-pillar-art"><Icon size={70}/></div><div><strong>{no} · {latin.toUpperCase()}</strong><h3>{title}</h3><em>{text}</em><p>{["Dnes to znamená umět spojovat informace, vlastní zkušenost, technologie, přírodu a život kolem nás. Neučit se izolované odpovědi, ale hledat, jak věci souvisejí.","Učení nekončí školou a neprobíhá jen jedním směrem. Dítě může něco předat seniorovi, senior dítěti, firma škole a soused sousedovi.","Poznání má smysl, když může vést k dobrému činu. Někdy je to opravená věc, pomoc člověku, znovu použitý materiál nebo malá změna v okolí."][index]}</p></div></article>)}</div></section></Shell>;
}

function SubHero({ eyebrow, title, body, tree, explore }) {
  return <section className="young-classic-hero"><div className="young-hero-copy"><span>{eyebrow}</span><h1>{title}</h1><p>{body}</p></div><div className="young-tree-stage">{tree ? <ClassicTree/> : <Search size={170}/>} {explore && <Search size={170}/>} </div></section>;
}

function Actions(){return <section id="jak" className="young-panel young-actions-panel"><h2>Co byste dnes chtěli dát do pohybu?</h2><p>Vyberte si směr, který vás dnes volá. Bez závazků. Podle vás.</p><div className="young-five-actions">{ACTIONS.map(({icon:Icon,title,text,to,tone})=><Link key={title} to={to} className={`young-action ${tone}`}><span className="young-action-art"><Icon size={46}/></span><h3>{title}</h3><p>{text}</p><b><ArrowRight size={17}/></b></Link>)}</div></section>}

function Pillars(){return <section id="pro-koho" className="young-panel young-pillars-panel"><h2>Tři pilíře Pansofie</h2><p>Komenského myšlenky přeložené do dnešního života.</p><div className="young-three-pillars">{PILLARS.map(({no,title,latin,icon:Icon,text,points})=><article key={title}><div className="young-pillar-art"><Icon size={58}/></div><div><strong>{no}</strong><h3>{title}</h3><em>{latin}</em><p>{text}</p><ul>{points.map(x=><li key={x}>{x}</li>)}</ul><Link to="/o-projektu">Zjistit více <ArrowRight size={14}/></Link></div></article>)}</div></section>}

function Growth(){return <><section id="rozvoj" className="young-growth-panel"><span>ROZVOJ BEZ HODNOCENÍ</span><div><h2>Co se může cestou rozvíjet</h2><p>Nejsou to body, známky ani žebříček člověka. Jsou to oblasti, kterých se dobrovolná zkušenost může přirozeně dotknout.</p><div className="young-growth-chips">{GROWTH.map(x=><b key={x}>{x}</b>)}</div></div></section><section className="young-gentle-note"><Sprout size={24}/><p><strong>Pansofie nic nepřikazuje.</strong><span>Ukazuje možnosti. Můžete se jen rozhlédnout, nechat se inspirovat — a zapojit se teprve ve chvíli, kdy sami budete chtít.</span></p></section></>}

function ShieldText({ title, body }){return <><Sprout size={24}/><p><strong>{title}</strong><span>{body}</span></p></>}

export default ClassicHome;
