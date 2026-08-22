# PANSOFIE Public Copy Arbitration R8

Status: CANONICAL PROPOSAL ON FEATURE BRANCH  
Scope: public website copy only  
Branch: `feat/public-copy-humanization-r8`

## Purpose

Pansofie must be understandable to a parent, student, teacher, school, partner or member of the public without requiring knowledge of product, governance or software terminology.

Public copy must also preserve provenance. Historical claims about Jan Amos Komenský and pansophy must never be mixed with modern Pansofie interpretation or product design.

## Source layers

### 01_HISTORICAL_SCHOLARLY

Scholarly and historical sources. Use for claims about Komenský, pansophy, harmony, synkrisis, universal knowledge, education and historical context.

### 02_INTERPRETIVE_PRODUCT_MATERIAL

Modern Pansofie interpretations, infographics, videos and PansofieGO concepts. These are useful for design and communication, but they are not historical evidence by themselves.

### 03_RAW_TEXT_EXTRACTS

Raw text extracts and working research material. Use to locate wording and source passages. An isolated extract does not automatically become an independent historical authority.

## Claim classes

Every public factual statement that needs provenance must fit one of these classes:

1. `HISTORICAL_FACT` — directly supported by a scholarly or primary source.
2. `INTERPRETATION` — our contemporary reading or synthesis of a historical principle.
3. `PRODUCT_DESIGN` — a mechanism, feature or architecture created by Pansofie/PansofieGO.
4. `PRODUCT_EVIDENCE` — something actually implemented, tested or observed.
5. `HYPOTHESIS` — something intended for future testing or research.

These classes must not be collapsed into one another.

## Arbitration rule

Source priority is contextual, not a fixed `01 > 02 > 03` ladder.

- For an exact historical quotation or exact wording, a verified primary/raw passage may be the strongest wording evidence.
- For historical interpretation and context, scholarly synthesis is preferred over an isolated extract.
- Interpretive/product material may inspire product language, but it cannot prove what Komenský literally said, designed or intended.
- Product claims must be grounded in current repository, tests, deployment evidence or real pilot evidence — not in historical sources.
- If evidence is missing or conflicting, fail closed: remove the factual claim, qualify it as interpretation/hypothesis, or explicitly state uncertainty.

## Public-language rule

Use this order whenever history or philosophy is relevant:

1. Explain the real-life idea in plain Czech.
2. Optionally name the historical principle or source of inspiration.
3. Explain how modern Pansofie translates it into a product or Experience.

Example pattern:

> Nestačí znát jednotlivé věci. Potřebujeme vidět, jak spolu souvisejí a co naše rozhodnutí způsobí. Pansofie se v tomto směru inspiruje pansofickou snahou Jana Amose Komenského hledat souvislosti a celek. Dnešní Pansofie je současný produkt: tuto inspiraci převádí do práce se skutečnou zkušeností, důkazem, reflexí a dalším krokem.

Never imply that Komenský designed modern software, AI, XP, scores, quests, PansofieGO or the current Pansofie architecture.

## Human-first glossary

Public copy should prefer the Czech term on the right. Product names may remain when they are explained in context.

| Internal/product wording | Public wording |
| --- | --- |
| Experience | skutečná zkušenost / Experience |
| workflow | postup / pracovní postup |
| bounded output / deliverable | bezpečně vymezený výstup / výstup určený partnerovi |
| Review | kontrola / odborná zpětná vazba |
| feedback | zpětná vazba |
| adoption decision | rozhodnutí, zda se výsledek použije |
| adoption | použití / navazující využití |
| Outcome | co se po použití skutečně stalo / skutečný výsledek |
| Impact | dlouhodobý dopad |
| field pilot | pilot v reálné škole |
| safeguarding | ochrana dětí a bezpečný dohled |
| privacy | soukromí / pravidla přístupu |
| screening | posouzení vhodnosti a bezpečnosti |
| Challenge | reálná výzva (Challenge) |
| learner raw evidence | neveřejné podklady a důkazy žáka |
| willingness-to-pay | ochota škol nebo partnerů za službu platit |
| runtime | samostatná část produktu / provoz |
| role-aware | přizpůsobené podle role |
| GO / CHANGE / STOP | pokračovat / upravit / zastavit |

## Writing standard

Every important public section should answer, in this order:

- Co to pro mě znamená?
- Co konkrétně udělám nebo získám?
- Proč na tom záleží?
- Jaká je hranice nebo nejistota?
- Co můžu udělat dál?

Prefer concrete verbs, short sentences and examples. Avoid architecture language unless the page is explicitly technical.

Do not use fear, inflated promises or authority theatre. Technical readiness must not be presented as pedagogical impact. A completed student output must not be presented as real-world impact unless the later outcome is actually observed.

## Security and trust boundary

Humanization must never weaken the meaning of:

- child safety boundaries,
- purpose-limited access,
- private reflection,
- separation of student work from partner evaluation,
- separation of activity, output, later use and long-term impact,
- human responsibility for important decisions.

If simpler wording becomes less precise, precision wins and the sentence must be rewritten again.

## Acceptance criteria

R8 is acceptable only when:

- public pages can be understood without software/product-governance vocabulary;
- historical inspiration and modern product design are clearly distinguishable;
- no new historical attribution is introduced without source support;
- public product-status wording remains truthful about what is implemented versus what still requires a real school pilot;
- security/privacy boundaries preserve their original meaning;
- navigation, routes, domain IDs and authorization logic are unchanged;
- repository gates pass on the exact branch head;
- independent diff review finds no accidental semantic weakening or unsupported claims.

No PASS may be issued from copy review alone.