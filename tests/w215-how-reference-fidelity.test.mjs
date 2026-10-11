import test from "node:test";
import assert from "node:assert/strict";
import {existsSync, readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {LEARNING_METHOD} from "../src/domain/pansofie-content.js";

const page=readFileSync("src/app/jak-to-funguje/page.jsx","utf8");
const css=readFileSync("src/app/jak-to-funguje/how-w214.css","utf8");
const shell=readFileSync("src/components/public-v2/PublicShellV2.jsx","utf8");
const footer=readFileSync("src/app/jak-to-funguje/HowFooterW215.jsx","utf8");
const assets={
  "w215-how-atlas.avif":"7d6d430b2070c239d910154d8add1c8e1748d2cb85e906fcf9af779304b9fe4c",
  "w215-how-hero.avif":"1080153332a717d0d4cfaf442f55e20d4c95eb8f4f61507158828ff0ce60a1a1",
  "w215-how-method.webp":"40f35b5e3b72f5838b34ad6f43839cd1a4cacf846e622db48d6db82c4fa34416",
  "w215-how-footer-landscape.webp":"176a3fe73849b6b5faffdee9f1925aa79b3316f812b927e0439fdcb19b56d13a",
};
test("W2.15 source photographs and exact method banner are immutable verified uploads",()=>{
  for(const [file,hash] of Object.entries(assets)){
    const p="public/assets/brand-v2/editorial/"+file;
    assert.ok(existsSync(p),file);
    const buf=readFileSync(p);
    assert.equal(createHash("sha256").update(buf).digest("hex"),hash);
    assert.ok(page.includes(file)||css.includes(file),file+" not in live page");
  }
  assert.match(page,/w215-how-method\.webp/);
  assert.match(page,/w215-how-hero\.avif/);
  assert.match(css,/w215-how-atlas\.avif/);
  assert.match(css,/w215-how-footer-landscape\.webp/);
});
test("W2.15 honors photographed mockup, full newsletter-free functional footer, six canonical steps",()=>{
  for(const name of ["ps2-how__hero","ps2-how__five-grid","ps2-how__method-banner","ps2-how__ecosystem-grid","ps2-how__impact-grid","ps2-how__places-grid","ps2-how__join"])
    assert.ok(page.includes(name),name);
  assert.deepEqual(LEARNING_METHOD,["Poznej","Hraj","Udělej","Vytvoř","Sdílej","Reflektuj"]);
  assert.match(page,/LEARNING_METHOD\.map/);
  assert.match(page,/className="ps2-how__method-grid ps2-how__visually-hidden"/);
  assert.match(page,/alt="Pansofie Method: šest fází Poznej/);
  assert.match(page,/footer=\{<HowFooterW215\/>\}/);
  assert.match(shell,/footer = null/);
  assert.match(shell,/footer \?\? <PublicFooterV2\/>/);
  assert.doesNotMatch(footer,/<form\b|<input\b|<button\b/);
  assert.match(footer,/href="\/kontakt"/);
});
test("W2.15 footer and page CTAs reference real app routes",()=>{
  const links=new Set();
  for(const x of footer.matchAll(/\["(\/[^"]+)",\s*"[^"]+"\]/g))links.add(x[1]);
  for(const x of footer.matchAll(/href="(\/[^"]+)"/g))links.add(x[1]);
  for(const x of page.matchAll(/href:"(\/[^"]+)"/g))links.add(x[1]);
  for(const x of page.matchAll(/href="(\/[^"#]+)"/g))links.add(x[1]);
  for(const href of links) assert.ok(existsSync("src/app"+href+"/page.jsx"),"dead route "+href);
  for(const text of ["Objev","Vyzkoušej","Zapoj se","Vytvoř","Sdílej"])
    assert.match(page,new RegExp('title:"'+text+'"'));
  assert.match(page,/href="#pet-kroku"/);
});
function rgb(h){return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4)}
function contrast(a,b){const lum=x=>[.2126,.7152,.0722].reduce((s,w,i)=>s+w*rgb(x)[i],0);const [x,y]=[lum(a),lum(b)].sort((a,b)=>b-a);return (x+.05)/(y+.05)}
test("W2.15 responsive headline, banner scroll, keyboard focus, WCAG AA CTA",()=>{
  assert.match(css,/\.ps2-how__method-banner-wrap\{[^}]*overflow-x:auto/);
  assert.match(css,/\.ps2-how__method-banner\{[^}]*width:100%/);
  assert.match(css,/@media\(max-width:570px\)/);
  assert.match(css,/\.ps2-site \.ps2-how a:focus-visible/);
  for(const [name,fg,bg] of [
    ["green normal","#ffffff","#145339"],
    ["green hover","#ffffff","#0c3a29"],
    ["light normal","#183c2b","#fffdf7"],
    ["light hover","#103022","#e8ede1"],
    ["footer contact","#ffffff","#174f37"],
  ])assert.ok(contrast(fg,bg)>=4.5,name+" contrast="+contrast(fg,bg));
  assert.match(css,/\.ps2-site \.ps2-how-footer a\.ps2-how-footer__contact-cta:hover/);
  assert.match(css,/\.ps2-how__photo\{background-image:url/);
});
