import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  ACCESS_MODEL_VERSION,
  ORGANIZATION_TYPES,
  ORGANIZATION_ROLES,
  GUARDIAN_RELATIONSHIP_KINDS,
  AGE_BANDS,
  GDPR_LEGAL_BASES,
  PROCESSING_PURPOSES,
  DIRECT_SERVICE_CONSENT_AGE,
  requiresParentalAuthorizationForDirectServiceConsent,
  isSchoolReviewPurpose,
  isKnownProcessingPurpose,
} from "../src/lib/pansofieAccess.js";

const unique = (items) => new Set(items).size === items.length;

assert.equal(ACCESS_MODEL_VERSION, "0.2");
assert.ok(unique(ORGANIZATION_TYPES));
assert.ok(unique(ORGANIZATION_ROLES));
assert.ok(unique(GUARDIAN_RELATIONSHIP_KINDS));
assert.ok(unique(AGE_BANDS));
assert.ok(unique(GDPR_LEGAL_BASES));
assert.ok(unique(PROCESSING_PURPOSES));

assert.equal(DIRECT_SERVICE_CONSENT_AGE.CZ, 15);
assert.equal(
  requiresParentalAuthorizationForDirectServiceConsent({
    jurisdiction: "CZ",
    ageBand: "13_14",
    legalBasis: "consent",
    directInformationSocietyService: true,
  }),
  true
);
assert.equal(
  requiresParentalAuthorizationForDirectServiceConsent({
    jurisdiction: "CZ",
    ageBand: "15_17",
    legalBasis: "consent",
    directInformationSocietyService: true,
  }),
  false
);
assert.equal(
  requiresParentalAuthorizationForDirectServiceConsent({
    jurisdiction: "CZ",
    ageBand: "13_14",
    legalBasis: "public_task",
    directInformationSocietyService: true,
  }),
  false,
  "Article 8 consent threshold must not be treated as a universal school-processing rule"
);
assert.equal(
  requiresParentalAuthorizationForDirectServiceConsent({
    jurisdiction: "DE",
    ageBand: "15_17",
    legalBasis: "consent",
    directInformationSocietyService: true,
  }),
  true,
  "unsupported jurisdictions must fail closed rather than inherit Czech rules"
);

assert.ok(isSchoolReviewPurpose("school_evidence_review"));
assert.ok(!isSchoolReviewPurpose("guardian_passport_view"));
assert.ok(isKnownProcessingPurpose("school_reflection_review"));
assert.ok(!isKnownProcessingPurpose("marketing_to_children"));

const migrationPath = new URL(
  "../supabase/migrations/20260817000500_school_guardian_consent_model.sql",
  import.meta.url
);
const sql = await readFile(migrationPath, "utf8");
const lower = sql.toLowerCase();

assert.ok(!/\bdrop\s+table\b/i.test(sql), "R0.2 must not drop tables");
assert.ok(!/\btruncate\b/i.test(sql), "R0.2 must not truncate data");
assert.ok(!/alter\s+table\s+public\.(profiles|user_roles)\b/i.test(sql), "R0.2 must not alter auth foundation tables");
assert.ok(lower.includes("create table if not exists public.organizations"));
assert.ok(lower.includes("create table if not exists public.organization_memberships"));
assert.ok(lower.includes("create table if not exists public.guardian_relationships"));
assert.ok(lower.includes("create table if not exists public.age_assurance_records"));
assert.ok(lower.includes("create table if not exists public.processing_basis_records"));
assert.ok(lower.includes("create table if not exists public.processing_basis_events"));
assert.ok(lower.includes("create table if not exists public.experience_reviews"));
assert.ok(lower.includes("pansofie_can_review_run"));
assert.ok(lower.includes("pansofie_can_guardian_view_passport"));
assert.ok(lower.includes("guardian relationship alone never grants access"));
assert.ok(lower.includes("school_reflection_review"), "reflection review must be a separate explicit purpose");
assert.ok(lower.includes("portfolio_protect_verification"), "participant must not self-assert verification");

console.log("PANSOFIE R0.2 access/consent contract: PASS");
