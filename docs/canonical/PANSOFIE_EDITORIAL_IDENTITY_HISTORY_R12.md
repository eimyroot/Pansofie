# PANSOFIE EDITORIAL IDENTITY + HISTORY R12

Status: PROPOSED until merged and all browser gates pass.

## Goal

R12 responds to two public-product problems:

1. the public visual system is readable but still too muted and visually generic;
2. `/o-projektu` needs to explain where the name and historical inspiration come from and what sources support that interpretation.

## Visual contract

R12 adds a static editorial layer after R9 and R11:

- strong dark-ink hero fields instead of low-contrast beige-on-beige hierarchy;
- Syne display typography for public H1/H2 headlines;
- higher headline weight and tighter editorial spacing;
- high-contrast cobalt, orange, teal and magenta accents;
- visible 4–8px section identity lines rather than relying on pale tints alone;
- white cards on warm paper with stronger borders and shadows;
- R11 network bubbles remain governed by their readability contract.

R12 must not introduce or change motion behavior. The R12 CSS is fail-closed against `animation`, `transition`, `transform` and `@keyframes` declarations.

## About / historical-source contract

The About page explicitly separates:

1. **historical Comenian inspiration**;
2. **modern scholarship interpreting that history**;
3. **the contemporary Pansofie product and its own canonical constitution**.

The historical framing follows `PANSOFIE_PRODUCT_CONSTITUTION_V1.0.md`:

- Pansofie is inspired by Jan Amos Comenius and pansophic ideas of connected knowledge, universality, harmony and human improvement;
- `OMNES`, `OMNIA`, `OMNINO` are presented only as Pansofie’s working translation of the pansophic frame;
- modern AI, seven development paths, digital portfolios, gamification and current software architecture must not be attributed to Comenius.

The existing R8 truth anchors remain visibly present on the Czech About page. R12 extends them; it does not weaken or rewrite the historical/product boundary.

## Public historical sources

The page names and links four source layers:

1. J. A. Comenius / critical edition of *Pansophia* in *De rerum humanarum emendatione consultatio catholica* — Opera omnia 19/II, Academia 2022, surfaced by Charles University / Karolinum.
2. Dagmar Čapková, *Škola a utváření lidství v pojetí J. A. Komenského* — Pedagogika / Charles University.
3. Lenka Řezníková, *Between History and System. Historical Knowledge in Comenius’ Pansophy* — History – Theory – Criticism / Charles University.
4. `PANSOFIE_PRODUCT_CONSTITUTION_V1.0.md` — current Pansofie product source of truth.

These historical and scholarly sources explain the inspiration. They do not validate the present product’s educational effectiveness; that remains a pilot/evidence question.

## Language contract

`AboutR12.jsx` renders Czech and English explicitly through `LanguageContext` rather than relying on mutation-based translation for newly added historical content.

## Regression contract

R12 must preserve:

- R8 public truth boundaries about Comenius versus the current product;
- R10 CZ/EN behavior;
- R11 bubble readability;
- R3–R6 motion and network semantics;
- no public horizontal overflow at desktop or mobile widths.

## Verification

- `npm run check:editorial-identity-r12`
- `Editorial Identity R12 Browser Proof`
- all existing R2–R11 browser proof workflows remain required before merge.
