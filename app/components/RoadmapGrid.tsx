"use client";

import { useCallback, useEffect, useRef } from "react";
import type { RoadmapCard, Swimlane } from "../lib/roadmap-data";
import {
  QUARTERS,
  QUARTER_THEMES,
  SWIMLANES,
  SWIMLANE_SHORT,
} from "../lib/roadmap-data";
import {
  type Filters,
  cardMatches,
  countVisibleInSwimlane,
  orderVisibleCards,
} from "../lib/filters";
import { SWIMLANE_COLORS } from "../lib/styles";
import CardComponent from "./RoadmapCard";

interface RoadmapGridProps {
  cards: RoadmapCard[];
  filters: Filters;
  selectedCardId: string | null;
  focusedCardId: string | null;
  onFocusedCardChange: (cardId: string | null) => void;
  onCardClick: (card: RoadmapCard) => void;
  onSwimlaneClick: (lane: Swimlane) => void;
  onClearFilters: () => void;
}

export default function RoadmapGrid({
  cards,
  filters,
  selectedCardId,
  focusedCardId,
  onFocusedCardChange,
  onCardClick,
  onSwimlaneClick,
  onClearFilters,
}: RoadmapGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const visibleCards = orderVisibleCards(cards, filters);
  const totalVisible = visibleCards.length;

  const moveFocus = useCallback(
    (delta: number) => {
      if (visibleCards.length === 0) return;
      const currentIndex = focusedCardId
        ? visibleCards.findIndex((c) => c.id === focusedCardId)
        : -1;
      const nextIndex =
        currentIndex === -1
          ? delta > 0
            ? 0
            : visibleCards.length - 1
          : Math.min(
              visibleCards.length - 1,
              Math.max(0, currentIndex + delta)
            );
      onFocusedCardChange(visibleCards[nextIndex].id);
    },
    [focusedCardId, onFocusedCardChange, visibleCards]
  );

  useEffect(() => {
    if (!focusedCardId) return;
    const el = cardRefs.current.get(focusedCardId);
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [focusedCardId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (visibleCards.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(-1);
        break;
      case "Home":
        e.preventDefault();
        onFocusedCardChange(visibleCards[0].id);
        break;
      case "End":
        e.preventDefault();
        onFocusedCardChange(visibleCards[visibleCards.length - 1].id);
        break;
      case "Enter":
      case " ":
        if (focusedCardId) {
          e.preventDefault();
          const card = visibleCards.find((c) => c.id === focusedCardId);
          if (card) onCardClick(card);
        }
        break;
      default:
        break;
    }
  };

  if (totalVisible === 0) {
    return (
      <div className="flex flex-1 min-h-0 items-center justify-center p-8">
        <div className="max-w-sm text-center">
          <p className="text-sm font-medium text-foreground mb-2">
            No cards match your filters
          </p>
          <p className="text-xs text-foreground-muted leading-relaxed mb-4">
            Try adjusting your quarter, tag, priority, swimlane, or search
            filters to see roadmap cards again.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="focus-ring text-xs px-4 py-2 border border-border rounded-lg text-foreground-muted hover:text-foreground hover:border-border-strong transition-all"
          >
            Clear all filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      tabIndex={0}
      role="grid"
      aria-label="Roadmap cards"
      onKeyDown={handleKeyDown}
      className="focus-ring overflow-auto flex-1 min-h-0 outline-none"
    >
      <table className="border-collapse min-w-[900px] w-full">
        <thead>
          <tr>
            <th className="sticky left-0 top-0 z-20 bg-surface border border-border px-4 py-3 text-left min-w-[160px] w-[160px]" />
            {QUARTERS.map((q) => (
              <th
                key={q}
                className="sticky top-0 z-10 bg-surface border border-border px-4 py-3 text-left min-w-[260px]"
              >
                <span className="block text-sm font-semibold text-foreground">
                  {q}
                </span>
                <span className="block text-xs text-foreground-muted font-normal mt-0.5">
                  {QUARTER_THEMES[q]}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {SWIMLANES.map((lane) => {
            const laneColor = SWIMLANE_COLORS[lane];
            const laneActive = filters.swimlanes.has(lane);
            const laneCount = countVisibleInSwimlane(cards, lane, filters);

            return (
              <tr key={lane}>
                <td
                  className={`sticky left-0 z-10 border border-border align-top w-[160px] min-w-[160px] p-0 ${laneColor}`}
                >
                  <button
                    type="button"
                    onClick={() => onSwimlaneClick(lane)}
                    aria-pressed={laneActive}
                    title={`Filter to ${SWIMLANE_SHORT[lane]}`}
                    className={[
                      "focus-ring w-full h-full text-left px-3 py-4 transition-all",
                      laneActive ? "ring-2 ring-inset ring-white/60" : "",
                    ].join(" ")}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="block text-xs font-semibold leading-snug">
                        {SWIMLANE_SHORT[lane]}
                      </span>
                      <span className="shrink-0 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-semibold bg-black/20 text-inherit">
                        {laneCount}
                      </span>
                    </span>
                  </button>
                </td>

                {QUARTERS.map((q) => {
                  const cellCards = cards.filter(
                    (c) => c.swimlane === lane && c.quarter === q
                  );
                  const cellVisible = cellCards.filter((c) =>
                    cardMatches(c, filters)
                  );
                  const hasHidden =
                    cellCards.length > 0 &&
                    cellVisible.length < cellCards.length;

                  return (
                    <td
                      key={q}
                      className={[
                        "border border-border align-top p-2 min-w-[260px]",
                        cellCards.length === 0
                          ? "bg-surface opacity-50"
                          : "bg-background",
                      ].join(" ")}
                    >
                      <div className="flex flex-col gap-2">
                        {cellVisible.map((card) => (
                          <CardComponent
                            key={card.id}
                            card={card}
                            selected={selectedCardId === card.id}
                            focused={focusedCardId === card.id}
                            buttonRef={(el) => {
                              if (el) cardRefs.current.set(card.id, el);
                              else cardRefs.current.delete(card.id);
                            }}
                            onClick={onCardClick}
                          />
                        ))}
                        {hasHidden && (
                          <p className="text-[10px] text-center text-foreground-subtle py-1">
                            {cellCards.length - cellVisible.length} card
                            {cellCards.length - cellVisible.length > 1
                              ? "s"
                              : ""}{" "}
                            hidden
                          </p>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
