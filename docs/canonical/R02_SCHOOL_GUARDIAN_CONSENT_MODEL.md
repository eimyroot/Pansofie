# R0.2 SCHOOL / GUARDIAN / CONSENT MODEL

Status: IMPLEMENTATION BASELINE  
Stacked on: `feat/r01-canonical-domain-alignment`

## Goal

Allow PANSOFIE SCHOOL to represent schools, learners, teachers, verified guardian relationships and purpose-specific access without destructively changing the existing Supabase auth/profile foundation.

This slice is intentionally more restrictive than the final product. It creates the trust boundary first; self-service invitations and richer delegation can be added later.

## Legal-design rule

Do **not** model child privacy as one global `parent_consent = true` flag.

GDPR Article 8 applies where consent is the legal basis for an information-society service offered directly to a child. The Czech adaptation sets the age threshold at 15 for that specific context. This does not mean every school processing purpose must use consent.

Therefore PANSOFIE stores a purpose-specific processing record with:
- subject,
- organization context,
- purpose,
- legal basis,
- controller scope,
- policy version,
- consent actor/evidence only when consent is actually the basis,
- lifecycle state and audit events.

Official reference baseline used for this design:
- GDPR Article 8: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- Czech DPA (ÚOOÚ) basic guide noting age 15 under Act No. 110/2019: https://uoou.gov.cz/index.php/verejnost/zakladni-prirucka-k-ochrane-udaju
- EDPB children guidance: https://www.edpb.europa.eu/topics/key-gdpr-concepts/children_en

This repository design is not a substitute for a controller-specific legal assessment/DPIA before production school rollout.

## Data model

### Existing foundation — preserved
- `auth.users`
- `profiles`
- `user_roles`
- `is_admin()`
- R0.1 Mission → Run → Evidence → Reflection → Experience → Passport model

### New R0.2 tables

#### `organizations`
Delivery context such as school, municipality, NGO, community or company.

#### `organization_memberships`
Scoped role inside an organization. This is separate from global `user_roles`.

Canonical organization roles:
- learner
- teacher
- coordinator
- mentor
- staff

#### `guardian_relationships`
Verified relationship metadata between child and guardian/caregiver.

**Important:** a guardian relationship alone grants no access to Experience content.

#### `age_assurance_records`
Coarse age-band assurance. Exact date of birth is intentionally not added because R0.2 does not need it.

#### `processing_basis_records`
Purpose-specific legal/processing basis. Supported initial purposes:
- core account,
- school program participation,
- school mission assignment,
- school mission review,
- school evidence review,
- school reflection review,
- school Passport review,
- guardian Passport view.

Reflection is separate from evidence: authorizing evidence review does not automatically expose private reflection.

#### `processing_basis_events`
Automatic audit trail of basis creation/state changes.

#### `experience_reviews`
Independent review record. Teachers do not mutate learner evidence/reflection to mark it verified.

## Access invariants

### Learner
Keeps existing own-data access from R0.1.

### Teacher / coordinator
Can only access a learner's school-context data when all are true:
1. teacher/coordinator has active membership in the organization;
2. learner has active `learner` membership in the same organization;
3. Mission Run is bound to that organization;
4. an active processing-basis record exists for the exact purpose.

### Guardian
Can only view completed Experience/Passport data when all are true:
1. guardian relationship is `verified`;
2. an active `guardian_passport_view` processing record exists.

R0.2 deliberately does **not** grant guardian access to raw evidence or private reflection.

### Admin
Admin retains operational access under the existing global authorization model. This must later be paired with operational logging and least-privilege administrative procedures.

## Czech age rule implementation

`src/lib/pansofieAccess.js` records `CZ: 15` only as a rule for:

`legal_basis = consent` + `direct information-society service to child`.

It explicitly fails closed for unsupported jurisdictions and returns `false` when another lawful basis is being modelled. This prevents the Czech Article 8 rule from silently becoming a universal school-processing rule.

## Privacy-by-design choices

- no exact birth date in R0.2;
- no public child profile introduced;
- no adult-child messaging expansion;
- no automatic guardian visibility;
- no combined child score;
- no emotion recognition;
- no hidden profiling;
- reflection access is a separate purpose;
- teacher verification is stored separately from learner-authored content;
- browser clients cannot create legal-basis or verified guardian records in R0.2.

## Database deployment

The migration file is additive and code-reviewed in Git first.

Creating/merging this PR does **not** mean the SQL has been applied to the live Supabase project. Production application requires a separate authorized deployment step with:
1. backup/export evidence,
2. exact migration hash,
3. environment identity check,
4. post-migration schema/RLS verification,
5. rollback/incident plan.

## Next slice after R0.2

R0.3 should implement the first real governed flow:

`Teacher assigns Mission → learner starts → learner adds Evidence → learner reflects → teacher reviews permitted scope → Experience is completed → Passport entry is created`

No social feed or open matching is required for that pilot loop.
