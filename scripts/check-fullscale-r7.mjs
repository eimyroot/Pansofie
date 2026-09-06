import fs from "node:fs";
const read = (p) => fs.readFileSync(p,"utf8");
const fail = (m) => { console.error(`PANSOFIE_FULLSCALE_R7=FAIL: ${m}`); process.exit(1); };
const css=read("src/index.css"), inst=read("src/pages/Institutions.jsx"), ctx=read("src/state/PansofieContext.jsx");
for (const marker of [
  ".p-home-hero { min-height: 505px",
  ".p-home-hero h1 { max-width: 450px; font-size: clamp(50px",
  ".p-vision__intro h1 { font-size: 43px",
  ".p-pillar { min-height: 305px",
  ".p-compost-hero h1 { font-size: 48px",
  ".p-material-card, .p-add-card { min-height: 205px",
  ".p-profile-layout { grid-template-columns: 235px minmax(0,1fr) 280px",
  ".p-institutions-hero",
  ".p-company-grid"
]) if (!css.includes(marker)) fail(`missing full-scale marker: ${marker}`);
if (!inst.includes("p-institutions-flow") || !inst.includes("p-company-card")) fail("institution visual workspace missing");
if (!ctx.includes("missingDemo") || !ctx.includes("DEMO_MATERIALS.filter")) fail("demo migration merge missing");
console.log("PANSOFIE_FULLSCALE_R7=PASS");
