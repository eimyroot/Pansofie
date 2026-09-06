import React, { useMemo, useState } from "react";
import L from "leaflet";
import { Marker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { LocateFixed } from "lucide-react";
import { LOCALITIES, MENTORS } from "../lib/demoData";
import { usePansofie } from "../state/PansofieContext";
import { useLanguage } from "../state/LanguageContext";
import { localizeMaterial, localizeMentor } from "../lib/i18nDemo";

const markerIcon = (label, tone="#3b6633") => L.divIcon({
  className: "",
  html: `<div class="p-map-marker" style="background:${tone}">${label}</div>`,
  iconSize: [31,31], iconAnchor:[15,15], popupAnchor:[0,-16],
});
function FlyTo({ point }) { const map = useMap(); React.useEffect(() => { if (point) map.flyTo([point.lat,point.lon],14,{duration:.8}); }, [point,map]); return null; }

export default function CycleMap() {
  const { state } = usePansofie(); const {isEnglish}=useLanguage();
  const [showMaterials,setShowMaterials] = useState(true), [showMentors,setShowMentors] = useState(true), [showSchools,setShowSchools] = useState(true), [showCompanies,setShowCompanies] = useState(true), [radius,setRadius] = useState(25), [me,setMe] = useState(null);
  const materialPoints = useMemo(() => state.materials.filter((x)=>x.status!=="handed_over")
    .map((item)=>localizeMaterial(item,isEnglish))
    .map((item)=>({ ...item, ...(LOCALITIES[item.localityKey]||{}) }))
    .filter((x)=>Number.isFinite(x.lat)),[state.materials,isEnglish]);
  const visibleMaterials = materialPoints.filter((item) => item.ownerType === "company" ? showCompanies : showMaterials);
  const schools = [
    {id:"school-map-1",lat:50.087,lon:14.405,title:"ZŠ Lipová",sub:"2.1 km",label:"S",tone:"#8f9f42"},
    {id:"school-map-2",lat:50.073,lon:14.455,title:isEnglish?"Community garden":"Komunitní zahrada",sub:"1.2 km",label:"G",tone:"#6d8b47"},
  ];
  const locate = () => navigator.geolocation?.getCurrentPosition(({coords})=>setMe({lat:coords.latitude,lon:coords.longitude}));
  const offers=isEnglish
    ? [["G","Community garden","1.2 km"],["S","ZŠ Lipová","2.1 km"],["M","Senior club","2.4 km"],["B","Bio-waste collection","2.7 km"],["O","GreenTech company","3.2 km"]]
    : [["G","Komunitní zahrada","1.2 km"],["S","ZŠ Lipová","2.1 km"],["M","Senior klub","2.4 km"],["B","Sběrné místo bioodpadu","2.7 km"],["O","Firma GreenTech","3.2 km"]];

  return <div className="ak-page p-map-page r9-map-page">
    <div className="p-map-canvas"><MapContainer center={[50.083,14.43]} zoom={12} zoomControl={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FlyTo point={me}/>
      {visibleMaterials.map((item)=><Marker key={item.id} position={[item.lat,item.lon]} icon={markerIcon(item.ownerType==="company"?"O":"M",item.ownerType==="company"?"#c66c3f":"#3b6633")}><Popup><strong>{item.title}</strong><br/><small>{item.demo?"DEMO":"LOCAL"} · {item.label}</small></Popup></Marker>)}
      {showMentors && MENTORS.map((raw)=>{const m=localizeMentor(raw,isEnglish);return <Marker key={m.id} position={[m.lat,m.lon]} icon={markerIcon("L","#d58a37")}><Popup><strong>{m.title}</strong><br/><small>{m.mentor} · DEMO</small></Popup></Marker>})}
      {showSchools && schools.map((s)=><Marker key={s.id} position={[s.lat,s.lon]} icon={markerIcon(s.label,s.tone)}><Popup><strong>{s.title}</strong><br/><small>DEMO</small></Popup></Marker>)}
    </MapContainer></div>

    <aside className="p-map-overlay p-map-overlay--left">
      <h2>{isEnglish?"What am I looking for?":"Co hledám?"}</h2>
      <label className="p-map-check"><input type="checkbox" checked={showMaterials} onChange={(e)=>setShowMaterials(e.target.checked)}/>{isEnglish?"Materials":"Materiály"}</label>
      <label className="p-map-check"><input type="checkbox" checked={showMaterials} onChange={(e)=>setShowMaterials(e.target.checked)}/>{isEnglish?"Compost":"Kompost"}</label>
      <label className="p-map-check"><input type="checkbox" checked={showMentors} onChange={(e)=>setShowMentors(e.target.checked)}/>{isEnglish?"Help / skills":"Pomoc / služby"}</label>
      <label className="p-map-check"><input type="checkbox" checked={showSchools} onChange={(e)=>setShowSchools(e.target.checked)}/>{isEnglish?"Schools":"Školy"}</label>
      <label className="p-map-check"><input type="checkbox" checked={showCompanies} onChange={(e)=>setShowCompanies(e.target.checked)}/>{isEnglish?"Companies":"Firmy"}</label>
      <label className="p-map-check"><input type="checkbox" checked={showSchools} onChange={(e)=>setShowSchools(e.target.checked)}/>{isEnglish?"Community gardens":"Komunitní zahrady"}</label>
      <div className="p-map-range"><div style={{display:"flex",justifyContent:"space-between"}}><strong>{isEnglish?"Distance":"Vzdálenost"}</strong><span>{radius} km</span></div><input type="range" min="2" max="50" value={radius} onChange={(e)=>setRadius(Number(e.target.value))}/></div>
    </aside>

    <aside className="p-map-overlay p-map-overlay--right">
      <h2>{isEnglish?"Nearby possibilities":"Nabídky"}</h2><div className="p-map-list">{offers.map(([icon,title,dist])=><div className="p-map-list__item" key={title}><span className="p-map-list__icon">{icon}</span><span><strong>{title}</strong><br/><small>{dist} · DEMO</small></span></div>)}</div>
      <button className="p-btn p-btn--green p-btn--small" style={{width:"100%",marginTop:12}}>{isEnglish?"Show more":"Zobrazit více"}</button>
    </aside>
    <button className="p-btn p-btn--outline p-btn--small p-map-location" onClick={locate}><LocateFixed size={13}/> {isEnglish?"My location":"Moje poloha"}</button>
  </div>
}
