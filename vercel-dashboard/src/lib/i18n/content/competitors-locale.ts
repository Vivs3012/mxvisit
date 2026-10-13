import {
 COMPETITORS_EXECUTIVE_SUMMARY,
 COMPETITORS_META,
 COMPETITIVE_MAP,
 COUNTRY_ANALYSIS,
 DECISION_INSIGHTS,
 INNOVATIONS_2026,
 PLAN_2027,
 TADA_RECOMMENDATIONS,
 WATCHLIST_2027,
 type CompetitorPlatform,
 type PlanConfidence,
} from "../../competitors-data";
import {
 BENCHMARK_FOOTER_PT,
 CONFIDENCE_PT,
 DECISION_INSIGHTS_PT,
 INNOVATION_STATUS_PT,
 INNOVATIONS_READING_PT,
 SOURCES_FOOTER_PT,
} from "./competitors-content-pt";
import type { Locale } from "../locale";

const META_PT = {
 title: "Benchmark delivery — México, Peru e Colômbia",
 cutDate: "9 set 2026",
 scope: "Rappi · PedidosYa · Uber Eats",
 subtitle:
 "Pesquisa competitiva para benchmark de produto TaDa: mapa por país, consumidor, operações, inovações 2026 e watchlist 2027.",
};

const EXEC_PT = {
 headline:
 "Rappi é o único benchmark cross-country nos três mercados; a competição direta muda por país — Uber Eats no México, PedidosYa no Peru, Rappi sem rival ativo deste grupo na Colômbia.",
 paragraphs: [
 "Em 2026, Rappi focou em quick commerce, IA, cobertura e eficiência logística. PedidosYa no Peru priorizou densificação, non-food e fintech de parceiros. Uber Eats no México expandiu retail, ads, last-mile e mobilidade.",
 "Para 2027, o evento corporativo com data pública é a oferta da Uber pela Delivery Hero (fechamento esperado no 2º semestre), incluindo PedidosYa Peru — até o fechamento, as empresas seguem independentes.",
 "Para o TaDa: comparar por missão e stakeholder, não telas isoladas. Peru é o mercado de maior risco e oportunidade; México exige testar a mesma missão em superapp vs ecossistema de mobilidade.",
 ],
 stats: [
 { label: "Plataformas", value: "3" },
 { label: "Países cobertos", value: "3" },
 { label: "Fontes", value: "39" },
 { label: "Horizonte", value: "2026–27" },
 ],
};

const MAP_READING_PT: Record<CompetitorPlatform, string> = {
 Rappi: "Único benchmark cross-country; superapp multivertical",
 PedidosYa: "Benchmark-chave de densidade, parceiros e fintech no Peru",
 "Uber Eats": "Ecossistema mobilidade + delivery só no México",
};

const STATUS_PT: Record<string, string> = {
 Active: "Ativo",
 "Not active": "Inativo",
 "Exited 2020": "Saiu em 2020",
};

export const COMPETITORS_LABELS = {
 en: {
 competitiveMap: "Competitive map by country",
 platform: "Platform",
 mexico: "Mexico",
 peru: "Peru",
 colombia: "Colombia",
 reading: "Reading",
 },
 pt: {
 competitiveMap: "Mapa competitivo por país",
 platform: "Plataforma",
 mexico: "México",
 peru: "Peru",
 colombia: "Colômbia",
 reading: "Leitura",
 },
};

export function getCompetitorsMeta(locale: Locale) {
 return locale === "pt" ? META_PT : COMPETITORS_META;
}

export function getCompetitorsExecutive(locale: Locale) {
 return locale === "pt" ? EXEC_PT : COMPETITORS_EXECUTIVE_SUMMARY;
}

export function getCompetitiveMapRows(locale: Locale) {
 return COMPETITIVE_MAP.map((row) => ({
...row,
 mexico: locale === "pt" ? (STATUS_PT[row.mexico] ?? row.mexico) : row.mexico,
 peru: locale === "pt" ? (STATUS_PT[row.peru] ?? row.peru) : row.peru,
 colombia: locale === "pt" ? (STATUS_PT[row.colombia] ?? row.colombia) : row.colombia,
 reading: locale === "pt" ? MAP_READING_PT[row.platform] : row.reading,
 }));
}

export function getCompetitorsLabels(locale: Locale) {
 return locale === "pt" ? COMPETITORS_LABELS.pt : COMPETITORS_LABELS.en;
}

export const COMPETITORS_SECTIONS = {
 en: {
 decisionInsights: "Decision insights",
 productArchitecture: "Product architecture by audience",
 consumerBenchmark: "Benchmark — consumer app",
 opsBenchmark: "Benchmark — operations",
 opsHighlights: "2026 operations highlights",
 countryAnalysis: "Country analysis",
 tadaImplication: "TaDa implication",
 audienceCol: "Audience",
 productsCol: "Products",
 consumerRow: "Consumer",
 courierRow: "Courier",
 merchantRow: "Merchant",
 logisticsRow: "Logistics",
 capabilityCol: "Capability",
 blockCol: "Block",
 innovations: "Innovations observed in 2026",
 plan2027Title: "2027 plan & watchlist",
 watchlist: "2027 watchlist",
 regulation: "Regulation → product requirements",
 recommendationsTitle: "Benchmark recommendations for TaDa",
 consumerExp: "Consumer experience",
 operations: "Operations",
 recommendedKpis: "Recommended KPIs",
 competitorLabel: "Competitor:",
 rappiLabel: "Rappi:",
 productLabel: "Product:",
 companyCol: "Company",
 scopeCol: "Scope",
 innovationCol: "Innovation",
 impactCol: "Impact",
 statusCol: "Status",
 themeCol: "Theme",
 entityCol: "Entity",
 evidenceCol: "Evidence",
 confidenceCol: "Confidence",
 implicationCol: "Implication",
 stakeholderCol: "Stakeholder",
 acquisitionCol: "Acquisition",
 engagementCol: "Engagement",
 reliabilityCol: "Reliability",
 },
 pt: {
 decisionInsights: "Insights de decisão",
 productArchitecture: "Arquitetura de produto por audiência",
 consumerBenchmark: "Benchmark — app consumidor",
 opsBenchmark: "Benchmark — operações",
 opsHighlights: "Destaques operacionais 2026",
 countryAnalysis: "Análise por país",
 tadaImplication: "Implicação TaDa",
 audienceCol: "Audiência",
 productsCol: "Produtos",
 consumerRow: "Consumidor",
 courierRow: "Courier",
 merchantRow: "Merchant",
 logisticsRow: "Logística",
 capabilityCol: "Capacidade",
 blockCol: "Bloco",
 innovations: "Inovações observadas em 2026",
 plan2027Title: "Plano 2027 e watchlist",
 watchlist: "Watchlist 2027",
 regulation: "Regulação → requisitos de produto",
 recommendationsTitle: "Recomendações de benchmark para TaDa",
 consumerExp: "Experiência do consumidor",
 operations: "Operações",
 recommendedKpis: "KPIs recomendados",
 competitorLabel: "Concorrente:",
 rappiLabel: "Rappi:",
 productLabel: "Produto:",
 companyCol: "Empresa",
 scopeCol: "Escopo",
 innovationCol: "Inovação",
 impactCol: "Impacto",
 statusCol: "Status",
 themeCol: "Tema",
 entityCol: "Entidade",
 evidenceCol: "Evidência",
 confidenceCol: "Confiança",
 implicationCol: "Implicação",
 stakeholderCol: "Stakeholder",
 acquisitionCol: "Aquisição",
 engagementCol: "Engajamento",
 reliabilityCol: "Confiabilidade",
 },
};

export function getCompetitorsSectionLabels(locale: Locale) {
 return locale === "pt" ? COMPETITORS_SECTIONS.pt : COMPETITORS_SECTIONS.en;
}

export function getDecisionInsights(locale: Locale) {
 return locale === "pt" ? DECISION_INSIGHTS_PT : DECISION_INSIGHTS;
}

export function getCountryAnalysis(locale: Locale) {
 if (locale === "en") return COUNTRY_ANALYSIS;
 return COUNTRY_ANALYSIS.map((c) => ({
...c,
 matchup: c.matchup
.replace("Rappi vs Uber Eats", "Rappi vs Uber Eats")
.replace("PedidosYa vs Rappi", "PedidosYa vs Rappi")
.replace("Rappi (no active rival from this group)", "Rappi (sem rival ativo deste grupo)"),
 rappi: translateCountryField(c.rappi),
 competitor: translateCountryField(c.competitor),
 tadaImplication: translateCountryField(c.tadaImplication),
 }));
}

function translateCountryField(text: string): string {
 const map: Record<string, string> = {
 "Broader superapp; aggressive Turbo with Chedraui (<10 min, 8 cities, 5k+ products, 80+ dark stores). Credit campaigns when SLA fails.":
 "Superapp mais ampla; Turbo agressivo com Chedraui (<10 min, 8 cidades, 5k+ produtos, 80+ dark stores). Campanhas de crédito quando o SLA falha.",
 "OXXO in 70 cities; World Cup Pickup, groups and OpenTable; 115+ cities, 60k+ partners. Uber Direct + EnviaTodo.":
 "OXXO em 70 cidades; Pickup Copa, grupos e OpenTable; 115+ cidades, 60k+ parceiros. Uber Direct + EnviaTodo.",
 "Competition is not restaurants only — test the same mission: emergency, group, scheduled, pickup, post-delivery and real subscription savings.":
 "A competição não é só restaurantes — testar a mesma missão: urgência, grupo, agendado, pickup, pós-entrega e economia real de assinatura.",
 "Superapp, expansion (Tacna Mar/2026), electric Turbo with Mobi (500 slots, -40% daily cost in pilot).":
 "Superapp, expansão (Tacna mar/2026), Turbo elétrico com Mobi (500 slots, -40% custo diário no piloto).",
 "100 districts, 11 provinces; target 30%+ orders/revenue, 14.5k stores, 10k couriers; non-food 15%→20–25%.":
 "100 distritos, 11 províncias; meta 30%+ pedidos/receita, 14,5k lojas, 10k couriers; non-food 15%→20–25%.",
 "Best market to compare focused strategy vs superapp. Uber/Delivery Hero watchlist may shift the fight in 2027.":
 "Melhor mercado para comparar estratégia focada vs superapp. Watchlist Uber/Delivery Hero pode mudar a briga em 2027.",
 "Rappi's largest market; +30% growth, 50k merchants, 70k couriers, 10M opens/week. Non-food mix 45%. Medellín: 400k orders/week, Turbo <15 min in 70%+.":
 "Maior mercado da Rappi; +30% crescimento, 50k merchants, 70k couriers, 10M aberturas/semana. Mix non-food 45%. Medellín: 400k pedidos/semana, Turbo <15 min em 70%+.",
 "Uber Eats exited in 2020.": "Uber Eats saiu em 2020.",
 "External benchmark + evaluation by city/segment. Test quality outside dense zones.":
 "Benchmark externo + avaliação por cidade/segmento. Testar qualidade fora de zonas densas.",
 };
 return map[text] ?? text;
}

export function getInnovations2026(locale: Locale) {
 if (locale === "en") return INNOVATIONS_2026;
 return INNOVATIONS_2026.map((row) => ({
...row,
 scope: row.scope === "Regional" ? "Regional" : row.scope === "Mexico" ? "México" : row.scope === "Peru" ? "Peru" : row.scope,
 innovation: translateInnovation(row.innovation),
 impact: translateInnovationImpact(row.impact),
 status: INNOVATION_STATUS_PT[row.status] ?? row.status,
 }));
}

function translateInnovation(s: string): string {
 const m: Record<string, string> = {
 "Redesigned post-purchase (address, tracking, support)": "Pós-compra redesenhado (endereço, rastreio, suporte)",
 "AI merchant catalog (image/PDF)": "Catálogo merchant com IA (imagem/PDF)",
 "Chedraui Turbo <10 min": "Chedraui Turbo <10 min",
 "Electric Turbo ecosystem": "Ecossistema Turbo elétrico",
 "Densification and non-food": "Densificação e non-food",
 "Courier vehicle credit + fintech": "Crédito veículo courier + fintech",
 "OXXO, Pickup, groups, OpenTable": "OXXO, Pickup, grupos, OpenTable",
 "Uber Direct + EnviaTodo": "Uber Direct + EnviaTodo",
 "Cart Assistant for retail": "Cart Assistant para retail",
 "R2 credit in app": "Crédito R2 no app",
 };
 return m[s] ?? s;
}

function translateInnovationImpact(s: string): string {
 const m: Record<string, string> = {
 "Reduces uncertainty and support cost": "Reduz incerteza e custo de suporte",
 "Faster activation": "Ativação mais rápida",
 "Quick commerce at store price": "Quick commerce a preço de loja",
 "Variable cost and credit": "Custo variável e crédito",
 "Frequency beyond restaurants": "Frequência além de restaurantes",
 "Capacity and liquidity": "Capacidade e liquidez",
 "More consumption occasions": "Mais ocasiões de consumo",
 "Network beyond marketplace": "Rede além do marketplace",
 "Reduces basket effort": "Reduz esforço do carrinho",
 "Courier/driver retention": "Retenção courier/driver",
 };
 return m[s] ?? s;
}

export function getPlan2027(locale: Locale) {
 if (locale === "en") return PLAN_2027;
 return PLAN_2027.map((row) => ({
...row,
 theme: translatePlanTheme(row.theme),
 evidence: translatePlanEvidence(row.evidence),
 implication: translatePlanImplication(row.implication),
 confidence: row.confidence,
 }));
}

export function localizeConfidence(c: PlanConfidence, locale: Locale): string {
 return locale === "pt" ? CONFIDENCE_PT[c] : c;
}

function translatePlanTheme(t: string): string {
 const m: Record<string, string> = {
 "Delivery Hero acquisition": "Aquisição Delivery Hero",
 "Partner fintech": "Fintech de parceiros",
 "AI & automation": "IA e automação",
 "Integrated platform": "Plataforma integrada",
 };
 return m[t] ?? t;
}

function translatePlanEvidence(t: string): string {
 const m: Record<string, string> = {
 "Closing expected H2 2027": "Fechamento esperado 2º sem 2027",
 "Payments late 2026 and 2027": "Pagamentos fim 2026 e 2027",
 "Recommendation, support, forecasting, store": "Recomendação, suporte, forecast, loja",
 "Unified search mobility + delivery + retail": "Busca unificada mobilidade + delivery + retail",
 };
 return m[t] ?? t;
}

function translatePlanImplication(t: string): string {
 const m: Record<string, string> = {
 "May connect mobility, subscription, ads and delivery; brand and app unknown":
 "Pode conectar mobilidade, assinatura, ads e delivery; marca e app desconhecidos",
 "Merchant/courier retention; risk controls": "Retenção merchant/courier; controles de risco",
 "Next layer with quality control": "Próxima camada com controle de qualidade",
 "If DH closes, denser economic logic in Peru": "Se DH fechar, lógica econômica mais densa no Peru",
 };
 return m[t] ?? t;
}

export function getTadaRecommendations(locale: Locale) {
 if (locale === "en") return TADA_RECOMMENDATIONS;
 return {
 consumer: [
 "Comparar preço total e previsibilidade: item, taxas, desconto líquido, ETA e compensação para mesmo carrinho/distância.",
 "Testar descoberta em 4 ocasiões: refeição imediata, compra urgente, cesta planejada e pedido em grupo.",
 "Avaliar assinatura por valor realizado — economia após taxas, frequência incremental e churn.",
 "Incluir recuperação de falha: item faltando, endereço errado, atraso, reembolso.",
 ],
 operations: [
 "Tempo até 1º pedido do merchant, completude de catálogo, rupturas e latência de atualização de preço.",
 "Qualidade econômica de ads: ROAS, canibalização e transparência de crédito.",
 "Compliance do courier como feature: cadastro, benefícios, horas e recursos.",
 "Separar velocidade de confiabilidade: ETA P50/P90, cancelamento, reatribuição.",
 "Finanças embutidas por resultado: aprovação, churn, disponibilidade e inadimplência.",
 ],
 };
}

export function getWatchlist2027(locale: Locale) {
 if (locale === "en") return WATCHLIST_2027;
 return [
 "Oferta Uber/Delivery Hero: aprovações, fechamento e decisões sobre PedidosYa Peru.",
 "Rappi: IA por país, expansão Turbo, unit economics e evolução Rappi Pro.",
 "PedidosYa Peru: crédito veículo, pagamentos, share non-food e metas 2026.",
 "Uber México: Cart Assistant, busca unificada, Uber One internacional e Uber Direct.",
 "Regulação: regras CO, continuidade MX (IMSS) e implementação PE (DL 1729).",
 ];
}

export function getInnovationsReading(locale: Locale) {
 return locale === "pt" ? INNOVATIONS_READING_PT : "Reading: Rappi innovated on physical promise and back-office automation; Uber connected more demand surfaces to the network; PedidosYa published a commercial and financial agenda.";
}

export function getBenchmarkFooter(locale: Locale) {
 return locale === "pt"
 ? BENCHMARK_FOOTER_PT
 : "Benchmarking should combine real journeys, network metrics and interviews with consumers, merchants and couriers — not isolated screen comparisons.";
}

export function getSourcesFooter(locale: Locale, cutDate: string) {
 return locale === "pt" ? SOURCES_FOOTER_PT(cutDate) : `Sources consulted through ${cutDate} (39 in full document):`;
}
