# Pansofie art direction audit

Date: 2026-09-17
Scope: public PANSOFIE, public PANSOFIE YOUNG, PANSOFIE GO staging board slice

## Verdict

The current UI is technically organized, but the visual asset layer is not yet good enough to call board-faithful.

The main problem is not the number of images. The problem is semantic ownership:

- PANSOFIE adult, PANSOFIE YOUNG and PANSOFIE GO share content, but they must not visually collapse into one generic green image pool.
- Several public cards still inherit legacy `/art/pansofie-v1` images through shared content data.
- Some Young project cards use topic photos by array position rather than project meaning.
- Some adult public pages use photos where the board expects a more deliberate interface/illustration system.
- Existing SVG icons are useful for navigation and small semantics, but there is not yet a complete scene/vector language for the major screens.

## Product visual roles

### PANSOFIE adult

Target feel: calm editorial, photographic, grounded, cream/olive, civic and intergenerational.

Allowed visual types:

- large editorial photographs for hero/context;
- calm ecological/civic illustrations only when they directly describe the program;
- shared path/domain icons;
- restrained map/chart/interface primitives.

Avoid:

- youth doodles;
- GO gamified badges as primary adult visuals;
- old generic `/art/pansofie-v1` imagery in public adult pages;
- material mockup photos outside the legacy compost/material prototype.

### PANSOFIE YOUNG

Target feel: youth magazine + community board, expressive typography, real teens, doodles, bright annotation layer.

Allowed visual types:

- Young photos from `/assets/brand/young/photos`;
- Young doodles from `/assets/brand/young/doodles`;
- Young icons;
- GO mission covers only when the context is explicitly an action/mission handoff.

Avoid:

- adult institutional photos as primary Young visuals;
- generic old Pansofie illustrations;
- project images selected by array index instead of meaning.

### PANSOFIE GO

Target feel: mobile app, mission cards, badges, map pins, compact progress UI.

Allowed visual types:

- `/assets/brand/go/icons`;
- `/assets/brand/go/badges`;
- `/assets/brand/go/map`;
- `/assets/brand/go/mission-covers`;
- minimal Young photography only for cross-promo or community context.

Avoid:

- adult editorial hero imagery inside the phone UI;
- legacy `/art/pansofie-v1` as core mobile mission imagery;
- decorative images that do not support a task, mission or state.

## Current asset pools

### Good / keep

- `/assets/brand/pansofie/photos/*` — current adult photo pool.
- `/assets/brand/young/photos/*` — current Young photo pool.
- `/assets/brand/young/doodles/*` — actual Young board-language layer.
- `/assets/brand/go/icons/*`, `/badges/*`, `/map/*`, `/mission-covers/*` — strongest coherent system in the project.
- `/assets/brand/shared/paths/*` and `/domains/*` — useful semantic SVG layer.

### Use only where intentional

- `/assets/brand/pansofie/illustrations/*` — acceptable for adult Labs, but several scenes are too generic unless paired with clear text.
- `/assets/mockup/*` — keep for older compost/material prototype; do not use as primary public board imagery.

### Phase out from new public board work

- `/art/pansofie-v1/*` — legacy visual layer. It can remain for older authenticated/prototype surfaces, but new public board work should not depend on it.

## Confirmed mismatches

| Area | Current issue | Required correction |
| --- | --- | --- |
| Young projects | project cards use topic images by array index | map each project to a semantically appropriate image |
| Young missions | mission cards inherit old `/art/pansofie-v1` images | map missions to GO mission covers for action context |
| Adult project data | shared `PROJECTS` still points to old `/art/pansofie-v1` | public pages must override with `/assets/brand` media |
| Adult/Young boundary | adult pages sometimes borrow Young illustration/photo assets | keep cross-product media only for explicit GO/Young bridge |
| New visual ideas | no coherent scene/vector set for adult board screens | design a deliberate scene system before adding files |

## Implementation rule from this audit

Do not add one-off decorative SVGs directly into pages.

Any new production visual must have:

1. product owner namespace: `pansofie`, `young`, `go`, or `shared`;
2. semantic family: `photos`, `illustrations`, `icons`, `doodles`, `mission-covers`, `badges`, `map`;
3. intended routes/components;
4. replacement target if it supersedes a legacy image;
5. screenshot evidence after integration.

## First clean implementation slice

The safe first slice is not to generate new art. It is to stop the worst semantic drift:

1. keep current approved asset files;
2. replace public Young mission images with GO mission covers where they are action missions;
3. replace public Young project array-index photos with explicit project-to-image mapping;
4. keep old `/art/pansofie-v1` out of the current public board surfaces where a `/assets/brand` equivalent exists;
5. rerun lint and viewport screenshot matrix.

## Still needed for a truly board-faithful finish

A real final art pass still needs a designed asset package, not quick code:

- adult board scene set for `O nás`, `7 cest`, `16 oblastí`, `Mapa`, `Impact`, `Síť`, `Školy`, `Organizace`, `Blog`, `Kontakt`;
- stronger PANSOFIE hero photo/crop closer to the mountain/adult board mood, or an approved replacement;
- Young phone/onboarding illustrations matching the right board screens;
- GO map/project/community/profile screen-specific visual states.

## Implemented second slice: PANSOFIE scene system

Added product-owned adult scenes under `/assets/brand/pansofie/scenes/`.

These are not standalone decorations. They are semantic route/project visuals:

| Scene | Meaning | Primary use |
| --- | --- | --- |
| `green-hope-lab.svg` | seed, soil, measurement, water, practical ecology | Green Hope, growing missions |
| `urban-farm-system.svg` | rooftop farm, city, cycle/value system | Urban Family Farm |
| `family-team-missions.svg` | safe family/team mission circle | Family Team, intergenerational cooperation |
| `impact-index.svg` | metrics, separate dimensions, trend | Impact Index |
| `collaboration-map.svg` | safe checkpoint/project map | Map |
| `school-life-learning.svg` | open classroom connected to life | Schools |
| `organization-network.svg` | organizations, schools and local projects connected | About / organizations / network |
| `knowledge-journal.svg` | articles, resources and connected notes | Blog / sources |
| `contact-growth.svg` | message, leaves and civic contact | Contact |

Applied to:

- public homepage program cards;
- public product/project cards;
- public detail pages for About, Green Hope, Urban Family Farm, Family Team, Schools, Organizations;
- public Map / Network / Impact / Blog surfaces;
- shared `PROJECTS` data so downstream surfaces stop inheriting legacy `/art/pansofie-v1`.

This improves semantic ownership and board coherence. It does not replace the need for final human art direction if photographic hero mood must exactly match the supplied board.
