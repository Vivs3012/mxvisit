import { getPainActors, type ServiceLevelActor } from "./peru-context-nav";
import { PE_CONSUMER_VISION } from "./peru-consumer-vision";
import { PERU_CROSS_STORE_THEMES } from "./peru-insights";
import {
 PE_SERVICE_LEVEL,
 type ServiceLevelPain,
 type ServiceLevelPriority,
} from "./peru-service-level";
import { PE_WORKSHOP_0209 } from "./peru-workshop-0209";
import type { PeruTrackHighlight, PeruTrackSnapshot } from "./peru-trip-synthesis";

const SL_PRIORITY: Record<ServiceLevelPriority, number> = {
 Critical: 0,
 High: 1,
 Medium: 2,
 Low: 3,
};

function slPainsFor(actor: ServiceLevelActor): ServiceLevelPain[] {
 return PE_SERVICE_LEVEL.pains
.filter((p) => getPainActors(p.category).includes(actor))
.sort((a, b) => SL_PRIORITY[a.priority] - SL_PRIORITY[b.priority]);
}

function painHighlights(pains: ServiceLevelPain[]): PeruTrackHighlight[] {
 return pains.map((p, i) => ({
 rank: i + 1,
 title: `${p.priority} · ${p.title}`,
 detail: p.summary,
 }));
}

function countPriority(pains: ServiceLevelPain[], priority: ServiceLevelPriority): number {
 return pains.filter((p) => p.priority === priority).length;
}

const _consumerWorkshop = PE_WORKSHOP_0209.groups.find((g) => g.id === "consumer")!;
const _rewardsWorkshop = PE_WORKSHOP_0209.groups.find((g) => g.id === "rewards")!;
const _consumerP1Pains = PE_CONSUMER_VISION.growthPains.filter((p) => p.priority === "P1");
const _consumerP2Pains = PE_CONSUMER_VISION.growthPains.filter((p) => p.priority === "P2");

const _sellerPains = slPainsFor("seller");
const _courierPains = slPainsFor("courier");
const _adminPains = slPainsFor("admin");

const _courierStoreThemes = PERU_CROSS_STORE_THEMES.filter(
 (t) =>
 t.title.includes("Map") ||
 t.title.includes("assign") ||
 t.title.includes("Returnable") ||
 t.title.includes("Courier"),
);

export function buildServiceLevelTracks(): PeruTrackSnapshot[] {
 return [
 {
 id: "seller",
 group: "service-level",
 label: "Seller track",
 sessions: "Sep 1 Service level · Aug 31 store visits · Sep 2 OPS workshop",
 headline:
 "Seller pain is platform reliability at the POC: inventory truth, order alerts, opaque KPIs, and no in-app comms — 3/3 Lima stores validate Sep 1 topics. WebPO covers demand/payments but not full ops cockpit.",
 stats: [
 { label: "Sep 1 pains (seller)", value: String(_sellerPains.length) },
 { label: "Critical / High", value: String(countPriority(_sellerPains, "Critical") + countPriority(_sellerPains, "High")) },
 { label: "Store themes (3/3)", value: String(PERU_CROSS_STORE_THEMES.filter((t) => t.stores.length === 3).length) },
 { label: "Features shipped (12 mo)", value: "17" },
 ],
 priorityLabel: "Top priorities — Sep 1 + field",
 priorities: [
 {
 rank: 1,
 title: "Inventory quantity + partial order recovery",
 detail:
 "Sep 1 Critical: one OOS SKU cancels whole order. Aug 31: combos don't turn off together; no quantity field — VTEX/Tuca benchmark.",
 },
 {
 rank: 2,
 title: "Ecosystem communication (seller ↔ consumer ↔ courier)",
 detail:
 "Sep 1 Critical: WhatsApp bridge launching weeks (−30% courier cancels MX). Aug 31: 3/3 stores lack in-app chat; deposit-bottle disputes.",
 },
 {
 rank: 3,
 title: "Real-time KPI visibility + Top Tiendas storytelling",
 detail:
 "Sep 1 + OPS workshop #1: rolling 7-day window, SLA 35 hidden, rank #32 opaque. Move off Monday Excel/WhatsApp.",
 },
 {
 rank: 4,
 title: "Order sound + multi-login on shared accounts",
 detail:
 "Sep 1 High: sound on office PC not in store; orders expire. Aug 31: 2/3 stores report missed orders.",
 },
 ],
 pains: painHighlights(_sellerPains),
 shipping: [
 "Order Floor (accept all) + maps — 2nd most-used seller page",
 "Order distribution for couriers",
 "Ecosystem Communication — WhatsApp templates (weeks)",
 "Braze notification center — supervisor→store comms",
 "Delivery confirmation code — pilot per store",
 "Top Tiendas ranking — discovery (gold/silver/bronze)",
 "Quantitative picker / combo SKUs — cross-country discovery",
 "WebPO demand + payments — adopted at La Marina/Merino",
 ],
 gaps: [
 "Map/GPS: courier pin stuck — 3/3 stores (Aug 31)",
 "Can't assign second order to courier en route — La Marina #2 ask",
 "Seller-controlled courier activation — not self-activate every 30 min",
 "Assign-to-courier freezes on peak — order stuck waiting",
 "Promo in consumer app but not BEES — La Marina",
 "Overlapping POC spillover + visible store name — cancel gaming",
 "Invoice type (boleta/factura) not visible at checkout",
 "Returns traceability — Zendesk email chain days",
 ],
 },
 {
 id: "courier",
 group: "service-level",
 label: "Courier track",
 sessions: "Sep 1 Service level · Aug 31 store visits · Fleet pillar",
 headline:
 "Courier experience is downstream of address quality and comms gaps: ~18% wrong-address cancels, no-answer at door, no delivery proof on disputes. Sellers dispatch blind when map doesn't update — WhatsApp is the real tracking layer.",
 stats: [
 { label: "Sep 1 pains (courier)", value: String(_courierPains.length) },
 { label: "Wrong-address cancels", value: "~18%" },
 { label: "Courier cancel reduction (MX comms)", value: "−30%" },
 { label: "Store map themes", value: String(_courierStoreThemes.length) },
 ],
 priorityLabel: "Top priorities — Sep 1 + field",
 priorities: [
 {
 rank: 1,
 title: "Wrong address — top national cancel driver",
 detail:
 "Sep 1 Critical: ~18% of all cancellations. INAP checkout review live; Colombia/Brazil UX candidate.",
 },
 {
 rank: 2,
 title: "Ecosystem comms — courier ↔ consumer timed messages",
 detail:
 "Sep 1 Critical: 5-minute wait window; taxi-wait model. Mexico pilot −30% courier cancellations.",
 },
 {
 rank: 3,
 title: "Consumer no-answer at door",
 detail:
 "Sep 1 High: no baseline wait time; seller/courier cancel when unreachable — links to Growth P1.",
 },
 {
 rank: 4,
 title: "Delivery proof on disputes",
 detail:
 "Sep 1 Medium: PIN confirmation code ready globally — 3 skips/day; pilot per store in Peru.",
 },
 ],
 pains: painHighlights(_courierPains),
 shipping: [
 "Ecosystem Communication — courier↔consumer timed prompts",
 "Delivery confirmation code — live in other countries",
 "Order distribution — seller assigns riders",
 "QG Financial Report — Sunday payment peak",
 "First Seller↔Courier integration shipped",
 "Courier top-500 global incentive (~150 PEN) — ranking next",
 ],
 gaps: [
 "Map/GPS frozen — sellers track 15 riders via WhatsApp (3/3 stores)",
 "No real-time courier ranking in platform",
 "Returnable weight — 28-pack promo, improvised stacking on moto",
 "Manual dispatch — split riders for distant simultaneous orders (San Pedro)",
 "Courier acquisition exposes store phone — midnight calls (Merino)",
 "On-demand overflow riders (Rappi/PedidosYa) — future OPS vision only",
 "Proyecto Rider payment/QR — workshop future item",
 ],
 },
 {
 id: "admin",
 group: "service-level",
 label: "Admin track",
 sessions: "Sep 1 Service level · Commercial/OPS · Admin squad capacity",
 headline:
 "Admin load is the hidden tax on service level: discount templates × DDCs updated twice weekly, manual shelf reorder, no supervisor cockpit. Braze and promo-admin discovery exist but Admin squad capacity blocks the ops dashboard.",
 stats: [
 { label: "Sep 1 pains (admin)", value: String(_adminPains.length) },
 { label: "Critical topics", value: String(countPriority(_adminPains, "Critical")) },
 { label: "Upcoming features", value: String(PE_SERVICE_LEVEL.upcomingFeatures.length) },
 { label: "POC churn (early months)", value: "~20%" },
 ],
 priorityLabel: "Top priorities — Sep 1 + OPS",
 priorities: [
 {
 rank: 1,
 title: "Supervisor real-time operations dashboard",
 detail:
 "Sep 1 Critical: rush-hour blind spot — expired orders, stores offline, CRM SKU not activated. Today: Power BI T+1 + WhatsApp.",
 },
 {
 rank: 2,
 title: "Braze notification center + segmented store campaigns",
 detail:
 "Sep 1 High: replace supervisor WhatsApp blasts; cluster/Top Tiendas targeting Q4 then automation.",
 },
 {
 rank: 3,
 title: "Discount & promo admin simplification",
 detail:
 "Sep 1 Medium: 4 types × DDCs = 8+ templates, twice weekly. Flash promo = delete → re-upload.",
 },
 {
 rank: 4,
 title: "Top Tiendas + onboarding storytelling",
 detail:
 "Sep 1 High: ~20% POCs close in 3–4 months; gold/silver/bronze needs in-platform KPI narrative.",
 },
 ],
 pains: painHighlights(_adminPains),
 shipping: [
 "Braze notification center — planned (read receipts, surveys)",
 "Promo/discount admin UX — discovery with EC/MX/CO",
 "Supervisor operations dashboard — discovery (Admin squad)",
 "Top Tiendas in-platform — gold/silver/bronze discovery",
 "Segmented comms — manual Q4, Top Tiendas automation after",
 "Return coupon deflects ~40% small-claim tickets",
 "17 seller + courier features shipped in 12 months",
 ],
 gaps: [
 "Manual shelf reorder after every discount change",
 "Combo / quantitative picker — catalog fragmentation (6-pack, 12-pack SKUs)",
 "POC name visible — fraud/cancel gaming (global change needed)",
 "Claims triangulation slow — parallel Zendesk emails (OPS workshop #3)",
 "Supply truck prioritization — no seller-connected logic",
 "Manual price/discount load for DDC, Diageo, PDV (OPS workshop)",
 "RENIEC integration for accounts — workshop backlog",
 ],
 },
 ];
}

export function buildGrowthTracks(): PeruTrackSnapshot[] {
 return [
 {
 id: "consumer",
 group: "growth",
 label: "Consumer track",
 sessions: "Workshop Sep 2 + Vision Sep 3",
 headline:
 "Consumer voted live map #1 at workshop; Sep 3 aligned product ship track with 18 Growth pains — gaps cluster around education (returnables), reliability (map, partial order), support (CX bot), and data (Braze/Mixpanel, wallet lifecycle).",
 stats: [
 { label: "Workshop frictions", value: String(_consumerWorkshop.challenges.length) },
 { label: "Growth pains (Sep 3)", value: String(PE_CONSUMER_VISION.growthPains.length) },
 { label: "P1 pains", value: String(_consumerP1Pains.length) },
 { label: "Product features shown", value: String(PE_CONSUMER_VISION.productFeatures.length) },
 ],
 priorityLabel: "Workshop top votes",
 priorities: _consumerWorkshop.challengesPrioritized.map((c) => ({
 rank: c.priority ?? 0,
 title: c.title,
 detail: c.detail,
 })),
 pains: [
..._consumerP1Pains.map((p, i) => ({
 rank: i + 1,
 title: `${p.priority} · ${p.title}`,
 detail: p.summary,
 })),
..._consumerP2Pains.map((p, i) => ({
 rank: _consumerP1Pains.length + i + 1,
 title: `${p.priority} · ${p.title}`,
 detail: p.summary,
 })),
 ],
 shipping: [
 "Multishowcases — Sep 15 Peru target",
 "Buy Again + upsell — 98% ATC, 61% conversion",
 "New address flow — Colombia live, ~50% fewer errors",
 "Live Activities — live Sep 1; localize, hide POC name",
 "Search engine upgrade — typo/similarity fallback (MX next week)",
 "Brand pages — returnables education landing agreed",
 "Turbo 15-min, ice bag, MGM refresh — in rollout/Q",
 ],
 gaps: [
 "Courier map frozen — P1 bug + workshop #1",
 "Returnables/RGB education — 44% orders, low awareness",
 "CX bot not tropicalized — ~45% deflection but 2yr stale AI",
 "Partial order recovery blocked without seller quantity",
 "Coupon wallet manual lifecycle — P2, converges Rewards",
 "Mixpanel ↔ Braze event gaps — campaigns don't trigger",
 "Online payments 3% — Nube only, blocks BIN promos",
 "Braze cache — campaigns need app kill/reopen",
 "Fish Promo / consumer-level discounts — P3, hire incoming",
 ],
 },
 {
 id: "rewards",
 group: "growth",
 label: "Rewards track",
 sessions: "Workshop Sep 2 + Context Club TaDa launch",
 headline:
 "Club TaDa launched during visit week. Rewards stack is dependency-heavy: Braze enrichment and wallet UX before tiers/omnichannel. Admin fragmentation (BEES vs downloads) and manual anti-fraud slow scale.",
 stats: [
 { label: "Workshop pains", value: String(_rewardsWorkshop.challenges.length) },
 { label: "Prioritized votes", value: String(_rewardsWorkshop.challengesPrioritized.length) },
 { label: "Future vision items", value: String(_rewardsWorkshop.futureVision.length) },
 { label: "Awareness (national)", value: "9%" },
 ],
 priorityLabel: "Workshop top votes",
 priorities: _rewardsWorkshop.challengesPrioritized.map((c) => ({
 rank: c.priority ?? 0,
 title: c.title,
 detail: c.detail,
 })),
 pains: _rewardsWorkshop.challenges.map((c, i) => ({
 rank: i + 1,
 title: c.title,
 detail: c.detail,
 })),
 shipping: [
 "Club TaDa launch — coupon wallet ordering via new admin",
 "Return coupon deflects ~40% small-claim tickets (CX)",
 "85% active users enrolled — mostly B tier today",
 "Monetized brand pages for liquor/whisky/wine",
 ],
 gaps: [
 "Braze enrichment — points for surveys, channels, data (vote #1)",
 "Flash wallet coupons with countdown — not built",
 "Rewards admin outside BEES — CAO downloads, manual rules",
 "Anti-fraud automation — bodeguero patterns manual",
 "SessionM ↔ Bees One catalog sync friction",
 "Coupon images / CT banners from Braze",
 "Instant merch redemption + brand-specific burn",
 "Tiers + omnichannel redeem — 3–4 yr horizon (future vote #2–3)",
 "Football occasion earn/burn + API — future vote #1",
 ],
 },
 ];
}

/** @deprecated Use serviceLevelTracks + growthTracks */
export function buildAllTrackSnapshots(): PeruTrackSnapshot[] {
 return [...buildServiceLevelTracks(),...buildGrowthTracks()];
}
