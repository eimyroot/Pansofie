import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { DEVELOPMENT_PATHS } from "../src/domain/learning-core.js";
import { PATHS } from "../src/domain/pansofie-content.js";

const route=readFileSync("src/app/7-cest/page.jsx","utf8");
const css=readFileSync("src/app/pansofie-v2.css","utf8");
const assets={
  "w211-hero.avif":"4d63dcf081baed3278bfcbca1a2ae1cc363fa8d6279f321961c6ed5c004bbd94",
  "w211-sign.avif":"ee5966ef08c435e1c9b84766a6009aa844070e748cfeda030a619fade07bb581",
  "w211-footer.avif":"b2fa28515c8284dd598e03143222e7566e68db7934b8bc07afa9373c5f0d7853",
  "w210-seven-paths-atlas.avif":"60572a0f9744d7f2ef89835722c50fda0dc9915e336d581c6b9e41be2fd7f1d9"
};

test("W2.10 uses the adult brand shell and seven true canonical paths",()=>{
 assert.match(route,/PublicShellV2 currentPath="\/7-cest"/);
 assert.match(route,/PATHS\[index\]\[0\]/);
 assert.match(route,/DEVELOPMENT_PATHS\[index\]/);
 assert.deepEqual(DEVELOPMENT_PATHS.map(p=>p.labelCs),["Tělo","Mysl","Charakter","Vztahy","Tvořivost","Prosperita","Smysl"]);
 for (const label of DEVELOPMENT_PATHS.map(x=>x.labelCs)) assert.match(route,new RegExp('label: "'+label+'"'));
 assert.doesNotMatch(route,/label: "Zdraví"|label: "Poznání"|label: "Samostatnost"|label: "Přínos"/);
});

test("W2.10 follows the approved sections and has accessible functional interactions",()=>{
 for(const selector of ["ps2-paths__hero","ps2-paths__overview","ps2-paths__cards","ps2-paths__connected","ps2-paths__audience","ps2-paths__details","ps2-paths__join"]) assert.ok(route.includes(selector),selector);
 for(const hash of ["#prehled-cest","#detaily-cest","#detail-"]) assert.ok(route.includes(hash),hash);
 for(const path of ["/jak-to-funguje","/young","/o-nas","/kontakt","/projekty"]) assert.ok(route.includes(path),path);
 for(const token of ["aria-labelledby","aria-label","alt=",'sizes="100vw"']) assert.ok(route.includes(token),token);
 assert.match(route,/Cesty se vzájemně doplňují/);
 assert.match(route,/Sedm cest\. Jeden směr/);
});

test("W2.10 images are exact SHA256-approved source-derived production files, not legacy assets",()=>{
 for(const [name,hash] of Object.entries(assets)){
  const path="public/assets/brand-v2/editorial/"+name;
  assert.ok(existsSync(path),"Image absent: "+name);
  const bytes=readFileSync(path);
  assert.equal(bytes.toString("ascii",4,8),"ftyp",name+" is not an AVIF file");
  assert.equal(createHash("sha256").update(bytes).digest("hex"),hash,name+" asset identity");
  assert.ok(route.includes(name)||css.includes(name),name+" unused");
 }
 assert.doesNotMatch(route,/\/art\/pansofie-v1\//);
 assert.doesNotMatch(route,/\/assets\/brand\/pansofie\//);
});

test("W2.10 is responsive and text remains editable rather than baked into photographs",()=>{
 for(const sel of [".ps2-paths__hero-wash",".ps2-paths__cards",".ps2-paths__connected-card",".ps2-paths__join-wash",".ps2-paths__handwriting"]) assert.ok(css.includes(sel),sel);
 for(const mq of ["@media(max-width:890px)","@media(max-width:680px)","@media(prefers-reduced-motion:reduce)"]) assert.ok(css.includes(mq),mq);
 assert.match(route,/Různé cesty,/);
 assert.match(route,/Co jsou 7 cest\?/);
 assert.match(route,/Pro koho jsou 7 cest\?/);
 assert.doesNotMatch(route,/Jan Amos Komenský|Skutečné vzdělání rozvíjí celé lidství/);
 assert.doesNotMatch(route,/1000\+|ověřený dopad|garantovaný dopad/i);
});


test("W2.11 replaces blurry full-width sources with real 1916x821 AVIF masters",()=>{
 for(const kind of ["hero","sign","footer"]){
   const name="w211-"+kind+".avif",image=readFileSync("public/assets/brand-v2/editorial/"+name);
   assert.ok(image.byteLength>140_000,name+" is suspiciously tiny");
   const ispe=image.indexOf(Buffer.from("ispe"));
   assert.ok(ispe>=0,name+" missing image dimensions");
   assert.equal(image.readUInt32BE(ispe+8),1916,name+" width");
   assert.equal(image.readUInt32BE(ispe+12),821,name+" height");
   assert.match(route,new RegExp("w211-"+kind+"\\.avif"));
 }
 assert.doesNotMatch(route,/w210-(hero|sign|footer)\.avif/);
 const hdImage=route.match(/<Image[^>]+w211-[^>]+/g)||[];
 assert.equal(hdImage.length,3);
 for(const image of hdImage)assert.match(image,/quality=\{85\}/);
 assert.match(route,/komunitní zahradě/);
});

test("W2.11 permits requested Next/Image quality in Next.js 16",()=>{
 const config=readFileSync("next.config.mjs","utf8");
 assert.match(config,/qualities:\s*\[75,\s*85\]/);
});
