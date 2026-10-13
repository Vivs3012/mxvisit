/** Links Peru store-visit findings and morning context items to Mexico UX roadmap items. */

export type PeruContextValidation = {
 morningItem: string;
 afternoonFinding: string;
 roadmapIds: string[];
};

export type PeruRoadmapLink = {
 roadmapId: string;
 title: string;
 validation: string;
 stores: string[];
 priority: "Critical" | "High" | "Medium";
};

export const PERU_CONTEXT_VALIDATIONS: PeruContextValidation[] = [
 {
 morningItem: "Fill Rate 92% nationally — cancellations and wrong addresses",
 afternoonFinding:
 "San Pedro seller cancellations 12.2%; Merino stockout 4.4% with 68.4% SKU availability. Wrong-address modal launched last weekend — still need seller feedback.",
 roadmapIds: ["portfolio-quantity", "portfolio-filters"],
 },
 {
 morningItem: "Compose combos from two SKUs (Victor Ágora)",
 afternoonFinding:
 "3/3 stores: combo SKUs don't turn off together; search misses linked products. Same pain as Mexico morning briefing.",
 roadmapIds: ["portfolio-filters", "portfolio-unified"],
 },
 {
 morningItem: "Copy Brazil location UX (Victor · config flag)",
 afternoonFinding:
 "Map/GPS stale at all 3 POCs — courier pin stuck, WhatsApp workarounds. Complements location UX; dispatch map is the afternoon blocker.",
 roadmapIds: ["map-assign-stay", "cx-courier-map-visibility", "courier-route-map"],
 },
 {
 morningItem: "Returnables and cold chain vs Rappi/PedidosYa",
 afternoonFinding:
 "Merino: ~60% returnable orders; bags fit 1 carton, couriers stack 2–4 with rubber bands. Fiestas Patrias 28-pack promo pushes weight. Manual ice for six-packs.",
 roadmapIds: [],
 },
 {
 morningItem: "Multi-POC owners (expansion pattern)",
 afternoonFinding:
 "Merino absorbs neighbor spillover (+70 orders on a weekend when coverage moved). Clients cancel 10–12× to route to preferred POC — store name visible in app.",
 roadmapIds: ["admin-polygon-neighbor"],
 },
 {
 morningItem: "Late hours — only 5–10% POCs after 11pm",
 afternoonFinding:
 "San Pedro runs 7 couriers 18h/day in tight 3.5 km polygon; La Marina supervises 3 locations via WhatsApp + CCTV.",
 roadmapIds: ["metrics-hourly"],
 },
];

export const PERU_ROADMAP_LINKS: PeruRoadmapLink[] = [
 {
 roadmapId: "cx-courier-map-visibility",
 title: "CX / seller map: live courier position",
 validation: "3/3 stores: pin stuck at store, 5–10% visibility on map, WhatsApp tracking",
 stores: ["La Marina", "Merino", "San Pedro"],
 priority: "Critical",
 },
 {
 roadmapId: "portfolio-quantity",
 title: "Portfolio: stock quantity field",
 validation: "3/3 stores: on/off only, manual nightly count; VTEX/Tuca benchmark cited",
 stores: ["La Marina", "Merino", "San Pedro"],
 priority: "Critical",
 },
 {
 roadmapId: "portfolio-filters",
 title: "Portfolio: search and combo management",
 validation: "3/3: broken search (Pilsen, 473 ml), combos don't disable together",
 stores: ["La Marina", "Merino", "San Pedro"],
 priority: "Critical",
 },
 {
 roadmapId: "in-app-chat-seller",
 title: "In-app seller ↔ customer chat",
 validation: "3/3: WhatsApp workaround; sellers remember chat in previous tool",
 stores: ["La Marina", "Merino", "San Pedro"],
 priority: "High",
 },
 {
 roadmapId: "order-alert-session",
 title: "Order alert + session stability",
 validation: "Merino + San Pedro: sound intermittent → missed/expired orders",
 stores: ["Merino", "San Pedro"],
 priority: "Critical",
 },
 {
 roadmapId: "multi-assign-seller",
 title: "Assign 2nd order to courier en route",
 validation: "La Marina #3 ask: can't bundle orders on same courier already delivering",
 stores: ["La Marina"],
 priority: "High",
 },
 {
 roadmapId: "metrics-date-filter",
 title: "Metrics: date range selector",
 validation: "KPI screen locked to rolling 7 days; ranking peer set opaque; SLA 35 hidden",
 stores: ["La Marina", "Merino", "San Pedro"],
 priority: "High",
 },
 {
 roadmapId: "cx-predefined-messages",
 title: "Pre-defined seller → customer messages",
 validation: "Deposit-bottle disputes, door waits 10–15 min — no in-app channel",
 stores: ["La Marina", "Merino", "San Pedro"],
 priority: "High",
 },
 {
 roadmapId: "admin-polygon-neighbor",
 title: "Inter-POC spillover / polygon overlap",
 validation: "Merino +70 orders when neighbors turn off SKUs; cancel-to-route behavior",
 stores: ["Merino"],
 priority: "High",
 },
 {
 roadmapId: "metrics-hourly",
 title: "Hourly operational view (WebPO praised)",
 validation: "WebPO demand-by-hour used at La Marina + Merino; wants same in seller KPIs",
 stores: ["La Marina", "Merino"],
 priority: "Medium",
 },
];
