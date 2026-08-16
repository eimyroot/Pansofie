// Canonical V1.0 compatibility facade.
//
// The original prototype catalog is preserved byte-for-byte in
// `pansofieLegacyData.js`. Existing mission/project/event/member IDs therefore
// keep working while new public/domain definitions come from
// `pansofieDomain.js`.
//
// Do not silently rewrite legacy IDs. Use the explicit crosswalk helpers from
// `pansofieDomain.js` and require manual review for ambiguous mappings.

export * from "./pansofieLegacyData";

export {
  CANONICAL_DOMAIN_VERSION,
  PATHS,
  LEGACY_PATHS,
  LABS,
  LEGACY_LABS,
  PROGRAMS,
  LEGACY_PROGRAMS,
  PROCESS_STEPS,
  getPath,
  getLab,
  getProgram,
  getCanonicalPathTargets,
  getCanonicalLabTargets,
  getCanonicalProgramTargets,
  requiresManualPathMigration,
  requiresManualLabMigration,
} from "./pansofieDomain";
