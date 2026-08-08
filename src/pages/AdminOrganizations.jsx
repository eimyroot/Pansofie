import React from "react";
import AdminListPage from "@/components/pansofie/AdminListPage";
import { ORGANIZATIONS } from "@/lib/pansofieData";
const statusStyle=(s)=>s==="Aktivní"?"bg-emerald-500/15 text-emerald-600":"bg-amber-500/15 text-amber-600";
export default function AdminOrganizations(){return <AdminListPage title="Organizace" subtitle="Školy, obce, firmy a komunitní organizace." columns={[{key:"name",label:"Název"},{key:"type",label:"Typ"},{key:"location",label:"Lokalita"},{key:"members",label:"Členové"},{key:"status",label:"Stav",render:(r)=><span className={`chip ${statusStyle(r.status)}`}>{r.status}</span>}]} rows={ORGANIZATIONS}/>}
