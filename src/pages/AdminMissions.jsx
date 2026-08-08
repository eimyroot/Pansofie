import React from "react";
import AdminListPage from "@/components/pansofie/AdminListPage";
import { MISSIONS } from "@/lib/pansofieData";
import LabBadge from "@/components/pansofie/LabBadge";
export default function AdminMissions(){return <AdminListPage title="Mise" subtitle="Správa praktických misí, jejich náročnosti a přiřazení k Labs." columns={[{key:"name",label:"Mise"},{key:"lab",label:"Lab",render:(r)=><LabBadge labId={r.lab}/>},{key:"difficulty",label:"Náročnost"},{key:"time",label:"Čas"},{key:"status",label:"Stav"}]} rows={MISSIONS}/>}
