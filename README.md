# PANSOFIE

PANSOFIE is a React/Vite frontend recovered from the Base44 prototype and completed with a minimal production-ready scaffold.

> Poznej sebe. Tvoř s druhými. Zlepšuj svět.

## Stack

- React + React Router
- Vite
- Tailwind CSS
- Base44 JavaScript SDK
- TanStack Query
- Recharts
- Lucide React

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Base44 backend

The frontend is configured for Base44 app ID `6a76ebff883bcb27f8ca8927` through `VITE_BASE44_APP_ID`.

Do not commit access tokens or private user data. `VITE_*` variables are public browser configuration, not secrets.

## Deployment

`render.yaml` contains a Render Static Site configuration with SPA rewrite to `index.html`.

## Recovery status

Most page/data source files were recovered directly from the Base44 code view. Missing framework glue and reusable UI components were reconstructed conservatively so the repository can compile and run independently. See `RECOVERY_LOG.md` for provenance notes.
