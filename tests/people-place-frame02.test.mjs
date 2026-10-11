import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=(p)=>readFileSync(p,"utf8");
const pages=["family-team","osobni-rust","mapa","mapa-kolobehu"];

test("People Place Frame 02 gives four contexts distinct visual grammars",()=>{
  const c=read("src/components/public/PansofiePeoplePlaceFrame.jsx");
  for(const v of ["family","exchange","map","cycle"]) assert.match(c,new RegExp(`variant===\\"${v}\\"`));
  for(const p of pages) assert.match(read(`src/app/${p}/page.jsx`),/PeoplePlaceFamilyNav/);
});
test("People Place Frame 02 retires generic program and visual-engine surfaces",()=>{
  const s=pages.map(p=>read(`src/app/${p}/page.jsx`)).join("\n");
  assert.doesNotMatch(s,/ProgramStoryPage|PansofieVisualEngine|EditorialFeatureBand|PansofieArtPanel/);
});
test("people and place pages preserve privacy truth boundaries",()=>{
  const family=read("src/app/family-team/page.jsx"), growth=read("src/app/osobni-rust/page.jsx"), map=read("src/app/mapa/page.jsx"), cycle=read("src/app/mapa-kolobehu/page.jsx");
  assert.match(family,/každý člen zůstává samostatnou identitou/i);
  assert.match(growth,/Nejde o veřejný katalog mentorů ani tržiště protislužeb/);
  assert.match(growth,/neukazuje seznam jednotlivých mentorů ani jejich přesnou polohu/i);
  assert.match(map,/Žádné veřejné sledování lidí, dětí ani jejich živého pohybu/);
  assert.match(map,/DEMO data/);
  assert.match(cycle,/Veřejný web ukazuje princip/);
});
test("People Place Frame 02 is responsive and stays out of GO implementation",()=>{
  const css=read("src/app/people-place-frame02.css");
  assert.match(css,/@media\(max-width:1050px\)/); assert.match(css,/@media\(max-width:700px\)/);
  const s=pages.map(p=>read(`src/app/${p}/page.jsx`)).join("\n")+read("src/components/public/PansofiePeoplePlaceFrame.jsx");
  assert.doesNotMatch(s,/GoWorkspace|watchPosition|navigator\.geolocation|MapContainer|react-leaflet/);
});
