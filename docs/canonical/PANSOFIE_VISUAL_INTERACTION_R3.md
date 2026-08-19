# PANSOFIE Visual / Interaction R3

## Purpose

R3 increases visual depth, motion and interactivity without turning Pansofie into a decorative demo. Motion must explain state, flow, role boundaries or next action.

## Design rules

1. Experience remains the central system unit.
2. Motion is semantic: progress, handoff, selected role, verification and access boundary.
3. Glow is restrained and state-aware; it highlights active structure instead of filling whole pages with neon.
4. Role colors remain orientation cues only.
5. No animation may imply proof, outcome or impact that does not exist.
6. `prefers-reduced-motion: reduce` must disable decorative animation and shorten transitions.
7. Mobile must preserve the same information architecture without horizontal page overflow.
8. Existing safety/privacy boundaries remain unchanged.

## R3 interaction surfaces

### Living Experience Flow

The public Experience story becomes directly explorable. A user can hover, focus or click each step:

`Potřeba → Akce → Důkaz → Reflexe → Ověření → Experience Passport`

The active step exposes its specific meaning while the progress rail shows position in the workflow. The component explicitly retains the product truth boundary:

`Aktivita ≠ výstup ≠ outcome ≠ impact.`

### Role Relationship Map

The six-role explorer now visualizes the selected role as a live relationship:

`Role contribution → EXPERIENCE → role value`

A separate trust boundary remains visible under the relationship map. Switching role changes the contribution, value and boundary while preserving the full role detail surface below.

### Ambient / micro motion language

- restrained ambient hero glow
- active-state glow on Experience and selected role
- signal travel only on real process relationships
- hover depth on high-value interactive surfaces
- CTA light sweep and stronger press/hover feedback
- keyed role-panel transition when the selected role changes

No new heavy animation runtime is introduced in R3. The first implementation uses React state and CSS animation/transitions to keep bundle and runtime risk bounded.

## Acceptance gates

- existing public product contracts still pass
- existing Public Delivery R2 browser proof still passes
- Visual Interaction R3 browser proof passes
- desktop and mobile have no horizontal page overflow
- role selection remains keyboard focusable and exposes `aria-pressed`
- Experience steps expose `aria-current="step"`
- reduced-motion browser context receives effectively disabled decorative animation
- Partner boundary still states that Partner reviews the output against the brief, never human value
- no new claim of field adoption, pedagogical outcome or impact

## Deployment boundary

R3 is developed on a feature branch and must not reach `main` until exact-head CI/browser/Vercel preview evidence is successful. Production remains outside this slice.
