"use client";

import type { Tag, Priority } from "../lib/roadmap-data";
import { QUARTERS } from "../lib/roadmap-data";
import {
  type Filters,
  EMPTY_FILTERS,
  swimlaneFilterLabel,
} from "../lib/filters";
import { TAG_STYLES, PRIORITY_STYLES } from "../lib/styles";

interface FilterBarProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  totalVisible: number;
  totalCards: number;
}

const TAG_ACTIVE_STYLES: Record<Tag, string> = {
  DISCOVERY:
    "bg-tag-discovery-bg text-tag-discovery-text border border-tag-discovery-border",
  SPIKE: TAG_STYLES.SPIKE.pill,
  BUILD: TAG_STYLES.BUILD.pill,
  TEST: TAG_STYLES.TEST.pill,
  SCALE: TAG_STYLES.SCALE.pill,
};

function toggle<T>(set: Set<T>, val: T): Set<T> {
  const next = new Set(set);
  if (next.has(val)) {
    next.delete(val);
  } else {
    next.add(val);
  }
  return next;
}

const TAGS: Tag[] = ["DISCOVERY", "SPIKE", "BUILD", "TEST", "SCALE"];
const PRIORITIES: Priority[] = ["P1", "P2", "P3"];

export default function FilterBar({
  filters,
  onChange,
  totalVisible,
  totalCards,
}: FilterBarProps) {
  const chip = (
    active: boolean,
    label: string,
    onClick: () => void,
    className?: string
  ) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      className={[
        "focus-ring inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all",
        active
          ? className ?? "bg-foreground text-background border-foreground"
          : "bg-surface dark:bg-background text-foreground-muted border border-border hover:border-border-strong hover:text-foreground",
      ].join(" ")}
    >
      {label}
    </button>
  );

  const hasFilters =
    filters.quarters.size > 0 ||
    filters.tags.size > 0 ||
    filters.priorities.size > 0 ||
    filters.swimlanes.size > 0 ||
    filters.search !== "";

  return (
    <div className="border-b border-border bg-background">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground-subtle font-medium">Quarter</span>
          <div className="flex gap-1">
            {QUARTERS.map((q) =>
              chip(
                filters.quarters.has(q),
                q.split(" ")[0],
                () =>
                  onChange({ ...filters, quarters: toggle(filters.quarters, q) })
              )
            )}
          </div>
        </div>

        <div className="h-4 w-px bg-border hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground-subtle font-medium">Tag</span>
          <div className="flex gap-1 flex-wrap">
            {TAGS.map((t) =>
              chip(
                filters.tags.has(t),
                TAG_STYLES[t].label,
                () => onChange({ ...filters, tags: toggle(filters.tags, t) }),
                filters.tags.has(t) ? TAG_ACTIVE_STYLES[t] : undefined
              )
            )}
          </div>
        </div>

        <div className="h-4 w-px bg-border hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground-subtle font-medium">Priority</span>
          <div className="flex gap-1">
            {PRIORITIES.map((p) =>
              chip(
                filters.priorities.has(p),
                p,
                () =>
                  onChange({
                    ...filters,
                    priorities: toggle(filters.priorities, p),
                  }),
                filters.priorities.has(p)
                  ? `${PRIORITY_STYLES[p].pill}`
                  : undefined
              )
            )}
          </div>
        </div>

        <div className="relative ml-auto">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground-subtle pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search cards…"
            className="focus-ring pl-8 pr-3 py-1.5 text-xs bg-surface border border-border rounded-lg text-foreground placeholder:text-foreground-subtle w-44"
          />
        </div>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2 pb-2.5 flex-wrap">
          <span className="text-xs text-foreground-subtle">
            {totalVisible} of {totalCards} cards
          </span>
          {[...filters.quarters].map((q) => (
            <ActiveChip
              key={q}
              label={q.split(" ")[0]}
              onRemove={() =>
                onChange({ ...filters, quarters: toggle(filters.quarters, q) })
              }
            />
          ))}
          {[...filters.swimlanes].map((lane) => (
            <ActiveChip
              key={lane}
              label={swimlaneFilterLabel(lane)}
              onRemove={() =>
                onChange({
                  ...filters,
                  swimlanes: toggle(filters.swimlanes, lane),
                })
              }
            />
          ))}
          {[...filters.tags].map((t) => (
            <ActiveChip
              key={t}
              label={t}
              onRemove={() =>
                onChange({ ...filters, tags: toggle(filters.tags, t) })
              }
            />
          ))}
          {[...filters.priorities].map((p) => (
            <ActiveChip
              key={p}
              label={p}
              onRemove={() =>
                onChange({
                  ...filters,
                  priorities: toggle(filters.priorities, p),
                })
              }
            />
          ))}
          {filters.search && (
            <ActiveChip
              label={`"${filters.search}"`}
              onRemove={() => onChange({ ...filters, search: "" })}
            />
          )}
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="focus-ring text-xs text-foreground-subtle underline hover:text-foreground ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-surface border border-border text-foreground-muted">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="focus-ring text-foreground-subtle hover:text-foreground ml-0.5 rounded"
      >
        ×
      </button>
    </span>
  );
}
