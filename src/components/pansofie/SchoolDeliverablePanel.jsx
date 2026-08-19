import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FileCheck2, RefreshCw, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { listMyOrganizationMemberships } from "@/lib/pansofieExperienceFlow";
import { listSchoolChallengeAssignments, listSchoolChallengeOutcomes, submitSchoolChallengeDeliverable } from "@/lib/pansofiePartnerFlow";

export default function SchoolDeliverablePanel() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({ title: "", summary: "", kind: "other", uri: "" });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true); setError("");
    try {
      const memberships = await listMyOrganizationMemberships(user.id);
      const orgIds = memberships.filter((m) => ["teacher", "coordinator"].includes(m.role)).map((m) => m.organization_id);
      const [assignmentRows, outcomeRows] = await Promise.all([
        listSchoolChallengeAssignments(orgIds),
        listSchoolChallengeOutcomes(orgIds),
      ]);
      const active = assignmentRows.filter((row) => ["active", "completed"].includes(row.assignment_status));
      setAssignments(active);
      setOutcomes(outcomeRows);
      if (!active.some((row) => row.assignment_id === selectedId)) setSelectedId(active[0]?.assignment_id || "");
    } catch (err) { setError(err.message || "R5 School výstupy se nepodařilo načíst."); }
    finally { setLoading(false); }
  }, [selectedId, user?.id]);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const selected = useMemo(() => assignments.find((row) => row.assignment_id === selectedId) || assignments[0] || null, [assignments, selectedId]);
  const selectedHistory = outcomes.filter((row) => row.assignment_id === selected?.assignment_id && row.deliverable_id);

  const submit = async (event) => {
    event.preventDefault();
    if (!selected) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await submitSchoolChallengeDeliverable({ assignmentId: selected.assignment_id, ...form });
      setForm({ title: "", summary: "", kind: "other", uri: "" });
      setMessage("Bounded Partner výstup byl uložen jako nová immutable revision. Raw learner evidence ani soukromá reflexe nebyly partnerovi zpřístupněny.");
      await load();
    } catch (err) { setError(err.message || "Výstup se nepodařilo odeslat."); }
    finally { setBusy(false); }
  };

  return (
    <section className="mt-10 border-t border-border pt-10" aria-label="School Partner Deliverable R5">
      <div className="workspace-header">
        <div>
          <div className="workspace-kicker"><FileCheck2 size={18} /><span>SCHOOL · PARTNER OUTPUT · R5</span></div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Odeslat bezpečný výstup partnerovi.</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">Škola vytváří samostatnou bounded projekci výsledku. Partner nedostává automatický přístup k raw evidence, soukromé reflexi ani Passportu learnera.</p>
        </div>
        <button type="button" onClick={load} disabled={busy || loading} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </div>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-3"><AlertTriangle size={18} className="text-destructive shrink-0" />{error}</div>}
      {message && <div role="status" className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0" />{message}</div>}

      <div className="next-action-card mb-8"><p className="eyebrow">CO JE TEĎ NA MNĚ?</p><h3 className="mt-2 text-2xl sm:text-3xl font-semibold">{assignments.length ? "Zveřejnit Partnerovi jen to, co je určeno k review" : "Žádná aktivní Partner Challenge nemá připravený R5 krok"}</h3><p className="mt-2 text-sm text-muted-foreground">Každá odeslaná revision je nový immutable artefakt s přesnou Challenge, assignment, team a Mission-version provenance.</p></div>

      {loading ? <div className="surface-panel p-6 text-sm text-muted-foreground">Načítám aktivní Challenges…</div> : assignments.length === 0 ? <div className="surface-panel p-6 text-sm text-muted-foreground">Nejdřív musí existovat School-accepted aktivní Challenge.</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-5 items-start">
          <aside className="surface-panel p-5 space-y-2">{assignments.map((row) => <button key={row.assignment_id} type="button" onClick={() => setSelectedId(row.assignment_id)} className={`w-full text-left rounded-2xl border p-4 ${selected?.assignment_id === row.assignment_id ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card"}`}><p className="text-xs text-muted-foreground">{row.partner_organization_name}</p><p className="mt-1 font-semibold text-sm">{row.title}</p><p className="mt-2 text-xs text-muted-foreground">{row.team_name} · {row.assignment_status}</p></button>)}</aside>

          {selected && <div className="space-y-5">
            <form onSubmit={submit} className="surface-raised p-5 sm:p-6"><p className="eyebrow">BOUNDED DELIVERABLE</p><h3 className="mt-2 text-2xl font-semibold">{selected.title}</h3><div className="mt-5 surface-subtle p-4 text-sm"><p className="text-xs font-semibold text-primary">DOHODNUTÝ VÝSTUP</p><p className="mt-2 text-muted-foreground">{selected.desired_output}</p></div><div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4"><label className="text-sm sm:col-span-2">Název výstupu *<input required maxLength={200} value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label><label className="text-sm sm:col-span-2">Bezpečné shrnutí pro Partnera *<textarea required rows={4} maxLength={5000} value={form.summary} onChange={(e) => setForm((v) => ({ ...v, summary: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label><label className="text-sm">Typ<select value={form.kind} onChange={(e) => setForm((v) => ({ ...v, kind: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5"><option value="document">Dokument</option><option value="presentation">Prezentace</option><option value="prototype">Prototyp</option><option value="report">Report</option><option value="media">Média</option><option value="other">Jiné</option></select></label><label className="text-sm">URI — volitelné<input value={form.uri} onChange={(e) => setForm((v) => ({ ...v, uri: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label></div><button disabled={busy || !form.title.trim() || !form.summary.trim()} className="action-primary mt-5">Odeslat bezpečný výstup partnerovi</button></form>

            <section className="surface-panel p-5 sm:p-6"><h3 className="font-semibold">Partner review historie</h3>{selectedHistory.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">Zatím nebyla odeslána žádná bounded revision.</p> : <div className="mt-4 space-y-3">{selectedHistory.map((row) => <div key={row.deliverable_id} className="surface-subtle p-4 text-sm"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{row.deliverable_title} · rev. {row.deliverable_revision}</p><span className={`status-pill ${row.adoption_decision ? "status-success" : "status-waiting"}`}>{row.adoption_decision ? "REVIEWED" : "ČEKÁ NA PARTNERA"}</span></div><p className="mt-2 text-muted-foreground">{row.deliverable_summary}</p>{row.adoption_decision && <div className="mt-3 border-t border-border pt-3"><p><strong>Rozhodnutí partnera:</strong> {String(row.adoption_decision).toUpperCase().replaceAll("_", " ")}</p>{row.useful_text && <p className="mt-1"><strong>Užitečné:</strong> {row.useful_text}</p>}{row.changes_needed && <p className="mt-1"><strong>Změnit:</strong> {row.changes_needed}</p>}{row.latest_outcome_status && <p className="mt-2"><span className="status-pill status-waiting">OUTCOME {String(row.latest_outcome_status).toUpperCase()} · {String(row.latest_outcome_confidence).toUpperCase()}</span></p>}</div>}</div>)}</div>}</section>

            <section className="surface-panel p-5"><div className="flex items-start gap-3"><ShieldCheck size={19} className="text-primary shrink-0" /><p className="text-sm text-muted-foreground">R5 výstup je vědomě oddělený od learner evidence/reflection. Škola rozhoduje, co je bezpečné sdílet jako týmový výstup; Partner review se nesmí změnit v assessment člověka.</p></div></section>
          </div>}
        </div>
      )}
    </section>
  );
}
