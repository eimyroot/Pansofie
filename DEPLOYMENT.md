# Deployment

## Render

1. Connect repository `nulleimy/PANSOFIE`.
2. Render can consume `render.yaml` from the repository root.
3. Build command: `npm install && npm run build`.
4. Publish directory: `dist`.
5. Keep the SPA rewrite `/* -> /index.html`.

Public Base44 configuration is already represented in `render.yaml`. Never add auth tokens to Git.
