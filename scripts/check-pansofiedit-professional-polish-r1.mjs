import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [css, nav, footer, home, roles, member, school, family, doc] = await Promise.all([
  read("src/index.css"),
  read("src/components/pansofie/PublicNav.jsx"),
  read("src/components/pansofie/PublicFooter.jsx"),
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

assert.ok(nav.includes("Vyzkoušet 60 s"), "public nav must expose the live taste as the dominant product entry");
assert.ok(nav.includes("/pro-koho#ochutnejte"), "public nav live taste route missing");
assert.ok(footer.includes("/zapojit-se?mode=simulator"), "PANSOFIEDIT simulator must remain explicitly reachable as a secondary route");
assert.ok(nav.includes("/pro-koho"), "public role information architecture entry missing");
assert.ok(home.includes("action-primary"), "homepage primary action hierarchy missing");
assert.ok(home.includes("Učení, které pokračuje v reálném světě"), "homepage human-first positioning marker missing");
assert.ok(home.includes("<PublicMaturity />"), "homepage maturity/truth surface missing");

for (const role of ["learner", "school", "family", "partner", "community", "mentor"]) {
  assert.ok(roles.includes(`id: \"${role}\"`), `role ecosystem missing ${role}`);
}
assert.ok(roles.includes("data-role={actor.id}"), "role semantic visual binding missing");
assert.ok(roles.includes("Role v této zkušenosti"), "experience-centered role grammar missing");
assert.ok(roles.includes("Nevidí / nemá automaticky"), "role data-access boundary surface missing");
assert.ok(roles.includes("Příklady zkušeností"), "role-specific experience examples missing");

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
