import {
 FOCUS_EXECUTIVE_SUMMARIES,
 STAKEHOLDER_OPTIONS,
 type StakeholderFocus,
 type StakeholderOption,
} from "../stakeholder-focus";
import type { Locale } from "./locale";
import { lc } from "./lc";

const STAKEHOLDER_I18N: Record<
 StakeholderFocus,
 { label: { en: string; pt: string }; shortLabel: { en: string; pt: string }; description: { en: string; pt: string }; decision: { en: string; pt: string } }
> = {
 consumer: {
 label: { en: "Consumer", pt: "Consumidor" },
 shortLabel: { en: "Consumer lens", pt: "Lente consumidor" },
 description: {
 en: "Consumer needs, journey, trust, delivery promise, growth and retention.",
 pt: "Necessidades do consumidor, jornada, confiança, promessa de entrega, crescimento e retenção.",
 },
 decision: {
 en: "Make the next order easier, more predictable and more valuable.",
 pt: "Tornar o próximo pedido mais fácil, previsível e valioso.",
 },
 },
 rewards: {
 label: { en: "Rewards", pt: "Rewards" },
 shortLabel: { en: "Rewards lens", pt: "Lente Rewards" },
 description: {
 en: "Club TaDa, frequency, CRM, promotions, wallet, data and loyalty economics.",
 pt: "Club TaDa, frequência, CRM, promoções, wallet, dados e economia de loyalty.",
 },
 decision: {
 en: "Build frequency on top of reliable service and clean customer data.",
 pt: "Construir frequência sobre serviço confiável e dados limpos de cliente.",
 },
 },
 "service-level": {
 label: { en: "Service level", pt: "Nível de serviço" },
 shortLabel: { en: "Service level lens", pt: "Lente nível de serviço" },
 description: {
 en: "Operations, sellers, couriers, inventory, dispatch, CX and reliability.",
 pt: "Operações, sellers, couriers, inventário, dispatch, CX e confiabilidade.",
 },
 decision: {
 en: "Protect the delivery chain from stock truth to successful delivery and recovery.",
 pt: "Proteger o delivery chain da verdade de estoque até entrega bem-sucedida e recuperação.",
 },
 },
 all: {
 label: { en: "All", pt: "Tudo" },
 shortLabel: { en: "Full portfolio", pt: "Portfólio completo" },
 description: {
 en: "The complete One Year Plan view across countries, functions and evidence.",
 pt: "Visão completa do One Year Plan entre países, funções e evidências.",
 },
 decision: {
 en: "Balance consumer habit, rewards frequency and service reliability — parallel tracks, shared metrics.",
 pt: "Equilibrar hábito do consumidor, frequência Rewards e confiabilidade de serviço — trilhas paralelas, métricas compartilhadas.",
 },
 },
};

export function getStakeholderOptions(locale: Locale): StakeholderOption[] {
 return STAKEHOLDER_OPTIONS.map((opt) => {
 const bag = STAKEHOLDER_I18N[opt.id];
 return {
...opt,
 label: lc(locale, bag.label),
 shortLabel: lc(locale, bag.shortLabel),
 description: lc(locale, bag.description),
 decision: lc(locale, bag.decision),
 };
 });
}

export function getStakeholderOption(locale: Locale, focus: StakeholderFocus): StakeholderOption {
 return getStakeholderOptions(locale).find((o) => o.id === focus) ?? getStakeholderOptions(locale)[3];
}

const FOCUS_EXEC_PT: Record<
 Exclude<StakeholderFocus, "all">,
 { headline: string; paragraphs: string[] }
> = {
 consumer: {
 headline: "Crescimento de consumidor depende de uma promessa de entrega que sobrevive à jornada.",
 paragraphs: [
 "Entre países, o problema do consumidor não é só aquisição. É endereço correto, estoque disponível, ETA realista, progresso visível do courier e recuperação rápida quando algo quebra.",
 "A lente consumidor prioriza confiança, segundo pedido, repetição e comparação competitiva por missão: urgente, planejado, grupo e pickup.",
 ],
 },
 rewards: {
 headline: "Rewards deve transformar serviço confiável em frequência — não compensar serviço instável.",
 paragraphs: [
 "Club TaDa, Braze, wallet, cupons flash e personalização só valem quando eventos, inventário e resultados de entrega são confiáveis.",
 "A lente Rewards prioriza valor realizado, repetição 7/30 dias, cross-use, prontidão promocional e economia versus Rappi Pro, PedidosYa Plus e Uber One.",
 ],
 },
 "service-level": {
 headline: "Nível de serviço sustenta a promessa de entrega — junto com recuperação do consumidor e dados de Rewards.",
 paragraphs: [
 "A cadeia seller → courier → cliente deve ser medida ponta a ponta: inventário, preparação, atribuição, rota, ETA, suporte e recuperação.",
 "Esta lente prioriza confiabilidade no pico, dispatch justo e ferramentas seller/courier — em paralelo com caminhos pós-compra e eventos de CRM dos quais Growth e Rewards dependem.",
 ],
 },
};

export function getFocusExecutiveSummaries(locale: Locale) {
 if (locale === "en") return FOCUS_EXECUTIVE_SUMMARIES;
 return FOCUS_EXEC_PT;
}

export const STAKEHOLDER_PICKER_UI = {
 decisionLens: { en: "Decision lens:", pt: "Lente de decisão:" },
 openPrefix: { en: "Open", pt: "Abrir" },
 openSuffix: { en: "→", pt: "→" },
 keepCurrent: { en: "Keep current view", pt: "Manter visão atual" },
};
