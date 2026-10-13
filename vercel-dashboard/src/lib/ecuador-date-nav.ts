/** Date-first navigation for Ecuador OYP sessions. */

export type EcuadorSessionId = "product-vision" | "oyp-workshop";

export type EcuadorDateId = "oct-07" | "oct-08";

export type EcuadorVisitDateSession = {
 id: EcuadorSessionId;
 label: string;
 time?: string;
};

export type EcuadorVisitDateGroup = {
 id: EcuadorDateId;
 dateLabel: string;
 shortLabel: string;
 year: number;
 weekday?: string;
 summary: string;
 sessions: EcuadorVisitDateSession[];
};

export const ECUADOR_TRIP_PERIOD = "Ecuador OYP · Oct 7–8, 2026";

export const ECUADOR_VISIT_DATES: EcuadorVisitDateGroup[] = [
 {
 id: "oct-07",
 dateLabel: "October 7",
 shortLabel: "Oct 7",
 year: 2026,
 weekday: "Tuesday",
 summary:
 "Product vision prep — Service Level (Community POC, portfolio, couriers) + Consumer (payments, promos, CRM) ahead of Oct 8 workshop",
 sessions: [{ id: "product-vision", label: "Product vision prep", time: "SL + Consumer" }],
 },
 {
 id: "oct-08",
 dateLabel: "October 8",
 shortLabel: "Oct 8",
 year: 2026,
 weekday: "Wednesday",
 summary:
 "OYP workshop — combined Consumer, Service Level & Rewards board; voting, dreams, hospitality ideation",
 sessions: [{ id: "oyp-workshop", label: "OYP workshop · insights", time: "Lucid" }],
 },
];

export function getEcuadorDateGroup(dateId: EcuadorDateId): EcuadorVisitDateGroup {
 const group = ECUADOR_VISIT_DATES.find((d) => d.id === dateId);
 if (!group) return ECUADOR_VISIT_DATES[0];
 return group;
}

export function getEcuadorDateForSession(session: EcuadorSessionId): EcuadorDateId {
 if (session === "oyp-workshop") return "oct-08";
 return "oct-07";
}
