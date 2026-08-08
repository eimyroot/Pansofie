import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import PathBadge from "@/components/pansofie/PathBadge";
import LabBadge from "@/components/pansofie/LabBadge";
export default function MissionCard({mission}){return <Link to={`/mise/${mission.id}`} className="card-soft p-5 group block transition-all duration-300 hover:-translate-y-1"><div className="flex items-center justify-between gap-3 mb-4"><LabBadge labId={mission.lab}/><span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock size={13}/>{mission.time}</span></div><h3 className="font-semibold font-heading text-lg leading-snug">{mission.name}</h3><p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">{mission.why}</p><div className="flex flex-wrap gap-1.5 mt-4">{mission.paths.map((p)=><PathBadge key={p} pathId={p} size="xs"/>)}</div><div className="mt-5 flex items-center justify-between text-xs text-muted-foreground"><span>{mission.difficulty}</span><ArrowRight size={15} className="text-primary transition-transform group-hover:translate-x-1"/></div></Link>}
