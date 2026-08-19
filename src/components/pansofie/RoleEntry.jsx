import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Eye,
  EyeOff,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Network,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import SectionHeading from "@/components/pansofie/SectionHeading";

const ACTORS = [
  {
    id: "learner",
    label: "Žák / mladý člověk",
    short: "Žák",
    icon: GraduationCap,
    status: "Součást prvního pilotu",
    purpose: "Dělá skutečnou práci, učí se z ní a vytváří si vlastní doloženou cestu zkušeností.",
    does: ["vybírá nebo přijímá smysluplnou Experience", "pracuje s týmem na konkrétním výstupu", "dokládá práci a reflektuje, co se naučil"],
    receives: ["reálnou zkušenost místo další abstraktní úlohy", "zpětnou vazbu k práci, ne k lidské hodnotě", "soukromý Experience Passport a jasný další krok"],
    contributes: ["vlastní pohled, otázky a rozhodnutí", "týmovou práci a konkrétní výstup", "důkaz a vlastní reflexi"],
    sees: ["svou Experience, týmový úkol a domluvené kroky", "vlastní důkazy, reflexi a ověřené záznamy", "zpětnou vazbu určenou k jeho práci"],
    notSees: ["žádné skryté skóre osobnosti nebo budoucí kariéry", "cizí soukromé reflexe", "neomezené soukromé kanály k dospělým"],
    boundary: "Pansofie nepočítá lidskou hodnotu. Hodnotí se jen doložená práce v konkrétním kontextu a reflexe zůstává vlastnictvím člověka.",
    missions: ["Zlepši svou školu", "Navrhni řešení místního problému", "Vytvoř něco užitečného pro druhé"],
    cta: { to: "/zapojit-se?role=learner", label: "Projít Pansofii jako mladý člověk" },
  },
  {
    id: "family",
    label: "Rodina",
    short: "Rodina",
    icon: HeartHandshake,
    status: "Zapojení v prvním pilotu",
    purpose: "Přidává životní kontext a podporu, aniž by přebírala práci nebo soukromý prostor mladého člověka.",
    does: ["přináší podnět z běžného života", "pomáhá otevřít kontakt nebo zdroj", "podporuje dokončení Experience bez řízení výsledku"],
    receives: ["srozumitelný kontext, co se právě děje", "bezpečnou a smysluplnou roli", "možnost dát zpětnou vazbu k fungování pilotu"],
    contributes: ["zkušenost z reálného života", "dobrovolný podnět, kontakt nebo zdroj", "podporu a zpětnou vazbu"],
    sees: ["to, co je pro rodinu účelně sdílené", "stav a kontext zapojení", "veřejné nebo výslovně sdílené výstupy"],
    notSees: ["soukromou reflexi automaticky", "skryté hodnocení dítěte", "víc dat, než vyžaduje konkrétní účel"],
    boundary: "Rodina podporuje, ale nepřebírá Experience. Soukromá reflexe mladého člověka není automaticky rodinný report.",
    missions: ["Rodinný rozpočet v praxi", "Mezigenerační příběh a dovednost", "Zlepšení každodenního fungování doma"],
    cta: { to: "/zapojit-se?role=family", label: "Zjistit, jak může pomoci rodina" },
  },
  {
    id: "school",
    label: "Škola",
    short: "Škola",
    icon: Building2,
    status: "Digitální workflow je připravené",
    purpose: "Drží bezpečný rámec, propojuje Experience s výukou a ověřuje, zda je postup použitelný v reálném školním provozu.",
    does: ["vybírá vhodný rámec a skupinu", "vede Experience a sleduje jasné kroky", "ověřuje doložený výstup a provozní použitelnost"],
    receives: ["jasný učitelský postup a návaznost na výuku", "přehled o průběhu bez jednoho skóre člověka", "podklady pro vyhodnocení pilotu"],
    contributes: ["pedagogický rámec a bezpečný dohled", "skutečné školní potřeby", "ověření, co funguje a co učitele zatěžuje"],
    sees: ["školní Experience, týmový postup a určené výstupy", "důkazy potřebné k ověření práce", "Partner feedback, adoption a outcome v povoleném rozsahu"],
    notSees: ["právo přepisovat soukromou reflexi", "jedno souhrnné skóre člověka", "data bez vzdělávacího nebo bezpečnostního účelu"],
    boundary: "Škola ověřuje práci a drží bezpečí. Pansofie z toho nevytváří univerzální profil dítěte ani predikci jeho budoucnosti.",
    missions: ["Zlepši svou školu", "Circular Challenge", "Projekt s místním partnerem"],
    cta: { to: "/pilot", label: "Prozkoumat školní pilot" },
  },
  {
    id: "mentor",
    label: "Mentor / odborník",
    short: "Mentor",
    icon: UserRoundCheck,
    status: "Zapojení pod jasným dohledem",
    purpose: "Přináší expertizu do konkrétní práce, ne neomezený osobní přístup k dítěti.",
    does: ["klade odborné otázky", "dává zpětnou vazbu k výstupu", "pomáhá zpřesnit realistický další krok"],
    receives: ["konkrétní zadání a jasnou roli", "smysluplné zapojení do skutečné práce", "omezený kontext nutný pro odbornou pomoc"],
    contributes: ["know-how a praktickou zkušenost", "realistické standardy kvality", "časově ohraničenou zpětnou vazbu"],
    sees: ["zadání, výstup a kontext nutný pro mentoring", "informace výslovně určené pro jeho roli"],
    notSees: ["soukromý profil dítěte", "neomezený soukromý chat", "data mimo účel konkrétní Experience"],
    boundary: "Mentoring je role v konkrétní Experience. Není to otevřený soukromý kanál mezi dospělým a dítětem.",
    missions: ["Odborná konzultace prototypu", "Kariérní realita konkrétní profese", "Technická zpětná vazba k řešení"],
    cta: { to: "/zapojit-se?role=mentor", label: "Zjistit roli mentora" },
  },
  {
    id: "partner",
    label: "Firma / organizace",
    short: "Partner",
    icon: BriefcaseBusiness,
    status: "Challenge → Review → rozhodnutí",
    purpose: "Přináší skutečný problém, zpětnou vazbu a možnost výsledek vyzkoušet — bez kupování výsledku nebo přístupu k dítěti.",
    does: ["zadá ohraničenou Challenge", "reviewuje bezpečný Partner deliverable proti briefu", "volí NOT ADOPT / EXPLORE FURTHER / PILOT a případně reportuje Outcome"],
    receives: ["konkrétní týmový výstup k reálnému problému", "transparentní revize místo slibu pozitivního výsledku", "možnost rozhodnout, zda má smysl další krok"],
    contributes: ["reálnou výzvu a kontext", "čas odborníka a zpětnou vazbu", "případnou možnost pilotního použití"],
    sees: ["Challenge brief a bounded Partner deliverable", "review/adoption/outcome informace určené Partnerovi", "to, co škola vědomě připravila pro Partner review"],
    notSees: ["learner raw evidence", "soukromou reflexi nebo Passport", "automatické právo na osobní data nebo vlastnictví práce"],
    boundary: "Partner hodnotí výstup proti zadání, nikdy lidskou hodnotu. PILOT je rozhodnutí o dalším kroku, ne důkaz Impactu.",
    missions: ["Circular Challenge", "Zlepšení reálného procesu", "Komunitní nebo environmentální zadání"],
    cta: { to: "/partneri", label: "Jak funguje partnerství" },
  },
  {
    id: "community",
    label: "Obec / komunita",
    short: "Komunita",
    icon: Landmark,
    status: "Zapojení podle konkrétní Experience",
    purpose: "Přináší místní potřebu a prostředí, ve kterém může mít práce skutečného příjemce a další použití.",
    does: ["pojmenuje konkrétní místní potřebu", "zpřístupní kontext a relevantní zdroje", "pomůže ověřit, zda je výstup použitelný"],
    receives: ["pozornost k reálnému místnímu problému", "návrh nebo výstup s jasným vlastníkem", "možnost navázat pilotem nebo dalším ověřením"],
    contributes: ["místní znalost a potřebu", "prostředí, kontakty nebo bezpečně vymezená data", "možnost výsledek vyzkoušet"],
    sees: ["výstup určený pro komunitní použití", "dohodnutý postup a výsledek ověření"],
    notSees: ["soukromé dětské údaje", "automatický přístup k reflexi", "tvrzení o Impactu bez skutečné outcome evidence"],
    boundary: "Veřejný přínos se dokládá postupně. Samotné dokončení projektu není automaticky důkaz společenského dopadu.",
    missions: ["Zlepši veřejné místo", "Najdi řešení lokální potřeby", "Propoj generace kolem konkrétního úkolu"],
    cta: { to: "/zapojit-se?role=community", label: "Přinést místní potřebu" },
  },
];

const FLOW = ["Potřeba", "Experience", "Výstup", "Ověření", "Další rozhodnutí", "Outcome"];

function BulletList({ items, icon: Icon = Check, muted = false }) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item} className={`flex gap-2.5 text-sm leading-relaxed ${muted ? "text-muted-foreground" : "text-foreground"}`}>
          <Icon size={15} className="shrink-0 mt-1 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function RoleEntry() {
  const [selectedId, setSelectedId] = useState("learner");
  const selected = useMemo(() => ACTORS.find((actor) => actor.id === selectedId) || ACTORS[0], [selectedId]);
  const SelectedIcon = selected.icon;

  return (
    <section id="ekosystem" className="role-explorer-section py-20 sm:py-28 border-t border-border/60 scroll-mt-24">
      <div className="container-px max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="02 · KDO JE SOUČÁSTÍ EXPERIENCE"
          title="Stejná Experience. Šest různých rolí. Každá přesně ví, proč tam je."
          subtitle="Pansofie nestaví další sociální síť. Každá role má konkrétní práci, přínos, přístup k datům a bezpečnou hranici. Přepněte roli a uvidíte celý její vztah k Experience."
          center
        />

        <div className="mt-10 overflow-x-auto -mx-5 px-5 pb-2 no-scrollbar">
          <div className="flex lg:grid lg:grid-cols-6 gap-2 min-w-max lg:min-w-0">
            {ACTORS.map((actor) => {
              const Icon = actor.icon;
              const active = actor.id === selected.id;
              return (
                <button
                  key={actor.id}
                  type="button"
                  data-role={actor.id}
                  data-selected={active}
                  onClick={() => setSelectedId(actor.id)}
                  onFocus={() => setSelectedId(actor.id)}
                  aria-pressed={active}
                  className={`role-card min-w-[150px] lg:min-w-0 rounded-2xl p-3.5 text-left ${active ? "ring-1 ring-[hsl(var(--role-accent)/0.28)]" : ""}`}
                >
                  <span className="role-icon h-9 w-9 rounded-xl"><Icon size={17} /></span>
                  <p className="mt-3 font-semibold text-sm leading-snug">{actor.short}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-snug line-clamp-2">{actor.status}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div data-role={selected.id} className="role-relationship-map mt-6" aria-label={`Vztah role ${selected.label} k Experience`}>
          <div key={`${selected.id}-source`} className="role-map-node role-map-node--actor">
            <span className="role-icon h-11 w-11 rounded-2xl"><SelectedIcon size={20} /></span>
            <div>
              <p className="role-map-kicker">Přináší do Experience</p>
              <p className="role-map-title">{selected.short}</p>
              <p className="role-map-copy">{selected.contributes[0]}</p>
            </div>
          </div>

          <div className="role-map-connector" aria-hidden="true"><span /></div>

          <div className="role-map-core">
            <span className="role-map-core-glow" aria-hidden="true" />
            <Network size={22} />
            <p>EXPERIENCE</p>
            <small>společná práce · oddělené přístupy</small>
          </div>

          <div className="role-map-connector role-map-connector--out" aria-hidden="true"><span /></div>

          <div key={`${selected.id}-result`} className="role-map-node role-map-node--result">
            <span className="role-map-result-icon"><Check size={18} /></span>
            <div>
              <p className="role-map-kicker">Získává z Experience</p>
              <p className="role-map-title">Konkrétní hodnotu</p>
              <p className="role-map-copy">{selected.receives[0]}</p>
            </div>
          </div>

          <div className="role-map-boundary">
            <ShieldCheck size={16} />
            <span>{selected.boundary}</span>
          </div>
        </div>

        <article data-role={selected.id} className="mt-6 overflow-hidden rounded-[2rem] border border-[hsl(var(--role-accent)/0.28)] bg-card shadow-[0_28px_70px_-52px_hsl(var(--role-accent)/0.7)]">
          <div key={selected.id} className="role-panel-enter grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="relative p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border/70 bg-[linear-gradient(145deg,hsl(var(--card)),hsl(var(--role-accent)/0.06))]">
              <div className="absolute inset-x-0 top-0 h-1 bg-[hsl(var(--role-accent))]" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <span className="role-icon h-14 w-14 rounded-2xl"><SelectedIcon size={25} /></span>
                <span className="role-chip">{selected.status}</span>
              </div>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--role-accent))]">Role v Experience</p>
              <h3 className="mt-2 text-3xl sm:text-4xl font-semibold font-display tracking-tight">{selected.label}</h3>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{selected.purpose}</p>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Co skutečně dělá</p>
                <div className="mt-3"><BulletList items={selected.does} /></div>
              </div>

              <div className="mt-8 rounded-2xl border border-[hsl(var(--role-accent)/0.2)] bg-[hsl(var(--role-accent)/0.055)] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={19} className="shrink-0 mt-0.5 text-[hsl(var(--role-accent))]" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[hsl(var(--role-accent))]">Bezpečná hranice</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{selected.boundary}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <section className="surface-subtle smart-hover-surface p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Získává</p>
                  <div className="mt-4"><BulletList items={selected.receives} muted /></div>
                </section>
                <section className="surface-subtle smart-hover-surface p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Přináší</p>
                  <div className="mt-4"><BulletList items={selected.contributes} muted /></div>
                </section>
                <section className="surface-subtle smart-hover-surface p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-primary"><Eye size={16} aria-hidden="true" /><p className="text-[11px] font-semibold uppercase tracking-[0.14em]">Vidí</p></div>
                  <div className="mt-4"><BulletList items={selected.sees} muted /></div>
                </section>
                <section className="surface-subtle smart-hover-surface p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-muted-foreground"><EyeOff size={16} aria-hidden="true" /><p className="text-[11px] font-semibold uppercase tracking-[0.14em]">Nevidí / nemá automaticky</p></div>
                  <div className="mt-4"><BulletList items={selected.notSees} muted /></div>
                </section>
              </div>

              <section className="mt-4 rounded-2xl border border-border/70 bg-background/65 p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Příklady Experience</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.missions.map((mission) => <span key={mission} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold">{mission}</span>)}
                </div>
              </section>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-foreground text-background p-5 sm:p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-background/55">Další krok</p>
                  <p className="mt-1 font-semibold">Podívejte se na Pansofii z této role.</p>
                </div>
                <Link to={selected.cta.to} className="role-cta-glow inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-background px-4 py-2.5 text-sm font-semibold text-foreground shrink-0">
                  {selected.cta.label} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        <div className="experience-lifecycle mt-6" aria-label="Životní cyklus Experience">
          {FLOW.map((item, index) => (
            <React.Fragment key={item}>
              <div className="experience-lifecycle-node">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
              {index < FLOW.length - 1 && <div className="experience-lifecycle-line" aria-hidden="true"><i /></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
