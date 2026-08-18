import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FolderOpen, GraduationCap, HeartHandshake, Leaf, LogOut, UserRound } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { getMyFamilyAccessSummary } from "@/lib/pansofieFamilyFlow";
import { listMyOrganizationMemberships } from "@/lib/pansofieExperienceFlow";

const BASE_NAV = [
  { to: "/skola", label: "PANSOFIE School", mobile: "Škola", icon: GraduationCap, role: "school" },
  { to: "/portfolio", label: "Experience Passport", mobile: "Passport", icon: FolderOpen, role: "learner" },
  { to: "/profil", label: "Profil", mobile: "Profil", icon: UserRound, role: null },
];

export default function MemberLayout() {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const [showFamily, setShowFamily] = useState(false);

  useEffect(() => {
    let active = true;
    if (!user?.id) return undefined;

    Promise.all([
      getMyFamilyAccessSummary().catch(() => ({ has_family_access: false })),
      listMyOrganizationMemberships(user.id).catch(() => []),
    ]).then(([family, memberships]) => {
      if (!active) return;
      const isSchoolStaff = memberships.some((item) => ["teacher", "coordinator"].includes(item.role));
      setShowFamily(Boolean(family?.has_family_access || isSchoolStaff));
    });

    return () => { active = false; };
  }, [user?.id]);

  const nav = useMemo(() => {
    if (!showFamily) return BASE_NAV;
    return [
      BASE_NAV[0],
      { to: "/rodina", label: "PANSOFIE Family", mobile: "Rodina", icon: HeartHandshake, role: "family" },
      ...BASE_NAV.slice(1),
    ];
  }, [showFamily]);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[272px] border-r border-border/70 bg-card/88 backdrop-blur-xl px-5 py-5 flex-col z-40">
        <Link to="/" className="group flex items-center gap-2.5 mb-7">
          <span className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm transition-transform group-hover:-translate-y-0.5"><Leaf size={18} /></span>
          <span>
            <span className="block font-heading font-bold text-[17px] leading-none">Pansofie</span>
            <span className="block mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Pilot workspace</span>
          </span>
        </Link>

        <div className="mb-5 surface-subtle p-3.5">
          <p className="eyebrow">Governed pilot</p>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">Zobrazuje pouze role a data, ke kterým má účet skutečné oprávnění. Prototypové social funkce zůstávají skryté.</p>
        </div>

        <nav className="flex flex-col gap-1.5" aria-label="Pilotní workspace">
          {nav.map(({ to, label, icon: Icon, role }) => (
            <NavLink
              key={to}
              to={to}
              data-role={role || undefined}
              className={({ isActive }) => `group flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-sm font-medium transition-colors ${isActive ? (role ? "role-card border-transparent" : "border-border bg-muted/60 text-foreground") : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/45"}`}
              style={({ isActive }) => isActive && role ? { background: "hsl(var(--role-accent) / 0.07)", color: "hsl(var(--role-accent))", borderColor: "hsl(var(--role-accent) / 0.16)" } : undefined}
            >
              <span className={role ? "role-icon h-8 w-8 rounded-xl" : "h-8 w-8 rounded-xl bg-muted flex items-center justify-center"}><Icon size={17} /></span>
              <span className="min-w-0 truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-5 border-t border-border/70">
          <p className="text-xs font-semibold truncate">{profile?.name || "Člen Pansofie"}</p>
          <p className="text-[11px] text-muted-foreground truncate mt-1">{profile?.email || ""}</p>
          <button type="button" onClick={handleLogout} className="action-quiet mt-2 w-full justify-start px-2"><LogOut size={16} /> Odhlásit se</button>
        </div>
      </aside>

      <div className="lg:pl-[272px]"><main className="min-h-screen pb-20 lg:pb-0"><Outlet /></main></div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/96 backdrop-blur-md border-t border-border/70 grid px-1 pb-[env(safe-area-inset-bottom)]" style={{ gridTemplateColumns: `repeat(${nav.length}, minmax(0, 1fr))` }} aria-label="Mobilní pilotní navigace">
        {nav.map(({ to, mobile, icon: Icon, role }) => (
          <NavLink
            key={to}
            to={to}
            data-role={role || undefined}
            className={({ isActive }) => `relative flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute top-0 h-0.5 w-8 rounded-full" style={{ background: role ? "hsl(var(--role-accent))" : "hsl(var(--primary))" }} aria-hidden="true" />}
                <Icon size={18} style={isActive && role ? { color: "hsl(var(--role-accent))" } : undefined} />
                <span>{mobile}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
