/** Peru tab — context pillars (Service level · Consumer · Rewards). */

import {
 PERU_VISIT_DATES,
 type PeruDateId,
 type PeruSessionId,
} from "./visit-date-nav";

export type PeruContextId = "service-level" | "consumer" | "rewards" | "synthesis";

export type ServiceLevelActor = "courier" | "seller" | "cx" | "admin";

export type PeruContextMeta = {
 id: PeruContextId;
 label: string;
 subtitle: string;
 aliases: string;
 primaryPhase: "now" | "next" | "later" | "gate";
 horizonPlan: {
 now: string;
 next: string;
 later: string;
 gateNote?: string;
 };
};

export const PERU_CONTEXTS: PeruContextMeta[] = [
 {
 id: "service-level",
 label: "Field & ops",
 subtitle: "Stores · B2B · OPS vision · Sep 2 workshop",
 aliases: "Same as Operations in All tab · Service Level = Sep 1 OPS vision",
 primaryPhase: "now",
 horizonPlan: {
 now: "Peak reliability, inventory truth, routing & fair dispatch SLA",
 next: "Actionable KPIs, admin cockpit, unified peak surface",
 later: "Courier economics, OPS automation copilot, instant claims",
 },
 },
 {
 id: "consumer",
 label: "Consumer",
 subtitle: "Sep 2 workshop · Sep 3 product vision",
 aliases: "App · Growth pains · product roadmap",
 primaryPhase: "now",
 horizonPlan: {
 now: "Live courier map, address & location UX",
 next: "Multishowcases, Buy Again, returnables education, data stack consistent rollout",
 later: "Self-service, personalization, virtual returnables",
 },
 },
 {
 id: "rewards",
 label: "Rewards",
 subtitle: "Sep 2 loyalty workshop · Club TaDa",
 aliases: "Loyalty · Braze · anti-fraud",
 primaryPhase: "gate",
 horizonPlan: {
 now: "No tier/omnichannel scale until core platform reliability + data consistent rollout",
 next: "Club TaDa × Braze, flash coupons in wallet, anti-fraud automation",
 later: "BEES admin, football occasion, omnichannel redemption, tiers",
 gateNote:
 "Workshop top votes are Next — Rewards Now is a dependency gate, not a feature freeze.",
 },
 },
 {
 id: "synthesis",
 label: "Trip synthesis",
 subtitle: "Cross-session overall result",
 aliases: "Overall result across all Peru sessions",
 primaryPhase: "now",
 horizonPlan: {
 now: "core platform reliability before loyalty or growth bets",
 next: "Cross-functional roadmap by area",
 later: "Colombia & Ecuador field validation",
 },
 },
];

export const SERVICE_LEVEL_ACTORS: { id: ServiceLevelActor; label: string }[] = [
 { id: "courier", label: "Courier" },
 { id: "seller", label: "Seller" },
 { id: "cx", label: "CX" },
 { id: "admin", label: "Admin" },
];

const SESSION_CONTEXT: Record<PeruSessionId, PeruContextId> = {
 "context-meeting": "service-level",
 "b2b-platform": "service-level",
 "store-visits": "service-level",
 "service-level": "service-level",
 "workshop-0209": "service-level",
 "workshop-ops": "service-level",
 "workshop-consumer": "consumer",
 "workshop-rewards": "rewards",
 "consumer-vision": "consumer",
 "overall-result": "synthesis",
};

const WORKSHOP_GROUP_BY_SESSION: Partial<
 Record<PeruSessionId, "operations" | "consumer" | "rewards">
> = {
 "workshop-0209": undefined,
 "workshop-ops": "operations",
 "workshop-consumer": "consumer",
 "workshop-rewards": "rewards",
};

export function getSessionContext(session: PeruSessionId): PeruContextId {
 return SESSION_CONTEXT[session] ?? "service-level";
}

export function getWorkshopGroupForSession(
 session: PeruSessionId,
): "operations" | "consumer" | "rewards" | undefined {
 return WORKSHOP_GROUP_BY_SESSION[session];
}

export function getWorkshopSessionForGroup(
 group: "operations" | "consumer" | "rewards" | "all",
): PeruSessionId {
 if (group === "consumer") return "workshop-consumer";
 if (group === "rewards") return "workshop-rewards";
 return "workshop-ops";
}

export function isWorkshopSession(session: PeruSessionId): boolean {
 return (
 session === "workshop-0209" ||
 session === "workshop-ops" ||
 session === "workshop-consumer" ||
 session === "workshop-rewards"
 );
}

export function getDatesForContext(context: PeruContextId) {
 return PERU_VISIT_DATES.filter((day) =>
 day.sessions.some((s) => getSessionContext(s.id) === context),
 );
}

export function getSessionsForContext(context: PeruContextId, date: PeruDateId) {
 const day = PERU_VISIT_DATES.find((d) => d.id === date);
 if (!day) return [];
 return day.sessions.filter((s) => getSessionContext(s.id) === context);
}

export function getDefaultSessionForContext(context: PeruContextId): PeruSessionId {
 const priority: Record<PeruContextId, PeruSessionId[]> = {
 "service-level": [
 "context-meeting",
 "store-visits",
 "service-level",
 "b2b-platform",
 "workshop-ops",
 ],
 consumer: ["workshop-consumer", "consumer-vision"],
 rewards: ["workshop-rewards"],
 synthesis: ["overall-result"],
 };
 for (const session of priority[context]) {
 if (SESSION_CONTEXT[session] === context) return session;
 }
 return "overall-result";
}

export function getDefaultDateForContext(context: PeruContextId): PeruDateId {
 const session = getDefaultSessionForContext(context);
 for (const day of PERU_VISIT_DATES) {
 if (day.sessions.some((s) => s.id === session)) return day.id;
 }
 return "aug-31";
}

export function getSessionLabel(session: PeruSessionId): string {
 for (const day of PERU_VISIT_DATES) {
 const match = day.sessions.find((s) => s.id === session);
 if (match) return match.label;
 }
 return session;
}

export function getContextLabel(context: PeruContextId): string {
 return PERU_CONTEXTS.find((c) => c.id === context)?.label ?? context;
}

/** Map service-level pain categories to ecosystem actors. */
export function getPainActors(category: string): ServiceLevelActor[] {
 const c = category.toLowerCase();
 if (c.includes("seller platform") || c.includes("inventory / orders")) return ["seller"];
 if (c.includes("admin") || c.includes("commercial") || c.includes("catalog")) return ["admin"];
 if (c.includes("cx / post-sale") || c.includes("cx / compliance")) return ["cx"];
 if (c.includes("cx / fleet")) return ["cx", "courier"];
 if (c.includes("consumer / fleet")) return ["courier", "cx"];
 if (c.includes("communication")) return ["seller", "courier", "cx"];
 if (c.includes("operations")) return ["seller", "admin"];
 if (c.includes("consumer / trust")) return ["cx", "admin"];
 return ["seller"];
}

export function painMatchesActor(category: string, actor: ServiceLevelActor): boolean {
 return getPainActors(category).includes(actor);
}
