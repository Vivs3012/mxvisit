/** Oct 8, 2026 — Ecuador OYP workshop (Lucid). Source: Equador/08:10 - Workshop transcript. */

export const EC_WORKSHOP_OCT08_META = {
 date: "08/10/2026",
 title: "OYP workshop — Ecuador",
 location: "Remote · Lucid",
 facilitators: "Vivian (design), Tiago (product), Karen/Marjo (Ecuador lead)",
 participants:
 "Ecuador: Marjo, Karencita, Christian, Lili, Cindy (CRM), Luis (Admin), supervisors, ops. Brazil: product & design.",
 format:
 "Single board (Consumer + Service Level + Rewards together). Post-its → open mic → dot voting (3 votes/pillar) → dreams → second vote → “telão” hospitality ideation.",
 transcriptPath: "/ecuador/workshop-oct-08-2026.txt",
};

export const EC_WORKSHOP_OCT08_EXECUTIVE = {
 headline:
 "Ecuador’s Oct 8 workshop converges on inventory truth, payments trust, and courier economics — with Club TaDa integration and POC tooling as the top voted near-term bets.",
 paragraphs: [
 "Operations dominated the pain board: stock shows as zero or infinite, POCs lack live quantity and post-BEES migration removed the old Vitex daily load workflow. Supervisors want a theoretical opening stock fed by sales, Excel export for cash close, and less manual copy of order codes. Admin (Luis) pushed dynamic delivery fees by distance band, rain surcharges, tips, and service fee — Ecuador charges a flat ~$1.500 whether the ride is 5 or 30 minutes.",
 "Consumer pain reinforced why the gateway stays off: cards were reused without OTP/Face ID, fraud spiked, and banks forced refunds. Until risk-controlled online pay exists, cancel-after-dispatch penalties cannot stick. First-order NPS suffers because users cannot edit phone, address, or email without tickets or account deletion; map layers under-resolve landmarks (e.g. malls), driving wrong pins and cancels.",
 "Rewards/CRM: Club TaDa external platform is painful — integration by year-end is the top vote (4). Sampling CSV loads fail in Ecuador despite working elsewhere. Promo mechanics force duplicate SKUs for color variants, bloating the app. Dreams point to ERP/SAP-grade inventory, BizWam supervisor dashboards, split pay (“Círculos”), subscriptions, and cross-country dark-store competitions.",
 ],
 stats: [
 { label: "Vote rounds", value: "2" },
 { label: "Top challenge votes", value: "Club TaDa (4)" },
 { label: "Pillars on one board", value: "3" },
 { label: "Hospitality ideas", value: "10+" },
 ],
};

export type EcWorkshopInsight = {
 id: string;
 priority: "Critical" | "High" | "Medium";
 pillar: "Operations" | "Consumer" | "Rewards" | "Admin" | "Cross";
 title: string;
 detail: string;
 votes?: number;
 productHook?: string;
 quotes: string[];
};

export const EC_WORKSHOP_OCT08_INSIGHTS: EcWorkshopInsight[] = [
 {
 id: "inventory-live",
 priority: "Critical",
 pillar: "Operations",
 title: "Live inventory quantity — zero/infinite stock and peak sell-through",
 votes: 2,
 detail:
 "POCs want to enter units per SKU (Vitex-style) with auto decrement and auto-off at zero. Today Pareto rules (e.g. off at 4 units) are manual; peak dispatch can leave SKUs ‘on’ and drive cancellations.",
 productHook: "Opening stock file + sales deduction — align with Peru/MX quantity MVP.",
 quotes: [
 "Stock zero or infinite — we need to see inventory live at the POC.",
 "When they dispatch everything in a peak, the product stays on and we get cancellations.",
 ],
 },
 {
 id: "club-tada",
 priority: "Critical",
 pillar: "Rewards",
 title: "Club TaDa native integration",
 votes: 4,
 detail:
 "External loyalty stack makes CX painful; team migrating integration — workshop’s #1 voted item.",
 productHook: "End-of-year EC rollout; unify points/refunds with app.",
 quotes: ["Managing Club with an external platform has been a huge challenge."],
 },
 {
 id: "payments-fraud",
 priority: "Critical",
 pillar: "Consumer",
 title: "Online payments off — fraud trauma blocks cancel fees & personalization",
 detail:
 "COD dominates; card only at door. Stored cards without step-up auth led to cloning and bank chargebacks. Cancel penalties and dynamic fees need card on file.",
 productHook: "3DS / OTP / wallet tokenization before re-enabling gateway.",
 quotes: [
 "We can enable online pay but we had a lot of fraud — cards used without a code to your phone.",
 "If the courier collects the penalty in cash, nobody pays.",
 ],
 },
 {
 id: "cancel-courier-pay",
 priority: "High",
 pillar: "Operations",
 title: "Consumer cancel after dispatch — couriers paid only per delivery",
 detail:
 "EC pays couriers per completed order, not per attempt. User-initiated cancel after rider is en route hurts NPS; team wants fee + messaging once POC assigns rider.",
 productHook: "Status-based cancel policy + payment rail.",
 quotes: [
 "We pay 100% per delivered order — courier NPS drops when the client cancels mid-route.",
 ],
 },
 {
 id: "profile-edit",
 priority: "High",
 pillar: "Consumer",
 title: "Cannot edit account data — first-order cancel spike",
 votes: 2,
 detail:
 "Wrong phone/address/email on first order; fix path is ticket or delete account. Critical before Dec peak when they manually clean bases.",
 productHook: "Self-serve profile edit + address confirmation UX.",
 quotes: [
 "I enter my TaDa account and I cannot edit my information.",
 ],
 },
 {
 id: "address-map",
 priority: "High",
 pillar: "Consumer",
 title: "Map layers & weak geo suggestion",
 votes: 2,
 detail:
 "Secondary-street layer may be too coarse; mall names resolve to wrong cities. Quick ‘yes’ on distant-location warning locks bad pins.",
 productHook: "Map provider layer tuning + forced pin adjust.",
 quotes: [
 "You pick a mall in Guayaquil and it shows San Marino Quito, Mexico…",
 ],
 },
 {
 id: "sampling-ec",
 priority: "High",
 pillar: "Rewards",
 title: "Sampling not working in Ecuador",
 detail:
 "Feature active in other countries; CSV attempts (10k rows, price variants) never surfaced free gift SKUs — tickets with Luis pending.",
 productHook: "Country config / catalog rules debug.",
 quotes: ["I loaded sampling in every way and it does not appear in Ecuador."],
 },
 {
 id: "admin-dynamic-fees",
 priority: "High",
 pillar: "Admin",
 title: "Admin CSV → in-app rules (delivery bands, rain, tips, service fee)",
 detail:
 "Delivery fee flat regardless of distance; no service fee; rain surge manual. Luis wants POC-to-POC fee grids without CSV errors.",
 quotes: [
 "We charge $1,500 whether you are 5 minutes or half an hour away.",
 "Excel CSV is human-error prone — I have put the wrong price in a cell.",
 ],
 },
 {
 id: "poc-excel-orders",
 priority: "Medium",
 pillar: "Operations",
 title: "POC order list export for cash close",
 detail:
 "POCs copy order codes one-by-one into Excel for SKU, courier, payment method — want downloadable report.",
 quotes: ["They open the order list and copy code by code — very manual."],
 },
 {
 id: "promo-sku-bloat",
 priority: "Medium",
 pillar: "Consumer",
 title: "Variant promos — 7–8 SKUs for one bundle (color choice)",
 detail:
 "No variant picker under one SKU; app weight hurts discovery. Step discount helped but catalog still heavy.",
 quotes: [
 "We create seven or eight SKUs because the user must pick thermos color — the app becomes heavy.",
 ],
 },
 {
 id: "poc-assign-rec",
 priority: "Medium",
 pillar: "Operations",
 title: "POC tools — assign orders & sectorized courier routing",
 votes: 2,
 detail:
 "Wish for intelligent assignment by order geography; related to supervisor live dashboard in BizWam.",
 productHook: "Dispatch assist + supervisor alert board.",
 quotes: ["Help POCs assign motorizados by where orders cluster."],
 },
 {
 id: "messaging-courier",
 priority: "Medium",
 pillar: "Consumer",
 title: "Consumer ↔ courier messaging",
 votes: 2,
 detail: "Voted challenge; ties to wrong address/contact and cancel reduction.",
 quotes: [],
 },
 {
 id: "promo-live-counter",
 priority: "Medium",
 pillar: "Rewards",
 title: "Live promo counters (e.g. first 100 orders)",
 votes: 2,
 detail: "EC runs split campaigns (order #100, #1000); needs in-app progress like promo deadline UI.",
 quotes: ["We send a split saying how many units per spot — a live visual would help."],
 },
];

export const EC_WORKSHOP_OCT08_VOTE_WINNERS = {
 challenges: [
 { label: "Club TaDa integrated", votes: 4 },
 { label: "POC assign-order recommendations", votes: 2 },
 { label: "POC stock quantity per SKU", votes: 2 },
 { label: "Remind user: not at delivery address", votes: 2 },
 { label: "Consumer ↔ courier message", votes: 2 },
 { label: "User can update profile anytime", votes: 2 },
 { label: "Live visual for promo counters", votes: 2 },
 { label: "Auto-configured free gift products", votes: 2 },
 ],
 dreams: [
 { label: "Monthly subscription / TaDa premium", votes: 4 },
 { label: "ERP (SAP) + reliable inventory MB", votes: 3 },
 { label: "AI dynamic geofences (km + demand)", votes: 3 },
 { label: "Automated inventory reconciliation", votes: 3 },
 { label: "Split / group pay in app (Círculos)", votes: 3 },
 { label: "Full seller health in BizWam", votes: 3 },
 { label: "Repeat last order", votes: 3 },
 { label: "Scheduled delivery & event bundles", votes: 3 },
 ],
};

export const EC_WORKSHOP_OCT08_DREAMS = [
 {
 pillar: "Operations",
 title: "SAP / Dynamics ERP integration",
 detail: "Trustworthy MB, automated conciliation, theoretical live stock per dark store.",
 },
 {
 pillar: "Operations",
 title: "Supervisor command center in BizWam",
 detail: "Delayed orders, cancelations, alerts by city — especially match days and peaks.",
 },
 {
 pillar: "Operations",
 title: "AI geofence + motorizado staffing alerts",
 detail: "Flag geofences exceeding km radius; predict 6–8pm demand vs couriers on hand.",
 },
 {
 pillar: "Consumer",
 title: "Group pay & wallet cashback",
 detail: "Banco Guayaquil ‘Círculos’-style split bill; points convert to wallet dollars.",
 },
 {
 pillar: "Consumer",
 title: "Events & multi-vertical basket",
 detail: "Sell beer for festivals in-app; McDonald’s + beer one courier without breaking SLA metrics.",
 },
 {
 pillar: "Consumer",
 title: "International app store listing",
 detail: "Expats (e.g. leadership on BR App Store) can install EC TaDa while traveling.",
 },
 {
 pillar: "Rewards",
 title: "Subscription tiers + scheduled delivery",
 detail: "Cinema-style plans; program delivery for match time without hurting POC SLA.",
 },
 {
 pillar: "Rewards",
 title: "Braze gamification — sustainability & Tadi",
 detail: "Monthly challenges, zone rankings, returnable bottles / low-alcohol goals.",
 },
];

export const EC_WORKSHOP_OCT08_HOSPITALITY = [
 {
 audience: "Consumer",
 idea: "Birthday order free or surprise gift without ordering",
 note: "Birthdays are multi-day social occasions in Ecuador.",
 },
 {
 audience: "Consumer",
 idea: "Meet your favorite football player via sponsor partnerships",
 note: "CN has strong club deals — mirror Zé Delivery stadium experiences.",
 },
 {
 audience: "POC / Courier",
 idea: "Welcome kit for new stores; top courier / top store recognition cross-country",
 note: "Brazil ‘top 200 couriers’ coupon became city-wide pride moment.",
 },
 {
 audience: "POC",
 idea: "Dark-store World Cup across countries",
 note: "EC internal mundialito empowered stores; scale to LATAM.",
 },
];

export const EC_WORKSHOP_OCT08_CROSS_THEMES = [
 {
 theme: "Manual Excel is the hidden OS",
 detail: "Stock rules, courier forecast, admin fees, cash close, and promo splits all still live in spreadsheets and CSV.",
 },
 {
 theme: "Payments unlock second-order fixes",
 detail: "Cancel fees, penalties, wallet, and split pay all depend on trustworthy online rails.",
 },
 {
 theme: "First order = trust moment",
 detail: "Profile edit, address confirm, and sampling/Club integration show up together in NPS stories.",
 },
 {
 theme: "Hospitalidad as differentiation",
 detail: "Team wants emotional peaks (birthday, football, recognition) beyond transaction efficiency.",
 },
];
