import type { Locale } from "../locale";
import { lc } from "../lc";

export type PesquisasLabels = {
 sumario: {
 deepDive: string;
 thesis: string;
 signals: string;
 suggestedDecision: string;
 suggestedDecisionBody: string;
 sourceFooter: string;
 topicCol: string;
 quickReadCol: string;
 signalCol: string;
 evidenceCol: string;
 implicationCol: string;
 };
 metodo: {
 reportMap: string;
 interpret: string;
 dataLimits: string;
 sectionCol: string;
 themeCol: string;
 contentCol: string;
 fileCol: string;
 sampleCol: string;
 periodCol: string;
 useCol: string;
 };
 voz: {
 reviews: string;
 avgRating: string;
 distributionCallout: string;
 starDist: string;
 monthlyTrend: string;
 playVsIos: string;
 themeReading: string;
 customTopics: string;
 quotes: string;
 decisionQ: string;
 monthCol: string;
 nCol: string;
 averageCol: string;
 reviewsPct: string;
 countSeries: string;
 storeCol: string;
 negSentiment: string;
 customTopicCol: string;
 appbotFullTable: string;
 };
 churn: {
 source: string;
 framework: string;
 gradualLoss: string;
 onboarding: string;
 participation: string;
 lostGmv: string;
 valueExit: string;
 openThemes: string;
 eventDriven: string;
 interviews: string;
 takeaways: string;
 proactive: string;
 loopSurvey: string;
 returnVsReorder: string;
 churnRateSeries: string;
 };
 lovers: {
 source: string;
 execHabit: string;
 methodology: string;
 block01: string;
 block02: string;
 driveMoreOrders: string;
 beerFreq: string;
 block03: string;
 block04: string;
 slaThreshold: string;
 block05: string;
 ifDisappeared: string;
 block06: string;
 closing: string;
 habitSustains: string;
 habitBreaks: string;
 opportunities: string;
 hypotheses: string;
 reviewPrefix: string;
 frictionExit: string;
 };
 operacao: {
 marketReading: string;
 rewardsByMarket: string;
 };
 sintese: {
 principles: string;
 journey: string;
 prioritization: string;
 roadmap: string;
 kpiPanel: string;
 executionSeq: string;
 };
 sellers: {
 clusteringPdf: string;
 sellersCsv: string;
 couriersCsv: string;
 decisions: string;
 method: string;
 sellerSurvey: string;
 avgSat: string;
 manualMgmt: string;
 tadaShare: string;
 recognitionCallout: string;
 recognitionBody: string;
 clustering: string;
 courierSurvey: string;
 fixedStore: string;
 hours7: string;
 satFriction: string;
 satFrictionBody: string;
 profiles: string;
 serviceChain: string;
 plan90: string;
 voiceSellers: string;
 voiceCouriers: string;
 notes: string;
 sourcePrefix: string;
 themeCol: string;
 evidenceCol: string;
 actionCol: string;
 sourceCol: string;
 coverageCol: string;
 useCol: string;
 pctSellers: string;
 pctRecognizing: string;
 sizeCol: string;
 discoveryCol: string;
 structuringCol: string;
 matureCol: string;
 frictionCol: string;
 pctExport: string;
 pctReport: string;
 profileCol: string;
 patternCol: string;
 mainFrictionCol: string;
 playCol: string;
 momentCol: string;
 signalCol: string;
 responseCol: string;
 whenCol: string;
 audienceCol: string;
 metricsCol: string;
 quoteCol: string;
 };
 arquivos: {
 consolidatedTitle: string;
 consolidatedBody: string;
 openReport: string;
 fileCol: string;
 downloadCol: string;
 openBtn: string;
 };
 charts: {
 pct: string;
 };
};

const LABELS: { en: PesquisasLabels; pt: PesquisasLabels } = {
 en: {
 sumario: {
 deepDive: "Where to go deeper in this tab",
 thesis: "The central thesis — four layers",
 signals: "Six decision signals",
 suggestedDecision: "Suggested decision",
 suggestedDecisionBody:
 "Treat availability + SLA + failure recovery as one retention system. Consumers do not separate seller, courier, app, catalog and support.",
 sourceFooter:
 "Consolidation: TaDa Delivery Insights Apr–Sep 2026, Learning Agenda (churn), Lovers Plus Research, 2026 Annual Review, Appbot CSV and Competitors benchmark (Sep 2026).",
 topicCol: "Topic",
 quickReadCol: "Quick read",
 signalCol: "Signal",
 evidenceCol: "Evidence",
 implicationCol: "Implication",
 },
 metodo: {
 reportMap: "Report map",
 interpret: "How to interpret the evidence",
 dataLimits: "Data limits and quality",
 sectionCol: "Section",
 themeCol: "Theme",
 contentCol: "Content",
 fileCol: "File",
 sampleCol: "Sample",
 periodCol: "Period",
 useCol: "Use in report",
 },
 voz: {
 reviews: "Reviews",
 avgRating: "Average rating",
 distributionCallout: "What the distribution changes",
 starDist: "Star distribution",
 monthlyTrend: "Monthly trend",
 playVsIos: "Google Play vs iOS",
 themeReading: "Theme-level reading",
 customTopics: "Custom topics (tags)",
 quotes: "Quotes and actionable learnings",
 decisionQ: "Decision question",
 monthCol: "Month",
 nCol: "N",
 averageCol: "Average",
 reviewsPct: "% reviews",
 countSeries: "Count",
 storeCol: "Store",
 negSentiment: "% negative",
 customTopicCol: "Custom topic",
 appbotFullTable: "Appbot themes (full table)",
 },
 churn: {
 source: "Source — churn research (Learning Agenda)",
 framework: "Framework — four patterns",
 gradualLoss: "Gradual loss — accumulated frictions (slide 14)",
 onboarding: "Onboarding failure (27%)",
 participation: "Share",
 lostGmv: "Lost GMV",
 valueExit: "Value exit — where and why they buy (slides 17–20)",
 openThemes: "Open question — themes (survey / AI)",
 eventDriven: "Event driven (slides 21–23)",
 interviews: "Interviews — 11 churned consumers (slides 25–26)",
 takeaways: "Key takeaways — opportunities by pattern (slide 28)",
 proactive: "Proactive Consumer Recovery (pilot)",
 loopSurvey: "Churn survey — comparison with alternatives (Loop)",
 returnVsReorder: "Return vs reorder",
 churnRateSeries: "Churn rate %",
 },
 lovers: {
 source: "Source",
 execHabit: "Executive — habit vs friction (slide 2)",
 methodology: "Methodology and sample",
 block01: "Block 01 — Connection with TaDa",
 block02: "Block 02 — Occasion behavior",
 driveMoreOrders: "What would drive more orders",
 beerFreq: "Beer consumption frequency",
 block03: "Block 03 — Off-app behavior",
 block04: "Block 04 — Behavior change triggers",
 slaThreshold: "SLA 15 min threshold",
 block05: "Block 05 — Service check",
 ifDisappeared: "If TaDa disappeared tomorrow",
 block06: "Block 06 — Strategic takeaways",
 closing: "Closing",
 habitSustains: "What sustains habit",
 habitBreaks: "What breaks habit",
 opportunities: "Opportunities",
 hypotheses: "Hypotheses",
 reviewPrefix: "Review",
 frictionExit: "Users do not leave by choice — they leave because of friction.",
 },
 operacao: {
 marketReading: "Market-level reading",
 rewardsByMarket: "Rewards by market",
 },
 sintese: {
 principles: "Integrated principles (6)",
 journey: "Journey model",
 prioritization: "Prioritization principle",
 roadmap: "Recommended roadmap (full)",
 kpiPanel: "Minimum monitoring panel",
 executionSeq: "Execution sequence",
 },
 sellers: {
 clusteringPdf: "Clustering PDF ↗",
 sellersCsv: "Sellers CSV ↗",
 couriersCsv: "Couriers CSV ↗",
 decisions: "Recommended decisions (synthesis)",
 method: "Method and sources",
 sellerSurvey: "Sellers — Typeform survey (n=333)",
 avgSat: "Average satisfaction",
 manualMgmt: "Manual management",
 tadaShare: "TaDa >50% of sales",
 recognitionCallout: "Recognition ≠ action",
 recognitionBody:
 "84% review results daily, but Demand Coverage and SLA60 are the least recognized — candidates for simple cards (what changed, why it changed and the next step).",
 clustering: "Seller clustering (9 cells, n=322 matched)",
 courierSurvey: "Couriers — Typeform survey (n≈794)",
 fixedStore: "Fixed to 1 store",
 hours7: "7+ hours/day",
 satFriction: "Satisfaction and friction coexist",
 satFrictionBody:
 "~72% rate satisfaction 4–5, but communication, routes and waiting remain at the top — quick gains in information and cadeia de entrega without rebuilding the entire app.",
 profiles: "Courier profiles (routing)",
 serviceChain: "Seller → courier → customer service chain",
 plan90: "90-day plan",
 voiceSellers: "Open voice — sellers",
 voiceCouriers: "Open voice — couriers",
 notes: "Interpretation notes",
 sourcePrefix: "TaDa Delivery — Sellers and couriers, 2026 clustering; Typeform exports and Seller Atlas. Reference period:",
 themeCol: "Theme",
 evidenceCol: "Evidence",
 actionCol: "Action",
 sourceCol: "Source",
 coverageCol: "Coverage",
 useCol: "Use",
 pctSellers: "% of sellers",
 pctRecognizing: "% recognizing",
 sizeCol: "Size",
 discoveryCol: "Discovery",
 structuringCol: "Structuring",
 matureCol: "Mature",
 frictionCol: "Friction",
 pctExport: "% export",
 pctReport: "% report",
 profileCol: "Profile",
 patternCol: "Pattern",
 mainFrictionCol: "Main friction",
 playCol: "Play",
 momentCol: "Moment",
 signalCol: "Research signal",
 responseCol: "Response",
 whenCol: "When",
 audienceCol: "Audience",
 metricsCol: "Metrics",
 quoteCol: "Quote",
 },
 arquivos: {
 consolidatedTitle: "Consolidated report (27 pages)",
 consolidatedBody: "Executive PDF with all sections in this tab — Apr–Sep 2026.",
 openReport: "Open full report ↗",
 fileCol: "File",
 downloadCol: "Download",
 openBtn: "Open ↗",
 },
 charts: { pct: "%" },
 },
 pt: {
 sumario: {
 deepDive: "Onde aprofundar nesta aba",
 thesis: "Tese central — quatro camadas",
 signals: "Seis sinais de decisão",
 suggestedDecision: "Decisão sugerida",
 suggestedDecisionBody:
 "Tratar disponibilidade + SLA + recuperação de falhas como um único sistema de retenção. O consumidor não separa seller, courier, app, catálogo e suporte.",
 sourceFooter:
 "Consolidação: TaDa Delivery Insights abr–set 2026, Learning Agenda (churn), Lovers Plus Research, Annual Review 2026, CSV Appbot e benchmark Concorrentes (set 2026).",
 topicCol: "Tópico",
 quickReadCol: "Leitura rápida",
 signalCol: "Sinal",
 evidenceCol: "Evidência",
 implicationCol: "Implicação",
 },
 metodo: {
 reportMap: "Mapa do relatório",
 interpret: "Como interpretar as evidências",
 dataLimits: "Limites e qualidade dos dados",
 sectionCol: "Seção",
 themeCol: "Tema",
 contentCol: "Conteúdo",
 fileCol: "Arquivo",
 sampleCol: "Amostra",
 periodCol: "Período",
 useCol: "Uso no relatório",
 },
 voz: {
 reviews: "Reviews",
 avgRating: "Nota média",
 distributionCallout: "O que a distribuição muda",
 starDist: "Distribuição por estrelas",
 monthlyTrend: "Tendência mensal",
 playVsIos: "Google Play vs iOS",
 themeReading: "Leitura por tema",
 customTopics: "Tópicos customizados (marcações)",
 quotes: "Citações e aprendizados acionáveis",
 decisionQ: "Pergunta de decisão",
 monthCol: "Mês",
 nCol: "N",
 averageCol: "Média",
 reviewsPct: "% reviews",
 countSeries: "Contagem",
 storeCol: "Loja",
 negSentiment: "% negativo",
 customTopicCol: "Tópico custom",
 appbotFullTable: "Temas Appbot (tabela completa)",
 },
 churn: {
 source: "Fonte — pesquisa de churn (Learning Agenda)",
 framework: "Framework — quatro padrões",
 gradualLoss: "Perda gradual — fricções acumuladas (slide 14)",
 onboarding: "Falha de onboarding (27%)",
 participation: "Participação",
 lostGmv: "GMV perdido",
 valueExit: "Saída de valor — onde e por que compram (slides 17–20)",
 openThemes: "Pergunta aberta — temas (survey / IA)",
 eventDriven: "Event driven (slides 21–23)",
 interviews: "Entrevistas — 11 consumidores em churn (slides 25–26)",
 takeaways: "Principais aprendizados — oportunidades por padrão (slide 28)",
 proactive: "Recuperação proativa do consumidor (piloto)",
 loopSurvey: "Survey de churn — comparação com alternativas (Loop)",
 returnVsReorder: "Retorno vs recompra",
 churnRateSeries: "Taxa de churn %",
 },
 lovers: {
 source: "Fonte",
 execHabit: "Executivo — hábito vs fricção (slide 2)",
 methodology: "Metodologia e amostra",
 block01: "Bloco 01 — Conexão com TaDa",
 block02: "Bloco 02 — Comportamento por ocasião",
 driveMoreOrders: "O que geraria mais pedidos",
 beerFreq: "Frequência de consumo de cerveja",
 block03: "Bloco 03 — Comportamento fora do app",
 block04: "Bloco 04 — Gatilhos de mudança de comportamento",
 slaThreshold: "Limiar SLA 15 min",
 block05: "Bloco 05 — Checagem de serviço",
 ifDisappeared: "Se o TaDa desaparecesse amanhã",
 block06: "Bloco 06 — Aprendizados estratégicos",
 closing: "Fechamento",
 habitSustains: "O que sustenta o hábito",
 habitBreaks: "O que quebra o hábito",
 opportunities: "Oportunidades",
 hypotheses: "Hipóteses",
 reviewPrefix: "Revisar",
 frictionExit: "Usuários não saem por escolha — saem por fricção.",
 },
 operacao: {
 marketReading: "Leitura por mercado",
 rewardsByMarket: "Rewards por mercado",
 },
 sintese: {
 principles: "Princípios integrados (6)",
 journey: "Modelo de jornada",
 prioritization: "Princípio de priorização",
 roadmap: "Roadmap recomendado (completo)",
 kpiPanel: "Painel mínimo de monitoramento",
 executionSeq: "Sequência de execução",
 },
 sellers: {
 clusteringPdf: "PDF clusterização ↗",
 sellersCsv: "CSV sellers ↗",
 couriersCsv: "CSV couriers ↗",
 decisions: "Decisões recomendadas (síntese)",
 method: "Método e fontes",
 sellerSurvey: "Sellers — survey Typeform (n=333)",
 avgSat: "Satisfação média",
 manualMgmt: "Gestão manual",
 tadaShare: "TaDa >50% das vendas",
 recognitionCallout: "Reconhecimento ≠ ação",
 recognitionBody:
 "84% revisam resultados diariamente, mas Demand Coverage e SLA60 são os menos reconhecidos — candidatos a cards simples (o que mudou, por que mudou e o próximo passo).",
 clustering: "Clusterização de sellers (9 células, n=322 pareados)",
 courierSurvey: "Couriers — survey Typeform (n≈794)",
 fixedStore: "Fixo em 1 loja",
 hours7: "7+ horas/dia",
 satFriction: "Satisfação e fricção coexistem",
 satFrictionBody:
 "~72% dão satisfação 4–5, mas comunicação, rotas e espera seguem no topo — ganhos rápidos em informação e cadeia de entrega sem reconstruir o app inteiro.",
 profiles: "Perfis de courier (roteirização)",
 serviceChain: "Cadeia seller → courier → atendimento ao cliente",
 plan90: "Plano 90 dias",
 voiceSellers: "Voz aberta — sellers",
 voiceCouriers: "Voz aberta — couriers",
 notes: "Notas de interpretação",
 sourcePrefix:
 "TaDa Delivery — Sellers e couriers, clusterização 2026; exports Typeform e Seller Atlas. Período de referência:",
 themeCol: "Tema",
 evidenceCol: "Evidência",
 actionCol: "Ação",
 sourceCol: "Fonte",
 coverageCol: "Cobertura",
 useCol: "Uso",
 pctSellers: "% dos sellers",
 pctRecognizing: "% reconhecendo",
 sizeCol: "Porte",
 discoveryCol: "Discovery",
 structuringCol: "Structuring",
 matureCol: "Mature",
 frictionCol: "Fricção",
 pctExport: "% export",
 pctReport: "% relatório",
 profileCol: "Perfil",
 patternCol: "Padrão",
 mainFrictionCol: "Fricção principal",
 playCol: "Play",
 momentCol: "Momento",
 signalCol: "Sinal da pesquisa",
 responseCol: "Resposta",
 whenCol: "Quando",
 audienceCol: "Público",
 metricsCol: "Métricas",
 quoteCol: "Citação",
 },
 arquivos: {
 consolidatedTitle: "Relatório consolidado (27 páginas)",
 consolidatedBody: "PDF executivo com todas as seções desta aba — abr–set 2026.",
 openReport: "Abrir relatório completo ↗",
 fileCol: "Arquivo",
 downloadCol: "Download",
 openBtn: "Abrir ↗",
 },
 charts: { pct: "%" },
 },
};

export function getPesquisasLabels(locale: Locale): PesquisasLabels {
 return locale === "pt" ? LABELS.pt : LABELS.en;
}
