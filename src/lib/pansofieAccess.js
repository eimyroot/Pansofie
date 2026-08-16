// PANSOFIE R0.2 access/consent domain constants.
//
// IMPORTANT: the consent age threshold below applies only when consent is used
// as the legal basis for an information-society service offered directly to a
// child. It is NOT a universal rule for all school or child-data processing.

export const ACCESS_MODEL_VERSION = "0.2";

export const ORGANIZATION_TYPES = Object.freeze([
  "school",
  "municipality",
  "ngo",
  "community",
  "company",
]);

export const ORGANIZATION_ROLES = Object.freeze([
  "learner",
  "teacher",
  "coordinator",
  "mentor",
  "staff",
]);

export const GUARDIAN_RELATIONSHIP_KINDS = Object.freeze([
  "parental_responsibility_holder",
  "guardian",
  "caregiver",
  "other",
]);

export const AGE_BANDS = Object.freeze([
  "unknown",
  "under_11",
  "11_12",
  "13_14",
  "15_17",
  "18_plus",
]);

export const GDPR_LEGAL_BASES = Object.freeze([
  "consent",
  "contract",
  "legal_obligation",
  "vital_interests",
  "public_task",
  "legitimate_interests",
]);

export const PROCESSING_PURPOSES = Object.freeze([
  "core_account",
  "school_program_participation",
  "school_mission_assignment",
  "school_mission_review",
  "school_evidence_review",
  "school_reflection_review",
  "school_passport_review",
  "guardian_passport_view",
]);

// Czech Act No. 110/2019 sets 15 as the national threshold for Article 8 GDPR.
// Keep this map explicit so international expansion cannot silently inherit the
// Czech rule.
export const DIRECT_SERVICE_CONSENT_AGE = Object.freeze({
  CZ: 15,
});

const AGE_BAND_MAX_AGE = Object.freeze({
  unknown: null,
  under_11: 10,
  "11_12": 12,
  "13_14": 14,
  "15_17": 17,
  "18_plus": null,
});

export function requiresParentalAuthorizationForDirectServiceConsent({
  jurisdiction = "CZ",
  ageBand = "unknown",
  legalBasis = "consent",
  directInformationSocietyService = true,
} = {}) {
  if (legalBasis !== "consent" || !directInformationSocietyService) return false;

  const threshold = DIRECT_SERVICE_CONSENT_AGE[jurisdiction];
  if (!threshold) return true; // fail closed for unsupported jurisdictions
  if (ageBand === "18_plus") return false;
  if (ageBand === "unknown") return true;

  const maxAge = AGE_BAND_MAX_AGE[ageBand];
  if (maxAge == null) return true;
  return maxAge < threshold;
}

export function isSchoolReviewPurpose(purpose) {
  return [
    "school_mission_review",
    "school_evidence_review",
    "school_reflection_review",
    "school_passport_review",
  ].includes(purpose);
}

export function isKnownProcessingPurpose(purpose) {
  return PROCESSING_PURPOSES.includes(purpose);
}
