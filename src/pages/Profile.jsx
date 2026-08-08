import React from "react";
import { MapPin, Mail, CheckCircle2, FolderOpen, Target, Briefcase, Sparkles, Search, HandHeart } from "lucide-react";
import { getPath } from "@/lib/pansofieData";
import { useAuth } from "@/lib/AuthContext";

export default function Profile() {
  const { profile } = useAuth();
  const u = profile;
  const initials = (u?.name || "Pansofie")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const totalExperiences = u?.paths?.reduce((sum, path) => sum + path.experiences, 0) || 0;

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-5xl mx-auto">
      <div className="card-soft p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
          <div className="h-20 w-20 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-semibold shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold font-heading">{u?.name || "Člen Pansofie"}</h1>
            <p className="text-sm text-muted-foreground mt-1">{u?.role || "Člen Pansofie"}</p>
            {u?.location && <p className="text-sm text-muted-foreground mt-2 inline-flex items-center gap-1.5"><MapPin size={14} /> {u.location}</p>}
            {u?.intro ? (
              <p className="mt-4 leading-relaxed max-w-2xl">{u.intro}</p>
            ) : (
              <p className="mt-4 leading-relaxed max-w-2xl text-muted-foreground">Profil je zatím prázdný. Postupně se bude plnit skutečnými misemi, zkušenostmi a projekty.</p>
            )}
            <p className="mt-4 text-xs text-muted-foreground inline-flex items-center gap-2"><Mail size={14} /> {u?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {[
          { icon: Target, label: "Dokončené mise", value: u?.completedMissions || 0 },
          { icon: CheckCircle2, label: "Zkušenosti", value: totalExperiences },
          { icon: FolderOpen, label: "Portfolio", value: u?.portfolioItems || 0 },
          { icon: Briefcase, label: "Projekty", value: u?.projects || 0 },
        ].map((stat) => {
          const Icon = stat.icon;
          return <div key={stat.label} className="card-soft p-5"><Icon size={18} className="text-primary mb-2" /><p className="text-2xl font-semibold font-heading">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>;
        })}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold font-heading mb-4">7 cest — doložený rozvoj</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(u?.paths || []).map((userPath) => {
            const path = getPath(userPath.id);
            if (!path) return null;
            const Icon = path.icon;
            return <div key={userPath.id} className="card-soft p-5 flex items-center gap-4"><div className="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${path.color}18`, color: path.color }}><Icon size={22} /></div><div><p className="font-semibold font-heading">{path.name}</p><p className="text-xs text-muted-foreground">{userPath.experiences} zkušeností · {userPath.missions} dokončených misí</p></div></div>;
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        <EmptyListCard icon={Search} title="Hledám" items={u?.seeks || []} />
        <EmptyListCard icon={HandHeart} title="Nabízím" items={u?.offers || []} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <TagCard title="Ověřené schopnosti" items={u?.skills || []} />
        <TagCard title="Zájmy" items={u?.interests || []} icon={Sparkles} muted />
      </div>

      <section className="mt-10 card-soft p-6">
        <h2 className="text-lg font-semibold font-heading">Portfolio a historie</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Zatím tu nejsou žádná demo data. Obsah se zobrazí až ze skutečně dokončených misí a projektů tohoto účtu.
        </p>
      </section>
    </div>
  );
}

function EmptyListCard({ icon: Icon, title, items }) {
  return (
    <div className="card-soft p-6">
      <div className="flex items-center gap-2 mb-3"><Icon size={18} className="text-primary" /><h3 className="font-semibold font-heading">{title}</h3></div>
      {items.length ? (
        <ul className="flex flex-col gap-2">{items.map((item) => <li key={item} className="text-sm text-muted-foreground flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {item}</li>)}</ul>
      ) : (
        <p className="text-sm text-muted-foreground">Zatím nic uvedeno.</p>
      )}
    </div>
  );
}

function TagCard({ title, items, icon: Icon, muted = false }) {
  return (
    <div className="card-soft p-6">
      <div className="flex items-center gap-2 mb-3">{Icon && <Icon size={18} className="text-primary" />}<h3 className="font-semibold font-heading">{title}</h3></div>
      {items.length ? <div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className={`chip ${muted ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>{item}</span>)}</div> : <p className="text-sm text-muted-foreground">Zatím nic uvedeno.</p>}
    </div>
  );
}
