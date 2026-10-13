export type ColombiaInsightPriority = "Critical" | "High" | "Medium";

export type ColombiaInsight = {
 id: string;
 priority: ColombiaInsightPriority;
 pillar: "Growth" | "Commercial" | "Operations" | "Rewards" | "Product" | "Expansion";
 title: string;
 detail: string;
 productHook?: string;
 globalRank?: number;
 quotes: string[];
};

/** Sep 13, 2026 — first product intro meeting */
export const COLOMBIA_MEETING_INSIGHTS: ColombiaInsight[] = [
 {
 id: "bis-siesa-availability",
 priority: "Critical",
 pillar: "Operations",
 title: "BEES off while store has stock — SIESA not integrated",
 detail:
 "False availability (liquid vs bottle, SKU off in BEES) hurt first orders and early retention. Colombia invented an availability score + ranking + incentive locally — the same class of pain as the quantity MVP in Mexico, Peru and Ecuador, but here the gap is ERP (SIESA) vs BEES truth.",
 productHook: "SKU-level on/off truth + optional ERP feed for allies.",
 globalRank: 44,
 quotes: ["BEES and SIESA are not integrated — the biggest pain in Colombia."],
 },
 {
 id: "marketplace-retention-mix",
 priority: "Critical",
 pillar: "Growth",
 title: "Marketplace acquisition dilutes retention — new clusters & night behavior",
 detail:
 "~30% of beer campaigns land marketplace-only carts. Users buy every 22–30 days vs 12–14 for beer; retention weak when AOV <50k or >120k COP. Night-heavy marketplace behavior means 4pm beer CRM windows miss the cohort — segmentation and occasion timing must differ from core beer.",
 productHook: "Segmentation + comms windows; do not treat marketplace like beer cohort.",
 globalRank: 45,
 quotes: [
 "Marketplace users are completely different — we cannot message at 4pm like beer users.",
 ],
 },
 {
 id: "partnership-cac-retention",
 priority: "High",
 pillar: "Growth",
 title: "Bank partnerships — efficient CAC, weak post-promo retention",
 detail:
 "10–15% of users arrive at $2–3 CAC; BIN/datáfono reporting proves value to banks. A large 50% bank promo spiked acquisition then churned when the promo ended. 2026 focus is partnerships for retention (points, in-app bank narrative) — not only efficient acquisition spikes.",
 globalRank: 46,
 quotes: ["Partnerships are the quick win — but retention is not as good."],
 },
 {
 id: "own-vs-aliado",
 priority: "High",
 pillar: "Expansion",
 title: "Own stores vs Community POC — 80/20 orders, different paypoints & data",
 detail:
 "Most orders still run through own stores with SIESA control; allies lack Power BI/cluster access — Top Tiendas + Luana bridge data today. Paypoints, owner swap and incentive rules differ from Ecuador Community POC and Peru third-party models — one playbook cannot ship for both.",
 productHook: "Two seller personas in one country — use separate dashboards per model.",
 globalRank: 47,
 quotes: [
 "Community POC gives capillarity — we still feed them orders from own stores.",
 ],
 },
 {
 id: "store-off-overlap",
 priority: "High",
 pillar: "Operations",
 title: "Store-off coverage, overlap & Torre de Control",
 detail:
 "When an allied store turns off, the delivery zone cannot be covered automatically — ops plans overlap with about three to four stores per area. On weekends a small control team watches the map and sends WhatsApp alerts. Colombia wants automatic alarms when a store goes off, similar to when one Mexico POC absorbs all orders from neighbors.",
 productHook: "Proactive off-store alerts to ops, not only manual map watch.",
 globalRank: 48,
 quotes: ["We need an alarm when stores turn off — not someone watching the map on weekends."],
 },
 {
 id: "stockout-sku-platform",
 priority: "High",
 pillar: "Commercial",
 title: "Stockout in platform — SKU line at 90%, not category only",
 detail:
 "Power BI category stockout works for allies ramping volume, but extended SKU portfolio analytics stay external. The ask is a per-SKU stockout bar in BEES/seller — aligned to commercial minimum thresholds, not only category rollups.",
 globalRank: 49,
 quotes: ["Ideal: stockout measurement for every SKU in the platform, not only category."],
 },
 {
 id: "club-for-you",
 priority: "Critical",
 pillar: "Rewards",
 title: "Club TaDa capacity gap + algorithmic For You shelves",
 detail:
 "Club team is understaffed — Lovers volume is down and missions slip. Product vision is fully algorithmic For You shelves, blocked today by SEM single-SKU layout versus sampling and multi-SKU flexibility competitors already show.",
 globalRank: 50,
 quotes: [
 "For You should be completely algorithmic — today the same manual showcase for everyone.",
 ],
 },
 {
 id: "billing-api",
 priority: "High",
 pillar: "Product",
 title: "E-invoicing — order export / billing API (Zé Delivery lesson)",
 detail:
 "After accept, order data is hard to export for billing; manual discounts multiply reconciliation work under audit pressure. Prefer one documented billing API that stores actually use over dozens of ERP integrations — Zé’s parallel shows integrations without daily adoption do not reach aliado stores.",
 globalRank: 51,
 quotes: [
 "Zé built integrations but 60% of stores stopped using the product — only their ERP.",
 ],
 },
 {
 id: "flash-occasions",
 priority: "Medium",
 pillar: "Commercial",
 title: "Flash promo slots & marketplace occasions",
 detail:
 "Flash promo runs in strict dayparts (beer midday, marketplace night) — ops switches mechanics manually. Next year bets are occasion-based cross-sell personalized by day/hour once availability and seller tooling catch up.",
 quotes: ["From 12–3 one promo, 3–6 another, 6–9 another — marketplace concentrates at night."],
 },
 {
 id: "ciesa-ally-erp",
 priority: "Medium",
 pillar: "Product",
 title: "CIESA / ERP path for high-volume allies",
 detail:
 "A high-volume Community POC (~2k orders/month) could integrate if a credible ERP path exists. E-invoicing is mandatory — even partial availability pass-through from BEES helps allies bill correctly before a full CIESA program.",
 quotes: ["A Community POC doing 2,000 orders a month could integrate if they had the option."],
 },
];

export const COLOMBIA_CROSS_THEMES = [
 {
 theme: "Two-speed retail model",
 detail:
 "Own stores bring control, SIESA and ~80% of orders; Community POC brings capillarity but weaker data and paypoint rules. Product, dashboards and incentives must fork by persona instead of one seller playbook.",
 },
 {
 theme: "Acquisition composition vs retention",
 detail:
 "Bank partnerships, marketplace carts and football promos change who enters and how often they return. Tiers, CRM windows and occasion messaging must follow cohort composition — not a single beer journey.",
 },
 {
 theme: "Personalization and reliability together",
 detail:
 "For You, Club missions and flash dayparts need clean BEES/ERP and SKU stockout signals — but rewards and CRM should run in parallel with seller KPI and routing fixes, not wait until peak is perfect.",
 },
 {
 theme: "Integrations need adoption",
 detail:
 "Billing export and ERP paths only win if aliado stores keep using seller daily. Colombia cites Zé: integrations without adoption never surface features to the long tail.",
 },
];
