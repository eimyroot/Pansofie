import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  HeartHandshake,
  RefreshCw,
  Send,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import {
  addFamilyContribution,
  getMyFamilyAccessSummary,
  listMyFamilyContext,
  listMyFamilyContributions,
  listMyGuardianPassportSummaries,
  listStaffFamilyContributions,
  withdrawFamilyContribution,
} from "@/lib/pansofieFamilyFlow";

const KIND_LABEL = {
  context: "Kontext z rodiny",
  contact: "Kontakt / člověk",
  resource: "Zdroj / možnost",
  observation: "Pozorování",
};

const RUN_STATUS = {
  assigned: "Připraveno",
  in_progress: "Probíhá",
  submitted: "Čeká na školní review",
};

const RUN_STATUS_CLASS = {
  assigned: "status-info",
  in_progress: "status-progress",
  submitted: "status-waiting",
};

export default function FamilyHub() {
  const [summary, setSummary] = useState(null);
  const [contexts, setContexts] = useState([]);
  const [passport, setPassport] = useState([]);
  const [myContributions, setMyContributions] = useState([]);
  const [staffContributions, setStaffContributions] = useState([]);
  const [form, setForm] = useState({ runId: "", kind: "context", content: "" });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [access, contextRows, passportRows, ownRows, staffRows] = await Promise.all([
        getMyFamilyAccessSummary(),
        listMyFamilyContext(),
        listMyGuardianPassportSummaries(),
        listMyFamilyContributions(),
        listStaffFamilyContributions(),
      ]);
      setSummary(access);
      setContexts(contextRows);
      setPassport(passportRows);
      setMyContributions(ownRows);
      setStaffContributions(staffRows);
      setForm((current) => ({
        ...current,
        runId: contextRows.some((row) => row.run_id === current.runId) ? current.runId : contextRows[0]?.run_id || "",
      }));
    } catch (err) {
      setError(err.message || "Rodinný workspace se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const selectedContext = useMemo(
    () => contexts.find((row) => row.run_id === form.runId) || null,
    [contexts, form.runId]
  );

  const submitContribution = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await addFamilyContribution({ runId: form.runId, kind: form.kind, content: form.content });
      setForm((current) => ({ ...current, content: "" }));
      setMessage("Rodinný podnět byl předán do školního Experience kontextu. Není to důkaz ani reflexe žáka.");
      await load();
    } catch (err) {
      setError(err.message || "Rodinný podnět se nepodařilo uložit.");
    } finally {
      setBusy(false);
    }
  };

  const withdraw = async (id) => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await withdrawFamilyContribution(id);
      setMessage("Rodinný podnět byl stažen.");
      await load();
    } catch (err) {
      setError(err.message || "Podnět se nepodařilo stáhnout.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="product-shell max-w-6xl"><div className="card-soft p-6 text-sm text-muted-foreground">Načítám Family workspace…</div></div>;
  }

  const guardianAccess = Boolean(summary?.has_family_access || contexts.length || passport.length || myContributions.length);
  const staffAccess = staffContributions.length > 0;
  const nextAction = selectedContext
    ? {
        title: "Přidat bezpečný rodinný podnět",
        detail: `Aktuální Experience: ${selectedContext.mission_title}. Rodina může přinést kontext, kontakt, zdroj nebo pozorování — neřeší úkol za žáka.`,
        href: "#family-contribution",
        label: "Přispět do Experience",
      }
    : staffAccess
      ? {
          title: `Projít ${staffContributions.length} ${staffContributions.length === 1 ? "rodinný podnět" : "rodinné podněty"}`,
          detail: "School-side inbox ukazuje pouze podněty, které zůstávají uvnitř účelově povoleného Family + school review kontextu.",
          href: "#staff-family-inbox",
          label: "Otevřít školní inbox",
        }
      : passport.length > 0
        ? {
            title: "Prohlédnout povolené Passport summary",
            detail: "Passport summary je oddělená projekce. Neotevírá raw evidence ani soukromou reflexi.",
            href: "#family-passport",
            label: "Otevřít Passport summary",
          }
        : null;

  return (
    <div className="product-shell max-w-6xl" data-role="family">
      <header className="workspace-header">
        <div>
          <div className="workspace-kicker"><HeartHandshake size={18} /><span>PANSOFIE FAMILY · FIELD PILOT R3</span></div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold font-heading">Rodina pomáhá zkušenosti. Nehodnotí člověka.</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">Family workspace ukazuje jen účel, bezpečný kontext a povolenou část Passportu. Soukromá reflexe a raw evidence zůstávají mimo rodinný přístup.</p>
        </div>
        <button type="button" onClick={load} disabled={busy} className="action-secondary shrink-0 rounded-xl px-4"><RefreshCw size={15} /> Obnovit</button>
      </header>

      {error && <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex gap-3"><AlertTriangle size={18} className="text-destructive shrink-0" /><span>{error}</span></div>}
      {message && <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm flex gap-3"><CheckCircle2 size={18} className="text-primary shrink-0" /><span>{message}</span></div>}

      {nextAction && (
        <section className="next-action-card mb-7">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">
            <div>
              <p className="eyebrow">CO JE TEĎ NA MNĚ?</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{nextAction.title}</h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">{nextAction.detail}</p>
            </div>
            <a href={nextAction.href} className="action-primary">{nextAction.label} <ArrowRight size={17} /></a>
          </div>
        </section>
      )}

      <section className="mb-9 surface-panel p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="role-icon h-10 w-10 rounded-xl"><ShieldCheck size={19} /></span>
          <div>
            <p className="eyebrow">Privacy boundary</p>
            <h2 className="font-semibold mt-1">Rodina nevidí raw evidence ani soukromou reflexi.</h2>
            <p className="text-sm text-muted-foreground mt-1">Verified guardian relationship sama o sobě nestačí: pro aktivní Experience je nutný purpose-specific <code>guardian_family_participation</code>; Passport summary má oddělený <code>guardian_passport_view</code>.</p>
          </div>
        </div>
      </section>

      {guardianAccess ? (
        <>
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4"><UsersRound size={18} style={{ color: "hsl(var(--role-accent))" }} /><h2 className="text-xl font-semibold font-heading">Aktuální Experience</h2></div>
            {contexts.length === 0 ? (
              <div className="card-soft p-6 text-sm text-muted-foreground">Rodinný přístup je ověřený, ale momentálně není dostupná žádná aktivní Experience s účelem <code>guardian_family_participation</code>.</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {contexts.map((item) => (
                  <article key={item.run_id} className="card-soft p-5" style={form.runId === item.run_id ? { borderColor: "hsl(var(--role-accent) / 0.38)" } : undefined}>
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="text-xs text-muted-foreground">{item.child_name} · {item.organization_name}</p><h3 className="text-lg font-semibold mt-1">{item.mission_title}</h3></div>
                      <span className={`status-pill ${RUN_STATUS_CLASS[item.run_status] || "status-neutral"}`}>{RUN_STATUS[item.run_status] || item.run_status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{item.mission_summary || item.mission_why || "Skutečná Experience v bezpečném školním rámci."}</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="surface-subtle p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">PROČ</p><p className="mt-1 text-muted-foreground">{item.mission_why || "Účel je součástí zadání Experience."}</p></div>
                      <div className="surface-subtle p-3"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">JAK MŮŽE RODINA POMOCT</p><p className="mt-1 text-muted-foreground">{item.contribution_prompt || "Přidejte kontext, kontakt, zdroj nebo pozorování — neřešte úkol za žáka."}</p></div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Pilotní okno: {item.pilot_starts_on || "—"} → {item.pilot_ends_on || "—"}</p>
                    <button type="button" onClick={() => setForm((current) => ({ ...current, runId: item.run_id }))} className="action-secondary mt-4 rounded-xl px-4">Vybrat pro rodinný podnět</button>
                  </article>
                ))}
              </div>
            )}
          </section>

          {selectedContext && (
            <section id="family-contribution" className="mb-10 surface-raised p-5 sm:p-6 scroll-mt-24">
              <div className="flex items-center gap-2"><Send size={18} style={{ color: "hsl(var(--role-accent))" }} /><h2 className="text-xl font-semibold font-heading">Přispět do Experience</h2></div>
              <p className="text-sm text-muted-foreground mt-2">Pro: <strong>{selectedContext.child_name}</strong> · {selectedContext.mission_title}. Podnět je samostatný rodinný vstup; nestává se automaticky důkazem, reflexí ani hodnocením.</p>
              <form onSubmit={submitContribution} className="mt-5 grid grid-cols-1 lg:grid-cols-[220px_1fr_auto] gap-3 items-end">
                <label className="text-sm"><span className="block font-medium mb-2">Typ přínosu</span><select value={form.kind} onChange={(e) => setForm((current) => ({ ...current, kind: e.target.value }))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5">{Object.entries(KIND_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
                <label className="text-sm"><span className="block font-medium mb-2">Konkrétní podnět</span><textarea rows={2} maxLength={2000} value={form.content} onChange={(e) => setForm((current) => ({ ...current, content: e.target.value }))} placeholder="Např. kontakt na místního odborníka, možnost návštěvy, věcný kontext…" className="w-full rounded-xl border border-border bg-background px-3 py-2.5" /></label>
                <button disabled={busy || !form.content.trim()} className="action-primary rounded-xl">Předat</button>
              </form>
            </section>
          )}

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4"><HeartHandshake size={18} style={{ color: "hsl(var(--role-accent))" }} /><h2 className="text-xl font-semibold font-heading">Moje rodinné podněty</h2></div>
            {myContributions.length === 0 ? <div className="card-soft p-6 text-sm text-muted-foreground">Zatím nebyl předán žádný rodinný podnět.</div> : <div className="space-y-3">{myContributions.map((item) => <div key={item.id} className="card-soft p-4 flex flex-col sm:flex-row sm:items-start gap-3"><div className="flex-1"><p className="text-xs font-semibold" style={{ color: "hsl(var(--role-accent))" }}>{KIND_LABEL[item.contribution_kind] || item.contribution_kind} · {item.status}</p><p className="text-sm mt-2 whitespace-pre-wrap">{item.content}</p><p className="text-[11px] text-muted-foreground mt-2">{new Date(item.created_at).toLocaleString("cs-CZ")}</p></div>{item.status === "active" && <button type="button" disabled={busy} onClick={() => withdraw(item.id)} className="action-secondary min-h-9 rounded-xl px-3 py-1.5 text-xs">Stáhnout</button>}</div>)}</div>}
          </section>

          <section id="family-passport" className="mb-10 scroll-mt-24">
            <div className="flex items-center gap-2 mb-4"><BookOpenCheck size={18} className="text-primary" /><h2 className="text-xl font-semibold font-heading">Povolené Passport summary</h2></div>
            {passport.length === 0 ? <div className="card-soft p-6 text-sm text-muted-foreground">Žádné Passport summary není pro tento guardian účet účelově zpřístupněné.</div> : <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{passport.map((item) => <article key={item.portfolio_item_id} className="card-soft p-5"><p className="text-xs text-muted-foreground">{item.child_name}</p><h3 className="font-semibold mt-1">{item.title}</h3><p className="text-sm text-muted-foreground mt-2">{item.summary || "Ověřená Experience v Passportu."}</p><p className="text-xs text-muted-foreground mt-3">{item.verified_at ? "Ověřeno" : "Bez Passport verification timestamp"} · {item.occurred_at ? new Date(item.occurred_at).toLocaleDateString("cs-CZ") : "—"}</p></article>)}</div>}
          </section>
        </>
      ) : (
        <section className="mb-10 card-soft p-6">
          <h2 className="font-semibold">Rodinný přístup není aktivní.</h2>
          <p className="text-sm text-muted-foreground mt-2">Účet musí být navázán na verified guardian relationship a na konkrétní účel zpracování. PANSOFIE neodemyká data jen podle tvrzení „jsem rodič“.</p>
        </section>
      )}

      <section id="staff-family-inbox" className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-4"><UsersRound size={18} className="text-primary" /><h2 className="text-xl font-semibold font-heading">Rodinné podněty pro školu</h2></div>
        {staffContributions.length === 0 ? (
          <div className="card-soft p-6 text-sm text-muted-foreground">Pro organizace, ve kterých máte teacher/coordinator oprávnění, teď nejsou žádné aktivní rodinné podněty s povoleným school mission review.</div>
        ) : (
          <div className="space-y-3">{staffContributions.map((item) => <article key={item.id} className="card-soft p-5"><div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span>{item.organization_name}</span><span>·</span><span>{item.child_name}</span><span>·</span><span>{item.mission_title}</span></div><p className="text-xs font-semibold text-primary mt-2">{KIND_LABEL[item.contribution_kind] || item.contribution_kind}</p><p className="text-sm mt-2 whitespace-pre-wrap">{item.content}</p><p className="text-[11px] text-muted-foreground mt-2">{new Date(item.created_at).toLocaleString("cs-CZ")}</p></article>)}</div>
        )}
      </section>
    </div>
  );
}
