import type { Quarter, Tag, Priority, Swimlane } from "./roadmap-data";
import {
  QUARTERS,
  SWIMLANES,
  SWIMLANE_SHORT,
} from "./roadmap-data";
import type { RoadmapCard } from "./roadmap-data";

export interface Filters {
  quarters: Set<Quarter>;
  tags: Set<Tag>;
  priorities: Set<Priority>;
  swimlanes: Set<Swimlane>;
  search: string;
}

export const EMPTY_FILTERS: Filters = {
  quarters: new Set(),
  tags: new Set(),
  priorities: new Set(),
  swimlanes: new Set(),
  search: "",
};

const TAGS: Tag[] = ["DISCOVERY", "SPIKE", "BUILD", "TEST", "SCALE"];
const PRIORITIES: Priority[] = ["P1", "P2", "P3"];

export const QUARTER_SLUG: Record<Quarter, string> = {
  "Q3 2026": "q3",
  "Q4 2026": "q4",
  "Q1 2027": "q1",
};

export const SLUG_TO_QUARTER: Record<string, Quarter> = {
  q3: "Q3 2026",
  q4: "Q4 2026",
  q1: "Q1 2027",
};

export const SWIMLANE_SLUG: Record<Swimlane, string> = {
  "Catch-Up Systems / Daily Story": "catch-up",
  "Workflow Intelligence + AI/ML": "workflow",
  "Timeline / Storyline Navigation": "timeline",
  "Surface + Daypart Expansion": "surface",
  "Features Programming + Richer Storytelling": "features",
  "Operating Model + Partner Readiness": "operating",
};

export const SLUG_TO_SWIMLANE: Record<string, Swimlane> = Object.fromEntries(
  SWIMLANES.map((lane) => [SWIMLANE_SLUG[lane], lane])
) as Record<string, Swimlane>;

export function cardMatches(card: RoadmapCard, filters: Filters): boolean {
  if (filters.swimlanes.size > 0 && !filters.swimlanes.has(card.swimlane as Swimlane))
    return false;
  if (filters.quarters.size > 0 && !filters.quarters.has(card.quarter))
    return false;
  if (filters.tags.size > 0 && !filters.tags.has(card.tag)) return false;
  if (filters.priorities.size > 0 && !filters.priorities.has(card.priority))
    return false;
  if (filters.search) {
    const q = filters.search.toLowerCase();
    if (
      !card.title.toLowerCase().includes(q) &&
      !card.description.toLowerCase().includes(q)
    )
      return false;
  }
  return true;
}

export function countVisible(cards: RoadmapCard[], filters: Filters): number {
  return cards.filter((c) => cardMatches(c, filters)).length;
}

export function orderVisibleCards(
  cards: RoadmapCard[],
  filters: Filters
): RoadmapCard[] {
  const ordered: RoadmapCard[] = [];
  for (const lane of SWIMLANES) {
    for (const quarter of QUARTERS) {
      for (const card of cards) {
        if (
          card.swimlane === lane &&
          card.quarter === quarter &&
          cardMatches(card, filters)
        ) {
          ordered.push(card);
        }
      }
    }
  }
  return ordered;
}

export function countVisibleInSwimlane(
  cards: RoadmapCard[],
  lane: Swimlane,
  filters: Filters
): number {
  return cards.filter(
    (c) => c.swimlane === lane && cardMatches(c, filters)
  ).length;
}

export function filtersFromUrl(params: {
  q: string[] | null;
  tag: string[] | null;
  priority: string[] | null;
  lane: string[] | null;
  search: string;
}): Filters {
  return {
    quarters: new Set(
      (params.q ?? [])
        .map((slug) => SLUG_TO_QUARTER[slug])
        .filter((q): q is Quarter => q !== undefined)
    ),
    tags: new Set(
      (params.tag ?? []).filter((t): t is Tag => TAGS.includes(t as Tag))
    ),
    priorities: new Set(
      (params.priority ?? []).filter((p): p is Priority =>
        PRIORITIES.includes(p as Priority)
      )
    ),
    swimlanes: new Set(
      (params.lane ?? [])
        .map((slug) => SLUG_TO_SWIMLANE[slug])
        .filter((l): l is Swimlane => l !== undefined)
    ),
    search: params.search,
  };
}

export function filtersToUrl(filters: Filters): {
  q: string[] | null;
  tag: string[] | null;
  priority: string[] | null;
  lane: string[] | null;
  search: string | null;
} {
  const q = [...filters.quarters].map((quarter) => QUARTER_SLUG[quarter]);
  const tag = [...filters.tags];
  const priority = [...filters.priorities];
  const lane = [...filters.swimlanes].map((swimlane) => SWIMLANE_SLUG[swimlane]);

  return {
    q: q.length > 0 ? q : null,
    tag: tag.length > 0 ? tag : null,
    priority: priority.length > 0 ? priority : null,
    lane: lane.length > 0 ? lane : null,
    search: filters.search || null,
  };
}

export function swimlaneFilterLabel(lane: Swimlane): string {
  return SWIMLANE_SHORT[lane];
}
