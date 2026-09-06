import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Library from "./pages/Library";
import PersonalGrowth from "./pages/PersonalGrowth";
import Compost from "./pages/Compost";
import CycleMap from "./pages/CycleMap";
import RoleHub from "./pages/RoleHub";
import Institutions from "./pages/Institutions";
import Profile from "./pages/Profile";
import Vision from "./pages/Vision";
import MissionDetail from "./pages/MissionDetail";
import NotFound from "./pages/NotFound";
import Young from "./pages/Young";
import YoungMissions from "./pages/YoungMissions";
import LegalPage from "./pages/LegalPage";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jak-to-funguje" element={<HowItWorks />} />
        <Route path="/pro-koho" element={<RoleHub />} />
        <Route path="/knihovna" element={<Library />} />
        <Route path="/vize" element={<Vision />} />
        <Route path="/osobni-rust" element={<PersonalGrowth />} />
        <Route path="/digitalni-kompost" element={<Compost />} />
        <Route path="/mapa-kolobehu" element={<CycleMap />} />
        <Route path="/kdo-jsem" element={<Navigate to="/pro-koho" replace />} />
        <Route path="/instituce" element={<Institutions />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/mise/:id" element={<MissionDetail />} />
        <Route path="/young" element={<Young />} />
        <Route path="/young/mise" element={<YoungMissions />} />
        <Route path="/soukromi" element={<LegalPage type="privacy" />} />
        <Route path="/podminky" element={<LegalPage type="terms" />} />
        <Route path="/cookies" element={<LegalPage type="cookies" />} />
        <Route path="/pravidla-komunity" element={<LegalPage type="community" />} />
        <Route path="/pristupnost" element={<LegalPage type="accessibility" />} />
        <Route path="/bezpecnost" element={<LegalPage type="safety" />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
