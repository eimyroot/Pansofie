import React from "react";
import { ArrowRight, BookOpen, Compass, HandHeart, Leaf, Lightbulb, Lock, MapPin, ShieldCheck, Sparkles, Sprout, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ART } from "../lib/artkit";
import { useLanguage } from "../state/LanguageContext";

const PHONES = [
  ["Domů", "Přehled a doporučení", "Ahoj, Káťo! Svět tě potřebuje.", ART.help],
  ["Mise", "Výzvy a úkoly", "Vysaď strom · Den bez plastu · Pomoz v komunitě", ART.panorthosia],
  ["Mapa", "Objevuj projekty kolem sebe", "Bez přesné polohy dítěte.", ART.explore],
  ["Projekty", "Přidej se nebo vytvoř", "Green Hope · Urban Family Farm · Family Team", ART.compost],
  ["Komunita", "Lidé, týmy, příběhy", "Bezpečné týmy a ověřené role.", ART.idea],
  ["Učení", "Krátká a zábavná forma", "Příroda · Lidé · Technologie · Kreativita", ART.pansofia],
  ["Můj rozvoj", "XP, úrovně, odznaky", "Portfolio růstu bez hodnocení člověka.", ART.heroTree],
  ["Mentor", "AI / člověk průvodce", "Otázky, nápady a jemná podpora.", ART.pampaedia],
  ["Profil", "Tvoje cesta a úspěchy", "Soukromé portfolio a viditelnost pod kontrolou.", ART.help],
  ["Nastavení", "Bezpečí a přizpůsobení", "Rodičovský režim, souhlasy a soukromí.", ART.panorthosia],
  ["Přihlášení", "Jednoduchý vstup", "Vítej! Svět potřebuje tvoje nápady.", ART.heroTree],
  ["Role při registraci", "Jsi tu jako...", "Příroda · Lidé · Technologie · Kreativita", ART.idea],
  ["Onboarding", "Osobní nastavení", "Co tě zajímá? Vyber oblasti, které tě volají.", ART.pansofia],
  ["Rodičovský režim", "Bezpečnost na prvním místě", "Viditelnost, omezení komunikace, přehled aktivit.", ART.panorthosia],
  ["Mobilní menu", "Rychlá navigace", "Domů · Mise · Mapa · Projekty · Komunita.", ART.explore],
];

const ADULT_SCREENS = [
  ["Domov", "Hlavní stránka"],
  ["O nás", "Poslání, vize, příběh"],
  ["7 cest", "Hlavní rozvojová mapa"],
  ["16 oblastí", "Přehled obsahového světa"],
  ["PansofieGO", "Mise, XP, dovednosti"],
  ["Green Hope", "Příroda a udržitelnost"],
  ["Urban Family Farm", "Praktická laboratoř života"],
  ["Family Team", "Rodinné mise a spolupráce"],
  ["Projekty", "Tvoř, zapojuj se, měň svět"],
  ["Mapa", "Lidé, projekty, příležitosti"],
  ["Impact Index", "Měření skutečného dopadu"],
  ["Mezinárodní síť", "Lokální i globální spolupráce"],
  ["Pro školy", "Vzdělávání v praxi"],
  ["Pro organizace", "Partnerství a spolupráce"],
  ["Blog / Zdroje", "Články, rozhovory, nástroje"],
  ["Kontakt", "Spojme se"],
  ["Přihlášení / Registrace", "Vstupní brána"],
  ["Dashboard", "Osobní přehled"],
  ["Profil", "Tvoje cesta v čase"],
  ["Nastavení", "Bezpečnost a soukromí"],
];

export default function Young() {
  const { isEnglish } = useLanguage();

  return <div className="board-young">
    <section className="board-split" aria-labelledby="board-young-title">
      <div className="board-adult-preview" aria-label="PANSOFIE hlavní produkt">
        <header className="board-adult-hero">
          <img src="/assets/adult-hero-rooftop.png" alt="" aria-hidden="true" />
          <div><p>PANSOFIE</p><h2>Učit se životem</h2><span>Kompletní webová platforma pro jednotlivce, rodiny, školy, komunity a organizace, které tvoří lepší svět.</span></div>
        </header>
        <div className="board-adult-pills"><span>Vzdělávání</span><span>Komunita</span><span>Projekty</span><span>Dopad</span><span>O nás</span></div>
        <div className="board-adult-grid">
          {ADULT_SCREENS.map(([title, label], index) => <article key={title}><small>{String(index + 1).padStart(2, "0")}</small><h3>{title}</h3><p>{label}</p></article>)}
        </div>
      </div>

      <div className="board-young-main" aria-label="PANSOFIE YOUNG produkt">
        <header className="board-young-hero">
          <div>
            <p>PANSOFIE YOUNG</p>
            <h1 id="board-young-title">{isEnglish ? "Bigger ideas. Better tomorrow." : "Větší nápady. Lepší budoucnost."}</h1>
            <span>{isEnglish ? "Interactive platform for children and young people ages 6-20." : "Interaktivní platforma pro děti a mladé 6-20 let."}</span>
            <div><Link to="/young/mise">Objevuj mise <ArrowRight size={16}/></Link><Link to="/login">Vstoupit</Link></div>
          </div>
          <img src={ART.help} alt="Pansofie Young komunita mladých lidí" />
          <i className="board-doodle board-doodle--smile">☺</i>
          <i className="board-doodle board-doodle--crown">♔</i>
          <i className="board-doodle board-doodle--spark">✦</i>
        </header>

        <div className="board-phone-grid" aria-label="Pansofie Young obrazovky">
          {PHONES.map(([title, label, text, image], index) => <article className="board-phone" key={title}>
            <div className="board-phone-top"><span>{String(index + 1).padStart(2, "0")}</span><b>{title}</b><em>{label}</em></div>
            <div className="board-phone-screen">
              <div className="board-phone-status"><span>0:{31 + index}</span><span>● ● ●</span></div>
              <img src={image} alt="" />
              <p>{label}</p>
              <h2>{text}</h2>
              {index === 2 && <div className="board-mini-map"><MapPin/><MapPin/><MapPin/><MapPin/></div>}
              {index === 4 && <div className="board-list">{["Klára", "Tomáš", "Ema", "Adam"].map((name) => <span key={name}><Users size={13}/>{name}</span>)}</div>}
              {index === 5 && <div className="board-topics">{["Příroda", "Lidé", "Technologie", "Sport"].map((item) => <button key={item}>{item}</button>)}</div>}
              {index === 6 && <div className="board-xp"><span /><strong>Level 5</strong></div>}
              {index === 7 && <div className="board-actions">{["Chci se něco naučit", "Potřebuju radu", "Mám nápad"].map((item) => <button key={item}>{item}</button>)}</div>}
              {index === 13 && <div className="board-checks"><span><ShieldCheck size={13}/>Viditelný rodič</span><span><Lock size={13}/>Bezpečná komunikace</span></div>}
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="board-principles">
      {[[Compass, "Objevuju"], [Sparkles, "Zkouším"], [Lightbulb, "Tvořím"], [HandHeart, "Spolupracuju"], [Leaf, "Měním svět"], [BookOpen, "Učím se životem"]].map(([Icon, label]) => <article key={label}><Icon/><span>{label}</span></article>)}
      <Link to="/young/mise">Vybrat první misi <ArrowRight size={16}/></Link>
    </section>
  </div>;
}
