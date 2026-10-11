import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=(f)=>readFileSync(f,"utf8");
const routes=["dobrovolnictvi","partnerstvi","kontakt"];

test("Engage Frame 02 is one family with three distinct action grammars",()=>{
  const c=read("src/components/public/PansofieEngageFrame.jsx");
  for(const v of ["volunteer","partnership","contact"]) assert.match(c,new RegExp(`variant===\\"${v}\\"`));
  const css=read("src/app/engage-frame02.css");
  assert.match(css,/\.en02-volunteer-field/); assert.match(css,/\.en02-partnership-field/); assert.match(css,/\.en02-contact-field/);
});

test("Engage Frame 02 retires repeated Visual Engine and conversion cards",()=>{
  const combined=routes.map(r=>read(`src/app/${r}/page.jsx`)).join("\n");
  for(const r of routes) assert.match(read(`src/app/${r}/page.jsx`),/EngageFamilyNav/);
  assert.doesNotMatch(combined,/PansofieVisualEngine|PansofieVisualCard|EditorialFeatureBand|pw-visual-card-strip|pw-contact-entry-grid/);
});

test("volunteering remains voluntary and partnership claims remain bounded",()=>{
  assert.match(read("src/app/dobrovolnictvi/page.jsx"),/Příležitost, ne povinnost/);
  assert.match(read("src/app/dobrovolnictvi/page.jsx"),/povinnou fotografií/);
  assert.match(read("src/app/partnerstvi/page.jsx"),/Veřejné tvrzení o spolupráci potřebuje/);
});

test("contact keeps the local prototype truth instead of pretending to send",()=>{
  const page=read("src/app/kontakt/page.jsx"), form=read("src/components/public/ContactForm.jsx");
  assert.match(page,/lokální prototyp/i); assert.match(page,/Nepředstírá odeslání ani přijetí na mailbox/i);
  assert.match(form,/nebyla odeslána/i); assert.doesNotMatch(form,/fetch\(|sendEmail|supabase/i);
});

test("Engage Frame 02 has explicit mobile composition and no GO redesign",()=>{
  const css=read("src/app/engage-frame02.css"), c=read("src/components/public/PansofieEngageFrame.jsx");
  assert.match(css,/@media\(max-width:700px\)/); assert.doesNotMatch(css+c,/GoWorkspace|go-v2|PANSOFIE GO/i);
});
