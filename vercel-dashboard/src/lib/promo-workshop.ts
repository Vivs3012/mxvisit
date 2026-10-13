export type PromoWorkshopPhase =
 | "ideation"
 | "planning"
 | "upload-measurement";

export type PromoPainPriority = "Critical" | "High" | "Medium";

export type PromoWorkshopItem = {
 id: string;
 title: string;
 detail: string;
 phase: PromoWorkshopPhase;
 priority: PromoPainPriority;
 type: "current-state" | "pain-point" | "requirement" | "opportunity";
 quotes?: string[];
};

export const PROMO_WORKSHOP = {
 date: "21/07/2026",
 title: "Promotion management workshop",
 team: "Commercial team — Mexico",
 objective:
 "Map end-to-end promotion management — from idea generation and planning to upload, execution, and results tracking. Understand the current process, identify improvement opportunities, and gather platform requirements.",
 executiveSummary:
 "The commercial team runs promotions across a fragmented toolchain (Excel, Trello, VTEX) with heavy manual coordination. Key needs: centralize planning and documentation, reduce spreadsheet dependency, improve Flash Promo configuration and reuse, standardize rules across markets, and strengthen campaign traceability and measurement — making the operation more efficient and scalable.",
 stats: {
 phases: 3,
 painPoints: 0, // filled below
 requirements: 0,
 fieldConnections: 4,
 },
 mainInsights: [
 "Centralize promotion planning and documentation in one place — today split across Excel calendars, Trello KAM alignment, and ad-hoc comms",
 "Reduce manual work: bulk SKU upload errors, manual margin calculations, and VTEX upload friction slow every campaign",
 "Flash Promos need dedicated mechanics — separate Quantity vs Discount types, with countdown timers and quantity limits",
 "Measurement gap: no real-time dashboard to adjust active mechanics; limited visibility into promo impact on conversion funnel",
 "Standardize rules and homologations between markets — category/brand-level promo config instead of SKU-by-SKU only",
 "Connect commercial calendar to store execution — field visits showed promo lead time vs supply delivery mismatch (Puebla World Cup)",
 ],
 connectsToField: [
 "Puebla: Corona promo ladder 30→50% with 1–2 days notice vs weekly supply (Tuesday) — sellers can't stock in time",
 "San Jerónimo: dozens of WhatsApp groups for promo comms — needs centralized notification/inbox",
 "Forjadores: World Cup peak — 50 orders / 8 couriers when promo ramped without ops prep",
 "Product meeting: monthly promo calendar exists but gap is seller-side execution and supply alignment",
 ],
 phases: [
 {
 id: "ideation" as const,
 question: "Where do promotion ideas come from?",
 summary:
 "Ideas are driven by seasonality, competitive pressure, inventory needs, brand partnerships, and growth goals — with marketing and commercial collaborating in brainstorming sessions.",
 },
 {
 id: "planning" as const,
 question: "How is planning done?",
 summary:
 "Monthly review meetings with planners and commercial staff. Excel for scheduling and projected impact/cost. Trello to align K-plans with brand KAMs. Goals and budgets defined by category — but coordination is fragmented with no single source of truth.",
 },
 {
 id: "upload-measurement" as const,
 question: "How does upload and measurement work?",
 summary:
 "Promotions configured and uploaded manually — often SKU by SKU — with VTEX friction, bulk upload errors, and weak real-time tracking. Results dashboard exists but is not intuitive enough to adjust mechanics mid-campaign.",
 },
 ],
 nextSteps: [
 "Centralized promotion calendar — replace Excel + Trello fragmentation with documented, shared planning",
 "Flash Promo module: Quantity type vs Discount type, with countdown timer and stock limits",
 "Bulk upload with validation — reduce manual SKU errors before VTEX/platform upload",
 "Promo config at category and brand level — not only individual SKUs; bundle/pack support",
 "Real-time results dashboard — ROI, funnel impact, per-category performance, quick mechanic adjustments",
 "Automated margin calculation in planning flow",
 "Standardize promo rules and consistent rollout workflow between MX and other markets",
 "Link commercial promo calendar to seller notification + supply lead time (field visit finding)",
 ],
 platformRoadmap: {
 now: [
 "Document current promo process and pain points (this workshop)",
 "Fix VTEX upload friction and bulk upload validation",
 "Promo calendar visibility for sellers (align with notification center pilot)",
 ],
 next: [
 "Centralized planning tool — calendar, K-plan alignment, budget by category",
 "Flash Promo types: Quantity + Discount with timer and limits",
 "Category/brand-level promo configuration and bundle support",
 "Real-time tracking dashboard for active campaigns",
 ],
 later: [
 "Automated margin calculation in planning",
 "Cross-market rule standardization and consistent rollout workflow",
 "Promo impact on conversion funnel — integrated analytics",
 "Supply lead-time integration (promo notice → delivery schedule)",
 ],
 },
};

export const PROMO_WORKSHOP_ITEMS: PromoWorkshopItem[] = [
 // ── IDEATION ─────────────────────────────────────────────────────────────
 {
 id: "seasonality",
 title: "Seasonality drives promo calendar",
 detail:
 "Key commercial dates anchor the promo calendar: Hot Sale, Buen Fin, Christmas, and other seasonal peaks. Planning starts from these fixed moments.",
 phase: "ideation",
 priority: "High",
 type: "current-state",
 },
 {
 id: "competitive-benchmark",
 title: "Competitive analysis and benchmarking",
 detail:
 "Team monitors what competitors are doing in the market to stay relevant and decide promo mechanics.",
 phase: "ideation",
 priority: "Medium",
 type: "current-state",
 },
 {
 id: "inventory-liquidity",
 title: "Inventory rotation and liquidity",
 detail:
 "Promos used to move slow-rotating stock and improve cash flow — inventory management is a direct input to promo ideation.",
 phase: "ideation",
 priority: "High",
 type: "current-state",
 },
 {
 id: "brand-partnerships",
 title: "Brand and retailer partnership requests",
 detail:
 "Specific requests from partner brands and commercial agreements generate promo ideas — coordinated with KAMs.",
 phase: "ideation",
 priority: "High",
 type: "current-state",
 },
 {
 id: "growth-differentiation",
 title: "New launches and catalog differentiation",
 detail:
 "Growth goals and new product launches drive promotional mechanics to differentiate the catalog.",
 phase: "ideation",
 priority: "Medium",
 type: "current-state",
 },
 {
 id: "mkt-commercial-collab",
 title: "Marketing + commercial brainstorming",
 detail:
 "Internal collaboration between marketing and commercial teams in brainstorming sessions — ideas not yet centralized in a single tool.",
 phase: "ideation",
 priority: "Medium",
 type: "current-state",
 },

 // ── PLANNING ───────────────────────────────────────────────────────────────
 {
 id: "excel-calendar",
 title: "Excel for scheduling and impact projection",
 detail:
 "Calendarización and projected promo cost/impact calculated in Excel spreadsheets — primary planning tool today.",
 phase: "planning",
 priority: "Critical",
 type: "pain-point",
 quotes: ["Manual alignment of K-plans in a sheet with PSM of the brands"],
 },
 {
 id: "trello-kam",
 title: "Trello for KAM / brand alignment",
 detail:
 "Trello boards used to align promotion plans with Key Account Managers of different brands. Fragmented from Excel calendar.",
 phase: "planning",
 priority: "High",
 type: "pain-point",
 },
 {
 id: "monthly-meetings",
 title: "Monthly review meetings with planners",
 detail:
 "Regular monthly meetings with planners and commercial staff to define upcoming promo focus — coordination-heavy, no single platform.",
 phase: "planning",
 priority: "Medium",
 type: "current-state",
 },
 {
 id: "budget-by-category",
 title: "Goals and budget defined by category",
 detail:
 "Strategy sets promo goals and discount budgets per category — but tracking execution against plan is manual.",
 phase: "planning",
 priority: "High",
 type: "current-state",
 },
 {
 id: "fragmented-planning",
 title: "No centralized planning documentation",
 detail:
 "Planning spread across Excel, Trello, meetings, and WhatsApp — difficult to trace decisions, reuse past campaigns, or onboard new team members.",
 phase: "planning",
 priority: "Critical",
 type: "opportunity",
 },
 {
 id: "centralize-planning",
 title: "Requirement: centralized promo planning hub",
 detail:
 "Single place for calendar, K-plan alignment, budget, documentation, and approval status — replacing spreadsheet + board fragmentation.",
 phase: "planning",
 priority: "Critical",
 type: "requirement",
 },

 // ── UPLOAD & MEASUREMENT ─────────────────────────────────────────────────
 {
 id: "category-brand-config",
 title: "Promo by category or brand — not only SKU",
 detail:
 "Need flexibility to configure promotions at category or brand level instead of configuring each SKU individually.",
 phase: "upload-measurement",
 priority: "High",
 type: "requirement",
 },
 {
 id: "bundle-support",
 title: "Bundle / pack promo support",
 detail:
 "Platform must support configuring promotions for product bundles and packs — common mechanic in commercial campaigns.",
 phase: "upload-measurement",
 priority: "High",
 type: "requirement",
 },
 {
 id: "bulk-upload-errors",
 title: "Bulk SKU upload — high manual error rate",
 detail:
 "Bulk upload process generates frequent manual errors. Need validation layer before upload to reduce rework.",
 phase: "upload-measurement",
 priority: "Critical",
 type: "pain-point",
 },
 {
 id: "vtex-friction",
 title: "VTEX upload friction and technical errors",
 detail:
 "Explicit pain point: problems and delays when uploading promotions to VTEX — technical bottleneck in execution.",
 phase: "upload-measurement",
 priority: "Critical",
 type: "pain-point",
 },
 {
 id: "margin-automation",
 title: "Automate margin calculations",
 detail:
 "Margin calculations done manually during planning — automation would speed up approval and reduce errors.",
 phase: "upload-measurement",
 priority: "High",
 type: "requirement",
 },
 {
 id: "flash-promo-quantity",
 title: "Flash Promo: Quantity type",
 detail:
 "Dedicated Flash Promo mechanic with quantity limits — e.g. first N units at promo price. Separate from discount-only flash.",
 phase: "upload-measurement",
 priority: "High",
 type: "requirement",
 },
 {
 id: "flash-promo-discount",
 title: "Flash Promo: Discount type (TIME + DISCOUNT)",
 detail:
 "Flash Promo with real-time countdown timer and time-limited discount — distinct configuration from quantity-based flash.",
 phase: "upload-measurement",
 priority: "High",
 type: "requirement",
 },
 {
 id: "flash-promo-reuse",
 title: "Reuse and template Flash Promos",
 detail:
 "Improve configuration and reuse of Flash Promos — today each campaign requires manual rebuild. Templates would scale operations.",
 phase: "upload-measurement",
 priority: "High",
 type: "opportunity",
 },
 {
 id: "funnel-visibility",
 title: "No visibility into promo impact on conversion funnel",
 detail:
 "Cannot see how active promotions affect the conversion funnel — limits ability to optimize mechanics during campaign.",
 phase: "upload-measurement",
 priority: "High",
 type: "pain-point",
 },
 {
 id: "results-dashboard",
 title: "Results dashboard not intuitive enough",
 detail:
 "Dashboard of results exists but is not intuitive for quick adjustments to active mechanics mid-campaign. Needs real-time tracking.",
 phase: "upload-measurement",
 priority: "High",
 type: "pain-point",
 },
 {
 id: "realtime-dashboard",
 title: "Requirement: real-time campaign tracking dashboard",
 detail:
 "Dashboard de acompanhamento em tempo real — monitor ROI, orders, and category performance as campaign runs; enable quick mechanic changes.",
 phase: "upload-measurement",
 priority: "Critical",
 type: "requirement",
 },
 {
 id: "cross-market-rules",
 title: "Standardize rules and homologations between markets",
 detail:
 "Promo rules differ between markets — need standardized configuration and consistent rollout workflow for scalable operations.",
 phase: "upload-measurement",
 priority: "Medium",
 type: "requirement",
 },
 {
 id: "strategy-prioritization",
 title: "Prioritize actions by strategy and scale",
 detail:
 "Need to prioritize promo actions within commercial strategy by size/scale (mono, pg, mg) — currently ad-hoc.",
 phase: "upload-measurement",
 priority: "Medium",
 type: "current-state",
 },
];

// Update stats counts
PROMO_WORKSHOP.stats.painPoints = PROMO_WORKSHOP_ITEMS.filter(
 (i) => i.type === "pain-point",
).length;
PROMO_WORKSHOP.stats.requirements = PROMO_WORKSHOP_ITEMS.filter(
 (i) => i.type === "requirement" || i.type === "opportunity",
).length;

export const PROMO_PHASE_LABELS: Record<PromoWorkshopPhase, string> = {
 ideation: "1 — Ideation",
 planning: "2 — Planning",
 "upload-measurement": "3 — Upload & measurement",
};

export function itemsByPhase(phase: PromoWorkshopPhase): PromoWorkshopItem[] {
 return PROMO_WORKSHOP_ITEMS.filter((i) => i.phase === phase);
}

export function countByType(type: PromoWorkshopItem["type"]): number {
 return PROMO_WORKSHOP_ITEMS.filter((i) => i.type === type).length;
}
