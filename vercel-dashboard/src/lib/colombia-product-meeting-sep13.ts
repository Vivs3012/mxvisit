/** Sep 13, 2026 — Colombia 1YP · Product intro (Bavaria). Source: Colombia/13:09/1YP Tada - Producto/ */

import type { MeetingTopic } from "./peru-context-meeting";

export type ColombiaMeetingSection = {
 id: string;
 label: string;
 summary: string;
 topics: MeetingTopic[];
};

export const CO_PRODUCT_MEETING_META = {
 date: "13/09/2026",
 title: "1YP TaDa — Product introduction",
 location: "Bavaria · Colombia",
 participants:
 "Colombia: Giovanna (Growth), Pau/PAU (portfolio & marketplace), Miguel (expansion & service level), commercial & ops leads. Brazil product: Tiago, Vivian, Karen, Canelas.",
 format:
 "Day 1 of Colombia OYP week — Colombia shares 2026 performance, growth/commercial/ops plans; Brazil previews deeper ops/consumer/rewards sessions (Sep 13 PM + Sep 14 AM).",
 transcriptPaths: [
 "/colombia/product-sep-13-bavaria-1.txt",
 "/colombia/product-sep-13-bavaria-2.txt",
 "/colombia/product-sep-13-bavaria-3.txt",
 ],
};

export const CO_PRODUCT_MEETING = {
 executiveSummary: {
 headline:
 "Colombia is growing 50–60% YoY with acquisition sometimes above Mexico — but marketplace and bank promos changed the user mix, retention is under pressure, and own-store vs Community POC (aliado) models need different product hooks.",
 paragraphs: [
 "Growth shifted budget earlier in the year and diversified beyond paid media into bank partnerships (10–15% of users at ~$2–3 CAC; blended ~$5–6). World Cup and football promos spiked acquisition (~22–24k) but hurt retention when promos ended. ~30% of beer-paid acquisition still buys marketplace-only baskets — marketplace users buy every 22–30 days vs 12–14 for beer-only, shop more at night, and cluster into low-AOV (<50k COP) or high-AOV (>120k) bands that retain poorly.",
 "Commercial + ops built an availability score when BEES and store ERP (SIESA) are not integrated — penalize stores that have stock but keep SKUs off in BEES. That lifted onboarding/conversion and marketplace attach. Stockout is managed in Power BI (category view today); allies face stricter 90%+ rules as order volume grows. Product ask: SKU-level stockout in platform, not category rollup only.",
 "Colombia is the most own-store-heavy market (~69 own vs ~120 Community POC; still ~80% orders on own stores, ~20% allies). Paypoints, data access (Power BI, clusters), and owner change differ from aliados — Top Tiendas bridges allies; Luana’s team pressures underperforming pockets. Expansion: more overlap when a store turns off (not full auto-spillover), Torre de Control (2 people weekends) + WhatsApp alerts for unique-zone stores. Plan to ~double Community POC next year while tightening peak coverage on own stores.",
 "Rewards: Club TaDa under-resourced (key people left/ injured); Lovers base and frequency down; missions postponed. Tiers segment beer vs marketplace journeys. Product wants algorithmic For You shelves (not one manual showcase for all); SEM vs sampling constraints for rotating hero SKUs (e.g. thermal bag). ERP/e-invoicing compliance drives priority API for billing + downloadable order lines — Zé Delivery lesson: integrations without seller product adoption fail.",
 ],
 takeaways: [
 { label: "Growth", text: "Keep ≥20k new users/month; shift partnerships from acquisition-only to retention (BIN/datáfono reporting, double points)." },
 { label: "Marketplace", text: "Regional portfolio + occasion cross-sell; separate CRM clusters — night buyers, core vs premium mix." },
 { label: "Availability", text: "BEES↔ERP gap metric works; push SKU truth in seller/BEES and ally tooling." },
 { label: "Expansion", text: "Community POC for capillarity + overlap; own stores for control — product must serve both paypoint models." },
 ],
 },
 snapshot: [
 { label: "YoY growth", value: "50–60%", detail: "Strong H1 trade; retention recovered H2 last year" },
 { label: "Acquisition", value: "vs MX", detail: "Sometimes larger than Mexico; org + partnerships" },
 { label: "Marketplace attach", value: "~30%", detail: "From beer-paid media, marketplace-only cart" },
 { label: "Own vs aliado orders", value: "80/20", detail: "~69 own stores vs ~120 Community POC" },
 { label: "Community POC", value: "~105 ops", detail: "From ~120 in Jul; plan to ~double next year" },
 { label: "Partnership CAC", value: "$2–3", detail: "10–15% of users; blended CAC ~$5–6" },
 { label: "Competition", value: "Rappi + ML", detail: "Mercado Libre CPG; Didi > Rappi users" },
 { label: "Club TaDa", value: "Under strain", detail: "Staffing gap; missions delayed" },
 ],
 sections: [
 {
 id: "growth",
 label: "1. Growth & acquisition",
 summary: "Acquisition scale, partnerships, marketplace mix, retention pressure.",
 topics: [
 {
 title: "Partnerships as #1 growth win",
 detail:
 "Banks communicate offers (e.g. Falabella six-pack); TaDa tracks BIN/datáfono growth. CAC efficient but retention fragile after promo ends (earthquake paused media; users churned when discount gone).",
 quotes: [
 "Roughly 10–15% of users at a CAC of 2 or 3 dollars — blended around 5 or 6.",
 "We brought many users with the biggest bank promo at 50% — when World Cup ended we had to turn paid media off.",
 ],
 },
 {
 title: "Marketplace changes frequency and CRM timing",
 detail:
 "New marketplace cluster: poor retention when AOV <50k or >120k COP. Cannot push beer-style 4pm comms — marketplace buys at night. Residency ~20–30% higher; repurchase every 22–30 days.",
 quotes: [
 "Marketplace users are completely different from beer users — we cannot message them at 4pm like beer.",
 "When AOV is below 50,000 or above 120,000 they do not retain.",
 ],
 },
 {
 title: "2026 focus: retention via partnerships",
 detail:
 "Lucho: do not drop below 20k new users/month. Next year: partnerships for retention (double/triple points), not only acquisition. Flash promo slots all day (beer midday, marketplace evening).",
 quotes: ["Stop seeing partnerships only as acquisition — the bank can also bring people back."],
 },
 ],
 },
 {
 id: "commercial",
 label: "2. Commercial, portfolio & marketplace",
 summary: "Split beer vs marketplace org; regional assortment; monetization and occasions.",
 topics: [
 {
 title: "BEES vs SIESA — false stockouts",
 detail:
 "Stores had product in ERP but SKU off in BEES (bottle vs liquid). Availability KPI + ranking + variable pay if they have stock but do not activate SKU.",
 quotes: [
 "BEES and SIESA are not integrated — product could be off in BEES while they had it in inventory.",
 ],
 },
 {
 title: "Marketplace org and P&L discipline",
 detail:
 "Dedicated marketplace lead; transactions must be profit-positive; banners monetize. Regional marketplace; 2026 focus on occasions and personalized cross-sell by day/hour.",
 quotes: [
 "From the transaction we wanted profit or vote — we do not lose money per transaction.",
 "Personalized cross-sell — weekday six-pack vs Doritos at night.",
 ],
 },
 {
 title: "Competitive landscape",
 detail: "Rappi, Mercado Libre entering CPG, Didi mobility scale > Rappi in Colombia.",
 quotes: ["Mercado Libre just entered consumer goods in the app."],
 },
 ],
 },
 {
 id: "operations",
 label: "3. Operations, stockout & expansion",
 summary: "Power BI stockout, Community POC strategy, coverage overlap, Torre de Control.",
 topics: [
 {
 title: "Stockout tooling — category vs SKU ask",
 detail:
 "Power BI shows stockout by category; allies moving to 90%+ minimum; extended SKU portfolio tool for allies. Want platform stockout line per SKU at 90% threshold.",
 quotes: [
 "Ideal would be stockout per SKU in the platform, not only category.",
 "If they are below 90% we pressure them — allies now have orders so we can require it.",
 ],
 },
 {
 title: "Own stores vs Community POC",
 detail:
 "~80% orders still own despite more aliado stores. Different paypoints, ERP reality (only own stores on SIESA; allies use many ERPs). Top Tiendas helps allies without company data access.",
 quotes: [
 "Community POC gives capillarity but we feed them orders from own stores.",
 "Brazil team has every database — Community POC does not; Luana bridges pressure.",
 ],
 },
 {
 title: "Coverage when a store turns off",
 detail:
 "Cannot auto-cover full zone when Community POP off — mid-zone fallback. 3–4 stores per consumer in dense areas. Torre de Control watches map weekends; WhatsApp red alert for unique-zone off stores.",
 quotes: [
 "If this store fails you only reach halfway — Community POP must be very thoughtful.",
 "We need an alarm when stores turn off — not depend on someone watching the map.",
 ],
 },
 ],
 },
 {
 id: "rewards-product",
 label: "4. Rewards, CRM & product asks",
 summary: "Club TaDa, tiers, personalization, integrations.",
 topics: [
 {
 title: "Club TaDa staffing and missions",
 detail:
 "Program manager left; replacement injured — months without owner. Lovers count down; missions automation postponed; manual missions continue.",
 quotes: [
 "We were about a month without the Club TaDa person — missions launch postponed.",
 ],
 },
 {
 title: "For You / algorithmic shelves",
 detail:
 "Colombia wants For You fully algorithmic; today manual same showcase for everyone. SEM locked to one hero SKU; sampling flexible but ops prefers store-delivered samples.",
 quotes: [
 "Our dream is For You driven completely by algorithms — not one person organizing the showcase.",
 "We cannot rotate the thermal bag hero — SEM is tied to one SKU layout.",
 ],
 },
 {
 title: "Billing API & order export",
 detail:
 "Mandatory e-invoicing; order data lost after accept — need CSV/API for 1:1 billing; discounts manual → control risk. Priority trade-off vs many ERP integrations (Zé lesson).",
 quotes: [
 "When the store accepts the order the user information is lost for billing.",
 "We need an API — if you want to connect, here is the documentation.",
 ],
 },
 ],
 },
 ] satisfies ColombiaMeetingSection[],
};
