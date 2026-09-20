import Image from "next/image";
import Link from "next/link";
import { DOMAINS, MISSIONS, PROJECTS } from "../../domain/pansofie-content";
import { GROW_ROUTE_ID } from "../../domain/mission-presentation";

const topics = [
  ["AI a technologie", "Příležitosti, rizika a jak je využít smysluplně.", "/assets/brand/young/photos/creative-studio-16x9.webp"],
  ["Identita a vztahy", "Kdo jsem, kam patřím a jak stavět zdravé vztahy.", "/assets/brand/young/photos/community-cutout.png"],
  ["Společnost a svět", "Co se děje kolem nás a jak to spolu souvisí.", "/assets/brand/young/photos/hero-rooftop-left-safe-16x9.webp"],
  ["Smysl a budoucnost", "Kam směřujeme a jaký svět chceme tvořit.", "/assets/brand/young/photos/explorers-nature-16x9.webp"],
];

function YoungNav(){
  return <header className="y2-nav"><Link className="y2-logo" href="/young"><b>YOUNG</b><span>PANSOFIE</span></Link><nav><Link href="/young">Domů</Link><Link href="/young/objevuj">Témata</Link><Link href="/young/mise">Mise</Link><Link href="/young/projekty">Projekty</Link><Link href="/young/komunita">Komunita</Link></nav><div className="y2-actions"><Link className="y2-join" href="/login">Přihlásit se</Link><details className="y2-menu"><summary>Menu</summary><nav><Link href="/young">Domů</Link><Link href="/young/objevuj">Témata</Link><Link href="/young/mise">Mise</Link><Link href="/young/projekty">Projekty</Link><Link href="/young/komunita">Komunita</Link><Link href="/young/jak-to-funguje">Jak to funguje</Link><Link href="/login">Přihlásit se</Link></nav></details></div></header>;
}

function YoungFooter(){
  return <footer className="y2-footer"><div><b>YOUNG PANSOFIE</b><span>Zvídavé myšlení pro smysluplnější svět.</span></div><nav><Link href="/">Pansofie</Link><Link href="/bezpecnost">Bezpečnost</Link><Link href="/pro-skoly">Pro školy</Link><Link href="/kontakt">Kontakt</Link></nav></footer>;
}
function YoungHome(){
  return <>
    <section className="y2-hero"><div className="y2-hero-copy"><p>VÍCE NEŽ ODPOVĚDI. SOUVISLOSTI.</p><h1>Chápej svět ve <span>větších</span> souvislostech.</h1><p>Pro mladé lidi, kteří se ptají, chtějí rozumět, hledají svůj názor a chtějí něco skutečně zkusit.</p><div><Link className="y2-primary" href="/young/objevuj">Objevuj témata</Link><Link className="y2-secondary" href="/young/mise">Zkus první misi</Link></div><div className="y2-values"><span>👥 Bezpečné kontexty</span><span>💡 Nové pohledy</span><span>🚀 Skutečné projekty</span><span>🌱 Větší souvislosti</span></div></div><figure><Image src="/assets/brand/young/photos/hero-rooftop-left-safe-16x9.webp" alt="Mladí lidé společně tvoří a diskutují" fill priority sizes="(max-width: 760px) 100vw, 55vw"/></figure></section>
    <section className="y2-section"><header><div><h2>Co tu řešíme?</h2><p>Velké otázky skutečného života.</p></div><Link href="/young/objevuj">Všechna témata →</Link></header><div className="y2-topic-grid">{topics.map(([title,text,image])=><Link href="/young/objevuj" key={title}><Image src={image} alt="" width={540} height={304}/><span>Téma</span><h3>{title}</h3><p>{text}</p><b>→</b></Link>)}</div></section>
    <section className="y2-community-cta"><Image src="/assets/brand/young/photos/community-cutout.png" alt="Mladí lidé v komunitním prostředí" width={520} height={520}/><div><h2>Young není veřejný katalog lidí.</h2><p>Komunita se má stavět kolem témat, týmů, školy, rodiny a ověřených projektů. U mladších bez přímého kontaktu s neznámými dospělými.</p><Link href="/young/jak-to-funguje">Jak to funguje →</Link></div><div className="y2-community-icons"><span>🔒 Soukromí</span><span>🏫 Škola</span><span>👨‍👩‍👧 Rodina</span><span>🌱 Projekt</span></div></section>
  </>;
}

function YoungExplore(){
  return <main className="y2-subpage"><header><p>OBJEVUJ</p><h1>Témata, která stojí za to řešit.</h1><p>Ne podle předmětů. Podle života a otázek, které se navzájem propojují.</p></header><div className="y2-domain-cloud">{DOMAINS.map(domain=><span key={domain}>{domain}</span>)}</div><div className="y2-topic-grid">{topics.map(([title,text,image])=><article key={title}><Image src={image} alt="" width={540} height={304}/><span>Téma</span><h3>{title}</h3><p>{text}</p></article>)}</div></main>;
}
function YoungMissions(){
  return <main className="y2-subpage"><header><p>MISE</p><h1>Zkus něco doopravdy.</h1><p>Krátké výzvy propojují poznání s konkrétní akcí. XP je herní postup, ne hodnocení člověka.</p></header><div className="y2-mission-grid">{MISSIONS.slice(0,6).map(mission=><article key={mission.id}><Image src={mission.image} alt="" width={540} height={320}/><small>{mission.program}{mission.id===GROW_ROUTE_ID?" · FUNKČNÍ":" · KONCEPT"}</small><h2>{mission.title}</h2><p>{mission.detail}</p>{mission.id===GROW_ROUTE_ID?<Link className="y2-mission-link" href="/mise/rostlina">Otevřít první misi →</Link>:<p><strong>Akční flow této mise ještě není publikovaný.</strong></p>}</article>)}</div></main>;
}

function YoungProjects(){
  return <main className="y2-subpage"><header><p>PROJEKTY</p><h1>Nápad je začátek. Projekt je krok dál.</h1><p>Veřejně ukazujeme modely projektů. Skutečná účast pokračuje přes přihlášené a bezpečné kontexty.</p></header><div className="y2-project-grid">{PROJECTS.slice(0,6).map(project=><article key={project.title}><Image src={project.image} alt="" width={540} height={304}/><span>{project.tag}</span><h2>{project.title}</h2><p>{project.description}</p><small>{project.status}</small></article>)}</div></main>;
}

function YoungCommunity(){
  return <main className="y2-subpage"><header><p>KOMUNITA</p><h1>Spolupracuj, ale ne naslepo.</h1><p>Komunitní vrstva stojí na ověřených kontextech a projektech. Není to veřejné hledání mladých lidí v okolí.</p></header><div className="y2-community-board"><article><h2>Rodina a tým</h2><p>Společný kontext bez sdíleného účtu.</p></article><article><h2>Škola</h2><p>Třída, učitel a projekt s jasnými rolemi.</p></article><article><h2>Ověřený projekt</h2><p>Spolupráce kolem konkrétního cíle, ne kolem náhodného kontaktu.</p></article></div><aside className="y2-safety"><div><h2>Bezpečnost mění funkce.</h2><p>Věk, role a oprávnění určují, co je dostupné. Přesná poloha dítěte a otevřené zprávy s neznámými dospělými do veřejného Young nepatří.</p></div></aside></main>;
}
function YoungHow(){
  const steps = ["Objevuj", "Zkoušej", "Tvoř", "Spolupracuj", "Reflektuj"];
  return <main className="y2-subpage"><header><p>JAK TO FUNGUJE</p><h1>Od otázky ke zkušenosti.</h1><p>Young je mladší veřejná zkušenost nad stejným corem. Akční mise, evidence a portfolio pokračují v přihlášených vrstvách Young a GO.</p></header><div className="y2-how-grid">{steps.map((title,index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h2>{title}</h2><p>{["Ptej se a hledej souvislosti.","Ověř si nápad v malém.","Proměň otázku v konkrétní výstup.","Sdílej v bezpečném kontextu.","Zachyť, co ses naučil a co dál."][index]}</p></article>)}</div><aside className="y2-safety"><div><h2>Young není zmenšená dospělá aplikace.</h2><p>Prezentace se přizpůsobuje věku, ale identita, oprávnění a bezpečnost zůstávají společným základem produktu.</p></div></aside></main>;
}

export function YoungPublicExperience({ view="home" }){
  const content = view === "objevuj" ? <YoungExplore/> : view === "mise" ? <YoungMissions/> : view === "projekty" ? <YoungProjects/> : view === "komunita" ? <YoungCommunity/> : view === "jak" ? <YoungHow/> : <YoungHome/>;
  return <div className="y2-world"><a className="skip-link" href="#young-main">Přejít na obsah</a><YoungNav/><div id="young-main">{content}</div><YoungFooter/></div>;
}

export default YoungPublicExperience;
