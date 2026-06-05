"use client";

import type { Priority, RoadmapCard } from "../lib/roadmap-data";
import { TAG_STYLES, PRIORITY_STYLES } from "../lib/styles";

interface CardProps {
  card: RoadmapCard;
  selected?: boolean;
  focused?: boolean;
  buttonRef?: (el: HTMLButtonElement | null) => void;
  onClick: (card: RoadmapCard) => void;
}

const SELECTED_STYLES: Record<Priority, string> = {
  P1: "border-2 border-priority-p1-border bg-priority-p1-bg/40 shadow-md -translate-y-0.5",
  P2: "border-2 border-priority-p2-border bg-priority-p2-bg/40 shadow-md -translate-y-0.5",
  P3: "border-2 border-priority-p3-border bg-priority-p3-bg/40 shadow-md -translate-y-0.5",
};

export default function Card({
  card,
  selected = false,
  focused = false,
  buttonRef,
  onClick,
}: CardProps) {
  const tagStyle = TAG_STYLES[card.tag];
  const prioStyle = PRIORITY_STYLES[card.priority];

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onClick(card)}
      className={[
        "focus-ring w-full text-left rounded-lg p-3 transition-all",
        focused && !selected
          ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
          : "",
        selected
          ? SELECTED_STYLES[card.priority]
          : [
              "bg-surface-raised border border-border border-l-2",
              "hover:-translate-y-0.5 hover:border-border-strong",
              prioStyle.accent,
            ].join(" "),
      ].join(" ")}
    >
      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
        <span
          className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${tagStyle.pill}`}
        >
          {tagStyle.label}
        </span>
        <span
          className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${prioStyle.pill}`}
        >
          {prioStyle.label}
        </span>
      </div>

      <p className="text-xs font-medium text-foreground leading-snug line-clamp-3">
        {card.title}
      </p>

      {card.dependencies && card.dependencies.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-foreground-subtle">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1"
            />
          </svg>
          {card.dependencies.length} dep{card.dependencies.length > 1 ? "s" : ""}
        </div>
      )}
    </button>
  );
}
