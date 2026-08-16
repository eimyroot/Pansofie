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

const StatusPill = ({ status }) => (
  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
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
  const teacherOrgIds = useMemo(
    () => teacherMemberships.map((item) => item.organization_id),
    [teacherMemberships]
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

  useEffect(() => {
    reload();
  }, [reload]);

  const selectedOrgLearners = learners.filter((row) => row.organization_id === form.organizationId);

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
      await assignSchoolMission({
        missionId: form.missionId,
        learnerId: form.learnerId,
        organizationId: form.organizationId,
      });
      setActionMessage("Mise byla přiřazena. Pokud už existoval aktivní běh stejné mise, zůstal zachován původní běh.");
      await reload();
    } catch (err) {
      setError(err.message || "Misi se nepodařilo přiřadit.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2"><GraduationCap size={20} /><span className="text-sm font-semibold">PANSOFIE SCHOOL</span></div>
          <h1 className="text-2xl sm:text-3xl font-semibold font-heading">Skutečné zkušenosti</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Přiřazená mise se mění ve zkušenost teprve po reálné činnosti, důkazu, reflexi a odděleném ověření.</p>
        </div>
        <button type="button" onClick={reload} disabled={loading} className="px-4 py-2 rounded-xl border border-border bg-card inline-flex items-center gap-2 text-sm font-medium disabled:opacity-50">
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex items-start gap-3">
          <AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" />
          <div><p className="font-semibold">Školní flow není v tomto prostředí dostupné.</p><p className="text-muted-foreground mt-1">{error}</p><p className="text-muted-foreground mt-1">R0.1–R0.3 Supabase migrace musí být aplikované ve správném pořadí. UI samo databázi nemění.</p></div>
        </div>
      )}

      {actionMessage && (
        <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex items-start gap-3">
          <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /> {actionMessage}
        </div>
      )}

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4"><BookOpen size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Moje školní mise</h2></div>
        {loading ? (
          <div className="card-soft p-6 text-sm text-muted-foreground">Načítám přiřazené mise…</div>
        ) : myRuns.length === 0 ? (
          <div className="card-soft p-6"><p className="font-medium">Zatím nemáš přiřazenou žádnou školní misi.</p><p className="text-sm text-muted-foreground mt-1">Přiřazení vytváří učitel nebo koordinátor jen v organizaci, kde je aktivní účast a příslušný processing basis.</p></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {myRuns.map((run) => (
              <Link key={run.id} to={`/skola/mise/${run.id}`} className="card-soft p-5 group hover:-translate-y-0.5 transition-transform">
                <div className="flex items-start justify-between gap-4"><div><p className="text-xs text-muted-foreground mb-1">{run.organizations?.name || "PANSOFIE SCHOOL"}</p><h3 className="font-semibold text-lg">{run.missions?.title || "Mise"}</h3></div><StatusPill status={run.status} /></div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{run.missions?.summary || run.missions?.why || "Praktická zkušenost v reálném světě."}</p>
                <div className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1">Otevřít zkušenost <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {teacherMemberships.length > 0 && (
        <>
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4"><Users size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Přiřadit misi</h2></div>
            <form onSubmit={handleAssign} className="card-soft p-6 grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              <label className="text-sm"><span className="block font-medium mb-2">Organizace</span><select value={form.organizationId} onChange={(e) => handleOrgChange(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">
                {teacherMemberships.map((membership) => <option key={membership.id} value={membership.organization_id}>{membership.organizations?.name || membership.organization_id}</option>)}
              </select></label>
              <label className="text-sm"><span className="block font-medium mb-2">Žák</span><select value={form.learnerId} onChange={(e) => setForm((current) => ({ ...current, learnerId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">
                {selectedOrgLearners.map((learner) => <option key={learner.id} value={learner.user_id}>{learner.display_name}</option>)}
              </select></label>
              <label className="text-sm"><span className="block font-medium mb-2">Publikovaná mise</span><select value={form.missionId} onChange={(e) => setForm((current) => ({ ...current, missionId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">
                {missions.map((mission) => <option key={mission.id} value={mission.id}>{mission.title}</option>)}
              </select></label>
              <button type="submit" disabled={assigning || !selectedOrgLearners.length || !missions.length} className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 font-semibold disabled:opacity-50">{assigning ? "Přiřazuji…" : "Přiřadit misi"}</button>
            </form>
          </section>

          <section>
            <div className="flex items-center justify-between gap-4 mb-4"><div className="flex items-center gap-2"><GraduationCap size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Učitelská fronta</h2></div><span className="text-xs text-muted-foreground">{teacherRuns.length} aktivních běhů</span></div>
            {teacherRuns.length === 0 ? (
              <div className="card-soft p-6 text-sm text-muted-foreground">Žádné aktivní školní běhy k zobrazení.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {teacherRuns.map((run) => (
                  <Link key={run.id} to={`/skola/mise/${run.id}`} className="card-soft p-5 flex flex-col sm:flex-row sm:items-center gap-4 group">
                    <div className="flex-1"><p className="text-xs text-muted-foreground">{run.organizations?.name || "Organizace"} · {learnerName.get(run.user_id) || `Žák ${run.user_id.slice(0, 8)}`}</p><h3 className="font-semibold mt-1">{run.missions?.title || "Mise"}</h3></div>
                    <div className="flex items-center gap-3"><StatusPill status={run.status} /><ArrowRight size={16} className="text-primary transition-transform group-hover:translate-x-1" /></div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
