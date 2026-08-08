import React from "react";
import AdminListPage from "@/components/pansofie/AdminListPage";
import { ADMIN_USERS } from "@/lib/pansofieData";
const statusStyle=(s)=>s==="Aktivní"?"bg-emerald-500/15 text-emerald-600":"bg-amber-500/15 text-amber-600";
export default function AdminUsers(){return <AdminListPage title="Uživatelé" subtitle="Správa členů, rolí a přístupů." columns={[{key:"name",label:"Jméno"},{key:"role",label:"Role"},{key:"location",label:"Lokalita"},{key:"missions",label:"Mise"},{key:"status",label:"Stav",render:(r)=><span className={`chip ${statusStyle(r.status)}`}>{r.status}</span>}]} rows={ADMIN_USERS}/>}
