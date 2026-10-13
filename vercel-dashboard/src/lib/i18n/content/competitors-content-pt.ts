import type { PlanConfidence } from "../../competitors-data";

export const DECISION_INSIGHTS_PT = [
 {
 title: "Amplitude para consumidor",
 platform: "Rappi",
 insight:
 "Referência mais completa: restaurantes, mercado, farmácia, conveniência, bebidas, pets, presentes, recados, viagem, pagamentos e assinatura num ecossistema. Descoberta social, personalização e busca com IA.",
 implication: "TaDa deve mapear quais verticais são core vs adjacentes antes de copiar amplitude.",
 },
 {
 title: "Merchant e monetização",
 platform: "Rappi + Uber",
 insight:
 "Uber combinou ads, ofertas, recomendações e reporting; Rappi somou criação de catálogo com IA e portal de parceiros com métricas e campanhas.",
 implication: "Benchmark tempo até 1º pedido, ROAS e completude de catálogo — não só features.",
 },
 {
 title: "Alta velocidade",
 platform: "Rappi Turbo",
 insight:
 "Referência consistente nos três países. México: aliança Chedraui (<10 min, 8 cidades). Peru: estações Turbo eletrificadas com sustentabilidade e financiamento.",
 implication: "Separar velocidade de confiabilidade — medir ETA P50/P90 e compensação por falha.",
 },
 {
 title: "Risco 2027 — Peru",
 platform: "Uber + Delivery Hero",
 insight:
 "Aquisição da Delivery Hero pode conectar mobilidade, assinatura, ads de merchant e logística à base PedidosYa. Nenhum anúncio promete migração de marca ou app.",
 implication: "Watchlist ativa; não tratar integração como certa no roadmap TaDa.",
 },
];

export const INNOVATIONS_READING_PT =
 "Leitura: Rappi inovou na promessa física e automação de back-office; Uber conectou mais superfícies de demanda à rede; PedidosYa publicou agenda comercial e financeira.";

export const BENCHMARK_FOOTER_PT =
 "O benchmark deve combinar jornadas reais, métricas de rede e entrevistas com consumidores, merchants e couriers — não comparação isolada de telas.";

export const SOURCES_FOOTER_PT = (cutDate: string) =>
 `Fontes consultadas até ${cutDate} (39 no documento completo):`;

export const CONFIDENCE_PT: Record<PlanConfidence, string> = {
 Confirmed: "Confirmado",
 "Announced direction": "Direção anunciada",
 Inference: "Inferência",
};

export const INNOVATION_STATUS_PT: Record<string, string> = {
 "Available 2026": "Disponível 2026",
 "May 2026": "Mai 2026",
 "Apr 2026": "Abr 2026",
 "Feb 2026": "Fev 2026",
 "2026 targets": "Metas 2026",
 Announced: "Anunciado",
 "2026": "2026",
 "Availability varies": "Disponibilidade variável",
 "MX, CO, PE": "MX, CO, PE",
};
