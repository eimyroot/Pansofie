import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { PansofieVisualEngine } from "../../components/public/PansofieVisualEngine";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { pansofieIllustration, pansofiePhoto } from "../../domain/asset-system";

export const metadata = {
  title: "Vize Pansofie",
  description: "Pansofia, Pampaedia a Panorthosia přeložené do současného života a praktické zkušenosti.",
};

const PILLARS = [
  ["01", "Pansofia", "Vševěda", "Poznávat svět v souvislostech.", "Spojovat informace, vlastní zkušenost, technologie, přírodu a život kolem nás místo izolovaných odpovědí."],
  ["02", "Pampaedia", "Vševýchova", "Růst a učit se celý život.", "Učení nekončí školou a nemusí proudit jedním směrem. Generace, školy, rodiny a komunity se mohou učit navzájem."],
  ["03", "Panorthosia", "Všenáprava", "Zlepšovat svět kolem sebe.", "Poznání má smysl, když může vést k dobrému činu, opravě, pomoci, znovupoužití nebo malé změně v okolí."],
];
export default function VisionPage() {
  return <PublicShell active="/vize">
    <section className="pw-visual-hero pw-visual-hero--engine">
      <div className="pw-visual-hero__copy"><p className="pw-eyebrow">VIZE PANSOFIE</p><h1>Staré pilíře. Současný život.</h1><p>Pansofie nechce starší myšlenky vystavit jako historii. Překládá je do situací, které lidé skutečně žijí dnes.</p></div>
      <div className="pw-visual-hero__engine"><PansofieVisualEngine mode="flow" kicker="VIZE PANSOFIE" title="Poznat. Růst. Zlepšovat." detail="pansofia · pampaedia · panorthosia" flow={["Pansofia","Pampaedia","Panorthosia"]}/></div>
    </section>
    <EditorialFeatureBand
      eyebrow="OD KOMENSKÉHO K DNEŠKU"
      title="Celostní myšlení má smysl jen tehdy, když obstojí v současném světě."
      text="Pansofie překládá tři tradiční pilíře do prostředí města, rodiny, školy, přírody a technologií. AI může pomáhat hledat souvislosti a tvořit, ale úsudek, odpovědnost a konečné rozhodnutí zůstávají na člověku."
      image={pansofiePhoto("prague-nature-16x9")}
      imageAlt="Město a příroda jako současný prostor pro celostní učení"
      reverse
      items={[["Poznání", "Rozumět vztahům místo hromadění izolovaných odpovědí."], ["Výchova", "Učit se napříč věkem a prostředím, ne pouze ve škole."], ["Náprava", "Převádět porozumění do konkrétní péče, tvorby a pomoci."], ["Technologie", "Používat nástroje kriticky a tvořivě, ne předávat jim lidský úsudek."]]}
      link={{ href: "/jak-to-funguje", label: "Jak se vize proměňuje ve zkušenost" }}
    />
    <section className="pw-vision-grid">
      {PILLARS.map(([n,latin,name,lead,text]) => <article key={latin}><span>{n} · {latin}</span><small>{name}</small><h2>{lead}</h2><p>{text}</p></article>)}
    </section>
    <section className="pw-story-intro">
      <div><p className="pw-eyebrow">OD MYŠLENKY K MOŽNOSTI</p><h2>Ne „splň misi“. Spíš: podívej se dál.</h2></div>
      <div><p>Pansofie nabízí různé vstupy. Pomoc druhému, znovupoužití materiálu, společný projekt nebo jen nové pochopení souvislosti. Každý člověk si sám volí, kdy a jak chce přispět.</p></div>
    </section>
    <section className="pw-next">
      <div><p className="pw-eyebrow">JEDEN RÁMEC</p><h2>Poznávat v souvislostech. Růst celý život. Zlepšovat svět kolem sebe.</h2><p>16 oblastí a 7 cest dávají této vizi současnou strukturu.</p></div>
      <Link className="pw-button pw-button--dark" href="/16-oblasti">Projít 16 oblastí</Link>
    </section>
  </PublicShell>;
}
