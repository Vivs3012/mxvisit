/** Mexico tab — trip topic pillars (Field & ops today; Consumer · Rewards later). */

import {
 MEXICO_VISIT_DATES,
 type MexicoDateId,
 type MexicoSessionId,
} from "./visit-date-nav";

export type MexicoContextId = "field-ops";

export type MexicoContextMeta = {
 id: MexicoContextId;
 label: string;
 subtitle: string;
 aliases: string;
 primaryPhase: "now" | "next" | "later";
 horizonPlan: {
 now: string;
 next: string;
 later: string;
 };
};

export const MEXICO_CONTEXTS: MexicoContextMeta[] = [
 {
 id: "field-ops",
 label: "Field & ops",
 subtitle: "CDMX + Puebla visits · promo workshop · CX · Product · OPS · trip synthesis",
 aliases: "Store visits · meetings · Jul 20–28 · Consumer & Rewards topics coming later",
 primaryPhase: "now",
 horizonPlan: {
 now: "Peak reliability, inventory truth, overlapping routes, dispatch SLA",
 next: "Ecosystem comms, daily KPIs, promo vs supply alignment",
 later: "Consumer & Rewards pillars when sessions are added",
 },
 },
];

const SESSION_CONTEXT: Record<MexicoSessionId, MexicoContextId> = {
 "visitas-lojas": "field-ops",
 "puebla-visit": "field-ops",
 "promo-workshop": "field-ops",
 "reuniao-cx": "field-ops",
 "reuniao-produto": "field-ops",
 "dinamica-ops": "field-ops",
 "resultado-geral": "field-ops",
 "ux-roadmap": "field-ops",
};

export function getSessionContext(session: MexicoSessionId): MexicoContextId {
 return SESSION_CONTEXT[session] ?? "field-ops";
}

export function getDatesForContext(_context: MexicoContextId) {
 return MEXICO_VISIT_DATES;
}

export function getSessionsForContext(_context: MexicoContextId, date: MexicoDateId) {
 const day = MEXICO_VISIT_DATES.find((d) => d.id === date);
 if (!day) return [];
 return day.sessions;
}

export function getDefaultSessionForContext(_context: MexicoContextId): MexicoSessionId {
 return "visitas-lojas";
}

export function getDefaultDateForContext(_context: MexicoContextId): MexicoDateId {
 return "jul-20-21";
}

export function getContextLabel(context: MexicoContextId): string {
 return MEXICO_CONTEXTS.find((c) => c.id === context)?.label ?? context;
}

export function getSessionLabel(session: MexicoSessionId): string {
 for (const day of MEXICO_VISIT_DATES) {
 const match = day.sessions.find((s) => s.id === session);
 if (match) return match.label;
 }
 return session;
}
