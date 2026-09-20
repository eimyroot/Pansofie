import React from "react";
import Image from "next/image";
import { ArrowRight, Play, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { PATHS, PROJECTS } from "../domain/pansofie-content";
import { pathIcon } from "../domain/asset-system";
import { useLanguage } from "../state/LanguageContext";

const pathIds=["body","mind","character","relationships","creativity","prosperity","meaning"];
const cards=[
  ["Green Hope","Příroda a udržitelnost","/green-hope","/assets/brand/pansofie/scenes/green-hope-lab.svg"],
  ["Urban Family Farm","Praktická laboratoř života","/urban-family-farm","/assets/brand/pansofie/scenes/urban-farm-system.svg"],
  ["Family Team","Rodinné mise a spolupráce","/family-team","/assets/brand/pansofie/scenes/family-team-missions.svg"],
];

export default function Home(){
  const { isEnglish } = useLanguage();
  return <div className="p2-home">
    <section className="p2-home-hero">
      <div className="p2-home-copy"><p className="p2-kicker">{isEnglish ? "PANSOFIE · LEARN THROUGH LIFE" : "PANSOFIE · UČIT SE ŽIVOTEM"}</p><h1>{isEnglish ? <>Learn through life.<br/><span>Together we shape a better world.</span></> : <>Učíme se životem.<br/><span>Společně tvoříme lepší svět.</span></>}</h1><p>{isEnglish ? "For people, families, schools, communities and organizations. Knowledge, relationships and concrete action in one connected ecosystem." : "Pro lidi, rodiny, školy, komunity a organizace. Vědění, vztahy a konkrétní činy v jednom propojeném ekosystému."}</p><div className="p2-actions"><Link className="p2-button" to="/jak-to-funguje">Začít cestu <ArrowRight size={16}/></Link><Link className="p2-button p2-button--light" to="/vize"><Play size={15}/> Přehrát příběh</Link></div><div className="p2-home-stats"><span><strong>7</strong> cest</span><span><strong>16</strong> oblastí</span><span><strong>3</strong> hlavní Labs</span></div></div>
      <figure className="p2-home-media"><Image src="/assets/brand/pansofie/photos/hero-community-left-safe-16x9.webp" alt="Lidé propojují znalosti, přírodu a společnou práci" width={960} height={540} sizes="(max-width: 900px) 100vw, 48vw" priority/><figcaption>VĚDĚNÍ<br/>VZTAHY<br/>ČINY<br/><b>LEPŠÍ SVĚT</b></figcaption></figure>
    </section>

    <nav className="p2-quick-nav" aria-label="Hlavní oblasti Pansofie"><Link to="/7-cest">Vzdělávání</Link><Link to="/projekty">Komunita</Link><Link to="/projekty">Projekty</Link><Link to="/impact">Dopad</Link><Link to="/o-nas">O nás</Link></nav>

    <section className="p2-path-preview"><header><div><p className="p2-kicker">7 CEST</p><h2>Sedm cest k naplněnému životu</h2></div><Link to="/7-cest">Celá rozvojová mapa <ArrowRight size={15}/></Link></header><div>{PATHS.map(([title],i)=><article key={title}><span><Image src={pathIcon(pathIds[i])} alt="" width={64} height={64} sizes="64px"/></span><b>{title}</b></article>)}</div></section>

    <section className="p2-programs"><header><p className="p2-kicker">PROGRAMY A LABS</p><h2>Myšlenka se stává zkušeností.</h2></header><div>{cards.map(([title,label,to,image], index)=><Link to={to} key={title}><Image src={image} alt="" width={520} height={340} sizes="(max-width: 900px) 100vw, 33vw" priority={index === 0}/><div><small>{label}</small><h3>{title}</h3><span>Objevit <ArrowRight size={15}/></span></div></Link>)}</div></section>

    <section className="p2-entry-strip"><div><p className="p2-kicker">PŘÍLEŽITOST, NE POVINNOST</p><h2>Lepší svět začíná konkrétním krokem.</h2></div><div><Link to="/projekty">Můžu někomu pomoct <ArrowRight size={14}/></Link><Link to="/mapa">Můžu prozkoumat <ArrowRight size={14}/></Link></div><small>PANSOFIE · PAMPAEDIA · PANORTHOSIA</small></section>

    <section className="p2-go-strip"><div><p className="p2-kicker">PANSOFIE GO</p><h2>Malé mise. Velké změny.</h2><p>Mobilní akční vrstva pro mise, projekty, checkpointy, portfolio a reflexi.</p><Link className="p2-button p2-button--gold" to="/go">Otevřít GO <ArrowRight size={16}/></Link></div><Image src="/assets/brand/young/photos/creative-studio-16x9.webp" alt="Mladí lidé tvoří společný projekt" width={720} height={405} sizes="(max-width: 900px) 100vw, 42vw"/><Sprout className="p2-go-mark"/></section>
  </div>;
}
