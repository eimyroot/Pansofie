# Pansofie R6 — 1:1 mockup design contract

Reference: `PANSOFIE_R6_REFERENCE.png` (1536×1024 source board).

## Core palette
- Canvas: `#F2EBE0`
- Page paper: `#FCF8F0`
- Primary green: `#3B6633`
- Dark olive: `#2E4614`
- Moss: `#BAC59A`
- Terracotta: `#CF6C3F`
- Warm cream: `#F1E8DA`
- Ink: `#18250E`

## Geometry
- Main desktop shell: max 1180 px
- Navigation: 58 px high
- Main panel corner radius: 18–22 px
- Interior card radius: 10–18 px
- Fine warm-grey borders, low-contrast shadows
- Desktop typography is intentionally compact, matching the visual density of the reference board

## Screen contracts
1. `/` — split hero with tree, activity feed, 4 metrics, 4 role chambers.
2. `/vize` — centered manifesto, 3 pillars, 3 photographic mission cards, green closing band.
3. `/digitalni-kompost` — illustration header, filter pills + radius, 5-column material grid, add card, wheelbarrow row.
4. `/mapa-kolobehu` — full map canvas with left filter overlay, right results overlay, geolocation control.
5. `/profil` — left identity rail, central growth tree, right mission rail, bottom contributions.
6. `/mise/:id` — illustration, title, 3-step progress, description/tips and full-width completion CTA.
7. Mobile — compact header + fixed five-item bottom dock.

## Truth rules retained under the visual layer
- DEMO data remains labelled or described as demo context.
- UI selection does not equal real-world completion.
- Geolocation requires an explicit browser permission action.
- Exact home addresses are not stored in this prototype.
- ESG/impact claims are not generated without evidence/methodology.
- Local state remains localStorage-backed until a governed backend phase.
