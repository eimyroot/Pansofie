import fs from "node:fs";
const read=(p)=>fs.readFileSync(p,"utf8");
const fail=(m)=>{console.error(`PANSOFIE_STABILITY_R9=FAIL: ${m}`);process.exit(1)};

const main=read("src/main.jsx");
const home=read("src/legacy-pages/Home.jsx");
const vision=read("src/legacy-pages/Vision.jsx");
const footer=read("src/components/Footer.jsx");
const nav=read("src/components/Nav.jsx");
const dev=read("src/components/DevelopmentPaths.jsx");
const css=read("src/r9-stability.css");
const uiFiles=[
  "src/legacy-pages/Home.jsx","src/legacy-pages/HowItWorks.jsx","src/legacy-pages/RoleHub.jsx","src/legacy-pages/Library.jsx",
  "src/legacy-pages/Vision.jsx","src/legacy-pages/PersonalGrowth.jsx","src/legacy-pages/Compost.jsx","src/legacy-pages/CycleMap.jsx",
  "src/legacy-pages/Institutions.jsx","src/legacy-pages/Profile.jsx","src/legacy-pages/MissionDetail.jsx","src/legacy-pages/NotFound.jsx",
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
if(read("src/legacy-pages/Profile.jsx").includes("profile-tree-r8.png")) fail("profile still uses baked-label tree asset");
console.log("PANSOFIE_STABILITY_R9=PASS");
