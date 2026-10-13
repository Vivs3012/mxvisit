import type { Locale } from "../locale";
import { lc, type LocalizedString } from "../lc";

export const GLOBAL_TAB_UI = {
 pageTitleAll: { en: "Cross-country insights", pt: "Insights cross-country" },
 pageSubtitleAll: {
 en: "Mexico + Peru + Ecuador + Colombia field evidence — 12+ POCs, {sessions}+ sessions, {themes} ranked themes, 10+ research/market sources.",
 pt: "Evidência México, Peru e Equador + benchmark Colômbia — 12+ POCs, {sessions}+ sessões, {themes} temas ranqueados, 10+ fontes pesquisa/mercado.",
 },
 pageTitleFocus: {
 en: "{label} cross-country insights",
 pt: "Insights cross-country · {label}",
 },
 pageSubtitleFocus: {
 en: "{description} Evidence across Mexico, Peru, Ecuador and the Colombia competitive benchmark.",
 pt: "{description} Evidências em México, Peru, Equador e benchmark competitivo Colômbia.",
 },
 outcome2027: { en: "2027 outcome", pt: "Resultado 2027" },
 primary: { en: "Primary:", pt: "Principal:" },
 persona: { en: "Persona:", pt: "Persona:" },
 decisionLens: { en: "{label} decision lens", pt: "Lente de decisão · {label}" },
 researchSectionTitle: { en: "Research + competitive lens", pt: "Pesquisa + lente competitiva" },
 researchSectionLead: {
 en: "Cross-country analysis combines fieldwork, meetings, research and market evidence. Research is deepest in Mexico; Peru and Colombia remain hypotheses to validate where no equivalent local sample exists.",
 pt: "A análise cross-country combina campo, reuniões, pesquisa e evidência de mercado. A pesquisa é mais profunda no México; Peru e Colômbia seguem como hipóteses a validar onde não há amostra local equivalente.",
 },
 readingLimit: { en: "Reading limit:", pt: "Limite de leitura:" },
 implication: { en: "Implication:", pt: "Implicação:" },
 decision: { en: "Decision", pt: "Decisão" },
 integratedDecisions: { en: "Integrated decisions and metrics", pt: "Decisões integradas e métricas" },
 crossSourceMap: { en: "Cross-source map", pt: "Mapa entre fontes" },
 executiveSnapshot: { en: "Executive snapshot by topic", pt: "Snapshot executivo por tema" },
 executiveSnapshotLead: {
 en: "Field & ops = Operations in roadmap below · Service Level = Sep 1 Peru vision.",
 pt: "Campo e ops = Operações no roadmap abaixo · Nível de serviço = visão Peru 1 set.",
 },
 consumerRewardsTopics: { en: "Consumer & Rewards — ranked topics", pt: "Consumidor e Rewards — temas ranqueados" },
 consumerRewardsLead: {
 en: "Peru Sep 2 workshop votes + Sep 3 Consumer vision. Mexico field validates map, promo visibility and CX gaps. Ecuador Oct 8 adds Club, stock and profile/geo votes.",
 pt: "Votos workshop Peru 2 set + visão Consumidor 3 set. Campo México valida mapa, visibilidade promocional e gaps de CX. Equador 8 out acrescenta Club, estoque e perfil/geo.",
 },
 insightsSuffix: { en: "insights", pt: "insights" },
 direction2027: { en: "2027 direction", pt: "Direção 2027" },
 insightFieldEvidence: {
 en: "Field evidence (visits & workshops)",
 pt: "Evidência de campo (visitas e workshops)",
 },
 owners: { en: "Owners:", pt: "Responsáveis:" },
 openRoadmap: { en: "Open in UX roadmap →", pt: "Abrir no roadmap UX →" },
 mexicoDetail: { en: "Mexico detail →", pt: "Detalhe México →" },
 peruDetail: { en: "Peru detail →", pt: "Detalhe Peru →" },
 fullBacklog: { en: "Full UX backlog →", pt: "Backlog UX completo →" },
 strategicRoadmap: { en: "Strategic roadmap 2027", pt: "Roadmap estratégico 2027" },
 northStar: { en: "North star", pt: "North star" },
 exitCriteria: { en: "Exit criteria by horizon", pt: "Critérios de saída por horizonte" },
 homologate: { en: "Proven patterns to replicate", pt: "Padrões comprovados para replicar" },
 openQuestions: { en: "Open questions", pt: "Perguntas em aberto" },
 fieldThemesQual: { en: "Field themes by area (qualitative)", pt: "Temas de campo por área (qualitativo)" },
 convergences: { en: "Cross-country convergences", pt: "Convergências cross-country" },
 fieldSessions: { en: "Field sessions by date", pt: "Sessões de campo por data" },
 positiveSignals: { en: "Field-validated signals", pt: "Sinais validados em campo" },
 themeIndex: { en: "Theme index", pt: "Índice de temas" },
 sourceFooter: {
 en: "Source layers: field visits, meetings, dynamics, workshops, research hub (consumer, churn, Lovers Plus, sellers/couriers) and competitors benchmark. Colombia remains benchmark-led; local research is a validation gap.",
 pt: "Camadas de fonte: visitas de campo, reuniões, dinâmicas, workshops, hub de pesquisa (consumidor, churn, Lovers Plus, sellers/couriers) e benchmark de concorrentes. Colômbia segue liderada por benchmark; pesquisa local é gap de validação.",
 },
 topicsHeader: { en: "{label} topics", pt: "Temas · {label}" },
 workshopVotes: { en: "Workshop top votes (Peru Sep 2)", pt: "Top votos workshop (Peru 2 set)" },
 fieldThemesCaptured: { en: "Field themes captured", pt: "Temas de campo capturados" },
 rankedInsights: { en: "Ranked insights ({n})", pt: "Insights ranqueados ({n})" },
 peruDetailBtn: { en: "Peru · {label} detail →", pt: "Peru · detalhe {label} →" },
 q1Action: { en: "Q1 action", pt: "Ação Q1" },
 topProblems: { en: "Top problems", pt: "Principais problemas" },
 peruDetailShort: { en: "Peru detail →", pt: "Detalhe Peru →" },
 viewBacklog: { en: "View in backlog →", pt: "Ver no backlog →" },
 rewardsGate: { en: "Rewards · Now = dependency gate", pt: "Rewards · Agora = portão de dependência" },
 rewardsGateBody: {
 en: "No tier or omnichannel scale until core reliability and aligned data are in place. Workshop top votes (Braze, flash coupons) are Next, not Q1 delivery.",
 pt: "Sem escalar tiers ou omnichannel até confiabilidade básica e dados alinhados. Top votos de workshop (Braze, cupons flash) são Próximo, não entrega Q1.",
 },
 mexicoJul: { en: "Mexico · Jul 20–23, 2026", pt: "México · 20–23 jul 2026" },
 peruAug: { en: "Peru · Aug 31 – Sep 3, 2026", pt: "Peru · 31 ago – 3 set 2026" },
 ecuadorOct: { en: "Ecuador · Oct 7–8, 2026", pt: "Equador · 7–8 out 2026" },
 colombiaSep: { en: "Colombia · Sep 13, 2026", pt: "Colômbia · 13 set 2026" },
 tableHorizon: { en: "Horizon", pt: "Horizonte" },
 tableDecision: { en: "Decision", pt: "Decisão" },
 tableMeasure: { en: "Measure", pt: "Métrica" },
 tableEvidence: { en: "Evidence", pt: "Evidência" },
 tableLayer: { en: "Layer", pt: "Camada" },
 tableSources: { en: "Sources", pt: "Fontes" },
 tableReading: { en: "Reading", pt: "Leitura" },
 tableSignal: { en: "Signal", pt: "Sinal" },
 tableCountry: { en: "Country", pt: "País" },
 tableAction: { en: "Action", pt: "Ação" },
 tablePriority: { en: "Priority", pt: "Prioridade" },
 tableTheme: { en: "Theme", pt: "Tema" },
 tableCoverage: { en: "Coverage", pt: "Cobertura" },
 tableLayerCol: { en: "Layer", pt: "Camada" },
 lensResearch: { en: "Research", pt: "Pesquisa" },
 lensCompetition: { en: "Competition", pt: "Concorrência" },
 lensSynthesis: { en: "Synthesis", pt: "Síntese" },
 horizonNow: { en: "Now", pt: "Agora" },
 horizonNext: { en: "Next", pt: "Próximo" },
 horizonLater: { en: "Later", pt: "Depois" },
 phaseGate: { en: "Now = gate", pt: "Agora = portão" },
} satisfies Record<string, LocalizedString>;

export function globalTabUi(locale: Locale, key: keyof typeof GLOBAL_TAB_UI, vars?: Record<string, string>): string {
 let bag = GLOBAL_TAB_UI[key];
 if (vars) {
 let en = bag.en;
 let pt = bag.pt;
 for (const [k, v] of Object.entries(vars)) {
 en = en.replaceAll(`{${k}}`, v);
 pt = pt.replaceAll(`{${k}}`, v);
 }
 bag = { en, pt };
 }
 return lc(locale, bag);
}
