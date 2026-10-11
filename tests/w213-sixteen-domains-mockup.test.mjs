import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {createHash} from "node:crypto";
import {LEARNING_DOMAINS} from "../src/domain/learning-core.js";
import {DOMAIN_DETAILS} from "../src/domain/pansofie-content.js";

const route=readFileSync("src/app/16-oblasti/page.jsx","utf8");
const css=readFileSync("src/app/16-oblasti/domains-w213.css","utf8");
const files={
  "w213-hero.avif":"7f5ae4e3916f5ed9ef943cf77a7e4bc55dbce6c29d8d23b6cce0475150c3de5e",
  "w213-connected-people.avif":"64dcaefab62c3303e254328e34ef6dbf3ed868167a02b468d27241367a5699e6",
  "w213-domains-atlas.avif":"40de2e3d83af7f5f40bff0e8843c1b2254eb595d06ce990bc49379b8e09f8631"
};
test("W2.13 is a branded adult public V2 page with all canonical 16 domains",()=>{
  assert.match(route,/PublicShellV2 currentPath="\/16-oblasti"/);
  assert.match(route,/LEARNING_DOMAINS\[index\]/);
  assert.match(route,/DOMAIN_DETAILS\.map/);
  assert.equal(LEARNING_DOMAINS.length,16);
  assert.deepEqual(DOMAIN_DETAILS.map(x=>x[0]),LEARNING_DOMAINS.map(x=>x.labelCs));
  for(const {id,labelCs} of LEARNING_DOMAINS){
    assert.ok(route.includes('id:"'+id+'"'),"missing "+id);
    assert.ok(route.includes('label:"'+labelCs+'"'),"missing "+labelCs);
  }
  assert.match(route,/label:"Tvorba"/);
  assert.doesNotMatch(route,/label:"Tvořivost"/);
});
test("W2.13 mockup has hero, 16 image-and-icon cards, a linked seven paths banner and projects CTA",()=>{
  for(const part of ["ps2-domains__hero","ps2-domains__overview","ps2-domains__grid","ps2-domains__card-photo","ps2-domains__card-icon","ps2-domains__bridge","ps2-domains__practice"])
    assert.ok(route.includes(part),part);
  for(const text of ["Vše je propojené","Objevuj, co tě zajímá","Jedna společná mapa","Oblasti v praxi"])
    assert.ok(route.includes(text),text);
  for(const link of ["/jak-to-funguje","/7-cest","/projekty","#oblasti-grid"])
    assert.ok(route.includes(link),link);
  assert.match(route,/<details className="ps2-domains__card-more"/);
  assert.match(route,/<summary aria-label=/);
  assert.match(route,/aria-labelledby=/);
  assert.match(route,/alt="Lidé u společného stolu/);
  assert.doesNotMatch(route,/PansofieVisualEngine|EditorialFeatureBand|\/art\/pansofie-v1\//);
});
test("W2.13 source-derived assets have exact SHA256 and AVIF signatures",()=>{
  for(const [f,sha] of Object.entries(files)){
    const path="public/assets/brand-v2/editorial/"+f;
    assert.ok(existsSync(path),f);
    const data=readFileSync(path);
    assert.equal(data.toString("ascii",4,8),"ftyp",f);
    assert.equal(createHash("sha256").update(data).digest("hex"),sha,f);
    assert.ok(route.includes(f)||css.includes(f),"unused "+f);
  }
});
test("W2.13 preserves 16 correct atlas positions and high-contrast button selectors",()=>{
  assert.match(css,/background-size:400% 400%/);
  assert.match(route,/backgroundPosition:/);
  assert.match(route,/col\*100\/3/);
  assert.match(route,/row\*100\/3/);
  for(const t of ["primary","light","quiet","outline"])
    for(const state of ["",":visited",":hover",":focus-visible"])
      assert.ok(css.includes("a.ps2-domains__button--"+t+state),"missing "+t+state);
  assert.match(css,/a\.ps2-domains__button--primary[^{}]*\{background:#0e4b32;color:#fff/);
  assert.match(css,/a\.ps2-domains__button--light[^{}]*\{background:#fffdf6;color:#173d2d/);
  assert.match(css,/@media\(max-width:780px\)/);
  assert.match(css,/@media\(max-width:560px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
