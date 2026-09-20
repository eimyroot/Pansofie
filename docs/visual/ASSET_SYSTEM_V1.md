# PANSOFIE Asset System v1

Status: production visual contract
Source of truth: approved PANSOFIE / PANSOFIE YOUNG mockup board

## Purpose

The asset system keeps PANSOFIE, PANSOFIE YOUNG and PANSOFIE GO visually related without making them look like one reskinned interface.

- PANSOFIE = calm photographic editorial web.
- PANSOFIE YOUNG = separate public youth web with photography + hand-drawn energy.
- PANSOFIE GO = mobile-first action app with functional iconography, badges, mission covers and map assets.
- Shared semantic assets = 7 development paths + 16 knowledge domains.

## Non-negotiable rule

The mockup board defines visual direction. Product materials define content. Master Tree defines information architecture. CORE defines data. Assets must never reverse that hierarchy.

## Repository namespace

```text
public/assets/brand/
  pansofie/
    photos/
    icons/
    data-viz/
  young/
    photos/
    doodles/
    icons/
  go/
    icons/
    badges/
    mission-covers/
    map/
  shared/
    paths/
    domains/
```
## PANSOFIE visual language

Photography carries emotion. UI decoration stays restrained.

- Cream / warm-white surfaces, forest ink, small copper/terracotta accents.
- Large editorial photography, natural light, documentary feeling.
- Serif display typography can coexist with clean sans UI text.
- Icons are thin, quiet and subordinate to photography.
- Charts and maps are data-first, not decorative illustrations.
- No playful doodles in primary adult pages.

Required photo families:

1. Hero / landscape / contemplation.
2. Family and intergenerational collaboration.
3. School and hands-on learning.
4. Community projects and local action.
5. Nature, growing, food and materials.
6. Organizations, partnership and impact.

Each hero family should have 16:9 desktop, 4:3 tablet and 4:5 mobile crops. When copy overlays the image, generate left-safe and right-safe variants rather than forcing CSS to rescue a bad crop.

## PANSOFIE YOUNG visual language

The Young site is a public web, not the GO app.

- Photography remains real and contemporary.
- Doodles add energy around the photo, never obscure faces or controls.
- Accent palette may use lime, yellow, cyan, coral and pink around a green base.
- Headlines are shorter, bolder and more expressive.
- Stickers and handwritten marks are separate transparent assets.
- Avoid childish clip-art; aim for confident youth culture.
## PANSOFIE GO visual language

GO is the action layer. Every asset must improve speed, orientation or motivation.

- Bottom-navigation icons must work at 20–24 px.
- Mission covers use clear subjects and strong crop hierarchy.
- Badges are compact, symbolic and readable without text.
- Map pins are semantic: mission, project, event, lab, mentor.
- Progress, XP and achievements are game mechanics, never a score of human worth.
- Evidence states need camera, upload, verified, reflection and portfolio symbols.

## SVG contract

All newly drawn system SVGs use a 24 × 24 viewBox, 1.75 default stroke, round caps and joins, and `currentColor` when the icon can inherit context.

Rules:

- Default fill is none.
- Avoid micro-detail that disappears below 20 px.
- Optical balance matters more than mathematically identical bounding boxes.
- One metaphor per icon. Do not combine three symbols into a tiny logo soup.
- No mixing Lucide, filled emoji and custom hand-drawn icons in one semantic set.
- Decorative Young doodles are exempt from the system-icon geometry.

## Shared semantic sets

Seven development paths use one consistent badge family:

`Tělo · Mysl · Charakter · Vztahy · Tvořivost · Prosperita · Smysl`

Sixteen domains use a quieter secondary family:

`Já · Tělo · Mysl · Emoce · Vztahy · Rodina · Společnost · Příroda · Technologie · Finance · Práce · Tvorba · Kultura · Etika · Občanství · Smysl života`
## Production vector pack v1.1

The deterministic generator `scripts/generate-brand-assets.mjs` creates the first production vector pack under `/assets/brand`:

- 7 shared development-path icons,
- 16 shared knowledge-domain icons,
- 12 restrained PANSOFIE web icons,
- 8 PANSOFIE YOUNG web icons,
- 8 separate Young doodles,
- 14 PANSOFIE GO app/evidence icons,
- 5 semantic GO map pins,
- 7 GO badge symbols.

All 77 system assets are source-controlled SVG, use `currentColor`, contain no text, and can be regenerated without an image provider. `public/assets/brand/tokens.json` is the visual token handoff for color and geometry.

## Naming

Use semantic names, not screen coordinates or temporary design labels.

Examples:

- `path-body.svg`
- `domain-finance.svg`
- `doodle-crown-01.svg`
- `pin-project.svg`
- `badge-green-hope.svg`
- `mission-microgreens-16x9.webp`
- `mission-microgreens-4x5.webp`
- `hero-family-team-right-safe.webp`

## Generation workflow

1. Start from the approved board and identify the asset role.
2. Generate or photograph the scene without baked-in interface text.
3. Select one direction, then normalize crop, grading and contrast.
4. For icons, redraw/clean into the SVG contract rather than shipping raw AI vector output.
5. Export responsive variants only where composition genuinely changes.
6. Optimize SVG paths and raster assets before integration.
7. Register the asset semantically in product code.
8. Compare the actual page against the board at desktop, tablet and mobile sizes.

## Prohibited shortcuts

- No text baked into hero imagery.
- No random stock-photo mixture across neighboring cards.
- No five unrelated icon libraries.
- No exact child-home location visuals.
- No decorative map pretending to be a real map.
- No impact chart whose values are invented but presented as real measurements.
- No permanent use of legacy `r8`, `r9` or old Art Kit assets in new screens unless explicitly approved.

## Review gate

An asset is release-ready only when subject, crop, color, whitespace, icon weight, accessibility, responsive behavior and board fidelity have all been checked in context. A pretty PNG in isolation does not count as implementation. Humanity has suffered enough from that particular workflow.

## Implemented v1 inventory

Current production namespace contains:

- 7 shared development-path SVGs,
- 16 shared domain SVGs,
- 12 PANSOFIE system SVGs,
- 8 PANSOFIE YOUNG public-web SVG icons,
- 24 PANSOFIE YOUNG transparent doodle SVGs,
- 14 PANSOFIE GO functional SVG icons,
- 5 semantic GO map pins,
- 7 GO badge SVGs,
- 7 curated PANSOFIE editorial photo assets,
- 5 PANSOFIE editorial illustration assets,
- 8 curated Young photo/cutout assets,
- 5 Young illustration assets,
- 5 GO mission-cover raster assets.

All production vectors are text-free and use `currentColor`; Young doodles deliberately use a looser 64×64 hand-drawn grid. Raster assets are semantically named and registered in `src/domain/asset-system.js`; board/page roles are mapped in `public/assets/brand/page-map.json`. The raster set is a first curated production pool, not a claim that every final page photograph has already been art-directed.
