import React from "react";
import { getPath } from "@/lib/pansofieData";
import { useAuth } from "@/lib/AuthContext";

export default function Rozvoj() {
  const { profile } = useAuth();
  const paths = profile?.paths || [];
  const total = paths.reduce((sum, path) => sum + path.experiences, 0);
  const max = Math.max(1, ...paths.map((path) => path.experiences));

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold font-heading">Můj rozvoj</h1>
        <p className="text-muted-foreground mt-1.5 max-w-3xl">
          Doložený rozvoj, ne hodnocení „hodnoty člověka“. Počítáme pouze zkušenosti a dokončené mise tohoto účtu.
        </p>
      </div>

      <div className="card-soft p-6 mb-6">
        <p className="text-sm text-muted-foreground">Celkem zkušeností napříč 7 cestami</p>
        <p className="text-4xl font-semibold font-display mt-1">{total}</p>
      </div>

      <div className="flex flex-col gap-4">
        {paths.map((userPath) => {
          const path = getPath(userPath.id);
          if (!path) return null;
          const Icon = path.icon;
          const pct = Math.round((userPath.experiences / max) * 100);

          return (
            <div key={userPath.id} className="card-soft p-5">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${path.color}18`, color: path.color }}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold font-heading">{path.name}</p>
                  <p className="text-xs text-muted-foreground">{userPath.experiences} zkušeností · {userPath.missions} dokončených misí</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: path.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
