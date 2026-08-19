# PANSOFIE Visual / Interaction R3

## Purpose

R3 increases visual depth, motion and interactivity without turning Pansofie into a decorative demo. Motion must explain state, flow, role boundaries or next action.

The public product should feel like one living connected system rather than a collection of unrelated pages. The network is therefore a shared interaction language across the whole public web, while content, trust boundaries and calls to action remain visually dominant.

## Design rules

1. Experience remains the central system unit.
2. Motion is semantic: progress, handoff, selected role, verification and access boundary.
3. Glow is restrained and state-aware; it highlights active structure instead of filling whole pages with neon.
4. Role colors remain orientation cues only.
5. No animation may imply proof, outcome or impact that does not exist.
6. `prefers-reduced-motion: reduce` must disable decorative animation and shorten transitions.
7. Mobile must preserve the same information architecture without horizontal page overflow.
8. Existing safety/privacy boundaries remain unchanged.
9. Text, controls and factual status always sit above the ambient network layer.
10. The network never captures pointer interaction unless a node is intentionally an interactive control.
11. Secondary relationships fade back; only the current route, section or selected role receives strong emphasis.
12. Internal member/admin workspaces are not decorated by the public network layer in this slice.

## Whole-site Living Network

`PublicNetworkShell` wraps the public product routes and gives them one coherent connected state model.

### Route-aware network

Each public route has one semantic core and six bounded nodes. Examples:

- Home: `Experience → Potřeba / Akce / Důkaz / Reflexe / Ověření / Passport`
- Jak to funguje: `Metoda → Potřeba / Akce / Důkaz / Reflexe / Ověření / Transfer`
- Pro koho: `Experience → Žák / Rodina / Škola / Mentor / Partner / Komunita`
- Pilot: `Pilot → Škola / Experience / Žák / Rodina / Důkaz / Ověření`
- Partner: `Experience → Challenge / Výstup / Review / Rozhodnutí / Outcome / Hranice`
- Stav produktu: `Stav → Implementace / Testování / Pilot / Outcome / Impact / Další krok`
- Soukromí, bezpečnost a podmínky receive their own trust-oriented node sets.

The network describes the page; it does not make new product claims.

### Persistent route ribbon

A compact route ribbon sits below the public navigation. It:

- exposes the six semantic nodes of the current page,
- highlights the node that best matches the currently visible section,
- lets the user activate a node and move to the corresponding page section,
- uses travelling signal dots only to indicate a relationship, never success or impact.

### Ambient orbit

Desktop receives a restrained ambient SVG orbit with one central core and six connected nodes. The active route/section relationship gets the strongest line. The graph reacts slightly to pointer position and has slow bounded drift.

The orbit is decorative/structural only:

- `pointer-events: none`,
- low opacity,
- behind content,
- removed on small mobile layouts,
- disabled as motion under reduced-motion preference.

### Scroll network state

An IntersectionObserver maps visible public sections to the six semantic nodes. A subtle edge rail additionally indicates page progress. This creates continuity between scroll position, route meaning and network state without turning scrolling into a forced animation sequence.

### Navigation + footer continuity

- The public navigation exposes the active route as a network state rather than an unrelated menu hover.
- The footer closes the system with the factual sequence:
  `Experience → Důkaz → Ověření → Důvěra → Další krok`.
- The existing truth statement that technical readiness is not proof of impact remains unchanged.

## Local interaction surfaces

### Living Experience Flow

The public Experience story is directly explorable. A user can hover, focus or click each step:

`Potřeba → Akce → Důkaz → Reflexe → Ověření → Experience Passport`

The active step exposes its specific meaning while the progress rail shows position in the workflow. The component explicitly retains the product truth boundary:

`Aktivita ≠ výstup ≠ outcome ≠ impact.`

### Role Relationship Map

The six-role explorer visualizes the selected role as a live relationship:

`Role contribution → EXPERIENCE → role value`

A separate trust boundary remains visible under the relationship map. Switching role changes the contribution, value and boundary while preserving the full role detail surface below.

### Ambient / micro motion language

- restrained ambient hero glow
- active-state glow on Experience and selected role
- signal travel only on real process relationships
- hover depth on high-value interactive surfaces
- CTA light sweep and stronger press/hover feedback
- keyed role-panel transition when the selected role changes
- route-aware cursor light field on pointer-capable public views
- section boundary nodes linking the long-form public narrative

No new heavy animation runtime is introduced in R3. The implementation uses React state, IntersectionObserver, SVG and CSS animation/transitions to keep bundle and runtime risk bounded.

## Clarity constraints

The living network is successful only if it increases comprehension.

- Active relationship: strongest line/glow.
- Related relationship: visible but secondary.
- Unrelated relationship: low-opacity or absent.
- Copy remains readable without animation.
- CTA hierarchy remains unchanged.
- Mobile removes the large ambient orbit and keeps the compact semantic ribbon.
- No horizontal page overflow is acceptable.
- The role map and Experience lifecycle must stay bounded to their content container.
- Keyboard focus and native button semantics remain intact.

## Acceptance gates

- existing public product contracts still pass
- existing Public Delivery R2 browser proof still passes
- Visual Interaction R3 browser proof passes
- whole-site network shell is present on the public product/info routes
- desktop and mobile route ribbon exposes exactly six bounded semantic nodes
- homepage, method, roles, pilot, partner, status, join, privacy, safety and terms routes have no horizontal page overflow at 1440×1100 or 390×844
- role selection remains keyboard focusable and exposes `aria-pressed`
- Experience steps expose `aria-current="step"`
- reduced-motion browser context receives effectively disabled decorative animation
- large ambient route orbit is removed from mobile layout
- Partner boundary still states that Partner reviews the output against the brief, never human value
- no new claim of field adoption, pedagogical outcome or impact
- exact-head Vercel preview must succeed before merge

## Deployment boundary

R3 is developed on a feature branch and must not reach `main` until exact-head CI, R2 regression browser proof, R3 browser proof, Vercel preview and screenshot review are successful. Production remains outside this slice.
