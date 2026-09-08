import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./legacy-pages/Home";
import HowItWorks from "./legacy-pages/HowItWorks";
import Library from "./legacy-pages/Library";
import PersonalGrowth from "./legacy-pages/PersonalGrowth";
import Compost from "./legacy-pages/Compost";
import CycleMap from "./legacy-pages/CycleMap";
import RoleHub from "./legacy-pages/RoleHub";
import Institutions from "./legacy-pages/Institutions";
import Profile from "./legacy-pages/Profile";
import Vision from "./legacy-pages/Vision";
import MissionDetail from "./legacy-pages/MissionDetail";
import NotFound from "./legacy-pages/NotFound";
import Young from "./legacy-pages/Young";
import YoungMissions from "./legacy-pages/YoungMissions";
import LegalPage from "./legacy-pages/LegalPage";
import Contact from "./legacy-pages/Contact";

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
