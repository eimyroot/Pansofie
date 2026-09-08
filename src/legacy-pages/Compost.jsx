import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { LOCALITIES } from "../lib/demoData";
import { distanceKm } from "../lib/metabolism";
import { materialVisual } from "../lib/visuals";
import { usePansofie } from "../state/PansofieContext";
import { useLanguage } from "../state/LanguageContext";
import { localizeMaterial } from "../lib/i18nDemo";

const FILTERS = {
  cs:[["all","Vše"],["organic","Rostlinné"],["wood","Materiály"],["paper","Vybavení"],["other","Ostatní"]],
  en:[["all","All"],["organic","Plant-based"],["wood","Materials"],["paper","Equipment"],["other","Other"]],
};

export default function Compost() {
  const { state, addMaterial, reserveMaterial } = usePansofie();
  const {locale,isEnglish}=useLanguage();
  const filters=FILTERS[locale]||FILTERS.cs;
  const [filter, setFilter] = useState("all");
  const [geo, setGeo] = useState(null);
  const [geoState, setGeoState] = useState("idle");
  const [radius, setRadius] = useState(25);
  const [cart, setCart] = useState([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title:"", category:"organic", quantity:"", localityKey:"holesovice", description:"" });

  const items = useMemo(() => state.materials
    .filter((item) => item.status !== "handed_over")
    .map((raw) => localizeMaterial(raw, isEnglish))
    .map((item) => {
      const loc = LOCALITIES[item.localityKey];
      const km = geo && loc ? distanceKm(geo, loc) : null;
      return { ...item, locality: loc, km };
    })
    .filter((item) => filter === "all" || item.category === filter || (filter === "wood" && ["wood","textile"].includes(item.category)) || (filter === "paper" && ["paper","other"].includes(item.category)))
    .filter((item) => item.km == null || item.km <= radius)
    .sort((a,b) => (a.km ?? 999) - (b.km ?? 999)), [state.materials, filter, geo, radius]);

  const selected = cart.map((id) => state.materials.find((x) => x.id === id)).filter(Boolean);

  const locate = () => {
    if (!navigator.geolocation) return setGeoState("unsupported");
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      ({coords}) => { setGeo({lat:coords.latitude,lon:coords.longitude}); setGeoState("ready"); },
      () => setGeoState("denied"),
      { enableHighAccuracy:false, timeout:10000, maximumAge:300000 }
    );
  };
  const toggle = (id) => setCart((c) => c.includes(id) ? c.filter((x) => x !== id) : [...c,id]);
  const reserve = () => selected.forEach((item) => item.status === "available" && !item.createdByMe && reserveMaterial(item.id));
  const submit = (e) => {
    e.preventDefault(); if (!form.title.trim()) return;
    addMaterial({...form,type:"offer",ownerType:"community",title:form.title.trim(),description:form.description.trim()});
    setForm({ title:"", category:"organic", quantity:"", localityKey:"holesovice", description:"" }); setAdding(false);
  };

  const locateLabel=geoState==="ready"?(isEnglish?"✓ Location active":"✓ Poloha aktivní"):geoState==="loading"?(isEnglish?"Locating…":"Zaměřuji…"):(isEnglish?"📍 Use my location":"📍 Použít moji polohu");

  return <div className="ak-page p-compost r9-compost">
    <section className="p-compost-hero">
      <div><h1>{isEnglish?"Digital compost":"Digitální kompost"}</h1><p>{isEnglish?"A place for what you no longer need but someone else may still use.":"Sem patří to, co už nepotřebujete vy, ale ještě může posloužit ostatním."}</p>
        <button className="p-btn p-btn--outline p-btn--small" onClick={locate} style={{marginTop:10}}>{locateLabel}</button>
      </div>
      <img className="mockup-asset p-compost-hero__art" src="/assets/mockup/mat-compost.jpg" alt={isEnglish?"Compost material ready for reuse":"Kompostový materiál připravený k dalšímu využití"} />
    </section>

    <section className="p-panel p-compost-panel">
      <div className="p-filterbar">
        {filters.map(([id,label]) => <button key={id} className={`p-pill ${filter===id?"is-active":""}`} onClick={() => setFilter(id)}>{label}</button>)}
        <span className="p-filterbar__spacer" />
        <div className="p-range"><span>{isEnglish?"Radius":"Okruh"}: {radius} km</span><input type="range" min="2" max="50" value={radius} onChange={(e)=>setRadius(Number(e.target.value))}/></div>
      </div>
      <div className="p-material-grid">
        {items.slice(0,9).map((item) => {
          const chosen = cart.includes(item.id);
          return <button key={item.id} className={`p-material-card ${chosen?"is-selected":""}`} onClick={() => toggle(item.id)}>
            <img src={materialVisual(item)} alt="" />
            <h3>{item.title}</h3>
            <p>{item.quantity || (isEnglish?"quantity not provided":"množství neuvedeno")}</p>
            <p>{item.demo ? "DEMO" : "LOCAL"}</p>
            <span className="p-material-card__distance">{item.km != null ? `${item.km.toFixed(0)} km` : item.locality?.label?.split("·")[0] || ""}</span>
          </button>;
        })}
        <button className="p-add-card" onClick={() => setAdding(true)}><span><strong>+</strong>{isEnglish?"Add offer":"Přidat nabídku"}</span></button>
      </div>
    </section>

    <section className="p-cart-section">
      <div><h2>{isEnglish?"My wheelbarrow":"Můj trakař"}</h2><p>{isEnglish?"selected items — nothing is reserved until you confirm":"vybrané položky — nic se nerezervuje bez potvrzení"}</p>
        <div className="p-cart-chips">
          {selected.length ? selected.map((item) => <div className="p-cart-chip" key={item.id}><div><strong>{item.title}</strong><span>{item.quantity}</span></div><button onClick={() => toggle(item.id)} aria-label={isEnglish?"Remove":"Vyložit"}><X size={11}/></button></div>) : <span className="p-kicker">{isEnglish?"It is empty for now. Tap an item above.":"Zatím je prázdný. Klikněte na položku výše."}</span>}
          {selected.length > 0 && <button className="p-btn p-btn--green p-btn--small" onClick={reserve}>{isEnglish?"Reserve selected":"Rezervovat výběr"}</button>}
        </div>
      </div>
      <img className="mockup-asset p-cart-art" src="/assets/mockup/mat-leaves.jpg" alt={isEnglish?"Selected natural material":"Vybraný přírodní materiál"} />
    </section>

    {adding && <div className="r9-modal" onMouseDown={()=>setAdding(false)}>
      <form className="p-card r9-modal__card" onSubmit={submit} onMouseDown={(e)=>e.stopPropagation()}>
        <div className="r9-modal__head"><h2 className="p-section-title">{isEnglish?"Add offer":"Přidat nabídku"}</h2><button type="button" onClick={()=>setAdding(false)}><X size={16}/></button></div>
        <div className="p-sidebox" style={{padding:0}}>
          <label>{isEnglish?"Title":"Název"}<input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required /></label>
          <label>{isEnglish?"Category":"Kategorie"}<select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}><option value="organic">{isEnglish?"Organic":"Organika"}</option><option value="wood">{isEnglish?"Wood":"Dřevo"}</option><option value="paper">{isEnglish?"Paper":"Papír"}</option><option value="textile">{isEnglish?"Textile":"Textil"}</option><option value="other">{isEnglish?"Other":"Ostatní"}</option></select></label>
          <label>{isEnglish?"Quantity":"Množství"}<input value={form.quantity} onChange={(e)=>setForm({...form,quantity:e.target.value})}/></label>
          <label>{isEnglish?"Locality":"Lokalita"}<select value={form.localityKey} onChange={(e)=>setForm({...form,localityKey:e.target.value})}>{Object.entries(LOCALITIES).map(([key,v])=><option key={key} value={key}>{v.label}</option>)}</select></label>
          <label>{isEnglish?"Note":"Poznámka"}<textarea rows="3" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></label>
        </div><button className="p-btn p-btn--green" style={{width:"100%",marginTop:12}}>{isEnglish?"Put into circulation":"Vložit do oběhu"}</button>
      </form>
    </div>}
  </div>
}
