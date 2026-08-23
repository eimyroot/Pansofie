import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";
import { RequireAdmin, RequireAuth } from "@/components/auth/RouteGuards";
import PublicNetworkShell from "@/components/pansofie/PublicNetworkShell";
import PublicLocaleBoundary from "@/components/pansofie/PublicLocaleBoundary";
import LanguageToggle from "@/components/pansofie/LanguageToggle";
import "@/living-motion-r4-extensions.css";

import Home from "@/pages/Home";
import JakFunguje from "@/pages/JakFunguje";
import Roles from "@/pages/Roles";
import Pilot from "@/pages/Pilot";
import Partner from "@/pages/Partner";
import ProgramDetail from "@/pages/ProgramDetail";
import Join from "@/pages/Join";
import AboutR12 from "@/pages/AboutR12";
import PansofieGo from "@/pages/PansofieGo";
import PublicInfoPage from "@/pages/PublicInfoPage";
import Login from "@/pages/Login";
import AdminLogin from "@/pages/AdminLogin";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import PageNotFound from "@/pages/PageNotFound";

import MemberLayout from "@/layouts/MemberLayout";
import SchoolHub from "@/pages/SchoolHub";
import SchoolRunDetail from "@/pages/SchoolRunDetail";
import SchoolChallengeWorkspace from "@/pages/SchoolChallengeWorkspace";
import FamilyHub from "@/pages/FamilyHub";
import PartnerWorkspace from "@/pages/PartnerWorkspace";
import Portfolio from "@/pages/Portfolio";
import Profile from "@/pages/Profile";

import AdminLayout from "@/layouts/AdminLayout";
import AdminReporting from "@/pages/AdminReporting";
import AdminPrograms from "@/pages/AdminPrograms";
import AdminMissions from "@/pages/AdminMissions";
import AdminPartnerChallenges from "@/pages/AdminPartnerChallenges";
import AdminUsers from "@/pages/AdminUsers";
import AdminTeams from "@/pages/AdminTeams";
import AdminProjects from "@/pages/AdminProjects";
import AdminOrganizations from "@/pages/AdminOrganizations";
import AdminModeration from "@/pages/AdminModeration";
import AdminSecurity from "@/pages/AdminSecurity";

const PilotRedirect = () => <Navigate to="/skola" replace />;
const publicSurface = (element) => (
  <PublicLocaleBoundary>
    <PublicNetworkShell>{element}</PublicNetworkShell>
  </PublicLocaleBoundary>
);
const authSurface = (element) => (
  <PublicLocaleBoundary>
    <div className="relative min-h-screen">
      <div className="fixed right-4 top-4 z-[70]"><LanguageToggle /></div>
      {element}
    </div>
  </PublicLocaleBoundary>
);

function LocaleUrlSync() {
  const location = useLocation();
  const { locale } = useLanguage();

  useEffect(() => {
    const url = new URL(window.location.href);
    const before = `${url.pathname}${url.search}${url.hash}`;
    if (locale === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    const after = `${url.pathname}${url.search}${url.hash}`;
    if (after !== before) window.history.replaceState(window.history.state, "", after);
  }, [locale, location.pathname, location.search, location.hash]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <LocaleUrlSync />
            <Routes>
              <Route path="/" element={publicSurface(<Home />)} />
              <Route path="/jak-funguje" element={publicSurface(<JakFunguje />)} />
              <Route path="/pro-koho" element={publicSurface(<Roles />)} />
              <Route path="/pilot" element={publicSurface(<Pilot />)} />
              <Route path="/partneri" element={publicSurface(<Partner />)} />
              <Route path="/program/:id" element={publicSurface(<ProgramDetail />)} />
              <Route path="/zapojit-se" element={publicSurface(<Join />)} />
              <Route path="/pridejte-se" element={<Navigate to="/zapojit-se" replace />} />
              <Route path="/kontakt" element={<Navigate to="/zapojit-se" replace state={{ entryMode: "simulator" }} />} />
              <Route path="/o-projektu" element={publicSurface(<AboutR12 />)} />
              <Route path="/pansofiego" element={publicSurface(<PansofieGo />)} />
              <Route path="/soukromi" element={publicSurface(<PublicInfoPage kind="privacy" />)} />
              <Route path="/bezpecnost" element={publicSurface(<PublicInfoPage kind="safety" />)} />
              <Route path="/podminky" element={publicSurface(<PublicInfoPage kind="terms" />)} />

              <Route path="/login" element={authSurface(<Login />)} />
              <Route path="/register" element={authSurface(<Register />)} />
              <Route path="/forgot-password" element={authSurface(<ForgotPassword />)} />
              <Route path="/reset-password" element={authSurface(<ResetPassword />)} />
              <Route path="/admin/login" element={authSurface(<AdminLogin />)} />

              <Route element={<RequireAuth><MemberLayout /></RequireAuth>}>
                <Route path="/skola" element={<SchoolHub />} />
                <Route path="/skola/mise/:runId" element={<SchoolRunDetail />} />
                <Route path="/skola/challenges" element={<SchoolChallengeWorkspace />} />
                <Route path="/rodina" element={<FamilyHub />} />
                <Route path="/partner-workspace" element={<PartnerWorkspace />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/profil" element={<Profile />} />

                {/* Prototype member surfaces stay in the repository but are fail-closed from the pilot UI. */}
                <Route path="/dashboard" element={<PilotRedirect />} />
                <Route path="/mise" element={<PilotRedirect />} />
                <Route path="/mise/:id" element={<PilotRedirect />} />
                <Route path="/rozvoj" element={<PilotRedirect />} />
                <Route path="/projekty" element={<PilotRedirect />} />
                <Route path="/projekt/:id" element={<PilotRedirect />} />
                <Route path="/sit" element={<PilotRedirect />} />
                <Route path="/udalosti" element={<PilotRedirect />} />
                <Route path="/zpravy" element={<PilotRedirect />} />
              </Route>

              <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                <Route index element={<AdminReporting />} />
                <Route path="programy" element={<AdminPrograms />} />
                <Route path="mise" element={<AdminMissions />} />
                <Route path="challenges" element={<AdminPartnerChallenges />} />
                <Route path="uzivatele" element={<AdminUsers />} />
                <Route path="tymy" element={<AdminTeams />} />
                <Route path="projekty" element={<AdminProjects />} />
                <Route path="organizace" element={<AdminOrganizations />} />
                <Route path="moderace" element={<AdminModeration />} />
                <Route path="bezpecnost" element={<AdminSecurity />} />
              </Route>

              <Route path="*" element={publicSurface(<PageNotFound />)} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
