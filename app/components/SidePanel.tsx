"use client";

import { useEffect, useRef, useState } from "react";
import type { RoadmapCard } from "../lib/roadmap-data";
import {
  QUARTER_THEMES,
  KEY_DECISIONS,
} from "../lib/roadmap-data";
import { TAG_STYLES, PRIORITY_STYLES } from "../lib/styles";

type PanelTab = "card" | "decisions" | "legend";

interface SidePanelProps {
  selectedCard: RoadmapCard | null;
}

export default function SidePanel({ selectedCard }: SidePanelProps) {
  const [tab, setTab] = useState<PanelTab>(
    selectedCard ? "card" : "decisions"
  );
  const prevSelectedCardIdRef = useRef<string | null>(
    selectedCard?.id ?? null
  );

  // Auto-switch to Detail only when a card is first selected (null → card)
  useEffect(() => {
    const id = selectedCard?.id ?? null;
    if (id !== null && prevSelectedCardIdRef.current === null) {
      setTab("card");
    }
    prevSelectedCardIdRef.current = id;
  }, [selectedCard]);

  const tabClass = (t: PanelTab) =>
    [
      "focus-ring flex-1 py-2.5 text-xs font-medium border-b-2 transition-colors",
      tab === t
        ? "border-foreground text-foreground"
        : "border-transparent text-foreground-muted hover:text-foreground",
    ].join(" ");

  return (
    <aside className="w-72 min-w-[288px] border-l border-border bg-surface-raised flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          type="button"
          className={tabClass("decisions")}
          onClick={() => setTab("decisions")}
        >
          Decisions
        </button>
        <button
          type="button"
          className={tabClass("card")}
          onClick={() => setTab("card")}
        >
          Detail
        </button>
        <button
          type="button"
          className={tabClass("legend")}
          onClick={() => setTab("legend")}
        >
          Legend
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "decisions" && <DecisionsPanel />}
        {tab === "card" && (
          <CardDetailPanel card={selectedCard} />
        )}
        {tab === "legend" && <LegendPanel />}
      </div>
    </aside>
  );
}

/* ─── Decisions ──────────────────────────────────────────────────────────── */
function DecisionsPanel() {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle mb-3">
        Key decisions needed
      </h2>
      <ol className="space-y-3">
        {KEY_DECISIONS.map((d, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-xs font-semibold text-foreground-subtle min-w-[18px]">
              {i + 1}.
            </span>
            <span className="text-xs text-foreground-muted leading-relaxed">
              {d}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─── Card Detail ────────────────────────────────────────────────────────── */
function CardDetailPanel({ card }: { card: RoadmapCard | null }) {
  if (!card) {
    return (
      <div className="text-center pt-12">
        <svg
          className="w-8 h-8 mx-auto text-foreground-subtle mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 15l-6-6m0 0l6-6m-6 6h12"
          />
        </svg>
        <p className="text-xs text-foreground-subtle leading-relaxed">
          Click any card on the roadmap to view its details here.
        </p>
      </div>
    );
  }

  const tagStyle = TAG_STYLES[card.tag];
  const prioStyle = PRIORITY_STYLES[card.priority];

  return (
    <div className="space-y-4">
      {/* Badges */}
      <div className="flex gap-2 flex-wrap">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${tagStyle.pill}`}>
          {tagStyle.label}
        </span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${prioStyle.pill}`}>
          {prioStyle.label}
        </span>
      </div>

      {/* Title */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-1">
          Title
        </p>
        <p className="text-sm font-semibold text-foreground leading-snug">
          {card.title}
        </p>
      </div>

      {/* Description */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-1">
          Description
        </p>
        <p className="text-xs text-foreground-muted leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Quarter */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-1">
          Quarter
        </p>
        <p className="text-xs text-foreground">
          {card.quarter} &middot; {QUARTER_THEMES[card.quarter]}
        </p>
      </div>

      {/* Swimlane */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-1">
          Swimlane
        </p>
        <p className="text-xs text-foreground leading-snug">{card.swimlane}</p>
      </div>

      {/* Dependencies */}
      {card.dependencies && card.dependencies.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">
            Dependencies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.dependencies.map((dep) => (
              <span
                key={dep}
                className="text-xs bg-surface border border-border rounded px-2 py-0.5 text-foreground-muted"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Legend ─────────────────────────────────────────────────────────────── */
function LegendPanel() {
  return (
    <div className="space-y-5">
      {/* Tags */}
      <div>
        <h3 className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-2 font-semibold">
          Card tags
        </h3>
        <div className="space-y-2">
          {(
            [
              ["DISCOVERY", "Research, concept framing, partner alignment"],
              ["SPIKE", "Technical feasibility, architecture, workflow"],
              ["BUILD", "MVP work, implementation, prototype"],
              ["TEST", "User testing, experiment, pilot, A/B"],
              ["SCALE", "Rollout, reusable system, standardization"],
            ] as const
          ).map(([tag, desc]) => (
            <div key={tag} className="flex items-start gap-2">
              <span
                className={`mt-0.5 inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${TAG_STYLES[tag].pill}`}
              >
                {TAG_STYLES[tag].label}
              </span>
              <span className="text-xs text-foreground-muted leading-relaxed">
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div>
        <h3 className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-2 font-semibold">
          Priority levels
        </h3>
        <div className="space-y-2">
          {(
            [
              ["P1", "Must be in Q3 planning"],
              ["P2", "Active discovery or likely Q4"],
              ["P3", "Explore if capacity allows"],
            ] as const
          ).map(([p, desc]) => (
            <div key={p} className="flex items-start gap-2">
              <span
                className={`mt-0.5 inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${PRIORITY_STYLES[p].pill}`}
              >
                {p}
              </span>
              <span className="text-xs text-foreground-muted leading-relaxed">
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Border accent */}
      <div>
        <h3 className="text-[10px] uppercase tracking-wider text-foreground-subtle mb-2 font-semibold">
          Card left border
        </h3>
        <div className="space-y-1.5">
          {[
            ["#e24b4a", "P1 — must do"],
            ["#ef9f27", "P2 — likely next"],
            ["#b4b2a9", "P3 — nice to have"],
          ].map(([color, label]) => (
            <div key={color} className="flex items-center gap-2">
              <span
                className="inline-block w-1 h-4 rounded-sm shrink-0"
                style={{ background: color }}
              />
              <span className="text-xs text-foreground-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
