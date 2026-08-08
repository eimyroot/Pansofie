import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Briefcase,
  Target,
  Users,
  UsersRound,
  Layers,
  Building2,
  ShieldAlert,
  ShieldCheck,
  BarChart3,
  Leaf,
  ArrowLeft,
} from "lucide-react";

const NAV = [
  { to: "/admin", label: "Reporting", icon: BarChart3, end: true },
  { to: "/admin/programy", label: "Programy", icon: Briefcase },
  { to: "/admin/mise", label: "Mise", icon: Target },
  { to: "/admin/uzivatele", label: "Uživatelé", icon: Users },
  { to: "/admin/tymy", label: "Týmy", icon: UsersRound },
  { to: "/admin/projekty", label: "Projekty", icon: Layers },
  { to: "/admin/organizace", label: "Organizace", icon: Building2 },
  { to: "/admin/moderace", label: "Moderace", icon: ShieldAlert },
  { to: "/admin/bezpecnost", label: "Bezpečnost", icon: ShieldCheck },
];

export default function AdminLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-border/60 bg-card">
        <div className="h-16 px-5 flex items-center gap-3 border-b border-border/60">
          <span className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center"><Leaf size={16} strokeWidth={2.4} /></span>
          <div className="leading-tight"><div className="font-heading font-bold">Pansofie</div><div className="text-xs text-muted-foreground">Admin</div></div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, end }) => {
            const active = end ? location.pathname === to : location.pathname === to || location.pathname.startsWith(to + "/");
            return <Link key={to} to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`}><Icon size={18} strokeWidth={active ? 2.4 : 2} />{label}</Link>;
          })}
        </nav>
        <div className="p-3 border-t border-border/60"><Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"><ArrowLeft size={18} />Zpět na platformu</Link></div>
      </aside>
      <div className="lg:pl-64">
        <div className="lg:hidden h-14 flex items-center gap-2 px-5 border-b border-border/60 sticky top-0 bg-background/90 backdrop-blur z-30"><span className="h-7 w-7 rounded-lg bg-foreground text-background flex items-center justify-center"><Leaf size={15} strokeWidth={2.4} /></span><span className="font-heading font-bold">Pansofie Admin</span></div>
        <main className="px-5 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto pb-24 lg:pb-8"><Outlet /></main>
      </div>
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/70 overflow-x-auto no-scrollbar"><div className="flex items-stretch min-w-max">{NAV.map(({ to, label, icon: Icon, end }) => { const active = end ? location.pathname === to : location.pathname === to || location.pathname.startsWith(to + "/"); return <Link key={to} to={to} className={`flex flex-col items-center gap-0.5 px-4 py-2.5 text-[11px] font-medium whitespace-nowrap ${active ? "text-foreground" : "text-muted-foreground"}`}><Icon size={18} strokeWidth={active ? 2.4 : 2} />{label}</Link>; })}</div></nav>
    </div>
  );
}
