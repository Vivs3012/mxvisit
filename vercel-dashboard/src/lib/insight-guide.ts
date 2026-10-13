import {
 GLOBAL_CONVERGENCES,
 GLOBAL_CROSS_BY_AREA,
 GLOBAL_EXECUTIVE_SUMMARY,
 GLOBAL_INSIGHTS,
 GLOBAL_SESSIONS,
 GLOBAL_TOPIC_SNAPSHOTS,
 consumerVisionP1Summary,
 globalInsightsForTopic,
} from "./global-insights";
import { PE_CONSUMER_VISION } from "./peru-consumer-vision";
import { PE_WORKSHOP_0209 } from "./peru-workshop-0209";
import { PERU_TRIP_SYNTHESIS } from "./peru-trip-synthesis";
import type { SearchLocation } from "./search";

export type InsightGuideCategoryId =
 | "overview"
 | "top"
 | "mexico"
 | "peru"
 | "operations"
 | "consumer"
 | "rewards";

export type InsightGuideCategory = {
 id: InsightGuideCategoryId;
 labelPt: string;
 labelEn: string;
};

export type InsightGuideQuestion = {
 id: string;
 category: InsightGuideCategoryId;
 labelPt: string;
 labelEn: string;
};

export type InsightGuideLink = {
 label: string;
 location: SearchLocation;
};

export type InsightGuideAnswer = {
 titlePt: string;
 titleEn: string;
 bodyPt: string;
 bodyEn: string;
 links: InsightGuideLink[];
};

export const INSIGHT_GUIDE_CATEGORIES: InsightGuideCategory[] = [
 { id: "overview", labelPt: "Visão geral", labelEn: "Overview" },
 { id: "top", labelPt: "Top insights", labelEn: "Top insights" },
 { id: "mexico", labelPt: "México", labelEn: "Mexico" },
 { id: "peru", labelPt: "Peru", labelEn: "Peru" },
 { id: "operations", labelPt: "Operações", labelEn: "Operations" },
 { id: "consumer", labelPt: "Consumer", labelEn: "Consumer" },
 { id: "rewards", labelPt: "Rewards", labelEn: "Rewards" },
];

export const INSIGHT_GUIDE_QUESTIONS: InsightGuideQuestion[] = [
 {
 id: "all-insights",
 category: "overview",
 labelPt: "Todos os insights ranqueados",
 labelEn: "All ranked insights",
 },
 {
 id: "executive-summary",
 category: "overview",
 labelPt: "Resumo executivo global",
 labelEn: "Global executive summary",
 },
 {
 id: "convergences",
 category: "overview",
 labelPt: "Convergências México + Peru",
 labelEn: "Mexico + Peru convergences",
 },
 {
 id: "field-sessions",
 category: "overview",
 labelPt: "Linha do tempo de sessões",
 labelEn: "Field sessions timeline",
 },
 {
 id: "top-critical",
 category: "top",
 labelPt: "Top 5 críticos (global)",
 labelEn: "Top 5 critical (global)",
 },
 {
 id: "top-high",
 category: "top",
 labelPt: "Top insights High priority",
 labelEn: "Top High priority insights",
 },
 {
 id: "peru-priorities",
 category: "top",
 labelPt: "Prioridades críticas Peru",
 labelEn: "Peru critical priorities",
 },
 {
 id: "mx-summary",
 category: "mexico",
 labelPt: "Principais temas México",
 labelEn: "Main Mexico themes",
 },
 {
 id: "mx-critical",
 category: "mexico",
 labelPt: "Insights críticos só México",
 labelEn: "Mexico-only critical insights",
 },
 {
 id: "pe-summary",
 category: "peru",
 labelPt: "Resumo overall Peru",
 labelEn: "Peru overall summary",
 },
 {
 id: "pe-themes",
 category: "peru",
 labelPt: "Top temas ranqueados Peru",
 labelEn: "Peru ranked themes",
 },
 {
 id: "pe-sessions",
 category: "peru",
 labelPt: "Destaques por sessão (Aug 31 – Sep 3)",
 labelEn: "Session highlights (Aug 31 – Sep 3)",
 },
 {
 id: "ops-cross",
 category: "operations",
 labelPt: "Operações — temas cross-country",
 labelEn: "Operations — cross-country themes",
 },
 {
 id: "ops-workshop",
 category: "operations",
 labelPt: "Workshop OPS Peru — top votos",
 labelEn: "Peru OPS workshop — top votes",
 },
 {
 id: "ops-service-level",
 category: "operations",
 labelPt: "Service Level Sep 1 — apostas",
 labelEn: "Service Level Sep 1 — strategic bets",
 },
 {
 id: "consumer-cross",
 category: "consumer",
 labelPt: "Consumer — temas cross-country",
 labelEn: "Consumer — cross-country themes",
 },
 {
 id: "consumer-vision-p1",
 category: "consumer",
 labelPt: "Visão consumer Sep 3 — dores P1",
 labelEn: "Consumer vision Sep 3 — P1 pains",
 },
 {
 id: "consumer-product",
 category: "consumer",
 labelPt: "Roadmap de produto (Sep 3)",
 labelEn: "Product roadmap (Sep 3)",
 },
 {
 id: "consumer-workshop",
 category: "consumer",
 labelPt: "Workshop Consumer — top votos",
 labelEn: "Consumer workshop — top votes",
 },
 {
 id: "consumer-ranked",
 category: "consumer",
 labelPt: "Insights Consumer ranqueados (All)",
 labelEn: "Ranked Consumer insights (All)",
 },
 {
 id: "rewards-cross",
 category: "rewards",
 labelPt: "Rewards — temas cross-country",
 labelEn: "Rewards — cross-country themes",
 },
 {
 id: "rewards-workshop",
 category: "rewards",
 labelPt: "Workshop Rewards — top votos",
 labelEn: "Rewards workshop — top votes",
 },
 {
 id: "rewards-future",
 category: "rewards",
 labelPt: "Visão futura Rewards 2027",
 labelEn: "Rewards 2027 future vision",
 },
 {
 id: "rewards-ranked",
 category: "rewards",
 labelPt: "Insights Rewards ranqueados (All)",
 labelEn: "Ranked Rewards insights (All)",
 },
 {
 id: "rewards-gate",
 category: "rewards",
 labelPt: "Por que Rewards Now = gate?",
 labelEn: "Why is Rewards Now a gate?",
 },
];

function bulletList(items: string[]): string {
 return items.map((item) => `• ${item}`).join("\n");
}

function formatGlobalInsight(
 insight: (typeof GLOBAL_INSIGHTS)[number],
 lang: "pt" | "en",
): string {
 const countries = insight.countries.join(" + ");
 if (lang === "pt") {
 return `#${insight.rank} [${insight.priority}] ${insight.title}\n${insight.summary}\nCobertura: ${insight.coverage} · ${countries}\n→ ${insight.suggestion}`;
 }
 return `#${insight.rank} [${insight.priority}] ${insight.title}\n${insight.summary}\nCoverage: ${insight.coverage} · ${countries}\n→ ${insight.suggestion}`;
}

function workshopTopItems(groupId: "operations" | "consumer" | "rewards", limit = 4) {
 const group = PE_WORKSHOP_0209.groups.find((g) => g.id === groupId);
 if (!group) return [];
 return group.challengesPrioritized.slice(0, limit).map((item, i) => `${i + 1}. ${item.title}`);
}

function areaThemes(area: string) {
 return GLOBAL_CROSS_BY_AREA.find((a) => a.area === area)?.themes ?? [];
}

export function getInsightGuideAnswer(questionId: string): InsightGuideAnswer | null {
 const question = INSIGHT_GUIDE_QUESTIONS.find((q) => q.id === questionId);
 if (!question) return null;

 const allLink: InsightGuideLink = {
 label: "All countries",
 location: { country: "all" },
 };
 const mxLink: InsightGuideLink = {
 label: "Mexico · Overall result",
 location: { country: "mexico", mexicoTab: "resultado-geral" },
 };
 const peOverallLink: InsightGuideLink = {
 label: "Peru · Overall result",
 location: { country: "peru", peruTab: "overall-result" },
 };
 const peWorkshopOpsLink: InsightGuideLink = {
 label: "Peru · Workshop · Operations",
 location: { country: "peru", peruTab: "workshop-ops" },
 };
 const peWorkshopConsumerLink: InsightGuideLink = {
 label: "Peru · Workshop · Consumer",
 location: { country: "peru", peruTab: "workshop-consumer" },
 };
 const peWorkshopRewardsLink: InsightGuideLink = {
 label: "Peru · Workshop · Rewards",
 location: { country: "peru", peruTab: "workshop-rewards" },
 };
 const peConsumerLink: InsightGuideLink = {
 label: "Peru · Consumer vision",
 location: { country: "peru", peruTab: "consumer-vision" },
 };
 const peServiceLink: InsightGuideLink = {
 label: "Peru · Service level",
 location: { country: "peru", peruTab: "service-level" },
 };

 switch (questionId) {
 case "all-insights":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: `${GLOBAL_INSIGHTS.length} insights ranqueados no dashboard:\n\n${GLOBAL_INSIGHTS.map((i) => `#${i.rank} [${i.priority}] ${i.title}`).join("\n")}`,
 bodyEn: `${GLOBAL_INSIGHTS.length} ranked insights in the dashboard:\n\n${GLOBAL_INSIGHTS.map((i) => `#${i.rank} [${i.priority}] ${i.title}`).join("\n")}`,
 links: [allLink],
 };

 case "executive-summary":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: `${GLOBAL_EXECUTIVE_SUMMARY.headline}\n\n${GLOBAL_EXECUTIVE_SUMMARY.paragraphs.join("\n\n")}`,
 bodyEn: `${GLOBAL_EXECUTIVE_SUMMARY.headline}\n\n${GLOBAL_EXECUTIVE_SUMMARY.paragraphs.join("\n\n")}`,
 links: [allLink],
 };

 case "convergences":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList(GLOBAL_CONVERGENCES),
 bodyEn: bulletList(GLOBAL_CONVERGENCES),
 links: [allLink],
 };

 case "field-sessions":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: GLOBAL_SESSIONS.map((s) => `• ${s.date} · ${s.country} — ${s.label}: ${s.detail}`).join("\n"),
 bodyEn: GLOBAL_SESSIONS.map((s) => `• ${s.date} · ${s.country} — ${s.label}: ${s.detail}`).join("\n"),
 links: [allLink],
 };

 case "top-critical": {
 const critical = GLOBAL_INSIGHTS.filter((i) => i.priority === "Critical").slice(0, 5);
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: critical.map((i) => formatGlobalInsight(i, "pt")).join("\n\n"),
 bodyEn: critical.map((i) => formatGlobalInsight(i, "en")).join("\n\n"),
 links: [allLink, peOverallLink, mxLink],
 };
 }

 case "top-high": {
 const high = GLOBAL_INSIGHTS.filter((i) => i.priority === "High").slice(0, 6);
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: high.map((i) => formatGlobalInsight(i, "pt")).join("\n\n"),
 bodyEn: high.map((i) => formatGlobalInsight(i, "en")).join("\n\n"),
 links: [allLink],
 };
 }

 case "peru-priorities":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: PERU_TRIP_SYNTHESIS.criticalPriorities
.map(
 (p) =>
 `#${p.rank} ${p.title}\nPor quê: ${p.why}\n→ ${p.suggestion}\nOwners: ${p.owners}`,
 )
.join("\n\n"),
 bodyEn: PERU_TRIP_SYNTHESIS.criticalPriorities
.map(
 (p) =>
 `#${p.rank} ${p.title}\nWhy: ${p.why}\n→ ${p.suggestion}\nOwners: ${p.owners}`,
 )
.join("\n\n"),
 links: [peOverallLink],
 };

 case "mx-summary": {
 const mx = GLOBAL_INSIGHTS.filter((i) => i.countries.includes("Mexico")).slice(0, 8);
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: `9 POCs (CDMX + Puebla) · Jul 2026\n\n${mx.map((i) => `#${i.rank} ${i.title} — ${i.summary}`).join("\n\n")}`,
 bodyEn: `9 POCs (CDMX + Puebla) · Jul 2026\n\n${mx.map((i) => `#${i.rank} ${i.title} — ${i.summary}`).join("\n\n")}`,
 links: [mxLink, { label: "Mexico · CDMX visits", location: { country: "mexico", mexicoTab: "visitas-lojas" } }],
 };
 }

 case "mx-critical": {
 const mxCritical = GLOBAL_INSIGHTS.filter(
 (i) => i.priority === "Critical" && i.countries.includes("Mexico"),
 );
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: mxCritical.map((i) => formatGlobalInsight(i, "pt")).join("\n\n"),
 bodyEn: mxCritical.map((i) => formatGlobalInsight(i, "en")).join("\n\n"),
 links: [mxLink],
 };
 }

 case "pe-summary":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: `${PERU_TRIP_SYNTHESIS.period}\n${PERU_TRIP_SYNTHESIS.scope}\n\n${PERU_TRIP_SYNTHESIS.executiveSummary}`,
 bodyEn: `${PERU_TRIP_SYNTHESIS.period}\n${PERU_TRIP_SYNTHESIS.scope}\n\n${PERU_TRIP_SYNTHESIS.executiveSummary}`,
 links: [peOverallLink],
 };

 case "pe-themes":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: PERU_TRIP_SYNTHESIS.themes
.slice(0, 8)
.map(
 (t) =>
 `#${t.rank} ${t.title} (${t.mentions} menções)\n${t.summary}\nImpacto: ${t.impact}`,
 )
.join("\n\n"),
 bodyEn: PERU_TRIP_SYNTHESIS.themes
.slice(0, 8)
.map(
 (t) =>
 `#${t.rank} ${t.title} (${t.mentions} mentions)\n${t.summary}\nImpact: ${t.impact}`,
 )
.join("\n\n"),
 links: [peOverallLink],
 };

 case "pe-sessions":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: PERU_TRIP_SYNTHESIS.sessionHighlights
.map((s) => `• ${s.session}\n ${s.highlight}`)
.join("\n\n"),
 bodyEn: PERU_TRIP_SYNTHESIS.sessionHighlights
.map((s) => `• ${s.session}\n ${s.highlight}`)
.join("\n\n"),
 links: [peOverallLink, peConsumerLink, peWorkshopOpsLink, peWorkshopConsumerLink, peWorkshopRewardsLink],
 };

 case "ops-cross": {
 const themes = areaThemes("Operations");
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList(themes),
 bodyEn: bulletList(themes),
 links: [allLink, peWorkshopOpsLink, peServiceLink],
 };
 }

 case "ops-workshop":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList(workshopTopItems("operations")),
 bodyEn: bulletList(workshopTopItems("operations")),
 links: [peWorkshopOpsLink],
 };

 case "ops-service-level":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: `Apostas estratégicas Sep 1:\n\n${bulletList([
 "Ecosystem Communication — WhatsApp templates Seller↔Consumer/Courier (semanas)",
 "Inventário em tempo real — pedidos parciais, visão supervisor",
 "Top Tiendas — ranking gold/silver/bronze na plataforma",
 "Braze — central de notificações supervisor→loja",
 ])}`,
 bodyEn: `Strategic bets Sep 1:\n\n${bulletList([
 "Ecosystem Communication — WhatsApp templates Seller↔Consumer/Courier (weeks)",
 "Real-time inventory — partial orders, supervisor view",
 "Top Tiendas — gold/silver/bronze ranking in-platform",
 "Braze — supervisor→store notification center",
 ])}`,
 links: [peServiceLink],
 };

 case "consumer-cross": {
 const themes = areaThemes("Consumer");
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList(themes),
 bodyEn: bulletList(themes),
 links: [allLink, peConsumerLink],
 };
 }

 case "consumer-vision-p1": {
 const p1 = PE_CONSUMER_VISION.growthPains.filter((p) => p.priority === "P1");
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: p1.map((p) => `• [P1] ${p.title}\n ${p.summary}`).join("\n\n"),
 bodyEn: p1.map((p) => `• [P1] ${p.title}\n ${p.summary}`).join("\n\n"),
 links: [peConsumerLink],
 };
 }

 case "consumer-product":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: PE_CONSUMER_VISION.productFeatures
.slice(0, 8)
.map((f) => `• ${f.title} [${f.status}]\n ${f.summary}`)
.join("\n\n"),
 bodyEn: PE_CONSUMER_VISION.productFeatures
.slice(0, 8)
.map((f) => `• ${f.title} [${f.status}]\n ${f.summary}`)
.join("\n\n"),
 links: [peConsumerLink],
 };

 case "consumer-workshop":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList(workshopTopItems("consumer")),
 bodyEn: bulletList(workshopTopItems("consumer")),
 links: [peWorkshopConsumerLink, peConsumerLink],
 };

 case "consumer-ranked": {
 const snapshot = GLOBAL_TOPIC_SNAPSHOTS.find((t) => t.id === "consumer");
 const insights = globalInsightsForTopic("consumer");
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: `${snapshot?.headline ?? ""}\n\n${insights.map((i) => `#${i.rank} [${i.priority}] ${i.title}\n${i.summary}`).join("\n\n")}\n\n--- P1 Sep 3 ---\n\n${consumerVisionP1Summary()}`,
 bodyEn: `${snapshot?.headline ?? ""}\n\n${insights.map((i) => `#${i.rank} [${i.priority}] ${i.title}\n${i.summary}`).join("\n\n")}\n\n--- P1 Sep 3 ---\n\n${consumerVisionP1Summary()}`,
 links: [allLink, peConsumerLink, peWorkshopConsumerLink],
 };
 }

 case "rewards-cross": {
 const themes = areaThemes("Rewards");
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList(themes),
 bodyEn: bulletList(themes),
 links: [allLink, peWorkshopRewardsLink],
 };
 }

 case "rewards-workshop":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList(workshopTopItems("rewards")),
 bodyEn: bulletList(workshopTopItems("rewards")),
 links: [peWorkshopRewardsLink],
 };

 case "rewards-future": {
 const group = PE_WORKSHOP_0209.groups.find((g) => g.id === "rewards");
 const future = group?.futurePrioritized.slice(0, 4) ?? [];
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: future.map((f, i) => `${i + 1}. ${f.title}\n ${f.detail}`).join("\n\n"),
 bodyEn: future.map((f, i) => `${i + 1}. ${f.title}\n ${f.detail}`).join("\n\n"),
 links: [peWorkshopRewardsLink],
 };
 }

 case "rewards-ranked": {
 const snapshot = GLOBAL_TOPIC_SNAPSHOTS.find((t) => t.id === "rewards");
 const insights = globalInsightsForTopic("rewards");
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: `${snapshot?.headline ?? ""}\n\n${insights.map((i) => `#${i.rank} [${i.priority}] ${i.title}\n${i.summary}`).join("\n\n")}`,
 bodyEn: `${snapshot?.headline ?? ""}\n\n${insights.map((i) => `#${i.rank} [${i.priority}] ${i.title}\n${i.summary}`).join("\n\n")}`,
 links: [allLink, peWorkshopRewardsLink],
 };
 }

 case "rewards-gate":
 return {
 titlePt: question.labelPt,
 titleEn: question.labelEn,
 bodyPt: bulletList([
 "core platform reliability (map, sound, inventory) must ship before loyalty scale",
 "Data consistent rollout (AppsFlyer/Segment/Braze) blocks CRM triggers",
 "Workshop top votes (Braze, flash coupons) são Next — não Q1",
 "Tiers + omnichannel = horizonte 3–4 anos",
 ]),
 bodyEn: bulletList([
 "core platform reliability (map, sound, inventory) must ship before loyalty scale",
 "Data consistent rollout (AppsFlyer/Segment/Braze) blocks CRM triggers",
 "Workshop top votes (Braze, flash coupons) are Next — not Q1",
 "Tiers + omnichannel = 3–4 year horizon",
 ]),
 links: [allLink, peWorkshopRewardsLink],
 };

 default:
 return null;
 }
}

export function getQuestionsForCategory(category: InsightGuideCategoryId): InsightGuideQuestion[] {
 return INSIGHT_GUIDE_QUESTIONS.filter((q) => q.category === category);
}
