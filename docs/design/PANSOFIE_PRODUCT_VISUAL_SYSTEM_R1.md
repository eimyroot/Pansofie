# PANSOFIE PRODUCT VISUAL SYSTEM R1

Status: implementation contract for PANSOFIEDIT Professional Product Polish R1.

## Product principle

PANSOFIE should feel simpler than the ecosystem complexity it safely orchestrates.

> UX decides what the person should understand or do next. UI makes that next step unmistakable.

The visual system is not a new product ontology and does not change authorization, safety, Experience or field-pilot rules.

## Color architecture

### Brand / Experience

- warm canvas: `#F8F7F3`
- deep ink: `#17201C`
- primary forest: `#176149`
- primary strong: `#0F4937`
- Experience accent: `#1F7A61`

Brand green is not reused as the universal status color.

### Role orientation

Role colors are bounded orientation cues used for icon discs, role chips, selected-role borders and small map highlights. They must not become full-page themes.

- learner `#4B5E9A`
- school `#315B7D`
- family `#8A5A44`
- partner `#8A6416`
- community `#2E6D68`
- mentor `#67548C`

### Semantic states

- ready/success `#1E6F52`
- waiting/attention `#8B5E13`
- danger/blocked `#A63A32`
- information `#2E5F95`

Status meaning must always be paired with text/icon and never depend on color alone.

## Workspace hierarchy

Authenticated School, Family and future Partner workspaces should progressively follow:

1. context / role,
2. `CO JE TEĎ NA MNĚ?`,
3. one primary next action,
4. lifecycle/state,
5. supporting detail,
6. safety/privacy boundary where consequential.

This is the preferred `Next Action Engine` presentation pattern.

## CTA hierarchy

- `.action-primary` — one primary action per decision context,
- `.action-secondary` — bounded alternative,
- `.action-quiet` — tertiary/navigation action.

Destructive, safety, authorization and consent actions must never look equivalent to normal continuation.

## Surface grammar

- `.surface-raised`
- `.surface-panel`
- `.surface-subtle`
- `.next-action-card`
- `.status-pill`
- `.role-chip`
- `.role-icon`

Avoid nested card-on-card-on-card layouts unless the nesting has a functional meaning.

## Typography

- Fraunces: public storytelling and major editorial headings.
- Plus Jakarta Sans: authenticated product, operational UI, forms and controls.
- Operational product should read as a modern work tool, not an edtech campaign page.

## Accessibility

- global visible focus ring,
- reduced-motion fallback,
- no essential information on hover only,
- status/role meaning not color-only,
- primary touch controls target approximately 44px height,
- mobile first viewport should expose context + next action without horizontal scrolling.

## Non-goals

- no rainbow dashboard,
- no gamified badge explosion,
- no neon/glass aesthetic,
- no six full role themes,
- no analytics wall for learners/families,
- no change to data access or governance from appearance alone.

## Truth boundary

This document governs the R1 visual implementation only. It does not establish field-pilot outcomes, willingness-to-pay, production readiness or Partner/Challenge runtime completion.
