import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Home, Target, TrendingUp, FolderOpen, Layers, Users, Calendar, MessageCircle, UserRound, Leaf } from "lucide-react";

const NAV = [
  ["/dashboard", "Domů", Home],
  ["/mise", "Mise", Target],
  ["/rozvoj", "Můj rozvoj", TrendingUp],
  ["/portfolio", "Portfolio", FolderOpen],
  ["/projekty", "Projekty", Layers],
  ["/sit", "Síť", Users],
  ["/udalosti", "Události", Calendar],
  ["/zpravy", "Zprávy", MessageCircle],
  ["/profil", "Profil", UserRound],
];

const MOBILE_NAV = [
  ["/dashboard", "Domů", Home],
  ["/mise", "Mise", Target],
  ["/projekty", "Projekty", Layers],
  ["/sit", "Síť", Users],
  ["/profil", "Profil", UserRound],
];

export default function MemberLayout() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 border-r border-border/60 bg-card/70 backdrop-blur-xl p-5 flex-col z-40">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg mb-8">
          <span className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"><Leaf size={18} /></span>
          Pansofie
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/admin" className="mt-auto text-xs text-muted-foreground hover:text-foreground">Admin</Link>
      </aside>

      <div className="lg:pl-64">
        <main className="min-h-screen pb-20 lg:pb-0"><Outlet /></main>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/70 grid grid-cols-5">
        {MOBILE_NAV.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2.5 text-[10px] ${isActive ? "text-primary" : "text-muted-foreground"}`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
