import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
export default function Layout(){const {pathname}=useLocation();const young=pathname.startsWith("/young");return <div className={`p-app ${young?"is-young":""}`}>{!young&&<Nav/>}<main id="main" className={young?"young-main":"p-main"}><Outlet/></main>{!young&&<Footer/>}{!young&&<MobileBottomNav/>}</div>}
