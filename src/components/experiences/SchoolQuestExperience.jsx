"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  advanceSchoolQuestPhaseAction,
  completeSchoolQuestAction,
  saveSchoolQuestNotesAction,
  startSchoolQuestAction,
} from "../../app/go/school/quest-actions";

const STATUS_LABELS = {
  assigned: "Připraveno",
  in_progress: "Rozpracováno",
  submitted: "Odevzdáno",
  completed: "Dokončeno",
};

function formatDueDate(value) {
  if (!value) return "Bez termínu";
  return new Intl.DateTimeFormat("cs-CZ", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function difficultyLabel(value) {
  return { 1: "Lehká", 2: "Střední", 3: "Výzva", 4: "Náročná", 5: "Expert" }[value] || "Mise";
}
function LockedQuest({ mode }) {
  const message = mode === "unavailable"
    ? "Školní data teď nejsou dostupná. Nic se nezobrazuje z demo účtu."
    : "Tato školní mise není dostupná pro tento účet nebo aktivní školní kontext.";
  return (
    <div className="goq-stage">
      <main className="goq-phone goq-locked">
        <div className="goq-topbar"><a href="/go/school">← Škola</a><strong>MISE</strong><span>●</span></div>
        <section className="goq-lock-card">
          <span>🔒</span>
          <small>PANSOFIE GO · ŠKOLNÍ MISE</small>
          <h1>Mise není dostupná</h1>
          <p>{message}</p>
          <a href="/go/school">Zpět do školního GO</a>
        </section>
      </main>
    </div>
  );
}

function QuestVisual({ quest }) {
  const topic = quest.mission.topic;
  return (
    <div className="goq-visual" aria-hidden="true">
      <div className="goq-orbit goq-orbit--one" />
      <div className="goq-orbit goq-orbit--two" />
      <div className="goq-orbit goq-orbit--three" />
      <div className="goq-core">{topic.glyph}</div>
      <span className="goq-node goq-node--a" />
      <span className="goq-node goq-node--b" />
      <span className="goq-node goq-node--c" />
    </div>
  );
}
function QuestHero({ quest }) {
  return (
    <section className="goq-hero">
      <div className="goq-hero-copy">
        <span className="goq-topic">{quest.mission.topic.label}</span>
        <h1>{quest.mission.title}</h1>
        <p>{quest.mission.summary}</p>
        <div className="goq-facts" aria-label="Parametry mise">
          <span><b>{quest.mission.estimatedMinutes || "—"}</b> min</span>
          <span><b>{difficultyLabel(quest.mission.difficulty)}</b> obtížnost</span>
          <span><b>{quest.class?.name || "Třída"}</b> {quest.class?.academicYear || ""}</span>
        </div>
      </div>
      <QuestVisual quest={quest} />
      <div className="goq-deadline">
        <span>TERMÍN</span>
        <strong>{formatDueDate(quest.assignment.dueAt)}</strong>
      </div>
    </section>
  );
}

function CycleRail({ phases, cycle, selectedPhase, onSelect }) {
  const completed = new Set(cycle.completedPhases || []);
  return (
    <nav id="quest-cycle" className="goq-cycle" aria-label="Kroky mise">
      {phases.map((phase) => {
        const isCompleted = completed.has(phase.id);
        const isCurrent = phase.id === cycle.currentPhase && !cycle.isCycleComplete;
        const isReachable = isCompleted || isCurrent;
        return (
          <button
            key={phase.id}
            type="button"
            className={`${selectedPhase === phase.id ? "is-selected" : ""} ${isCompleted ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}`}
            disabled={!isReachable}
            onClick={() => isReachable && onSelect(phase.id)}
            aria-current={isCurrent ? "step" : undefined}
          >
            <span>{isCompleted ? "✓" : phase.symbol}</span>
            <b>{phase.label}</b>
          </button>
        );
      })}
    </nav>
  );
}
function PrivateNotebook({ phaseId, quest, evidenceNote, reflection, onEvidence, onReflection, onSave, busy }) {
  if (phaseId !== "create" && phaseId !== "reflect") return null;
  const isReflection = phaseId === "reflect";
  return (
    <section className="goq-notebook">
      <div>
        <small>VOLITELNÝ SOUKROMÝ ZÁZNAM</small>
        <h3>{isReflection ? "Co si odnášíš?" : "Zachyť, co vzniklo"}</h3>
        <p>{isReflection
          ? quest.mission.reflectionPrompt || "Krátká reflexe zůstává soukromá v tvém účtu."
          : quest.mission.evidencePrompt || "Poznámka je volitelná a zůstává soukromá v tvém účtu."}</p>
      </div>
      <textarea
        rows="5"
        value={isReflection ? reflection : evidenceNote}
        onChange={(event) => isReflection ? onReflection(event.target.value) : onEvidence(event.target.value)}
        maxLength={2000}
        placeholder={isReflection ? "Jedna věc, kterou teď vidím jinak…" : "Poznámka, výsledek nebo odkaz bez citlivých údajů…"}
      />
      <button type="button" className="goq-secondary-button" onClick={onSave} disabled={busy}>
        {busy ? "Ukládám…" : "Uložit soukromě"}
      </button>
    </section>
  );
}

function PhaseCard({ phase, quest, isCurrent, cycleComplete, onAdvance, busy }) {
  return (
    <section className="goq-phase-card">
      <div className="goq-phase-index"><span>{phase.symbol}</span><small>{phase.kicker}</small></div>
      <div className="goq-phase-copy">
        <small>{isCurrent ? "AKTUÁLNÍ KROK" : "HOTOVÝ KROK"}</small>
        <h2>{phase.label}</h2>
        <p>{phase.text}</p>
      </div>
      {isCurrent && !cycleComplete && (
        <button type="button" className="goq-primary-button" onClick={onAdvance} disabled={busy}>
          {busy ? "Ukládám krok…" : phase.id === "reflect" ? "Mám reflexi promyšlenou" : `Hotovo · pokračovat`}
        </button>
      )}
    </section>
  );
}
function QuestIntro({ quest, onStart, busy }) {
  return (
    <section className="goq-intro-card">
      <small>PROČ TAHLE MISE</small>
      <h2>Nejdřív pochop souvislost.</h2>
      <p>{quest.mission.why || quest.mission.summary}</p>
      {quest.mission.safetyNotes && (
        <div className="goq-safety-note"><b>Bezpečně:</b> {quest.mission.safetyNotes}</div>
      )}
      <button type="button" className="goq-primary-button" onClick={onStart} disabled={busy}>
        {busy ? "Startuju…" : "Začít misi"}
      </button>
    </section>
  );
}

function QuestComplete({ quest }) {
  return (
    <section className="goq-complete-card">
      <div className="goq-complete-mark">✓</div>
      <small>MISE DOKONČENA</small>
      <h2>Šest kroků je za tebou.</h2>
      <p>Dokončení znamená, že jsi prošel/prošla zkušeností. Není to známka, osobní skóre ani automatické potvrzení kompetence.</p>
      <div className="goq-complete-actions">
        <a href="/go/portfolio">Moje portfolio</a>
        <a href="/go/school">Další školní mise</a>
      </div>
      {quest.evidenceNote || quest.reflection ? (
        <div className="goq-private-proof"><b>Soukromý záznam uložen</b><span>Vidíš ho jen ty a oprávnění správci podle databázových pravidel.</span></div>
      ) : null}
    </section>
  );
}

function QuestSafety({ quest }) {
  return (
    <section className="goq-guardrail">
      <span>◉</span>
      <div><h3>Bezpečí před body</h3><p>{quest.mission.safetyNotes || "Nevkládej osobní nebo citlivé údaje do výstupů, které mají být sdílené."}</p></div>
    </section>
  );
}
function QuestWorkspace({ initialQuest }) {
  const router = useRouter();
  const [quest, setQuest] = useState(initialQuest);
  const [selectedPhase, setSelectedPhase] = useState(initialQuest.cycle.currentPhase || "learn");
  const [evidenceNote, setEvidenceNote] = useState(initialQuest.evidenceNote || "");
  const [reflection, setReflection] = useState(initialQuest.reflection || "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const phases = useMemo(() => quest.mission.phases || [], [quest.mission.phases]);
  const phase = useMemo(
    () => phases.find((item) => item.id === selectedPhase) || phases[0],
    [phases, selectedPhase],
  );
  const isCurrentPhase = phase?.id === quest.cycle.currentPhase && !quest.cycle.isCycleComplete;
  const isCompleted = quest.run.status === "completed";
  const isAssigned = quest.run.status === "assigned";

  const perform = async (operation) => {
    if (busy) return null;
    setBusy(true);
    setMessage("");
    try { return await operation(); }
    catch { setMessage("Změnu se nepodařilo uložit. Zkus to znovu."); return null; }
    finally { setBusy(false); }
  };

  const start = async () => {
    const result = await perform(() => startSchoolQuestAction(quest.assignment.id));
    if (!result) return;
    if (result.mode !== "account") return setMessage(result.message || "Misi se nepodařilo zahájit.");
    setQuest((current) => ({ ...current, run: { ...current.run, ...result.run } }));
    setSelectedPhase("learn");
    setMessage("Mise začala. První krok je Poznej.");
  };
  const advance = async () => {
    if (!phase || !isCurrentPhase) return;
    const result = await perform(() => advanceSchoolQuestPhaseAction({
      assignmentId: quest.assignment.id,
      phaseId: phase.id,
    }));
    if (!result) return;
    if (result.mode !== "account") return setMessage(result.message || "Krok se nepodařilo uložit.");
    setQuest((current) => ({
      ...current,
      run: { ...current.run, status: result.runStatus },
      cycle: result.cycle,
    }));
    setSelectedPhase(result.cycle.currentPhase);
    setMessage(result.cycle.isCycleComplete
      ? "Šest kroků je hotových. Teď můžeš misi dokončit."
      : "Krok uložen. Pokračuj dál.");
  };

  const saveNotes = async () => {
    const result = await perform(() => saveSchoolQuestNotesAction({
      assignmentId: quest.assignment.id,
      evidenceNote,
      reflection,
    }));
    if (!result) return;
    if (result.mode !== "account") return setMessage(result.message || "Záznam se nepodařilo uložit.");
    setEvidenceNote(result.evidenceNote);
    setReflection(result.reflection);
    setQuest((current) => ({ ...current, evidenceNote: result.evidenceNote, reflection: result.reflection }));
    setMessage("Soukromý záznam je uložený.");
  };

  const complete = async () => {
    const result = await perform(() => completeSchoolQuestAction(quest.assignment.id));
    if (!result) return;
    if (result.mode !== "account") return setMessage(result.message || "Misi se nepodařilo dokončit.");
    setQuest((current) => ({ ...current, run: { ...current.run, status: result.runStatus } }));
    setMessage("Mise je dokončená.");
    router.refresh();
  };
  const theme = quest.mission.topic.theme;
  return (
    <div className={`goq-stage goq-theme-${theme}`}>
      <aside className="goq-aside">
        <small>PANSOFIE GO · ŠKOLNÍ QUEST</small>
        <h2>{quest.mission.title}</h2>
        <p>{quest.class?.name || "Třída"} · {STATUS_LABELS[quest.run.status] || quest.run.status}</p>
        <div className="goq-aside-progress">
          <span>{quest.cycle.percent}%</span>
          <div><i style={{ width: `${quest.cycle.percent}%` }} /></div>
          <small>{quest.cycle.completedCount}/6 kroků</small>
        </div>
        <p className="goq-aside-note">Šest fází drží rytmus zkušenosti. Soukromý záznam je volitelný a veřejné pořadí studentů tu není.</p>
        <a href="/go/school">← Školní GO</a>
        <a href="/go">GO domů →</a>
      </aside>

      <main className="goq-phone">
        <div className="goq-topbar">
          <a href="/go/school" aria-label="Zpět do školního GO">←</a>
          <strong>QUEST · {quest.cycle.completedCount}/6</strong>
          <span>{quest.cycle.percent}%</span>
        </div>
        <div className="goq-content">
          <QuestHero quest={quest} />
          {quest.assignment.status === "cancelled" && (
            <p className="goq-cancelled-note">Školní zadání bylo zrušeno. Tvoje dosavadní práce zůstává zachovaná v canonical mission runu.</p>
          )}
          <div className="goq-progress-strip" aria-label={`Postup mise ${quest.cycle.percent} procent`}>
            <span style={{ width: `${quest.cycle.percent}%` }} />
          </div>

          {isCompleted ? (
            <QuestComplete quest={{ ...quest, evidenceNote, reflection }} />
          ) : isAssigned ? (
            <QuestIntro quest={quest} onStart={start} busy={busy} />
          ) : (
            <>
              <CycleRail
                phases={phases}
                cycle={quest.cycle}
                selectedPhase={selectedPhase}
                onSelect={setSelectedPhase}
              />
              {phase && (
                <PhaseCard
                  phase={phase}
                  quest={quest}
                  isCurrent={isCurrentPhase}
                  cycleComplete={quest.cycle.isCycleComplete}
                  onAdvance={advance}
                  busy={busy}
                />
              )}
              {phase && (
                <PrivateNotebook
                  phaseId={phase.id}
                  quest={quest}
                  evidenceNote={evidenceNote}
                  reflection={reflection}
                  onEvidence={setEvidenceNote}
                  onReflection={setReflection}
                  onSave={saveNotes}
                  busy={busy}
                />
              )}
              {quest.cycle.isCycleComplete && (
                <section className="goq-finish-panel">
                  <small>VŠECH 6 KROKŮ HOTOVO</small>
                  <h2>Uzavřít zkušenost?</h2>
                  <p>Dokončením vznikne canonical Experience a soukromá položka portfolia. Poznámka ani reflexe nejsou povinné.</p>
                  <button type="button" className="goq-primary-button" onClick={complete} disabled={busy}>
                    {busy ? "Dokončuji…" : "Dokončit misi"}
                  </button>
                </section>
              )}
              <QuestSafety quest={quest} />
            </>
          )}
          {message && <p className="goq-status-message" role="status">{message}</p>}
        </div>
        <nav className="goq-dock" aria-label="Navigace školní mise">
          <a href="/go/school">Škola</a>
          <a href="#quest-cycle" aria-current="page">Quest</a>
          <a href="/go/portfolio">Portfolio</a>
        </nav>
      </main>
    </div>
  );
}

export default function SchoolQuestExperience({ initialQuest }) {
  if (initialQuest?.mode !== "quest") {
    return <LockedQuest mode={initialQuest?.mode || "error"} />;
  }
  return <QuestWorkspace initialQuest={initialQuest} />;
}
