/**
 * Full dashboard context export for LLM / archival.
 * Source of truth: TypeScript data modules + field transcripts (no generated narrative).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { GLOBAL_CONVERGENCES, GLOBAL_CROSS_BY_AREA, GLOBAL_EXECUTIVE_SUMMARY, GLOBAL_INSIGHTS, GLOBAL_POSITIVE_SIGNALS, GLOBAL_SESSIONS, GLOBAL_TOPIC_SNAPSHOTS } from "../src/lib/global-insights";
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
import { buildMexicoSearchDocs, buildStandaloneSearchDocs } from "../src/lib/search-docs";
import {
  CROSS_STORE_THEMES,
  CX_MEETING,
  DINAMICA_OPS,
  INTERVIEW_INSIGHTS,
  PRODUTO_MEETING,
  STORES,
  TRIP_SYNTHESIS,
} from "../src/lib/mexico-view";
import { PE_WORKSHOP_0209 } from "../src/lib/peru-workshop-0209";
import { PE_CONSUMER_VISION } from "../src/lib/peru-consumer-vision";
import { PE_SERVICE_LEVEL } from "../src/lib/peru-service-level";
import { PE_CONTEXT_MEETING } from "../src/lib/peru-context-meeting";
import { PE_B2B_PLATFORM } from "../src/lib/peru-b2b-platform";
import { PE_CONTEXT_PDF, PE_CONTEXT_PDF_INSIGHTS, PE_CONTEXT_PRESENTERS, PE_CONTEXT_TEAM } from "../src/lib/peru-context-presentation";
import { PERU_TRIP_SYNTHESIS } from "../src/lib/peru-trip-synthesis";
import { PERU_CROSS_STORE_THEMES, PERU_INTERVIEW_INSIGHTS, PERU_VISIT_EXECUTIVE_SUMMARY } from "../src/lib/peru-insights";
import { PERU_VISIT_STORES } from "../src/lib/peru-visit-stores";
import { PERU_ROADMAP_LINKS, PERU_CONTEXT_VALIDATIONS } from "../src/lib/peru-roadmap-links";
import { PUEBLA_CROSS_STORE_THEMES, PUEBLA_INTERVIEW_INSIGHTS } from "../src/lib/puebla-insights";
import { PROMO_WORKSHOP, PROMO_WORKSHOP_ITEMS } from "../src/lib/promo-workshop";
import { UX_ROADMAP_ACTOR_DESCRIPTIONS, UX_ROADMAP_ITEMS, UX_ROADMAP_PRINCIPLES } from "../src/lib/ux-roadmap";
import { LIMA } from "../src/lib/lima-metrics";
import {
  COMPETITORS_EXECUTIVE_SUMMARY,
  COMPETITORS_META,
  COMPETITIVE_MAP,
  COUNTRY_ANALYSIS,
  DECISION_INSIGHTS,
  INNOVATIONS_2026,
  PLAN_2027,
  WATCHLIST_2027,
} from "../src/lib/competitors-data";
import { INSIGHT_GUIDE_CATEGORIES, INSIGHT_GUIDE_QUESTIONS } from "../src/lib/insight-guide";
import { buildAllTrackSnapshots } from "../src/lib/peru-trip-synthesis-tracks";
import * as PesquisasData from "../src/lib/pesquisas-data";
import * as SellersCouriersResearch from "../src/lib/sellers-couriers-research";
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

function serializableModuleExports(mod: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(mod).filter(
      ([key, val]) =>
        key !== "default" &&
        typeof val !== "function" &&
        !key.endsWith("View") &&
        !key.startsWith("use"),
    ),
  );
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DASHBOARD_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(DASHBOARD_ROOT, "../../..");
const OUT_DIR = path.join(REPO_ROOT, "export");
const OUT_MD = path.join(OUT_DIR, "OneYP-Dashboard-Full-Context.md");

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
function para(t: string) {
  lines.push(`${t}\n`);
}
function jsonDump(label: string, data: unknown) {
  h3(label);
  lines.push("```json\n");
  lines.push(JSON.stringify(data, null, 2));
  lines.push("\n```\n");
}
function fileBlock(relPath: string, content: string, fence = "") {
  h3(relPath);
  const lang = fence || "";
  lines.push(`\`\`\`${lang}\n`);
  lines.push(content);
  lines.push("\n```\n");
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function readUtf8(abs: string): string | null {
  try {
    return fs.readFileSync(abs, "utf8");
  } catch {
    return null;
  }
}

function collectTxtFiles(dir: string, base = REPO_ROOT): { rel: string; content: string }[] {
  const out: { rel: string; content: string }[] = [];
  if (!fs.existsSync(dir)) return out;
  const walk = (d: string) => {
    for (const name of fs.readdirSync(d)) {
      if (name.startsWith(".") || name === "node_modules" || name === ".next") continue;
      const abs = path.join(d, name);
      const st = fs.statSync(abs);
      if (st.isDirectory()) walk(abs);
      else if (/\.(txt|md)$/i.test(name) && st.size < 15_000_000) {
        const rel = path.relative(base, abs);
        if (rel.includes("node_modules") || rel.includes(".pylibs")) continue;
        const content = readUtf8(abs);
        if (content) out.push({ rel, content });
      }
    }
  };
  walk(dir);
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

function appendJsonTranscript(rel: string) {
  const abs = path.join(REPO_ROOT, rel);
  const raw = readUtf8(abs);
  if (!raw) return;
  h3(rel);
  lines.push("```json\n");
  lines.push(raw);
  lines.push("\n```\n");
}

// --- Manifest ---
h1("OneYP Dashboard — full context export");
para(`Generated: ${new Date().toISOString()}`);
para(
  "This file is built from dashboard TypeScript data modules (vercel-dashboard/src/lib) plus raw field transcripts. " +
    "It does not add analysis beyond what is stored in those sources.",
);
para("Repository root: " + REPO_ROOT);

h2("Table of contents (sections)");
para(
  [
    "1. ALL hub markdown",
    "2. Cross-country (global-insights, global-roadmap, executive themes)",
    "3. Peru modules (context, stores, workshop, consumer, service level, B2B, synthesis)",
    "4. Mexico modules (stores, interviews, meetings, OPS, Puebla, promo, synthesis)",
    "5. Pesquisas (research), global research lenses, seller/courier survey, stakeholder focus",
    "6. UX roadmap, competitors, Lima metrics, insight guide",
    "7. Dashboard search index (flattened text per doc)",
    "8. HTML dashboards (executive deck + seller/courier bugs evidence)",
    "9. Raw transcripts (.txt) and segmented JSON interviews",
  ].join("\n"),
);

// ALL markdown
h1("ALL hub (markdown)");
for (const name of ["README.md", "product-brief.md", "roadmap-2027.md", "design-brief.md", "content-style-guide.md"]) {
  const p = path.join(REPO_ROOT, "ALL", name);
  const c = readUtf8(p);
  if (c) fileBlock(`ALL/${name}`, c);
}

h1("Cross-country data modules");
jsonDump("GLOBAL_EXECUTIVE_SUMMARY", GLOBAL_EXECUTIVE_SUMMARY);
jsonDump("GLOBAL_INSIGHTS (27)", GLOBAL_INSIGHTS);
jsonDump("GLOBAL_CONVERGENCES", GLOBAL_CONVERGENCES);
jsonDump("GLOBAL_CROSS_BY_AREA", GLOBAL_CROSS_BY_AREA);
jsonDump("GLOBAL_SESSIONS", GLOBAL_SESSIONS);
jsonDump("GLOBAL_POSITIVE_SIGNALS", GLOBAL_POSITIVE_SIGNALS);
jsonDump("GLOBAL_TOPIC_SNAPSHOTS", GLOBAL_TOPIC_SNAPSHOTS);
jsonDump("GLOBAL_EXECUTIVE_THEMES", GLOBAL_EXECUTIVE_THEMES);
jsonDump("GLOBAL_PRODUCT_OUTCOME", GLOBAL_PRODUCT_OUTCOME);
jsonDump("GLOBAL_ROADMAP_NORTH_STAR", GLOBAL_ROADMAP_NORTH_STAR);
jsonDump("GLOBAL_ROADMAP_LAYERS", GLOBAL_ROADMAP_LAYERS);
jsonDump("GLOBAL_ROADMAP_PHASES", GLOBAL_ROADMAP_PHASES);
jsonDump("GLOBAL_ROADMAP_BY_AREA", GLOBAL_ROADMAP_BY_AREA);
jsonDump("GLOBAL_HOMOLOGATE_ITEMS", GLOBAL_HOMOLOGATE_ITEMS);
jsonDump("GLOBAL_OPEN_QUESTIONS", GLOBAL_OPEN_QUESTIONS);

h1("Peru data modules");
jsonDump("PE_CONTEXT_MEETING", PE_CONTEXT_MEETING);
jsonDump("PE_CONTEXT_PRESENTERS", PE_CONTEXT_PRESENTERS);
jsonDump("PE_CONTEXT_TEAM", PE_CONTEXT_TEAM);
jsonDump("PE_CONTEXT_PDF", PE_CONTEXT_PDF);
jsonDump("PE_CONTEXT_PDF_INSIGHTS", PE_CONTEXT_PDF_INSIGHTS);
jsonDump("PE_CONTEXT_VALIDATIONS", PERU_CONTEXT_VALIDATIONS);
jsonDump("PERU_VISIT_EXECUTIVE_SUMMARY", PERU_VISIT_EXECUTIVE_SUMMARY);
jsonDump("PERU_VISIT_STORES", PERU_VISIT_STORES);
jsonDump("PERU_INTERVIEW_INSIGHTS", PERU_INTERVIEW_INSIGHTS);
jsonDump("PERU_CROSS_STORE_THEMES", PERU_CROSS_STORE_THEMES);
jsonDump("PERU_TRIP_SYNTHESIS", PERU_TRIP_SYNTHESIS);
jsonDump("PERU_TRIP_SYNTHESIS_TRACKS", buildAllTrackSnapshots());
jsonDump("PERU_ROADMAP_LINKS", PERU_ROADMAP_LINKS);
jsonDump("PE_B2B_PLATFORM", PE_B2B_PLATFORM);
jsonDump("PE_SERVICE_LEVEL", PE_SERVICE_LEVEL);
jsonDump("PE_WORKSHOP_0209", PE_WORKSHOP_0209);
jsonDump("PE_CONSUMER_VISION", PE_CONSUMER_VISION);
jsonDump("LIMA metrics", LIMA);

h1("Mexico data modules");
jsonDump("STORES", STORES);
jsonDump("INTERVIEW_INSIGHTS (CDMX)", INTERVIEW_INSIGHTS);
jsonDump("CROSS_STORE_THEMES (CDMX)", CROSS_STORE_THEMES);
jsonDump("PUEBLA_INTERVIEW_INSIGHTS", PUEBLA_INTERVIEW_INSIGHTS);
jsonDump("PUEBLA_CROSS_STORE_THEMES", PUEBLA_CROSS_STORE_THEMES);
jsonDump("CX_MEETING", CX_MEETING);
jsonDump("PRODUTO_MEETING", PRODUTO_MEETING);
jsonDump("DINAMICA_OPS", DINAMICA_OPS);
jsonDump("TRIP_SYNTHESIS", TRIP_SYNTHESIS);
jsonDump("PROMO_WORKSHOP", PROMO_WORKSHOP);
jsonDump("PROMO_WORKSHOP_ITEMS", PROMO_WORKSHOP_ITEMS);

h1("Pesquisas (Research tab data)");
jsonDump("pesquisas-data module", serializableModuleExports(PesquisasData as Record<string, unknown>));
jsonDump("sellers-couriers-research module", serializableModuleExports(SellersCouriersResearch as Record<string, unknown>));

h1("Global hub — research & stakeholder lenses");
jsonDump("GLOBAL_RESEARCH_SUMMARY", GLOBAL_RESEARCH_SUMMARY);
jsonDump("GLOBAL_RESEARCH_LENSES", GLOBAL_RESEARCH_LENSES);
jsonDump("GLOBAL_RESEARCH_DECISIONS", GLOBAL_RESEARCH_DECISIONS);
jsonDump("GLOBAL_RESEARCH_SOURCE_GROUPS", GLOBAL_RESEARCH_SOURCE_GROUPS);
jsonDump("STAKEHOLDER_OPTIONS", STAKEHOLDER_OPTIONS);
jsonDump("FOCUS_EXECUTIVE_SUMMARIES", FOCUS_EXECUTIVE_SUMMARIES);
jsonDump("FOCUS_CONVERGENCES", FOCUS_CONVERGENCES);

h1("UX roadmap");
jsonDump("UX_ROADMAP_PRINCIPLES", UX_ROADMAP_PRINCIPLES);
jsonDump("UX_ROADMAP_ACTOR_DESCRIPTIONS", UX_ROADMAP_ACTOR_DESCRIPTIONS);
jsonDump("UX_ROADMAP_ITEMS", UX_ROADMAP_ITEMS);

h1("Competitors benchmark");
jsonDump("COMPETITORS_META", COMPETITORS_META);
jsonDump("COMPETITORS_EXECUTIVE_SUMMARY", COMPETITORS_EXECUTIVE_SUMMARY);
jsonDump("COMPETITIVE_MAP", COMPETITIVE_MAP);
jsonDump("DECISION_INSIGHTS", DECISION_INSIGHTS);
jsonDump("COUNTRY_ANALYSIS", COUNTRY_ANALYSIS);
jsonDump("INNOVATIONS_2026", INNOVATIONS_2026);
jsonDump("PLAN_2027", PLAN_2027);
jsonDump("WATCHLIST_2027", WATCHLIST_2027);

h1("Insight guide (dashboard Q&A)");
jsonDump("INSIGHT_GUIDE_CATEGORIES", INSIGHT_GUIDE_CATEGORIES);
jsonDump("INSIGHT_GUIDE_QUESTIONS", INSIGHT_GUIDE_QUESTIONS);

h1("Dashboard search index (same as Global Search corpus)");
const searchDocs = [
  ...buildStandaloneSearchDocs(),
  ...buildMexicoSearchDocs({
    stores: STORES,
    interviews: INTERVIEW_INSIGHTS,
    crossThemes: CROSS_STORE_THEMES,
    cx: CX_MEETING,
    product: {
      topics: PRODUTO_MEETING.topics,
      nextSteps: PRODUTO_MEETING.nextSteps,
      context: PRODUTO_MEETING.context,
      connectsToStores: PRODUTO_MEETING.connectsToStores,
      teste: PRODUTO_MEETING.testeCancelamento,
    },
    ops: DINAMICA_OPS,
    synthesis: TRIP_SYNTHESIS,
  }),
];
para(`Total search documents: ${searchDocs.length}`);
for (const doc of searchDocs) {
  h3(`${doc.id} — ${doc.title}`);
  para(`Breadcrumb: ${doc.breadcrumb}`);
  para(`Location: ${JSON.stringify(doc.location)}`);
  lines.push("```\n");
  lines.push(doc.text);
  lines.push("\n```\n");
}

h1("HTML dashboards (ALL + Vercel public copies)");
const htmlAssets: { rel: string; note?: string }[] = [
  { rel: "ALL/executive-deck-field-visits-2027.html", note: "Executive field visits deck — source in ALL" },
  { rel: "ALL/seller-courier-bugs-evidence-2027.html", note: "Seller/courier bugs evidence 2027" },
  {
    rel: "Mexico/Lojas/vercel-dashboard/public/executive-deck-field-visits-2027.html",
    note: "Same executive deck served from dashboard /public (verify parity with ALL/)",
  },
];
for (const { rel, note } of htmlAssets) {
  const abs = path.join(REPO_ROOT, rel);
  const html = readUtf8(abs);
  if (!html) {
    para(`[missing] ${rel}`);
    continue;
  }
  if (note) para(note);
  fileBlock(rel, html, "html");
  h3(`${rel} — plain text extract`);
  fileBlock(`${rel} (text)`, htmlToPlainText(html));
}

h1("Field transcripts — plain text");
const txtRoots = [
  path.join(REPO_ROOT, "Mexico"),
  path.join(REPO_ROOT, "Peru"),
  path.join(REPO_ROOT, "Plataforma courier"),
  path.join(REPO_ROOT, "Plataforma seller"),
];
const seenTxt = new Set<string>();
for (const root of txtRoots) {
  for (const { rel, content } of collectTxtFiles(root)) {
    if (seenTxt.has(rel)) continue;
    seenTxt.add(rel);
    fileBlock(rel, content);
  }
}

h1("Field transcripts — segmented JSON");
appendJsonTranscript("Mexico/Lojas/transcricoes_entrevistas.json");
appendJsonTranscript("Mexico/Reuniao/transcricoes_reuniao_4_5.json");

h1("Mexico Researcher notes");
const researcher = readUtf8(path.join(REPO_ROOT, "Mexico/Researcher.md"));
if (researcher) fileBlock("Mexico/Researcher.md", researcher);

h1("End of export");

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_MD, lines.join(""), "utf8");
const sizeMb = (fs.statSync(OUT_MD).size / (1024 * 1024)).toFixed(2);
console.log(`Wrote ${OUT_MD} (${sizeMb} MB)`);
