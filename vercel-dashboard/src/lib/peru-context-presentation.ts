export type PeruTeamMember = {
 id: string;
 name: string;
 role: string;
 photo?: string;
 external?: boolean;
 presentedSections?: string[];
 presentationNote?: string;
};

export const PE_CONTEXT_PDF = {
 title: "TaDa PE Context Global",
 path: "/peru/context/tada-pe-context-global.pdf",
 pages: 33,
 source: "Peru/31:08/PE context/TaDa PE Context Global.pdf",
};

/** People who led sections in the Aug 31 morning briefing. */
export const PE_CONTEXT_PRESENTERS: PeruTeamMember[] = [
 {
 id: "ulises-gonzales",
 name: "Ulises Gonzales",
 role: "Expansion Manager",
 photo: "/peru/context/team/ulises-gonzales.jpeg",
 presentedSections: [
 "Operation & POC expansion",
 "POC acquisition (Backus + WhatsApp)",
 "Four cities & regional potential",
 ],
 presentationNote:
 "Walked through the POC-first model: 89 stores (~89% of orders), retail closed Dec 2025, expansion via third parties and multi-POC owners.",
 },
 {
 id: "eloy-gutierrez",
 name: "Eloy Gutierrez",
 role: "Product Content Lead",
 photo: "/peru/context/team/eloy-gutierrez.jpeg",
 presentedSections: [
 "Service KPIs & Fill Rate",
 "Late hours / midnight",
 "Portfolio ABI + Marketplace",
 "Combos & Take Rate economics",
 ],
 presentationNote:
 "Covered service performance, midnight growth, portfolio mix rules (never Marketplace-only), combo-as-third-SKU pain, and Marketplace monetization journey.",
 },
 {
 id: "alexander-de-la-cruz",
 name: "Alexander de la Cruz",
 role: "Growth & Marketing",
 photo: "/peru/context/team/alexander-de-la-cruz.jpeg",
 presentedSections: [
 "Acquisition channels (TikTok, Meta, Braze)",
 "New-user mix by brand & format",
 "Retention & RGB gap",
 "Club TaDa Rewards launch",
 "Awareness (Kantar)",
 ],
 presentationNote:
 "Presented the growth pyramid: 102k new customers target, RGB only 27/100 new users, Club TaDa launch week, awareness at 9% vs Rappi/PedidosYa.",
 },
];

export const PE_CONTEXT_TEAM: PeruTeamMember[] = [
 {
 id: "javier-lastarria",
 name: "Javier Lastarria",
 role: "Country Head",
 photo: "/peru/context/team/javier-lastarria.jpeg",
 },
 {
 id: "adriano-sacri",
 name: "Adriano Sacri",
 role: "Tech & Sales",
 photo: "/peru/context/team/adriano-sacri.jpeg",
 },
 {
 id: "alexander-de-la-cruz",
 name: "Alexander de la Cruz",
 role: "Growth & Marketing",
 photo: "/peru/context/team/alexander-de-la-cruz.jpeg",
 },
 {
 id: "eduardo-ramirez",
 name: "Eduardo Ramirez",
 role: "Operations",
 photo: "/peru/context/team/eduardo-ramirez.jpeg",
 presentationNote: "Afternoon store visits with Ginger, Diego and Manuel.",
 },
 {
 id: "maria-ines-quiroz",
 name: "Maria Ines Quiroz",
 role: "Finance",
 photo: "/peru/context/team/maria-ines-quiroz.jpeg",
 },
 {
 id: "fernando-lengua",
 name: "Fernando Lengua",
 role: "Product Manager",
 photo: "/peru/context/team/fernando-lengua.png",
 },
 {
 id: "eloy-gutierrez",
 name: "Eloy Gutierrez",
 role: "Product Content Lead",
 photo: "/peru/context/team/eloy-gutierrez.jpeg",
 },
 {
 id: "martin-castillo",
 name: "Martin Castillo",
 role: "Customer Service Analyst",
 photo: "/peru/context/team/martin-castillo.jpeg",
 external: true,
 },
 {
 id: "flavia-ochoa",
 name: "Flavia Ochoa",
 role: "Price & Portfolio Lead",
 photo: "/peru/context/team/flavia-ochoa.jpeg",
 },
 {
 id: "victor-amasifuen",
 name: "Victor Amasifuen",
 role: "Demand & Supply Lead",
 photo: "/peru/context/team/victor-amasifuen.jpeg",
 },
 {
 id: "danna-castro",
 name: "Danna Castro",
 role: "Marketplace Analyst",
 photo: "/peru/context/team/danna-castro.jpeg",
 },
 {
 id: "cesar-penafiel",
 name: "Cesar Peñafiel",
 role: "Retention Lead",
 photo: "/peru/context/team/cesar-penafiel.jpeg",
 },
 {
 id: "miguel-espinoza",
 name: "Miguel Espinoza",
 role: "Acquisition Lead",
 photo: "/peru/context/team/miguel-espinoza.jpeg",
 },
 {
 id: "sebastian-cavero",
 name: "Sebastian Cavero",
 role: "Marketing Analyst",
 photo: "/peru/context/team/sebastian-cavero.png",
 external: true,
 },
 {
 id: "reinaldo-hermoza",
 name: "Reinaldo Hermoza",
 role: "Rewards Specialist",
 photo: "/peru/context/team/reinaldo-hermoza.jpeg",
 external: true,
 },
 {
 id: "ginger-zegarra",
 name: "Ginger Zegarra",
 role: "Operations Coordinator",
 photo: "/peru/context/team/ginger-zegarra.jpeg",
 presentationNote: "Afternoon POC visits.",
 },
 {
 id: "diego-godoy",
 name: "Diego Godoy",
 role: "Operations Coordinator",
 photo: "/peru/context/team/diego-godoy.jpeg",
 presentationNote: "Afternoon POC visits.",
 },
 {
 id: "manuel-arroyo",
 name: "Manuel Arroyo",
 role: "Operations Coordinator",
 presentationNote: "Afternoon POC visits.",
 },
 {
 id: "ulises-gonzales",
 name: "Ulises Gonzales",
 role: "Expansion Manager",
 photo: "/peru/context/team/ulises-gonzales.jpeg",
 },
 {
 id: "jose-valle",
 name: "Jose Valle",
 role: "Operations Supervisor",
 photo: "/peru/context/team/jose-valle.jpeg",
 external: true,
 },
 {
 id: "alejandro-pozo",
 name: "Alejandro Pozo",
 role: "Operations Supervisor",
 photo: "/peru/context/team/alejandro-pozo.jpeg",
 external: true,
 },
 {
 id: "eduardo-guzman",
 name: "Eduardo Guzman",
 role: "Finance Analyst",
 external: true,
 },
];

/** Metrics and charts extracted from the deck (complements transcript). */
export const PE_CONTEXT_PDF_INSIGHTS = {
 strategicPillars: [
 "Quality acquisition (+ returnables)",
 "Retention (+ personalization)",
 "Awareness",
 "Expansion beyond Lima",
 "Portfolio & Marketplace",
 "Late hours",
 ],
 pocJourney: [
 { year: "2022", pocs: 7, orderSharePct: 26 },
 { year: "2023", pocs: 16, orderSharePct: 48 },
 { year: "2024", pocs: 48, orderSharePct: 76 },
 { year: "2025", pocs: 78, orderSharePct: 89 },
 { year: "2026", pocs: 89, orderSharePct: 89 },
 ],
 serviceTrends: {
 sla35: { "2023": 93.8, "2024": 91.5, "2025": 94.1, "2026": 93.7 },
 rating: { "2023": 4.73, "2024": 4.8, "2025": 4.88, "2026": 4.89 },
 fillRate: { "2023": 87.9, "2024": 92.2, "2025": 92.6, "2026": 92.3 },
 },
 midnightShareEvolution: [
 { period: "2024 H1", pct: 12.3 },
 { period: "2024 H2", pct: 17.7 },
 { period: "2025 H1", pct: 21.9 },
 { period: "2025 H2", pct: 26.6 },
 { period: "2026 H1", pct: 26.9 },
 ],
 portfolioMixOrders: {
 "2023": { rgb: 19.7, nonRgb: 45.5, marketplace: 17.5 },
 "2024": { rgb: 45.7, nonRgb: 44.6, marketplace: 17.8 },
 "2025": { rgb: 58.5, nonRgb: 59.1, marketplace: 22.2 },
 "2026": { rgb: 60.6, nonRgb: 83.8, marketplace: 24.2 },
 },
 consumerShopping: [
 { segment: "ABI only", share: 53, note: "Beer-only occasions — core business" },
 { segment: "ABI + Marketplace", share: 24, note: "Highest strategic value — cross-sell" },
 { segment: "Marketplace only", share: 23, note: "Convenience — lowest strategic priority" },
 ],
 marketplaceResults2026: [
 { label: "Marketplace GMV share", value: "+2.0 pp vs LY" },
 { label: "Order penetration", value: "~30% (+5 pp vs LY)" },
 { label: "Pareto SKU availability", value: "+4 pp" },
 { label: "Marketplace EBITDA", value: "+480% vs LY" },
 ],
 acquisitionMix: [
 { label: "New customers 2026", value: "102k" },
 { label: "Returnables", value: "27%" },
 { label: "Non-returnables", value: "49%" },
 { label: "Marketplace", value: "24%" },
 ],
 retentionM1M2: [
 { segment: "Non-returnable (cans)", rate: 26.2 },
 { segment: "Returnables", rate: 31.3 },
 { segment: "Marketplace", rate: 20.7 },
 ],
 rgbChallenge: {
 newUserRgbShare: 27,
 midnightRgbRetention: 26,
 regularRgbRetention: 34,
 midnightGapPp: 8,
 upliftIfMidnightMatched: 2,
 },
 ordersEvolution: [
 { year: "2023", orders: 327098, rgbPct: 61.7, midnightPct: 15 },
 { year: "2024", orders: 576562, rgbPct: 64.3, midnightPct: 24 },
 { year: "2025", orders: 910287, rgbPct: 63.6, midnightPct: 27 },
 { year: "2026", orders: 1137859, rgbPct: 24.5, midnightPct: 0 },
 ],
 highlights: [
 "Jan 2025 — Launch in Trujillo",
 "Jun 2025 — Launch in Arequipa",
 "Oct 2025 — Launch in Piura",
 "Dec 2025 — Retail stores closed (Dark Stores only remain)",
 "Returnable users: higher retention + MACO ~USD 99 vs lower-quality segments",
 "Strategic principle: grow Marketplace inside ABI baskets — do not maximize Marketplace-only",
 ],
};
