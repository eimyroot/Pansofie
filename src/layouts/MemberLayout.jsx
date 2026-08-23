import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Boxes, BriefcaseBusiness, FolderOpen, GraduationCap, HeartHandshake, Inbox, LayoutDashboard, Leaf, LogOut, UserRound } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { getMyFamilyAccessSummary } from "@/lib/pansofieFamilyFlow";
import { listMyOrganizationMemberships } from "@/lib/pansofieExperienceFlow";

const NAV_ITEMS = {
  dashboard: { to: "/dashboard", label: "Nástěnka", mobile: "Nástěnka", icon: LayoutDashboard, role: null },
  school: { to: "/skola", label: "PANSOFIE School", mobile: "Škola", icon: GraduationCap, role: "school" },
  challenges: { to: "/skola/challenges", label: "Challenge Inbox", mobile: "Challenges", icon: Inbox, role: "school" },
  family: { to: "/rodina", label: "PANSOFIE Family", mobile: "Rodina", icon: HeartHandshake, role: "family" },
  partner: { to: "/partner-workspace", label: "PANSOFIE Partner", mobile: "Partner", icon: BriefcaseBusiness, role: "partner" },
  material: { to: "/materialovy-most/workspace", label: "Materiálový most", mobile: "Materiál", icon: Boxes, role: null },
  passport: { to: "/portfolio", label: "Experience Passport", mobile: "Passport", icon: FolderOpen, role: "learner" },
  profile: { to: "/profil", label: "Profil", mobile: "Profil", icon: UserRound, role: null },
};

export default function MemberLayout() {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const [access, setAccess] = useState({ school: true, schoolStaff: false, learner: true, family: false, partner: false });

  useEffect(() => {
    let active = true;
    if (!user?.id) return undefined;

    Promise.all([
      getMyFamilyAccessSummary().catch(() => ({ has_family_access: false })),
      listMyOrganizationMemberships(user.id).catch(() => []),
    ]).then(([family, memberships]) => {
      if (!active) return;
      const schoolRoles = memberships.filter((item) => ["learner", "teacher", "coordinator"].includes(item.role));
      const isSchoolStaff = memberships.some((item) => ["teacher", "coordinator"].includes(item.role));
      const isLearner = memberships.some((item) => item.role === "learner");
      const isPartner = memberships.some((item) => item.role === "partner_contact" && item.status === "active");
      setAccess({
        school: schoolRoles.length > 0,
        schoolStaff: isSchoolStaff,
        learner: isLearner,
        family: Boolean(family?.has_family_access || isSchoolStaff),
        partner: isPartner,
      });
    });

    return () => { active = false; };
  }, [user?.id]);

  const nav = useMemo(() => {
    const items = [NAV_ITEMS.dashboard];
    if (access.school) items.push(NAV_ITEMS.school);
    if (access.schoolStaff) items.push(NAV_ITEMS.challenges);
    if (access.family) items.push(NAV_ITEMS.family);
    if (access.partner) items.push(NAV_ITEMS.partner);
    if (access.schoolStaff || access.partner) items.push(NAV_ITEMS.material);
    if (access.learner) items.push(NAV_ITEMS.passport);
    items.push(NAV_ITEMS.profile);
    return items;
  }, [access]);

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
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">Nástěnka pouze shrnuje skutečné role a stavy. School, Partner, Family, Passport a Materiálový most zůstávají oddělené workflow s vlastními oprávněními.</p>
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

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/96 backdrop-blur-md border-t border-border/70 overflow-x-auto no-scrollbar pb-[env(safe-area-inset-bottom)]" aria-label="Mobilní pilotní navigace">
        <div className="flex min-w-max items-stretch">
          {nav.map(({ to, mobile, icon: Icon, role }) => (
            <NavLink
              key={to}
              to={to}
              data-role={role || undefined}
              className={({ isActive }) => `relative flex min-h-[58px] min-w-[78px] flex-col items-center justify-center gap-1 rounded-xl px-2 text-[10px] font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}
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
        </div>
      </nav>
    </div>
  );
}
