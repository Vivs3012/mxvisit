export type PesquisaSectionId =
 | "sumario"
 | "metodo"
 | "voz-consumidor"
 | "churn"
 | "lovers-plus"
 | "operacao"
 | "sintese"
 | "prioridades"
 | "arquivos"
 | "competitors"
 | "sellers-couriers";

export const PESQUISAS_SECTIONS: {
 id: PesquisaSectionId;
 label: string;
 subtitle: string;
}[] = [
 { id: "sumario", label: "Executive summary", subtitle: "Updated thesis — consumer, churn, LP, operations and competitors" },
 { id: "metodo", label: "Method and sources", subtitle: "Scope, limitations and evidence cross-check" },
 { id: "voz-consumidor", label: "Consumer voice", subtitle: "1,630 Appbot reviews (Apr–Sep 2026)" },
 { id: "churn", label: "Churn and retention", subtitle: "Learning Agenda slides 13+ — framework, friction, value exit, event-driven" },
 { id: "lovers-plus", label: "Lovers Plus", subtitle: "Research Complete 3 — 5 blocos + transacional out/25–jan/26" },
 { id: "operacao", label: "Operations and markets", subtitle: "2026 Annual Review by country" },
 { id: "sellers-couriers", label: "Sellers and couriers", subtitle: "2026 clustering — 333 sellers, 794 couriers, 9+4 profiles" },
 { id: "sintese", label: "Integrated synthesis", subtitle: "Principles appearing across multiple sources" },
 { id: "prioridades", label: "Priorities", subtitle: "P0–P2 roadmap and minimum KPI panel" },
 { id: "arquivos", label: "Source files", subtitle: "PDFs, CSVs and consolidated deck" },
 { id: "competitors", label: "Competitors", subtitle: "LATAM benchmark — Rappi, PedidosYa, Justo and 2027 plan" },
];

export const PESQUISAS_META = {
 title: "Research — TaDa Delivery",
 period: "Apr–Sep 2026 · updated Sep 2026",
 scope: "7 fontes + benchmark competitors",
 subtitle:
 "Unified hub: TaDa Delivery consolidated report, churn, Lovers Plus, Annual Review, Appbot, sellers/couriers and LATAM benchmark.",
 reportPdf: "/outros/tada-delivery-insights-apr-sep-2026.pdf",
};

export const PESQUISAS_EXECUTIVE = {
 headline:
 "Sustainable growth = less friction + more predictability — not more persuasion or promotional complexity.",
 paragraphs: [
 "TaDa does not need to convince consumers to want beverages; it needs to be available, reliable and simple when the need appears. Reviews (1,630), churn survey (379), transactional data and Lovers Plus (111 + 5k/5k) converge: the bottleneck is operational consistency and post-failure recovery.",
 "Churn: US$60M GMV across four patterns — 40% gradual loss (US$24M), with churn rising from 62% → 74% at 3+ frictions. Value exit is not only price: ~60% move to physical retail, ~10% to a competing app. Event-driven churn: >35 min concentrates ~48% of the bucket.",
 "Lovers Plus proves the model: 92% Perfect Orders, 48% SLA 15 min (vs 35% Core). 74% bought outside the app in 30 days, but 76.6% would buy more if stock, hours and trust improved — intent exists, friction blocks it.",
 "2026 operations: 6.27M valid YTD orders; Colombia accelerates, Mexico monetizes (AOV +19.6%). Competitors: Rappi is the only benchmark across all three markets; TaDa should compare by mission and stakeholder, not copy breadth.",
 ],
 stats: [
 { label: "Reviews Appbot", value: "1.630", tone: "primary" as const },
 { label: "Polarização", value: "33% 1★ / 55% 5★", tone: "warning" as const },
 { label: "GMV churn (4 grupos)", value: "US$ 60M", tone: "danger" as const },
 { label: "Pedidos válidos YTD", value: "6,27M", tone: "success" as const },
 ],
 statsSecondary: [
 { label: "SLA 15 min LP vs Core", value: "48% / 35%", tone: "primary" as const },
 { label: "Churn c/ 3+ fricções", value: "74%", tone: "danger" as const },
 { label: "LP compra fora (30d)", value: "74%", tone: "info" as const },
 { label: "Benchmark LATAM", value: "MX · PE · CO", tone: "neutral" as const },
 ],
};

/** Executive summary navigation → Research sections */
export const SUMARIO_SECTION_GUIDE = [
 { section: "Consumer voice", insight: "3.44 polarization; account, bugs and delivery as critical themes" },
 { section: "Churn and retention", insight: "4 patterns, accumulated friction, physical retail exit, event >35 min" },
 { section: "Lovers Plus", insight: "Habit through predictability; SLA15 and favorite SKU; less promotion than Core" },
 { section: "Operations and markets", insight: "Country playbooks; Rewards CO/Mexico and Peru" },
 { section: "Synthesis and priorities", insight: "6 integrated principles; P0–P2 roadmap and minimum KPIs" },
 { section: "Competitors", insight: "Rappi cross-country; Turbo/ETA; post-Delivery Hero PE risk" },
 { section: "Sellers and couriers", insight: "Seller–courier delivery chain; Small in discovery vs Large anchor; 4 courier profiles" },
];

export const PESQUISAS_SOURCES = [
 {
 file: "Appbot_review_tier1_6months.csv",
 path: "/outros/appbot-review-tier1-6months.csv",
 sample: "1.630 reviews",
 period: "28 abr – 28 set 2026",
 use: "Voz espontânea, rating, sentimento e temas Appbot.",
 },
 {
 file: "Microsoft Loop23443.pdf",
 path: "/outros/microsoft-loop23443.pdf",
 sample: "379 respostas",
 period: "Churn survey",
 use: "Motivos de churn, alternativa atual e condições de retorno.",
 },
 {
 file: "Research - Lovers Plus_Complete 3.pdf",
 path: "/outros/research-lovers-plus-complete-3.pdf",
 sample: "111 respostas; 5k/cluster transacional",
 period: "Nov 2025; dados out 2025 – jan 2026",
 use: "Ocasiões, canais fora do app, Lovers Plus vs Core.",
 },
 {
 file: "Review Anual 2026 — TaDa.pdf",
 path: "/outros/review-anual-2026-tada.pdf",
 sample: "Operação por país",
 period: "Jan – set 2026 vs 2025",
 use: "Pedidos, clientes, lojas, qualidade e Rewards.",
 },
 {
 file: "TaDa Learning Agenda - April 2026.pdf",
 path: "/outros/tada-learning-agenda-april-2026.pdf",
 sample: "Experimentos e pilotos",
 period: "Agenda abril; update agosto 2026",
 use: "Aquisição, retenção, Puebla e fricções.",
 },
 {
 file: "analise_sellers_tada_2026 (PPTX)",
 path: "/outros/analise-sellers-tada-2026-com-entregadores-v3.pptx",
 sample: "Deck operacional",
 period: "2026",
 use: "Complemento sellers e entregadores (fora do PDF consolidado).",
 },
 {
 file: "TaDa_Delivery_Sellers_Couriers_Clusterizacao_2026.pdf",
 path: "/outros/tada-delivery-sellers-couriers-clusterizacao-2026.pdf",
 sample: "322 sellers pareados; 794 couriers",
 period: "Set 2026",
 use: "Clusterização, delivery chain, plano 90 dias e tabelas de perfil.",
 },
 {
 file: "sellers-survey-typeform-2026.csv",
 path: "/outros/sellers-survey-typeform-2026.csv",
 sample: "333 respostas",
 period: "Typeform sellers",
 use: "Operação, KPIs reconhecidos, satisfação e desafios abertos.",
 },
 {
 file: "couriers-survey-typeform-2026.csv",
 path: "/outros/couriers-survey-typeform-2026.csv",
 sample: "794 respostas",
 period: "Typeform couriers",
 use: "Fricções, horas, vínculo com loja e satisfação 0–5.",
 },
];

export const REVIEW_RATING_DIST = [
 { stars: "1★", count: 542, pct: 33.3 },
 { stars: "2★", count: 66, pct: 4.0 },
 { stars: "3★", count: 54, pct: 3.3 },
 { stars: "4★", count: 70, pct: 4.3 },
 { stars: "5★", count: 898, pct: 55.1 },
];

export const REVIEW_BY_STORE = [
 { store: "Google Play", reviews: 1243, avg: 3.4, oneStar: 34, fiveStar: 54, negSentiment: 39 },
 { store: "iOS", reviews: 387, avg: 3.58, oneStar: 31, fiveStar: 60, negSentiment: 34 },
];

export const REVIEW_BY_MONTH = [
 { month: "Abr*", avg: 2.83, oneStar: 50.0, fiveStar: 33.3, n: 12 },
 { month: "Mai", avg: 3.54, oneStar: 30.2, fiveStar: 56.7, n: 351 },
 { month: "Jun", avg: 3.46, oneStar: 32.0, fiveStar: 54.1, n: 394 },
 { month: "Jul", avg: 3.36, oneStar: 35.8, fiveStar: 55.3, n: 360 },
 { month: "Ago", avg: 3.39, oneStar: 35.0, fiveStar: 54.8, n: 283 },
 { month: "Set", avg: 3.46, oneStar: 33.0, fiveStar: 55.7, n: 230 },
];

export const APPBOT_TOPICS = [
 { theme: "Satisfied users", mentions: 477, negPct: 0, avg: 4.94 },
 { theme: "Performance", mentions: 153, negPct: 30, avg: 3.79 },
 { theme: "Customer Support", mentions: 113, negPct: 20, avg: 4.09 },
 { theme: "Bugs", mentions: 103, negPct: 82, avg: 1.81 },
 { theme: "Pricing", mentions: 96, negPct: 39, avg: 3.35 },
 { theme: "Security & Accounts", mentions: 89, negPct: 84, avg: 1.65 },
 { theme: "Design & UX", mentions: 68, negPct: 71, avg: 2.22 },
 { theme: "Connectivity", mentions: 41, negPct: 80, avg: 1.8 },
 { theme: "Payment", mentions: 23, negPct: 70, avg: 2.13 },
];

export const CHURN_PATTERNS = [
 { pattern: "Perda gradual de engajamento", share: "40%", gmv: "$24M", learning: "Atrasos, variabilidade, cancelamentos, disponibilidade e suporte acumulados." },
 { pattern: "Falha de onboarding", share: "27%", gmv: "$16,2M", learning: "Primeiras compras sem hábito no mês de aquisição." },
 { pattern: "Value exit", share: "26%", gmv: "$15,6M", learning: "Canal físico ou alternativa percebida como mais confiável." },
 { pattern: "Event driven", share: "7%", gmv: "$4,2M", learning: "Atraso >35 min, cancelamento ou CSAT negativo encerra a relação." },
];

export const CHURN_SURVEY_SIGNALS = [
 { question: "TaDa ainda era 1ª opção?", result: "76% sempre; 19% às vezes; 6% não", reading: "Quiebre de confiança, não ausência de relevância." },
 { question: "Onde compra hoje?", result: "40% super físico; 23% conveniência; 17% menos consumo; 10% app concorrente", reading: "Competição forte é previsibilidade física." },
 { question: "Preço vs alternativa", result: "56% similar; 18% TaDa mais cara; 22% mais barata", reading: "Preço não explica tudo — consistência importa." },
 { question: "Rapidez vs alternativa", result: "45% similar; 38% alternativa mais rápida; 17% TaDa mais rápida", reading: "Ganho precisa ser previsível, não só absoluto." },
 { question: "Confiança vs alternativa", result: "60% similar; 30% alternativa mais confiável; 10% TaDa", reading: "Alternativa vence no básico confiável." },
];

export const EVENT_DRIVEN_HEADLINE =
 "No bucket event driven, o principal driver é entrega >35 min — ~48% dos usuários churned neste grupo.";

export const EVENT_DRIVEN_HYPOTHESES = [
 {
 signal: "Último pedido recebido em >35 min e nunca recompraram",
 users: "4.149",
 gmv: "$2,0M",
 status: "Validado",
 domain: "Experiência",
 causality: "Forte",
 impact: "Médio",
 },
 {
 signal: "Cancelamento e nunca recompraram",
 users: "1.867",
 gmv: "$0,9M",
 status: "Validado",
 domain: "Experiência",
 causality: "Médio",
 impact: "Forte",
 },
 {
 signal: "Ticket CX resolvido com CSAT negativo e sem recompra",
 users: "213",
 gmv: "$0,106M",
 status: "Validado",
 domain: "Customer Care",
 causality: "Médio",
 impact: "Médio",
 },
 {
 signal: "Entrou no app com loja fora de operação e nunca recompraram",
 users: "—",
 gmv: "—",
 status: "Rejeitado",
 domain: "Experiência",
 causality: "Fraco",
 impact: "Fraco",
 },
];

export const EVENT_DRIVEN_INDICATORS = [
 { signal: "NPS <7 na última pesquisa e sem recompra", causality: "Forte", users: "961", gmv: "$478k" },
 { signal: "Rating do último pedido <3 e sem recompra", causality: "Forte", users: "207", gmv: "$103k" },
];

export const EVENT_DRIVEN_NOTE =
 "Outros event-driven (stockout, fora de serviço) não incluídos por restrição de dados.";

export const VALUE_EXIT_WHERE_BUY = [
 { channel: "Supermercado físico (Modelorama, OXXO, etc.)", pct: 40 },
 { channel: "Conveniência", pct: 23 },
 { channel: "Reduzi meu consumo", pct: 17 },
 { channel: "App concorrente (Rappi, DiDi, Uber Eats)", pct: 10 },
 { channel: "Compra direta distribuidor", pct: 5 },
 { channel: "Outro", pct: 5 },
];

export const VALUE_EXIT_CHURN_REASONS = [
 { reason: "Preço e promoções", pct: 28 },
 { reason: "Mudança de hábito", pct: 16 },
 { reason: "Disponibilidade de produto", pct: 13 },
 { reason: "Disponibilidade de serviço", pct: 12 },
 { reason: "Experiência de entrega", pct: 10 },
 { reason: "Cancelamentos", pct: 3 },
 { reason: "Outros", pct: 28 },
];

export const VALUE_EXIT_LA_NOTES = [
 "~60% dos churned compram agora em lojas físicas; apenas ~10% migraram para outro app on-demand.",
 "~28% citam churn por percepção preço vs valor vs concorrentes.",
 "~40% migraram por fricções de serviço; ~40% mencionam mais de um motivo.",
 "Value exit identificado via churn survey + comentários (classificação AI).",
];

export const CHURN_SURVEY_OPEN_THEMES = [
 { theme: "Envio & frio", quote: "Cobran mucho el envío, casi no dan cupones y no llegan tan frías" },
 { theme: "Desconto por volume", quote: "Es necesario comprar X cantidad para que te apliquen descuentos reales" },
 { theme: "Conta bloqueada", quote: "Porque me bloquearon mi cuenta aunque yo compartía mi código" },
 { theme: "Stock", quote: "Ya no encuentro la cerveza que a veces me gusta comprar" },
 { theme: "Cancelamentos", quote: "Me cancelaron varios pedidos en momentos clave" },
 { theme: "Fora de cobertura", quote: "Porque cerraron el servicio en mi ciudad" },
 { theme: "Suporte", quote: "No solucionan en su soporte ni atienden bien x el WhatsApp" },
 { theme: "SLA / atraso", quote: "Mi pedido llegó muy tarde en varias ocasiones y eso me hizo dejar de usar la app" },
 { theme: "Cerveja quente", quote: "Por los tenderos, cancelan o te mandan cerveza caliente" },
 { theme: "Incerteza de tempo", quote: "Nunca sé si me va a llegar en 10 minutos o 2 horas" },
 { theme: "Promoções", quote: "Las promociones ya no eran buenas y los precios eram más altos" },
 { theme: "Surtido", quote: "No tienen surtido y muchas veces no hay lo que necesito" },
 { theme: "Horário", quote: "Cierran temprano y es más fácil ir al oxxo" },
 { theme: "Fulfillment", quote: "Llega en mal estado o se equivocan de productos" },
];

export const CHURN_INTERVIEW_QUOTES = [
 {
 pattern: "Gradual loss",
 theme: "Delivery experience",
 quote:
 "Se tardaban hasta 40 minutos o más, me llegaban calientes… por eso ya dejé de usarla, por su ineficiencia.",
 },
 {
 pattern: "Gradual loss",
 theme: "Assortment + availability",
 quote: "Lo principal que yo quería ya no estaba… entonces dejé de usarla.",
 },
 {
 pattern: "Gradual loss",
 theme: "Horário + valor",
 quote: "El horario era muy reducido… mejor íbamos al Oxxo que sí estaba abierto.",
 },
 {
 pattern: "Gradual loss",
 theme: "UX / cupons",
 quote: "Después se volvió complicado… cupones, condiciones… ya no era fácil.",
 },
 {
 pattern: "Gradual loss",
 theme: "Sem loja disponível",
 quote: "Ya no había ninguna tienda disponible… entonces dejé de usarla.",
 },
 {
 pattern: "Gradual loss",
 theme: "Cancelamentos",
 quote: "Me cancelaban después de 40 minutos… perdía cupones y me fui a otra aplicación.",
 },
 {
 pattern: "Value exit",
 theme: "Preço",
 quote: "Para mí fue un tema de costo… prefiero comprar más barato en otro lado.",
 },
 {
 pattern: "Value exit",
 theme: "Preço vs valor",
 quote: "Entre el envío y la propina… mejor camino unas cuadras y me ahorro.",
 },
 {
 pattern: "Value exit",
 theme: "Menos consumo",
 quote: "Cambiaron mis hábitos… simplemente dejé de pedir.",
 },
 {
 pattern: "Event driven",
 theme: "Customer care / Rewards",
 quote: "Tenía puntos acumulados y nunca los pude usar… soporte no resolvió nada.",
 },
];

export const CHURN_OPPORTUNITIES_BY_PATTERN = [
 {
 pattern: "Gradual loss (40%)",
 gmv: "$24M",
 size: "~$8M oportunidade",
 summary: "Retenção corroída por fricções repetidas que reduzem frequência e confiança.",
 actions: [
 "Perfect Service >95%; criar KPI # fricções por consumidor (~$6M).",
 "Mapeamento unhappy path + prevenção proativa de churn (~$2M).",
 ],
 },
 {
 pattern: "Onboarding failure (27%)",
 gmv: "$16,2M",
 size: "—",
 summary: "Não converte intenção inicial em comportamento repetido no mês de aquisição.",
 actions: [
 "Entrevistas para causas raiz.",
 "Experimentos: frete grátis, WOW nas 3 primeiras compras, gamificação de missões.",
 ],
 },
 {
 pattern: "Value exit (26%)",
 gmv: "$15,6M",
 size: "~$1,5M+",
 summary: "Migra para offline por preço, stock e confiabilidade percebidos.",
 actions: [
 "Preço/promo — Club TaDa, loyalty rate >40% (~$2M GMV anual citado).",
 "Sortimento & stockout (WIP com Alejo & Gio).",
 "Produto: time to fulfill, Turbo, substituição SKU, automações CX.",
 ],
 },
 {
 pattern: "Event driven (7%)",
 gmv: "$4,2M",
 size: "~$1,5M",
 summary: "Experiência negativa única impacta reengajamento.",
 actions: [
 "Reduzir pedidos SLA >35 min em 50% (~$1M).",
 "Reduzir cancelamentos 50% (~$450k).",
 "CSAT 63% → 90%.",
 ],
 },
];

export const ONBOARDING_FAILURE_DETAIL = {
 share: "27%",
 gmv: "$16,2M",
 definition:
 "Never build a repeat habit after initial 2 purchases during acquisition month.",
 experiment: {
 name: "Welcome Experience (Welcome Kit)",
 market: "Puebla",
 investment: "~150k MXN",
 primaryKpi: "2+ pedidos no mês de aquisição: 40% → 48%",
 secondaryKpi: "FMR: 32% → 35% (+4 p.p.)",
 hypothesis:
 "Experiência memorável na 1ª compra aumenta probabilidade de 2+ pedidos no mês de aquisição vs baseline.",
 },
};

export const PROACTIVE_RECOVERY_DETAIL = {
 insight:
 "TaDa reage após ticket; fricções operacionais são driver principal de desengajamento gradual.",
 market: "Puebla",
 investment: "285k MXN (~16k USD)",
 duration: "3 meses",
 primaryKpi: "7d Reorder: 69,5% → 80% (+15%)",
 secondaryKpi: "Dias até reorder: 12,8 → 9,7 (−3 dias)",
 flow: "Revisão diária → fricção identificada → outreach proativo → contato seller → resolução antes do ticket.",
};

export const LOVERS_PLUS_KPIS = [
 { label: "Perfect Orders", lovers: "92%", core: "86%" },
 { label: "SLA 36 min", lovers: "94%", core: "90%" },
 { label: "SLA 15 min", lovers: "48%", core: "35%" },
 { label: "Promo por pedido", lovers: "5,22%", core: "7,46%" },
];

export const LOVERS_OCCASIONS = [
 { occasion: "Dia comum", pct: "39,6%" },
 { occasion: "Amigos em casa", pct: "34,2%" },
 { occasion: "Fim de semana", pct: "25,2%" },
 { occasion: "Futebol em casa", pct: "23,4%" },
 { occasion: "Reposição negócio", pct: "12,6%" },
];

export const LOVERS_WOULD_BUY_MORE = [
 { lever: "Preços/promoções iguais ou melhores", pct: 45 },
 { lever: "Marca preferida garantida", pct: 27.9 },
 { lever: "Entrega grátis ou menor custo", pct: 26.1 },
 { lever: "Pick-up / locker", pct: 14.4 },
 { lever: "Combos por ocasião", pct: 12.6 },
];

export const MARKET_SNAPSHOT = [
 { market: "México", reading: "Maior operação; AOV +19,6%; cancel. 5,2%→4,3%; SLA 92,4%→93,3%" },
 { market: "Colômbia", reading: "1,53M pedidos em 9m (>2025 full year); +13,6% clientes; 126 lojas novas" },
 { market: "Peru", reading: "Ritmo ~1,19M pedidos; SLA 95,1% (melhor rede); AOV +4%" },
 { market: "Bolívia", reading: "Crescimento sólido; SLA 91,6%→93,8%; clientes +10,5%" },
 { market: "Equador", reading: "Novos clientes 99,6k→39,6k; cancel. 4,8%→5,8%" },
 { market: "Panamá", reading: "SLA 88,8%→83,8%; tempo 22,1→24,6 min" },
];

export const ACQUISITION_EXPERIMENTS = [
 { name: "50% Awareness / 50% Performance", status: "Validada", result: "+17% NC incremental (Mérida/Tuxtla)" },
 { name: "Educational Ads", status: "Validada", result: "+90% scans; CAC blended −9% (Torreón)" },
 { name: "Jampp incremental", status: "Não validada", result: "−9 NC incrementais; CAC alto" },
 { name: "Corona Six Pack + frete grátis", status: "Preliminar", result: "+48% novos clientes; AOV +13%" },
];

export const RETENTION_EXPERIMENTS = [
 { name: "Welcome Experience", lever: "Onboarding", target: "FMR +4 p.p.; 2+ pedidos 40%→48%" },
 { name: "Proactive Consumer Recovery", lever: "Ops/CX", target: "7d reorder 69,5%→80%" },
 { name: "Perfect Service Improvement", lever: "Ops", target: "Perfect Service 88,5%→95%" },
 { name: "Communication Ecosystem", lever: "Produto", target: "Cancel. seller −20%; Perfect Service +3 p.p." },
 { name: "Hybrid Radius", lever: "Produto", target: "Fill rate s/ cancel. 97,37%→98,5–99%" },
 { name: "Turbo Delivery", lever: "Produto", target: "Adoção ≥10%; SLA compliance ≥90%" },
 { name: "Edit Order", lever: "Produto", target: "Same-day recovery 50,4%→>70%" },
 { name: "Real-time ETA", lever: "Produto", target: "ETA accuracy; menos WISMO" },
];

export const INTEGRATED_PRINCIPLES = [
 { principle: "Disponibilidade", evidence: "Reviews, churn survey, Lovers Plus e expansão de lojas (CO).", implication: "SKU líder visível; substituição com aprovação." },
 { principle: "Previsibilidade", evidence: "Churn gradual + SLA15 Lovers Plus + reviews de espera.", implication: "Promessa ‘sempre dentro de X’, não só pico de velocidade." },
 { principle: "Preço e promoções", evidence: "Abre a porta; 38% voltam por promo; hooks de aquisição.", implication: "Promo para aquisição; benefício de frequência para retenção." },
 { principle: "Recuperação", evidence: "Event driven, cupom perdido, Proactive Recovery.", implication: "Automática, rápida, medida por recompra." },
 { principle: "Esforço cognitivo", evidence: "Lovers repetem SKU; combos irrelevantes; app simples.", implication: "Reorder e status > vitrine complexa." },
 {
 principle: "Momentos offline",
 evidence: "60% churned em físico; Lovers perdem momentos para conveniência; rotina casa/amigos/eventos.",
 implication: "Urgência, retirada e recompra de marca favorita sem planejamento.",
 },
];

export const PRIORITY_ROADMAP = [
 { priority: "P0", action: "Recuperação de falhas críticas", metric: "7d reorder; GMV recuperado", horizon: "0–30d" },
 { priority: "P0", action: "Disponibilidade SKUs líderes", metric: "Fill rate; abandono por stockout", horizon: "0–30d" },
 { priority: "P0", action: "Conta, pagamento e suporte", metric: "1º contato; recompra pós-ticket", horizon: "0–30d" },
 { priority: "P1", action: "Perfect Service e SLA previsível", metric: "PS >95%; SLA 15/36", horizon: "30–90d" },
 { priority: "P1", action: "Onboarding e 2º pedido", metric: "2+ pedidos/mês; FMR", horizon: "30–90d" },
 { priority: "P2", action: "Turbo, ETA, Edit Order", metric: "Adoção Turbo; ETA accuracy", horizon: "90–180d" },
];

export const EXEC_DECISION_SIGNALS = [
 { signal: "Operação é retenção", evidence: "40% churn gradual (US$ 24M); churn 62%→74% com 3+ fricções", implication: "Perfect Service, SLA e # fricções/usuário antes de novas mecânicas promo." },
 { signal: "Consumidor ainda quer TaDa", evidence: "76% churn survey: TaDa era 1ª opção; 76,6% LP comprariam mais se fricções resolvidas", implication: "Quiebre de confiança — recuperação proativa antes do ticket." },
 { signal: "Lovers Plus = referência", evidence: "92% PO; 48% SLA15; 5,22% pedidos c/ promo vs 7,46% Core", implication: "Hábito e reconhecimento, não cupom a cada sessão." },
 { signal: "Perda é para o físico", evidence: "60% churned em loja/conveniência; 44% LP em OXXO/Modelorama", implication: "Horário, stock e previsibilidade vs apps on-demand." },
 { signal: "Reviews polarizados", evidence: "542×1★ vs 898×5★; Security & Accounts 84% neg.", implication: "Cadeia cancelamento → cupom → suporte → recompra." },
 { signal: "Competição por mercado", evidence: "Rappi nos 3 países; Uber MX; PedidosYa PE", implication: "Benchmark missão TaDa (bebidas + confiança), não superapp genérico." },
];

export const REVIEW_VOICE_QUOTES = [
 { theme: "Operação", quote: "Demoran de más en la entrega... me tardo menos yo al ir a la tienda" },
 { theme: "Conta e suporte", quote: "Me bloquearon la cuenta y... nunca te dan una explicación" },
 { theme: "Produto", quote: "Si no hay el producto bajenlo de la app" },
 { theme: "Valor", quote: "Me cancelaron mi pedido y... no me regresaron mi cupón" },
];

export const DATA_QUALITY_NOTES = [
 "Campo Country do CSV não é geográfico confiável (Spanish/English) — geografia vem do Review Anual.",
 "Temas Appbot não são exclusivos; menções não somam incidência na base.",
 "Comparação operacional 2026 usa 9 meses vs 12 em 2025 — usar ritmo anualizado.",
 "Lovers Plus: margem nacional ~±8,8 p.p.; recortes regionais são exploratórios.",
 "Churn survey: amostra 379 vs população calculada 25.254 — manter como nota de fonte.",
 "Categorias de texto aberto do Loop e classificações de churn são evidência de direção, não causalidade experimental.",
];

export const REPORT_MAP = [
 { num: "01", theme: "Sumário executivo", content: "Tese, KPIs e sinais para decisão (esta aba)" },
 { num: "02", theme: "Voz do consumidor", content: "1.630 reviews Appbot — polarização e temas" },
 { num: "03", theme: "Churn e retenção", content: "Learning Agenda + Loop — 4 padrões e fricções" },
 { num: "04", theme: "Lovers Plus", content: "Research MX — hábito, off-app, transacional" },
 { num: "05", theme: "Operação e mercados", content: "Review Anual 2026 por país" },
 { num: "06", theme: "Síntese + prioridades", content: "Princípios cruzados e roadmap P0–P2" },
 { num: "07", theme: "Competitors", content: "Benchmark Rappi · PedidosYa · Uber Eats" },
 { num: "08", theme: "Source files", content: "PDFs, CSVs and source inventory" },
];

export const INTERPRET_EVIDENCE_BULLETS = [
 "Reviews são comportamento espontâneo — localizam falhas e linguagem, mas não estimam incidência na base total.",
 "Temas Appbot não são mutuamente exclusivos; menções não devem ser somadas como pessoas.",
 "Comparação 2026 vs 2025 mistura 9 meses contra 12; usar ritmo anualizado quando possível.",
 "Lovers Plus: margem de erro nacional ~±8,8 p.p.; recortes regionais são exploratórios.",
 "Churn Survey: audiência ~20k vs calculador 25.254 população / 379 amostra — registrar a diferença.",
];

export const THESIS_LAYERS = [
 {
 layer: "Aquisição",
 detail:
 "Preço e recomendação (51% LP) abrem a porta; awareness 50/50 validou +17% NC incremental. Hook concreto (ex.: six pack + frete) supera frete grátis abstrato.",
 },
 {
 layer: "Ativação e hábito",
 detail:
 "Primeira experiência remove risco: SKU esperado, entrega na promessa e resolução sem esforço.",
 },
 {
 layer: "Retenção",
 detail:
 "Recorrência = previsibilidade. Lovers Plus: Perfect Orders, SLA 36 e sobretudo limiar de 15 minutos.",
 },
 {
 layer: "Recuperação",
 detail:
 "Promo traz de volta, mas não compensa stockout, cobertura, conta bloqueada ou falha de entrega sem operação confiável.",
 },
];

export const VOZ_DISTRIBUTION_NARRATIVE = [
 "A média 3,44 esconde extremos: 55,1% com 5 estrelas e 33,3% com 1 estrela — não é experiência uniformemente mediana.",
 "Maior risco de retenção: eventos que empurram para 1 estrela (conta, pagamento, cancelamento, stockout, atraso, suporte).",
 "Após abril (12 reviews), nota média entre 3,36 e 3,54; % de 1 estrela sobe até julho e permanece alta ago/set.",
];

export const APPBOT_TOPICS_FULL = [
 { theme: "Satisfied users", mentions: 477, negPct: 0, avg: 4.94 },
 { theme: "Performance", mentions: 153, negPct: 30, avg: 3.79 },
 { theme: "Customer Support", mentions: 113, negPct: 20, avg: 4.09 },
 { theme: "Bugs", mentions: 103, negPct: 82, avg: 1.81 },
 { theme: "Pricing", mentions: 96, negPct: 39, avg: 3.35 },
 { theme: "Dissatisfied users", mentions: 92, negPct: 100, avg: 1.1 },
 { theme: "Security & Accounts", mentions: 89, negPct: 84, avg: 1.65 },
 { theme: "Design & UX", mentions: 68, negPct: 71, avg: 2.22 },
 { theme: "Connectivity", mentions: 41, negPct: 80, avg: 1.8 },
 { theme: "Use cases", mentions: 34, negPct: 65, avg: 2.41 },
 { theme: "Gaming", mentions: 25, negPct: 92, avg: 1.44 },
 { theme: "Payment", mentions: 23, negPct: 70, avg: 2.13 },
 { theme: "Sign Up & Login", mentions: 19, negPct: 95, avg: 1.37 },
 { theme: "Privacy", mentions: 17, negPct: 94, avg: 1.24 },
 { theme: "Frequency", mentions: 16, negPct: 88, avg: 1.88 },
 { theme: "Devices", mentions: 14, negPct: 100, avg: 1.14 },
];

export const CUSTOM_TOPIC_MARKS = [
 { topic: "Delivery", reviews: 62 },
 { topic: "Rewards related", reviews: 28 },
 { topic: "Lack of product", reviews: 21 },
 { topic: "Performance (custom)", reviews: 6 },
];

export const THEME_DEEP_DIVES = [
 {
 title: "Acesso, conta e confiança",
 body:
 "Security & Accounts: 89 menções, 84% negativas, nota ~1,32. Conta bloqueada elimina recuperação de hábito.",
 },
 {
 title: "Bugs, conectividade e UX",
 body:
 "Bugs 82% negativas; Design & UX 71% negativas — travamentos, app que não abre, pagamento, bateria, fluxo interrompido.",
 },
 {
 title: "Suporte e recuperação",
 body:
 "Customer Support 113 menções, percepção desigual. Negativos: ausência de explicação ou reembolso prolonga frustração.",
 },
 {
 title: "Preço, promoções e Rewards",
 body:
 "Pricing 96 menções, sinal misto — valor claro ok; promoções/cupons que somem após falha geram reclamação.",
 },
 {
 title: "Performance e entrega",
 body:
 "Performance 153 menções; custom Delivery em 62. Velocidade, cobertura, cancelamento, produto frio, pedido errado.",
 },
 {
 title: "Disponibilidade de produto",
 body:
 "Lack of product 21 marcações — stockout e loja sem catálogo; SKU favorito ausente = falha de confiança.",
 },
];

export const REVIEW_ACTIONABLE = [
 "Medir eventos críticos encadeados: cancelamento → cupom/pontos → contato → resolução → recompra.",
 "Separar experiência boa (5★) de experiência sem risco — modos de falha em 1★ são severos.",
 "Conta, pagamento, suporte e Rewards são jornada de retenção — benefício inutilizável não conta.",
 "Instrumentar releases: v8.3.2 concentra 491 reviews — cruzar com coortes, não só volume.",
];

export const REVIEW_DECISION_QUESTION =
 "Quais eventos geram maior transição para 1★ e menor recompra em 7/30 dias? Ligar review, evento operacional e cohort.";

export const APPBOT_SUMMARY_STATS = [
 { label: "Período", value: "28/04 – 28/09/2026" },
 { label: "Sentimento positivo", value: "852 (52%)" },
 { label: "Sentimento negativo", value: "613 (38%)" },
 { label: "Google Play / iOS", value: "1.243 / 387" },
 { label: "Versão mais frequente", value: "8.3.2 (491 reviews)" },
 { label: "Sem custom topic", value: "1.519 reviews" },
];

export const REVIEW_BY_VERSION = [
 { version: "8.3.2", count: 491 },
 { version: "8.3.0", count: 335 },
 { version: "8.3.3", count: 254 },
 { version: "8.3.1", count: 144 },
 { version: "Sem versão", count: 155 },
];

export const CHURN_LA_SOURCE =
 "TaDa Learning Agenda — April 2026 (Retention / churn research, slides 13+)";

export const CHURN_FRAMEWORK_NOTES = [
 "Quatro padrões: como e quando o usuário desengaja (framework transacional + survey).",
 "7% do churn é involuntário (cobertura, conta bloqueada) — fora do framework.",
 "35% são compradores de uma única vez — fora do framework.",
 "Lost GMV = churned consumers × GMV médio anual do grupo.",
 "Insights consistentes entre dados transacionais e pesquisa.",
];

export const FRICTION_CHURN_BY_COUNT = [
 { frictions: "0", churnRate: 62 },
 { frictions: "1", churnRate: 63 },
 { frictions: "2", churnRate: 67 },
 { frictions: "3", churnRate: 69 },
 { frictions: ">3", churnRate: 74 },
];

export const FRICTION_CHURN_LIFT = "+11,7 p.p. de churn (0 fricção → >3 fricções)";

export const FRICTION_DEFINITION =
 "Fricção = qualquer issue que interrompe a experiência (cancelamentos, atrasos, tickets mal resolvidos, disponibilidade, rating baixo, fora do horário de operação). Stockout não incluído por limitação de dados.";

export const FRICTION_TOP_COMBINATIONS = [
 { combo: "Atrasos + variabilidade + cancelamentos", share: 32 },
 { combo: "Atrasos + variabilidade", share: 22 },
 { combo: "Cancelamentos + suporte", share: 14 },
 { combo: "Atrasos + cobertura", share: 12 },
 { combo: "Variabilidade + cobertura", share: 10 },
 { combo: "Outras combinações", share: 10 },
];

export const FRICTION_CHURN = [
 { frictions: "0 fricções", churnRate: "62%" },
 { frictions: "3+ fricções", churnRate: "74%" },
];

export const VALUE_EXIT_STATS = [
 { label: "Compram em físico/conveniência", value: "60%" },
 { label: "Migraram para app concorrente", value: "10%" },
 { label: "Comprariam mais se razões resolvidas (Lovers)", value: "76,6%" },
];

export const CHURN_RETURN_INSIGHT =
 "Promoções são o maior incentivo declarado para voltar, mas condições de retorno pedem disponibilidade, entrega e benefícios claros. Separar atração de recuperação.";

export const EVENT_INTERVENTIONS = [
 "Atraso >35 min: recuperação proativa, status, compensação, recompra 7d.",
 "Cancelamento: restaurar cupom/pontos, reorder com itens disponíveis, motivo real.",
 "CSAT negativo: risco de churn — resolução percebida e próxima compra possível.",
 "Rating/NPS baixo: pesquisa de causa cruzada com SLA, stock, cobertura, seller, courier.",
];

export const LOVERS_ENTRY_LOGIC = [
 "34,2% citam preços/promoções como razão principal.",
 "23,4% não sair de casa; 13,5% entrega rápida.",
 "51,4% descobriram TaDa por amigos — promessa fácil de contar e comprovar.",
 "Promo por pedido: 5,22% (Lovers) vs 7,46% (Core) — hábito vs estímulo.",
];

export const LOVERS_OCCASIONS_DETAIL = [
 { occasion: "Dia comum", pct: "39,6%", learning: "App integrada ao consumo cotidiano." },
 { occasion: "Amigos em casa", pct: "34,2%", learning: "Gatilho social e combos relevantes." },
 { occasion: "Fim de semana", pct: "25,2%", learning: "Conveniência em janelas previsíveis." },
 { occasion: "Futebol em casa", pct: "23,4%", learning: "Cross-sell e comunicação ocasional." },
 { occasion: "Reposição negócio", pct: "12,6%", learning: "Sortimento e formatos grandes." },
];

export const LOVERS_FORMAT_BULLETS = [
 "42,3% bebem cerveja 3+ vezes/semana; cerveja = 79,3% do mix Lovers Plus.",
 "81% consomem em até 2 dias — extensão da geladeira, não estoque longo.",
 "55% mesma marca/tamanho; 39% mudam por preço/indisponibilidade; 6% abandonam sem SKU favorito.",
 "Combos 3× mais relevantes no Core — mismatch de sortimento (sem cervejas/SKUs líderes na base).",
];

export const LOVERS_CATALOG_GAPS = [
 { category: "Snacks", pct: "36,9%" },
 { category: "Grocery", pct: "25,2%" },
 { category: "Ready-to-eat", pct: "25,2%" },
 { category: "Spirits", pct: "23,4%" },
 { category: "Wines", pct: "22,5%" },
 { category: "Meats", pct: "22,5%" },
];

export const LOVERS_OUTSIDE_APP =
 "74% compraram fora da TaDa nos últimos 30 dias; principal destino é varejo físico (resposta múltipla).";

export const MARKET_DETAIL = [
 {
 market: "México",
 leitura: "Maior operação",
 evidencia: "AOV +19,6%; cancel. 5,2%→4,3%; SLA 92,4%→93,3%; tempo 20,6→19,4 min",
 implicacao: "Proteger eficiência e qualidade na maior base.",
 },
 {
 market: "Colômbia",
 leitura: "Motor de crescimento",
 evidencia: "1,53M pedidos em 9m (>1,52M 2025); +13,6% clientes; 126 lojas novas vs 75",
 implicacao: "Escalar Rewards, lojas e aquisição.",
 },
 {
 market: "Peru",
 leitura: "Estável com qualidade",
 evidencia: "Ritmo ~1,19M pedidos; SLA 95,1%; AOV +4%",
 implicacao: "Referência operacional; explorar Rewards.",
 },
 {
 market: "Bolívia",
 leitura: "Crescimento sólido",
 evidencia: "274k pedidos 9m vs 254k 2025; SLA 91,6%→93,8%; clientes +10,5%",
 implicacao: "Expandir sem perder confiabilidade.",
 },
 {
 market: "Equador",
 leitura: "Retração de aquisição",
 evidencia: "Ritmo ~580k pedidos; novos 99,6k→39,6k; cancel. 4,8%→5,8%",
 implicacao: "Diagnosticar aquisição e disponibilidade antes de investir.",
 },
 {
 market: "Panamá",
 leitura: "Desafio operacional",
 evidencia: "SLA 88,8%→83,8%; tempo 22,1→24,6 min; rating 4,82→4,78",
 implicacao: "Corrigir serviço e cobertura antes de crescer.",
 },
 {
 market: "Rep. Dominicana",
 leitura: "Operação encerrada",
 evidencia: "3.298 pedidos 2026 vs 232,7k 2025",
 implicacao: "Encerramento, não queda ordinária.",
 },
];

export const REWARDS_DETAIL = [
 { market: "Colômbia", detail: "Enrolled +97%; pontos queimados +183%; cupons resgatados +294%" },
 { market: "México", detail: "Cupons resgatados +37%; pontos queimados +39%" },
 { market: "Peru", detail: "Lançamento 2026 — 22k usuários enrolled" },
];

export const STORES_NOTE =
 "319 novas lojas em 2026 (CO 126, MX 146). Evitar classificação de ‘líder’ conflitante com os números do Review Anual.";

export const ACQUISITION_CONTEXT = {
 baseline2025: "237k novos clientes",
 opportunityGross: "386,3k (levers somados, sobreposição possível)",
 realization75: "~349k NC (75% de realização assumida)",
};

export const ACQUISITION_EXPERIMENTS_FULL = [
 {
 name: "50% Awareness / 50% Performance",
 status: "Validada",
 result: "+17% NC incremental (Mérida e Tuxtla)",
 learning: "Rollout nacional mantendo validação de incrementalidade.",
 },
 {
 name: "Educational Ads",
 status: "Validada",
 result: "+90% scans, +90% New Drinkers; CAC blended −9% (Torreón)",
 learning: "Vídeo explicou mecânicas complexas melhor que estáticos.",
 },
 {
 name: "Jampp incremental",
 status: "Não validada",
 result: "−9 NC incrementais vs controle sintético (3 semanas); CAC alto",
 learning: "Pausar, recalibrar MMM antes de escalar.",
 },
 {
 name: "Corona Six Pack + frete grátis",
 status: "Ativa / preliminar",
 result: "+48% NC; AOV +13%; 72,1% adotaram hook",
 learning: "Produto tangível torna frete grátis compreensível; medir ROI e retenção.",
 },
];

export const ACQUISITION_READINGS = [
 "Awareness com lift incremental consistente em três controles sintéticos — não é gasto sem retorno.",
 "Mix por incrementalidade, não atribuição — CAC observado pode mudar por composição.",
 "Ofertas reduzem risco com valor visualmente claro (hook concreto).",
 "Jampp: MMM sugeriu oportunidade que o teste não confirmou — calibrar modelo.",
];

export const RETENTION_EXPERIMENTS_FULL = [
 { name: "Welcome Experience", lever: "Onboarding", target: "FMR +4 p.p.; 2+ pedidos 40%→48%", scope: "Q3; Puebla; ~150k MXN" },
 { name: "Proactive Consumer Recovery", lever: "Ops/CX", target: "7d reorder 69,5%→80%; dias reorder 12,8→9,7", scope: "Piloto Puebla; 285k MXN" },
 { name: "Perfect Service Improvement", lever: "Ops", target: "Perfect Service 88,5%→95%", scope: "Piloto Puebla" },
 { name: "Communication Ecosystem", lever: "Produto/ops", target: "Cancel. seller −20%; courier −30%; PS +3 p.p.", scope: "Q3" },
 { name: "Hybrid Radius", lever: "Produto/seller", target: "Fill rate 97,37%→98,5–99%; recovered ~2x", scope: "Q3" },
 { name: "Turbo Delivery", lever: "Produto", target: "Adoção ≥10%; SLA compliance ≥90%", scope: "Q3" },
 { name: "Edit Order", lever: "Produto", target: "Same-day recovery 50,4%→>70%", scope: "Q3" },
 { name: "Real-time ETA", lever: "Produto", target: "ETA accuracy; menos WISMO", scope: "Q3" },
];

export const PUEBLA_TREND = [
 { metric: "Perfect Service", from: "89% (mar)", to: "86% (jul)" },
 { metric: "30d Reorder", from: "60% (fev)", to: "52% (jul)" },
];

export const CANCELLATION_ROOTS = [
 { type: "Consumidor", share: "56,8%", causes: "Mudar/adicionar produtos, endereço, pagamento, demora" },
 { type: "Seller", share: "22,7%", causes: "Stockout, área de risco, problema operacional" },
 { type: "Courier", share: "20,5%", causes: "Outros, endereço incorreto, consumidor cancelou, código" },
];

export const PRIORITY_ROADMAP_FULL = [
 { priority: "P0", action: "Recuperação de falhas críticas", problem: "Cancelamento, atraso >35 min, CSAT negativo, cupom perdido", metric: "7d reorder; GMV recuperado", horizon: "0–30 dias" },
 { priority: "P0", action: "Disponibilidade SKUs líderes", problem: "Stockout, lojas fechadas, substituição sem consentimento", metric: "Fill rate; abandono por indisponibilidade", horizon: "0–30 dias" },
 { priority: "P0", action: "Conta, pagamento e suporte", problem: "Bloqueios sem explicação, checkout e resolução lenta", metric: "1º contato; recompra pós-ticket", horizon: "0–30 dias" },
 { priority: "P1", action: "Perfect Service e SLA previsível", problem: "Atrasos e variabilidade corroem hábito", metric: "PS >95%; SLA 15/36; fricções/usuário", horizon: "30–90 dias" },
 { priority: "P1", action: "Onboarding e segundo pedido", problem: "27% churn = falha de onboarding", metric: "2+ pedidos/mês; FMR; 7d reorder", horizon: "30–90 dias" },
 { priority: "P1", action: "Benefícios por frequência", problem: "Lovers valorizam reconhecimento e previsibilidade", metric: "Loyalty rate; uso de benefícios; margem", horizon: "30–90 dias" },
 { priority: "P2", action: "Turbo, ETA e Edit Order", problem: "Espera percebida e abandono de mudanças", metric: "Turbo adoption; ETA accuracy; same-day recovery", horizon: "90–180 dias" },
 { priority: "P2", action: "Híbrido, pickup e offline", problem: "Momentos perdidos para conveniência física", metric: "Recovered orders; pickup adoption", horizon: "90–180 dias" },
 { priority: "P2", action: "Sortimento e combos por ocasião", problem: "Snacks, grocery, RTE, combos com SKUs favoritos", metric: "AOV; attach rate; margem", horizon: "90–180 dias" },
];

export const KPI_PANEL = [
 { domain: "Retenção", kpi: "30d Reorder Rate", cut: "Por cohort e por evento de fricção", why: "Recupera frequência de verdade." },
 { domain: "Operação", kpi: "Perfect Service", cut: "Seller, courier, cidade, pico", why: "Confiabilidade composta." },
 { domain: "Entrega", kpi: "SLA 15 e 36 min", cut: "Share na promessa; p50/p90", why: "Previsibilidade vs pico." },
 { domain: "Catálogo", kpi: "Disponibilidade SKU favorito", cut: "Top SKUs, lojas, horários", why: "Pré-condição de recorrência." },
 { domain: "Recuperação", kpi: "GMV recuperado pós-falha", cut: "Atraso, cancel., ticket negativo", why: "Resultado, não volume de tickets." },
 { domain: "Aquisição", kpi: "NC incremental e CAC blended", cut: "Por canal e teste", why: "Evita escalar atribuição sem lift." },
 { domain: "Valor", kpi: "AOV, MACO, loyalty rate", cut: "Por cluster e benefício", why: "Crescimento com margem." },
];

export const OPEN_QUESTIONS = [
 "Elasticidade de recompra por tipo de falha e tempo de resolução?",
 "Quais SKUs/cidades concentram perda de Lovers Plus por indisponibilidade?",
 "SLA 15 min é causal ou marcador de operação melhor? Testar experimentalmente.",
 "Quais benefícios Rewards aumentam frequência sem destruir MACO?",
 "Causa da queda de aquisição no Equador e deterioramento no Panamá?",
 "Relação entre reviews 1★, versões do app e incidentes operacionais no mesmo período?",
];

export const SOURCE_INVENTORY = [
 { source: "Appbot", learning: "Experiência polarizada; conta, app, suporte, entrega e valor = alto risco.", next: "Ligar reviews, incidentes e recompra." },
 { source: "Churn Survey", learning: "Preferência mantida, saída por stock, cobertura, entrega, preço, benefícios.", next: "Separar promo de resolução estrutural." },
 { source: "Lovers Plus", learning: "Hábito = previsibilidade, SKUs favoritos, uso social, limiar de serviço.", next: "Replicar ops e reduzir esforço cognitivo." },
 { source: "Review Anual", learning: "CO acelera; MX escala/monetiza; PE/BO crescem; EC/PA intervenção distinta.", next: "Playbooks por mercado." },
 { source: "Learning Agenda", learning: "Awareness/educação validaram; Jampp não; retenção com 8 experimentos.", next: "Escalar validado; fechar ciclos." },
 { source: "Sellers e couriers", learning: "delivery chain é o gargalo; Small in discovery precisa rotina mínima; courier quer previsibilidade.", next: "Pilotos contato/endereço + métricas acionáveis por cluster." },
];

export const CLOSING_STATEMENT =
 "Próxima fase = sistema de confiança: adquirir com valor claro, entregar com previsibilidade, manter disponibilidade, resolver falhas antes do abandono e reforçar recorrência com benefícios simples.";

export const SINTESE_BRIDGE =
 "Aquisição só vira crescimento lucrativo quando a jornada pós-clique não devolve o consumidor à loja física. Ponto crítico: transição entre 1ª compra e 2º pedido (onboarding, disponibilidade, PS, recuperação).";

export const PRIORITIZATION_PRINCIPLE =
 "Toda iniciativa deve declarar qual fricção remove, em qual etapa da jornada atua, qual métrica muda e qual risco pode aumentar.";
