# Staging School Assignable Learners R1

## Observed browser blocker

The real authenticated teacher session reached `/skola`, loaded its school membership, and then could not resolve the learner display name required by the assignment selector.

The generic `profiles` RLS intentionally remains own/admin only. The fix does not broaden that policy.

## Fix

`pansofie_list_assignable_school_learners(uuid[])` is a purpose-scoped SECURITY DEFINER business RPC that returns only the minimum assignment-directory fields for active learners when:

1. the caller is an active teacher/coordinator in the requested organization;
2. the target is an active learner in that organization; and
3. an active `school_mission_assignment` processing basis exists for that learner and organization.

Anonymous execution is revoked. Authenticated execution is granted only for the governed application path.

## Boundary

No production deployment or production database change is authorized by this evidence note. The staging database was updated first to unblock the authenticated staging acceptance gate.
