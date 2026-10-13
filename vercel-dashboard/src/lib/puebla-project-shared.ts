export type PueblaProjectInsightCategory =
 | "Bug"
 | "UX"
 | "Product"
 | "Operation"
 | "Infra"
 | "CX";

export type PueblaProjectInsight = {
 category: PueblaProjectInsightCategory;
 title: string;
 detail: string;
 quotes: string[];
};

export type PueblaProjectInterview = {
 id: string;
 sectionId: PueblaProjectSectionId;
 fileName: string;
 label: string;
 interviewType: string;
 location: string;
 executiveSummary: string;
 highlights: string[];
 insights: PueblaProjectInsight[];
 transcriptPath: string;
};

export type PueblaProjectSectionId =
 | "overview"
 | "cx-retention"
 | "cx-proactive"
 | "cx-field"
 | "cholula-ops"
 | "cholula-cx"
 | "buenavista-turbo"
 | "buena-vista-zone"
 | "radial"
 | "periferico"
 | "cross-themes";

export const PUEBLA_PROJECT_META = {
 title: "Puebla Project",
 period: "Field + CX rotation · 2026",
 scope: "Puebla / Aguascalientes",
 subtitle:
 "CX retention & proactive WhatsApp, store visits (Cholula, Buenavista, Radial, Periférico), Turbo rollout, and parallel-email / Contáctanos enablement — transcripts from Puebla project folder.",
 sourceFolder: "Puebla project/",
};

export const PUEBLA_PROJECT_SECTIONS: {
 id: PueblaProjectSectionId;
 label: string;
 subtitle: string;
}[] = [
 { id: "overview", label: "Overview", subtitle: "Scope, stats, and how to read this project" },
 { id: "cx-retention", label: "CX · Retention", subtitle: "Rota CX — Club TaDa, backlog, coupons" },
 { id: "cx-proactive", label: "CX · Proactive", subtitle: "WhatsApp outreach after friction" },
 { id: "cx-field", label: "CX · Field review", subtitle: "Ticket review on store visit" },
 { id: "cholula-ops", label: "Cholula · Ops", subtitle: "Tablet alarms, BEES sync, turbo" },
 { id: "cholula-cx", label: "Cholula · CX", subtitle: "Contáctanos & response SLAs" },
 { id: "buenavista-turbo", label: "Buenavista · Turbo", subtitle: "Geofence, UI, metrics" },
 { id: "buena-vista-zone", label: "Buena Vista", subtitle: "Gated clusters & alerts" },
 { id: "radial", label: "Radial", subtitle: "Parallel email & fleet" },
 { id: "periferico", label: "Periférico", subtitle: "Mochila, map, turbo order" },
 { id: "cross-themes", label: "Cross-themes", subtitle: "Ranked patterns across all sessions" },
];

export type PueblaProjectCrossTheme = {
 priority: "Critical" | "High" | "Medium";
 theme: string;
 detail: string;
 evidenceFiles: string[];
 quotes: string[];
};

export const PUEBLA_PROJECT_CROSS_THEMES: PueblaProjectCrossTheme[] = [
 {
 priority: "Critical",
 theme: "Store non-response & slow parallel-email loop",
 detail:
 "CX waits days to months when POCs ignore parallel threads; supervisors often not CC’d; financial and large short-ship cases stall while users churn.",
 evidenceFiles: ["Rota_CX.txt", "Rota_CX_2.txt", "Cholulacereso_2.txt", "Radial.txt"],
 quotes: [
 "no tenemos respuesta del punto de venta",
 "Abasto se llama y no contestaron nunca",
 "el cliente pidió a gritos auxilio",
 ],
 },
 {
 priority: "Critical",
 theme: "Fulfillment integrity — short ship, wrong SKU, fake delivered",
 detail:
 "Peaks amplify incomplete orders and silent substitutions; static delivery codes enable ‘entregado’ without delivery chain.",
 evidenceFiles: ["Rota_CX.txt", "Rota_CX_Proactive.txt", "Perife_rico.txt"],
 quotes: [
 "casi siempre mandan menos",
 "los repartidores ya saben tu código",
 "me llevaron Corona en vez de Victoria y no me avisaron",
 ],
 },
 {
 priority: "Critical",
 theme: "Payments — double charge & cash change disputes",
 detail:
 "Terminal issues cause duplicate charges; change theft by riders; resolution waits on store with inadequate coupon caps.",
 evidenceFiles: ["Rota_CX.txt", "Rota_CX_2.txt", "Rota_CX_Proactive.txt"],
 quotes: [
 "le cobraron dos veces con la tarjeta",
 "nunca regresó al repartidor",
 "nuestro cupón mayor es el de 100 pesos",
 ],
 },
 {
 priority: "High",
 theme: "BEES reliability — alerts, refresh, on/off desync",
 detail:
 "Missed tablet alarms, silent notifications with floor music, desynced store status, multi-tab refresh → expired orders.",
 evidenceFiles: ["Cholulacereso.txt", "Buena_vista.txt", "Buenavista.txt"],
 quotes: [
 "con tablet la operación es peor",
 "a mí me aparece apagada",
 "tres expirados",
 ],
 },
 {
 priority: "High",
 theme: "Last-mile capacity — mochilas, weight, promo SKUs",
 detail:
 "30 kg cap vs bag limits, fragile bags, mega repacking, mis-set promo weights force dual-rider hacks.",
 evidenceFiles: ["Perife_rico.txt", "Cholulacereso.txt"],
 quotes: [
 "limitación de 30 kilogramos",
 "mandemos dos repartidores",
 "no cabe la Mega",
 ],
 },
 {
 priority: "High",
 theme: "Promotions, coupons & Club loyalty clarity",
 detail:
 "Coupon wording, modelorama refusal, points refund not visible in app → ‘estafa’ perception; auto-refund on expire desired.",
 evidenceFiles: ["Rota_CX.txt", "Rota_CX_Proactive.txt"],
 quotes: [
 "Me dicen mira es una estafa",
 "a ellos no les aparece de inmediato el reembolso",
 "si estaría padre que ya se reembolsarán por automático",
 ],
 },
 {
 priority: "High",
 theme: "Proactive CX — WhatsApp limits & reporting",
 detail:
 "Spam blocks cap ~50 msgs/day; rigid macros; dashboard shows zero Tada points despite grants.",
 evidenceFiles: ["Rota_CX_Proactive.txt"],
 quotes: [
 "WhatsApp te lo teta como spam",
 "los puntos TADA no nos da resultados, siempre aparecen ceros",
 ],
 },
 {
 priority: "Medium",
 theme: "Turbo rollout, tracking UX & seller tooling",
 detail:
 "1 km geofence, polygon export gaps, turbo/new-user UI bugs, grouping priority, SLA at ‘llegué’ alignment.",
 evidenceFiles: ["Buenavista.txt", "Perife_rico.txt", "Cholulacereso.txt", "Radial.txt"],
 quotes: [
 "solo un kilómetro a la redonda",
 "cuando llega un Turbo ya no aparece",
 "sí puede cambiarlos como de orden",
 ],
 },
];

export const PUEBLA_PROJECT_EXECUTIVE = {
 headline:
 "Puebla in one line: the promise breaks in the delivery chain — among CX, store, courier, and consumer — and product still does not close the loop on response, stock, delivery, and trust.",
 paragraphs: [
 "The Puebla Project bundles nine field conversations (plus one duplicate proactive CX file in the source folder): three rotations with the Puebla CX team and six store or mixed sessions in the region (Cholula, Buenavista/Buena Vista, Radial, Periférico), plus a ticket-review session during a visit to Aguascalientes. The through-line is not “lack of local effort” — it is systemic friction between what the consumer sees in the app, what the store can run, and what CX can resolve on time.",
 "On the CX side (Retention), work is ticket by ticket: Club TaDa point refunds after expired orders (~24h escalation to Briseida/Club while the consumer waits up to ~2 days), coupons that read like free beer (Club Corona), modeloramas that refuse redemption, static delivery codes that allow “delivered” without delivery chain, stale courier map pins, and financial cases (double charge) stuck for weeks because the POC never answers parallel email. Explicit ask: auto-return points when an order expires.",
 "Proactive CX (WhatsApp) shows the recovery upside: after delay, unexplained cancellation, warm beer, or silent brand swap (Corona for Victoria), agents win users back when 250 points land in 10–15 minutes — but they hit WhatsApp spam limits (~50 messages/day), generic macros that feel accusatory (“your situation”), and a dashboard that shows zero TaDa points after grants. Personalization and fixed reporting are prerequisites to scale the channel.",
 "In stores, Cholula confirms ops improved with more couriers and weekend floor help, but platform fragility remains: tablet alarms fail (orders expire), laptops work better; BEES shows the store “off” for supervisors while the POC is open until refresh; local turbo hits ~6–11 minutes but the 35-minute metric should stop at “llegué”; batched orders stretch the second order’s SLA. The second Cholula visit trains Contáctanos (live ticket #84), but the description does not appear in the CX agent view — and parallel email still hides cases from staff on the floor.",
 "Buenavista/Buena Vista and Radial/Periférico expose last mile and Turbo rollout: 1 km geofence, ghost turbo polygon in SM, new-user badge dropped on turbo orders, broken coverage export, turbo vs normal sequence ignored in the courier app, map showing the rider still at the store mid-route. Buena Vista adds geography — up to 6–7 gated clusters per trip, 25+ minutes transit — making a 35-minute SLA unrealistic. Periférico crosses the 30 kg order cap with 25 kg bags, misconfigured promo SKUs (24 kg), megas that do not fit, and a clear need for rider–consumer messaging.",
 "Radial reinforces the communication bottleneck: CX sends parallel-email requests and needs a ~30-minute answer while the consumer is on the line; inbox split between OSI and an entrepreneur running three POCs; stores prefer to fix at the counter. Across all axes, eight cross-themes align: POC non-response, order integrity (short ship, swap, fake delivered), payments/change, BEES reliability, bag/weight capacity, promo/Club clarity, proactive WhatsApp design, and Turbo + tracking alignment.",
 ],
 takeaways: [
 {
 label: "CX",
 text: "Less manual Club TaDa escalation; auto-refund on expiration; parallel mail with supervisor CC and store SLA; proactive WhatsApp with personalization and correct metrics.",
 },
 {
 label: "Stores",
 text: "Reliable alert sound and refresh on any device; synced on/off status; Contáctanos as official channel (fix CX view); less ad hoc WhatsApp.",
 },
 {
 label: "Delivery",
 text: "Align bag/weight/promo rules; live map; chat or messaging; metric at ‘llegué’; clear turbo UI for store and courier.",
 },
 {
 label: "Trust",
 text: "Communicate swaps and cancellations; dynamic codes; temperature and order completeness — where NPS drops even when delay is “acceptable”.",
 },
 ],
 visitMap: [
 {
 zone: "CX · Retention (Rota CX)",
 seen: "Club TaDa backlog, coupons, static codes, tickets 6–60 days without POC reply.",
 },
 {
 zone: "CX · Proactive",
 seen: "Post-friction WhatsApp, fast points, spam limits, silent swaps and warm beer.",
 },
 {
 zone: "CX · Field (Rota CX 2)",
 seen: "Double charge, large short-ships, Abasto Pasa silence, Alejandra escalation path.",
 },
 {
 zone: "Cholula",
 seen: "Tablet vs laptop, BEES desync, turbo, Victoria stockout, Contáctanos training.",
 },
 {
 zone: "Buenavista / Buena Vista",
 seen: "Turbo 1 km, new-user UI, private clusters, alerts and multi-tab orders.",
 },
 {
 zone: "Radial / Periférico",
 seen: "Parallel email, fleet/rain gear, 30 kg bags, map and turbo order rules.",
 },
 ],
 stats: [
 { label: "Transcripts", value: "9" },
 { label: "CX sessions", value: "3" },
 { label: "Store / mixed", value: "6" },
 { label: "Cross-themes", value: "8" },
 ],
};
