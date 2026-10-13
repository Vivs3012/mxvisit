/** Sep 13, 2026 PM — Colombia 1YP · Service Level (seller, courier, Braze, finance controls). */

import type { MeetingTopic } from "./peru-context-meeting";

export type ColombiaSlMeetingSection = {
 id: string;
 label: string;
 summary: string;
 topics: MeetingTopic[];
};

export const CO_SL_MEETING_META = {
 date: "13/09/2026",
 title: "1YP TaDa — Service Level",
 location: "Bavaria · Colombia",
 participants:
 "Colombia ops & service level (Miguel, store KPIs, finance controls), Brazil product (Tiago, Vivian, Karen, Canelas) · follow-on to AM product intro same day.",
 format:
 "Deep dive on seller/courier experience, KPI home, routing & multi-assign, Braze/notification center pilot, consumer post-purchase bot, and finance/ERP (BEES–CIEZA/SIESA) control risks.",
 transcriptPaths: ["/colombia/service-level-sep-13-bavaria.txt"],
};

export const CO_SL_MEETING = {
 executiveSummary: {
 headline:
 "The afternoon session paired consumer post-purchase fixes with seller peak ops: coordination losses drive cancellations; stores need daily KPIs and in-app comms; couriers still dispatch by hand — and BEES must match CIEZA for billing.",
 paragraphs: [
 "Consumer: a post-purchase help flow with fixed options (how long until delivery, delivery instructions) routes to courier or store. Zé Delivery cited that many lost orders came from misalignment between customer, store, and courier — not product quality.",
 "Seller KPI home and coaching: stores want to see yesterday and compare Saturday with the previous Saturday, not only a rolling seven-day window. The main card is stock compliance, but the demand forecast is not trusted yet. Teams want an in-app coach that explains SLA in incentive terms (more orders, more bonus), not only a red number by email.",
 "Braze and allies: a Bogotá test sends half the stores a weekly personalized summary (top SKUs, football week, how many couriers are needed, customer comments); the other half gets nothing. The goal is to replace WhatsApp blast groups for allies and to show promos on a calendar the store can see.",
 "Seller and courier peak: automatic order accept improved metrics, but at peak someone at the door still assigns one order per rider; a dark store can have around 80 couriers on a Saturday. Competitors use automatic routes with several orders per rider. Ghost riders on the map and crashes on low-end phones repeat what Mexico and Peru already reported.",
 "Finance: electronic invoicing is mandatory and about 80% of volume is own stores. Without BEES–CIEZA integration, stores book sales late, discounts do not match, and auditors found gaps on every SKU they sampled at one store. Finance cited about 46% accumulation errors and roughly USD 326k at risk; six of seven key internal controls fail until systems integrate.",
 ],
 takeaways: [
 { label: "Routing", text: "Move from human dispatcher to multi-assign + route algorithm — peak dark store ~80 riders." },
 { label: "KPIs", text: "Daily + comparable windows; Perfect Order visible; capacity-aware SLA explanations." },
 { label: "Braze", text: "Prove personalized seller comms vs control; Community POC commercial plan in-app." },
 { label: "Finance", text: "Billing export/API + discount alignment — controls block scale more than feature count." },
 ],
 },
 snapshot: [
 { label: "Auto-accept impact", value: "−1.34pp", detail: "Expected orders; +0.08pp free rate" },
 { label: "Peak couriers", value: "~80", detail: "Dark store Saturday peak; ~20–25 concurrent typical" },
 { label: "KPI window pain", value: "7 days", detail: "Want yesterday + Sat vs Sat compare" },
 { label: "Braze A/B", value: "38+38", detail: "Bogotá stores · 4-week test" },
 { label: "Coordination loss", value: "~40%", detail: "Zé-style cancel from CU + consumer (cited)" },
 { label: "Sales accumulation errors", value: "~46%", detail: "Wrong SKU manual in-store sale registration in CIEZA" },
 { label: "Control VAR", value: "~$326k", detail: "Inventory / recognition timing" },
 { label: "Own-store billing", value: "~80%", detail: "E-invoicing compliance pressure" },
 ],
 sections: [
 {
 id: "seller-courier",
 label: "1. Seller & courier reliability",
 summary: "Accept flow, courier app, multi-order assign, manual routing vs algorithm.",
 topics: [
 {
 title: "Auto-accept and peak load",
 detail:
 "Toggle auto-accept all orders reduced expected-order gap and improved free rate; optional print remains. Peak still breaks on courier visibility and assignment.",
 quotes: [
 "Reduction of 1.34 of expected orders and increase of 0.08 for the free rate.",
 "The second most viewed screen in seller is directly for couriers.",
 ],
 },
 {
 title: "One order per courier → multi-assign",
 detail:
 "Stores want 2–3 orders per courier with map route; today manual leader assigns at door. Algorithm should optimize like food delivery peers — humanly impossible at Pico peak.",
 quotes: [
 "We want the courier to accept two or three orders at once.",
 "Today the route is manual — the algorithm should make the best route.",
 ],
 },
 {
 title: "Courier app quality & device class",
 detail:
 "Stale couriers not removed, Peru route not reaching courier app, crashes on low-end Android.",
 quotes: [
 "Not only couriers not deleted — they also cannot find the route in the courier app.",
 "Chinese phones crash the courier app — same as consumer app pain.",
 ],
 },
 ],
 },
 {
 id: "kpis",
 label: "2. KPI home, forecast & coaching",
 summary: "Seven-day lock, comparisons, stock cart, AI explanations, gamification.",
 topics: [
 {
 title: "Date filters and comparisons",
 detail:
 "Visits asked for daily view and last-Saturday vs prior-Saturday — rolling seven days blocks fast ops fixes.",
 quotes: [
 "We cannot see data by day — only the last seven days.",
 "Compare last Saturday with the Saturday before — not Thursday vs Friday volume.",
 ],
 },
 {
 title: "Stock fulfillment cart & forecast v1",
 detail:
 "Stock compliance is the main store KPI card; order forecast in first version is not trusted — complements global rank #49 SKU stockout ask.",
 quotes: [
 "How do we show stock compliance — our main KPI card for stores.",
 "The first version of forecast is not correct.",
 ],
 },
 {
 title: "AI coach in incentive language",
 detail:
 "Today SLA feedback goes by email to Community POC; want in-app Box explaining what to fix and tying +2pp SLA to more orders/incentive.",
 quotes: [
 "Yesterday your SLA was not good — how do I fix it?",
 "If you grow two points in SLA you gain more orders and operational incentive.",
 ],
 },
 ],
 },
 {
 id: "braze",
 label: "3. Braze, notification center & calendar",
 summary: "A/B seller digest, Community POC comms, promo calendar as source of truth.",
 topics: [
 {
 title: "Bogotá 38+38 Braze experiment",
 detail:
 "Weekly personalized message: top sellers SKUs, next-week football, courier count needed, customer comment summary — measure group A vs B for one month.",
 quotes: [
 "38 stores receive communication, 38 do not — we compare metrics group A versus B.",
 "If it works we bring this inside the platform.",
 ],
 },
 {
 title: "Community POC commercial comms",
 detail:
 "Commercial events today go via WhatsApp diffusion groups; want durable in-app messages allies can reopen — overlaps AM session ally model.",
 quotes: [
 "We have to send communications directly to allies — it becomes WhatsApp groups.",
 "If it is in seller they can reopen the previous message.",
 ],
 },
 {
 title: "Calendar vs notification reminders",
 detail:
 "Future state: monthly commercial calendar in product; push notifications only remind — not the only place promos live.",
 quotes: [
 "Notifications should be a reminder of what is on the calendar — not the source.",
 "We need monthly planning visible to the store, not only ops decks.",
 ],
 },
 ],
 },
 {
 id: "consumer-cx",
 label: "4. Consumer coordination & order changes",
 summary: "Post-purchase bot, store as first CX, long-horizon order edits.",
 topics: [
 {
 title: "Post-purchase Amira bot",
 detail:
 "Predefined options on post-purchase (ETA, instructions) route to courier or store — maps reasons for prioritization.",
 quotes: [
 "On post-purchase there is Amira help with delivery contact — opens this bot.",
 "This is first version — a year of work to be 100% ready.",
 ],
 },
 {
 title: "Store as first resolver",
 detail:
 "Push resolution to store — not only Aguascalientes CX; coordination cancellations are large share of lost orders.",
 quotes: [
 "The first CX of the order is the store where problems get resolved.",
 "We had ~30% CU cancellation plus ~10% consumer — orders we lose.",
 ],
 },
 ],
 },
 {
 id: "finance",
 label: "5. BEES · CIEZA · controls",
 summary: "Integration blocked, e-invoicing, discounts, SOX inventory, API scope.",
 topics: [
 {
 title: "BEES vs CIEZA mismatch",
 detail:
 "Manual billing after accept; multiple price lists; discounts (nominal, coupons, up to 100k COP) do not match BEES lines — Power BI alarms after the fact.",
 quotes: [
 "What enters BEES does not match CIEZA — seven price lists per zone.",
 "We need to open discounts for stores — billing does not match CIEZA.",
 ],
 },
 {
 title: "Revenue recognition & inventory counts",
 detail:
 "Product leaves store before invoiced; physical counts at Carrera 91 failed on 4/4 SKUs; SOX scope expanding to E stores like Mexico and Peru.",
 quotes: [
 "Product left inventory but recognition happens days later when they manual in-store sale registration.",
 "Four SKUs sampled — all with differences.",
 ],
 },
 {
 title: "API scope & ownership",
 detail:
 "Need fulfillment + billing export API standard for all stores — not inventory-only; discovery with BEES platform team on who owns BEES/SAP path.",
 quotes: [
 "API for fulfillment — not inventory-only — should be standard.",
 "We need clarity who owns integration — Colombia prioritizes but platform must engage.",
 ],
 },
 ],
 },
 ] satisfies ColombiaSlMeetingSection[],
};
