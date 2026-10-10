import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const page=readFileSync("src/app/o-nas/page.jsx","utf8");
const css=readFileSync("src/app/pansofie-v2.css","utf8");
test("W2.9 about page has mockup structure in the shared Pansofie V2 shell",()=>{
 for(const token of ["PublicShellV2 currentPath=\"/o-nas\"","ps2-about__hero","Naše mise","ps2-about__story","Z vize k reálným projektům","Naše hodnoty","ps2-about__wisdom","ps2-about__join"]) assert.ok(page.includes(token),token);
});
test("W2.9 mission and values preserve all four distinct themes",()=>{
 for(const phrase of ["Rozvoj člověka","Silné komunity","Udržitelná budoucnost","Skutečný přínos","Respekt k přírodě","Spolupráce","Odvaha tvořit","Odpovědnost"]) assert.ok(page.includes(phrase),phrase);
});
test("W2.9 images resolve to real local assets, never fictional documents",()=>{
 const sources=[...page.matchAll(/(?:photo: |src=)("[^"]+\.(?:webp|png)")+?/g)].map(m=>m[1].slice(1,-1));
 assert.ok(sources.length>=7);
 for(const src of sources){assert.ok(src.startsWith("/assets/")||src.startsWith("/art/"),src);assert.ok(existsSync("public"+src),"Missing "+src);}
 assert.match(page,/AI ilustrační/);
});
test("W2.9 has functional CTA destinations and responsive text contrast",()=>{
 assert.match(page,/href="\/kontakt"/);assert.match(page,/href="\/pro-skoly"/);
 assert.match(css,/\.ps2-about__hero-wash/);
 assert.match(css,/\.ps2-about__join-shade/);
 assert.match(css,/@media\(max-width:740px\)/);
 assert.match(css,/prefers-reduced-motion/);
});
test("W2.9 does not fabricate verified partners, quantified impacts or a Komensky quote attribution",()=>{
 assert.doesNotMatch(page,/naměřený dopad|ověření partneři|\d+\s*(kg|t)\s*CO2/i);
 assert.doesNotMatch(page,/Vzdělání není příprava na život/);
 assert.match(page,/odkaz Jana Amose Komenského/);
});
