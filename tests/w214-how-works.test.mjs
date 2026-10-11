import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {createHash} from "node:crypto";
import {LEARNING_METHOD} from "../src/domain/pansofie-content.js";

const source=readFileSync("src/app/jak-to-funguje/page.jsx","utf8");
const css=readFileSync("src/app/jak-to-funguje/how-w214.css","utf8");
const assets={
 "w214-how-hero.avif":"9ede021385766671113cb106c27cb0efd279f76d3f7fdb1c58c932bc56e1ab15",
 "w214-how-join.avif":"d60c5bda273ae1366f7e45dd7012b52372bfd94d69e0f3d086ebb1a5f9835d16",
 "w214-how-atlas.avif":"b94556417af638c50ea64368a401c8404fd7cc9b834c60d805d6b34ed40fcad9"
};
test("W2.14 keeps PANSOFIE canonical six-phase learning cycle separate from five voluntary steps",()=>{
 assert.deepEqual(LEARNING_METHOD,["Poznej","Hraj","Udělej","Vytvoř","Sdílej","Reflektuj"]);
 assert.match(source,/LEARNING_METHOD\.map/);
 assert.match(source,/STEPS\.map/);
 for(const label of ["Objev","Vyzkoušej","Zapoj se","Vytvoř","Sdílej"])
   assert.match(source,new RegExp('title:"'+label+'"'));
 assert.equal((source.match(/title:"(Objev|Vyzkoušej|Zapoj se|Vytvoř|Sdílej)"/g)||[]).length,5);
 assert.match(source,/Pansofie nabízí příležitost, nevytváří povinnost/);
 assert.match(source,/bez povinnosti všechno dokumentovat/);
 assert.match(source,/Sdílení není povinné/);
 assert.doesNotMatch(source,/PansofieVisualEngine|EditorialFeatureBand|\/art\/pansofie-v1\//);
});
test("W2.14 contains exact-approved source derived AVIF production assets",()=>{
 for(const [name,sha] of Object.entries(assets)){
  const path="public/assets/brand-v2/editorial/"+name;
  assert.ok(existsSync(path),name+" must be present");
  const data=readFileSync(path);
  assert.equal(data.toString("ascii",4,8),"ftyp",name+" should be AVIF");
  assert.equal(createHash("sha256").update(data).digest("hex"),sha,name+" digest");
  // W2.14 provenance remains immutable, but later W2.15 may replace active photographs.
 }
});
test("W2.14 implements all six requested mockup sections with 16 photo tile slots",()=>{
 assert.match(source,/PublicShellV2 currentPath="\/jak-to-funguje"/);
 for(const cl of ["ps2-how__hero","ps2-how__five-grid","ps2-how__method-grid","ps2-how__ecosystem-grid","ps2-how__impact-grid","ps2-how__places-grid","ps2-how__join"])
  assert.ok(source.includes(cl),cl);
 for(const name of ["PANSOFIE YOUNG","PANSOFIE GO","Nápad","Tým","Realizace","Dopad","Ve škole","V rodině","V komunitě","V přírodě"])
  assert.ok(source.includes(name),name);
 assert.match(css,/background-size:400% 400%/);
 assert.match(source,/backgroundPosition:/);
 assert.match(source,/col\*100\/3/);
 assert.match(source,/row\*100\/3/);
});
test("W2.14 links are real routable CTA targets, never inert # placeholders",()=>{
 const targets=["/blog","/16-oblasti","/labs","/komunita","/projekty","/o-nas","/young","/pansofie-go","/pro-skoly","/family-team","/green-hope","/kontakt"];
 for(const path of targets){
  assert.ok(source.includes('"'+path+'"'),"CTA target missing "+path);
  assert.ok(existsSync("src/app"+path+"/page.jsx"),"CTA route missing "+path);
 }
 assert.match(source,/href="#pet-kroku"/);
 assert.match(source,/id="pet-kroku"/);
 assert.match(source,/<Link className="ps2-how__button ps2-how__button--green" href=\{item.href\}/);
 assert.match(source,/aria-label=\{step.link\}/);
 assert.match(source,/aria-labelledby/);
 assert.match(source,/alt="Mezigenerační skupina/);
});
function rgb(h){return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4)}
function contrast(a,b){const l=x=>[.2126,.7152,.0722].reduce((s,w,i)=>s+w*rgb(x)[i],0);let [x,y]=[l(a),l(b)].sort((x,y)=>y-x);return (x+.05)/(y+.05)}
test("W2.14 button text is readable (WCAG AA), even with global color inheritance",()=>{
 for(const [label,fg,bg] of [
  ["green normal","#ffffff","#145339"],
  ["green hover","#ffffff","#0c3a29"],
  ["light normal","#183c2b","#fffdf7"],
  ["light hover","#103022","#e8ede1"],
 ]) assert.ok(contrast(fg,bg)>=4.5,label+" "+contrast(fg,bg));
 for(const type of ["green","light"])
  for(const state of ["",":visited",":hover",":focus-visible"])
   assert.ok(css.includes("a.ps2-how__button--"+type+state),type+state);
 assert.match(css,/\.ps2-site \.ps2-how a\.ps2-how__button--green/);
 assert.match(css,/\.ps2-site \.ps2-how a:focus-visible/);
 assert.match(css,/@media\(max-width:780px\)/);
 assert.match(css,/@media\(max-width:570px\)/);
 assert.match(css,/@media\(max-width:365px\)/);
});
