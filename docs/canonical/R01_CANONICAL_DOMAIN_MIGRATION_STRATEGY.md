# R0.1 CANONICAL DOMAIN ALIGNMENT — MIGRATION STRATEGY

Status: IMPLEMENTATION BASELINE

## Goal

Align the current repository with PANSOFIE V1.0 without destructively rewriting the existing Supabase auth/profile foundation and without silently reclassifying historical prototype data.

## Strategy

### 1. Preserve legacy prototype catalog byte-for-byte
The original `src/lib/pansofieData.js` blob is copied to `src/lib/pansofieLegacyData.js` unchanged.

### 2. Add a canonical domain layer
`src/lib/pansofieDomain.js` defines the V1.0 canonical:
- 7 development paths,
- 5 Labs,
- 4 Programs,
- public process steps,
- explicit legacy crosswalk metadata.

### 3. Keep existing imports stable
`src/lib/pansofieData.js` becomes a compatibility facade. Existing pages continue importing the same path, but canonical top-level definitions override prototype definitions while all sample missions/projects/events/members remain available.

### 4. Never silently remap ambiguous historical meaning
Examples such as legacy `charakter` and `sport` require review. Their original IDs/data remain available and resolvable. The code exposes possible canonical targets but does not rewrite the record.

### 5. Supabase auth remains untouched
The existing `profiles`, `user_roles`, auth trigger and `is_admin()` function are not dropped or rewritten.

A new additive migration creates canonical Mission/Run/Evidence/Reflection/Experience/Passport tables alongside them.

### 6. Privacy defaults remain restrictive
R0.1 does not invent guardian, school or mentor access before a dedicated consent/organization model exists. Participant Experience data is private to the participant and admin by default.

### 7. CI gets a domain contract gate
The repository verifies canonical counts/IDs and legacy resolvability before the Vite build.

## Explicit non-goals

- no production data import in this slice;
- no destructive SQL;
- no deletion of legacy prototype content;
- no open social/network expansion;
- no guardian/school delegation until its consent model is designed;
- no pricing/impact claims encoded into the product.

## Rollback

The implementation is isolated on `feat/r01-canonical-domain-alignment`.

No production database mutation is performed by creating the SQL migration file. If the code slice is rejected, the branch can be closed without affecting `main` or Supabase.

If the migration is later applied, rollback must be treated separately and must not drop tables containing collected Experience data without an export/evidence plan.
