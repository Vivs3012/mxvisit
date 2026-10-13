/** Sellers e couriers — clusterização 2026 (PDF + Typeform CSVs). */

export const SELLERS_COURIERS_META = {
 title: "Sellers and couriers",
 period: "Set 2026",
 reportPdf: "/outros/tada-delivery-sellers-couriers-clusterizacao-2026.pdf",
 sellerCsv: "/outros/sellers-survey-typeform-2026.csv",
 courierCsv: "/outros/couriers-survey-typeform-2026.csv",
};

export const SELLERS_COURIERS_EXECUTIVE = {
 headline:
 "Volume is not maturity — sellers and couriers need different plays by scale, maturity and type of work.",
 paragraphs: [
 "Sellers want to grow without losing service quality; couriers want less time lost to incomplete information, confusing routes and unsupported exceptions. Clustering organizes the problem into decision profiles for product, operations, commercial and research teams.",
 "In the matched sample (322 sellers with metrics), 85 are Small in discovery — the largest cell, with the lowest satisfaction (3.86/5) and metric recognition (2.9/8). Large anchor (49 sellers, ~15% of the base) represents ~35% of estimated weekly sample value.",
 "Couriers (794 responses in the report; 793 complete in the export): 72% with 4–5 satisfaction coexist with high friction — 46.9% cite customer communication and 36.5% confusing routes/addresses. The failure appears in the seller → courier → customer → platform delivery chain.",
 ],
 stats: [
 { label: "Sellers (survey)", value: "333", tone: "primary" as const },
 { label: "Matched sellers", value: "322", tone: "primary" as const },
 { label: "Couriers (survey)", value: "794", tone: "info" as const },
 { label: "Perfis de decisão", value: "9 + 4", tone: "neutral" as const },
 ],
 statsSecondary: [
 { label: "MX sellers (matched)", value: "62%", tone: "primary" as const },
 { label: "Seller satisfaction 4–5", value: "82%", tone: "success" as const },
 { label: "Review KPIs daily", value: "84%", tone: "success" as const },
 { label: "Courier satisfaction 4–5", value: "72%", tone: "warning" as const },
 ],
};

export const SELLERS_COURIERS_METHOD = [
 { source: "Seller survey Typeform", coverage: "333 responses; 325 unique IDs; 322 matched to metrics", use: "Operations, TaDa dependence, preparation, metric recognition, review frequency, satisfaction and open challenges." },
 { source: "Seller metrics (results-2/3)", coverage: "327 IDs; 322 matched to survey", use: "Country, city, model, tenure, orders/week, cancellations, GMV, rating and delivery time." },
 { source: "Courier survey Typeform", coverage: "794 complete responses", use: "Stores, fixed relationship, tenure, days/hours, gig apps, friction, satisfaction and open improvement." },
 { source: "Seller Atlas 2026", coverage: "Interpretation deck", use: "Profiles, normalized cuts and strategic seller + courier reading." },
];

export const SELLER_CLUSTER_RULES = [
 "Porte: Small <100 pedidos/semana; Medium 100–249; Large ≥250 (média 3 meses de métricas).",
 "Maturidade: Discovery <12 meses no TaDa; Structuring 12–35; Mature ≥36 meses.",
 "Reconhecimento de métrica ≠ proficiência; fricções de courier são autorreportadas, não causalidade isolada.",
];

export const SELLER_SURVEY_DIST = {
 ownCouriers: [
 { label: "3–5", pct: 48 },
 { label: "1–2", pct: 27 },
 { label: "6–10", pct: 15 },
 { label: "Mais de 10", pct: 7 },
 { label: "Nenhuno", pct: 3 },
 ],
 orderManagement: [
 { label: "Manualmente", pct: 45 },
 { label: "Sistema próprio", pct: 25 },
 { label: "Planilha", pct: 16 },
 { label: "ERP/POS integrado", pct: 9 },
 { label: "Otro", pct: 5 },
 ],
 tadaShare: [
 { label: "25–50% vendas", pct: 30 },
 { label: "51–75% vendas", pct: 25 },
 { label: "<25% vendas", pct: 17 },
 { label: ">75% vendas", pct: 12 },
 { label: "100% TaDa", pct: 8 },
 ],
 whoPrepares: [
 { label: "Funcionário + outras tarefas", pct: 47 },
 { label: "Dueño", pct: 29 },
 { label: "Equipe dedicada", pct: 17 },
 { label: "Otro / gerente", pct: 8 },
 ],
 satisfaction: [
 { score: "5", pct: 52 },
 { score: "4", pct: 29 },
 { score: "3", pct: 13 },
 { score: "2", pct: 4 },
 { score: "1", pct: 2 },
 ],
 satisfactionMean: "4,27/5",
 reviewFrequency: [
 { label: "Diariamente", pct: 84 },
 { label: "Semanalmente", pct: 15 },
 { label: "Só com problema", pct: 1 },
 ],
};

/** % de respostas que marcaram reconhecimento da métrica (survey n≈333). */
export const SELLER_KPI_RECOGNITION = [
 { metric: "SLA35", pct: 76 },
 { metric: "Accuracy", pct: 62 },
 { metric: "Order Rating", pct: 59 },
 { metric: "Fill Rate", pct: 53 },
 { metric: "Availability Rate OH", pct: 46 },
 { metric: "TML 10", pct: 40 },
 { metric: "Demand Coverage", pct: 23 },
 { metric: "SLA60", pct: 24 },
 { metric: "Não conheço nenhuma", pct: 10 },
];

export const SELLER_CLUSTER_MATRIX: {
 size: string;
 discovery: string;
 structuring: string;
 mature: string;
}[] = [
 { size: "Small", discovery: "85 | 26% · 48 ped/sem · sat 3,86", structuring: "18 | 6% · 63 ped/sem · sat 4,24", mature: "8 | 3% · 81 ped/sem · sat 4,38" },
 { size: "Medium", discovery: "33 | 10% · 167 ped/sem · sat 4,33", structuring: "44 | 14% · 173 ped/sem · sat 4,32", mature: "38 | 12% · 170 ped/sem · sat 4,26" },
 { size: "Large", discovery: "17 | 5% · 425 ped/sem · sat 4,76", structuring: "30 | 9% · 358 ped/sem · sat 4,67", mature: "49 | 15% · 459 ped/sem · sat 4,59" },
];

export const SELLER_CLUSTER_TABLE = [
 { cluster: "Small in discovery", n: 85, share: "26%", ordersWk: 48, months: 5.3, metrics: "2,9/8", sat: 3.86, daily: "74%", deliveryMin: 22.0 },
 { cluster: "Small consolidator", n: 18, share: "6%", ordersWk: 63, months: 18.4, metrics: "4,3/8", sat: 4.24, daily: "72%", deliveryMin: 22.3 },
 { cluster: "Small resilient", n: 8, share: "2%", ordersWk: 81, months: 50.3, metrics: "3,0/8", sat: 4.38, daily: "88%", deliveryMin: 20.4 },
 { cluster: "Medium in acceleration", n: 33, share: "10%", ordersWk: 167, months: 6.7, metrics: "3,8/8", sat: 4.33, daily: "85%", deliveryMin: 17.9 },
 { cluster: "Medium in structuring", n: 44, share: "14%", ordersWk: 173, months: 21.4, metrics: "4,2/8", sat: 4.32, daily: "91%", deliveryMin: 19.3 },
 { cluster: "Medium consistent", n: 38, share: "12%", ordersWk: 170, months: 50.4, metrics: "3,9/8", sat: 4.26, daily: "87%", deliveryMin: 18.9 },
 { cluster: "Large in discovery", n: 17, share: "5%", ordersWk: 425, months: 8.0, metrics: "3,7/8", sat: 4.76, daily: "94%", deliveryMin: 17.2 },
 { cluster: "Large professionalizing", n: 30, share: "9%", ordersWk: 358, months: 23.1, metrics: "4,1/8", sat: 4.67, daily: "93%", deliveryMin: 17.4 },
 { cluster: "Large anchor", n: 49, share: "15%", ordersWk: 459, months: 53.6, metrics: "5,0/8", sat: 4.59, daily: "88%", deliveryMin: 19.1 },
];

export const SELLER_DECISION_PLAYS = [
 { theme: "Small in discovery", evidence: "85 sellers; 3,86/5; 2,9/8 métricas; ~22 min entrega", action: "Play de ativação: rotina mínima, métrica em linguagem simples, correção de delivery chain." },
 { theme: "Large anchor", evidence: "~15% da base; ~35% valor semanal do sample", action: "Early warning, capacidade e canal estruturado de feedback." },
 { theme: "Operação manual", evidence: "~44% gestão manual; ~46% prep multifunção", action: "Checklist recebimento → preparação → despacho; status visível antes de mais volume." },
 { theme: "Métricas", evidence: "91,6% reconhece ≥1 métrica; 84% revisa diário", action: "Testar compreensão e ação — cards com o que mudou, por quê e próximo passo." },
];

export const COURIER_SURVEY_DIST = {
 storeAttachment: [
 { label: "Fixo em 1 loja", pct: 72 },
 { label: "Ocasional / rotativo", pct: 24 },
 { label: "Fixo em >1 loja", pct: 4 },
 ],
 hoursPerDay: [
 { label: "7–10 h", pct: 51 },
 { label: "Mais de 10 h", pct: 34 },
 { label: "4–6 h", pct: 12 },
 { label: "Até 4 h", pct: 3 },
 ],
 gigPlatforms: [
 { label: "Não usa outras apps", pct: 69 },
 { label: "Às vezes Uber/Rappi", pct: 23 },
 { label: "Todos os dias", pct: 8 },
 ],
 satisfaction: [
 { score: "5", pct: 44 },
 { score: "4", pct: 28 },
 { score: "3", pct: 19 },
 { score: "1", pct: 6 },
 { score: "2", pct: 3 },
 ],
 satisfactionMean: "4,02/5",
};

export const COURIER_FRICTIONS = [
 { friction: "Comunicação com o cliente", pctSurvey: 47, pctAtlas: 46.9 },
 { friction: "Rotas / endereços confusos", pctSurvey: 37, pctAtlas: 36.5 },
 { friction: "Tempo de espera excessivo", pctSurvey: 33, pctAtlas: 32.5 },
 { friction: "App trava ou cai", pctSurvey: 28, pctAtlas: 28.1 },
 { friction: "Falta de suporte", pctSurvey: 22, pctAtlas: 22.4 },
 { friction: "Informação incorreta do pedido", pctSurvey: 19, pctAtlas: 18.8 },
 { friction: "Retraso para recibir pedido", pctSurvey: 14, pctAtlas: 14.0 },
 { friction: "Problemas com pagamento", pctSurvey: 11, pctAtlas: 10.6 },
 { friction: "Dificultad para usar la app", pctSurvey: 7, pctAtlas: 7.1 },
 { friction: "Pedido listo, sem repartidor", pctSurvey: 3, pctAtlas: 3.0 },
];

export const COURIER_PROFILES = [
 { profile: "Core store runner", size: "444 | 56%", pattern: "Fixo 1 loja; 88% 7+ h", mainFriction: "Comunicação 50,9%; rotas 39,6%", play: "Dados de cliente, regras de espera, suporte frontline." },
 { profile: "Flexible / rotating", size: "191 | 24%", pattern: "48% também em outras apps", mainFriction: "Comunicação 36,6%; espera 32,5%", play: "Visibilidade de ganho e resolução rápida." },
 { profile: "New single-store starter", size: "83 | 11%", pattern: "<3 meses; 74% 7+ h", mainFriction: "App trava 30,1%; rotas 34,9%", play: "Onboarding no fluxo e primeiras entregas seguras." },
 { profile: "Portfolio courier", size: "76 | 10%", pattern: "Multi-store; 58% >10 h", mainFriction: "Comunicação 51,3%; rotas 44,7%", play: "Batching, rota clara e despacho multi-store." },
];

export const SERVICE_CHAIN_MOMENTS = [
 { moment: "Antes da coleta", signal: "Comunicação 46,9%; info pedido 18,8%", response: "Validar endereço/contato; informação completa e status claro." },
 { moment: "Durante entrega", signal: "Rotas 36,5%; espera 32,5% (flex)", response: "Rota, tempo restante e regra realista de espera." },
 { moment: "Depois da exceção", signal: "Cancelamentos sellers; suporte/pagamento couriers", response: "Recuperação com causa, owner, SLA e retorno." },
];

export const PLAN_90_DAYS = [
 { when: "Agora", action: "Validação contato/endereço; cancelamento compartilhado; dicionário de métricas", audience: "Small in discovery; Core store runner", kpis: "delivery chain perfeito, cancelamento, entrega, compreensão métrica" },
 { when: "Próximo", action: "Tempo restante e rota multi-order; espera realista; playbook 90 dias", audience: "Portfolio; New starter; Medium", kpis: "Tempo perdido, suporte/pedido, retenção courier 30/90d" },
 { when: "Depois", action: "Dashboard seller-courier-cidade; coortes; grupo consultivo", audience: "Large anchor; Flexible; mercados prioritários", kpis: "Valor semanal, rating, repeat, exceções" },
];

export const SELLER_OPEN_QUOTES = [
 { theme: "Dados do cliente", quote: "Contactar clientes que no ingresan sus datos correctamente o no los actualizan" },
 { theme: "Cobertura", quote: "Polígonos de cobertura y overlapping generan descontento… pocas promociones y precios elevados" },
 { theme: "Roteamento", quote: "Clientes muy cerca de mi tienda y les caen pedidos en otras tiendas" },
 { theme: "Cancelamento", quote: "Clientes que no responden y debo cancelar" },
 { theme: "Abastecimento", quote: "El abastecimiento del producto" },
];

export const COURIER_OPEN_QUOTES = [
 { theme: "Contato", quote: "Que pongan bien el número de contacto del cliente" },
 { theme: "Pagamento", quote: "Los pagos con tarjeta ya sean automáticos" },
 { theme: "Rota", quote: "Cuando hay más de dos pedidos en una sola ruta, imposible cumplir con los indicadores" },
 { theme: "Atribuição", quote: "La manera de asignar los pedidos" },
 { theme: "Suporte", quote: "Sección de quejas del repartidor con respuesta" },
];

export const SELLERS_COURIERS_NOTES = [
 "Cluster sellers: sample pareado n=322; survey Typeform n=333 — percentuais de distribuição vêm da exportação completa quando indicado.",
 "Múltiplas fricções podem ser marcadas por courier na mesma resposta — percentuais não somam 100%.",
 "Tempo de entrega na tabela de clusters exclui outlier de 9.845 min na base de métricas.",
 "Um registro de courier na exportação está marcado como AI Generated e foi excluído das médias de satisfação (n=773).",
];
