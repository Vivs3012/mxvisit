import {
 COLOMBIA_TRIP_PERIOD,
 COLOMBIA_VISIT_DATES,
 type ColombiaDateId,
 type ColombiaSessionId,
} from "../../colombia-date-nav";
import type { Locale } from "../locale";

const PERIOD_PT = "Colômbia 1YP · 13 set 2026";

const DATES_PT: Record<
 ColombiaDateId,
 { dateLabel: string; shortLabel: string; weekday: string; summary: string }
> = {
 "sep-13": {
 dateLabel: "13 de setembro",
 shortLabel: "13 set",
 weekday: "sábado",
 summary:
 "AM intro produto + PM Service Level — growth, marketplace, BEES/ERP, expansão, rewards, seller/courier, Braze, controles financeiros (14 set planejado)",
 },
};

const SESSION_PT: Record<ColombiaSessionId, string> = {
 "colombia-all": "All · cross-sessão",
 "product-intro": "Intro produto · insights",
 "service-level": "Service Level · insights",
};

export function getColombiaTripPeriod(locale: Locale) {
 return locale === "pt" ? PERIOD_PT : COLOMBIA_TRIP_PERIOD;
}

export function getColombiaVisitDates(locale: Locale) {
 if (locale === "en") return COLOMBIA_VISIT_DATES;
 return COLOMBIA_VISIT_DATES.map((d) => ({
...d,
 dateLabel: DATES_PT[d.id].dateLabel,
 shortLabel: DATES_PT[d.id].shortLabel,
 weekday: DATES_PT[d.id].weekday,
 summary: DATES_PT[d.id].summary,
 sessions: d.sessions.map((s) => ({
...s,
 label: SESSION_PT[s.id] ?? s.label,
 })),
 }));
}
