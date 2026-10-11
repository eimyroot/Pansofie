import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, Compass, FlaskConical, UsersRound, Cog, Share2, BookOpen, Lightbulb, Hand, Sprout, Smartphone, TreeDeciduous, House, School, Play, CheckCircle2, BarChart3, Hammer } from "lucide-react";
import { PublicShellV2 } from "../../components/public-v2/PublicShellV2";
import { HowFooterW215 } from "./HowFooterW215";
import { LEARNING_METHOD } from "../../domain/pansofie-content";
import "./how-w214.css";

export const metadata = {
  title: "Jak PANSOFIE funguje | Od poznání k praxi",
  description: "Objevuj, zkoušej, zapoj se, tvoř a sdílej. PANSOFIE propojuje poznání, zkušenosti, komunitu a reálné projekty bez povinného skórování člověka.",
};

const STEPS = Object.freeze([
  { title:"Objev", icon:Sprout, description:"Poznej témata, která tě zajímají, a objev nové možnosti.", href:"/16-oblasti", link:"Prozkoumat oblasti", atlas:0 },
  { title:"Vyzkoušej", icon:FlaskConical, description:"Zapoj se do aktivit, workshopů a výzev. Udělej krok bez povinnosti všechno dokumentovat.", href:"/labs", link:"Objevit laboratoře", atlas:1 },
  { title:"Zapoj se", icon:UsersRound, description:"Najdi své lidi a přidej se do komunity. Spolupráce je možnost, ne povinnost.", href:"/komunita", link:"Poznat komunitu", atlas:2 },
  { title:"Vytvoř", icon:Cog, description:"Přetav své nápady do skutečných projektů a nauč se něco vlastní zkušeností.", href:"/projekty", link:"Prohlédnout projekty", atlas:3 },
  { title:"Sdílej", icon:Share2, description:"Inspiruj ostatní a ukaž, co vzniklo, pokud sám chceš. Sdílení není povinné.", href:"/blog", link:"Objevovat příběhy", atlas:4 },
]);

const METHOD = Object.freeze([
  { icon:BookOpen, description:"Získej nové poznatky a nadhled.", tone:"leaf" },
  { icon:Lightbulb, description:"Objevuj hravě a s radostí.", tone:"sun" },
  { icon:Hand, description:"Vyzkoušej v praxi a uč se ze zkušenosti.", tone:"clay" },
  { icon:Sprout, description:"Přetav poznání v něco skutečného.", tone:"rose" },
  { icon:UsersRound, description:"Inspiruj, zapoj ostatní a šiř dobré nápady.", tone:"mint" },
  { icon:Compass, description:"Zastav se, vnímej a objev, co dál.", tone:"sky" },
]);

const ECOSYSTEM = Object.freeze([
  { title:"PANSOFIE", subtitle:"Pro všechny generace a komunity", description:"Společný rámec poznání, osobního rozvoje, tvoření a komunitních projektů pro jednotlivce, rodiny, školy a organizace.", icon:TreeDeciduous, atlas:5, href:"/o-nas", link:"Více o PANSOFIE" },
  { title:"PANSOFIE YOUNG", subtitle:"Pro děti a mladé 6–18 let", description:"Pansofie Young je samostatná zkušenost pro děti a mladé. Učí hravě, bezpečně a přiměřeně věku.", icon:Sprout, atlas:6, href:"/young", link:"Objev PANSOFIE YOUNG" },
  { title:"PANSOFIE GO", subtitle:"Aplikace a reálné mise", description:"PansofieGO je aplikace pro celý ekosystém. Pomáhá s misemi, projekty, týmy a portfoliem podle věku a role.", icon:Smartphone, atlas:7, href:"/pansofie-go", link:"Poznej PANSOFIE GO" },
]);

const IMPACT = Object.freeze([
  { title:"Nápad", text:"Všechno začíná otázkou, která tě zajímá.", icon:Lightbulb, atlas:8 },
  { title:"Tým", text:"Najdi parťáky, sdílej nápad a společně ho rozvíjej.", icon:UsersRound, atlas:9 },
  { title:"Realizace", text:"Vyzkoušejte, tvořte, učte se z praxe a překonávejte výzvy.", icon:Hammer, atlas:10 },
  { title:"Dopad", text:"Výsledky sdílej, inspiruj ostatní a přidej je do svého portfolia.", icon:BarChart3, atlas:11 },
]);

const PLACES = Object.freeze([
  { title:"Ve škole", text:"Propojujeme klasické vzdělávání s reálnými projekty a zkušenostmi.", icon:School, atlas:12, href:"/pro-skoly", link:"PANSOFIE pro školy", tone:"mint" },
  { title:"V rodině", text:"Podporujeme společné učení, rozhovory a zážitky napříč generacemi.", icon:House, atlas:13, href:"/family-team", link:"Objev Family Team", tone:"sun" },
  { title:"V komunitě", text:"Tvoříme s místními, řešíme skutečné výzvy a budujeme lepší místa pro život.", icon:UsersRound, atlas:14, href:"/komunita", link:"Poznej komunitu", tone:"mint" },
  { title:"V přírodě", text:"Příroda je náš učitel. Dává nadhled, klid a inspiraci.", icon:TreeDeciduous, atlas:15, href:"/green-hope", link:"Objev Green Hope", tone:"leaf" },
]);

function PhotoTile({ index, className = "", label }) {
  const row=Math.floor(index/4);
  const col=index%4;
  return <div className={"ps2-how__photo "+className} role="img" aria-label={label}
    style={{backgroundPosition:`${col*100/3}% ${row*100/3}%`}}/>;
}

export default function HowItWorksPage() {
  if (LEARNING_METHOD.length !== METHOD.length) throw new Error("Učební cyklus PANSOFIE neodpovídá šesti kanonickým fázím.");
  return <PublicShellV2 currentPath="/jak-to-funguje" footer={<HowFooterW215/>}>
    <div className="ps2-how">
      <section className="ps2-how__hero" aria-labelledby="ps2-how-title">
        <Image className="ps2-how__hero-image" src="/assets/brand-v2/editorial/w215-how-hero.avif"
          alt="Mezigenerační skupina při společném tvoření, práci s rostlinami a výrobě ptačí budky ve světlém skleníku"
          fill priority quality={85} sizes="100vw"/>
        <div className="ps2-how__hero-shade" aria-hidden="true"/>
        <p className="ps2-how__chalk" aria-hidden="true">Učíme se<br/>tím, co žijeme. ♡</p>
        <div className="ps2-how__hero-content">
          <p className="ps2-how__eyebrow">CESTA K SMYSLUPLNĚJŠÍ BUDOUCNOSTI</p>
          <h1 id="ps2-how-title">Jak to funguje</h1>
          <p>PANSOFIE propojuje poznání, praxi, tvoření a komunitu. Učíme se celým životem, ve skutečném světě, s reálnými lidmi, na skutečných výzvách. Každý může přispět svým jedinečným způsobem, ve svém tempu a tam, kde právě je.</p>
          <div className="ps2-how__actions">
            <a className="ps2-how__button ps2-how__button--green" href="#pet-kroku">Objev možnosti <ArrowDown size={17} aria-hidden="true"/></a>
            <Link className="ps2-how__button ps2-how__button--light" href="/blog"><Play size={16} aria-hidden="true"/> Podívej se na příběhy</Link>
          </div>
          <p className="ps2-how__script-hero">Skutečné vzdělávání začíná, když to, co se učíme, začneme žít. ♡</p>
        </div>
      </section>

      <section className="ps2-how__five" id="pet-kroku" aria-labelledby="ps2-how-five-title">
        <div className="ps2-how__section-heading">
          <div><h2 id="ps2-how-five-title">Pět dobrovolných kroků</h2>
            <p>Nejde o pevnou trasu, ale o otevřenou cestu. Každý krok můžeš udělat ve svém čase a svým způsobem.</p>
          </div>
          <p className="ps2-how__handwriting">Malé kroky,<br/>velké změny. ♡</p>
        </div>
        <div className="ps2-how__five-grid">
          {STEPS.map((step,i)=>{const Icon=step.icon;return <article className="ps2-how__step" key={step.title}>
            <div className="ps2-how__step-head"><span>{i+1}</span><Icon size={28} aria-hidden="true"/></div>
            <h3>{step.title}</h3><p>{step.description}</p>
            <PhotoTile index={step.atlas} className="ps2-how__step-photo" label={"Fotografie k tématu "+step.title}/>
            <Link href={step.href} className="ps2-how__step-arrow" aria-label={step.link}><ArrowRight size={18} aria-hidden="true"/></Link>
          </article>})}
        </div>
        <p className="ps2-how__principle"><CheckCircle2 size={18} aria-hidden="true"/> Pansofie nabízí příležitost, nevytváří povinnost. Nehodnotíme hodnotu člověka jedním číslem ani nevynucujeme sdílení.</p>
      </section>

      <section className="ps2-how__method ps2-how__method--banner" id="metoda" aria-labelledby="ps2-how-method-title">
        <h2 className="ps2-how__visually-hidden" id="ps2-how-method-title">Pansofie Method</h2>
        <div className="ps2-how__method-banner-wrap">
          <Image className="ps2-how__method-banner" src="/assets/brand-v2/editorial/w215-how-method.webp" unoptimized
            width={2048} height={682} sizes="(max-width: 780px) 1050px, 100vw"
            alt="Pansofie Method: šest fází Poznej, Hraj, Udělej, Vytvoř, Sdílej a Reflektuj, propojených šipkami a opakujícím se cyklem. Učíme se skrze zkušenost, v každém věku a v každé oblasti života." quality={85}/>
        </div>
        <ol className="ps2-how__method-grid ps2-how__visually-hidden">
          {LEARNING_METHOD.map((step,i)=><li key={step}>{step}: {METHOD[i].description}</li>)}
        </ol>
      </section>

      <section className="ps2-how__ecosystem" id="ekosystem" aria-labelledby="ps2-how-ecosystem-title">
        <div className="ps2-how__exact ps2-how__exact--ecosystem">
          <Image src="/assets/brand-v2/editorial/w214-exact-ecosystem.avif" width={2032} height={774} unoptimized
            alt="Tři části PANSOFIE: hlavní ekosystém pro všechny generace; YOUNG pro děti 6–18 let; GO aplikace pro reálné mise. Na obrázku komunitní setkání, dílna mladých a ilustrativní telefon."/>
          <Link className="ps2-how__exact-hit ps2-how__exact-hit--main" href="/o-nas" aria-label="Více o PANSOFIE"><span className="ps2-how__visually-hidden">Více o PANSOFIE</span></Link>
          <Link className="ps2-how__exact-hit ps2-how__exact-hit--young" href="/young" aria-label="Objev PANSOFIE YOUNG"><span className="ps2-how__visually-hidden">Objev PANSOFIE YOUNG</span></Link>
          <Link className="ps2-how__exact-hit ps2-how__exact-hit--go" href="/pansofie-go" aria-label="Vyzkoušej PANSOFIE GO"><span className="ps2-how__visually-hidden">Vyzkoušej PANSOFIE GO</span></Link>
        </div>
        <div className="ps2-how__fallback ps2-how__fallback--ecosystem">

        <div className="ps2-how__section-heading"><div><h2 id="ps2-how-ecosystem-title">Tři části jednoho ekosystému</h2>
          <p>Jeden společný rámec, různé způsoby poznávání a jednání.</p></div><p className="ps2-how__handwriting">Různé cesty,<br/>společný smysl. ♡</p></div>
        <div className="ps2-how__ecosystem-grid">
          {ECOSYSTEM.map((item)=>{const Icon=item.icon;return <article className="ps2-how__ecosystem-card" key={item.title}>
            <PhotoTile index={item.atlas} className="ps2-how__ecosystem-photo" label={"Ilustrační fotografie pro "+item.title}/>
            <div className="ps2-how__ecosystem-copy"><Icon size={30} aria-hidden="true"/><h3>{item.title}</h3><strong>{item.subtitle}</strong>
              <p>{item.description}</p>
              {item.atlas===7&&<small>Ilustrační vizuál, nikoli ověřený snímek rozhraní aplikace.</small>}
              <Link className="ps2-how__button ps2-how__button--green" href={item.href}>{item.link} <ArrowRight size={17} aria-hidden="true"/></Link>
            </div>
          </article>})}
        </div>
              </div>
      </section>

      <section className="ps2-how__impact" id="od-napadu-k-dopadu" aria-labelledby="ps2-how-impact-title">
        <div className="ps2-how__exact ps2-how__exact--impact">
          <Image src="/assets/brand-v2/editorial/w214-exact-impact.avif" width={2048} height={684} unoptimized
            alt="Od nápadu k dopadu: nápad zlepšit prostředí u řeky, týmové plánování, společná stavba hmyzího hotelu a výsledek pro místní komunitu."/>
        </div>
        <div className="ps2-how__fallback ps2-how__fallback--impact">

        <div className="ps2-how__section-heading"><div><h2 id="ps2-how-impact-title">Od nápadu k dopadu</h2>
          <p>Jak se z myšlenky stává skutečný projekt? Na příkladu jedné z mnoha možných misí.</p></div></div>
        <ol className="ps2-how__impact-grid">
          {IMPACT.map((step,i)=>{const Icon=step.icon;return <li className="ps2-how__impact-item" key={step.title}>
            <PhotoTile index={step.atlas} className="ps2-how__impact-photo" label={"Ilustrační krok "+step.title}/>
            <div className="ps2-how__impact-copy"><span className="ps2-how__impact-number">{i+1}</span><Icon size={24} aria-hidden="true"/><div><h3>{step.title}</h3><p>{step.text}</p></div></div>
            {i<3&&<ArrowRight className="ps2-how__impact-arrow" size={19} aria-hidden="true"/>}
          </li>})}
        </ol>
        <Link href="/projekty" className="ps2-how__text-link">Prozkoumat skutečné projekty <ArrowRight size={16} aria-hidden="true"/></Link>
              </div>
      </section>

      <section className="ps2-how__places" id="ucime-se-vsude" aria-labelledby="ps2-how-places-title">
        <div className="ps2-how__exact ps2-how__exact--places">
          <Image src="/assets/brand-v2/editorial/w214-exact-places.avif" width={2048} height={684} unoptimized
            alt="Učíme se všude: ve škole při projektové výuce, v rodině při zahradničení, v komunitě při společné práci a v přírodě u lesního potoka."/>
        </div>
        <div className="ps2-how__fallback ps2-how__fallback--places">

        <div className="ps2-how__section-heading"><div><h2 id="ps2-how-places-title">Učíme se všude – ve škole, v rodině, v komunitě i v přírodě</h2></div>
          <p className="ps2-how__handwriting">Život je ta<br/>nejlepší škola. ♡</p></div>
        <div className="ps2-how__places-grid">
          {PLACES.map(item=>{const Icon=item.icon;return <article className="ps2-how__place" key={item.title}>
            <PhotoTile index={item.atlas} className="ps2-how__place-photo" label={"Ilustrační fotografie "+item.title}/>
            <div className="ps2-how__place-content"><span className={"ps2-how__place-icon ps2-how__tone--"+item.tone}><Icon size={24} aria-hidden="true"/></span>
              <div><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href} aria-label={item.link}>Zjistit více <ArrowRight size={15} aria-hidden="true"/></Link></div></div>
          </article>})}
        </div>
              </div>
      </section>

      <section className="ps2-how__join" aria-labelledby="ps2-how-join-title">
        <Image src="/assets/brand-v2/editorial/w214-how-join.avif" className="ps2-how__join-photo"
          alt="Lidé společně tvoří a učí se při komunitní dílně" fill sizes="100vw" quality={85}/>
        <div className="ps2-how__join-shade" aria-hidden="true"/>
        <div className="ps2-how__join-content">
          <h2 id="ps2-how-join-title">Začni tam, kde právě jsi.</h2>
          <p>Objev možnosti, přidej se do komunity a buď součástí změn, které dávají smysl.</p>
          <div className="ps2-how__actions">
            <Link className="ps2-how__button ps2-how__button--green" href="/kontakt">Přidej se k PANSOFIE <ArrowRight size={17} aria-hidden="true"/></Link>
            <Link className="ps2-how__button ps2-how__button--light" href="/pansofie-go"><Play size={16} aria-hidden="true"/> Prozkoumej mise</Link>
          </div>
        </div>
        <p className="ps2-how__join-script">Lidé.<br/>Nápady.<br/>Příroda.<br/>Skutečný dopad. ♡</p>
      </section>
    </div>
  </PublicShellV2>;
}
