import React from "react";
import { Check, CircleDot, Compass, Route, Sparkles, UsersRound } from "lucide-react";
import { PARTICIPANTS } from "@/lib/pansofieditJourney";

const participantLabels = Object.fromEntries(PARTICIPANTS);

function Signal({ ready, icon: Icon, label, value }) {
  return (
    <div className={`rounded-2xl border p-4 transition-colors motion-reduce:transition-none ${ready ? "border-primary/30 bg-primary/[0.045]" : "border-border bg-background"}`}>
      <div className="flex items-center gap-3">
        <span className={`h-9 w-9 rounded-xl flex items-center justify-center ${ready ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          {ready ? <Check size={16} /> : <Icon size={16} />}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
          <p className={`mt-1 text-sm font-semibold leading-snug ${ready ? "text-foreground" : "text-muted-foreground"}`}>{value || "čeká na vaši volbu"}</p>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceComposer({ role, goal, contributions = [], problem, participants = [], step = 0 }) {
  const selectedPeople = participants.map((id) => participantLabels[id]).filter(Boolean);
  const readyCount = [role, goal, contributions.length > 0, problem, selectedPeople.length >= 2].filter(Boolean).length;

  return (
    <aside aria-label="Živý náhled vznikající zkušenosti" className="rounded-[2rem] border border-border bg-background/90 p-5 sm:p-6 shadow-sm lg:sticky lg:top-28">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Průběžný náhled</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold font-display">Vaše modelová zkušenost se skládá podle voleb.</h3>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">{readyCount}/5</span>
      </div>

      <div className="mt-5 space-y-2.5">
        <Signal ready={Boolean(role)} icon={Compass} label="Kdo vstupuje" value={role?.label} />
        <Signal ready={Boolean(goal)} icon={CircleDot} label="Co chce změnit" value={goal?.[1]} />
        <Signal ready={contributions.length > 0} icon={Sparkles} label="Co přináší" value={contributions.length ? `${contributions.length} konkrétní ${contributions.length === 1 ? "přínos" : "přínosy"}` : ""} />
        <Signal ready={Boolean(problem)} icon={Route} label="Na čem bude pracovat" value={problem?.challenge} />
        <Signal ready={selectedPeople.length >= 2} icon={UsersRound} label="Kdo se zapojí" value={selectedPeople.length ? selectedPeople.join(" · ") : ""} />
      </div>

      <div className="mt-5 rounded-2xl bg-foreground p-5 text-background">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-background/50">Co se právě děje</p>
        <div className="mt-4 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <React.Fragment key={index}>
              <span className={`h-2.5 w-2.5 rounded-full transition-transform motion-reduce:transition-none ${index <= step ? "bg-background scale-100" : "bg-background/20 scale-75"}`} />
              {index < 5 && <span className={`h-px flex-1 ${index < step ? "bg-background/55" : "bg-background/15"}`} />}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-background/75">
          {step < 3 && "Nejdřív si ujasňujeme roli, cíl a přínos. Teprve potom vybíráme konkrétní problém."}
          {step === 3 && "Teď se obecný záměr mění na skutečný problém, na kterém lze ukázat celý postup."}
          {step === 4 && "Přidáváme jen lidi, kteří mají jasný úkol a bezpečnou roli."}
          {step >= 5 && "Zkušenost je složená. Výsledek ukazuje cestu od problému přes důkaz a reflexi až k ověřenému záznamu a dalšímu kroku."}
        </p>
      </div>
    </aside>
  );
}
