import { PESQUISAS_EXECUTIVE, PESQUISAS_META } from "../../pesquisas-data";
import type { Locale } from "../locale";

const PESQUISAS_META_PT = {
 title: "Pesquisa — TaDa Delivery",
 period: "Abr–set 2026 · atualizado set 2026",
 scope: "7 fontes + benchmark concorrentes",
 subtitle:
 "Hub unificado: relatório consolidado TaDa Delivery, churn, Lovers Plus, Annual Review, Appbot, sellers/couriers e benchmark LATAM.",
 reportPdf: PESQUISAS_META.reportPdf,
};

const PESQUISAS_EXECUTIVE_PT = {
 headline:
 "Crescimento sustentável = menos fricção + mais previsibilidade — não mais persuasão ou complexidade promocional.",
 paragraphs: [
 "O TaDa não precisa convencer o consumidor a querer bebidas; precisa estar disponível, confiável e simples quando a necessidade aparece. Reviews (1.630), survey de churn (379), dados transacionais e Lovers Plus (111 + 5k/5k) convergem: o gargalo é consistência operacional e recuperação pós-falha.",
 "Churn: US$60M GMV em quatro padrões — 40% perda gradual (US$24M), com churn subindo de 62% → 74% com 3+ fricções. Saída de valor não é só preço: ~60% vão ao varejo físico, ~10% para app concorrente. Churn event-driven: >35 min concentra ~48% do bucket.",
 "Lovers Plus prova o modelo: 92% Perfect Orders, 48% SLA 15 min (vs 35% Core). 74% compraram fora do app em 30 dias, mas 76,6% comprariam mais se estoque, horários e confiança melhorassem — intenção existe, fricção bloqueia.",
 "Operação 2026: 6,27M pedidos válidos YTD; Colômbia acelera, México monetiza (AOV +19,6%). Concorrentes: Rappi é o único benchmark nos três mercados; TaDa deve comparar por missão e stakeholder, não copiar amplitude.",
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

export function getPesquisasMeta(locale: Locale) {
 if (locale === "en") return PESQUISAS_META;
 return PESQUISAS_META_PT;
}

export function getPesquisasExecutive(locale: Locale) {
 if (locale === "en") return PESQUISAS_EXECUTIVE;
 return PESQUISAS_EXECUTIVE_PT;
}
