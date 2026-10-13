import type { LocalizedString } from "./lc";

export const UI = {
 siteTitle: {
 en: "One year plan 2027",
 pt: "Plano de um ano 2027",
 },
 focusLabel: { en: "Focus:", pt: "Foco:" },
 changeFocusAria: {
 en: "Change stakeholder focus",
 pt: "Alterar foco de stakeholder",
 },
 underConstruction: { en: "Under construction", pt: "Em construção" },
 underConstructionBody: {
 en: "Dynamics and interviews for {country} will be added here as we build the TaDa 2027 plan.",
 pt: "Dinâmicas e entrevistas de {country} serão adicionadas aqui conforme montamos o plano TaDa 2027.",
 },
 executiveSummary: { en: "Executive summary", pt: "Sumário executivo" },
 sourcePrefix: { en: "Source:", pt: "Fonte:" },
 sessionNav: { en: "Session", pt: "Sessão" },
 subjectNav: { en: "Subject", pt: "Assunto" },
 meetingQuotes: { en: "Meeting quotes", pt: "Citações da reunião" },
 fullTranscript: { en: "Full transcript", pt: "Transcrição completa" },
 openRawTxt: { en: "Open raw.txt ↗", pt: "Abrir.txt original ↗" },
 transcriptLoadError: {
 en: "Could not load transcript from {path}",
 pt: "Não foi possível carregar a transcrição de {path}",
 },
 fieldContentNotice: {
 en: "Detailed field notes, quotes and transcripts may remain in Spanish or English. Navigation and summaries follow your language choice.",
 pt: "Notas de campo, citações e transcrições podem permanecer em espanhol ou inglês. Navegação e resumos seguem o idioma selecionado.",
 },
 searchPlaceholder: {
 en: "Search insights, stores, themes…",
 pt: "Buscar insights, lojas, temas…",
 },
 searchNoResults: {
 en: 'No results for "{query}" across Mexico, Peru, Colombia or Ecuador.',
 pt: 'Nenhum resultado para "{query}" em México, Peru, Colômbia ou Equador.',
 },
 stakeholderTitle: {
 en: "What do you want to focus on?",
 pt: "Em que você quer focar?",
 },
 stakeholderIntro: {
 en: "Choose a stakeholder lens. The dashboard will organize the cross-country insights, research evidence and roadmap around that decision context.",
 pt: "Escolha uma lente de stakeholder. O dashboard organiza insights cross-country, evidências de pesquisa e roadmap nesse contexto de decisão.",
 },
 consolidatedPdf: { en: "Consolidated PDF ↗", pt: "PDF consolidado ↗" },
 language: { en: "Language", pt: "Idioma" },
 langEn: { en: "EN", pt: "EN" },
 langPt: { en: "PT", pt: "PT" },
} satisfies Record<string, LocalizedString | { en: string; pt: string }>;

export function uiTemplate(bag: LocalizedString, vars: Record<string, string>): LocalizedString {
 let en = bag.en;
 let pt = bag.pt;
 for (const [key, value] of Object.entries(vars)) {
 en = en.replaceAll(`{${key}}`, value);
 pt = pt.replaceAll(`{${key}}`, value);
 }
 return { en, pt };
}
