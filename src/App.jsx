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
import YoungPublicPage from "./legacy-pages/YoungPublicPage";
import LegalPage from "./legacy-pages/LegalPage";
import Contact from "./legacy-pages/Contact";
import PublicProductPage from "./legacy-pages/PublicProductPage";

export default function App() {
  return <Routes><Route element={<Layout/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/o-nas" element={<PublicProductPage type="about"/>}/>
    <Route path="/7-cest" element={<PublicProductPage type="paths"/>}/>
    <Route path="/16-oblasti" element={<PublicProductPage type="domains"/>}/>
    <Route path="/pansofie-go" element={<PublicProductPage type="go"/>}/>
    <Route path="/green-hope" element={<PublicProductPage type="green"/>}/>
    <Route path="/urban-family-farm" element={<PublicProductPage type="farm"/>}/>
    <Route path="/family-team" element={<PublicProductPage type="family"/>}/>
    <Route path="/projekty" element={<PublicProductPage type="projects"/>}/>
    <Route path="/mapa" element={<PublicProductPage type="map"/>}/>
    <Route path="/impact" element={<PublicProductPage type="impact"/>}/>
    <Route path="/sit" element={<PublicProductPage type="network"/>}/>
    <Route path="/pro-skoly" element={<PublicProductPage type="schools"/>}/>
    <Route path="/pro-organizace" element={<PublicProductPage type="orgs"/>}/>
    <Route path="/blog" element={<PublicProductPage type="blog"/>}/>
    <Route path="/jak-to-funguje" element={<HowItWorks/>}/>
    <Route path="/pro-koho" element={<RoleHub/>}/>
    <Route path="/knihovna" element={<Library/>}/>
    <Route path="/vize" element={<Vision/>}/>
    <Route path="/osobni-rust" element={<PersonalGrowth/>}/>
    <Route path="/digitalni-kompost" element={<Compost/>}/>
    <Route path="/mapa-kolobehu" element={<CycleMap/>}/>
    <Route path="/kdo-jsem" element={<Navigate to="/pro-koho" replace/>}/>
    <Route path="/instituce" element={<Institutions/>}/>
    <Route path="/profil" element={<Profile/>}/>
    <Route path="/mise/:id" element={<MissionDetail/>}/>
    <Route path="/young" element={<Young/>}/>
    <Route path="/young/objevuj" element={<YoungPublicPage view="objevuj"/>}/>
    <Route path="/young/mise" element={<YoungPublicPage view="mise"/>}/>
    <Route path="/young/projekty" element={<YoungPublicPage view="projekty"/>}/>
    <Route path="/young/komunita" element={<YoungPublicPage view="komunita"/>}/>
    <Route path="/young/jak-to-funguje" element={<YoungPublicPage view="jak"/>}/>
    <Route path="/soukromi" element={<LegalPage type="privacy"/>}/>
    <Route path="/podminky" element={<LegalPage type="terms"/>}/>
    <Route path="/cookies" element={<LegalPage type="cookies"/>}/>
    <Route path="/pravidla-komunity" element={<LegalPage type="community"/>}/>
    <Route path="/pristupnost" element={<LegalPage type="accessibility"/>}/>
    <Route path="/bezpecnost" element={<LegalPage type="safety"/>}/>
    <Route path="/kontakt" element={<Contact/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Route></Routes>;
}
