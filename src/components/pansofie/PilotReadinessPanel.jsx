import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Gauge,
  RefreshCw,
  ShieldCheck,
  TimerReset,
  UserRoundCheck,
} from "lucide-react";
import {
  PILOT_RESPONSIBILITIES,
  activatePilotCohort,
  getPilotMetrics,
  getPilotReadiness,
  listPilotIncidents,
  listPilotResponsibilities,
  recordPilotTeacherLoad,
  reportPilotIncident,
  setPilotIncidentStatus,
  setPilotResponsibility,
} from "@/lib/pansofieExperienceFlow";

const RESPONSIBILITY_LABELS = {
  pilot_lead: "Pilot lead",
  safeguarding: "Safeguarding kontakt",
  privacy_data: "Privacy / data kontakt",
  technical_incident: "Technický incident kontakt",
  partner_contact: "Partner kontakt",
  pansofie_operator: "PANSOFIE operator",
};

const GATE_LABELS = [
  ["plan_count", "required_plan_count", "Fixní plán 3 Experiences"],
  ["responsibility_count", "required_responsibility_count", "6 potvrzených odpovědností"],
];

const mondayIso = () => {
  const date = new Date();
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return date.toISOString().slice(0, 10);
};

const fmt = (value, suffix = "") => value === null || value === undefined ? "—" : `${value}${suffix}`;

export default function PilotReadinessPanel({ cohort, onChanged }) {
  const [readiness, setReadiness] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [responsibilities, setResponsibilities] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [responsibilityForm, setResponsibilityForm] = useState({
    responsibility: PILOT_RESPONSIBILITIES[0],
    contactName: "",
    contactEmail: "",
  });
  const [loadForm, setLoadForm] = useState({ weekStart: mondayIso(), minutes: "", note: "" });
  const [incidentForm, setIncidentForm] = useState({ severity: "S1", category: "safety", summary: "" });

  const responsibilityMap = useMemo(
    () => new Map(responsibilities.map((item) => [item.responsibility, item])),
    [responsibilities]
  );

  const load = useCallback(async () => {
    if (!cohort?.id) {
      setReadiness(null);
      setMetrics(null);
      setResponsibilities([]);
      setIncidents([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const [ready, metricRows, responsibilityRows, incidentRows] = await Promise.all([
        getPilotReadiness(cohort.id),
        getPilotMetrics(cohort.id),
        listPilotResponsibilities(cohort.id),
        listPilotIncidents(cohort.id),
      ]);
      setReadiness(ready);
      setMetrics(metricRows);
      setResponsibilities(responsibilityRows);
      setIncidents(incidentRows);
    } catch (err) {
      setError(err.message || "Readiness vrstvu se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, [cohort?.id]);

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
      setError(err.message || "Pilotní readiness operace selhala.");
    } finally {
      setBusy(false);
    }
  };

  if (!cohort) {
    return (
      <div className="mt-5 rounded-2xl border border-dashed border-border bg-background p-5 text-sm text-muted-foreground">
        Vyber nebo založ kohortu. Readiness gate se vztahuje vždy ke konkrétnímu bounded field pilotu.
      </div>
    );
  }

  const ready = Boolean(readiness?.ready);
  const statusActive = cohort.status === "active";
  const allTeamBound = Number(readiness?.active_learners || 0) > 0 && readiness?.team_learners === readiness?.active_learners;

  return (
    <div className="mt-6 rounded-3xl border border-foreground/10 bg-background p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary"><ShieldCheck size={18} /><p className="text-xs font-semibold uppercase tracking-wide">Field Pilot Readiness R2</p></div>
          <h3 className="mt-2 text-xl font-semibold font-heading">{cohort.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">Pilot lze aktivovat až po splnění provozních, safeguarding a datových předpokladů. Metriky níže hodnotí pilotní provoz, ne člověka.</p>
        </div>
        <button type="button" onClick={load} disabled={loading || busy} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit readiness</button>
      </div>

      {error && <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-2"><AlertTriangle size={17} className="text-destructive shrink-0 mt-0.5" /><span>{error}</span></div>}
      {message && <div className="mt-4 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-2"><CheckCircle2 size={17} className="text-primary shrink-0 mt-0.5" /><span>{message}</span></div>}

      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {GATE_LABELS.map(([valueKey, requiredKey, label]) => {
          const value = Number(readiness?.[valueKey] || 0);
          const required = Number(readiness?.[requiredKey] || 0);
          const pass = required > 0 && value === required;
          return <div key={valueKey} className="rounded-2xl border border-border p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold">{value}/{required || "—"}</p><p className={`mt-1 text-xs ${pass ? "text-primary" : "text-muted-foreground"}`}>{pass ? "PASS" : "PENDING"}</p></div>;
        })}
        <div className="rounded-2xl border border-border p-4"><p className="text-xs text-muted-foreground">Learneři v týmu</p><p className="mt-2 text-xl font-semibold">{readiness?.team_learners || 0}/{readiness?.active_learners || 0}</p><p className={`mt-1 text-xs ${allTeamBound ? "text-primary" : "text-muted-foreground"}`}>{allTeamBound ? "PASS" : "PENDING"}</p></div>
        <div className="rounded-2xl border border-border p-4"><p className="text-xs text-muted-foreground">Assignment basis / S2-S3 / datumy</p><p className="mt-2 text-sm font-semibold">{readiness?.learners_missing_assignment_basis || 0} missing · {readiness?.unresolved_s2_s3 || 0} incidentů</p><p className={`mt-1 text-xs ${readiness?.learners_missing_assignment_basis === 0 && readiness?.unresolved_s2_s3 === 0 && readiness?.dates_ready ? "text-primary" : "text-muted-foreground"}`}>{readiness?.dates_ready ? "DATUMY OK" : "DATUMY CHYBÍ"}</p></div>
      </div>

      <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/[0.035] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Activation gate</p><p className="mt-1 font-semibold">{statusActive ? "Pilot je aktivní." : ready ? "Readiness je PASS — pilot lze aktivovat." : "Pilot zůstává planned, dokud readiness není PASS."}</p></div>
        <button type="button" disabled={busy || loading || statusActive || !ready} onClick={() => run(() => activatePilotCohort(cohort.id), "Pilotní kohorta byla aktivována po PASS readiness gate.")} className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold disabled:opacity-40">Aktivovat field pilot</button>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-5">
        <section className="rounded-2xl border border-border p-4 sm:p-5">
          <div className="flex items-center gap-2"><UserRoundCheck size={17} className="text-primary" /><h4 className="font-semibold">Odpovědné kontakty</h4></div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">{PILOT_RESPONSIBILITIES.map((key) => <div key={key} className="rounded-xl border border-border p-3"><p className="font-medium">{RESPONSIBILITY_LABELS[key]}</p><p className="mt-1 text-muted-foreground truncate">{responsibilityMap.get(key)?.contact_name || "nepřiřazeno"}</p></div>)}</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select value={responsibilityForm.responsibility} onChange={(e) => setResponsibilityForm((current) => ({ ...current, responsibility: e.target.value }))} className="rounded-xl border border-border px-3 py-2.5 text-sm">{PILOT_RESPONSIBILITIES.map((key) => <option key={key} value={key}>{RESPONSIBILITY_LABELS[key]}</option>)}</select>
            <input value={responsibilityForm.contactName} onChange={(e) => setResponsibilityForm((current) => ({ ...current, contactName: e.target.value }))} placeholder="Jméno kontaktu" className="rounded-xl border border-border px-3 py-2.5 text-sm" />
            <input type="email" value={responsibilityForm.contactEmail} onChange={(e) => setResponsibilityForm((current) => ({ ...current, contactEmail: e.target.value }))} placeholder="kontakt@example.cz" className="rounded-xl border border-border px-3 py-2.5 text-sm" />
          </div>
          <button type="button" disabled={busy || !responsibilityForm.contactName.trim() || !responsibilityForm.contactEmail.trim()} onClick={() => run(() => setPilotResponsibility({ cohortId: cohort.id, ...responsibilityForm }), "Odpovědnost byla potvrzena.")} className="mt-3 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40">Uložit odpovědnost</button>
        </section>

        <section className="rounded-2xl border border-border p-4 sm:p-5">
          <div className="flex items-center gap-2"><TimerReset size={17} className="text-primary" /><h4 className="font-semibold">Teacher load evidence</h4></div>
          <p className="mt-2 text-xs text-muted-foreground">Měříme provozní zátěž pilotu, ne výkon učitele.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2"><input type="date" value={loadForm.weekStart} onChange={(e) => setLoadForm((current) => ({ ...current, weekStart: e.target.value }))} className="rounded-xl border border-border px-3 py-2.5 text-sm" /><input type="number" min="0" max="1440" value={loadForm.minutes} onChange={(e) => setLoadForm((current) => ({ ...current, minutes: e.target.value }))} placeholder="minuty / týden" className="rounded-xl border border-border px-3 py-2.5 text-sm" /><input value={loadForm.note} onChange={(e) => setLoadForm((current) => ({ ...current, note: e.target.value }))} placeholder="poznámka (volitelné)" className="rounded-xl border border-border px-3 py-2.5 text-sm" /></div>
          <button type="button" disabled={busy || loadForm.minutes === ""} onClick={() => run(() => recordPilotTeacherLoad({ cohortId: cohort.id, ...loadForm }), "Teacher load evidence byla uložena.")} className="mt-3 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40">Zapsat týdenní zátěž</button>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-border p-4 sm:p-5">
        <div className="flex items-center gap-2"><AlertTriangle size={17} className="text-primary" /><h4 className="font-semibold">Incident gate</h4></div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-[0.5fr_0.8fr_2fr_auto] gap-2"><select value={incidentForm.severity} onChange={(e) => setIncidentForm((current) => ({ ...current, severity: e.target.value }))} className="rounded-xl border border-border px-3 py-2.5 text-sm"><option>S1</option><option>S2</option><option>S3</option></select><select value={incidentForm.category} onChange={(e) => setIncidentForm((current) => ({ ...current, category: e.target.value }))} className="rounded-xl border border-border px-3 py-2.5 text-sm"><option value="safety">safety</option><option value="privacy">privacy</option><option value="technical">technical</option><option value="partner">partner</option><option value="other">other</option></select><input value={incidentForm.summary} onChange={(e) => setIncidentForm((current) => ({ ...current, summary: e.target.value }))} placeholder="Stručný popis incidentu" className="rounded-xl border border-border px-3 py-2.5 text-sm" /><button type="button" disabled={busy || !incidentForm.summary.trim()} onClick={() => run(async () => { await reportPilotIncident({ cohortId: cohort.id, ...incidentForm }); setIncidentForm((current) => ({ ...current, summary: "" })); }, "Incident byl zapsán.")} className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40">Zapsat</button></div>
        {incidents.length > 0 && <div className="mt-4 space-y-2">{incidents.slice(0, 5).map((incident) => <div key={incident.id} className="rounded-xl border border-border p-3 flex flex-col sm:flex-row sm:items-center gap-3 text-sm"><span className="font-semibold">{incident.severity}</span><span className="text-muted-foreground">{incident.category}</span><span className="flex-1">{incident.summary}</span><span className="text-xs text-muted-foreground">{incident.status}</span>{incident.status !== "closed" && <button type="button" disabled={busy} onClick={() => run(() => setPilotIncidentStatus({ incidentId: incident.id, status: "closed" }), "Incident byl uzavřen.")} className="text-xs font-semibold text-primary">Uzavřít</button>}</div>)}</div>}
      </section>

      <section className="mt-5 rounded-2xl border border-border p-4 sm:p-5">
        <div className="flex items-center gap-2"><Gauge size={17} className="text-primary" /><h4 className="font-semibold">Pilot evidence indicators</h4></div>
        <p className="mt-2 text-xs text-muted-foreground">Candidate thresholds pomáhají Evidence Review. Nejsou automatickým rozhodnutím a nejsou skóre člověka.</p>
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Second Experience Rate</p><p className="mt-1 text-xl font-semibold">{fmt(metrics?.second_experience_rate_percent, "%")}</p><p className="text-xs text-muted-foreground">candidate ≥ 60 %</p></div>
          <div className="rounded-xl bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Dokončili ≥ 2/3</p><p className="mt-1 text-xl font-semibold">{fmt(metrics?.completion_2_of_3_rate_percent, "%")}</p><p className="text-xs text-muted-foreground">candidate ≥ 70 %</p></div>
          <div className="rounded-xl bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Median teacher load</p><p className="mt-1 text-xl font-semibold">{fmt(metrics?.median_teacher_overhead_minutes_per_week, " min")}</p><p className="text-xs text-muted-foreground">candidate ≤ 30 min/týden</p></div>
          <div className="rounded-xl bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Unresolved S2/S3</p><p className="mt-1 text-xl font-semibold">{fmt(metrics?.unresolved_s2_s3)}</p><p className="text-xs text-muted-foreground">candidate = 0</p></div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Automatic GO/STOP: <strong>{metrics?.automatic_go_stop_decision === false ? "vypnuto" : "—"}</strong>. Finální rozhodnutí vzniká až v evidenčním review.</p>
      </section>
    </div>
  );
}
