import { EC_WORKSHOP_OCT08_VOTE_WINNERS } from "./ecuador-workshop-oct08";
import { PE_CONSUMER_VISION } from "./peru-consumer-vision";
import { PE_WORKSHOP_0209 } from "./peru-workshop-0209";

export type GlobalPriority = "Critical" | "High" | "Medium";

export type GlobalTopicId = "consumer" | "rewards";

export type GlobalWorkshopVote = {
 rank?: number;
 votes?: number;
 title: string;
 detail: string;
};

export type GlobalWorkshopVoteBlock = {
 id: string;
 label: string;
 votes: GlobalWorkshopVote[];
};

export type GlobalTopicSnapshot = {
 id: GlobalTopicId;
 label: string;
 headline: string;
 sources: string[];
 workshopVoteBlocks: GlobalWorkshopVoteBlock[];
 themes: string[];
 insightRanks: number[];
};

export type GlobalInsight = {
 rank: number;
 priority: GlobalPriority;
 title: string;
 summary: string;
 coverage: string;
 countries: ("Mexico" | "Peru" | "Ecuador" | "Colombia")[];
 layer:
 | "Reliability"
 | "Peak ops"
 | "Portfolio"
 | "Communication"
 | "Metrics"
 | "Commercial"
 | "Infra"
 | "Loyalty"
 | "Growth";
 roadmapIds: string[];
 evidence: string[];
 suggestion: string;
 owners?: string;
};

export const GLOBAL_EXECUTIVE_SUMMARY = {
 headline:
 "One portfolio story across countries: consumer habit and rewards frequency only stick when stock, seller, courier, address, ETA and recovery stay aligned — growth, Club/CRM and service level advance together.",
 paragraphs: [
 "Consumer and rewards signals: churn still shows intent (76% first choice) but breaks on friction; Lovers Plus proves habit when Perfect Orders and SLA15 hold; workshops voted live map, wallet/Club, Braze enrichment and cohort CRM alongside ops KPIs. Colombia and Peru both stress marketplace/bank cohorts that need different messages than core beer.",
 "Field visits (Mexico, Peru, Ecuador, Colombia) ground the same failures in stores: map/GPS, quantity-less inventory, post-purchase coordination, promo vs supply timing, and WhatsApp as the shadow ops layer. These are consumer-visible problems as much as seller metrics.",
 "Service level and seller/courier research quantify the delivery chain: Small vs Large seller maturity, courier exception friction, and peak tooling gaps. Reliability work runs in parallel with consumer recovery and rewards data — not as a gate that freezes Club, For You or BIN promos.",
 "Competition is mission-based: Rappi, Uber and PedidosYa win on ecosystem breadth in different ways. TaDa should measure total price, ETA, failure, recovery and frequency per occasion — and invest in beverage-focused loyalty (Club, wallet, personalization) with clean events.",
 ],
 stats: [
 { label: "Countries field + benchmark", value: "4" },
 { label: "POCs + sessions", value: "12 + 10" },
 { label: "Cross-themes + lenses", value: "35 + 8" },
 { label: "Research respondents", value: "1.630+ reviews · 1.506 surveys" },
 ],
};

export const GLOBAL_INSIGHTS: GlobalInsight[] = [
 {
 rank: 1,
 priority: "Critical",
 title: "Seller reliability at peak — sound, session, map load, expired orders",
 summary:
 "Orders expire or never reach the courier when the app is backgrounded, silent, or frozen. Same outcome in CDMX Saturdays, Puebla World Cup peaks, and Peru quiet shifts.",
 coverage: "MX 6/9 POCs · PE 2/3",
 countries: ["Mexico", "Peru"],
 layer: "Reliability",
 roadmapIds: ["order-alert-session", "courier-order-push", "map-assign-stay"],
 evidence: [
 "MX CDMX 3/4: order doesn't reach courier without refresh",
 "MX Puebla 3/5: app closes 4–5×/day (Zavaleta); no sound → expired orders (San Jerónimo); map blank at 20 orders (Forjadores)",
 "PE Merino + San Pedro: notification sound intermittent — missed orders while picking alone",
 ],
 suggestion:
 "Reliable push + sound on seller and courier. Session persistence through a full peak. Map loads 50+ concurrent orders without blank screen.",
 owners: "Eng. Seller/Courier · PM Seller · OPS",
 },
 {
 rank: 2,
 priority: "Critical",
 title: "GPS / map does not update in real time",
 summary:
 "Courier pin stuck at store after leaving; only 1–2 riders visible on peak. Consumer and seller see stale position — ~80% of 'late' complaints are display, not delivery time.",
 coverage: "MX 4/4 CDMX · PE 3/3 Lima",
 countries: ["Mexico", "Peru"],
 layer: "Reliability",
 roadmapIds: ["cx-courier-map-visibility", "courier-route-map", "ya-llegue-fix"],
 evidence: [
 "MX CDMX 4/4: pin stuck, tracking disappears on return",
 "PE 3/3: 5–10% map visibility on Saturday — WhatsApp workaround everywhere",
 "CX meeting: agents completely blind to courier position",
 ],
 suggestion:
 "Foreground/background pin updates. CX read-only live map. 'Ya llegué' push that consumer actually sees.",
 owners: "Eng. Seller/Courier · CX (Diego)",
 },
 {
 rank: 3,
 priority: "Critical",
 title: "Inventory without real quantity — search and combos broken",
 summary:
 "On/off toggle does not reflect stock. No quantity field; combos don't disable together; search misses brand/format. Orders arrive on turned-off SKUs.",
 coverage: "MX 4/4 CDMX · PE 3/3 · EC Oct 8 POC qty (2 votes) · Puebla search",
 countries: ["Mexico", "Peru", "Ecuador"],
 layer: "Portfolio",
 roadmapIds: ["portfolio-quantity", "portfolio-filters", "portfolio-unified"],
 evidence: [
 "MX CDMX unanimous #1 ask — Los Alpes 'top priority'",
 "MX Puebla: search breaks on modelo/combos; snack group shows 5/20 items",
 "PE 3/3: Flor de Caña off but combo SKU still accepts orders; VTEX/Tuca benchmark cited",
 "PE morning context: combo-as-third-SKU pain — same as Mexico",
 "EC Oct 7: no seller quantity → consumer cancel option raised cancellations; team wants suggested replenishment",
 "EC Oct 8 workshop: stock zero/infinite in seller; manual Pareto off at 4 units; peak sell-through leaves SKU on → cancellations (2 votes POC qty)",
 "EC Oct 8: Vitex-style daily load removed post-BEES — want theoretical opening stock minus sales",
 ],
 suggestion:
 "Quantity MVP with optional auto-decrement. Parent SKU disables variants. Search by brand/format. Compose combos from two active SKUs (Victor Ágora ask in both countries).",
 owners: "PM Seller · Design · CX",
 },
 {
 rank: 4,
 priority: "Critical",
 title: "Wrong POC routing — overlap, spillover, cancel-to-route",
 summary:
 "Customer gets distant store; neighbor turns off SKU and volume floods one POC; consumer cancels 10–12× to hit preferred store when name is visible in app.",
 coverage: "MX 6/9 · PE 2/3 · Product overlap test",
 countries: ["Mexico", "Peru"],
 layer: "Peak ops",
 roadmapIds: ["admin-polygon-neighbor", "dispatch-sla-split"],
 evidence: [
 "MX CDMX 3/4 + Puebla 3/5: nearby client routed elsewhere",
 "MX Forjadores absorbs Zavaleta + San Jerónimo spillover when neighbors disable SKUs",
 "PE Merino +70 orders/weekend when coverage moved; cancel-to-route gaming",
 "Product meeting: Puebla overlap test ~3%",
 ],
 suggestion:
 "Run overlap/cancellation tests. Limit spillover when neighbor disables SKU. Review late-hours polygons. Hide or de-emphasize store name in consumer routing.",
 owners: "PM Product · OPS · Data",
 },
 {
 rank: 5,
 priority: "High",
 title: "Dispatch SLA unfair — order ready, no courier for 10–15 min",
 summary:
 "Metric goes red when seller prepared in 2–3 min but rider arrives at 15 min. World Cup: 40–50 orders / 8 couriers in 5 minutes.",
 coverage: "MX Puebla 3/5 · PE peak pattern",
 countries: ["Mexico", "Peru"],
 layer: "Peak ops",
 roadmapIds: ["dispatch-sla-split", "multi-assign-seller", "map-kanban-unified"],
 evidence: [
 "MX Zavaleta: ready at 3 min, courier at 15 min — dispatch red, delivery OK",
 "MX Forjadores: 50 orders / 8 riders — impossible 10-min dispatch for all",
 "PE San Pedro: 7 couriers 18h/day in 3.5 km — TML 10 lowest in visit set",
 ],
 suggestion:
 "Split 'prepared' vs 'picked up' timestamps. Peak-adjusted targets. Multi-assign to courier already en route.",
 owners: "PM Seller · Data · OPS",
 },
 {
 rank: 6,
 priority: "High",
 title: "No in-app seller ↔ customer / courier communication",
 summary:
 "100% WhatsApp and phone calls. No audit trail. Deposit-bottle disputes, door waits, wrong-SKU coordination — sellers remember having chat in a previous tool.",
 coverage: "MX 4/4 CDMX · PE 3/3 · EC Oct 8 vote",
 countries: ["Mexico", "Peru", "Ecuador"],
 layer: "Communication",
 roadmapIds: ["in-app-chat-seller", "cx-predefined-messages", "cx-fast-seller-channel"],
 evidence: [
 "MX CDMX 4/4: WhatsApp default; courier calls 90% on arrival",
 "MX Puebla: Talabera CX email next day — slower than phone",
 "PE 3/3: no channel; La Marina 4–5 of 50 orders with bottle disputes → 1-star",
 "CX meeting: ~40% tickets are coordination; pilot pre-defined messages agreed",
 "EC Oct 8: consumer ↔ courier messaging voted (2); ties to wrong address and cancel-after-dispatch",
 ],
 suggestion:
 "Pilot pre-defined seller→customer messages (MX + PE). Fast seller↔CX channel for peak — not email-only.",
 owners: "PM CX · PM Seller",
 },
 {
 rank: 7,
 priority: "High",
 title: "KPIs locked to 7 days — no daily / hourly / calendar week",
 summary:
 "Sellers cannot see yesterday or Mon–Sun week. Ranking peer set opaque. SLA 35 hidden in seller UI. Forecast shows 30 orders, 7 arrive.",
 coverage: "MX 4/4 CDMX + 2/5 Puebla · PE 3/3 · EC Oct 7–8",
 countries: ["Mexico", "Peru", "Ecuador"],
 layer: "Metrics",
 evidence: [
 "MX CDMX 4/4: 7-day rolling window prevents daily management",
 "MX Zavaleta: wants orders/hour + couriers/hour (today via Excel)",
 "PE 3/3: rolling 7 days; SLA 35 hidden; rank #32 without knowing algorithm",
 "PE WebPO: weekly Mon–Sun view praised — partial local fix",
 "EC Oct 7: supervisors run Power BI FOR + projection calculators; seller home KPI page unused by POCs",
 "EC: motorizado need/hour built in Excel from BEES raw data — wants platform automation",
 "EC Oct 7: supervisors share motorizado forecast via WhatsApp from BEES export — not in seller platform",
 ],
 suggestion:
 "Date filter (day/week/month). Hourly heatmap (orders + couriers). AI explanations for opaque metrics. Resume OPS Power BI cockpit per POC.",
 owners: "PM Seller · OPS · Data",
 roadmapIds: [
 "metrics-date-filter",
 "metrics-hourly",
 "metrics-ai-mvp",
 "admin-kpi-cockpit",
 "admin-b2b-courier-forecast",
 "forecast-trust",
 ],
 },
 {
 rank: 8,
 priority: "High",
 title: "Promo calendar misaligned with supply and seller visibility",
 summary:
 "Consumer sees promo before seller can stock. Supply delivers once/week; promo ladder with 1–2 days notice. BEES/WebPO doesn't alert on consumer promos.",
 coverage: "MX Puebla 3/5 · PE context + WebPO gap",
 countries: ["Mexico", "Peru"],
 layer: "Commercial",
 roadmapIds: ["notification-center", "admin-sku-promo-protection"],
 evidence: [
 "MX Forjadores: Corona 30→50% World Cup, 250 cartons ordered, still stockout",
 "MX San Jerónimo: order Fri → deliver Tue; promo Sat",
 "PE La Marina: Stella promo in consumer app but not BEES — can't pre-stock",
 "Promo workshop: planning fragmented across Excel, Trello, WhatsApp",
 ],
 suggestion:
 "7+ day promo notice to sellers. 2–3 weekly delivery slots. Promo alert in seller platform + supply (not only consumer app). Centralize promo calendar.",
 owners: "Commercial · OPS · PM Seller",
 },
 {
 rank: 9,
 priority: "High",
 title: "Reimbursement and payment transparency",
 summary:
 "Sellers reconcile in Excel/notebook because platform numbers are opaque. Weekly VLC breakdown and credit notes work in Peru WebPO — same ask in Mexico meetings.",
 coverage: "MX 4/4 pattern · PE WebPO validated",
 countries: ["Mexico", "Peru"],
 layer: "Metrics",
 roadmapIds: ["reimbursement-breakdown", "financial-report-date-filter", "courier-jumbo-seller-view"],
 evidence: [
 "MX Bahia: 30 min/week manual reconciliation in Excel",
 "MX Churubusco: trusts payment but cannot audit order by order",
 "PE WebPO: S/ total − delivery = monto a facturar with downloadable detail",
 "Product meeting: Courier Financial Report (Jumbo) launching",
 ],
 suggestion:
 "Line-by-line weekly reimbursement with drill-down to order. Bring WebPO payment UX into official seller platform.",
 owners: "PM Seller · Finance · OPS",
 },
 {
 rank: 10,
 priority: "High",
 title: "Operations map UX — assign kicks off screen, blank under load",
 summary:
 "Assigning a courier navigates away from map or freezes the table. Store pin disappears. Sellers want map + kanban on one screen.",
 coverage: "MX 4/4 CDMX · PE map pain compounds",
 countries: ["Mexico", "Peru"],
 layer: "Peak ops",
 roadmapIds: ["map-assign-stay", "map-kanban-unified", "map-visual-priority"],
 evidence: [
 "MX Los Alpes: 'ideal is it doesn't take us out of this screen'",
 "MX Forjadores: zoom to assign loops back — 20 orders invisible",
 "PE: map useless for dispatch at peak — WhatsApp replaces it",
 "Interview script: Figma map+kanban tested in every CDMX visit",
 ],
 suggestion:
 "Assign without leaving map. Visual priority (not all red). Unified map + kanban pilot at one POC.",
 owners: "PM Seller · Design",
 },
 {
 rank: 11,
 priority: "Medium",
 title: "Cold chain and volume promos — fridge, ice, returnables, cartons",
 summary:
 "Carton promos exceed fridge capacity. Ice at seller cost. Returnables stack 2–4 cartons on moto. Peru ~60% returnable; Puebla 4/5 report warm product.",
 coverage: "MX Puebla 4/5 · PE 2/3",
 countries: ["Mexico", "Peru"],
 layer: "Infra",
 roadmapIds: [],
 evidence: [
 "MX Puebla: max 5 cartons in fridge; 10-carton orders go warm",
 "MX Mixcoac: no space for ice; hot product complaints",
 "PE Merino: 28-bottle promo hated; couriers stack 4 cartons with rubber bands",
 "PE context: returnables = differentiator vs Rappi",
 ],
 suggestion:
 "Ice machine program for high-volume POCs. Carton promo fridge playbook. Returnable bag redesign for multi-carton.",
 owners: "OPS · Commercial",
 },
 {
 rank: 12,
 priority: "Medium",
 title: "CX / support channel too slow for peak coordination",
 summary:
 "Email tickets answered next day. Sellers resolve faster by phone than platform. Mandatory cancellation reasons lost in free-text.",
 coverage: "MX Puebla 2/5 + CX · PE deposit disputes",
 countries: ["Mexico", "Peru"],
 layer: "Communication",
 roadmapIds: ["cx-fast-seller-channel", "cx-cancellation-reason", "cx-unified-seller-view"],
 evidence: [
 "MX Talabera + Forjadores: CX email next day",
 "CX meeting: mandatory cancellation reason — 'other' field lost",
 "PE: disputes drive 1-star when no seller-customer channel",
 ],
 suggestion:
 "WhatsApp-speed seller support channel. Mandatory structured cancellation reasons visible to CX.",
 owners: "PM CX · OPS",
 },
 {
 rank: 13,
 priority: "Medium",
 title: "Courier app stability and peak economics",
 summary:
 "App freezes requiring reinstall. Offline sync issues. Couriers compare Uber economics; peak bonuses worked in World Cup but not systematic.",
 coverage: "MX 3/4 CDMX · PE assignment bugs",
 countries: ["Mexico", "Peru"],
 layer: "Reliability",
 roadmapIds: ["courier-order-push", "courier-financial-statement", "courier-earnings-daily"],
 evidence: [
 "MX Churubusco: courier app freezes — needs reinstall",
 "MX Puebla: peak bonus brought riders; Uber pays more",
 "PE La Marina: assign freezes — key sent, order stuck in waiting",
 "OPS workshop: Android version issues on courier phones",
 ],
 suggestion:
 "Android crash fix. Structured peak incentives. Courier earnings visibility (Jumbo report).",
 owners: "PM Courier · Eng. · OPS",
 },
 {
 rank: 14,
 priority: "Medium",
 title: "Fill Rate and address quality — product + ops lever",
 summary:
 "Fill Rate flat ~92% in Peru (target 93%). Wrong address and no-answer drive cancellations. Brazil location UX candidate (−1 pp location cancellations).",
 coverage: "PE national KPI · MX Fill Rate pressure",
 countries: ["Mexico", "Peru"],
 layer: "Commercial",
 roadmapIds: [],
 evidence: [
 "PE context: Fill Rate stuck since 2024; address modal launched last weekend",
 "MX Bahia: Fill Rate −8 pp Jun→Jul",
 "Brazil benchmark: 50% faster location input, −1 pp location cancellations",
 "PE San Pedro: 12.2% seller cancellations",
 ],
 suggestion:
 "Roll out Brazil location UX in Peru (config). Fill Rate cut by new vs returning users. Pair ops pressure with address product fix.",
 owners: "PM Consumer · OPS · Data (Bruno Masayoli)",
 },
 {
 rank: 15,
 priority: "Critical",
 title: "Inventory real-time is the strategic unlock — not another dashboard widget",
 summary:
 "Without quantity truth, partial order recovery, supervisor stockout prevention and predictive ops stay reactive. Unanimous in store visits; #1 OPS workshop future bet pairs with scan-to-activate and copilot.",
 coverage: "MX 4/4 CDMX · PE 3/3 · SL vision · PE workshop",
 countries: ["Mexico", "Peru"],
 layer: "Portfolio",
 roadmapIds: ["portfolio-quantity", "portfolio-unified", "metrics-ai-mvp"],
 evidence: [
 "PE Service Level (Sep 1): inventory real-time = strategic gap — Power BI + WhatsApp workaround",
 "MX CDMX unanimous #1 — Los Alpes 'top priority'",
 "PE workshop OPS future #2: stock activation via receipt scan + copilot",
 "PE workshop OPS challenge #1: real-time KPI visibility includes stockout risk",
 ],
 suggestion:
 "Quantity MVP with optional auto-decrement. Supervisor alerts before stockout. Scan supplier invoice → activate SKUs. Unlocks partial orders and fair dispatch.",
 owners: "PM Seller · OPS · Data",
 },
 {
 rank: 16,
 priority: "High",
 title: "Predictive ops cockpit — from corrective WhatsApp to real-time KPIs",
 summary:
 "Supervisors answer WhatsApp on Sunday 4pm; sellers wait until 9pm for ops dashboard. OPS workshop #1 vote: live stock, SLA, availability, hot products, courier dotation.",
 coverage: "MX OPS workshop · PE 3/3 · PE workshop OPS #1",
 countries: ["Mexico", "Peru"],
 layer: "Metrics",
 roadmapIds: ["admin-kpi-cockpit", "metrics-hourly", "metrics-ai-mvp"],
 evidence: [
 "PE workshop OPS: weekend monitoring via WhatsApp — want copilot/automation",
 "MX OPS (Daniela/John): 'summary where we can see real time… SLA, free rate'",
 "MX OPS (Luis): Armis/Vitex — store code, live inventory per POC",
 "PE WebPO: weekly Mon–Sun KPIs praised — partial consistent rollout target",
 ],
 suggestion:
 "Resume Power BI cockpit per POC in seller platform. Hourly orders + couriers heatmap. AI explains opaque ranking. Alert before SLA breaks.",
 owners: "PM Seller · OPS · Data",
 },
 {
 rank: 17,
 priority: "High",
 title: "Claims & compensation triangle — CX, store and consumer not connected",
 summary:
 "Zendesk → store email takes days. Compensation only if customer contacts support. OPS workshop #3 priority. Deposit disputes drive 1-star when no seller channel.",
 coverage: "PE workshop OPS #3 · PE 3/3 · MX CX",
 countries: ["Peru", "Mexico"],
 layer: "Communication",
 roadmapIds: ["cx-fast-seller-channel", "cx-unified-seller-view"],
 evidence: [
 "PE workshop: parallel email chain — CX, store, consumer not triangulated",
 "PE La Marina: 4–5 of 50 orders bottle disputes → 1-star",
 "MX CX: ~40% tickets are coordination",
 "PE Service Level: timed traceable messaging for wrong address + no-answer",
 ],
 suggestion:
 "Faster credits/refunds like market best practice. Unified seller view for CX. Structured cancellation + dispute reasons visible to all parties.",
 owners: "PM CX · OPS · PM Seller",
 },
 {
 rank: 18,
 priority: "High",
 title: "Data stack fragmentation — AppsFlyer, MMP, Segment not homologated",
 summary:
 "Consumer workshop #2: attribution and funnel data inconsistent across tools. Blocks personalization, CRM triggers and ROI measurement for growth.",
 coverage: "PE workshop Consumer #2",
 countries: ["Peru"],
 layer: "Growth",
 roadmapIds: [],
 evidence: [
 "PE workshop Consumer: AppsFlyer/MMP integration voted #2",
 "PE workshop: static cross-sell carousel — can't customize by category or history",
 "Promo workshop MX: no real-time dashboard to adjust active mechanics",
 ],
 suggestion:
 "Use one shared event taxonomy across AppsFlyer, Segment and Braze. Enable category/user-based merchandising. Foundation for personalization and football occasion APIs.",
 owners: "Growth · Data · PM Consumer",
 },
 {
 rank: 19,
 priority: "High",
 title: "Loyalty stack gaps — Braze, flash coupons, BEES admin, anti-fraud",
 summary:
 "Rewards workshop top 4: Club TaDa × Braze enrichment, flash coupons in wallet, rewards admin in BEES, anti-fraud automation. Tiers and omnichannel are 3–4 year horizon.",
 coverage: "PE workshop Rewards · EC Oct 8 #1 vote (4)",
 countries: ["Peru", "Ecuador"],
 layer: "Loyalty",
 roadmapIds: ["notification-center"],
 evidence: [
 "PE workshop Rewards #1: Braze enrichment for Club TaDa",
 "PE workshop #2: flash coupons — wallet UX also Consumer #4",
 "PE workshop #3: BEES-integrated rewards admin",
 "PE workshop #4: anti-fraud automation — SED Turbo 5% orders fraud risk",
 "EC Oct 8: Club TaDa native integration — top workshop vote; external platform blocks CX; year-end migration target",
 "EC Oct 8: sampling CSV loads fail in prod; live promo counters (order #100) voted (2)",
 ],
 suggestion:
 "Ship flash coupon mechanics + wallet UX together. Centralize rewards config in BEES. Braze triggers for occasion (football, birthday). Fraud rules before scaling earn/burn.",
 owners: "Rewards · PM Consumer · Commercial",
 },
 {
 rank: 20,
 priority: "High",
 title: "Ecosystem communication — seller, courier, consumer, CX still siloed",
 summary:
 "Service Level vision umbrella: Braze for OPS→store comms, delivery proof code, quantitative picker. Same root as WhatsApp workaround everywhere.",
 coverage: "PE SL vision · MX CX · both countries 3/3+",
 countries: ["Mexico", "Peru"],
 layer: "Communication",
 roadmapIds: ["in-app-chat-seller", "notification-center", "cx-predefined-messages"],
 evidence: [
 "PE SL: Ecosystem Communication = umbrella for all contact layers",
 "PE SL: Braze centralizes OPS→store with training/campaigns tooling",
 "MX notification center pilot Bolivia → LATAM consistent rollout",
 "100% WhatsApp in every country visited",
 ],
 suggestion:
 "Pilot pre-defined messages. Braze for ops campaigns. Notification center consistent rollout. In-app chat as phase 2 once reliability fixed.",
 owners: "PM CX · PM Seller · PM Courier",
 },
 {
 rank: 21,
 priority: "Medium",
 title: "Promo ops fragmented — Excel, Trello, VTEX, consumer app out of sync",
 summary:
 "Commercial runs promos across disconnected tools. Field visits show consumer sees promo before seller can stock. Peru Stella in app but not BEES.",
 coverage: "MX Promo workshop · PE 2/3 · Puebla 3/5",
 countries: ["Mexico", "Peru"],
 layer: "Commercial",
 roadmapIds: ["notification-center", "admin-sku-promo-protection"],
 evidence: [
 "Promo workshop: Excel + Trello + VTEX fragmentation",
 "MX Forjadores: Corona 30→50% World Cup, 250 cartons, still stockout",
 "PE La Marina: Stella promo in consumer app but not BEES",
 "PE workshop OPS #4: SKU restrictions on coupons reduce promo errors",
 ],
 suggestion:
 "Centralized promo calendar with 7-day seller notice. Flash promo module. Link calendar → seller notification → supply slots. Category/brand-level config.",
 owners: "Commercial · PM Seller · OPS",
 },
 {
 rank: 22,
 priority: "Medium",
 title: "2028 bets converging — vending, football, omnichannel, partnerships",
 summary:
 "Workshop future vision: OPS wants scheduled orders + vending + OXXO/Tambo; Consumer wants virtual returnables + personalization; Rewards wants football earn/burn + omnichannel redemption.",
 coverage: "PE workshop all groups · EC Oct 8 dreams · Momento Inesperado",
 countries: ["Peru", "Ecuador"],
 layer: "Loyalty",
 roadmapIds: [],
 evidence: [
 "PE OPS future #1: scheduled orders + vending machine pickup",
 "PE Rewards future #1: football occasion earn/burn + API",
 "PE Consumer future: virtual returnables + pickup",
 "Momento Inesperado: football kit near canchita, birthday DJ, first Club beer",
 "EC Oct 8 dreams: subscription/TaDa premium (4), split pay Círculos, scheduled delivery, mundialito dark stores",
 "EC Oct 8 telão: birthday free order, meet football player, top courier recognition cross-country",
 ],
 suggestion:
 "Sequence after Q1–Q2 foundations: football MVP via Braze, Tambo omnichannel pilot, vending/partnership discovery. Tiers 3–4 year horizon.",
 owners: "Product · Rewards · OPS · Partnerships",
 },
 {
 rank: 23,
 priority: "High",
 title: "Returnables / RGB — consumer doesn't understand exchange rules",
 summary:
 "44% of Peru orders include RGB but awareness is price-driven, not education. Cross-brand bottle swap unclear; Retornafest window missed. Brand page path agreed for education landing.",
 coverage: "PE Sep 3 P1 · Consumer workshop returnables",
 countries: ["Peru"],
 layer: "Growth",
 roadmapIds: [],
 evidence: [
 "PE Consumer vision P1: Tengo/No tengo tags confuse consumers",
 "PE 44% RGB order share vs Rappi moat — education gap",
 "Brand page + multishowcases agreed; Retornafest Sep missed",
 ],
 suggestion:
 "Ship returnables education on brand page + category header. Coordinate next campaign window with Growth.",
 owners: "PM Consumer · Peru Growth · Commercial",
 },
 {
 rank: 24,
 priority: "High",
 title: "CX chatbot — not tropicalized for Peru",
 summary:
 "~45% deflection but AI stale ~2 years; no human delivery chain. Bot asks country/phone already known. Service-design scope requested beyond bot-only.",
 coverage: "PE Sep 3 P1",
 countries: ["Peru"],
 layer: "Growth",
 roadmapIds: ["cx-decision-tree", "cx-predefined-messages"],
 evidence: [
 "PE Consumer vision P1: tropicalization gap",
 "Diego/Helio discovery started — not bot-only fix",
 "MX CX benchmark: decision tree + predefined messages",
 ],
 suggestion:
 "Tropicalize flows + human escalation. Pair with ecosystem comms for coordination tickets.",
 owners: "PM CX · Peru Growth",
 },
 {
 rank: 25,
 priority: "High",
 title: "Coupon wallet UX + lifecycle — manual clusters, flash burn missing",
 summary:
 "Monthly manual lifecycle coupons; wallet shows last-created first. Rewards wants flash countdown coupons; Club TaDa migration path for create/order/segment.",
 coverage: "PE Consumer wk #4 · Rewards wk #2 · Sep 3 P2",
 countries: ["Peru"],
 layer: "Growth",
 roadmapIds: ["notification-center"],
 evidence: [
 "PE Consumer workshop #4: wallet UX + Club ordering",
 "PE Rewards workshop #2: flash coupons not built",
 "PE Growth P2: lifecycle clusters manual per month",
 ],
 suggestion:
 "Redesign wallet UX. Ship flash burn mechanics with Club TaDa admin — 30-day validity migration.",
 owners: "Rewards · PM Consumer · Growth",
 },
 {
 rank: 26,
 priority: "High",
 title: "Online payments blocked — Peru 3% share, Ecuador gateway off after fraud",
 summary:
 "Peru online pay share only 3% on a sole gateway; Ecuador turned payments off after card cloning without OTP/3DS — COD dominates, cancel penalties and split-pay dreams fail. BIN campaigns and orchestrator expansion stall in both markets.",
 coverage: "PE Consumer workshop #3 · Sep 3 P3 · EC Oct 7–8 (Critical on workshop board)",
 countries: ["Peru", "Ecuador"],
 layer: "Growth",
 roadmapIds: [],
 evidence: [
 "PE Consumer workshop #3: BBVA/BCP-style BIN promos",
 "PE Consumer vision P3: Nube dependency",
 "Fish Promo digitization blocked without payment diversity",
 "EC Oct 7: gateway off after card-cloning fraud — cash-on-delivery only despite user expectation of digital pay",
 "EC Oct 8: no OTP/3DS on stored cards → chargebacks; cancel penalties need online pay — cash penalty never collected",
 "EC Oct 8 dreams: split pay (Círculos), wallet cashback — all gated on payment rails",
 ],
 suggestion:
 "Expand payment orchestrator country-by-country. Enable BIN partnerships for acquisition.",
 owners: "Fintech · PM Consumer · Growth",
 },
 {
 rank: 27,
 priority: "Medium",
 title: "Multishowcases + Buy Again — product ship track vs field gaps",
 summary:
 "Sep 3: multishowcases Sep 15 target, Buy Again 98% ATC / 61% conversion. Gaps remain: map, returnables, partial order, data stack — ship track ≠ field readiness.",
 coverage: "PE Consumer vision Sep 3",
 countries: ["Peru"],
 layer: "Growth",
 roadmapIds: [],
 evidence: [
 "PE product demo: 12+ features on roadmap",
 "Buy Again beats category conversion in Mexico reference",
 "Growth 18 pains — 6 P1 still open",
 ],
 suggestion:
 "Prioritize Peru rollout sequence with Growth. Don't ship all features at once — map + address first.",
 owners: "PM Consumer · Victoria/Fernando · Peru Growth",
 },
 {
 rank: 28,
 priority: "High",
 title: "Community POC hybrid — legal pilot before territorial leap",
 summary:
 "Ecuador plans 112 Community POCs alongside 28 dark stores (6→41 cities, coverage 42%→67%) but cannot run POP pricing in-app today — pilot + regulation first.",
 coverage: "EC Oct 7 prep · aligns with CO/MX seller landing",
 countries: ["Ecuador"],
 layer: "Growth",
 roadmapIds: [],
 evidence: [
 "EC: 100% dark store today; hybrid doubles orders in model vs LE26",
 "EC: legal blocks Community POC tooling — reference price workflow needed",
 "EC: coast/insecurity (Guayaquil) — Community POC to attack competition zones",
 ],
 suggestion:
 "Ship seller acquisition landing when GO. App workflow for POP reference prices. Keep dark stores for service control in core cities.",
 owners: "Ecuador expansion · PM Seller · Legal",
 },
 {
 rank: 29,
 priority: "High",
 title: "Motorizado locked to first POC — slow reassignment",
 summary:
 "After Vitex migration, one courier account binds to one store. Store closure or city move needs ticket + delete — ops pain at scale.",
 coverage: "EC Oct 7 · legal/third-party rule",
 countries: ["Ecuador"],
 layer: "Peak ops",
 roadmapIds: [],
 evidence: [
 "EC Cindy: motorizado cannot register in second POC without back-office removal",
 "Product: not parallel multi-store — fast transfer when POC closes",
 ],
 suggestion:
 "Legal review of third-party rules; self-serve POC transfer without multi-homing.",
 owners: "Courier product · Legal · OPS",
 },
 {
 rank: 30,
 priority: "Medium",
 title: "CRM holdout discipline — prime slots drive incrementality",
 summary:
 "Ecuador runs holdout tests on pushes: Fri 18h +50%, Sun 12h +40%; mornings ~+5%. Checkout incoherence (fee promise) kills lift.",
 coverage: "EC CRM W40 deck · Oct 7",
 countries: ["Ecuador"],
 layer: "Commercial",
 roadmapIds: [],
 evidence: [
 "EC: Chelizza ≥$30 lifts ticket +$8.40 vs control",
 "EC: Sat 20h fee glitch push +3.3% — neutral vs control",
 "EC: hyper-personalization by purchase history in Braze",
 ],
 suggestion:
 "Apply the holdout test playbook playbook to Mexico and Peru. Fix promo/checkout coherence before scaling pushes.",
 owners: "CRM · PM Consumer · Growth",
 },
 {
 rank: 31,
 priority: "Medium",
 title: "One DDC per POC — granularity win at small scale",
 summary:
 "Ecuador moved from shared DDC (5–6 POCs) to one per store — stockout 0.8% with centralized supply. Promo Excel per 23 POCs; regroup when density rises.",
 coverage: "EC Oct 7 · same play as PE portfolio granularity",
 countries: ["Ecuador", "Peru"],
 layer: "Portfolio",
 roadmapIds: [],
 evidence: [
 "EC Majo: DDC per POC improved indicators vs shared regional DDC",
 "EC: incentive if stockout <2% (~15¢/order)",
 "Risk at 500 POCs: merge DDCs when consumer behavior converges geographically",
 ],
 suggestion:
 "Productize per-POC promo templates (not only Excel). Plan DDC regrouping rules before Community POC scale.",
 owners: "OPS · PM Seller · Commercial",
 },
 {
 rank: 32,
 priority: "Critical",
 title: "Club TaDa integration — Ecuador workshop #1 vote",
 summary:
 "Managing loyalty on an external platform is the top near-term bet (4 votes). Sampling, refunds visibility and CRM triggers stall until Club lives natively in the app.",
 coverage: "EC Oct 8 workshop · PE Rewards stack",
 countries: ["Ecuador", "Peru"],
 layer: "Loyalty",
 roadmapIds: ["notification-center"],
 evidence: [
 "EC Oct 8: Club TaDa integrated — 4 votes (highest on challenges board)",
 "EC Oct 7: Club in weekly CRM planning; hyper-personalization in Braze already",
 "EC Oct 8: auto-configured free gift / sampling broken — 2 votes each",
 ],
 suggestion:
 "Ship EC Club migration on critical path. Pair with wallet UX and sampling catalog rules before scaling gamification (Braze Tadi, promo counters).",
 owners: "Rewards · CRM · PM Consumer",
 },
 {
 rank: 33,
 priority: "High",
 title: "Profile edit + map geo — first-order trust (Ecuador)",
 summary:
 "Users cannot fix phone, address or email without ticket or account deletion — first-order cancel spike. Mall/landmark search resolves to wrong cities; quick confirm on distance warning locks bad pins.",
 coverage: "EC Oct 8 workshop · PE ~18% wrong-address pattern",
 countries: ["Ecuador", "Peru"],
 layer: "Growth",
 roadmapIds: ["cx-decision-tree", "cx-consumer-visibility"],
 evidence: [
 "EC Oct 8: profile edit anytime — 2 votes; NPS hit on first order",
 "EC Oct 8: Guayaquil mall → San Marino Quito pin; secondary-street layer too coarse",
 "EC Oct 8: remind user not at delivery address — 2 votes",
 "PE Sep 3: wrong address / no-answer ~18% cancellations",
 ],
 suggestion:
 "Self-serve profile edit + address confirmation flow. Tune map layers and force pin adjust before lock-in. Brazil location UX rollout candidate.",
 owners: "PM Consumer · Growth · Design",
 },
 {
 rank: 34,
 priority: "High",
 title: "Cancel after dispatch — courier paid per delivery only (Ecuador)",
 summary:
 "When the consumer cancels after POC assigns a rider, courier NPS drops — EC pays per completed delivery, not per attempt. Penalties need online payment; cash at door fails.",
 coverage: "EC Oct 8 workshop · Mexico and Peru cancel pain",
 countries: ["Ecuador"],
 layer: "Peak ops",
 roadmapIds: ["cx-consumer-cancellation", "cx-predefined-messages"],
 evidence: [
 "EC Oct 8: 100% pay per delivered order — mid-route cancel hurts motorizado",
 "EC Oct 8: fee + messaging once rider assigned — linked to payment gateway off",
 "EC dreams: automated cancel rules with penalty after dispatch",
 ],
 suggestion:
 "Status-based cancel policy with card-on-file penalties. In-app messaging when rider en route. Align with payment orchestrator re-enable.",
 owners: "PM Consumer · Courier · OPS",
 },
 {
 rank: 35,
 priority: "High",
 title: "Admin rules in-app — delivery bands, rain, tips, service fee (Ecuador)",
 summary:
 "Flat ~$1.500 delivery whether 5 or 30 minutes; no service fee; rain surge manual. Luis wants POC-to-POC fee grids without CSV typos.",
 coverage: "EC Oct 8 · EC Oct 7 admin pain",
 countries: ["Ecuador"],
 layer: "Commercial",
 roadmapIds: ["admin-sku-promo-protection", "admin-kpi-cockpit"],
 evidence: [
 "EC Oct 8: CSV → dynamic admin — delivery by distance band, tips, rain surcharge",
 "EC Oct 8: Excel human error — wrong cell price in fee upload",
 "EC Oct 7: payment method change at customer door still manual",
 ],
 suggestion:
 "Replace fragile CSV with validated admin UI for fees by POC and distance. Tie rain/event surcharges to MotoGP-style peak playbook.",
 owners: "Admin product · OPS · Ecuador commercial",
 },
 {
 rank: 36,
 priority: "High",
 title: "POC supervisor cockpit — BizWam visibility + assign assist",
 summary:
 "Supervisors lack live delayed/cancelled board; POCs copy order codes to Excel for cash close. Workshop voted assign recommendations and dreams full seller health in BizWam.",
 coverage: "EC Oct 8 votes · EC Oct 7 Power BI FOR",
 countries: ["Ecuador"],
 layer: "Peak ops",
 roadmapIds: ["admin-kpi-cockpit", "metrics-ai-mvp"],
 evidence: [
 "EC Oct 8: POC assign-order recommendations — 2 votes",
 "EC Oct 8 dreams: BizWam supervisor command center (3 votes); AI geofence staffing alerts",
 "EC Oct 8: export order list for cash close — manual code-by-code copy",
 "EC Oct 7: seller home KPI page unused; FOR calculators on WhatsApp",
 ],
 suggestion:
 "Supervisor alert board (delayed, cancel, city/match day). POC dispatch assist by order cluster. Downloadable close-of-day order export.",
 owners: "PM Seller · OPS · Data",
 },
 {
 rank: 37,
 priority: "Medium",
 title: "Promo catalog weight — variant SKUs + ERP inventory dreams",
 summary:
 "Color-choice bundles need 7–8 SKUs without variant picker; app heavy. Dreams vote SAP/Dynamics for trustworthy MB and automated reconciliation.",
 coverage: "EC Oct 8 Consumer + dreams vote",
 countries: ["Ecuador"],
 layer: "Portfolio",
 roadmapIds: ["portfolio-unified"],
 evidence: [
 "EC Oct 8: thermos color forces duplicate SKUs — discovery suffers",
 "EC Oct 8 dreams: ERP (SAP) + reliable inventory MB — 3 votes",
 "EC Oct 8: step discount helped but catalog still bloated",
 ],
 suggestion:
 "Variant picker under parent SKU. Long-term ERP feed for theoretical stock — align with quantity MVP and Community POC scale.",
 owners: "PM Consumer · Commercial · OPS",
 },
 {
 rank: 38,
 priority: "High",
 title: "Motorizado forecast in Excel — BEES export not in platform (Ecuador)",
 summary:
 "Supervisors build couriers-needed/hour from BEES raw data and share on WhatsApp; MotoGP reacts manually. Same class of pain as opaque 7-day KPIs and PE WebPO workaround.",
 coverage: "EC Oct 7 prep · aligns with rank #7",
 countries: ["Ecuador", "Peru", "Mexico"],
 layer: "Metrics",
 roadmapIds: ["admin-b2b-courier-forecast", "forecast-trust", "metrics-hourly"],
 evidence: [
 "EC Oct 7: Excel motorizado forecast from BEES — team wants automation like other markets",
 "EC MotoGP: gamification closes gaps when forecast misses",
 "MX Zavaleta: orders/hour + couriers/hour still manual Excel",
 ],
 suggestion:
 "Ship trusted forecast + staffing view per POC in seller/admin; Reuse the Peru WebPO heatmap patterns.",
 owners: "PM Seller · OPS · Data",
 },
 {
 rank: 39,
 priority: "Critical",
 title: "Puebla Project — parallel-email loop & store non-response",
 summary:
 "CX waits days when POCs ignore parallel threads; supervisors not always CC’d; financial and short-ship cases stall — drives churn and ‘estafa’ perception.",
 coverage: "Puebla Project · 10 transcripts · Rota CX",
 countries: ["Mexico"],
 layer: "Communication",
 roadmapIds: ["cx-fast-seller-channel", "cx-unified-seller-view", "cx-delivered-not-received"],
 evidence: [
 "Puebla cross-theme #1: no tenemos respuesta del punto de venta",
 "Abasto never answered parallel email; client ‘pidió a gritos auxilio’",
 "Ties to ~40% coordination tickets in MX CX meeting",
 ],
 suggestion:
 "SLA-tracked seller↔CX channel with supervisor visibility; delivery proof + mandatory cancel reasons.",
 owners: "PM CX · OPS",
 },
 {
 rank: 40,
 priority: "High",
 title: "Turbo / BEES reliability — alerts, refresh, store on/off desync",
 summary:
 "Tablet alarms missed with floor audio; silent notifications; multi-tab refresh → expired orders; turbo geofence and UI bugs during rollout.",
 coverage: "Puebla Project · Cholula · Buenavista · Periférico",
 countries: ["Mexico"],
 layer: "Reliability",
 roadmapIds: ["order-alert-session", "courier-order-push", "map-assign-stay"],
 evidence: [
 "Puebla: ‘con tablet la operación es peor’; store shows off while orders flow",
 "Turbo 1 km geofence + polygon export gaps; grouping priority bugs",
 "Same peak reliability stack as CDMX rank #1",
 ],
 suggestion:
 "core platform reliability before turbo scale: sound, session, single peak surface, status sync.",
 owners: "PM Seller · OPS",
 },
 {
 rank: 41,
 priority: "Medium",
 title: "POC incentive & reimbursement visibility (Ecuador)",
 summary:
 "Variable-heavy Ecuador model; weekly summary insufficient — POCs want daily view of incentives tied to stockout and dispatch KPIs.",
 coverage: "EC Oct 7 prep",
 countries: ["Ecuador"],
 layer: "Metrics",
 roadmapIds: ["reimbursement-breakdown", "financial-report-date-filter"],
 evidence: [
 "EC Oct 7: ~15¢/order if stockout <2% — hard to audit daily",
 "EC: daily visibility of all incentives ‘would be super good’",
 ],
 suggestion:
 "Line-by-line weekly + daily incentive drill-down on seller platform — mirror WebPO/Jumbo pattern.",
 owners: "PM Seller · Finance · OPS",
 },
 {
 rank: 42,
 priority: "Medium",
 title: "Live promo counters + auto free-gift config (Ecuador workshop)",
 summary:
 "Ecuador runs split campaigns (order #100, #1000) without in-app progress; auto-configured free-gift SKUs tied to sampling loads — both voted (2 each) on Oct 8 Rewards board.",
 coverage: "EC Oct 8 OYP workshop · ties to rank #32 sampling",
 countries: ["Ecuador"],
 layer: "Commercial",
 roadmapIds: ["notification-center", "admin-sku-promo-protection"],
 evidence: [
 "EC Oct 8: live visual for promo counters — 2 votes",
 "EC Oct 8: auto-configured free gift products — 2 votes",
 "EC Oct 8: sampling CSV never surfaces gift SKUs despite 10k-row loads",
 "EC Oct 7: flash promo hard on/off windows (3x2 until 12:00) — ops scheduling",
 ],
 suggestion:
 "Ship promo progress UI (deadline + units remaining) with Club migration. Fix country catalog rules for sampling/free-gift before scaling Braze gamification.",
 owners: "Rewards · PM Consumer · Commercial",
 },
 {
 rank: 43,
 priority: "Medium",
 title: "Hospitalidad telão — birthday, football, recognition (Ecuador)",
 summary:
 "Oct 8 hospitality ideation: surprise birthday gifts, sponsor football meetups, cross-country top-store/courier recognition, dark-store mundialito — differentiation beyond transaction efficiency.",
 coverage: "EC Oct 8 workshop telão · Momento Inesperado thread",
 countries: ["Ecuador"],
 layer: "Growth",
 roadmapIds: [],
 evidence: [
 "EC Oct 8: birthday order free / multi-day social occasions",
 "EC Oct 8: meet football player via CN sponsor deals",
 "EC Oct 8: welcome kit new stores; top-200 courier coupon pride moment (BR reference)",
 "EC Oct 8 dreams: subscription tiers + scheduled delivery for match time",
 ],
 suggestion:
 "Sequence on CRM identity + inventory truth. Pilot one hospitality play per quarter with measurable repeat — not before core platform reliability.",
 owners: "CRM · Growth · OPS",
 },
 {
 rank: 44,
 priority: "Critical",
 title: "BEES off while store has stock — ERP not integrated (Colombia)",
 summary:
 "Colombia’s SIESA/BEES disconnect created false stockouts (bottle vs liquid, SKU off in BEES). Commercial invented availability scoring + store ranking + pay — same inventory-truth class as Mexico, Peru and Ecuador quantity MVP.",
 coverage: "CO Sep 13 product intro · allies + own stores",
 countries: ["Colombia", "Mexico", "Peru", "Ecuador"],
 layer: "Portfolio",
 roadmapIds: ["portfolio-quantity", "portfolio-filters"],
 evidence: [
 "CO: BEES and SIESA not integrated — biggest local pain",
 "CO: penalize stores that have product but keep SKU off in BEES",
 "Mexico, Peru and Ecuador: quantity toggle without units — orders on ‘off’ SKUs",
 ],
 suggestion:
 "SKU-level truth in seller/BEES; optional ERP feed for high-volume Community POC allies.",
 owners: "PM Seller · OPS · Commercial CO",
 },
 {
 rank: 45,
 priority: "Critical",
 title: "Marketplace acquisition changes retention — night buyers & AOV bands (Colombia)",
 summary:
 "~30% of beer-paid acquisition lands marketplace-only carts. Marketplace users repurchase every 22–30 days vs 12–14 for beer; poor retention when AOV <50k or >120k COP — CRM timing and tiers must split journeys.",
 coverage: "CO Sep 13 growth · parallels EC promo/catalog weight",
 countries: ["Colombia"],
 layer: "Growth",
 roadmapIds: ["notification-center"],
 evidence: [
 "CO: cannot message marketplace users at 4pm like beer cohort",
 "CO: new marketplace cluster — low/high AOV bands churn",
 "CO: marketplace share higher than beer in some zones",
 ],
 suggestion:
 "Separate lifecycle for marketplace vs beer; night comms windows; monitor blended CAC vs M1/M3 retention by entry promo.",
 owners: "Growth CO · CRM · PM Consumer",
 },
 {
 rank: 46,
 priority: "High",
 title: "Bank partnerships — cheap CAC, fragile retention (Colombia)",
 summary:
 "10–15% of users via banks at ~$2–3 CAC (blended ~$5–6). BIN/datáfono reporting proves value; big 50% promo spiked users then churned when media paused. In-app story for bank benefits missing; 2026 shift to retention (double points).",
 coverage: "CO Sep 13 · PE BIN / EC payment rails",
 countries: ["Colombia", "Peru"],
 layer: "Growth",
 roadmapIds: [],
 evidence: [
 "CO: partnerships #1 growth win — retention weaker post-promo",
 "CO: Lucho — partnerships for retention not only acquisition",
 "PE: BIN campaigns blocked without orchestrator",
 ],
 suggestion:
 "Wallet + partnership UX in app; retention KPIs on bank cohorts; align with payment orchestrator roadmap.",
 owners: "Growth CO · Fintech · CRM",
 },
 {
 rank: 47,
 priority: "High",
 title: "Own stores vs Community POC — dual paypoints & data access (Colombia)",
 summary:
 "~80% orders still on ~69 own stores vs ~120 aliados; allies lack Power BI/cluster access — Top Tiendas + ops bridge. Paypoints and owner change differ from EC Community POC / PE third-party scale plays.",
 coverage: "CO Sep 13 expansion · EC hybrid POC",
 countries: ["Colombia", "Ecuador", "Peru"],
 layer: "Peak ops",
 roadmapIds: ["admin-kpi-cockpit", "metrics-ai-mvp"],
 evidence: [
 "CO: Community POC capillarity — orders fed from own stores",
 "CO: only own stores on SIESA; allies use many ERPs",
 "EC Oct 7: Community POC legal + seller landing",
 ],
 suggestion:
 "Two seller personas in one country — Use the same KPI/stockout dashboards per model; Top Tiendas pattern for data-poor allies.",
 owners: "OPS CO · PM Seller · Expansion",
 },
 {
 rank: 48,
 priority: "High",
 title: "Store-off alerts, overlap & manual Torre de Control (Colombia)",
 summary:
 "When a Community POP turns off, cannot auto-cover full zone — planned overlap (3–4 stores/consumer). Weekend Torre de Control (2 people) + WhatsApp red alerts for unique-zone offs — same spillover pain as MX rank #4.",
 coverage: "CO Sep 13 ops · MX overlap · Puebla BEES off",
 countries: ["Colombia", "Mexico"],
 layer: "Reliability",
 roadmapIds: ["admin-polygon-neighbor", "notification-center"],
 evidence: [
 "CO: need alarm when stores turn off — not map-watching only",
 "CO: mid-zone fallback when aliado off — not full auto-spillover",
 "MX: neighbor SKU off → volume floods one POC",
 ],
 suggestion:
 "Proactive off-store alerts to ops/supervisors; overlap rules in admin; reduce WhatsApp-only weekend watch.",
 owners: "OPS CO · PM Seller · Data",
 },
 {
 rank: 49,
 priority: "High",
 title: "Stockout metric — SKU line at 90%, not category only (Colombia)",
 summary:
 "Power BI category stockout + ally 90% gate works; extended SKU portfolio tool is external. Product ask: per-SKU stockout bar in BEES/seller like commercial minimum threshold.",
 coverage: "CO Sep 13 · rank #3 quantity thread",
 countries: ["Colombia"],
 layer: "Portfolio",
 roadmapIds: ["portfolio-quantity", "portfolio-filters"],
 evidence: [
 "CO: ideal stockout for every SKU in platform",
 "CO: allies now have orders — enforce 90%+ minimum",
 "CO: minimum portfolio vs extended SKU list measured separately",
 ],
 suggestion:
 "Ship SKU-level stockout visibility before expanding ally count (~double Community POC plan).",
 owners: "PM Seller · Commercial CO · Data",
 },
 {
 rank: 50,
 priority: "High",
 title: "Club TaDa staffing gap + algorithmic For You shelves (Colombia)",
 summary:
 "Club program understaffed; Lovers base down; automated missions postponed. Colombia wants For You fully algorithmic — blocked by SEM single-hero layout vs flexible sampling.",
 coverage: "CO Sep 13 rewards/product · EC Club vote #32",
 countries: ["Colombia", "Ecuador", "Peru"],
 layer: "Loyalty",
 roadmapIds: ["notification-center"],
 evidence: [
 "CO: month without Club owner — missions delayed",
 "CO: dream — For You 100% algorithmic, not one manual showcase",
 "EC Oct 8: Club TaDa integration #1 vote",
 ],
 suggestion:
 "Stabilize Club ops; unblock showcase rotation (sampling/SEM policy); tie to Braze missions when staffed.",
 owners: "Rewards · PM Consumer · Growth CO",
 },
 {
 rank: 51,
 priority: "High",
 title: "Billing API & order export — e-invoicing compliance (Colombia)",
 summary:
 "Mandatory e-invoicing; order data lost after accept; manual discounts → control audit risk. Prefer documented billing API + CSV export over 40 ERP integrations if sellers keep using platform — Zé lesson.",
 coverage: "CO Sep 13 · PE reimbursement transparency",
 countries: ["Colombia"],
 layer: "Metrics",
 roadmapIds: ["reimbursement-breakdown", "financial-report-date-filter"],
 evidence: [
 "CO: when store accepts, user billing data is lost",
 "CO: Zé built ERP integrations but stores stopped using product",
 "CO: discounts manual — open door to billing errors",
 ],
 suggestion:
 "Order line export at accept + billing API; prioritize adoption metrics on aliado stores.",
 owners: "PM Seller · Finance · Legal CO",
 },
];

export const GLOBAL_CONVERGENCES = [
 "Peak tooling failure is hemispheric: refresh/GPS/silent logout/no sound → same outcome — expired orders and dispatch SLA damage",
 "Inventory quantity is unanimous where asked; combo/search pain is universal — Peru and Mexico want compose-from-two-SKUs",
 "Inventory real-time is the strategic unlock (Sep 1 SL vision) — partial orders, supervisor view, stockout prevention, scan-to-activate",
 "WhatsApp is the real ops layer in every country visited — product must replace it with audit trail, not compete on speed alone",
 "Dispatch SLA (10 min) conflicts with courier staffing reality — sellers ready early, rider late; metric punishes the wrong party",
 "7-day KPI window insufficient everywhere — Peru built WebPO weekly view as workaround; Mexico sellers use Excel; OPS workshop #1 wants predictive cockpit",
 "Inter-POC spillover when neighbors disable SKUs — Merino (+70 orders) mirrors Forjadores absorbing Puebla neighbors",
 "Promo consumer visibility ≠ seller/supply readiness — Stella S/23 in app but not BEES is the Peru version of World Cup Corona desabasto",
 "Promo planning fragmented (Excel/Trello/VTEX) — commercial workshop + field visits demand single calendar → seller notification → supply",
 "Returnables and cold chain are strategic (Peru vs Rappi) but infra lags promo volume (cartons, 28-packs, ice)",
 "Local OPS innovation (Peru WebPO) shows the bar for seller trust — reimbursement breakdown, hourly demand, weekly KPIs",
 "Ecosystem Communication is the umbrella (Sep 1): Braze + delivery proof + predefined messages — same pain as MX CX ~40% coordination tickets",
 "Claims triangle broken (Sep 2 OPS): Zendesk → email → days; compensation only if customer escalates — market expects instant credits",
 "Consumer data stack not homologated (Sep 2): AppsFlyer/MMP/Segment blocks personalization and football occasion APIs",
 "Rewards stack needs Braze + wallet + BEES admin + anti-fraud before tiers/omnichannel scale (Sep 2 Rewards workshop)",
 "Future bets align across groups: scheduled orders + vending (OPS), virtual returnables (Consumer), football earn/burn (Rewards)",
 "Momento Inesperado hospitality — football kit, birthday experiences, first Club order — needs CRM triggers + inventory + logistics foundation first",
 "MX OPS workshop (Jul 23) + PE OPS workshop (Sep 2) vote same top themes: real-time visibility, admin console, polygon/coverage, coupon SKU rules",
 "Courier supervision panel (MX Andre) = live map (PE Consumer #1) = CX blind spot — one map layer serves all actors",
 "Consumer vision Sep 3: multishowcases + Buy Again (61% conversion) on ship track; returnables education, courier map bugs and ~18% wrong-address cancels remain top commercial gaps",
 "Buy Again shelf beats categories in conversion (98% ATC, 61% order) — Peru/Mexico signal for personalization priority",
 "Admin simplification (discounts, shelves, manual pricing) high OPS load but deprioritized vs consumer — automate via copilot in 2027 H2",
 "Research confirms the missing actor: seller and courier delivery chain turns one failure into stockout, waiting, late ETA, cancellation and support cost",
 "Small in discovery needs activation; Large anchor needs protection — seller volume is not a maturity score",
 "Courier satisfaction can remain high while communication, route and wait friction erode time and earnings",
 "Lovers Plus is an operating benchmark: 92% Perfect Orders and 48% SLA15 vs 35% Core",
 "Competitive benchmark expands the map: Rappi is regional; Uber is a Mexico ecosystem threat; PedidosYa is a Peru density/fintech threat",
 "Ecuador Oct 7: hybrid Community POC + dark store is the growth bet — product must unblock POP pricing, seller landing and suggested replenishment before scale",
 "Payment gateway trauma in Ecuador mirrors Peru low online share — fraud controls must precede marketing promises on fees and BIN campaigns",
 "CRM holdout + occasion calendar (Chelizza, BEERFEST, Clásico) shows Ecuador ready for Rewards workshop — Club TaDa already in weekly planning",
 "MotoGP + Power BI FOR = local OPS innovation when seller home metrics unused — same bar as Peru WebPO",
 "Ecuador Oct 8 workshop: single board proved Consumer/SL/Rewards pains are one delivery chain — Club (4), POC qty (2), profile edit (2), messaging (2)",
 "Excel/CSV is Ecuador's hidden OS — stock Pareto, admin fees, cash close, sampling loads, courier forecast",
 "Ecuador cancel-after-dispatch exposes pay-per-delivery economics — penalties require online pay, not cash at door",
 "Ecuador hospitality telão (birthday, football, recognition) aligns with Momento Inesperado — needs CRM + inventory foundation",
 "Ecuador dreams vote ERP/SAP + BizWam cockpit — same long arc as Peru real-time inventory vision and MX admin console ask",
 "Puebla Project confirms MX coordination pain at scale: parallel-email loops, BEES desync, and turbo rollout need the same core reliability fixes as CDMX/PE peaks",
 "Motorizado forecast in Excel (EC) + WebPO heatmap (PE) + Zavaleta hourly sheet (MX) — one staffing/forecast UX should work the same way across markets",
 "Fulfillment integrity (short ship, fake delivered, static codes) in Puebla links to delivery proof code and CX visibility items on the UX roadmap",
 "Colombia Sep 13: BEES↔ERP availability score proves inventory truth moves conversion — same bet as quantity MVP in Mexico, Peru and Ecuador",
 "Colombia marketplace + bank promos changed who enters — retention and CRM timing must split beer vs marketplace",
 "Colombia own-store vs Community POC dual model — Top Tiendas + billing API are ally adoption plays, not only integration",
 "Colombia Torre de Control + store-off WhatsApp alerts — weekend manual ops layer like MX spillover until product alerts exist",
];

export const GLOBAL_CROSS_BY_AREA = [
 {
 area: "Operations",
 sources: ["MX OPS Jul 23", "PE visits", "PE SL Sep 1", "PE workshop Sep 2", "EC Oct 7–8", "CO Sep 13", "Puebla Project"],
 themes: [
 "Real-time KPI visibility — stock, SLA, availability, courier dotation (PE workshop #1)",
 "Peak reliability — sound, session, map freeze, expired orders",
 "Claims triangle slow — Zendesk → email → days (PE workshop #3)",
 "Admin console like Armis/Vitex — enter by store code, live inventory (MX Luis)",
 "Polygon/coverage manual — dangerous zones, spillover when neighbor disables SKU",
 "Manual pricing/discount load — DDC, Diageo, PDV (PE workshop)",
 "Weekend monitoring via WhatsApp — want copilot/automation",
 "EC Oct 8: live POC stock qty (zero/infinite); POC assign recommendations; Excel cash-close export",
 "EC Oct 8: BizWam supervisor board + AI geofence staffing — dreams vote",
 "EC Oct 8: cancel after dispatch vs pay-per-delivery courier model",
 "Puebla Project: BEES alerts, turbo geofence, tablet refresh → expired orders",
 "EC Oct 7: motorizado forecast Excel + WhatsApp",
 "CO Sep 13: store-off overlap + Torre de Control weekend map watch",
 "CO Sep 13: own vs Community POC — 80/20 orders, Top Tiendas bridge",
 ],
 },
 {
 area: "Consumer",
 sources: ["PE workshop Sep 2", "PE consumer vision Sep 3", "PE context", "MX field visits", "EC Oct 8 OYP workshop", "CO Sep 13"],
 themes: [
 "Live courier map — Consumer workshop #1 + Sep 3 Growth P1 (pin frozen) — same as MX Andre supervision panel",
 "Returnables/RGB education — 44% order share PE; brand page + Retornafest missed window (Sep 3)",
 "Multishowcases + Buy Again — product roadmap Sep 15 target; 61% conversion beats categories",
 "AppsFlyer/MMP/Segment consistent rollout — blocks personalization (workshop #2)",
 "Payment gateways + BIN bank promos (workshop #3)",
 "Coupon wallet UX + flash coupons (workshop #4, converges with Rewards)",
 "Wrong address + no-answer cancellations (~18% PE)",
 "Static cross-sell — can't customize by category or history",
 "Virtual returnables + pickup — future vision",
 "EC Oct 8: profile edit + map landmarks; consumer ↔ courier messaging (voted)",
 "EC Oct 8: payment gateway off — fraud blocks cancel fees and split pay dreams",
 "EC Oct 8 telão: birthday, football, recognition — rank #43",
 "CO Sep 13: marketplace night buyers + AOV bands — rank #45",
 "CO Sep 13: bank partnerships CAC vs retention — rank #46",
 "CO Sep 13: algorithmic For You vs SEM/sampling — rank #50",
 ],
 },
 {
 area: "Rewards",
 sources: ["PE workshop Sep 2", "PE context meeting", "EC Oct 8 OYP workshop", "CO Sep 13"],
 themes: [
 "Club TaDa × Braze enrichment (workshop #1)",
 "Flash coupons in wallet (workshop #2)",
 "Rewards admin integrated in BEES (workshop #3)",
 "Anti-fraud automation — SED Turbo risk (workshop #4)",
 "Football occasion earn/burn — future #1",
 "Omnichannel redemption at Tambo/convenience — future #2",
 "Tiers + brand-occasion correlation — 3–4 year horizon",
 "EC Oct 8: Club TaDa native integration — #1 vote (4); sampling broken; live promo counters",
 "EC Oct 8: auto free-gift config + live promo counters — rank #42",
 "EC Oct 8: Braze gamification + subscription premium — dreams vote",
 ],
 },
 {
 area: "Commercial & promos",
 sources: ["MX Promo workshop Jul 21", "MX Puebla", "PE context", "EC Oct 7 CRM", "EC Oct 8 workshop", "CO Sep 13"],
 themes: [
 "Excel + Trello + VTEX fragmentation — no single source of truth",
 "Consumer promo before seller can stock — World Cup Corona, Stella/BEES gap",
 "Flash promo mechanics — quantity vs discount types",
 "Bulk upload errors and manual margin calculations",
 "No real-time promo ROI dashboard",
 "7-day seller notice + supply slot alignment missing",
 "EC: flash promo hard on/off windows (3x2 until 12:00) — ops-critical scheduling",
 "EC: step discount partial migration + sampling broken in prod",
 "EC Oct 8: variant promos → 7–8 SKUs per bundle; admin delivery bands / rain / tips in-app",
 "CO Sep 13: flash promo slots beer midday / marketplace night; occasion cross-sell 2026",
 "CO Sep 13: SKU-level stockout in platform — rank #49",
 ],
 },
 {
 area: "CX & communication",
 sources: ["MX CX meeting", "PE SL Sep 1", "Country visits", "EC Oct 7–8", "CO Sep 13", "Puebla Project CX"],
 themes: [
 "~40% tickets are coordination — agents blind to courier map",
 "WhatsApp 100% default — no audit trail",
 "Ecosystem Communication umbrella — Braze + proof code + predefined messages",
 "Mandatory cancellation reasons lost in free-text",
 "Deposit-bottle disputes → 1-star when no seller channel",
 "Email support next day — too slow for peak",
 "EC: seller direct WhatsApp to consumer vs data-protection — CX-mediated flow preferred",
 "Puebla Project: parallel-email non-response, proactive WhatsApp limits",
 ],
 },
 {
 area: "Expansion",
 sources: ["EC Oct 7 product vision", "EC Oct 8 workshop dreams", "CO Sep 13"],
 themes: [
 "Hybrid dark store + Community POC — 112 POPs / 41 cities",
 "Legal pilot before app-based POP pricing",
 "Seller acquisition landing (CO/MX) when Community POC GO",
 "Coast/insecurity zones where dark store cannot open",
 "EC Oct 8 dreams: international app listing for expats; multi-vertical festival basket",
 "CO Sep 13: ~double Community POC next year; own-store count may shrink strategically",
 ],
 },
];

export const GLOBAL_SESSIONS = [
 { date: "Jul 2026", country: "Mexico", label: "CDMX store visits", detail: "4 POCs — map, inventory, KPIs, WhatsApp" },
 { date: "Jul 21", country: "Mexico", label: "Promo workshop", detail: "Commercial — ideation, planning, upload/measurement" },
 { date: "Jul 22", country: "Mexico", label: "CX + Product meetings", detail: "Coordination tickets, inventory quantity, Jumbo report" },
 { date: "Jul 23", country: "Mexico", label: "OPS dynamics", detail: "Courier, Seller, Admin, CX, Consumer — 2027 vision" },
 { date: "Jul 2026", country: "Mexico", label: "Puebla store visits", detail: "5 POCs — promo/supply, cold chain, spillover" },
 { date: "Aug 31", country: "Peru", label: "Context + store visits", detail: "Country briefing + La Marina, Merino, San Pedro" },
 { date: "Aug 31", country: "Peru", label: "Web Tiendas (WebPO)", detail: "Local B2B — weekly KPIs, heatmap, VLC payments" },
 { date: "Sep 1", country: "Peru", label: "Service Level vision", detail: "OPS + Product — ecosystem comms, inventory, Top Tiendas" },
 { date: "Sep 2", country: "Peru", label: "Workshop · Operations", detail: "OPS board — challenges, future, KPI visibility" },
 { date: "Sep 2", country: "Peru", label: "Workshop · Consumer", detail: "Consumer board — live map, data stack, payments" },
 { date: "Sep 2", country: "Peru", label: "Workshop · Rewards", detail: "Rewards board — Braze, wallet, anti-fraud" },
 { date: "Sep 3", country: "Peru", label: "Consumer vision", detail: "Product roadmap (multishowcases, Buy Again) + 18 Growth pains prioritized" },
 { date: "Oct 7", country: "Ecuador", label: "Product vision prep", detail: "Community POC hybrid, portfolio/stockout, MotoGP couriers, CRM/NPS — prep for Oct 8 OYP workshop" },
 { date: "Oct 8", country: "Ecuador", label: "OYP workshop (Lucid)", detail: "Single board Consumer + SL + Rewards — voting, dreams, hospitality; Club TaDa #1, POC stock, profile edit, BizWam cockpit" },
 {
 date: "Sep 13",
 country: "Colombia",
 label: "1YP product intro",
 detail: "Growth/marketplace, BEES↔SIESA availability, own vs Community POC, stockout SKU ask, Club/For You, billing API — deeper sessions PM + Sep 14",
 },
 {
 date: "2026",
 country: "Mexico",
 label: "Puebla Project",
 detail: "CX rotation + Puebla/AGS stores — parallel email, Turbo/BEES, retention WhatsApp; same themes as the Global All tab.",
 },
];

export const GLOBAL_POSITIVE_SIGNALS = [
 {
 title: "Peru Web Tiendas (WebPO)",
 detail:
 "Local B2B portal: weekly KPIs, demand heatmap, VLC payments, productos de la semana. La Marina + Merino daily users. Template for what seller platform should become.",
 countries: ["Peru"],
 },
 {
 title: "First-order badge",
 detail: "Actively used and valued across Puebla POCs — reduces coordination errors on new customers.",
 countries: ["Mexico"],
 },
 {
 title: "Brazil location UX",
 detail: "50% faster address input, −1 pp location cancellations — config rollout candidate for Peru.",
 countries: ["Peru"],
 },
 {
 title: "Club TaDa + returnable focus",
 detail: "Peru growth strategy aligns portfolio with retention — returnables retain 31.3% vs 20.7% Marketplace-only.",
 countries: ["Peru"],
 },
 {
 title: "Courier Financial Report (Jumbo)",
 detail: "Product meeting: weekly courier payment summary launching on seller platform.",
 countries: ["Mexico"],
 },
 {
 title: "Delivery confirmation code",
 detail: "Ready globally — pilot per store in Peru. Reduces delivery disputes.",
 countries: ["Peru"],
 },
 {
 title: "Notification center (Bolivia pilot)",
 detail: "Seller inbox for campaigns and ops comms — Roll out to Latin America.",
 countries: ["Mexico", "Peru"],
 },
 {
 title: "Ecuador stockout control (0.8%)",
 detail:
 "Centralized supply + DDC per POC + POC incentive <2% stockout — benchmark ops playbook while quantity UX catches up.",
 countries: ["Ecuador"],
 },
 {
 title: "MotoGP courier gamification",
 detail:
 "Training points, SLA/rating gates, gift cards, rain/event bonuses — reactivation channel when forecast gaps appear.",
 countries: ["Ecuador"],
 },
 {
 title: "CRM holdout incrementality",
 detail: "W40: +50% Fri / +40% Sun vs control; documents when pushes work vs when checkout breaks the promise.",
 countries: ["Ecuador"],
 },
 {
 title: "Ecuador OYP workshop alignment",
 detail:
 "Oct 8 Lucid session validated near-term bets with votes — Club integration, POC tooling, profile/geo — and dreams (ERP, subscription, split pay) on one cross-pillar board.",
 countries: ["Ecuador"],
 },
 {
 title: "Colombia availability score (BEES vs ERP)",
 detail:
 "Commercial ranking + variable pay when stores have stock but SKUs off in BEES — lifted onboarding/conversion; template for pre-integration markets.",
 countries: ["Colombia"],
 },
 {
 title: "Colombia partnership acquisition scale",
 detail: "10–15% users at ~$2–3 CAC; proves bank channel — now must pair with retention design.",
 countries: ["Colombia"],
 },
];

export function globalInsightsByPriority(priority: GlobalPriority): GlobalInsight[] {
 return GLOBAL_INSIGHTS.filter((i) => i.priority === priority);
}

const _consumerWorkshop = PE_WORKSHOP_0209.groups.find((g) => g.id === "consumer")!;
const _rewardsWorkshop = PE_WORKSHOP_0209.groups.find((g) => g.id === "rewards")!;

const _ecChallengeDetail: Record<string, string> = {
 "Club TaDa integrated": "External loyalty stack — workshop #1 near-term bet; blocks sampling/refund UX.",
 "POC assign-order recommendations": "Intelligent dispatch by order geography — ties to BizWam supervisor board.",
 "POC stock quantity per SKU": "Vitex-style units with auto-off at zero — tied to rank #3 inventory MVP.",
 "Remind user: not at delivery address": "Reduce wrong-pin cancels — pairs with profile edit and map layers.",
 "Consumer ↔ courier message": "Voted challenge — same class as rank #6 in-app comms.",
 "User can update profile anytime": "First-order NPS — wrong phone/address without ticket path.",
 "Live visual for promo counters": "Split campaigns (order #100) need in-app progress — rank #42.",
 "Auto-configured free gift products": "Sampling loads fail to surface gift SKUs — rank #42.",
};

function ecVoteBlocksForTopic(topic: GlobalTopicId): GlobalWorkshopVoteBlock[] {
 const challenges = EC_WORKSHOP_OCT08_VOTE_WINNERS.challenges;
 const consumerTitles = new Set([
 "Remind user: not at delivery address",
 "Consumer ↔ courier message",
 "User can update profile anytime",
 ]);
 const rewardsTitles = new Set([
 "Club TaDa integrated",
 "Live visual for promo counters",
 "Auto-configured free gift products",
 ]);
 const slTitles = new Set(["POC assign-order recommendations", "POC stock quantity per SKU"]);

 const pick = (titles: Set<string>) =>
 challenges
.filter((c) => titles.has(c.label))
.map((c) => ({
 votes: c.votes,
 title: c.label,
 detail: _ecChallengeDetail[c.label] ?? "",
 }));

 if (topic === "consumer") {
 return [
 {
 id: "ec-oct8-consumer",
 label: "Ecuador OYP workshop · Oct 8 — Consumer votes",
 votes: [
 {
 title: "Online payments off — fraud trauma (board Critical)",
 detail:
 "Stored cards without step-up auth → cloning and chargebacks; COD blocks cancel fees and wallet dreams — rank #26.",
 },
...pick(consumerTitles),
 ],
 },
 {
 id: "ec-oct8-sl",
 label: "Ecuador OYP workshop · Oct 8 — Service level votes",
 votes: pick(slTitles),
 },
 ];
 }
 return [
 {
 id: "ec-oct8-rewards",
 label: "Ecuador OYP workshop · Oct 8 — Rewards votes",
 votes: pick(rewardsTitles),
 },
 ];
}

export const GLOBAL_TOPIC_SNAPSHOTS: GlobalTopicSnapshot[] = [
 {
 id: "consumer",
 label: "Consumer",
 headline:
 "Peru Sep 2–3 voted live map #1; Ecuador Oct 8 voted profile/geo + messaging and payment-off constraints — same trust delivery chain as Mexico and Peru field visits.",
 sources: GLOBAL_CROSS_BY_AREA.find((a) => a.area === "Consumer")?.sources ?? [],
 workshopVoteBlocks: [
 {
 id: "pe-sep2-consumer",
 label: "Peru workshop · Sep 2",
 votes: _consumerWorkshop.challengesPrioritized.map((c) => ({
 rank: c.priority ?? 0,
 title: c.title,
 detail: c.detail,
 })),
 },
...ecVoteBlocksForTopic("consumer"),
 ],
 themes: GLOBAL_CROSS_BY_AREA.find((a) => a.area === "Consumer")?.themes ?? [],
 insightRanks: [2, 4, 6, 18, 20, 21, 23, 24, 25, 26, 27, 33, 34, 39, 43, 45, 46, 50],
 },
 {
 id: "rewards",
 label: "Rewards",
 headline:
 "Club TaDa is the hemispheric thread: Peru workshop stack + Ecuador Oct 8 #1 vote (4) for native integration. Gate tiers/omnichannel until core platform reliability + sampling/catalog truth.",
 sources: GLOBAL_CROSS_BY_AREA.find((a) => a.area === "Rewards")?.sources ?? [],
 workshopVoteBlocks: [
 {
 id: "pe-sep2-rewards",
 label: "Peru workshop · Sep 2",
 votes: _rewardsWorkshop.challengesPrioritized.map((c) => ({
 rank: c.priority ?? 0,
 title: c.title,
 detail: c.detail,
 })),
 },
...ecVoteBlocksForTopic("rewards"),
 ],
 themes: GLOBAL_CROSS_BY_AREA.find((a) => a.area === "Rewards")?.themes ?? [],
 insightRanks: [19, 22, 25, 32, 42],
 },
];

export function globalInsightsForTopic(topic: GlobalTopicId): GlobalInsight[] {
 const snapshot = GLOBAL_TOPIC_SNAPSHOTS.find((t) => t.id === topic);
 if (!snapshot) return [];
 const rankSet = new Set(snapshot.insightRanks);
 return GLOBAL_INSIGHTS.filter((i) => rankSet.has(i.rank)).sort((a, b) => a.rank - b.rank);
}

export function consumerVisionP1Summary(): string {
 return PE_CONSUMER_VISION.growthPains
.filter((p) => p.priority === "P1")
.map((p) => `• [P1] ${p.title}\n ${p.summary}`)
.join("\n\n");
}
