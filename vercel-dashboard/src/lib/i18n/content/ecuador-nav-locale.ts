import {
 ECUADOR_TRIP_PERIOD,
 ECUADOR_VISIT_DATES,
 type EcuadorVisitDateGroup,
} from "../../ecuador-date-nav";
import type { Locale } from "../locale";

export function getEcuadorTripPeriod(locale: Locale): string {
 if (locale === "en") return ECUADOR_TRIP_PERIOD;
 return "Equador OYP · 7–8 out 2026";
}

export function getEcuadorVisitDates(locale: Locale): EcuadorVisitDateGroup[] {
 if (locale === "en") return ECUADOR_VISIT_DATES;
 return ECUADOR_VISIT_DATES.map((g) => {
 if (g.id === "oct-07") {
 return {
...g,
 dateLabel: "7 de outubro",
 shortLabel: "7 out",
 weekday: "terça-feira",
 summary:
 "Prep visão de produto — Nível de serviço (Community POC, portfólio, motorizados) + Consumidor (pagamentos, promos, CRM) antes do workshop de 8 out",
 sessions: [
 { id: "product-vision", label: "Prep visão de produto", time: "SL + Consumidor" },
 ],
 };
 }
 return {
...g,
 dateLabel: "8 de outubro",
 shortLabel: "8 out",
 weekday: "quarta-feira",
 summary:
 "Workshop OYP — quadro único Consumidor, Nível de serviço e Rewards; votação, sonhos e ideação de hospitalidade",
 sessions: [{ id: "oyp-workshop", label: "Workshop OYP · insights", time: "Lucid" }],
 };
 });
}
