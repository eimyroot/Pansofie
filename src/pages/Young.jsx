import React from "react";
import { ArrowRight, Compass, FlaskConical, HandHeart, Palette, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ART } from "../lib/artkit";
import { useLanguage } from "../state/LanguageContext";

const BRANCHES = {
  cs: [
    ["9–12 let", "První výpravy", "Krátké mise s dospělým, školou nebo skupinou."],
    ["13–15 let", "Vlastní nápady", "Bezpečné experimenty, týmová tvorba a péče o okolí."],
    ["16–18 let", "Skutečné projekty", "Mentoring přes ověřenou organizaci a větší samostatnost."],
  ],
  en: [
    ["Ages 9–12", "First quests", "Short missions with a trusted adult, school or group."],
    ["Ages 13–15", "Own ideas", "Safe experiments, team creativity and care for your surroundings."],
    ["Ages 16–18", "Real projects", "Mentoring through a verified organisation and more independence."],
  ],
};

export default function Young() {
  const { isEnglish } = useLanguage();
  const branches = BRANCHES[isEnglish ? "en" : "cs"];
  return <div className="young-world">
    <nav className="young-nav" aria-label={isEnglish ? "Pansofie Young navigation" : "Navigace Pansofie Young"}>
      <Link to="/young" className="young-logo">PANSOFIE <span>YOUNG</span></Link>
      <div><a href="#principles">{isEnglish ? "How it works" : "Jak to funguje"}</a><a href="#branches">{isEnglish ? "Branches" : "Větve"}</a><Link to="/young/mise">{isEnglish ? "Missions" : "Mise"}</Link><a href="#safety">{isEnglish ? "Safety" : "Bezpečí"}</a></div>
      <Link to="/" className="young-exit">{isEnglish ? "Main Pansofie ↗" : "Hlavní Pansofie ↗"}</Link>
    </nav>

    <section className="young-hero">
      <div className="young-hero__copy"><p className="young-kicker">PANSOFIE YOUNG</p><h1>{isEnglish ? "Your curiosity can grow in every direction." : "Tvoje zvědavost může růst všemi směry."}</h1><p>{isEnglish ? "Discover what interests you. Try small missions, create with others and help change the world around you. You do not have to prove anything." : "Objevuj, co tě zajímá. Zkoušej malé mise, tvoř s ostatními a pomáhej měnit svět kolem sebe. Nemusíš nic dokazovat."}</p><div className="young-actions"><Link className="p-btn p-btn--green" to="/young/mise">{isEnglish ? "Choose a mission" : "Vybrat si misi"}<ArrowRight size={16}/></Link><a className="p-btn p-btn--outline" href="#branches">{isEnglish ? "Explore branches" : "Prozkoumat větve"}</a></div></div>
      <img src={ART.heroTree} alt={isEnglish ? "Watercolour tree with many paths" : "Akvarelový strom s mnoha cestami"}/>
    </section>

    <section id="principles" className="young-principles" aria-labelledby="young-principles-title">
      <div><p className="young-kicker">{isEnglish ? "YOUR WAY" : "TVOJE CESTA"}</p><h2 id="young-principles-title">{isEnglish ? "Four ways to start" : "Čtyři způsoby, jak začít"}</h2></div>
      {[[Compass,"Objevuj","Discover"],[FlaskConical,"Zkoušej","Try"],[Palette,"Tvoř","Create"],[HandHeart,"Pomáhej měnit svět kolem sebe","Help change the world around you"]].map(([Icon,cs,en])=><article key={cs}><Icon aria-hidden="true"/><h3>{isEnglish?en:cs}</h3><p>{isEnglish ? "A possibility, never a test of your worth." : "Možnost, nikdy zkouška tvojí hodnoty."}</p></article>)}
    </section>

    <section id="branches" className="young-branches"><div className="young-section-head"><p className="young-kicker">{isEnglish ? "AGE BRANCHES" : "VĚKOVÉ VĚTVE"}</p><h2>{isEnglish ? "The tree grows with you" : "Strom roste s tebou"}</h2><p>{isEnglish ? "Age helps us suggest a safe level of independence. It never limits what you may be interested in." : "Věk nám pomáhá nabídnout bezpečnou míru samostatnosti. Nikdy neurčuje, co tě smí zajímat."}</p></div><div className="young-branch-grid">{branches.map(([age,title,text],i)=><article key={age}><span>0{i+1}</span><small>{age}</small><h3>{title}</h3><p>{text}</p><Link to="/young/mise">{isEnglish ? "See suitable missions" : "Zobrazit vhodné mise"}<ArrowRight size={14}/></Link></article>)}</div></section>

    <section id="safety" className="young-safety"><ShieldCheck/><div><p className="young-kicker">{isEnglish ? "SAFE BY DESIGN" : "BEZPEČÍ UŽ V NÁVRHU"}</p><h2>{isEnglish ? "No precise child location. No direct contact with an unknown adult." : "Žádná přesná poloha dítěte. Žádný přímý kontakt s neznámým dospělým."}</h2><p>{isEnglish ? "Missions involving people or places are mediated by a parent, school or verified organisation. Public profiles do not show a child’s surname, school schedule or live location." : "Mise spojené s lidmi nebo místy zprostředkuje rodič, škola nebo ověřená organizace. Veřejný profil nezobrazuje příjmení dítěte, školní rozvrh ani živou polohu."}</p><Link to="/bezpecnost">{isEnglish ? "Read the safety rules" : "Přečíst pravidla bezpečí"}<ArrowRight size={14}/></Link></div></section>
  </div>;
}
