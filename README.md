# Pansofie + Pansofie Young

Kohezní Next.js produkt se šesti přihlášenými UX režimy nad společným jádrem. Původní veřejný React prototyp zůstává dostupný na stávajících routách.

- Pansofie: dospělý fotografický editorial vzhled, cream/sage paleta, město + příroda.
- Pansofie Young: samostatný ilustrativní/akvarelový svět se stromem, věkovými větvemi a misemi bez hodnocení člověka.
- Sdílené jádro: Jak to funguje, Pro koho, Koloběh, Knihovna, Vize, Digitální kompost, Lidé & mentoring, Mapa koloběhu, Školy & organizace, profil, CS/EN, accessibility a bezpečnostní texty.

## Stack

- React 19
- Next.js 16 App Router
- Supabase Auth/Postgres/RLS přes `@supabase/ssr`
- Tailwind CSS 4
- React Router pouze v kompatibilní veřejné vrstvě původního prototypu
- Leaflet + React Leaflet
- OpenStreetMap
- localStorage jako dočasný datastore veřejného prototypu; přihlášený kontext používá Supabase

## Přihlášené UX režimy

- `/app/personal` — `adult_personal`
- `/app/family` — `adult_family`
- `/app/school` — `adult_school`
- `/app/company` — `adult_company`
- `/young/kids` — `young_kids` (6–13)
- `/young/teens` — `young_teens` (14–20)

Po přihlášení vede `/app` přes serverový resolver na správnou routu. UX režim není oprávnění: přístup k datům určují `memberships`, role a RLS politiky. Vazby dítě–průvodce jsou v `guardian_links`.

## Supabase setup

1. Zkopírujte `.env.example` do `.env.local` a doplňte Project URL, publishable key a veřejnou URL aplikace.
2. Aplikujte migraci `supabase/migrations/20260908164632_user_experience_architecture.sql` v cílovém Supabase projektu.
3. Nastavte Auth Site URL a povolenou redirect URL na `<origin>/auth/callback`.
4. Spusťte `npm install`, `npm run check` a `npm run dev`.

Migrace vytváří nové tabulky a typy. Před aplikací do existující databáze zkontrolujte kolize názvů a vytvořte databázovou zálohu.

## Routy

- `/`
- `/jak-to-funguje`
- `/pro-koho`
- `/knihovna`
- `/vize`
- `/osobni-rust`
- `/digitalni-kompost`
- `/mapa-kolobehu`
- `/instituce`
- `/profil`
- `/young`
- `/young/mise`
- `/kontakt`
- `/soukromi`
- `/podminky`
- `/cookies`
- `/pravidla-komunity`
- `/pristupnost`
- `/bezpecnost`

## R2 metabolism features

- globální CS/EN přepínač s persistencí
- A / A+ / A++ s persistencí
- skutečný `navigator.geolocation` pouze po kliknutí uživatele
- Haversine vzdálenost a řazení materiálů od nejbližšího
- sdílená datová vrstva mezi kompostem, mapou, institucemi a profilem
- automatické párování školních potřeb a firemních přebytků
- normalizace diakritiky + synonymní skupiny místo přesného `keyword === value`
- bohatší DEMO firemní banka
- všechny simulované firmy jsou explicitně označené DEMO

## Truth model

- Demo data jsou označená `DEMO`.
- Uživatelská data se ukládají pouze do `localStorage`.
- Geolokace se nepersistuje; existuje jen v paměti stránky.
- Profil nepředstírá reálný dopad ani historii.
- Přesné domácí adresy se na mapě nepoužívají.
- Demo firmy nejsou prezentovány jako ověření partneři.
- Backend/Supabase je další samostatná fáze.

## Start

```bash
npm install
npm run check
npm run dev
```


## Current product rules

- žádná povinná protislužba, veřejné body člověka ani žebříčky
- žádné automatické ESG/CSR/CO2 tvrzení
- demo organizace jsou označené `DEMO` a nejsou prezentované jako ověření partneři
- právní a bezpečnostní texty jsou označené `LEGAL CANDIDATE`, dokud není doplněná identita provozovatele a konkrétní zpracovatelé
- Young UX nepracuje s přesnou polohou dítěte a nenabízí přímý kontakt dítěte s neznámým dospělým
- kontaktní formulář je v prototypu local-only a netvrdí, že odesílá e-mail


## R4 digital compost game

- hravé karty surovin
- virtuální „trakař“ jako oddělený UI inventory state
- reálný sousedský radar přes `navigator.geolocation`
- Haversine distance + radius slider 2–50 km
- explicitní rezervace oddělená od pouhého výběru
- součet pouze skutečně uvedené hmotnosti z textu `kg`
- bez vymyšlených dopadových metrik
- explicitní uzavření lokálního předání zůstává samostatná akce


## R5 vision & missions

- `/vize` jako filozoficko-praktický manifest
- tři pilíře: Pansofia / Pampaedia / Panorthosia
- interaktivní role-based mise pro mládež, školy a firmy
- přijetí a dokončení mise se ukládá local-first
- dokončená mise se propíše do lokálního ledgeru a profilu
- žádné falešné certifikáty ani marketingové garance
- CS/EN navigace zahrnuje Vizi


## R6 mockup 1:1 UI

- redesign celého shellu podle schváleného 1536×1024 mockupu
- přesná cream/olive/terracotta paleta (`#F2EBE0`, `#FCF8F0`, `#3B6633`, `#CF6C3F`)
- kompaktní desktop navigace + mobilní spodní dock
- homepage: fotografický editorial hero, směr zapojení a pilíře
- Vize: 3 pilíře + 3 obrazové mise
- Kompost: filtrovací lišta, 5sloupcový grid, add card, trakař
- Mapa: full-canvas Leaflet + levý filtr + pravé nabídky
- Profil: levý profil, centrální strom, pravé mise, spodní metriky
- detail mise: batoh, 3krokový progress, popis, tipy, potvrzení
- Osobní růst, Role hub a Instituce sjednoceny do stejného design systému
- ilustrace jsou lokální výřezy ze schváleného mockupu; funkční UI není bitmapový screenshot
- truth model, local-first stav, geolokace, OSM a matching zůstávají aktivní

## R8 gentle participation
- opportunity, not obligation
- browse-first entry
- no mandatory proof/reflection UX
- no personal rating
- light confirmation: “Ano, proběhlo to”
- new How it works + Library surfaces
