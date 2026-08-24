import fs from 'node:fs';

const requiredFiles = [
  'vercel.json',
  'DEPLOYMENT.md',
  'docs/canonical/STAGING_DEPLOYMENT_RUNBOOK_V1.md',
  'supabase/verification/post_migration_structural_checks.sql',
  'supabase/migrations/20260808130500_auth_profiles_roles.sql',
  'supabase/migrations/20260816235000_canonical_experience_model.sql',
  'supabase/migrations/20260817000500_school_guardian_consent_model.sql',
  'supabase/migrations/20260817003000_school_experience_flow.sql',
  'supabase/migrations/20260817003100_school_experience_integrity.sql',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`deployment readiness missing ${file}`);
}

const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (!Array.isArray(vercel.rewrites) || !vercel.rewrites.some((r) => r.source === '/(.*)' && r.destination === '/index.html')) {
  throw new Error('Vercel SPA rewrite invariant missing');
}
if (vercel.git?.deploymentEnabled !== true) {
  throw new Error('Vercel Git deployments must remain explicitly enabled');
}
if (vercel.github?.autoAlias !== true) {
  throw new Error('Vercel GitHub auto alias must remain enabled for main production publication');
}

const deployment = fs.readFileSync('DEPLOYMENT.md', 'utf8');
for (const token of [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  '20260808130500_auth_profiles_roles.sql',
  '20260816235000_canonical_experience_model.sql',
  '20260817000500_school_guardian_consent_model.sql',
  '20260817003000_school_experience_flow.sql',
  '20260817003100_school_experience_integrity.sql',
  'needs_revision',
  'service-role',
]) {
  if (!deployment.includes(token)) throw new Error(`DEPLOYMENT.md invariant missing: ${token}`);
}

const runbook = fs.readFileSync('docs/canonical/STAGING_DEPLOYMENT_RUNBOOK_V1.md', 'utf8');
for (const token of [
  'STAGING',
  'learner A',
  'learner B',
  'teacher/coordinator',
  'guardian',
  'unrelated authenticated account',
  'needs_revision',
  'STAGING_VALIDATED = YES',
  'PRODUCTION_AUTHORIZED = YES',
]) {
  if (!runbook.includes(token)) throw new Error(`staging runbook invariant missing: ${token}`);
}

const sql = fs.readFileSync('supabase/verification/post_migration_structural_checks.sql', 'utf8');
for (const token of [
  'experience_review_events',
  'pansofie_assign_school_mission',
  'pansofie_finalize_school_experience',
  'evidence_freeze_after_submission',
  'reflection_freeze_after_submission',
  'experience_reviews_audit_event',
  'PANSOFIE_POST_MIGRATION_STRUCTURAL_CHECK',
]) {
  if (!sql.includes(token)) throw new Error(`post-migration check invariant missing: ${token}`);
}

const client = fs.readFileSync('src/api/supabaseClient.js', 'utf8');
if (!client.includes('VITE_SUPABASE_URL') || !client.includes('VITE_SUPABASE_ANON_KEY')) {
  throw new Error('frontend Supabase env contract drift');
}
if (/SERVICE_ROLE|serviceRole|SUPABASE_SERVICE/i.test(client)) {
  throw new Error('browser client must not reference a Supabase service-role secret');
}

console.log('PANSOFIE deployment-readiness structural contract: PASS');
