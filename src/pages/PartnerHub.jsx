import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDot,
  FileCheck2,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  QUALITY_DIMENSIONS,
  createPartnerChallenge,
  listMyPartnerChallenges,
  listMyPartnerOrganizations,
  submitPartnerChallenge,
  updatePartnerChallenge,
} from "@/lib/pansofiePartnerFlow";

const STATUS_LABEL = {
  draft: "ROZPRACOVÁNO",
  submitted: "ČEKÁ NA QUALITY GATE",
  needs_work: "DOPRACOVAT",
  ready: "READY",
  blocked: "BLOCKED",
  active: "AKTIVNÍ CHALLENGE",
  completed: "DOKONČENO",
  archived: "ARCHIVOVÁNO",
};

const STATUS_CLASS = {
  draft: "status-neutral",
  submitted: "status-waiting",
  needs_work: "status-waiting",
  ready: "status-success",
  blocked: "status-danger",
  active: "status-progress",
  completed: "status-success",
  archived: "status-neutral",
};

const emptyForm = {
  challengeId: "",
  organizationId: "",
  title: "",
  problemStatement: "",
  beneficiary: "",
  context: "",
  desiredOutput: "",
  availableResources: "",
  dataRequirements: "",
  ageMin: "",
  ageMax: "",
  timeframe: "",
  ipExpectations: "",
  safetyNotes: "",
  feedbackCommitment: "",
  adoptionPossibility: "",
};

function fromRow(row) {
  return {
    challengeId: row.challenge_id,
    organizationId: row.partner_organization_id,
    title: row.title || "",
    problemStatement: row.problem_statement || "",
    beneficiary: row.beneficiary || "",
    context: row.context || "",
    desiredOutput: row.desired_output || "",
    availableResources: row.available_resources || "",
    dataRequirements: row.data_requirements || "",
    ageMin: row.age_min ?? "",
    ageMax: row.age_max ?? "",
    timeframe: row.timeframe || "",
    ipExpectations: row.ip_expectations || "",
    safetyNotes: row.safety_notes || "",
    feedbackCommitment: row.feedback_commitment || "",
    adoptionPossibility: row.adoption_possibility || "",
  };
}

function GateState({ value }) {
  const upper = String(value || "").toUpperCase();
  const cls = upper === "PASS" ? "status-success" : upper === "BLOCKED" ? "status-danger" : upper === "NEEDS_WORK" ? "status-waiting" : "status-neutral";
  return <span className={`status-pill ${cls}`}>{upper || "—"}</span>;
}

export default function PartnerHub() {
  const [organizations, setOrganizations] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [orgRows, challengeRows] = await Promise.all([
        listMyPartnerOrganizations(),
        listMyPartnerChallenges(),
      ]);
      setOrganizations(orgRows);
      setChallenges(challengeRows);
      const preferred = challengeRows.find((row) => row.challenge_id === selectedId) || challengeRows[0] || null;
      if (preferred) {
        setSelectedId(preferred.challenge_id);
        setForm(fromRow(preferred));
      } else {
        const verifiedOrg = orgRows.find((row) => row.verification_status === "verified") || orgRows[0];
        setForm((current) => ({ ...emptyForm, organizationId: current.organizationId || verifiedOrg?.organization_id || "" }));
      }
    } catch (err) {
      setError(err.message || "Partner workspace se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = useMemo(() => challenges.find((item) => item.challenge_id === selectedId) || null, [challenges, selectedId]);
  const selectedOrg = organizations.find((item) => item.organization_id === form.organizationId) || null;
  const canEdit = !selected || ["draft", "needs_work"].includes(selected.challenge_status);
  const verifiedOrganizations = organizations.filter((item) => item.verification_status === "verified" && item.organization_status === "active");

  const nextAction = useMemo(() => {
    if (!organizations.length) return { title: "Partner role není aktivní", detail: "Tento účet zatím nemá aktivní partner_contact membership.", kind: "neutral" };
    if (!verifiedOrganizations.length) return { title: "Počkejte na ověření organizace", detail: "Challenge lze vytvořit až po explicitním verification. Platba, značka ani samotná registrace verification nenahrazují.", kind: "waiting" };
    if (!selected) return { title: "Navrhněte první reálnou Challenge", detail: "Popište konkrétní problém, očekávaný výstup a co partner skutečně přinese. Potom Challenge odešlete do Quality Gate.", kind: "progress" };
    if (selected.challenge_status === "draft") return { title: "Dopracujte brief a odešlete ho", detail: "Před screeningem musí být jasný problém, beneficiary, výstup, feedback závazek a bezpečnostní hranice.", kind: "progress" };
    if (selected.challenge_status === "needs_work") return { title: "Zapracujte připomínky Quality Gate", detail: selected.screening_note || "Upravte Challenge a odešlete novou revision. Původní screening zůstává immutable evidence.", kind: "waiting" };
    if (selected.challenge_status === "submitted") return { title: "Challenge čeká na Quality Gate", detail: "PANSOFIE ověří vzdělávací smysl, rozsah, data, safeguarding, IP, výstup, feedback a možnost adopce.", kind: "waiting" };
    if (selected.challenge_status === "blocked") return { title: "Challenge je zablokovaná", detail: selected.screening_note || "Alespoň jedna zásadní hranice neprošla screeningem.", kind: "danger" };
    if (selected.challenge_status === "ready" && !selected.assignment_id) return { title: "Challenge je READY", detail: "Teď následuje managed match. Partner nevybírá děti ani neprochází jejich profily.", kind: "success" };
    if (selected.assignment_status === "proposed") return { title: "Škola rozhoduje o přijetí", detail: `${selected.school_name || "Vybraná škola"} · ${selected.cohort_name || "pilotní kohorta"} · ${selected.team_name || "Experience tým"}.`, kind: "waiting" };
    if (selected.challenge_status === "active") return { title: "Challenge běží jako Experience", detail: "R4 zde končí. Partner zatím nevidí learner raw evidence, soukromou reflexi ani Passport.", kind: "success" };
    return { title: "Challenge je v řízeném procesu", detail: "Stav je oddělený od hodnocení člověka a od tvrzení o dopadu.", kind: "neutral" };
  }, [organizations.length, selected, verifiedOrganizations.length]);

  const selectChallenge = (row) => {
    setSelectedId(row.challenge_id);
    setForm(fromRow(row));
    setError("");
    setMessage("");
  };

  const startNew = () => {
    const org = verifiedOrganizations[0];
    setSelectedId("");
    setForm({ ...emptyForm, organizationId: org?.organization_id || "" });
    setError("");
    setMessage("");
  };

  const save = async (event) => {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    try {
      let challengeId = form.challengeId;
      if (!challengeId) {
        challengeId = await createPartnerChallenge({
          organizationId: form.organizationId,
          title: form.title,
          problemStatement: form.problemStatement,
          beneficiary: form.beneficiary,
          desiredOutput: form.desiredOutput,
          feedbackCommitment: form.feedbackCommitment,
        });
      }
      await updatePartnerChallenge({ ...form, challengeId });
      setSelectedId(challengeId);
      setMessage("Challenge brief je uložený jako draft. Nic se neposlalo škole ani learnerům.");
      await load();
    } catch (err) {
      setError(err.message || "Challenge se nepodařilo uložit.");
    } finally { setBusy(false); }
  };

  const submit = async () => {
    if (!form.challengeId) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const revision = await submitPartnerChallenge(form.challengeId);
      setMessage(`Challenge revision ${revision} byla odeslána do Quality Gate.`);
      await load();
    } catch (err) { setError(err.message || "Challenge se nepodařilo odeslat."); }
    finally { setBusy(false); }
  };

  return (
    <div className="product-shell" data-role="partner">
      <header className="workspace-header">
        <div>
          <div className="workspace-kicker"><BriefcaseBusiness size={18} /><span>PANSOFIE PARTNER · R4</span></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Přineste reálný problém. Ne přístup k dětem.</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">Partner workspace vede Challenge přes ověření, Quality Gate a managed match. Partner hodnotí zadání a později výstup — nikdy lidskou hodnotu learnera.</p>
        </div>
        <button type="button" onClick={load} disabled={busy || loading} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Obnovit</button>
      </header>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-3"><AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" /><span>{error}</span></div>}
      {message && <div role="status" className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" /><span>{message}</span></div>}

      <section className="next-action-card mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <p className="eyebrow">CO JE TEĎ NA MNĚ?</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{nextAction.title}</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">{nextAction.detail}</p>
          </div>
          {verifiedOrganizations.length > 0 && <button type="button" onClick={startNew} className="action-primary">Nová Challenge <ArrowRight size={17} /></button>}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-5 items-start">
        <div className="surface-panel p-5">
          <div className="flex items-center justify-between gap-3 mb-4"><h2 className="font-semibold">Moje Challenges</h2><span className="text-xs text-muted-foreground">{challenges.length}</span></div>
          {organizations.length > 0 && <div className="mb-4 space-y-2">{organizations.map((org) => <div key={org.organization_id} className="surface-subtle p-3"><p className="text-xs font-semibold">{org.organization_name}</p><div className="mt-2 flex flex-wrap gap-2"><span className={`status-pill ${org.verification_status === "verified" ? "status-success" : org.verification_status === "suspended" ? "status-danger" : "status-waiting"}`}>{org.verification_status.toUpperCase()}</span><span className="status-pill status-neutral">{org.organization_type}</span></div></div>)}</div>}
          {loading ? <p className="text-sm text-muted-foreground">Načítám…</p> : challenges.length === 0 ? <p className="text-sm text-muted-foreground">Zatím žádná Challenge.</p> : <div className="space-y-2">{challenges.map((row) => <button key={row.challenge_id} type="button" onClick={() => selectChallenge(row)} className={`w-full text-left rounded-2xl border p-4 ${selectedId === row.challenge_id ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card"}`}><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-sm">{row.title}</p><p className="mt-1 text-xs text-muted-foreground">revision {row.revision_no}</p></div><span className={`status-pill ${STATUS_CLASS[row.challenge_status] || "status-neutral"}`}>{STATUS_LABEL[row.challenge_status] || row.challenge_status}</span></div></button>)}</div>}
        </div>

        <div className="space-y-5">
          <form onSubmit={save} className="surface-raised p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><p className="eyebrow">CHALLENGE BRIEF</p><h2 className="mt-2 text-2xl font-semibold">{form.challengeId ? form.title || "Challenge" : "Nová Challenge"}</h2></div>{selected && <span className={`status-pill ${STATUS_CLASS[selected.challenge_status] || "status-neutral"}`}>{STATUS_LABEL[selected.challenge_status] || selected.challenge_status}</span>}</div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="text-sm"><span className="block font-medium mb-2">Partner organizace</span><select disabled={!canEdit || Boolean(form.challengeId)} value={form.organizationId} onChange={(e) => setForm((v) => ({ ...v, organizationId: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">{verifiedOrganizations.map((org) => <option key={org.organization_id} value={org.organization_id}>{org.organization_name}</option>)}</select></label>
              <label className="text-sm"><span className="block font-medium mb-2">Název Challenge *</span><input disabled={!canEdit} required maxLength={160} value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm md:col-span-2"><span className="block font-medium mb-2">Skutečný problém *</span><textarea disabled={!canEdit} required rows={3} maxLength={3000} value={form.problemStatement} onChange={(e) => setForm((v) => ({ ...v, problemStatement: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Komu řešení pomůže *</span><input disabled={!canEdit} required maxLength={500} value={form.beneficiary} onChange={(e) => setForm((v) => ({ ...v, beneficiary: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Očekávaný výstup *</span><input disabled={!canEdit} required maxLength={1000} value={form.desiredOutput} onChange={(e) => setForm((v) => ({ ...v, desiredOutput: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm md:col-span-2"><span className="block font-medium mb-2">Kontext</span><textarea disabled={!canEdit} rows={2} maxLength={3000} value={form.context} onChange={(e) => setForm((v) => ({ ...v, context: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Dostupné zdroje</span><textarea disabled={!canEdit} rows={2} maxLength={2000} value={form.availableResources} onChange={(e) => setForm((v) => ({ ...v, availableResources: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Data / informace potřebné pro řešení</span><textarea disabled={!canEdit} rows={2} maxLength={2000} value={form.dataRequirements} onChange={(e) => setForm((v) => ({ ...v, dataRequirements: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Věk od</span><input disabled={!canEdit} type="number" min="6" max="25" value={form.ageMin} onChange={(e) => setForm((v) => ({ ...v, ageMin: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Věk do</span><input disabled={!canEdit} type="number" min="6" max="25" value={form.ageMax} onChange={(e) => setForm((v) => ({ ...v, ageMax: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Časový rámec</span><input disabled={!canEdit} maxLength={500} value={form.timeframe} onChange={(e) => setForm((v) => ({ ...v, timeframe: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">IP očekávání</span><input disabled={!canEdit} maxLength={1000} value={form.ipExpectations} onChange={(e) => setForm((v) => ({ ...v, ipExpectations: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm md:col-span-2"><span className="block font-medium mb-2">Safety hranice</span><textarea disabled={!canEdit} rows={2} maxLength={2000} value={form.safetyNotes} onChange={(e) => setForm((v) => ({ ...v, safetyNotes: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Feedback závazek *</span><textarea disabled={!canEdit} required rows={2} maxLength={1500} value={form.feedbackCommitment} onChange={(e) => setForm((v) => ({ ...v, feedbackCommitment: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
              <label className="text-sm"><span className="block font-medium mb-2">Možnost dalšího použití / adopce</span><textarea disabled={!canEdit} rows={2} maxLength={1500} value={form.adoptionPossibility} onChange={(e) => setForm((v) => ({ ...v, adoptionPossibility: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
            </div>

            {canEdit && <div className="mt-6 flex flex-col sm:flex-row gap-3"><button disabled={busy || !form.organizationId} className="action-secondary">Uložit draft</button>{form.challengeId && selected?.challenge_status === "draft" && <button type="button" onClick={submit} disabled={busy} className="action-primary"><Send size={16} /> Odeslat do Quality Gate</button>}</div>}
          </form>

          {selected?.screening_decision && <section className="surface-panel p-5 sm:p-6"><div className="flex items-center gap-2"><FileCheck2 size={18} className="text-primary" /><h2 className="font-semibold">Challenge Quality Gate</h2></div><p className="mt-2 text-sm text-muted-foreground">Žádné číselné skóre. Každá dimenze má samostatný stav a screening zůstává immutable evidence.</p><div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">{QUALITY_DIMENSIONS.map(([key, label]) => <div key={key} className="surface-subtle p-4"><p className="text-xs font-semibold">{label}</p><div className="mt-2"><GateState value={selected.screening_dimensions?.[key]} /></div></div>)}</div>{selected.screening_note && <p className="mt-4 text-sm text-muted-foreground">{selected.screening_note}</p>}</section>}

          <section className="surface-panel p-5 sm:p-6"><div className="flex items-start gap-3"><ShieldCheck size={19} className="text-primary shrink-0 mt-0.5" /><div><h2 className="font-semibold">Partner boundary</h2><p className="mt-2 text-sm text-muted-foreground leading-relaxed">Tento workspace neobsahuje learner names, raw evidence, soukromou reflexi, teacher review learnera ani Passport. Managed match ukáže pouze školu, kohortu a tým jako organizační kontext.</p></div></div><div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><CircleDot size={14} /> R4 končí aktivací Challenge. Partner Review / Adoption patří do R5.</div></section>
        </div>
      </section>
    </div>
  );
}
