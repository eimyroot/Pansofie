import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../state/LanguageContext";
export default function NotFound(){
  const {isEnglish}=useLanguage();
  return <div className="p-page p-secondary" style={{textAlign:"center"}}>
    <h1 style={{fontSize:28}}>{isEnglish?"This path is not available yet.":"Tahle cesta tu zatím není."}</h1>
    <p className="p-muted" style={{fontSize:13}}>{isEnglish?"The page was not found.":"Stránka nebyla nalezena."}</p>
    <Link className="p-btn p-btn--green" to="/">{isEnglish?"Back home":"Zpět domů"}</Link>
  </div>
}
