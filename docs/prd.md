# Product Requirements Document

## Summary

An interactive, filterable roadmap viewer for the **Storytelling / Content Accelerator Lab (CAL)** at CNN, covering Q3 2026 through Q1 2027. The app helps leadership and partner teams quickly understand workstream priorities, phasing, and key decisions without needing access to a project management tool.

## Goals

- Give leadership a fast, exec-friendly view of the full CAL roadmap in a single screen
- Make it easy to filter by quarter, tag, and priority during planning reviews
- Surface key alignment decisions that need leadership input
- Serve as a shareable, linkable artifact for async review

## Users & personas

- **Product leadership** — needs to assess quarterly scope, priority distribution, and decision gates at a glance
- **Partner teams** (App, Web, Analytics, UXR, Editorial) — needs to understand when their lane is active and what dependencies exist
- **CAL team** — uses this as the source of truth for roadmap communication

## Scope

### In scope

- Full 6-swimlane × 3-quarter grid with all 60+ roadmap cards
- Multi-select filter by quarter, tag (DISCOVERY / SPIKE / BUILD / TEST / SCALE), and priority (P1 / P2 / P3)
- Keyword search across card titles and descriptions
- Card detail side panel (description, tags, dependencies, swimlane, quarter)
- Key decisions panel (8 leadership alignment items)
- Legend panel (tag and priority explanations)
- Light / dark mode toggle, persisted to localStorage
- Responsive layout (desktop-first, scrollable on tablet)

### Out of scope (v1)

- Editing cards in the UI
- Real-time collaboration
- User authentication
- Backend or CMS integration
- Export to PDF / PNG
- Drag-and-drop reordering

## User stories

- As a leader, I want to see all roadmap cards organized by swimlane and quarter so I can assess overall scope at a glance.
- As a leader, I want to filter to just P1 cards so I can focus the conversation on must-do work.
- As a partner team member, I want to filter to my swimlane and see which quarter my work is active.
- As a CAL team member, I want to click a card and see its full description and dependencies.
- As any user, I want to toggle dark mode so the app is comfortable in any lighting environment.

## Success metrics

- Leadership can answer "what are all Q3 P1 items?" in under 10 seconds
- All 8 key decisions are visible without leaving the roadmap view
- Build passes with zero TypeScript errors and zero lint warnings

## Dependencies & assumptions

- No backend required — all data is static JSON in `app/lib/roadmap-data.ts`
- `@cnnprivate/cnn-vossi-styles` requires private registry access (see `docs/vossi-guide.md`)
- Dark mode uses a `.dark` class on `<html>` — verify against Vossi dark mode strategy

## Open questions

- Should swimlane row headers be clickable to filter to that lane?
- Should card status (not started / in progress / done) be added as a future filter dimension?
- Will this eventually connect to a CMS or Airtable for live data?
