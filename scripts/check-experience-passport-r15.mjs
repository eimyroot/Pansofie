import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const migration = read("supabase/migrations/20260824012000_experience_fan_r15.sql");
const fan = read("src/components/pansofie/ExperienceFan.jsx");
const client = read("src/lib/pansofieExperienceFan.js");
const portfolio = read("src/pages/Portfolio.jsx");

const requireAll = (source, markers, label) => {
  for (const marker of markers) {
    if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
  }
};

requireAll(migration, [
  "mission_experience_axes",
  "experience_outcome_attestations",
  "experience_outcome_attestation_events",
  "pansofie_attest_experience_outcome",
  "pansofie_my_experience_fan",
  "verified Passport Experience required before outcome attestation",
  "security definer",
  "auth.uid()",
  "grant execute on function public.pansofie_my_experience_fan() to authenticated",
], "R15 migration");

requireAll(migration, [
  "digital_attention",
  "critical_reason",
  "respectful_dialogue",
  "cooperation",
  "circular_action",
  "local_impact",
], "R15 six axes");

for (const forbidden of [
  "experienceLevel",
  "experience_level",
  "user_score",
  "person_score",
  "leaderboard",
]) {
  if (migration.includes(forbidden)) throw new Error(`R15 migration must not store human scoring field: ${forbidden}`);
}

if (/pansofie_my_experience_fan\s*\([^)]*user/i.test(migration)) {
  throw new Error("R15 Fan RPC must be bound to auth.uid(), not an arbitrary user parameter");
}

requireAll(fan, [
  "Můj Vějíř zkušeností",
  "Mapa toho, co jste skutečně zkusili, vytvořili a doložili.",
  "PolarRadiusAxis domain={[0, 5]}",
  "Doložené použití výsledku",
  "Doložený následný dopad",
], "R15 Experience Fan UI");

requireAll(client, ["pansofie_my_experience_fan", "EXPERIENCE_FAN_AXES"], "R15 Fan client");
requireAll(portfolio, [
  "loadMyExperienceFan",
  "ExperienceFan",
  "Neodhadujeme náhradní hodnoty",
], "R15 Passport fail-closed UI");

console.log("EXPERIENCE_PASSPORT_R15=PASS");
