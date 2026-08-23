import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);

const app = read("src/App.jsx");
const login = read("src/pages/Login.jsx");
const roles = read("src/pages/Roles.jsx");
const audience = read("src/pages/AudienceDetail.jsx");
const intake = read("src/pages/ParticipationIntake.jsx");
const dashboard = read("src/pages/RoleDashboard.jsx");
const bridge = read("src/pages/MaterialBridge.jsx");
const flow = read("src/lib/pansofieParticipationFlow.js");
const footer = read("src/components/pansofie/PublicFooter.jsx");
const email = read("docs/email/R14_PARTICIPATION_EMAIL_TEMPLATES.md");
const migration = read("supabase/migrations/20260823233000_participation_material_bridge_r14.sql");
const migrationFix = read("supabase/migrations/20260823234500_material_bridge_claim_fix_r14.sql");
const cssFiles = [
  "src/audience-detail-r14.css",
  "src/participation-network-r14.css",
  "src/participation-cta-r14.css",
];

const required = [
  [app, 'path="/pro-koho/skoly"'],
  [app, 'path="/pro-koho/firmy"'],
  [app, 'path="/pro-koho/ekologie"'],
  [app, 'path="/zapojit-se/skola"'],
  [app, 'path="/zapojit-se/firma"'],
  [app, 'path="/materialovy-most"'],
  [app, 'path="/materialovy-most/workspace"'],
  [app, 'path="/dashboard" element={<RoleDashboard />}'],
  [login, 'returnTo === "/" ? "/dashboard" : returnTo'],
  [roles, 'slug: "skoly"'],
  [roles, 'slug: "firmy"'],
  [roles, 'slug: "ekologie"'],
  [audience, "Školy jako dílny lidskosti, ne továrny na fakta"],
  [audience, "Podnikání s vyšším smyslem a morální kotvou"],
  [audience, "Uzdravení světa skrze porozumění přírodě"],
  [intake, "Odeslání formuláře automaticky nevytváří účet, rezervaci, workshop ani certifikaci."],
  [dashboard, "První krok z labyrintu"],
  [dashboard, "Mosty místo zdí"],
  [dashboard, "Cirkulární tvoření"],
  [dashboard, "Restart pozornosti"],
  [dashboard, "Etický kompas"],
  [dashboard, "Žádnou aktivní Challenge si nevymýšlíme."],
  [bridge, "AVAILABLE"],
  [bridge, "RESERVED"],
  [bridge, "HANDED OVER"],
  [bridge, "Feed nápravy"],
  [flow, 'from("audience_intakes")'],
  [flow, 'from("material_bridge_listings")'],
  [flow, 'rpc("pansofie_reserve_material_listing"'],
  [migration, "alter table public.audience_intakes enable row level security"],
  [migration, "revoke all on public.audience_intakes from anon, authenticated"],
  [migration, "grant insert on public.audience_intakes to anon, authenticated"],
  [migration, "alter table public.material_bridge_listings enable row level security"],
  [migration, "security definer"],
  [migration, "public_story_consent"],
  [migrationFix, "owner_user_id <> actor"],
  [email, "intake confirmation"],
  [email, "account activation"],
  [email, "A successful UI submission is not evidence that an email was sent."],
  [footer, "<ParticipationCTA />"],
];

const missingFiles = [
  "public/materials/pansofie-ukazkova-lekce-kriticke-mysleni.md",
  "public/materials/pansofie-stavitele-mostu-dialog.md",
  "public/materials/pansofie-restart-pozornosti-team-guide.md",
  "public/materials/pansofie-eticky-kompas-ai-checklist.md",
].filter((path) => !exists(path));

const missing = required.filter(([content, marker]) => !content.includes(marker)).map(([, marker]) => marker);

const forbiddenClaims = [
  "váš profil je nyní aktivní",
  "Účet vaší organizace",
  "certifikát „Odpovědná digitální organizace“",
  "Avast darovala 15 notebooků",
  "Truhlářství Novák",
];
const claimCorpus = [intake, dashboard, bridge, audience].join("\n");
const claimViolations = forbiddenClaims.filter((phrase) => claimCorpus.includes(phrase));

const forbiddenMotion = [
  /(^|[;{]\s*)animation\s*:/im,
  /@keyframes/i,
  /(^|[;{]\s*)transition\s*:/im,
  /(^|[;{]\s*)transform\s*:/im,
];
const motionViolations = [];
for (const path of cssFiles) {
  const css = read(path);
  for (const pattern of forbiddenMotion) {
    if (pattern.test(css)) motionViolations.push(`${path}:${pattern}`);
  }
}

if (missing.length || missingFiles.length || claimViolations.length || motionViolations.length) {
  console.error("PARTICIPATION_NETWORK_R14=FAIL");
  if (missing.length) console.error(`Missing markers: ${missing.join(" | ")}`);
  if (missingFiles.length) console.error(`Missing files: ${missingFiles.join(" | ")}`);
  if (claimViolations.length) console.error(`Overclaim/fabrication markers: ${claimViolations.join(" | ")}`);
  if (motionViolations.length) console.error(`Motion declarations forbidden in R14 static CSS: ${motionViolations.join(" | ")}`);
  process.exit(1);
}

console.log("PARTICIPATION_NETWORK_R14=PASS");
