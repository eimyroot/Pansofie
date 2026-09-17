import React, { useState } from "react";
import { Menu, Settings2, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import FontSizeControl from "./FontSizeControl";
import { useLanguage } from "../state/LanguageContext";

const LINKS=[["/7-cest","Vzdělávání"],["/projekty","Komunita"],["/projekty","Projekty"],["/impact","Dopad"],["/o-nas","O nás"]];
export default function Nav(){
  const [open,setOpen]=useState(false); const [tools,setTools]=useState(false); const {locale,setLocale}=useLanguage();
  return <><a className="skip-link" href="#main">Přeskočit na obsah</a><header className="p2-nav-shell"><div className="p2-nav">
    <Link className="p2-brand" to="/"><strong>PANSOFIE</strong><span>UČIT SE ŽIVOTEM</span></Link>
    <nav className="p2-nav-links" aria-label="Hlavní navigace · Jak to funguje · Pro koho · Koloběh · Knihovna · Vize">{LINKS.map(([to,label])=><NavLink key={label} to={to}>{label}</NavLink>)}</nav>
    <div className="p2-nav-actions"><Link className="p2-young-link" to="/young">PANSOFIE YOUNG</Link><Link className="p2-login" to="/login">Přihlásit</Link><div className="p2-lang"><button className={locale==="cs"?"is-active":""} onClick={()=>setLocale("cs")}>CS</button><button className={locale==="en"?"is-active":""} onClick={()=>setLocale("en")}>EN</button></div><button className="p2-tool" aria-label="Velikost písma" onClick={()=>setTools(v=>!v)}><Settings2 size={16}/></button><button className="p2-menu-button" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button></div>
    {tools&&<div className="p2-tools"><FontSizeControl compact/></div>}
  </div>{open&&<nav className="p2-mobile-menu">{LINKS.map(([to,label])=><Link key={label} to={to} onClick={()=>setOpen(false)}>{label}</Link>)}<Link to="/young" onClick={()=>setOpen(false)}>Pansofie Young</Link><Link to="/login" onClick={()=>setOpen(false)}>Přihlásit</Link></nav>}</header></>;
}
