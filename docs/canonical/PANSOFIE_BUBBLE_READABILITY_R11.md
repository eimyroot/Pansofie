# PANSOFIE Bubble Readability R11

Status: implementation candidate for public staging.

## Purpose

R11 improves readability of text rendered inside public network bubbles and role relationship surfaces without changing motion behavior.

## Visual contract

- bubble copy stays dark and high-contrast;
- bubble surfaces are near-white and sufficiently opaque over moving or luminous backgrounds;
- semantic color remains an orientation cue through borders, icons, signals and focus rings rather than low-contrast colored body text;
- active bubbles remain readable instead of becoming fully color-filled;
- desktop and mobile typography have explicit minimum sizes;
- the accepted R9 canvas/surface/typography palette remains canonical.

## Scope

R11 styles only the static presentation of:

1. route ribbon bubbles;
2. floating route-orbit labels;
3. Reference Network R5 nodes and related detail surfaces;
4. role relationship map nodes.

## Non-scope

R11 does not change:

- keyframes;
- animation timing or easing;
- transforms or motion paths;
- relationship topology;
- scroll choreography;
- route logic;
- R10 CZ/EN behavior;
- database, auth or Supabase contracts.

## Verification

- `npm run check:bubble-readability-r11` is fail-closed and rejects motion behavior declarations inside the R11 stylesheet;
- the canonical `npm run check` includes R11;
- Playwright validates desktop and mobile rendered font sizes, dark text, near-white surfaces, active-state readability and horizontal overflow;
- browser evidence includes screenshots and computed-style JSON;
- existing R2–R10 browser proofs must remain green before merge.
