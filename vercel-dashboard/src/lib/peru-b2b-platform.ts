export type B2bScreen = {
 id: string;
 title: string;
 audience: "store" | "admin";
 module: string;
 image: string;
 summary: string;
 highlights: string[];
};

export type B2bAdminStep = {
 title: string;
 detail: string;
 frequency?: string;
};

export const PE_B2B_PLATFORM = {
 id: "web-tiendas",
 name: "Web Tiendas",
 brand: "B2B platform",
 alias: "WebPO",
 owner: "Peru OPS — Eduardo Ramirez team",
 role: "AFFILIATE_STORE (read-only per assigned POC)",
 source:
 "Peru/Plataforma B2B/ · Audio: Calle_Augusto_Tamayo_1788279720156.txt + Calle_Augusto_Tamayo_2_1788448803164.txt",

 executiveSummary: {
 headline:
 "Web Tiendas pivoted from low-adoption demand tool to 78 high-usage stores when payments went live (Jul 20) — now the bar for seller trust, with order-level detail as the next gap.",
 paragraphs: [
 "Born from a 2025 field visit (~12 people, ~10 stores): stores wanted one channel instead of WhatsApp for demand and payments. Q1 2026 MVP (built with Cloud/Codex) launched demand + purchase recommendations in Q2 — but training alone didn't drive adoption.",
 "Pivot on Jul 20, 2026: added Pagos y Desempeño. Before: of ~85 POCs, >half never used it, 26 intermittent, 14 weekly, only 2 daily. After: 78 stores with high usage — payments caused the shift (2 → 78).",
 "Today: Pagos is 77/85 stores (90% util); everyone who views downloads. Operaciones (demand + motorizados) 15/85 (17%); productos recomendados still low. Stores using Operaciones constantly show +0.5pp fulfillment, +2.31pp SLA and Perfect Order vs non-users (5-week window).",
 "Critical product ask: weekly summary is a start but stores will reconcile line-by-line — need per-POC per-order export (admin sheet today, ~500 orders/week/store, up to 50k rows). Without it, sellers keep the legacy detail tool. Mexico dark-store model doesn't apply; Colombia own-store model closer.",
 ],
 stats: [
 { label: "High-usage stores", value: "78" },
 { label: "Pagos adoption", value: "77/85" },
 { label: "Pivot date", value: "Jul 20" },
 { label: "POCs in Peru", value: "~253" },
 ],
 },

 navigation: [
 { id: "inicio", label: "Inicio", purpose: "Weekly dashboard — orders, SLA, rating, accuracy" },
 { id: "demanda", label: "Demanda y Motorizados", purpose: "Hourly demand heatmap + couriers needed per slot" },
 { id: "productos", label: "Productos de la semana", purpose: "Promo SKUs, suggested stock, cold qty" },
 { id: "pagos", label: "Pagos y Desempeño", purpose: "VLC incentive breakdown + credit notes" },
 { id: "notificaciones", label: "Notificaciones", purpose: "Inbox (pilot — not widely used yet)" },
 { id: "tips", label: "Tips y ayuda", purpose: "Training PDFs (first order, store essentials)" },
 { id: "recomienda", label: "Recomienda tus productos", purpose: "Form for SKU suggestions not in TaDa" },
 ],

 screens: [
 {
 id: "dashboard",
 title: "Weekly dashboard (Inicio)",
 audience: "store",
 module: "Inicio",
 image: "/peru/b2b/01-dashboard.png",
 summary:
 "Read-only weekly snapshot: orders, orders within 35/20 min, order rating, SLA 35/20, accuracy. Links to operación semanal, productos de la semana, and pagos. Notification sound toggle in sidebar.",
 highlights: [
 "Week selector (e.g. Sem 26, Aug 3–9)",
 "728 orders · 4.92 rating · 97.58% SLA · 96.57% accuracy (example POC)",
 "Carga status badges: Operación, Productos, Pagos",
 ],
 },
 {
 id: "demanda-heatmap",
 title: "Demand heatmap — Operación semanal",
 audience: "store",
 module: "Demanda y Motorizados",
 image: "/peru/b2b/02-demanda-heatmap.png",
 summary:
 "Hour-by-hour grid for the week. Purple intensity = order percentiles. Toggle Demanda vs Motorizados. Events annotated per day (holidays, Liga 1 matches, beer day).",
 highlights: [
 "Daily totals in header (Mon 150 → Sun 202)",
 "Events: Feriado Batalla de Junín, Aniversario Universitario, Liga 1 kickoffs",
 "Collapsed low-activity hours (05:00–08:00)",
 "La Marina: uses this for football Saturdays and promo staffing",
 ],
 },
 {
 id: "demanda-detalle",
 title: "Slot detail — orders + couriers + promo note",
 audience: "store",
 module: "Demanda y Motorizados",
 image: "/peru/b2b/03-demanda-detalle.png",
 summary:
 "Click any cell to open detalle: pedidos, motorizados needed, and NOTA with active promos (Mike's flavors, Budweiser packs). Bridges demand forecast to inventory prep.",
 highlights: [
 "Example: Tue 19:00 — 2 orders, 2 couriers, PROMOS listed",
 "Connects to gap: consumer promo visible in app but not always in BEES supply",
 ],
 },
 {
 id: "productos",
 title: "Productos de la semana",
 audience: "store",
 module: "Recomendaciones de compra",
 image: "/peru/b2b/04-productos-semana.png",
 summary:
 "Weekly promo list: SKU, product name, campaign (MKTP INFALTABLES, BACKUS TOP PROMOS), focus P1, suggested stock, cold quantity, unit type.",
 highlights: [
 "Search by SKU or name · filter by campaign",
 "Suggested stock highlighted (e.g. Cusqueña Trigo 13, Budweiser 30)",
 "Combos with chips (Cerveza + Inka Chips)",
 ],
 },
 {
 id: "pagos",
 title: "Pagos y Desempeño — VLC + credit notes",
 audience: "store",
 module: "Pagos y Desempeño",
 image: "/peru/b2b/05-pagos-desempeno.png",
 summary:
 "Weekly performance recap + financial breakdown. VLC incentive: total importe − delivery total = monto a facturar (incl. IGV). Downloadable detail. Credit notes section when applicable.",
 highlights: [
 "593 orders · 4.97 rating · 95.56% SLA · 98.82% accuracy (example week)",
 "S/ 6,178.72 total − S/ 2,836.82 delivery = S/ 3,341.90 to invoice",
 "Merino: SLA 35 hidden in official seller UI — visible here",
 ],
 },
 {
 id: "admin-detalle",
 title: "Admin backend — DETALLE X POC",
 audience: "admin",
 module: "OPS upload (spreadsheet)",
 image: "/peru/b2b/06-admin-detalle-poc.png",
 summary:
 "Order-level courier payment ledger uploaded weekly. Per order: fleet name, payment tiers (1er/2do/3er), incentives, SLA flag, midnight vs regular, distance, total payout.",
 highlights: [
 "Sem 35 · PC Junin · fleet: Luis Ernesto, Sandro Pusca, Victor Marco…",
 "PAGO_1ER / PAGO_2DO / PAGO_3ER + ORDENES_IN + WITHIN_SLA",
 "Feeds store-facing Pagos y Desempeño after weekly upload",
 ],
 },
 {
 id: "tips",
 title: "Tips y ayuda — training materials",
 audience: "store",
 module: "Tips y ayuda",
 image: "/peru/b2b/07-tips-ayuda.png",
 summary:
 "PDF library for store onboarding: 'Gestión 1º Pedido' (first-order badge), 'Indispensables para la Tienda'. Searchable, preview in-app.",
 highlights: [
 "First-order experience guide — aligns with Mexico/Puebla first-order badge usage",
 "Store essentials for weekly operation",
 ],
 },
 {
 id: "recomienda",
 title: "Recomienda tus productos — SKU suggestion form",
 audience: "store",
 module: "Recomienda tus productos",
 image: "/peru/b2b/08-recomienda-productos.png",
 summary:
 "Microsoft/Google Form embedded: POC selects store, suggests product not sold in TaDa, rates sales potential 1–5, names supplier. Feeds marketplace expansion pipeline.",
 highlights: [
 "Category + brand + format (e.g. Ron ABUELO 750ml, Inca Chips 150g)",
 "Tip: only products not currently in TaDa",
 "Connects to morning context Marketplace growth + BEES replenishment",
 ],
 },
 ] as B2bScreen[],

 adminWorkflow: {
 title: "How OPS runs it behind the scenes",
 presenter: "Eduardo Ramirez team — afternoon service review (Aug 31)",
 steps: [
 {
 title: "Weekly courier payment calculation (VLC)",
 detail:
 "OPS calculates how much each POC pays couriers for the week. Total importe breaks down into distance/position + KPI incentive. Delivery total subtracted → monto a facturar. Uploaded once a week to the platform.",
 frequency: "Weekly",
 },
 {
 title: "Credit notes automation",
 detail:
 "When stores sell at promo price below purchase cost, the system calculates the price difference and generates credit notes automatically. Same weekly cadence as VLC.",
 frequency: "Weekly",
 },
 {
 title: "Google Sheets → platform upload",
 detail:
 "DETALLE X POC and RESUMEN VLC sheets are the source of truth. Supervisors used to send this data via WhatsApp before Web Tiendas existed (process since 2025, tool evolved from manual).",
 frequency: "Weekly upload",
 },
 {
 title: "Demand & product files",
 detail:
 "Operación semanal and Productos de la semana show 'Última carga' timestamps — OPS uploads forecast grids and promo SKU lists. Stores see carga badges turn green when ready.",
 frequency: "Weekly (often Monday)",
 },
 {
 title: "Notifications — designed but underused",
 detail:
 "Web Tiendas has a notification inbox for OPS reminders, but stores don't rely on it yet. Separately, Braze notification center was enabled for Peru (bell icon in app) — segmentable by store or country; Bolivia runs welcome-message tests.",
 frequency: "Ad hoc",
 },
 ] as B2bAdminStep[],
 quotes: [
 "Semanalmente calculamos cuánto es que le vamos a pagar… el cálculo de notas de crédito está automatizado.",
 "Antes de que existiera esto, los supervisores tenían que enviar esta información por WhatsApp.",
 "Ayer activamos para Perú… el nuevo centro de notificaciones — cuando tienes un mensaje llega acá.",
 ],
 },

 storeValidation: [
 {
 store: "La Marina",
 quote: "Uses WebPO for weekly demand, couriers/hour, credit notes, courier payment reports. Updated Mondays.",
 gap: "Promo in consumer app (e.g. Stella S/23) doesn't alert BEES — can't pre-stock.",
 },
 {
 store: "Merino",
 quote: "WebPO for demand; reviews peak projection a week ahead, adds 1–2 motos for Saturday promo.",
 gap: "SLA 35 hidden in official seller UI — visible in Web Tiendas pagos.",
 },
 ],

 gapsVsOfficialApp: [
 "Seller app KPIs locked to rolling 7 days — Web Tiendas shows Mon–Sun week",
 "No demand-by-hour in seller platform — heatmap only in WebPO",
 "Promo → BEES alert missing — productos de la semana partially fills gap",
 "Weekly payment summary exists but stores need order-by-order drill-down to stop using legacy admin exports",
 "Notification center in WebPO pilot; Braze bell enabled Peru Sep 2 — segmentable by store",
 ],

 originStory: {
 trigger: "2025 field visit — ~12 people, ~10 stores",
 pain: "All communication via WhatsApp; stores wanted centralized demand + payments info",
 mvp: "Q1 2026 MVP with Cloud/Codex — demand + purchase recommendations live Q2 2026",
 pivot: "Jul 20 2026 — added Pagos y Desempeño after training failed to drive adoption",
 quotes: [
 "La principal reclamación era tener un canal centralizado… sobre pagos y sobre demanda.",
 "No necesariamente el training generaba adopción — la utilización era baja.",
 "Dos teníamos, dos pasamos a 78 — totalmente por causa de los pagos.",
 ],
 },

 adoptionMetrics: {
 beforePivot: {
 totalPocs: "~85",
 neverUsed: ">50%",
 intermittent: "26 (every 2–3 weeks)",
 weekly: "14",
 daily: "2",
 },
 afterPivot: {
 highUsage: "78 stores",
 pagosModule: "77/85 (~90%)",
 operacionesModule: "15/85 (~17%)",
 productosRecomendados: "very low",
 },
 },

 paymentModuleGap: {
 currentState:
 "Weekly Mon–Sun summary after Sunday seller payment: incentives, price disco, coupons, price difference. Everyone downloads.",
 risk:
 "Stores reconcile against their own ledgers — if summary lacks order detail they'll keep the legacy admin platform.",
 ask:
 "Per-POC per-order export (like admin DETALLE X POC). ~500 orders/week/store avg; sheet up to 50k rows. Also per-SKU detail tab.",
 dataInputs: [
 "Purchase tariff per SKU from OPS (what POC buys at) — weekly boot, 2–3×/week BEES purchases averaged",
 "Sales data per POC from platform",
 "Credit notes when sell price < purchase — price guarantee + 10% on purchase",
 ],
 beesShare: "~80% official BEES supply (field estimates 50–50); Mexico 99% Grupo Modelo — model doesn't transfer",
 },

 operacionesImpact: {
 methodology: "15 stores using Operaciones constantly vs rest — 5 weeks before vs after adoption",
 deltas: [
 { metric: "Fulfillment", delta: "+0.5 pp" },
 { metric: "SLA", delta: "+2.31 pp" },
 { metric: "Perfect Order", delta: "+2.31 pp" },
 { metric: "Rating", delta: "+0.03" },
 ],
 note: "All stores grew; users grew more. Top adopters +10–20% perfection growth.",
 },

 notificationCenter: {
 status: "Braze notification center enabled Peru Sep 2 — bell icon in app",
 capability: "Segment by single store or all Peru/Lima; replaces underused WebPO inbox",
 boliviaPilot: "Welcome message tests running in Bolivia via Braze",
 quote: "Ayer activamos para Perú… el nuevo centro de notificaciones.",
 },

 roadmapLinks: [
 { id: "metrics-hourly", reason: "Demand heatmap validates hourly view ask from CDMX + Peru" },
 { id: "metrics-date-filter", reason: "Weekly selector vs 7-day lock in seller app" },
 { id: "reimbursement-breakdown", reason: "VLC breakdown is what sellers want in-platform" },
 { id: "notification-center", reason: "OPS notification inbox + Braze — use the same approach in each country" },
 { id: "admin-b2b-courier-forecast", reason: "Motorizados tab = B2B courier forecast Mexico OPS asked for" },
 ],

 hierarchyNote:
 "Sits between the morning country briefing and afternoon store visits: the team built local tooling to execute the Fill Rate / late-hours / Marketplace strategy — and stores confirmed it works, with gaps that inform the global UX roadmap.",
};
