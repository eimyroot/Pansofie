# Pansofie Young — implementation status

## Canonical age split

- `young_kids`: 6–13
- `young_teens`: 14–20
- adult experiences: 21+

## Architecture

Young experiences are separate UX layers inside one Next.js application. Authentication and authorization remain server-side and database-enforced.

Protected routes:

- `/young/kids`
- `/young/teens`

Both routes call `requireUserContext(expectedExperience)` from their server layouts before rendering their dedicated shell.

## Dedicated UX shells

- `src/components/experiences/KidsShell.jsx`
- `src/components/experiences/TeensShell.jsx`

These shells provide separate navigation, footer, page framing, typography and visual behavior. They do not grant permissions.

## Visual reference implementation

### Young Kids 6–13

Implemented structure:

1. dedicated Young navigation
2. illustrated hero
3. four discovery benefits
4. `Co tu najdeš?` topic cards
5. `Vyzkoušej si!` activity cards
6. `Téma týdne` article cards
7. community CTA banner
8. dedicated footer
9. responsive desktop/tablet/mobile behavior

### Young Teens 14–20

Implemented structure:

1. dedicated Young Teens navigation
2. photographic/editorial hero
3. four benefit points
4. `Co tu řešíme?` topics
5. `Co právě letí?` editorial cards
6. `Zapoj se!` action formats
7. community CTA banner
8. dedicated footer
9. responsive desktop/tablet/mobile behavior

## Assets

The exact individual WebP files shown in the supplied visual asset-pack screenshot are not currently tracked in the GitHub repository. The implementation therefore uses existing repository-owned Pansofie assets as a safe fallback. No external hotlinks or untracked binary dependencies were introduced.

When the final individual asset files are added to the repository, page arrays can be switched to the canonical paths without changing the page architecture.

## Security boundary

This work does **not** change:

- Supabase migrations
- RLS policies
- onboarding RPC
- experience resolver rules
- membership logic
- guardian relationship logic

`Experience` remains a UX selection, not an authorization mechanism.
