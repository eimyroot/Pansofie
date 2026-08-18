import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  RefreshCw,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import PilotOperationsPanel from "@/components/pansofie/PilotOperationsPanel";
import {
  assignSchoolMission,
  listMyOrganizationMemberships,
  listMySchoolRuns,
  listOrganizationLearners,
  listPublishedMissions,
  listTeacherSchoolRuns,
} from "@/lib/pansofieExperienceFlow";

const STATUS_LABEL = {
  assigned: "Přiřazeno",
  in_progress: "Probíhá",
  submitted: "Čeká na kontrolu",
  completed: "Dokončeno",
  cancelled: "Zrušeno",
};

const STATUS_CLASS = {
  assigned: "status-info",
  in_progress: "status-progress",
  submitted: "status-waiting",
  completed: "status-success",
  cancelled: "status-neutral",
};

const StatusPill = ({ status }) => (
  <span className={`status-pill ${STATUS_CLASS[status] || "status-neutral"}`}>
    {STATUS_LABEL[status] || status}
  </span>
);

export default function SchoolHub() {
  const { user } = useAuth();
  const [memberships, setMemberships] = useState([]);
  const [myRuns, setMyRuns] = useState([]);
  const [missions, setMissions] = useState([]);
  const [learners, setLearners] = useState([]);
  const [teacherRuns, setTeacherRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [form, setForm] = useState({ organizationId: "", learnerId: "", missionId: "" });

  const teacherMemberships = useMemo(
    () => memberships.filter((item) => ["teacher", "coordinator"].includes(item.role)),
    [memberships]
  );
  const learnerName = useMemo(
    () => new Map(learners.map((item) => [item.user_id, item.display_name])),
    [learners]
  );

  const reload = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError("");
    try {
      const [membershipRows, runRows] = await Promise.all([
        listMyOrganizationMemberships(user.id),
        listMySchoolRuns(user.id),
      ]);
      setMemberships(membershipRows);
      setMyRuns(runRows);

      const teaching = membershipRows.filter((item) => ["teacher", "coordinator"].includes(item.role));
      const orgIds = teaching.map((item) => item.organization_id);
      if (orgIds.length) {
        const [missionRows, learnerRows, queueRows] = await Promise.all([
          listPublishedMissions(),
          listOrganizationLearners(orgIds),
          listTeacherSchoolRuns(orgIds),
        ]);
        setMissions(missionRows);
        setLearners(learnerRows);
        setTeacherRuns(queueRows);
        setForm((current) => ({
          organizationId: current.organizationId || orgIds[0] || "",
          learnerId: current.learnerId || learnerRows.find((row) => row.organization_id === (current.organizationId || orgIds[0]))?.user_id || "",
          missionId: current.missionId || missionRows[0]?.id || "",
        }));
      } else {
        setMissions([]);
        setLearners([]);
        setTeacherRuns([]);
      }
    } catch (err) {
      setError(err.message || "Školní datovou vrstvu se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { reload(); }, [reload]);

  const selectedOrgLearners = learners.filter((row) => row.organization_id === form.organizationId);
  const waitingReview = teacherRuns.filter((run) => run.status === "submitted");
  const learnerNextRun = myRuns.find((run) => ["assigned", "in_progress"].includes(run.status));

  const nextAction = useMemo(() => {
    if (waitingReview.length > 0) {
      return {
        eyebrow: "CO JE TEĎ NA MNĚ?",
        title: `Zkontrolovat ${waitingReview.length} ${waitingReview.length === 1 ? "čekající Experience" : "čekající Experiences"}`,
        detail: "Submitted běhy čekají na oddělené lidské review. Učitel nemění žákovu soukromou reflexi — přidává vlastní ověření a zpětnou vazbu.",
        to: `/skola/mise/${waitingReview[0].id}`,
        label: "Otevřít review frontu",
      };
    }
    if (learnerNextRun) {
      return {
        eyebrow: "CO JE TEĎ NA MNĚ?",
        title: learnerNextRun.status === "assigned" ? "Zahájit další Experience" : "Pokračovat v rozpracované Experience",
        detail: learnerNextRun.missions?.summary || learnerNextRun.missions?.why || "Pokračuj skutečnou činností, důkazem a reflexí.",
        to: `/skola/mise/${learnerNextRun.id}`,
        label: "Pokračovat v Experience",
      };
    }
    if (teacherMemberships.length > 0) {
      return {
        eyebrow: "CO JE TEĎ NA MNĚ?",
        title: "Připravit nebo zkontrolovat field pilot",
        detail: "Kohorta, tým, tři canonical Experiences a readiness gate jsou hlavní operátorský tok. Individuální přiřazení zůstává jen fallback.",
        to: "#pilot-operations",
        label: "Otevřít pilot operations",
      };
    }
    return null;
  }, [learnerNextRun, teacherMemberships.length, waitingReview]);

  const handleOrgChange = (organizationId) => {
    const firstLearner = learners.find((row) => row.organization_id === organizationId);
    setForm((current) => ({ ...current, organizationId, learnerId: firstLearner?.user_id || "" }));
  };

  const handleAssign = async (event) => {
    event.preventDefault();
    setActionMessage("");
    setError("");
    if (!form.organizationId || !form.learnerId || !form.missionId) {
      setError("Vyber školu, žáka a misi.");
      return;
    }
    setAssigning(true);
    try {
      await assignSchoolMission({ missionId: form.missionId, learnerId: form.learnerId, organizationId: form.organizationId });
      setActionMessage("Mise byla přiřazena a nový běh je připnutý k přesné immutable verzi zadání.");
      await reload();
    } catch (err) {
      setError(err.message || "Misi se nepodařilo přiřadit.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="product-shell" data-role="school">
      <header className="workspace-header">
        <div>
          <div className="workspace-kicker"><GraduationCap size={18} /><span>PANSOFIE SCHOOL</span></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold font-heading">Skutečné zkušenosti bez organizačního chaosu.</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">Mise se mění ve Experience až po reálné činnosti, důkazu, reflexi a odděleném ověření. Workspace proto prioritizuje další akci, ne množství funkcí.</p>
        </div>
        <button type="button" onClick={reload} disabled={loading} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </header>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex items-start gap-3"><AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" /><div><p className="font-semibold">Školní flow není v tomto prostředí dostupné.</p><p className="text-muted-foreground mt-1">{error}</p><p className="text-muted-foreground mt-1">R0.1–R0.3 a Field Pilot Operationalization R1 migrace musí být aplikované ve správném pořadí. UI samo databázi nemění.</p></div></div>}
      {actionMessage && <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex items-start gap-3"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /> {actionMessage}</div>}

      {nextAction && (
        <section className="next-action-card mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">
            <div>
              <p className="eyebrow">{nextAction.eyebrow}</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{nextAction.title}</h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">{nextAction.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="status-pill status-progress">{myRuns.filter((run) => ["assigned", "in_progress"].includes(run.status)).length} moje aktivní</span>
                <span className="status-pill status-waiting">{waitingReview.length} čeká review</span>
              </div>
            </div>
            {nextAction.to.startsWith("#") ? <a href={nextAction.to} className="action-primary">{nextAction.label} <ArrowRight size={17} /></a> : <Link to={nextAction.to} className="action-primary">{nextAction.label} <ArrowRight size={17} /></Link>}
          </div>
        </section>
      )}

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4"><BookOpen size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Moje školní Experiences</h2></div>
        {loading ? (
          <div className="card-soft p-6 text-sm text-muted-foreground">Načítám přiřazené mise…</div>
        ) : myRuns.length === 0 ? (
          <div className="card-soft p-6"><p className="font-medium">Zatím nemáš přiřazenou žádnou školní Experience.</p><p className="text-sm text-muted-foreground mt-1">Přiřazení vytváří učitel nebo koordinátor jen v organizaci, kde je aktivní účast a příslušný processing basis.</p></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {myRuns.map((run) => (
              <Link key={run.id} to={`/skola/mise/${run.id}`} className="card-soft p-5 group hover:-translate-y-0.5 transition-transform">
                <div className="flex items-start justify-between gap-4"><div><p className="text-xs text-muted-foreground mb-1">{run.organizations?.name || "PANSOFIE SCHOOL"}{run.team_id ? " · týmová Experience" : ""}</p><h3 className="font-semibold text-lg">{run.missions?.title || "Mise"}</h3></div><StatusPill status={run.status} /></div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{run.missions?.summary || run.missions?.why || "Praktická zkušenost v reálném světě."}</p>
                <div className="mt-4 text-sm text-primary font-semibold inline-flex items-center gap-1">Otevřít Experience <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {teacherMemberships.length > 0 && (
        <>
          <div id="pilot-operations" className="scroll-mt-24"><PilotOperationsPanel teacherMemberships={teacherMemberships} learners={learners} missions={missions} onChanged={reload} /></div>

          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4"><Users size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Individuální přiřazení</h2></div>
            <p className="text-sm text-muted-foreground mb-4">Fallback pro individuální Experience. Field pilot preferuje bounded týmové přiřazení výše.</p>
            <form onSubmit={handleAssign} className="surface-panel p-6 grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              <label className="text-sm"><span className="block font-medium mb-2">Organizace</span><select value={form.organizationId} onChange={(e) => handleOrgChange(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">{teacherMemberships.map((membership) => <option key={membership.id} value={membership.organization_id}>{membership.organizations?.name || membership.organization_id}</option>)}</select></label>
              <label className="text-sm"><span className="block font-medium mb-2">Žák</span><select value={form.learnerId} onChange={(e) => setForm((current) => ({ ...current, learnerId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">{selectedOrgLearners.map((learner) => <option key={learner.id} value={learner.user_id}>{learner.display_name}</option>)}</select></label>
              <label className="text-sm"><span className="block font-medium mb-2">Publikovaná mise</span><select value={form.missionId} onChange={(e) => setForm((current) => ({ ...current, missionId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">{missions.map((mission) => <option key={mission.id} value={mission.id}>{mission.title}</option>)}</select></label>
              <button type="submit" disabled={assigning || !selectedOrgLearners.length || !missions.length} className="action-primary rounded-xl">{assigning ? "Přiřazuji…" : "Přiřadit individuálně"}</button>
            </form>
          </section>

          <section>
            <div className="flex items-center justify-between gap-4 mb-4"><div className="flex items-center gap-2"><GraduationCap size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Učitelská fronta</h2></div><span className="text-xs text-muted-foreground">{teacherRuns.length} aktivních běhů</span></div>
            {teacherRuns.length === 0 ? (
              <div className="card-soft p-6 text-sm text-muted-foreground">Žádné aktivní školní běhy k zobrazení.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {teacherRuns.map((run) => (
                  <Link key={run.id} to={`/skola/mise/${run.id}`} className="card-soft p-5 flex flex-col sm:flex-row sm:items-center gap-4 group"><div className="flex-1"><p className="text-xs text-muted-foreground">{run.organizations?.name || "Organizace"} · {learnerName.get(run.user_id) || `Žák ${run.user_id.slice(0, 8)}`}{run.team_id ? " · tým" : ""}</p><h3 className="font-semibold mt-1">{run.missions?.title || "Mise"}</h3></div><div className="flex items-center gap-3"><StatusPill status={run.status} /><ArrowRight size={16} className="text-primary transition-transform group-hover:translate-x-1" /></div></Link>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
