import React from "react";
import AdminListPage from "@/components/pansofie/AdminListPage";
import { TEAMS } from "@/lib/pansofieData";
const statusStyle=(s)=>s==="Aktivní"?"bg-emerald-500/15 text-emerald-600":"bg-amber-500/15 text-amber-600";
export default function AdminTeams(){return <AdminListPage title="Týmy" subtitle="Týmy napříč projekty a programy." columns={[{key:"name",label:"Tým"},{key:"project",label:"Projekt"},{key:"members",label:"Členové"},{key:"status",label:"Stav",render:(r)=><span className={`chip ${statusStyle(r.status)}`}>{r.status}</span>}]} rows={TEAMS}/>}
