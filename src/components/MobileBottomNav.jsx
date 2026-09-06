import React from "react";
import { Home, Map, Plus, Search, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../state/LanguageContext";

export default function MobileBottomNav(){
  const {isEnglish}=useLanguage();
  const items=isEnglish
    ? [["/",Home,"Home"],["/mapa-kolobehu",Map,"Map"],["/digitalni-kompost",Plus,"Add",true],["/knihovna",Search,"Explore"],["/profil",UserRound,"Profile"]]
    : [["/",Home,"Domů"],["/mapa-kolobehu",Map,"Mapa"],["/digitalni-kompost",Plus,"Přidat",true],["/knihovna",Search,"Objevit"],["/profil",UserRound,"Profil"]];
  return <nav className="p-mobile-dock" aria-label={isEnglish?"Mobile navigation":"Mobilní navigace"}>{items.map(([to,Icon,label,primary],i)=><NavLink key={`${to}-${i}`} to={to} className={({isActive})=>`p-mobile-dock__item ${isActive?"is-active":""} ${primary?"is-primary":""}`}><Icon size={primary?18:16} strokeWidth={1.8}/>{!primary&&<span>{label}</span>}</NavLink>)}</nav>
}
