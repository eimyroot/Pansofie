import React, { useMemo, useState } from "react";
import { ArrowRight, Building2, GraduationCap, Sparkles } from "lucide-react";
import { DEMO_MATERIALS, DEMO_SCHOOL_PROJECTS, LOCALITIES } from "../lib/demoData";
import { matchProjectToMaterials } from "../lib/metabolism";
import { materialVisual } from "../lib/visuals";
import { usePansofie } from "../state/PansofieContext";
import { useLanguage } from "../state/LanguageContext";
import { localizeMaterial, localizeSchoolProject } from "../lib/i18nDemo";

export default function Institutions() {
  const { state, addMaterial, addSchoolProject, reserveMaterial } = usePansofie();
  const {isEnglish}=useLanguage();
  const [tab, setTab] = useState("companies");
  const [school, setSchool] = useState({ school:"", project:"", need:"", benefit:"" });
  const [company, setCompany] = useState({ company:"", title:"", quantity:"", localityKey:"holesovice", description:"", useCase:"" });
  const [selectedId, setSelectedId] = useState(state.schoolProjects[0]?.id || DEMO_SCHOOL_PROJECTS[0]?.id || null);

  const companyMaterials = useMemo(() => {
    const live = state.materials.filter((x) => x.ownerType === "company" && x.status === "available");
    const ids = new Set(live.map((x) => x.id));
    return [...live, ...DEMO_MATERIALS.filter((x) => x.ownerType === "company" && !ids.has(x.id))]
      .map((x) => localizeMaterial(x, isEnglish));
  }, [state.materials, isEnglish]);

  const schoolProjects = useMemo(() => {
    const ids = new Set(state.schoolProjects.map((x) => x.id));
    return [...state.schoolProjects, ...DEMO_SCHOOL_PROJECTS.filter((x) => !ids.has(x.id))]
      .map((x) => localizeSchoolProject(x, isEnglish));
  }, [state.schoolProjects, isEnglish]);

  const selected = schoolProjects.find((x) => x.id === selectedId) || schoolProjects[0] || null;
  const matches = useMemo(() => selected ? matchProjectToMaterials(selected, companyMaterials) : [], [selected, companyMaterials]);

  const submitSchool = (e) => {
    e.preventDefault();
    if (!school.school.trim() || !school.project.trim() || !school.need.trim()) return;
    const item = addSchoolProject(school);
    setSelectedId(item.id);
    setSchool({ school:"", project:"", need:"", benefit:"" });
    setTab("schools");
  };
  const submitCompany = (e) => {
    e.preventDefault();
    if (!company.company.trim() || !company.title.trim()) return;
    addMaterial({ ...company, type:"offer", category:"other", ownerType:"company", tags:company.title.split(/\s+/) });
    setCompany({ company:"", title:"", quantity:"", localityKey:"holesovice", description:"", useCase:"" });
  };

  const text = isEnglish ? {
    kicker:"Circular connection for schools and organizations",
    titleA:"What one organization has extra,", titleB:"another may be looking for.",
    lead:"Schools describe real project needs. Organizations can offer clean material surplus. Pansofie looks for meaningful overlap and shows where a useful connection may exist.",
    company:"Organization", school:"School", material:"material", project:"project", matching:"matching needs",
    found:n=>`${n} possible material ${n===1?"match":"matches"} found`,
    choose:"Choose a school project and Pansofie will look for overlaps",
    none:"No project selected yet.", best:"Relevant offer", relevant:"Meaningful overlap",
    companyOffers:"Organization offers", schoolNeeds:"School needs",
    addCompany:"Add surplus material", addCompanyLead:"Creates a material offer that also appears in Compost and the circulation map.",
    companyLabel:"Organization", materialLabel:"Material", quantity:"Quantity", locality:"Locality", use:"Possible use",
    optional:"Condition, pickup note or safety note (optional)", add:"Add offer",
    addSchool:"Add a school project", addSchoolLead:"Describe the need naturally. Matching looks for meaning, not only exact words.",
    schoolLabel:"School", projectLabel:"Project", need:"What do you need?", benefit:"Anything you might want to share later (optional)",
    publish:"Publish and look for matches", bank:"living material bank",
    available:"What schools could use right now", looking:"What schools are currently looking for", items:"items",
    could:"Next step", undecided:"Further cooperation is voluntary.", reserve:"Save interest in prototype",
    demoProject:"DEMO project", localProject:"LOCAL project", matches:"matches", useFor:"Use for matching",
    note:"DEMO names and offers are simulated to test the UX and matching logic; they are not verified partners."
  } : {
    kicker:"Cirkulární propojení škol a organizací",
    titleA:"Co jedné instituci přebývá,", titleB:"druhé může chybět.",
    lead:"Školy popisují skutečné projektové potřeby. Organizace mohou nabídnout čisté materiálové přebytky. Pansofie hledá smysluplné překryvy a ukazuje, kde může vzniknout užitečné propojení.",
    company:"Organizace", school:"Škola", material:"materiál", project:"projekt", matching:"matching potřeb",
    found:n=>`Nalezeno ${n} možných materiálových shod`,
    choose:"Vyberte školní projekt a Pansofie hledá možné shody",
    none:"Zatím není vybraný projekt.", best:"Relevantní nabídka", relevant:"Smysluplný překryv",
    companyOffers:"Nabídky organizací", schoolNeeds:"Poptávky škol",
    addCompany:"Vložit materiálový přebytek", addCompanyLead:"Vytvoří materiálovou nabídku, která se propíše i do Kompostu a Mapy.",
    companyLabel:"Organizace", materialLabel:"Materiál", quantity:"Množství", locality:"Lokalita", use:"Vhodné využití",
    optional:"Podmínky, předání nebo bezpečnostní poznámka (volitelné)", add:"Přidat nabídku",
    addSchool:"Zadat školní projekt", addSchoolLead:"Popište potřebu přirozeným jazykem. Matching hledá významové překryvy, ne jen přesné slovo.",
    schoolLabel:"Škola", projectLabel:"Projekt", need:"Co potřebujete", benefit:"Co byste případně chtěli sdílet dál (volitelné)",
    publish:"Publikovat a hledat shody", bank:"živá materiálová banka",
    available:"Co mohou školy právě využít", looking:"Co školy právě hledají", items:"položek",
    could:"Další krok", undecided:"Další spolupráce je dobrovolná.", reserve:"Uložit zájem v prototypu",
    demoProject:"DEMO projekt", localProject:"LOCAL projekt", matches:"shod", useFor:"Použít pro matching",
    note:"DEMO názvy a nabídky jsou simulované pro ověření UX a matching logiky; nejde o ověřené partnery."
  };

  return <div className="ak-page p-institutions r9-institutions">
    <section className="p-institutions-hero">
      <div><span className="p-kicker">{text.kicker}</span><h1>{text.titleA}<br/><em>{text.titleB}</em></h1><p>{text.lead}</p></div>
      <img className="ak-institutions-art" src="/assets/mockup/mat-pallets.jpg" alt="" aria-hidden="true"/>
      <div className="p-institutions-flow" aria-label={isEnglish?"Organization, matching and school":"Organizace, matching a škola"}>
        <div className="p-flow-node"><Building2/><strong>{text.company}</strong><span>{text.material}</span></div>
        <div className="p-flow-arrow"><Sparkles/><b>Pansofie</b><span>{text.matching}</span></div>
        <div className="p-flow-node"><GraduationCap/><strong>{text.school}</strong><span>{text.project}</span></div>
      </div>
    </section>

    <section className={`p-match-banner ${matches.length ? "has-match" : ""}`}>
      <div><Sparkles size={22}/></div>
      <div><strong>{matches.length ? text.found(matches.length) : text.choose}</strong><span>{selected ? `${selected.school} · ${selected.project}` : text.none}</span></div>
      {matches[0] && <div className="p-match-banner__best"><small>{text.best}</small><b>{matches[0].material.title}</b><span>{text.relevant}</span></div>}
    </section>

    <section className="p-institution-switcher">
      <button className={tab === "companies" ? "is-active" : ""} onClick={() => setTab("companies")}>{text.companyOffers}</button>
      <button className={tab === "schools" ? "is-active" : ""} onClick={() => setTab("schools")}>{text.schoolNeeds}</button>
    </section>

    <section className="p-institution-workspace">
      <aside className="p-institution-form">
        {tab === "companies" ? <form onSubmit={submitCompany}>
          <div className="p-form-icon"><Building2/></div><h2>{text.addCompany}</h2><p>{text.addCompanyLead}</p>
          <label>{text.companyLabel}<input value={company.company} onChange={(e)=>setCompany({...company,company:e.target.value})}/></label>
          <label>{text.materialLabel}<input value={company.title} onChange={(e)=>setCompany({...company,title:e.target.value})}/></label>
          <div className="p-form-row"><label>{text.quantity}<input value={company.quantity} onChange={(e)=>setCompany({...company,quantity:e.target.value})}/></label><label>{text.locality}<select value={company.localityKey} onChange={(e)=>setCompany({...company,localityKey:e.target.value})}>{Object.entries(LOCALITIES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></label></div>
          <label>{text.use}<textarea rows="3" value={company.useCase} onChange={(e)=>setCompany({...company,useCase:e.target.value})}/></label>
          <label>{text.optional}<textarea rows="3" value={company.description} onChange={(e)=>setCompany({...company,description:e.target.value})}/></label>
          <button className="p-btn p-btn--green" style={{width:"100%"}}>{text.add}</button>
        </form> : <form onSubmit={submitSchool}>
          <div className="p-form-icon"><GraduationCap/></div><h2>{text.addSchool}</h2><p>{text.addSchoolLead}</p>
          <label>{text.schoolLabel}<input value={school.school} onChange={(e)=>setSchool({...school,school:e.target.value})}/></label>
          <label>{text.projectLabel}<input value={school.project} onChange={(e)=>setSchool({...school,project:e.target.value})}/></label>
          <label>{text.need}<textarea rows="4" value={school.need} onChange={(e)=>setSchool({...school,need:e.target.value})}/></label>
          <label>{text.benefit}<textarea rows="3" value={school.benefit} onChange={(e)=>setSchool({...school,benefit:e.target.value})}/></label>
          <button className="p-btn p-btn--green" style={{width:"100%"}}>{text.publish}</button>
        </form>}
      </aside>

      <div className="p-institution-catalog">
        <div className="p-catalog-head"><div><span className="p-kicker">{text.bank}</span><h2>{tab === "companies" ? text.available : text.looking}</h2></div><span>{tab === "companies" ? companyMaterials.length : schoolProjects.length} {text.items}</span></div>
        {tab === "companies" ? <div className="p-company-grid">{companyMaterials.slice(0,6).map((item) => {
          const match = matches.find((m)=>m.material.id===item.id);
          return <article className={`p-company-card ${match ? "is-match" : ""}`} key={item.id}>
            <img src={materialVisual(item)} alt=""/><div className="p-company-card__body">
              <div className="p-company-card__meta"><span>{item.demo ? "DEMO" : "LOCAL"}</span>{match && <b>MATCH</b>}</div>
              <h3>{item.title}</h3><p className="p-company-card__owner">{item.company} · {item.quantity}</p><p>{item.useCase || item.description}</p>
              <div className="p-company-card__return"><small>{text.could}</small><span>{text.undecided}</span></div>
              <button className="p-link-button" onClick={()=>reserveMaterial(item.id)}>{text.reserve} <ArrowRight size={14}/></button>
            </div>
          </article>
        })}</div> : <div className="p-school-list">{schoolProjects.map((item) => {
          const mm = matchProjectToMaterials(item, companyMaterials); const active = item.id === selectedId;
          return <article className={`p-school-card ${active ? "is-active" : ""}`} key={item.id}><div className="p-school-card__icon">S</div><div><span className="p-kicker">{item.demo ? text.demoProject : text.localProject}</span><h3>{item.project}</h3><p><strong>{item.school}</strong></p><p>{item.need}</p><div className="p-school-card__bottom"><span>{mm.length} {text.matches}</span><button onClick={()=>setSelectedId(item.id)}>{text.useFor} <ArrowRight size={13}/></button></div></div></article>
        })}</div>}
      </div>
    </section>
    <p className="p-institution-note">{text.note}</p>
  </div>
}
