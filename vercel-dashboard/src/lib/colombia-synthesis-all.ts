/** Colombia Sep 13 — cross-session synthesis (AM product intro + PM service level). */

export type ColombiaAllConvergence = {
 id: string;
 theme: string;
 detail: string;
 globalRanks?: number[];
 sessions: ("product-intro" | "service-level")[];
};

export type ColombiaAllInsight = {
 id: string;
 priority: "Critical" | "High" | "Medium";
 title: string;
 detail: string;
 sessions: ("product-intro" | "service-level")[];
 globalRanks?: number[];
 crossCountry?: string;
};

export const COLOMBIA_ALL_EXECUTIVE = {
 en: {
 headline:
 "Sep 13 balanced growth, rewards, consumer experience and operations: marketplace and bank promos changed who shops TaDa; Club and For You need capacity; post-purchase help must fix coordination losses — while BEES, seller tools and CIEZA billing still have to stay aligned.",
 paragraphs: [
 "Growth and consumer mix: Colombia grows 50–60% year over year, but marketplace-only baskets and bank promos bring users who buy less often than core beer buyers and shop more at night. One CRM playbook cannot treat every cohort the same.",
 "Rewards and personalization: Club TaDa is understaffed; Lovers volume and missions slip. Tiers should separate beer vs marketplace journeys. For You should be algorithmic, but hero-SKU layout and sampling rules still block the vision competitors already ship.",
 "Consumer after purchase: A large share of cancellations comes from customer–store–courier misalignment, not product quality. Fixed post-purchase options (ETA, instructions, routing to store or rider) are as important as peak routing fixes.",
 "Seller experience and comms: Stores want daily KPI comparisons, in-app coaching instead of email blasts, and ally promos inside the seller app. The Bogotá Braze test checks whether personalized weekly plans beat WhatsApp groups.",
 "Finance and stock truth: BEES availability gaps and delayed CIEZA invoicing are the same SKU timeline problem from two angles — ops, consumer promise and audit all need one line per SKU, plus billing export stores will actually use.",
 ],
 stats: [
 { label: "Sessions Sep 13", value: "2", detail: "AM product · PM service level" },
 { label: "Growth & CRM", value: "Marketplace · banks", detail: "Cohort-specific retention" },
 { label: "Rewards & Club", value: "For You · tiers", detail: "Capacity + algorithmic shelves" },
 { label: "Consumer & ops", value: "Post-purchase · peak", detail: "Coordination + seller KPIs" },
 ],
 },
 pt: {
 headline:
 "13 set equilibra growth, rewards, experiência do consumidor e operações: marketplace e bancos mudaram quem compra; Club e For You precisam de capacidade; pós-compra deve reduzir cancelamento por coordenação — enquanto BEES, ferramentas seller e faturação CIEZA precisam ficar alinhados.",
 paragraphs: [
 "Growth e mix do consumidor: Colômbia cresce 50–60% a/a, mas cestas só marketplace e promo bancária trazem usuários com frequência diferente da cerveja e compras mais noturnas. Um único playbook de CRM não serve para todos os perfis.",
 "Rewards e personalização: Club TaDa com equipe enxuta; Lovers e missões atrasam. Tiers devem separar jornada cerveja vs marketplace. For You deveria ser algorítmico, mas layout de SKU hero e regras de sampling ainda travam a visão que concorrentes já mostram.",
 "Consumidor pós-compra: Grande parte dos cancelamentos vem de desencontro cliente–loja–entregador, não de qualidade do produto. Opções fixas pós-compra (ETA, instruções, rota para loja ou moto) importam tanto quanto consertar roteamento no pico.",
 "Experiência seller e comms: Lojas querem KPI diário comparável, coaching no app em vez de e-mail, e promo de aliado dentro do seller. Teste Braze em Bogotá verifica se plano semanal personalizado vence grupos de WhatsApp.",
 "Finanças e verdade de estoque: gap de disponibilidade no BEES e faturação atrasada no CIEZA são o mesmo problema de linha do tempo por SKU — operação, promessa ao consumidor e auditoria precisam de export de pedidos que a loja realmente usa.",
 ],
 stats: [
 { label: "Sessões 13 set", value: "2", detail: "AM produto · PM service level" },
 { label: "Growth & CRM", value: "Marketplace · bancos", detail: "Retenção por coorte" },
 { label: "Rewards & Club", value: "For You · tiers", detail: "Capacidade + prateleiras" },
 { label: "Consumidor & ops", value: "Pós-compra · pico", detail: "Coordenação + KPIs seller" },
 ],
 },
};

export const COLOMBIA_ALL_CONVERGENCES: ColombiaAllConvergence[] = [
 {
 id: "retention-mix",
 theme: "Who you acquire changes how you should talk to them",
 detail:
 "Marketplace night buyers and bank-promo users are not the same as core beer buyers. Service level comms must respect the segments defined in the morning growth discussion.",
 globalRanks: [45, 46],
 sessions: ["product-intro"],
 },
 {
 id: "club-for-you",
 theme: "Rewards and personalization need ops data — not the other way only",
 detail:
 "Club missions and algorithmic shelves advance when stores have trustworthy KPIs and forecasts — but rewards and CRM should not wait for perfect peak routing. Run parallel tracks: cohort CRM + For You roadmap while seller home and comms improve.",
 globalRanks: [50, 16],
 sessions: ["product-intro", "service-level"],
 },
 {
 id: "inventory-finance",
 theme: "Stock truth affects sales and finance",
 detail:
 "Morning: BEES says unavailable while the store has product. Afternoon: product leaves with the courier but is invoiced days later in CIEZA, and audit counts do not match. One fix path: reliable SKU-level events for operations and finance.",
 globalRanks: [44, 49, 51],
 sessions: ["product-intro", "service-level"],
 },
 {
 id: "whatsapp-layer",
 theme: "WhatsApp still carries ops and commercial messages",
 detail:
 "Morning: weekend control room alerts when a store goes off. Afternoon: promo blasts to allies and SLA warnings by email. Goal: Braze plus an in-app calendar so messages are traceable and reusable.",
 globalRanks: [20, 48],
 sessions: ["product-intro", "service-level"],
 },
 {
 id: "dual-seller",
 theme: "Two store types, one country",
 detail:
 "Own stores run on SIESA/CIEZA with stricter control; allied Community POC stores rely on groups and lighter tooling. KPI home, comms, and billing cannot be identical for both.",
 globalRanks: [47],
 sessions: ["product-intro", "service-level"],
 },
 {
 id: "peak-delivery chain",
 theme: "Peak delivery breaks on people, not only on metrics",
 detail:
 "Assigning couriers by hand at very high volume repeats the unfair SLA pattern from Mexico and Peru: the store prepares fast but waits for riders. Capacity planning still lives in Excel.",
 globalRanks: [1, 5, 10],
 sessions: ["service-level"],
 },
];

export const COLOMBIA_ALL_INSIGHTS: ColombiaAllInsight[] = [
 {
 id: "all-marketplace-crm",
 priority: "Critical",
 title: "One CRM playbook does not fit every cohort",
 detail:
 "Marketplace night buyers and bank-promo users are not beer-at-4pm users. Retention work must segment before Perfect Order coaching or Club missions fire the wrong message.",
 sessions: ["product-intro"],
 globalRanks: [45, 46],
 },
 {
 id: "all-club-rewards",
 priority: "Critical",
 title: "Staff Club, tiers and For You — parallel to ops fixes",
 detail:
 "Club TaDa lacks capacity; Lovers and missions slip. Beer vs marketplace tiers need different journeys and algorithmic For You shelves are blocked by hero-SKU layout — invest product and CRM here while seller KPIs improve, not after peak is perfect.",
 sessions: ["product-intro", "service-level"],
 globalRanks: [50, 45],
 },
 {
 id: "all-coordination",
 priority: "Critical",
 title: "Too many orders die in coordination",
 detail:
 "Post-purchase bots and predefined messages target the large share of cancellations that happen because customer, store, and courier cannot align — the store should be the first resolver, not a distant support center.",
 sessions: ["service-level"],
 globalRanks: [6, 17],
 },
 {
 id: "all-integration-gate",
 priority: "Critical",
 title: "Integrate BEES and CIEZA before scaling allies",
 detail:
 "The morning session described BEES vs SIESA availability pain and the need for billing export. The afternoon put numbers on control failures and delayed invoicing. Doubling Community POC without SKU and invoice alignment will multiply manual work and audit risk.",
 sessions: ["product-intro", "service-level"],
 globalRanks: [44, 51],
 crossCountry: "Same stock-quantity pain as Mexico and Peru visits; Peru also asks for clearer payment breakdown.",
 },
 {
 id: "all-ops-reliability",
 priority: "High",
 title: "Peak reliability and seller tools — in parallel with growth",
 detail:
 "Routing, dated KPIs, courier app stability, and SKU truth on the seller home must improve alongside marketplace and Club bets. Colombia already runs bank promos and marketplace nights while fixing dispatch — sequence squads, do not freeze rewards until ops is flawless.",
 sessions: ["product-intro", "service-level"],
 globalRanks: [1, 7, 49],
 crossCountry: "Mexico and Peru field visits reported similar reliability gaps.",
 },
 {
 id: "all-braze",
 priority: "High",
 title: "Prove in-app seller comms, then scale",
 detail:
 "Run the Bogotá Braze test to measure impact on SLA and stock KPIs. If it works, use the same channel for ally commercial calendars, hour compliance, and promo reminders tied to a visible monthly plan.",
 sessions: ["service-level"],
 globalRanks: [20, 8],
 },
 {
 id: "all-expansion",
 priority: "High",
 title: "Expand coverage with planned overlap, not surprise spillover",
 detail:
 "Morning plan: when an allied store turns off, zones need planned overlap and ops alerts. Afternoon adds: warn stores when courier capacity is too low before SLA turns red.",
 sessions: ["product-intro", "service-level"],
 globalRanks: [48, 5],
 crossCountry: "Mexico visits described neighbor spillover when SKUs are turned off.",
 },
];
