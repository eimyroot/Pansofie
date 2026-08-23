# PANSOFIE Public i18n R10 — CZ / EN

Status: PROPOSED FOR REVIEW
Date: 2026-08-23

## Goal

Every public and authentication surface of PANSOFIE must be usable in Czech and English without maintaining duplicate page trees.

## Decision

R10 adds one shared bilingual presentation layer:

- Czech (`cs`) remains the canonical first-load language;
- English (`en`) is selected explicitly through the CZ / EN switcher or `?lang=en`;
- the selected locale persists in `localStorage` under `pansofie.locale`;
- the active locale updates `<html lang>`;
- the URL receives `?lang=cs|en` so a language state can be shared;
- public/auth React surfaces are translated through one `PublicLocaleBoundary` backed by one canonical exact-string catalog;
- dynamic React content and accessible attributes (`aria-label`, `placeholder`, `title`, `alt`) are covered through a bounded `MutationObserver`;
- source Czech content remains unchanged and can always be restored when switching back to CZ.

## Scope

R10 covers:

- `/`
- `/jak-funguje`
- `/pansofiego`
- `/pro-koho`
- `/pilot`
- `/partneri`
- `/program/:id`
- `/o-projektu`
- `/zapojit-se`
- `/soukromi`
- `/bezpecnost`
- `/podminky`
- public 404
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/admin/login`

Authenticated School / Family / Partner / Admin workspaces remain outside R10. They require a separate complete product-language pass rather than a partial translation.

## Source of truth

- `src/lib/LanguageContext.jsx` — locale state, persistence, URL and `html[lang]`;
- `src/lib/publicTranslations.js` — canonical Czech → English public-copy catalog;
- `src/components/pansofie/PublicLocaleBoundary.jsx` — bounded runtime projection;
- `src/components/pansofie/LanguageToggle.jsx` — visible language control.

No machine translation service is called at runtime.

## Why no duplicate `/en/*` page tree

Duplicating every React page would create content drift between Czech and English variants. R10 instead keeps one product structure and one translation catalog so layout, safety copy, maturity claims and interaction logic remain synchronized.

## Safety and truth boundaries

- translation must preserve R8 human-first wording and factual maturity boundaries;
- English must not introduce claims absent from Czech;
- proper historical names may remain Czech where appropriate;
- motion/network behavior is not redesigned by R10;
- no database, Auth, Supabase or dependency change;
- no automatic browser-language switch on first visit: Czech remains canonical unless the visitor explicitly requests English.

## Verification

`check:public-i18n-r10` verifies the architecture and minimum catalog coverage.

`Public i18n R10 Browser Proof` visits the public/auth route set in English on desktop and mobile and requires:

1. successful HTTP response;
2. `html[lang] = en`;
3. no horizontal overflow;
4. no rendered Czech text with Czech diacritics, except explicit proper-name allowlist;
5. working EN → CZ → EN switch;
6. locale persistence across navigation;
7. screenshot evidence for the English homepage.

Existing R2–R9 browser gates must remain green in Czech.

## Rollback

Remove the R10 provider/boundary/toggle/catalog and restore the previous `App.jsx` / `PublicNav.jsx`. No data or schema rollback is required.
