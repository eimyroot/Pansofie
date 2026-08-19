# PANSOFIE Living Motion R4

## Purpose

R4 turns the public Pansofie surface from a mostly static interface with decorative motion into a visibly living system. Motion must explain relationships, sequence, hand-off, active context or user focus.

R4 does **not** change evidence, privacy, pilot, data, auth or impact semantics.

## Motion principles

1. Motion is semantic, not decorative noise.
2. The active relationship is strongest; related relationships remain secondary; unrelated relationships stay quiet.
3. Scroll changes the active system context and section state.
4. A visible signal may travel only along a real process or relationship shown by the product.
5. Role switching may reorganize the graph, but must not imply hidden scoring or stronger access rights.
6. Experience autoplay demonstrates process only; it never claims that field activity, Outcome or Impact happened.
7. User interaction overrides autoplay immediately.
8. Every autoplay surface has a pause control.
9. `prefers-reduced-motion: reduce` disables decorative motion and autoplay.
10. Mobile deliberately reduces ambient motion and must remain overflow-free.

## R4 system surfaces

### Whole-site scroll choreography

Every public `main > section` participates in a common motion state:

- `pending`
- `active`
- `passed`

The active section updates the route network focus. Sections enter with bounded depth/opacity motion and return to a stable readable state.

### Travelling network signal

The desktop route constellation contains a visible signal travelling from the route core to the currently active node. The signal changes when scroll or direct network navigation changes active context.

### Homepage immediate motion

The first Experience card visibly sequences its six steps so the public homepage communicates motion before the first user scroll.

### Living Experience Flow

The six-step Experience flow can autoplay while it is visible:

`Potřeba → Akce → Důkaz → Reflexe → Ověření → Experience Passport`

- active step changes visibly
- progress signal travels through the rail
- user hover/focus/click stops autoplay and takes control
- explicit pause/resume control is available
- reduced-motion disables autoplay

The evidence boundary remains explicit:

`Aktivita ≠ výstup ≠ outcome ≠ impact.`

### Morphing role constellation

The dedicated `/pro-koho` page adds a six-role constellation around `Experience`:

- Žák
- Rodina
- Škola
- Mentor
- Partner
- Komunita

When a role becomes active, the graph physically reorganizes so the selected role becomes the focus position. Links recompute with the moving nodes and a visible signal travels on the active relationship.

The summary keeps three semantic layers separate:

`role contribution → Experience → role value`

A trust boundary remains visible for the selected role.

## Safety and truth boundaries

Unchanged from R2/R3:

- no human-worth score
- no child/person profiling
- no unrestricted adult-child private messaging
- Experience remains the central system unit
- Passport stays private-by-default
- Partner reviews bounded output against the brief, never human value
- technical readiness is not proof of pedagogical or field Impact
- real field pilot has not run
- willingness-to-pay is not proven
- pedagogical/long-term Impact is not proven

## Acceptance gates

Before merge:

- complete existing CI passes
- Public Delivery R2 browser regression passes
- Visual Interaction R3 browser regression passes
- Living Motion R4 browser proof passes
- R4 desktop travelling signal is present
- scroll changes section motion state and network focus
- Experience autoplay advances visibly and can be paused
- role constellation physically changes position when a different role is selected
- desktop and mobile remain free of horizontal page overflow
- reduced-motion disables autoplay and decorative R4 motion
- exact-head Vercel preview succeeds when platform capacity allows

## Deployment boundary

R4 is a frontend public-UX slice. No production authorization is included. Merge to `main` requires expected-head verification after all available gates pass. Production remains a separate explicit decision.
