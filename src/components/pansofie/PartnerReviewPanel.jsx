import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FileCheck2, RefreshCw, ShieldCheck } from "lucide-react";
import { listMyPartnerDeliverables, reportPartnerOutcome, reviewPartnerDeliverable } from "@/lib/pansofiePartnerFlow";

const DECISIONS = [
  ["not_adopt", "NOT ADOPT"],
  ["explore_further", "EXPLORE FURTHER"],
  ["pilot", "PILOT"],
];

export default function PartnerReviewPanel() {
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [review, setReview] = useState({ addressedBrief: "", usefulText: "", changesNeeded: "", decision: "", decisionNote: "" });
  const [outcome, setOutcome] = useState({ whatChanged: "", beneficiary: "", observedOn: "", sourceText: "", evidenceUri: "" });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await listMyPartnerDeliverables();
      setRows(data);
      if (!data.some((row) => row.deliverable_id === selectedId)) setSelectedId(data[0]?.deliverable_id || "");
    } catch (err) { setError(err.message || "Partner výstupy se nepodařilo načíst."); }
    finally { setLoading(false); }
  }, [selectedId]);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const selected = useMemo(() => rows.find((row) => row.deliverable_id === selectedId) || rows[0] || null, [rows, selectedId]);
  const waiting = rows.filter((row) => !row.reviewed_at);

  const submitReview = async (event) => {
    event.preventDefault();
    if (!selected) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await reviewPartnerDeliverable({ deliverableId: selected.deliverable_id, ...review });
      setReview({ addressedBrief: "", usefulText: "", changesNeeded: "", decision: "", decisionNote: "" });
      setMessage("Review výstupu a rozhodnutí byly uloženy jako neměnný záznam.");
      await load();
    } catch (err) { setError(err.message || "Review se nepodařilo uložit."); }
    finally { setBusy(false); }
  };

  const submitOutcome = async (event) => {
    event.preventDefault();
    if (!selected?.adoption_decision_id) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await reportPartnerOutcome({ adoptionDecisionId: selected.adoption_decision_id, ...outcome });
      setOutcome({ whatChanged: "", beneficiary: "", observedOn: "", sourceText: "", evidenceUri: "" });
      setMessage("Outcome evidence bylo zaznamenáno jako REPORTED · UNVERIFIED. Nejde o automatický Impact claim.");
      await load();
    } catch (err) { setError(err.message || "Outcome evidence se nepodařilo uložit."); }
    finally { setBusy(false); }
  };

  return (
    <section className="mt-10 border-t border-border pt-10" aria-label="Partner Review R5">
      <div className="workspace-header">
        <div>
          <div className="workspace-kicker"><FileCheck2 size={18} /><span>PANSOFIE PARTNER · R5</span></div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Review výstupu. Ne hodnocení člověka.</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">Partner dostává pouze výslovně odeslaný bounded výstup. Nevidí raw evidence, soukromou reflexi, Passport ani skryté hodnocení learnera.</p>
        </div>
        <button type="button" onClick={load} disabled={busy || loading} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </div>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-3"><AlertTriangle size={18} className="text-destructive shrink-0" />{error}</div>}
      {message && <div role="status" className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0" />{message}</div>}

      <div className="next-action-card mb-8">
        <p className="eyebrow">CO JE TEĎ NA MNĚ?</p>
        <h3 className="mt-2 text-2xl sm:text-3xl font-semibold">{waiting.length ? `${waiting.length} ${waiting.length === 1 ? "výstup čeká" : "výstupy čekají"} na REVIEW OUTPUT` : "Žádný nový výstup teď nečeká na review"}</h3>
        <p className="mt-2 text-sm text-muted-foreground">Rozhodnutí se vztahuje k výstupu proti přesnému Challenge briefu. `PILOT` neznamená `ADOPTED` a žádné rozhodnutí samo o sobě není Impact.</p>
      </div>

      {loading ? <div className="surface-panel p-6 text-sm text-muted-foreground">Načítám bounded výstupy…</div> : rows.length === 0 ? <div className="surface-panel p-6 text-sm text-muted-foreground">Škola zatím neposlala žádný bounded Partner výstup.</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-5 items-start">
          <aside className="surface-panel p-5 space-y-2">{rows.map((row) => <button key={row.deliverable_id} type="button" onClick={() => setSelectedId(row.deliverable_id)} className={`w-full text-left rounded-2xl border p-4 ${selected?.deliverable_id === row.deliverable_id ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card"}`}><p className="text-xs text-muted-foreground">{row.challenge_title} · rev. {row.deliverable_revision}</p><p className="mt-1 font-semibold text-sm">{row.deliverable_title}</p><div className="mt-2"><span className={`status-pill ${row.reviewed_at ? "status-success" : "status-waiting"}`}>{row.reviewed_at ? "REVIEWED" : "OUTPUT READY"}</span></div></button>)}</aside>

          {selected && <div className="space-y-5">
            <section className="surface-raised p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">CIRCULAR CHALLENGE · OUTPUT READY</p><h3 className="mt-2 text-2xl font-semibold">{selected.deliverable_title}</h3></div><span className="status-pill status-info">revision {selected.deliverable_revision}</span></div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">CO JSME CHTĚLI?</p><p className="mt-2 text-muted-foreground">{selected.agreed_deliverable}</p></div><div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">CO BYLO DODÁNO?</p><p className="mt-2 text-muted-foreground whitespace-pre-wrap">{selected.deliverable_summary}</p></div></div>
              <p className="mt-4 text-xs text-muted-foreground">Bezpečný týmový label: {selected.team_label}. Zobrazení neobsahuje identitu learnerů.</p>
            </section>

            {!selected.reviewed_at ? <form onSubmit={submitReview} className="surface-panel p-5 sm:p-6">
              <p className="eyebrow">REVIEW OUTPUT</p><h3 className="mt-2 text-xl font-semibold">Výstup odpovídá zadání?</h3>
              <div className="mt-4 grid grid-cols-3 gap-2">{[["yes","ANO"],["partial","ČÁSTEČNĚ"],["no","NE"]].map(([value,label]) => <button key={value} type="button" aria-pressed={review.addressedBrief === value} onClick={() => setReview((v) => ({ ...v, addressedBrief: value }))} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${review.addressedBrief === value ? "border-primary bg-primary/5" : "border-border"}`}>{label}</button>)}</div>
              <label className="mt-5 block text-sm"><span className="font-medium">Co je užitečné? *</span><textarea required rows={3} maxLength={3000} value={review.usefulText} onChange={(e) => setReview((v) => ({ ...v, usefulText: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="mt-4 block text-sm"><span className="font-medium">Co by bylo potřeba změnit?</span><textarea rows={3} maxLength={3000} value={review.changesNeeded} onChange={(e) => setReview((v) => ({ ...v, changesNeeded: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <p className="mt-5 text-sm font-medium">Další rozhodnutí</p><div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">{DECISIONS.map(([value,label]) => <button key={value} type="button" aria-pressed={review.decision === value} onClick={() => setReview((v) => ({ ...v, decision: value }))} className={`rounded-xl border px-3 py-3 text-xs font-semibold ${review.decision === value ? "border-primary bg-primary/5" : "border-border"}`}>{label}</button>)}</div>
              <label className="mt-4 block text-sm"><span className="font-medium">Poznámka k rozhodnutí</span><textarea rows={2} maxLength={2000} value={review.decisionNote} onChange={(e) => setReview((v) => ({ ...v, decisionNote: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <button disabled={busy || !review.addressedBrief || !review.decision || !review.usefulText.trim()} className="action-primary mt-5">Uložit review a rozhodnutí</button>
            </form> : <section className="surface-panel p-5 sm:p-6"><p className="eyebrow">PARTNER REVIEW</p><div className="mt-4 grid gap-3 text-sm"><p><strong>Odpovídá zadání:</strong> {String(selected.addressed_brief).toUpperCase()}</p><p><strong>Užitečné:</strong> {selected.useful_text}</p>{selected.changes_needed && <p><strong>Změnit:</strong> {selected.changes_needed}</p>}<p><strong>Rozhodnutí:</strong> {String(selected.adoption_decision).toUpperCase().replaceAll("_", " ")}</p></div></section>}

            {selected.adoption_decision === "pilot" && <form onSubmit={submitOutcome} className="surface-panel p-5 sm:p-6"><p className="eyebrow">OUTCOME EVIDENCE</p><h3 className="mt-2 text-xl font-semibold">Co se po pilotním použití skutečně změnilo?</h3><p className="mt-2 text-sm text-muted-foreground">Nový záznam vznikne jako <strong>REPORTED · UNVERIFIED</strong>. Neclaimuje Impact.</p><div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4"><label className="text-sm sm:col-span-2">Co se změnilo? *<textarea required rows={3} value={outcome.whatChanged} onChange={(e) => setOutcome((v) => ({ ...v, whatChanged: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label><label className="text-sm">Komu? *<input required value={outcome.beneficiary} onChange={(e) => setOutcome((v) => ({ ...v, beneficiary: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label><label className="text-sm">Kdy pozorováno? *<input required type="date" value={outcome.observedOn} onChange={(e) => setOutcome((v) => ({ ...v, observedOn: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label><label className="text-sm sm:col-span-2">Zdroj *<input required value={outcome.sourceText} onChange={(e) => setOutcome((v) => ({ ...v, sourceText: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label><label className="text-sm sm:col-span-2">Evidence URI — volitelné<input value={outcome.evidenceUri} onChange={(e) => setOutcome((v) => ({ ...v, evidenceUri: e.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label></div><button disabled={busy} className="action-primary mt-5">Zaznamenat bounded outcome</button>{selected.latest_outcome_status && <p className="mt-4 text-sm"><span className="status-pill status-waiting">{String(selected.latest_outcome_status).toUpperCase()} · {String(selected.latest_outcome_confidence).toUpperCase()}</span></p>}</form>}

            <section className="surface-panel p-5"><div className="flex items-start gap-3"><ShieldCheck size={19} className="text-primary shrink-0" /><p className="text-sm text-muted-foreground">Review hodnotí shodu a použitelnost konkrétního výstupu. PANSOFIE v R5 neposkytuje Partnerovi raw learner evidence a nehodnotí člověka, talent, osobnost ani „hireability“.</p></div></section>
          </div>}
        </div>
      )}
    </section>
  );
}
