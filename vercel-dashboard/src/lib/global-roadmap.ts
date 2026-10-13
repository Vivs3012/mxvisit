import {
 UX_ROADMAP_PRINCIPLES,
 countUxRoadmapByPhase,
 type UxRoadmapPhase,
} from "./ux-roadmap";

export type GlobalRoadmapPhaseItem = {
 theme: string;
 outcome: string;
 itemIds: string[];
 evidence?: string;
};

export const GLOBAL_PRODUCT_OUTCOME = {
 statement:
 "Increase Perfect Order at peak by fixing reliability and inventory truth first — before scaling loyalty, vending, or football occasion bets.",
 primaryMetric: "Perfect Order % at peak",
 guardrails: ["Expired order rate", "Fill Rate by POC", "CX coordination ticket %"],
 persona: "POC seller + supervisor during Saturday peak (20–50 orders, 5–8 couriers)",
};

export const GLOBAL_ROADMAP_NORTH_STAR =
 "Fix what breaks at peak before adding new screens. Sellers will not adopt metrics or financial tools they cannot audit.";

export const GLOBAL_ROADMAP_LAYERS = [
 {
 layer: "Foundation — Reliability",
 subtitle: "See and receive the order",
 detail: "Sound, session, push, map load. No Layer 3 without this.",
 },
 {
 layer: "Layer 2 — Peak decision",
 subtitle: "Distribute fast without leaving the screen",
 detail: "Assign on map, visual priority, multi-assign, fair SLA.",
 },
 {
 layer: "Layer 3 — Management & trust",
 subtitle: "Metrics, reimbursement, day planning",
 detail: "Date filters, line-by-line payments, admin cockpit — WebPO bar.",
 },
];

export type GlobalRoadmapAreaId =
 | "operations"
 | "consumer"
 | "rewards"
 | "commercial"
 | "cx";

export type GlobalRoadmapAreaPlan = {
 id: GlobalRoadmapAreaId;
 label: string;
 subtitle: string;
 sources: string[];
 phases: Record<UxRoadmapPhase, GlobalRoadmapPhaseItem[]>;
};

export const GLOBAL_ROADMAP_BY_AREA: GlobalRoadmapAreaPlan[] = [
 {
 id: "operations",
 label: "Operations",
 subtitle: "Seller · Courier · Admin · peak dispatch",
 sources: ["MX OPS Jul 23", "PE store visits", "PE SL Sep 1", "PE workshop OPS", "EC Oct 7–8", "Puebla Project"],
 phases: {
 now: [
 {
 theme: "Peak reliability",
 outcome: "Stop silent misses, session drops, and expired orders at Saturday peak",
 itemIds: ["order-alert-session", "courier-order-push"],
 evidence: "MX 6/9 POCs · PE 2/3 · Puebla BEES/turbo desync",
 },
 {
 theme: "Operations map",
 outcome: "Assign couriers without leaving the map; load 50+ concurrent orders",
 itemIds: ["map-assign-stay", "map-visual-priority"],
 evidence: "Forjadores blank at 20 orders; Los Alpes peak quote",
 },
 {
 theme: "Inventory truth",
 outcome: "Quantity in portfolio; combos and search match real stock",
 itemIds: ["portfolio-quantity", "portfolio-filters"],
 evidence: "Unanimous #1 CDMX; PE combo SKU; EC Oct 8 zero/infinite stock",
 },
 {
 theme: "Routing & spillover",
 outcome: "Fair dispatch when neighbors disable SKUs; split prepared vs picked-up SLA",
 itemIds: ["admin-polygon-neighbor", "dispatch-sla-split"],
 evidence: "Merino +70 orders weekend; Puebla overlap ~3%",
 },
 ],
 next: [
 {
 theme: "Actionable KPIs",
 outcome: "Day, week, and hourly views sellers and supervisors can act on daily",
 itemIds: ["metrics-date-filter", "metrics-hourly", "metrics-ai-mvp"],
 evidence: "7-day window everywhere; WebPO fix; EC Excel motorizado forecast",
 },
 {
 theme: "Admin cockpit",
 outcome: "Per-POC live stock, SLA, availability — Armis/Vitex bar",
 itemIds: ["admin-kpi-cockpit", "admin-console-vitex"],
 evidence: "OPS workshop MX + PE; EC Oct 8 BizWam dream",
 },
 {
 theme: "Unified peak surface",
 outcome: "Map + kanban on one screen; multi-assign to riders en route",
 itemIds: ["map-kanban-unified", "multi-assign-seller"],
 evidence: "Figma concept validated in every CDMX visit",
 },
 {
 theme: "Financial transparency",
 outcome: "Weekly reimbursement line-by-line — Match the Peru WebPO payment pattern",
 itemIds: ["reimbursement-breakdown", "financial-report-date-filter"],
 evidence: "Bahia 30 min/week Excel; WebPO praised in PE",
 },
 ],
 later: [
 {
 theme: "Courier economics",
 outcome: "Peak incentives and daily earnings visibility on device",
 itemIds: ["courier-financial-statement", "courier-earnings-daily"],
 evidence: "Android stability prerequisite",
 },
 {
 theme: "OPS automation",
 outcome: "Weekend monitoring copilot — reduce WhatsApp supervision",
 itemIds: ["metrics-ai-mvp", "admin-kpi-cockpit"],
 evidence: "PE workshop: supervisors want predictive alerts, not Sunday Excel",
 },
 {
 theme: "Claims instant resolution",
 outcome: "Credits in-app — replace Zendesk → email → days triangle",
 itemIds: ["cx-fast-seller-channel"],
 evidence: "PE workshop OPS #3 — market expects instant credits",
 },
 ],
 },
 },
 {
 id: "consumer",
 label: "Consumer",
 subtitle: "App · Growth · product vision · data stack",
 sources: ["PE workshop Consumer", "PE consumer vision Sep 3", "MX field visits", "EC Oct 8 workshop"],
 phases: {
 now: [
 {
 theme: "Live courier map",
 outcome: "Consumer sees courier moving in real time — pin not frozen at store",
 itemIds: ["cx-courier-map-visibility", "courier-route-map", "ya-llegue-fix"],
 evidence: "Consumer workshop #1 · Sep 3 Growth P1 · ~80% late = display",
 },
 {
 theme: "Address & location UX",
 outcome: "Reduce wrong-address cancellations (~18% PE national)",
 itemIds: ["cx-decision-tree", "cx-consumer-visibility"],
 evidence: "Brazil location UX; PE ~18% wrong address; EC profile edit vote",
 },
 ],
 next: [
 {
 theme: "Product roadmap ship",
 outcome: "Multishowcases (Sep 15), Buy Again shelf, address flow, live order updates",
 itemIds: [],
 evidence: "Sep 3: Buy Again 61% conversion beats categories",
 },
 {
 theme: "Returnables education",
 outcome: "Brand pages, Retornafest window, RGB deposit clarity — 44% order share",
 itemIds: [],
 evidence: "Sep 3 Growth #1 pain; Rappi benchmark",
 },
 {
 theme: "Data stack consistent rollout",
 outcome: "AppsFlyer / MMP / Segment aligned — unlock personalization",
 itemIds: [],
 evidence: "Consumer workshop #2 — blocks football APIs until fixed",
 },
 {
 theme: "Payment gateways",
 outcome: "BIN bank promos and gateway coverage for growth bets",
 itemIds: [],
 evidence: "Consumer workshop #3",
 },
 ],
 later: [
 {
 theme: "Consumer self-service",
 outcome: "Address modify and cancellation guardrails without agent",
 itemIds: ["cx-consumer-cancellation", "cx-decision-tree"],
 evidence: "iFood/Uber benchmark; cancel gaming pattern",
 },
 {
 theme: "Personalization",
 outcome: "Dynamic cross-sell by category and order history",
 itemIds: [],
 evidence: "Static shelves today; Buy Again signal for priority",
 },
 {
 theme: "Virtual returnables",
 outcome: "Pickup flow and deposit tracking — future vision",
 itemIds: [],
 evidence: "Consumer workshop future board",
 },
 ],
 },
 },
 {
 id: "rewards",
 label: "Rewards",
 subtitle: "Club TaDa · Braze · loyalty · anti-fraud",
 sources: ["PE workshop Rewards", "PE context meeting", "EC Oct 8 Club vote"],
 phases: {
 now: [
 {
 theme: "Foundation dependency",
 outcome: "No tier/omnichannel scale until core platform reliability + data consistent rollout",
 itemIds: ["order-alert-session"],
 evidence: "Rewards workshop — CRM triggers need inventory + logistics truth",
 },
 ],
 next: [
 {
 theme: "Club TaDa × Braze",
 outcome: "Enrich CRM segments with order and occasion data",
 itemIds: ["notification-center"],
 evidence: "Rewards workshop vote #1",
 },
 {
 theme: "Flash coupons in wallet",
 outcome: "Wallet UX for limited-time offers — converges with Consumer",
 itemIds: ["notification-center"],
 evidence: "Rewards workshop #2 · Consumer workshop #4",
 },
 {
 theme: "Anti-fraud automation",
 outcome: "SED Turbo risk controls before scaling loyalty tiers",
 itemIds: [],
 evidence: "Rewards workshop #4",
 },
 ],
 later: [
 {
 theme: "Rewards admin in BEES",
 outcome: "Integrated loyalty ops — not spreadsheet sidecar",
 itemIds: [],
 evidence: "Rewards workshop #3",
 },
 {
 theme: "Football occasion",
 outcome: "Earn/burn around matches — API + inventory foundation",
 itemIds: [],
 evidence: "Future vision #1 — Momento Inesperado hospitality bets",
 },
 {
 theme: "Omnichannel redemption",
 outcome: "Tambo / convenience redemption — future #2",
 itemIds: [],
 evidence: "3–4 year horizon per workshop",
 },
 {
 theme: "Tiers & brand correlation",
 outcome: "Lovers program depth — after anti-fraud + data stack",
 itemIds: [],
 evidence: "Rewards future board",
 },
 ],
 },
 },
 {
 id: "commercial",
 label: "Commercial & promos",
 subtitle: "Promo calendar · supply · B2B visibility",
 sources: ["MX Promo workshop Jul 21", "MX Puebla", "PE context + WebPO", "EC Oct 8 admin fees"],
 phases: {
 now: [
 {
 theme: "Seller promo visibility",
 outcome: "Consumer promo visible to seller before it goes live",
 itemIds: ["notification-center"],
 evidence: "Stella in consumer app, not BEES — PE; Corona World Cup MX",
 },
 ],
 next: [
 {
 theme: "Promo calendar alignment",
 outcome: "7+ day notice to sellers; 2–3 weekly supply slots",
 itemIds: ["notification-center", "admin-sku-promo-protection"],
 evidence: "Promo workshop fragmentation; San Jerónimo order Fri → deliver Tue",
 },
 {
 theme: "SKU protection",
 outcome: "Alert before mass shutdown breaks active promo combos",
 itemIds: ["admin-sku-promo-protection"],
 evidence: "World Cup combo recreation risk — MX OPS",
 },
 {
 theme: "WebPO commercial loop",
 outcome: "Extend payments + demand heatmap to promo planning",
 itemIds: ["notification-center"],
 evidence: "PE WebPO 2→78 stores after Pagos live",
 },
 ],
 later: [
 {
 theme: "Promo ROI dashboard",
 outcome: "Real-time promo performance — replace Excel/Trello/VTEX fragments",
 itemIds: [],
 evidence: "Promo workshop measurement gap",
 },
 {
 theme: "Flash promo mechanics",
 outcome: "Quantity vs discount types — standardized upload",
 itemIds: [],
 evidence: "Promo workshop ideation track",
 },
 ],
 },
 },
 {
 id: "cx",
 label: "CX & communication",
 subtitle: "Support · ecosystem comms · audit trail",
 sources: ["MX CX meeting", "PE SL Sep 1", "Country visits", "Puebla Project", "EC Oct 8"],
 phases: {
 now: [
 {
 theme: "CX coordination pilot",
 outcome: "Structured cancellation reasons + pre-defined seller→customer messages",
 itemIds: ["cx-cancellation-reason", "cx-predefined-messages"],
 evidence: "~40% tickets coordination; free-text lost",
 },
 {
 theme: "Live tracking for agents",
 outcome: "CX sees courier on map during late-order tickets",
 itemIds: ["cx-courier-map-visibility"],
 evidence: "Agents blind today — same layer as consumer map",
 },
 ],
 next: [
 {
 theme: "CX empowerment",
 outcome: "Unified seller view + consumer wallet/screen visibility",
 itemIds: ["cx-unified-seller-view", "cx-consumer-visibility"],
 evidence: "Agents ask for screenshots every time",
 },
 {
 theme: "Fast seller channel",
 outcome: "Peak-time seller↔CX — not email next day",
 itemIds: ["cx-fast-seller-channel"],
 evidence: "Talabera CX email too slow — Puebla",
 },
 {
 theme: "Ecosystem communication",
 outcome: "Braze + delivery proof + predefined messages umbrella",
 itemIds: ["notification-center", "cx-predefined-messages"],
 evidence: "Sep 1 PE SL vision — launching in weeks",
 },
 ],
 later: [
 {
 theme: "In-app communication",
 outcome: "Audit trail replaces WhatsApp for seller↔customer↔courier",
 itemIds: ["in-app-chat-seller", "cx-fast-seller-channel"],
 evidence: "100% WhatsApp default — only after core reliability stable",
 },
 {
 theme: "CX automation",
 outcome: "Braze verification + AI bots for volume management",
 itemIds: [],
 evidence: "OPS admin: coupon delivery unknown without Braze history",
 },
 ],
 },
 },
];

export function countRoadmapItemsByArea(areaId: GlobalRoadmapAreaId): number {
 const area = GLOBAL_ROADMAP_BY_AREA.find((a) => a.id === areaId);
 if (!area) return 0;
 return (["now", "next", "later"] as UxRoadmapPhase[]).reduce(
 (n, phase) => n + area.phases[phase].length,
 0,
 );
}

export const GLOBAL_ROADMAP_PHASES: Record<
 UxRoadmapPhase,
 { label: string; horizon: string; goal: string; exitCriteria: string; items: GlobalRoadmapPhaseItem[] }
> = {
 now: {
 label: "Now",
 horizon: "0–3 months",
 goal: "Stop losing orders at peak",
 exitCriteria:
 "One POC runs a full Saturday without WhatsApp for dispatch; expired order rate down measurably week-over-week.",
 items: [
 {
 theme: "Order reliability",
 outcome: "Stop silent misses and expired orders during peak shifts",
 itemIds: ["order-alert-session", "courier-order-push"],
 evidence: "MX 6/9 POCs, PE 2/3 — expired when backgrounded",
 },
 {
 theme: "Operations map",
 outcome: "Assign couriers without leaving the map; load 50+ orders",
 itemIds: ["map-assign-stay", "map-visual-priority"],
 evidence: "Los Alpes; Forjadores blank at 20 orders",
 },
 {
 theme: "Live tracking",
 outcome: "Real-time pin for seller, CX, and consumer",
 itemIds: ["cx-courier-map-visibility", "courier-route-map", "ya-llegue-fix"],
 evidence: "~80% of late complaints are display, not delivery",
 },
 {
 theme: "Inventory truth",
 outcome: "Quantity in portfolio; combos and search that match reality",
 itemIds: ["portfolio-quantity", "portfolio-filters"],
 evidence: "Unanimous #1 CDMX; PE combo SKU still accepts orders",
 },
 {
 theme: "CX coordination",
 outcome: "Structured cancellation reasons and pilot pre-defined messages",
 itemIds: ["cx-cancellation-reason", "cx-predefined-messages"],
 evidence: "~40% tickets coordination; other field lost",
 },
 {
 theme: "Routing fairness",
 outcome: "Limit spillover when neighbors disable SKUs; split dispatch SLA",
 itemIds: ["admin-polygon-neighbor", "dispatch-sla-split"],
 evidence: "Merino +70 orders; Forjadores absorbs neighbors",
 },
 ],
 },
 next: {
 label: "Next",
 horizon: "3–6 months",
 goal: "Trust the platform",
 exitCriteria:
 "Pilot POCs stop parallel Excel for KPIs and reimbursement; OPS reduces Sunday WhatsApp monitoring.",
 items: [
 {
 theme: "Actionable KPIs",
 outcome: "Day, week, and hourly views sellers can manage daily",
 itemIds: ["metrics-date-filter", "metrics-hourly", "metrics-ai-mvp"],
 evidence: "7-day rolling window blocks daily management everywhere",
 },
 {
 theme: "Financial transparency",
 outcome: "Weekly reimbursement line-by-line — WebPO bar",
 itemIds: ["reimbursement-breakdown", "financial-report-date-filter"],
 evidence: "Bahia 30 min/week Excel; WebPO praised in PE",
 },
 {
 theme: "Unified peak surface",
 outcome: "Map + kanban on one screen; multi-assign to riders en route",
 itemIds: ["map-kanban-unified", "multi-assign-seller"],
 evidence: "Figma concept tested in every CDMX visit",
 },
 {
 theme: "Admin cockpit",
 outcome: "Per-POC live KPIs for supervisors (Armis/Vitex bar)",
 itemIds: ["admin-kpi-cockpit", "admin-console-vitex"],
 evidence: "OPS workshop #1 vote both countries",
 },
 {
 theme: "Promo alignment",
 outcome: "Seller sees promo 7+ days before consumer; supply slots aligned",
 itemIds: ["notification-center", "admin-sku-promo-protection"],
 evidence: "Stella in app but not BEES; Corona World Cup stockout",
 },
 ],
 },
 later: {
 label: "Later",
 horizon: "6+ months",
 goal: "Scale ecosystem bets",
 exitCriteria:
 "core reliability stable in production; loyalty and consumer bets sequenced after data consistent rollout.",
 items: [
 {
 theme: "In-app communication",
 outcome: "Audit trail replaces WhatsApp for coordination",
 itemIds: ["in-app-chat-seller", "cx-fast-seller-channel"],
 evidence: "Only after core reliability stable",
 },
 {
 theme: "Consumer self-service",
 outcome: "Address modify and cancellation guardrails",
 itemIds: ["cx-consumer-cancellation", "cx-decision-tree"],
 evidence: "iFood/Uber benchmark",
 },
 {
 theme: "Courier economics",
 outcome: "Peak incentives and daily earnings visibility",
 itemIds: ["courier-financial-statement", "courier-earnings-daily"],
 evidence: "Android stability prerequisite",
 },
 {
 theme: "Loyalty & growth stack",
 outcome: "Braze, wallet, BEES admin, anti-fraud — after foundations",
 itemIds: ["notification-center"],
 evidence: "PE workshop Sep 2 — data consistent rollout first",
 },
 {
 theme: "2028 bets",
 outcome: "Football occasion, vending, omnichannel — discovery only",
 itemIds: [],
 evidence: "Sequence after Q1–Q2 foundations",
 },
 ],
 },
};

export const GLOBAL_HOMOLOGATE_ITEMS = [
 { signal: "Web Tiendas (WebPO)", country: "Peru", action: "Weekly KPIs, heatmap, VLC payments → seller platform" },
 { signal: "First-order badge", country: "Mexico", action: "Keep and expand across POCs" },
 { signal: "Brazil location UX", country: "Peru", action: "Config rollout — −1 pp location cancellations" },
 { signal: "Notification center", country: "Bolivia → LATAM", action: "Seller inbox for ops comms" },
 { signal: "Delivery confirmation code", country: "Peru", action: "Pilot per store — reduce disputes" },
 { signal: "Courier Financial Report (Jumbo)", country: "Mexico", action: "Weekly payment summary on seller" },
 { signal: "Ecuador stockout control (0.8%)", country: "Ecuador", action: "DDC per POC + supply playbook while quantity UX ships" },
 { signal: "CRM holdout incrementality (W40)", country: "Ecuador", action: "Align push timing vs checkout coherence" },
 { signal: "MotoGP courier gamification", country: "Ecuador", action: "Peak reactivation when forecast gaps" },
];

export const GLOBAL_OPEN_QUESTIONS = [
 "Overlap test scale — Puebla ~3%: expand to more cities before polygon changes?",
 "Combo as third SKU — Victor Ágora ask in both countries: engineering estimate?",
 "Admin squad capacity — copilot vs manual console: what ships in H1?",
 "Colombia / Ecuador — when do visits start; same playbook?",
];

export const GLOBAL_ROADMAP_STATS = {
 principles: UX_ROADMAP_PRINCIPLES,
 phaseCounts: {
 now: countUxRoadmapByPhase("now"),
 next: countUxRoadmapByPhase("next"),
 later: countUxRoadmapByPhase("later"),
 },
};
