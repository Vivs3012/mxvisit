import type { PesquisaSectionId } from "../pesquisas-data";
import type { PueblaProjectSectionId } from "../puebla-project-shared";
import type { DashboardCountry } from "../dashboard-url";
import type { StakeholderFocus } from "../stakeholder-focus";
import { lc, type LocalizedString } from "./lc";
import type { Locale } from "./locale";

const COUNTRY_TAB_LABELS: Record<DashboardCountry, LocalizedString> = {
 executive: { en: "Executive", pt: "Visão executiva" },
 themes: { en: "Cross-country", pt: "Cross-country" },
 mexico: { en: "Mexico", pt: "México" },
 peru: { en: "Peru", pt: "Peru" },
 colombia: { en: "Colombia", pt: "Colômbia" },
 ecuador: { en: "Ecuador", pt: "Equador" },
 pesquisas: { en: "Research", pt: "Pesquisa" },
 roadmap: { en: "Roadmap", pt: "Roadmap" },
 sources: { en: "Sources & method", pt: "Fontes e método" },
 /** @deprecated URL legacy — maps to themes */
 all: { en: "All", pt: "Tudo" },
 /** @deprecated URL legacy — open from México */
 "puebla-project": { en: "Puebla Project", pt: "Projeto Puebla" },
};

export type DashboardNavItem =
 | { id: string; label: string; kind: "route"; country: DashboardCountry }
 | { id: string; label: string; kind: "theme"; themeFocus: StakeholderFocus };

export type DashboardNavGroup = {
 id: string;
 label: string;
 items: DashboardNavItem[];
};

export function getDashboardNavGroups(locale: Locale): DashboardNavGroup[] {
 return [
 {
 id: "executive",
 label: locale === "pt" ? "Visão executiva" : "Executive",
 items: [
 {
 id: "executive",
 kind: "route",
 country: "executive",
 label: lc(locale, COUNTRY_TAB_LABELS.executive),
 },
 ],
 },
 {
 id: "themes",
 label: locale === "pt" ? "Temas" : "Themes",
 items: [
 {
 id: "themes-all",
 kind: "theme",
 themeFocus: "all",
 label: locale === "pt" ? "Todos os temas" : "All themes",
 },
 {
 id: "themes-sl",
 kind: "theme",
 themeFocus: "service-level",
 label: locale === "pt" ? "Nível de serviço" : "Service level",
 },
 {
 id: "themes-consumer",
 kind: "theme",
 themeFocus: "consumer",
 label: locale === "pt" ? "Consumidor" : "Consumer",
 },
 {
 id: "themes-rewards",
 kind: "theme",
 themeFocus: "rewards",
 label: locale === "pt" ? "Rewards" : "Rewards",
 },
 ],
 },
 {
 id: "countries",
 label: locale === "pt" ? "Países" : "Countries",
 items: (["mexico", "peru", "colombia", "ecuador"] as DashboardCountry[]).map((id) => ({
 id,
 kind: "route" as const,
 country: id,
 label: lc(locale, COUNTRY_TAB_LABELS[id]),
 })),
 },
 {
 id: "evidence",
 label: locale === "pt" ? "Evidência e entrega" : "Evidence & delivery",
 items: [
 {
 id: "pesquisas",
 kind: "route",
 country: "pesquisas",
 label: lc(locale, COUNTRY_TAB_LABELS.pesquisas),
 },
 {
 id: "roadmap",
 kind: "route",
 country: "roadmap",
 label: lc(locale, COUNTRY_TAB_LABELS.roadmap),
 },
 {
 id: "sources",
 kind: "route",
 country: "sources",
 label: lc(locale, COUNTRY_TAB_LABELS.sources),
 },
 ],
 },
 ];
}

/** @deprecated use getDashboardNavGroups */
export function getCountryTabs(locale: Locale): { id: DashboardCountry; label: string }[] {
 return getDashboardNavGroups(locale).flatMap((g) =>
 g.items
 .filter((i): i is Extract<DashboardNavItem, { kind: "route" }> => i.kind === "route")
 .map((i) => ({ id: i.country, label: i.label })),
 );
}

const PESQUISAS_SECTION_LABELS: Record<
 PesquisaSectionId,
 { label: LocalizedString; subtitle: LocalizedString }
> = {
 sumario: {
 label: { en: "Executive summary", pt: "Sumário executivo" },
 subtitle: {
 en: "Updated thesis — consumer, churn, LP, operations and competitors",
 pt: "Tese atualizada — consumidor, churn, LP, operação e concorrentes",
 },
 },
 metodo: {
 label: { en: "Method and sources", pt: "Método e fontes" },
 subtitle: {
 en: "Scope, limitations and evidence cross-check",
 pt: "Escopo, limitações e checagem cruzada de evidências",
 },
 },
 "voz-consumidor": {
 label: { en: "Consumer voice", pt: "Voz do consumidor" },
 subtitle: {
 en: "1,630 Appbot reviews (Apr–Sep 2026)",
 pt: "1.630 reviews Appbot (abr–set 2026)",
 },
 },
 churn: {
 label: { en: "Churn and retention", pt: "Churn e retenção" },
 subtitle: {
 en: "Learning Agenda slides 13+ — framework, friction, value exit, event-driven",
 pt: "Learning Agenda slides 13+ — framework, fricção, saída de valor, event-driven",
 },
 },
 "lovers-plus": {
 label: { en: "Lovers Plus", pt: "Lovers Plus" },
 subtitle: {
 en: "Research Complete 3 — 5 blocos + transacional out/25–jan/26",
 pt: "Research Complete 3 — 5 blocos + transacional out/25–jan/26",
 },
 },
 operacao: {
 label: { en: "Operations and markets", pt: "Operação e mercados" },
 subtitle: {
 en: "2026 Annual Review by country",
 pt: "Annual Review 2026 por país",
 },
 },
 "sellers-couriers": {
 label: { en: "Sellers and couriers", pt: "Sellers e couriers" },
 subtitle: {
 en: "2026 clustering — 333 sellers, 794 couriers, 9+4 profiles",
 pt: "Clustering 2026 — 333 sellers, 794 couriers, 9+4 perfis",
 },
 },
 sintese: {
 label: { en: "Integrated synthesis", pt: "Síntese integrada" },
 subtitle: {
 en: "Principles appearing across multiple sources",
 pt: "Princípios que aparecem em várias fontes",
 },
 },
 prioridades: {
 label: { en: "Priorities", pt: "Prioridades" },
 subtitle: {
 en: "P0–P2 roadmap and minimum KPI panel",
 pt: "Roadmap P0–P2 e painel mínimo de KPIs",
 },
 },
 arquivos: {
 label: { en: "Source files", pt: "Arquivos-fonte" },
 subtitle: {
 en: "PDFs, CSVs and consolidated deck",
 pt: "PDFs, CSVs e deck consolidado",
 },
 },
 competitors: {
 label: { en: "Competitors", pt: "Concorrentes" },
 subtitle: {
 en: "LATAM benchmark — Rappi, PedidosYa, Justo and 2027 plan",
 pt: "Benchmark LATAM — Rappi, PedidosYa, Justo e plano 2027",
 },
 },
};

export function getPesquisasSections(locale: Locale) {
 return (Object.keys(PESQUISAS_SECTION_LABELS) as PesquisaSectionId[]).map((id) => ({
 id,
 label: lc(locale, PESQUISAS_SECTION_LABELS[id].label),
 subtitle: lc(locale, PESQUISAS_SECTION_LABELS[id].subtitle),
 }));
}

const PUEBLA_SECTION_LABELS: Record<
 PueblaProjectSectionId,
 { label: LocalizedString; subtitle: LocalizedString }
> = {
 overview: {
 label: { en: "Overview", pt: "Visão geral" },
 subtitle: {
 en: "Scope, stats, and how to read this project",
 pt: "Escopo, números e como ler este projeto",
 },
 },
 "cx-retention": {
 label: { en: "CX · Retention", pt: "CX · Retenção" },
 subtitle: {
 en: "Rota CX — Club TaDa, backlog, coupons",
 pt: "Rota CX — Club TaDa, backlog, cupons",
 },
 },
 "cx-proactive": {
 label: { en: "CX · Proactive", pt: "CX · Proativo" },
 subtitle: {
 en: "WhatsApp outreach after friction",
 pt: "WhatsApp proativo após fricção",
 },
 },
 "cx-field": {
 label: { en: "CX · Field review", pt: "CX · Revisão em campo" },
 subtitle: {
 en: "Ticket review on store visit",
 pt: "Revisão de tickets na visita à loja",
 },
 },
 "cholula-ops": {
 label: { en: "Cholula · Ops", pt: "Cholula · Ops" },
 subtitle: {
 en: "Tablet alarms, BEES sync, turbo",
 pt: "Alarmes no tablet, sync BEES, turbo",
 },
 },
 "cholula-cx": {
 label: { en: "Cholula · CX", pt: "Cholula · CX" },
 subtitle: {
 en: "Contáctanos & response SLAs",
 pt: "Contáctanos e SLAs de resposta",
 },
 },
 "buenavista-turbo": {
 label: { en: "Buenavista · Turbo", pt: "Buenavista · Turbo" },
 subtitle: {
 en: "Geofence, UI, metrics",
 pt: "Geofence, UI, métricas",
 },
 },
 "buena-vista-zone": {
 label: { en: "Buena Vista", pt: "Buena Vista" },
 subtitle: {
 en: "Gated clusters & alerts",
 pt: "Clusters fechados e alertas",
 },
 },
 radial: {
 label: { en: "Radial", pt: "Radial" },
 subtitle: {
 en: "Parallel email & fleet",
 pt: "E-mail paralelo e frota",
 },
 },
 periferico: {
 label: { en: "Periférico", pt: "Periférico" },
 subtitle: {
 en: "Mochila, map, turbo order",
 pt: "Mochila, mapa, ordem turbo",
 },
 },
 "cross-themes": {
 label: { en: "Cross-themes", pt: "Temas transversais" },
 subtitle: {
 en: "Ranked patterns across all sessions",
 pt: "Padrões ranqueados em todas as sessões",
 },
 },
};

export function getPueblaProjectSections(locale: Locale) {
 return (Object.keys(PUEBLA_SECTION_LABELS) as PueblaProjectSectionId[]).map((id) => ({
 id,
 label: lc(locale, PUEBLA_SECTION_LABELS[id].label),
 subtitle: lc(locale, PUEBLA_SECTION_LABELS[id].subtitle),
 }));
}
