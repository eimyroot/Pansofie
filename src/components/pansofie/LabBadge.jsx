import React from "react";
import { getLab } from "@/lib/pansofieData";
export default function LabBadge({ labId, solid=false }) { const lab=getLab(labId); if(!lab) return null; const Icon=lab.icon; return <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium" style={{backgroundColor:solid?lab.color:`${lab.color}18`,color:solid?"#fff":lab.color}}><Icon size={13} strokeWidth={2.3}/>{lab.name}</span>; }
