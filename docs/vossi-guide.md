# Vossi Styles Integration Guide

This document explains how to replace the placeholder design tokens in this project with `@cnnprivate/cnn-vossi-styles` once you have access to the private registry.

---

## Step 1 — Authenticate with the private npm registry

Vossi is published to CNN's private npm registry (typically an Artifactory or GitHub Packages instance). Ask your team lead for the registry URL and an auth token, then configure npm:

```bash
# Option A — .npmrc in the repo root (do NOT commit the token)
@cnnprivate:registry=https://<your-registry-url>/
//your-registry-url/:_authToken=${CNN_NPM_TOKEN}
```

Add `CNN_NPM_TOKEN` to your local `.env.local` and to your CI/CD secrets. The `.npmrc` entry with `${CNN_NPM_TOKEN}` is safe to commit; the token itself is not.

---

## Step 2 — Install the package

```bash
npm install @cnnprivate/cnn-vossi-styles
```

---

## Step 3 — Import the Vossi base styles

In `app/globals.css`, add the import at the top **before** your `@import "tailwindcss"` line:

```css
/* Vossi base — provides CNN design tokens as CSS custom properties */
@import "@cnnprivate/cnn-vossi-styles/dist/index.css";

@import "tailwindcss";
```

If Vossi ships a JS/TS entry point with token objects instead of a CSS file, import it in `app/layout.tsx`:

```ts
import "@cnnprivate/cnn-vossi-styles";
```

Check the package's own README for the correct import path.

---

## Step 4 — Map Vossi tokens to local CSS variables

The project uses local CSS custom properties defined in `app/globals.css` under `:root { ... }` and `.dark { ... }`. Replace each hardcoded hex with the corresponding Vossi token.

### Token mapping table

| Local variable | Vossi token (example — verify against your Vossi version) |
|---|---|
| `--background` | `var(--cnn-color-surface-base)` |
| `--surface` | `var(--cnn-color-surface-subtle)` |
| `--surface-raised` | `var(--cnn-color-surface-raised)` |
| `--foreground` | `var(--cnn-color-text-primary)` |
| `--foreground-muted` | `var(--cnn-color-text-secondary)` |
| `--foreground-subtle` | `var(--cnn-color-text-tertiary)` |
| `--border` | `var(--cnn-color-border-default)` |
| `--border-strong` | `var(--cnn-color-border-strong)` |
| `--tag-discovery-bg` | `var(--cnn-color-neutral-100)` |
| `--tag-discovery-text` | `var(--cnn-color-neutral-700)` |
| `--tag-discovery-border` | `var(--cnn-color-neutral-300)` |
| `--tag-spike-bg` | `var(--cnn-color-purple-100)` |
| `--tag-spike-text` | `var(--cnn-color-purple-700)` |
| `--tag-spike-border` | `var(--cnn-color-purple-300)` |
| `--tag-build-bg` | `var(--cnn-color-blue-100)` |
| `--tag-build-text` | `var(--cnn-color-blue-700)` |
| `--tag-build-border` | `var(--cnn-color-blue-300)` |
| `--tag-test-bg` | `var(--cnn-color-amber-100)` |
| `--tag-test-text` | `var(--cnn-color-amber-800)` |
| `--tag-test-border` | `var(--cnn-color-amber-400)` |
| `--tag-scale-bg` | `var(--cnn-color-green-100)` |
| `--tag-scale-text` | `var(--cnn-color-green-800)` |
| `--tag-scale-border` | `var(--cnn-color-green-400)` |
| `--priority-p1-bg` | `var(--cnn-color-red-100)` |
| `--priority-p1-text` | `var(--cnn-color-red-800)` |
| `--priority-p1-border` | `var(--cnn-color-red-400)` |
| `--priority-p2-bg` | `var(--cnn-color-amber-100)` |
| `--priority-p2-text` | `var(--cnn-color-amber-800)` |
| `--priority-p2-border` | `var(--cnn-color-amber-400)` |
| `--priority-p3-bg` | `var(--cnn-color-neutral-100)` |
| `--priority-p3-text` | `var(--cnn-color-neutral-700)` |
| `--priority-p3-border` | `var(--cnn-color-neutral-300)` |
| `--swimlane-1` | `var(--cnn-color-red-500)` |
| `--swimlane-2` | `var(--cnn-color-purple-400)` |
| `--swimlane-3` | `var(--cnn-color-sky-400)` |
| `--swimlane-4` | `var(--cnn-color-green-400)` |
| `--swimlane-5` | `var(--cnn-color-orange-400)` |
| `--swimlane-6` | `var(--cnn-color-yellow-300)` |

> **Note:** Vossi token names are examples based on typical CNN design system conventions. Open the installed package and inspect `dist/index.css` (or run `npx css-variables-dump`) to find the actual token names for your version.

### Example replacement in globals.css

Before:
```css
:root {
  --background: #ffffff;
  --surface: #f8f8f8;
  --foreground: #111111;
}
```

After:
```css
:root {
  --background: var(--cnn-color-surface-base);
  --surface: var(--cnn-color-surface-subtle);
  --foreground: var(--cnn-color-text-primary);
}
```

---

## Step 5 — Remove `.dark` overrides if Vossi handles dark mode

If `@cnnprivate/cnn-vossi-styles` provides its own dark mode token overrides (via `prefers-color-scheme` or a `.dark` class), you can delete the `.dark { ... }` block from `globals.css` to avoid conflicts.

If Vossi uses `prefers-color-scheme` media queries instead of a `.dark` class, update `ThemeProvider.tsx` to set `data-theme="dark"` on `<html>` instead of `className="dark"`:

```ts
// ThemeProvider.tsx — swap className for data-theme if Vossi requires it
document.documentElement.setAttribute("data-theme", next);
// remove: document.documentElement.classList.toggle("dark", next === "dark")
```

---

## Step 6 — Typography (optional)

If Vossi ships CNN brand fonts, replace Geist in `app/layout.tsx`:

```ts
// Remove the Geist imports and replace with:
import "@cnnprivate/cnn-vossi-styles/fonts";
```

And update `globals.css`:
```css
@theme inline {
  --font-sans: var(--cnn-font-sans);     /* e.g. CNN Sans */
  --font-mono: var(--cnn-font-mono);
}
```

---

## Step 7 — Verify

```bash
npm run dev     # check visually in both light and dark modes
npm run build   # confirm no type errors or missing imports
npm run lint    # clean lint pass
```

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `npm ERR! 404 @cnnprivate/cnn-vossi-styles` | `.npmrc` registry config is missing or token is wrong |
| Tokens resolve to `initial` / invisible text | Vossi CSS not imported, or import order is wrong |
| Dark mode not applying | Check whether Vossi uses `.dark` class or `data-theme` attribute |
| TypeScript errors on Vossi imports | Package may not ship types — add `declare module '@cnnprivate/cnn-vossi-styles'` in `app/types/vossi.d.ts` |
