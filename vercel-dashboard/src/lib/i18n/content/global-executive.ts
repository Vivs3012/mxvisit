import { FIELD_EVIDENCE_SCOPE, formatSessionTotal } from "../../dashboard-evidence-scope";
import { GLOBAL_EXECUTIVE_SUMMARY } from "../../global-insights";
import type { Locale } from "../locale";

function executiveFieldStats(locale: Locale) {
 const { mexico, peru } = FIELD_EVIDENCE_SCOPE.pocStoresVisited;
 const pocMxPe = `${mexico}+${peru}`;
 const sessions = formatSessionTotal();
 const reviews = FIELD_EVIDENCE_SCOPE.researchReviewsAppbot;
 const surveys = FIELD_EVIDENCE_SCOPE.researchSurveyRespondents;
 if (locale === "en") {
 return [
 { label: "Countries field + benchmark", value: String(FIELD_EVIDENCE_SCOPE.countriesWithFieldVisits) },
 {
 label: "POCs (MX+PE) · sessions in dashboard",
 value: `${pocMxPe} · ${sessions}`,
 },
 { label: "Cross-themes + lenses", value: "35 + 8" },
 { label: "Research respondents", value: `${reviews}+ reviews · ${surveys} surveys` },
 ];
 }
 return [
 { label: "Países campo + benchmark", value: String(FIELD_EVIDENCE_SCOPE.countriesWithFieldVisits) },
 {
 label: "POCs (MX+PE) · sessões no dashboard",
 value: `${pocMxPe} · ${sessions}`,
 },
 { label: "Temas transversais + lentes", value: "35 + 8" },
 { label: "Respondentes pesquisa", value: `${reviews}+ reviews · ${surveys} surveys` },
 ];
}

const GLOBAL_EXECUTIVE_PT = {
 headline:
 "Uma história de portfólio entre países: hábito do consumidor e frequência Rewards só se sustentam quando estoque, seller, courier, endereço, ETA e recuperação ficam alinhados — growth, Club/CRM e nível de serviço avançam juntos.",
 paragraphs: [
 "Sinais consumidor e Rewards: churn ainda mostra intenção (76% primeira opção) mas quebra com fricção; Lovers Plus prova hábito com Perfect Orders e SLA15; workshops votaram mapa ao vivo, wallet/Club, enriquecimento Braze e CRM por coorte junto com KPIs de ops. Colômbia e Peru destacam coortes marketplace/banco com mensagens diferentes da cerveja core.",
 "Visitas de campo (México, Peru, Equador, Colômbia) ancoram as mesmas falhas na loja: mapa/GPS, inventário sem quantidade, coordenação pós-compra, timing promo vs supply e WhatsApp como camada operacional paralela. São problemas visíveis ao consumidor tanto quanto métricas de seller.",
 "Nível de serviço e pesquisa seller/courier quantificam o delivery chain: maturidade Small vs Large, fricção de exceção do courier e gaps de ferramenta no pico. Confiabilidade corre em paralelo com recuperação do consumidor e dados de Rewards — não como portão que congela Club, For You ou promo BIN.",
 "Concorrência é por missão: Rappi, Uber e PedidosYa ganham com amplitude de ecossistema de formas distintas. TaDa deve medir preço total, ETA, falha, recuperação e frequência por ocasião — e investir em loyalty focado em bebida (Club, wallet, personalização) com eventos limpos.",
 ],
};

export function getGlobalExecutiveSummary(locale: Locale) {
 const stats = executiveFieldStats(locale);
 if (locale === "en") {
 return {
 headline: GLOBAL_EXECUTIVE_SUMMARY.headline,
 paragraphs: GLOBAL_EXECUTIVE_SUMMARY.paragraphs,
 stats,
 };
 }
 return {
 headline: GLOBAL_EXECUTIVE_PT.headline,
 paragraphs: GLOBAL_EXECUTIVE_PT.paragraphs,
 stats,
 };
}
