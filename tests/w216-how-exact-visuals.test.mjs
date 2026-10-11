import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {createHash} from "node:crypto";

const page=readFileSync("src/app/jak-to-funguje/page.jsx","utf8");
const css=readFileSync("src/app/jak-to-funguje/how-w214.css","utf8");
const masters={
  "w214-exact-ecosystem.avif":"ce5aeb48a593b6cf4a322a06b3a78cbcc48180ca44056de1629ee4082fb7b2ad",
  "w214-exact-impact.avif":"173bc88d91bb1b0ed0b49a2c2aee272841996e290275f23fcae85b6f9d6232c3",
  "w214-exact-places.avif":"907ee38c8cce9157489927056db6cbe40e3d4a643d2b5ef8eddd145e6567c219"
};
test("W2.16 exact user-approved 3 sections are image-backed with unchanged digests",()=>{
  for(const [name,digest] of Object.entries(masters)){
    const path="public/assets/brand-v2/editorial/"+name;
    assert.ok(existsSync(path),name);
    const content=readFileSync(path);
    assert.equal(content.toString("ascii",4,8),"ftyp",name);
    assert.equal(createHash("sha256").update(content).digest("hex"),digest,name);
    assert.match(page,new RegExp(name.replaceAll(".","\\.")));
    assert.match(page,/unoptimized/);
  }
});
test("W2.16 desktop CTAs are genuinely clickable links over photo-banner buttons",()=>{
  for(const [name,route] of [["main","/o-nas"],["young","/young"],["go","/pansofie-go"]]){
    assert.match(page,new RegExp('className="ps2-how__exact-hit ps2-how__exact-hit--'+name+'" href="'+route+'"'));
    assert.match(css,new RegExp('\\.ps2-how__exact-hit--'+name+'\\{left:'));
    assert.ok(existsSync("src/app"+route+"/page.jsx"),"broken route "+route);
  }
  assert.match(css,/\.ps2-how__exact-hit:hover/);
  assert.match(css,/\.ps2-how__exact-hit:focus-visible/);
  assert.match(page,/ps2-how__exact--ecosystem/);
  assert.match(page,/ps2-how__exact--impact/);
  assert.match(page,/ps2-how__exact--places/);
});
test("W2.16 mobile fallback retains native photos, descriptions and working links",()=>{
  for(const slug of ["ecosystem","impact","places"])assert.match(page,new RegExp('ps2-how__fallback--'+slug));
  assert.match(css,/\.ps2-how__fallback\{display:none\}/);
  assert.match(css,/@media\(max-width:780px\)\{[\s\S]*?\.ps2-how__fallback\{display:block\}/);
  for(const part of ["ECOSYSTEM.map","IMPACT.map","PLACES.map","STEPS.map"])
    assert.ok(page.includes(part),part);
  assert.match(page,/w215-how-method\.webp/);
  assert.match(page,/w215-how-hero\.avif/);
  assert.match(css,/w215-how-atlas\.avif/);
  assert.match(css,/w215-how-footer-landscape\.webp/);
});
test("W2.16 no dead clickable routes and five-phase CTA remain functional",()=>{
  const routes=[...new Set([...page.matchAll(/href="(\/[^#"]+)"/g)].map(m=>m[1]))];
  for(const href of routes) assert.ok(existsSync("src/app"+href+"/page.jsx"),"missing route "+href);
  assert.match(page,/href="#pet-kroku"/);
  assert.match(page,/id="pet-kroku"/);
  assert.match(page,/aria-label=\{step.link\}/);
});
