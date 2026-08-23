import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Boxes,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  HandHeart,
  HeartHandshake,
  Leaf,
  RefreshCw,
  School,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { listMyOrganizationMemberships, listTeacherSchoolRuns } from "@/lib/pansofieExperienceFlow";
import { listMyPartnerChallenges, listMyPartnerOrganizations } from "@/lib/pansofiePartnerFlow";
import { listMyMaterialListings } from "@/lib/pansofieParticipationFlow";

const SCHOOL_MICRO_MISSIONS = [
  {
    title: "První krok z labyrintu",
    level: "START",
    task: "Vyzkoušejte ve třídě ukázkovou lekci kritického myšlení a po hodině si zapište, co žáky překvapilo a kde potřebovali více důkazů.",
    status: "Pracovní mikro-výzva — není to bodovaná mise ani certifikace.",
    href: "/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md",
    action: "Stáhnout ukázkovou lekci",
  },
  {
    title: "Mosty místo zdí",
    level: "DIALOG",
    task: "Použijte cvičení Stavitelé mostů na bezpečném třídním tématu a sledujte, zda žáci dokážou férově popsat i opačný pohled.",
    status: "Pracovní mikro-cvičení mimo tři canonical Field Pilot Experiences.",
    href: "/materials/pansofie-stavitele-mostu-dialog.md",
    action: "Otevřít cvičení",
  },
  {
    title: "Cirkulární tvoření",
    level: "DOPAD",
    task: "Najděte materiál, který může dostat druhý život, a propojte ho s konkrétním projektem ve škole. Výsledek doložte až po skutečném předání a využití.",
    status: "Navazuje na Circular Challenge a Materiálový most.",
    to: "/materialovy-most/workspace",
    action: "Otevřít Materiálový most",
  },
];

const COMPANY_CHALLENGES = [
  {
    title: "Restart pozornosti",
    label: "TÝMOVÝ EXPERIMENT",
    text: "Vyzkoušejte jeden ohraničený blok soustředěné práce bez zbytečných interních vyrušení a vyhodnoťte, co skutečně pomohlo.",
    href: "/materials/pansofie-restart-pozornosti-team-guide.md",
    action: "Stáhnout průvodce",
  },
  {
    title: "Etický kompas",
    label: "AI / INOVACE",
    text: "Projděte konkrétní technologii přes otázky dopadu, dat, lidské kontroly a nejistoty. Výsledkem není certifikát, ale seznam doložených rizik a dalších kroků.",
    href: "/materials/pansofie-eticky-kompas-ai-checklist.md",
    action: "Stáhnout checklist",
  },
];

export default function RoleDashboard() {
  const { user, profile } = useAuth();
  const { locale } = useLanguage();
  const [mode, setMode] = useState("school");
  const [memberships, setMemberships] = useState([]);
  const [schoolRuns, setSchoolRuns] = useState([]);
  const [partnerOrganizations, setPartnerOrganizations] = useState([]);
  const [partnerChallenges, setPartnerChallenges] = useState([]);
  const [materialListings, setMaterialListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");

  const schoolMemberships = useMemo(() => memberships.filter((m) => ["teacher", "coordinator"].includes(m.role) && m.status === "active"), [memberships]);
  const partnerMemberships = useMemo(() => memberships.filter((m) => m.role === "partner_contact" && m.status === "active"), [memberships]);
  const canSchool = schoolMemberships.length > 0;
  const canPartner = partnerMemberships.length > 0 || partnerOrganizations.length > 0;

  const load = async () => {
    if (!user?.id) return;
    setLoading(true);
    setWarning("");
    try {
      const membershipRows = await listMyOrganizationMemberships(user.id);
      setMemberships(membershipRows);
      const schoolOrgs = membershipRows.filter((m) => ["teacher", "coordinator"].includes(m.role) && m.status === "active").map((m) => m.organization_id);
      const isPartner = membershipRows.some((m) => m.role === "partner_contact" && m.status === "active");

      const [runsResult, orgResult, challengesResult, materialsResult] = await Promise.allSettled([
        schoolOrgs.length ? listTeacherSchoolRuns(schoolOrgs) : Promise.resolve([]),
        isPartner ? listMyPartnerOrganizations() : Promise.resolve([]),
        isPartner ? listMyPartnerChallenges() : Promise.resolve([]),
        listMyMaterialListings(user.id),
      ]);
      setSchoolRuns(runsResult.status === "fulfilled" ? runsResult.value : []);
      setPartnerOrganizations(orgResult.status === "fulfilled" ? orgResult.value : []);
      setPartnerChallenges(challengesResult.status === "fulfilled" ? challengesResult.value : []);
      setMaterialListings(materialsResult.status === "fulfilled" ? materialsResult.value : []);
      if ([runsResult, orgResult, challengesResult, materialsResult].some((item) => item.status === "rejected")) {
        setWarning(locale === "en" ? "Some pilot data is not available in this environment. No missing state is being guessed." : "Část pilotních dat není v tomto prostředí dostupná. Chybějící stav nedoplňujeme odhadem.");
      }

      if (!schoolOrgs.length && isPartner) setMode("partner");
      else if (schoolOrgs.length) setMode("school");
    } catch (err) {
      setWarning(locale === "en" ? "The role dashboard could not load membership data. No synthetic progress is shown." : "Nástěnka nedokázala načíst membership data. Nezobrazujeme proto žádný smyšlený pokrok.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const waitingReview = schoolRuns.filter((run) => run.status === "submitted").length;
  const activeSchool = schoolRuns.filter((run) => ["assigned", "in_progress"].includes(run.status)).length;
  const activeChallenges = partnerChallenges.filter((item) => ["submitted", "ready", "active", "needs_work"].includes(item.challenge_status)).length;
  const materialAvailable = materialListings.filter((item) => item.status === "available").length;
  const schoolName = schoolMemberships[0]?.organizations?.name || (locale === "en" ? "your school" : "vaše škola");
  const companyName = partnerOrganizations[0]?.organization_name || partnerMemberships[0]?.organizations?.name || (locale === "en" ? "your organization" : "vaše organizace");

  return (
    <div className="r14-role-dashboard">
      <header className="r14-dashboard-header">
        <div>
          <p className="eyebrow">PANSOFIE · ROLE DASHBOARD</p>
          <h1>{locale === "en" ? `Welcome, ${profile?.name || "Pansofie member"}.` : `Dobrý den, ${profile?.name || "člene Pansofie"}.`}</h1>
          <p>{locale === "en" ? "Your dashboard shows only states we can derive from real memberships and workflow records." : "Nástěnka ukazuje pouze stavy, které umíme odvodit ze skutečných membershipů a workflow záznamů."}</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="action-secondary"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> {locale === "en" ? "Refresh" : "Obnovit"}</button>
      </header>

      {warning && <div className="r14-dashboard-warning"><ShieldCheck size={18} /><span>{warning}</span></div>}

      {canSchool && canPartner && (
        <div className="r14-dashboard-switch" role="tablist" aria-label="Dashboard role">
          <button type="button" className={mode === "school" ? "is-active" : ""} onClick={() => setMode("school")}><School size={16} /> {locale === "en" ? "School" : "Škola"}</button>
          <button type="button" className={mode === "partner" ? "is-active" : ""} onClick={() => setMode("partner")}><BriefcaseBusiness size={16} /> {locale === "en" ? "Organization" : "Firma"}</button>
        </div>
      )}

      {!loading && !canSchool && !canPartner ? (
        <section className="r14-dashboard-empty">
          <UsersRound size={28} />
          <h2>{locale === "en" ? "No school or partner role is active on this account." : "Na tomto účtu není aktivní role školy ani partnera."}</h2>
          <p>{locale === "en" ? "Learner and family workspaces remain separate and keep their existing governed flows." : "Žákovský a rodinný workspace zůstávají oddělené a používají své stávající řízené workflow."}</p>
          <Link to="/skola" className="action-primary">{locale === "en" ? "Open my available workspace" : "Otevřít dostupný workspace"} <ArrowRight size={16} /></Link>
        </section>
      ) : mode === "school" && canSchool ? (
        <>
          <section className="r14-dashboard-intro r14-dashboard-intro--school">
            <div><span><School size={19} /> PANSOFIE SCHOOL</span><h2>{locale === "en" ? "Welcome to your workshop of humanity." : "Vítejte ve své pansofické dílně."}</h2><p>{schoolName} · {locale === "en" ? "real Experiences, evidence and reflection in one place." : "skutečné Experiences, důkaz a reflexe na jednom místě."}</p></div>
            <Link to="/skola" className="action-primary">{locale === "en" ? "Open School workspace" : "Otevřít školní workspace"} <ArrowRight size={16} /></Link>
          </section>

          <section className="r14-dashboard-section">
            <div className="r14-dashboard-title"><Brain size={20} /><div><p className="eyebrow">3 PILÍŘE VE TŘÍDĚ</p><h2>{locale === "en" ? "Your pansophic route" : "Vaše pansofická cesta"}</h2></div></div>
            <div className="r14-pillar-dashboard-grid">
              <article><span><Brain size={22} /></span><strong>POZNEJ SEBE</strong><h3>{locale === "en" ? "Attention and critical judgement" : "Pozornost a kritický rozum"}</h3><p>{locale === "en" ? "Start with a real evidence-checking exercise rather than a claim about a learner's personality." : "Začněte skutečným ověřováním informací, ne tvrzením o osobnosti žáka."}</p><a href="/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md" download>{locale === "en" ? "Download sample lesson" : "Stáhnout ukázkovou lekci"} <Download size={15} /></a></article>
              <article><span><HeartHandshake size={22} /></span><strong>TVOŘ S DRUHÝMI</strong><h3>{locale === "en" ? "Dialogue and cooperation" : "Dialog a spolupráce"}</h3><p>{waitingReview > 0 ? `${waitingReview} ${locale === "en" ? "Experience submissions are waiting for human review." : "Experience čeká na lidské review."}` : (locale === "en" ? "No fabricated community activity is shown. Start with a bounded dialogue exercise." : "Neukazujeme smyšlenou komunitní aktivitu. Začněte ohraničeným dialogovým cvičením.")}</p><a href="/materials/pansofie-stavitele-mostu-dialog.md" download>{locale === "en" ? "Open Bridge Builders" : "Otevřít Stavitele mostů"} <ArrowRight size={15} /></a></article>
              <article><span><Leaf size={22} /></span><strong>ZLEPŠUJ SVĚT</strong><h3>{locale === "en" ? "Circular action with evidence" : "Cirkulární čin s důkazem"}</h3><p>{materialAvailable ? `${materialAvailable} ${locale === "en" ? "of your material listings are currently available." : "vašich materiálových nabídek/poptávek je aktuálně dostupných."}` : (locale === "en" ? "Connect a real material need with a real offer through the Material Bridge." : "Propojte skutečnou materiálovou potřebu se skutečnou nabídkou přes Materiálový most.")}</p><Link to="/materialovy-most/workspace">{locale === "en" ? "Open Material Bridge" : "Otevřít Materiálový most"} <ArrowRight size={15} /></Link></article>
            </div>
          </section>

          <section className="r14-dashboard-metrics" aria-label="Real school workflow signals">
            <div><strong>{activeSchool}</strong><span>{locale === "en" ? "active Experiences" : "aktivních Experiences"}</span></div>
            <div><strong>{waitingReview}</strong><span>{locale === "en" ? "waiting for review" : "čeká na review"}</span></div>
            <div><strong>{materialAvailable}</strong><span>{locale === "en" ? "my open material listings" : "mých otevřených materiálových položek"}</span></div>
          </section>

          <section className="r14-dashboard-section">
            <div className="r14-dashboard-title"><CheckCircle2 size={20} /><div><p className="eyebrow">AKTUÁLNÍ PANSOFICKÉ MISE</p><h2>{locale === "en" ? "Small actions before big promises" : "Malé činy před velkými sliby"}</h2></div></div>
            <div className="r14-dashboard-card-grid">
              {SCHOOL_MICRO_MISSIONS.map((mission) => <article key={mission.title} className="r14-task-card"><span>{mission.level}</span><h3>{mission.title}</h3><p>{mission.task}</p><small>{mission.status}</small>{mission.href ? <a href={mission.href} download className="action-secondary">{mission.action} <Download size={15} /></a> : <Link to={mission.to} className="action-secondary">{mission.action} <ArrowRight size={15} /></Link>}</article>)}
            </div>
          </section>

          <section className="r14-dashboard-section r14-repair-section">
            <div className="r14-dashboard-title"><HandHeart size={20} /><div><p className="eyebrow">SPOLEČNÁ NÁPRAVA</p><h2>{locale === "en" ? "Help the network grow through something real" : "Pomozte síti růst něčím skutečným"}</h2></div></div>
            <div className="r14-support-grid">
              <article><Boxes size={22} /><h3>{locale === "en" ? "Request or share useful material" : "Sdílejte nebo poptejte materiál"}</h3><p>{locale === "en" ? "Use the circular Material Bridge for equipment and workshop resources. Reservations and handovers have explicit states." : "Použijte cirkulární Materiálový most pro vybavení a dílenské zdroje. Rezervace i předání mají explicitní stavy."}</p><Link to="/materialovy-most/workspace">{locale === "en" ? "Open the bridge" : "Otevřít most"} <ArrowRight size={15} /></Link></article>
              <article><UsersRound size={22} /><h3>{locale === "en" ? "Invite another school into a pilot conversation" : "Propojte nás s další školou"}</h3><p>{locale === "en" ? "Use the school intake to introduce a concrete need. It does not auto-create an account." : "Použijte školní intake a přineste konkrétní potřebu. Formulář automaticky nevytváří účet."}</p><Link to="/zapojit-se/skola">{locale === "en" ? "School intake" : "Školní intake"} <ArrowRight size={15} /></Link></article>
              <article><BookOpenCheck size={22} /><h3>{locale === "en" ? "Teaching-material library" : "Knihovna pedagogických materiálů"}</h3><p>{locale === "en" ? "A governed shared library is not active yet. We will not pretend an upload destination exists before moderation and licensing rules are defined." : "Řízená společná knihovna zatím není aktivní. Nebudeme předstírat upload, dokud nejsou definovaná pravidla moderace a licencí."}</p><span className="r14-coming-soon">{locale === "en" ? "Governance first" : "Nejdřív governance"}</span></article>
            </div>
          </section>
        </>
      ) : canPartner ? (
        <>
          <section className="r14-dashboard-intro r14-dashboard-intro--partner">
            <div><span><BriefcaseBusiness size={19} /> PANSOFIE PARTNER</span><h2>{locale === "en" ? "Build business with a moral anchor." : "Budujme byznys s morální kotvou."}</h2><p>{companyName} · {locale === "en" ? "real challenges, quality gates and social contribution." : "skutečné výzvy, quality gate a společenský přínos."}</p></div>
            <Link to="/partner-workspace" className="action-primary">{locale === "en" ? "Open Partner workspace" : "Otevřít Partner workspace"} <ArrowRight size={16} /></Link>
          </section>

          <section className="r14-dashboard-section">
            <div className="r14-dashboard-title"><Brain size={20} /><div><p className="eyebrow">3 PILÍŘE V ORGANIZACI</p><h2>{locale === "en" ? "Values translated into bounded actions" : "Hodnoty převedené do ohraničených kroků"}</h2></div></div>
            <div className="r14-pillar-dashboard-grid">
              <article><span><Brain size={22} /></span><strong>POZNEJ SEBE</strong><h3>{locale === "en" ? "Attention without diagnosis" : "Pozornost bez diagnostiky"}</h3><p>{locale === "en" ? "Run a small team experiment and evaluate the working conditions, not people's worth or health." : "Vyzkoušejte malý týmový experiment a hodnoťte pracovní podmínky, ne hodnotu nebo zdraví lidí."}</p><a href="/materials/pansofie-restart-pozornosti-team-guide.md" download>{locale === "en" ? "Download guide" : "Stáhnout průvodce"} <Download size={15} /></a></article>
              <article><span><HeartHandshake size={22} /></span><strong>TVOŘ S DRUHÝMI</strong><h3>{locale === "en" ? "A challenge with accountable feedback" : "Challenge s odpovědnou zpětnou vazbou"}</h3><p>{activeChallenges ? `${activeChallenges} ${locale === "en" ? "Challenges are currently in a governed process." : "Challenges je právě v řízeném procesu."}` : (locale === "en" ? "No active Challenge is inferred. Bring one real, safely bounded problem." : "Žádnou aktivní Challenge si nevymýšlíme. Přineste jeden skutečný, bezpečně ohraničený problém.")}</p><Link to="/partner-workspace">{locale === "en" ? "Open Challenges" : "Otevřít Challenges"} <ArrowRight size={15} /></Link></article>
              <article><span><Leaf size={22} /></span><strong>ZLEPŠUJ SVĚT</strong><h3>{locale === "en" ? "Give useful things a second life" : "Dejte užitečným věcem druhý život"}</h3><p>{locale === "en" ? "Offer surplus equipment or material to schools through an explicit reservation and handover workflow." : "Nabídněte školám přebytečné vybavení nebo materiál přes explicitní rezervační a předávací workflow."}</p><Link to="/materialovy-most/workspace">{locale === "en" ? "Offer material" : "Nabídnout materiál"} <ArrowRight size={15} /></Link></article>
            </div>
          </section>

          <section className="r14-dashboard-metrics" aria-label="Real partner workflow signals">
            <div><strong>{partnerOrganizations.length}</strong><span>{locale === "en" ? "partner organizations visible to me" : "partnerských organizací v mém přístupu"}</span></div>
            <div><strong>{activeChallenges}</strong><span>{locale === "en" ? "Challenges in progress" : "Challenges v procesu"}</span></div>
            <div><strong>{materialAvailable}</strong><span>{locale === "en" ? "my open material listings" : "mých otevřených materiálových položek"}</span></div>
          </section>

          <section className="r14-dashboard-section">
            <div className="r14-dashboard-title"><BriefcaseBusiness size={20} /><div><p className="eyebrow">FIREMNÍ VÝZVY</p><h2>{locale === "en" ? "Try first, certify nothing" : "Nejdřív zkoušet, nic předčasně necertifikovat"}</h2></div></div>
            <div className="r14-dashboard-card-grid">
              {COMPANY_CHALLENGES.map((challenge) => <article key={challenge.title} className="r14-task-card"><span>{challenge.label}</span><h3>{challenge.title}</h3><p>{challenge.text}</p><small>{locale === "en" ? "Working material — not a certification or legal assessment." : "Pracovní materiál — ne certifikace ani právní posudek."}</small><a href={challenge.href} download className="action-secondary">{challenge.action} <Download size={15} /></a></article>)}
              <article className="r14-task-card"><span>CIRCULAR</span><h3>{locale === "en" ? "Material Bridge" : "Materiálový most"}</h3><p>{locale === "en" ? "Offer laptops, workshop surplus, furniture or garden equipment that a school can genuinely reuse." : "Nabídněte notebooky, dílenské přebytky, nábytek nebo zahradní vybavení, které může škola skutečně znovu využít."}</p><small>{locale === "en" ? "AVAILABLE → RESERVED → HANDED OVER. No invisible matching." : "AVAILABLE → RESERVED → HANDED_OVER. Žádné neviditelné párování."}</small><Link to="/materialovy-most/workspace" className="action-secondary">{locale === "en" ? "Offer material" : "Nabídnout materiál"} <ArrowRight size={15} /></Link></article>
            </div>
          </section>

          <section className="r14-dashboard-section r14-repair-section">
            <div className="r14-dashboard-title"><HandHeart size={20} /><div><p className="eyebrow">PATRONÁT A PODPORA</p><h2>{locale === "en" ? "Return value through verified contribution" : "Vracejte hodnotu skrze ověřitelný příspěvek"}</h2></div></div>
            <div className="r14-support-grid">
              <article><Boxes size={22} /><h3>{locale === "en" ? "Donate usable material" : "Darujte použitelný materiál"}</h3><p>{locale === "en" ? "The Material Bridge is the first active contribution path because an offer, reservation and handover can be evidenced." : "Materiálový most je první aktivní cesta podpory, protože nabídku, rezervaci i předání lze doložit."}</p><Link to="/materialovy-most/workspace">{locale === "en" ? "Offer material" : "Nabídnout materiál"} <ArrowRight size={15} /></Link></article>
              <article><UsersRound size={22} /><h3>{locale === "en" ? "Expert contribution" : "Expertní pomoc"}</h3><p>{locale === "en" ? "Bring a concrete expertise offer or a real Challenge. Access to children is never the product." : "Přineste konkrétní expertizu nebo skutečnou Challenge. Přístup k dětem nikdy není produktem."}</p><Link to="/partner-workspace">{locale === "en" ? "Partner workspace" : "Partner workspace"} <ArrowRight size={15} /></Link></article>
              <article><HandHeart size={22} /><h3>{locale === "en" ? "Financial patronage" : "Finanční patronát"}</h3><p>{locale === "en" ? "No donation/payment rail is enabled in this release. We will not render a payment CTA until transparent purpose, receipts and accounting are defined." : "V tomto releasu není aktivní platební/dárcovská cesta. Tlačítko na peníze nezapneme bez transparentního účelu, dokladů a účetního procesu."}</p><span className="r14-coming-soon">{locale === "en" ? "Not enabled" : "Zatím neaktivní"}</span></article>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
