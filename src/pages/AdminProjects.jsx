import React from "react";
import AdminListPage from "@/components/pansofie/AdminListPage";
import { PROJECTS } from "@/lib/pansofieData";
import LabBadge from "@/components/pansofie/LabBadge";
const statusStyle=(s)=>s==="Hledá členy"?"bg-emerald-500/15 text-emerald-600":s==="Běží"?"bg-blue-500/15 text-blue-600":"bg-amber-500/15 text-amber-600";
export default function AdminProjects(){return <AdminListPage title="Projekty" subtitle="Schvalování a správa projektů." columns={[{key:"name",label:"Projekt"},{key:"lab",label:"Lab",render:(r)=><LabBadge labId={r.lab}/>},{key:"members",label:"Členové"},{key:"location",label:"Lokalita"},{key:"status",label:"Stav",render:(r)=><span className={`chip ${statusStyle(r.status)}`}>{r.status}</span>}]} rows={PROJECTS.map((p)=>({id:p.id,name:p.name,lab:p.lab,members:p.members,location:p.location,status:p.status}))}/>}
