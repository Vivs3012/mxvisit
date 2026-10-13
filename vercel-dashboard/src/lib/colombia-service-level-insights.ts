import type { ColombiaInsight } from "./colombia-insights";

/** Sep 13, 2026 PM — Service Level session insights */
export const COLOMBIA_SL_INSIGHTS: ColombiaInsight[] = [
 {
 id: "co-sl-routing-multi-assign",
 priority: "Critical",
 pillar: "Operations",
 title: "Peak routing is still manual — one order per courier",
 detail:
 "At the busiest stores a person at the door decides which courier takes each order, one at a time. On a Saturday peak a dark store can have around 80 couriers active, while competitors assign several orders per rider with an automatic route. When the app shows couriers who are not really working, or crashes on cheap phones, dispatch becomes guesswork — the same reliability problems seen in Mexico and Peru store visits.",
 productHook: "Pilot: allow 2–3 orders per courier and automatic routing on the highest-volume own store.",
 globalRank: 1,
 quotes: [
 "We want two or three orders at once — today it is one by one.",
 "The route is manual — humanly impossible at peak.",
 ],
 },
 {
 id: "co-sl-kpi-window",
 priority: "Critical",
 pillar: "Product",
 title: "Seller KPI screen only shows the last seven days",
 detail:
 "Store managers cannot see yesterday alone or compare this Saturday with the previous Saturday. They only get a rolling seven-day window, which is too slow for daily fixes. Teams talk about Perfect Order all day, but that metric is not shown as clearly as other numbers on the seller home screen.",
 productHook: "Add day and week comparisons on the seller home; show Perfect Order next to other KPIs.",
 globalRank: 7,
 quotes: [
 "We can only see the last seven days — not what happened yesterday.",
 "Compare last Saturday with the previous Saturday.",
 ],
 },
 {
 id: "co-sl-braze-ab",
 priority: "High",
 pillar: "Operations",
 title: "Braze test — weekly message tailored to each store (Bogotá 38+38)",
 detail:
 "Colombia is testing a weekly in-app message for half of 76 Bogotá stores: top-selling SKUs, next week’s football event, how many couriers they will need, and a summary of customer comments. The other half gets no message. After four weeks they will compare results to see if this works better than ops-only outreach on WhatsApp.",
 productHook: "If the test wins, move the format into the seller notification center.",
 globalRank: 20,
 quotes: [
 "38 stores get communication, 38 do not — group A versus B.",
 "Personalized communication per seller — not only when metrics go bad.",
 ],
 },
 {
 id: "co-sl-ally-comms",
 priority: "High",
 pillar: "Expansion",
 title: "Community POC allies need commercial updates in the app, not only WhatsApp",
 detail:
 "When promos or commercial plans change, ops today uses WhatsApp broadcast groups to reach allied stores. Allies cannot easily reopen old messages. The team wants the same information inside the seller app — opening hours compliance, promos, and positive feedback — with history they can read again later.",
 productHook: "Use Braze (or notification center) with separate content for allied stores vs own stores.",
 globalRank: 47,
 quotes: [
 "We send commercial events to allies through WhatsApp groups.",
 "Good to congratulate stores too — not only when indicators go wrong.",
 ],
 },
 {
 id: "co-sl-ai-coach",
 priority: "High",
 pillar: "Product",
 title: "SLA feedback should explain incentives, not only send a bad score",
 detail:
 "Today SLA problems are often explained by email to Community POC stores. Managers want an in-app coach that says what went wrong and what to do — for example, that improving SLA by two points can mean more orders and more incentive pay. That is easier to act on than a raw red metric.",
 productHook: "Start with one KPI per day on the seller home: plain-language explanation plus one suggested action.",
 globalRank: 16,
 quotes: [
 "Yesterday your SLA was not good — what do I do?",
 "Grow two points in SLA — you gain more orders and incentive.",
 ],
 },
 {
 id: "co-sl-consumer-bot",
 priority: "Critical",
 pillar: "Product",
 title: "After purchase, consumers need simple options — not endless phone calls",
 detail:
 "Colombia is building a post-purchase help flow (similar to Amira) with fixed options: how long until delivery, how to send instructions, and so on. Messages go to the courier or the store depending on the case. Reference from Zé Delivery: a large share of lost orders came from coordination problems between customer, store, and courier — not from product quality.",
 productHook: "Ship a small set of predefined reasons first; editing the full order on the map can come later.",
 globalRank: 6,
 quotes: [
 "Predefined options — how much longer, delivery instructions.",
 "~30% CU cancellation plus ~10% consumer from coordination.",
 ],
 },
 {
 id: "co-sl-bees-cieza",
 priority: "Critical",
 pillar: "Operations",
 title: "BEES and CIEZA (store ERP) do not match — billing and controls break",
 detail:
 "CIEZA is the ERP used in own stores for invoicing. What is sold through BEES (seller app) often does not line up with what is booked in CIEZA: manual sales entry, many discount types, and several price lists per zone. Finance reported about 46% of sales accumulation errors and roughly USD 326k at risk; six of seven key internal controls are failing until systems are integrated.",
 productHook: "Export order lines when the store accepts the order; API so discounts in BEES appear correctly for billing.",
 globalRank: 51,
 quotes: [
 "What bills in BEES does not match CIEZA.",
 "Almost six of seven key controls failing without integration.",
 ],
 },
 {
 id: "co-sl-revenue-rec",
 priority: "High",
 pillar: "Operations",
 title: "Product leaves the store days before it is invoiced",
 detail:
 "A courier can deliver on Friday while the store only registers the sale in CIEZA on Monday. Physically the product is gone, but finance still shows it in stock. External audit visits (SOX) found mismatches on every SKU they sampled at one store. This is the finance side of the same problem as “SKU off in BEES but product on the shelf” from the morning session: ops and finance need one timeline per SKU.",
 productHook: "Send fulfillment events from BEES to finance in near real time instead of reconciling by hand each week.",
 globalRank: 44,
 quotes: [
 "Product already left inventory but recognition happens days later.",
 "Carrera 91 — four SKUs sampled, all with differences.",
 ],
 },
 {
 id: "co-sl-stock-cart",
 priority: "High",
 pillar: "Commercial",
 title: "Stock compliance is the main KPI card — forecast still wrong",
 detail:
 "The seller home highlights whether the store is fulfilling the agreed product list (stock compliance). The demand forecast in the first version is not trusted yet. Teams still want a per-SKU stockout indicator in BEES, not only a category score in Power BI — especially before doubling the number of allied stores.",
 productHook: "Fix forecast and show SKU-level stockout on the seller home before expanding Community POC.",
 globalRank: 49,
 quotes: [
 "Stock compliance is our main KPI card for stores.",
 "Forecast first version is not correct.",
 ],
 },
 {
 id: "co-sl-capacity-sla",
 priority: "Medium",
 pillar: "Operations",
 title: "Stores need an early warning when there are not enough couriers",
 detail:
 "Ops calculates how many couriers are needed by dividing expected orders by 1.8–2 in large zones or by 3 in small zones — today in spreadsheets. If the store is short on couriers before peak, SLA will fail even if the team prepares orders quickly. The platform should warn the store before the rush, not only show a red SLA afterward.",
 productHook: "Show a capacity alert on the seller home before the peak window.",
 globalRank: 5,
 quotes: [
 "If you are short courier capacity, SLA breaks — tell the store early.",
 "Orders divided by 1.8 or 2 for coverage — we do this in Excel.",
 ],
 },
];
