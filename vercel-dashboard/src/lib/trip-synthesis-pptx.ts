import { PERU_TRIP_SYNTHESIS } from "./peru-trip-synthesis";

export type TripSynthesisPptxInput = {
 country: string;
 fileName: string;
 period: string;
 scope: string;
 executiveSummary: string;
 statRows: { label: string; value: string }[];
 alertSections: { title: string; bullets: string[] }[];
 themes: {
 rank: number;
 title: string;
 coverage: string;
 summary: string;
 impact: string;
 }[];
 criticalPriorities: {
 rank: number;
 title: string;
 why: string;
 suggestion: string;
 owners: string;
 }[];
 convergences: string[];
 sessionHighlights?: { session: string; highlight: string }[];
 roadmap?: { now: string[]; next: string[]; later: string[] };
 positiveSignals?: string[];
 source: string;
};

const PURPLE = "9C41FF";
const WHITE = "FFFFFF";
const GRAY = "AAAAAA";
const BG = "0A0A0A";

type PptxSlide = {
 background: { color: string };
 addText: (text: string, options: Record<string, unknown>) => void;
};

function addTitleBlock(slide: PptxSlide, lines: string[], subtitle?: string) {
 slide.addText(
 lines.map((l) => l.toUpperCase()).join("\n"),
 {
 x: 0.55,
 y: 0.45,
 w: 12.2,
 h: 1.1,
 fontSize: 32,
 bold: true,
 color: PURPLE,
 fontFace: "Arial",
 valign: "top",
 },
 );
 if (subtitle) {
 slide.addText(subtitle, {
 x: 0.55,
 y: 1.55,
 w: 12.2,
 h: 0.45,
 fontSize: 11,
 color: GRAY,
 fontFace: "Arial",
 });
 }
}

function addSectionLabel(slide: PptxSlide, y: number, label: string) {
 slide.addText(label, {
 x: 0.55,
 y,
 w: 12,
 h: 0.35,
 fontSize: 14,
 bold: true,
 color: PURPLE,
 fontFace: "Arial",
 });
}

function addBullets(slide: PptxSlide, y: number, bullets: string[], fontSize = 11, maxH = 5.5) {
 const text = bullets.map((b) => `• ${b}`).join("\n");
 slide.addText(text, {
 x: 0.55,
 y,
 w: 12.2,
 h: maxH,
 fontSize,
 color: WHITE,
 fontFace: "Arial",
 valign: "top",
 paraSpaceAfter: 4,
 });
}

function newSlide(pptx: { addSlide: () => unknown }): PptxSlide {
 const slide = pptx.addSlide() as PptxSlide;
 slide.background = { color: BG };
 return slide;
}

function chunk<T>(arr: T[], size: number): T[][] {
 const out: T[][] = [];
 for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
 return out;
}

export async function downloadTripSynthesisPptx(input: TripSynthesisPptxInput): Promise<void> {
 const PptxGen = (await import("pptxgenjs")).default;
 const pptx = new PptxGen();
 pptx.layout = "LAYOUT_16x9";
 pptx.author = "OneYP Dashboard";

 let slide = newSlide(pptx);
 addTitleBlock(slide, [input.country, "Trip synthesis"], `${input.period}`);
 addBullets(
 slide,
 2.15,
 [input.scope, "", input.executiveSummary.slice(0, 1200)],
 12,
 4.8,
 );

 slide = newSlide(pptx);
 addTitleBlock(slide, ["Key", "Stats"]);
 const statLines = input.statRows.map((s) => `${s.label}: ${s.value}`);
 addBullets(slide, 1.85, statLines, 13, 5.2);

 for (const section of input.alertSections) {
 if (!section.bullets.length) continue;
 slide = newSlide(pptx);
 addTitleBlock(slide, ["Alerts"], section.title);
 addBullets(slide, 2.05, section.bullets, 11, 5);
 }

 if (input.sessionHighlights?.length) {
 slide = newSlide(pptx);
 addTitleBlock(slide, ["Session", "Highlights"]);
 addBullets(
 slide,
 1.85,
 input.sessionHighlights.map((h) => `${h.session} — ${h.highlight}`),
 10,
 5.3,
 );
 }

 for (const group of chunk(input.themes, 4)) {
 slide = newSlide(pptx);
 addTitleBlock(slide, ["Ranked", "Themes"]);
 const bullets = group.flatMap((t) => [
 `#${t.rank} ${t.title}`,
 `Coverage: ${t.coverage}`,
 t.summary,
 `Impact: ${t.impact}`,
 "",
 ]);
 addBullets(slide, 1.85, bullets, 9.5, 5.4);
 }

 for (const group of chunk(input.criticalPriorities, 2)) {
 slide = newSlide(pptx);
 addTitleBlock(slide, ["Critical", "Priorities"]);
 let y = 1.85;
 for (const p of group) {
 addSectionLabel(slide, y, `P${p.rank} — ${p.title}`);
 y += 0.38;
 addBullets(
 slide,
 y,
 [`Why: ${p.why}`, `Suggestion: ${p.suggestion}`, `Owners: ${p.owners}`],
 9.5,
 2.2,
 );
 y += 2.35;
 }
 }

 if (input.convergences.length) {
 for (const group of chunk(input.convergences, 7)) {
 slide = newSlide(pptx);
 addTitleBlock(slide, ["Convergences"]);
 addBullets(slide, 1.85, group, 10, 5.3);
 }
 }

 if (input.roadmap) {
 slide = newSlide(pptx);
 addTitleBlock(slide, ["Roadmap", "Now · Next · Later"]);
 addSectionLabel(slide, 1.85, "Now");
 addBullets(slide, 2.2, input.roadmap.now, 9.5, 1.35);
 addSectionLabel(slide, 3.65, "Next");
 addBullets(slide, 4.0, input.roadmap.next.slice(0, 6), 9.5, 1.35);
 addSectionLabel(slide, 5.45, "Later");
 addBullets(slide, 5.8, input.roadmap.later.slice(0, 5), 9.5, 1.2);
 }

 if (input.positiveSignals?.length) {
 slide = newSlide(pptx);
 addTitleBlock(slide, ["Positive", "Signals"]);
 addBullets(slide, 1.85, input.positiveSignals, 10, 5.3);
 }

 slide = newSlide(pptx);
 addTitleBlock(slide, ["Source"]);
 addBullets(slide, 2.05, [input.source], 11, 4.5);

 await pptx.writeFile({ fileName: input.fileName });
}

export function peruTripSynthesisPptxInput(): TripSynthesisPptxInput {
 const s = PERU_TRIP_SYNTHESIS;
 return {
 country: "Peru",
 fileName: "Peru-Trip-Synthesis.pptx",
 period: s.period,
 scope: s.scope,
 executiveSummary: s.executiveSummary,
 statRows: [
 { label: "Sessions", value: String(s.stats.sessions) },
 { label: "POCs visited", value: String(s.stats.storesVisited) },
 { label: "Insights", value: String(s.stats.totalInsights) },
 { label: "Cross themes", value: String(s.stats.crossThemes) },
 { label: "Critical themes", value: String(s.stats.criticalThemes) },
 { label: "Workshop challenges", value: String(s.stats.workshopChallenges) },
 { label: "Consumer pains (Sep 3)", value: String(s.stats.consumerPains) },
 { label: "National POCs", value: String(s.stats.nationalPocs) },
 ],
 alertSections: [{ title: "KPI alerts — Lima + national", bullets: s.kpiAlerts }],
 themes: s.themes.map((t) => ({
 rank: t.rank,
 title: t.title,
 coverage: t.coverage,
 summary: t.summary,
 impact: t.impact,
 })),
 criticalPriorities: s.criticalPriorities.map((p) => ({
 rank: p.rank,
 title: p.title,
 why: p.why,
 suggestion: p.suggestion,
 owners: p.owners,
 })),
 convergences: s.convergences,
 sessionHighlights: s.sessionHighlights.map((h) => ({
 session: h.session,
 highlight: h.highlight,
 })),
 roadmap: s.roadmap,
 positiveSignals: s.positiveSignals,
 source: s.source,
 };
}

export type MexicoTripSynthesisForExport = {
 period: string;
 scope: string;
 executiveSummary: string;
 stats: {
 stores: number;
 cdmxStores: number;
 pueblaStores: number;
 interviews: number;
 totalInsights: number;
 crossThemes: number;
 criticalThemes: number;
 pueblaInsights: number;
 cxTopics: number;
 productTopics: number;
 opsTopics: number;
 };
 kpiAlerts: string[];
 pueblaAlerts: string[];
 themes: {
 rank: number;
 title: string;
 stores: string;
 summary: string;
 impact: string;
 }[];
 convergences: string[];
 criticalPriorities: {
 rank: number;
 title: string;
 why: string;
 suggestion: string;
 owners: string;
 }[];
 roadmap: { now: string[]; next: string[]; later: string[] };
};

export function mexicoTripSynthesisPptxInput(s: MexicoTripSynthesisForExport): TripSynthesisPptxInput {
 return {
 country: "Mexico",
 fileName: "Mexico-Trip-Synthesis.pptx",
 period: s.period,
 scope: s.scope,
 executiveSummary: s.executiveSummary,
 statRows: [
 { label: "POCs visited", value: String(s.stats.stores) },
 { label: "CDMX + Puebla", value: `${s.stats.cdmxStores} + ${s.stats.pueblaStores}` },
 { label: "Interviews", value: String(s.stats.interviews) },
 { label: "Total insights", value: String(s.stats.totalInsights) },
 { label: "Cross themes", value: String(s.stats.crossThemes) },
 { label: "Critical themes", value: String(s.stats.criticalThemes) },
 { label: "Meeting topics", value: String(s.stats.cxTopics + s.stats.productTopics + s.stats.opsTopics) },
 { label: "Puebla insights", value: String(s.stats.pueblaInsights) },
 ],
 alertSections: [
 { title: "KPI alerts — CDMX", bullets: s.kpiAlerts },
 { title: "Field alerts — Puebla", bullets: s.pueblaAlerts },
 ],
 themes: s.themes.map((t) => ({
 rank: t.rank,
 title: t.title,
 coverage: t.stores,
 summary: t.summary,
 impact: t.impact,
 })),
 criticalPriorities: s.criticalPriorities.map((p) => ({
 rank: p.rank,
 title: p.title,
 why: p.why,
 suggestion: p.suggestion,
 owners: p.owners,
 })),
 convergences: s.convergences,
 roadmap: s.roadmap,
 source:
 "Synthesis: CDMX (4 POCs) + Puebla (5 POCs) store visits · CX · Product · OPS meetings (Jul 22–23) · cross-city themes and priorities",
 };
}
