import { LIMA } from "./lima-metrics";
import { CO_PRODUCT_MEETING } from "./colombia-product-meeting-sep13";
import { CO_SL_MEETING } from "./colombia-service-level-meeting-sep13";
import { COLOMBIA_SL_INSIGHTS } from "./colombia-service-level-insights";
import {
 COLOMBIA_ALL_CONVERGENCES,
 COLOMBIA_ALL_INSIGHTS,
 COLOMBIA_ALL_EXECUTIVE,
} from "./colombia-synthesis-all";
import { COLOMBIA_CROSS_THEMES, COLOMBIA_MEETING_INSIGHTS } from "./colombia-insights";
import { EC_CONTEXT_MEETING } from "./ecuador-context-meeting";
import { ECUADOR_WORKSHOP_PAINS } from "./ecuador-insights";
import {
 EC_WORKSHOP_OCT08_CROSS_THEMES,
 EC_WORKSHOP_OCT08_DREAMS,
 EC_WORKSHOP_OCT08_EXECUTIVE,
 EC_WORKSHOP_OCT08_HOSPITALITY,
 EC_WORKSHOP_OCT08_INSIGHTS,
 EC_WORKSHOP_OCT08_VOTE_WINNERS,
} from "./ecuador-workshop-oct08";
import {
 PUEBLA_PROJECT_CROSS_THEMES,
 PUEBLA_PROJECT_EXECUTIVE,
} from "./puebla-project-shared";
import { PUEBLA_PROJECT_INTERVIEWS } from "./puebla-project-interviews";
import {
 GLOBAL_CONVERGENCES,
 GLOBAL_CROSS_BY_AREA,
 GLOBAL_EXECUTIVE_SUMMARY,
 GLOBAL_INSIGHTS,
 GLOBAL_SESSIONS,
} from "./global-insights";
import {
 COMPETITORS_EXECUTIVE_SUMMARY,
 COMPETITORS_META,
 COMPETITIVE_MAP,
 COUNTRY_ANALYSIS,
 DECISION_INSIGHTS,
 INNOVATIONS_2026,
 PLAN_2027,
 WATCHLIST_2027,
} from "./competitors-data";
import {
 COURIER_FRICTIONS,
 COURIER_PROFILES,
 SELLER_CLUSTER_TABLE,
 SELLER_DECISION_PLAYS,
 SELLERS_COURIERS_EXECUTIVE,
 SELLERS_COURIERS_META,
} from "./sellers-couriers-research";
import {
 GLOBAL_RESEARCH_DECISIONS,
 GLOBAL_RESEARCH_LENSES,
 GLOBAL_RESEARCH_SOURCE_GROUPS,
 GLOBAL_RESEARCH_SUMMARY,
} from "./global-research";
import {
 GLOBAL_HOMOLOGATE_ITEMS,
 GLOBAL_OPEN_QUESTIONS,
 GLOBAL_PRODUCT_OUTCOME,
 GLOBAL_ROADMAP_NORTH_STAR,
 GLOBAL_ROADMAP_PHASES,
} from "./global-roadmap";
import { PE_CONTEXT_MEETING } from "./peru-context-meeting";
import {
 PE_CONTEXT_PDF,
 PE_CONTEXT_PDF_INSIGHTS,
 PE_CONTEXT_PRESENTERS,
 PE_CONTEXT_TEAM,
} from "./peru-context-presentation";
import { PE_B2B_PLATFORM } from "./peru-b2b-platform";
import { PE_SERVICE_LEVEL } from "./peru-service-level";
import { PE_WORKSHOP_0209 } from "./peru-workshop-0209";
import { getWorkshopSessionForGroup } from "./peru-context-nav";
import { PE_CONSUMER_VISION } from "./peru-consumer-vision";
import { PERU_TRIP_SYNTHESIS } from "./peru-trip-synthesis";
import {
 PERU_CROSS_STORE_THEMES,
 PERU_INTERVIEW_INSIGHTS,
 PERU_VISIT_EXECUTIVE_SUMMARY,
} from "./peru-insights";
import { PERU_ROADMAP_LINKS, PERU_CONTEXT_VALIDATIONS } from "./peru-roadmap-links";
import { PERU_VISIT_STORES } from "./peru-visit-stores";
import { PUEBLA_CROSS_STORE_THEMES, PUEBLA_INTERVIEW_INSIGHTS } from "./puebla-insights";
import { PROMO_WORKSHOP, PROMO_WORKSHOP_ITEMS } from "./promo-workshop";
import {
 UX_ROADMAP_ITEMS,
 UX_ROADMAP_PRINCIPLES,
 UX_ROADMAP_ACTOR_DESCRIPTIONS,
} from "./ux-roadmap";
import {
 createDoc,
 type SearchAppTab,
 type SearchDoc,
 type SearchLocation,
 type SearchPeruVisitTab,
} from "./search";

function loc(partial: SearchLocation): SearchLocation {
 return partial;
}

function appTabForCategory(category: string): SearchAppTab | undefined {
 if (category === "Bug") return "bugs";
 if (category === "Product") return "product";
 if (category === "UX") return "ux";
 return "home";
}

function peruVisitTabForCategory(category: string): SearchPeruVisitTab | undefined {
 if (category === "Bug") return "bugs";
 if (category === "Product") return "product";
 if (category === "UX") return "ux";
 if (category === "Operation") return "operation";
 if (category === "Infra") return "infra";
 return "home";
}

export function buildStandaloneSearchDocs(): SearchDoc[] {
 const docs: SearchDoc[] = [];

 docs.push(
 createDoc({
 id: "global-summary",
 title: "Cross-country executive summary",
 breadcrumb: "All countries",
 location: loc({ country: "all" }),
 body: GLOBAL_EXECUTIVE_SUMMARY,
 }),
 );

 for (const insight of GLOBAL_INSIGHTS) {
 docs.push(
 createDoc({
 id: `global-insight-${insight.rank}`,
 title: insight.title,
 breadcrumb: `All countries · ${insight.priority}`,
 location: loc({ country: "all" }),
 body: insight,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "global-convergences",
 title: "Cross-country convergences",
 breadcrumb: "All countries",
 location: loc({ country: "all" }),
 body: GLOBAL_CONVERGENCES,
 }),
 createDoc({
 id: "global-cross-by-area",
 title: "Cross points by area — OPS, Consumer, Rewards",
 breadcrumb: "All countries",
 location: loc({ country: "all" }),
 body: GLOBAL_CROSS_BY_AREA,
 }),
 createDoc({
 id: "global-research-competitive-lens",
 title: "Research + competitive lens",
 breadcrumb: "All countries · Research",
 location: loc({ country: "all" }),
 body: {
 summary: GLOBAL_RESEARCH_SUMMARY,
 lenses: GLOBAL_RESEARCH_LENSES,
 decisions: GLOBAL_RESEARCH_DECISIONS,
 sources: GLOBAL_RESEARCH_SOURCE_GROUPS,
 },
 }),
 createDoc({
 id: "global-sessions",
 title: "Field sessions timeline",
 breadcrumb: "All countries",
 location: loc({ country: "all" }),
 body: GLOBAL_SESSIONS,
 }),
 createDoc({
 id: "global-roadmap-2027",
 title: "Strategic roadmap 2027 — Now / Next / Later",
 breadcrumb: "All countries",
 location: loc({ country: "all" }),
 body: { outcome: GLOBAL_PRODUCT_OUTCOME, northStar: GLOBAL_ROADMAP_NORTH_STAR, phases: GLOBAL_ROADMAP_PHASES },
 }),
 createDoc({
 id: "global-homologate",
 title: "Proven patterns to replicate",
 breadcrumb: "All countries",
 location: loc({ country: "all" }),
 body: GLOBAL_HOMOLOGATE_ITEMS,
 }),
 createDoc({
 id: "global-open-questions",
 title: "Open questions — 2027 planning",
 breadcrumb: "All countries",
 location: loc({ country: "all" }),
 body: GLOBAL_OPEN_QUESTIONS,
 }),
 );

 docs.push(
 createDoc({
 id: "pe-context-summary",
 title: "Peru context — executive summary",
 breadcrumb: "Peru · Context meeting",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: [
 PE_CONTEXT_MEETING.executiveSummary,
 PE_CONTEXT_MEETING.snapshot,
 PE_CONTEXT_MEETING.context,
 PE_CONTEXT_MEETING.participants,
 ],
 }),
 );

 for (const city of PE_CONTEXT_MEETING.cities) {
 docs.push(
 createDoc({
 id: `pe-city-${city.name}`,
 title: `${city.name} — ${city.share}`,
 breadcrumb: "Peru · Context meeting · Cities",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: city,
 }),
 );
 }

 for (const section of PE_CONTEXT_MEETING.sections) {
 docs.push(
 createDoc({
 id: `pe-section-${section.id}`,
 title: section.label,
 breadcrumb: "Peru · Context meeting",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: section.summary,
 }),
 );
 for (const topic of section.topics) {
 docs.push(
 createDoc({
 id: `pe-topic-${section.id}-${topic.title}`,
 title: topic.title,
 breadcrumb: `Peru · Context meeting · ${section.label}`,
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: topic,
 }),
 );
 }
 }

 for (const op of PE_CONTEXT_MEETING.productOpportunities) {
 docs.push(
 createDoc({
 id: `pe-opp-${op.title}`,
 title: op.title,
 breadcrumb: "Peru · Context meeting · Product opportunities",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: op,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "pe-consumer-research",
 title: PE_CONTEXT_MEETING.consumerResearch.title,
 breadcrumb: "Peru · Context meeting",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: PE_CONTEXT_MEETING.consumerResearch,
 }),
 createDoc({
 id: "pe-next-steps",
 title: "Peru context — next steps",
 breadcrumb: "Peru · Context meeting",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: PE_CONTEXT_MEETING.nextSteps,
 }),
 createDoc({
 id: "pe-connects-stores",
 title: "Connection with Lima store visits",
 breadcrumb: "Peru · Context meeting",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: PE_CONTEXT_MEETING.connectsToStores,
 }),
 );

 for (const presenter of PE_CONTEXT_PRESENTERS) {
 docs.push(
 createDoc({
 id: `pe-presenter-${presenter.id}`,
 title: `${presenter.name} — ${presenter.role}`,
 breadcrumb: "Peru · Context meeting · Presenters",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: presenter,
 }),
 );
 }

 for (const member of PE_CONTEXT_TEAM) {
 docs.push(
 createDoc({
 id: `pe-team-${member.id}`,
 title: `${member.name} — ${member.role}`,
 breadcrumb: "Peru · Context meeting · Team",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: member,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "pe-context-pdf",
 title: PE_CONTEXT_PDF.title,
 breadcrumb: "Peru · Context meeting · PDF",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: {...PE_CONTEXT_PDF, insights: PE_CONTEXT_PDF_INSIGHTS },
 }),
 );

 docs.push(
 createDoc({
 id: "pe-b2b-overview",
 title: `${PE_B2B_PLATFORM.brand} — ${PE_B2B_PLATFORM.name}`,
 breadcrumb: "Peru · B2B platform",
 location: loc({ country: "peru", peruTab: "b2b-platform" }),
 body: PE_B2B_PLATFORM.executiveSummary,
 }),
 );

 for (const nav of PE_B2B_PLATFORM.navigation) {
 docs.push(
 createDoc({
 id: `pe-b2b-nav-${nav.id}`,
 title: nav.label,
 breadcrumb: "Peru · B2B platform",
 location: loc({ country: "peru", peruTab: "b2b-platform" }),
 body: nav,
 }),
 );
 }

 for (const screen of PE_B2B_PLATFORM.screens) {
 docs.push(
 createDoc({
 id: `pe-b2b-screen-${screen.id}`,
 title: screen.title,
 breadcrumb: `Peru · B2B platform · ${screen.module}`,
 location: loc({ country: "peru", peruTab: "b2b-platform" }),
 body: screen,
 }),
 );
 }

 for (const step of PE_B2B_PLATFORM.adminWorkflow.steps) {
 docs.push(
 createDoc({
 id: `pe-b2b-admin-${step.title.slice(0, 24)}`,
 title: step.title,
 breadcrumb: "Peru · B2B platform · Admin",
 location: loc({ country: "peru", peruTab: "b2b-platform" }),
 body: step,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "pe-service-level-overview",
 title: "Service Level Vision — executive summary",
 breadcrumb: "Peru · Service level vision",
 location: loc({ country: "peru", peruTab: "service-level" }),
 body: PE_SERVICE_LEVEL.executiveSummary,
 }),
 );

 for (const pillar of PE_SERVICE_LEVEL.pillars) {
 docs.push(
 createDoc({
 id: `pe-sl-pillar-${pillar.id}`,
 title: `Service Level pillar — ${pillar.label}`,
 breadcrumb: "Peru · Service level vision",
 location: loc({ country: "peru", peruTab: "service-level" }),
 body: pillar,
 }),
 );
 }

 for (const feature of PE_SERVICE_LEVEL.upcomingFeatures) {
 docs.push(
 createDoc({
 id: `pe-sl-feature-${feature.name.slice(0, 28)}`,
 title: feature.name,
 breadcrumb: "Peru · Service level vision · Roadmap",
 location: loc({ country: "peru", peruTab: "service-level" }),
 body: feature,
 }),
 );
 }

 for (const pain of PE_SERVICE_LEVEL.pains) {
 docs.push(
 createDoc({
 id: `pe-sl-pain-${pain.id}`,
 title: pain.title,
 breadcrumb: `Peru · Service level vision · ${pain.category}`,
 location: loc({ country: "peru", peruTab: "service-level" }),
 body: pain,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "pe-workshop-0209-overview",
 title: "OYP workshop — executive summary",
 breadcrumb: "Peru · OYP workshop (Sep 2)",
 location: loc({ country: "peru", peruTab: "workshop-ops" }),
 body: PE_WORKSHOP_0209.executiveSummary,
 }),
 );

 for (const group of PE_WORKSHOP_0209.groups) {
 const workshopTab = getWorkshopSessionForGroup(group.id);
 for (const item of [
...group.challenges,
...group.challengesPrioritized,
...group.futureVision,
...group.futurePrioritized,
 ]) {
 docs.push(
 createDoc({
 id: `pe-workshop-${group.id}-${item.id}`,
 title: `${group.label} — ${item.title}`,
 breadcrumb: `Peru · OYP workshop · ${group.label}`,
 location: loc({ country: "peru", peruTab: workshopTab }),
 body: item,
 }),
 );
 }
 }

 for (const idea of PE_WORKSHOP_0209.momentoInesperado.ideas) {
 const groupKey =
 idea.group === "consumer" || idea.group === "rewards" ? idea.group : "operations";
 const workshopTab = getWorkshopSessionForGroup(groupKey);
 docs.push(
 createDoc({
 id: `pe-workshop-mi-${idea.id}`,
 title: `Momento Inesperado — ${idea.title}`,
 breadcrumb: `Peru · OYP workshop · Momento Inesperado`,
 location: loc({ country: "peru", peruTab: workshopTab }),
 body: idea,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "pe-consumer-vision-overview",
 title: "Consumer vision — executive summary",
 breadcrumb: "Peru · Consumer vision (Sep 3)",
 location: loc({ country: "peru", peruTab: "consumer-vision" }),
 body: PE_CONSUMER_VISION.executiveSummary,
 }),
 );

 for (const feature of PE_CONSUMER_VISION.productFeatures) {
 docs.push(
 createDoc({
 id: `pe-consumer-feature-${feature.id}`,
 title: feature.title,
 breadcrumb: "Peru · Consumer vision · Product roadmap",
 location: loc({ country: "peru", peruTab: "consumer-vision" }),
 body: feature,
 }),
 );
 }

 for (const pain of PE_CONSUMER_VISION.growthPains) {
 docs.push(
 createDoc({
 id: `pe-consumer-pain-${pain.id}`,
 title: `${pain.priority} — ${pain.title}`,
 breadcrumb: "Peru · Consumer vision · Growth pains",
 location: loc({ country: "peru", peruTab: "consumer-vision" }),
 body: pain,
 }),
 );
 }

 for (const [index, step] of PE_CONSUMER_VISION.nextSteps.entries()) {
 docs.push(
 createDoc({
 id: `pe-consumer-next-${index}`,
 title: step,
 breadcrumb: "Peru · Consumer vision · Next steps",
 location: loc({ country: "peru", peruTab: "consumer-vision" }),
 body: step,
 }),
 );
 }

 for (const store of PERU_VISIT_STORES) {
 docs.push(
 createDoc({
 id: `pe-store-${store.id}`,
 title: `${store.name} (${store.district})`,
 breadcrumb: "Peru · Store visits",
 location: loc({ country: "peru", peruTab: "store-visits" }),
 body: store,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "pe-visit-summary",
 title: "Lima store visits — executive summary",
 breadcrumb: "Peru · Store visits",
 location: loc({ country: "peru", peruTab: "store-visits" }),
 body: PERU_VISIT_EXECUTIVE_SUMMARY,
 }),
 );

 for (const theme of PERU_CROSS_STORE_THEMES) {
 docs.push(
 createDoc({
 id: `pe-theme-${theme.title}`,
 title: theme.title,
 breadcrumb: "Peru · Store visits · Cross-store",
 location: loc({ country: "peru", peruTab: "store-visits" }),
 body: theme,
 }),
 );
 }

 for (const store of PERU_INTERVIEW_INSIGHTS) {
 docs.push(
 createDoc({
 id: `pe-interview-${store.id}`,
 title: `${store.name} — interview`,
 breadcrumb: "Peru · Store visits",
 location: loc({ country: "peru", peruTab: "store-visits" }),
 body: { summary: store.summary, highlights: store.highlights, poc: store.poc },
 }),
 );
 for (const insight of store.insights) {
 docs.push(
 createDoc({
 id: `pe-insight-${store.id}-${insight.title}`,
 title: insight.title,
 breadcrumb: `Peru · Store visits · ${store.name}`,
 location: loc({
 country: "peru",
 peruTab: "store-visits",
 peruVisitTab: peruVisitTabForCategory(insight.category),
 }),
 body: insight,
 }),
 );
 }
 }

 docs.push(
 createDoc({
 id: "pe-lima",
 title: "Lima city snapshot",
 breadcrumb: "Peru · Store visits",
 location: loc({ country: "peru", peruTab: "store-visits" }),
 body: LIMA,
 }),
 );

 for (const link of PERU_ROADMAP_LINKS) {
 docs.push(
 createDoc({
 id: `pe-roadmap-${link.roadmapId}`,
 title: link.title,
 breadcrumb: "Peru · Store visits · UX roadmap links",
 location: loc({ country: "peru", peruTab: "store-visits" }),
 body: link,
 }),
 );
 }

 for (const validation of PERU_CONTEXT_VALIDATIONS) {
 docs.push(
 createDoc({
 id: `pe-context-val-${validation.morningItem.slice(0, 24)}`,
 title: validation.morningItem,
 breadcrumb: "Peru · Context meeting · Visit validation",
 location: loc({ country: "peru", peruTab: "context-meeting" }),
 body: validation,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "pe-synthesis",
 title: "Peru overall result",
 breadcrumb: "Peru · Overall result",
 location: loc({ country: "peru", peruTab: "overall-result" }),
 body: PERU_TRIP_SYNTHESIS,
 }),
 );

 for (const theme of PERU_TRIP_SYNTHESIS.themes) {
 docs.push(
 createDoc({
 id: `pe-synthesis-theme-${theme.rank}`,
 title: theme.title,
 breadcrumb: "Peru · Overall result",
 location: loc({ country: "peru", peruTab: "overall-result" }),
 body: theme,
 }),
 );
 }

 for (const p of PERU_TRIP_SYNTHESIS.criticalPriorities) {
 docs.push(
 createDoc({
 id: `pe-synthesis-priority-${p.rank}`,
 title: p.title,
 breadcrumb: "Peru · Overall result · Priorities",
 location: loc({ country: "peru", peruTab: "overall-result" }),
 body: p,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "mx-promo-overview",
 title: PROMO_WORKSHOP.title,
 breadcrumb: "Mexico · Promo workshop",
 location: loc({ country: "mexico", mexicoTab: "promo-workshop" }),
 body: PROMO_WORKSHOP,
 }),
 );

 for (const item of PROMO_WORKSHOP_ITEMS) {
 docs.push(
 createDoc({
 id: `mx-promo-${item.id}`,
 title: item.title,
 breadcrumb: "Mexico · Promo workshop",
 location: loc({ country: "mexico", mexicoTab: "promo-workshop" }),
 body: item,
 }),
 );
 }

 for (const theme of PUEBLA_CROSS_STORE_THEMES) {
 docs.push(
 createDoc({
 id: `mx-puebla-theme-${theme.title}`,
 title: theme.title,
 breadcrumb: "Mexico · Puebla visit",
 location: loc({ country: "mexico", mexicoTab: "puebla-visit" }),
 body: theme,
 }),
 );
 }

 for (const store of PUEBLA_INTERVIEW_INSIGHTS) {
 docs.push(
 createDoc({
 id: `mx-puebla-store-${store.id}`,
 title: store.name,
 breadcrumb: "Mexico · Puebla visit",
 location: loc({ country: "mexico", mexicoTab: "puebla-visit" }),
 body: { summary: store.summary, highlights: store.highlights, poc: store.poc },
 }),
 );
 for (const insight of store.insights) {
 docs.push(
 createDoc({
 id: `mx-puebla-insight-${store.id}-${insight.title}`,
 title: insight.title,
 breadcrumb: `Mexico · Puebla visit · ${store.name}`,
 location: loc({ country: "mexico", mexicoTab: "puebla-visit" }),
 body: insight,
 }),
 );
 }
 }

 for (const principle of UX_ROADMAP_PRINCIPLES) {
 docs.push(
 createDoc({
 id: `mx-ux-principle-${principle.layer}`,
 title: `${principle.layer} ${principle.subtitle}`,
 breadcrumb: "Mexico · UX roadmap",
 location: loc({ country: "mexico", mexicoTab: "ux-roadmap" }),
 body: principle,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "mx-ux-actors",
 title: "UX roadmap actors",
 breadcrumb: "Mexico · UX roadmap",
 location: loc({ country: "mexico", mexicoTab: "ux-roadmap" }),
 body: UX_ROADMAP_ACTOR_DESCRIPTIONS,
 }),
 );

 for (const item of UX_ROADMAP_ITEMS) {
 docs.push(
 createDoc({
 id: `mx-ux-${item.id}`,
 title: item.title,
 breadcrumb: `Mexico · UX roadmap · ${item.actor}`,
 location: loc({ country: "mexico", mexicoTab: "ux-roadmap" }),
 body: item,
 }),
 );
 }

 const competitorsBody = [
 COMPETITORS_META.subtitle,
 COMPETITORS_EXECUTIVE_SUMMARY.headline,
...COMPETITORS_EXECUTIVE_SUMMARY.paragraphs,
...COMPETITIVE_MAP.map((m) => `${m.platform}: MX ${m.mexico}, PE ${m.peru}, CO ${m.colombia}`),
...DECISION_INSIGHTS.map((d) => `${d.title}: ${d.insight}`),
...COUNTRY_ANALYSIS.map((c) => `${c.country} ${c.matchup}: ${c.tadaImplication}`),
...INNOVATIONS_2026.map((i) => `${i.company} ${i.innovation}`),
...PLAN_2027.map((p) => `${p.theme} (${p.confidence})`),
...WATCHLIST_2027,
 ].join("\n");

 docs.push(
 createDoc({
 id: "competitors-benchmark",
 title: "Benchmark delivery — Rappi, PedidosYa, Uber Eats",
 breadcrumb: "Competitors",
 location: loc({ country: "pesquisas", pesquisaSection: "competitors" }),
 body: competitorsBody,
 }),
 );

 const sellersCouriersBody = [
 SELLERS_COURIERS_META.title,
 SELLERS_COURIERS_EXECUTIVE.headline,
...SELLERS_COURIERS_EXECUTIVE.paragraphs,
...SELLER_DECISION_PLAYS.map((d) => `${d.theme}: ${d.action}`),
...COURIER_FRICTIONS.map((f) => f.friction),
...COURIER_PROFILES.map((p) => p.profile),
...SELLER_CLUSTER_TABLE.map((c) => c.cluster),
 "delivery chain seller courier clusterização Typeform",
 ].join("\n");

 docs.push(
 createDoc({
 id: "pesquisas-sellers-couriers",
 title: "Sellers e couriers — clusterização 2026",
 breadcrumb: "Pesquisas · Sellers e couriers",
 location: loc({ country: "pesquisas", pesquisaSection: "sellers-couriers" }),
 body: sellersCouriersBody,
 }),
 );

 docs.push(
 createDoc({
 id: "co-product-intro-sep13",
 title: "Colombia — 1YP product intro (Sep 13)",
 breadcrumb: "Colombia · Product intro",
 location: loc({ country: "colombia" }),
 body: [
 CO_PRODUCT_MEETING.executiveSummary.headline,
...CO_PRODUCT_MEETING.executiveSummary.paragraphs,
...CO_PRODUCT_MEETING.sections.flatMap((s) =>
 s.topics.map((t) => `${s.label}: ${t.title} — ${t.detail}`),
 ),
...COLOMBIA_MEETING_INSIGHTS.map((i) => `[${i.priority}] ${i.title} — ${i.detail}`),
...COLOMBIA_CROSS_THEMES.map((t) => `${t.theme}: ${t.detail}`),
 "Colombia service-level themes also appear on the Global All tab.",
 ].join("\n\n"),
 }),
 createDoc({
 id: "co-service-level-sep13",
 title: "Colombia — Service Level (Sep 13 PM)",
 breadcrumb: "Colombia · Service Level",
 location: loc({ country: "colombia" }),
 body: [
 CO_SL_MEETING.executiveSummary.headline,
...CO_SL_MEETING.executiveSummary.paragraphs,
...CO_SL_MEETING.sections.flatMap((s) =>
 s.topics.map((t) => `${s.label}: ${t.title} — ${t.detail}`),
 ),
...COLOMBIA_SL_INSIGHTS.map((i) => `[${i.priority}] ${i.title} — ${i.detail}`),
 ].join("\n\n"),
 }),
 createDoc({
 id: "co-all-sep13",
 title: "Colombia — All cross-session (Sep 13)",
 breadcrumb: "Colombia · All",
 location: loc({ country: "colombia" }),
 body: [
 COLOMBIA_ALL_EXECUTIVE.en.headline,
...COLOMBIA_ALL_EXECUTIVE.en.paragraphs,
...COLOMBIA_ALL_CONVERGENCES.map((c) => `${c.theme}: ${c.detail}`),
...COLOMBIA_ALL_INSIGHTS.map((i) => `[${i.priority}] ${i.title} — ${i.detail}`),
 ].join("\n\n"),
 }),
 createDoc({
 id: "ec-product-vision",
 title: "Ecuador — Product vision prep (Oct 7)",
 breadcrumb: "Ecuador · Product vision",
 location: loc({ country: "ecuador" }),
 body: [
 EC_CONTEXT_MEETING.executiveSummary.headline,
...EC_CONTEXT_MEETING.executiveSummary.paragraphs,
...EC_CONTEXT_MEETING.sections.flatMap((s) =>
 s.topics.map((t) => `${s.label}: ${t.title} — ${t.detail}`),
 ),
 ].join("\n\n"),
 }),
 createDoc({
 id: "ec-workshop-pains",
 title: "Ecuador — Oct 7 prep pains (workshop input)",
 breadcrumb: "Ecuador · Product vision",
 location: loc({ country: "ecuador" }),
 body: ECUADOR_WORKSHOP_PAINS.map((p) => `[${p.priority}] ${p.title}: ${p.detail}`).join("\n"),
 }),
 createDoc({
 id: "ec-workshop-oct08",
 title: "Ecuador — OYP workshop insights (Oct 8)",
 breadcrumb: "Ecuador · OYP workshop",
 location: loc({ country: "ecuador" }),
 body: [
 EC_WORKSHOP_OCT08_EXECUTIVE.headline,
...EC_WORKSHOP_OCT08_EXECUTIVE.paragraphs,
...EC_WORKSHOP_OCT08_INSIGHTS.map(
 (p) => `[${p.priority}] ${p.pillar}: ${p.title} — ${p.detail}`,
 ),
 ].join("\n\n"),
 }),
 createDoc({
 id: "ec-workshop-votes-dreams",
 title: "Ecuador — workshop votes, dreams & hospitality",
 breadcrumb: "Ecuador · OYP workshop",
 location: loc({ country: "ecuador" }),
 body: [
 "Challenges: " +
 EC_WORKSHOP_OCT08_VOTE_WINNERS.challenges.map((c) => `${c.label} (${c.votes})`).join("; "),
 "Dreams: " +
 EC_WORKSHOP_OCT08_VOTE_WINNERS.dreams.map((d) => `${d.label} (${d.votes})`).join("; "),
...EC_WORKSHOP_OCT08_DREAMS.map((d) => `${d.pillar}: ${d.title} — ${d.detail}`),
...EC_WORKSHOP_OCT08_HOSPITALITY.map((h) => `${h.audience}: ${h.idea} — ${h.note}`),
...EC_WORKSHOP_OCT08_CROSS_THEMES.map((t) => `${t.theme}: ${t.detail}`),
 ].join("\n\n"),
 }),
 createDoc({
 id: "global-puebla-cross",
 title: "Global — Puebla Project cross-themes",
 breadcrumb: "All · Puebla Project",
 location: loc({ country: "all" }),
 body: [
...PUEBLA_PROJECT_CROSS_THEMES.map((t) => `[${t.priority}] ${t.theme}: ${t.detail}`),
...GLOBAL_INSIGHTS.filter((i) => i.rank >= 39 && i.rank <= 40).map(
 (i) => `#${i.rank} ${i.title}: ${i.summary}`,
 ),
 ].join("\n\n"),
 }),
 createDoc({
 id: "pesquisas-delivery",
 title: "Pesquisas — TaDa Delivery insights",
 breadcrumb: "Pesquisas",
 location: loc({ country: "pesquisas" }),
 body:
 "Reviews Appbot, churn survey, Lovers Plus, operação Review Anual 2026, Learning Agenda, prioridades P0–P2 e relatório consolidado Abr–Set 2026.",
 }),
 createDoc({
 id: "puebla-project-overview",
 title: "Puebla Project — overview",
 breadcrumb: "Puebla Project",
 location: loc({ country: "puebla-project", pueblaProjectSection: "overview" }),
 body: [
 PUEBLA_PROJECT_EXECUTIVE.headline,
...PUEBLA_PROJECT_EXECUTIVE.paragraphs,
...PUEBLA_PROJECT_EXECUTIVE.takeaways.map((t) => `${t.label}: ${t.text}`),
 ].join("\n\n"),
 }),
...PUEBLA_PROJECT_INTERVIEWS.map((i) =>
 createDoc({
 id: `puebla-${i.id}`,
 title: `Puebla Project — ${i.label}`,
 breadcrumb: `Puebla Project · ${i.label}`,
 location: loc({ country: "puebla-project", pueblaProjectSection: i.sectionId }),
 body: [
 i.executiveSummary,
...i.insights.map((ins) => `${ins.category}: ${ins.title} — ${ins.detail}`),
 ].join("\n"),
 }),
 ),
 createDoc({
 id: "puebla-cross-themes",
 title: "Puebla Project — cross-themes",
 breadcrumb: "Puebla Project · Cross-themes",
 location: loc({ country: "puebla-project", pueblaProjectSection: "cross-themes" }),
 body: PUEBLA_PROJECT_CROSS_THEMES.map((t) => `[${t.priority}] ${t.theme}: ${t.detail}`).join("\n"),
 }),
 );

 return docs;
}

type MexicoInsight = {
 category: string;
 title: string;
 detail: string;
 quotes?: string[];
 source?: string;
};

type MexicoInterview = {
 id: string;
 name: string;
 summary: string;
 highlights: string[];
 insights: MexicoInsight[];
};

type MexicoStore = {
 id: string;
 name: string;
 alerts: string[];
 positives: string[];
};

type MexicoTopic = {
 title: string;
 detail: string;
 quotes?: string[];
};

type MexicoTheme = {
 title: string;
 summary: string;
 attention?: string;
 quotes?: string[];
 stores?: string[];
};

export function buildMexicoSearchDocs(input: {
 stores: MexicoStore[];
 interviews: MexicoInterview[];
 crossThemes: MexicoTheme[];
 cx: { topics: MexicoTopic[]; nextSteps: string[]; context: string; connectsToStores: string[] };
 product: {
 topics: MexicoTopic[];
 nextSteps: string[];
 context: string;
 connectsToStores: string[];
 teste?: unknown;
 };
 ops: { context: string; categories: { label: string; topics: MexicoTopic[] }[]; nextSteps: string[] };
 synthesis: unknown;
}): SearchDoc[] {
 const docs: SearchDoc[] = [];

 for (const store of input.stores) {
 docs.push(
 createDoc({
 id: `mx-cdmx-store-${store.id}`,
 title: store.name,
 breadcrumb: "Mexico · CDMX visits",
 location: loc({ country: "mexico", mexicoTab: "visitas-lojas", appTab: "home" }),
 body: store,
 }),
 );
 }

 for (const interview of input.interviews) {
 docs.push(
 createDoc({
 id: `mx-cdmx-interview-${interview.id}`,
 title: `${interview.name} — interview`,
 breadcrumb: "Mexico · CDMX visits",
 location: loc({ country: "mexico", mexicoTab: "visitas-lojas", appTab: "home" }),
 body: { summary: interview.summary, highlights: interview.highlights },
 }),
 );
 for (const insight of interview.insights) {
 docs.push(
 createDoc({
 id: `mx-cdmx-insight-${interview.id}-${insight.title}`,
 title: insight.title,
 breadcrumb: `Mexico · CDMX visits · ${interview.name}`,
 location: loc({
 country: "mexico",
 mexicoTab: "visitas-lojas",
 appTab: appTabForCategory(insight.category),
 }),
 body: insight,
 }),
 );
 }
 }

 for (const theme of input.crossThemes) {
 docs.push(
 createDoc({
 id: `mx-cdmx-theme-${theme.title}`,
 title: theme.title,
 breadcrumb: "Mexico · CDMX visits",
 location: loc({ country: "mexico", mexicoTab: "visitas-lojas", appTab: "home" }),
 body: theme,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "mx-cx-overview",
 title: "CX meeting",
 breadcrumb: "Mexico · CX meeting",
 location: loc({ country: "mexico", mexicoTab: "reuniao-cx" }),
 body: input.cx,
 }),
 );
 for (const topic of input.cx.topics) {
 docs.push(
 createDoc({
 id: `mx-cx-${topic.title}`,
 title: topic.title,
 breadcrumb: "Mexico · CX meeting",
 location: loc({ country: "mexico", mexicoTab: "reuniao-cx" }),
 body: topic,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "mx-product-overview",
 title: "Product meeting",
 breadcrumb: "Mexico · Product meeting",
 location: loc({ country: "mexico", mexicoTab: "reuniao-produto" }),
 body: { context: input.product.context, teste: input.product.teste, nextSteps: input.product.nextSteps },
 }),
 );
 for (const topic of input.product.topics) {
 docs.push(
 createDoc({
 id: `mx-product-${topic.title}`,
 title: topic.title,
 breadcrumb: "Mexico · Product meeting",
 location: loc({ country: "mexico", mexicoTab: "reuniao-produto" }),
 body: topic,
 }),
 );
 }

 docs.push(
 createDoc({
 id: "mx-ops-overview",
 title: "OPS workshop",
 breadcrumb: "Mexico · OPS workshop",
 location: loc({ country: "mexico", mexicoTab: "dinamica-ops" }),
 body: input.ops,
 }),
 );
 for (const category of input.ops.categories) {
 for (const topic of category.topics) {
 docs.push(
 createDoc({
 id: `mx-ops-${category.label}-${topic.title}`,
 title: topic.title,
 breadcrumb: `Mexico · OPS workshop · ${category.label}`,
 location: loc({ country: "mexico", mexicoTab: "dinamica-ops" }),
 body: topic,
 }),
 );
 }
 }

 docs.push(
 createDoc({
 id: "mx-synthesis",
 title: "Mexico overall result",
 breadcrumb: "Mexico · Overall result",
 location: loc({ country: "mexico", mexicoTab: "resultado-geral" }),
 body: input.synthesis,
 }),
 );

 return docs;
}
