import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const required=[
  "hero-tree.webp","action-help.webp","action-change.webp","action-surplus.webp","action-idea.webp","action-explore.webp",
  "pillar-pansofia.webp","pillar-pampaedia.webp","pillar-panorthosia.webp","compost.webp","manifest.json"
];
for(const name of required){
  const p=path.join(root,"public/art/pansofie-v1",name);
  if(!fs.existsSync(p)) throw new Error(`Missing Art Kit asset: ${name}`);
  if(name.endsWith('.webp') && fs.statSync(p).size < 50000) throw new Error(`Suspiciously small Art Kit asset: ${name}`);
}
const home=fs.readFileSync(path.join(root,"src/pages/Home.jsx"),"utf8");
const young=fs.readFileSync(path.join(root,"src/pages/Young.jsx"),"utf8");
const main=fs.readFileSync(path.join(root,"src/main.jsx"),"utf8");
const css=fs.readFileSync(path.join(root,"src/artkit-v1.css"),"utf8");
if(!home.includes("adult-hero-photo")) throw new Error("Homepage missing adult editorial photo hero");
if(!young.includes("ART.heroTree")) throw new Error("Young gateway missing Art Kit tree");
for(const file of ["Home.jsx","Vision.jsx","RoleHub.jsx","Library.jsx","PersonalGrowth.jsx","Compost.jsx","Institutions.jsx","Profile.jsx","MissionDetail.jsx"]){
  const src=fs.readFileSync(path.join(root,"src/pages",file),"utf8");
  if(src.includes("ART.") || src.includes("/art/pansofie-v1")) throw new Error(`Adult route still uses illustrated Art Kit: ${file}`);
}
if(!main.includes('artkit-v1.css')) throw new Error('Art Kit CSS is not imported');
if(!css.includes('.ak-hero')||!css.includes('.ak-choice')||!css.includes('.ak-pillar')) throw new Error('Art Kit layout CSS incomplete');
const activeFiles=["Home.jsx","Young.jsx","YoungMissions.jsx","LegalPage.jsx","Contact.jsx","Vision.jsx","RoleHub.jsx","Library.jsx","PersonalGrowth.jsx","Compost.jsx","Institutions.jsx","Profile.jsx","MissionDetail.jsx"];
for(const file of activeFiles){
  const src=fs.readFileSync(path.join(root,"src/pages",file),"utf8");
  if(/\/assets\/r9\/(?:action|pillar|hero)-.*clean/.test(src)) throw new Error(`${file} still references legacy clean crop`);
}

const legacyScan=[
  path.join(root,"src/pages"),
  path.join(root,"src/components"),
  path.join(root,"src/lib"),
  path.join(root,"src/r8-living.css")
];
const collect=(target)=>{
  const st=fs.statSync(target);
  if(st.isFile()) return [target];
  return fs.readdirSync(target,{withFileTypes:true}).flatMap(ent=>{
    const p=path.join(target,ent.name);
    return ent.isDirectory()?collect(p):[p];
  });
};
for(const target of legacyScan){
  for(const file of collect(target)){
    if(!/\.(?:jsx|js|css)$/.test(file)) continue;
    const src=fs.readFileSync(file,"utf8");
    if(/\/assets\/r[89]\/(?:action|pillar|hero|vision|opportunity)/.test(src)) throw new Error(`Legacy illustrative asset reference remains: ${path.relative(root,file)}`);
  }
}

console.log("PANSOFIE_ART_KIT_V1=PASS");
