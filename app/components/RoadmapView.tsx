"use client";

import { useCallback, useState } from "react";
import type { RoadmapCard, Swimlane } from "../lib/roadmap-data";
import { CARDS } from "../lib/roadmap-data";
import { countVisible, EMPTY_FILTERS } from "../lib/filters";
import { useRoadmapFilters } from "../lib/use-roadmap-filters";
import FilterBar from "./FilterBar";
import RoadmapGrid from "./RoadmapGrid";
import SidePanel from "./SidePanel";
import { useTheme } from "./ThemeProvider";

export default function RoadmapView() {
  const { filters, setFilters } = useRoadmapFilters();
  const [selectedCard, setSelectedCard] = useState<RoadmapCard | null>(null);
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const { theme, toggle: toggleTheme } = useTheme();

  const visible = countVisible(CARDS, filters);

  const handleSwimlaneClick = useCallback(
    (lane: Swimlane) => {
      const isExclusive =
        filters.swimlanes.size === 1 && filters.swimlanes.has(lane);
      setFilters({
        ...filters,
        swimlanes: isExclusive ? new Set() : new Set([lane]),
      });
    },
    [filters, setFilters]
  );

  const handleCardClick = useCallback((card: RoadmapCard) => {
    setSelectedCard(card);
    setFocusedCardId(card.id);
    setPanelOpen(true);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden px-[164px]">
        <header className="flex-shrink-0 border-b border-border bg-background py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground leading-tight">
                Storytelling / Content Accelerator Lab Roadmap
              </h1>
              <p className="text-xs text-foreground-muted mt-1.5">
                Q3 2026–Q1 2027 · From Catch-Up MVP to repeatable storytelling systems
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleTheme}
                className="focus-ring p-1.5 rounded-lg border border-border bg-surface text-foreground-muted hover:text-foreground hover:border-border-strong transition-all"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={() => setPanelOpen((p) => !p)}
                className="focus-ring text-xs px-3 py-1.5 border border-border rounded-lg text-foreground-muted hover:text-foreground hover:border-border-strong transition-all"
              >
                {panelOpen ? "Hide panel" : "Show panel"}
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-foreground-muted bg-surface rounded-lg px-4 py-3 leading-relaxed">
            <span className="font-medium text-foreground">Strategic frame: </span>
            Catch-Up anchors the first wave of Storytelling / CAL. Q3 focuses on
            MVP learning, Daily Story 2.0, workflow intelligence, and partner
            readiness. Q4 tests and productizes the strongest concepts. Q1 scales
            validated patterns into reusable storytelling systems across surfaces,
            formats, and workflows.
          </p>
        </header>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          totalVisible={visible}
          totalCards={CARDS.length}
        />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <RoadmapGrid
            cards={CARDS}
            filters={filters}
            selectedCardId={selectedCard?.id ?? null}
            focusedCardId={focusedCardId}
            onFocusedCardChange={setFocusedCardId}
            onCardClick={handleCardClick}
            onSwimlaneClick={handleSwimlaneClick}
            onClearFilters={() => setFilters(EMPTY_FILTERS)}
          />
        </div>
      </div>

      {panelOpen && <SidePanel selectedCard={selectedCard} />}
    </div>
  );
}
