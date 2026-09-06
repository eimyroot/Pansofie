import fs from "node:fs";
const read=(p)=>fs.readFileSync(p,"utf8");
const fail=(m)=>{console.error(`PANSOFIE_STABILITY_R9=FAIL: ${m}`);process.exit(1)};

const main=read("src/main.jsx");
const home=read("src/pages/Home.jsx");
const vision=read("src/pages/Vision.jsx");
const footer=read("src/components/Footer.jsx");
const nav=read("src/components/Nav.jsx");
const dev=read("src/components/DevelopmentPaths.jsx");
const css=read("src/r9-stability.css");
const uiFiles=[
  "src/pages/Home.jsx","src/pages/HowItWorks.jsx","src/pages/RoleHub.jsx","src/pages/Library.jsx",
  "src/pages/Vision.jsx","src/pages/PersonalGrowth.jsx","src/pages/Compost.jsx","src/pages/CycleMap.jsx",
  "src/pages/Institutions.jsx","src/pages/Profile.jsx","src/pages/MissionDetail.jsx","src/pages/NotFound.jsx",
  "src/components/Nav.jsx","src/components/Footer.jsx","src/components/MobileBottomNav.jsx"
];

if(!main.includes('./r9-stability.css')) fail("R9 stylesheet not loaded");
for(const marker of ["CS","EN","setLocale(\"en\")","setLocale(\"cs\")"]) if(!nav.includes(marker)) fail(`language control missing ${marker}`);
for(const file of uiFiles){
  const t=read(file);
  if(!t.includes("useLanguage") && !file.endsWith("DevelopmentPaths.jsx")) fail(`global EN not wired in ${file}`);
}
for(const marker of ["Já & zdraví","Poznání & myšlení","Vztahy & spolupráce","Tvorba & řešení problémů","Samostatnost & podnikavost","Občanství & přínos","Příroda & udržitelnost"]) if(!dev.includes(marker)) fail(`development area missing ${marker}`);
if(!dev.includes("Nejsou to body, známky ani žebříček člověka")) fail("development area must explicitly reject scoring");
for(const marker of ["VŠEM","VŠEMU","VŠESTRANNĚ","ROZHLÉDNOUT SE","POSLAT HODNOTU DÁL"]) if(!footer.includes(marker)) fail(`footer marker missing ${marker}`);
for(const bad of ["ZKUŠENOST","DŮKAZ","OVĚŘENÍ","Přijmout misi","zkušenostních bodů"]) if(footer.includes(bad)) fail(`old pressure footer concept returned: ${bad}`);
for(const marker of [".r9-footer",".r9-development",".r9-language",".r9-profile-tree"]) if(!css.includes(marker)) fail(`R9 CSS missing ${marker}`);
for(const asset of [
  "hero-tree-clean.png","action-help-clean.png","action-change-clean.png","action-surplus-clean.png",
  "action-idea-clean.png","action-explore-clean.png","pillar-pansofia-clean.png",
  "pillar-pampaedia-clean.png","pillar-panorthosia-clean.png"
]) if(!fs.existsSync(`public/assets/r9/${asset}`)) fail(`missing clean R9 asset ${asset}`);

if(home.includes('/assets/r8/hero-tree.png')) fail("home still uses baked-text hero");
if(vision.includes('/assets/r8/pillar-panorthosia.png')) fail("vision still uses baked-text pillar asset");
if(read("src/pages/Profile.jsx").includes("profile-tree-r8.png")) fail("profile still uses baked-label tree asset");
console.log("PANSOFIE_STABILITY_R9=PASS");
