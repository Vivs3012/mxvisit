export type ConsumerPriority = "P1" | "P2" | "P3";

export type ConsumerPain = {
 id: string;
 priority: ConsumerPriority;
 title: string;
 summary: string;
 productResponse?: string;
 status?: "covered" | "partial" | "gap" | "discovery" | "planned";
 linksToProduct?: string[];
};

export type ConsumerProductFeature = {
 id: string;
 title: string;
 status: "live" | "testing" | "planned" | "q-roadmap";
 summary: string;
 metrics?: string[];
 peruTiming?: string;
};

export const PE_CONSUMER_VISION = {
 date: "03/09/2026",
 location: "Lima office — Peru",
 participants:
 "Consumer product (Victoria, Nara, Tiago, Mari, Fabio) · Peru Growth/Commercial (Eloy, team) · Visiting product team (Brazil/Mexico)",
 source:
 "Peru/03:09/Visão de consumer/ · visaoconsumer_1788456606855.txt + WhatsApp_Audio_2026-09-03_at_12.32.txt",

 executiveSummary: {
 headline:
 "Sep 3 aligned Consumer product roadmap with Peru Growth/Commercial pains — multishowcases, Buy Again, address flow, and live updates on the ship track; returnables education, courier map, and coupon lifecycle remain the top commercial gaps.",
 paragraphs: [
 "Victoria's consumer squad presented the 2026 evolution: multishowcase category navigation (single persistent row, sub-shelves, target Sep 15), Buy Again shelf (98% add-to-cart, 61% order conversion — beating categories in Mexico), upsell screen in rollout, Colombia-tested new address flow with geolocation priority, search engine improvements (typo/similarity fallback), live order updates on lock screen (live since Sep 1), Turbo 15-min delivery pilot, Club TaDa free-shipping coupons, and brand pages for campaign moments.",
 "Peru commercial team (Eloy) presented 18 prioritized pains. P1 consumer-centric: returnables/RGB education (44% orders RGB, inter-brand bottle exchange unclear), search/discovery workarounds (Algolia rules + description keywords), CX bot not tropicalized, consumer courier map not updating in real time, partial order recovery blocked without stock quantity, wrong-address cancels (~18% nationally).",
 "Strong convergence with Sep 2 workshop: Consumer group voted live courier map #1; Rewards voted Braze enrichment; OPS voted real-time KPI visibility. Product responses mapped: ecosystem comms (Q), new address flow, brand page for returnables landing, Fish Promo for personalized discounts (Mexico +6% GMV), Club TaDa for coupon wallet ordering, Segment/Braze event audit with Bruno's data team.",
 "Peru-specific context: RGB is a competitive moat (~44% order share vs 60%+ volume in Mexico) but driven by price not awareness; Retornafest campaign this month missed brand-page window; MGM deprioritized due to fraud; online payments only 3% (Nube dependency); Braze campaigns require app kill/reopen to appear — technical debt.",
 ],
 stats: [
 { label: "Growth pains listed", value: "18" },
 { label: "P1 consumer-centric", value: "6", tone: "warning" as const },
 { label: "Buy Again conversion", value: "61%" },
 { label: "RGB order share (PE)", value: "44%" },
 { label: "Online payments", value: "3%" },
 { label: "Product features shown", value: "12+" },
 ],
 },

 productTeam: {
 squad: [
 "Victoria — product lead",
 "Víctor — onboarding & purchase",
 "Vacancy — personalization & post-purchase",
 "Daniela — checkout & payments",
 "Eduardo — antifraud",
 "Tiago, Mari, Fabio — design (checkout)",
 ],
 northStar:
 "Acquire and retain consumers with exceptional, personalized experiences — maximize onboarding, conversion, growth, and platform trust.",
 principles: [
 "Do what we do well, then innovate",
 "Omnichannel aligned with Club TaDa launch",
 "Brand differentiation as competitive moat",
 ],
 },

 productFeatures: [
 {
 id: "multishowcases",
 title: "Multishowcases — persistent category navigation",
 status: "planned",
 summary:
 "Replace two-row category grid with single swipeable row + sub-shelves. Reduces clicks, increases categories visited per session (Brazil/Mexico: more categories = higher conversion). Landing pages per theme (Fiestas Patrias, Día de los Padres) — third level not ready yet; shelves repeat at launch.",
 metrics: ["Target: Sep 15 Peru", "A/B: compare first 15 vs last 15 days of month (same commercial strategy)"],
 peruTiming: "Sep 15 target — admin customization module needed for new sub-categories",
 },
 {
 id: "buy-again",
 title: "Buy Again + upsell shelf",
 status: "testing",
 summary:
 "First showcase shelf for returning buyers — one-click reorder. Mexico: 60-70% repeat same basket, 80% single-SKU orders. Upsell screen suggests add-ons (static list v1; algorithm later). Goal: grow basket size and ABI distribution, not just convenience.",
 metrics: ["98% add-to-cart", "61% order conversion", "Beats category conversion (~40% MX)"],
 peruTiming: "Testing on home; may move to beer category. Upsell ready but not yet A/B tested",
 },
 {
 id: "address-flow",
 title: "New address flow — geolocation first",
 status: "testing",
 summary:
 "PedidosYa-style flow: map-first, geolocation suggests address, larger fields, blocks advance on errors. Colombia live — ~50% fewer errors, ~10s faster edit, wrong-address cancels down (was ~1.8% → 1.1% of orders in MX reference).",
 metrics: ["~15% fewer errors on screen", "AB testable", "Currently Colombia only"],
 peruTiming: "Peru rollout TBD — aligns with national ~18% wrong-address cancel driver",
 },
 {
 id: "search",
 title: "Search engine improvements",
 status: "planned",
 summary:
 "New search engine (same as new shelf entity). Typo/similarity fallback — e.g. Cusqueña with Z finds product with S. Peru workaround: keywords in product description reduced zero-result searches to near zero.",
 metrics: ["Launch: next week Mexico", "Peru: Algolia rules + description tags workaround"],
 peruTiming: "Peru already mitigated via description keywords — engine upgrade coming",
 },
 {
 id: "live-updates",
 title: "Live Activities — lock screen order tracking",
 status: "live",
 summary:
 "Uber-style live updates on lock screen (iOS + Android). Live since Sep 1 (~2 days at meeting). Shows order status without opening app. Peru feedback: hide store name in notification — use order ID only.",
 metrics: ["Live Sep 1", "100% rollout (not A/B)", "Needs notification permission"],
 peruTiming: "Peru wants localized copy + remove POC name from notification",
 },
 {
 id: "turbo",
 title: "Turbo — 15-minute delivery",
 status: "planned",
 summary:
 "Configurable delivery fee for ≤15 min delivery. Brazil: 5% order share, helps MACO despite 20% not meeting SLA (auto-refund). City-level config; ops team controls which stores — not sellers.",
 peruTiming: "Aligning with Mexico — test next week. Ops concerns on seller KPI impact",
 },
 {
 id: "brand-page",
 title: "Brand pages — campaign landing pages",
 status: "live",
 summary:
 "Flexible brand landing pages (shelves, banners, Braze links, Club coupons). World Cup: 4% of users who clicked showcases. Not always-on — surprise/novelty matters. Can host returnables education (Peru P1 ask).",
 metrics: ["4% showcase click share (World Cup)", "Admin: product team creates, local edits"],
 peruTiming: "Peru interested — missed Retornafest Sep window; multi-brand pages possible",
 },
 {
 id: "free-shipping-coupon",
 title: "Free shipping coupons (Club TaDa)",
 status: "q-roadmap",
 summary:
 "Create delivery-free coupons in admin (not inline cart discount). Critical for Club TaDa redemption — Brazil's top earn/burn item.",
 peruTiming: "Q roadmap — needs Club admin capability",
 },
 {
 id: "ice-bag",
 title: "Ice bag add-on in cart",
 status: "live",
 summary: "Optional ice bag SKU in cart. Mexico: 3-5% of orders. Logistics: POC buys bags, plans stock.",
 },
 {
 id: "mgm",
 title: "Member Get Member refresh",
 status: "testing",
 summary:
 "New MGM UX with WhatsApp share, fraud limits (5 referrals/year), mini landing page. Mexico ~10 days live. Peru MGM manual and deprioritized — may test if bank partnerships replace acquisition volume.",
 },
 {
 id: "welcome-screen",
 title: "Personalized welcome screen (deep link)",
 status: "live",
 summary:
 "Pre-login branded screen for Paymedia deep links (e.g. Corona World Cup). Improves campaign onboarding rate. Special campaigns only — not default.",
 },
 {
 id: "cart-nav",
 title: "Cart out of nav bar — coupons in tab",
 status: "planned",
 summary:
 "40% of cart sessions are empty — move cart icon, put coupons in nav. Floating cart icon planned. Testing in Colombia first.",
 },
 ] satisfies ConsumerProductFeature[],

 growthPains: [
 {
 id: "returnables",
 priority: "P1",
 title: "Returnables / RGB — consumer doesn't understand exchange rules",
 summary:
 "Consumers don't understand returnability, bottle exchange, or cross-brand swap (same size, different brands allowed in Peru). Tags: Tengo botellas / No tengo — 'No tengo' communicates purchasable without bottles but confuses. 44% orders have RGB; volume higher in MX but awareness low.",
 productResponse:
 "Brand page for returnables education; header in retornables category; content card/carousel. Platform catalog change (VTEX-style) is large — comms-first path. Retornafest campaign missed Sep window.",
 status: "partial",
 linksToProduct: ["brand-page", "multishowcases"],
 },
 {
 id: "search-discovery",
 priority: "P1",
 title: "Search & product discovery — limited configuration",
 summary:
 "Algolia rules + description keyword workaround (Cusqueña z→s) reduced zero-results. Users search by football club names, typos. Engine upgrade with similarity fallback deploying.",
 productResponse: "Search engine improvements launching Mexico next week; typo fallback in new engine.",
 status: "partial",
 linksToProduct: ["search"],
 },
 {
 id: "cx-bot",
 priority: "P1",
 title: "CX chatbot — not tropicalized for Peru",
 summary:
 "Bot asks country and phone already known; flow feels distant. No 'talk to human' option. ~45% deflection rate but AI not updated in 2 years. Training gap for agents beyond bot.",
 productResponse:
 "New PM (Diego) with Canelas; Helio discovery underway. Service design scope requested — not bot-only.",
 status: "gap",
 },
 {
 id: "courier-map",
 priority: "P1",
 title: "Consumer can't see courier location in real time",
 summary:
 "Pin doesn't move; ETA removed after complaints (range only now). Braze workaround: 'courier nearby' push. #2 cancel reason nationally: consumer does not answer.",
 productResponse:
 "Bug if pin frozen — escalate tickets. Same class as seller map failure (3/3 stores Aug 31). Workshop Consumer #1 priority.",
 status: "gap",
 linksToProduct: ["live-updates"],
 },
 {
 id: "partial-order",
 priority: "P1",
 title: "No partial order recovery when SKU out of stock",
 summary:
 "If one SKU missing, entire order cancelled — consumer rarely reorders. Root cause: no quantity/stock precision at seller.",
 productResponse:
 "Inventory quantity is the structural fix (same as OPS/seller visits). Partial recovery blocked until stock truth exists.",
 status: "gap",
 },
 {
 id: "consumer-no-answer",
 priority: "P1",
 title: "Cancellations — consumer does not answer",
 summary:
 "Second-largest cancel driver. Data enrichment campaigns planned (outdated phone theory disputed — phone required for auth). Links to ecosystem comms initiative.",
 productResponse: "Ecosystem communication (WhatsApp bridge) in Q — seller/courier/consumer predefined messages.",
 status: "partial",
 linksToProduct: ["live-updates"],
 },
 {
 id: "coupon-lifecycle",
 priority: "P2",
 title: "Coupon lifecycle — manual, no wallet personalization",
 summary:
 "Monthly manual coupon creation per lifecycle cluster (engagement, lovers, casual). Wallet shows last-created first — no sort/segment. Short expiry by design for monthly action.",
 productResponse:
 "Club TaDa: create, order, segment coupons with 30-day validity. Migration path from lifecycle coupons. Easy-to-use coupons initiative overlaps.",
 status: "partial",
 linksToProduct: ["free-shipping-coupon"],
 },
 {
 id: "mixpanel-braze",
 priority: "P2",
 title: "Mixpanel ↔ Braze event reconciliation",
 summary:
 "Event volume mismatches (e.g. 1000 users vs 80 in Braze). Some Segment events not enabled in Braze. Complain Books campaign: events in both tools but 0 Braze triggers.",
 productResponse: "Review with Bruno/data team + Segment as source of truth. Databricks + mParticle integration coming.",
 status: "gap",
 },
 {
 id: "personalization",
 priority: "P2",
 title: "Product personalization — algorithm gap",
 summary:
 "Limited exposure of habitual products; upsell/cross-sell underused. Data science capacity 99% BEES — local analyst in Peru but no algo team.",
 productResponse:
 "Buy Again + upsell, multishowcases, brand pages partially cover. Full-screen algo personalization is future state.",
 status: "partial",
 linksToProduct: ["buy-again", "multishowcases", "brand-page"],
 },
 {
 id: "consumer-discounts",
 priority: "P3",
 title: "No consumer-level discount segmentation",
 summary:
 "Prices differ by DDC/city only — not by lifecycle (lovers, casual). Fish Promo (personalized promo algo) live in MX/CO: +6% GMV, +3% volume.",
 productResponse:
 "Fish Promo via Excel upload — needs digitization person in Peru. New data hire in ~2 weeks.",
 status: "planned",
 },
 {
 id: "marketplace",
 priority: "P3",
 title: "Marketplace portfolio — low exposure, combo savings unclear",
 summary:
 "Liquor+beer combos don't show savings vs buying separate. Discovery underway for visible combo experience.",
 productResponse: "Combo pairs discovery with Víctor — seller must enable 3 SKUs.",
 status: "discovery",
 },
 {
 id: "innovation-discovery",
 priority: "P3",
 title: "No organic innovation discovery path",
 summary: "New flavors/SKUs hard to surface without brand campaigns.",
 productResponse: "Brand pages + mood showcase thematic landing pages.",
 status: "partial",
 linksToProduct: ["brand-page", "multishowcases"],
 },
 {
 id: "online-payments",
 priority: "P3",
 title: "Online payments — 3% share, Nube dependency",
 summary:
 "Only Nube gateway; want competition for fees. Fintech team bottleneck — Mexico online payments priority blocks other countries.",
 productResponse: "Payment orchestrator exists but Fintech prioritization is external dependency.",
 status: "gap",
 },
 {
 id: "bin-promos",
 priority: "P3",
 title: "BIN / bank card promotions",
 summary:
 "Peru testing bank partnerships for acquisition; BIN-based promos need payment gateway diversity. Colombia exploring same.",
 productResponse: "Blocked on online payments + gateway expansion.",
 status: "gap",
 },
 {
 id: "braze-cache",
 priority: "P3",
 title: "Braze campaigns require app kill to appear",
 summary:
 "Content cards, post-purchase, top banner don't show until user closes app from background. Regular users never see new campaigns.",
 productResponse: "Known integration limitation — no fix until Braze refactor. Quantify gap for business case.",
 status: "gap",
 },
 {
 id: "search-monetization",
 priority: "P3",
 title: "Can't prioritize monetized products in search",
 summary: "Advanced — shelf ordering used today. Search monetization is future.",
 productResponse: "Search optimization first; brand page monetization more immediate.",
 status: "gap",
 },
 {
 id: "monetization-spaces",
 priority: "P3",
 title: "In-app monetization spaces (ads)",
 summary:
 "Competitors run ads across journey. Peru already monetizes liquor/whisky/wine brand pages. Club double-points and special coupons possible.",
 productResponse: "Brand pages, multishowcases, Buy Again as monetizable surfaces.",
 status: "partial",
 linksToProduct: ["brand-page"],
 },
 ] satisfies ConsumerPain[],

 convergences: [
 "Live courier map — Consumer workshop #1 (Sep 2) + Growth P1 (Sep 3) + seller map failure (Aug 31 stores) = same reliability stack",
 "Returnables/RGB — Peru differentiator vs Rappi; brand page path agreed; catalog change deferred",
 "Wrong address + consumer no-answer — ~18% cancels nationally; new address flow + ecosystem comms + data enrichment",
 "Coupon wallet — Rewards workshop (Braze, flash coupons) + Growth P2 lifecycle pain + Club TaDa launch",
 "Search — Peru workaround (description keywords) + product engine upgrade + Aug 31 store search pain",
 "Personalization — Fish Promo (P3) + Buy Again (shipping) + data science capacity gap across countries",
 ],

 nextSteps: [
 "Victoria/Fernando: prioritize which features ship to Peru first (not all at once)",
 "Growth: share lifecycle coupon strategy deck for Club TaDa migration",
 "Product + Growth: Braze event audit with Bruno — list mismatched events",
 "Peru: escalate consumer courier map bugs with video evidence",
 "Brand page for returnables — explore for next Retornafest-style campaign",
 "Fish Promo: connect Peru digitization hire with Mexico algo documentation",
 "Live updates: localize copy, remove store name from notification",
 ],
};
