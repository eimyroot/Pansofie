import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { AuthProvider } from "@/lib/AuthContext";
import { RequireAdmin, RequireAuth } from "@/components/auth/RouteGuards";

import Home from "@/pages/Home";
import JakFunguje from "@/pages/JakFunguje";
import ProgramDetail from "@/pages/ProgramDetail";
import Login from "@/pages/Login";
import AdminLogin from "@/pages/AdminLogin";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import PageNotFound from "@/pages/PageNotFound";

import MemberLayout from "@/layouts/MemberLayout";
import Dashboard from "@/pages/Dashboard";
import MiseList from "@/pages/MiseList";
import MissionDetail from "@/pages/MissionDetail";
import SchoolHub from "@/pages/SchoolHub";
import SchoolRunDetail from "@/pages/SchoolRunDetail";
import Rozvoj from "@/pages/Rozvoj";
import Portfolio from "@/pages/Portfolio";
import ProjektyList from "@/pages/ProjektyList";
import ProjectDetail from "@/pages/ProjectDetail";
import Network from "@/pages/Network";
import Events from "@/pages/Events";
import Messages from "@/pages/Messages";
import Profile from "@/pages/Profile";

import AdminLayout from "@/layouts/AdminLayout";
import AdminReporting from "@/pages/AdminReporting";
import AdminPrograms from "@/pages/AdminPrograms";
import AdminMissions from "@/pages/AdminMissions";
import AdminUsers from "@/pages/AdminUsers";
import AdminTeams from "@/pages/AdminTeams";
import AdminProjects from "@/pages/AdminProjects";
import AdminOrganizations from "@/pages/AdminOrganizations";
import AdminModeration from "@/pages/AdminModeration";
import AdminSecurity from "@/pages/AdminSecurity";

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jak-funguje" element={<JakFunguje />} />
            <Route path="/program/:id" element={<ProgramDetail />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              element={
                <RequireAuth>
                  <MemberLayout />
                </RequireAuth>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mise" element={<MiseList />} />
              <Route path="/mise/:id" element={<MissionDetail />} />
              <Route path="/skola" element={<SchoolHub />} />
              <Route path="/skola/mise/:runId" element={<SchoolRunDetail />} />
              <Route path="/rozvoj" element={<Rozvoj />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/projekty" element={<ProjektyList />} />
              <Route path="/projekt/:id" element={<ProjectDetail />} />
              <Route path="/sit" element={<Network />} />
              <Route path="/udalosti" element={<Events />} />
              <Route path="/zpravy" element={<Messages />} />
              <Route path="/profil" element={<Profile />} />
            </Route>

            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminReporting />} />
              <Route path="programy" element={<AdminPrograms />} />
              <Route path="mise" element={<AdminMissions />} />
              <Route path="uzivatele" element={<AdminUsers />} />
              <Route path="tymy" element={<AdminTeams />} />
              <Route path="projekty" element={<AdminProjects />} />
              <Route path="organizace" element={<AdminOrganizations />} />
              <Route path="moderace" element={<AdminModeration />} />
              <Route path="bezpecnost" element={<AdminSecurity />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
