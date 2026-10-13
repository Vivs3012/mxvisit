/** Public assets copied from Equador/07:10 - Product vision */

const base = "/ecuador";

export const EC_ASSETS = {
 communityPocFinancials: `${base}/Captura de Tela 2026-10-07 às 16.22.51.png`,
 courierHeatmapExcel: `${base}/Captura de Tela 2026-10-07 às 16.39.23.png`,
 kpiPowerBi: `${base}/Captura de Tela 2026-10-07 às 16.45.57.png`,
 crmCouponsW40: `${base}/Captura de Tela 2026-10-07 às 17.19.58.png`,
 crmHoldoutW40: `${base}/Captura de Tela 2026-10-07 às 17.20.07.png`,
 crmCalendarW41: `${base}/Captura de Tela 2026-10-07 às 17.20.27.png`,
 motoGpPdf: { path: `${base}/MOTO GP.pdf`, title: "MotoGP — courier training & incentives" },
 npsSepPdf: { path: `${base}/NPS Ecuador Sep.pdf`, title: "NPS Ecuador — September 2026" },
} as const;

export type EcuadorAssetSlide = {
 id: string;
 title: string;
 caption: string;
 src: string;
 tags: string[];
};

export const ECUADOR_MEETING_SLIDES: EcuadorAssetSlide[] = [
 {
 id: "community-poc-ebitda",
 title: "Community POC hybrid model — financial scenario",
 caption:
 "LE26 vs Community-POC-only vs full hybrid (28 dark stores + 112 Community POCs): ~1.14M orders (+87%), EBITDA ~5.3M vs 3.1M baseline. Coverage 42%→67% population; 6→41 cities.",
 src: EC_ASSETS.communityPocFinancials,
 tags: ["expansion", "community poc", "finance"],
 },
 {
 id: "courier-heatmap",
 title: "Hourly order heatmap by dark store (Excel)",
 caption:
 "Peak 16h–23h; Condado and Santa Elena hit max 24 orders/hour. Used to derive motorizado need per POC per hour — today manual, candidate for BEES automation.",
 src: EC_ASSETS.courierHeatmapExcel,
 tags: ["courier", "forecast", "peak"],
 },
 {
 id: "kpi-dashboard",
 title: "SEGUIMIENTO KPIs — Power BI for supervisors",
 caption:
 "Per-POC fulfillment, SLA35, NPS, Perfect Order, cold rate + order projection calculator and max-failure projection. POCs do not use the seller home metrics page; this is their operating view.",
 src: EC_ASSETS.kpiPowerBi,
 tags: ["kpi", "seller", "incentives"],
 },
 {
 id: "crm-coupons",
 title: "CRM W40 — coupon ticket lift",
 caption:
 "1,215 redemptions (11.6% penetration). Chelizza Thu ≥$30 lifts ticket +$8.40 vs no coupon. BEERFEST Sun + RUMB4 Fri = 71.6% of weekly redemptions.",
 src: EC_ASSETS.crmCouponsW40,
 tags: ["crm", "coupons", "consumer"],
 },
 {
 id: "crm-holdout",
 title: "CRM W40 — holdout incrementality",
 caption:
 "Fri 18h RUMB4 +50% lift; Sun 12h BEERFEST +39.7%; morning pushes ~+5% (tie). Technical incoherence (fee promise vs checkout) collapses lift to +3.3%.",
 src: EC_ASSETS.crmHoldoutW40,
 tags: ["crm", "incrementality", "consumer"],
 },
 {
 id: "crm-calendar",
 title: "Commercial calendar W41 (Oct 7–11)",
 caption:
 "Daily promo stack: Oktoberfest, holiday GYE, Premier 3x2 flash (must OFF at 12:00), Clásico LDU vs BSC. Ops-critical switch windows for flash combos.",
 src: EC_ASSETS.crmCalendarW41,
 tags: ["promo", "planning", "ops"],
 },
];
