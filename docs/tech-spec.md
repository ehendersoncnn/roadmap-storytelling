# Technical Specification

## Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | LTS (20+) |
| Framework | Next.js | 16.x |
| UI | React / React DOM | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Lint | ESLint + eslint-config-next | 9.x |
| CNN design | @cnnprivate/cnn-vossi-styles | TBD — see vossi-guide.md |

## Local development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

**Node version:** Use Node 20 LTS or newer. If the team uses `nvm`:
```bash
nvm use 20
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build — run before any deploy |
| `npm run start` | Run production server after build |
| `npm run lint` | ESLint |

## Environment variables

No environment variables are required for v1. All data is static.

Once a CMS or auth layer is added, document vars here and add them to `.env.local` (gitignored).

## TypeScript conventions

- All roadmap data types are in `app/lib/roadmap-data.ts` and exported
- No `any` — use the exported union types (`Tag`, `Priority`, `Quarter`, `Swimlane`)
- All components are typed with explicit prop interfaces
- `"use client"` is used only when a component requires browser APIs or React hooks

## Styling conventions

- Colors: always reference CSS custom property classes (e.g. `text-foreground-muted`) — never hardcoded hex in component files
- Spacing: Tailwind utility classes only — no inline `style` for layout
- Dark mode: `.dark` class on `<html>`, toggled by `ThemeProvider`
- Token source of truth: `app/globals.css` `:root` / `.dark` blocks

## Adding cards

Edit the `CARDS` array in `app/lib/roadmap-data.ts`. TypeScript will enforce the correct shape. No build step needed — the dev server hot-reloads.

## Testing & quality

Not yet configured. Recommended additions when the team is ready:
- **Unit / component tests:** Vitest + React Testing Library
- **E2E:** Playwright
- **Visual regression:** Chromatic or Percy

## Deployment

The app is fully static and deploys to Vercel with zero configuration. It can also run on any Node-compatible host.

```bash
npm run build
npm run start   # verify locally before pushing to production
```

For CI, add a build step that runs `npm run lint && npm run build`.
