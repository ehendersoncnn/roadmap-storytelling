# Storytelling / CAL Roadmap

Interactive product roadmap for the **Storytelling / Content Accelerator Lab** at CNN, covering Q3 2026–Q1 2027.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Swimlane × quarter grid** — 6 lanes, 3 quarters, 60+ cards
- **Multi-select filtering** — by quarter, tag (DISCOVERY / SPIKE / BUILD / TEST / SCALE), and priority (P1 / P2 / P3)
- **Keyword search** — searches card titles and descriptions
- **Card detail panel** — click any card to see full description, tags, dependencies
- **Key decisions panel** — leadership alignment items always accessible
- **Light / dark mode** — toggled in the filter bar, persisted to localStorage
- **Responsive** — desktop-first, scrollable on smaller screens

## Project structure

```
app/
  components/
    ThemeProvider.tsx    # Dark mode context + toggle
    FilterBar.tsx        # Quarter / tag / priority / search filters
    RoadmapGrid.tsx      # Main swimlane × quarter table
    RoadmapCard.tsx      # Individual card component
    SidePanel.tsx        # Detail / decisions / legend panel
    RoadmapView.tsx      # Root client component — wires everything
  lib/
    roadmap-data.ts      # All card data, types, constants
    styles.ts            # Tag / priority / swimlane color mappings
  globals.css            # Tailwind v4 + design tokens
  layout.tsx
  page.tsx
docs/
  prd.md                 # Product requirements
  architecture.md        # Component and data architecture
  tech-spec.md           # Stack, scripts, conventions
  tasks.md               # Phased task list for Cursor
  vossi-guide.md         # Step-by-step Vossi styles integration
```

## Adding or editing cards

All roadmap data lives in `app/lib/roadmap-data.ts` in the `CARDS` array. Each card follows this shape:

```ts
{
  id: string,
  title: string,
  description: string,
  quarter: "Q3 2026" | "Q4 2026" | "Q1 2027",
  swimlane: string,          // one of the 6 SWIMLANES constants
  tag: "DISCOVERY" | "SPIKE" | "BUILD" | "TEST" | "SCALE",
  priority: "P1" | "P2" | "P3",
  dependencies?: string[]    // optional, free-text labels
}
```

## Integrating CNN Vossi styles

See **`docs/vossi-guide.md`** for the complete step-by-step guide, including token mapping table and Tailwind config.

## Deployment

Deploy to Vercel with zero config. The app is fully static — no backend, no API routes.

```bash
npm run build   # verify build passes locally first
```
