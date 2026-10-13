import {
 GLOBAL_RESEARCH_DECISIONS,
 GLOBAL_RESEARCH_LENSES,
 GLOBAL_RESEARCH_SOURCE_GROUPS,
 GLOBAL_RESEARCH_SUMMARY,
 type GlobalEvidenceLens,
} from "../../global-research";
import type { Locale } from "../locale";
import { globalTabUi } from "./global-tab-ui";

type LensRow = (typeof GLOBAL_RESEARCH_LENSES)[number];

const LENSES_PT: Omit<LensRow, "lens" | "owner">[] = [
 {
 title: "Intenção existe; inconsistência destrói hábito",
 evidence:
 "76% do churn survey ainda viam TaDa como primeira opção; 76,6% dos Lovers Plus comprariam mais com estoque, horários e confiança; 92% Perfect Orders em Lovers Plus.",
 countries: "MX; princípio cross-country",
 implication: "Promoção abre a porta, mas previsibilidade e recuperação definem o segundo pedido.",
 action: "Fazer segundo pedido e recuperação pós-falha outcomes centrais por país, cidade e cluster.",
 },
 {
 title: "Concorrência é missão e confiança, não copiar superapp",
 evidence:
 "Rappi é benchmark nos três países; Uber soma mobilidade/retail no México; PedidosYa compete em densidade, parceiros e fintech no Peru; Colômbia é sobretudo benchmark externo.",
 countries: "MX · PE · CO",
 implication:
 "Ameaça varia por país: amplitude/ecossistema, velocidade, densidade, pickup, assinatura e last mile.",
 action:
 "Comparar a mesma missão (urgente, planejado, grupo, pickup) por preço total, ETA P50/P90, falha, recuperação e frequência.",
 },
 {
 title: "Vantagem TaDa é foco; risco é inconsistência",
 evidence:
 "Concorrentes investem em Turbo, tracking, catálogo IA, ads, loyalty, crédito e integrações; TaDa tem sinais fortes em bebidas, Lovers Plus, WebPO e soluções locais.",
 countries: "MX · PE · CO",
 implication:
 "Amplitude sem confiabilidade aumenta complexidade; foco em ocasião e serviço diferencia se execução for mensurável.",
 action:
 "Padronizar o que funciona (WebPO/KPIs, badge primeiro pedido, prova de entrega, mapa ao vivo) em vez de copiar amplitude sem unit economics.",
 },
 {
 title: "Economia de frequência precisa de eventos limpos e coortes certas",
 evidence:
 "Churn e Lovers Plus ligam repetição a estoque, horários e confiança; promo bancária e cestas marketplace mudam quem entra e com que frequência volta — México e Colômbia mostram gaps por coorte.",
 countries: "MX · CO; princípio para PE",
 implication:
 "Club, Braze, wallet e For You amplificam valor só quando o CRM distingue cerveja vs marketplace vs promo.",
 action:
 "Medir valor realizado, repetição 7/30d e conclusão de missão por coorte — não só emissão de cupom.",
 },
 {
 title: "Falhas de coordenação parecem churn do consumidor",
 evidence:
 "Reviews citam entrega e suporte; visitas citam endereço e espera; Colômbia PM citou grande parte de cancelamentos por desencontro cliente–loja–entregador.",
 countries: "MX · PE · CO",
 implication:
 "Opções pós-compra, resolução na loja e ETA visível entram no roadmap consumidor tanto quanto algoritmos de dispatch.",
 action:
 "Entregar caminhos pós-compra pré-definidos e medir cancelamento por coordenação junto com ETA e Perfect Service.",
 },
 {
 title: "O gargalo costuma ser a cadeia de entrega, não a persuasão",
 evidence:
 "Reviews apontam entrega, contas, pagamentos e suporte; churn sobe de 62% para 74% com 3+ fricções; sellers e couriers descrevem dados incompletos, endereço, espera e falta de suporte.",
 countries: "MX · PE; hipótese para CO",
 implication:
 "A mesma falha muda de nome por ator: ruptura para o seller, rota para o courier, atraso para o consumidor e ticket para CX.",
 action:
 "Medir uma cadeia por pedido: disponibilidade → cadeia de entrega → coleta → ETA → cancelamento/estorno → recompra.",
 },
 {
 title: "Maturidade do seller precisa de play próprio",
 evidence:
 "Small em discovery: 85 sellers, satisfação 3,86/5 e 2,9/8 métricas; Large anchor: 49 sellers e ~35% do valor semanal estimado da amostra.",
 countries: "MX; framework replicável em PE/CO",
 implication:
 "Volume não é maturidade. O mesmo dashboard e incentivo não servem ativação Small e proteção Large anchor.",
 action:
 "Rotear por cluster: rotina mínima para Small discovery; alerta antecipado, capacidade e feedback estruturado para Large anchor.",
 },
 {
 title: "Satisfação do courier não elimina fricção",
 evidence:
 "72% dos couriers notam satisfação 4–5, mas 46,9% citam comunicação com cliente, 36,5% rota/endereço e 32,5% espera.",
 countries: "MX; validação necessária em PE/CO",
 implication: "Média positiva pode esconder tempo e ganho perdidos nas exceções.",
 action:
 "Priorizar contato correto, rotas realistas, tempo restante, pagamento claro e suporte in-flow.",
 },
];

export function formatEvidenceLens(locale: Locale, lens: GlobalEvidenceLens): string {
 if (locale === "en") return lens;
 const map: Record<GlobalEvidenceLens, string> = {
 Research: globalTabUi(locale, "lensResearch"),
 Competition: globalTabUi(locale, "lensCompetition"),
 Synthesis: globalTabUi(locale, "lensSynthesis"),
 };
 return map[lens];
}

export function getGlobalResearchLenses(locale: Locale): LensRow[] {
 if (locale === "en") return GLOBAL_RESEARCH_LENSES;
 return GLOBAL_RESEARCH_LENSES.map((row, i) => ({
...row,
...LENSES_PT[i],
 }));
}

const SUMMARY_PT = {
 scope:
 "Reviews, churn, Lovers Plus, operações, sellers/couriers, visitas, reuniões, workshops e benchmark LATAM.",
 thesis:
 "TaDa ganha hábito quando promessa ao consumidor, frequência Rewards e confiabilidade de serviço avançam juntas — não quando um pilar corre à frente dos outros.",
 limitation:
 "Evidência de pesquisa é mais profunda no México; no Peru e Colômbia, pesquisa e benchmark devem guiar hipóteses até validação local.",
};

export function getGlobalResearchSummary(locale: Locale) {
 const base = GLOBAL_RESEARCH_SUMMARY;
 if (locale === "en") return base;
 return {
...base,
...SUMMARY_PT,
 };
}

const DECISIONS_PT = [
 {
 decision: "Hábito e recuperação",
 measure: "Segundo pedido, repetição 7/30d, recuperação pós-falha, cancelamento por coordenação",
 evidence: "Churn, Appbot, Lovers Plus, pós-compra Colômbia",
 },
 {
 decision: "CRM por coorte e Club",
 measure: "Valor realizado, missões, tiers cerveja vs marketplace, prontidão For You",
 evidence: "Lovers Plus, rewards AM Colômbia, pilotos Braze",
 },
 {
 decision: "Confiabilidade do pedido",
 measure: "Perfect Service, fill rate, ruptura, ETA P50/P90, cadeia de entrega e cancelamento",
 evidence: "Churn, sellers/couriers, visitas",
 },
 {
 decision: "Ferramentas seller e courier",
 measure: "Ativação seller, retenção courier, ganho/hora, visibilidade KPI, alertas de capacidade",
 evidence: "Clusters sellers/couriers + benchmark",
 },
 {
 decision: "Amplitude com controle",
 measure: "Cross-use, frequência, omnichannel, fraude, dados homologados e unit economics",
 evidence: "Concorrentes + workshops Rewards/Consumer",
 },
];

export function getGlobalResearchDecisions(locale: Locale) {
 if (locale === "en") return GLOBAL_RESEARCH_DECISIONS;
 return GLOBAL_RESEARCH_DECISIONS.map((row, i) => {
 const pt = DECISIONS_PT[i];
 return {
...row,
 horizon: row.horizon === "Now" ? "Agora" : row.horizon === "Next" ? "Próximo" : "Depois",
...pt,
 };
 });
}

const SOURCE_GROUPS_PT = [
 {
 group: "Pesquisa consumidor",
 reading: "Polarização, fricção, intenção retida, limiar de serviço e comportamento fora do app.",
 },
 {
 group: "Pesquisa execução",
 reading: "Maturidade, cadeia de entrega, capacidade, mercados e métricas que operadores usam.",
 },
 {
 group: "Campo e organização",
 reading: "Falhas situadas em cidade, pico, processo, sistema e ownership.",
 },
 {
 group: "Mercado",
 reading: "Comparação por missão, economia de loyalty e ecossistema por país.",
 },
];

export function getGlobalResearchSourceGroups(locale: Locale) {
 if (locale === "en") return GLOBAL_RESEARCH_SOURCE_GROUPS;
 return GLOBAL_RESEARCH_SOURCE_GROUPS.map((row, i) => ({
...row,
...SOURCE_GROUPS_PT[i],
 }));
}
