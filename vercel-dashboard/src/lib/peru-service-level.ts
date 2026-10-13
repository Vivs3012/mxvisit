export type ServiceLevelPriority = "Critical" | "High" | "Medium" | "Low";

export type ServiceLevelPain = {
 id: string;
 title: string;
 priority: ServiceLevelPriority;
 category: string;
 summary: string;
 workaround?: string;
 productResponse?: string;
 metrics?: string[];
 quotes?: string[];
};

export type ServiceLevelFeature = {
 name: string;
 status: "live" | "beta" | "planned" | "discovery";
 pillar: "Territory" | "Inventory" | "Orders" | "Fleet" | "Cross-cutting";
 summary: string;
};

export type ServiceLevelPillar = {
 id: string;
 label: string;
 kpis: string[];
 summary: string;
};

export const PE_SERVICE_LEVEL = {
 date: "01/09/2026",
 locations: ["BeerHub", "Plaza República Torre II — Lima"],
 sessions: [
 {
 venue: "BeerHub",
 focus: "OPS + supervisors present operational pains, workarounds and priorities (23 topics).",
 },
 {
 venue: "Plaza República Torre II",
 focus: "Product presents Service Level vision, KPI pillars, shipped features and 2027 direction.",
 },
 {
 venue: "Plaza República Torre II (continued)",
 focus: "OPS continues: supervisor visibility, stock, address, invoices, combos, segmentation.",
 },
 ],
 participants:
 "Peru OPS (supervisors, Ginger, Martín/CIEX), Product (Vivian, Tiago), Admin, CX, QG — cross-functional Service Level alignment.",

 executiveSummary: {
 headline:
 "Sep 1 workshops aligned OPS pains with the product Service Level vision: ecosystem communication, Top Tiendas storytelling, and inventory as the next big bet.",
 paragraphs: [
 "Two half-day sessions at BeerHub and Plaza República framed the same goal: empower the full ecosystem (seller, courier, consumer, CX) to raise service level. OPS brought 23 operational topics — returns traceability, supervisor-store comms, store onboarding, discount admin load, order sounds, real-time visibility, stock edits, wrong-address cancellations, invoices and combo SKUs. Product responded with pillars (Territory, Inventory, Orders, Fleet), KPI stack (Perfect Order, Fill Rate, Demand Coverage, Stockout) and a roadmap already in motion.",
 "The biggest near-term bet is Ecosystem Communication: WhatsApp-based contact Seller↔Consumer and Seller↔Courier launching within weeks (predefined messages, 5-minute timers, event tracking) — not the final chat, but a learning step toward in-app messaging. Braze notification center will centralize supervisor→store comms with open/click metrics. Top Tiendas ranking (gold/silver/bronze, rolling 7 days, ≥150 orders/week) needs to move from Monday Excel/WhatsApp to in-platform KPI storytelling — with demand coverage replacing manipulable availability.",
 "Peru grew orders ~36% Jan–Jul vs prior year with stable KPIs — rare at this scale. Delivery time averages ~21 min; SLA ~96%. Wrong address drives ~18% of cancellations. Inventory real-time visibility is the strategic gap: without it, partial order recovery, stockout prevention and supervisor dashboards stay reactive (Power BI + WhatsApp). Delivery proof code and quantitative picker for SKUs are ready or in discovery across countries.",
 ],
 stats: [
 { label: "Order growth (Jan–Jul)", value: "+35.9%", detail: "2025 vs same period prior year" },
 { label: "SLA", value: "96.4%", detail: "Peru current · delivery ~21 min avg" },
 { label: "Wrong-address cancels", value: "~18%", detail: "Courier + consumer combined" },
 { label: "Return coupon deflection", value: "~40%", detail: "Small-claim tickets no longer escalated to stores" },
 { label: "Store open/close ratio", value: "~20%", detail: "POCs that open then close within ~3–4 months" },
 { label: "Features shipped (12 mo)", value: "17", detail: "Seller + Courier service-level features" },
 { label: "Courier cancel reduction", value: "−30%", detail: "Mexico pilot: courier↔consumer comms" },
 { label: "Topics covered", value: "23", detail: "OPS pain inventory across both sessions" },
 ],
 },

 pillars: [
 {
 id: "territory",
 label: "Territory",
 kpis: ["Demand coverage", "Adaptable coverage"],
 summary:
 "Programmable and eventually algorithmic polygons — not the same coverage at noon vs 2 a.m. Today manual/programmable; future: real-time adaptation by demand vs SLA trade-off.",
 },
 {
 id: "inventory",
 label: "Inventory",
 kpis: ["Stockout", "Fill rate"],
 summary:
 "Identified as the weakest pillar. Real-time stock at store level would eliminate most stockout cancellations; testing Corona SKU alerts and quantity fields. No central inventory governance today.",
 },
 {
 id: "orders",
 label: "Orders",
 kpis: ["Perfect order", "Perfect service"],
 summary:
 "Order Floor (accept all), maps (2nd most-used seller page), order distribution for couriers. Partial order edit when one SKU is OOS is a top OPS ask — today full cancel only.",
 },
 {
 id: "fleet",
 label: "Fleet",
 kpis: ["SLA", "Fleet performance"],
 summary:
 "QG Financial Report peaks Sundays (weekly seller payments). Courier ranking not yet in platform. Ecosystem Communication (Seller↔Courier↔Consumer) rolling out — predefined messages first, chat later.",
 },
 ] satisfies ServiceLevelPillar[],

 upcomingFeatures: [
 {
 name: "Ecosystem Communication (WhatsApp beta)",
 status: "beta",
 pillar: "Fleet",
 summary:
 "Seller contacts consumer/courier via predefined WhatsApp templates (delay, address confirm, etc.). Courier↔consumer: timed prompts (5 min). Event tracking for future in-app chat. Launch: within weeks; city-level rollout possible.",
 },
 {
 name: "Braze notification center",
 status: "planned",
 pillar: "Cross-cutting",
 summary:
 "Bell icon for sellers: targeted comms, surveys, training, campaigns by cluster/POC. Read receipts. Replaces supervisor WhatsApp blasts. Peru OPS can get country-level access.",
 },
 {
 name: "Delivery confirmation code",
 status: "live",
 pillar: "Orders",
 summary:
 "Consumer PIN to close delivery — ready in other countries, pilot by store in Peru. 3 skips/day for courier; reduces 'delivered but not received' disputes.",
 },
 {
 name: "Address UX (Colombia test)",
 status: "beta",
 pillar: "Territory",
 summary:
 "Checkout address review + Colombia location UX (−1 pp wrong-address cancels for new users, 30% faster edit for recurrent). Peru INAP added last weekend — results pending.",
 },
 {
 name: "Top Tiendas in-platform",
 status: "discovery",
 pillar: "Cross-cutting",
 summary:
 "Move gold/silver/bronze ranking from Monday Excel/WhatsApp to seller home. Rolling 7-day window, ≥150 orders/week, by city. Demand coverage over availability; fraud-safe (no competitor names).",
 },
 {
 name: "Quantitative picker / combo SKUs",
 status: "discovery",
 pillar: "Inventory",
 summary:
 "Single parent SKU with sub-codes (6-pack, 12-pack) instead of duplicate listings. Enables two-SKU combos. Engineering discussions started; aligns Mexico, Colombia, Peru.",
 },
 {
 name: "Promo/discount admin UX",
 status: "discovery",
 pillar: "Cross-cutting",
 summary:
 "Discovery done with Ecuador, Mexico, Colombia — change one promo without re-uploading 8+ DDC templates twice weekly. Not consumer-facing but high OPS load.",
 },
 {
 name: "Supervisor operations dashboard",
 status: "discovery",
 pillar: "Cross-cutting",
 summary:
 "Real-time view: which stores have product on, SLA during rush, expired orders. Today: store-by-store check or Mixpanel for new SKUs only. Admin team capacity is the blocker.",
 },
 ] satisfies ServiceLevelFeature[],

 pains: [
 {
 id: "returns-traceability",
 title: "Returns & exchanges — manual, low traceability",
 priority: "High",
 category: "CX / Post-sale",
 summary:
 "Consumer claims → CIEX → Zendesk email to store → POC coordinates with customer. Days until evidence. Large claims (full case damaged) still need store involvement.",
 workaround:
 "Coupon compensation for small claims (crushed can, etc.) with Martín/Aguascalientes criteria — ~40% fewer tickets escalated to stores.",
 productResponse:
 "Three visions needed (consumer, seller, ops). iFood model: partial coupon fast vs full refund slow. Club TaDa points as future compensation. Seller payment deduction via credit notes (not bank transfer).",
 metrics: ["~40% ticket deflection on small claims"],
 quotes: [
 "From CIEX we coordinate with stores but we lose visibility until the store shares evidence — often days later.",
 "For a full case of 12 bottles we definitely need the store to help.",
 ],
 },
 {
 id: "supervisor-comms",
 title: "No direct supervisor → store communication channel",
 priority: "High",
 category: "Operations",
 summary:
 "Beyond WhatsApp groups — no targeted, measurable channel for supervisors to reach specific stores.",
 productResponse:
 "Braze notification center: banners, surveys, training, per-seller or cluster campaigns with open/click metrics. WebPO alerts module was the old approach.",
 quotes: ["We discussed a notification center for sellers this week — directional comms per seller."],
 },
 {
 id: "store-onboarding",
 title: "Inconsistent store service level after onboarding",
 priority: "High",
 category: "Operations",
 summary:
 "New POC learning curve varies; ~20% open then close within 3–4 months. Target maturity: 6 weeks (30–45 days accompaniment). Onboarding session ~2–3 hours but live launch needs Mon–Thu for order volume.",
 workaround:
 "Top Tiendas gold/silver/bronze segmentation — differentiated support for bronze stores. Compete by cluster; no incentive tied yet.",
 productResponse:
 "Storytelling between Top Tiendas, Toby and in-app KPIs. Stores may not know why they are gold. Need demand coverage in ranking, not manipulable availability.",
 metrics: ["~20% POC churn in first months", "Target: 6 weeks to mature KPIs"],
 },
 {
 id: "ecosystem-comms",
 title: "Poor traceability: seller ↔ courier ↔ consumer ↔ CX",
 priority: "Critical",
 category: "Communication",
 summary:
 "Parallel Zendesk emails and Teams — no fast triangle when address wrong, cancel in transit, or delay. Support cannot cancel once courier has order.",
 productResponse:
 "Ecosystem Communication initiative: Seller↔Courier, Seller↔Consumer via WhatsApp templates first; timed alerts; future in-app chat. Mexico saw −30% courier cancellations. Launch within weeks.",
 quotes: [
 "Today the only channel is parallel conversation — not the fastest for a store preparing orders and tracking couriers.",
 "The initiative is called Ecosystem — Seller with Consumer, Seller with Courier, then Courier with Consumer.",
 ],
 },
 {
 id: "delivery-proof",
 title: "No delivery evidence on disputes",
 priority: "Medium",
 category: "CX / Fleet",
 summary:
 "Marked delivered but customer denies receipt — no system photo despite T&C allowing proof. Low volume (~30 of 1,500 monthly tickets) but no action path.",
 productResponse:
 "Delivery confirmation code ready globally — pilot per store in Peru. Courier gets 3 PIN skips/day; then CX must close.",
 },
 {
 id: "discount-admin",
 title: "Discount template overload in Admin",
 priority: "Medium",
 category: "Admin / Commercial",
 summary:
 "4 discount types × DDCs × progressive/stable = 8+ templates, updated twice weekly (Thu–Fri for weekend, Mon–Tue for weekdays). Flash promos require delete → activate → re-upload.",
 productResponse:
 "Discovery done with Ecuador, Mexico, Colombia — change single promo without full spreadsheet. Always deprioritized vs consumer features.",
 },
 {
 id: "shelf-ordering",
 title: "Manual product shelf reordering",
 priority: "Medium",
 category: "Admin / Commercial",
 summary:
 "Every discount change triggers shelf reorder. Template upload order ≠ final shelf order — manual fix per category.",
 productResponse: "Align template order with shelf order; discuss with Luis / Algolia search ordering.",
 },
 {
 id: "order-sound",
 title: "Order alert sound fails / multi-login",
 priority: "High",
 category: "Seller platform",
 summary:
 "Sound does not always play; hard to reproduce. Stores open same account on office PC + in-store — sound plays on wrong device. Platform built for single user, not 10 people on one account.",
 productResponse:
 "Push notification for new orders discussed. Root cause: shared credentials + multi-device.",
 quotes: [
 "Yesterday the store had three stores on the same screen — sound may stay on the computer, not in the store.",
 ],
 },
 {
 id: "supervisor-visibility",
 title: "Supervisors lack real-time store visibility",
 priority: "Critical",
 category: "Operations",
 summary:
 "During rush: no view if store forgot to go offline, expired orders, or new CRM product not activated. Mixpanel workaround only for brand-new SKUs.",
 workaround:
 "WhatsApp alerts from stores ('no couriers', 'out of stock'). Supervisors log into seller web on shared accounts to double-check.",
 productResponse:
 "Admin roadmap with Luis — operations dashboard (last hour orders, inventory view). AI shortcut discussed; Admin squad capacity is the constraint.",
 },
 {
 id: "partial-order-stock",
 title: "Cannot edit order when one SKU is OOS",
 priority: "Critical",
 category: "Inventory / Orders",
 summary:
 "One missing product → full order cancel. No consolidated active-stock view for supervisors or prioritized CRM products.",
 workaround: "Power BI stock view — T+1, not actionable intraday.",
 productResponse:
 "Real-time inventory is the north star. Testing Corona quantity fields and low-stock alerts. Vitex had quantity decrement — POCs may inflate counts.",
 },
 {
 id: "wrong-address",
 title: "Wrong address — top cancellation driver",
 priority: "Critical",
 category: "Consumer / Fleet",
 summary:
 "~18% of all cancellations (courier + consumer). Users with saved addresses in wrong physical location; permission/alert UX gaps.",
 productResponse:
 "INAP checkout review launched weekend before meeting. Colombia/Brazil location UX in test. Recurrent users: +4.6% conversion on address edit, 30% faster.",
 metrics: ["~18% of total cancellations", "Aug consumer cancel share: 55%"],
 },
 {
 id: "consumer-no-answer",
 title: "Cancellations when consumer does not respond",
 priority: "High",
 category: "Communication",
 summary:
 "Courier arrives, customer unreachable — major cancel reason. No baseline wait time for couriers today.",
 productResponse:
 "Timed messages with 5-minute window; alert to ops if no response. Creates consumer awareness (taxi-wait model).",
 },
 {
 id: "invoice-friction",
 title: "Store does not know invoice type (boleta vs factura)",
 priority: "Medium",
 category: "CX / Compliance",
 summary:
 "Customer writes RUC in delivery notes; store does not see it → CX ticket days later. SUNAT allows 48h electronic issuance; only RUC needed.",
 productResponse:
 "Checkout checkbox for factura + RUC field (standard e-commerce pattern). External emission — measure via ticket reduction.",
 },
 {
 id: "combo-skus",
 title: "Multiple digital SKUs per product / combos",
 priority: "Medium",
 category: "Catalog",
 summary:
 "6-pack, 12-pack, progressive discount = separate SKUs. Combos need A+B in stock; store must track all variants. Seen in Aug 31 store visits.",
 productResponse:
 "Quantitative picker: one parent SKU, quantity sub-codes. Two-SKU combos on same product screen. Cross-country alignment in progress.",
 },
 {
 id: "segmented-comms",
 title: "No granular segmentation for store campaigns",
 priority: "Medium",
 category: "Operations",
 summary:
 "Cannot target comms by cluster, beach stores, Top Tiendas tier, or neighborhood.",
 productResponse:
 "Braze: manual segments Q4, then Top Tiendas attributes automation. Brazil-style triggers when store enters cluster.",
 },
 {
 id: "poc-name-fraud",
 title: "POC name visible to consumers — fraud risk",
 priority: "Medium",
 category: "Consumer / Trust",
 summary:
 "Competitors cancel orders to hurt fill rate; consumers game routing to closer POC. Brazil hid rankings for same reason.",
 productResponse:
 "No feature toggle today — needs global change. Legal: TaDa liable via POC contract. POC1/POC2 anonymization debated.",
 },
 ] satisfies ServiceLevelPain[],

 productHighlights: [
 {
 title: "Service Level KPI stack",
 items: [
 "Perfect Order / Perfect Service + Demand Coverage + Stockout",
 "Territory · Inventory · Orders · Fleet as operational pillars",
 "Adaptable territory: program today, algorithmic coverage tomorrow",
 ],
 },
 {
 title: "Shipped features (12 months)",
 items: [
 "Order summary, Order Floor (accept all), maps, order distribution",
 "QG Financial Report — Sunday payment peak across countries",
 "First Seller↔Courier integration; fleet manager direction",
 ],
 },
 {
 title: "Competitive & partnership context",
 items: [
 "Z Delivery Turbo aggressive in Peru — 15 min messaging; operational fraud risk",
 "SED Turbo: 5% of orders, 20.5% picked up, ~80% delivered — fraud on multi-device",
 "BEES mini-UDC partnership for dark stores / small B2B deliveries discussed",
 "Courier top-500 global incentive (~150 PEN coupons) — seller-level ranking next",
 ],
 },
 ],

 convergences: [
 "Top Tiendas + in-app KPI storytelling replaces Monday Excel/WhatsApp",
 "Ecosystem Communication is the umbrella for seller, courier, consumer and CX contact",
 "Inventory real-time is the strategic gap — unlocks partial orders, supervisor view, stockout prevention",
 "Braze centralizes OPS→store comms with the same tooling as training and campaigns",
 "Wrong address and consumer-no-answer both addressed by timed, traceable messaging",
 "Admin simplification (discounts, shelves) is high OPS load but consistently deprioritized vs consumer",
 ],

 source: "Peru/01:09/Service level vision/ — BeerHub + Plaza República transcripts (Sep 1, 2026)",
};
