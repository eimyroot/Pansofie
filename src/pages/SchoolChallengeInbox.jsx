import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { listMyOrganizationMemberships } from "@/lib/pansofieExperienceFlow";
import {
  QUALITY_DIMENSIONS,
  acceptSchoolChallengeAssignment,
  declineSchoolChallengeAssignment,
  listSchoolChallengeAssignments,
} from "@/lib/pansofiePartnerFlow";

const STATUS_CLASS = { proposed: "status-waiting", active: "status-progress", completed: "status-success", cancelled: "status-neutral" };
const STATUS_LABEL = { proposed: "ČEKÁ NA ROZHODNUTÍ", active: "AKTIVNÍ", completed: "DOKONČENO", cancelled: "NEPŘIJATO" };

function GateState({ value }) {
  const upper = String(value || "").toUpperCase();
  const cls = upper === "PASS" ? "status-success" : upper === "BLOCKED" ? "status-danger" : upper === "NEEDS_WORK" ? "status-waiting" : "status-neutral";
  return <span className={`status-pill ${cls}`}>{upper || "—"}</span>;
}

export default function SchoolChallengeInbox() {
  const { user } = useAuth();
  const [memberships, setMemberships] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [declineNote, setDeclineNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true); setError("");
    try {
      const membershipRows = await listMyOrganizationMemberships(user.id);
      const teacherRows = membershipRows.filter((item) => ["teacher", "coordinator"].includes(item.role));
      const rows = await listSchoolChallengeAssignments(teacherRows.map((item) => item.organization_id));
      setMemberships(teacherRows);
      setAssignments(rows);
      if (!rows.some((row) => row.assignment_id === selectedId)) setSelectedId(rows[0]?.assignment_id || "");
    } catch (err) { setError(err.message || "Challenge inbox se nepodařilo načíst."); }
    finally { setLoading(false); }
  }, [selectedId, user?.id]);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = useMemo(() => assignments.find((row) => row.assignment_id === selectedId) || assignments[0] || null, [assignments, selectedId]);
  const proposed = assignments.filter((row) => row.assignment_status === "proposed");

  const accept = async () => {
    if (!selected) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const count = await acceptSchoolChallengeAssignment(selected.assignment_id);
      setMessage(`Challenge byla přijata. ${count} learner běhů je připnutých k této Challenge provenance a immutable Mission verzi.`);
      await load();
    } catch (err) { setError(err.message || "Challenge se nepodařilo přijmout."); }
    finally { setBusy(false); }
  };

  const decline = async () => {
    if (!selected) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await declineSchoolChallengeAssignment(selected.assignment_id, declineNote);
      setDeclineNote("");
      setMessage("Challenge nebyla školou přijata. Partner nezískal žádný přístup k learnerům ani jejich datům.");
      await load();
    } catch (err) { setError(err.message || "Rozhodnutí se nepodařilo uložit."); }
    finally { setBusy(false); }
  };

  return (
    <div className="product-shell" data-role="school">
      <header className="workspace-header">
        <div>
          <div className="workspace-kicker"><BriefcaseBusiness size={18} /><span>SCHOOL · CHALLENGE INBOX · R4</span></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Škola rozhoduje, co skutečně vstoupí do Experience.</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">PANSOFIE může navrhnout managed match až po READY Quality Gate. Učitel nebo koordinátor musí Challenge ještě explicitně přijmout.</p>
        </div>
        <button type="button" onClick={load} disabled={busy || loading} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </header>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-3"><AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" /><span>{error}</span></div>}
      {message && <div role="status" className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span>{message}</span></div>}

      <section className="next-action-card mb-10">
        <p className="eyebrow">CO JE TEĎ NA MNĚ?</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{proposed.length ? `Rozhodnout o ${proposed.length} ${proposed.length === 1 ? "Challenge" : "Challenges"}` : "Žádná Challenge teď nečeká na školu"}</h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl">{proposed.length ? "Zkontrolujte brief, Quality Gate, cílovou kohortu/tým a pinned Circular Challenge version. Přijetí vytvoří pouze governed learner runs — partner se nestává reviewerem learnera." : "Aktivní nebo dříve nepřijaté Challenges zůstávají níže jako provozní historie."}</p>
      </section>

      {memberships.length === 0 ? <div className="surface-panel p-6 text-sm text-muted-foreground">Tento účet nemá teacher/coordinator membership v žádné škole.</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-5 items-start">
          <aside className="surface-panel p-5">
            <div className="flex items-center justify-between gap-3 mb-4"><h2 className="font-semibold">Managed assignments</h2><span className="text-xs text-muted-foreground">{assignments.length}</span></div>
            {loading ? <p className="text-sm text-muted-foreground">Načítám…</p> : assignments.length === 0 ? <p className="text-sm text-muted-foreground">Žádná Challenge assignment.</p> : <div className="space-y-2">{assignments.map((row) => <button key={row.assignment_id} type="button" onClick={() => setSelectedId(row.assignment_id)} className={`w-full text-left rounded-2xl border p-4 ${selected?.assignment_id === row.assignment_id ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card"}`}><div className="flex items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{row.partner_organization_name}</p><p className="mt-1 font-semibold text-sm">{row.title}</p></div><span className={`status-pill ${STATUS_CLASS[row.assignment_status] || "status-neutral"}`}>{STATUS_LABEL[row.assignment_status] || row.assignment_status}</span></div><p className="mt-2 text-xs text-muted-foreground">{row.cohort_name} · {row.team_name}</p></button>)}</div>}
          </aside>

          {selected ? <article className="space-y-5">
            <section className="surface-raised p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><p className="eyebrow">MANAGED MATCH</p><h2 className="mt-2 text-2xl font-semibold">{selected.title}</h2><p className="mt-2 text-sm text-muted-foreground">{selected.partner_organization_name} → {selected.school_name} → {selected.cohort_name} → {selected.team_name}</p></div><span className={`status-pill ${STATUS_CLASS[selected.assignment_status] || "status-neutral"}`}>{STATUS_LABEL[selected.assignment_status] || selected.assignment_status}</span></div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">PROBLÉM</p><p className="mt-2 text-muted-foreground whitespace-pre-wrap">{selected.problem_statement}</p></div>
                <div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">BENEFICIARY</p><p className="mt-2 text-muted-foreground whitespace-pre-wrap">{selected.beneficiary}</p></div>
                <div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">OČEKÁVANÝ VÝSTUP</p><p className="mt-2 text-muted-foreground whitespace-pre-wrap">{selected.desired_output}</p></div>
                <div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">PARTNER FEEDBACK</p><p className="mt-2 text-muted-foreground whitespace-pre-wrap">{selected.feedback_commitment}</p></div>
                <div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">DATA / PRIVACY</p><p className="mt-2 text-muted-foreground whitespace-pre-wrap">{selected.data_requirements || "Bez zvláštních datových požadavků."}</p></div>
                <div className="surface-subtle p-4"><p className="text-xs font-semibold text-primary">IP / SAFETY</p><p className="mt-2 text-muted-foreground whitespace-pre-wrap">{selected.ip_expectations || "Bez zvláštního IP očekávání."}{selected.safety_notes ? ` · ${selected.safety_notes}` : ""}</p></div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs"><span className="status-pill status-success">Quality Gate: {String(selected.screening_decision || "—").toUpperCase()}</span><span className="status-pill status-info">{selected.mission_title} · version {selected.mission_version_no}</span>{selected.age_min != null || selected.age_max != null ? <span className="status-pill status-neutral">věk {selected.age_min ?? "?"}–{selected.age_max ?? "?"}</span> : null}</div>

              {selected.assignment_status === "proposed" && <div className="mt-6 border-t border-border pt-5"><div className="flex flex-col sm:flex-row gap-3"><button type="button" onClick={accept} disabled={busy} className="action-primary"><CheckCircle2 size={16} /> Přijmout Challenge</button><button type="button" onClick={decline} disabled={busy} className="action-secondary"><XCircle size={16} /> Nepřijmout</button></div><label className="mt-4 block text-sm"><span className="block font-medium mb-2">Důvod nepřijetí — volitelný</span><textarea rows={2} maxLength={1500} value={declineNote} onChange={(e) => setDeclineNote(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label></div>}
            </section>

            <section className="surface-panel p-5 sm:p-6"><div className="flex items-center gap-2"><FileCheck2 size={18} className="text-primary" /><h2 className="font-semibold">Quality Gate evidence</h2></div><div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">{QUALITY_DIMENSIONS.map(([key, label]) => <div key={key} className="surface-subtle p-4"><p className="text-xs font-semibold">{label}</p><div className="mt-2"><GateState value={selected.screening_dimensions?.[key]} /></div></div>)}</div></section>

            <section className="surface-panel p-5 sm:p-6"><div className="flex items-start gap-3"><ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" /><div><h2 className="font-semibold">School boundary</h2><p className="mt-2 text-sm text-muted-foreground leading-relaxed">Přijetí Challenge nevytváří private messaging s partnerem ani Partner access k learner evidence/reflection. `school_mission_assignment` processing basis se znovu ověřuje pro každého learnera během acceptance.</p></div></div></section>
          </article> : <div className="surface-panel p-6 text-sm text-muted-foreground">Vyberte Challenge assignment.</div>}
        </div>
      )}
    </div>
  );
}
