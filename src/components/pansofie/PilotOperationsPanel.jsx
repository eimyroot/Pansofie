import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Layers3, Plus, RefreshCw, UsersRound } from "lucide-react";
import {
  addExperienceTeamMember,
  addPilotCohortMember,
  assignPilotTeamMission,
  createExperienceTeam,
  createPilotCohort,
  listExperienceTeams,
  listPilotCohorts,
} from "@/lib/pansofieExperienceFlow";

const PILOT_MISSION_ORDER = ["zlepsi-svou-skolu", "digitalni-most", "circular-challenge"];

export default function PilotOperationsPanel({ teacherMemberships = [], learners = [], missions = [], onChanged }) {
  const organizationIds = useMemo(() => teacherMemberships.map((item) => item.organization_id), [teacherMemberships]);
  const [cohorts, setCohorts] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    organizationId: organizationIds[0] || "",
    cohortId: "",
    cohortName: "První pilotní kohorta",
    teamId: "",
    teamName: "Tým 1",
    learnerId: "",
    missionId: "",
  });

  const pilotMissions = useMemo(
    () => PILOT_MISSION_ORDER.map((slug) => missions.find((mission) => mission.slug === slug)).filter(Boolean),
    [missions]
  );

  const visibleCohorts = cohorts.filter((item) => item.organization_id === form.organizationId);
  const visibleTeams = teams.filter((item) => item.cohort_id === form.cohortId);
  const visibleLearners = learners.filter((item) => item.organization_id === form.organizationId);

  const load = useCallback(async () => {
    if (!organizationIds.length) return;
    setLoading(true);
    setError("");
    try {
      const cohortRows = await listPilotCohorts(organizationIds);
      const teamRows = await listExperienceTeams(cohortRows.map((item) => item.id));
      setCohorts(cohortRows);
      setTeams(teamRows);
      setForm((current) => {
        const organizationId = current.organizationId || organizationIds[0] || "";
        const cohortId = current.cohortId || cohortRows.find((item) => item.organization_id === organizationId)?.id || "";
        const teamId = current.teamId || teamRows.find((item) => item.cohort_id === cohortId)?.id || "";
        const learnerId = current.learnerId || learners.find((item) => item.organization_id === organizationId)?.user_id || "";
        const missionId = current.missionId || pilotMissions[0]?.id || "";
        return { ...current, organizationId, cohortId, teamId, learnerId, missionId };
      });
    } catch (err) {
      setError(err.message || "Pilotní operace se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, [organizationIds, learners, pilotMissions]);

  useEffect(() => { load(); }, [load]);

  const run = async (action, successMessage) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await action();
      setMessage(successMessage);
      await load();
      await onChanged?.();
    } catch (err) {
      setError(err.message || "Pilotní operace selhala.");
    } finally {
      setBusy(false);
    }
  };

  const handleOrgChange = (organizationId) => {
    const cohortId = cohorts.find((item) => item.organization_id === organizationId)?.id || "";
    const teamId = teams.find((item) => item.cohort_id === cohortId)?.id || "";
    const learnerId = learners.find((item) => item.organization_id === organizationId)?.user_id || "";
    setForm((current) => ({ ...current, organizationId, cohortId, teamId, learnerId }));
  };

  const handleCohortChange = (cohortId) => {
    const teamId = teams.find((item) => item.cohort_id === cohortId)?.id || "";
    setForm((current) => ({ ...current, cohortId, teamId }));
  };

  return (
    <section className="mb-12 rounded-[2rem] border border-primary/20 bg-primary/[0.025] p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary"><Layers3 size={18} /><p className="text-xs font-semibold uppercase tracking-wide">Field Pilot Operations R1</p></div>
          <h2 className="mt-2 text-2xl font-semibold font-heading">Kohorta → tým → canonical Experience</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">Tým sdílí kontext a výstup, ale každý žák dál dostává vlastní run, vlastní reflexi a vlastní Passport. Mission run je připnutý k immutable verzi zadání.</p>
        </div>
        <button type="button" onClick={load} disabled={loading || busy} className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </div>

      {error && <div className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm">{error}</div>}
      {message && <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-2"><CheckCircle2 size={17} className="text-primary shrink-0" />{message}</div>}

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <label className="text-sm"><span className="block font-medium mb-2">Škola</span><select value={form.organizationId} onChange={(e) => handleOrgChange(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">{teacherMemberships.map((membership) => <option key={membership.id} value={membership.organization_id}>{membership.organizations?.name || membership.organization_id}</option>)}</select></label>
        <label className="text-sm"><span className="block font-medium mb-2">Kohorta</span><select value={form.cohortId} onChange={(e) => handleCohortChange(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5"><option value="">— zatím žádná —</option>{visibleCohorts.map((cohort) => <option key={cohort.id} value={cohort.id}>{cohort.name}</option>)}</select></label>
        <label className="text-sm"><span className="block font-medium mb-2">Tým</span><select value={form.teamId} onChange={(e) => setForm((current) => ({ ...current, teamId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5"><option value="">— zatím žádný —</option>{visibleTeams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></label>
        <label className="text-sm"><span className="block font-medium mb-2">Žák do týmu</span><select value={form.learnerId} onChange={(e) => setForm((current) => ({ ...current, learnerId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5"><option value="">— vyber žáka —</option>{visibleLearners.map((learner) => <option key={learner.id} value={learner.user_id}>{learner.display_name}</option>)}</select></label>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">1. Založit kohortu</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-3"><input value={form.cohortName} onChange={(e) => setForm((current) => ({ ...current, cohortName: e.target.value }))} className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm" /><button type="button" disabled={busy || !form.organizationId || !form.cohortName.trim()} onClick={() => run(async () => { const id = await createPilotCohort({ organizationId: form.organizationId, name: form.cohortName.trim() }); setForm((current) => ({ ...current, cohortId: id })); }, "Kohorta byla založena jako planned.")} className="rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold disabled:opacity-50 inline-flex items-center justify-center gap-2"><Plus size={15} /> Kohorta</button></div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">2. Založit tým</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-3"><input value={form.teamName} onChange={(e) => setForm((current) => ({ ...current, teamName: e.target.value }))} className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm" /><button type="button" disabled={busy || !form.cohortId || !form.teamName.trim()} onClick={() => run(async () => { const id = await createExperienceTeam({ cohortId: form.cohortId, name: form.teamName.trim() }); setForm((current) => ({ ...current, teamId: id })); }, "Experience tým byl založen.")} className="rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold disabled:opacity-50 inline-flex items-center justify-center gap-2"><UsersRound size={15} /> Tým</button></div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">3. Přidat žáka</p>
          <p className="mt-2 text-xs text-muted-foreground">Nejdřív se zapíše do kohorty, potom do vybraného týmu. Musí už být aktivním learner členem školy.</p>
          <button type="button" disabled={busy || !form.cohortId || !form.teamId || !form.learnerId} onClick={() => run(async () => { await addPilotCohortMember({ cohortId: form.cohortId, userId: form.learnerId, role: "learner" }); await addExperienceTeamMember({ teamId: form.teamId, userId: form.learnerId, role: "learner" }); }, "Žák byl přidán do kohorty a týmu.")} className="mt-4 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-50">Přidat vybraného žáka</button>
        </div>

        <div className="rounded-2xl border border-primary/25 bg-primary/[0.035] p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">4. Přiřadit týmovou Experience</p>
          <select value={form.missionId} onChange={(e) => setForm((current) => ({ ...current, missionId: e.target.value }))} className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm"><option value="">— vyber canonical Experience —</option>{pilotMissions.map((mission, index) => <option key={mission.id} value={mission.id}>{index + 1}. {mission.title}</option>)}</select>
          <button type="button" disabled={busy || !form.teamId || !form.missionId} onClick={() => run(async () => { const rows = await assignPilotTeamMission({ missionId: form.missionId, teamId: form.teamId }); setMessage(`Experience byla přiřazena ${rows.length} aktivním členům týmu.`); }, "Experience byla přiřazena týmu.")} className="mt-4 w-full rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold disabled:opacity-50">Přiřadit celému týmu</button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {pilotMissions.map((mission, index) => <span key={mission.id} className="rounded-full border border-border bg-background px-3 py-1.5">{index + 1}. {mission.title}</span>)}
        {pilotMissions.length !== 3 && <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1.5">Canonical 3 Experiences nejsou v tomto prostředí kompletní.</span>}
      </div>
    </section>
  );
}
