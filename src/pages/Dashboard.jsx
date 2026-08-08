import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Calendar, Compass, Trophy } from "lucide-react";
import { CURRENT_USER, MISSIONS, OPPORTUNITIES, getPath } from "@/lib/pansofieData";
import MissionCard from "@/components/pansofie/MissionCard";
import PathBadge from "@/components/pansofie/PathBadge";

const OPP_ICONS = { project: Compass, event: Calendar, mentor: Users, challenge: Trophy };

export default function Dashboard() {
  const nextMission = MISSIONS.find((m) => m.status === "next") || MISSIONS[0];
  const availableMissions = MISSIONS.filter((m) => m.status !== "next").slice(0, 3);
  const totalExperiences = CURRENT_USER.paths.reduce((s, p) => s + p.experiences, 0);
  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto">
      <header className="mb-10"><p className="text-muted-foreground text-sm">Vítej zpět,</p><h1 className="text-3xl sm:text-4xl font-semibold font-display tracking-tight mt-1">{CURRENT_USER.name}</h1></header>
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4"><Sparkles size={18} className="text-primary"/><h2 className="text-lg font-semibold font-heading">Tvoje další mise</h2></div>
        <Link to={`/mise/${nextMission.id}`} className="card-soft p-6 sm:p-8 flex flex-col lg:flex-row gap-6 group transition-all duration-300 hover:-translate-y-0.5">
          <div className="flex-1"><div className="flex flex-wrap gap-1.5 mb-3">{nextMission.paths.map((p)=><PathBadge key={p} pathId={p} size="xs"/>)}</div><h3 className="text-2xl sm:text-3xl font-semibold font-display tracking-tight">{nextMission.name}</h3><p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">{nextMission.why}</p><div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-muted-foreground"><span>{nextMission.difficulty}</span><span>·</span><span>{nextMission.time}</span></div></div>
          <div className="flex lg:flex-col items-center lg:justify-center gap-2 lg:min-w-[140px]"><span className="px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold inline-flex items-center gap-2 group-hover:opacity-90 transition-opacity">Zahájit misi <ArrowRight size={16}/></span></div>
        </Link>
      </section>
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><Compass size={18} className="text-primary"/><h2 className="text-lg font-semibold font-heading">Tvoje cesty</h2></div><span className="text-sm text-muted-foreground">{totalExperiences} zkušeností celkem</span></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">{CURRENT_USER.paths.map((up)=>{const path=getPath(up.id);const Icon=path.icon;return <div key={up.id} className="card-soft p-4 text-center"><div className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{backgroundColor:`${path.color}18`,color:path.color}}><Icon size={20} strokeWidth={2}/></div><p className="text-xs font-medium text-muted-foreground">{path.name}</p><p className="text-xl font-semibold font-heading mt-1">{up.experiences}</p><p className="text-[11px] text-muted-foreground">{up.missions} mise</p></div>})}</div>
      </section>
      <section className="mb-12"><div className="flex items-center gap-2 mb-4"><Sparkles size={18} className="text-primary"/><h2 className="text-lg font-semibold font-heading">Nové příležitosti</h2></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-3">{OPPORTUNITIES.map((opp,i)=>{const Icon=OPP_ICONS[opp.type]||Sparkles;return <Link key={i} to={opp.to} className="card-soft p-5 flex items-start gap-4 group transition-all duration-300 hover:-translate-y-0.5"><span className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon size={20}/></span><div className="flex-1 min-w-0"><h3 className="font-semibold text-sm leading-snug">{opp.title}</h3><p className="text-xs text-muted-foreground mt-1 leading-relaxed">{opp.desc}</p><div className="flex flex-wrap gap-1.5 mt-3">{opp.paths.map((p)=><PathBadge key={p} pathId={p} size="xs"/>)}</div></div><ArrowRight size={16} className="text-primary mt-1 transition-transform group-hover:translate-x-1 shrink-0"/></Link>})}</div></section>
      <section><div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold font-heading">Prozkoumat další mise</h2><Link to="/mise" className="text-sm text-primary font-medium inline-flex items-center gap-1">Všechny mise <ArrowRight size={14}/></Link></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{availableMissions.map((m)=><MissionCard key={m.id} mission={m}/>)}</div></section>
    </div>
  );
}
