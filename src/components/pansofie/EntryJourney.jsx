import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Compass,
  GraduationCap,
  HeartHandshake,
  Landmark,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import EcosystemMap from "@/components/pansofie/EcosystemMap";
import ExperienceComposer from "@/components/pansofie/ExperienceComposer";
import ExperienceScrollStory from "@/components/pansofie/ExperienceScrollStory";
import { ENTRY_ROLES, PARTICIPANTS, PROBLEMS, buildExperiencePath, defaultParticipantsFor } from "@/lib/pansofieditJourney";

const ROLE_ICONS = {
  school: GraduationCap,
  family: HeartHandshake,
  partner: Building2,
  community: Landmark,
  mentor: UsersRound,
  learner: Compass,
};

const STEP_LABELS = ["Kdo jste", "Co chcete změnit", "Co přinášíte", "Skutečný problém", "Kdo se zapojí", "Váš výsledek"];

function ChoiceCard({ selected, onClick, children, icon: Icon, disabled = false, multi = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`group relative w-full text-left rounded-2xl border p-4 sm:p-5 transition-[border-color,background-color,transform] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${selected ? "border-primary/50 bg-primary/[0.065] sm:-translate-y-0.5" : "border-border bg-background hover:bg-card"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="flex items-start gap-3">
        {Icon && <span className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={19} /></span>}
        <span className="flex-1 text-sm sm:text-base font-medium leading-snug">{children}</span>
        <span className={`h-6 w-6 rounded-full border flex items-center justify-center shrink-0 ${selected ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
          {selected ? <Check size={14} /> : multi ? <span className="text-[10px]">+</span> : null}
        </span>
      </div>
    </button>
  );
}

export default function EntryJourney() {
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get("role");
  const validRequestedRole = requestedRole && ENTRY_ROLES[requestedRole] ? requestedRole : null;

  const [step, setStep] = useState(validRequestedRole ? 1 : 0);
  const [roleId, setRoleId] = useState(validRequestedRole || "");
  const [goalId, setGoalId] = useState("");
  const [contributions, setContributions] = useState([]);
  const [problemId, setProblemId] = useState("");
  const [participants, setParticipants] = useState(validRequestedRole ? defaultParticipantsFor(validRequestedRole) : ["learner", "teacher"]);
  const [contact, setContact] = useState({ name: "", organization: "", email: "" });
  const [notice, setNotice] = useState("");

  const role = roleId ? ENTRY_ROLES[roleId] : null;
  const problem = PROBLEMS.find((item) => item.id === problemId) || null;
  const goal = role?.goals.find(([id]) => id === goalId) || null;
  const path = useMemo(() => problem && role ? buildExperiencePath(problem, roleId) : [], [problem, role, roleId]);
  const progress = Math.round(((step + 1) / STEP_LABELS.length) * 100);

  const selectRole = (id) => {
    setRoleId(id);
    setGoalId("");
    setContributions([]);
    setProblemId("");
    setParticipants(defaultParticipantsFor(id));
    setNotice("");
  };

  const toggleContribution = (id) => {
    setContributions((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const toggleParticipant = (id) => {
    if (id === "learner" || id === "teacher") return;
    setParticipants((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const canContinue = [Boolean(roleId), Boolean(goalId), contributions.length > 0, Boolean(problemId), participants.includes("learner") && participants.includes("teacher")][step] ?? true;

  const reset = () => {
    setStep(0);
    setRoleId("");
    setGoalId("");
    setContributions([]);
    setProblemId("");
    setParticipants(["learner", "teacher"]);
    setContact({ name: "", organization: "", email: "" });
    setNotice("");
  };

  const localContact = (event) => {
    event.preventDefault();
    setNotice("Vaše shrnutí je připravené pouze v tomto prohlížeči. Tato pre-field-pilot verze nic neodesílá ani neukládá na server. Kontaktní režim zůstává fail-closed do zveřejnění právního provozovatele a privacy kontaktu.");
  };

  const journeyCard = (
    <section className="rounded-[2rem] border border-border bg-card/35 p-5 sm:p-8" aria-live="polite">
      {step === 0 && (
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Jak vstupujete do Pansofie?</p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display">Vyberte roli. Zbytek cesty se přizpůsobí.</h2>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {Object.values(ENTRY_ROLES).map((item) => <ChoiceCard key={item.id} selected={roleId === item.id} onClick={() => selectRole(item.id)} icon={ROLE_ICONS[item.id]}>{item.label}<span className="block mt-1 text-xs font-normal text-muted-foreground">{item.kicker}</span></ChoiceCard>)}
          </div>
        </div>
      )}

      {step === 1 && role && (
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">{role.label}</p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display">{role.prompt}</h2>
          <p className="mt-3 text-sm text-muted-foreground">Vyberte jeden hlavní cíl. Další vrstvy odhalíme až potom.</p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">{role.goals.map(([id, label]) => <ChoiceCard key={id} selected={goalId === id} onClick={() => setGoalId(id)}>{label}</ChoiceCard>)}</div>
        </div>
      )}

      {step === 2 && role && (
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Reciprocita</p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display">Co můžete do Experience skutečně přinést?</h2>
          <p className="mt-3 text-sm text-muted-foreground">Vyberte jednu nebo více možností. Pansofie nemá vztahy, ve kterých jedna strana pouze čerpá hodnotu.</p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">{role.contributions.map(([id, label]) => <ChoiceCard key={id} selected={contributions.includes(id)} onClick={() => toggleContribution(id)} multi>{label}</ChoiceCard>)}</div>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Experience Simulator</p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display">Vyberte skutečný problém.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Nejde o test správné odpovědi. Volbou problému pouze vytvoříme názorný Experience scénář.</p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">{PROBLEMS.map((item) => <ChoiceCard key={item.id} selected={problemId === item.id} onClick={() => setProblemId(item.id)}>{item.label}<span className="block mt-1 text-xs font-normal text-muted-foreground">{item.short}</span></ChoiceCard>)}</div>
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Lidé kolem Experience</p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-semibold font-display">Kdo může být součástí řešení?</h2>
          <p className="mt-3 text-sm text-muted-foreground">Žák / tým a učitel tvoří bezpečný základ pilotního scénáře. Další role přidávejte jen tehdy, když mají skutečný účel.</p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">{PARTICIPANTS.map(([id, label]) => <ChoiceCard key={id} selected={participants.includes(id)} onClick={() => toggleParticipant(id)} disabled={id === "learner" || id === "teacher"} multi>{label}{(id === "learner" || id === "teacher") && <span className="block mt-1 text-xs font-normal text-muted-foreground">povinný bezpečný základ</span>}</ChoiceCard>)}</div>
        </div>
      )}

      {step < 5 && (
        <div className="mt-8 pt-5 border-t border-border flex items-center justify-between gap-4">
          <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft size={16} /> Zpět</button>
          <button type="button" onClick={() => setStep((current) => Math.min(5, current + 1))} disabled={!canContinue} className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Pokračovat <ArrowRight size={17} /></button>
        </div>
      )}
    </section>
  );

  return (
    <div className="container-px max-w-7xl mx-auto py-10 sm:py-16">
      <div className="max-w-4xl mx-auto text-center">
        <span className="chip bg-primary/10 text-primary mb-5"><Sparkles size={14} /> PANSOFIEDIT · 60–90 sekund</span>
        <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Vyzkoušejte Pansofii <span className="text-primary">používáním.</span></h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">Nejdřív nechte Pansofii pochopit vaši roli, potřebu a přínos. Pak uvidíte konkrétní Experience, lidi kolem ní a doporučený další krok.</p>
      </div>

      <div className="mt-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>Krok {step + 1} / {STEP_LABELS.length}</span>
          <span>{STEP_LABELS[step]}</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden" aria-hidden="true"><div className="h-full bg-primary transition-[width] motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div>
      </div>

      {step < 5 ? (
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          {journeyCard}
          <ExperienceComposer role={role} goal={goal} contributions={contributions} problem={problem} participants={participants} step={step} />
        </div>
      ) : role && problem ? (
        <section className="mt-7 rounded-[2rem] border border-border bg-card/35 p-5 sm:p-8" aria-live="polite">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">Právě jste prošli principem Pansofie</p>
              <h2 className="mt-2 text-3xl sm:text-5xl font-semibold font-display tracking-tight">{role.resultTitle}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">{role.resultText}</p>
            </div>
            <button type="button" onClick={reset} className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-3 py-2"><RefreshCcw size={16} /> Začít znovu</button>
          </div>

          <div className="mt-8 rounded-3xl border border-primary/25 bg-primary/[0.035] p-5 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Role</p><p className="mt-1 font-semibold">{role.label}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Cíl</p><p className="mt-1 font-semibold">{goal?.[1]}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Experience</p><p className="mt-1 font-semibold">{problem.challenge}</p></div>
            </div>
          </div>

          <ExperienceScrollStory path={path} role={role} problem={problem} />

          <div className="mt-8"><EcosystemMap participants={participants} roleId={roleId} /></div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="rounded-3xl border border-border bg-background p-6"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Získáváte</p><div className="mt-4 space-y-3">{role.receives.map((item) => <div key={item} className="flex gap-3 text-sm"><Check size={16} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></section>
            <section className="rounded-3xl border border-border bg-background p-6"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Přinášíte</p><div className="mt-4 space-y-3">{role.brings.map((item) => <div key={item} className="flex gap-3 text-sm"><Check size={16} className="text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}</div></section>
          </div>

          <section className="mt-8 rounded-[2rem] bg-foreground text-background p-6 sm:p-8"><div className="flex items-start gap-4"><ShieldCheck className="shrink-0 mt-1" size={22} /><div><p className="text-xs uppercase tracking-[0.18em] text-background/55">Safety boundary pro tuto roli</p><div className="mt-4 space-y-3">{role.safety.map((item) => <p key={item} className="text-sm sm:text-base text-background/75 leading-relaxed">• {item}</p>)}</div></div></div></section>

          <section className="mt-8 rounded-[2rem] border border-primary/25 bg-primary/[0.035] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Váš doporučený další krok</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold font-display">{role.resultTitle}</h3>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">Tento výsledek vznikl pouze z voleb v tomto prohlížeči. Nejde o automatické hodnocení člověka ani o rozhodnutí o přijetí do pilotu.</p>
          </section>

          <form onSubmit={localContact} className="mt-8 rounded-[2rem] border border-border bg-background p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Chci pokračovat</p>
            <h3 className="mt-2 text-2xl font-semibold font-display">Kam vám jednou pošleme další krok?</h3>
            <p className="mt-3 text-sm text-muted-foreground">Kontaktní režim je zatím fail-closed. Pole můžete vyplnit pro náhled, ale nic neopouští tuto stránku.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="text-sm font-medium">Jméno<input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="mt-2 w-full h-12 rounded-xl border border-border bg-background px-4 font-normal" /></label>
              <label className="text-sm font-medium">Organizace<input value={contact.organization} onChange={(e) => setContact({ ...contact, organization: e.target.value })} className="mt-2 w-full h-12 rounded-xl border border-border bg-background px-4 font-normal" /></label>
              <label className="text-sm font-medium sm:col-span-2">E-mail<input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="mt-2 w-full h-12 rounded-xl border border-border bg-background px-4 font-normal" /></label>
            </div>
            <button type="submit" className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Připravit lokální shrnutí <ArrowRight size={17} /></button>
            {notice && <div role="status" className="mt-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 text-sm leading-relaxed">{notice}</div>}
          </form>
        </section>
      ) : null}
    </div>
  );
}
