import { supabase } from "@/api/supabaseClient";

const rpc = async (name, args = {}, label = name) => {
  const result = await supabase.rpc(name, args);
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
  return result.data;
};

export const QUALITY_DIMENSIONS = Object.freeze([
  ["educational_fit", "Vzdělávací smysl"],
  ["age_fit", "Věková vhodnost"],
  ["scope", "Rozsah"],
  ["data_privacy", "Data / soukromí"],
  ["safeguarding", "Safeguarding"],
  ["ip", "IP / vlastnictví"],
  ["deliverable", "Výstup"],
  ["feedback_plan", "Feedback plán"],
  ["adoption_possibility", "Možnost adopce"],
]);

export const QUALITY_STATES = Object.freeze(["PASS", "NEEDS_WORK", "BLOCKED", "NOT_APPLICABLE"]);
export const ADOPTION_DECISIONS = Object.freeze(["not_adopt", "explore_further", "pilot"]);

export async function listMyPartnerOrganizations() {
  return (await rpc("pansofie_list_my_partner_organizations", {}, "Partner organization load failed")) || [];
}

export async function listMyPartnerChallenges() {
  return (await rpc("pansofie_list_my_partner_challenges", {}, "Partner Challenge load failed")) || [];
}

export async function createPartnerChallenge({ organizationId, title, problemStatement, beneficiary, desiredOutput, feedbackCommitment }) {
  return rpc("pansofie_partner_create_challenge", {
    target_org_id: organizationId,
    target_title: title,
    target_problem_statement: problemStatement,
    target_beneficiary: beneficiary,
    target_desired_output: desiredOutput,
    target_feedback_commitment: feedbackCommitment,
  }, "Challenge creation failed");
}

export async function updatePartnerChallenge(challenge) {
  return rpc("pansofie_partner_update_challenge", {
    target_challenge_id: challenge.challengeId,
    target_title: challenge.title,
    target_problem_statement: challenge.problemStatement,
    target_beneficiary: challenge.beneficiary,
    target_context: challenge.context || null,
    target_desired_output: challenge.desiredOutput,
    target_available_resources: challenge.availableResources || null,
    target_data_requirements: challenge.dataRequirements || null,
    target_age_min: challenge.ageMin === "" || challenge.ageMin == null ? null : Number(challenge.ageMin),
    target_age_max: challenge.ageMax === "" || challenge.ageMax == null ? null : Number(challenge.ageMax),
    target_timeframe: challenge.timeframe || null,
    target_ip_expectations: challenge.ipExpectations || null,
    target_safety_notes: challenge.safetyNotes || null,
    target_feedback_commitment: challenge.feedbackCommitment,
    target_adoption_possibility: challenge.adoptionPossibility || null,
  }, "Challenge update failed");
}

export async function submitPartnerChallenge(challengeId) {
  return rpc("pansofie_partner_submit_challenge", { target_challenge_id: challengeId }, "Challenge submission failed");
}

export async function listSchoolChallengeAssignments(organizationIds) {
  if (!organizationIds?.length) return [];
  return (await rpc("pansofie_list_school_challenge_assignments", { target_org_ids: organizationIds }, "School Challenge inbox load failed")) || [];
}

export async function acceptSchoolChallengeAssignment(assignmentId) {
  return rpc("pansofie_school_accept_challenge_assignment", { target_assignment_id: assignmentId }, "Challenge acceptance failed");
}

export async function declineSchoolChallengeAssignment(assignmentId, note = "") {
  return rpc("pansofie_school_decline_challenge_assignment", { target_assignment_id: assignmentId, target_note: note || null }, "Challenge decline failed");
}

export async function adminListPartnerOrganizations() {
  return (await rpc("pansofie_admin_list_partner_organizations", {}, "Partner organization admin load failed")) || [];
}

export async function adminRegisterPartnerOrganization({ slug, name, organizationType, contactEmail }) {
  return rpc("pansofie_admin_register_partner_organization", {
    target_slug: slug,
    target_name: name,
    target_organization_type: organizationType,
    target_contact_email: contactEmail,
  }, "Partner organization registration failed");
}

export async function adminSetPartnerVerification(organizationId, status, note = "") {
  return rpc("pansofie_admin_set_partner_verification", {
    target_org_id: organizationId,
    target_status: status,
    target_note: note || null,
  }, "Partner verification update failed");
}

export async function adminListPartnerChallenges() {
  return (await rpc("pansofie_admin_list_partner_challenges", {}, "Challenge admin queue load failed")) || [];
}

export async function adminGetPartnerChallenge(challengeId) {
  const rows = (await rpc("pansofie_admin_get_partner_challenge", { target_challenge_id: challengeId }, "Challenge detail load failed")) || [];
  return rows[0] || null;
}

export async function adminScreenPartnerChallenge({ challengeId, decision, dimensions, note = "" }) {
  return rpc("pansofie_admin_screen_partner_challenge", {
    target_challenge_id: challengeId,
    target_decision: decision,
    target_dimensions: dimensions,
    target_note: note || null,
  }, "Challenge Quality Gate save failed");
}

export async function adminListChallengeAssignmentCandidates() {
  return (await rpc("pansofie_admin_list_challenge_assignment_candidates", {}, "Challenge assignment candidates load failed")) || [];
}

export async function adminProposeChallengeAssignment({ challengeId, schoolOrganizationId, cohortId, teamId }) {
  return rpc("pansofie_admin_propose_challenge_assignment", {
    target_challenge_id: challengeId,
    target_school_org_id: schoolOrganizationId,
    target_cohort_id: cohortId,
    target_team_id: teamId,
  }, "Managed Challenge assignment failed");
}

// R5 — bounded Partner output / review / adoption / outcome.
export async function submitSchoolChallengeDeliverable({ assignmentId, title, summary, kind = "other", uri = "" }) {
  return rpc("pansofie_school_submit_challenge_deliverable", {
    target_assignment_id: assignmentId,
    target_title: title,
    target_summary: summary,
    target_kind: kind,
    target_uri: uri || null,
  }, "Bounded Partner deliverable submission failed");
}

export async function listMyPartnerDeliverables() {
  return (await rpc("pansofie_list_my_partner_deliverables", {}, "Partner deliverable load failed")) || [];
}

export async function reviewPartnerDeliverable({ deliverableId, addressedBrief, usefulText, changesNeeded = "", decision, decisionNote = "" }) {
  return rpc("pansofie_partner_review_deliverable", {
    target_deliverable_id: deliverableId,
    target_addressed_brief: addressedBrief,
    target_useful_text: usefulText,
    target_changes_needed: changesNeeded || null,
    target_decision: decision,
    target_decision_note: decisionNote || null,
  }, "Partner output review failed");
}

export async function reportPartnerOutcome({ adoptionDecisionId, whatChanged, beneficiary, observedOn, sourceText, evidenceUri = "" }) {
  return rpc("pansofie_partner_report_outcome", {
    target_adoption_decision_id: adoptionDecisionId,
    target_what_changed: whatChanged,
    target_beneficiary: beneficiary,
    target_observed_on: observedOn,
    target_source_text: sourceText,
    target_evidence_uri: evidenceUri || null,
  }, "Outcome evidence report failed");
}

export async function listSchoolChallengeOutcomes(organizationIds) {
  if (!organizationIds?.length) return [];
  return (await rpc("pansofie_list_school_challenge_outcomes", { target_org_ids: organizationIds }, "School R5 outcome load failed")) || [];
}
