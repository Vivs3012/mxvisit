export type ColombiaSessionId = "product-intro" | "service-level" | "colombia-all";

export type ColombiaDateId = "sep-13";

export type ColombiaVisitDateSession = {
 id: ColombiaSessionId;
 label: string;
 time?: string;
};

export type ColombiaVisitDateGroup = {
 id: ColombiaDateId;
 dateLabel: string;
 shortLabel: string;
 year: number;
 weekday?: string;
 summary: string;
 sessions: ColombiaVisitDateSession[];
};

export const COLOMBIA_TRIP_PERIOD = "Colombia 1YP · Sep 13, 2026";

export const COLOMBIA_VISIT_DATES: ColombiaVisitDateGroup[] = [
 {
 id: "sep-13",
 dateLabel: "September 13",
 shortLabel: "Sep 13",
 year: 2026,
 weekday: "Saturday",
 summary:
 "AM product introduction + PM Service Level — growth, marketplace, BEES/ERP, expansion, rewards, seller/courier, Braze, finance controls (Sep 14 sessions planned)",
 sessions: [
 { id: "colombia-all", label: "All · cross-session", time: "Sep 13" },
 { id: "product-intro", label: "Product intro · insights", time: "AM" },
 { id: "service-level", label: "Service Level · insights", time: "PM" },
 ],
 },
];

export function getColombiaDateGroup(dateId: ColombiaDateId): ColombiaVisitDateGroup {
 return COLOMBIA_VISIT_DATES.find((d) => d.id === dateId) ?? COLOMBIA_VISIT_DATES[0];
}
