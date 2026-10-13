export const COMPETITORS_META = {
 title: "Delivery benchmark — Mexico, Peru & Colombia",
 cutDate: "Sep 9, 2026",
 scope: "Rappi · PedidosYa · Uber Eats",
 subtitle:
 "Competitive research to guide TaDa product benchmarking: country map, consumer, operations, 2026 innovations and 2027 watchlist.",
};

export const COMPETITORS_EXECUTIVE_SUMMARY = {
 headline:
 "Rappi is the only cross-country benchmark across all three markets; direct competition shifts by country — Uber Eats in Mexico, PedidosYa in Peru, Rappi with no active rival from this group in Colombia.",
 paragraphs: [
 "In 2026, Rappi focused on quick commerce, AI, coverage and logistics efficiency. PedidosYa in Peru prioritized densification, non-food and partner fintech. Uber Eats in Mexico expanded retail, ads, last-mile and mobility.",
 "For 2027, the corporate event with a public date is Uber's bid for Delivery Hero (closing expected in H2), including PedidosYa Peru — until closing, companies remain independent.",
 "For TaDa: compare by mission and stakeholder, not isolated screens. Peru is the highest-risk and highest-opportunity market; Mexico requires testing the same mission in superapp vs mobility ecosystem.",
 ],
 stats: [
 { label: "Platforms", value: "3" },
 { label: "Countries covered", value: "3" },
 { label: "Sources", value: "39" },
 { label: "Horizon", value: "2026–27" },
 ],
};

export type CompetitorPlatform = "Rappi" | "PedidosYa" | "Uber Eats";

export type PlanConfidence = "Confirmed" | "Announced direction" | "Inference";

export const COMPETITIVE_MAP: {
 platform: CompetitorPlatform;
 mexico: string;
 peru: string;
 colombia: string;
 reading: string;
}[] = [
 {
 platform: "Rappi",
 mexico: "Active",
 peru: "Active",
 colombia: "Active",
 reading: "Only cross-country benchmark; multi-vertical superapp",
 },
 {
 platform: "PedidosYa",
 mexico: "Not active",
 peru: "Active",
 colombia: "Not active",
 reading: "Key benchmark for density, partners and fintech in Peru",
 },
 {
 platform: "Uber Eats",
 mexico: "Active",
 peru: "Exited 2020",
 colombia: "Exited 2020",
 reading: "Mobility + delivery ecosystem in Mexico only",
 },
];

export const DECISION_INSIGHTS = [
 {
 title: "Consumer breadth",
 platform: "Rappi",
 insight:
 "Most complete reference: restaurants, grocery, pharmacy, convenience, beverages, pets, gifts, errands, travel, payments and subscription in one ecosystem. Social discovery, personalization and AI search.",
 implication: "TaDa should map which verticals are core vs adjacent before copying breadth.",
 },
 {
 title: "Merchant & monetization",
 platform: "Rappi + Uber",
 insight:
 "Uber combined ads, offers, recommendations and reporting; Rappi added AI catalog creation and a partner portal with metrics and campaigns.",
 implication: "Benchmark time to first order, ROAS and catalog completeness — not features alone.",
 },
 {
 title: "High velocity",
 platform: "Rappi Turbo",
 insight:
 "Consistent reference across all three countries. Mexico: Chedraui alliance (<10 min, 8 cities). Peru: electrified Turbo stations with sustainability and financing.",
 implication: "Separate speed from reliability — measure P50/P90 ETA and failure compensation.",
 },
 {
 title: "2027 risk — Peru",
 platform: "Uber + Delivery Hero",
 insight:
 "Delivery Hero acquisition could connect mobility, subscription, merchant ads and logistics to the PedidosYa base. No announcement promises brand or app migration.",
 implication: "Active watchlist; do not treat integration as certain in TaDa roadmap.",
 },
];

export const PRODUCT_ARCHITECTURE: {
 platform: CompetitorPlatform;
 consumer: string;
 courier: string;
 merchant: string;
 logistics: string;
 optimizes: string;
}[] = [
 {
 platform: "Rappi",
 consumer: "Rappi; Turbo; Pro; Travel; payments and adjacent services",
 courier: "Soy Rappi — earnings, goals, benefits and support",
 merchant: "Partners Portal and Partners App; campaigns, metrics, catalog and AI",
 logistics: "Turbo and dark stores; demand models; contact center; retail integrations",
 optimizes: "Multi-vertical frequency and cross-sell — more navigation and support complexity.",
 },
 {
 platform: "PedidosYa",
 consumer: "PedidosYa and Plus subscription",
 courier: "PedidosYa Rider; shifts, offers, earnings, help and tips",
 merchant: "Partner Center; operations, campaigns, reports and credit",
 logistics: "PedidosYa Envíos; Markets; third-party fleet; local network",
 optimizes: "Density and frequency in served areas — not opening new districts.",
 },
 {
 platform: "Uber Eats",
 consumer: "Uber Eats and Uber One; growing integration with Uber app",
 courier: "Uber Driver for rides and deliveries per eligibility",
 merchant: "Uber Eats Orders and Merchant Portal; ads, offers and Webshop",
 logistics: "Uber Direct; dispatch; retail and grocery; data in Uber ecosystem",
 optimizes: "Shared mobility + identity + payment — clarity between use occasions.",
 },
];

export const CONSUMER_BENCHMARK = [
 { capability: "Catalog breadth", rappi: "Food, retail, quick commerce and adjacent services", pedidosya: "Strong in food; expanding grocery, pharmacy and retail", uber: "Restaurants; expanding convenience, grocery and retail" },
 { capability: "Discovery", rappi: "Filters, personalization, offers, social signals and AI search", pedidosya: "Filters, ratings, favorites, reorder and personalization", uber: "Search, recommendations, offers; events and reservations" },
 { capability: "Basket & checkout", rappi: "Multi-vertical purchase, payments and subscription benefits", pedidosya: "Scheduling, reorder and multiple payment methods", uber: "Pickup, group orders, subscription and basket assistance" },
 { capability: "Service promise", rappi: "Turbo and time guarantee in eligible zones", pedidosya: "Tracking and help; focus on operational density", uber: "Tracking, pickup and mobility integration" },
 { capability: "Loyalty", rappi: "Rappi Pro with benefit coalition", pedidosya: "PedidosYa Plus and bank promotions", uber: "Uber One — delivery savings and ride credits" },
];

export const OPS_BENCHMARK = [
 { block: "Couriers", rappi: "Flexibility, per-order earnings, 100% tips, goals, insurance", pedidosya: "Rider with shifts, accept, payment, help and tips", uber: "Uber Driver combines mobility and delivery" },
 { block: "Merchant core", rappi: "Orders, menu, hours, metrics, ratings and RappiScore", pedidosya: "Menu, stock, prices, hours, reports and support", uber: "Current and scheduled orders, prep, stock and courier contact" },
 { block: "Merchant growth", rappi: "Campaigns, recommendations and AI item creation", pedidosya: "CPC ads, discounts, acquisition and credit", uber: "Ads, offers, segmentation, Webshop and consented data" },
 { block: "Fulfillment", rappi: "Turbo, dark stores, picking, forecasting and integration", pedidosya: "Markets and delivery network; density focus", uber: "Shared dispatch and Uber Direct for owned channels" },
 { block: "Support", rappi: "Post-order self-service and AI contact center", pedidosya: "Help center, incidents and reports", uber: "Courier contact, prep adjustments and merchant support" },
 { block: "Finance", rappi: "Payments, RappiCard and credit per market", pedidosya: "Merchant credit and vehicle financing", uber: "R2 credit embedded in app (MX, CO, PE)" },
];

export const COUNTRY_ANALYSIS = [
 {
 country: "Mexico",
 matchup: "Rappi vs Uber Eats",
 rappi: "Broader superapp; aggressive Turbo with Chedraui (<10 min, 8 cities, 5k+ products, 80+ dark stores). Credit campaigns when SLA fails.",
 competitor: "OXXO in 70 cities; World Cup Pickup, groups and OpenTable; 115+ cities, 60k+ partners. Uber Direct + EnviaTodo.",
 tadaImplication:
 "Competition is not restaurants only — test the same mission: emergency, group, scheduled, pickup, post-delivery and real subscription savings.",
 },
 {
 country: "Peru",
 matchup: "PedidosYa vs Rappi",
 rappi: "Superapp, expansion (Tacna Mar/2026), electric Turbo with Mobi (500 slots, -40% daily cost in pilot).",
 competitor: "100 districts, 11 provinces; target 30%+ orders/revenue, 14.5k stores, 10k couriers; non-food 15%→20–25%.",
 tadaImplication:
 "Best market to compare focused strategy vs superapp. Uber/Delivery Hero watchlist may shift the fight in 2027.",
 },
 {
 country: "Colombia",
 matchup: "Rappi (no active rival from this group)",
 rappi: "Rappi's largest market; +30% growth, 50k merchants, 70k couriers, 10M opens/week. Non-food mix 45%. Medellín: 400k orders/week, Turbo <15 min in 70%+.",
 competitor: "Uber Eats exited in 2020.",
 tadaImplication:
 "External benchmark + evaluation by city/segment. Test quality outside dense zones.",
 },
];

export const INNOVATIONS_2026 = [
 { company: "Rappi", scope: "Regional", innovation: "Redesigned post-purchase (address, tracking, support)", impact: "Reduces uncertainty and support cost", status: "Available 2026" },
 { company: "Rappi", scope: "Regional", innovation: "AI merchant catalog (image/PDF)", impact: "Faster activation", status: "May 2026" },
 { company: "Rappi", scope: "Mexico", innovation: "Chedraui Turbo <10 min", impact: "Quick commerce at store price", status: "Apr 2026" },
 { company: "Rappi", scope: "Peru", innovation: "Electric Turbo ecosystem", impact: "Variable cost and credit", status: "Feb 2026" },
 { company: "PedidosYa", scope: "Peru", innovation: "Densification and non-food", impact: "Frequency beyond restaurants", status: "2026 targets" },
 { company: "PedidosYa", scope: "Peru", innovation: "Courier vehicle credit + fintech", impact: "Capacity and liquidity", status: "Announced" },
 { company: "Uber Eats", scope: "Mexico", innovation: "OXXO, Pickup, groups, OpenTable", impact: "More consumption occasions", status: "2026" },
 { company: "Uber", scope: "Mexico", innovation: "Uber Direct + EnviaTodo", impact: "Network beyond marketplace", status: "Apr 2026" },
 { company: "Uber Eats", scope: "MX portal", innovation: "Cart Assistant for retail", impact: "Reduces basket effort", status: "Availability varies" },
 { company: "Uber", scope: "Regional", innovation: "R2 credit in app", impact: "Courier/driver retention", status: "MX, CO, PE" },
];

export const PLAN_2027: {
 theme: string;
 entity: string;
 evidence: string;
 confidence: PlanConfidence;
 implication: string;
}[] = [
 { theme: "Delivery Hero acquisition", entity: "Uber + PedidosYa Peru", evidence: "Closing expected H2 2027", confidence: "Confirmed", implication: "May connect mobility, subscription, ads and delivery; brand and app unknown" },
 { theme: "Partner fintech", entity: "PedidosYa Peru", evidence: "Payments late 2026 and 2027", confidence: "Announced direction", implication: "Merchant/courier retention; risk controls" },
 { theme: "AI & automation", entity: "Rappi regional", evidence: "Recommendation, support, forecasting, store", confidence: "Inference", implication: "Next layer with quality control" },
 { theme: "Integrated platform", entity: "Uber global", evidence: "Unified search mobility + delivery + retail", confidence: "Announced direction", implication: "If DH closes, denser economic logic in Peru" },
];

export const REGULATION = [
 {
 country: "Mexico",
 rule: "IMSS for platform workers",
 detail: "1.35M people registered (Jan/2026). Registration from day 1, monthly contributions, receipts.",
 productImpact: "Tax registration, discount explanation, reconciliation without blocking activation.",
 },
 {
 country: "Colombia",
 rule: "Law 2466/2025",
 detail: "Identity, contributions, effective hours, automated decision transparency, human review.",
 productImpact: "Onboarding, earnings screen, dispatch explainability, appeals and human support.",
 },
 {
 country: "Peru",
 rule: "DL 1729 (Feb 2026)",
 detail: "Protection against dark patterns; accessible complaint channels.",
 productImpact: "Final price, consent, cancellation, promotions and support availability.",
 },
];

export const TADA_RECOMMENDATIONS = {
 consumer: [
 "Compare total price and predictability: item, fees, net discount, ETA and compensation for the same basket/distance.",
 "Test discovery across 4 occasions: immediate meal, urgent purchase, planned basket and group order.",
 "Evaluate subscription by realized value — savings after fees, incremental frequency and churn.",
 "Include failure recovery: missing item, wrong address, delay, refund.",
 ],
 operations: [
 "Time to merchant first order, catalog completeness, stockouts and price update latency.",
 "Economic quality of ads: ROAS, cannibalization and credit transparency.",
 "Courier compliance as a feature: registration, benefits, work hours and appeals.",
 "Separate speed from reliability: P50/P90 ETA, cancellation, reassignment.",
 "Embedded finance by outcome: approval, churn, availability and default rates.",
 ],
};

export const KPI_MATRIX = [
 { stakeholder: "Consumer", acquisition: "Search → basket; signup → 1st order", engagement: "Orders/month; 30d repeat; cross-use", reliability: "ETA error; cancellation; refund time" },
 { stakeholder: "Merchant", acquisition: "Days to publish; active items; POS", engagement: "Incremental orders; margin; ROAS", reliability: "Stockout; prep delay; disputes" },
 { stakeholder: "Courier", acquisition: "Approval; 1st delivery; zone activation", engagement: "Earnings/hour; utilization; retention", reliability: "Suspensions; appeals; discount clarity" },
 { stakeholder: "Network", acquisition: "Coverage by category/hour", engagement: "Orders/store; utilization; cost/order", reliability: "P50/P90; reassignment; fraud; compliance" },
];

export const WATCHLIST_2027 = [
 "Uber/Delivery Hero bid: approvals, closing and decisions on PedidosYa Peru.",
 "Rappi: AI by country, Turbo expansion, unit economics and Rappi Pro evolution.",
 "PedidosYa Peru: vehicle credit, payments, non-food share and 2026 targets.",
 "Uber Mexico: Cart Assistant, unified search, international Uber One and Uber Direct.",
 "Regulation: CO rules, MX continuity (IMSS) and PE implementation (DL 1729).",
];

export const COMPETITORS_SOURCES = [
 { id: 1, label: "PedidosYa — available countries", note: "Regional presence" },
 { id: 2, label: "App Store Peru — Rappi", note: "Categories and version history" },
 { id: 3, label: "App Store Peru — PedidosYa", note: "Consumer app features" },
 { id: 4, label: "Uber Newsroom — Peru exit 2020", note: "" },
 { id: 5, label: "Uber Newsroom — Colombia exit 2020", note: "" },
 { id: 11, label: "El Comercio — PedidosYa Peru Mar/2026", note: "Local targets and 2027 direction" },
 { id: 16, label: "El Economista — Chedraui + Rappi Turbo", note: "Apr 2026" },
 { id: 24, label: "Uber Newsroom — OXXO in Mexico", note: "Jan 2026" },
 { id: 32, label: "Uber IR — Delivery Hero bid", note: "Jul 2026" },
 { id: 35, label: "IMSS Mexico — platform workers", note: "Regulation" },
 { id: 38, label: "El Peruano — DL 1729", note: "Feb 2026" },
];
