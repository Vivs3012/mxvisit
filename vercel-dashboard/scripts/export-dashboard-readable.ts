/**
 * Human-readable dashboard export (structured prose, no raw JSON dumps).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  GLOBAL_CONVERGENCES,
  GLOBAL_CROSS_BY_AREA,
  GLOBAL_EXECUTIVE_SUMMARY,
  GLOBAL_INSIGHTS,
  GLOBAL_POSITIVE_SIGNALS,
  GLOBAL_SESSIONS,
  GLOBAL_TOPIC_SNAPSHOTS,
} from "../src/lib/global-insights";
import {
  GLOBAL_HOMOLOGATE_ITEMS,
  GLOBAL_OPEN_QUESTIONS,
  GLOBAL_PRODUCT_OUTCOME,
  GLOBAL_ROADMAP_BY_AREA,
  GLOBAL_ROADMAP_LAYERS,
  GLOBAL_ROADMAP_NORTH_STAR,
  GLOBAL_ROADMAP_PHASES,
} from "../src/lib/global-roadmap";
import { GLOBAL_EXECUTIVE_THEMES } from "../src/lib/global-executive-themes";
import {
  CROSS_STORE_THEMES,
  CX_MEETING,
  DINAMICA_OPS,
  INTERVIEW_INSIGHTS,
  PRODUTO_MEETING,
  STORES,
  TRIP_SYNTHESIS,
} from "../src/lib/mexico-view";
import { PERU_TRIP_SYNTHESIS } from "../src/lib/peru-trip-synthesis";
import { PERU_CROSS_STORE_THEMES, PERU_INTERVIEW_INSIGHTS, PERU_VISIT_EXECUTIVE_SUMMARY } from "../src/lib/peru-insights";
import { PERU_VISIT_STORES } from "../src/lib/peru-visit-stores";
import { PUEBLA_CROSS_STORE_THEMES, PUEBLA_INTERVIEW_INSIGHTS } from "../src/lib/puebla-insights";
import { PROMO_WORKSHOP, PROMO_WORKSHOP_ITEMS } from "../src/lib/promo-workshop";
import { UX_ROADMAP_ACTOR_DESCRIPTIONS, UX_ROADMAP_ITEMS, UX_ROADMAP_PRINCIPLES } from "../src/lib/ux-roadmap";
import {
  COMPETITORS_EXECUTIVE_SUMMARY,
  COMPETITORS_META,
  DECISION_INSIGHTS,
  PLAN_2027,
} from "../src/lib/competitors-data";
import { INSIGHT_GUIDE_CATEGORIES, INSIGHT_GUIDE_QUESTIONS } from "../src/lib/insight-guide";
import {
  GLOBAL_RESEARCH_DECISIONS,
  GLOBAL_RESEARCH_LENSES,
  GLOBAL_RESEARCH_SOURCE_GROUPS,
  GLOBAL_RESEARCH_SUMMARY,
} from "../src/lib/global-research";
import {
  FOCUS_CONVERGENCES,
  FOCUS_EXECUTIVE_SUMMARIES,
  STAKEHOLDER_OPTIONS,
} from "../src/lib/stakeholder-focus";
import {
  PESQUISAS_EXECUTIVE,
  PESQUISAS_META,
  PESQUISAS_SECTIONS,
  PESQUISAS_SOURCES,
  SUMARIO_SECTION_GUIDE,
} from "../src/lib/pesquisas-data";
import {
  SELLERS_COURIERS_EXECUTIVE,
  SELLERS_COURIERS_META,
  SELLERS_COURIERS_METHOD,
} from "../src/lib/sellers-couriers-research";
import { EC_CONTEXT_MEETING } from "../src/lib/ecuador-context-meeting";
import { ECUADOR_WORKSHOP_PAINS, ECUADOR_CROSS_THEMES } from "../src/lib/ecuador-insights";
import {
  EC_WORKSHOP_OCT08_EXECUTIVE,
  EC_WORKSHOP_OCT08_INSIGHTS,
  EC_WORKSHOP_OCT08_VOTE_WINNERS,
  EC_WORKSHOP_OCT08_DREAMS,
  EC_WORKSHOP_OCT08_HOSPITALITY,
  EC_WORKSHOP_OCT08_CROSS_THEMES,
} from "../src/lib/ecuador-workshop-oct08";
import {
  PUEBLA_PROJECT_CROSS_THEMES,
  PUEBLA_PROJECT_EXECUTIVE,
  PUEBLA_PROJECT_META,
} from "../src/lib/puebla-project-shared";
import { PUEBLA_PROJECT_INTERVIEWS } from "../src/lib/puebla-project-interviews";
import { CO_PRODUCT_MEETING, CO_PRODUCT_MEETING_META } from "../src/lib/colombia-product-meeting-sep13";
import { CO_SL_MEETING, CO_SL_MEETING_META } from "../src/lib/colombia-service-level-meeting-sep13";
import { COLOMBIA_ALL_EXECUTIVE } from "../src/lib/colombia-synthesis-all";
import type { Locale } from "../src/lib/i18n/locale";
import { getGlobalExecutiveSummary } from "../src/lib/i18n/content/global-executive";
import { localizeGlobalInsight } from "../src/lib/i18n/content/global-insights-locale";
import {
  getGlobalConvergences,
  getGlobalCrossByArea,
  getGlobalPositiveSignals,
  getGlobalSessions,
  getGlobalTopicSnapshots,
} from "../src/lib/i18n/content/global-insights-locale";
import {
  getGlobalExecutiveThemes,
  getGlobalHomologateItems,
  getGlobalOpenQuestions,
  getGlobalProductOutcome,
  getGlobalRoadmapByArea,
  getGlobalRoadmapLayers,
  getGlobalRoadmapNorthStar,
  getGlobalRoadmapPhaseMeta,
} from "../src/lib/i18n/content/global-roadmap-locale";
import {
  getGlobalResearchDecisions,
  getGlobalResearchLenses,
  getGlobalResearchSourceGroups,
  getGlobalResearchSummary,
} from "../src/lib/i18n/content/global-research-locale";
import { getStakeholderOptions, getFocusExecutiveSummaries } from "../src/lib/i18n/stakeholder";
import { getFocusConvergences } from "../src/lib/stakeholder-focus";
import {
  getColombiaAllConvergences,
  getColombiaAllInsights,
  getColombiaCrossThemes,
  getColombiaMeetingInsights,
  getColombiaSlMeetingInsights,
} from "../src/lib/i18n/content/colombia-locale";
import {
  getColombiaAllExecutiveSummary,
  getColombiaExecutiveSummary,
  getColombiaSlExecutiveSummary,
} from "../src/lib/i18n/content/colombia-executive";
import { getEcuadorExecutiveSummary } from "../src/lib/i18n/content/ecuador-executive";
import {
  getEcuadorWorkshopCrossThemes,
  getEcuadorWorkshopDreams,
  getEcuadorWorkshopExecutive,
  getEcuadorWorkshopHospitality,
  getEcuadorWorkshopInsights,
  getEcuadorWorkshopVoteWinners,
} from "../src/lib/i18n/content/ecuador-workshop-locale";
import { getPueblaProjectExecutive } from "../src/lib/i18n/content/puebla-executive";
import { getPesquisasExecutive, getPesquisasMeta } from "../src/lib/i18n/content/pesquisas";
import { getSumarioSectionGuide } from "../src/lib/i18n/content/pesquisas-content-locale";
import { getSellersCouriersExecutive } from "../src/lib/i18n/content/pesquisas-content-locale";
import {
  getCompetitorsExecutive,
  getCompetitorsMeta,
  getDecisionInsights,
} from "../src/lib/i18n/content/competitors-locale";
import { sortByPriorityThenGrowthPillar } from "../src/lib/dashboard-display-balance";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../..");
const LOCALE: Locale = process.env.EXPORT_LOCALE === "en" ? "en" : "pt";
const OUT = path.join(
  REPO_ROOT,
  "export",
  LOCALE === "pt" ? "OneYP-Dashboard-Completo-PT.md" : "OneYP-Dashboard-Readable.md",
);

const lines: string[] = [];

function h1(t: string) {
  lines.push(`\n# ${t}\n`);
}
function h2(t: string) {
  lines.push(`\n## ${t}\n`);
}
function h3(t: string) {
  lines.push(`\n### ${t}\n`);
}
function para(t?: string) {
  if (!t?.trim()) return;
  lines.push(`${t.trim()}\n`);
}
function bullets(items: string[]) {
  for (const item of items) lines.push(`- ${item}\n`);
}
function quote(text: string, cite?: string) {
  lines.push(`> ${text}\n`);
  if (cite) lines.push(`> — *${cite}*\n`);
}
function rule() {
  lines.push("\n---\n");
}

type InsightLike = {
  category: string;
  title: string;
  detail: string;
  quotes?: string[];
  source?: string;
};

function formatInsightBlock(ins: InsightLike) {
  h3(`${ins.category} · ${ins.title}`);
  para(ins.detail);
  if (ins.source) para(`*Source:* ${ins.source}`);
  if (ins.quotes?.length) {
    para("*Quotes:*");
    for (const q of ins.quotes.slice(0, 4)) quote(q);
  }
  lines.push("\n");
}

function formatCrossTheme(
  t: {
    priority: string;
    title: string;
    summary?: string;
    stores: string[];
    category: string;
    attention?: string;
    quotes: string[];
  },
) {
  h3(`[${t.priority}] ${t.title}`);
  para(`*Category:* ${t.category} · *Stores:* ${t.stores.join(", ")}`);
  if (t.summary) para(t.summary);
  if (t.attention) para(`*Why it matters:* ${t.attention}`);
  for (const q of t.quotes.slice(0, 3)) quote(q);
  lines.push("\n");
}

function formatMeetingTopics(
  label: string,
  meeting: {
    date?: string;
    location?: string;
    participants?: string;
    context?: string;
    topics: { title: string; detail: string; quotes?: string[] }[];
    connectsToStores?: string[];
    nextSteps?: string[];
  },
) {
  h2(label);
  if (meeting.date) para(`**When:** ${meeting.date}${meeting.location ? ` · ${meeting.location}` : ""}`);
  if (meeting.participants) para(`**Participants:** ${meeting.participants}`);
  if (meeting.context) para(meeting.context);
  for (const topic of meeting.topics) {
    h3(topic.title);
    para(topic.detail);
    for (const q of (topic.quotes ?? []).slice(0, 2)) quote(q);
  }
  if (meeting.connectsToStores?.length) {
    para("**Links to field visits:**");
    bullets(meeting.connectsToStores);
  }
  if (meeting.nextSteps?.length) {
    para("**Next steps:**");
    bullets(meeting.nextSteps);
  }
}

// --- Document ---

const genDate = new Date().toLocaleDateString(LOCALE === "pt" ? "pt-BR" : "en-US", { dateStyle: "long" });

h1(LOCALE === "pt" ? "OneYP 2027 — Dashboard completo" : "OneYP 2027 — Dashboard reader edition");
para(
  LOCALE === "pt"
    ? `Gerado em ${genDate} a partir dos módulos de dados do oneyp.vercel.app (idioma: português onde disponível no dashboard).`
    : `Generated ${genDate} from oneyp.vercel.app data modules.`,
);
para(
  LOCALE === "pt"
    ? "Documento estruturado para leitura: narrativa executiva, evidências por país, pesquisas, roadmap e workshops. Transcrições brutas não estão incluídas. Notas de campo México/Peru podem estar em inglês/espanhol conforme originais."
    : "This document is structured for reading: executive narrative first, then country field evidence, research, roadmap and workshops. Raw interview transcripts and machine JSON are omitted; use the full context export for LLM archival.",
);

h2(LOCALE === "pt" ? "Sumário" : "Contents");
bullets(
  LOCALE === "pt"
    ? [
        "1. Visão global cross-country",
        "2. Lentes stakeholder (Consumidor, Rewards, Nível de serviço)",
        "3. México — CDMX, Puebla, reuniões internas",
        "4. Peru — visitas Lima e síntese",
        "5. Equador — prep 7 out + workshop OYP 8 out",
        "6. Colômbia — 13 set (produto AM, service level PM, síntese All)",
        "7. Puebla Project — rotação CX + lojas regionais",
        "8. Pesquisas e cluster sellers/couriers",
        "9. Roadmap UX e produto (IDs do backlog)",
        "10. Benchmark concorrentes",
        "11. Guia de insights (perguntas do dashboard)",
        "12. Apêndice — índice de transcrições",
      ]
    : [
        "1. Global cross-country view",
        "2. Stakeholder lenses (Consumer, Rewards, Service level)",
        "3. Mexico — CDMX, Puebla, internal sessions",
        "4. Peru — Lima visits and synthesis",
        "5. Ecuador — Oct 7 prep + Oct 8 OYP workshop",
        "6. Colombia — Sep 13 product intro (1YP)",
        "7. Puebla Project — CX rotation + regional stores",
        "8. Research (Pesquisas) and sellers/couriers survey",
        "9. UX & product roadmap (incl. backlog item IDs)",
        "10. Competitors benchmark",
        "11. Insight guide (dashboard Q&A)",
        "12. Appendix — source transcripts index",
      ],
);

rule();
h1(LOCALE === "pt" ? "1. Visão global cross-country" : "1. Global cross-country view");

const globalExec = getGlobalExecutiveSummary(LOCALE);
h2(LOCALE === "pt" ? "Resumo executivo" : "Executive summary");
para(`**${globalExec.headline}**`);
for (const p of globalExec.paragraphs) para(p);
para(LOCALE === "pt" ? "**Números-chave:**" : "**Key figures:**");
bullets(globalExec.stats.map((s) => `${s.label}: ${s.value}`));

h2(LOCALE === "pt" ? "Insights ranqueados (aba All)" : "Ranked insights");
for (const ins of GLOBAL_INSIGHTS.map((i) => localizeGlobalInsight(i, LOCALE))) {
  h3(`#${ins.rank} · ${ins.priority} · ${ins.title}`);
  para(ins.summary);
  para(
    `*${LOCALE === "pt" ? "Cobertura" : "Coverage"}:* ${ins.coverage} · *${LOCALE === "pt" ? "Camada" : "Layer"}:* ${ins.layer} · *${LOCALE === "pt" ? "Países" : "Countries"}:* ${ins.countries.join(", ")}`,
  );
  if (ins.roadmapIds.length) para(`*UX roadmap IDs:* ${ins.roadmapIds.join(", ")}`);
  para(`*${LOCALE === "pt" ? "Direção" : "Suggestion"}:* ${ins.suggestion}`);
  if (ins.owners) para(`*${LOCALE === "pt" ? "Donos" : "Owners"}:* ${ins.owners}`);
  bullets(ins.evidence);
}

h2(LOCALE === "pt" ? "Convergências" : "Convergences");
bullets(getGlobalConvergences(LOCALE));

h2(LOCALE === "pt" ? "Temas por área" : "Themes by area");
for (const area of getGlobalCrossByArea(LOCALE)) {
  h3(area.area);
  para(`*${LOCALE === "pt" ? "Fontes" : "Sources"}:* ${area.sources.join(" · ")}`);
  bullets(area.themes);
}

h2(LOCALE === "pt" ? "Sinais positivos" : "Positive signals");
for (const s of getGlobalPositiveSignals(LOCALE)) {
  para(`**${s.title}** — ${s.detail}`);
}

h2(LOCALE === "pt" ? "Sessões de campo" : "Field sessions");
for (const s of getGlobalSessions(LOCALE)) {
  para(`**${s.date} · ${s.country} · ${s.label}** — ${s.detail}`);
}

h2(LOCALE === "pt" ? "Outcome de produto e roadmap" : "Product outcome & roadmap");
const productOutcome = getGlobalProductOutcome(LOCALE);
para(`**${LOCALE === "pt" ? "Outcome" : "Outcome"}:** ${productOutcome.statement}`);
para(`**${LOCALE === "pt" ? "North star" : "North star"}:** ${getGlobalRoadmapNorthStar(LOCALE)}`);
for (const layer of getGlobalRoadmapLayers(LOCALE)) {
  h3(`${layer.layer} — ${layer.subtitle}`);
  para(layer.detail);
}
for (const phaseId of ["now", "next", "later"] as const) {
  const phase = getGlobalRoadmapPhaseMeta(LOCALE, phaseId);
  h3(`${phase.label} (${phase.horizon})`);
  para(phase.goal);
  para(`*${LOCALE === "pt" ? "Critério de saída" : "Exit criteria"}:* ${phase.exitCriteria}`);
  for (const item of phase.items) {
    para(`**${item.theme}** — ${item.outcome}`);
    if (item.evidence) para(`*${LOCALE === "pt" ? "Evidência" : "Evidence"}:* ${item.evidence}`);
  }
}
for (const area of getGlobalRoadmapByArea(LOCALE)) {
  h3(`${LOCALE === "pt" ? "Roadmap" : "Roadmap"} · ${area.label}`);
  para(area.subtitle);
  for (const [phaseId, items] of Object.entries(area.phases)) {
    para(`*${phaseId.toUpperCase()}*`);
    for (const item of items) {
      para(`**${item.theme}** — ${item.outcome} · *IDs:* ${item.itemIds.join(", ") || "—"}`);
    }
  }
}
para(LOCALE === "pt" ? "**Checklist de homologação:**" : "**Homologation checklist:**");
bullets(getGlobalHomologateItems(LOCALE).map((h) => `${h.signal} (${h.country}): ${h.action}`));
para(LOCALE === "pt" ? "**Perguntas abertas:**" : "**Open questions:**");
bullets(getGlobalOpenQuestions(LOCALE));

h2(LOCALE === "pt" ? "Temas executivos" : "Executive themes");
for (const t of getGlobalExecutiveThemes(LOCALE)) {
  h3(t.label);
  para(`*${LOCALE === "pt" ? "Agora" : "Now"}:* ${t.nowAction}`);
  bullets(t.topProblems);
}

h2(LOCALE === "pt" ? "Snapshots Consumidor e Rewards" : "Consumer & Rewards topic snapshots");
for (const snap of getGlobalTopicSnapshots(LOCALE)) {
  h3(snap.label);
  para(snap.headline);
  for (const block of snap.workshopVoteBlocks) {
    para(`**${block.label}**`);
    for (const v of block.votes.slice(0, 10)) {
      const badge =
        v.votes != null
          ? `${v.votes} ${LOCALE === "pt" ? "votos" : "votes"}`
          : v.rank != null
            ? `#${v.rank}`
            : LOCALE === "pt"
              ? "Crítico"
              : "Critical";
      para(`${badge} · ${v.title} — ${v.detail}`);
    }
  }
}

const researchSummary = getGlobalResearchSummary(LOCALE);
h2(LOCALE === "pt" ? "Lentes de pesquisa (hub global)" : "Research lenses (global hub)");
para(`**${LOCALE === "pt" ? "Tese" : "Thesis"}:** ${researchSummary.thesis}`);
para(researchSummary.scope);
para(`*${LOCALE === "pt" ? "Limitação" : "Limitation"}:* ${researchSummary.limitation}`);
bullets(researchSummary.stats.map((s) => `${s.label}: ${s.value}`));
for (const lens of getGlobalResearchLenses(LOCALE)) {
  h3(lens.title);
  para(lens.evidence);
  para(`*${LOCALE === "pt" ? "Implicação" : "Implication"}:* ${lens.implication}`);
  para(`*${LOCALE === "pt" ? "Ação" : "Action"}:* ${lens.action}`);
}
h3(LOCALE === "pt" ? "Decisões por horizonte" : "Decisions by horizon");
for (const d of getGlobalResearchDecisions(LOCALE)) {
  para(`**${d.horizon}** · ${d.decision} — ${d.measure}`);
}
h3(LOCALE === "pt" ? "Grupos de fonte" : "Source groups");
for (const g of getGlobalResearchSourceGroups(LOCALE)) {
  para(`**${g.group}** — ${g.sources}. ${g.reading}`);
}

rule();
h1(LOCALE === "pt" ? "2. Lentes stakeholder" : "2. Stakeholder lenses");
for (const opt of getStakeholderOptions(LOCALE)) {
  h2(opt.label);
  para(opt.description);
  para(`**${LOCALE === "pt" ? "Lente de decisão" : "Decision frame"}:** ${opt.decision}`);
}
const focusExec = getFocusExecutiveSummaries(LOCALE);
for (const key of ["consumer", "rewards", "service-level"] as const) {
  const sum = focusExec[key];
  h3(`${LOCALE === "pt" ? "Leitura executiva" : "Executive read"} · ${key}`);
  para(sum.headline);
  for (const p of sum.paragraphs) para(p);
  const conv = getFocusConvergences(LOCALE, key);
  if (conv?.length) {
    para(LOCALE === "pt" ? "**Convergências desta lente:**" : "**Convergences for this lens:**");
    bullets(conv);
  }
}

rule();
h1("3. Mexico");

h2("Trip synthesis");
para(`**${TRIP_SYNTHESIS.period}** — ${TRIP_SYNTHESIS.scope}`);
para(TRIP_SYNTHESIS.executiveSummary);
bullets(TRIP_SYNTHESIS.kpiAlerts);
bullets(TRIP_SYNTHESIS.pueblaAlerts);

h2("CDMX stores (KPI snapshot)");
for (const store of STORES) {
  h3(store.name);
  para(
    `Orders ${store.orders} · Fill rate ${store.fillRate}% · SLA35 ${store.sla35}% · TML10 ${store.tml10}% · Rating ${store.rating}`,
  );
}

h2("CDMX cross-store patterns");
for (const t of CROSS_STORE_THEMES) formatCrossTheme(t);

h2("CDMX store interviews");
for (const store of INTERVIEW_INSIGHTS) {
  h3(store.name);
  para(store.summary);
  for (const ins of store.insights) formatInsightBlock(ins);
}

h2("Puebla cross-store patterns");
for (const t of PUEBLA_CROSS_STORE_THEMES) formatCrossTheme(t);

h2("Puebla store interviews");
for (const store of PUEBLA_INTERVIEW_INSIGHTS) {
  h3(store.name);
  para(store.summary);
  for (const ins of store.insights) formatInsightBlock(ins);
}

formatMeetingTopics("CX meeting (CDMX)", CX_MEETING);
formatMeetingTopics("Product meeting", PRODUTO_MEETING);
h2("OPS workshop");
para(DINAMICA_OPS.context);
for (const cat of DINAMICA_OPS.categories) {
  h3(cat.label);
  for (const topic of cat.topics) {
    para(`**${topic.title}** — ${topic.detail}`);
  }
}

h2("Promo workshop");
para(PROMO_WORKSHOP.executiveSummary);
for (const item of PROMO_WORKSHOP_ITEMS) {
  h3(item.title);
  para(item.detail);
}

rule();
h1("4. Peru");

h2("Visit executive summary");
para(PERU_VISIT_EXECUTIVE_SUMMARY.headline);
for (const p of PERU_VISIT_EXECUTIVE_SUMMARY.paragraphs) para(p);
para(
  `Stores ${PERU_VISIT_EXECUTIVE_SUMMARY.stats.stores} · Insights ${PERU_VISIT_EXECUTIVE_SUMMARY.stats.totalInsights} · Critical themes ${PERU_VISIT_EXECUTIVE_SUMMARY.stats.criticalThemes}`,
);

h2("POCs visited");
for (const s of PERU_VISIT_STORES) {
  h3(s.name);
  para(`${s.poc} · ${s.district} · ${s.orders} orders · Fill ${s.fillRate}% · SLA35 ${s.sla35}%`);
  if (s.alerts.length) bullets(s.alerts);
  if (s.positives.length) bullets(s.positives);
}

h2("Cross-store patterns (Lima)");
for (const t of PERU_CROSS_STORE_THEMES) formatCrossTheme(t);

h2("Store interviews");
for (const store of PERU_INTERVIEW_INSIGHTS) {
  h3(store.name);
  para(store.summary);
  for (const ins of store.insights) formatInsightBlock(ins);
}

h2(LOCALE === "pt" ? "Síntese da viagem" : "Trip synthesis");
para(`**${PERU_TRIP_SYNTHESIS.period}** — ${PERU_TRIP_SYNTHESIS.scope}`);
para(PERU_TRIP_SYNTHESIS.executiveSummary);
bullets(PERU_TRIP_SYNTHESIS.kpiAlerts);
h3(LOCALE === "pt" ? "Prioridades críticas (síntese)" : "Critical priorities (synthesis)");
for (const p of PERU_TRIP_SYNTHESIS.criticalPriorities) {
  para(`**P${p.rank} · ${p.title}**`);
  para(p.why);
  para(`*${LOCALE === "pt" ? "Ação sugerida" : "Suggested action"}:* ${p.suggestion}`);
}
h3(LOCALE === "pt" ? "Convergências Peru" : "Peru convergences");
bullets(PERU_TRIP_SYNTHESIS.convergences);
h3(LOCALE === "pt" ? "Temas mais citados (resumo)" : "Top themes (summary)");
for (const t of PERU_TRIP_SYNTHESIS.themes.slice(0, 18)) {
  para(`**#${t.rank} ${t.title}** (${t.mentions} menções) — ${t.summary}`);
}

rule();
h1(LOCALE === "pt" ? "5. Equador" : "5. Ecuador");

const ecExec = getEcuadorExecutiveSummary(LOCALE);
h2(LOCALE === "pt" ? "Prep visão produto (7 out)" : "Product vision prep (Oct 7)");
para(`**${ecExec.headline}**`);
for (const p of ecExec.paragraphs) para(p);
for (const sec of EC_CONTEXT_MEETING.sections) {
  h3(sec.label);
  para(sec.summary);
  for (const topic of sec.topics) {
    para(`**${topic.title}** — ${topic.detail}`);
    for (const q of topic.quotes.slice(0, 2)) quote(q);
  }
}
h3(LOCALE === "pt" ? "Dores prep workshop 8 out" : "Prep pains for Oct 8 workshop");
for (const p of sortByPriorityThenGrowthPillar(ECUADOR_WORKSHOP_PAINS)) {
  para(`**[${p.priority}] ${p.title}** — ${p.detail}`);
  if (p.productHook) para(`*${LOCALE === "pt" ? "Produto" : "Product"}:* ${p.productHook}`);
}
h3(LOCALE === "pt" ? "Temas cruzados Equador (prep)" : "Ecuador cross-themes (prep)");
for (const t of ECUADOR_CROSS_THEMES) para(`**${t.theme}** — ${t.detail}`);

const ecWkExec = getEcuadorWorkshopExecutive(LOCALE);
h2(LOCALE === "pt" ? "Workshop OYP (8 out)" : "OYP workshop (Oct 8)");
para(`**${ecWkExec.headline}**`);
for (const p of ecWkExec.paragraphs) para(p);
h3(LOCALE === "pt" ? "Insights workshop" : "Workshop insights");
for (const ins of getEcuadorWorkshopInsights(LOCALE)) {
  para(`**[${ins.priority}] ${ins.title}** — ${ins.detail}`);
  if (ins.votes) para(`*${LOCALE === "pt" ? "Votos" : "Votes"}:* ${ins.votes}`);
}
const voteWinners = getEcuadorWorkshopVoteWinners(LOCALE);
h3(LOCALE === "pt" ? "Vencedores — desafios" : "Vote winners — challenges");
bullets(voteWinners.challenges.map((c) => `${c.label} (${c.votes})`));
h3(LOCALE === "pt" ? "Vencedores — sonhos" : "Vote winners — dreams");
bullets(voteWinners.dreams.map((d) => `${d.label} (${d.votes})`));
h3(LOCALE === "pt" ? "Backlog de sonhos" : "Dream backlog");
for (const d of getEcuadorWorkshopDreams(LOCALE)) para(`**${d.pillar} · ${d.title}** — ${d.detail}`);
h3(LOCALE === "pt" ? "Hospitalidade (telão)" : "Hospitality (telão)");
for (const h of getEcuadorWorkshopHospitality(LOCALE)) para(`**${h.audience}** — ${h.idea}. ${h.note}`);
h3(LOCALE === "pt" ? "Temas cruzados workshop" : "Workshop cross-themes");
for (const t of getEcuadorWorkshopCrossThemes(LOCALE)) para(`**${t.theme}** — ${t.detail}`);

rule();
h1(LOCALE === "pt" ? "6. Colômbia" : "6. Colombia");

const coAllExec = getColombiaAllExecutiveSummary(LOCALE);
h2(LOCALE === "pt" ? "Síntese All — 13 set (AM + PM)" : "All synthesis — Sep 13");
para(`**${coAllExec.headline}**`);
for (const p of coAllExec.paragraphs) para(p);
for (const c of getColombiaAllConvergences(LOCALE)) {
  para(`**${c.theme}** — ${c.detail}`);
}
for (const ins of getColombiaAllInsights(LOCALE)) {
  para(`**[${ins.priority}] ${ins.title}** — ${ins.detail}`);
}

para(`**${CO_PRODUCT_MEETING_META.title}** — ${CO_PRODUCT_MEETING_META.date}`);
para(CO_PRODUCT_MEETING_META.format);
const coAmExec = getColombiaExecutiveSummary(LOCALE);
h3(LOCALE === "pt" ? "Intro produto (manhã)" : "Product intro (AM)");
para(`**${coAmExec.headline}**`);
for (const p of coAmExec.paragraphs) para(p);
for (const ins of getColombiaMeetingInsights(LOCALE)) {
  para(`**[${ins.priority}] ${ins.title}** — ${ins.detail}`);
  if (ins.globalRank) para(`*Global All #${ins.globalRank}*`);
}
for (const t of getColombiaCrossThemes(LOCALE)) para(`**${t.theme}** — ${t.detail}`);

const coSlExec = getColombiaSlExecutiveSummary(LOCALE);
h3(LOCALE === "pt" ? "Service Level (tarde)" : "Service Level (PM)");
para(`**${CO_SL_MEETING_META.title}** — ${CO_SL_MEETING_META.date}`);
para(`**${coSlExec.headline}**`);
for (const p of coSlExec.paragraphs) para(p);
for (const ins of getColombiaSlMeetingInsights(LOCALE)) {
  para(`**[${ins.priority}] ${ins.title}** — ${ins.detail}`);
  if (ins.globalRank) para(`*Global All #${ins.globalRank}*`);
}

rule();
h1(LOCALE === "pt" ? "7. Puebla Project" : "7. Puebla Project");

const pueblaExec = getPueblaProjectExecutive(LOCALE);
para(`**${PUEBLA_PROJECT_META.title}** — ${PUEBLA_PROJECT_META.period}`);
para(PUEBLA_PROJECT_META.subtitle);
para(`**${pueblaExec.headline}**`);
for (const p of pueblaExec.paragraphs) para(p);
bullets(pueblaExec.takeaways.map((t) => `${t.label}: ${t.text}`));
bullets(pueblaExec.stats.map((s) => `${s.label}: ${s.value}`));
h3("Visit map");
for (const v of pueblaExec.visitMap) para(`**${v.zone}** — ${v.seen}`);
h3("Cross-themes");
for (const t of PUEBLA_PROJECT_CROSS_THEMES) {
  para(`**[${t.priority}] ${t.theme}** — ${t.detail}`);
  para(`*Evidence:* ${t.evidenceFiles.join(", ")}`);
  for (const q of t.quotes.slice(0, 2)) quote(q);
}
h3("Sessions (interviews)");
for (const i of PUEBLA_PROJECT_INTERVIEWS) {
  h3(i.label);
  para(i.executiveSummary);
  for (const ins of i.insights) formatInsightBlock({ ...ins, category: ins.category });
}

rule();
h1(LOCALE === "pt" ? "8. Pesquisas" : "8. Research (Pesquisas)");

const pesquisasMeta = getPesquisasMeta(LOCALE);
const pesquisasExec = getPesquisasExecutive(LOCALE);
h2(pesquisasMeta.title);
para(`${pesquisasMeta.period} · ${pesquisasMeta.scope}`);
para(pesquisasMeta.subtitle);

h3(LOCALE === "pt" ? "Resumo executivo" : "Executive summary");
para(`**${pesquisasExec.headline}**`);
for (const p of pesquisasExec.paragraphs) para(p);
bullets([
  ...pesquisasExec.stats.map((s) => `${s.label}: ${s.value}`),
  ...pesquisasExec.statsSecondary.map((s) => `${s.label}: ${s.value}`),
]);

h3(LOCALE === "pt" ? "Guia de seções" : "Section guide");
for (const row of getSumarioSectionGuide(LOCALE)) {
  para(`**${row.section}** — ${row.insight}`);
}

h3("Research tabs in dashboard");
for (const sec of PESQUISAS_SECTIONS) {
  para(`**${sec.label}** — ${sec.subtitle}`);
}

h3("Source files");
for (const src of PESQUISAS_SOURCES) {
  para(`**${src.file}** (${src.sample}, ${src.period}) — ${src.use}`);
}

h2(LOCALE === "pt" ? "Pesquisa sellers e couriers" : "Sellers & couriers research");
para(SELLERS_COURIERS_META.title + " · " + SELLERS_COURIERS_META.period);
const scExec = getSellersCouriersExecutive(LOCALE);
para(`**${scExec.headline}**`);
for (const p of scExec.paragraphs) para(p);
bullets(scExec.stats.map((s) => `${s.label}: ${s.value}`));
para("**Method:**");
for (const m of SELLERS_COURIERS_METHOD) {
  para(`**${m.source}** — ${m.coverage}. ${m.use}`);
}

rule();
h1("9. UX & product roadmap");

h2("Principles");
for (const pr of UX_ROADMAP_PRINCIPLES) {
  h3(`${pr.layer}: ${pr.subtitle}`);
  para(pr.detail);
}

h2("Actors");
for (const [actor, desc] of Object.entries(UX_ROADMAP_ACTOR_DESCRIPTIONS)) {
  para(`**${actor}** — ${desc}`);
}

for (const actor of ["Seller", "Courier", "Admin", "CX"] as const) {
  h2(`Roadmap · ${actor}`);
  const items = UX_ROADMAP_ITEMS.filter((i) => i.actor === actor);
  for (const item of items) {
    h3(`[${item.phase.toUpperCase()} · ${item.priority}] ${item.id} — ${item.title}`);
    para(item.description);
    bullets(item.evidence.slice(0, 5));
    if (item.successCriteria?.length) {
      para("*Success criteria:*");
      bullets(item.successCriteria);
    }
  }
}

rule();
h1(LOCALE === "pt" ? "10. Benchmark concorrentes" : "10. Competitors benchmark");

const compMeta = getCompetitorsMeta(LOCALE);
const compExec = getCompetitorsExecutive(LOCALE);
para(`${compMeta.title} · ${compMeta.cutDate}`);
para(`**${compExec.headline}**`);
for (const p of compExec.paragraphs) para(p);
bullets(compExec.stats.map((s) => `${s.label}: ${s.value}`));

h3(LOCALE === "pt" ? "Insights de decisão" : "Decision insights");
for (const d of getDecisionInsights(LOCALE)) {
  para(`**${d.title}** (${d.platform}) — ${d.insight}`);
  para(`*Implication:* ${d.implication}`);
}

h3("2027 plan highlights");
for (const row of PLAN_2027) {
  para(`**${row.theme}** (${row.entity}) — ${row.implication}`);
  para(`*Evidence:* ${row.evidence} · *Confidence:* ${row.confidence}`);
}

rule();
h1("11. Insight guide");

h2("Categories");
bullets(INSIGHT_GUIDE_CATEGORIES.map((c) => c.labelEn));
h2("Questions");
for (const q of INSIGHT_GUIDE_QUESTIONS) {
  para(`**${q.category}** · ${q.labelEn}`);
}

rule();
h1("12. Appendix — transcript index");
para(
  "Full word-for-word transcripts are not included in this reader edition. Files below are available in the repository and in the machine full-context export.",
);

function listTxt(dir: string, base: string): { rel: string; kb: number }[] {
  const out: { rel: string; kb: number }[] = [];
  if (!fs.existsSync(dir)) return out;
  const walk = (d: string) => {
    for (const name of fs.readdirSync(d)) {
      if (name.startsWith(".") || name === "node_modules") continue;
      const abs = path.join(d, name);
      const st = fs.statSync(abs);
      if (st.isDirectory()) walk(abs);
      else if (/\.(txt|md)$/i.test(name) && st.size < 15_000_000) {
        out.push({ rel: path.relative(base, abs), kb: Math.round(st.size / 1024) });
      }
    }
  };
  walk(dir);
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

const roots = [
  path.join(REPO_ROOT, "Mexico"),
  path.join(REPO_ROOT, "Peru"),
  path.join(REPO_ROOT, "Equador"),
  path.join(REPO_ROOT, "Colombia"),
  path.join(REPO_ROOT, "Puebla project"),
  path.join(REPO_ROOT, "Plataforma courier"),
  path.join(REPO_ROOT, "Plataforma seller"),
];
const seen = new Set<string>();
for (const root of roots) {
  for (const { rel, kb } of listTxt(root, REPO_ROOT)) {
    if (seen.has(rel)) continue;
    seen.add(rel);
    lines.push(`- ${rel} (${kb} KB)\n`);
  }
}

para("\n*End of reader edition.*");

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join(""), "utf8");
const mb = (fs.statSync(OUT).size / (1024 * 1024)).toFixed(2);
console.log(`Wrote ${OUT} (${mb} MB)`);
