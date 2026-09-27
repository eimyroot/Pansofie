import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=(file)=>readFileSync(file,"utf8");
const routes=["komunita","sit","pro-skoly","pro-organizace","partneri"];

test("Community Frame 02 is one family with five distinct relationship grammars",()=>{
  const c=read("src/components/public/PansofieCommunityFrame.jsx");
  for(const variant of ["overview","network","school","organization","partners"]) assert.match(c,new RegExp(`variant===\\"${variant}\\"`));
  const css=read("src/app/community-frame02.css");
  for(const cls of ["cm02-overview-field","cm02-network-field","cm02-school-field","cm02-org-field","cm02-partner-field"]) assert.match(css,new RegExp(`\\.${cls}`));
});

test("Community Frame 02 retires repeated Visual Engine and card strips",()=>{
  const combined=routes.map(r=>read(`src/app/${r}/page.jsx`)).join("\n");
  for(const route of routes) assert.match(read(`src/app/${route}/page.jsx`),/CommunityFamilyNav/);
  assert.doesNotMatch(combined,/PansofieVisualEngine|PansofieVisualCard|EditorialFeatureBand|pw-visual-card-strip|pw-community-entry-grid/);
});

test("community surfaces preserve privacy and truth boundaries",()=>{
  assert.match(read("src/app/komunita/page.jsx"),/Žádné veřejné hledání lidí v okolí/);
  assert.match(read("src/app/sit/page.jsx"),/DEMO/);
  assert.match(read("src/app/pro-skoly/page.jsx"),/povinném skórování dítěte/);
  assert.match(read("src/app/pro-organizace/page.jsx"),/Dopad se dokládá, nevymýšlí/);
  assert.match(read("src/app/partneri/page.jsx"),/nepředstírá seznam potvrzených partnerů/);
});

test("Community Frame 02 has explicit mobile composition and no GO redesign",()=>{
  const css=read("src/app/community-frame02.css");
  const component=read("src/components/public/PansofieCommunityFrame.jsx");
  assert.match(css,/@media\(max-width:700px\)/);
  assert.doesNotMatch(css+component,/GoWorkspace|go-v2|PANSOFIE GO|people nearby|navigator\.geolocation/i);
});
