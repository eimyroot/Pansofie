import React from "react";
import AdminListPage from "@/components/pansofie/AdminListPage";
import { PROGRAMS } from "@/lib/pansofieData";
export default function AdminPrograms(){return <AdminListPage title="Programy" subtitle="Správa programů — kde a s kým se Pansofie zažívá." columns={[{key:"name",label:"Název"},{key:"desc",label:"Popis"}]} rows={PROGRAMS.map((p)=>({id:p.id,name:p.name,desc:p.desc}))}/>}
