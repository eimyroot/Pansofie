"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  assignSchoolMissionAction,
  cancelSchoolAssignmentAction,
} from "../../app/go/school/actions";

const STATUS_LABELS = {
  assigned: "Přiřazeno",
  in_progress: "Rozpracováno",
  submitted: "Odevzdáno",
  completed: "Dokončeno",
};

function missionHref(slug) {
  return slug === "vypestuj-prvni-rostlinu" ? "/go/mise-grow" : "/go/mise";
}

function formatDate(value) {
  if (!value) return "Bez termínu";
  return new Intl.DateTimeFormat("cs-CZ", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function completionPercent(progress) {
  if (!progress?.total) return 0;
  return Math.round((progress.completed / progress.total) * 100);
}
function SchoolHeader({ snapshot, className }) {
  return (
    <header className="go2-screen-head go2-school-head">
      <div>
        <small>PANSOFIE GO · ŠKOLA</small>
        <h1>{className ? `${className} · ${snapshot.school?.name || "Škola"}` : snapshot.school?.name || "Školní GO"}</h1>
      </div>
      <a className="go2-school-home-link" href="/go" aria-label="Zpět na Pansofie GO">GO</a>
    </header>
  );
}

function LockedSchool({ snapshot }) {
  const text = snapshot.mode === "unavailable"
    ? "Školní data teď nejsou dostupná. Tato obrazovka nic nesimuluje ani neukazuje demo studenty."
    : snapshot.mode === "error"
      ? snapshot.message || "Školní prostor se nepodařilo načíst."
      : "Pro tento účet není aktivní školní kontext.";
  return (
    <div className="go2-stage">
      <aside className="go2-desktop-note">
        <b>PANSOFIE GO · ŠKOLA</b>
        <h2>Bezpečný školní kontext.</h2>
        <p>Školní prostor používá skutečné členství a databázová oprávnění. Prezentace sama přístup neuděluje.</p>
        <a href="/go">← Zpět do GO</a>
      </aside>
      <main className="go2-phone">
        <div className="go2-status"><span>GO</span><strong>ŠKOLA</strong><span>●</span></div>
        <div className="go2-content">
          <SchoolHeader snapshot={snapshot} />
          <section className="go2-callout"><h2>Školní prostor není dostupný</h2><p>{text}</p></section>
        </div>
      </main>
    </div>
  );
}
function ClassTabs({ classes, selectedId, onSelect }) {
  if (!classes.length) return null;
  return (
    <nav className="go2-school-class-tabs" aria-label="Třídy">
      {classes.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === selectedId ? "is-active" : ""}
          aria-current={item.id === selectedId ? "page" : undefined}
          onClick={() => onSelect(item.id)}
        >
          <strong>{item.name}</strong>
          <span>{item.academicYear}</span>
        </button>
      ))}
    </nav>
  );
}

function StaffMetrics({ classData }) {
  const learners = classData.roster.filter((member) => member.role === "learner");
  const activeAssignments = classData.assignments.length;
  const allProgress = classData.assignments.flatMap((assignment) => assignment.learners || []);
  const completed = allProgress.filter((item) => item.status === "completed").length;
  const completion = allProgress.length ? Math.round((completed / allProgress.length) * 100) : 0;
  return (
    <section className="go2-work-summary go2-school-metrics" aria-label="Přehled třídy">
      <article><small>STUDENTI</small><strong>{learners.length}</strong><p>Aktivní learner členství v této třídě.</p></article>
      <article><small>AKTIVNÍ ZADÁNÍ</small><strong>{activeAssignments}</strong><p>Canonical mise aktuálně přiřazené třídě nebo studentům.</p></article>
      <article><small>DOKONČENOST</small><strong>{completion}%</strong><p>Podíl dokončených runů z aktivních zadání. Ne hodnocení dítěte.</p></article>
    </section>
  );
}
function AssignmentComposer({ classData, missions }) {
  const router = useRouter();
  const learners = classData.roster.filter((member) => member.role === "learner");
  const [missionSlug, setMissionSlug] = useState(missions[0]?.slug || "");
  const [targetLearnerId, setTargetLearnerId] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const activeMissionSlug = missions.some((mission) => mission.slug === missionSlug)
    ? missionSlug
    : missions[0]?.slug || "";

  const submit = async (event) => {
    event.preventDefault();
    if (!activeMissionSlug || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const normalizedDueAt = dueAt ? new Date(dueAt).toISOString() : null;
      const result = await assignSchoolMissionAction({
        classId: classData.id,
        missionSlug: activeMissionSlug,
        targetLearnerId: targetLearnerId || null,
        dueAt: normalizedDueAt,
      });
      if (result.mode !== "account") {
        setMessage(result.message || "Zadání se nepodařilo vytvořit.");
      } else {
        setMessage(`Mise přiřazena pro ${result.assignment.assignedCount} studentů.`);
        setTargetLearnerId("");
        setDueAt("");
        router.refresh();
      }
    } catch {
      setMessage("Zadání se nepodařilo vytvořit.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="go2-school-composer" aria-labelledby="school-assignment-heading">
      <div className="go2-school-section-head">
        <small>NOVÉ ZADÁNÍ</small>
        <h2 id="school-assignment-heading">Přiřadit canonical misi</h2>
        <p>Zadání vytvoří nebo znovu použije studentův canonical mission run. Nevzniká druhý školní quest engine.</p>
      </div>
      {missions.length ? (
        <form onSubmit={submit} className="go2-school-form">
          <label>
            Mise
            <select value={activeMissionSlug} onChange={(event) => setMissionSlug(event.target.value)}>
              {missions.map((mission) => (
                <option key={mission.id} value={mission.slug}>{mission.title}</option>
              ))}
            </select>
          </label>
          <label>
            Cíl
            <select value={targetLearnerId} onChange={(event) => setTargetLearnerId(event.target.value)}>
              <option value="">Celá třída</option>
              {learners.map((learner) => (
                <option key={learner.userId} value={learner.userId}>{learner.displayName}</option>
              ))}
            </select>
          </label>
          <label>
            Termín, volitelně
            <input type="datetime-local" value={dueAt} onChange={(event) => setDueAt(event.target.value)} />
          </label>
          <button type="submit" disabled={busy || !learners.length}>{busy ? "Přiřazuji…" : "Přiřadit misi"}</button>
        </form>
      ) : <p className="go2-note">V katalogu zatím není žádná publikovaná canonical mise.</p>}
      {!learners.length && <p className="go2-note">Třída zatím nemá aktivního studenta, kterému lze misi přiřadit.</p>}
      {message && <p className="go2-school-message" role="status">{message}</p>}
    </section>
  );
}
function StaffAssignmentCard({ assignment }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const progress = assignment.progress || { total: 0, completed: 0 };
  const percent = completionPercent(progress);
  const targetLabel = assignment.scope === "learner"
    ? assignment.learners?.[0]?.displayName || "Konkrétní student"
    : "Celá třída";

  const cancel = async () => {
    if (busy || !window.confirm("Zrušit toto zadání? Studentům zůstane jejich dosavadní práce.")) return;
    setBusy(true);
    setMessage("");
    try {
      const result = await cancelSchoolAssignmentAction(assignment.id);
      if (result.mode !== "account") setMessage(result.message || "Zadání se nepodařilo zrušit.");
      else {
        setMessage("Zadání bylo zrušeno. Mission runy studentů zůstaly zachované.");
        router.refresh();
      }
    } catch {
      setMessage("Zadání se nepodařilo zrušit.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="go2-school-assignment-card">
      <div className="go2-school-assignment-top">
        <div><small>{targetLabel}</small><h3>{assignment.mission?.title || "Mise"}</h3></div>
        <strong>{percent}%</strong>
      </div>
      <p>{assignment.mission?.summary || "Canonical školní mise."}</p>
      <div className="go2-progress" aria-label={`Dokončeno ${percent} procent`}><span style={{ width: `${percent}%` }} /></div>
      <div className="go2-school-assignment-meta">
        <span>{progress.completed || 0}/{progress.total || 0} dokončeno</span>
        <span>{formatDate(assignment.dueAt)}</span>
      </div>
      <div className="go2-school-progress-list">
        {(assignment.learners || []).map((learner) => (
          <div key={learner.userId}>
            <span>{learner.displayName}</span>
            <b>{STATUS_LABELS[learner.status] || learner.status}</b>
          </div>
        ))}
      </div>
      <div className="go2-school-assignment-actions">
        <a href={missionHref(assignment.mission?.slug)}>Otevřít misi</a>
        <button type="button" onClick={cancel} disabled={busy}>{busy ? "Ruším…" : "Zrušit zadání"}</button>
      </div>
      {message && <p className="go2-school-message" role="status">{message}</p>}
    </article>
  );
}

function StaffAssignments({ assignments }) {
  return (
    <section className="go2-school-section" aria-labelledby="active-assignments-heading">
      <div className="go2-school-section-head">
        <small>AKTIVNÍ ZADÁNÍ</small>
        <h2 id="active-assignments-heading">Mise a průběh</h2>
      </div>
      <div className="go2-school-assignment-list">
        {assignments.length
          ? assignments.map((assignment) => <StaffAssignmentCard key={assignment.id} assignment={assignment} />)
          : <p className="go2-note">Tato třída zatím nemá aktivní školní zadání.</p>}
      </div>
    </section>
  );
}
function StudentRoster({ classData }) {
  const learners = classData.roster.filter((member) => member.role === "learner");
  const staff = classData.roster.filter((member) => member.role !== "learner");
  const progressByUser = new Map();
  for (const assignment of classData.assignments) {
    for (const learner of assignment.learners || []) {
      const current = progressByUser.get(learner.userId) || { total: 0, completed: 0 };
      current.total += 1;
      if (learner.status === "completed") current.completed += 1;
      progressByUser.set(learner.userId, current);
    }
  }

  return (
    <section className="go2-school-section" aria-labelledby="roster-heading">
      <div className="go2-school-section-head">
        <small>TŘÍDA</small>
        <h2 id="roster-heading">Studenti a pedagogové</h2>
        <p>Jen minimální školní identita a stav přidělených misí. Bez e-mailů, narození, evidence nebo osobního skóre.</p>
      </div>
      <div className="go2-school-roster">
        {learners.map((learner) => {
          const progress = progressByUser.get(learner.userId) || { total: 0, completed: 0 };
          return (
            <article key={learner.userId}>
              <div className="go2-school-avatar">{learner.displayName.slice(0, 1).toUpperCase()}</div>
              <div><strong>{learner.displayName}</strong><span>Student</span></div>
              <b>{progress.total ? `${progress.completed}/${progress.total}` : "—"}</b>
            </article>
          );
        })}
        {!learners.length && <p className="go2-note">V této třídě zatím není aktivní student.</p>}
      </div>
      {staff.length > 0 && <div className="go2-school-staff-line">Pedagogové: {staff.map((member) => member.displayName).join(", ")}</div>}
    </section>
  );
}
function LearnerAssignments({ assignments }) {
  return (
    <section className="go2-school-section" aria-labelledby="my-school-missions-heading">
      <div className="go2-school-section-head">
        <small>MOJE ŠKOLNÍ MISE</small>
        <h2 id="my-school-missions-heading">Zadání pro mě</h2>
        <p>Vidíš jen vlastní školní zadání a vlastní mission run. Spolužáci ani jejich průběh se sem neposílají.</p>
      </div>
      <div className="go2-school-assignment-list">
        {assignments.length ? assignments.map((assignment) => {
          const status = assignment.ownRun?.status || "assigned";
          const completed = status === "completed";
          return (
            <article key={assignment.id} className="go2-school-assignment-card go2-school-assignment-card--learner">
              <div className="go2-school-assignment-top">
                <div><small>{assignment.scope === "class" ? "ZADÁNÍ TŘÍDĚ" : "ZADÁNÍ PRO TEBE"}</small><h3>{assignment.mission?.title || "Mise"}</h3></div>
                <strong>{completed ? "✓" : "→"}</strong>
              </div>
              <p>{assignment.mission?.summary || "Canonical školní mise."}</p>
              <div className="go2-school-assignment-meta">
                <span>{STATUS_LABELS[status] || status}</span>
                <span>{formatDate(assignment.dueAt)}</span>
              </div>
              <a className="go2-school-primary-link" href={`/go/school/quest/${assignment.id}`}>Otevřít quest</a>
            </article>
          );
        }) : <p className="go2-note">Zatím nemáš žádné aktivní školní zadání.</p>}
      </div>
    </section>
  );
}
export default function SchoolGoWorkspace({ snapshot }) {
  const classes = useMemo(() => snapshot?.classes || [], [snapshot?.classes]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const classData = useMemo(
    () => classes.find((item) => item.id === selectedClassId) || classes[0] || null,
    [classes, selectedClassId],
  );

  if (snapshot?.mode !== "school") return <LockedSchool snapshot={snapshot || { mode: "error" }} />;

  return (
    <div className="go2-stage go2-school-stage">
      <aside className="go2-desktop-note go2-school-aside">
        <b>PANSOFIE GO · ŠKOLA</b>
        <h2>{snapshot.school.name}</h2>
        <p>{snapshot.displayName} · {snapshot.roleLabel}</p>
        <ClassTabs classes={classes} selectedId={classData?.id || ""} onSelect={setSelectedClassId} />
        <p className="go2-school-aside-note">Třída je bezpečný pracovní kontext. Identita studenta zůstává jeho vlastní, oprávnění řídí membership + RLS.</p>
        <a href="/go">← GO domů</a>
        <a href="/app/school">Školní účet →</a>
      </aside>
      <main className="go2-phone go2-school-phone">
        <div className="go2-status"><span>GO</span><strong>ŠKOLA</strong><span>● ●</span></div>
        <div className="go2-content go2-school-content">
          <SchoolHeader snapshot={snapshot} className={classData?.name} />
          <div className="go2-school-role-strip"><span>{snapshot.roleLabel}</span><b>{classData?.academicYear || "Školní kontext"}</b></div>
          <ClassTabs classes={classes} selectedId={classData?.id || ""} onSelect={setSelectedClassId} />
          {!classData ? (
            <section className="go2-callout">
              <h2>Zatím bez třídy</h2>
              <p>V aktivním školním kontextu není třída, ke které má tento účet přístup.</p>
            </section>
          ) : classData.canManage ? (
            <>
              <StaffMetrics classData={classData} />
              <AssignmentComposer classData={classData} missions={snapshot.missions || []} />
              <StaffAssignments assignments={classData.assignments || []} />
              <StudentRoster classData={classData} />
            </>
          ) : (
            <LearnerAssignments assignments={classData.assignments || []} />
          )}
          <section className="go2-safety go2-school-safety">
            <div>
              <h2>Soukromí je výchozí stav</h2>
              <p>Školní GO neukazuje veřejné pořadí studentů. Progres je pracovní informace v rámci oprávněného školního kontextu, ne osobní reputace.</p>
            </div>
          </section>
        </div>
        <nav className="go2-school-dock" aria-label="Školní GO navigace">
          <a href="/go">GO</a>
          <a href="/go/mise">Mise</a>
          <a href="/go/school" aria-current="page">Škola</a>
          <a href="/go/portfolio">Portfolio</a>
        </nav>
      </main>
    </div>
  );
}
