import type { PeruContextId } from "./peru-context-nav";
import type { UxRoadmapPhase } from "./ux-roadmap";

export type ExecutiveThemeId = "service-level" | "consumer" | "rewards";

export type ExecutiveThemeCard = {
 id: ExecutiveThemeId;
 peruContext: PeruContextId;
 label: string;
 aliases: string;
 primaryPhase: UxRoadmapPhase | "gate";
 nowAction: string;
 topProblems: [string, string, string];
};

export const GLOBAL_EXECUTIVE_THEMES: ExecutiveThemeCard[] = [
 {
 id: "service-level",
 peruContext: "service-level",
 label: "Field & ops",
 aliases: "Operations in All tab · Service Level = Sep 1 vision",
 primaryPhase: "now",
 nowAction: "Peak reliability + inventory truth + fair dispatch",
 topProblems: [
 "Seller reliability at peak — sound, session, expired orders",
 "GPS / map frozen — ~80% of 'late' complaints are display",
 "Inventory without quantity — combos and search broken",
 ],
 },
 {
 id: "consumer",
 peruContext: "consumer",
 label: "Consumer",
 aliases: "Sep 2 workshop + Sep 3 product vision",
 primaryPhase: "now",
 nowAction: "Live courier map + wrong-address UX",
 topProblems: [
 "Courier pin stuck at store after leaving",
 "Wrong address — ~18% of cancellations (PE)",
 "Promo visible to consumer but not to seller/supply",
 ],
 },
 {
 id: "rewards",
 peruContext: "rewards",
 label: "Rewards",
 aliases: "Club TaDa · Braze · loyalty",
 primaryPhase: "gate",
 nowAction: "Gate only — fix core reliability + data stack before scaling tiers",
 topProblems: [
 "CRM triggers need inventory + logistics truth first",
 "Club TaDa native integration — EC Oct 8 #1 vote + PE Braze enrichment",
 "Anti-fraud before scaling loyalty tiers",
 ],
 },
];
