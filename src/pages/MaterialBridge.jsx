import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Handshake,
  ImagePlus,
  Leaf,
  MapPin,
  PackageCheck,
  RefreshCw,
  Send,
  ShieldCheck,
  Upload,
} from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { listMyOrganizationMemberships } from "@/lib/pansofieExperienceFlow";
import {
  CZECH_REGIONS,
  MATERIAL_CATEGORIES,
  MATERIAL_CONDITIONS,
  cancelMaterialListing,
  createMaterialListing,
  getMaterialPhotoUrl,
  listMaterialListings,
  listMyMaterialListings,
  listPublicMaterialStories,
  markMaterialHandedOver,
  reserveMaterialListing,
  uploadMaterialPhoto,
} from "@/lib/pansofieParticipationFlow";

const emptyForm = {
  listingType: "offer",
  organizationId: "",
  title: "",
  category: "technology",
  conditionStatus: "like_new",
  quantity: "",
  description: "",
  region: "Hlavní město Praha",
  locality: "",
  handoffMethods: [],
  personalInvolvement: [],
  photo: null,
};

const STATUS_LABEL = {
  available: "AVAILABLE",
  reserved: "RESERVED",
  handed_over: "HANDED OVER",
  cancelled: "CANCELLED",
};

function toggleArray(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function PublicMaterialBridge() {
  const { locale } = useLanguage();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendUnavailable, setBackendUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    listPublicMaterialStories()
      .then((rows) => { if (active) setStories(rows); })
      .catch(() => { if (active) setBackendUnavailable(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen r14-material-public">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="r14-material-hero">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <span className="r14-material-kicker"><Boxes size={18} /> CIRCULAR PANSOFIE</span>
            <h1>{locale === "en" ? "Material Bridge: give useful things a second life." : "Materiálový most: dejte užitečným věcem druhý život."}</h1>
            <p>{locale === "en" ? "Companies and communities can offer equipment and surplus material. Schools can request what they genuinely need. The workflow keeps location, reservation and handover explicit." : "Firmy a komunity mohou nabídnout vybavení a přebytečný materiál. Školy mohou poptat to, co skutečně potřebují. Workflow drží lokalitu, rezervaci a předání explicitně."}</p>
            <div className="r14-material-actions">
              <Link to="/login?returnTo=/materialovy-most/workspace" className="action-primary">{locale === "en" ? "Open the Material Bridge" : "Vstoupit do Materiálového mostu"} <ArrowRight size={17} /></Link>
              <a href="#feed" className="action-secondary">{locale === "en" ? "See verified handovers" : "Podívat se na ověřená předání"}</a>
            </div>
          </div>
        </section>

        <section className="r14-material-how">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-20">
            <div className="r14-material-steps">
              <article><span>01</span><Boxes size={22} /><h2>{locale === "en" ? "Offer or request" : "Nabídka nebo poptávka"}</h2><p>{locale === "en" ? "Describe the item, quantity, condition and region. No contact details are published." : "Popište položku, množství, stav a region. Kontaktní údaje se veřejně nezobrazují."}</p></article>
              <article><span>02</span><MapPin size={22} /><h2>{locale === "en" ? "Match locally" : "Propojení v regionu"}</h2><p>{locale === "en" ? "Filter by region and handover method so reuse does not create unnecessary transport." : "Filtrujte podle kraje a způsobu předání, aby opětovné využití nevytvářelo zbytečnou dopravu."}</p></article>
              <article><span>03</span><PackageCheck size={22} /><h2>{locale === "en" ? "Reserve and hand over" : "Rezervace a předání"}</h2><p>{locale === "en" ? "The state moves from AVAILABLE to RESERVED and only then to HANDED OVER." : "Stav se mění z AVAILABLE na RESERVED a teprve po skutečném předání na HANDED OVER."}</p></article>
              <article><span>04</span><Leaf size={22} /><h2>{locale === "en" ? "Evidence the result" : "Doložení výsledku"}</h2><p>{locale === "en" ? "A public story appears only after a real handover, a short impact note and explicit consent." : "Veřejný příběh vznikne až po skutečném předání, krátkém popisu dopadu a explicitním souhlasu."}</p></article>
            </div>
          </div>
        </section>

        <section id="feed" className="r14-material-feed scroll-mt-28">
          <div className="container-px max-w-7xl mx-auto py-16 sm:py-24">
            <span className="r14-material-kicker"><Handshake size={18} /> {locale === "en" ? "REPAIR FEED" : "FEED NÁPRAVY"}</span>
            <h2>{locale === "en" ? "Only stories backed by a real handover." : "Jen příběhy podložené skutečným předáním."}</h2>
            {loading ? <p className="r14-material-empty">{locale === "en" ? "Loading verified handovers…" : "Načítám ověřená předání…"}</p> : stories.length ? (
              <div className="r14-story-grid">{stories.map((story) => <article key={story.listing_id}><span>{story.region}</span><h3>{story.title}</h3><p>{story.impact_summary}</p><small>{new Date(story.handed_over_at).toLocaleDateString(locale === "en" ? "en-GB" : "cs-CZ")}</small></article>)}</div>
            ) : (
              <div className="r14-material-empty"><ShieldCheck size={24} /><h3>{locale === "en" ? "No verified public handover yet." : "Zatím žádné ověřené veřejné předání."}</h3><p>{backendUnavailable ? (locale === "en" ? "The R14 Material Bridge backend is not enabled in this environment, so no stories are fabricated." : "R14 backend Materiálového mostu není v tomto prostředí aktivní, proto žádné příběhy nevymýšlíme.") : (locale === "en" ? "The feed will populate only after the first real handover with consent." : "Feed se naplní až po prvním skutečném předání se souhlasem ke zveřejnění.")}</p></div>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

function MaterialWorkspace() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const [memberships, setMemberships] = useState([]);
  const [listings, setListings] = useState([]);
  const [mine, setMine] = useState([]);
  const [photoUrls, setPhotoUrls] = useState({});
  const [regionFilter, setRegionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [impact, setImpact] = useState({});
  const [publicConsent, setPublicConsent] = useState({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const activeMemberships = useMemo(() => memberships.filter((m) => m.status === "active"), [memberships]);

  const load = async () => {
    if (!user?.id) return;
    setLoading(true); setError("");
    try {
      const [membershipRows, listingRows, mineRows] = await Promise.all([
        listMyOrganizationMemberships(user.id),
        listMaterialListings({ listingType: typeFilter || null, region: regionFilter || null }),
        listMyMaterialListings(user.id),
      ]);
      setMemberships(membershipRows);
      setListings(listingRows);
      setMine(mineRows);
      setForm((current) => ({ ...current, organizationId: current.organizationId || membershipRows.find((m) => m.status === "active")?.organization_id || "" }));

      const paths = [...listingRows, ...mineRows].filter((row) => row.photo_path);
      const urls = {};
      await Promise.all(paths.map(async (row) => {
        try { urls[row.id] = await getMaterialPhotoUrl(row.photo_path); } catch { urls[row.id] = null; }
      }));
      setPhotoUrls(urls);
    } catch (err) {
      setError(locale === "en" ? "The R14 Material Bridge backend is not enabled in this environment. No listing or reservation was changed." : "R14 backend Materiálového mostu není v tomto prostředí aktivní. Žádná nabídka ani rezervace nebyla změněna.");
      console.error(err);
      setListings([]); setMine([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [user?.id, regionFilter, typeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (event) => {
    event.preventDefault();
    if (!user?.id || busy) return;
    setBusy(true); setError(""); setMessage("");
    try {
      let photoPath = null;
      if (form.photo) photoPath = await uploadMaterialPhoto({ file: form.photo, userId: user.id });
      await createMaterialListing({
        ...form,
        ownerUserId: user.id,
        conditionStatus: form.listingType === "request" ? "not_applicable" : form.conditionStatus,
        photoPath,
      });
      setMessage(locale === "en" ? "The listing is now AVAILABLE in the Material Bridge." : "Položka je nyní v Materiálovém mostu ve stavu AVAILABLE.");
      setForm((current) => ({ ...emptyForm, organizationId: current.organizationId, region: current.region }));
      await load();
    } catch (err) {
      setError(locale === "en" ? "The listing was not created. Check whether the R14 database migration and storage bucket are enabled." : "Položka nebyla vytvořena. Ověřte, že je aktivní R14 databázová migrace a storage bucket.");
      console.error(err);
    } finally { setBusy(false); }
  };

  const reserve = async (row) => {
    setBusy(true); setError(""); setMessage("");
    try {
      await reserveMaterialListing({ listingId: row.id, organizationId: form.organizationId || null });
      setMessage(row.listing_type === "offer" ? (locale === "en" ? "Material reserved. Arrange the handover outside the public listing." : "Materiál je rezervovaný. Domluvte bezpečně předání mimo veřejný listing.") : (locale === "en" ? "You accepted the request for fulfilment." : "Poptávku jste převzali k naplnění."));
      await load();
    } catch (err) { setError(locale === "en" ? "Reservation failed; the item may already be reserved." : "Rezervace se nezdařila; položka už může být rezervovaná."); console.error(err); }
    finally { setBusy(false); }
  };

  const handover = async (row) => {
    setBusy(true); setError(""); setMessage("");
    try {
      await markMaterialHandedOver({ listingId: row.id, impactSummary: impact[row.id] || "", publicStoryConsent: Boolean(publicConsent[row.id]) });
      setMessage(locale === "en" ? "Handover recorded as HANDED OVER." : "Předání je doloženo stavem HANDED OVER.");
      await load();
    } catch (err) { setError(locale === "en" ? "The handover could not be recorded." : "Předání se nepodařilo zaznamenat."); console.error(err); }
    finally { setBusy(false); }
  };

  return (
    <div className="r14-material-workspace">
      <header className="r14-dashboard-header">
        <div><p className="eyebrow">PANSOFIE · CIRCULAR NETWORK</p><h1>{locale === "en" ? "Material Bridge" : "Materiálový most"}</h1><p>{locale === "en" ? "Offer, request, reserve and document the handover of useful material." : "Nabídněte, poptejte, rezervujte a doložte předání užitečného materiálu."}</p></div>
        <button type="button" onClick={load} disabled={loading || busy} className="action-secondary"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> {locale === "en" ? "Refresh" : "Obnovit"}</button>
      </header>

      {error && <div className="r14-dashboard-warning" role="alert"><ShieldCheck size={18} /><span>{error}</span></div>}
      {message && <div className="r14-material-success" role="status"><CheckCircle2 size={18} /><span>{message}</span></div>}

      <section className="r14-material-workspace-grid">
        <form onSubmit={submit} className="r14-material-form">
          <div className="r14-dashboard-title"><Upload size={20} /><div><p className="eyebrow">NOVÁ POLOŽKA</p><h2>{form.listingType === "offer" ? (locale === "en" ? "Offer useful material" : "Nabídnout materiál do škol") : (locale === "en" ? "Request material" : "Zadat poptávku pro školu")}</h2></div></div>
          <div className="r14-segmented"><button type="button" className={form.listingType === "offer" ? "is-active" : ""} onClick={() => setForm((v) => ({ ...v, listingType: "offer" }))}>{locale === "en" ? "I OFFER" : "NABÍZÍM"}</button><button type="button" className={form.listingType === "request" ? "is-active" : ""} onClick={() => setForm((v) => ({ ...v, listingType: "request" }))}>{locale === "en" ? "I NEED" : "POPTÁVÁM"}</button></div>

          <label><span>{locale === "en" ? "Organization" : "Organizace"}</span><select value={form.organizationId} onChange={(e) => setForm((v) => ({ ...v, organizationId: e.target.value }))}><option value="">{locale === "en" ? "Personal / no organization" : "Osobně / bez organizace"}</option>{activeMemberships.map((m) => <option key={m.id} value={m.organization_id}>{m.organizations?.name || m.organization_id}</option>)}</select></label>
          <label><span>{locale === "en" ? "Item / material name" : "Název položky / materiálu"}</span><input required maxLength={180} placeholder={form.listingType === "offer" ? "10 starších monitorů Dell" : "5 monitorů pro robotiku"} value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} /></label>
          <label><span>{locale === "en" ? "Category" : "Kategorie materiálu"}</span><select value={form.category} onChange={(e) => setForm((v) => ({ ...v, category: e.target.value }))}>{MATERIAL_CATEGORIES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          {form.listingType === "offer" && <label><span>{locale === "en" ? "Condition" : "Stav věcí"}</span><select value={form.conditionStatus} onChange={(e) => setForm((v) => ({ ...v, conditionStatus: e.target.value }))}>{MATERIAL_CONDITIONS.filter(([value]) => value !== "not_applicable").map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
          <label><span>{locale === "en" ? "Quantity" : "Množství"}</span><input maxLength={120} placeholder="15 ks / cca 50 kg" value={form.quantity} onChange={(e) => setForm((v) => ({ ...v, quantity: e.target.value }))} /></label>
          <label><span>{locale === "en" ? "Region" : "Kraj"}</span><select required value={form.region} onChange={(e) => setForm((v) => ({ ...v, region: e.target.value }))}>{CZECH_REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}</select></label>
          <label><span>{locale === "en" ? "Town / locality" : "Město / lokalita"}</span><input maxLength={160} value={form.locality} onChange={(e) => setForm((v) => ({ ...v, locality: e.target.value }))} /></label>
          <label><span>{locale === "en" ? "Description" : "Popis"}</span><textarea rows={4} maxLength={3000} value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} /></label>

          <fieldset><legend>{locale === "en" ? "Handover methods" : "Způsob předání"}</legend>{[["pickup", "Pouze osobní odběr"], ["local_delivery", "Můžeme dovézt v regionu"], ["courier", "Lze poslat kurýrem / poštou"]].map(([value, label]) => <label key={value} className="r14-inline-check"><input type="checkbox" checked={form.handoffMethods.includes(value)} onChange={() => setForm((v) => ({ ...v, handoffMethods: toggleArray(v.handoffMethods, value) }))} /><span>{label}</span></label>)}</fieldset>
          <fieldset><legend>{locale === "en" ? "Optional personal involvement" : "Pansofický přesah (nepovinné)"}</legend>{[["impact_feedback", "Chceme zprávu nebo fotku, co z materiálu vzniklo"], ["expert_help", "Naši lidé mohou pomoci s instalací / workshopem"]].map(([value, label]) => <label key={value} className="r14-inline-check"><input type="checkbox" checked={form.personalInvolvement.includes(value)} onChange={() => setForm((v) => ({ ...v, personalInvolvement: toggleArray(v.personalInvolvement, value) }))} /><span>{label}</span></label>)}</fieldset>
          <label className="r14-file-field"><ImagePlus size={20} /><span>{form.photo ? form.photo.name : (locale === "en" ? "Add one photo (JPG/PNG/WEBP, max 5 MB)" : "Přidat jednu fotografii (JPG/PNG/WEBP, max 5 MB)")}</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setForm((v) => ({ ...v, photo: e.target.files?.[0] || null }))} /></label>
          <button type="submit" disabled={busy || !form.title.trim() || !form.region} className="action-primary r14-submit">{form.listingType === "offer" ? (locale === "en" ? "Offer material" : "Nabídnout materiál do sítě Pansofie") : (locale === "en" ? "Publish request" : "Zveřejnit poptávku")} <Send size={16} /></button>
        </form>

        <div className="r14-material-board">
          <div className="r14-material-board-head"><div className="r14-dashboard-title"><Boxes size={20} /><div><p className="eyebrow">SÍŤ</p><h2>{locale === "en" ? "Available offers and requests" : "Volné nabídky a poptávky"}</h2></div></div><div className="r14-filter-row"><select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="">{locale === "en" ? "All types" : "Vše"}</option><option value="offer">{locale === "en" ? "Offers" : "Nabídky"}</option><option value="request">{locale === "en" ? "Requests" : "Poptávky"}</option></select><select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}><option value="">{locale === "en" ? "All regions" : "Všechny kraje"}</option>{CZECH_REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}</select></div></div>
          {loading ? <p className="r14-material-empty">{locale === "en" ? "Loading…" : "Načítám…"}</p> : listings.length === 0 ? <div className="r14-material-empty"><Boxes size={22} /><h3>{locale === "en" ? "No AVAILABLE listings in this filter." : "V tomto filtru není žádná položka AVAILABLE."}</h3></div> : <div className="r14-listing-grid">{listings.map((row) => <article key={row.id} className="r14-listing-card">{photoUrls[row.id] && <img src={photoUrls[row.id]} alt="" />}<div className="r14-listing-meta"><span className={row.listing_type === "offer" ? "is-offer" : "is-request"}>{row.listing_type === "offer" ? (locale === "en" ? "OFFER" : "NABÍDKA") : (locale === "en" ? "REQUEST" : "POPTÁVKA")}</span><span>{row.region}</span></div><h3>{row.title}</h3><p>{row.description || "—"}</p><small>{row.quantity || ""}{row.locality ? ` · ${row.locality}` : ""}</small>{row.owner_user_id !== user?.id && <button type="button" disabled={busy} onClick={() => reserve(row)} className="action-secondary">{row.listing_type === "offer" ? (locale === "en" ? "Reserve" : "Chci pro naši školu") : (locale === "en" ? "I can fulfil this" : "Mohu nabídnout") } <ArrowRight size={15} /></button>}</article>)}</div>}
        </div>
      </section>

      <section className="r14-my-listings">
        <div className="r14-dashboard-title"><PackageCheck size={20} /><div><p className="eyebrow">MOJE POLOŽKY</p><h2>{locale === "en" ? "Status and handover evidence" : "Stav a doložení předání"}</h2></div></div>
        {mine.length === 0 ? <p className="r14-material-empty">{locale === "en" ? "You have no Material Bridge listings yet." : "Zatím nemáte žádnou položku Materiálového mostu."}</p> : <div className="r14-my-listing-grid">{mine.map((row) => <article key={row.id}><div className="r14-listing-meta"><span>{STATUS_LABEL[row.status] || row.status}</span><span>{row.region}</span></div><h3>{row.title}</h3>{row.status === "reserved" && <div className="r14-handover-box"><p>{locale === "en" ? "Record HANDED OVER only after the physical handover really happened." : "Stav HANDED OVER potvrďte až poté, co k fyzickému předání skutečně došlo."}</p><textarea rows={3} maxLength={3000} placeholder={locale === "en" ? "What happened and how can the material be used?" : "Co se stalo a k čemu může materiál sloužit?"} value={impact[row.id] || ""} onChange={(e) => setImpact((v) => ({ ...v, [row.id]: e.target.value }))} /><label className="r14-inline-check"><input type="checkbox" checked={Boolean(publicConsent[row.id])} onChange={(e) => setPublicConsent((v) => ({ ...v, [row.id]: e.target.checked }))} /><span>{locale === "en" ? "This impact note may appear in the public Repair Feed without contact details." : "Tento popis dopadu může být zveřejněn ve Feed nápravy bez kontaktních údajů."}</span></label><button type="button" disabled={busy} onClick={() => handover(row)} className="action-primary">{locale === "en" ? "Confirm real handover" : "Potvrdit skutečné předání"}</button></div>}{row.status === "available" && <button type="button" disabled={busy} onClick={async () => { try { await cancelMaterialListing(row.id); setMessage(locale === "en" ? "Listing cancelled." : "Položka byla zrušena."); await load(); } catch (err) { setError(locale === "en" ? "Cancellation failed." : "Zrušení se nezdařilo."); console.error(err); } }} className="action-quiet">{locale === "en" ? "Cancel listing" : "Zrušit položku"}</button>}</article>)}</div>}
      </section>
    </div>
  );
}

export default function MaterialBridge({ workspace = false }) {
  return workspace ? <MaterialWorkspace /> : <PublicMaterialBridge />;
}
