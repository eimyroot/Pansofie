import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserRound, Heart, Brain, HeartHandshake, UsersRound, House, Users, Leaf, Settings2, Coins, BriefcaseBusiness, Palette, Landmark, Scale, Flag, Sun } from "lucide-react";
import { PublicShellV2 } from "../../components/public-v2/PublicShellV2";
import { DOMAIN_DETAILS } from "../../domain/pansofie-content";
import { LEARNING_DOMAINS } from "../../domain/learning-core";
import "./domains-w213.css";

export const metadata = {
  title: "16 oblastí života | Vše je propojené",
  description: "Objev 16 propojených oblastí života PANSOFIE: od sebepoznání a zdraví po technologie, přírodu, kulturu a smysl života.",
};

// Visual presentation only. Canonical names, IDs and detailed copy remain in the learning and content cores.
const DOMAIN_PRESENTATION = Object.freeze([
  { id:"self", label:"Já", icon:UserRound, color:"amber", summary:"Sebepoznání, hodnoty, identita a směr v životě." },
  { id:"body", label:"Tělo", icon:Heart, color:"coral", summary:"Zdraví, pohyb, výživa, spánek a péče o tělo." },
  { id:"mind", label:"Mysl", icon:Brain, color:"blue", summary:"Učení, kritické myšlení, kreativita a soustředění." },
  { id:"emotions", label:"Emoce", icon:HeartHandshake, color:"violet", summary:"Porozumění emocím, odolnost a duševní pohoda." },
  { id:"relationships", label:"Vztahy", icon:UsersRound, color:"coral", summary:"Přátelství, spolupráce, komunikace a respekt." },
  { id:"family", label:"Rodina", icon:House, color:"clay", summary:"Domov, bezpečí, podpora a společný čas." },
  { id:"society", label:"Společnost", icon:Users, color:"blue", summary:"Komunita, solidarita, rozmanitost a zapojení do dění." },
  { id:"nature", label:"Příroda", icon:Leaf, color:"leaf", summary:"Životní prostředí, ekosystémy a ochrana přírody." },
  { id:"technology", label:"Technologie", icon:Settings2, color:"slate", summary:"Digitální svět, AI, nástroje a odpovědné využívání." },
  { id:"finance", label:"Finance", icon:Coins, color:"amber", summary:"Hodnota, hospodaření, plánování a finanční gramotnost." },
  { id:"work", label:"Práce", icon:BriefcaseBusiness, color:"orange", summary:"Povolání, podnikání, smysluplná činnost a přínos." },
  { id:"creation", label:"Tvorba", icon:Palette, color:"coral", summary:"Umění, řemeslo, design a vlastní projekty." },
  { id:"culture", label:"Kultura", icon:Landmark, color:"violet", summary:"Tradice, umění, příběhy a kulturní rozmanitost." },
  { id:"ethics", label:"Etika", icon:Scale, color:"teal", summary:"Hodnoty, odpovědnost, férovost a morální rozhodování." },
  { id:"citizenship", label:"Občanství", icon:Flag, color:"blue", summary:"Demokracie, práva, povinnosti a aktivní občanství." },
  { id:"meaning", label:"Smysl života", icon:Sun, color:"amber", summary:"Hodnoty, poslání, rovnováha a životní spokojenost." },
]);

const PUBLIC_DOMAINS = DOMAIN_DETAILS.map(([title, detail], index) => {
  const canonical = LEARNING_DOMAINS[index];
  const presentation = DOMAIN_PRESENTATION[index];
  if (!canonical || !presentation || canonical.id !== presentation.id ||
    canonical.labelCs !== presentation.label || title !== canonical.labelCs) {
    throw new Error("Nesoulad v kanonických 16 oblastech PANSOFIE.");
  }
  return {...presentation, detail};
});

export default function DomainsPage() {
  return <PublicShellV2 currentPath="/16-oblasti">
    <div className="ps2-domains">
      <section className="ps2-domains__hero" aria-labelledby="ps2-domains-title">
        <Image className="ps2-domains__hero-photo" src="/assets/brand-v2/editorial/w213-hero.avif"
          alt="Lidé u společného stolu s notebookem a poznámkami v zelené komunitní zahradě"
          fill sizes="100vw" priority quality={85}/>
        <div className="ps2-domains__hero-shade" aria-hidden="true"/>
        <div className="ps2-domains__hero-copy">
          <p className="ps2-domains__eyebrow">16 OBLASTÍ</p>
          <h1 id="ps2-domains-title">Vše je propojené</h1>
          <p>Šestnáct oblastí ukazuje, jak spolu souvisí náš život, lidé okolo nás a svět, ve kterém žijeme. Pomáhají nám rozvíjet se v rovnováze – pro sebe, pro druhé i pro budoucí generace.</p>
          <div className="ps2-domains__actions">
            <a className="ps2-domains__button ps2-domains__button--primary" href="#oblasti-grid">Prozkoumat oblasti <ArrowRight size={17} aria-hidden="true"/></a>
            <Link className="ps2-domains__button ps2-domains__button--light" href="/jak-to-funguje">Jak to funguje <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
        </div>
        <p className="ps2-domains__handwriting">Společně<br/>tvoříme svět,<br/>který dává<br/>smysl. ♡</p>
      </section>

      <section className="ps2-domains__overview" aria-labelledby="ps2-domains-overview-title">
        <div className="ps2-domains__overview-heading">
          <div><p className="ps2-domains__eyebrow">16 OBLASTÍ PANSOFIE</p><h2 id="ps2-domains-overview-title">Objevuj, co tě zajímá</h2></div>
          <p>Každá oblast přináší inspiraci, praktické nápady a projekty, které můžeš zkoušet v běžném životě. Společně tvoří celek, který pomáhá rozvíjet jednotlivce, rodiny, školy i komunity.</p>
          <a className="ps2-domains__button ps2-domains__button--quiet" href="#oblasti-grid">Zobrazit všechny <ArrowRight size={17} aria-hidden="true"/></a>
        </div>
        <div className="ps2-domains__grid" id="oblasti-grid" aria-label="Šestnáct propojených oblastí">
          {PUBLIC_DOMAINS.map((domain,index)=>{
            const Icon=domain.icon;
            const row=Math.floor(index/4),col=index%4;
            return <article className="ps2-domains__card" id={domain.id} key={domain.id}>
              <div className="ps2-domains__card-photo" role="img" aria-label={"Ilustrační fotografie: "+domain.label}
                style={{backgroundPosition:`${col*100/3}% ${row*100/3}%`}}/>
              <div className={"ps2-domains__card-icon ps2-domains__tone--"+domain.color}><Icon size={25} strokeWidth={1.8} aria-hidden="true"/></div>
              <div className="ps2-domains__card-copy">
                <h3>{index+1}. {domain.label}</h3>
                <p>{domain.summary}</p>
                <details className="ps2-domains__card-more">
                  <summary aria-label={"Více o oblasti "+domain.label}><ArrowRight size={16} aria-hidden="true"/></summary>
                  <p>{domain.detail}</p>
                </details>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="ps2-domains__bridge" id="souvislosti" aria-labelledby="ps2-domains-bridge-title">
        <Image className="ps2-domains__bridge-photo" src="/assets/brand-v2/editorial/w213-connected-people.avif"
          alt="Čtyři mladí lidé společně plánují trasu a zkoumají mapu v přírodě" fill sizes="(max-width: 700px) 100vw, 60vw" quality={85}/>
        <div className="ps2-domains__bridge-shade" aria-hidden="true"/>
        <div className="ps2-domains__bridge-copy">
          <p className="ps2-domains__eyebrow">VŠE JE PROPOJENÉ</p>
          <h2 id="ps2-domains-bridge-title">Sedm cest.<br/>Jedna společná mapa.</h2>
          <p>16 oblastí se přirozeně propojuje v 7 cest, které pomáhají dětem, mladým lidem i dospělým rozvíjet naplněný a smysluplný život.</p>
          <div className="ps2-domains__actions">
            <Link className="ps2-domains__button ps2-domains__button--light" href="/7-cest">Poznat 7 cest <ArrowRight size={17} aria-hidden="true"/></Link>
            <Link className="ps2-domains__button ps2-domains__button--outline" href="/jak-to-funguje">Jak to spolu souvisí <ArrowRight size={17} aria-hidden="true"/></Link>
          </div>
        </div>
        <p className="ps2-domains__bridge-handwriting">Různí lidé.<br/>Společný směr.<br/>Skutečná změna. ♡</p>
      </section>

      <section className="ps2-domains__practice" aria-labelledby="ps2-domains-practice-title">
        <h2 id="ps2-domains-practice-title">Oblasti v praxi</h2>
        <p>Každá oblast ožívá v projektech, misích a příbězích. Objevuj inspiraci, zapoj se a tvoř změnu ve svém okolí.</p>
        <Link className="ps2-domains__button ps2-domains__button--primary" href="/projekty">Prozkoumat projekty <ArrowRight size={17} aria-hidden="true"/></Link>
      </section>
    </div>
  </PublicShellV2>;
}
