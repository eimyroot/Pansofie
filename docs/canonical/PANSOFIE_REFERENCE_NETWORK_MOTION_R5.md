# PANSOFIE Reference Network Motion R5

## Purpose

R5 makes the public PANSOFIE website match the approved visual interaction reference: a calm but clearly alive network with one central core, six surrounding nodes, explicit active/related/quiet states, physical node re-layout, connected lines, travelling signals and contextual cards below the graph.

This is not a decorative particle layer. Motion must explain relationships and hand-offs.

## Visual contract

Every supported public route receives one shared network stage immediately after its first/hero section.

The stage must contain:

- one central semantic core (`Experience`, `Metoda`, `Pilot`, `Stav`, etc.),
- exactly six route-relevant nodes,
- one selected node rendered as the strongest dark-green state,
- related nodes rendered with restrained green emphasis,
- unrelated nodes visually quiet,
- core-to-node connections,
- selected-node-to-related-node connections,
- a visible travelling signal on active connections,
- physical node movement when selection changes,
- contextual cards: identity, `ZÍSKÁVÁ`, `PŘINÁŠÍ`, `HRANICE`,
- one compact active-flow strip below the cards.

## Interaction contract

Selection can change through:

- click,
- keyboard focus,
- route/section scroll state.

Hover may visually react, but must not independently rotate/re-layout the network.

When selection changes:

1. the selected node moves into the focus slot,
2. the remaining nodes reorganize around the core,
3. relevant connections strengthen,
4. active travelling signals follow the new relationships,
5. detail cards update to the selected node,
6. the persistent route ribbon and ambient route network remain synchronized.

## Whole-site coverage

The shared stage is route-aware for:

- `/`
- `/jak-funguje`
- `/pro-koho`
- `/pilot`
- `/partneri`
- `/program/:id`
- `/zapojit-se`
- `/o-projektu`
- `/soukromi`
- `/bezpecnost`
- `/podminky`

The 404/fallback surface is intentionally excluded from the large graph.

## Mobile

Mobile keeps the same semantic graph but with smaller bounded nodes and stacked detail cards. The large fixed ambient desktop orbit remains hidden at small breakpoints.

The page must not horizontally overflow.

## Accessibility

- nodes are native buttons,
- active state uses `aria-pressed`,
- details update in an `aria-live` region,
- all information remains available without hover,
- `prefers-reduced-motion: reduce` disables decorative animation and transition choreography while preserving graph state and keyboard interaction.

## Truth boundaries

Unchanged from R2-R4:

- Experience remains the central unit,
- Activity != Output != Adoption != Outcome != Impact,
- no human-worth score,
- no child/person profiling,
- no unrestricted adult-child private messaging,
- Partner reviews output against the brief, never human value,
- Passport is private-by-default,
- technical readiness is not evidence of pedagogical or field impact,
- no claim that a real field pilot has run.

## Acceptance

Before merge:

- existing CI must pass,
- R2 public browser regression must pass,
- R3 network regression must pass,
- R4 motion regression must pass,
- R5 browser proof must pass,
- desktop and mobile must have no horizontal page overflow,
- browser proof must assert six nodes on supported routes,
- browser proof must assert real node displacement after selection,
- browser proof must assert related-node/cross-link state,
- browser proof must assert travelling animation when motion is allowed,
- reduced-motion proof must assert travelling animation is disabled,
- screenshots must be visually reviewed.

Production is outside R5.
