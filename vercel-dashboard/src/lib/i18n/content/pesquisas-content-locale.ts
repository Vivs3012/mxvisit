import {
 CHURN_INTERVIEW_QUOTES,
 CHURN_SURVEY_OPEN_THEMES,
 REPORT_MAP,
 REVIEW_VOICE_QUOTES,
 SUMARIO_SECTION_GUIDE,
} from "../../pesquisas-data";
import {
 CHURN_INTERVIEW_QUOTES_PT,
 CHURN_SURVEY_OPEN_THEMES_PT,
 COURIER_OPEN_QUOTES_PT,
 REVIEW_VOICE_QUOTES_PT,
 SELLER_OPEN_QUOTES_PT,
} from "./pesquisas-quotes-pt";
import {
 COURIER_OPEN_QUOTES,
 SELLERS_COURIERS_METHOD,
 SELLER_OPEN_QUOTES,
} from "../../sellers-couriers-research";
import { LOVERS_PLUS_SOURCE } from "../../lovers-plus-research";
import { LOVERS_PLUS_EXEC_NARRATIVE } from "../../lovers-plus-research";
import { SELLERS_COURIERS_EXECUTIVE } from "../../sellers-couriers-research";
import type { Locale } from "../locale";

const SUMARIO_GUIDE_PT = [
 { section: "Voz do consumidor", insight: "Polarização 3,44; conta, bugs e entrega como temas críticos" },
 { section: "Churn e retenção", insight: "4 padrões, fricção acumulada, saída para varejo físico, evento >35 min" },
 { section: "Lovers Plus", insight: "Hábito via previsibilidade; SLA15 e SKU favorito; menos promo que Core" },
 { section: "Operação e mercados", insight: "Playbooks por país; Rewards CO/Mexico and Peru" },
 { section: "Síntese e prioridades", insight: "6 princípios integrados; roadmap P0–P2 e KPIs mínimos" },
 { section: "Concorrentes", insight: "Rappi cross-country; Turbo/ETA; risco pós-Delivery Hero no PE" },
 {
 section: "Sellers e couriers",
 insight: "cadeia de entrega seller–courier; Small em discovery vs Large âncora; 4 perfis de courier",
 },
];

const APPBOT_THEME_PT: Record<string, string> = {
 "Satisfied users": "Usuários satisfeitos",
 Performance: "Performance",
 "Customer Support": "Suporte ao cliente",
 Bugs: "Bugs",
 Pricing: "Preços",
 "Dissatisfied users": "Usuários insatisfeitos",
 "Security & Accounts": "Segurança e contas",
 "Design & UX": "Design e UX",
 Connectivity: "Conectividade",
 "Use cases": "Casos de uso",
 Gaming: "Gaming",
 Payment: "Pagamento",
 "Sign Up & Login": "Cadastro e login",
 Privacy: "Privacidade",
 Frequency: "Frequência",
 Devices: "Dispositivos",
};

const CUSTOM_TOPIC_PT: Record<string, string> = {
 Delivery: "Entrega",
 "Rewards related": "Relacionado a Rewards",
 "Lack of product": "Falta de produto",
 "Performance (custom)": "Performance (custom)",
};

const LOVERS_EXEC_PT = {
 headline: "Crescimento do Lovers Plus se destrava removendo fricção — não com persuasão.",
};

const SELLERS_EXEC_PT = {
 headline:
 "Volume não é maturidade — sellers e couriers precisam de plays diferentes por porte, maturidade e tipo de trabalho.",
 paragraphs: [
 "Sellers querem crescer sem perder qualidade de serviço; couriers querem menos tempo perdido com informação incompleta, rotas confusas e exceções sem suporte. A clusterização organiza o problema em perfis de decisão para produto, operações, comercial e pesquisa.",
 "Na amostra pareada (322 sellers com métricas), 85 são Small em discovery — a maior célula, com menor satisfação (3,86/5) e reconhecimento de métricas (2,9/8). Large âncora (49 sellers, ~15% da base) representa ~35% do valor semanal estimado da amostra.",
 "Couriers (794 respostas no relatório; 793 completas no export): 72% com satisfação 4–5 coexistem com alta fricção — 46,9% citam comunicação com cliente e 36,5% rotas/endereços confusos. A falha aparece no cadeia de entrega seller → courier → cliente → plataforma.",
 ],
 stats: [
 { label: "Sellers (survey)", value: "333", tone: "primary" as const },
 { label: "Sellers pareados", value: "322", tone: "primary" as const },
 { label: "Couriers (survey)", value: "794", tone: "info" as const },
 { label: "Perfis de decisão", value: "9 + 4", tone: "neutral" as const },
 ],
 statsSecondary: [
 { label: "Sellers MX (pareados)", value: "62%", tone: "primary" as const },
 { label: "Satisfação seller 4–5", value: "82%", tone: "success" as const },
 { label: "Revisam KPIs diário", value: "84%", tone: "success" as const },
 { label: "Satisfação courier 4–5", value: "72%", tone: "warning" as const },
 ],
};

export function getSumarioSectionGuide(locale: Locale) {
 return locale === "pt" ? SUMARIO_GUIDE_PT : SUMARIO_SECTION_GUIDE;
}

export function translateAppbotTheme(theme: string, locale: Locale): string {
 if (locale === "en") return theme;
 return APPBOT_THEME_PT[theme] ?? theme;
}

export function translateCustomTopic(topic: string, locale: Locale): string {
 if (locale === "en") return topic;
 return CUSTOM_TOPIC_PT[topic] ?? topic;
}

export function getLoversPlusExecNarrative(locale: Locale) {
 if (locale === "en") return LOVERS_PLUS_EXEC_NARRATIVE;
 return {...LOVERS_PLUS_EXEC_NARRATIVE, headline: LOVERS_EXEC_PT.headline };
}

export function getSellersCouriersExecutive(locale: Locale) {
 if (locale === "en") return SELLERS_COURIERS_EXECUTIVE;
 return SELLERS_EXEC_PT;
}

export function getReviewVoiceQuotes(locale: Locale) {
 return locale === "pt" ? REVIEW_VOICE_QUOTES_PT : REVIEW_VOICE_QUOTES;
}

export function getChurnSurveyOpenThemes(locale: Locale) {
 return locale === "pt" ? CHURN_SURVEY_OPEN_THEMES_PT : CHURN_SURVEY_OPEN_THEMES;
}

export function getChurnInterviewQuotes(locale: Locale) {
 return locale === "pt" ? CHURN_INTERVIEW_QUOTES_PT : CHURN_INTERVIEW_QUOTES;
}

export function getSellerOpenQuotes(locale: Locale) {
 return locale === "pt" ? SELLER_OPEN_QUOTES_PT : SELLER_OPEN_QUOTES;
}

export function getCourierOpenQuotes(locale: Locale) {
 return locale === "pt" ? COURIER_OPEN_QUOTES_PT : COURIER_OPEN_QUOTES;
}

const SELLERS_COURIERS_METHOD_PT = [
 {
 source: "Survey sellers Typeform",
 coverage: "333 respostas; 325 IDs únicos; 322 pareados com métricas",
 use: "Operação, dependência TaDa, preparação, reconhecimento de métricas, frequência de revisão, satisfação e desafios abertos.",
 },
 {
 source: "Métricas sellers (results-2/3)",
 coverage: "327 IDs; 322 pareados ao survey",
 use: "País, cidade, modelo, tenure, pedidos/semana, cancelamentos, GMV, rating e tempo de entrega.",
 },
 {
 source: "Survey couriers Typeform",
 coverage: "794 respostas completas",
 use: "Lojas, vínculo fixo, tenure, dias/horas, apps gig, fricção, satisfação e melhoria aberta.",
 },
 {
 source: "Seller Atlas 2026",
 coverage: "Deck de interpretação",
 use: "Perfis, cortes normalizados e leitura estratégica seller + courier.",
 },
];

export function getSellersCouriersMethod(locale: Locale) {
 return locale === "pt" ? SELLERS_COURIERS_METHOD_PT : SELLERS_COURIERS_METHOD;
}

const LOVERS_PLUS_SOURCE_PT =
 "Research - Lovers Plus_Complete 3.pdf — México, dez/2025 (Purchase Squad)";

export function getLoversPlusSource(locale: Locale) {
 return locale === "pt" ? LOVERS_PLUS_SOURCE_PT : LOVERS_PLUS_SOURCE;
}

export function getReportMap(locale: Locale) {
 if (locale === "en") return REPORT_MAP;
 return REPORT_MAP.map((row) =>
 row.num === "08"
 ? {...row, theme: "Arquivos-fonte", content: "PDFs, CSVs e inventário de fontes" }
 : row,
 );
}
