import type { Tag, Priority } from "./roadmap-data";

// ─────────────────────────────────────────────────────────────────────────────
// TAG STYLES
// Each entry provides Tailwind classes for the badge pill and the card's
// left-border accent.
//
// VOSSI INTEGRATION NOTE:
//   Replace the hardcoded hex values in globals.css with Vossi design tokens
//   once @cnnprivate/cnn-vossi-styles is installed. See docs/vossi-guide.md.
// ─────────────────────────────────────────────────────────────────────────────

export const TAG_STYLES: Record<
  Tag,
  { pill: string; border: string; label: string }
> = {
  DISCOVERY: {
    pill: "bg-tag-discovery-bg text-tag-discovery-text border border-tag-discovery-border",
    border: "border-l-tag-discovery-border",
    label: "Discovery",
  },
  SPIKE: {
    pill: "bg-tag-spike-bg text-tag-spike-text border border-tag-spike-border",
    border: "border-l-tag-spike-border",
    label: "Spike",
  },
  BUILD: {
    pill: "bg-tag-build-bg text-tag-build-text border border-tag-build-border",
    border: "border-l-tag-build-border",
    label: "Build",
  },
  TEST: {
    pill: "bg-tag-test-bg text-tag-test-text border border-tag-test-border",
    border: "border-l-tag-test-border",
    label: "Test",
  },
  SCALE: {
    pill: "bg-tag-scale-bg text-tag-scale-text border border-tag-scale-border",
    border: "border-l-tag-scale-border",
    label: "Scale",
  },
};

export const PRIORITY_STYLES: Record<
  Priority,
  { pill: string; accent: string; label: string }
> = {
  P1: {
    pill: "bg-priority-p1-bg text-priority-p1-text border border-priority-p1-border",
    accent: "border-l-priority-p1-border",
    label: "P1",
  },
  P2: {
    pill: "bg-priority-p2-bg text-priority-p2-text border border-priority-p2-border",
    accent: "border-l-priority-p2-border",
    label: "P2",
  },
  P3: {
    pill: "bg-priority-p3-bg text-priority-p3-text border border-priority-p3-border",
    accent: "border-l-priority-p3-border",
    label: "P3",
  },
};

// Swimlane header colors — one per lane for the colored left label column
// matching the reference design (colored row headers).
export const SWIMLANE_COLORS: Record<string, string> = {
  "Catch-Up Systems / Daily Story":
    "bg-swimlane-1 text-swimlane-1-text",
  "Workflow Intelligence + AI/ML":
    "bg-swimlane-2 text-swimlane-2-text",
  "Timeline / Storyline Navigation":
    "bg-swimlane-3 text-swimlane-3-text",
  "Surface + Daypart Expansion":
    "bg-swimlane-4 text-swimlane-4-text",
  "Features Programming + Richer Storytelling":
    "bg-swimlane-5 text-swimlane-5-text",
  "Operating Model + Partner Readiness":
    "bg-swimlane-6 text-swimlane-6-text",
};
