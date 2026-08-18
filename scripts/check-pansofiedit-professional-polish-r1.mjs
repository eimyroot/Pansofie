import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [css, nav, home, roles, member, school, family, doc] = await Promise.all([
  read("src/index.css"),
  read("src/components/pansofie/PublicNav.jsx"),
  read("src/pages/Home.jsx"),
  read("src/components/pansofie/RoleEntry.jsx"),
  read("src/layouts/MemberLayout.jsx"),
  read("src/pages/SchoolHub.jsx"),
  read("src/pages/FamilyHub.jsx"),
  read("docs/design/PANSOFIE_PRODUCT_VISUAL_SYSTEM_R1.md"),
]);

for (const token of [
  "--primary-strong",
  "--experience",
  "--status-success",
  "--status-warning",
  "--status-danger",
  "--status-info",
  "--role-learner",
  "--role-school",
  "--role-family",
  "--role-partner",
  "--role-community",
  "--role-mentor",
]) {
  assert.ok(css.includes(token), `missing visual token ${token}`);
}

for (const componentClass of [
  ".action-primary",
  ".action-secondary",
  ".action-quiet",
  ".next-action-card",
  ".status-pill",
  ".role-chip",
  ".role-icon",
  ".surface-panel",
  ".surface-subtle",
]) {
  assert.ok(css.includes(componentClass), `missing component grammar ${componentClass}`);
}

assert.ok(css.includes("prefers-reduced-motion"), "reduced-motion fallback missing");
assert.ok(css.includes(":focus-visible"), "global visible focus treatment missing");

assert.ok(nav.includes("Vyzkoušet 60 s"), "public nav must expose the simulator as the dominant product entry");
assert.ok(nav.includes("/zapojit-se?mode=simulator"), "public nav simulator route missing");
assert.ok(home.includes("action-primary"), "homepage primary action hierarchy missing");
assert.ok(home.includes("Experience-first ekosystém"), "homepage Experience-first positioning marker missing");

for (const role of ["learner", "school", "family", "partner", "community", "mentor"]) {
  assert.ok(roles.includes(`id: \"${role}\"`), `role ecosystem missing ${role}`);
}
assert.ok(roles.includes("data-role={actor.id}"), "role semantic visual binding missing");
assert.ok(roles.includes("Experience je centrum"), "Experience must remain visual center");

assert.ok(member.includes("Pilot workspace"), "member shell workspace identity missing");
assert.ok(member.includes('role: "school"'), "School navigation role tone missing");
assert.ok(member.includes('role: "family"'), "Family navigation role tone missing");

assert.ok(school.includes("CO JE TEĎ NA MNĚ?"), "School Next Action Engine marker missing");
assert.ok(school.includes("next-action-card"), "School next-action surface missing");
assert.ok(school.includes("status-waiting"), "School waiting state must be semantic, not brand-only");
assert.ok(school.includes("#pilot-operations"), "School pilot operations next-action target missing");

assert.ok(family.includes("CO JE TEĎ NA MNĚ?"), "Family Next Action Engine marker missing");
assert.ok(family.includes("next-action-card"), "Family next-action surface missing");
assert.ok(family.includes("Rodina nevidí raw evidence ani soukromou reflexi"), "Family privacy boundary drifted");
assert.ok(family.includes("guardian_family_participation"), "Family purpose-specific access marker missing");
assert.ok(family.includes("Povolené Passport summary"), "Family Passport boundary marker missing");
assert.ok(family.includes("Rodinné podněty pro školu"), "School-side Family inbox marker missing");

assert.ok(doc.includes("UX decides what the person should understand or do next"), "UX/UI responsibility split missing from design contract");
assert.ok(doc.includes("Role colors are bounded orientation cues"), "role-color restraint missing from design contract");
assert.ok(doc.includes("Next Action Engine"), "Next Action Engine design direction missing");
assert.ok(doc.includes("no rainbow dashboard"), "anti-edtech-rainbow boundary missing");

console.log("PANSOFIEDIT_PROFESSIONAL_PRODUCT_POLISH_R1=PASS");
