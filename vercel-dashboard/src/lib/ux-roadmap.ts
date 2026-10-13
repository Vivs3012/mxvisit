export type UxRoadmapPhase = "now" | "next" | "later";
export type UxRoadmapActor = "Seller" | "Courier" | "Admin" | "CX";
export type UxPriority = "Critical" | "High" | "Medium";

export type UxRoadmapItem = {
 id: string;
 title: string;
 description: string;
 phase: UxRoadmapPhase;
 actor: UxRoadmapActor;
 priority: UxPriority;
 evidence: string[];
 successCriteria?: string[];
 dependencies?: string[];
 fieldValidated?: boolean;
 designerProposal?: boolean;
};

export const UX_ROADMAP_PRINCIPLES = [
 {
 layer: "1 — Reliability",
 subtitle: "See and receive the order",
 detail:
 "Order sound, session stability, refresh-free push, map that loads under peak load. Without this layer, prettier screens don't fix Saturday.",
 },
 {
 layer: "2 — Peak decision",
 subtitle: "Distribute fast without leaving the screen",
 detail:
 "Map + kanban, visual priority, multi-assign to riders already en route. Reduces Telegram workarounds and expired orders.",
 },
 {
 layer: "3 — Management & understanding",
 subtitle: "Metrics, reimbursement, day planning",
 detail:
 "Date filters, detailed financial breakdown, quantity in portfolio, AI explanations. Sellers need to trust what they receive and act on daily KPIs.",
 },
] as const;

export const UX_ROADMAP_ACTORS: UxRoadmapActor[] = ["Seller", "Courier", "Admin", "CX"];

export const UX_ROADMAP_ACTOR_LABELS: Record<UxRoadmapActor, string> = {
 Seller: "Seller",
 Courier: "Courier",
 Admin: "Admin / OPS",
 CX: "CX",
};

export const UX_ROADMAP_ACTOR_DESCRIPTIONS: Record<UxRoadmapActor, string> = {
 Seller:
 "Store operation: orders, map, portfolio, metrics, reimbursement, and financial reconciliation.",
 Courier:
 "Delivery flow: notifications, route, arrival status, earnings and payment visibility.",
 Admin:
 "OPS and commercial tooling: KPI cockpit per POC, coverage maps, polygons, coupons, acquisition.",
 CX:
 "Support agents: consumer visibility, courier tracking, cancellation reasons, fast seller channel.",
};

export const UX_ROADMAP_ITEMS: UxRoadmapItem[] = [
 // ══════════════════════════════════════════════════════════════════════════
 // SELLER
 // ══════════════════════════════════════════════════════════════════════════
 {
 id: "order-alert-session",
 title: "Order alert + session stability",
 description:
 "Reliable push notification with sound when a new order arrives. Session must not close silently — sellers lose orders while restocking.",
 phase: "now",
 actor: "Seller",
 priority: "Critical",
 evidence: [
 "Puebla 3/5: no sound → expired orders (San Jerónimo); app closes 4–5×/day (Zavaleta)",
 "CDMX Saturdays: order doesn't reach courier without manual refresh (Mixcoac, Bahia)",
 "Peru Merino + San Pedro: sound intermittent — missed orders while picking alone",
 ],
 successCriteria: [
 "Sound plays even when app is backgrounded",
 "Session persists through a full peak shift",
 ],
 fieldValidated: true,
 },
 {
 id: "map-assign-stay",
 title: "Operations map: stay on screen when assigning",
 description:
 "Assigning a courier must not kick the seller off the map. Fix store pin disappearing and blank map under load.",
 phase: "now",
 actor: "Seller",
 priority: "Critical",
 evidence: [
 "Los Alpes: 'The ideal is that it doesn't take us out, that it stays here on this screen'",
 "Churubusco: store pin disappeared from map",
 "Forjadores: map/table blank at 20+ orders during World Cup promo",
 ],
 successCriteria: [
 "Assign courier without navigation away from map",
 "Map loads 50 concurrent orders without freeze",
 ],
 fieldValidated: true,
 },
 {
 id: "map-visual-priority",
 title: "Visual priority on operations map",
 description:
 "Differentiate orders by urgency, prep time, and first-order badge. Today everything looks red — sellers can't decide what to attack first.",
 phase: "now",
 actor: "Seller",
 priority: "High",
 evidence: [
 "Bahia: 'Then since everyone is red… some differentiation to know which ones are left'",
 "Puebla: first-order badge actively used and valued across POCs",
 ],
 fieldValidated: true,
 },
 {
 id: "portfolio-quantity",
 title: "Portfolio: quantity field in minimum list",
 description:
 "Show stock quantity directly in the portfolio list with optional auto-decrement on sale. On/off toggle alone doesn't reflect real stock.",
 phase: "now",
 actor: "Seller",
 priority: "Critical",
 evidence: [
 "CDMX 4/4: unanimous #1 ask — inventory without real quantity",
 "Los Alpes: system shows 3,000 units when reality is much lower",
 "Peru 3/3: on/off only, manual nightly count; VTEX/Tuca benchmark cited",
 ],
 fieldValidated: true,
 designerProposal: true,
 },
 {
 id: "portfolio-filters",
 title: "Portfolio: filters and search",
 description:
 "Filter by availability, brand, and bestsellers. Fix broken search (model names, combos). Unify confusing minimum vs full catalog navigation.",
 phase: "now",
 actor: "Seller",
 priority: "High",
 evidence: [
 "CDMX 4/4: huge unordered list, search requires exact name",
 "Puebla: search breaks on modelo, combos; wants alphabetical / brand tab (San Jerónimo)",
 "Mixcoac: two confusing screens — minimum portfolio vs full catalog",
 "Peru 3/3: combos don't disable together; search misses Pilsen, 473 ml formats",
 ],
 fieldValidated: true,
 designerProposal: true,
 },
 {
 id: "metrics-date-filter",
 title: "Metrics: date range selector",
 description:
 "Replace fixed 7-day window with day, week, and month selectors. Sellers need yesterday's numbers to manage today's team.",
 phase: "now",
 actor: "Seller",
 priority: "High",
 evidence: [
 "CDMX 4/4: want daily filter like previous app",
 "Churubusco: 'I miss that part because this one goes away for the last 7 days'",
 "Zavaleta: wants orders-per-hour view (today via Ale's Excel)",
 "Peru 3/3: KPI screen locked to rolling 7 days; ranking peer set opaque; SLA 35 hidden",
 ],
 fieldValidated: true,
 designerProposal: true,
 },
 {
 id: "reimbursement-breakdown",
 title: "Reimbursement: detailed breakdown of what they receive",
 description:
 "Weekly reimbursement report with line-by-line degloss: commercial difference, coupons, last mile, refunds, and final payout. Sellers today reconcile in Excel/notebook because they don't trust or understand the platform number.",
 phase: "now",
 actor: "Seller",
 priority: "High",
 evidence: [
 "Interview script: 'Do you understand each line? What's left to trust in the final number?' — Figma concept tested",
 "Bahia: 30 min/week manual reconciliation in Ricardo's Excel; does not use app financial report",
 "Los Alpes: notebook + daily Excel; wants to degloss for random spot-check",
 "Churubusco: trusts payment but cannot audit order by order in platform",
 ],
 successCriteria: [
 "Each payment line explained in plain language",
 "Weekly PDF export per store (concept validated in visit)",
 "Drill-down from total → concept → order list",
 "Seller can spot-check a random order against payout",
 ],
 fieldValidated: true,
 designerProposal: true,
 },
 {
 id: "financial-report-date-filter",
 title: "Financial report: fix date filter + daily cut",
 description:
 "Date filter in financial report has a bug. Sellers want today's cut and yesterday's routes — not only a rolling window.",
 phase: "now",
 actor: "Seller",
 priority: "High",
 evidence: [
 "Mixcoac: date filter in financial report broken",
 "Product meeting: stores want today's cut and yesterday's routes on platform",
 "Los Alpes: weekend manual notebook because app report doesn't match their cycle",
 ],
 successCriteria: [
 "Filter by day / week / custom range without bug",
 "Yesterday's routes visible for courier payment check",
 ],
 fieldValidated: true,
 },
 {
 id: "metrics-ai-mvp",
 title: "Metrics: AI copilot (MVP)",
 description:
 "Pre-defined explanations per metric ('what this means' + 'what to do if red'). Weekly plain-language summary — not open-ended chat.",
 phase: "now",
 actor: "Seller",
 priority: "Medium",
 evidence: [
 "CDMX: sellers don't understand ranking, fulfillment score, or what impacts it",
 "Talabera: limited KPI use — checks delivery time visually only",
 ],
 designerProposal: true,
 },
 {
 id: "map-kanban-unified",
 title: "Map + kanban on one screen",
 description:
 "Combine real-time map (couriers + order pins) with stage columns (waiting / preparing / ready). Drag ready orders to assign on map without leaving the view.",
 phase: "next",
 actor: "Seller",
 priority: "High",
 evidence: [
 "CDMX 4/4: operations map is most-used screen at peak; requested map + kanban together",
 "Interview script: Figma concept tested in every CDMX visit",
 ],
 dependencies: ["map-assign-stay", "map-visual-priority"],
 fieldValidated: true,
 designerProposal: true,
 },
 {
 id: "multi-assign-seller",
 title: "Multi-assign orders to courier already en route",
 description:
 "After courier accepts order A, seller can bundle compatible orders B and C going the same direction. Courier confirms or rejects the batch.",
 phase: "next",
 actor: "Seller",
 priority: "High",
 evidence: [
 "Zavaleta: 'Cannot assign second order to courier on route'",
 "Churubusco: still uses Telegram to route multiple orders",
 "Peru La Marina: #3 ask — assign second order to courier already en route",
 ],
 dependencies: ["map-kanban-unified"],
 fieldValidated: true,
 designerProposal: true,
 },
 {
 id: "metrics-hourly",
 title: "Metrics: hourly operational view",
 description:
 "Orders per hour vs couriers per hour. Compare today vs yesterday vs same day last week.",
 phase: "next",
 actor: "Seller",
 priority: "High",
 evidence: [
 "Zavaleta: wants orders-per-hour + couriers-per-hour in platform",
 "CDMX: forecast shows 30 expected, 7 arrived — can't staff by eye",
 "Peru La Marina + Merino: WebPO demand-by-hour praised; want same in seller KPIs",
 ],
 dependencies: ["metrics-date-filter"],
 fieldValidated: true,
 },
 {
 id: "dispatch-sla-split",
 title: "Dispatch SLA: split 'prepared' vs 'picked up'",
 description:
 "Order ready in 2–3 min but courier arrives at 15 min — dispatch metric goes red unfairly. Seller dashboard must show which side failed.",
 phase: "next",
 actor: "Seller",
 priority: "High",
 evidence: [
 "Puebla 3/5: dispatch SLA penalizes ready orders without courier",
 "Forjadores: 50 orders / 8 couriers — KPIs missed despite deliveries under 35 min",
 ],
 fieldValidated: true,
 },
 {
 id: "reassign-order",
 title: "Reassign order after courier starts",
 description:
 "When courier is sent to load but can't complete, seller reassigns without canceling — similar to Tucan flow Churubusco referenced.",
 phase: "next",
 actor: "Seller",
 priority: "Medium",
 evidence: ["Churubusco: 'Prefer to reassign as in Tucan'"],
 fieldValidated: true,
 },
 {
 id: "financial-export-excel",
 title: "Financial report: export to Excel",
 description:
 "Export reimbursement and sales breakdown for taxes, courier payments, and accountant. Parallel spreadsheets today because export is insufficient.",
 phase: "next",
 actor: "Seller",
 priority: "Medium",
 evidence: [
 "Churubusco: export financial report to Excel requested",
 "CDMX cross-store: payments, taxes and refunds in parallel spreadsheets",
 ],
 fieldValidated: true,
 },
 {
 id: "courier-jumbo-seller-view",
 title: "Courier payments (Jumbo): weekly summary on seller platform",
 description:
 "Weekly courier payment closure visible on seller platform — summary by concept, line by line. Same data as financial Excel, accessible to store owner.",
 phase: "next",
 actor: "Seller",
 priority: "High",
 evidence: [
 "Product meeting: Courier Financial Report (Jumbo) launching — weekly summary on platform",
 "Widely used on Sundays; OPS concern: everyone at store sees values — design permissions",
 "Stores want today's cut and yesterday's routes",
 ],
 successCriteria: [
 "Weekly summary by concept (not order-level in V1)",
 "Role-based visibility for sensitive amounts",
 ],
 fieldValidated: true,
 },
 {
 id: "metrics-ai-advanced",
 title: "Metrics: AI root-cause insights",
 description:
 "AI explains why score dropped: '8 of 15 orders were ready in <3 min but courier arrived after 10 min.'",
 phase: "next",
 actor: "Seller",
 priority: "Medium",
 evidence: ["OPS meetings: need daily KPIs, not 7-day averages"],
 dependencies: ["metrics-ai-mvp", "metrics-hourly"],
 designerProposal: true,
 },
 {
 id: "in-app-chat-seller",
 title: "In-app chat (seller ↔ customer / courier)",
 description:
 "Order-context chat replacing WhatsApp and personal calls. Pre-defined message templates for common cases.",
 phase: "later",
 actor: "Seller",
 priority: "High",
 evidence: [
 "CDMX 4/4: 100% WhatsApp/calls today — no audit trail",
 "CX meeting: pre-defined messages pilot agreed for MX",
 "Peru 3/3: WhatsApp workaround; sellers remember in-app chat in previous tool",
 ],
 fieldValidated: true,
 },
 {
 id: "forecast-trust",
 title: "Reliable daily order forecast on home",
 description:
 "Fix inflated or missing forecast so sellers can staff couriers with confidence. Show range, not false precision.",
 phase: "later",
 actor: "Seller",
 priority: "Medium",
 evidence: [
 "Bahia: marked 30, 7 arrived",
 "Los Alpes: ignores forecast, staffs by eye",
 ],
 fieldValidated: true,
 },
 {
 id: "notification-center",
 title: "Notification center (promos, supply, CX)",
 description:
 "Centralize promo calendar, supply delivery alerts, and CX updates — replace dozens of WhatsApp groups.",
 phase: "later",
 actor: "Seller",
 priority: "Medium",
 evidence: [
 "San Jerónimo: information overload from dozens of WhatsApp groups",
 "OPS workshop: notification center tested in Bolivia → MX",
 ],
 fieldValidated: true,
 },
 {
 id: "metrics-ai-conversational",
 title: "Metrics: conversational AI assistant",
 description:
 "Open Q&A for less digital store owners after MVP proves comprehension value.",
 phase: "later",
 actor: "Seller",
 priority: "Medium",
 evidence: ["Talabera and parts of Puebla: limited KPI literacy"],
 dependencies: ["metrics-ai-advanced"],
 designerProposal: true,
 },
 {
 id: "portfolio-unified",
 title: "Unified portfolio: minimum + full catalog",
 description:
 "Single navigation for minimum portfolio and full catalog.",
 phase: "later",
 actor: "Seller",
 priority: "Medium",
 evidence: [
 "Mixcoac: two confusing screens with different product sets",
 "Los Alpes: 183+ SKUs reviewed manually",
 ],
 dependencies: ["portfolio-quantity", "portfolio-filters"],
 fieldValidated: true,
 },

 // ══════════════════════════════════════════════════════════════════════════
 // COURIER
 // ══════════════════════════════════════════════════════════════════════════
 {
 id: "ya-llegue-fix",
 title: "'Ya llegué' button that actually notifies the customer",
 description:
 "Courier presses arrival but consumer still sees 'aún va a salir'. Push exists but is too subtle — 90% of couriers call instead.",
 phase: "now",
 actor: "Courier",
 priority: "High",
 evidence: [
 "Bahia courier: '90% I have to call them on the phone to let them know that I have arrived'",
 "Mixcoac: consumer sees wrong status after courier presses llegue",
 ],
 fieldValidated: true,
 },
 {
 id: "courier-order-push",
 title: "Reliable order push to courier app",
 description:
 "Order must arrive on courier app without manual refresh or ticket code. Fix app freeze requiring reinstall.",
 phase: "now",
 actor: "Courier",
 priority: "Critical",
 evidence: [
 "Mixcoac Saturdays: order doesn't reach courier without refresh",
 "Churubusco: courier app freezes — needs reinstall",
 "OPS workshop: Android version issues on courier phones",
 ],
 fieldValidated: true,
 },
 {
 id: "courier-route-map",
 title: "Map + multi-stop route",
 description:
 "When seller sends a batch, courier sees optimized stop sequence on a map with ETA per stop. Allow manual reorder of stops.",
 phase: "next",
 actor: "Courier",
 priority: "High",
 evidence: [
 "Bahia courier: wants to reorder delivery sequence",
 "Zavaleta + Forjadores: peak saturation with 8 couriers / 40–50 orders",
 ],
 dependencies: ["multi-assign-seller"],
 fieldValidated: true,
 designerProposal: true,
 },
 {
 id: "courier-financial-statement",
 title: "Courier Financial Report (Jumbo): earnings statement",
 description:
 "Weekly payment communication directly on courier app — summary by concept, line by line. V1 without order-level detail; dream: on-demand statement.",
 phase: "next",
 actor: "Courier",
 priority: "High",
 evidence: [
 "Product meeting: launch Courier Financial Report this week",
 "Widely used on Sundays for payment closure",
 "Dream: statement on request + direct bank transfer (complex: customer bank account)",
 ],
 fieldValidated: true,
 },
 {
 id: "courier-earnings-daily",
 title: "Daily earnings visibility while delivering",
 description:
 "Courier wants to know how much they earned today without waiting for Sunday closure. App should help reconcile with store.",
 phase: "later",
 actor: "Courier",
 priority: "Medium",
 evidence: [
 "Interview script: 'How do you know how much you won? Does the app help with this?'",
 "Zavaleta: Uber vs TaDa courier economics debate",
 ],
 fieldValidated: true,
 },

 // ══════════════════════════════════════════════════════════════════════════
 // ADMIN / OPS
 // ══════════════════════════════════════════════════════════════════════════
 {
 id: "admin-kpi-cockpit",
 title: "Real-time KPI cockpit per POC",
 description:
 "Admin master console: view SLA, free rate, fill rate, orders, and inventory by store without logging into each seller. Update every 1.5–2 hours acceptable; critical for weekend on-call.",
 phase: "now",
 actor: "Admin",
 priority: "Critical",
 evidence: [
 "OPS workshop (Daniela/John): 'We would love a summary where we can see real time… SLA, free rate'",
 "Need cockpit especially Saturdays and Sundays who are on guard",
 "John helped create Power BI POC view — they want this in platform",
 "OPS next step: Admin console / real-time KPI cockpit — resume John Power BI",
 ],
 successCriteria: [
 "All POCs in one view with red/yellow/green thresholds",
 "Drill-down to single store without seller credentials",
 "Detect new POCs that are stuck",
 ],
 fieldValidated: true,
 },
 {
 id: "admin-console-vitex",
 title: "Admin console: view any seller without credentials (Vitex/Armis style)",
 description:
 "OPS enters seller by seller with credentials that change. Need mirror to see live inventory, orders, and map with store code only.",
 phase: "next",
 actor: "Admin",
 priority: "High",
 evidence: [
 "OPS workshop (Luis): 'Before on Vitex/Armis: store code, see live inventory'",
 "CX benchmark: Vitex-style account to view any seller without credentials",
 "OPS audits stock entering seller by seller — process not friendly",
 ],
 successCriteria: [
 "Single admin login → pick POC → see orders + inventory + map",
 "No credential bag per store",
 ],
 fieldValidated: true,
 },
 {
 id: "admin-heatmap-orders",
 title: "Order heat map integrated in Admin",
 description:
 "Visualize order concentration in coverage without downloading data to Kepler and using 3 external tools. Detect fraud and white spaces.",
 phase: "next",
 actor: "Admin",
 priority: "High",
 evidence: [
 "OPS workshop (Nadia): 'Ultra laborious process… I use three programs to download the maps'",
 "Detected fraud: 90 chips per POC with manual heat map work",
 "OPS next step: Order heat map integrated in Admin/coverage",
 ],
 fieldValidated: true,
 },
 {
 id: "admin-dispatch-kpi-network",
 title: "Network-level dispatch SLA view",
 description:
 "See dispatch failures split by prep vs pickup across all POCs in a city. Supports fair comparison and staffing decisions at OPS level.",
 phase: "next",
 actor: "Admin",
 priority: "Medium",
 evidence: [
 "Puebla 3/5: unfair dispatch SLA when courier staffing is the bottleneck",
 "OPS: progressive distribution and peak staffing requested",
 ],
 dependencies: ["dispatch-sla-split"],
 fieldValidated: true,
 },
 {
 id: "admin-b2b-courier-forecast",
 title: "B2B report: couriers needed per POC per week",
 description:
 "Automatic suggestion of how many couriers a POC needs based on order growth — benchmark Uber Eats AI for supervisor.",
 phase: "next",
 actor: "Admin",
 priority: "Medium",
 evidence: [
 "OPS workshop: 'B2B report so POC knows how much delivery person for following week'",
 "Bad forecast (20–40% error) generates chain of bad experiences",
 ],
 fieldValidated: true,
 },
 {
 id: "admin-polygon-neighbor",
 title: "Polygon editor: see neighboring POC coverage",
 description:
 "When modifying polygons, show adjacent store coverage to close white space without checking street by street in external tools.",
 phase: "later",
 actor: "Admin",
 priority: "Medium",
 evidence: [
 "OPS workshop: 'If we can see the pop coverage next door it would help a lot'",
 "Overlapping debates in Product meeting (Puebla test)",
 "Peru Merino: +70 orders when neighbors turn off SKUs; clients cancel 10–12× to route to preferred POC",
 ],
 fieldValidated: true,
 },
 {
 id: "admin-seller-acquisition",
 title: "Seller acquisition: bulk download + cleaner onboarding",
 description:
 "Registration landing active but data must be exported one by one. Onboarding asks ~10 fields; incorrect phone numbers lose leads.",
 phase: "later",
 actor: "Admin",
 priority: "Medium",
 evidence: [
 "OPS workshop: 'They have to enter one by one to get the data'",
 "Some put tooth number in phone field — lead lost",
 ],
 fieldValidated: true,
 },
 {
 id: "admin-coupon-categories",
 title: "Coupon admin linked to product categories",
 description:
 "Coupon management not linked to current categories (old Cuca taxonomy). Unique codes loaded manually; first-purchase abuse with multiple accounts.",
 phase: "later",
 actor: "Admin",
 priority: "Medium",
 evidence: [
 "OPS workshop: 'Coupon admin is not linked to the product categories'",
 "They create different accounts on same device for first-purchase coupon",
 ],
 fieldValidated: true,
 },
 {
 id: "admin-sku-promo-protection",
 title: "SKU protection for active promos",
 description:
 "Alert before mass SKU shutdown eliminates combos used in promos. Teams had to recreate World Cup combos without knowing if data was lost.",
 phase: "later",
 actor: "Admin",
 priority: "Medium",
 evidence: [
 "OPS workshop: 'SKU disappeared, was eliminated and we had to recreate it'",
 "We don't know if we were going to lose previous data",
 ],
 fieldValidated: true,
 },

 // ══════════════════════════════════════════════════════════════════════════
 // CX
 // ══════════════════════════════════════════════════════════════════════════
 {
 id: "cx-fast-seller-channel",
 title: "Fast seller support channel (not email-only)",
 description:
 "Sellers resolve disputes faster by phone than email tickets answered next day. CX needs a channel that matches peak speed.",
 phase: "now",
 actor: "CX",
 priority: "High",
 evidence: [
 "Talabera + Forjadores: CX email answered next day — want WhatsApp-speed",
 "Bahia: prefers calling customer directly over CI ticket",
 "Puebla cross-store: CX / ticket response too slow",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-courier-map-visibility",
 title: "CX visibility of courier location on map",
 description:
 "Agents are completely blind to courier position — cannot guide or calm consumer during late-order tickets (~40% of volume).",
 phase: "now",
 actor: "CX",
 priority: "Critical",
 evidence: [
 "CX meeting: 'We have no idea or visibility of where the courier is going… completely blind'",
 "CX meeting: distributor can operate offline; consumer map doesn't follow reality",
 "Pin stopped at store with courier already on the way during visit",
 "Peru 3/3: map pin stuck at store, 5–10% courier visibility — WhatsApp tracking",
 ],
 successCriteria: [
 "CX agent sees same live map as seller (read-only)",
 "Offline courier status visible",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-cancellation-reason",
 title: "Mandatory cancellation / expiration reason",
 description:
 "Every canceled or expired order must carry a structured reason visible to CX. Free-text 'other' is lost and doesn't reach agents.",
 phase: "now",
 actor: "CX",
 priority: "High",
 evidence: [
 "CX meeting: 'Every time an order expires or is canceled I have the reason… I want it to be mandatory'",
 "When seller clicks 'other'… we lose that part that he wrote",
 "OPS connectsToStores: reason for cancellation needed for disputes",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-predefined-messages",
 title: "Pre-defined seller → customer messages (pilot)",
 description:
 "Pilot pre-defined messages in seller app for coordination cases — validated by CX for MX market.",
 phase: "now",
 actor: "CX",
 priority: "High",
 evidence: [
 "CX meeting next step: pilot pre-defined messages",
 "~40% of tickets are coordination (no-code, no-answer, wrong address)",
 "Overall roadmap Now: pilot pre-defined seller→customer messages",
 "Peru: deposit-bottle disputes, 10–15 min door waits — no in-app channel",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-consumer-visibility",
 title: "Agent view of consumer app (wallet, points, screen)",
 description:
 "CX cannot see what the consumer sees — always asks for screenshots. No personalization between new and frequent customers.",
 phase: "next",
 actor: "CX",
 priority: "High",
 evidence: [
 "CX meeting: 'We cannot visualize what they see, we do not know what they have in their wallet'",
 "We're always asking for screenshots, always, always",
 "Attention is equal for everyone when it shouldn't be",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-unified-seller-view",
 title: "Unified seller view for agents (Vitex-style)",
 description:
 "One CX account to view inventory, orders, and map of any seller without asking for credentials or screenshots.",
 phase: "next",
 actor: "CX",
 priority: "High",
 evidence: [
 "CX meeting: 'Something similar to Vitex… an account where you log in, you see the seller, their orders, their inventory'",
 "CX + OPS workshop: ecosystem not connected between CX, seller and courier",
 ],
 dependencies: ["admin-console-vitex"],
 fieldValidated: true,
 },
 {
 id: "cx-decision-tree",
 title: "Decision tree for complaints (Uber/iFood benchmark)",
 description:
 "Self-service complaint resolution before reaching a human. iFood DC Delivery already has it; reduces ticket volume.",
 phase: "next",
 actor: "CX",
 priority: "Medium",
 evidence: [
 "CX meeting: 'Uber gives you a decision tree… don't contact a human'",
 "OPS next step: CX decision tree — Uber/iFood benchmark",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-delivered-not-received",
 title: "Simplify 'delivered not received' flow",
 description:
 "High-impact ticket category. Courier has 3 options to mark endless delivery — CX wants only 1 clear path.",
 phase: "next",
 actor: "CX",
 priority: "Medium",
 evidence: [
 "CX meeting: 'Delivered and not received… has an impact on my tickets'",
 "There are three options to mark orders endlessly, I want there to be only one",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-consumer-cancellation",
 title: "Consumer self-cancel / address modify flow",
 description:
 "~20% of tickets are cancellation requests. Allow address modify within perimeter without canceling; block repeat 1-min cancellers.",
 phase: "later",
 actor: "CX",
 priority: "Medium",
 evidence: [
 "CX meeting: 'Almost 20% of my tickets are intended to be cancelled'",
 "Consumers cancel 2–5 consecutive times within the first minute",
 ],
 fieldValidated: true,
 },
 {
 id: "cx-ai-bots-ops",
 title: "AI bots for team management + Braze verification",
 description:
 "AI bots to help CX manage volume. Verify if user received coupon/communication via Braze history by email.",
 phase: "later",
 actor: "CX",
 priority: "Medium",
 evidence: [
 "CX meeting: 'AI bots… can be decisive'",
 "OPS admin: don't know if user received coupon — need Braze history",
 ],
 fieldValidated: true,
 },
];

export const UX_PHASE_META: Record<
 UxRoadmapPhase,
 { label: string; horizon: string; tone: "warning" | "info" | "neutral" }
> = {
 now: { label: "Now", horizon: "0–3 months", tone: "warning" },
 next: { label: "Next", horizon: "3–6 months", tone: "info" },
 later: { label: "Later", horizon: "6+ months", tone: "neutral" },
};

export function countUxRoadmapByPhase(phase: UxRoadmapPhase): number {
 return UX_ROADMAP_ITEMS.filter((i) => i.phase === phase).length;
}

export function countUxRoadmapByActor(actor: UxRoadmapActor): number {
 return UX_ROADMAP_ITEMS.filter((i) => i.actor === actor).length;
}

export function countUxDesignerProposals(): number {
 return UX_ROADMAP_ITEMS.filter((i) => i.designerProposal).length;
}

export function itemsForActor(
 actor: UxRoadmapActor,
 phase?: UxRoadmapPhase,
): UxRoadmapItem[] {
 return UX_ROADMAP_ITEMS.filter(
 (i) => i.actor === actor && (phase === undefined || i.phase === phase),
 );
}
