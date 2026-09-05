import React from "react";
import { Link } from "react-router-dom";

const ILLUSTRATED_PANSOFIE = "https://pansofie-staging-d7ttvzzqo-voodoo-caser.vercel.app";

export default function YoungHome() {
  return (
    <div style={{minHeight:"100vh",background:"#f6efe2",position:"relative"}}>
      <iframe
        src={ILLUSTRATED_PANSOFIE}
        title="Pansofie Young – kreslený svět Pansofie"
        style={{width:"100%",height:"100vh",border:0,display:"block",background:"#f6efe2"}}
      />
      <Link
        to="/"
        aria-label="Přejít na moderní Pansofii"
        style={{position:"fixed",right:18,bottom:18,zIndex:90,padding:"11px 16px",borderRadius:999,background:"#315d35",color:"#fff",fontSize:12,fontWeight:800,textDecoration:"none",boxShadow:"0 8px 25px rgba(32,61,37,.22)"}}
      >
        ← Moderní Pansofie
      </Link>
    </div>
  );
}
