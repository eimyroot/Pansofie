import fs from "node:fs";
const read=(p)=>fs.readFileSync(p,"utf8");
const fail=(m)=>{console.error(`PANSOFIE_MOCKUP_R6=FAIL: ${m}`);process.exit(1)};
const css=read("src/index.css"),home=read("src/pages/Home.jsx"),vision=read("src/pages/Vision.jsx"),compost=read("src/pages/Compost.jsx"),map=read("src/pages/CycleMap.jsx"),profile=read("src/pages/Profile.jsx"),mission=read("src/pages/MissionDetail.jsx"),nav=read("src/components/Nav.jsx"),layout=read("src/components/Layout.jsx");
for(const token of ["--p-bg: #f2ebe0","--p-paper: #fcf8f0","--p-green: #3b6633","--p-terracotta: #cf6c3f",".p-material-grid",".p-map-overlay",".p-profile-layout",".p-mission-detail",".p-mobile-dock"]) if(!css.includes(token)) fail(`design token missing ${token}`);
for(const [file,markers] of [
  [home,["Co byste dnes","Pro koho je Pansofie?","home-tree.png"]],
  [vision,["Vize Pansofie","Vševěda","pillar-pansofia.png"]],
  [compost,["Digitální kompost","Můj trakař","wheelbarrow-r8.png"]],
  [map,["p-map-overlay--left","p-map-overlay--right"]],
  [profile,["Moje cesta Pansofií","profile-tree.png","Co mě právě zajímá"]],
  [mission,["r8-opportunity-state","Ano, proběhlo to","item.asset"]],
  [nav,["Nabídnout","Knihovna"]],
  [layout,["MobileBottomNav"]],
]) for(const marker of markers) if(!file.includes(marker)) fail(`page marker missing ${marker}`);
const assets=["home-tree.png","compost-hero.png","wheelbarrow.png","profile-avatar.png","profile-tree.png","mission-backpack.png","mat-compost.jpg","mat-pallets.jpg","mat-leaves.jpg","mat-bricks.jpg","mat-cardboard.jpg","mat-hay.jpg","mat-sawdust.jpg","mat-tools.jpg"];
for(const a of assets) if(!fs.existsSync(`public/assets/mockup/${a}`)) fail(`asset missing ${a}`);
for(const a of ["pillar-pansofia.png","pillar-pampaedia.png","pillar-panorthosia.png"]) if(!fs.existsSync(`public/assets/r8/${a}`)) fail(`R8 pillar asset missing ${a}`);
console.log("PANSOFIE_MOCKUP_R6=PASS");
