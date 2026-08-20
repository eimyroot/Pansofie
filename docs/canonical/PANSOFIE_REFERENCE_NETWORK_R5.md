# PANSOFIE Reference Network R5

## Purpose

Implement the public product as a calm but visibly living network following the approved visual reference: one central system node, six surrounding semantic nodes, physical connections, active/related/quiet states, motion that explains relationships, and contextual detail cards beneath the graph.

## Visual contract

- central core remains visually stable
- exactly six surrounding semantic nodes per public route
- semantic nodes keep stable spatial positions so the user never loses orientation
- the role network follows the approved reference geometry: Žák top, Rodina upper-right, Škola lower-right, Partner bottom, Komunita lower-left, Mentor upper-left
- selected node becomes dark green and receives a bounded focus/spring response without relocating the whole graph
- related nodes receive restrained green emphasis
- unrelated nodes recede without disappearing
- core-to-node and selected-to-related-node links reconfigure with selection while staying physically attached to their endpoints
- active links carry a visible travelling signal
- hover may react visually but does not change selection
- click/focus changes selection, active relationships and contextual detail
- contextual cards show ZÍSKÁVÁ / PŘINÁŠÍ / HRANICE
- flow strip explains what currently moves through the selected relationship
- mobile keeps the graph bounded and readable rather than removing the interaction; settled nodes must not overlap

## Whole-site grammar

The same component is route-aware and is mounted after the leading public section on the public product routes. Route semantics define the six nodes, relationships and detail copy while retaining one interaction language.

## Accessibility / performance

- semantic button nodes
- keyboard focus selects a node
- no information requires hover
- prefers-reduced-motion disables decorative/travelling animation while preserving state changes
- SVG links and absolute nodes share one responsive coordinate system
- no canvas/WebGL dependency

## Truth boundaries

Motion demonstrates relationships and process only. It does not imply evidence, adoption, outcome or impact. Existing PANSOFIE privacy, child-safety, role separation and Partner review boundaries remain unchanged.
