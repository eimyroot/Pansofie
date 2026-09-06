import fs from "node:fs";
const read=(p)=>fs.readFileSync(p,"utf8");
const fail=(m)=>{console.error(`PANSOFIE_1_0_CONTRACT=FAIL: ${m}`);process.exit(1)};
const app=read("src/App.jsx"),nav=read("src/components/Nav.jsx"),ctx=read("src/state/PansofieContext.jsx"),map=read("src/pages/CycleMap.jsx"),compost=read("src/pages/Compost.jsx"),institutions=read("src/pages/Institutions.jsx"),language=read("src/state/LanguageContext.jsx"),metabolism=read("src/lib/metabolism.js"),profile=read("src/pages/Profile.jsx");
for(const route of ['path="/"','path="/vize"','path="/osobni-rust"','path="/digitalni-kompost"','path="/mapa-kolobehu"','path="/kdo-jsem"','path="/instituce"','path="/profil"','path="/mise/:id"']) if(!app.includes(route)) fail(`missing route ${route}`);
if(!ctx.includes("localStorage")) fail("local persistence missing");
if(!language.includes("localStorage")||!language.includes("document.documentElement.lang")) fail("language persistence missing");
if(!metabolism.includes("countMaterialOverlap")||!metabolism.includes("SYNONYM_GROUPS")||!metabolism.includes("distanceKm")) fail("metabolism helpers missing");
if(!compost.includes("navigator.geolocation")||!compost.includes("distanceKm")) fail("real distance integration missing");
if(!map.includes("MapContainer")||!map.includes("tile.openstreetmap.org")) fail("OSM map missing");
if(!institutions.includes("matchProjectToMaterials")||!institutions.includes("nejde o ověřené partnery")) fail("institution truth/matching missing");
if(!ctx.includes("acceptMission")||!ctx.includes("completeMission")) fail("mission state missing");
for(const file of ["src/pages/CycleMap.jsx","src/pages/PersonalGrowth.jsx","src/pages/Institutions.jsx","src/pages/Compost.jsx","src/pages/Vision.jsx"]){const t=read(file);for(const bad of ["onclick=","alert(","marker._icon","simulateGPS"])if(t.includes(bad))fail(`${file} contains ${bad}`)}
console.log("PANSOFIE_1_0_CONTRACT=PASS");
