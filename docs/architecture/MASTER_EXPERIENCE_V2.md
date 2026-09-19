# PANSOFIE Master Experience V2

Status: CANDIDATE
Date: 2026-09-19
Purpose: implementation + visual source-of-truth proposal for the next redesign of `pansofie-staging`

## 1. Scope

This document turns the current project materials, project conversations and the existing repository into one implementation-oriented architecture for three distinct experiences over one shared product core:

- **PANSOFIE** — public editorial / knowledge / ecosystem web.
- **PANSOFIE YOUNG** — public youth experience and gateway for young users.
- **PANSOFIE GO** — action/application layer for missions, projects, teams, map, evidence, reflection, portfolio and impact.

The intent is not to build three disconnected products. Shared content, identity, mission execution, evidence, skills and impact remain canonical. Presentation differs by product surface and user context.

## 2. Authority hierarchy

When sources disagree, use this hierarchy:

1. current repository governance, backend schema and security model for existing technical state;
2. current PANSOFIE ecosystem materials for product/content direction;
3. PANSOFIE source text for the 7 growth paths and game mechanics;
4. approved mockup boards for visual direction;
5. legacy public pages only as migration inputs, not as new information architecture.

Assets do not define content. Mockups do not define authorization. Copy does not define database permissions.

## 3. Product master tree

```text
PANSOFIE ECOSYSTEM
│
├── PANSOFIE
│   ├── philosophy / editorial knowledge
│   ├── 7 growth paths
│   ├── 16 development domains
│   ├── stories / people / organizations
│   ├── programs / projects / places
│   ├── community / network
│   └── impact
│
├── PANSOFIE YOUNG
│   ├── discover
│   ├── 7 paths
│   ├── 16 domains
│   ├── stories / quizzes / dilemmas
│   ├── missions gateway
│   ├── projects
│   ├── community
│   ├── Family Team bridge
│   └── safe handoff into GO
│
└── PANSOFIE GO
    ├── home / journey
    ├── missions
    ├── projects
    ├── map / checkpoints
    ├── teams
    ├── Family Team
    ├── Knowledge Exchange
    ├── AI mentor
    ├── evidence / reflection
    ├── portfolio / skills
    ├── impact
    └── settings / permissions / safety
```

Shared program layer:

```text
Green Hope
Urban Family Farm
Family Team
Knowledge Exchange
Pansofie Impact Index
```

They are programs and capabilities over the shared mission/data model, not separate applications.

## 4. Shared learning grammar

### 4.1 Seven growth paths

The source-derived target names are:

1. Tělo
2. Mysl
3. Charakter
4. Vztahy
5. Tvořivost
6. Prosperita
7. Smysl

The current repository uses an adapted set (`Poznávej`, `Zdraví`, `Charakter`, `Vztahy`, `Tvořivost`, `Spolupráce`, `Smysl`). This is a known semantic mismatch. The redesign should migrate display copy and stable IDs deliberately rather than silently changing labels in scattered components.

Recommended stable IDs:

```text
body
mind
character
relationships
creativity
prosperity
meaning
```

### 4.2 Sixteen development domains

Canonical domains:

```text
Já
Tělo
Mysl
Emoce
Vztahy
Rodina
Společnost
Příroda
Technologie
Finance
Práce
Tvorba
Kultura
Etika
Občanství
Smysl života
```

Each domain must resolve to reusable skills, missions, projects, stories and impact dimensions. The 7 paths are the high-level orientation/game layer; the 16 domains are the deeper curriculum/content layer.

### 4.3 Method

Every topic and mission may use the same pedagogical grammar:

```text
LEARN → PLAY → DO → CREATE → SHARE → REFLECT
```

Action outcomes follow:

```text
GAME → EXPERIENCE → SKILL → IMPACT
```

Do not collapse these into XP-only gamification.

## 5. PANSOFIE public architecture

Primary public navigation target:

```text
Objevuj
7 cest
16 oblastí
Projekty
Komunita
Dopad
O Pansofii
[Pansofie GO]
```

Core page families:

```text
/
/objevuj
/7-cest
/7-cest/[slug]
/16-oblasti
/16-oblasti/[slug]
/jak-to-funguje
/projekty
/projekty/[slug]
/green-hope
/urban-family-farm
/family-team
/knowledge-exchange
/lide
/organizace
/mista
/mapa
/sit
/impact
/pribehy
/pribehy/[slug]
/pro-rodiny
/pro-skoly
/pro-mesta
/pro-organizace
/o-nas
/kontakt
```

Editorial page anatomy should be content-driven, not dashboard-driven. Large photography carries emotion; interface decoration stays restrained.

### PANSOFIE homepage sequence

```text
Hero
What Pansofie is
7 paths
16 domains
Method
Pansofie GO bridge
Real mission example
Programs / projects
Family + Knowledge Exchange
Community / places
Impact
Audience entry points
Final CTA
```

## 6. PANSOFIE YOUNG architecture

Young is a distinct visual/product experience, not a recolored adult page and not identical to the GO application.

Target promise:

```text
DISCOVER → PLAY → DO → BELONG → GROW
```

Public Young navigation:

```text
Domů
Objevuj
Cesty
Témata
Projekty
Komunita
Jak to funguje
[Do GO]
```

Mobile-first public surfaces:

```text
/young
/young/objevuj
/young/cesty
/young/oblasti
/young/pribehy
/young/mise
/young/projekty
/young/komunita
/young/jak-to-funguje
```

Young should expose the same 7 paths and 16 domains with lower text density, stronger visual orientation and clearer action handoffs.

### Age presentation

Product conversations currently target **6–18**. Existing authentication architecture currently resolves `young_kids = 6–13` and `young_teens = 14–20`. Do not change authorization/experience resolution as part of a visual refactor. Reconcile the product age range with auth routing in a separate reviewed migration before changing `resolveExperience()`.

Visual/content adaptation can still use two presentation modes in the interim:

```text
younger: simpler copy, larger targets, more illustration, guardian-context actions
older: denser editorial content, stronger social/project framing, less childish art
```

## 7. PANSOFIE GO architecture

GO is the shared action layer. It should be mobile-first, functional and task-oriented.

Primary navigation target:

```text
Domů
Mise
Mapa
Projekty
Týmy
Portfolio
Mentor
Profil
```

Context-aware surfaces may add:

```text
Family
School
Organization
Project
Admin
```

The underlying canonical chain remains:

```text
identity → context → mission → run → evidence → reflection → experience → skill → portfolio → impact
```

Do not create a second mission/evidence/portfolio subsystem for new visuals.

## 8. Program architecture

### Green Hope

Public role: explain and inspire practical environmental action.
GO role: mission/project execution and measurable nature impact.

Themes include growing, biodiversity, water, soil, energy, waste, composting, urban green, nature protection, local production and climate literacy.

### Urban Family Farm

Core real-world cycle:

```text
zasadit → vypěstovat → sklidit → zpracovat → vytvořit produkt → spočítat náklady → prodat → vydělat → reinvestovat
```

The program connects nature, work, finance, creativity, entrepreneurship and cooperation. Dedicated production/inventory/sales tables stay deferred until real pilot requirements justify them.

### Family Team

Family is an active context, not a shared child login. Each person remains an individual identity. Shared missions/projects operate through governed relationships and permissions.

### Knowledge Exchange

Core flow:

```text
I CAN TEACH + I WANT TO LEARN → MATCH → SESSION → EVIDENCE → REFLECTION → SKILL → PORTFOLIO
```

For minors, matching must stay inside governed contexts (family, school, verified community/mentor flows). No open stranger-to-child marketplace.

## 9. Visual system contract

### PANSOFIE

Target: calm editorial / photographic / civic / intergenerational.

```text
warm cream
forest ink
sage
charcoal
restrained copper / terracotta accent
```

Use large documentary-style photography, natural light, tactile real activity and quiet interface elements.

### PANSOFIE YOUNG

Target: youth magazine + community board.

Use real contemporary young people, bold typography, separate doodle/sticker overlays and brighter accent colors. Do not bake text into images. Avoid childish clip-art.

### PANSOFIE GO

Target: compact mobile action UI.

Use functional iconography, mission covers, badges, semantic map pins, progress states and evidence symbols. Adult editorial hero photography does not belong inside core GO task screens.

## 10. Asset production contract

All assets must have product ownership and semantic ownership.

```text
public/assets/brand/pansofie/
  photos/
  scenes/
  icons/
  data-viz/

public/assets/brand/young/
  photos/
  illustrations/
  doodles/
  icons/

public/assets/brand/go/
  mission-covers/
  badges/
  map/
  icons/

public/assets/brand/shared/
  paths/
  domains/
```

Raster production metadata should identify:

```text
asset_id
product
family
semantic_role
page_role
subject
age_context
ratio
safe_area
alt_intent
source
license
prompt_version
status
```

Required editorial responsive crops where composition changes:

```text
16:9 desktop
4:3 tablet
4:5 mobile
left-safe
right-safe
```

System SVGs:

```text
24×24 viewBox
1.75 default stroke
round caps / joins
currentColor when semantic
no baked text
```

Young decorative doodles are intentionally exempt from system-icon geometry.

## 11. Three mockup boards

### Board A — PANSOFIE

Must show:

```text
Homepage
7 Paths
16 Domains
Area detail
Project detail
Community/network
Impact
Typography
Palette
Editorial photography direction
Core components
```

### Board B — PANSOFIE YOUNG

Must show:

```text
Public home
Explore
7 Paths / 16 Domains
Story / quiz / dilemma
Mission handoff
Projects
Community
Younger / older presentation contrast
Doodles / stickers
Photography direction
```

### Board C — PANSOFIE GO

Must show:

```text
Home
Mission list
Mission detail
Map/checkpoint
Project
Teams / Family Team
Portfolio / evidence / reflection
AI mentor
Profile / settings
Functional icons
Badges
Map pins
State system
```

Boards are visual contracts, not screenshots to ship as UI.

## 12. Implementation structure

New public architecture should progressively move away from the client-only legacy catch-all. Do not perform a big-bang rewrite of auth/data layers.

Recommended implementation layering:

```text
src/domain/
  pansofie-master.js
  content/
    paths.js
    domains.js
    programs.js
    public-copy.js
  asset-system.js

src/components/
  pansofie/
  young/
  go/
  shared/

src/app/
  public routes migrated incrementally to App Router
  authenticated routes remain server-resolved
```

Presentation components should consume structured content rather than embedding canonical copy and asset paths independently in pages.

## 13. Migration sequence

```text
Phase 0 — freeze source hierarchy and IDs
Phase 1 — canonical content manifest + route manifest
Phase 2 — PANSOFIE homepage / 7 paths / 16 domains
Phase 3 — PANSOFIE YOUNG public shell and key screens
Phase 4 — GO action flows aligned to mission/evidence/portfolio core
Phase 5 — program pages and cross-product handoffs
Phase 6 — final asset production + responsive crops
Phase 7 — accessibility / SEO / performance / empty-loading-error states
Phase 8 — viewport evidence and board-fidelity QA
```

## 14. Known current-state mismatches to resolve

```text
Current repository 7-path labels differ from source-derived 7 paths.
Young public content exists, but exact final Kids/Teens image pack is incomplete.
Current project data still includes prototype/demo semantics that must stay explicitly marked.
Legacy public pages and newer App Router authenticated surfaces coexist.
Current art direction audit confirms the UI is organized but not yet fully board-faithful.
Young target age in product discussion (6–18) conflicts with current auth resolver (6–13 / 14–20).
```

These are migration tasks, not reasons to discard the working identity, RLS, mission/evidence and deployment foundations.

## 15. Definition of done for the redesign

A surface is complete only when:

```text
content maps to the canonical product model
route and authorization behavior remain correct
visual ownership is correct (PANSOFIE / Young / GO / shared)
all required responsive states are designed
assets are semantic and registered in code
copy is not baked into artwork
real/demo status is truthful
child safety rules are preserved
keyboard / contrast / alt-text behavior passes review
loading / empty / error / locked states exist where applicable
build + repository checks pass
viewport screenshots are compared against the approved board
```
