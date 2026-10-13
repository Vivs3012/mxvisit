import type { ColombiaInsight } from "./colombia-insights";
import type { ColombiaAllInsight } from "./colombia-synthesis-all";

import { GROWTH_PILLAR_ORDER } from "./dashboard-display-balance";

const PILLAR_ORDER: Record<ColombiaInsight["pillar"], number> = {
  Growth: GROWTH_PILLAR_ORDER.Growth,
  Rewards: GROWTH_PILLAR_ORDER.Rewards,
  Commercial: GROWTH_PILLAR_ORDER.Commercial,
  Product: GROWTH_PILLAR_ORDER.Product,
  Expansion: GROWTH_PILLAR_ORDER.Expansion,
  Operations: GROWTH_PILLAR_ORDER.Operations,
};

const ALL_INSIGHT_ORDER: string[] = [
  "all-marketplace-crm",
  "all-club-rewards",
  "all-coordination",
  "all-integration-gate",
  "all-ops-reliability",
  "all-braze",
  "all-expansion",
];

const SL_INSIGHT_ORDER: string[] = [
  "co-sl-consumer-bot",
  "co-sl-braze-ab",
  "co-sl-ai-coach",
  "co-sl-ally-comms",
  "co-sl-routing-multi-assign",
  "co-sl-kpi-window",
  "co-sl-bees-cieza",
  "co-sl-revenue-rec",
  "co-sl-stock-cart",
  "co-sl-capacity-sla",
];

export function sortColombiaMeetingInsights(
  insights: ColombiaInsight[],
  session?: "product-intro" | "service-level",
): ColombiaInsight[] {
  if (session === "service-level") {
    return [...insights].sort((a, b) => {
      const ia = SL_INSIGHT_ORDER.indexOf(a.id);
      const ib = SL_INSIGHT_ORDER.indexOf(b.id);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }
  return [...insights].sort(
    (a, b) => PILLAR_ORDER[a.pillar] - PILLAR_ORDER[b.pillar],
  );
}

export function sortColombiaAllInsights(insights: ColombiaAllInsight[]): ColombiaAllInsight[] {
  return [...insights].sort((a, b) => {
    const ia = ALL_INSIGHT_ORDER.indexOf(a.id);
    const ib = ALL_INSIGHT_ORDER.indexOf(b.id);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}
