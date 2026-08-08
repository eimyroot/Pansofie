import React from "react";
import { getPath } from "@/lib/pansofieData";
export default function PathBadge({ pathId, size = "sm", showName = true }) { const path=getPath(pathId); if(!path) return null; const Icon=path.icon; const compact=size==="xs"; return <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}`} style={{backgroundColor:`${path.color}18`,color:path.color}} title={path.name}><Icon size={compact?12:14} strokeWidth={2.3}/>{showName&&path.name}</span>; }
