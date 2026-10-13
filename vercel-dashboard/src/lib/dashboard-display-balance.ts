/**
 * Display order helpers — surface consumer/rewards/growth before pure ops/reliability
 * without changing underlying rank IDs or search indices.
 */

import type { GlobalInsight } from "./global-insights";

const GLOBAL_LAYER_ORDER: Record<GlobalInsight["layer"], number> = {
 Growth: 0,
 Loyalty: 1,
 Communication: 2,
 Portfolio: 3,
 Commercial: 4,
 Metrics: 5,
 Reliability: 6,
 "Peak ops": 7,
 Infra: 8,
};

export function sortGlobalInsightsForDisplay(insights: GlobalInsight[]): GlobalInsight[] {
  return [...insights].sort((a, b) => {
    const layer = GLOBAL_LAYER_ORDER[a.layer] - GLOBAL_LAYER_ORDER[b.layer];
    if (layer !== 0) return layer;
    return a.rank - b.rank;
  });
}

/** UX/Product read as consumer-facing; Operation/Infra as ops-heavy. */
const INSIGHT_CATEGORY_ORDER: Record<string, number> = {
  UX: 0,
  CX: 0,
  Product: 1,
  Bug: 2,
  Operation: 3,
  Infra: 4,
};

export function sortByInsightCategory<T extends { category: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) =>
      (INSIGHT_CATEGORY_ORDER[a.category] ?? 5) - (INSIGHT_CATEGORY_ORDER[b.category] ?? 5),
  );
}

export const GROWTH_PILLAR_ORDER: Record<string, number> = {
  Growth: 0,
  Rewards: 1,
  Consumer: 2,
  Commercial: 3,
  Product: 4,
  Expansion: 5,
  Operations: 6,
  "Service Level": 7,
};

export function sortByGrowthPillar<T extends { pillar: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) =>
      (GROWTH_PILLAR_ORDER[a.pillar] ?? 8) - (GROWTH_PILLAR_ORDER[b.pillar] ?? 8),
  );
}

const PRIORITY_BAND: Record<string, number> = { Critical: 0, High: 1, Medium: 2 };

/** Priority band first, then growth-oriented pillar. */
export function sortByPriorityThenGrowthPillar<
  T extends { priority: string; pillar: string },
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const p = (PRIORITY_BAND[a.priority] ?? 9) - (PRIORITY_BAND[b.priority] ?? 9);
    if (p !== 0) return p;
    return (
      (GROWTH_PILLAR_ORDER[a.pillar] ?? 8) - (GROWTH_PILLAR_ORDER[b.pillar] ?? 8)
    );
  });
}

export type PeruTripSource =
  | "Context"
  | "Stores"
  | "B2B"
  | "Service level"
  | "Workshop"
  | "Consumer"
  | "Rewards";

const PERU_SOURCE_ORDER: Record<PeruTripSource, number> = {
  Consumer: 0,
  Rewards: 1,
  Stores: 2,
  B2B: 3,
  Context: 4,
  Workshop: 5,
  "Service level": 6,
};

export function sortPeruSessionHighlights<
  T extends { source: PeruTripSource; session: string },
>(highlights: T[]): T[] {
  return [...highlights].sort(
    (a, b) => PERU_SOURCE_ORDER[a.source] - PERU_SOURCE_ORDER[b.source],
  );
}

export function sortPeruTracks<T extends { group: "growth" | "service-level" }>(
  tracks: T[],
): T[] {
  return [...tracks].sort((a, b) => {
    if (a.group === b.group) return 0;
    return a.group === "growth" ? -1 : 1;
  });
}
