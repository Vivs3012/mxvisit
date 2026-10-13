import type { MeetingTopic } from "./peru-context-meeting";

export type EcuadorMeetingSection = {
 id: string;
 label: string;
 summary: string;
 topics: MeetingTopic[];
};

export const EC_CONTEXT_MEETING = {
 date: "07/10/2026",
 location: "Remote — Ecuador ops + Consumer prep",
 participants:
 "Ecuador: Marjo (lead), Karencita (ops/SL), Christian Chávez (portfolio), Lili & zone supervisors, Pauli (NPS/CRM), Cindy (CRM/growth). Brazil product: Tiago, Canelas, Vivian, Vivi, Karen. Prep for Oct 8 OYP workshop (Consumer + Rewards).",

 context:
 "High-level alignment before the Ecuador One Year Plan workshop: Service Level first (Community POC expansion, portfolio, stockout, couriers), then Consumer (payment gateway, promo planning, acquisition, CRM). No formal deck from Ecuador — open discussion with ops supervisors and CRM/NPS leads.",

 executiveSummary: {
 headline:
 "Ecuador runs 26 dark stores (28 in expansion plan) with strong stockout control (0.8%) but is betting a hybrid Community POC model to reach 41 cities — while product gaps (payments, sampling, courier store-switch, suggested replenishment) block tomorrow’s workshop themes.",
 paragraphs: [
 "Operation is 100% dark-store today — no Community POC live yet. A national density + digitalization filter yields 41 target cities (from 6 today) and a 4-year plan for 112 Community POCs alongside the existing 28 dark stores (not a full migration). Hybrid scenario projects ~1.14M orders (+87% vs LE610k), net revenue ~16M (+50%), EBITDA ~5.3M — mainly to attack coast/competition zones (e.g. Guayaquil insecurity) where dark stores cannot open. Legal constraints require a pilot before app-based reference pricing for Community POP owners.",
 "Portfolio is centralized: ~95% ABI supply + 5% third parties; twice-weekly templates via BEES/key-account. Stockout KPI ~0.8% (target band <2%) via supply (Cris), daily SKU-on audit, and variable incentive (~15¢/order if stockout <2%). One DDC per POC (23 POCs in promo Excel) — same granularity play as Peru; risk when scaling to hundreds of POCs. No internal inventory quantity in seller → cancellations rose after consumer-initiated cancel; team wants suggested replenishment like other delivery apps.",
 "Courier staffing uses a weekly simulator: projected orders by hour × effective rate per motorizado per POC (garitas, distance). Shared Mondays/Tuesdays on WhatsApp; gaps closed via MotoGP gamification (rain surcharges, oil-change perks). Ecuador wants this logic automated in BEES. Supervisors run Power BI FOR with projection calculators — seller home KPI page exists but POCs do not use it.",
 "Consumer: payment gateway blocked by past fraud trauma (card cloning, CX collapse) — cash-on-delivery still dominates. Promo engine uses step discount migration (partial portfolio), Promo Flash for liquor, regular promos Mon–Thu vs pricier Fri/Sat night. Acquisition mostly EPA paid media; lifecycle CRM with holdout tests (+50% lift Fri/Sun), hyper-personalization in Braze, mascot “T” gamification. NPS Sep 82.21 (promoters 2668 / detractors 173); top detractor themes: times, stock, price/promos. Pain points for product: sampling broken, motorizado cannot switch POC without ticket, seller→consumer WhatsApp vs Ecuador data-protection norm (CX-mediated flow preferred).",
 ],
 takeaways: [
 { label: "Expansion", text: "Hybrid 28 DS + 112 Community POCs → 67% pop coverage; pilot + legal before scale." },
 { label: "Service", text: "Stockout 0.8% + DDC/POC; couriers forecast manually — automate in BEES." },
 { label: "Product", text: "Payments, suggested stock, sampling, POC switch, reimbursement visibility on roadmap." },
 { label: "Growth", text: "EPA acquisition + CRM holdout discipline; gateway & promo UX = top consumer pains." },
 ],
 },

 snapshot: [
 { label: "Dark stores", value: "26", detail: "28 in plan · 100% dark-store model today" },
 { label: "Cities live", value: "6", detail: "Target 41 cities · 5→18 provinces" },
 { label: "Community POCs (plan)", value: "112", detail: "4yr ramp: 22 / 45 / 45 / consolidate" },
 { label: "Orders LE26", value: "610k", detail: "Hybrid scenario 1.14M (+87%)" },
 { label: "Stockout", value: "0.8%", detail: "Incentive if <2% · daily SKU audit" },
 { label: "NPS Sep", value: "82.21", detail: "Seller NPS YTD 96.67 · Courier 89.23" },
 { label: "Coverage", value: "42%→67%", detail: "Pop in served cities · coast gaps" },
 { label: "Presence", value: "~91%", detail: "Weak on coast / insecurity zones" },
 ],

 cities: [
 {
 name: "Quito",
 share: "~70% of demand",
 note: "15 dark stores; testing dawn shift to 07:00 on one POC; Community POCs planned inside city.",
 },
 {
 name: "Guayaquil",
 share: "Largest coast gap",
 note: "Market-share loss + insecurity — Community POC model to enter without full dark store.",
 },
 {
 name: "Cuenca · Ambato · Manabí · Santa Elena",
 share: "Regional bases",
 note: "NPS by city in Sep deck; expansion via hybrid model.",
 },
 ],

 sections: [
 {
 id: "community-poc",
 label: "1. Community POC & territorial expansion",
 summary:
 "Pilot finished; seeking two “real” posts. Hybrid keeps 28 dark stores and adds 112 Community POCs over 4 years — not replacing DS.",
 topics: [
 {
 title: "41-city filter and 112 Community POC plan",
 detail:
 "National analysis: urban % + digitalization → 41 cities (from 6). Plan adds 112 Community POCs in 4 years (22 Y1, 45 Y2, 45 Y3, consolidate Y4). Hybrid projection: 1.142M orders, GMV ~30.8B, net revenue ~16M, EBITDA ~5.3M (~1% CN EBITDA). Population coverage 42%→67%; zones 70; presence in competition-heavy coast where dark store is blocked.",
 quotes: [
 "We are not looking to migrate completely from Dark Store to Community POC — a hybrid model.",
 "We would go from 610 thousand orders… to 1,142,000 orders — practically doubling.",
 "Community POC would let us be present in competition zones where we are not today — insecurity in Guayaquil.",
 ],
 },
 {
 title: "Legal pilot and seller reference pricing",
 detail:
 "Ecuador cannot run Community POC with current app tooling — pilot offline. Need development so prospective Community POP can submit reference prices. Recruitment via BEES/FOR base (good assortment, adherence, service level). Landing page for seller acquisition (live in CO/MX) — Ecuador wants it when GO for Community POC.",
 quotes: [
 "We have a legal complexity — we cannot implement the model with the tools the app gives us today.",
 "We are working a pilot… we expect an app development where the client can give reference prices.",
 "We would take all the good practices from countries that already run Community POC.",
 ],
 },
 ],
 },
 {
 id: "portfolio",
 label: "2. Portfolio, supply & stockout",
 summary:
 "Centralized buying (Cris); twice-weekly ABI templates. Stockout among best in region; Community POC will loosen supply control.",
 topics: [
 {
 title: "Centralized assortment — 95% ABI",
 detail:
 "Christian Chávez owns supply. Dark stores do not access BEES for ordering — key-account templates, DINADEC delivery, credit (no cash on delivery). Third parties monthly. Portfolio refresh every 3 months; commercial changes tracked to avoid dead inventory.",
 quotes: [
 "95% of purchase is to the core brewery and 5% through third-party suppliers.",
 "We define what arrives, what does not, how much and how often — all through BEES.",
 ],
 },
 {
 title: "Stockout 0.8% — incentive + audit",
 detail:
 "KPI ~0.8% (historically ~1.5%). Levers: supply responsiveness to events, daily person checking physical inventory vs SKUs on, monetary incentive to POC if stockout <2% (~15 cents/order). Reactive layers sit on top of proactive supply.",
 quotes: [
 "We currently have a fairly good stockout indicator — 0.8%.",
 "If they stay below 2% stockout they get an incentive in the ASM part — about 15 cents per order.",
 ],
 },
 {
 title: "One DDC per POC — promo granularity",
 detail:
 "Moved from one DDC per 5–6 POCs to one DDC per store — improved indicators. Promo Excel lists 23 POCs with minimum portfolio each. At 500 POCs, may regroup by zone when behavior converges. Community POC owners will order themselves — suggested replenishment needed.",
 quotes: [
 "From each POC that is created, a DDC is created.",
 "I have an Excel with the detail of the 23 POCs — minimum portfolio per POC.",
 "We could send suggested replenishment, but in Community POC they order what they believe.",
 ],
 },
 ],
 },
 {
 id: "couriers",
 label: "3. Couriers, MotoGP & forecasting",
 summary:
 "Weekly motorizado need by hour per POC from simulator; rain and World Cup reactivation via MotoGP.",
 topics: [
 {
 title: "Hourly motorizado simulator (manual → BEES)",
 detail:
 "Forecast weekly orders (e.g. 4k Sat/Sun), convert to motorizados/hour using effective delivery rate per POC (garitas → 1 order/hr; dense zones → 3). Share plan Mon/Tue on ops WhatsApp. Gaps vs actual trigger gamification pushes. Team wants raw BEES export (delivery time, cancel flag, hour) automated.",
 quotes: [
 "We share a need for motorizados per hour… it feeds from a simulator.",
 "If it could be automated on the BEES platform we would gain a lot.",
 "It is not data science — just delivery time, cancelled or not, and hour.",
 ],
 },
 {
 title: "MotoGP — training, points, gift cards",
 detail:
 "Gamification platform: monthly training (+25 pts), order rating ≥4.95 (+10), SLA35 ≥97% (+10), accuracy ≥98% (+10). Penalties for rating ≤2 (lose 30 pts/day). Anniversary triple-points events. Redeem gift cards (sent to POC email). Used for rain franja bonuses and reactivation of Jun/Jul World Cup motorizado base.",
 quotes: [
 "We have a gamification platform with motorizados — MotoGP.",
 "Today we activated three initiatives by time slot — extra pay for rain.",
 ],
 },
 {
 title: "Supervisor Power BI FOR — not seller home",
 detail:
 "Daily KPIs to POCs: orders, cancel, fulfillment, MLA accuracy, NPS, Perfect Order, cold rate. Projection calculator for incentive math (rule of three on monthly orders). Seller ranking exists in app (7-day zone) but POCs rely on supervisor dashboard.",
 quotes: [
 "We send indicators every morning… a Power BI dashboard.",
 "They have a view in seller, but this is focused on the indicators that are their monthly goals.",
 ],
 },
 ],
 },
 {
 id: "product-sl",
 label: "4. Product roadmap (Service Level)",
 summary:
 "Canelas/Vivian presented seller batch accept, map, auto-dispatch, KPI wall, fleet manager, reimbursement screen, comms hub — Ecuador asked for daily incentive visibility.",
 topics: [
 {
 title: "Seller peak features shipped in region",
 detail:
 "Order summary batching, accept-all, live motorizado map, auto-distribution to couriers, devoluciones roadmap, weekly payment availability per courier. KPI competition between stores. Fleet manager admin for couriers.",
 quotes: [
 "Accept all orders — very important in peak hours.",
 "Map visualization of motorizados — significant reduction in servir and fleet recomposition.",
 ],
 },
 {
 title: "Four pillars: territory, inventory, orders, fleet",
 detail:
 "2027 sequencing: heavy fleet work done; shifting to orders pillar then inventory (stockout + fill rate). AI micro-insights for supervisors. Reimbursement weekly extract per POC — Ecuador wants daily incentive visibility like test in other countries.",
 quotes: [
 "We have four pillars — territory, inventory, orders and fleet.",
 "Daily visibility of incentives would be super good for Ecuador.",
 ],
 },
 {
 title: "Ecosystem communication (in progress)",
 detail:
 "Chat between consumer, seller, courier — reduce friction, improve conversion; launch end of month with impact measurement. Comms hub for sellers (features, NPS, surveys).",
 quotes: [
 "We want communication between consumer, deliverer, seller and intersex — less friction.",
 ],
 },
 ],
 },
 {
 id: "ec-pains",
 label: "5. Ecuador pain points → Oct 8 workshop",
 summary:
 "Courier POC migration, WhatsApp legal, payments, sampling.",
 topics: [
 {
 title: "Motorizado cannot switch POC without ticket",
 detail:
 "After Vitex migration, one motorizado = one POC (legal/third-party). Closed store or weekend city change requires back-office removal + re-register. Product: allow move (not parallel work) with legal review — Cindy to put on workshop board.",
 quotes: [
 "A motorizado registered in Quito cannot work in Calderón — user tied to the first POC.",
 "We had to lift a ticket to request store change or delete the user.",
 ],
 },
 {
 title: "Seller direct WhatsApp vs data protection",
 detail:
 "New feature sends consumer message from seller WhatsApp. Ecuador legal: seller should not contact consumer directly — flow via seller questions → CX ticket works well (high seller–CX contact).",
 quotes: [
 "In theory SL should not communicate directly with the client — protection of data.",
 "Seller uses seller view → CX raises ticket → CX talks to client.",
 ],
 },
 ],
 },
 {
 id: "consumer",
 label: "6. Consumer — payments, promos, acquisition",
 summary:
 "Gateway blocked by fraud history; rich CRM and promo calendar; EPA acquisition.",
 topics: [
 {
 title: "Payment gateway — fraud trauma",
 detail:
 "Top consumer pain. Technically available but activation blocked after past card cloning, bank make-good costs, bad UX, CX collapse. Cash on delivery still works; users expect digital payment option.",
 quotes: [
 "Payment gateway is something super pending.",
 "We had to replace a lot of money to the bank and users — card cloning, identity theft.",
 ],
 },
 {
 title: "Promo planning — Kiss Moments + agile CRM",
 detail:
 "Revenue/price list from core; Tue/Wed planning with Cindy. Calendar: Oktoberfest, Black Friday, icons by occasion. Step discount migration by brand/format (not full portfolio — user education). Promo Flash ~1 month, strong for liquor. Fri/Sat 21:00+ pricier step/addon SKUs. Sampling configured but feature not working — reported to Luis.",
 quotes: [
 "Planning every Tuesday and Wednesday — how last week went and next week actions.",
 "Promo Flash works very well for liquor.",
 "I did all the sampling loads but the feature was not working for me.",
 ],
 },
 {
 title: "Acquisition EPA + lifecycle",
 detail:
 "Majority acquisition via EPA (paid media). Lifecycle: at-risk/churn segments, wallet coupons, push/mail, mascot T gamification. Weekly campaign performance cross with Braze; holdout tests show +40–50% lift in prime slots; mornings neutral.",
 quotes: [
 "The largest part of acquisition we do from EPA — paid media.",
 "Friday 18h +50% real lift — one in three purchases created by the push.",
 ],
 },
 {
 title: "NPS ecosystem Sep",
 detail:
 "Consumer NPS 82.21 Sep (down from spring highs). Detractors: times (12), price/promos (8), stock (4), app/account (6). Seller NPS 96.67 YTD; courier 89.23. Pauli to share monthly NPS action deck per POC on Teams.",
 quotes: [
 "We analyze NPS every day.",
 "Share monthly analysis of actionables — helps Consumer Voice.",
 ],
 },
 ],
 },
 ] as EcuadorMeetingSection[],

 productOpportunities: [
 {
 title: "Automate motorizado/hour forecast in BEES",
 owner: "BEES / SL product",
 tone: "success" as const,
 detail: "Ecuador already computes from raw delivery data — export + weekly comms should be platform-native.",
 },
 {
 title: "Suggested replenishment / stock quantity in seller",
 owner: "PM Seller · Inventory pillar",
 tone: "warning" as const,
 detail: "No internal stock count → consumer cancel option increased cancellations; aligns with Peru/MX quantity ask.",
 },
 {
 title: "Payment gateway with fraud controls",
 owner: "Consumer + Risk",
 tone: "danger" as const,
 detail: "Ecuador blocker for digital parity; needs staged rollout and monitoring, not binary off.",
 },
 {
 title: "Sampling feature fix",
 owner: "Consumer promos",
 tone: "warning" as const,
 detail: "Loads done in Ecuador but mechanic failed — blocks experimentation.",
 },
 {
 title: "Motorizado POC transfer (legal review)",
 owner: "Courier + Legal",
 tone: "info" as const,
 detail: "No parallel stores; fast move when POC closes or courier relocates.",
 },
 {
 title: "Community POC reference price + landing",
 owner: "Expansion + product",
 tone: "info" as const,
 detail: "Pilot GO → reuse CO/MX seller acquisition landing; app pricing workflow for POP owners.",
 },
 {
 title: "Daily seller reimbursement / incentive ledger",
 owner: "SL reimbursement initiative",
 tone: "success" as const,
 detail: "Weekly extract in beta elsewhere; Ecuador wants per-order incentive transparency.",
 },
 ],

 connectsToWorkshop: [
 "Oct 8 workshop: Consumer + Rewards boards — bring payment gateway, sampling, step-discount UX confusion as ranked pains",
 "Rewards: Club TaDa / points already in CRM calendar — connect to app Rewards launch Ecuador mentioned for tomorrow",
 "Service Level: Community POC legal pilot status + hybrid map for territory pillar",
 "Share promo × SKU table (Marjo) for global promo consistent rollout",
 "Pauli NPS monthly action deck + Teams channel materials",
 "Karen: Community POC test results deck to Canelas",
 ],

 nextSteps: [
 "Oct 8 — joint dynamics: paypoints on Consumer, Rewards, Service Level boards",
 "Ecuador to add motorizado POC-switch pain and WhatsApp/legal nuance to workshop",
 "Product to share NPS action template and reimbursement beta timeline",
 "Follow sampling bug with Consumer eng",
 "Schedule Community POC landing conversation when pilot GO",
 "Canelas/Vivian ecosystem comms — measure impact after month-end launch",
 ],

 source:
 "Equador/07:10 - Product vision/Rua_Piaui_61_5_1_1791462203813_1791462204267.txt + meeting screenshots + MOTO GP.pdf + NPS Ecuador Sep.pdf",
};

export const EC_NPS_SNAPSHOT = {
 month: "September 2026",
 consumerNps: 82.21,
 promoters: 2668,
 passives: 194,
 detractors: 173,
 sellerNpsYtd: 96.67,
 courierNpsYtd: 89.23,
 cities: [
 { city: "Ambato", sep: 75.86 },
 { city: "Manabí", sep: 82.31 },
 { city: "Cuenca", sep: 78.57 },
 { city: "Quito", sep: 82.46 },
 { city: "Guayaquil", sep: 77.15 },
 { city: "Santa Elena", sep: 89.96 },
 ],
 detractorThemes: [
 { theme: "Tiempos (delivery delay)", count: 12 },
 { theme: "Precio / promociones", count: 8 },
 { theme: "Stock / availability", count: 4 },
 { theme: "App / cuenta", count: 6 },
 { theme: "Pedido (wrong/missing/cancel)", count: 6 },
 ],
};
