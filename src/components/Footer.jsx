import React from "react";
import { ArrowRight, BookOpen, Leaf, Sprout, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";
import { useLanguage } from "../state/LanguageContext";

export default function Footer() {
  const { isEnglish } = useLanguage();

  const principles = isEnglish ? [
    ["FOR EVERYONE", "Knowledge and opportunities should be understandable and accessible without unnecessary barriers."],
    ["FOR THE WHOLE OF LIFE", "Technology and knowledge should serve people, nature, culture and everyday life — not only business."],
    ["WHOLE-PERSON", "Reason, relationships, practical skill and responsibility belong together."],
  ] : [
    ["VŠEM", "Poznání a příležitosti mají být srozumitelné a dostupné bez zbytečných bariér."],
    ["VŠEMU", "Technologie a vědění mají sloužit lidem, přírodě, kultuře i běžnému životu — ne jen byznysu."],
    ["VŠESTRANNĚ", "Rozum, vztahy, praktická dovednost a odpovědnost patří k sobě."],
  ];

  const flow = isEnglish
    ? ["LOOK AROUND", "CONNECT", "MAKE A SMALL STEP", "PASS VALUE ON", "NEXT POSSIBILITY"]
    : ["ROZHLÉDNOUT SE", "PROPOJIT SE", "UDĚLAT MALÝ KROK", "POSLAT HODNOTU DÁL", "OBJEVIT DALŠÍ MOŽNOST"];

  return (
    <footer className="r9-footer">
      <div className="r9-footer__principles">
        {principles.map(([label, text], index) => (
          <article key={label}>
            <span className={`r9-footer__dot r9-footer__dot--${index + 1}`} />
            <strong>{label}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="r9-footer__body">
        <section className="r9-footer__brand">
          <div className="r9-footer__brandline"><BrandMark /></div>
          <h2>{isEnglish ? "Know in context. Grow for life. Improve what is around us." : "Poznávat v souvislostech. Růst celý život. Zlepšovat svět kolem sebe."}</h2>
          <p>{isEnglish
            ? "Pansofie creates a space where people can look around, connect and contribute when they genuinely want to — without pressure, points or moral debt."
            : "Pansofie vytváří prostor, kde se lidé mohou rozhlédnout, propojit a přispět ve chvíli, kdy sami chtějí — bez tlaku, bodování a morálního dluhu."}</p>
          <Link to="/pro-koho" className="r9-footer__cta">
            {isEnglish ? "Find my way in" : "Najít svůj vstup"} <ArrowRight size={15}/>
          </Link>
        </section>

        <nav>
          <span>{isEnglish ? "DISCOVER" : "OBJEVOVAT"}</span>
          <Link to="/jak-to-funguje">{isEnglish ? "How it works" : "Jak to funguje"}</Link>
          <Link to="/pro-koho">{isEnglish ? "For whom" : "Pro koho"}</Link>
          <Link to="/knihovna">{isEnglish ? "Library" : "Knihovna"}</Link>
          <Link to="/vize">{isEnglish ? "Vision" : "Vize"}</Link>
        </nav>

        <nav>
          <span>{isEnglish ? "CIRCULATION" : "KOLOBĚH"}</span>
          <Link to="/digitalni-kompost">{isEnglish ? "Digital compost" : "Digitální kompost"}</Link>
          <Link to="/mapa-kolobehu">{isEnglish ? "Circulation map" : "Mapa koloběhu"}</Link>
          <Link to="/instituce">{isEnglish ? "Schools & organizations" : "Školy & organizace"}</Link>
          <Link to="/osobni-rust">{isEnglish ? "People & mentoring" : "Lidé & mentoring"}</Link>
        </nav>

        <nav>
          <span>{isEnglish ? "PANSOFIE TODAY" : "PANSOFIE DNES"}</span>
          <Link to="/vize#pan-sophia">{isEnglish ? "Pansofia · universal knowledge" : "Pansofia · Vševěda"}</Link>
          <Link to="/vize#pampaedia">{isEnglish ? "Pampaedia · lifelong education" : "Pampaedia · Vševýchova"}</Link>
          <Link to="/vize#panorthosia">{isEnglish ? "Panorthosia · improvement" : "Panorthosia · Všenáprava"}</Link>
          <Link to="/vize#co-se-rozviji">{isEnglish ? "What can grow" : "Co se může rozvíjet"}</Link>
        </nav>
      </div>

      <div className="r9-footer__flow" aria-label={isEnglish ? "Pansofie voluntary flow" : "Dobrovolný tok Pansofie"}>
        {flow.map((item, i) => <React.Fragment key={item}>
          <span>{item}</span>{i < flow.length - 1 && <i aria-hidden="true" />}
        </React.Fragment>)}
      </div>

      <div className="r9-footer__legal">
        <p>{isEnglish
          ? "A prototype translating Pansofie, Pampaedia and Panorthosia into a simple contemporary community experience."
          : "Prototyp překládající Pansofii, Pampaedii a Panorthosii do jednoduché současné komunitní zkušenosti."}</p>
        <div><span>© 2026 Pansofie</span><span>{isEnglish ? "Opportunity, not obligation." : "Příležitost, ne povinnost."}</span></div>
      </div>
      <nav className="r9-footer__links" aria-label={isEnglish?"Legal and contact":"Právní informace a kontakt"}><Link to="/soukromi">{isEnglish?"Privacy":"Soukromí"}</Link><Link to="/podminky">{isEnglish?"Terms":"Podmínky"}</Link><Link to="/cookies">Cookies</Link><Link to="/pravidla-komunity">{isEnglish?"Community rules":"Pravidla komunity"}</Link><Link to="/bezpecnost">{isEnglish?"Safety":"Bezpečnost"}</Link><Link to="/pristupnost">{isEnglish?"Accessibility":"Přístupnost"}</Link><Link to="/kontakt">{isEnglish?"Contact":"Kontakt"}</Link></nav>
    </footer>
  );
}
