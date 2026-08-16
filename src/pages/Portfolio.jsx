import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, FolderOpen, LockKeyhole } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { listMyPortfolio } from "@/lib/pansofieExperienceFlow";

export default function Portfolio() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError("");
      try {
        const rows = await listMyPortfolio(user.id);
        if (active) setItems(rows);
      } catch (err) {
        if (active) setError(err.message || "Passport se nepodařilo načíst.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [user?.id]);

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-primary mb-2"><FolderOpen size={20} /><span className="text-sm font-semibold">PANSOFIE EXPERIENCE PASSPORT</span></div>
        <h1 className="text-2xl sm:text-3xl font-semibold font-heading">Portfolio skutečných zkušeností</h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">Nejde o skóre člověka. Každá položka vzniká z konkrétní mise, skutečné činnosti, důkazu, reflexe a ověření.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm flex items-start gap-3">
          <AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" />
          <div><p className="font-semibold">Passport datová vrstva není dostupná.</p><p className="text-muted-foreground mt-1">{error}</p><p className="text-muted-foreground mt-1">Nezobrazujeme náhradní nebo smyšlené položky.</p></div>
        </div>
      )}

      {loading ? (
        <div className="card-soft p-6 text-sm text-muted-foreground">Načítám Passport…</div>
      ) : !error && items.length === 0 ? (
        <div className="card-soft p-8 text-center"><FolderOpen size={32} className="mx-auto text-primary/40"/><h2 className="font-semibold mt-4">Passport je zatím prázdný.</h2><p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">První položka vznikne po dokončení školní Experience. PANSOFIE nevytváří falešné demo úspěchy v osobním portfoliu.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <article key={item.id} className="card-soft p-5">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-xs font-semibold text-primary">EXPERIENCE</p><h2 className="font-semibold text-lg mt-1">{item.title}</h2></div>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"><LockKeyhole size={11}/>{item.visibility}</span>
              </div>
              {item.summary && <p className="text-sm text-muted-foreground mt-3">{item.summary}</p>}
              {item.experiences?.path_ids?.length > 0 && <div className="flex flex-wrap gap-1.5 mt-4">{item.experiences.path_ids.map((path) => <span key={path} className="rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[11px] font-medium">{path}</span>)}</div>}
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>{new Date(item.created_at).toLocaleDateString("cs-CZ")}</span>{item.verified_at && <span className="inline-flex items-center gap-1 text-primary"><CheckCircle2 size={13}/>ověřeno</span>}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
