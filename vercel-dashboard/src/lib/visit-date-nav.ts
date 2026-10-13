/** Date-first visit navigation — shared config for Peru & Mexico dashboards. */

export type PeruSessionId =
 | "context-meeting"
 | "b2b-platform"
 | "store-visits"
 | "service-level"
 | "workshop-0209"
 | "workshop-ops"
 | "workshop-consumer"
 | "workshop-rewards"
 | "consumer-vision"
 | "overall-result";

export type PeruDateId = "aug-31" | "sep-01" | "sep-02" | "sep-03" | "overall-result";

export type VisitDateSession<T extends string> = {
 id: T;
 label: string;
 time?: string;
};

export type VisitDateGroup<TDate extends string, TSession extends string> = {
 id: TDate;
 dateLabel: string;
 shortLabel: string;
 year: number;
 weekday?: string;
 summary: string;
 sessions: VisitDateSession<TSession>[];
 isMeta?: boolean;
};

export const PERU_TRIP_PERIOD = "Lima field trip · Aug 31 – Sep 3, 2026";

export const PERU_VISIT_DATES: VisitDateGroup<PeruDateId, PeruSessionId>[] = [
 {
 id: "aug-31",
 dateLabel: "August 31",
 shortLabel: "Aug 31",
 year: 2026,
 weekday: "Monday",
 summary: "Morning context briefing · afternoon store visits (3 POCs) · B2B platform validated",
 sessions: [
 { id: "context-meeting", label: "Context meeting", time: "Morning" },
 { id: "store-visits", label: "Store visits", time: "Afternoon" },
 { id: "b2b-platform", label: "B2B platform", time: "Web Tiendas" },
 ],
 },
 {
 id: "sep-01",
 dateLabel: "September 1",
 shortLabel: "Sep 1",
 year: 2026,
 weekday: "Tuesday",
 summary: "Service level vision — OPS pains + product roadmap (BeerHub & Plaza República)",
 sessions: [{ id: "service-level", label: "Service level vision", time: "Full day" }],
 },
 {
 id: "sep-02",
 dateLabel: "September 2",
 shortLabel: "Sep 2",
 year: 2026,
 weekday: "Wednesday",
 summary: "OYP cross-functional workshop — Operations, Consumer, Rewards",
 sessions: [
 { id: "workshop-ops", label: "Workshop · Operations", time: "OPS board" },
 { id: "workshop-consumer", label: "Workshop · Consumer", time: "Consumer board" },
 { id: "workshop-rewards", label: "Workshop · Rewards", time: "Rewards board" },
 ],
 },
 {
 id: "sep-03",
 dateLabel: "September 3",
 shortLabel: "Sep 3",
 year: 2026,
 weekday: "Thursday",
 summary: "Consumer vision — product roadmap + Growth/Commercial pain prioritization",
 sessions: [{ id: "consumer-vision", label: "Consumer vision", time: "Product + Growth" }],
 },
 {
 id: "overall-result",
 dateLabel: "Trip synthesis",
 shortLabel: "Summary",
 year: 2026,
 summary: "Overall result — all sessions cross-referenced",
 sessions: [{ id: "overall-result", label: "Overall result" }],
 isMeta: true,
 },
];

export type MexicoSessionId =
 | "visitas-lojas"
 | "puebla-visit"
 | "promo-workshop"
 | "reuniao-cx"
 | "reuniao-produto"
 | "dinamica-ops"
 | "resultado-geral"
 | "ux-roadmap";

export type MexicoDateId =
 | "jul-20-21"
 | "jul-21"
 | "jul-22"
 | "jul-23"
 | "synthesis";

export const MEXICO_TRIP_PERIOD = "Mexico field trip · Jul 20 – 23, 2026";

export const MEXICO_VISIT_DATES: VisitDateGroup<MexicoDateId, MexicoSessionId>[] = [
 {
 id: "jul-20-21",
 dateLabel: "July 20–21",
 shortLabel: "Jul 20–21",
 year: 2026,
 weekday: "Sun–Mon",
 summary: "CDMX store visits — Bahia, Mixcoac, Los Alpes, Churubusco",
 sessions: [{ id: "visitas-lojas", label: "CDMX store visits", time: "2 days" }],
 },
 {
 id: "jul-21",
 dateLabel: "July 21",
 shortLabel: "Jul 21",
 year: 2026,
 weekday: "Tuesday",
 summary: "Puebla field visit (5 POCs) · promotion management workshop",
 sessions: [
 { id: "puebla-visit", label: "Puebla visit", time: "Field" },
 { id: "promo-workshop", label: "Promo workshop", time: "Commercial" },
 ],
 },
 {
 id: "jul-22",
 dateLabel: "July 22",
 shortLabel: "Jul 22",
 year: 2026,
 weekday: "Wednesday",
 summary: "CX meeting · product meeting (cancellation transfer test)",
 sessions: [
 { id: "reuniao-cx", label: "CX meeting", time: "Morning" },
 { id: "reuniao-produto", label: "Product meeting", time: "Afternoon" },
 ],
 },
 {
 id: "jul-23",
 dateLabel: "July 23",
 shortLabel: "Jul 23",
 year: 2026,
 weekday: "Thursday",
 summary: "OPS dynamics — vision 2027 workshop",
 sessions: [{ id: "dinamica-ops", label: "OPS workshop", time: "Full day" }],
 },
 {
 id: "synthesis",
 dateLabel: "Trip synthesis",
 shortLabel: "Summary",
 year: 2026,
 summary: "Overall result + suggested UX roadmap",
 sessions: [
 { id: "resultado-geral", label: "Overall result" },
 { id: "ux-roadmap", label: "UX roadmap" },
 ],
 isMeta: true,
 },
];

const PERU_SESSION_TO_DATE = new Map<PeruSessionId, PeruDateId>();
for (const day of PERU_VISIT_DATES) {
 for (const s of day.sessions) {
 PERU_SESSION_TO_DATE.set(s.id, day.id);
 }
}

const MEXICO_SESSION_TO_DATE = new Map<MexicoSessionId, MexicoDateId>();
for (const day of MEXICO_VISIT_DATES) {
 for (const s of day.sessions) {
 MEXICO_SESSION_TO_DATE.set(s.id, day.id);
 }
}

export function getPeruDateForSession(session: PeruSessionId): PeruDateId {
 return PERU_SESSION_TO_DATE.get(session) ?? "aug-31";
}

export function getMexicoDateForSession(session: MexicoSessionId): MexicoDateId {
 return MEXICO_SESSION_TO_DATE.get(session) ?? "jul-20-21";
}

export function getDefaultPeruSessionForDate(date: PeruDateId): PeruSessionId {
 const day = PERU_VISIT_DATES.find((d) => d.id === date);
 return day?.sessions[0]?.id ?? "context-meeting";
}

export function getDefaultMexicoSessionForDate(date: MexicoDateId): MexicoSessionId {
 const day = MEXICO_VISIT_DATES.find((d) => d.id === date);
 return day?.sessions[0]?.id ?? "visitas-lojas";
}

export function getPeruDateGroup(date: PeruDateId) {
 return PERU_VISIT_DATES.find((d) => d.id === date)!;
}

export function getMexicoDateGroup(date: MexicoDateId) {
 return MEXICO_VISIT_DATES.find((d) => d.id === date)!;
}

/** @deprecated Use PeruSessionId — kept for search & external imports */
export type PeruAgendaTab = PeruSessionId;
