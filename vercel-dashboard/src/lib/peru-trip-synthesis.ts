import { PE_B2B_PLATFORM } from "./peru-b2b-platform";
import { PE_CONSUMER_VISION } from "./peru-consumer-vision";
import { PE_CONTEXT_MEETING } from "./peru-context-meeting";
import {
 PERU_CROSS_STORE_THEMES,
 PERU_INTERVIEW_INSIGHTS,
 PERU_VISIT_EXECUTIVE_SUMMARY,
} from "./peru-insights";
import { PE_SERVICE_LEVEL } from "./peru-service-level";
import { buildGrowthTracks, buildServiceLevelTracks } from "./peru-trip-synthesis-tracks";
import { PE_WORKSHOP_0209 } from "./peru-workshop-0209";

export type PeruTripSource =
 | "Context"
 | "Stores"
 | "B2B"
 | "Service level"
 | "Workshop"
 | "Consumer"
 | "Rewards";

export type PeruTrackHighlight = {
 rank: number;
 title: string;
 detail: string;
};

export type PeruTrackId = "consumer" | "rewards" | "seller" | "courier" | "admin";

export type PeruTrackSnapshot = {
 id: PeruTrackId;
 group: "growth" | "service-level";
 label: string;
 sessions: string;
 headline: string;
 stats: { label: string; value: string }[];
 priorityLabel: string;
 priorities: PeruTrackHighlight[];
 pains: PeruTrackHighlight[];
 shipping: string[];
 gaps: string[];
};

export type PeruSynthesisTheme = {
 rank: number;
 title: string;
 mentions: number;
 sources: PeruTripSource[];
 coverage: string;
 summary: string;
 impact: string;
};

export type PeruCriticalPriority = {
 rank: number;
 title: string;
 why: string;
 evidence: { source: PeruTripSource; detail: string }[];
 suggestion: string;
 owners: string;
};

const _contextTopics = PE_CONTEXT_MEETING.sections.reduce(
 (n, s) => n + s.topics.length,
 0,
);
const _workshopChallenges = PE_WORKSHOP_0209.groups.reduce(
 (n, g) => n + g.challenges.length,
 0,
);
const _workshopPrioritized = PE_WORKSHOP_0209.groups.reduce(
 (n, g) => n + g.challengesPrioritized.length,
 0,
);
const _consumerWorkshop = PE_WORKSHOP_0209.groups.find((g) => g.id === "consumer")!;
const _rewardsWorkshop = PE_WORKSHOP_0209.groups.find((g) => g.id === "rewards")!;
const _consumerP1Pains = PE_CONSUMER_VISION.growthPains.filter((p) => p.priority === "P1");
const _consumerP2Pains = PE_CONSUMER_VISION.growthPains.filter((p) => p.priority === "P2");
const _visitStats = PERU_VISIT_EXECUTIVE_SUMMARY.stats;

export const PERU_TRIP_SYNTHESIS = {
 period: "31 Aug – 3 Sep 2026",
 scope:
 "Lima: context meeting (Aug 31) · 3 POC store visits · B2B platform (Web Tiendas) · Service level vision (Sep 1) · OYP workshop (Sep 2) · Consumer vision (Sep 3 — product roadmap + Growth pains)",

 executiveSummary:
 "Five days in Lima balanced consumer roadmap, Rewards/Club bets, and service-level ops. Sep 3 Consumer vision: 12+ features shipping (Buy Again 61% conversion, multishowcases, address flow) but 18 Growth pains — 6 P1 (returnables, search, CX bot, live map, partial order, no-answer), data stack (Mixpanel↔Braze), wallet lifecycle, 3% online pay. Sep 2 workshops: Consumer voted live map #1; Rewards voted Braze enrichment #1, flash wallet, BEES admin; OPS voted KPI cockpit #1. Store visits (3 POCs) and context meeting anchor map/GPS, inventory quantity and comms gaps — same as Mexico. Web Tiendas payments pivot (2→78 stores) shows seller tools adopt when money is clear. Sep 1 service level framed ecosystem comms and inventory — parallel track, not the only headline. National: SLA ~94% but Fill Rate flat 92%, awareness 9% vs Rappi 41%.",

 stats: {
 sessions: 8,
 storesVisited: _visitStats.stores,
 totalInsights: _visitStats.totalInsights,
 crossThemes: PERU_CROSS_STORE_THEMES.length,
 criticalThemes: _visitStats.criticalThemes,
 contextTopics: _contextTopics,
 serviceLevelTopics: PE_SERVICE_LEVEL.pains.length,
 workshopChallenges: _workshopChallenges,
 workshopPrioritized: _workshopPrioritized,
 consumerWorkshopChallenges: _consumerWorkshop.challenges.length,
 rewardsWorkshopChallenges: _rewardsWorkshop.challenges.length,
 consumerPains: PE_CONSUMER_VISION.growthPains.length,
 consumerP1Pains: _consumerP1Pains.length,
 consumerP2Pains: _consumerP2Pains.length,
 consumerProductFeatures: PE_CONSUMER_VISION.productFeatures.length,
 b2bHighUsageStores: 78,
 nationalPocs: 89,
 },

 kpiAlerts: [
 "San Pedro: TML 10 at 36.8% vs 87–93% at La Marina and Merino — highest volume POC (~150–200 orders Saturday) with tight 3.5 km polygon",
 "Merino: stockout 4.4% with SKU availability at 68.4% — absorbs neighbor spillover when other POCs turn off SKUs (+70 orders on a weekend)",
 "San Pedro: seller cancellations at 12.2% — linked to inventory/combo SKU gaps and wrong-address cases",
 "National: Fill Rate flat at 92.3% since 2024 (target 93%) — main cancel drivers are wrong address, no answer, unmotivated consumer",
 "National: wrong-address cancellations ~18% (Sep 1 OPS data) — Brazil location UX candidate to copy",
 ],

 sessionHighlights: [
 {
 session: "Context meeting (Aug 31)",
 source: "Context" as PeruTripSource,
 highlight:
 "89 POCs, 4 cities, +25% orders YoY. ABI-first portfolio; Marketplace for EBITDA. Club TaDa launching. Awareness 9% vs Rappi 41%.",
 },
 {
 session: "Store visits (Aug 31)",
 source: "Stores" as PeruTripSource,
 highlight:
 "3/3 POCs: map pin stuck, no quantity field, combo SKUs don't turn off together, no seller–customer chat. WebPO praised for demand + payments.",
 },
 {
 session: "B2B platform walkthrough",
 source: "B2B" as PeruTripSource,
 highlight:
 "Jul 20 pivot: payments drove adoption 2 → 78 stores. Operaciones users +0.5pp fulfillment, +2.31pp SLA. Need per-order payment export.",
 },
 {
 session: "Service level vision (Sep 1)",
 source: "Service level" as PeruTripSource,
 highlight:
 "23 OPS topics. Ecosystem comms launching in weeks. Top Tiendas ranking needs in-platform KPI story. Inventory = strategic gap.",
 },
 {
 session: "OYP workshop · Operations (Sep 2)",
 source: "Workshop" as PeruTripSource,
 highlight:
 "25 OPS pains mapped. Voted #1: real-time KPI cockpit (stock, SLA, availability). #2: AI copilot for polygon/dotation. #3: claims triangulation. #4: SKU restrictions on coupons.",
 },
 {
 session: "OYP workshop · Consumer (Sep 2)",
 source: "Consumer" as PeruTripSource,
 highlight:
 "22 consumer frictions. Voted #1: live courier map. #2: AppsFlyer/Segment data consistent rollout (70–80% orders seen). #3: payment gateways / BIN promos. #4: coupon wallet UX + Club TaDa ordering.",
 },
 {
 session: "OYP workshop · Rewards (Sep 2)",
 source: "Rewards" as PeruTripSource,
 highlight:
 "14 Rewards pains. Voted #1: Club TaDa × Braze enrichment (surveys, opt-in, data). #2: flash wallet coupons. #3: Rewards admin inside BEES. #4: anti-fraud automation. Future: football earn/burn, omnichannel, tiers.",
 },
 {
 session: "Consumer vision (Sep 3)",
 source: "Consumer" as PeruTripSource,
 highlight:
 "Product shipped track: multishowcases (Sep 15), Buy Again 61% conversion, address flow (CO live), live updates (Sep 1), brand pages. Growth: 18 pains — 6 P1 (returnables, search, CX bot, courier map, partial order, no-answer); coupon lifecycle, Mixpanel↔Braze, personalization P2.",
 },
 ],

 serviceLevelTracks: buildServiceLevelTracks(),
 growthTracks: buildGrowthTracks(),

 /** Growth (consumer, rewards) first, then service level (seller, courier, admin). */
 trackSnapshots: [...buildGrowthTracks(), ...buildServiceLevelTracks()],

 themes: [
 {
 rank: 1,
 title: "Map / GPS does not update — courier pin stuck at store",
 mentions: 8,
 sources: ["Stores", "Service level", "Workshop", "Consumer", "Context"],
 coverage: "3/3 stores · OPS workshop · Consumer vision P1 · Sep 1",
 summary:
 "Seller map shows couriers frozen at the store after delivery; on peak only 1–2 of 15 riders visible. All three POCs track via WhatsApp. Workshop Consumer voted live courier map #1; OPS flagged order tracking for stores.",
 impact: "Dispatch decisions, TML 10, expired orders, consumer tracking complaints — same pattern as CDMX/Puebla",
 },
 {
 rank: 2,
 title: "Inventory without quantity — search broken, combos don't turn off together",
 mentions: 9,
 sources: ["Stores", "Context", "Service level", "Workshop", "Consumer"],
 coverage: "3/3 stores · Sep 1 · Consumer P1 partial-order",
 summary:
 "On/off does not reflect stock; no quantity field (VTEX/Tuca had it). Search misses formats; turning off one SKU does not disable linked combos. Orders still arrive on turned-off SKUs. Sep 3: entire order cancelled when one SKU missing — partial recovery blocked until stock truth.",
 impact: "Fill Rate stuck at 92%, seller cancellations (San Pedro 12.2%), stockout, peak slowdown",
 },
 {
 rank: 3,
 title: "No seller–customer communication — WhatsApp default",
 mentions: 6,
 sources: ["Stores", "Service level", "Context"],
 coverage: "3/3 stores · ecosystem comms roadmap",
 summary:
 "No in-app chat; couriers wait 10–15 min at door. Deposit-bottle disputes hurt rating. Merino: clients cancel 10–12× to route to preferred POC. Product launching WhatsApp bridge (predefined messages) within weeks.",
 impact: "Cancellations, 1-star ratings, CX tickets, off-platform risk",
 },
 {
 rank: 4,
 title: "Real-time KPI visibility for supervisors and sellers",
 mentions: 7,
 sources: ["Stores", "Service level", "Workshop", "B2B"],
 coverage: "3/3 stores · OPS workshop #1 · WebPO partial answer",
 summary:
 "Top Stores locked to rolling 7 days; SLA 35 hidden in seller app; ranking opaque. Supervisors use Monday Excel/WhatsApp. Workshop OPS voted live stock/SLA/availability dashboard as top priority. WebPO covers demand heatmap but not full KPI cockpit.",
 impact: "Reactive ops, unfair peer comparison, weekend monitoring via WhatsApp",
 },
 {
 rank: 5,
 title: "Web Tiendas adoption pivot — payments as trust lever",
 mentions: 5,
 sources: ["B2B", "Stores", "Context"],
 coverage: "78 high-usage stores · La Marina + Merino validated",
 summary:
 "Training failed to drive adoption until Pagos went live Jul 20 (2 → 78 daily stores). Payments 77/85; Operaciones 15/85 but +2.31pp SLA for constant users. Gap: weekly summary not enough — sellers need per-order export (~500 orders/week/store).",
 impact: "Seller trust in platform economics; template for notification center and commercial calendar",
 },
 {
 rank: 6,
 title: "Overlapping / inter-POC spillover and cancel gaming",
 mentions: 5,
 sources: ["Stores", "Context", "Workshop"],
 coverage: "Merino + La Marina · workshop POC-name topic",
 summary:
 "When neighbors turn off SKUs, volume floods the POC with inventory (+70 orders weekend). Consumers see store name and cancel until order hits preferred POC. Workshop flagged POC name visibility as fraud/cancel gaming risk.",
 impact: "Fill Rate pressure, unfair seller KPIs, revenue spillover",
 },
 {
 rank: 7,
 title: "Order sound unreliable — missed and expired orders",
 mentions: 4,
 sources: ["Stores", "Service level", "Workshop"],
 coverage: "Merino + San Pedro · OPS workshop · Sep 1",
 summary:
 "Notification sound intermittent; multi-login plays on wrong device (office PC vs store). Seller restocking misses orders. OPS workshop: same account on two devices causes expired orders.",
 impact: "Revenue loss, dispatch SLA damage, seller frustration at quiet and peak shifts",
 },
 {
 rank: 8,
 title: "Claims resolution slow — parallel email chains",
 mentions: 4,
 sources: ["Service level", "Workshop", "Stores"],
 coverage: "OPS workshop #3 · Zendesk → store email",
 summary:
 "Zendesk tickets route to store email; resolution takes days. CX, store and consumer not triangulated. Compensation coupons only if customer contacts support. Return coupon deflects ~40% of small-claim tickets.",
 impact: "Seller workload, unfair ratings for wrong-address/high-price complaints",
 },
 {
 rank: 9,
 title: "Wrong address & consumer no-answer cancellations",
 mentions: 5,
 sources: ["Context", "Service level", "Workshop", "Stores", "Consumer"],
 coverage: "National ~18% · Consumer vision P1 · new address flow",
 summary:
 "Top national cancel driver alongside unmotivated consumer. Address-review modal launched last weekend; Brazil location UX (−1 pp cancels) is candidate. Sellers cancel when customer doesn't answer door.",
 impact: "Fill Rate, SLA, seller cancellation KPIs (San Pedro 12.2%)",
 },
 {
 rank: 10,
 title: "Club TaDa / Rewards — Braze, wallet, BEES admin, anti-fraud",
 mentions: 6,
 sources: ["Context", "Rewards", "Consumer"],
 coverage: "Rewards workshop top 4 · Club launch · coupon wallet P2",
 summary:
 "Club TaDa launched during visit (awareness 9%). Rewards #1: Braze enrichment for surveys/opt-in/data — reduce monetary coupons. #2 flash wallet coupons; #3 Rewards admin in BEES (not CAO downloads); #4 anti-fraud automation. Consumer workshop #4: wallet UX + Club ordering. Future: football earn/burn, omnichannel POC/Tambo/super, tiers (3–4 yr).",
 impact: "Retention (27/100 new users buy RGB), lifecycle coupon migration, SessionM/Bees sync debt",
 },
 {
 rank: 11,
 title: "Can't assign second order to courier already en route",
 mentions: 3,
 sources: ["Stores"],
 coverage: "La Marina #2 ask · Merino",
 summary:
 "When customer orders twice or nearby order appears, seller must send second rider. Tuca allowed re-assignment; current platform does not. Tied to map not showing overlapping pins.",
 impact: "Courier waste in dense zones (Pueblo Libre, Surquillo)",
 },
 {
 rank: 12,
 title: "Returnables, weight limits, improvised cold chain",
 mentions: 5,
 sources: ["Stores", "Context", "Consumer"],
 coverage: "Merino + La Marina · Consumer vision P1 · Retornafest Sep",
 summary:
 "44% orders RGB but awareness driven by price not education. Cross-brand bottle exchange unclear. Brand page path agreed for returnables landing; Retornafest campaign missed Sep window. Official bag fits 1 carton; Fiestas Patrias 28-pack pushes weight.",
 impact: "Courier complaints, rating risk, promo volume limits",
 },
 {
 rank: 13,
 title: "Data traceability — AppsFlyer, Segment, Mixpanel, Braze",
 mentions: 5,
 sources: ["Consumer", "Rewards", "Workshop"],
 coverage: "Consumer workshop #2 · Growth P2 · Braze cache P3",
 summary:
 "Only 70–80% of orders reach AppsFlyer; SDK↔MMP gap blocks attribution and paid media optimization. Mixpanel vs Braze event volume mismatches (e.g. 1000 vs 80 users). Complain Books: events in both tools, 0 Braze triggers. Braze content cards need app kill/reopen — regular users miss campaigns.",
 impact: "Marketing ROI blind spots, CRM triggers fail, Club TaDa enrichment blocked",
 },
 {
 rank: 14,
 title: "CX chatbot — not tropicalized; support beyond deflection",
 mentions: 3,
 sources: ["Consumer"],
 coverage: "Growth P1 Sep 3 · ~45% deflection",
 summary:
 "Bot asks country/phone already known; no human delivery chain. AI not updated in ~2 years. Peru wants service-design scope — not bot-only. New PM (Diego) + Helio discovery started.",
 impact: "CX tickets, seller unfair ratings, Growth frustration with tropicalization",
 },
 {
 rank: 15,
 title: "Coupon wallet UX + lifecycle — manual clusters, no flash burn",
 mentions: 5,
 sources: ["Consumer", "Rewards", "Context"],
 coverage: "Consumer wk #4 · Rewards #2 · Growth P2",
 summary:
 "Monthly manual lifecycle coupons (engagement/lovers/casual); wallet shows last-created first. T&C hidden; no competitor-style mental model. Rewards wants flash countdown coupons; Club TaDa migration path for create/order/segment with 30-day validity.",
 impact: "Retention ops load, monetary coupon dependency, Club TaDa adoption friction",
 },
 {
 rank: 16,
 title: "Payment gateways & online pay — 3% share, BIN promos blocked",
 mentions: 4,
 sources: ["Consumer", "Workshop", "Context"],
 coverage: "Consumer wk #3 · Growth P3 · Niubiz limits",
 summary:
 "Online payments only 3% nationally — Nube sole gateway. Consumer workshop #3: BIN/bank promos (BBVA, BCP) like Mercado Pago. Fintech prioritization in Mexico blocks Peru orchestrator. Blocks acquisition via card partnerships and BIN campaigns.",
 impact: "Acquisition cost, can't match competitor bank promos, Fish Promo digitization delayed",
 },
 {
 rank: 17,
 title: "Consumer app performance — load time among slowest",
 mentions: 3,
 sources: ["Consumer", "Workshop"],
 coverage: "Consumer workshop board · top-10 slowest apps cited",
 summary:
 "Intro screen, content cards, videos, checkout — 3–7s per section. Hurts conversion and campaign onboarding. Separate from map bug but compounds perception of unreliability.",
 impact: "Conversion, paid media efficiency, Gen Z / TikTok Shop readiness",
 },
 {
 rank: 18,
 title: "Personalization & discovery — Buy Again ships, algo gap remains",
 mentions: 4,
 sources: ["Consumer", "Context"],
 coverage: "Sep 3 product demo · Growth P2/P3",
 summary:
 "Buy Again 61% conversion and multishowcases address habit; Fish Promo (+6% GMV MX) needs Peru digitization hire. Static cross-sell on PDP; limited exposure of habitual products. Data science 99% BEES — local analyst, no algo squad.",
 impact: "GMV growth ceiling, marketplace combo savings unclear, innovation discovery weak",
 },
 ] as PeruSynthesisTheme[],

 convergences: [
 "Map/GPS failure is universal — 3/3 Lima POCs + Consumer workshop #1 + Consumer vision P1 (Sep 3) + Mexico visits → same outcome",
 "Returnables/RGB — Peru competitive moat (44% orders) but Growth P1: consumer doesn't understand exchange; brand page education path agreed Sep 3",
 "Inventory quantity is the cross-country unanimous ask — Peru validates Mexico; partial order recovery blocked until stock truth (Consumer P1 + Service Level)",
 "WhatsApp is the real ops layer — tracking couriers, KPIs, payments (before WebPO), weekend monitoring — until ecosystem comms ships in-app",
 "Web Tiendas proves seller tools adopt when they solve money — payments pivot (2→78) is the model for notification center and commercial calendar",
 "Supervisor visibility gap — Excel Monday dashboards, hidden SLA 35, opaque ranking — matches OPS workshop #1 and Service Level Top Tiendas direction",
 "Overlapping + visible POC name enables cancel gaming — Merino bar-across-street pattern + workshop fraud topic",
 "Claims and wrong-address drive unfair seller penalties — ~18% wrong-address cancels nationally; rating hits seller for consumer mistakes",
 "2027 vision converges: predictive ops (workshop), inventory real-time (Service Level), omnichannel loyalty (Rewards), consumer personalization (Sep 3: Buy Again, multishowcases, Fish Promo) — all need data traceability first",
 "Coupon wallet is a three-way thread — Consumer workshop #4, Rewards flash coupons, Growth P2 lifecycle pain — Club TaDa is the migration vehicle",
 "Data stack debt blocks both Consumer (attribution, personalization) and Rewards (Braze enrichment, campaign triggers) — Segment audit with Bruno is shared prerequisite",
 "CX bot tropicalization (Sep 3 P1) + ecosystem comms (Service Level) + unfair seller ratings (OPS workshop) — same cancellation/rating pain chain",
 "Payment gateways unlock BIN promos (Consumer #3) and bank acquisition — 3% online pay is structural ceiling until Fintech prioritizes orchestrator",
 "Rewards future board (football, omnichannel, tiers) is 3–4 yr — Now stack is Braze + wallet + BEES admin + anti-fraud before scaling earn/burn occasions",
 ],

 criticalPriorities: [
 {
 rank: 1,
 title: "Fix map/GPS real-time visibility (seller, consumer, supervisor)",
 why: "Strongest field signal: 3/3 stores + Consumer workshop #1 + connects to Mexico cross-country theme #3. Blocks dispatch, tracking, and second-order assignment.",
 evidence: [
 { source: "Stores", detail: "3/3: courier pin stuck; 1 of 15 visible on Saturday; WhatsApp workarounds" },
 { source: "Consumer", detail: "Workshop #1 + Sep 3 P1: live courier map; pin frozen — escalate as bug" },
 { source: "Workshop", detail: "OPS: order tracking for stores; same map reliability stack" },
 { source: "Service level", detail: "Supervisor visibility + ecosystem comms as near-term ship" },
 { source: "Context", detail: "SLA healthy but dispatch tooling lags consumer expectation" },
 ],
 suggestion:
 "Ship reliable courier position updates on seller map. Consumer live tracking. Foundation before second-order assignment and polygon automation.",
 owners: "Eng. Courier/Map + PM Seller + Peru OPS",
 },
 {
 rank: 2,
 title: "Inventory quantity + combo SKU integrity",
 why: "3/3 stores + morning context + Service Level inventory pillar + flat Fill Rate. Direct link to San Pedro 12.2% seller cancellations.",
 evidence: [
 { source: "Stores", detail: "Combo off but linked SKU accepts orders; search misses Pilsen/473ml" },
 { source: "Context", detail: "Fill Rate 92% flat since 2024 — Victor's combo composition ask" },
 { source: "Service level", detail: "Inventory real-time = strategic bet; partial order recovery blocked" },
 { source: "Consumer", detail: "Sep 3 P1: entire order cancelled when one SKU missing — no partial recovery" },
 { source: "Workshop", detail: "OPS #4: SKU restrictions on coupons" },
 ],
 suggestion:
 "Quantity field + parent SKU disabling all variants. Combo integrity at cart. Quantitative picker in discovery.",
 owners: "PM Portfolio + Eng. Seller + Peru commercial",
 },
 {
 rank: 3,
 title: "Ecosystem communication (seller ↔ consumer ↔ courier)",
 why: "Validates Mexico direction. Peru sellers remember prior in-app chat. Wrong-address and no-answer drive 18% cancels.",
 evidence: [
 { source: "Stores", detail: "3/3: no chat; deposit-bottle disputes; door-wait cancellations" },
 { source: "Service level", detail: "WhatsApp bridge launching weeks; −30% courier cancels in MX pilot" },
 { source: "Context", detail: "Address modal live; Brazil location UX candidate" },
 { source: "B2B", detail: "Notification center (Braze) live Sep 2 for supervisor→store" },
 ],
 suggestion:
 "Ship predefined-message bridge, then in-app chat. Pair with address UX copy from Brazil. Braze for supervisor comms with open/click metrics.",
 owners: "PM CX + PM Seller + Peru OPS",
 },
 {
 rank: 4,
 title: "Consumer data stack — Segment/Mixpanel/Braze reconciliation + MMP",
 why: "Consumer workshop #2 + Growth P2/P3. Broken events block CRM, Club enrichment, and paid media — Rewards Braze vote #1 depends on same foundation.",
 evidence: [
 { source: "Consumer", detail: "Workshop #2: AppsFlyer sees 70–80% orders; SDK↔MMP gap" },
 { source: "Consumer", detail: "Sep 3 P2: Mixpanel vs Braze mismatches; Complain Books 0 triggers" },
 { source: "Consumer", detail: "P3: Braze cache — campaigns invisible until app kill/reopen" },
 { source: "Rewards", detail: "Vote #1: Braze enrichment needs reliable event stream" },
 ],
 suggestion:
 "Segment as source of truth audit with Bruno/data. Close AppsFlyer gap. Fix Braze integration debt or quantify business case. Enable lifecycle → Club migration triggers.",
 owners: "Data · PM Consumer · Rewards · Growth",
 },
 {
 rank: 5,
 title: "Club TaDa wallet + Rewards ops — Braze enrichment, flash coupons, BEES admin",
 why: "Rewards workshop top 4 + Consumer wallet UX + Growth coupon lifecycle P2. Club launched but tooling fragmentation slows scale.",
 evidence: [
 { source: "Rewards", detail: "Vote #1: points for surveys, opt-in, enrichment — not only monetary" },
 { source: "Rewards", detail: "Vote #2–4: flash coupons, BEES admin, anti-fraud automation" },
 { source: "Consumer", detail: "Workshop #4: wallet UX + Club ordering; Sep 3 P2 lifecycle manual" },
 { source: "Context", detail: "Awareness 9%; retention lever vs Rappi 41%" },
 ],
 suggestion:
 "Ship Braze enrichment MVP. Flash wallet coupons. Consolidate Rewards admin in BEES. Automate anti-fraud rules. Migrate lifecycle clusters to Club with 30-day validity.",
 owners: "Rewards (Javi) · PM Consumer · Peru Growth",
 },
 {
 rank: 6,
 title: "Real-time KPI cockpit — move off Excel/WhatsApp",
 why: "OPS workshop #1 + 3/3 store KPI pain + WebPO partial answer. Top Tiendas ranking needs in-platform storytelling.",
 evidence: [
 { source: "Workshop", detail: "OPS #1: stock, SLA, availability, hot products live" },
 { source: "Stores", detail: "Rolling 7-day window; SLA 35 hidden; rank #32 opaque" },
 { source: "Service level", detail: "Top Tiendas gold/silver/bronze; demand coverage over availability" },
 { source: "B2B", detail: "Demand heatmap works; payments adopted; ops module 17% but high impact" },
 ],
 suggestion:
 "Unified seller KPI screen: calendar week, SLA 35 visible, peer set explained. Supervisor dashboard before SLA breaks. Extend WebPO Operaciones adoption.",
 owners: "PM Seller + Peru OPS + Data",
 },
 {
 rank: 7,
 title: "Web Tiendas — order-level payments + commercial calendar",
 why: "Payments drove 2→78 adoption. Without per-order export, sellers keep legacy tools. Promo in consumer app but not BEES.",
 evidence: [
 { source: "B2B", detail: "77/85 payments; need per-POC per-order export up to 50k rows" },
 { source: "Stores", detail: "La Marina: promo in app but not BEES — can't stock before spike" },
 { source: "B2B", detail: "Operaciones +2.31pp SLA for constant users — expand from 17%" },
 { source: "Context", detail: "Marketplace coupon design fights availability" },
 ],
 suggestion:
 "Ship order-level payment detail. Integrate promo calendar into WebPO/BEES. Scale Operaciones module with proof of KPI lift.",
 owners: "Peru OPS (Eduardo) + PM B2B/Seller",
 },
 ] as PeruCriticalPriority[],

 roadmap: {
 now: [
 "Multishowcases category navigation — Peru target Sep 15",
 "Buy Again + upsell shelf — testing on home",
 "Live Activities lock-screen tracking — localize copy, hide store name",
 "Ecosystem comms bridge (WhatsApp predefined messages)",
 "Web Tiendas per-order payment export",
 "Brand page for returnables education — next campaign window",
 "Segment/Braze event audit — list mismatched triggers (Bruno)",
 ],
 next: [
 "Top Tiendas in-platform ranking with demand coverage metric",
 "Inventory quantity field + combo SKU parent-off",
 "Map/GPS real-time refresh on seller and consumer",
 "Claims triangulation — faster CX/store/consumer resolution",
 "Club TaDa × Braze points enrichment (Rewards #1)",
 "CX bot tropicalization + human delivery chain (Diego/Helio discovery)",
 "Coupon wallet redesign + flash burn (Consumer #4 · Rewards #2)",
 "Rewards admin inside BEES + anti-fraud rules (Rewards #3–4)",
 "New address flow rollout — wrong-address ~18% cancels",
 ],
 later: [
 "AI copilot for POC admin — polygon, dotation, grouping (OPS workshop #2)",
 "Omnichannel loyalty redemption (POC, Tambo, supermarket)",
 "Football occasion earn/burn integration",
 "Predictive ops — scheduled orders, vending, BEES→TADA small orders",
 "Tiered loyalty (3–4 year horizon)",
 "Payment gateway expansion + BIN/bank promos (Consumer #3)",
 "Fish Promo / consumer-level discount segmentation",
 "App load-time optimization — intro, checkout, content cards",
 ],
 },

 positiveSignals: [
 "Web Tiendas: 78 stores high-usage after payments pivot — proof Peru OPS can build seller trust tools",
 "Operaciones module: +0.5pp fulfillment, +2.31pp SLA for constant users (15 POCs, 5-week window)",
 "Service level KPIs stable despite +36% order growth Jan–Jul",
 "La Marina reference POC: cameras, WhatsApp control room, best SLA/TML in visit set",
 "Return coupon deflects ~40% of small-claim tickets — CX automation working",
 "Buy Again shelf: 98% add-to-cart, 61% conversion — beats categories (Consumer vision Sep 3)",
 "Club TaDa launching — coupon wallet ordering path via new admin",
 "New address flow — Colombia ~50% fewer errors; candidate for Peru ~18% wrong-address cancels",
 "Search workaround — description keywords near-zero zero-results until engine upgrade ships",
 "Consumer future vote #1 tie: virtual returnables + in-store pickup — aligns with Peru RGB moat",
 ],

 source:
 "Synthesis: Peru context meeting · La Marina/Merino/San Pedro visits · Web Tiendas walkthrough · Service level Sep 1 · OYP workshop Sep 2 (OPS · Consumer · Rewards) · Consumer vision Sep 3 · Power BI Lima KPIs",
};
