"use client";

import { useCallback, useMemo } from "react";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryStates,
} from "nuqs";
import {
  type Filters,
  filtersFromUrl,
  filtersToUrl,
} from "./filters";

export function useRoadmapFilters() {
  const [params, setParams] = useQueryStates(
    {
      q: parseAsArrayOf(parseAsString),
      tag: parseAsArrayOf(parseAsString),
      priority: parseAsArrayOf(parseAsString),
      lane: parseAsArrayOf(parseAsString),
      search: parseAsString.withDefault(""),
    },
    { history: "push", shallow: true }
  );

  const filters = useMemo(() => filtersFromUrl(params), [params]);

  const setFilters = useCallback(
    (next: Filters) => {
      void setParams(filtersToUrl(next));
    },
    [setParams]
  );

  return { filters, setFilters };
}
