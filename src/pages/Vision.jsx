import React from "react";
import { ArrowRight, BookOpen, Eye, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import DevelopmentPaths from "../components/DevelopmentPaths";
import { useLanguage } from "../state/LanguageContext";
import ArtPageHero from "../components/ArtPageHero";

const COPY = {
  cs: {
    eyebrow:"Vize Pansofie", titleA:"Staré pilíře.", titleB:"Současný život.",
    intro:"Pansofie nechce Komenského myšlenky vystavit jako historii. Chce je znovu překládat do situací, které lidé opravdu žijí dnes.",
    pillars:[
      ["01","Vševěda","Pansofia","Poznávat svět v souvislostech.","Dnes to znamená umět spojovat informace, vlastní zkušenost, technologie, přírodu a život kolem nás. Neučit se izolované odpovědi, ale hledat, jak věci souvisejí."],
      ["02","Vševýchova","Pampaedia","Růst a učit se celý život.","Učení nekončí školou a neprobíhá jen jedním směrem. Dítě může něco předat seniorovi, senior dítěti, firma škole a soused sousedovi."],
      ["03","Všenáprava","Panorthosia","Zlepšovat svět kolem sebe.","Poznání má smysl, když může vést k dobrému činu. Někdy je to opravená věc, pomoc člověku, znovu použitý materiál nebo malá změna v okolí."],
    ],
    from:"Od myšlenky k možnosti", fromLead:"Ne „splň misi“. Spíš: pokud vás něco osloví, můžete se podívat dál.",
    opportunities:[
      ["Pomoc","Můžu někomu pomoct","Najít lehkou příležitost, kde může být užitečný můj čas nebo dovednost.","/osobni-rust"],
      ["Materiál","Mám něco navíc","Poslat dál materiál nebo věc, která ještě nemusí končit jako odpad.","/digitalni-kompost"],
      ["Změna","Chci něco změnit","Podívat se po nápadech a lidech, se kterými může něco vzniknout.","/knihovna"],
    ],
    browse:"Prohlédnout možnost",
    statement:"Poznávat v souvislostech. Růst celý život. Zlepšovat svět kolem sebe.",
    statement2:"A nechat každého člověka, aby si sám zvolil, kdy a jak chce přispět."
  },
  en: {
    eyebrow:"Vision of Pansofie", titleA:"Old pillars.", titleB:"Life today.",
    intro:"Pansofie does not want to display Comenius' ideas as history. It wants to keep translating them into situations that people actually live today.",
    pillars:[
      ["01","Universal knowledge","Pansofia","Understand the world in context.","Today this means connecting information, lived experience, technology, nature and everyday life — not learning isolated answers but seeing how things relate."],
      ["02","Lifelong education","Pampaedia","Keep growing and learning throughout life.","Learning does not end with school and it does not move only one way. A child can teach an older person, an older person a child, a company a school and neighbours one another."],
      ["03","Improvement","Panorthosia","Improve the world around us.","Knowledge matters when it can lead to a useful action — a repaired object, help for another person, reused material or a small local change."],
    ],
    from:"From an idea to a possibility", fromLead:"Not “complete a mission”. More like: if something speaks to you, you can explore it further.",
    opportunities:[
      ["Help","I can help someone","Find a light opportunity where my time or skill could be useful.","/osobni-rust"],
      ["Material","I have something extra","Pass on material or an object that does not need to become waste yet.","/digitalni-kompost"],
      ["Change","I want to change something","Explore ideas and people with whom something useful could emerge.","/knihovna"],
    ],
    browse:"Explore possibility",
    statement:"Know in context. Grow throughout life. Improve the world around us.",
    statement2:"And let every person decide for themselves when and how they want to contribute."
  }
};
const meta=[
  [Eye,"pan-sophia"],
  [BookOpen,"pampaedia"],
  [Leaf,"panorthosia"],
];

export default function Vision(){
  const { locale } = useLanguage();
  const c=COPY[locale]||COPY.cs;
  return <div className="ak-page r8-vision r9-vision" id="o-nas">
    <ArtPageHero eyebrow={c.eyebrow} title={c.titleA} accent={c.titleB} lead={c.intro}/>
    <div className="ak-content-shell">
    <section className="r8-vision-pillars">{c.pillars.map(([n,name,latin,lead,text],i)=>{
      const [Icon,id]=meta[i];
      return <article className="r8-vision-pillar" key={latin} id={id}><div className="r8-vision-pillar__copy"><span className="r8-eyebrow">{n} · {latin}</span><h2>{name}</h2><h3>{lead}</h3><p>{text}</p><div className="r8-vision-pillar__icon"><Icon/></div></div></article>
    })}</section>
    <DevelopmentPaths />
    <section className="r8-opportunities"><div className="r8-section-heading"><div><h2>{c.from}</h2><p>{c.fromLead}</p></div></div><div className="r8-opportunity-grid">{c.opportunities.map(([icon,title,text,to])=><Link className="r8-opportunity-card" to={to} key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p><b>{c.browse} <ArrowRight size={13}/></b></Link>)}</div></section>
    <section className="r8-vision-statement"><strong>{c.statement}</strong><span>{c.statement2}</span></section>
    </div>
  </div>
}
