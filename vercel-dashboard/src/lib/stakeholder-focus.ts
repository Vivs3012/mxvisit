import type { Locale } from "./i18n/locale";

export type StakeholderFocus = "consumer" | "rewards" | "service-level" | "all";

export type StakeholderOption = {
 id: StakeholderFocus;
 label: string;
 shortLabel: string;
 description: string;
 decision: string;
 tone: "info" | "success" | "warning" | "neutral";
};

export const STAKEHOLDER_OPTIONS: StakeholderOption[] = [
 {
 id: "consumer",
 label: "Consumer",
 shortLabel: "Consumer lens",
 description: "Consumer needs, journey, trust, delivery promise, growth and retention.",
 decision: "Make the next order easier, more predictable and more valuable.",
 tone: "info",
 },
 {
 id: "rewards",
 label: "Rewards",
 shortLabel: "Rewards lens",
 description: "Club TaDa, frequency, CRM, promotions, wallet, data and loyalty economics.",
 decision: "Build frequency on top of reliable service and clean customer data.",
 tone: "success",
 },
 {
 id: "service-level",
 label: "Service level",
 shortLabel: "Service level lens",
 description: "Operations, sellers, couriers, inventory, dispatch, CX and reliability.",
 decision: "Protect the delivery chain from stock truth to successful delivery and recovery.",
 tone: "warning",
 },
 {
 id: "all",
 label: "All",
 shortLabel: "Full portfolio",
 description: "The complete One Year Plan view across countries, functions and evidence.",
 decision: "Balance consumer habit, rewards frequency and service reliability — parallel tracks, shared metrics.",
 tone: "neutral",
 },
];

export function stakeholderOption(focus: StakeholderFocus): StakeholderOption {
 return STAKEHOLDER_OPTIONS.find((option) => option.id === focus) ?? STAKEHOLDER_OPTIONS[3];
}

export const FOCUS_EXECUTIVE_SUMMARIES: Record<
 Exclude<StakeholderFocus, "all">,
 { headline: string; paragraphs: string[] }
> = {
 consumer: {
 headline: "Consumer growth depends on a delivery promise that survives the journey.",
 paragraphs: [
 "Across countries, the consumer problem is not only acquisition. It is accurate address, available stock, realistic ETA, visible courier progress and fast recovery when something breaks.",
 "The consumer lens prioritizes trust, the second order, repeat behavior and mission-based competitive comparison: urgent, planned, group and pickup.",
 ],
 },
 rewards: {
 headline: "Rewards should turn reliable service into frequency, not compensate for unreliable service.",
 paragraphs: [
 "Club TaDa, Braze, wallet, flash coupons and personalization are valuable only when events, inventory and delivery outcomes are trustworthy.",
 "The Rewards lens prioritizes realized value, 7/30-day repeat, cross-use, promotion readiness and the economics of competing with Rappi Pro, PedidosYa Plus and Uber One.",
 ],
 },
 "service-level": {
 headline: "Service level keeps the delivery promise — alongside consumer recovery and rewards data.",
 paragraphs: [
 "The seller → courier → customer chain must be measured end to end: inventory truth, preparation, assignment, route, ETA, support and recovery.",
 "This lens prioritizes peak reliability, fair dispatch and seller/courier tooling — in parallel with post-purchase consumer paths and CRM events that Rewards and Growth depend on.",
 ],
 },
};

export function focusMatchesInsight(
 focus: StakeholderFocus,
 insight: { rank: number; layer: string; title: string },
): boolean {
 if (focus === "all") return true;
 // Primary-owner classification prevents broad words such as "consumer",
 // "communication" or "inventory" from leaking into every lens.
 const primaryOwner: Record<StakeholderFocus, number[]> = {
 consumer: [2, 4, 6, 14, 17, 23, 24, 26, 27, 33, 34, 39, 43, 45, 46],
 rewards: [18, 19, 20, 21, 22, 25, 32, 42, 50],
 "service-level": [1, 3, 5, 7, 9, 10, 11, 12, 13, 15, 16, 17, 20, 28, 29, 31, 35, 36, 37, 38, 40, 41, 44, 47, 48, 49, 51],
 all: [],
 };
 return primaryOwner[focus].includes(insight.rank);
}

export function focusMatchesResearch(
 focus: StakeholderFocus,
 lens: { title: string; implication: string; action: string; owner?: StakeholderFocus },
): boolean {
 if (focus === "all") return true;
 return lens.owner === focus;
}

export function focusMatchesArea(focus: StakeholderFocus, area: string): boolean {
 if (focus === "all") return true;
 const normalized = area.toLowerCase();
 const isConsumer = normalized === "consumer" || normalized === "consumidor";
 const isRewards = normalized === "rewards";
 const isOps =
 normalized === "operations" ||
 normalized === "operações" ||
 normalized.startsWith("commercial") ||
 normalized.startsWith("comercial");
 const isCx =
 normalized === "cx & communication" ||
 normalized === "cx e comunicação" ||
 normalized === "cx";
 if (focus === "consumer") return isConsumer;
 if (focus === "rewards") return isRewards;
 return isOps || isCx;
}

export const FOCUS_CONVERGENCES: Record<Exclude<StakeholderFocus, "all">, string[]> = {
 consumer: [
 "Consumer across countries: trust is won through accurate address, live ETA, clear delivery status and fast recovery.",
 "Wrong routing, stale maps and incomplete order information turn an operational defect into a consumer cancellation or support ticket.",
 "Lovers Plus and Buy Again show that convenience becomes habit when the next order is predictable and easy to repeat.",
 "Returnables, payment choice and the same mission benchmark define consumer value beyond a generic superapp feature list.",
 ],
 rewards: [
 "Rewards should amplify reliable behavior: Club TaDa, Braze, wallet and flash coupons need clean events and service truth.",
 "Promotion visibility must be synchronized with seller stock and supply, or acquisition creates a broken consumer promise.",
 "Frequency is the outcome: measure realized value, 7/30-day repeat and cross-use instead of coupon issuance alone.",
 "Competitive loyalty is ecosystem-based — Rappi Pro, PedidosYa Plus and Uber One — so TaDa needs a focused beverage occasion advantage.",
 ],
 "service-level": [
 "Service level across countries is a delivery chain system: inventory truth → seller preparation → courier assignment → delivery → recovery.",
 "Peak reliability, dispatch fairness, map stability and KPI visibility are the operating foundation for every other roadmap bet.",
 "Seller and courier research confirms that volume, satisfaction and maturity can coexist with severe exception friction.",
 "WebPO, live maps, delivery proof and predictive KPI cockpit are proven patterns to standardize across markets.",
 ],
};

export function focusMatchesSourceGroup(focus: StakeholderFocus, group: string): boolean {
 if (focus === "all") return true;
 const consumerResearch =
 group === "Consumer research" || group === "Pesquisa consumidor";
 const market = group === "Market" || group === "Mercado";
 const execution = group === "Execution research" || group === "Pesquisa execução";
 const field = group === "Field and organization" || group === "Campo e organização";
 if (focus === "consumer") return consumerResearch || market;
 if (focus === "rewards") return consumerResearch || market;
 return execution || field;
}

const FOCUS_CONVERGENCES_PT: Record<Exclude<StakeholderFocus, "all">, string[]> = {
 consumer: [
 "Consumidor entre países: confiança vem de endereço certo, ETA ao vivo, status claro e recuperação rápida.",
 "Roteamento errado, mapas defasados e informação incompleta transformam falha operacional em cancelamento ou ticket.",
 "Lovers Plus e Buy Again mostram que conveniência vira hábito quando o próximo pedido é previsível e fácil.",
 "Retornáveis, escolha de pagamento e benchmark de missão definem valor além de lista de features de superapp.",
 ],
 rewards: [
 "Rewards deve amplificar comportamento confiável: Club TaDa, Braze, wallet e cupons flash precisam de eventos limpos e verdade de serviço.",
 "Visibilidade promocional deve estar sincronizada com estoque seller e supply, ou aquisição cria promessa quebrada.",
 "Frequência é o outcome: medir valor realizado, repetição 7/30d e cross-use — não só emissão de cupom.",
 "Loyalty competitivo é ecossistema — Rappi Pro, PedidosYa Plus, Uber One — TaDa precisa vantagem focada em ocasião bebida.",
 ],
 "service-level": [
 "Nível de serviço entre países é sistema de delivery chain: verdade inventário → preparação seller → atribuição courier → entrega → recuperação.",
 "Confiabilidade no pico, dispatch justo, mapa estável e KPIs visíveis são base para qualquer aposta de roadmap.",
 "Pesquisa seller/courier confirma que volume, satisfação e maturidade coexistem com fricção severa nas exceções.",
 "WebPO, mapas ao vivo, prova de entrega e cockpit KPI preditivo são padrões a homologar entre mercados.",
 ],
};

export function getFocusConvergences(locale: Locale, focus: Exclude<StakeholderFocus, "all">): string[] {
 if (locale === "en") return FOCUS_CONVERGENCES[focus];
 return FOCUS_CONVERGENCES_PT[focus];
}

export function focusMatchesDecision(
 focus: StakeholderFocus,
 decision: { owner: StakeholderFocus },
): boolean {
 return focus === "all" || decision.owner === focus;
}
