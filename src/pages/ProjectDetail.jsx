import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Target, CheckCircle2, UserPlus, Briefcase } from "lucide-react";
import { getProject, getMission, MEMBERS } from "@/lib/pansofieData";
import PathBadge from "@/components/pansofie/PathBadge";
import LabBadge from "@/components/pansofie/LabBadge";
import MemberCard from "@/components/pansofie/MemberCard";
import { useAuth } from "@/lib/AuthContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const { profile } = useAuth();
  const project = getProject(id) || getProject("p1");
  const currentMissions = (project.currentMissions || []).map(getMission).filter(Boolean);
  const teamMembers = MEMBERS.filter((member) => member.paths.some((path) => project.paths.includes(path))).slice(0, 3);
  const currentMember = profile
    ? {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        location: profile.location || "Neuvedeno",
        paths: (profile.paths || []).filter((path) => path.experiences > 0).map((path) => path.id),
        availability: profile.availability,
      }
    : null;

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-5xl mx-auto">
      <Link to="/projekty" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"><ArrowLeft size={16} /> Zpět na projekty</Link>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <LabBadge labId={project.lab} solid />
        <span className="chip" style={{ backgroundColor: project.status === "Hledá členy" ? "#10b98114" : "#6366f114", color: project.status === "Hledá členy" ? "#10b981" : "#6366f1" }}>{project.status}</span>
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><MapPin size={14} /> {project.location}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold font-display">{project.name}</h1>
      <div className="flex flex-wrap gap-1.5 mt-4">{project.paths.map((path) => <PathBadge key={path} pathId={path} />)}</div>

      <div className="card-soft p-6 mt-8"><div className="flex items-center gap-2 mb-2"><Target size={18} className="text-primary" /><h2 className="text-sm font-semibold text-primary">Cíl projektu</h2></div><p className="text-lg">{project.goal}</p></div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {[
          { icon: Users, label: "Členové", value: project.members },
          { icon: Briefcase, label: "Mentoři", value: project.mentors },
          { icon: Target, label: "Role", value: project.roles.length },
          { icon: CheckCircle2, label: "Výsledky", value: "Aktivní" },
        ].map((stat) => {
          const Icon = stat.icon;
          return <div key={stat.label} className="card-soft p-5"><Icon size={18} className="text-primary mb-2" /><p className="text-xl font-semibold font-heading">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>;
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="card-soft p-6"><h3 className="font-semibold font-heading mb-3">Role v projektu</h3><div className="flex flex-wrap gap-2">{project.roles.map((role) => <span key={role} className="chip bg-muted text-muted-foreground">{role}</span>)}</div></div>
        <div className="card-soft p-6 bg-primary/[0.03] border-primary/20"><h3 className="font-semibold font-heading mb-3 text-primary">Hledáme</h3><ul className="flex flex-col gap-2">{project.seeking.map((item, index) => <li key={index} className="text-sm flex items-start gap-2"><UserPlus size={15} className="text-primary mt-0.5 shrink-0" /> {item}</li>)}</ul></div>
      </div>

      {currentMissions.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold font-heading mb-4">Aktuální mise projektu</h2>
          <div className="flex flex-col gap-2">{currentMissions.map((mission) => <Link key={mission.id} to={`/mise/${mission.id}`} className="card-soft p-4 flex items-center justify-between"><div><p className="font-medium text-sm">{mission.name}</p><p className="text-xs text-muted-foreground mt-0.5">{mission.difficulty} · {mission.time}</p></div><div className="flex gap-1.5">{mission.paths.map((path) => <PathBadge key={path} pathId={path} size="xs" showName={false} />)}</div></Link>)}</div>
        </section>
      )}

      <section className="mt-10"><h2 className="text-lg font-semibold font-heading mb-3">Výsledky</h2><div className="card-soft p-6"><p>{project.results}</p></div></section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold font-heading mb-4">Tým</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentMember && <MemberCard member={currentMember} />}
          {teamMembers.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      </section>

      <div className="mt-8 card-soft p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/[0.03] border-primary/20">
        <div><h3 className="font-semibold font-heading">Chceš se zapojit?</h3><p className="text-sm text-muted-foreground mt-1">Projekt hledá lidi na {project.seeking.join(", ")}.</p></div>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold inline-flex items-center gap-2"><UserPlus size={18} /> Přidat se</button>
      </div>
    </div>
  );
}
