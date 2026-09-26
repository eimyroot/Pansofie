import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { goMissionCover } from "../../domain/asset-system";

export const metadata = {
  title: "Pansofie GO",
  description: "Geolokační hra Pansofie pro objevování míst, misí a projektů ve skutečném světě. Mapa propojuje okolí s konkrétní zkušeností.",
};

const PRINCIPLES = [
  ["Mapa", "Okolí je herní plocha. Místa a checkpointy otevírají konkrétní možnosti."],
  ["Mise", "Krátký úkol propojený s místem, tématem nebo projektem ve skutečném světě."],
  ["Pohyb", "GO má člověka dostat od obrazovky ven, ne ho udržet v nekonečném feedu."],
  ["Postup", "XP a odznaky pomáhají hře, ale nejsou hodnocením člověka ani jeho kompetence."],
];

const LOCATION_LOOP = ["Mapa", "Místo", "Mise", "Pohyb", "Zkušenost"];
const ACTION_FLOW = ["Poznání", "Zkušenost", "Mise / projekt", "Portfolio / dovednost", "Skutečný dopad"];

export default function PansofieGoPublicPage(){
  return <PublicShell active="/pansofie-go">
    <section className="pw-page-hero">
      <div><p className="pw-eyebrow">PANSOFIE GO · GEOLOKAČNÍ HRA</p><h1>Město je herní mapa.</h1><p>PansofieGO je geolokační hra pro skutečný svět. Mapa propojuje místa, checkpointy, mise a projekty kolem tebe s konkrétní zkušeností. Poloha se používá jen po aktivním spuštění uživatelem a nemá sloužit k veřejnému sledování lidí. XP ukazuje herní postup, ne hodnotu člověka, kompetenci ani peníze.</p><div className="pw-story-hero__cta"><Link className="pw-button pw-button--dark" href="/go/mapa">Otevřít mapu a mise</Link></div></div>
      <div className="pw-page-hero__media"><Image src={goMissionCover("grow-16x9")} alt="Praktická mise PansofieGO" fill priority sizes="(max-width: 900px) 100vw, 48vw"/></div>
    </section>

    <EditorialFeatureBand
      eyebrow="APLIKACE PRO CELÝ EKOSYSTÉM · GEOLOKAČNÍ HRA"
      title="GO není Young. GO je mapa, mise a hra ve skutečném světě."
      text="PansofieGO je společná aplikace pro celý ekosystém Pansofie. Její hlavní herní vrstvou je mapa: člověk objevuje místa, bezpečné checkpointy, mise a projekty podle svého kontextu. Pansofie Young má vlastní jazyk a věkově citlivou zkušenost; GO používá stejné společné jádro, ale jiné role a přiměřené rozhraní."
      image={goMissionCover("create-16x9")}
      imageAlt="PansofieGO jako praktická vrstva pro tvoření a projekty"
      reverse
      items={[["Jednotlivec", "Vlastní mise, projekty, portfolio a další smysluplný krok."], ["Rodina", "Family Team a společné projekty při zachování jednotlivých identit."], ["Škola", "Třídy, učitelé a školní projekty v bezpečném organizačním kontextu."], ["Komunita a organizace", "Společné projekty, zdroje a role bez vytváření veřejného žebříčku lidí."]]}
      link={{ href: "/jak-to-funguje", label: "Jak do sebe Pansofie, Young a GO zapadají" }}
    />

    <section className="pw-story-sequence"><div><p className="pw-eyebrow">LOCATION → GAME → EXPERIENCE</p><h2>Nejdřív okolí. Pak mise.</h2><p>GO bere skutečné místo jako vstup do hry. Poloha pomáhá seřadit relevantní checkpointy a mise, ale zůstává dočasným kontextem zařízení. Veřejná mapa nemá ukazovat přesnou polohu dítěte ani živý pohyb lidí.</p></div><ol>{LOCATION_LOOP.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}</ol></section>

    <section className="pw-story-intro"><div><p className="pw-eyebrow">GAME → EXPERIENCE → SKILL → IMPACT</p><h2>Hra je vstup. Zkušenost je podstata.</h2></div><div><p>GO může motivovat postupem a odznaky, ale skutečná hodnota vzniká až v konkrétní zkušenosti. Doložená dovednost potřebuje důkaz, projektový dopad potřebuje pozorování.</p><small>Dokončení běžné mise samo o sobě netvrdí, že člověk ovládl dovednost nebo vytvořil dopad.</small></div></section>

    <section className="pw-story-sequence"><div><p className="pw-eyebrow">OD POZNÁNÍ K DOPADU</p><h2>GO začíná tam, kde samotné čtení přestává stačit.</h2><p>Veřejná Pansofie pomáhá porozumět. GO dává této orientaci praktický další krok a umožňuje zkušenost zachytit, pokud to má smysl.</p></div><ol>{ACTION_FLOW.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}</ol></section>

    <section className="pw-story-principles">{PRINCIPLES.map(([title,text], index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</section>

    <section className="pw-story-intro"><div><p className="pw-eyebrow">STEJNÉ JÁDRO · RŮZNÉ VSTUPY</p><h2>Jedna mise může být objevena různými cestami.</h2></div><div><p>Pansofie ji může vysvětlit v souvislostech, Young ji může mladým představit vlastním jazykem a PansofieGO ji vede jako konkrétní akci. Young a GO proto nejsou dvě jména pro totéž.</p><small>Rozhraní se může měnit podle věku a role. Mise, projekt, evidence a dopad zůstávají součástí společného produktového jádra.</small></div></section>

    <section className="pw-next"><div><p className="pw-eyebrow">PRVNÍ KONKRÉTNÍ KROK</p><h2>Otevři mapu. Podívej se, co může být kolem tebe.</h2><p>GO začíná místem a až potom nabízí misi nebo projekt. První kanonická Green Hope mise ukazuje, jak se z bodu na mapě může stát praktická zkušenost. Přihlášení zachová správný účetní a organizační kontext.</p></div><Link className="pw-button pw-button--dark" href="/go/mapa">Vstoupit do mapy PansofieGO</Link></section>
  </PublicShell>;
}
