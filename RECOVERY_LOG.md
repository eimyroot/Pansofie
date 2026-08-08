# PANSOFIE source recovery

This repository was reconstructed from source fragments copied from the Base44 editor and then completed with the minimum framework glue needed for a standalone React/Vite repository.

## Provenance classes

- **Recovered** — copied from the supplied Base44 source with formatting/escape cleanup only.
- **Recovered + minimal reconstruction** — missing JSX wrappers or obvious paste corruption were repaired conservatively.
- **Scaffolded** — files not available from the Base44 source export (Vite config, Tailwind config, package manifest, reusable glue components, route composition) were created to make the recovered application buildable as an independent repository.

## Security-sensitive source preserved

The recovered auth pages retain Base44 email/password login, Google login, password reset, OTP registration, same-origin `returnTo` validation, and the MCP OAuth consent flow. No access token is stored in Git.

## Known boundary

The MCP OAuth consent page uses Base44-relative `/api/apps/...` endpoints and is expected to work on the Base44 application origin. A separately hosted static frontend may require a backend/proxy arrangement for that route.

## Product data

`src/lib/pansofieData.js` contains demo/sample product data for seven development paths, Labs, missions, projects, members, events, opportunities, conversations and admin views. It is not a production database.

## Recovery principle

Source truth was preserved where available. Product redesign and semantic cleanup should happen in later commits, not be silently mixed into recovery.
