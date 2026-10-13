import {
 GLOBAL_EXECUTIVE_THEMES,
 type ExecutiveThemeCard,
} from "../../global-executive-themes";
import {
 GLOBAL_HOMOLOGATE_ITEMS,
 GLOBAL_OPEN_QUESTIONS,
 GLOBAL_PRODUCT_OUTCOME,
 GLOBAL_ROADMAP_BY_AREA,
 GLOBAL_ROADMAP_LAYERS,
 GLOBAL_ROADMAP_NORTH_STAR,
 GLOBAL_ROADMAP_PHASES,
 type GlobalRoadmapAreaPlan,
 type GlobalRoadmapPhaseItem,
} from "../../global-roadmap";
import type { UxRoadmapPhase } from "../../ux-roadmap";
import type { Locale } from "../locale";
import { globalTabUi } from "./global-tab-ui";

export function getGlobalProductOutcome(locale: Locale) {
 if (locale === "en") return GLOBAL_PRODUCT_OUTCOME;
 return {
 statement:
 "Aumentar Perfect Order no pico corrigindo confiabilidade e verdade de inventário primeiro — antes de escalar loyalty, vending ou apostas de ocasião futebol.",
 primaryMetric: "Perfect Order % no pico",
 guardrails: ["Taxa de pedido expirado", "Fill rate por POC", "% tickets CX de coordenação"],
 persona: "Seller POC + supervisor no pico de sábado (20–50 pedidos, 5–8 couriers)",
 };
}

export function getGlobalRoadmapNorthStar(locale: Locale): string {
 if (locale === "en") return GLOBAL_ROADMAP_NORTH_STAR;
 return "Corrigir o que quebra no pico antes de novas telas. Sellers não adotam métricas ou financeiro que não conseguem auditar.";
}

export function getGlobalRoadmapLayers(locale: Locale) {
 if (locale === "en") return GLOBAL_ROADMAP_LAYERS;
 return [
 {
 layer: "Camada 1 — Confiabilidade",
 subtitle: "Ver e receber o pedido",
 detail: "Som, sessão, push, carga do mapa. Sem Camada 3 sem isso.",
 },
 {
 layer: "Camada 2 — Decisão no pico",
 subtitle: "Distribuir rápido sem sair da tela",
 detail: "Atribuir no mapa, prioridade visual, multi-assign, SLA justo.",
 },
 {
 layer: "Camada 3 — Gestão e confiança",
 subtitle: "Métricas, reembolso, planejamento do dia",
 detail: "Filtros de data, pagamentos linha a linha, cockpit admin — barra WebPO.",
 },
 ];
}

export function getGlobalRoadmapPhaseMeta(locale: Locale, phase: UxRoadmapPhase) {
 const meta = GLOBAL_ROADMAP_PHASES[phase];
 if (locale === "en") return meta;
 const pt: Record<UxRoadmapPhase, typeof meta> = {
 now: {
...meta,
 label: globalTabUi(locale, "horizonNow"),
 goal: "Parar de perder pedidos no pico",
 exitCriteria:
 "Uma POC roda um sábado inteiro sem WhatsApp para dispatch; taxa de pedido expirado cai de forma mensurável semana a semana.",
 },
 next: {
...meta,
 label: globalTabUi(locale, "horizonNext"),
 goal: "Decisões de pico e confiança operacional",
 exitCriteria:
 "Métricas diárias/semanais adotadas por supervisores; reembolso auditável; mapa usado em dispatch na maioria das POCs piloto.",
 },
 later: {
...meta,
 label: globalTabUi(locale, "horizonLater"),
 goal: "Escala de ecossistema e apostas 2028",
 exitCriteria:
 "Fundamentos de dados e serviço homologados antes de tiers, omnichannel e vending em produção ampla.",
 },
 };
 return pt[phase];
}

const AREA_LABEL_PT: Record<string, { label: string; subtitle: string }> = {
 operations: { label: "Operações", subtitle: "Seller · Courier · Admin · dispatch no pico" },
 consumer: { label: "Consumidor", subtitle: "Jornada · mapa · pagamentos · endereço" },
 rewards: { label: "Rewards", subtitle: "Club · Braze · wallet · anti-fraude" },
 commercial: { label: "Comercial", subtitle: "Promos · calendário · supply" },
 cx: { label: "CX", subtitle: "Suporte · coordenação · recuperação" },
};

/** Shallow PT for roadmap area headers; item text stays EN until fully translated. */
export function getGlobalRoadmapByArea(locale: Locale): GlobalRoadmapAreaPlan[] {
 if (locale === "en") return GLOBAL_ROADMAP_BY_AREA;
 return GLOBAL_ROADMAP_BY_AREA.map((area) => {
 const bag = AREA_LABEL_PT[area.id];
 return bag ? {...area, label: bag.label, subtitle: bag.subtitle } : area;
 });
}

export function localizeRoadmapItem(item: GlobalRoadmapPhaseItem, locale: Locale): GlobalRoadmapPhaseItem {
 if (locale === "en") return item;
 const key = `${item.theme}|||${item.outcome}`;
 const hit = ROADMAP_ITEM_PT[key];
 return hit ? {...item,...hit } : item;
}

const ROADMAP_ITEM_PT: Record<string, Partial<GlobalRoadmapPhaseItem>> = {
 "Peak reliability|||Stop silent misses, session drops, and expired orders at Saturday peak": {
 theme: "Confiabilidade no pico",
 outcome: "Eliminar perdas silenciosas, queda de sessão e pedidos expirados no pico de sábado",
 },
 "Operations map|||Assign couriers without leaving the map; load 50+ concurrent orders": {
 theme: "Mapa de operações",
 outcome: "Atribuir couriers sem sair do mapa; carregar 50+ pedidos simultâneos",
 },
 "Inventory truth|||Quantity in portfolio; combos and search match real stock": {
 theme: "Verdade de inventário",
 outcome: "Quantidade no portfólio; combos e busca alinhados ao estoque real",
 },
};

export function getGlobalHomologateItems(locale: Locale) {
 if (locale === "en") return GLOBAL_HOMOLOGATE_ITEMS;
 return [
 { signal: "Web Tiendas (WebPO)", country: "Peru", action: "KPIs semanais, heatmap, pagamentos VLC → plataforma seller" },
 { signal: "Badge primeiro pedido", country: "México", action: "Manter e expandir nas POCs" },
 { signal: "UX de localização Brasil", country: "Peru", action: "Rollout de config — −1 pp cancelamentos por localização" },
 { signal: "Central de notificações", country: "Bolívia → LATAM", action: "Inbox seller para comunicação ops" },
 { signal: "Código de confirmação de entrega", country: "Peru", action: "Piloto por loja — reduzir disputas" },
 { signal: "Relatório financeiro courier (Jumbo)", country: "México", action: "Resumo semanal de pagamento no seller" },
 {
 signal: "Controle ruptura Equador (0,8%)",
 country: "Equador",
 action: "DDC por POC + playbook supply enquanto UX quantidade evolui",
 },
 {
 signal: "Incrementalidade holdout CRM (S40)",
 country: "Equador",
 action: "Homologar slots de push vs coerência checkout",
 },
 { signal: "Gamificação courier MotoGP", country: "Equador", action: "Reativação no pico quando forecast falha" },
 ];
}

export function getGlobalOpenQuestions(locale: Locale): string[] {
 if (locale === "en") return GLOBAL_OPEN_QUESTIONS;
 return [
 "Teste de overlap — Puebla ~3%: expandir para mais cidades antes de mudar polígonos?",
 "Combo como terceiro SKU — pedido Victor Ágora nos dois países: estimativa de engenharia?",
 "Capacidade squad Admin — copilot vs console manual: o que entra em H1?",
 "Colômbia / Equador — quando começam visitas; mesmo playbook?",
 ];
}

const EXEC_THEMES_PT: Record<
 ExecutiveThemeCard["id"],
 Pick<ExecutiveThemeCard, "label" | "aliases" | "nowAction" | "topProblems">
> = {
 "service-level": {
 label: "Campo e ops",
 aliases: "Operações na aba All · Nível de serviço = visão Peru 1 set",
 nowAction: "Confiabilidade no pico + verdade de inventário + dispatch justo",
 topProblems: [
 "Confiabilidade do seller no pico — som, sessão, pedidos expirados",
 "GPS/mapa travado — ~80% dos “atrasos” são exibição",
 "Inventário sem quantidade — combos e busca quebrados",
 ],
 },
 consumer: {
 label: "Consumidor",
 aliases: "Workshop 2 set + visão produto 3 set",
 nowAction: "Mapa ao vivo do courier + UX de endereço errado",
 topProblems: [
 "Pin do courier preso na loja após sair",
 "Endereço errado — ~18% dos cancelamentos (PE)",
 "Promo visível ao consumidor mas não ao seller/supply",
 ],
 },
 rewards: {
 label: "Rewards",
 aliases: "Club TaDa · Braze · loyalty",
 nowAction: "Portão — corrigir Camada 1 + stack de dados antes de escalar tiers",
 topProblems: [
 "Triggers CRM precisam de inventário + logística confiáveis primeiro",
 "Integração nativa Club TaDa — voto #1 Equador 8 out + enriquecimento Braze PE",
 "Anti-fraude antes de escalar tiers de loyalty",
 ],
 },
};

export function getGlobalExecutiveThemes(locale: Locale): ExecutiveThemeCard[] {
 if (locale === "en") return GLOBAL_EXECUTIVE_THEMES;
 return GLOBAL_EXECUTIVE_THEMES.map((t) => ({
...t,
...EXEC_THEMES_PT[t.id],
 }));
}
