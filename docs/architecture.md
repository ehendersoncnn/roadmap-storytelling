# Architecture

## Runtime model

- **Framework:** Next.js 16 App Router (`app/`)
- **UI:** React 19 Server Components by default; Client Components (`"use client"`) only where interactivity requires it
- **Styling:** Tailwind CSS v4 with PostCSS; design tokens via CSS custom properties in `app/globals.css`
- **State:** Local React state only (`useState`) — no external state library needed for v1
- **Data:** Static TypeScript constants in `app/lib/roadmap-data.ts` — no API calls, no database

## Component tree

```
app/layout.tsx (Server)
└── ThemeProvider (Client) — dark mode context
    └── app/page.tsx (Server) → renders:
        └── RoadmapView (Client) — root state owner
            ├── Header (inline JSX) — title, strategy frame, panel toggle
            ├── FilterBar (Client) — quarter / tag / priority chips, search, dark mode toggle
            ├── RoadmapGrid (Client) — swimlane × quarter table
            │   └── RoadmapCard (Client) × N — individual card buttons
            └── SidePanel (Client) — tabbed: Decisions | Detail | Legend
```

## Data flow

```
roadmap-data.ts (static)
    └── CARDS[]
          ↓ passed as prop
        RoadmapGrid
          ↓ filters applied inline (cardMatches)
        RoadmapCard (visible/hidden based on filter state)
          ↓ click event
        RoadmapView.selectedCard state
          ↓ passed as prop
        SidePanel → CardDetailPanel
```

## Repository layout

| Path | Role |
|---|---|
| `app/lib/roadmap-data.ts` | All card data, swimlane/quarter constants, key decisions |
| `app/lib/styles.ts` | Tag / priority / swimlane color class mappings |
| `app/globals.css` | Tailwind v4 import + CSS custom property design tokens |
| `app/components/ThemeProvider.tsx` | Dark mode context, localStorage persistence |
| `app/components/FilterBar.tsx` | All filter controls + active filter chips |
| `app/components/RoadmapGrid.tsx` | Swimlane × quarter table, card visibility logic |
| `app/components/RoadmapCard.tsx` | Individual card button with badges + priority border |
| `app/components/SidePanel.tsx` | Tabbed panel: card detail, decisions, legend |
| `app/components/RoadmapView.tsx` | Root client component; owns filter + selected card state |
| `docs/vossi-guide.md` | Step-by-step Vossi styles integration |

## Design token architecture

All colors are CSS custom properties defined in `:root` and `.dark` in `globals.css`, then registered with Tailwind v4 via `@theme inline`. Components reference Tailwind utility classes like `bg-tag-discovery-bg` and `text-priority-p1-text` — never hardcoded hex values.

When `@cnnprivate/cnn-vossi-styles` is installed, the only change needed is replacing the hex values in `:root` / `.dark` with Vossi `var(--cnn-*)` tokens. Component code does not change. See `docs/vossi-guide.md`.

## Scaling approach

| When | Change |
|---|---|
| Cards become editable | Add a CMS (Sanity / Airtable) + API route in `app/api/` |
| Real-time collaboration | Add presence layer (Liveblocks or Partykit) |
| Auth required | Add NextAuth.js or CNN SSO |
| Multiple roadmaps | Move to dynamic routes `app/roadmap/[slug]/page.tsx` |
| URL-driven filter state | Use `nuqs` to sync filter state to URL search params |
