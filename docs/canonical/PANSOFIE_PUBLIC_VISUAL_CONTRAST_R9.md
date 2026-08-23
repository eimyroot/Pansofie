# PANSOFIE Public Visual Contrast R9

Status: PROPOSED FOR REVIEW
Date: 2026-08-23

## Problem

The public website is visually coherent but too close in luminance across canvas, muted surfaces, cards and borders. The result is low perceived hierarchy: sections merge, secondary text becomes tiring to read and pale semantic colors compete instead of orienting the reader.

## Decision

Introduce one static presentation layer, `src/public-visual-r9.css`, loaded after the existing visual/motion styles.

R9 changes only static presentation:

- stronger canvas / white-surface separation;
- darker body and muted copy;
- stronger card and section boundaries;
- clearly separated primary / secondary actions;
- more readable status pills and form controls;
- four section accent colors used for static text hierarchy and separators;
- lightly accent-tinted static panels while preserving the motion graph palette and behavior;
- a dark footer as a deliberate end-state of the public journey;
- desktop and mobile readability improvements.

## Palette

- Canvas: `#EBE7DC`
- Surface: `#FFFFFF`
- Ink: `#14211B`
- Body copy: `#253A31`
- Muted copy: `#465950`
- Primary action: `#0B5D49`
- Blue accent: `#174D7A`
- Amber accent: `#9B5B00`
- Coral accent: `#A84232`
- Violet accent: `#65449A`
- Footer: `#17241E`

The palette is intentionally stronger than R8: cards must visibly separate from the canvas, secondary copy must stay readable, and section changes must be perceivable without turning PANSOFIE into a dashboard or neon product.

## Accessibility gate

`check:public-visual-r9` calculates contrast ratios for the canonical foreground/background pairs and requires at least WCAG AA for normal text. Core body text pairs target AAA where practical.

## Motion preservation boundary

R9 MUST NOT change animation or network-visualization behavior.

The R9 stylesheet therefore contains:

- no `@keyframes`;
- no selectors for `ReferenceNetworkStage` nodes;
- no route-network ribbon selectors;
- no cursor/sweep motion selectors;
- no travelling-signal selectors.

Existing files such as `living-network.css`, `living-motion-r4.css`, `living-motion-r4-extensions.css`, `reference-network-r5*.css` and `luminous-network-r6.css` remain untouched by this slice.

## Non-goals

- no motion redesign;
- no information-architecture rewrite;
- no content/copy rewrite;
- no database, auth or Supabase change;
- no dependency change;
- no claim that visual polish changes learning outcomes.

## Acceptance

R9 may merge only when:

1. full `npm run check` passes;
2. `check:public-visual-r9` passes;
3. existing desktop/mobile browser-proof workflows stay green;
4. Vercel preview is READY;
5. diff confirms no motion-graphic source file was modified;
6. screenshot review shows materially clearer hierarchy without clipping or horizontal overflow.

## Rollback

Remove the `public-visual-r9.css` import and the R9 stylesheet/check/document. No data or schema rollback is required.
