import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "../../components/public/PublicShell";
import { EditorialFeatureBand } from "../../components/public/EditorialFeatureBand";
import { goMissionCover } from "../../domain/asset-system";

export const metadata = {
  title: "Pansofie GO",
  description: "Pansofie GO převádí poznání do misí, projektů a zkušeností ve skutečném světě.",
};

const PHASES = [
  ["01", "Poznej", "learn"], ["02", "Hraj", "play"], ["03", "Udělej", "do"],
  ["04", "Vytvoř", "create"], ["05", "Sdílej", "share"], ["06", "Reflektuj", "reflect"],
];

const ACTION_FLOW = ["Poznání", "Zkušenost", "Mise / projekt", "Portfolio / dovednost", "Skutečný dopad"];

const CONTEXTS = [
  ["Jednotlivec", "Vlastní mise, projekty, portfolio a další konkrétní krok."],
  ["Rodina", "Společné zkušenosti při zachování vlastní identity každého člověka."],
  ["Škola", "Třídy, bezpečné pozvánky, zadání a questy bez veřejného žebříčku dětí."],
  ["Komunita a organizace", "Společné projekty a role bez vytváření veřejného skóre lidí."],
];

export default function PansofieGoPublicPage() {
  return <PublicShell active="/pansofie-go">
    <div className="pg-public">
      <section className="pg-public-hero">
        <div className="pg-public-hero__copy">
          <p className="pg-public-eyebrow">PANSOFIE GO · GEOLOKAČNÍ HRA · OD POZNÁNÍ K ČINU</p>
          <h1>Město je herní mapa.</h1>
          <p>Mapa propojuje místa, checkpointy, mise a projekty ve skutečném světě. GO tě nemá držet u obrazovky. Má ti pomoct udělat další smysluplný krok venku, ve škole, doma nebo v komunitě.</p>
          <div className="pg-public-actions">
            <Link className="pg-public-primary" href="/login?next=/go">Vstoupit do Pansofie GO</Link>
            <Link className="pg-public-secondary" href="/go/mapa">Otevřít mapu</Link>
          </div>
          <small>Jeden Pansofie účet. GO nepoužívá vlastní paralelní přihlášení.</small>
        </div>
        <div className="pg-public-hero__media">
          <Image src={goMissionCover("grow-16x9")} alt="Praktická mise Pansofie GO ve skutečném prostředí" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
          <div className="pg-public-hero__badge"><span>DALŠÍ KROK</span><strong>Najdi místo. Otevři misi. Udělej něco skutečného.</strong></div>
        </div>
      </section>

      <section className="pg-public-loop" aria-labelledby="pg-loop-title">
        <div><p className="pg-public-eyebrow">QUEST RYTMUS</p><h2 id="pg-loop-title">Šest kroků. Jedna zkušenost.</h2><p>Quest drží rytmus, ne člověka pod tlakem. Jednotlivé fáze pomáhají přejít od orientace ke konkrétní zkušenosti a reflexi.</p></div>
        <ol>{PHASES.map(([index,label,phase]) => <li key={phase} data-phase={phase}><span>{index}</span><strong>{label}</strong></li>)}</ol>
      </section>

      <EditorialFeatureBand
        eyebrow="APLIKACE PRO CELÝ EKOSYSTÉM · GEOLOKAČNÍ HRA"
        title="GO není Young. Je to akční vrstva společného jádra."
        text="PansofieGO je společná aplikace pro celý ekosystém Pansofie. Young má vlastní věkově citlivou zkušenost; GO vede konkrétní akci podle role a kontextu. Young a GO proto nejsou dvě jména pro totéž."
        image={goMissionCover("create-16x9")}
        imageAlt="Pansofie GO jako praktická vrstva pro mise a projekty"
        reverse
        items={CONTEXTS}
        link={{ href: "/jak-to-funguje", label: "Jak do sebe Pansofie, Young a GO zapadají" }}
      />

      <section className="pg-public-flow">
        <div><p className="pg-public-eyebrow">OD POZNÁNÍ K DOPADU</p><h2>Poznat nestačí. Některé věci je potřeba zkusit.</h2><p>GO dává orientaci praktický další krok. Doložená dovednost potřebuje důkaz a skutečný dopad pozorování; nevznikají samotným kliknutím na „hotovo“.</p></div>
        <ol>{ACTION_FLOW.map((step,index) => <li key={step}><span>0{index+1}</span><strong>{step}</strong></li>)}</ol>
      </section>

      <section className="pg-public-contexts">
        <div className="pg-public-section-head"><p className="pg-public-eyebrow">STEJNÉ JÁDRO · RŮZNÝ KONTEXT</p><h2>GO se přizpůsobí tomu, odkud přicházíš.</h2></div>
        <div>{CONTEXTS.map(([title,text],index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="pg-public-boundaries">
        <div><p className="pg-public-eyebrow">BEZPEČÍ JE SOUČÁST HRY</p><h2>Postup ano. Veřejné hodnocení lidí ne.</h2></div>
        <div className="pg-public-boundary-grid">
          <p><strong>Soukromý herní postup</strong>XP ukazuje herní postup, ne hodnotu člověka. Odznaky jsou soukromá herní stopa, ne známka.</p>
          <p><strong>Poloha jen po tvém kroku</strong>Poloha se používá jen po aktivním spuštění uživatelem a veřejná mapa nemá ukazovat přesnou polohu dítěte ani živý pohyb lidí.</p>
          <p><strong>Školní data podle členství</strong>Role, membership a RLS rozhodují o přístupu, ne vzhled obrazovky.</p>
        </div>
      </section>

      <section className="pg-public-final">
        <p className="pg-public-eyebrow">PŘIPRAVENO?</p>
        <h2>Vyber první misi. Zbytek se ukáže cestou.</h2>
        <p>Přihlášení zachová správný osobní, rodinný nebo školní kontext. Pak už jdeš rovnou do GO.</p>
        <Link className="pg-public-primary" href="/login?next=/go">Vstoupit do Pansofie GO</Link>
      </section>
    </div>
  </PublicShell>;
}
