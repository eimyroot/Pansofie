import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Flag,
  Play,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import {
  addEvidenceNote,
  finalizeSchoolExperience,
  getRunDetail,
  listMyOrganizationMemberships,
  reviewSchoolRun,
  saveReflection,
  startMissionRun,
  submitMissionRun,
} from "@/lib/pansofieExperienceFlow";

const STATUS_LABEL = {
  assigned: "Přiřazeno",
  in_progress: "Probíhá",
  submitted: "Čeká na kontrolu",
  completed: "Dokončeno",
  cancelled: "Zrušeno",
};

const REVIEW_SCOPE_LABEL = {
  mission: "Zkušenost",
  evidence: "Důkazy",
  reflection: "Reflexe",
  passport: "Passport",
};

const REVIEW_STATUS_LABEL = {
  pending: "Čeká",
  confirmed: "Potvrzeno",
  needs_revision: "Doplnit",
  not_verified: "Neověřeno",
};

const emptyReflection = {
  what_happened: "",
  what_worked: "",
  what_failed: "",
  what_learned: "",
  transfer: "",
  contribution: "",
};

const ReflectionField = ({ label, value, onChange, placeholder }) => (
  <label className="block">
    <span className="block text-sm font-medium mb-2">{label}</span>
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm resize-y"
    />
  </label>
);

const ReflectionReadOnly = ({ label, value }) => (
  <div className="rounded-xl border border-border bg-background p-4">
    <p className="text-xs font-semibold text-primary mb-2">{label}</p>
    <p className="text-sm whitespace-pre-wrap">{value || "—"}</p>
  </div>
);

export default function SchoolRunDetail() {
  const { runId } = useParams();
  const { user } = useAuth();
  const [detail, setDetail] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [evidenceNote, setEvidenceNote] = useState("");
  const [reviewNote, setReviewNote] = useState("");
  const [reflection, setReflection] = useState(emptyReflection);

  const reload = useCallback(async () => {
    if (!runId || !user?.id) return;
    setLoading(true);
    setError("");
    try {
      const [runDetail, membershipRows] = await Promise.all([
        getRunDetail(runId),
        listMyOrganizationMemberships(user.id),
      ]);
      setDetail(runDetail);
      setMemberships(membershipRows);
      setReflection({ ...emptyReflection, ...(runDetail.reflection || {}) });
    } catch (err) {
      setError(err.message || "Zkušenost se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, [runId, user?.id]);

  useEffect(() => {
    reload();
  }, [reload]);

  const run = detail?.run;
  const isOwner = Boolean(run && user?.id === run.user_id);
  const teacherMembership = useMemo(
    () => memberships.find(
      (item) => item.organization_id === run?.organization_id && ["teacher", "coordinator"].includes(item.role)
    ),
    [memberships, run?.organization_id]
  );
  const canTeacherAct = Boolean(teacherMembership);
  const missionReview = detail?.reviews?.find((review) => review.review_scope === "mission");
  const isSubmittedForReview = run?.status === "submitted";

  const act = async (action, successMessage) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await action();
      setMessage(successMessage);
      await reload();
    } catch (err) {
      setError(err.message || "Operace se nepodařila.");
    } finally {
      setBusy(false);
    }
  };

  const handleSaveEvidence = async (event) => {
    event.preventDefault();
    const note = evidenceNote.trim();
    if (!note) return;
    await act(
      () => addEvidenceNote({ runId, ownerId: user.id, description: note }),
      "Důkaz byl uložen."
    );
    setEvidenceNote("");
  };

  const handleSaveReflection = async (event) => {
    event.preventDefault();
    await act(
      () => saveReflection({ runId, userId: user.id, reflection }),
      "Reflexe byla uložena."
    );
  };

  const handleReview = async (scope, status) => {
    const successMessage = scope === "mission"
      ? status === "confirmed"
        ? "Zkušenost byla potvrzena."
        : status === "needs_revision"
          ? "Zkušenost byla vrácena k doplnění."
          : "Zkušenost byla označena jako neověřená."
      : scope === "evidence"
        ? "Důkazy byly potvrzeny."
        : "Reflexe byla potvrzena.";

    await act(
      () => reviewSchoolRun({ runId, scope, status, note: reviewNote }),
      successMessage
    );
    setReviewNote("");
  };

  if (loading) {
    return <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-5xl mx-auto"><div className="card-soft p-6 text-sm text-muted-foreground">Načítám zkušenost…</div></div>;
  }

  if (!run) {
    return <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-5xl mx-auto"><Link to="/skola" className="text-sm text-primary">← Zpět do PANSOFIE SCHOOL</Link><div className="mt-6 card-soft p-6">Zkušenost není dostupná.</div></div>;
  }

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-5xl mx-auto">
      <Link to="/skola" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-7"><ArrowLeft size={16} />PANSOFIE SCHOOL</Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">{run.organizations?.name || "Školní zkušenost"}</span>
          <span className="rounded-full bg-muted text-muted-foreground px-3 py-1 text-xs font-medium">{STATUS_LABEL[run.status] || run.status}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight">{run.missions?.title || "Mise"}</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl">{run.missions?.summary || run.missions?.why || "Skutečná činnost, důkaz, reflexe a další krok."}</p>
      </header>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-3"><AlertTriangle size={18} className="text-destructive shrink-0" /><span>{error}</span></div>}
      {message && <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0" /><span>{message}</span></div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="card-soft p-5"><p className="text-xs font-semibold text-primary mb-2">PROČ</p><p className="text-sm text-muted-foreground">{run.missions?.why || "Důvod mise je součástí jejího zadání."}</p></div>
        <div className="card-soft p-5"><p className="text-xs font-semibold text-primary mb-2">DŮKAZ</p><p className="text-sm text-muted-foreground">{run.missions?.evidence_prompt || "Dolož konkrétní výsledek skutečné činnosti."}</p></div>
        <div className="card-soft p-5"><p className="text-xs font-semibold text-primary mb-2">REFLEXE</p><p className="text-sm text-muted-foreground">{run.missions?.reflection_prompt || "Co se stalo, co fungovalo, co ne a co ses naučil/a?"}</p></div>
      </div>

      {isOwner && (
        <section className="mb-10">
          <div className="flex items-center justify-between gap-3 mb-4"><div className="flex items-center gap-2"><Play size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Moje práce</h2></div><button type="button" onClick={reload} className="text-xs text-muted-foreground inline-flex items-center gap-1"><RefreshCw size={13} />Obnovit</button></div>

          {run.status === "in_progress" && missionReview?.status === "needs_revision" && (
            <div className="mb-5 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Co doplnit</p>
              <h3 className="font-semibold mt-1">Učitel tě požádal o doplnění zkušenosti.</h3>
              <p className="text-sm text-muted-foreground mt-2">{missionReview.note || "Podívej se znovu na důkaz nebo reflexi a doplň konkrétnější informace."}</p>
            </div>
          )}

          {run.status === "assigned" && (
            <div className="card-soft p-6 mb-5"><h3 className="font-semibold">Mise je připravená.</h3><p className="text-sm text-muted-foreground mt-1">Zahájením se zaznamená start. Samotné kliknutí ještě není zkušenost — tou se stane až skutečná činnost s důkazem a reflexí.</p><button disabled={busy} onClick={() => act(() => startMissionRun(runId), "Mise byla zahájena.")} className="mt-4 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 font-semibold inline-flex items-center gap-2 disabled:opacity-50"><Play size={16} />Zahájit misi</button></div>
          )}

          {["in_progress", "submitted", "completed"].includes(run.status) && (
            <>
              <div className="card-soft p-6 mb-5">
                <div className="flex items-center gap-2 mb-4"><Flag size={18} className="text-primary" /><h3 className="font-semibold">Důkazy</h3></div>
                {detail.evidence.length === 0 ? <p className="text-sm text-muted-foreground mb-4">Zatím není uložen žádný důkaz.</p> : <div className="space-y-3 mb-5">{detail.evidence.map((item) => <div key={item.id} className="rounded-xl border border-border bg-background p-4"><div className="flex justify-between gap-3"><span className="text-xs font-semibold uppercase text-primary">{item.kind}</span><span className="text-[11px] text-muted-foreground">{new Date(item.created_at).toLocaleString("cs-CZ")}</span></div><p className="text-sm mt-2 whitespace-pre-wrap">{item.description || item.uri || "Důkaz"}</p></div>)}</div>}
                {run.status === "in_progress" && <form onSubmit={handleSaveEvidence} className="flex flex-col sm:flex-row gap-3"><textarea value={evidenceNote} onChange={(e) => setEvidenceNote(e.target.value)} rows={2} placeholder="Popiš konkrétní výsledek nebo přidej poznámku k důkazu…" className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm"/><button disabled={busy || !evidenceNote.trim()} className="rounded-xl border border-border bg-card px-5 py-2.5 font-semibold disabled:opacity-50">Uložit důkaz</button></form>}
              </div>

              <form onSubmit={handleSaveReflection} className="card-soft p-6 mb-5">
                <div className="flex items-center gap-2 mb-5"><FileText size={18} className="text-primary" /><h3 className="font-semibold">Reflexe</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ReflectionField label="Co se stalo?" value={reflection.what_happened} onChange={(value) => setReflection((r) => ({ ...r, what_happened: value }))} />
                  <ReflectionField label="Co fungovalo?" value={reflection.what_worked} onChange={(value) => setReflection((r) => ({ ...r, what_worked: value }))} />
                  <ReflectionField label="Co nefungovalo / selhalo?" value={reflection.what_failed} onChange={(value) => setReflection((r) => ({ ...r, what_failed: value }))} />
                  <ReflectionField label="Co jsem se naučil/a? *" value={reflection.what_learned} onChange={(value) => setReflection((r) => ({ ...r, what_learned: value }))} />
                  <ReflectionField label="Kde to použiju znovu?" value={reflection.transfer} onChange={(value) => setReflection((r) => ({ ...r, transfer: value }))} />
                  <ReflectionField label="Komu / čemu to přineslo hodnotu?" value={reflection.contribution} onChange={(value) => setReflection((r) => ({ ...r, contribution: value }))} />
                </div>
                {run.status === "in_progress" && <button disabled={busy} className="mt-5 rounded-xl border border-border bg-card px-5 py-2.5 font-semibold disabled:opacity-50">Uložit reflexi</button>}
              </form>
            </>
          )}

          {run.status === "in_progress" && (
            <div className="card-soft p-6 border-primary/25"><div className="flex items-start gap-3"><Send size={18} className="text-primary shrink-0 mt-1"/><div className="flex-1"><h3 className="font-semibold">Odeslat ke kontrole</h3><p className="text-sm text-muted-foreground mt-1">Před odesláním potřebuješ alespoň jeden důkaz a odpověď na „Co jsem se naučil/a?“. Učitel tvůj obsah nemění — přidá samostatnou zpětnou vazbu.</p><button disabled={busy} onClick={() => act(() => submitMissionRun(runId), "Mise byla odeslána ke kontrole.")} className="mt-4 rounded-xl bg-primary text-primary-foreground px-5 py-2.5 font-semibold disabled:opacity-50">Odeslat misi</button></div></div></div>
          )}
        </section>
      )}

      {canTeacherAct && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4"><ClipboardCheck size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Kontrola zkušenosti</h2></div>

          {!isSubmittedForReview && run.status !== "completed" && (
            <div className="mb-5 rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              Žák zatím zkušenost neodeslal ke kontrole. Obsah můžeš vidět jen v rozsahu oprávnění, rozhodnutí je dostupné až po odeslání.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="card-soft p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2"><Flag size={18} className="text-primary" /><h3 className="font-semibold">Důkazy žáka</h3></div>
                <span className="text-xs text-muted-foreground">{detail.evidence.length} položek</span>
              </div>
              {detail.evidence.length === 0 ? (
                <p className="text-sm text-muted-foreground">Důkazy nejsou v tomto rozsahu kontroly dostupné.</p>
              ) : (
                <div className="space-y-3">
                  {detail.evidence.map((item) => (
                    <div key={item.id} className="rounded-xl border border-border bg-background p-4">
                      <div className="flex justify-between gap-3"><span className="text-xs font-semibold uppercase text-primary">{item.kind}</span><span className="text-[11px] text-muted-foreground">{new Date(item.created_at).toLocaleString("cs-CZ")}</span></div>
                      <p className="text-sm mt-2 whitespace-pre-wrap">{item.description || item.uri || "Důkaz"}</p>
                    </div>
                  ))}
                </div>
              )}
              <button disabled={busy || !isSubmittedForReview || detail.evidence.length === 0} onClick={() => handleReview("evidence", "confirmed")} className="mt-4 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40">Potvrdit důkazy</button>
            </div>

            <div className="card-soft p-6">
              <div className="flex items-center gap-2 mb-4"><FileText size={18} className="text-primary" /><h3 className="font-semibold">Reflexe žáka</h3></div>
              {!detail.reflection ? (
                <p className="text-sm text-muted-foreground">Reflexe není v tomto rozsahu kontroly dostupná.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <ReflectionReadOnly label="Co se stalo?" value={detail.reflection.what_happened} />
                  <ReflectionReadOnly label="Co fungovalo?" value={detail.reflection.what_worked} />
                  <ReflectionReadOnly label="Co nefungovalo?" value={detail.reflection.what_failed} />
                  <ReflectionReadOnly label="Co se žák naučil?" value={detail.reflection.what_learned} />
                  <ReflectionReadOnly label="Kde to použije znovu?" value={detail.reflection.transfer} />
                  <ReflectionReadOnly label="Komu / čemu to přineslo hodnotu?" value={detail.reflection.contribution} />
                </div>
              )}
              <button disabled={busy || !isSubmittedForReview || !detail.reflection} onClick={() => handleReview("reflection", "confirmed")} className="mt-4 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40">Potvrdit reflexi</button>
            </div>
          </div>

          <div className="card-soft p-6 border-primary/20">
            <h3 className="font-semibold">Rozhodnutí učitele</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Ověřuješ doloženou zkušenost, ne hodnotu člověka. Při vrácení nebo neověření napiš konkrétně, co chybí.</p>
            <textarea value={reviewNote} onChange={(event) => setReviewNote(event.target.value)} rows={3} placeholder="Napiš konkrétní zpětnou vazbu pro žáka…" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button disabled={busy || !isSubmittedForReview} onClick={() => handleReview("mission", "confirmed")} className="rounded-xl bg-primary text-primary-foreground px-4 py-3 font-semibold disabled:opacity-40">Potvrdit zkušenost</button>
              <button disabled={busy || !isSubmittedForReview || !reviewNote.trim()} onClick={() => handleReview("mission", "needs_revision")} className="rounded-xl border border-border px-4 py-3 font-semibold disabled:opacity-40">Vrátit k doplnění</button>
              <button disabled={busy || !isSubmittedForReview || !reviewNote.trim()} onClick={() => handleReview("mission", "not_verified")} className="rounded-xl border border-border px-4 py-3 font-semibold disabled:opacity-40">Nelze ověřit</button>
            </div>

            {detail.reviews.length > 0 && (
              <div className="mt-6 border-t border-border pt-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Historie kontroly</p>
                {detail.reviews.map((review) => (
                  <div key={review.id} className="rounded-xl bg-background border border-border p-4">
                    <div className="flex justify-between gap-3"><span className="font-medium text-sm">{REVIEW_SCOPE_LABEL[review.review_scope] || review.review_scope} · {REVIEW_STATUS_LABEL[review.status] || review.status}</span><span className="text-[11px] text-muted-foreground">{new Date(review.updated_at).toLocaleString("cs-CZ")}</span></div>
                    {review.note && <p className="text-sm text-muted-foreground mt-2">{review.note}</p>}
                  </div>
                ))}
              </div>
            )}

            {run.status === "submitted" && missionReview?.status === "confirmed" && (
              <div className="mt-6 border-t border-border pt-5">
                <button disabled={busy} onClick={() => act(() => finalizeSchoolExperience(runId), "Zkušenost byla ověřena a soukromě zapsána do Passportu.")} className="rounded-xl bg-foreground text-background px-5 py-3 font-semibold inline-flex items-center gap-2 disabled:opacity-50"><ShieldCheck size={16} />Dokončit a zapsat do Passportu</button>
              </div>
            )}
          </div>
        </section>
      )}

      {detail.experience && (
        <section>
          <div className="flex items-center gap-2 mb-4"><CheckCircle2 size={18} className="text-primary" /><h2 className="text-lg font-semibold font-heading">Ověřená zkušenost</h2></div>
          <div className="card-soft p-6 border-primary/25"><h3 className="text-xl font-semibold">{detail.experience.title}</h3><p className="text-sm text-muted-foreground mt-2">{detail.experience.impact_summary || "Zkušenost je doložená a zapsaná do soukromého Passportu."}</p><div className="mt-4 flex flex-wrap gap-2">{detail.experience.path_ids?.map((path) => <span key={path} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{path}</span>)}</div><Link to="/portfolio" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Otevřít Passport <ArrowLeft size={14} className="rotate-180" /></Link></div>
        </section>
      )}
    </div>
  );
}
