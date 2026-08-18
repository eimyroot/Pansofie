import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Building2, HeartHandshake, Landmark, ShieldCheck, Sparkles } from "lucide-react";
import PublicNav from "@/components/pansofie/PublicNav";
import PublicFooter from "@/components/pansofie/PublicFooter";

const ROLES = [
  ["school", "Škola", Building2, "Chci zjistit, zda se naše škola hodí do prvního pilotu."],
  ["partner", "Firma / organizace", Sparkles, "Chci přinést reálnou Challenge, expertizu nebo možnost adopce."],
  ["community", "Obec / komunita", Landmark, "Chci přinést lokální potřebu, kontext nebo prostředí pro Experience."],
  ["family", "Rodina", HeartHandshake, "Chci vědět, jak se rodina bezpečně zapojuje do pilotu."],
  ["general", "Jiný zájem", Sparkles, "Chci se ozvat k Pansofii nebo budoucí spolupráci."],
];

export default function Join() {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("role") || "school";
  const defaultRole = ROLES.some(([id]) => id === requested) ? requested : "general";
  const [role, setRole] = useState(defaultRole);
  const [notice, setNotice] = useState("");

  const active = useMemo(() => ROLES.find(([id]) => id === role) || ROLES[0], [role]);

  const submit = (event) => {
    event.preventDefault();
    setNotice("Tato pre-field-pilot verze formuláře záměrně nic neodesílá ani neukládá. Kontaktní kanál aktivujeme až po zveřejnění právního provozovatele a privacy kontaktu.");
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="container-px max-w-7xl mx-auto py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="chip bg-primary/10 text-primary mb-5"><Sparkles size={14} /> Zapojit se</span>
              <h1 className="text-4xl sm:text-6xl font-semibold font-display tracking-tight text-balance leading-[1.05]">Najděme roli, ve které vznikne <span className="text-primary">skutečný přínos.</span></h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">První pilot není otevřený marketplace ani veřejná registrace. Školy, rodiny, firmy, obce a odborníci se zapojují podle konkrétní Experience, účelu a bezpečnostních hranic.</p>

              <div className="mt-8 rounded-3xl border border-primary/20 bg-primary/[0.035] p-6">
                <div className="flex gap-3"><ShieldCheck size={21} className="text-primary shrink-0 mt-0.5" /><div><h2 className="font-semibold">Kontaktní kanál je zatím fail-closed</h2><p className="mt-2 text-sm text-muted-foreground leading-relaxed">Před aktivací veřejného formuláře musí být doplněn právní provozovatel projektu, veřejný kontakt a controller-specific privacy informace. Do té doby tato stránka slouží jako připravený onboarding a nic neodesílá.</p></div></div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map(([id, label, Icon, text]) => (
                  <button key={id} type="button" onClick={() => { setRole(id); setNotice(""); }} className={`text-left rounded-2xl border p-5 transition-colors ${role === id ? "border-primary/40 bg-primary/[0.05]" : "border-border bg-card/40 hover:bg-card"}`}>
                    <div className="flex items-center gap-3"><span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={18} /></span><span className="font-semibold">{label}</span></div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="mt-6 rounded-[2rem] border border-border bg-card/40 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{active[1]}</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold font-display">Připravit nezávazný zájem</h2>
                <p className="mt-3 text-sm text-muted-foreground">Údaje zůstanou pouze v tomto prohlížeči a nebudou přeneseny na server.</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="text-sm font-medium">Jméno<input name="name" className="mt-2 w-full h-12 rounded-xl border border-border bg-background px-4 font-normal" placeholder="Vaše jméno" /></label>
                  <label className="text-sm font-medium">Organizace<input name="organization" className="mt-2 w-full h-12 rounded-xl border border-border bg-background px-4 font-normal" placeholder="Škola, firma, obec…" /></label>
                  <label className="text-sm font-medium sm:col-span-2">E-mail<input name="email" type="email" className="mt-2 w-full h-12 rounded-xl border border-border bg-background px-4 font-normal" placeholder="kontakt@domena.cz" /></label>
                  <label className="text-sm font-medium sm:col-span-2">Co byste chtěli přinést nebo ověřit?<textarea name="message" rows={5} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-normal resize-y" placeholder="Krátce popište školu, Challenge, lokální potřebu nebo způsob zapojení." /></label>
                </div>

                <button type="submit" className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90">Ověřit připravenost formuláře <ArrowRight size={17} /></button>
                {notice && <div role="status" className="mt-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 text-sm leading-relaxed">{notice}</div>}
              </form>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
