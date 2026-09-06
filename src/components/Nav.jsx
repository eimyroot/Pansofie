import React, { useState } from "react";
import { ChevronDown, Menu, Settings2, UserRound, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import BrandMark from "./BrandMark";
import FontSizeControl from "./FontSizeControl";
import { useLanguage } from "../state/LanguageContext";

const ITEMS = {
  cs: [["/jak-to-funguje","Jak to funguje"],["/pro-koho","Pro koho"],["cycle","Koloběh"],["/knihovna","Knihovna"],["/vize","Vize"]],
  en: [["/jak-to-funguje","How it works"],["/pro-koho","For whom"],["cycle","Circulation"],["/knihovna","Library"],["/vize","Vision"]],
};

export default function Nav(){
  const [open,setOpen]=useState(false);
  const [tools,setTools]=useState(false);
  const {locale,setLocale,isEnglish}=useLanguage();
  const items=ITEMS[locale] || ITEMS.cs;
  return <>
    <a className="skip-link" href="#main">{isEnglish?"Skip to content":"Přeskočit na obsah"}</a>
    <header className="p-nav-shell r8-nav-shell r9-nav-shell">
      <div className="p-nav r8-nav r9-nav">
        <Link to="/" className="p-nav__brand r8-brand">
          <BrandMark/>
          <span className="r8-brand__tag">{isEnglish?"A living space where value keeps moving.":"Živý prostor, kde se hodnota vrací do oběhu."}</span>
        </Link>

        <nav className="p-nav__links r8-nav__links" aria-label={isEnglish?"Main navigation":"Hlavní navigace"}>
          {items.map(([to,label])=>to==="cycle"?<div className="cycle-menu" key={to}><button className="p-nav__link r8-nav__link" aria-haspopup="true">{label}<ChevronDown size={12}/></button><div className="cycle-menu__panel"><Link to="/osobni-rust"><strong>{isEnglish?"People & mentoring":"Lidé & mentoring"}</strong><span>{isEnglish?"Skills, experience and practical help.":"Zkušenosti, znalosti a praktická pomoc."}</span></Link><Link to="/digitalni-kompost"><strong>{isEnglish?"Digital compost":"Digitální kompost"}</strong><span>{isEnglish?"Useful things and materials in circulation.":"Věci a materiály, které mohou posloužit."}</span></Link><Link to="/mapa-kolobehu"><strong>{isEnglish?"Circulation map":"Mapa koloběhu"}</strong><span>{isEnglish?"Possibilities near you.":"Co se děje a co je dostupné v okolí."}</span></Link><Link to="/instituce"><strong>{isEnglish?"Schools & organisations":"Školy & organizace"}</strong><span>{isEnglish?"Projects, know-how and cooperation.":"Projekty, know-how a spolupráce."}</span></Link></div></div>:<NavLink key={to} to={to} className={({isActive})=>`p-nav__link r8-nav__link ${isActive?"is-active":""}`}>{label}</NavLink>)}
        </nav>

        <div className="p-nav__actions r8-nav__actions">
          <Link to="/young" className="young-gateway">Pansofie Young ↗</Link>
          <div className="r9-language" aria-label={isEnglish?"Language":"Jazyk"}>
            <button type="button" className={locale==="cs"?"is-active":""} onClick={()=>setLocale("cs")}>CS</button>
            <button type="button" className={locale==="en"?"is-active":""} onClick={()=>setLocale("en")}>EN</button>
          </div>
          <Link to="/profil" className="r8-signin">{isEnglish?"Profile":"Profil"}</Link>
          <Link to="/pro-koho" className="r8-join">{isEnglish?"Join":"Přidejte se"}</Link>
          <Link to="/profil" className="r8-profile" aria-label={isEnglish?"Profile":"Profil"}><UserRound size={18}/></Link>
          <button type="button" className="p-nav__tool" aria-label={isEnglish?"Text size":"Velikost písma"} aria-expanded={tools} onClick={()=>setTools(v=>!v)}><Settings2 size={14}/></button>
          <button type="button" className="p-nav__menu" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
        </div>

        {tools&&<div className="p-nav-popover">
          <div className="p-nav-popover__row"><span>{isEnglish?"Text":"Písmo"}</span><FontSizeControl compact/></div>
        </div>}
      </div>

      {open&&<nav className="p-mobile-menu r8-mobile-menu">
        <div className="r9-mobile-language">
          <button type="button" className={locale==="cs"?"is-active":""} onClick={()=>setLocale("cs")}>Čeština</button>
          <button type="button" className={locale==="en"?"is-active":""} onClick={()=>setLocale("en")}>English</button>
        </div>
        {items.map(([to,label])=>to==="cycle"?<span className="mobile-menu-label" key={to}>{label}</span>:<NavLink key={to} to={to} onClick={()=>setOpen(false)}>{label}</NavLink>)}
        <Link to="/osobni-rust" onClick={()=>setOpen(false)}>{isEnglish?"People & mentoring":"Lidé & mentoring"}</Link>
        <Link to="/digitalni-kompost" onClick={()=>setOpen(false)}>{isEnglish?"Digital compost":"Digitální kompost"}</Link>
        <Link to="/instituce" onClick={()=>setOpen(false)}>{isEnglish?"Schools & organizations":"Školy & organizace"}</Link>
        <Link to="/profil" onClick={()=>setOpen(false)}>{isEnglish?"Profile":"Profil"}</Link>
        <Link to="/young" onClick={()=>setOpen(false)}>Pansofie Young ↗</Link>
      </nav>}
    </header>
  </>
}
