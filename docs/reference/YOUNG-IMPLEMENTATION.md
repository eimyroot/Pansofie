# Young implementation summary

The authenticated Young routes now use dedicated visual shells instead of the generic `ExperienceShell`.

- `/young/kids` → `KidsShell` + Kids-specific page composition
- `/young/teens` → `TeensShell` + Teens-specific page composition

Both layouts retain `requireUserContext(expectedExperience)`, so the presentation refactor does not alter the existing authorization boundary.

The public `/young` age labels are aligned to 6–13 and 14–20.
