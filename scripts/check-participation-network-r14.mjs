import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);

const app = read("src/App.jsx");
const login = read("src/pages/Login.jsx");
const auth = read("src/lib/AuthContext.jsx");
const roles = read("src/pages/Roles.jsx");
const audience = read("src/pages/AudienceDetail.jsx");
const intake = read("src/pages/ParticipationIntake.jsx");
const dashboard = read("src/pages/RoleDashboard.jsx");
const bridgeWorkspace = read("src/pages/MaterialBridge.jsx");
const bridgeLanding = read("src/pages/MaterialBridgeLanding.jsx");
const bridgeOpenIntake = read("src/pages/MaterialBridgeOpenIntake.jsx");
const onboarding = read("src/pages/Onboarding.jsx");
const legacyOnboarding = read("src/components/pansofie/LegacyOnboardingR14.jsx");
const onboardingCorpus = `${onboarding}\n${legacyOnboarding}`;
const library = read("src/pages/RepairLibrary.jsx");
const flow = read("src/lib/pansofieParticipationFlow.js");
const openFlow = read("src/lib/pansofieMaterialIntakeFlow.js");
const onboardingFlow = read("src/lib/pansofieOnboardingFlow.js");
const libraryFlow = read("src/lib/pansofieLibraryFlow.js");
const taste = read("src/components/pansofie/PansofieTaste.jsx");
const footer = read("src/components/pansofie/PublicFooter.jsx");
const email = read("docs/email/R14_PARTICIPATION_EMAIL_TEMPLATES.md");
const migration = read("supabase/migrations/20260823233000_participation_material_bridge_r14.sql");
const migrationFix = read("supabase/migrations/20260823234500_material_bridge_claim_fix_r14.sql");
const openIntakeMigration = read("supabase/migrations/20260823235500_material_bridge_open_intake_r14.sql");
const onboardingLibraryMigration = read("supabase/migrations/20260824000500_onboarding_library_r14.sql");

const cssFiles = [
  "src/audience-detail-r14.css",
  "src/participation-network-r14.css",
  "src/participation-cta-r14.css",
  "src/pansofie-taste-r14.css",
  "src/material-bridge-open-r14.css",
  "src/show-dont-sell-r14.css",
  "src/onboarding-library-r14.css",
];

const required = [
  [app, 'path="/pro-koho/skoly"'],
  [app, 'path="/pro-koho/firmy"'],
  [app, 'path="/pro-koho/ekologie"'],
  [app, 'path="/zapojit-se/:audience"'],
  [intake, 'kind === "school"'],
  [intake, 'kind === "company"'],
  [app, 'path="/materialovy-most"'],
  [app, 'path="/materialovy-most/zapojit-se"'],
  [app, 'path="/materialovy-most/workspace"'],
  [app, 'path="/knihovna"'],
  [app, 'path="/katalog"'],
  [app, 'path="/onboarding"'],
  [app, 'path="/dashboard" element={<RoleDashboard />}'],
  [login, 'getOnboardingState'],
  [login, 'onboarding.supported && !onboarding.data?.onboarding_completed_at'],
  [auth, 'onboardingSupported'],
  [auth, 'onboardingCompleted'],
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
  [bridgeWorkspace, "AVAILABLE"],
  [bridgeWorkspace, "RESERVED"],
  [bridgeWorkspace, "HANDED OVER"],
  [bridgeLanding, "MATERIÁLOVÝ MOST · PRO VŠECHNY"],
  [bridgeLanding, "Jednotlivec"],
  [bridgeLanding, "Rodina"],
  [bridgeLanding, "Spolek"],
  [bridgeLanding, "Obec"],
  [bridgeOpenIntake, "Materiálový most"],
  [bridgeOpenIntake, "Komunita / komunitní centrum"],
  [bridgeOpenIntake, "Nabídka se nezveřejní automaticky"],
  [taste, "Vyzkoušejte si celý cyklus Pansofie bez registrace."],
  [taste, "Akce → Výstup → Důkaz → Reflexe → Vizuální stopa."],
  [taste, "Žádné skóre osobnosti ani skrytá morální známka"],
  [taste, "Pouze náhled. V tomto veřejném demu neproběhlo skutečné ověření ani zápis do Passportu."],
  [taste, "KROK 1 · AKCE"],
  [taste, "KROK 2 · VÝSTUP"],
  [taste, "KROK 3 · DŮKAZ"],
  [taste, "KROK 4 · REFLEXE"],
  [taste, "KROK 5 · NÁHLED VĚJÍŘE ZKUŠENOSTÍ"],
  [taste, "KROK 6 · DALŠÍ SKUTEČNÝ KROK"],
  [library, "KNIHOVNA NÁPRAVY"],
  [library, "Labyrint algoritmů"],
  [library, "Porada bez ega"],
  [library, "listPublicAvailableMaterials"],
  [onboardingCorpus, "Nultá mise: Otevřete brány"],
  [onboardingCorpus, "offersText"],
  [onboardingCorpus, "seeksText"],
  [flow, 'from("audience_intakes")'],
  [flow, 'from("material_bridge_listings")'],
  [flow, 'rpc("pansofie_reserve_material_listing"'],
  [openFlow, 'from("material_bridge_intakes")'],
  [onboardingFlow, 'from("profiles")'],
  [libraryFlow, 'rpc("pansofie_public_available_materials"'],
  [migration, "alter table public.audience_intakes enable row level security"],
  [migration, "revoke all on public.audience_intakes from anon, authenticated"],
  [migration, "grant insert on public.audience_intakes to anon, authenticated"],
  [migration, "alter table public.material_bridge_listings enable row level security"],
  [migration, "security definer"],
  [migration, "public_story_consent"],
  [migrationFix, "owner_user_id <> actor"],
  [openIntakeMigration, "create table if not exists public.material_bridge_intakes"],
  [openIntakeMigration, "grant insert on public.material_bridge_intakes to anon, authenticated"],
  [openIntakeMigration, "Public intake is intentionally NOT a live listing"],
  [onboardingLibraryMigration, "onboarding_completed_at"],
  [onboardingLibraryMigration, "pansofie_public_available_materials"],
  [onboardingLibraryMigration, "Exposes no owner user id, organization id, email or reservation identity"],
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
  "public/materials/pansofie-labyrint-algoritmu.md",
  "public/materials/pansofie-porada-bez-ega.md",
].filter((path) => !exists(path));

const missing = required.filter(([content, marker]) => !content.includes(marker)).map(([, marker]) => marker);

const forbiddenClaims = [
  "váš profil je nyní aktivní",
  "Účet vaší organizace",
  "certifikát „Odpovědná digitální organizace“",
  "Avast darovala 15 notebooků",
  "Truhlářství Novák",
  "Reno s.r.o.",
  "Mise byla úspěšně ověřena svědky sítě",
  "Vytvořit bezplatný profil a vstoupit do sítě",
];
const claimCorpus = [intake, dashboard, bridgeWorkspace, bridgeLanding, bridgeOpenIntake, audience, library, taste].join("\n");
const claimViolations = forbiddenClaims.filter((phrase) => claimCorpus.includes(phrase));

const publicIntakeReadLeak = /grant\s+select\s+on\s+public\.material_bridge_intakes/i.test(openIntakeMigration);
const libraryProjectionLeak = /owner_user_id|organization_id|reserved_by_user_id|email/i.test(
  onboardingLibraryMigration
    .split("create or replace function public.pansofie_public_available_materials")[1]
    ?.split("comment on function public.pansofie_public_available_materials")[0] || ""
);

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

if (missing.length || missingFiles.length || claimViolations.length || motionViolations.length || publicIntakeReadLeak || libraryProjectionLeak) {
  console.error("PARTICIPATION_NETWORK_R14=FAIL");
  if (missing.length) console.error(`Missing markers: ${missing.join(" | ")}`);
  if (missingFiles.length) console.error(`Missing files: ${missingFiles.join(" | ")}`);
  if (claimViolations.length) console.error(`Overclaim/fabrication markers: ${claimViolations.join(" | ")}`);
  if (motionViolations.length) console.error(`Motion declarations forbidden in R14 static CSS: ${motionViolations.join(" | ")}`);
  if (publicIntakeReadLeak) console.error("Public Material Bridge intake must not grant SELECT to anon/authenticated.");
  if (libraryProjectionLeak) console.error("Public library material projection leaks identity/contact fields.");
  process.exit(1);
}

console.log("PARTICIPATION_NETWORK_R14=PASS");
